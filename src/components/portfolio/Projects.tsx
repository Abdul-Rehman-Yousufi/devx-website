import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowRight, Film, PlusCircle, Sparkles } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Magnetic } from "./Magnetic";
import { useProjects, type Project } from "../../data/projectsStore";
import { getOptimizedImageUrl } from "../../lib/imageUtils";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const accent = project.color ?? "#3b82f6";
  const navigate = useNavigate();
  const imageSrc = getOptimizedImageUrl(project.image);

  return (
    <Magnetic className="project-card-wrap">
      <div
        className="project-card"
        style={{ "--accent": accent } as React.CSSProperties}
        onClick={() => navigate(`/project/${project.id}`)}
        data-cursor="project"
      >
        {/* Gradient blob */}
        <div
          className="card-blob"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${accent}18 0%, transparent 70%)`,
          }}
        />

        {/* Top bar */}
        <div className="card-topbar">
          {project.badge ? (
            <span className="badge badge-gold">{project.badge}</span>
          ) : project.status ? (
            <span className="badge badge-amber">{project.status}</span>
          ) : project.type ? (
            <span className="badge badge-dim">{project.type}</span>
          ) : (
            <span />
          )}
          <div className="card-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <GitHubLogoIcon width={16} height={16} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Project Image Container */}
        <div className="card-image-container">
          <img
            src={imageSrc}
            loading="lazy"
            alt={project.title}
            className="card-image"
          />
          <div className="image-overlay" />
        </div>

        {/* Number */}
        <span className="card-number" style={{ color: `${accent}15` }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="card-content">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-desc">{project.description}</p>
          <div className="card-tech">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="tech-tag"
                style={{ borderColor: `${accent}30`, color: accent }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span
                className="tech-tag"
                style={{ borderColor: `${accent}20`, color: accent, opacity: 0.8 }}
              >
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="card-accent-bar" style={{ background: accent }} />
      </div>
    </Magnetic>
  );
};

const Projects = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // Take featured projects or the first 8 for high-impact showcase
  const featuredProjects = projects.filter((p) => p.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 8);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const strip = stripRef.current;

    if (!section || !wrapper || !strip) return;

    let ctx = gsap.context(() => {
      const getScrollLength = () => strip.scrollWidth - window.innerWidth;

      const tween = gsap.to(strip, {
        x: () => -getScrollLength(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 0.1,
          start: "center center",
          end: () => `+=${strip.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, [displayProjects]);

  return (
    <>
      {/* Section header ABOVE the pinned zone */}
      <div className="projects-header flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="projects-label">003 — FEATURED SYSTEMS</p>
          <h2 className="projects-title">
            ENGINEERED
            <br />
            <span className="highlight">PRODUCTS</span>.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 text-blue-700 font-mono text-xs font-semibold transition-colors"
          >
            <PlusCircle size={14} /> Add Project / Studio
          </button>
        </div>
      </div>

      {/* The pinned horizontal gallery */}
      <section id="projects" ref={sectionRef}>
        <div ref={wrapperRef} className="horiz-gallery-wrapper">
          <div className="scroll-hint">
            <span className="scroll-hint-line" />
            scroll to explore client work ({displayProjects.length} featured)
          </div>
          <div ref={stripRef} className="horiz-gallery-strip">
            {displayProjects.map((p, idx) => (
              <ProjectCard key={p.id} project={p} index={idx} />
            ))}
            <div className="flex flex-col gap-4 justify-center project-card-wrap shrink-0">
              <Magnetic>
                <button
                  className="view-all-btn w-full justify-center"
                  onClick={() => navigate("/all-project")}
                >
                  VIEW ALL {projects.length} WORKS <ArrowRight size={16} />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  className="view-all-btn w-full justify-center bg-pink-500/5 border-pink-500/20 text-pink-500 hover:bg-pink-500 hover:text-black hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                  onClick={() => navigate("/video-portfolio")}
                >
                  VIDEO PORTFOLIO <Film size={16} />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  className="view-all-btn w-full justify-center bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-blue-600 hover:text-white"
                  onClick={() => navigate("/admin")}
                >
                  PROJECT STUDIO <PlusCircle size={16} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
