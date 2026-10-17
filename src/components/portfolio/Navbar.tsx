import { useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Magnetic } from './Magnetic';
import { InstagramLogoIcon as Instagram } from '@radix-ui/react-icons';
import { Sliders, ShieldCheck } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'WORK' },
  { id: 'skills', label: 'CAPABILITIES' },
  { id: 'experience', label: 'JOURNEY' },
  { id: 'estimator', label: 'ESTIMATOR' },
  { id: 'contact', label: 'CONTACT' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);
  const blur = useTransform(scrollY, [0, 80], [0, 14]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    if (id === 'video-portfolio') {
      navigate('/video-portfolio');
      return;
    }
    
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [navigate]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(255,255,255,${v})`),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(0,0,0,${v})`),
        }}
      >
        <Magnetic>
          <button onClick={() => scrollTo('hero')} className="font-display font-extrabold text-xl text-blue-600 tracking-tight flex items-center gap-2" data-cursor="link">
            <span>DEVX</span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              SOLUTIONS
            </span>
          </button>
        </Magnetic>

        <div className="hidden md:flex items-center gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              onMouseEnter={() => setHoveredDot(s.id)}
              onMouseLeave={() => setHoveredDot(null)}
              className="relative flex items-center justify-center p-2 group"
              data-cursor="link"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-blue-600 transition-colors" />
              
              <AnimatePresence>
                {hoveredDot === s.id && (
                  <motion.span
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute bottom-full mb-2 px-2.5 py-1 bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 font-mono text-[9px] tracking-widest uppercase rounded pointer-events-none whitespace-nowrap z-50 shadow-xl"
                  >
                    {s.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate('/admin')}
            className="font-mono text-[11px] text-slate-500 hover:text-blue-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            title="Studio / Admin Portal"
            data-cursor="link"
          >
            <Sliders size={13} /> STUDIO
          </button>

          <span className="flex items-center gap-2 font-mono text-[11px] text-text-secondary">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            AVAILABLE
          </span>

          <Magnetic>
            <motion.button
              onClick={() => scrollTo('contact')}
              className="font-mono text-[11px] tracking-wider border border-blue-600/40 text-blue-600 px-4 py-2 hover:bg-blue-600 hover:text-white rounded-full transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor="link"
            >
              GET IN TOUCH
            </motion.button>
          </Magnetic>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 z-50 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor="link"
          aria-label="Toggle menu"
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="block w-6 h-px bg-foreground" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-px bg-foreground" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="block w-6 h-px bg-foreground" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-6 p-6"
          >
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(s.id)}
                className="font-display font-bold text-2xl text-slate-900 hover:text-blue-600 transition-colors"
                data-cursor="link"
              >
                {s.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                setMenuOpen(false);
                navigate('/admin');
              }}
              className="font-mono text-sm uppercase text-blue-600 bg-blue-50 px-6 py-2.5 rounded-full border border-blue-200 mt-4"
              data-cursor="link"
            >
              Project Studio / Admin
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
