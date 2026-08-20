import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';
import { Search, Command as CommandIcon, Slash } from 'lucide-react';
import { cn } from '../../lib/utils';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <div 
          className="fixed inset-0 z-[10000] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Command>
              <div className="flex items-center px-4 py-3 border-b border-white/5 gap-3">
                <Search size={16} className="text-slate-500" />
                <Command.Input
                  autoFocus
                  placeholder="Quick search... (Ctrl+K)"
                  className="bg-transparent border-none outline-none text-white w-full font-medium placeholder:text-slate-600 animate-none"
                />
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-slate-500">
                  <CommandIcon size={10} /> K
                </div>
              </div>

              <Command.List className="p-2 max-h-[400px] overflow-y-auto">
                <div className="px-2 py-4">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 px-2">Projects</div>
                  {projects.map((p) => (
                    <Command.Item
                      key={p.id}
                      onSelect={() => {
                        navigate(`/project/${p.id}`);
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-mint transition-colors cursor-pointer group"
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-sm font-medium">{p.title}</span>
                      <span className="ml-auto text-[10px] font-mono text-slate-600 group-hover:text-mint/50">Enter</span>
                    </Command.Item>
                  ))}
                </div>

                <div className="px-2 py-4 border-t border-white/5">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 px-2">Actions</div>
                  <Command.Item
                    onSelect={() => {
                      navigate('/');
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-mint transition-colors cursor-pointer"
                  >
                    <Slash size={14} />
                    <span className="text-sm font-medium">Home</span>
                  </Command.Item>
                </div>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
