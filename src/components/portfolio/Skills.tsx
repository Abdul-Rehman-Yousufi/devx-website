import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  ChevronRight,
  ExternalLink,
  LayoutGrid,
  Server,
  Cpu,
  Database,
  Terminal,
  Zap,
  Blocks,
  Network,
  Film
} from 'lucide-react';

type Proficiency = 'Expert' | 'Advanced' | 'Proficient' | 'Learning';

interface Skill {
  name: string;
  proficiency: Proficiency;
  statement?: string;
  projectLink?: string;
  icon?: React.ReactNode;
}

interface SkillGroup {
  label: string;
  color: string;
  accent: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Frontend Systems',
    color: 'emerald',
    accent: '#10b981',
    icon: <LayoutGrid className="w-4 h-4" />,
    skills: [
      { 
        name: 'React 19', 
        proficiency: 'Expert', 
        statement: 'Mastery of Concurrent Rendering, Server Components, and the Transition API for high-performance apps.',
        projectLink: '#projects'
      },
      { 
        name: 'TypeScript', 
        proficiency: 'Expert', 
        statement: 'Advanced type engineering and zero-runtime-error architectures for complex enterprise systems.',
        projectLink: '#projects'
      },
      { 
        name: 'Next.js 15', 
        proficiency: 'Expert', 
        statement: 'Expertise in App Router orchestration, Streaming SSR, and hybrid caching strategies.',
        projectLink: '#projects'
      },
      { name: 'Tailwind CSS', proficiency: 'Advanced' },
      { name: 'Framer Motion', proficiency: 'Advanced' },
      { name: 'Three.js', proficiency: 'Proficient' },
      { name: 'GSAP', proficiency: 'Advanced' },
    ]
  },
  {
    label: 'Backend & Architecture',
    color: 'amber',
    accent: '#f59e0b',
    icon: <Database className="w-4 h-4" />,
    skills: [
      { 
        name: 'Node.js', 
        proficiency: 'Expert', 
        statement: 'Building high-throughput, event-driven microservices and real-time WebSocket systems.',
        projectLink: '#projects'
      },
      { name: 'Express', proficiency: 'Expert' },
      { 
        name: 'Python', 
        proficiency: 'Expert', 
        statement: 'High-performance microservices, automated pipelines, and enterprise Django ORM architecture.',
        projectLink: '#projects'
      },
      { name: 'Django REST', proficiency: 'Expert' },
      { name: 'PostgreSQL', proficiency: 'Advanced' },
      { name: 'MongoDB', proficiency: 'Advanced' },
      { name: 'Redis', proficiency: 'Advanced' },
    ]
  },
  {
    label: 'AI & Intelligence',
    color: 'violet',
    accent: '#8b5cf6',
    icon: <Cpu className="w-4 h-4" />,
    skills: [
      { name: 'Agentic Workflows', proficiency: 'Expert' },
      { name: 'Prompt Engineering', proficiency: 'Expert' },
      { 
        name: 'LLM Orchestration', 
        proficiency: 'Advanced',
        statement: 'Integrating Gemini/GPT with tool-calling and RAG for intelligent autonomous agents.'
      },
      { name: 'Vector DBs', proficiency: 'Proficient' },
    ]
  },
  {
    label: 'Video & Motion Design',
    color: 'pink',
    accent: '#ec4899',
    icon: <Film className="w-4 h-4" />,
    skills: [
      { 
        name: 'Premiere Pro', 
        proficiency: 'Expert', 
        statement: 'Mastery of short-form retention editing, dynamic timeline pacing, multi-cam synchronization, and sound FX layering.',
        projectLink: '/video-portfolio'
      },
      { 
        name: 'After Effects', 
        proficiency: 'Expert', 
        statement: 'Advanced motion tracking, custom 3D VFX rendering, rotoscoping, kinetic typography, and glowing visual assets.',
        projectLink: '/video-portfolio'
      },
      { name: 'DaVinci Resolve', proficiency: 'Advanced' },
      { name: 'Color Grading', proficiency: 'Advanced' },
      { name: 'Sound Design & FX', proficiency: 'Advanced' },
    ]
  }
];

const CoreSkillTile = memo(({ skill, color, accent }: { skill: Skill, color: string, accent: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="col-span-2 row-span-2 group relative bg-white border border-slate-200 shadow-sm rounded-xl p-8 flex flex-col justify-between overflow-hidden"
  >
    {/* Animated Background Gradient */}
    <div 
      className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
      style={{ backgroundColor: accent }}
    />
    
    <div className="relative z-10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 group-hover:border-slate-300 transition-colors">
            <Blocks className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border border-slate-200 text-slate-500 bg-slate-50">
            {skill.proficiency}
          </span>
        </div>
        {skill.projectLink && (
          <motion.a 
            whileHover={{ scale: 1.1 }}
            href={skill.projectLink} 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-4xl font-black tracking-tighter text-slate-900 leading-none">
          {skill.name}
        </h3>
        <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-sm">
          {skill.statement}
        </p>
      </div>
    </div>
    
    <div className="relative z-10 flex items-center gap-4 pt-6">
      <div className="h-[2px] flex-1 bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          whileInView={{ x: '0%' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full w-full"
          style={{ backgroundColor: accent }}
        />
      </div>
      <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em]">System_Critical</span>
    </div>

    {/* Decorative Border Glow */}
    <div 
      className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-500 rounded-xl" 
      style={{ boxShadow: `inset 0 0 40px ${accent}05` }}
    />
  </motion.div>
));

const StandardSkillTile = memo(({ skill, accent }: { skill: Skill, accent: string }) => (
  <motion.div
    whileHover={{ y: -3, scale: 1.02 }}
    className="col-span-1 row-span-1 bg-white border border-slate-200 shadow-sm rounded-xl p-5 flex flex-col justify-between group relative overflow-hidden transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <h4 className="font-display font-bold text-base text-slate-900 tracking-tight">{skill.name}</h4>
      <div className="p-1.5 rounded-md bg-slate-50 border border-slate-200 group-hover:border-slate-300">
        <Network className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900" />
      </div>
    </div>
    
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full ${i <= 3 ? '' : 'opacity-20'}`}
              style={{ backgroundColor: i <= 3 ? accent : 'currentColor' }}
            />
          ))}
        </div>
      </div>
      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
        {skill.proficiency}
      </span>
    </div>

    {/* Subtle Hover Glow */}
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      style={{ background: `radial-gradient(circle at top right, ${accent}10, transparent 70%)` }}
    />
  </motion.div>
));

const MicroSkillTile = memo(({ skill, accent }: { skill: Skill, accent: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="col-span-1 row-span-1 bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 flex items-center justify-between group transition-all duration-300"
  >
    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
      {skill.name}
    </span>
    <div 
      className={`w-1.5 h-1.5 rounded-full ${skill.proficiency === 'Learning' ? 'animate-pulse' : 'opacity-40'}`}
      style={{ backgroundColor: accent }}
    />
  </motion.div>
));

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const tileVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

const Skills = () => {
  const [activeGroup, setActiveGroup] = useState(0);
  const navigate = useNavigate();

  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden bg-slate-50">
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] opacity-[0.03] pointer-events-none rounded-full" style={{ backgroundColor: SKILL_GROUPS[activeGroup].accent }} />
      
      {/* Section Header */}
      <div className="relative mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-12" style={{ backgroundColor: SKILL_GROUPS[activeGroup].accent }} />
          <p className="font-mono text-[11px] tracking-[0.4em] uppercase font-bold" style={{ color: SKILL_GROUPS[activeGroup].accent }}>
            System Intelligence / 04
          </p>
        </motion.div>
        
        <h2 className="font-display font-black tracking-tighter leading-[0.85] text-slate-900 mb-8" style={{ fontSize: 'clamp(48px, 10vw, 110px)' }}>
          TECHNICAL<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-400">
            MATRIX.
          </span>
        </h2>
      </div>

      {/* Modern Category Navigation */}
      <div className="flex flex-wrap gap-3 mb-16">
        {SKILL_GROUPS.map((group, i) => (
          <button
            key={group.label}
            onClick={() => setActiveGroup(i)}
            className={`group relative flex items-center gap-3 px-6 py-3 rounded-xl font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden border ${
              activeGroup === i 
              ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:text-slate-900 shadow-sm'
            }`}
          >
            <span className={`relative z-10 transition-colors duration-300 ${activeGroup === i ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-900'}`}>
              {group.icon}
            </span>
            <span className="relative z-10 font-bold">{group.label}</span>
            
            {/* Status Dot */}
            <span className="relative z-10 flex h-1.5 w-1.5 ml-1">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`} style={{ backgroundColor: group.accent }}></span>
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5`} style={{ backgroundColor: group.accent }}></span>
            </span>

            {/* Hover Background Effect */}
            {activeGroup !== i && (
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: group.accent }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className="relative min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeGroup}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]"
          >
            {SKILL_GROUPS[activeGroup].skills.map((skill) => {
              let Content;
              if (skill.proficiency === 'Expert') {
                Content = <CoreSkillTile skill={skill} color={SKILL_GROUPS[activeGroup].color} accent={SKILL_GROUPS[activeGroup].accent} />;
              } else if (skill.proficiency === 'Advanced') {
                Content = <StandardSkillTile skill={skill} accent={SKILL_GROUPS[activeGroup].accent} />;
              } else {
                Content = <MicroSkillTile skill={skill} accent={SKILL_GROUPS[activeGroup].accent} />;
              }

              return (
                <motion.div 
                  key={skill.name} 
                  variants={tileVariants}
                  className={skill.proficiency === 'Expert' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
                >
                  {Content}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Callout */}
      <div className="mt-32 pt-16 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-xl border border-white/10 bg-zinc-900 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:opacity-50 transition-opacity" />
                  <Terminal className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full border border-dashed border-white/20" 
            />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-mono text-slate-900 font-bold uppercase tracking-widest">Architectural Proficiency</p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Specialized in <span className="text-slate-900">Distributed Architectures</span> & <span className="text-slate-900">Neural Orchestration</span>.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <button 
            onClick={() => navigate('/capability-deck')}
            className="group relative flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-display font-bold text-sm hover:bg-slate-800 transition-all duration-300 w-full sm:w-auto shadow-lg"
          >
            <Zap className="w-4 h-4 fill-current text-blue-400" />
            ACCESS CAPABILITY DECK
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button 
            onClick={() => navigate('/video-portfolio')}
            className="group relative flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-pink-500 text-slate-800 px-8 py-4 rounded-xl font-display font-bold text-sm hover:bg-pink-50/50 transition-all duration-300 w-full sm:w-auto shadow-sm"
          >
            <Film className="w-4 h-4 text-pink-500" />
            VIEW VIDEO REELS
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 text-pink-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
