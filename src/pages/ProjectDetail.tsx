import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from ".././data/projects";
import { Magnetic } from "../components/portfolio/Magnetic";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

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

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-white">
        Project not found
      </div>
    );

  const accentColor = project.color;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background text-foreground selection:bg-mint/30"
    >
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
        <Magnetic>
          <button
            onClick={() => navigate("/")}
            className="pointer-events-auto flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-white transition-colors group"
          >
            <ChevronLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            BACK TO PORTFOLIO
          </button>
        </Magnetic>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-2 py-1 rounded-md border border-white/10 bg-white/5 text-text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              {project.title}
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed mt-6">
              {project.description}
            </p>
          </motion.div>

          <div className="mt-12 flex gap-4">
            {project.live && (
              <Magnetic>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-mint transition-colors"
                >
                  LIVE DEMO <ExternalLink size={14} />
                </a>
              </Magnetic>
            )}
            {project.github && (
              <Magnetic>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  SOURCE CODE <GitHubLogoIcon width={20} height={20} />
                </a>
              </Magnetic>
            )}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 px-6 md:px-12 bg-[#0c0c0c]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-xs font-mono text-mint mb-4 uppercase tracking-widest">
                The Challenge
              </h3>
              <p className="text-xl text-slate-300 leading-relaxed font-medium">
                {project.caseStudy.challenge}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono text-mint mb-4 uppercase tracking-widest">
                The Solution
              </h3>
              <p className="text-xl text-slate-300 leading-relaxed font-medium">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group">
            {project.image && (
              <img
                src={ikUrl(project.image)}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Technical Breakdown */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 tracking-tighter">
            Engineering <span style={{ color: accentColor }}>Breakdown</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.caseStudy.technicalBreakdown.map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group"
              >
                <h4 className="text-white font-bold text-lg mb-3 group-hover:text-mint transition-colors">
                  {item.feature}
                </h4>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {item.insight}
                </p>
                {item.codeSnippet && (
                  <div
                    className="rounded-xl bg-black/50 p-4 font-mono text-[11px] text-slate-300 border-l-2"
                    style={{ borderColor: accentColor }}
                  >
                    <pre className="overflow-x-auto">
                      <code>{item.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 px-6 md:px-12 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xs font-mono text-mint mb-12 uppercase tracking-widest">
            Key Outcomes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {project.caseStudy.outcomes.map((outcome, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-background border border-white/10"
              >
                <p className="text-white font-medium text-lg">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;
