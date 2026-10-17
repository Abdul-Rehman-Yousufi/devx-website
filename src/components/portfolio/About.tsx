import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Award, Terminal, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import { LinkedInLogoIcon as Linkedin } from '@radix-ui/react-icons';

gsap.registerPlugin(ScrollTrigger);

const corporateSpecs = [
  ['ORGANIZATION', 'Devx Solutions Inc.'],
  ['HEADQUARTERS', 'Global Remote Engineering'],
  ['STATUS', 'Accepting Select Enterprise Partners'],
  ['SPECIALIZATION', 'Mission-Critical SaaS • AI Automations • Cloud'],
  ['CORE STACK', 'React • Next.js • Python • Django • AWS • LLMs'],
  ['INDUSTRIES', 'FinTech • HealthTech • B2B SaaS • E-Commerce'],
  ['METHODOLOGY', 'Agile Sprints • Systems Architecture • Zero Downtime'],
];

const ceoData = {
  name: 'Rafaqat Ali',
  title: 'Chief Executive Officer & Founder',
  image: '/images/team/Rafaqat Ali.jpeg',
  bio: 'Rafaqat Ali leads Devx Solutions with a steadfast commitment to engineering precision, architectural durability, and strategic product delivery. Under his leadership, Devx Solutions has engineered high-throughput platforms for international clients, bridging the gap between cutting-edge AI breakthroughs and dependable enterprise software.',
  quote: '“We do not view software as mere lines of code. We architect scalable digital infrastructure that fundamentally propels our partners ahead of their competition.”'
};

export const About = () => {
  const borderRef = useRef<HTMLDivElement>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (borderRef.current) {
        gsap.fromTo(borderRef.current, { scaleY: 0 }, {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: borderRef.current, start: 'top 80%', once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden bg-white">
      <div className="absolute inset-0 technical-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-blue-600 mb-12 font-bold">
          002 — OUR FIRM & PHILOSOPHY
        </p>

        {/* Narrative & Terminal Diagnostics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative pl-6 mb-8">
              <div ref={borderRef} className="absolute left-0 top-0 w-[3px] h-full bg-blue-600 origin-bottom" />
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-slate-900 font-extrabold leading-tight">
                Architecting digital solutions <br />
                <span className="text-blue-600">tailored for scale</span> and performance.
              </h2>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              <strong className="text-slate-900 font-semibold">Devx Solutions</strong> is a premier software engineering firm partnering with forward-thinking enterprises, fast-growth startups, and visionary founders. We transform complex operational hurdles into elegant, robust digital products that perform reliably under heavy workload.
            </p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Our multidisciplinary engineering practice specializes in high-concurrency web platforms, custom AI automations, and resilient cloud architectures. We don't just ship features; we engineer maintainable, audit-ready systems designed to scale seamlessly with your bottom line.
            </p>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-mono font-bold text-blue-600 block mb-1">01 / ARCHITECTURE</span>
                <p className="text-xs text-slate-600">Built on modern, decoupled stacks with zero technical debt.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-mono font-bold text-emerald-600 block mb-1">02 / VELOCITY</span>
                <p className="text-xs text-slate-600">Rapid agile execution with bi-weekly testable deliverables.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-mono font-bold text-amber-600 block mb-1">03 / SECURITY</span>
                <p className="text-xs text-slate-600">Enterprise RBAC, data encryption, and production QA rigor.</p>
              </div>
            </div>
          </div>

          {/* Right Terminal Diagnostics Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 text-slate-200 shadow-2xl border border-slate-800 rounded-3xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="font-mono text-xs text-slate-400 ml-2 font-semibold">devx-system-status.sh</span>
              </div>
              <div className="p-6 space-y-3.5 font-mono text-xs">
                {corporateSpecs.map(([key, val], i) => (
                  <motion.div
                    key={key}
                    className="flex justify-between items-baseline gap-4 border-b border-slate-900 pb-2.5"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <span className="text-slate-400 font-bold shrink-0">{key}</span>
                    <span className="text-slate-100 flex items-center gap-2 text-right">
                      {key === 'STATUS' ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-400 font-semibold">{val}</span>
                        </>
                      ) : (
                        val
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Executive Leadership Spotlight: CEO Only */}
        <div className="mt-28 pt-20 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-blue-600 font-bold mb-2">
              EXECUTIVE LEADERSHIP
            </p>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Guided by Engineering Vision
            </h3>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* CEO Portrait */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 border-white shadow-xl cursor-pointer group relative"
                  onClick={() => setShowPhotoModal(true)}
                  title="Click to view full portrait"
                >
                  <img
                    src={ceoData.image}
                    alt={ceoData.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-display text-xl font-bold text-slate-900 mt-4 text-center">
                  {ceoData.name}
                </h4>
                <p className="text-xs font-mono font-bold text-blue-600 tracking-wider uppercase mt-1 text-center">
                  {ceoData.title}
                </p>
              </div>

              {/* CEO Bio & Quote */}
              <div className="md:col-span-7 space-y-4">
                <p className="font-editorial text-xl sm:text-2xl text-slate-800 italic leading-snug">
                  {ceoData.quote}
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {ceoData.bio}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/company/devx-sols/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-mono font-semibold transition-colors"
                  >
                    <Linkedin size={14} className="text-blue-600" /> Connect on LinkedIn
                  </a>
                  <span className="text-xs font-mono text-slate-400">
                    Direct Partner Inquiry
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CEO Photo Modal */}
      <AnimatePresence>
        {showPhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPhotoModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl p-6 text-center"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img
                  src={ceoData.image}
                  alt={ceoData.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">{ceoData.name}</h3>
              <p className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider mt-1">{ceoData.title}</p>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="mt-6 px-6 py-2 rounded-full bg-slate-900 text-white text-xs font-mono uppercase"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
