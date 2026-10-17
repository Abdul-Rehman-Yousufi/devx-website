import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLink, ArrowLeft, PlusCircle, Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "../data/projectsStore";
import { getOptimizedImageUrl } from "../lib/imageUtils";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  "All",
  "AI & ML",
  "Full Stack",
  "SaaS & ERP",
  "Mobile",
  "Automation"
];

export const AllProject = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const featuredSections = gsap.utils.toArray<HTMLElement>(".featured-project");
    featuredSections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [projects]);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedCategory === "All") return true;
    if (selectedCategory === "AI & ML") {
      return (
        p.type?.toLowerCase().includes("ai") ||
        p.tech.some((t) => /ai|ml|hugging|openai|gpt|streamlit/i.test(t))
      );
    }
    if (selectedCategory === "Full Stack") {
      return (
        p.type?.toLowerCase().includes("full stack") ||
        p.tech.some((t) => /django|react|node|next/i.test(t))
      );
    }
    if (selectedCategory === "SaaS & ERP") {
      return (
        p.type?.toLowerCase().includes("saas") ||
        p.type?.toLowerCase().includes("erp") ||
        p.title.toLowerCase().includes("erp")
      );
    }
    if (selectedCategory === "Mobile") {
      return (
        p.type?.toLowerCase().includes("mobile") ||
        p.type?.toLowerCase().includes("cross-platform") ||
        p.tech.some((t) => /react native|android|flutter/i.test(t))
      );
    }
    if (selectedCategory === "Automation") {
      return (
        p.type?.toLowerCase().includes("automation") ||
        p.tech.some((t) => /n8n|bot|socket/i.test(t))
      );
    }
    return true;
  });

  const featuredList = filteredProjects.filter((p) => p.featured);
  const archiveList = filteredProjects.filter((p) => !p.featured);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Top Floating Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO HOME
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
          >
            <PlusCircle size={14} className="text-blue-400" /> Admin Studio
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full pt-36 pb-20 px-6 md:px-12 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-blue-400 font-mono text-xs tracking-[0.3em] uppercase mb-3 font-bold">
            001 — COMPLETE CLIENT INDEX & ARCHIVE
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none uppercase font-display mb-8">
            ALL <span className="text-blue-500">WORKS</span>.
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl font-normal leading-relaxed mb-12">
            Explore our end-to-end engineering deliverables across Enterprise SaaS, AI workflows, full-stack systems, and native mobile clients.
          </p>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-900">
            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-white text-black font-bold shadow-lg"
                      : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search works..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Spotlight */}
      {featuredList.length > 0 && (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
          {featuredList.map((project) => {
            const previewImg = getOptimizedImageUrl(project.image);
            const accent = project.color || "#3b82f6";
            return (
              <div
                key={project.id}
                className="featured-project grid grid-cols-1 md:grid-cols-12 gap-10 items-center group"
              >
                <div
                  className="md:col-span-7 relative overflow-hidden rounded-3xl aspect-video cursor-pointer border border-zinc-800 group-hover:border-zinc-700 transition-all duration-500 shadow-2xl"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <img
                    src={previewImg}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="md:col-span-5 flex flex-col items-start space-y-5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <span className="text-[10px] font-mono px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 uppercase tracking-widest font-semibold">
                      {project.badge || project.type || "Enterprise Work"}
                    </span>
                  </div>

                  <h2
                    className="text-4xl md:text-5xl font-black tracking-tight leading-tight cursor-pointer hover:text-blue-400 transition-colors font-display"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    {project.title}
                  </h2>

                  <p className="text-zinc-400 text-base leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      onClick={() => navigate(`/project/${project.id}`)}
                      className="px-7 py-3 bg-white text-black font-bold text-xs font-mono uppercase tracking-wider rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                    >
                      Case Study
                    </button>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-full transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-full transition-colors"
                        title="Source Code"
                      >
                        <GitHubLogoIcon width={16} height={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Grid of Archive / Additional Works */}
      {archiveList.length > 0 && (
        <section className="py-24 px-6 md:px-12 bg-zinc-950 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 font-bold">
                SYSTEMS REPOSITORY
              </p>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight font-display text-white">
                Engineering Builds & Modules
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {archiveList.map((project, index) => {
                const img = getOptimizedImageUrl(project.image);
                return (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-3xl bg-black border border-zinc-800/80 hover:border-zinc-700 cursor-pointer transition-all duration-300 flex flex-col justify-between"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    <div>
                      <div className="aspect-video relative overflow-hidden bg-zinc-900">
                        <img
                          src={img}
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                          <span>{project.type || "Application"}</span>
                          <span>#{String(index + 1).padStart(2, "0")}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors font-display">
                          {project.title}
                        </h3>

                        <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-400 group-hover:underline flex items-center gap-1">
                        View Study →
                      </span>
                      <div className="flex gap-2 text-zinc-500">
                        {project.github && <GitHubLogoIcon width={14} height={14} />}
                        {project.live && <ExternalLink size={14} />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <footer className="py-32 text-center bg-black border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mb-8 font-display">
            Ready to Build <span className="text-blue-500">Together</span>?
          </h2>
          <p className="text-zinc-400 text-base mb-8 max-w-xl mx-auto">
            Our engineering team is accepting new enterprise partners and product builds. Let's engineer something extraordinary.
          </p>
          <button
            onClick={() => navigate("/#contact")}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full text-sm font-mono uppercase tracking-wider transition-all shadow-xl shadow-blue-600/30"
          >
            Start a Conversation
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AllProject;
