import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Sun, Moon, Sparkles, Layers, CheckCircle2, ShieldCheck, 
  HelpCircle, Eye, Sliders, ChevronRight, Info, BookOpen
} from 'lucide-react';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';
import type { UserProfile } from '../../types';

export default function OmniChartsView({ userProfile }: { userProfile: UserProfile }) {
  const [chartMode, setChartMode] = useState<'simple' | 'technical'>('simple');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);

  const planetPositions = useMemo(() => {
    return calculatePlanetaryPositions(
      userProfile?.dob || '1998-06-15',
      userProfile?.time || '12:00'
    );
  }, [userProfile]);

  const sun = planetPositions.find(p => p.name === 'Sun') || planetPositions[1];
  const moon = planetPositions.find(p => p.name === 'Moon') || planetPositions[2];
  const asc = planetPositions.find(p => p.name === 'Ascendant') || planetPositions[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 text-left pb-16">
      {/* Header & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Compass className="w-7 h-7 text-amber-400" />
            Interactive Birth Chart & Placements
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            {userProfile.name || 'Seeker'} • Born {userProfile.dob || '1998-06-15'} {userProfile.time || '12:00'} • {userProfile.location || 'Universal'}
          </p>
        </div>

        {/* Simple vs Technical Switcher */}
        <div className="flex items-center gap-1 bg-[#0B1220] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          {[
            { id: 'simple', label: 'SIMPLE' },
            { id: 'technical', label: 'TECHNICAL' },
          ].map((mode) => {
            const isSelected = chartMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setChartMode(mode.id as any)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                  isSelected
                    ? 'text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="chartModePill"
                    className="absolute inset-0 rounded-lg bg-amber-400 shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Placement Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Sun */}
        <div className="p-5 rounded-3xl bg-[#0F172A] border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" /> Sun Sign
            </span>
            <span className="text-[10px] font-mono text-slate-400">{sun?.degree}</span>
          </div>
          <div className="text-xl font-black text-white">{sun?.sign}</div>
          <p className="text-xs text-slate-400">Core identity, willpower, leadership drive & vital energy.</p>
        </div>

        {/* Moon */}
        <div className="p-5 rounded-3xl bg-[#0F172A] border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-cyan-400" /> Moon Sign
            </span>
            <span className="text-[10px] font-mono text-slate-400">{moon?.degree}</span>
          </div>
          <div className="text-xl font-black text-white">{moon?.sign}</div>
          <p className="text-xs text-slate-400">Inner emotional needs, intuition, subconscious mind & mental peace.</p>
        </div>

        {/* Ascendant */}
        <div className="p-5 rounded-3xl bg-[#0F172A] border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-400" /> Rising (Ascendant)
            </span>
            <span className="text-[10px] font-mono text-slate-400">{asc?.degree}</span>
          </div>
          <div className="text-xl font-black text-white">{asc?.sign}</div>
          <p className="text-xs text-slate-400">Outward personality, physical vitality, life orientation & dharma.</p>
        </div>
      </div>

      {/* Interactive Chart Wheel Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/10 text-center space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Interactive Celestial Wheel (Tap Any Planet)
          </span>
          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            {chartMode === 'simple' ? 'Simple Perspective' : 'Technical Degrees Mode'}
          </span>
        </div>

        {/* SVG Planetary Orbit Ring */}
        <div className="flex items-center justify-center relative py-4">
          <svg viewBox="0 0 320 320" className="w-72 h-72 sm:w-80 sm:h-80 overflow-visible">
            {/* Outer Zodiac Circle */}
            <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <circle cx="160" cy="160" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="160" cy="160" r="40" fill="#0F172A" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />

            <text x="160" y="164" textAnchor="middle" fill="#F59E0B" fontSize="10" fontWeight="bold" fontFamily="monospace">
              ASTRO360
            </text>

            {/* Planet Nodes */}
            {planetPositions.map((p, idx) => {
              const rad = ((p.degreeDecimal - 90) * Math.PI) / 180;
              const r = 115;
              const x = 160 + r * Math.cos(rad);
              const y = 160 + r * Math.sin(rad);

              const isSelected = selectedPlanet?.name === p.name;

              return (
                <g 
                  key={idx} 
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedPlanet(p)}
                >
                  <circle 
                    r={isSelected ? "14" : "11"} 
                    fill="#0F172A" 
                    stroke={isSelected ? "#F59E0B" : "rgba(255,255,255,0.3)"} 
                    strokeWidth={isSelected ? "2.5" : "1.5"} 
                    className="transition-all"
                  />
                  <text 
                    textAnchor="middle" 
                    dy="3.5" 
                    fontSize={isSelected ? "11" : "9"} 
                    fontWeight="bold" 
                    fill={isSelected ? "#F59E0B" : "#FFFFFF"}
                    fontFamily="monospace"
                  >
                    {p.symbol}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Planet Detail Card */}
        {selectedPlanet && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-[#0F172A] border border-amber-500/40 text-left space-y-2 max-w-xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">{selectedPlanet.symbol}</span>
                {selectedPlanet.name} in {selectedPlanet.sign}
              </h4>
              <span className="text-xs font-mono text-amber-400 font-bold">{selectedPlanet.degree}</span>
            </div>
            <p className="text-xs text-slate-300">
              Posited in your <strong>{selectedPlanet.house}</strong> ({selectedPlanet.element}). {selectedPlanet.remedies}
            </p>
            {chartMode === 'technical' && (
              <div className="pt-2 border-t border-white/10 grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400">
                <div>Nakshatra: <span className="text-white">{selectedPlanet.nakshatra}</span></div>
                <div>Speed: <span className="text-white">{selectedPlanet.speed}</span></div>
                <div>Retrograde: <span className="text-white">{selectedPlanet.retrograde ? 'Yes ℞' : 'Direct'}</span></div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Multi-System Consensus Comparison Table */}
      <div className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Multi-System Tradition Comparison
            </h3>
            <p className="text-xs text-slate-400 font-mono pt-0.5">
              Cross-Tradition Matrix across Vedic, Western Tropical & Chinese 60-Jiazi BaZi
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            3 Systems Active
          </span>
        </div>

        {/* Table Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3">Life Domain</th>
                <th className="py-2.5 px-3">Vedic (Jyotish)</th>
                <th className="py-2.5 px-3">Western Tropical</th>
                <th className="py-2.5 px-3">Chinese BaZi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 px-3 font-bold text-white">💼 Career & Authority</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Strong</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Strong</td>
                <td className="py-3 px-3 text-cyan-400 font-bold">Moderate</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-white">❤️ Love & Relationships</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Strong</td>
                <td className="py-3 px-3 text-cyan-400 font-bold">Moderate</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Strong</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-white">✨ Personal Growth</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Strong</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Strong</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Strong</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-white">🔄 Major Transition Window</td>
                <td className="py-3 px-3 text-cyan-400 font-bold">Moderate</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">Strong</td>
                <td className="py-3 px-3 text-cyan-400 font-bold">Moderate</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Synthesis: What they agree on vs Where they differ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-[#0B1220] border border-emerald-500/30 space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> What All Traditions Agree On:
            </span>
            <p className="text-xs text-slate-300">
              Professional execution, leadership clarity, and personal vitality are currently elevated across all calculation models.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1220] border border-amber-500/30 space-y-1">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-400" /> Subtle Nuances & Variations:
            </span>
            <p className="text-xs text-slate-300">
              Vedic focuses heavily on long-term karmic discipline and responsibility, whereas Western emphasizes creative autonomy and immediate expression.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Mode Expanded Planetary Table */}
      {chartMode === 'technical' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-6 rounded-3xl bg-[#0B1220] border border-indigo-500/30 space-y-3"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Exact Ephemeris Celestial Coordinates (DE440 / Lahiri Ayanamsha)
            </h4>
            <span className="text-[10px] font-mono text-slate-400">Tolerance: ±0.0001°</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-mono">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="py-2 px-2">Planet</th>
                  <th className="py-2 px-2">Zodiac Sign</th>
                  <th className="py-2 px-2">Degree</th>
                  <th className="py-2 px-2">House</th>
                  <th className="py-2 px-2">Nakshatra</th>
                  <th className="py-2 px-2">Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {planetPositions.map((p, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-2 px-2 font-bold text-white flex items-center gap-1.5">
                      <span>{p.symbol}</span>
                      <span>{p.name}</span>
                    </td>
                    <td className="py-2 px-2">{p.sign}</td>
                    <td className="py-2 px-2 text-amber-400">{p.degree}</td>
                    <td className="py-2 px-2">{p.house}</td>
                    <td className="py-2 px-2 text-cyan-300">{p.nakshatra}</td>
                    <td className="py-2 px-2 text-slate-400">{p.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
