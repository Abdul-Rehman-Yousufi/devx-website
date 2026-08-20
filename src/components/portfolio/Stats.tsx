import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50, display: '50+', label: 'PROJECTS DELIVERED' },
  { value: 99, display: '99%', label: 'CLIENT SATISFACTION' },
  { value: 15, display: '15+', label: 'EXPERT ENGINEERS' },
  { value: null, display: '24/7', label: 'SUPPORT & MAINTENANCE' },
];
const CountUp = ({ target, display, label }: { target: number | null; display: string; label: string }) => {
  const [val, setVal] = useState(target !== null ? '0' : '');
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (triggered.current) return;
          triggered.current = true;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              const suffix = display.replace(/^[0-9]+/, '');
              const prefix = display.startsWith('0') && target < 10 ? '0' : '';
              setVal(prefix + Math.round(obj.v) + suffix);
            },
          });
        },
      });
    });
    return () => ctx.revert();
  }, [target, display]);

  useEffect(() => {
    if (target !== null) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          let i = 0;
          const chars = display.split('');
          const timer = setInterval(() => {
            if (i <= chars.length) {
              setVal(chars.slice(0, i).join(''));
              i++;
            } else clearInterval(timer);
          }, 100);
        },
      });
    });
    return () => ctx.revert();
  }, [target, display]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display font-extrabold text-blue-600" style={{ fontSize: 'clamp(64px, 10vw, 96px)' }}>
        {val || display}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary mt-2">{label}</p>
    </div>
  );
};

const Stats = () => {
  const topLine = useRef<HTMLDivElement>(null);
  const bottomLine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [topLine.current, bottomLine.current].forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, { scaleX: 0 }, {
          scaleX: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" className="py-32 relative bg-slate-50 border-y border-slate-200">
      <div ref={topLine} className="absolute top-0 left-0 right-0 h-px bg-slate-200 origin-left" />
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s) => (
            <CountUp key={s.label} target={s.value} display={s.display} label={s.label} />
          ))}
        </div>
      </div>
      <div ref={bottomLine} className="absolute bottom-0 left-0 right-0 h-px bg-slate-200 origin-left" />
    </section>
  );
};

export default Stats;
