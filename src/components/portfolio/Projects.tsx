import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, X, ArrowUpRight, Sparkles } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useProjects, getProjectCategory, type Project } from "../../data/projectsStore";
import { getOptimizedImageUrl } from "../../lib/imageUtils";

export const Projects = () => {
  const navigate = useNavigate();
  const { projects, categories } = useProjects();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => {
      const cat = getProjectCategory(p);
      return cat.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [projects, activeCategory]);

  // Video embed resolver (YouTube, Vimeo, Loom, or direct MP4)
  const renderVideoPlayer = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop()?.split("?")[0]
        : new URL(url).searchParams.get("v");
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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
          src={`https://player.vimeo.com/video/${id}?autoplay=1`}
          className="w-full h-full rounded-2xl"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
    // Direct MP4 or Data URL
    return (
      <video
        src={url}
        controls
        autoPlay
        className="w-full h-full rounded-2xl object-contain bg-black"
      />
    );
  };

  return (
    <section id="portfolio" className="relative bg-[#080808] py-24 sm:py-32 text-white border-b border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-[-8%] top-[15%] h-[400px] w-[400px] rounded-full blur-[110px] bg-[rgba(223,169,0,0.06)]" />
      <div className="pointer-events-none absolute right-[-8%] bottom-[15%] h-[420px] w-[420px] rounded-full blur-[120px] bg-[rgba(223,169,0,0.05)]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Portfolio Showcase
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Project examples for{" "}
            <span className="gold-gradient-text">
              premium digital products
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/55 leading-relaxed">
            Browse verified production systems across web development, SaaS platforms, AI automations, e-commerce, and mobile applications.
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none justify-start md:justify-center">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gold text-[#0A0600] font-bold shadow-[0_0_15px_rgba(223,169,0,0.35)] scale-105"
                    : "border border-white/10 bg-white/[0.04] text-white/60 hover:border-gold/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 3-Column Uniform Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const category = getProjectCategory(project);
              const imageSrc = getOptimizedImageUrl(project.image);
              const hasVideo = Boolean(project.video && project.video.trim());

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-[#0E0E0E] overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(223,169,0,0.12)] hover:-translate-y-1"
                >
                  {/* Card Thumbnail Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                    <img
                      src={imageSrc}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent opacity-80" />

                    {/* Category Floating Pill (Top Left) */}
                    <div className="absolute left-3.5 top-3.5">
                      <span className="rounded-full bg-black/75 px-3 py-1 text-[11px] font-semibold text-gold border border-gold/25 backdrop-blur-md">
                        {category}
                      </span>
                    </div>

                    {/* Video Demo Badge / Play Button (Top Right if video exists) */}
                    {hasVideo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveVideoUrl(project.video!);
                        }}
                        className="absolute right-3.5 top-3.5 flex items-center gap-1.5 rounded-full bg-gold/90 hover:bg-gold text-[#0A0600] px-3 py-1 text-[11px] font-bold shadow-md transition-all hover:scale-105"
                        title="Watch Video Demo"
                      >
                        <Play size={11} fill="currentColor" />
                        <span>Watch Demo</span>
                      </button>
                    )}
                  </div>

                  {/* Card Details */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="text-lg sm:text-xl font-bold text-white group-hover:text-gold transition-colors cursor-pointer line-clamp-1"
                        >
                          {project.title}
                        </h3>

                        <div className="flex items-center gap-2 shrink-0">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-white/40 hover:text-white transition-colors"
                              title="GitHub Repository"
                            >
                              <GitHubLogoIcon width={16} height={16} />
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-white/40 hover:text-gold transition-colors"
                              title="Live Production Deployment"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/40">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Bottom Action Link */}
                      <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between">
                        <button
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-[#FFE08A] transition-colors"
                        >
                          <span>View Case Study</span>
                          <ArrowUpRight size={14} />
                        </button>

                        {hasVideo && (
                          <button
                            onClick={() => setActiveVideoUrl(project.video!)}
                            className="text-[11px] text-white/40 hover:text-gold flex items-center gap-1 transition-colors"
                          >
                            <Play size={10} fill="currentColor" /> Video
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-[#0E0E0E]">
            <p className="text-white/50 text-base mb-4">
              No projects found under &ldquo;{activeCategory}&rdquo;.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-xs font-semibold text-gold underline"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>

      {/* Video Modal Lightbox */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveVideoUrl(null)}
          >
            <div
              className="relative w-full max-w-4xl aspect-video bg-[#0E0E0E] rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Close video"
              >
                <X size={18} />
              </button>

              <div className="w-full h-full">
                {renderVideoPlayer(activeVideoUrl)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
