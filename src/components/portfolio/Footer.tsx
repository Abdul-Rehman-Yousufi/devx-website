import { useEffect, useRef } from 'react';
import { 
  GitHubLogoIcon as Github, 
  LinkedInLogoIcon as Linkedin, 
  InstagramLogoIcon as Instagram 
} from '@radix-ui/react-icons';
import { ShieldCheck, Sliders, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnetic } from './Magnetic';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleX: 0 }, {
          scaleX: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: lineRef.current, start: 'top 95%', once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-background py-12 px-6 md:px-12 relative overflow-hidden border-t border-slate-200">
      <div ref={lineRef} className="h-px bg-blue-500/20 mb-8 origin-left" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-mono text-xs text-text-secondary">
            Engineered by <span className="font-bold text-slate-900">Devx Solutions</span> — Global Software & AI Systems
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest font-bold">Enterprise QA Verified</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <Link to="/all-project" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
            All Works <ArrowUpRight size={12} />
          </Link>
          <Link to="/capability-deck" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
            Deck <ArrowUpRight size={12} />
          </Link>
          <Link to="/admin" className="text-blue-600 hover:text-blue-700 font-bold transition-colors flex items-center gap-1">
            <Sliders size={12} /> Studio
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {[
            { Icon: Linkedin, url: 'https://www.linkedin.com/company/devx-sols/', label: 'LinkedIn' }
          ].map(({ Icon, url, label }, i) => (
            <Magnetic key={i}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-blue-600 transition-colors" aria-label={label} data-cursor="link">
                <Icon width={20} height={20} />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="font-mono text-[10px] text-slate-400">
          © {new Date().getFullYear()} Devx Solutions Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
