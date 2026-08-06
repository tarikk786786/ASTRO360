import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Compass, Sun, Moon, CloudMoon, Bot, Clock, Activity,
  Heart, Award, Layers, X, Sparkles, BookOpen, ShieldCheck
} from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export default function CommandPaletteModal({ isOpen, onClose, onNavigate }: CommandPaletteModalProps) {
  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (tab: string) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-2xl w-full rounded-3xl bg-[#111827] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden relative"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0B1220]">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#06B6D4]" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                ASTRO360 Command Palette <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 text-[10px]">Ctrl+K</kbd>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <Command className="w-full text-white bg-transparent font-sans">
            <div className="flex items-center border-b border-white/10 px-4 py-3">
              <Search className="w-4 h-4 text-[#06B6D4] shrink-0 mr-3" />
              <Command.Input
                autoFocus
                placeholder="Type a command or search 150+ astrological tools..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none font-mono"
              />
            </div>

            <Command.List className="max-h-96 overflow-y-auto custom-scrollbar p-2 space-y-2">
              <Command.Empty className="p-8 text-center text-xs font-mono text-slate-400">
                No matching astrological tools or traditions found.
              </Command.Empty>

              <Command.Group heading="🪐 Primary Planetary Engines" className="text-[10px] font-mono text-cyan-400 px-2 py-1 font-bold">
                <Command.Item
                  onSelect={() => handleSelect('birth-chart')}
                  className="p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">Birth Chart & Natal Kundli</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Ephemeris & Houses</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect('horoscope')}
                  className="p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-white">Daily Horoscope & Planetary Transits</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Lahiri Sidereal</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect('live-diagnostics')}
                  className="p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-rose-400" />
                    <span className="font-semibold text-white">Live Cosmic Diagnostics & Solutions</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">What / Why / Remedy</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="🕌 Islamic & Multi-Faith Suite" className="text-[10px] font-mono text-emerald-400 px-2 py-1 font-bold">
                <Command.Item
                  onSelect={() => handleSelect('islamic-suite')}
                  className="p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Moon className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-white">Holy Qur'an & Sahih Hadith Hub</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">28 Mansions & Abjad</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect('remedies')}
                  className="p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span className="font-semibold text-white">Universal Remedies & Gemstones</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Natural Upratnas</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="💖 Love, Dreams & Full Directory" className="text-[10px] font-mono text-purple-400 px-2 py-1 font-bold">
                <Command.Item
                  onSelect={() => handleSelect('compatibility')}
                  className="p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span className="font-semibold text-white">36-Guna Kundli Matchmaker</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Ashta Koota Score</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect('dream-interpreter')}
                  className="p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <CloudMoon className="w-4 h-4 text-purple-400" />
                    <span className="font-semibold text-white">Subconscious Dream Interpretation Engine</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Symbolic AI Decoder</span>
                </Command.Item>

                <Command.Item
                  onSelect={() => handleSelect('tools-catalog')}
                  className="p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-white">Directory of 150+ Astrological Tools</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Full System Catalog</span>
                </Command.Item>
              </Command.Group>
            </Command.List>

            <div className="p-3 border-t border-white/10 bg-[#0B1220] flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">↑↓</kbd> to navigate
              </span>
              <span className="flex items-center gap-1">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Enter ↵</kbd> to select
              </span>
              <span className="flex items-center gap-1">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">ESC</kbd> to exit
              </span>
            </div>
          </Command>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
