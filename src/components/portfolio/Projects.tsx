import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowRight, Film } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Magnetic } from "./Magnetic";
import { projects, type Project } from "../../data/projects";
import "./Projects.css";

const IK_URL = import.meta.env.VITE_IK_URL_ENDPOINT ?? "";

/** Builds an ImageKit URL with properly encoded path segments. 
 * Handles both relative paths and absolute URLs. 
 */
const ikUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  const baseUrl = IK_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  const finalPath = `${cleanPath.split("/").map(encodeURIComponent).join("/")}?tr=w-800,q-80`;
  
  if (!baseUrl) return `/${finalPath}`;
  
  return `${baseUrl}/${finalPath}`;
};

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }: { project: Project }) => {
  const accent = project.color ?? "#3b82f6";
  const navigate = useNavigate();

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
            background: `radial-gradient(circle at 30% 30%, ${accent}15 0%, transparent 70%)`,
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
          {project.image && (
            <img
              src={ikUrl(project.image)}
              loading="lazy"
              alt={project.title}
              className="card-image"
            />
          )}
          <div className="image-overlay" />
        </div>

        {/* Number */}
        <span className="card-number" style={{ color: `${accent}12` }}>
          {String(projects.indexOf(project) + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="card-content">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-desc">{project.description}</p>
          <div className="card-tech">
            {project.tech.map((t) => (
              <span
                key={t}
                className="tech-tag"
                style={{ borderColor: `${accent}30`, color: accent }}
              >
                {t}
              </span>
            ))}
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
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

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
          scrub: 0.1, // Faster scrub response for less lag
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
  }, []);

  return (
    <>
      {/* Section header ABOVE the pinned zone */}
      <div className="projects-header">
        <p className="projects-label">003 — SELECTED WORK</p>
        <h2 className="projects-title">
          THINGS I'VE
          <br />
          <span className="highlight">SHIPPED</span>.
        </h2>
      </div>

      {/* The pinned horizontal gallery */}
      <section id="projects" ref={sectionRef}>
        <div ref={wrapperRef} className="horiz-gallery-wrapper">
          <div className="scroll-hint">
            <span className="scroll-hint-line" />
            scroll to explore
          </div>
          <div ref={stripRef} className="horiz-gallery-strip">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
            <div className="flex flex-col gap-4 justify-center project-card-wrap shrink-0">
              <Magnetic>
                <button
                  className="view-all-btn w-full justify-center"
                  onClick={() => navigate("/all-project")}
                >
                  VIEW ALL WORKS <ArrowRight size={16} />
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
