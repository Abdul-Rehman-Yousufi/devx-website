import { useEffect, useRef } from 'react';
import { 
  GitHubLogoIcon as Github, 
  LinkedInLogoIcon as Linkedin, 
  InstagramLogoIcon as Instagram,
  EnvelopeClosedIcon as Mail 
} from '@radix-ui/react-icons';
import { ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnetic } from './Magnetic';

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
    <footer className="bg-background py-8 px-6 md:px-12 relative overflow-hidden">
      <div ref={lineRef} className="h-px bg-mint/30 mb-8 origin-left" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-mono text-xs text-text-secondary">
            Designed & built by <span className="hover:text-mint transition-colors">Devx Solutions</span>
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Verified by Playwright E2E</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {[
            { Icon: Linkedin, url: '#', label: 'LinkedIn' },
            { Icon: Mail, url: 'mailto:hello@devxsolutions.com', label: 'Email' }
          ].map(({ Icon, url, label }, i) => (
            <Magnetic key={i}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-mint transition-colors" aria-label={label} data-cursor="link">
                <Icon width={20} height={20} />
              </a>
            </Magnetic>
          ))}
        </div>
        <p className="font-mono text-xs text-text-secondary">
          © 2026 Devx Solutions
        </p>
      </div>
    </footer>
  );
};

export default Footer;
