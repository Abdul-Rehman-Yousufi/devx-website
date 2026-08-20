import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const IK_URL = import.meta.env.VITE_IK_URL_ENDPOINT ?? "";

/** Builds an ImageKit URL with properly encoded path segments. 
 * Handles both relative paths and absolute URLs. 
 */
const ikUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  const baseUrl = IK_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  if (!baseUrl) return `/${cleanPath}`;
  
  return `${baseUrl}/${cleanPath.split("/").map(encodeURIComponent).join("/")}`;
};

const AllProject = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Cinematic entrance for the featured projects
    const featuredSections = gsap.utils.toArray<HTMLElement>(".featured-project");

    featuredSections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Subtle parallax for featured images
    featuredSections.forEach((section) => {
      const img = section.querySelector(".featured-img");
      if (img) {
        gsap.to(img, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });
  }, []);

  const featuredProjects = projects.filter(p => p.featured);
  const archiveProjects = projects.filter(p => !p.featured);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Hero Section - Cinematic Slider/Scroll */}
      <section className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 py-20">
        <header className="max-w-7xl mx-auto w-full mb-24">
          <p className="text-mint font-mono text-[10px] tracking-[0.3em] uppercase mb-2 opacity-70">
            Selected Works // 2026
          </p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none italic uppercase">
            THE <span className="text-mint">HIGHLIGHTS</span>.
          </h1>
        </header>

        <div className="max-w-7xl mx-auto w-full space-y-40">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="featured-project relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center group"
            >
              <div className="md:col-span-7 relative overflow-hidden rounded-3xl aspect-video">
                <div className="featured-img absolute inset-0 w-full h-full scale-110">
                  <img
                    src={ikUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="md:col-span-5 flex flex-col items-start space-y-6">
                <span className="text-[10px] font-mono px-3 py-1 bg-mint/10 border border-mint/30 rounded-full text-mint uppercase tracking-widest">
                  {project.badge || project.type || "Case Study"}
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
                  {project.title}
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                  {project.description}
                </p>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-mint transition-colors"
                  >
                    View Case Study
                  </button>
                  <div className="flex gap-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                        <GitHubLogoIcon width={20} height={20} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                        <ExternalLink width={20} height={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transition Section */}
      <section className="py-32 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            The <span className="text-mint">Archive</span>.
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
            Exploring all experiments and builds.
          </p>
        </div>
      </section>

      {/* Archive Section - Sophisticated Bento Grid */}
      <section className="relative w-full py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {archiveProjects.map((project, index) => {
              // Simple logic for "big" cells in the grid for visual variety
              const isBig = index % 3 === 0;
              return (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -10 }}
                  className={`group relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 cursor-pointer transition-all duration-500 ${
                    isBig ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
                  }`}
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={ikUrl(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono px-2 py-1 bg-white/10 rounded text-zinc-400 uppercase tracking-tighter">
                        {project.type || "Development"}
                      </span>
                      <span className="text-white/20 font-black text-2xl group-hover:text-mint/50 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-mint transition-colors italic uppercase">
                      {project.title}
                    </h3>
                    <p className="text-zinc-500 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[9px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${project.id}`);
                        }}
                        className="text-[10px] font-bold uppercase tracking-widest text-white hover:text-mint transition-colors flex items-center gap-2"
                      >
                        Case Study <ExternalLink size={12} />
                      </button>
                      <div className="flex gap-3">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-zinc-500 hover:text-white transition-colors"
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
                            className="text-zinc-500 hover:text-white transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="py-40 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-12">
            Want to <span className="text-mint">Collaborate</span>?
          </h2>
          <a 
            href="https://wa.me/919259269317"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-white text-black font-black rounded-full text-xl hover:scale-110 transition-transform"
          >
            Get In Touch
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AllProject;
