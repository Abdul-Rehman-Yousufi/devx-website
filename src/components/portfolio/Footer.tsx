import { Link } from 'react-router-dom';
import { LinkedInLogoIcon as Linkedin } from '@radix-ui/react-icons';
import { Sliders, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#080808] text-white py-14 px-5 sm:px-8 lg:px-12 relative border-t border-white/[0.06]">
      <div className="gold-divider absolute top-0 left-0 right-0" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white tracking-tight">
              DEVX<span className="text-gold">.</span>
            </span>
            <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">
              Solutions
            </span>
          </div>
          <p className="text-xs text-white/45 max-w-sm text-center md:text-left leading-relaxed">
            Enterprise software development agency building high-performance web applications, mobile apps, SaaS platforms, and AI systems.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex items-center flex-wrap justify-center gap-6 text-xs text-white/60 font-medium">
          <a href="#hero" className="hover:text-gold transition-colors">Home</a>
          <a href="#portfolio" className="hover:text-gold transition-colors">Portfolio</a>
          <a href="#outcomes" className="hover:text-gold transition-colors">Why Devx</a>
          <a href="#leadership" className="hover:text-gold transition-colors">About</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          <Link to="/studio" className="text-gold hover:text-white transition-colors flex items-center gap-1.5 font-semibold">
            <Sliders size={13} /> Team Studio
          </Link>
        </div>

        {/* Social & Legal */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <a
            href="https://www.linkedin.com/company/devx-sols/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-gold transition-colors rounded-full border border-white/10 px-4 py-1.5 bg-white/[0.03]"
          >
            <Linkedin className="w-3.5 h-3.5 text-gold" />
            <span>LinkedIn Profile</span>
          </a>
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} Devx Solutions Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
