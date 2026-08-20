import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const terminalRows = [
  ['LOCATION', 'Global'],
  ['STATUS', 'Accepting New Clients'],
  ['FOUNDED', '2024'],
  ['SERVICES', 'Custom Software • Web Apps • AI Integration'],
  ['TECH STACK', 'MERN • Next.js • Python • Cloud'],
  ['INDUSTRIES', 'SaaS • Healthcare • E-commerce • Finance'],
  ['APPROACH', 'Agile • Systems Thinking • Scalability'],
];

const teamMembers = [
  { name: 'Rafaqat Ali', role: 'CEO', image: '/images/team/Rafaqat Ali.jpeg' },
  { name: 'Abdul Rehman Yousufi', role: 'CAO', image: '/images/team/Abdul Rehman Yousufi.jpeg' },
  { name: 'Ahsan Kamal', role: 'SD', image: '/images/team/Ahsan Kamal.jpeg' },
  { name: 'Fahad Ali', role: 'COO', image: '/images/team/Fahad Ali.jpeg' },
  { name: 'Muhammad Haris', role: 'CSO', image: '/images/team/Muhammad Haris.jpeg' },
  { name: 'Muhammad Moeez Sultan', role: 'CGO', image: '/images/team/Muhammad Moeez Sultan.jpeg' },
  { name: 'Rehan Ali', role: 'CCO', image: '/images/team/Rehan Ali.jpeg' },
  { name: 'Umar Amin', role: 'CTO', image: '/images/team/Umar Amin.jpeg' },
];

const About = () => {
  const borderRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<{name: string, role: string, image: string} | null>(null);

  const ceo = teamMembers.find(member => member.role === 'CEO');
  const restOfTeam = teamMembers.filter(member => member.role !== 'CEO');

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
    <section id="about" className="pt-16 pb-32 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 technical-grid opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint mb-16">002 — ABOUT</p>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          <div className="lg:w-[55%]">
            <div className="relative pl-6 mb-12">
              <div ref={borderRef} className="absolute left-0 top-0 w-[2px] h-full bg-mint origin-bottom" />
              <p className="font-editorial text-4xl md:text-5xl text-foreground leading-snug">
                We don't just write code.
                We <br />
                <span className="text-blue-600">build systems</span>
                <br />
                that drive business growth.
              </p>
            </div>

            {[
              "Devx Solutions is a premier software development agency dedicated to transforming complex business challenges into elegant, scalable digital products. We partner with forward-thinking companies to build solutions that matter.",

              "Our team specializes in full-stack engineering, AI automation, and cloud infrastructure. From initial architecture to deployment, we deliver robust SaaS platforms, intuitive web applications, and cutting-edge AI tools.",

              "We believe in engineering excellence and systems thinking. We build for performance, security, and scalability, ensuring that the software we create not only meets today's needs but adapts to tomorrow's opportunities."
            ].map((text, i) => (
              <motion.p
                key={i}
                className="text-text-secondary text-base leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <div className="lg:w-[45%]">
            <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="font-mono text-[11px] text-text-secondary ml-2">devx@solutions ~ $</span>
              </div>
              <div className="p-5 space-y-3">
                {terminalRows.map(([key, val], i) => (
                  <motion.div
                    key={key}
                    className="flex justify-between font-mono text-[13px] gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <span className="text-text-secondary shrink-0">{key}</span>
                    <span className="text-foreground flex items-center gap-1.5 text-right">
                      {key === 'STATUS' ? (
                        <>
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-mint inline-block shrink-0"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                          />
                          {val}
                        </>
                      ) : val}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="font-editorial text-3xl md:text-4xl text-foreground mb-4">Meet the Team</h3>
            <p className="text-text-secondary text-base max-w-2xl mx-auto">
              The brilliant minds behind our innovative solutions.
            </p>
          </motion.div>

          {/* CEO Section - Single line */}
          {ceo && (
            <div className="flex justify-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMember(ceo)}
              >
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden mb-4 border-4 border-mint group-hover:border-blue-500 transition-colors duration-300 shadow-xl">
                  <img
                    src={ceo.image}
                    alt={ceo.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-mono text-lg md:text-xl text-foreground font-bold text-center">{ceo.name}</h4>
                <p className="text-mint text-sm font-medium mt-1">{ceo.role}</p>
              </motion.div>
            </div>
          )}

          {/* Rest of the Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {restOfTeam.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group flex flex-col items-center cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden mb-4 border-2 border-slate-200 group-hover:border-blue-600 transition-colors duration-300 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-mono text-sm md:text-base text-foreground font-medium text-center">{member.name}</h4>
                <p className="text-text-secondary text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Full Image */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the modal content
              className="bg-white rounded-xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl cursor-default"
            >
              <div className="relative flex-1 overflow-hidden min-h-[50vh] bg-slate-100 flex items-center justify-center p-8">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="max-w-full max-h-[60vh] object-contain rounded shadow-lg"
                />
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center text-white transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="p-6 text-center bg-white border-t border-slate-100">
                <h3 className="font-editorial text-2xl text-slate-900 mb-1">{selectedMember.name}</h3>
                <p className="font-mono text-sm text-blue-600">{selectedMember.role}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
