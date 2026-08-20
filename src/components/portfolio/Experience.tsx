import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  { year: '2024', title: 'Founded Devx Solutions', desc: 'Started with a vision to deliver exceptional digital products and custom software solutions.' },
  { year: '2024', title: 'First Major Enterprise Client', desc: 'Successfully delivered a comprehensive custom software system for our first enterprise partner.' },
  { year: '2025', title: 'Expanded Our Team', desc: 'Grew our team of engineers, designers, and strategists to meet increasing client demand.' },
  { year: '2025', title: 'Launched AI Solutions Division', desc: 'Introduced dedicated AI automation and integration services for forward-thinking businesses.' },
  { year: '2026', title: 'Strategic Partnerships', desc: 'Formed key industry partnerships to deliver robust end-to-end tech solutions globally.' },
  { year: '2026', title: 'Looking Ahead', desc: 'Continuing to innovate and build scalable systems that drive business growth for our clients.' },
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
