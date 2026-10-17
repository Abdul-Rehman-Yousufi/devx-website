import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  GitHubLogoIcon as Github,
  LinkedInLogoIcon as Linkedin,
  InstagramLogoIcon as Instagram,
} from "@radix-ui/react-icons";
import { useToast } from "../../hooks/use-toast";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const glowOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 0.4]);
  const scale = useTransform(scrollYProgress, [0.8, 0.9], [0.95, 1]);

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
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("sent");
        form.reset();
        toast({
          title: "Message received!",
          description: "Thank you for reaching out. Our engineering team will review and get back to you shortly.",
        });
      } else {
        const errorData = await response.json();
        setStatus("idle");
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: errorData.error || "There was a problem sending your message. Please try again.",
        });
      }
    } catch (error) {
      setStatus("idle");
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  }, [toast]);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Background Reveal Text - Bolder opacity */}
      <motion.div 
        style={{ x: textX, opacity: useTransform(scrollYProgress, [0.6, 0.85], [0, 0.1]) }}
        className="absolute bottom-0 left-0 whitespace-nowrap pointer-events-none select-none -z-10 hidden md:block"
      >
        <h2 className="text-[25vw] font-black text-slate-100 leading-none tracking-tighter italic uppercase">
          LET'S BUILD TOGETHER
        </h2>
      </motion.div>

      {/* Decorative Glow */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute -bottom-48 -right-48 w-96 h-96 bg-mint/30 rounded-full blur-[120px] pointer-events-none"
      />

      <p className="font-mono text-[12px] tracking-[0.3em] uppercase text-mint mb-6 font-bold">
        007 — LET'S TALK
      </p>
      <h2
        className="font-display font-black tracking-tighter leading-[0.9] mb-20"
        style={{ fontSize: "clamp(54px, 10vw, 100px)" }}
      >
        READY TO
        <br />
        BUILD <span className="text-blue-600">TOGETHER</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        <div className="lg:w-1/2">
          <p className="font-editorial text-xl md:text-2xl text-text-primary leading-tight mb-10">
            We are currently accepting new clients and exciting projects. If you're looking for a dedicated team to build robust, scalable software solutions for your business — let's talk.
          </p>

          <div className="flex items-center gap-3 font-mono text-sm text-foreground mb-10 bg-mint/10 w-fit px-4 py-2 rounded-full border border-mint/20 font-bold">
            <motion.span
              className="w-2 h-2 rounded-full bg-mint"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            AVAILABLE NOW
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Linkedin,
                label: "LinkedIn • /company/devx-sols",
                href: "https://www.linkedin.com/company/devx-sols/",
              },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-text-primary hover:text-blue-600 transition-colors group font-bold text-lg"
                data-cursor="link"
              >
                <Icon size={20} />
                <span className="relative">
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mint group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <motion.div 
          style={{ scale }}
          className="lg:w-1/2"
        >
          <form 
            onSubmit={handleSubmit} 
            className="space-y-10 bg-white p-8 md:p-14 rounded-[3rem] border border-slate-200 shadow-xl relative group overflow-hidden"
          >
            {/* Form Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-mint/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 space-y-10">
              {[
                { name: "name", label: "NAME", type: "text" },
                { name: "email", label: "EMAIL", type: "email" },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="font-mono text-xs uppercase tracking-[0.25em] text-foreground block mb-3 font-black">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    required
                    className="w-full bg-transparent border-0 border-b-2 border-slate-200 text-slate-900 py-3 font-display text-lg font-bold focus:outline-none focus:border-mint transition-all duration-300 placeholder:text-slate-400"
                  />
                </div>
              ))}
              <div>
                <label className="font-mono text-xs uppercase tracking-[0.25em] text-foreground block mb-3 font-black">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-0 border-b-2 border-slate-200 text-slate-900 py-3 font-display text-lg font-bold focus:outline-none focus:border-mint transition-all duration-300 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-mint text-primary-foreground font-display font-black py-5 text-base tracking-[0.2em] rounded-2xl shadow-xl shadow-mint/30 uppercase"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                disabled={status !== "idle"}
                data-cursor="link"
              >
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Send Message
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Sending...
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      aria-live="polite"
                    >
                      ✓ Message Sent.
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
