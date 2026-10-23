import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, TrendingUp, Layers, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const outcomes = [
  {
    num: "01",
    title: "Clear Conversion Paths",
    desc: "Cards, interfaces, and conversion funnels designed to turn casual visitors into qualified leads and paying enterprise partners.",
    icon: TrendingUp,
  },
  {
    num: "02",
    title: "Scalable Architecture",
    desc: "We engineer systems with battle-tested frameworks (Next.js, Python/Django, PostgreSQL, AWS) that comfortably scale to millions of requests.",
    icon: Layers,
  },
  {
    num: "03",
    title: "Premium Presentation",
    desc: "Refined visual interfaces and rigorous QA standards that earn immediate authority with global clients, investors, and stakeholders.",
    icon: ShieldCheck,
  },
];

export const Stats = () => {
  return (
    <section id="outcomes" className="relative py-24 sm:py-32 bg-[#0A0A0A] text-white border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold/80 mb-3">
            Project Standards & Quality
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Every project shaped around{" "}
            <span className="gold-gradient-text">
              business outcomes
            </span>
          </h2>
          <p className="mt-4 text-white/50 text-base leading-relaxed">
            We don&apos;t just deliver code. We design and build mission-critical digital infrastructure that directly accelerates company growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outcomes.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E0E0E] p-8 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-[0_10px_30px_rgba(223,169,0,0.08)]"
              >
                {/* Gold vertical accent bar on left */}
                <div className="absolute top-6 bottom-6 left-0 w-[2.5px] rounded-r-full bg-gradient-to-b from-transparent via-gold/50 to-transparent" />

                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold tracking-[0.2em] text-gold/50">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-white/50">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
