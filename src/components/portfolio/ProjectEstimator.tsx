import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Check, ArrowRight, Sparkles, Clock, DollarSign, Send } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface Option {
  id: string;
  label: string;
  basePrice: number;
  weeks: number;
  desc?: string;
}

const PROJECT_TYPES: Option[] = [
  { id: 'saas', label: 'Full-Stack SaaS Platform', basePrice: 12000, weeks: 6, desc: 'Web apps with multi-tenancy, billing & auth' },
  { id: 'ai', label: 'AI Agent & LLM Solution', basePrice: 9000, weeks: 4, desc: 'Custom AI workflows, RAG & agentic systems' },
  { id: 'mobile', label: 'Cross-Platform Mobile App', basePrice: 14000, weeks: 7, desc: 'React Native iOS & Android unified client' },
  { id: 'erp', label: 'Enterprise Internal ERP / CRM', basePrice: 16000, weeks: 8, desc: 'Complex role portals, payroll & data tables' },
];

const ADDONS = [
  { id: 'auth', label: 'Enterprise SSO & RBAC', price: 2000, weeks: 1 },
  { id: 'payments', label: 'Stripe Billing & Subscriptions', price: 2500, weeks: 1.5 },
  { id: 'ai_widget', label: 'Custom AI Chat / Copilot', price: 3500, weeks: 2 },
  { id: 'analytics', label: 'Real-Time Telemetry & Dashboards', price: 2000, weeks: 1 },
  { id: 'cloud', label: 'AWS/GCP Auto-scaling DevOps', price: 3000, weeks: 1.5 },
  { id: 'design', label: 'Bespoke UI/UX Design System', price: 2500, weeks: 1 },
];

const TIMELINES = [
  { id: 'rush', label: 'Accelerated / High Speed', multiplier: 1.25, timeReduction: 0.75 },
  { id: 'standard', label: 'Standard Agile Delivery', multiplier: 1.0, timeReduction: 1.0 },
  { id: 'flexible', label: 'Flexible / Phased Milestone', multiplier: 0.9, timeReduction: 1.25 },
];

export const ProjectEstimator = () => {
  const [selectedType, setSelectedType] = useState<string>('saas');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['auth', 'payments']);
  const [selectedTimeline, setSelectedTimeline] = useState<string>('standard');

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const base = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];
    const timeline = TIMELINES.find((t) => t.id === selectedTimeline) || TIMELINES[1];

    const addonsCost = selectedAddons.reduce((sum, id) => {
      const item = ADDONS.find((a) => a.id === id);
      return sum + (item ? item.price : 0);
    }, 0);

    const addonsWeeks = selectedAddons.reduce((sum, id) => {
      const item = ADDONS.find((a) => a.id === id);
      return sum + (item ? item.weeks : 0);
    }, 0);

    const rawTotal = (base.basePrice + addonsCost) * timeline.multiplier;
    const rawWeeks = (base.weeks + addonsWeeks) * timeline.timeReduction;

    const minPrice = Math.round((rawTotal * 0.9) / 500) * 500;
    const maxPrice = Math.round((rawTotal * 1.15) / 500) * 500;
    const estWeeks = Math.max(2, Math.round(rawWeeks));

    return {
      minPrice,
      maxPrice,
      weeks: estWeeks,
      summary: `${base.label} with ${selectedAddons.length} technical modules`,
    };
  }, [selectedType, selectedAddons, selectedTimeline]);

  const handleApplyToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Pre-fill message textarea if available
      const textarea = contactSection.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null;
      if (textarea) {
        const text = `Hi Devx team, I configured an estimate on your website for a ${calculation.summary}. Estimated budget range: $${calculation.minPrice.toLocaleString()} - $${calculation.maxPrice.toLocaleString()} (${calculation.weeks} weeks timeline). Let's discuss details!`;
        textarea.value = text;
        textarea.focus();
      }
    }
  };

  return (
    <section id="estimator" className="py-28 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-blue-600 mb-3 font-bold">
          006 — INTERACTIVE SCOPE ESTIMATOR
        </p>
        <h2 className="font-display font-black tracking-tight text-3xl sm:text-5xl md:text-6xl text-foreground">
          Plan Your <span className="text-blue-600">Investment</span>.
        </h2>
        <p className="text-text-secondary text-base mt-4">
          Instant, transparent ballpark scoping based on enterprise engineering standards. Select your architecture needs below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration Steps */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100">
          {/* Step 1: Core Type */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
              1. Select Solution Architecture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((pt) => {
                const isSelected = selectedType === pt.id;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setSelectedType(pt.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-slate-900">{pt.label}</span>
                      {isSelected && <Check size={16} className="text-blue-600" />}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{pt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Capabilities & Modules */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
              2. Technical Modules & Integrations
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl text-left text-xs font-mono flex items-center justify-between border transition-all ${
                      isChecked
                        ? 'border-blue-600 bg-blue-50/40 text-blue-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{addon.label}</span>
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                        isChecked
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isChecked && <Check size={12} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Speed & Timeline */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
              3. Delivery Pace
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {TIMELINES.map((tl) => (
                <button
                  key={tl.id}
                  type="button"
                  onClick={() => setSelectedTimeline(tl.id)}
                  className={`p-3 rounded-xl text-center text-xs font-mono border transition-all ${
                    selectedTimeline === tl.id
                      ? 'border-blue-600 bg-blue-600 text-white font-bold shadow'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  {tl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Scoping Result Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-2xl sticky top-28">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold">
              ESTIMATED PROJECT SCOPE
            </p>
          </div>

          <div className="mb-8">
            <p className="text-xs font-mono text-slate-400 mb-1">Estimated Investment Range</p>
            <div className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              ${calculation.minPrice.toLocaleString()}{' '}
              <span className="text-blue-400 text-3xl font-light">–</span> ${calculation.maxPrice.toLocaleString()}
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-2">
              *All estimates include architecture, testing, deployment, and 30-day warranty.
            </p>
          </div>

          <div className="space-y-4 py-6 border-y border-slate-800 mb-8">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-2">
                <Clock size={15} className="text-blue-400" /> Projected Sprint Duration:
              </span>
              <span className="font-bold text-white">~{calculation.weeks} Weeks</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-2">
                <Sparkles size={15} className="text-emerald-400" /> Engineering Velocity:
              </span>
              <span className="font-bold text-emerald-400">Full Agile CI/CD</span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-2">
                <DollarSign size={15} className="text-amber-400" /> Payment Structure:
              </span>
              <span className="font-bold text-white">Milestone Based</span>
            </div>
          </div>

          <Magnetic className="w-full">
            <button
              onClick={handleApplyToContact}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 group"
            >
              Transfer Scope to Contact <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default ProjectEstimator;
