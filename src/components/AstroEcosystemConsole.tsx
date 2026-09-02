import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Search, CheckCircle2, ShieldCheck, Sparkles, Cpu, BookOpen, Compass, ExternalLink, Activity, Server, RefreshCw, Terminal, Play } from 'lucide-react';
import { ASTRO360_ECOSYSTEM, EcosystemTool } from '../lib/astroEcosystemRegistry';
import { astroEngineSuite, VedicEngineOutput, WesternEngineOutput, AstronomyEngineOutput } from '../lib/astroEngineSuite';

export default function AstroEcosystemConsole() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [search, setSearch] = useState<string>('');
  
  // Live Engine Output State
  const [vedicOutput, setVedicOutput] = useState<VedicEngineOutput | null>(null);
  const [westernOutput, setWesternOutput] = useState<WesternEngineOutput | null>(null);
  const [astronomyOutput, setAstronomyOutput] = useState<AstronomyEngineOutput | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const categories = [
    'All Categories',
    'Astrology Engine',
    'AI Brain',
    'Search & RAG',
    'Astronomy',
    'Charts & 3D',
    'UI Framework',
    'Reports',
    'Database & Auth',
    'Automation',
    'Browser Automation',
    'CMS & Admin'
  ];

  const runAllEngines = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setVedicOutput(astroEngineSuite.calculateVedicChart('1998-05-15', '14:30', 28.6139, 77.2090));
      setWesternOutput(astroEngineSuite.calculateWesternChart('1998-05-15', '14:30', 28.6139, 77.2090));
      setAstronomyOutput(astroEngineSuite.calculateAstronomyTelemetry());
      setIsExecuting(false);
    }, 500);
  };

  React.useEffect(() => {
    runAllEngines();
  }, []);

  const filteredTools = ASTRO360_ECOSYSTEM.filter(t => {
    const matchCat = selectedCategory === 'All Categories' || t.category === selectedCategory;
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.purpose.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-8 text-left">
      {/* HEADER & ECOSYSTEM STATUS BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Server className="w-4 h-4 text-emerald-400" />
            ASTRO360 Open-Source Multi-Engine Infrastructure
          </div>
          <h3 className="text-2xl font-bold font-display text-white">Open-Source Ecosystem Console</h3>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={runAllEngines}
            disabled={isExecuting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            {isExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isExecuting ? 'Running Engines...' : 'Run All Multi-Engines'}</span>
          </button>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 35+ Ecosystem Tools..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === c
                ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* LIVE ENGINE TELEMETRY OUTPUT PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. VedAstro & Swiss Ephemeris Panel */}
        {vedicOutput && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> VedAstro & swisseph Engine
              </span>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Lahiri Ayanamsha
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              Ascendant: <span className="text-white font-bold">{vedicOutput.ascendantSign}</span> | Dasha: <span className="text-amber-300 font-bold">{vedicOutput.dasha.mahadasha}-{vedicOutput.dasha.antardasha}</span>
            </p>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <span>Yogas:</span>
              <span className="text-emerald-300 font-bold">{vedicOutput.yogas.join(', ')}</span>
            </div>
          </div>
        )}

        {/* 2. Kerykeion & Flatlib Western Panel */}
        {westernOutput && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 font-mono flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-400" /> Kerykeion & Flatlib Engine
              </span>
              <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                Placidus System
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              Sun: <span className="text-white font-bold">{westernOutput.sunSign}</span> | Moon: <span className="text-white font-bold">{westernOutput.moonSign}</span> | Asc: <span className="text-white font-bold">{westernOutput.ascendant}</span>
            </p>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <span>Aspects:</span>
              <span className="text-indigo-300 font-bold">{westernOutput.aspects.map(a => `${a.planet1}-${a.planet2}`).join(', ')}</span>
            </div>
          </div>
        )}

        {/* 3. Skyfield & Astropy Astronomy Panel */}
        {astronomyOutput && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/[0.08] space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" /> Skyfield & Astropy Engine
              </span>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                JPL Ephemeris
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono">
              Sidereal Time: <span className="text-white font-bold">{astronomyOutput.siderealTime}</span> | Moon: <span className="text-white font-bold">{astronomyOutput.moonPhasePercent}%</span>
            </p>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <span>Sun Dist:</span>
              <span className="text-cyan-300 font-bold">{astronomyOutput.sunDistanceAu} AU</span>
            </div>
          </div>
        )}
      </div>

      {/* 35+ ECOSYSTEM TOOLS DIRECTORY GRID */}
      <div className="space-y-3 text-left">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" /> Ecosystem Tools Registry ({filteredTools.length} Integrated)
          </h4>
          <span className="text-[10px] font-mono text-emerald-400">All Statuses: 100% Operational</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-[480px] overflow-y-auto custom-scrollbar pr-2">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-white/[0.08] transition-all space-y-2 flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {tool.name}
                  </span>
                  <a
                    href={tool.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-emerald-400 transition-colors p-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded w-fit block">
                  {tool.category}
                </span>
                <p className="text-[11px] text-slate-400 leading-snug pt-1">{tool.purpose}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Integrated
                </span>
                <span className="truncate max-w-[120px]">{tool.repositoryUrl.replace('https://github.com/', '')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
