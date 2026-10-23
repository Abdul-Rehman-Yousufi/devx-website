import { useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Magnetic } from './Magnetic';
import { Sliders, Sparkles, ArrowRight, Menu, X } from 'lucide-react';

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'outcomes', label: 'Why Devx' },
  { id: 'leadership', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0.8, 0.96]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0.08, 0.2]);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
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
        className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between transition-all duration-300"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(8, 8, 8, ${v})`),
          backdropFilter: 'blur(16px)',
          borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(223, 169, 0, ${v})`),
        }}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group text-left outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#DFA900] to-[#B8860B] flex items-center justify-center font-bold text-[#0A0600] text-sm shadow-[0_0_12px_rgba(223,169,0,0.4)]">
              D
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white tracking-tight leading-none group-hover:text-gold transition-colors">
                DEVX<span className="text-gold">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                Solutions
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/[0.06]"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Actions: Consultation CTA & Studio Access */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate('/studio')}
            className="text-white/40 hover:text-gold text-xs font-medium px-3 py-2 rounded-full hover:bg-white/[0.04] transition-colors flex items-center gap-1.5"
            title="Studio / Content Admin"
          >
            <Sliders size={13} />
            <span>Studio</span>
          </button>

          <Magnetic>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-bold transition duration-300 active:scale-[0.98] bg-[linear-gradient(135deg,#DFA900_0%,#F6C400_100%)] text-[#0A0600] shadow-[0_0_20px_rgba(223,169,0,0.25)] hover:shadow-[0_0_30px_rgba(223,169,0,0.45)] hover:-translate-y-0.5"
            >
              Get Free Consultation
            </button>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => scrollTo('contact')}
            className="text-[11px] font-bold bg-gold text-[#0A0600] px-3 py-1.5 rounded-full"
          >
            Consultation
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-center items-center gap-6 p-8"
          >
            <div className="w-full max-w-sm flex flex-col items-center gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="w-full py-3 text-lg font-semibold text-white/80 hover:text-gold text-center border-b border-white/[0.06] transition-colors"
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  scrollTo('contact');
                }}
                className="w-full mt-4 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#DFA900] to-[#F6C400] text-[#0A0600] shadow-lg shadow-gold/20"
              >
                Get Free Consultation
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/studio');
                }}
                className="w-full py-2.5 rounded-full text-xs font-semibold text-white/50 hover:text-white border border-white/10 flex items-center justify-center gap-2 mt-2"
              >
                <Sliders size={14} /> Team Studio Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
