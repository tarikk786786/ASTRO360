import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, LayoutDashboard, Activity, ShieldCheck, Gem, HeartHandshake, Globe, Compass, X, Command, ArrowRight } from 'lucide-react';
import { TRADITIONS } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
}

export default function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mainCommands: CommandItem[] = [
    { id: 'dashboard', title: 'Dashboard', category: 'Navigation', icon: <LayoutDashboard className="w-4 h-4 text-cosmic-400" /> },
    { id: 'problem-solver', title: 'Interactive Problem Tools (Panic, Sleep, Disputes, Aura)', category: 'Tools', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
    { id: 'advisor', title: 'Life Problems & Holistic Remedy Advisor (10 Categories)', category: 'Tools', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { id: 'islamic-suite', title: 'Unified Islamic Suite (99 Names, Tasbeeh, Adhkar, Qibla, Hijri)', category: 'Tools', icon: <Compass className="w-4 h-4 text-emerald-400" /> },
    { id: 'dream-interpreter', title: 'Dream Interpretation Engine (16 Symbols, REM, Lucid Guide)', category: 'Tools', icon: <Globe className="w-4 h-4 text-purple-400" /> },
    { id: 'live-diagnostics', title: 'Live Cosmic Diagnostics (What & Solution)', category: 'Navigation', icon: <Activity className="w-4 h-4 text-amber-400" /> },
    { id: 'remedies', title: 'Remedial Gemstones & Yantras', category: 'Navigation', icon: <Gem className="w-4 h-4 text-yellow-400" /> },
    { id: 'custom-remedies', title: 'Problem & Solution (By Medium)', category: 'Navigation', icon: <HeartHandshake className="w-4 h-4 text-amber-400" /> },
    { id: 'synastry', title: 'Synastry & Team Matcher', category: 'Navigation', icon: <Sparkles className="w-4 h-4 text-pink-400" /> },
    { id: 'global-suite', title: 'Global Universal Wisdom Suite', category: 'Navigation', icon: <Globe className="w-4 h-4 text-cyan-400" /> },
    { id: 'tools-catalog', title: '150+ Astrological & Spiritual Tools Catalog', category: 'Navigation', icon: <Compass className="w-4 h-4 text-purple-400" /> }
  ];

  const traditionCommands: CommandItem[] = Object.keys(TRADITIONS).map(key => ({
    id: key,
    title: TRADITIONS[key].name,
    category: 'Astrology Traditions',
    icon: <Sparkles className="w-4 h-4 text-cosmic-400" />
  }));

  const allCommands = [...mainCommands, ...traditionCommands];

  const filteredCommands = allCommands.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          onNavigate(filteredCommands[selectedIndex].id);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onNavigate, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="w-full max-w-xl glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
        >
          {/* Search Input Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-slate-950/60">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search tools, traditions, diagnostics... (Use ↑↓ arrows)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500 font-sans"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Command Palette"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Commands List */}
          <div className="max-h-[360px] overflow-y-auto custom-scrollbar p-2 space-y-1">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={`${cmd.category}-${cmd.id}`}
                    onClick={() => {
                      onNavigate(cmd.id);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-cosmic-500/20 to-nebula-500/20 text-white font-semibold border border-cosmic-500/30'
                        : 'text-slate-300 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {cmd.icon}
                      <span className="text-left font-sans">{cmd.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-mono">{cmd.category}</span>
                      {isSelected && <ArrowRight className="w-3.5 h-3.5 text-cosmic-400" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-10 text-center text-xs text-slate-500 font-sans">
                No matching tools or traditions found.
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-t border-white/5 text-[10px] text-slate-500 font-mono">
            <div className="flex items-center gap-3">
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-sans">↑↓</kbd> Navigate</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-sans">↵</kbd> Select</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-sans">ESC</kbd> Close</span>
            </div>
            <div className="flex items-center gap-1">
              <Command className="w-3 h-3 text-slate-400" />
              <span>Cosmos Universal Engine</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
