import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  { year: '2024', title: 'Establishment of Devx Solutions', desc: 'Founded with a core mission: architecting enterprise-grade digital infrastructure and decoupled web systems.' },
  { year: '2024', title: 'First Enterprise Deployment', desc: 'Engineered and deployed a mission-critical multi-tenant ERP system for international corporate operations.' },
  { year: '2025', title: 'Global Engineering Expansion', desc: 'Scaled engineering capacity across full-stack cloud, distributed databases, and high-concurrency microservices.' },
  { year: '2025', title: 'Autonomous AI Division', desc: 'Pioneered custom agentic workflows, LLM tool-calling orchestration, and automated pipeline intelligence for enterprise clients.' },
  { year: '2026', title: 'Global Strategic Alliances', desc: 'Formed cross-border technology alliances delivering turnkey SaaS products, native mobile clients, and enterprise modernization.' },
  { year: '2026', title: 'Pioneering Next-Gen Architecture', desc: 'Accelerating business impact through intelligent automations, audit-ready compliance tools, and zero-latency web applications.' },
];

const Experience = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleY: 0 }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-blue-600 mb-6">005 — THE JOURNEY</p>
      <h2 className="font-display font-extrabold tracking-tight leading-[0.95] mb-20" style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}>
        OUR <br /><span className="text-blue-600">JOURNEY</span>.
      </h2>

      <div className="relative">
        <div ref={lineRef} className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-blue-200 origin-top" />

        <div className="space-y-16 pl-14 md:pl-24">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <span className="absolute -left-10 md:-left-16 top-1 font-mono text-sm text-blue-600 font-bold">{ev.year}</span>
              <div className="absolute -left-[2.85rem] md:-left-[4.375rem] top-2 w-2 h-2 rounded-full bg-blue-500 border-2 border-background" />
              <h3 className="font-display font-semibold text-lg text-foreground mb-1">{ev.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{ev.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
