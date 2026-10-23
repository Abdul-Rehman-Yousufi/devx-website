import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "../data/projectsStore";
import { Magnetic } from "../components/portfolio/Magnetic";
import {
  ChevronLeft,
  ExternalLink,
  Code2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Image as ImageIcon,
  X,
  Maximize2
} from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { getOptimizedImageUrl } from "../lib/imageUtils";

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const projectIndex = projects.findIndex((p) => p.id === projectId);
  const project = projects[projectIndex];
  const nextProject =
    projectIndex >= 0 && projectIndex < projects.length - 1
      ? projects[projectIndex + 1]
      : projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
        <h2 className="text-3xl font-bold mb-4 font-display">Project Not Found</h2>
        <p className="text-zinc-400 font-mono text-xs mb-8">
          The requested system slug does not exist or was archived.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase tracking-wider transition-colors"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  const accentColor = project.color || "#DFA900";
  const mainImage = getOptimizedImageUrl(project.image);
  const allGalleryImages = Array.from(
    new Set([project.image, ...(project.caseStudy?.gallery || [])].filter(Boolean))
  );

  const renderVideoPlayer = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop()?.split("?")[0]
        : new URL(url).searchParams.get("v");
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
          className="w-full h-full rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (url.includes("vimeo.com")) {
      const id = url.split("/").pop();
      return (
        <iframe
          src={`https://player.vimeo.com/video/${id}`}
          className="w-full h-full rounded-2xl"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
    return (
      <video
        src={url}
        controls
        className="w-full h-full rounded-2xl object-contain bg-black"
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white"
    >
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80">
        <Magnetic>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
          >
            <ChevronLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            BACK TO PORTFOLIO
          </button>
        </Magnetic>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold hidden sm:inline">
            Case Study // {project.type || "Enterprise Software"}
          </span>
          <button
            onClick={() => navigate("/admin")}
            className="text-[11px] font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
          >
            Studio
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 md:px-12 overflow-hidden border-b border-zinc-900">
        {/* Glow backdrop */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                style={{
                  backgroundColor: `${accentColor}18`,
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                }}
              >
                {project.type || "Custom Software"}
              </span>

              {project.badge && (
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                  {project.badge}
                </span>
              )}

              {project.featured && (
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                  Featured System
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] font-display">
              {project.title}
            </h1>

            {/* Overview */}
            <p className="text-zinc-300 text-lg md:text-2xl max-w-3xl font-medium leading-relaxed">
              {project.description}
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1 rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              {project.live && (
                <Magnetic>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-zinc-200 text-black rounded-full font-bold text-sm tracking-wider uppercase transition-all shadow-xl shadow-white/10"
                  >
                    Launch Live System <ExternalLink size={16} />
                  </a>
                </Magnetic>
              )}
              {project.github && (
                <Magnetic>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-7 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-white rounded-full font-bold text-sm tracking-wider uppercase transition-all"
                  >
                    View Source Code <GitHubLogoIcon width={18} height={18} />
                  </a>
                </Magnetic>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Showcase Image */}
      <section className="py-16 px-6 md:px-12 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group cursor-pointer"
            onClick={() => setActiveLightboxImg(mainImage)}
          >
            <img
              src={mainImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Architected & Shipped by Devx Solutions
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Maximize2 size={13} /> Click to expand
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo Player if attached */}
      {project.video && (
        <section className="py-14 px-6 md:px-12 bg-black border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#DFA900] font-semibold">
                Live Demonstration
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Interactive Video Walkthrough
              </h3>
            </div>
            <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0E0E0E]">
              {renderVideoPlayer(project.video)}
            </div>
          </div>
        </section>
      )}

      {/* Challenge & Solution Grid */}
      <section className="py-24 px-6 md:px-12 bg-black border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-800/80 relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-6">
              <Layers size={20} />
            </div>
            <p className="text-xs font-mono text-red-400 mb-2 uppercase tracking-widest font-bold">
              01 — THE CLIENT CHALLENGE
            </p>
            <h3 className="text-2xl font-bold font-display text-white mb-4">
              Operational Friction & Complexity
            </h3>
            <p className="text-zinc-300 leading-relaxed text-base font-normal">
              {project.caseStudy?.challenge ||
                "Traditional systems lacked the integration and throughput required for real-time scale, resulting in fragmented workflows and high maintenance overhead."}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-800/80 relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
              <Sparkles size={20} />
            </div>
            <p className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest font-bold">
              02 — THE DEVX SOLUTION
            </p>
            <h3 className="text-2xl font-bold font-display text-white mb-4">
              Scalable, Modular Engineering
            </h3>
            <p className="text-zinc-300 leading-relaxed text-base font-normal">
              {project.caseStudy?.solution ||
                "Our team engineered an end-to-end modern stack featuring optimized database schemas, reactive client-side rendering, and automated business logic."}
            </p>
          </div>
        </div>
      </section>

      {/* Technical Breakdown */}
      {project.caseStudy?.technicalBreakdown &&
        project.caseStudy.technicalBreakdown.length > 0 && (
          <section className="py-24 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-6xl mx-auto">
              <div className="mb-14">
                <p className="text-xs font-mono text-blue-400 mb-2 uppercase tracking-widest font-bold">
                  03 — ARCHITECTURAL BLUEPRINT
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter font-display">
                  Engineering <span style={{ color: accentColor }}>Deep Dive</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.caseStudy.technicalBreakdown.map((item, i) => (
                  <div
                    key={i}
                    className="p-8 rounded-3xl bg-black border border-zinc-800 hover:border-zinc-700 transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: accentColor }}
                        />
                        <h4 className="text-white font-bold text-xl group-hover:text-blue-400 transition-colors">
                          {item.feature}
                        </h4>
                      </div>
                      <p className="text-zinc-400 leading-relaxed text-sm mb-6">
                        {item.insight}
                      </p>
                    </div>

                    {item.codeSnippet && (
                      <div className="rounded-2xl bg-zinc-950 p-4 font-mono text-xs text-zinc-300 border border-zinc-800 overflow-x-auto">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-[10px] text-zinc-500">
                          <span className="flex items-center gap-1.5">
                            <Terminal size={12} /> Implementation Insight
                          </span>
                          <span>PRODUCTION</span>
                        </div>
                        <pre>
                          <code>{item.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Multi-Image Gallery Showcase */}
      {allGalleryImages.length > 1 && (
        <section className="py-24 px-6 md:px-12 bg-black border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-mono text-blue-400 mb-2 uppercase tracking-widest font-bold">
                04 — INTERFACE & SYSTEM GALLERY
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter font-display">
                Screenshots & Architecture Views
              </h2>
              <p className="text-zinc-400 text-sm mt-2">
                Click any image to examine full-resolution captures.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allGalleryImages.map((imgUrl, idx) => {
                const resolved = getOptimizedImageUrl(imgUrl);
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveLightboxImg(resolved)}
                    className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 hover:border-zinc-600 transition-all cursor-pointer group shadow-lg"
                  >
                    <img
                      src={resolved}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Measurable Outcomes */}
      {project.caseStudy?.outcomes && project.caseStudy.outcomes.length > 0 && (
        <section className="py-24 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest font-bold">
                05 — BUSINESS IMPACT
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter font-display">
                Key Deliverables & Value
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.caseStudy.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-black border border-zinc-800 flex items-start gap-4 hover:border-emerald-500/40 transition-colors"
                >
                  <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-zinc-200 text-sm font-medium leading-relaxed">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project Footer */}
      {nextProject && (
        <section className="py-24 px-6 md:px-12 bg-black border-t border-zinc-900">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 font-bold">
                NEXT CASE STUDY
              </p>
              <h3 className="text-3xl md:text-4xl font-bold font-display text-white">
                {nextProject.title}
              </h3>
              <p className="text-zinc-400 text-sm mt-1">{nextProject.type}</p>
            </div>

            <button
              onClick={() => navigate(`/project/${nextProject.id}`)}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-blue-600 hover:text-white font-bold text-sm tracking-wider uppercase transition-all shadow-xl"
            >
              Explore Next Project <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
              <button
                onClick={() => setActiveLightboxImg(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900/80 hover:bg-white text-zinc-300 hover:text-black transition-colors z-10"
              >
                <X size={20} />
              </button>
              <img
                src={activeLightboxImg}
                alt="Enlarged screenshot"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-zinc-800 shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectDetail;
