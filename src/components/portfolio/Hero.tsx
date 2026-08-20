import { useRef, useState, useEffect, useMemo, Suspense, memo } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Shared smooth progress value for R3F
const smoothProgress = { value: 0 };

const Particles = memo(() => {
  const count = 1500; // Reduced particle count for performance
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 25;
      p[i * 3 + 1] = (Math.random() - 0.5) * 25;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.0002;
    // Optimized position update
    const targetZ = smoothProgress.value * 20;
    ref.current.position.z += (targetZ - ref.current.position.z) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#3b82f6"
        transparent
        opacity={0.2}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false} // Optimization for transparent particles
      />
    </points>
  );
});

const StatusBadge = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
    </span>
    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-blue-400 uppercase font-bold">
      Available for New Projects
    </span>
  </motion.div>
));

const HeroMainContent = memo(({ springProgress }: { springProgress: any }) => {
  const scale = useTransform(springProgress, [0, 1], [1, 3]); // Reduced max scale
  const opacity = useTransform(springProgress, [0, 0.4, 0.7], [1, 0.8, 0]);
  const y = useTransform(springProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        pointerEvents: springProgress.get() > 0.5 ? "none" : "auto",
        willChange: "transform, opacity" // GPU hint
      }}
      className="flex flex-col items-center"
    >
      <StatusBadge />

      <div className="relative mb-6">
        <h1
          className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 leading-[0.8] text-center"
          style={{ letterSpacing: "-0.06em" }}
        >
          <span className="block mb-2">We Build Scalable &</span>
          <span className="block bg-clip-text text-blue-600 pb-2">
            Custom Software
          </span>
          <span className="block mt-2">That Drives Growth</span>
        </h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="text-slate-600 text-base md:text-xl max-w-2xl text-center font-medium leading-relaxed mb-12 px-4"
      >
        Transforming ideas into high-performance SaaS, Enterprise Apps, and AI Solutions tailored to your business needs.
      </motion.p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {["MERN", "Next.js", "AI Tools", "SaaS"].map((tech, i) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
            className="flex items-center gap-2 py-2 px-5 bg-slate-100 border border-slate-200 rounded-full text-[12px] font-bold text-slate-700"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]" />
            {tech}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dpr, setDpr] = useState(1);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 1.5)); // Reduced DPR cap
  }, []);
  
  const xSpring = useSpring(0, {
    stiffness: 80, // Softer spring for better performance
    damping: 25,
    restDelta: 0.001
  });

  const indicatorOpacity = useTransform(xSpring, [0, 0.2], [1, 0]);
  const indicatorY = useTransform(xSpring, [0, 0.2], [0, 20]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          smoothProgress.value = self.progress;
          xSpring.set(self.progress);
        },
        onToggle: (self) => setIsInView(self.isActive),
      });
    });
    return () => ctx.revert();
  }, [xSpring]);

  return (
    <div className="bg-white">
      <section
        ref={containerRef}
        id="hero"
        className="relative h-[150vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={dpr}
              frameloop={isInView ? "always" : "never"} // Optimization: pause loop when out of view
              gl={{ 
                antialias: false, // Performance win
                alpha: true,
                powerPreference: "high-performance"
              }}
            >
              <Suspense fallback={null}>
                <Particles />
              </Suspense>
            </Canvas>
          </div>

          <div className="relative z-10 h-full flex items-center justify-center px-6">
            <HeroMainContent springProgress={xSpring} />
          </div>
          
          <motion.div 
            style={{ 
              opacity: indicatorOpacity,
              y: indicatorY
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-blue-500/80 uppercase font-bold">Initiate Fly-Through</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
