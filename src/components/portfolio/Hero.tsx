import { useRef, useState, useEffect, useMemo, Suspense, memo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ArrowRight, Calculator, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { Magnetic } from "./Magnetic";

const Particles = memo(() => {
  const count = 900;
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 22;
      p[i * 3 + 1] = (Math.random() - 0.5) * 22;
      p[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0004;
    ref.current.rotation.x += 0.0002;
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
        size={0.018}
        color="#2563eb"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
});

export const Hero = () => {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 1.5));
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      {/* Three.js Ambient Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={dpr}
          gl={{ antialias: false, alpha: true }}
        >
          <Suspense fallback={null}>
            <Particles />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Layout Container with safe top clearance under fixed navbar */}
      <section
        id="hero"
        className="relative z-10 max-w-6xl mx-auto px-6 pt-32 sm:pt-36 md:pt-40 pb-20 md:pb-28 flex flex-col items-center text-center"
      >
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-[11px] font-mono tracking-wider text-blue-700 uppercase font-bold">
            Devx Solutions • Enterprise Engineering & AI
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-4xl font-display mb-6"
        >
          We Build Scalable &{" "}
          <span className="text-blue-600">Custom Software</span> That Drives Growth
        </motion.h1>

        {/* Subtitle / Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl font-normal leading-relaxed mb-10"
        >
          From complex enterprise web applications to autonomous AI workflows and high-concurrency cloud systems, we engineer software designed for performance, security, and market impact.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
        >
          <Magnetic>
            <button
              onClick={() => scrollTo("projects")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide uppercase transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 group"
            >
              Explore Client Work{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Magnetic>

          <Magnetic>
            <button
              onClick={() => scrollTo("estimator")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm tracking-wide uppercase transition-all border border-slate-200 flex items-center justify-center gap-2"
            >
              <Calculator size={16} className="text-blue-600" /> Calculate Project Scope
            </button>
          </Magnetic>
        </motion.div>

        {/* Enterprise Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 border-t border-slate-100 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-left"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span className="text-xs font-mono text-slate-600 font-medium">
              Enterprise Grade
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span className="text-xs font-mono text-slate-600 font-medium">
              AI Automations
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span className="text-xs font-mono text-slate-600 font-medium">
              Cloud Agnostic
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
            <span className="text-xs font-mono text-slate-600 font-medium">
              Agile Milestones
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
