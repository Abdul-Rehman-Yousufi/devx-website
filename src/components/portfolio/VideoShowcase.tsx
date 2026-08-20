import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Sparkles, ArrowRight } from 'lucide-react';
import { InstagramLogoIcon as Instagram } from '@radix-ui/react-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VideoItem {
  id: string;
  title: string;
  category: string;
  views: string;
  likes: string;
  platform: 'Instagram' | 'YouTube' | 'TikTok';
  videoUrl: string; // The URL to play in the modal
  previewUrl: string; // Fast silent looping preview MP4
  thumbnail: string;
  techniques: string[];
}

const VIDEOS: VideoItem[] = [
  {
    id: "arcade-neon",
    title: "Arcade Retro Motion Design",
    category: "VFX & Sound Design",
    views: "2.4M",
    likes: "210K",
    platform: "Instagram",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-retro-arcade-game-41870-large.mp4",
    previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-retro-arcade-game-41870-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
    techniques: ["Speed Ramping", "Retro Grade", "Audio Synced Beat"]
  },
  {
    id: "neon-dance",
    title: "Cyberpunk Dance Promo",
    category: "Commercial Reel",
    views: "4.8M",
    likes: "420K",
    platform: "Instagram",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-41865-large.mp4",
    previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-41865-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    techniques: ["Glow VFX", "Match Cuts", "Color Correction"]
  },
  {
    id: "equalizer-vibe",
    title: "Audio Gear Product Showcase",
    category: "Social Media Campaign",
    views: "1.1M",
    likes: "85K",
    platform: "Instagram",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-sound-on-an-equalizer-41869-large.mp4",
    previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-sound-on-an-equalizer-41869-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    techniques: ["Macro Detail", "Sound FX Layering", "Speed Ramps"]
  },
  {
    id: "dj-vibe",
    title: "Vibrant DJ Set Visualizer",
    category: "Music Video Edit",
    views: "3.2M",
    likes: "290K",
    platform: "Instagram",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-style-dj-playing-music-41864-large.mp4",
    previewUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-style-dj-playing-music-41864-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    techniques: ["Frame Holds", "Vaporwave Tone", "Dynamic Textures"]
  }
];

const VideoCard = ({ video, onPlay }: { video: VideoItem; onPlay: (v: VideoItem) => void }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (hovered) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [hovered]);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden aspect-[9/16] cursor-pointer flex flex-col justify-between p-6 select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(video)}
      data-cursor="link"
    >
      {/* Background Static Thumbnail */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10" />
      </div>

      {/* Hover Looping Video Preview */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-0 group-hover:opacity-75 transition-opacity duration-500">
        <video
          ref={videoRef}
          src={video.previewUrl}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-10" />
      </div>

      {/* Top Details (Stats & Platform) */}
      <div className="relative z-20 flex justify-between items-center">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 backdrop-blur-md">
          <Instagram size={12} className="text-pink-500" />
          <span className="text-[9px] font-mono text-slate-600 font-bold uppercase tracking-wider">{video.views} Views</span>
        </div>

        <div className="w-8 h-8 rounded-full bg-white group-hover:bg-blue-500 text-slate-800 group-hover:text-white flex items-center justify-center border border-slate-200 group-hover:border-blue-500 transition-colors duration-300 shadow-sm">
          <Play size={14} className="fill-current group-hover:fill-white ml-0.5" />
        </div>
      </div>

      {/* Bottom Details */}
      <div className="relative z-20 space-y-4">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-blue-500 uppercase tracking-widest font-bold">{video.category}</span>
          <h3 className="text-xl font-black italic uppercase leading-none tracking-tight text-slate-900 group-hover:text-blue-500 transition-colors">
            {video.title}
          </h3>
        </div>

        {/* Techniques Tag List */}
        <div className="flex flex-wrap gap-1">
          {video.techniques.map((t) => (
            <span
              key={t}
              className="text-[8px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const VideoShowcase = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".video-grid-item", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#video-showcase",
          start: "top 75%",
          once: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="video-showcase" ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-slate-50 relative border-y border-slate-200">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      {/* Section Header */}
      <div className="relative mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-blue-500" />
            <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-blue-500 font-bold">
              Creative Direction / 05
            </p>
          </div>
          <h2 className="font-display font-black tracking-tighter leading-[0.85] text-slate-900" style={{ fontSize: 'clamp(48px, 9vw, 90px)' }}>
            VIRAL MOTION<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500">
              ENGINES.
            </span>
          </h2>
        </div>
        <p className="text-slate-600 max-w-sm text-sm leading-relaxed mb-2 font-medium">
          Showcasing fast-paced editing, precise color-grading, and high-impact VFX engineered to drive millions of impressions and capture viewer retention.
        </p>
      </div>

      {/* 9:16 Vertical Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {VIDEOS.map((v) => (
          <div key={v.id} className="video-grid-item">
            <VideoCard video={v} onPlay={setActiveVideo} />
          </div>
        ))}
      </div>

      {/* Social Proof CTA */}
      <div className="mt-20 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/5 border border-blue-500/20 text-blue-500">
            <Sparkles size={24} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Got Millions of Views on Short-Form?</h4>
            <p className="text-slate-500 text-xs mt-1">Let's edit your reels, shorts, and TikToks to command high audience engagement and conversion.</p>
          </div>
        </div>

        <a
          href="https://wa.me/919259269317"
          target="_blank"
          rel="noopener noreferrer"
          className="group px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-colors duration-300 flex items-center gap-2 shrink-0 z-10"
        >
          Partner with me <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </a>
      </div>

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
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 z-[11010]"
              data-cursor="link"
            >
              <X size={20} />
            </button>

            {/* Video Container (Classic 9:16 Center Placement) */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Stop closing click
            >
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoShowcase;
