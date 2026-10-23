import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, Send, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import { LinkedInLogoIcon as Linkedin } from "@radix-ui/react-icons";
import { useToast } from "../../hooks/use-toast";

export const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { toast } = useToast();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xbdbgeop", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
        toast({
          title: "Inquiry received!",
          description: "Thank you for reaching out. Our engineering team will review your project and get back to you within 24 hours.",
        });
      } else {
        const errorData = await response.json();
        setStatus("idle");
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: errorData.error || "There was a problem sending your message. Please try again or reach out on LinkedIn.",
        });
      }
    } catch {
      setStatus("idle");
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try connecting via LinkedIn.",
      });
    } finally {
      setTimeout(() => setStatus("idle"), 6000);
    }
  }, [toast]);

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#080808] text-white relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Main Card Container */}
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0E0E0E] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Project Inquiry Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 relative flex flex-col justify-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Start a Project
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Want to build{" "}
                <span className="gold-gradient-text">
                  something like this?
                </span>
              </h2>

              <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg">
                Tell us about your product vision and our engineering team will map out the ideal technical strategy, architecture, and timeline.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 font-medium mb-1.5">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Morgan • Acme Inc."
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 font-medium mb-1.5">
                    Contact Info
                  </label>
                  <input
                    type="text"
                    name="contact"
                    required
                    placeholder="Email address or LinkedIn profile"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 font-medium mb-1.5">
                    Project Requirements & Scope
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us what you want to build (SaaS, Mobile App, Web Platform, AI automations, etc.)..."
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center rounded-xl px-6 py-4 text-sm font-bold transition duration-300 active:scale-[0.98] bg-[linear-gradient(135deg,#DFA900_0%,#F6C400_100%)] text-[#0A0600] shadow-[0_0_25px_rgba(223,169,0,0.25)] hover:shadow-[0_0_35px_rgba(223,169,0,0.45)] hover:-translate-y-0.5 gap-2 cursor-pointer disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <span>Submitting Inquiry...</span>
                  ) : status === "sent" ? (
                    <span className="flex items-center gap-2">
                      <Check size={16} /> Inquiry Sent!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Request Free Consultation <ArrowRight size={16} />
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Right: What You Get For Free & LinkedIn Connection */}
            <div className="lg:col-span-5 bg-[#141414] p-8 sm:p-12 lg:p-16 border-t lg:border-t-0 lg:border-l border-white/[0.08] flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-6">
                  What you get for free
                </p>

                <ul className="space-y-4">
                  {[
                    "30-minute free strategy & architecture call",
                    "No financial commitment or lock-in required",
                    "Clear technical roadmap and stack recommendation",
                    "Fixed-price quote & sprint-by-sprint milestone plan",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span className="text-sm text-white/70 leading-snug">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Live Availability Pill */}
                <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                  </span>
                  <span className="text-xs font-semibold text-gold">
                    Currently accepting new projects
                  </span>
                </div>
              </div>

              {/* Direct LinkedIn Partnership */}
              <div className="mt-12 pt-8 border-t border-white/[0.08]">
                <p className="text-xs text-white/40 mb-3">
                  Prefer connecting directly with our leadership?
                </p>
                <a
                  href="https://www.linkedin.com/company/devx-sols/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gold transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-gold" />
                  <span>Devx Solutions on LinkedIn</span>
                  <ExternalLink size={13} className="text-white/40" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
