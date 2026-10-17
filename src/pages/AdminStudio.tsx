import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Check,
  Copy,
  Download,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Image as ImageIcon,
  Lock,
  Unlock,
  Eye,
  AlertCircle,
  FileCode,
  X,
  Star
} from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useProjects, exportProjectsToTypeScript, type Project } from '../data/projectsStore';
import { getOptimizedImageUrl } from '../lib/imageUtils';
import { toast } from 'sonner';

const COLOR_PRESETS = [
  { name: 'Electric Blue', hex: '#3b82f6' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Cyber Purple', hex: '#8b5cf6' },
  { name: 'Amber Gold', hex: '#f59e0b' },
  { name: 'Neon Rose', hex: '#ec4899' },
  { name: 'Cyan Sky', hex: '#06b6d4' },
  { name: 'Indigo Deep', hex: '#6366f1' },
];

const COMMON_TECH = [
  'React 19',
  'Next.js 15',
  'TypeScript',
  'Python',
  'Django REST',
  'Node.js',
  'Tailwind CSS',
  'FastAPI',
  'PostgreSQL',
  'OpenAI API',
  'AWS',
  'Docker',
];

const EMPTY_PROJECT: Project = {
  id: '',
  title: '',
  description: '',
  tech: ['React', 'TypeScript'],
  type: 'Full Stack Web Application',
  badge: 'NEW',
  status: 'In Production',
  github: '',
  live: '',
  color: '#3b82f6',
  image: '',
  featured: true,
  layoutSize: 'standard',
  caseStudy: {
    challenge: '',
    solution: '',
    technicalBreakdown: [
      {
        feature: 'Scalable Architecture',
        insight: 'Designed modular services and optimized state management for high concurrency.',
        codeSnippet: '// Production module sample\nexport const config = { runtime: "edge" };'
      }
    ],
    outcomes: [
      'High-performance response times under peak load.',
      'Intuitive user experience with seamless workflows.'
    ],
    gallery: []
  }
};

export const AdminStudio = () => {
  const navigate = useNavigate();
  const { projects, saveProject, deleteProject, resetProjects } = useProjects();

  // Security Gate: Master key devx@# (Always required upon entering studio)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Clear any legacy session cache on mount
  React.useEffect(() => {
    sessionStorage.removeItem('devx_admin_auth');
  }, []);

  // Modal states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFeatured, setFilterFeatured] = useState<boolean | null>(null);

  // New tag and url inputs
  const [techInput, setTechInput] = useState('');
  const [galleryUrlInput, setGalleryUrlInput] = useState('');

  // Handle Authentication with strictly devx@#
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === 'devx@#') {
      setIsAuthenticated(true);
      setAuthError(false);
      toast.success('Authorized: Welcome to Devx Studio');
    } else {
      setAuthError(true);
      toast.error('Access denied. Invalid company master key.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscodeInput('');
    toast.info('Studio locked');
  };

  // Multi-image file drop/upload handler
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleMultiImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProject) return;

    const fileList = Array.from(files);
    let loadedCount = 0;

    fileList.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File "${file.name}" exceeds 5MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          const dataUrl = event.target.result;
          setEditingProject((prev) => {
            if (!prev) return prev;
            const currentGallery = prev.caseStudy?.gallery ? [...prev.caseStudy.gallery] : [];
            const newCover = prev.image && prev.image.trim() !== '' ? prev.image : dataUrl;
            
            // Add to gallery if not already present
            if (!currentGallery.includes(dataUrl)) {
              currentGallery.push(dataUrl);
            }

            return {
              ...prev,
              image: newCover,
              caseStudy: {
                ...prev.caseStudy,
                gallery: currentGallery
              }
            };
          });
          loadedCount++;
          if (loadedCount === fileList.length) {
            toast.success(`Uploaded ${loadedCount} screenshot(s) successfully!`);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input so same files can be re-selected if needed
    e.target.value = '';
  };

  // Set specific image as Primary Cover
  const handleSetCover = (imgUrl: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      image: imgUrl
    });
    toast.success('Updated primary cover screenshot');
  };

  // Remove an image from gallery
  const handleRemoveImage = (imgUrl: string) => {
    if (!editingProject) return;
    const currentGallery = (editingProject.caseStudy?.gallery || []).filter((u) => u !== imgUrl);
    let nextCover = editingProject.image;

    // If deleting the current cover, fallback to the next available image
    if (editingProject.image === imgUrl) {
      nextCover = currentGallery[0] || '';
    }

    setEditingProject({
      ...editingProject,
      image: nextCover,
      caseStudy: {
        ...editingProject.caseStudy,
        gallery: currentGallery
      }
    });
    toast.info('Image removed');
  };

  // Add image by URL or path to gallery
  const handleAddImageUrl = () => {
    if (!editingProject) return;
    const trimmed = galleryUrlInput.trim();
    if (!trimmed) return;

    const currentGallery = editingProject.caseStudy?.gallery ? [...editingProject.caseStudy.gallery] : [];
    if (!currentGallery.includes(trimmed)) {
      currentGallery.push(trimmed);
    }
    const newCover = editingProject.image ? editingProject.image : trimmed;

    setEditingProject({
      ...editingProject,
      image: newCover,
      caseStudy: {
        ...editingProject.caseStudy,
        gallery: currentGallery
      }
    });
    setGalleryUrlInput('');
    toast.success('Image path added to gallery');
  };

  // Open editor for new project
  const handleStartNew = () => {
    const newId = `project-${Date.now().toString(36)}`;
    setEditingProject({
      ...EMPTY_PROJECT,
      id: newId,
      title: 'New Enterprise System',
      caseStudy: {
        ...EMPTY_PROJECT.caseStudy,
        challenge: 'Describe the core business friction or technical limitation...',
        solution: 'Detail how our engineering team designed and deployed the custom solution...'
      }
    });
    setIsCreatingNew(true);
  };

  // Open editor for existing project
  const handleEdit = (p: Project) => {
    setEditingProject(JSON.parse(JSON.stringify(p)));
    setIsCreatingNew(false);
  };

  // Save current project
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title.trim()) {
      toast.error('Project title is required.');
      return;
    }

    if (!editingProject.id.trim()) {
      editingProject.id = editingProject.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    saveProject(editingProject);
    toast.success(`Project "${editingProject.title}" saved successfully!`);
    setEditingProject(null);
    setIsCreatingNew(false);
  };

  // Add Tech Tag
  const handleAddTech = (tech: string) => {
    if (!editingProject) return;
    const trimmed = tech.trim();
    if (!trimmed || editingProject.tech.includes(trimmed)) return;
    setEditingProject({
      ...editingProject,
      tech: [...editingProject.tech, trimmed]
    });
    setTechInput('');
  };

  const handleRemoveTech = (t: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      tech: editingProject.tech.filter((item) => item !== t)
    });
  };

  // Export handlers
  const handleCopyTypeScript = () => {
    const code = exportProjectsToTypeScript();
    navigator.clipboard.writeText(code);
    toast.success('TypeScript code copied to clipboard! Paste into src/data/projects.ts');
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'devx-projects.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Downloaded devx-projects.json');
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFeatured = filterFeatured === null ? true : p.featured === filterFeatured;
    return matchesSearch && matchesFeatured;
  });

  // Password Lock Screen with no hints
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6 selection:bg-blue-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Lock size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Devx Studio</h1>
              <p className="text-xs text-zinc-400 font-mono">Company Administration</p>
            </div>
          </div>

          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            Restricted company workspace for managing client projects, multiple case study captures, and live deployments.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Studio Master Key
              </label>
              <input
                type="password"
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Enter master key"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder:text-zinc-600 outline-none transition-colors"
                autoFocus
              />
              {authError && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5 font-mono">
                  <AlertCircle size={14} /> Access denied. Invalid credentials.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              <Unlock size={16} /> Enter Studio
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span>Devx Solutions Studio</span>
            <button
              onClick={() => navigate('/')}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Return Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Combined pictures list for the editor
  const currentImages = editingProject
    ? Array.from(
        new Set([editingProject.image, ...(editingProject.caseStudy?.gallery || [])].filter(Boolean))
      )
    : [];

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
              title="Return to website"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="font-bold text-lg text-white">Devx Portfolio Studio</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                  LIVE REPOSITORY
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Multi-image uploads, case study editing, and Git synchronization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 rounded-xl text-xs font-mono transition-colors"
            >
              <FileCode size={14} className="text-blue-400" /> Export Code to Git
            </button>

            <button
              onClick={handleStartNew}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-blue-600/20"
            >
              <Plus size={16} /> Add New Project
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition-colors text-xs font-mono"
              title="Lock Studio"
            >
              <Lock size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Total Works</p>
            <p className="text-3xl font-bold text-white mt-1">{projects.length}</p>
          </div>
          <div className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Featured Highlights</p>
            <p className="text-3xl font-bold text-blue-400 mt-1">
              {projects.filter((p) => p.featured).length}
            </p>
          </div>
          <div className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Live Deployments</p>
            <p className="text-3xl font-bold text-emerald-400 mt-1">
              {projects.filter((p) => p.live).length}
            </p>
          </div>
          <div className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Multi-Shot Enabled</p>
            <p className="text-3xl font-bold text-amber-400 mt-1">Ready</p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="w-full sm:w-96 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, tech stack..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterFeatured(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                filterFeatured === null
                  ? 'bg-zinc-800 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setFilterFeatured(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                filterFeatured === true
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Featured Only ({projects.filter((p) => p.featured).length})
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all projects back to repository factory defaults?')) {
                  resetProjects();
                  toast.success('Projects restored to initial state.');
                }
              }}
              className="ml-auto text-xs font-mono text-zinc-500 hover:text-amber-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
              title="Reset projects"
            >
              <RotateCcw size={12} /> Reset to Defaults
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => {
            const previewImg = getOptimizedImageUrl(p.image);
            const imageCount = [p.image, ...(p.caseStudy?.gallery || [])].filter(Boolean).length;

            return (
              <div
                key={p.id}
                className="group relative bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-black"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full bg-zinc-900 overflow-hidden border-b border-zinc-800/80">
                  <img
                    src={previewImg}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {p.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/90 text-white backdrop-blur-md">
                        FEATURED
                      </span>
                    )}
                    {imageCount > 1 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
                        <ImageIcon size={10} /> {imageCount} Shots
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => navigate(`/project/${p.id}`)}
                      className="w-8 h-8 rounded-full bg-zinc-900/80 hover:bg-white text-zinc-300 hover:text-black flex items-center justify-center transition-colors backdrop-blur-md"
                      title="View Case Study"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: p.color || '#3b82f6' }}
                      />
                      <span className="text-xs font-mono text-zinc-400">{p.type || 'Web Application'}</span>
                    </div>

                    <h3 className="font-bold text-lg text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {p.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 4 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-500">
                          +{p.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-zinc-500">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-white transition-colors"
                          title="GitHub Source"
                        >
                          <GitHubLogoIcon width={15} height={15} />
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-emerald-400 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition-colors border border-zinc-800"
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${p.title}"?`)) {
                            deleteProject(p.id);
                            toast.success(`Deleted ${p.title}`);
                          }
                        }}
                        className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition-colors"
                        title="Delete project"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Project Editor Modal */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: editingProject.color }} />
                  <h2 className="font-bold text-white text-base">
                    {isCreatingNew ? 'Create New Company Project' : `Edit: ${editingProject.title}`}
                  </h2>
                </div>
                <button
                  onClick={() => setEditingProject(null)}
                  className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 text-sm font-mono"
                >
                  ✕ Close
                </button>
              </div>

              {/* Modal Form Scrollable */}
              <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-6">
                {/* 1. Core Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, title: e.target.value })
                      }
                      placeholder="e.g. NextGen Autonomous Warehouse ERP"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      URL Slug / Identifier
                    </label>
                    <input
                      type="text"
                      value={editingProject.id}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                        })
                      }
                      placeholder="e.g. warehouse-erp"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Project Category / Type
                    </label>
                    <input
                      type="text"
                      value={editingProject.type || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, type: e.target.value })
                      }
                      placeholder="e.g. Enterprise SaaS / AI Automation / Mobile App"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Accent Color Theme
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        {COLOR_PRESETS.map((c) => (
                          <button
                            key={c.hex}
                            type="button"
                            onClick={() =>
                              setEditingProject({ ...editingProject, color: c.hex })
                            }
                            className={`w-7 h-7 rounded-full border-2 transition-transform ${
                              editingProject.color === c.hex
                                ? 'scale-110 border-white'
                                : 'border-transparent opacity-80 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                      <input
                        type="text"
                        value={editingProject.color}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, color: e.target.value })
                        }
                        className="w-24 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs font-mono text-white text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Layout & Featured */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Layout Size
                    </label>
                    <select
                      value={editingProject.layoutSize}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          layoutSize: e.target.value as 'hero' | 'wide' | 'standard'
                        })
                      }
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                    >
                      <option value="standard">Standard Card</option>
                      <option value="wide">Wide Showcase</option>
                      <option value="hero">Hero Spotlight</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <input
                      type="checkbox"
                      id="featuredCheck"
                      checked={editingProject.featured}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-blue-600 focus:ring-0 bg-zinc-800 border-zinc-700"
                    />
                    <label htmlFor="featuredCheck" className="text-xs font-medium text-white cursor-pointer">
                      Featured on Homepage
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Status / Badge
                    </label>
                    <input
                      type="text"
                      value={editingProject.badge || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, badge: e.target.value })
                      }
                      placeholder="e.g. LIVE / FEATURED / ENTERPRISE"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
                    />
                  </div>
                </div>

                {/* 3. Description */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Project Overview Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    placeholder="Brief 2-3 sentence overview of what the platform achieves..."
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl p-3 text-sm text-white outline-none"
                  />
                </div>

                {/* 4. Tech Stack */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Technologies & Frameworks
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editingProject.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-700 text-zinc-200"
                      >
                        {t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(t)}
                          className="hover:text-red-400 text-zinc-400"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTech(techInput);
                        }
                      }}
                      placeholder="Type a technology and press Enter (or click suggestions below)"
                      className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-2 text-xs font-mono text-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTech(techInput)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-mono"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_TECH.filter((t) => !editingProject.tech.includes(t)).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleAddTech(t)}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800/80"
                      >
                        + {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. MULTI-IMAGE GALLERY & SCREENSHOTS SECTION */}
                <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-mono uppercase text-zinc-200 font-bold block">
                        Project Screenshots & Gallery (Multi-Image Upload)
                      </label>
                      <p className="text-[11px] text-zinc-400">
                        Upload multiple captures of dashboards, mobile views, and architecture.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-blue-400 font-bold">
                      {currentImages.length} Image(s) Attached
                    </span>
                  </div>

                  {/* Multi-File Upload Drop Area */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleMultiImageFiles}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-zinc-700 hover:border-blue-500 rounded-2xl p-6 text-center transition-colors flex flex-col items-center gap-2 group bg-zinc-950/40"
                    >
                      <ImageIcon size={28} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
                      <span className="text-sm font-mono text-zinc-200 font-bold">
                        Click to select multiple screenshots
                      </span>
                      <span className="text-xs text-zinc-500">
                        Hold Ctrl/Shift to choose multiple PNG, JPG, or WebP files at once
                      </span>
                    </button>
                  </div>

                  {/* Manual Path / URL input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={galleryUrlInput}
                      onChange={(e) => setGalleryUrlInput(e.target.value)}
                      placeholder="Or enter public path / URL (e.g. /images/projects/...)"
                      className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-2 text-xs font-mono text-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-mono whitespace-nowrap"
                    >
                      + Add Path
                    </button>
                  </div>

                  {/* Visual Gallery Grid */}
                  {currentImages.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-mono text-zinc-400 mb-2 uppercase">
                        Current Attached Images (Click Star to set as primary cover)
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {currentImages.map((img, i) => {
                          const isCover = editingProject.image === img;
                          return (
                            <div
                              key={i}
                              className={`relative aspect-video rounded-xl overflow-hidden border-2 bg-zinc-950 group ${
                                isCover ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-zinc-800'
                              }`}
                            >
                              <img
                                src={getOptimizedImageUrl(img)}
                                alt={`Screenshot ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                {!isCover && (
                                  <button
                                    type="button"
                                    onClick={() => handleSetCover(img)}
                                    className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-mono flex items-center gap-1 shadow"
                                    title="Set as Main Cover"
                                  >
                                    <Star size={12} fill="white" /> Cover
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(img)}
                                  className="p-1.5 rounded-lg bg-red-600/90 hover:bg-red-500 text-white text-[10px] shadow"
                                  title="Remove Image"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>

                              {isCover && (
                                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-blue-600 text-white text-[9px] font-mono font-bold flex items-center gap-1">
                                  <Star size={10} fill="white" /> COVER
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Live Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Live Production URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.live || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, live: e.target.value })
                      }
                      placeholder="https://client-platform.com"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs font-mono text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={editingProject.github || ''}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, github: e.target.value })
                      }
                      placeholder="https://github.com/..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs font-mono text-white outline-none"
                    />
                  </div>
                </div>

                {/* 7. Case Study Deep Dive */}
                <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-400" />
                    <h3 className="font-bold text-sm text-white">Full Enterprise Case Study</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      The Challenge
                    </label>
                    <textarea
                      rows={2}
                      value={editingProject.caseStudy?.challenge || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          caseStudy: {
                            ...editingProject.caseStudy,
                            challenge: e.target.value
                          }
                        })
                      }
                      placeholder="What friction, scaling limitation, or architectural hurdle did the client face?"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                      The Solution & Architecture
                    </label>
                    <textarea
                      rows={2}
                      value={editingProject.caseStudy?.solution || ''}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          caseStudy: {
                            ...editingProject.caseStudy,
                            solution: e.target.value
                          }
                        })
                      }
                      placeholder="How did Devx design, build, and deploy the resolution?"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {/* Submit bar */}
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
                  >
                    <Check size={16} /> Save & Publish Live
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Export to Git Modal */}
      <AnimatePresence>
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileCode size={20} className="text-blue-400" />
                  <h3 className="font-bold text-base text-white">Export Projects to Git</h3>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-zinc-500 hover:text-white font-mono text-xs"
                >
                  ✕ Close
                </button>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Persist these project updates permanently in your Git repository. Copy the TypeScript code below and paste it into <code className="text-blue-400">src/data/projects.ts</code>, or download a backup JSON file.
              </p>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleCopyTypeScript}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Copy size={14} /> Copy TypeScript Code
                </button>
                <button
                  onClick={handleDownloadJson}
                  className="px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 py-2.5 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={14} /> Download JSON
                </button>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 font-mono text-[11px] text-zinc-300 max-h-60 overflow-y-auto">
                <pre>{exportProjectsToTypeScript()}</pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminStudio;
