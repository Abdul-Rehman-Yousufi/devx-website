import { useRef, useState, useEffect, useMemo, Suspense, memo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ArrowDown, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Magnetic } from "./Magnetic";

const AmbientParticles = memo(() => {
  const count = 500;
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0003;
    ref.current.rotation.x += 0.0001;
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
        size={0.02}
        color="#DFA900"
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

  const tickerServices = [
    "Web Development",
    "Mobile Apps",
    "SaaS Platforms",
    "AI Automations",
    "Next.js",
    "Python & Django",
    "E-Commerce",
    "Cloud Architecture",
    "UI/UX Design",
    "React Native"
  ];

  return (
    <div className="relative min-h-[92vh] overflow-hidden bg-[#080808] text-white flex flex-col justify-between">
      {/* Ambient Radial Glow Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[-15%] h-[520px] w-[520px] rounded-full blur-[120px] bg-[rgba(223,169,0,0.08)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[550px] w-[550px] rounded-full blur-[140px] bg-[rgba(223,169,0,0.06)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[30%] bottom-[-15%] h-[420px] w-[420px] rounded-full blur-[130px] bg-[rgba(223,169,0,0.05)]"
      />

      {/* Subtle Three.js Gold Ambient Starlight */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={dpr}
          gl={{ antialias: false, alpha: true }}
        >
          <Suspense fallback={null}>
            <AmbientParticles />
          </Suspense>
        </Canvas>
      </div>

      {/* Top Hairline Divider */}
      <div className="gold-divider absolute top-0 left-0 right-0 z-10" />

      {/* Main Hero Content */}
      <section
        id="hero"
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-36 sm:pt-40 md:pt-44 pb-16 flex flex-col items-center text-center my-auto"
      >
        {/* Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gradient-to-r from-gold/10 to-gold/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold shadow-[0_0_20px_rgba(223,169,0,0.12)] backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(223,169,0,0.9)] animate-pulse" />
          Premium Software & AI Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-balance text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.08] mb-6"
        >
          We Build Digital
          <br />
          <span className="relative mt-2 inline-block">
            <span className="gold-gradient-text">
              Products That Win
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-gold via-[#FFE08A] to-transparent opacity-80" />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/55 font-normal mb-10"
        >
          Devx Solutions designs, develops, and scales enterprise web applications, mobile apps, SaaS platforms, and custom AI systems for ambitious businesses worldwide.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
        >
          <Magnetic>
            <button
              onClick={() => scrollTo("portfolio")}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold transition duration-300 active:scale-[0.98] bg-[linear-gradient(135deg,#DFA900_0%,#F6C400_100%)] text-[#0A0600] shadow-[0_0_25px_rgba(223,169,0,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(223,169,0,0.5)] gap-2 group"
            >
              Explore Portfolio
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </Magnetic>

          <Magnetic>
            <button
              onClick={() => scrollTo("contact")}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold transition duration-300 active:scale-[0.98] bg-transparent text-gold ring-1 ring-gold/50 hover:-translate-y-0.5 hover:bg-gold hover:text-[#0A0600] hover:ring-gold hover:shadow-[0_0_20px_rgba(223,169,0,0.25)]"
            >
              Get Free Consultation
            </button>
          </Magnetic>
        </motion.div>

        {/* Instant Proof Metrics (Stats Strip) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl"
        >
          {[
            { metric: "5+", label: "Years Experience" },
            { metric: "50+", label: "Projects Shipped" },
            { metric: "25+", label: "Global Clients" },
            { metric: "99%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 backdrop-blur-md"
            >
              <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {stat.metric}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/40 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Infinite Marquee Ticker Ribbon */}
      <div className="relative border-y border-white/[0.07] bg-[#0A0A0A] py-3.5 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#080808] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#080808] to-transparent" />
        
        <div className="flex w-max animate-marquee">
          {[...tickerServices, ...tickerServices].map((service, index) => (
            <span
              key={index}
              className="flex items-center gap-3 px-5 text-xs font-semibold uppercase tracking-[0.15em] text-white/40 whitespace-nowrap"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
