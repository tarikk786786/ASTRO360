import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Search, CheckCircle2, ShieldCheck, Sparkles, Cpu, BookOpen, Compass, Activity, Server, ArrowRight } from 'lucide-react';
import { ASTRO360_PRD_MODULES, PrdModule } from '../lib/astroPrdRegistry';

interface AstroPrdModuleHubProps {
  onSelectModule?: (moduleId: number) => void;
}

export default function AstroPrdModuleHub({ onSelectModule }: AstroPrdModuleHubProps) {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModule, setActiveModule] = useState<PrdModule>(ASTRO360_PRD_MODULES[0]);

  const categories = [
    { id: 'all', label: 'All 30 PRD Modules' },
    { id: 'core', label: 'Core AI & Astronomy' },
    { id: 'astrology', label: 'Vedic & Kundli' },
    { id: 'divination', label: 'Divination & Dreams' },
    { id: 'remedies', label: 'Sacred Remedies' },
    { id: 'learning', label: 'Learning & RAG' },
    { id: 'system', label: 'System & Infra' }
  ];

  const filteredModules = ASTRO360_PRD_MODULES.filter(m => {
    const matchCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.description.toLowerCase().includes(search.toLowerCase()) ||
                        String(m.id) === search;
    return matchCat && matchSearch;
  });

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl space-y-8 text-left">
      {/* HEADER & PRD STATUS BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-indigo-400" />
            ASTRO360 30-Module Independent Architecture
          </div>
          <h3 className="text-2xl font-bold font-display text-white">ASTRO360 PRD Engine Hub</h3>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 30 PRD Modules..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === c.id
                ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* ACTIVE MODULE HIGHLIGHT BANNER */}
      {activeModule && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                Module #{activeModule.id}
              </span>
              <span className="text-xs font-bold text-white font-display">{activeModule.name}</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Fully Operational Engine
            </span>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">{activeModule.description}</p>

          <div className="flex items-center gap-2 flex-wrap pt-1">
            {activeModule.features.map((feat, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-indigo-400" /> {feat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 30 PRD MODULES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {filteredModules.map((m) => {
          const isSelected = activeModule.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setActiveModule(m);
                if (onSelectModule) onSelectModule(m.id);
              }}
              className={`p-4 rounded-2xl border text-left transition-all space-y-2 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-500/20 border-indigo-500/50 shadow-md scale-[1.01]'
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                  M{m.id}
                </span>
                <span className="text-[9px] uppercase font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  {m.category}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-tight">{m.name}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-normal">{m.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
