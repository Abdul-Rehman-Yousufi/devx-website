import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  X,
  Sparkles,
  Layers,
  Video,
  Flame,
  ArrowRight,
  Tv,
  Film,
  Cpu,
  Terminal,
  ChevronRight,
  MousePointer,
  Gauge
} from 'lucide-react';
import { InstagramLogoIcon as Instagram } from '@radix-ui/react-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoWork {
  id: string;
  title: string;
  category: 'short-form' | 'long-form' | 'commercial' | 'vfx';
  views: string;
  likes: string;
  retention: string;
  videoUrl: string;
  previewUrl: string;
  thumbnail: string;
  client: string;
  description: string;
  tags: string[];
}

const VIDEO_WORKS: VideoWork[] = [
  {
    id: "arcade-retro",
    title: "Viral Instagram Edit",
    category: "vfx",
    views: "2.4M",
    likes: "210K",
    retention: "87%",
    videoUrl: "https://www.instagram.com/reel/DZ9fc--vTc1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-retro-arcade-game-41870-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    client: "Creative Edit",
    description: "High-impact Instagram reel featuring dynamic sound design, seamless transitions, and frame-holds engineered to hook viewers instantly.",
    tags: ["Speed Ramps", "Sound FX", "Insta Pacing"]
  },
  {
    id: "neon-dance",
    title: "Cyberpunk Dance Sequence",
    category: "commercial",
    views: "4.8M",
    likes: "420K",
    retention: "92%",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-41865-large.mp4",
    previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-41865-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
    client: "NeonFlux Apparel",
    description: "High-energy commercial edit featuring speed ramping, color grading, and match cuts. Boosted click-through rate for the apparel drop by 34%.",
    tags: ["Match Cuts", "DaVinci Resolve", "Color Grading"]
  },
  {
    id: "audio-equalizer",
    title: "Macro Audio Gear Launch",
    category: "short-form",
    views: "1.1M",
    likes: "85K",
    retention: "84%",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-sound-on-an-equalizer-41869-large.mp4",
    previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-sound-on-an-equalizer-41869-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    client: "AcousticLab",
    description: "Close-up macro shots combined with punchy sound effects to create a highly satisfying, loopable short-form video that went viral.",
    tags: ["Sound FX", "Macro Edit", "Premiere Pro"]
  },
  {
    id: "dj-vibe",
    title: "Dynamic Concert Aftermovie",
    category: "long-form",
    views: "3.2M",
    likes: "290K",
    retention: "89%",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-style-dj-playing-music-41864-large.mp4",
    previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-style-dj-playing-music-41864-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    client: "SoundBase Fest",
    description: "A fast-paced aftermovie capturing concert crowds and transitions. Utilized dynamic masks and lighting effects to match the track's rhythm.",
    tags: ["Transitions", "Vaporwave", "Masking"]
  }
];

export const VideoPortfolio = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'short-form' | 'long-form' | 'commercial' | 'vfx'>('all');
  const [activeVideo, setActiveVideo] = useState<VideoWork | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // GSAP Scroll Animations
    const cards = gsap.utils.toArray<HTMLElement>('.animated-card');
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [filter]);

  // Handle Before/After Drag
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSliding) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSliding) return;
    handleMove(e.clientX);
  };

  const handleHover = (id: string, isHovered: boolean) => {
    const videoEl = videoRefs.current[id];
    if (videoEl) {
      if (isHovered) {
        videoEl.currentTime = 0;
        videoEl.play().catch(() => { });
      } else {
        videoEl.pause();
      }
    }
  };

  const filteredWorks = filter === 'all'
    ? VIDEO_WORKS
    : VIDEO_WORKS.filter(w => w.category === filter);

  return (
    <div className="bg-[#050505] text-[#ECE9E0] min-h-screen pb-40 overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Cinematic Background Grid & Neon Orbs */}
      <div className="fixed inset-0 z-0 technical-grid opacity-30 pointer-events-none" />
      <div className="fixed top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-pink-500/5 blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none z-0" />

      {/* Floating Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center bg-[#050505]/40 backdrop-blur-md border-b border-white/5">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors"
          data-cursor="link"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Return to Main</span>
        </button>
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-pink-500/5 border border-pink-500/20 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-pink-400 font-black">PRO EDIT ENGINE</span>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <header className="relative z-10 pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center text-center items-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <Film size={12} className="text-pink-500" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-bold">Cinematic Pacing & Motion VFX</span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase italic">
            DRAMATIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500">HOOKS.</span><br />
            VIRAL PACING.
          </h1>

          <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed font-medium max-w-3xl mx-auto">
            Short-form is won in the first 3 seconds. I engineer fast cuts, speed ramps, and high-converting hooks that drove <span className="text-white font-bold underline decoration-pink-500 decoration-2">10M+ views</span> on Instagram.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {["Short Form Hooking", "DaVinci Color Grading", "VFX After Effects", "Audition Sound FX"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Proof Metrics Dashboard */}
      <section className="relative z-10 border-y border-white/5 bg-zinc-900/10 backdrop-blur-xl py-14 px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { value: "20M+", label: "INSTAGRAM VIEWS", detail: "Across viral reels" },
            { value: "92%", label: "RETENTION HOOK", detail: "First 3-second hold" },
            { value: "800K+", label: "ENGAGEMENT", detail: "Likes & shares" },
            { value: "24HRS", label: "DELIVERY CYCLE", detail: "Swift turnarounds" }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left space-y-1.5 border-l border-white/5 pl-6 first:border-none">
              <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500 font-mono leading-none">
                {stat.value}
              </h3>
              <p className="text-pink-500 font-mono text-[10px] uppercase tracking-widest font-black leading-none">{stat.label}</p>
              <p className="text-zinc-600 text-[11px] font-mono uppercase tracking-wider font-bold">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Color Grading Before & After Slider */}
      <section className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto mb-40 space-y-12">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-pink-500 font-mono text-[11px] uppercase tracking-widest font-black">
            <Gauge size={12} /> Color Grading & VFX Engine
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
            RAW LOG VS <span className="text-pink-500">FINAL GRADE</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
            Drag the handle to see how raw logarithmic camera footage is transformed into a high-contrast cinematic masterpiece.
          </p>
        </div>

        <div
          ref={sliderRef}
          className="relative aspect-video w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl cursor-ew-resize select-none"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsSliding(true)}
          onTouchStart={() => setIsSliding(true)}
          onMouseUp={() => setIsSliding(false)}
          onTouchEnd={() => setIsSliding(false)}
          onMouseLeave={() => setIsSliding(false)}
        >
          {/* After Image (Full Color Grade - Base Layer) */}
          <img
            src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80"
            alt="Graded Footage"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-6 right-6 z-20 px-3 py-1 bg-pink-500 text-black font-mono text-[10px] font-black uppercase rounded-lg">
            Final Cut (DaVinci Graded)
          </div>

          {/* Before Image (Raw Log Footage - Clipped Overlay) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80"
              alt="Raw LOG"
              className="absolute inset-0 w-full h-full object-cover filter saturate-[0.15] contrast-[0.6] brightness-[1.25] sepia-[0.15]"
              style={{ width: sliderRef.current?.offsetWidth || '100%' }}
            />
            <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-zinc-800 text-zinc-400 font-mono text-[10px] font-black uppercase rounded-lg">
              Raw LOG File
            </div>
          </div>

          {/* Draggable Slider Bar */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-black shadow-xl flex items-center justify-center pointer-events-none">
              <MousePointer size={12} className="text-black" />
            </div>
          </div>
        </div>
      </section>

      {/* Filtering & Bento Works Grid */}
      <section className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-white">
              SELECTED <span className="text-pink-500">WORKS.</span>
            </h2>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Hover to review live pacing previews</p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Edits' },
              { id: 'short-form', label: 'Reels / TikTok' },
              { id: 'long-form', label: 'Vlogs / YouTube' },
              { id: 'commercial', label: 'Commercials' },
              { id: 'vfx', label: 'VFX / Motion' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-wider transition-all duration-500 font-bold border ${filter === tab.id
                  ? 'bg-pink-500 text-black border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                  : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((video) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                key={video.id}
                className="animated-card group relative bg-white/[0.02] border border-white/5 hover:border-pink-500/30 rounded-[2rem] overflow-hidden aspect-[9/16] cursor-pointer flex flex-col justify-between p-6 select-none shadow-2xl transition-colors duration-500"
                onMouseEnter={() => handleHover(video.id, true)}
                onMouseLeave={() => handleHover(video.id, false)}
                onClick={() => setActiveVideo(video)}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Cover Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black z-10" />
                </div>

                {/* Hover Looping Video Preview */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-0 group-hover:opacity-85 transition-opacity duration-500">
                  <video
                    ref={el => videoRefs.current[video.id] = el}
                    src={video.previewUrl}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10" />
                </div>

                {/* Dashboard HUD Top Stats Row */}
                <div className="relative z-20 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-pink-400 font-mono text-[9px] font-black uppercase tracking-widest backdrop-blur-md">
                    <Instagram size={10} />
                    <span>{video.views} Views</span>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-black/60 group-hover:bg-pink-500 text-white group-hover:text-black flex items-center justify-center border border-white/10 group-hover:border-pink-500 transition-all duration-300 shadow-xl">
                    <Play size={12} className="fill-current ml-0.5" />
                  </div>
                </div>

                {/* Dashboard Bottom HUD Panel */}
                <div className="relative z-20 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-black block group-hover:text-pink-400 transition-colors">
                      {video.client} // {video.retention} Retention
                    </span>
                    <h3 className="text-2xl font-black italic uppercase leading-[0.9] tracking-tight text-white group-hover:text-pink-500 transition-colors">
                      {video.title}
                    </h3>
                  </div>

                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {video.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Editing Suite Command Terminal */}
      <section className="relative z-10 py-40 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-pink-500 font-mono text-[11px] uppercase tracking-widest font-black">
            <Cpu size={12} /> Hardware & Software Infrastructure
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
            THE EDITING <span className="text-pink-500">SUITE.</span>
          </h2>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider ml-2">aman@editing-suite ~ $ system_info</span>
            </div>
            <Terminal size={14} className="text-zinc-500" />
          </div>

          {/* Code Body */}
          <div className="p-6 md:p-10 font-mono text-xs md:text-sm text-zinc-400 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-pink-500 font-black uppercase tracking-wider text-xs">// SOFTWARE SPECIFICATIONS</p>
                <div className="space-y-2 border-l border-pink-500/20 pl-4">
                  <p><span className="text-white font-bold">DaVinci Resolve Studio</span>: Core color-grading, film emulation, noise reduction pipelines.</p>
                  <p><span className="text-white font-bold">After Effects Studio</span>: Custom 3D text tracking, motion rotoscoping, neon asset mapping.</p>
                  <p><span className="text-white font-bold">Premiere Pro Studio</span>: Multi-cam sync cutting, speed ramp timing, audio FX design.</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-purple-500 font-black uppercase tracking-wider text-xs">// RENDERING ENGINE CAPABILITIES</p>
                <div className="space-y-2 border-l border-purple-500/20 pl-4">
                  <p><span className="text-white font-bold">Bitrates</span>: Up to 150Mbps ProRes 422HQ rendering for absolute raw upload fidelity.</p>
                  <p><span className="text-white font-bold">Frame Rates</span>: Precise 60fps to 120fps timeline speed ramping without pixel interpolation.</p>
                  <p><span className="text-white font-bold">VFX Latency</span>: GPU-optimized caching layers for real-time 4K rendering previews.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Retention Workflow Process */}
      <section className="relative z-10 py-20 px-6 md:px-12 max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">THE WORKFLOW <span className="text-pink-500">PIPELINE.</span></h2>
          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-black">How I ensure every second holds attention</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              name: "Audio Stems Mapping",
              desc: "Isolating dialogue, adding heavy transient hits, sound effects, and syncing them to a rhythm track before placing a single visual cut."
            },
            {
              step: "02",
              name: "Pacing & Speed Ramps",
              desc: "Applying asymmetric speed curves to bridge actions. Fast movements keep eyes tracing, slow holds emphasize key visual cues."
            },
            {
              step: "03",
              name: "Color Timing & VFX Glows",
              desc: "Color-grading with custom LUT profiles and adding neon asset tracking layers to make videos look like studio-budget commercial shorts."
            }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white/[0.01] border border-white/5 rounded-[2rem] relative overflow-hidden group hover:border-pink-500/20 transition-colors duration-500">
              <div className="absolute right-6 top-6 font-mono font-black text-6xl text-white/5 group-hover:text-pink-500/10 transition-colors pointer-events-none">{item.step}</div>
              <h3 className="font-display font-black text-lg uppercase italic text-white mb-4 relative z-10">{item.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="relative z-10 py-24 px-6 max-w-4xl mx-auto text-center bg-gradient-to-b from-transparent to-pink-500/5 rounded-[3rem] border border-white/5 space-y-8">
        <div className="flex items-center justify-center gap-1 text-pink-500 font-mono text-xs uppercase tracking-widest font-black">
          <Flame size={14} className="animate-pulse" /> Direct Collaboration
        </div>
        <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
          LET'S DOMINATE<br /><span className="text-pink-500">THE FEED.</span>
        </h2>
        <p className="text-zinc-500 text-sm max-w-lg mx-auto leading-relaxed">
          I am currently open to editing high-converting vertical campaigns, commercials, and visual content. Let's design something viral.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <a
            href="https://wa.me/919259269317"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-pink-500 text-black font-mono font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_30px_rgba(236,72,153,0.3)] w-full sm:w-auto justify-center"
          >
            WhatsApp Collaboration <ArrowRight size={14} />
          </a>
          <a
            href="mailto:amanbam604@gmail.com"
            className="px-10 py-5 bg-zinc-900 text-white border border-white/10 hover:border-white/20 font-mono font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-transform w-full sm:w-auto justify-center"
          >
            Shoot Email
          </a>
        </div>
      </section>

      {/* Cinematic Modal Player Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[11000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 z-[11010]"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-[400px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {activeVideo.videoUrl.includes('instagram.com') ? (
                <iframe
                  src={`https://www.instagram.com/reel/${activeVideo.videoUrl.match(/\/reel\/([a-zA-Z0-9_-]+)/)?.[1] || ''}/embed/`}
                  className="w-full h-full border-none rounded-3xl"
                  allowFullScreen
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={activeVideo.title}
                />
              ) : (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPortfolio;
