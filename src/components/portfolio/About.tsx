import { motion } from 'framer-motion';
import { ExternalLink, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { LinkedInLogoIcon as Linkedin } from '@radix-ui/react-icons';

const ceoData = {
  name: 'Rafaqat Ali',
  title: 'Chief Executive Officer & Founder',
  image: '/images/team/Rafaqat Ali.jpeg',
  bio: 'Rafaqat Ali leads Devx Solutions with a steadfast commitment to engineering precision, architectural durability, and strategic product delivery. Under his leadership, Devx Solutions has engineered high-throughput platforms for international clients, bridging the gap between cutting-edge AI breakthroughs and dependable enterprise software.',
  quote: '“We do not view software as mere lines of code. We architect scalable digital infrastructure that fundamentally propels our partners ahead of their competition.”',
  linkedin: 'https://www.linkedin.com/company/devx-sols/'
};

const pillars = [
  { label: 'Founded', value: 'Global Engineering Collective' },
  { label: 'Focus', value: 'Web & Mobile • SaaS • AI Workflows' },
  { label: 'Standard', value: 'Enterprise QA & Zero Downtime' },
  { label: 'Partnership', value: 'Active Long-Term Global Clients' },
];

export const About = () => {
  return (
    <section id="leadership" className="py-24 sm:py-32 bg-[#080808] text-white relative border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Executive Leadership
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Engineering with{" "}
            <span className="gold-gradient-text">
              strategic purpose
            </span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            Led by seasoned engineering leadership, Devx Solutions partners with ambitious companies to build software that scales reliably.
          </p>
        </div>

        {/* CEO Profile Card */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/[0.08] bg-[#0E0E0E] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle gold ambient glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full blur-3xl bg-[rgba(223,169,0,0.08)]" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* CEO Photo */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-gold/30 shadow-[0_0_30px_rgba(223,169,0,0.15)] mb-5">
                <img
                  src={ceoData.image}
                  alt={ceoData.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder if image not found
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                {ceoData.name}
              </h3>
              <p className="text-xs uppercase tracking-[0.16em] text-gold font-semibold mt-1">
                {ceoData.title}
              </p>

              <a
                href={ceoData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/70 hover:border-gold/50 hover:text-gold transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>Connect on LinkedIn</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* CEO Biography & Quote */}
            <div className="md:col-span-7 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/[0.08] pt-6 md:pt-0 md:pl-10">
              <blockquote className="text-base sm:text-lg text-white/90 italic leading-relaxed mb-6 font-medium">
                {ceoData.quote}
              </blockquote>

              <p className="text-sm leading-relaxed text-white/55 mb-8">
                {ceoData.bio}
              </p>

              {/* Pillars row */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.06]">
                {pillars.map((item, i) => (
                  <div key={i}>
                    <p className="text-[11px] uppercase tracking-wider text-white/40 font-medium">
                      {item.label}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white/80 mt-0.5">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
