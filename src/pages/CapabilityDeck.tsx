import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Globe, 
  Zap, 
  Code2, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Terminal,
  Activity,
  Workflow,
  Sparkles,
  Rocket
} from 'lucide-react';

const CapabilityDeck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-mint selection:text-black">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-gradient-to-b from-black to-transparent">
        <button 
          onClick={() => navigate('/#capability-callout')}
          className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Return to Portfolio</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Full Capability Deck // 2026</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-40 space-y-40">
        
        {/* 1. Cover Slide */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="min-h-[70vh] flex flex-col justify-center items-center text-center"
        >
          <span className="font-mono text-mint text-xs uppercase tracking-[0.4em] mb-6 font-bold">🧠 Technical Capability Deck</span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none italic uppercase mb-8">
            AMAN <span className="text-mint">—</span><br />
            <span className="text-zinc-500">Systems Engineer</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed font-medium mb-12">
            Building scalable systems, intelligent automation, and high-performance web platforms for the modern era.
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            <span className="px-4 py-2 border border-white/5 rounded-full bg-white/5">Distributed Systems</span>
            <span className="px-4 py-2 border border-white/5 rounded-full bg-white/5">AI Integrations</span>
            <span className="px-4 py-2 border border-white/5 rounded-full bg-white/5">Full-Stack Engineering</span>
          </div>
        </motion.section>

        {/* 2. Positioning */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="space-y-12"
        >
          <div className="h-[1px] w-12 bg-mint/40" />
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight max-w-4xl">
            I don’t just build apps — <span className="text-mint">I design systems that scale and automate.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {[
              { title: "End-to-End thinking", desc: "Focusing on the complete lifecycle from data flow to final UX." },
              { title: "Performance First", desc: "Engineering for scalability and real-world mission-critical use." },
              { title: "Hybrid Core", desc: "A seamless blend of Frontend UX, Backend Architecture, and AI." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-zinc-900/50 border border-white/5 rounded-xl">
                <h3 className="font-mono text-xs uppercase tracking-widest text-white mb-4 font-bold">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 3. What I Do (Core Capabilities) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <div className="space-y-6">
            <div className="p-4 bg-mint/10 w-fit rounded-2xl border border-mint/20">
              <Code2 className="text-mint" size={24} />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Full Stack<br />Development</h3>
            <ul className="space-y-3 font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-bold">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-mint rounded-full" /> Modern UI (React, Tailwind)</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-mint rounded-full" /> Backend APIs (Node, Express)</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-mint rounded-full" /> Database Design (Mongo, SQL)</li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-purple-500/10 w-fit rounded-2xl border border-purple-500/20">
              <Sparkles className="text-purple-400" size={24} />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">AI<br />Integration</h3>
            <ul className="space-y-3 font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-bold">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full" /> AI Agents & Assistants</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full" /> API-based LLM Pipelines</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full" /> Automation Workflows</li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-blue-500/10 w-fit rounded-2xl border border-blue-500/20">
              <Workflow className="text-blue-400" size={24} />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">System<br />Design</h3>
            <ul className="space-y-3 font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-bold">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Scalable Architecture</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Clean API Structures</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> Performance Optimization</li>
            </ul>
          </div>
        </motion.section>

        {/* 4. Tech Stack */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="space-y-12 bg-zinc-900/30 p-12 rounded-3xl border border-white/5"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-8">
              <h3 className="font-mono text-xs text-mint uppercase tracking-[0.2em] font-bold">Engineering_Stack</h3>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-zinc-300 uppercase italic tracking-widest">Frontend</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">React 19, Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-zinc-300 uppercase italic tracking-widest">Backend</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">Node.js, Express.js, Python, REST APIs, WebSocket Orchestration</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-zinc-300 uppercase italic tracking-widest">Databases</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">MongoDB, PostgreSQL, Redis, Vector Databases (Pinecone)</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-zinc-300 uppercase italic tracking-widest">AI / Tools</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">OpenAI/Gemini APIs, Prompt Engineering, LangChain, Git, Vercel</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 5. Key Projects (Money Section) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="space-y-16"
        >
          <div className="space-y-4 text-center">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">The <span className="text-mint">Value</span> Section.</h2>
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Evidence of high-performance engineering</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                id: "01",
                title: "Banking System",
                desc: "High-security financial transaction engine.",
                tags: ["Finance", "Security", "Logic"],
                features: ["Transaction processing", "Account management", "Audit logging"]
              },
              {
                id: "02",
                title: "RBAC Management System",
                desc: "Enterprise-grade Role-Based Access Control.",
                tags: ["Security", "Access Control"],
                features: ["Permission mapping", "Role hierarchies", "Session management"]
              },
              {
                id: "03",
                title: "Full Stack Apps",
                desc: "MERN-based enterprise management platforms.",
                tags: ["End-to-End", "Auth", "CRUD"],
                features: ["Authentication systems", "Centralized Dashboards", "API Integration"]
              },
              {
                id: "04",
                title: "AI Systems",
                desc: "Next-gen intelligent autonomous agents.",
                tags: ["Future-Ready", "Intelligence"],
                features: ["AI assistant concepts", "Automation workflows", "API Pipelines"]
              },
              {
                id: "05",
                title: "Automation System",
                desc: "Intelligent workflow automation and task orchestration.",
                tags: ["Automation", "Workflow", "Efficiency"],
                features: ["Event-driven triggers", "Multi-step orchestration", "Error handling"]
              }
            ].map((p) => (
              <div key={p.id} className="group p-8 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-mint/30 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl font-black text-white/5 group-hover:text-mint/10 transition-colors">{p.id}</span>
                  <div className="flex gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="px-2 py-1 bg-white/5 rounded text-[8px] font-mono uppercase tracking-widest text-zinc-500">{t}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{p.title}</h3>
                <p className="text-zinc-500 text-sm mb-6">{p.desc}</p>
                <ul className="space-y-2 border-t border-white/5 pt-6 font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <Zap size={10} className="text-mint" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 6. Process */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="space-y-20"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">How I Build <span className="text-mint">Systems</span>.</h2>
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Linear Engineering Process</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
             {[
               { icon: Terminal, label: "Understand", desc: "Business Goal & User Flow" },
               { icon: Database, label: "Design", desc: "Arch & Data Flow" },
               { icon: Code2, label: "Develop", desc: "Clean & Modular" },
               { icon: Activity, label: "Optimize", desc: "Perf & UX" },
               { icon: Rocket, label: "Deploy", desc: "Production Ready" }
             ].map((step, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center text-center p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                 <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-mint border border-white/10 group-hover:scale-110 transition-transform">
                   <step.icon size={20} />
                 </div>
                 <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white mb-2 font-bold">{step.label}</h4>
                 <p className="text-zinc-500 text-[10px] leading-relaxed font-bold uppercase">{step.desc}</p>
               </div>
             ))}
          </div>
        </motion.section>

        {/* 7. What Makes Me Different */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-mint/5 p-12 rounded-3xl border border-mint/10"
        >
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight">
            I think in <span className="text-mint">systems</span>, not just pages.
          </h2>
          <div className="space-y-6">
            <p className="text-zinc-400 leading-relaxed font-medium">
              By combining AI, Web Architecture, and core Logic, I build software that doesn't just look good but solves complex operational bottlenecks.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest font-bold text-white">
                <ShieldCheck size={14} className="text-mint" /> Clean Architecture
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest font-bold text-white">
                <Zap size={14} className="text-mint" /> Real-world Usability
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest font-bold text-white">
                <Cpu size={14} className="text-mint" /> High Performance
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest font-bold text-white">
                <Globe size={14} className="text-mint" /> Global Scalability
              </div>
            </div>
          </div>
        </motion.section>

        {/* 8 & 9. Work & Engagement */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="p-10 bg-zinc-900/50 border border-white/5 rounded-3xl space-y-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold">Ideal_Work</h3>
            <div className="space-y-4">
              {["AI-Powered Web Apps", "Full-Stack Platforms (MERN)", "Automation Tools", "MVP development for startups"].map(item => (
                <div key={item} className="text-2xl font-black uppercase italic tracking-tighter text-white">{item}</div>
              ))}
            </div>
          </div>
          <div className="p-10 bg-zinc-900/50 border border-white/5 rounded-3xl space-y-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold">Engagement_Model</h3>
            <div className="space-y-4">
              {["Project-based work", "MVP builds", "Feature development", "System optimization"].map(item => (
                <div key={item} className="text-2xl font-black uppercase italic tracking-tighter text-white">{item}</div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 10. Call to Action */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center py-20 bg-gradient-to-b from-transparent to-mint/5 rounded-3xl border border-white/5"
        >
          <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-12">
            Let’s build <span className="text-mint">something</span><br />scalable & intelligent.
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a 
              href="https://wa.me/919259269317"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-white text-black font-black rounded-full text-xl hover:scale-110 transition-transform flex items-center gap-3"
            >
              <MessageCircle size={24} /> WhatsApp
            </a>
            <a 
              href="mailto:amanbam604@gmail.com"
              className="px-12 py-5 bg-zinc-900 text-white font-black rounded-full text-xl hover:scale-110 transition-transform flex items-center gap-3 border border-white/10"
            >
              <Mail size={24} /> Email
            </a>
          </div>

          <div className="mt-20 font-mono text-[10px] uppercase tracking-widest text-zinc-500 flex flex-col items-center gap-4">
            <p>aman-bam.portfolio</p>
            <div className="h-[1px] w-20 bg-white/10" />
            <p>2026 // Capability Statement</p>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default CapabilityDeck;
