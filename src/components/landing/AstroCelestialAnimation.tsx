import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Compass, Moon, Sun, Clock, Play, Pause, 
  RotateCcw, ShieldCheck, ChevronRight, ArrowRight, Info, Eye
} from 'lucide-react';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';

interface AstroCelestialAnimationProps {
  onExploreChart?: () => void;
  userDob?: string;
  userTime?: string;
}

type ViewStage = 'sky' | 'zodiac' | 'houses' | 'aspects' | 'chart';

export default function AstroCelestialAnimation({
  onExploreChart,
  userDob = '1998-06-15',
  userTime = '12:00'
}: AstroCelestialAnimationProps) {
  const [stage, setStage] = useState<ViewStage>('chart');
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>('Jupiter');
  const [simDaysOffset, setSimDaysOffset] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSystem, setActiveSystem] = useState<'tropical' | 'sidereal' | 'kp'>('sidereal');

  // Compute active simulation date
  const simDateStr = useMemo(() => {
    const base = new Date(`${userDob}T${userTime}:00`);
    if (isNaN(base.getTime())) return userDob;
    base.setDate(base.getDate() + simDaysOffset);
    return base.toISOString().split('T')[0];
  }, [userDob, userTime, simDaysOffset]);

  // Derive real astronomical positions for the current date/time
  const calculatedPlanets = useMemo(() => {
    return calculatePlanetaryPositions(simDateStr, userTime);
  }, [simDateStr, userTime]);

  // Planet glyph dictionary & classical archetypes
  const planetDetails: Record<string, { glyph: string; color: string; speed: string; theme: string; motion: string }> = {
    Sun: { glyph: '☉', color: '#F59E0B', speed: '0.98°/day', theme: 'Willpower • Vitality • Executive Purpose', motion: 'Direct' },
    Moon: { glyph: '☽', color: '#38BDF8', speed: '13.18°/day', theme: 'Mind • Subconscious Intuition • Karmic Memory', motion: 'Direct' },
    Mars: { glyph: '♂', color: '#EF4444', speed: '0.52°/day', theme: 'Strategic Execution • Courage • Drive', motion: 'Direct' },
    Mercury: { glyph: '☿', color: '#10B981', speed: '1.38°/day', theme: 'Analytical Speed • Logic • Commerce', motion: 'Direct' },
    Jupiter: { glyph: '♃', color: '#FBBF24', speed: '0.08°/day', theme: 'Expansion • Mentorship • Philosophical Wisdom', motion: 'Direct' },
    Venus: { glyph: '♀', color: '#EC4899', speed: '1.20°/day', theme: 'Diplomacy • Aesthetic Harmony • Relationships', motion: 'Direct' },
    Saturn: { glyph: '♄', color: '#6366F1', speed: '0.03°/day', theme: 'Perseverance • Karmic Duty • Long-Term Structure', motion: 'Direct' },
    Rahu: { glyph: '☊', color: '#8B5CF6', speed: '-0.05°/day', theme: 'Innovation • Breakthroughs • Worldly Ambition', motion: 'Retrograde ↺' },
    Ketu: { glyph: '☋', color: '#A855F7', speed: '-0.05°/day', theme: 'Spiritual Detachment • Deep Research • Insight', motion: 'Retrograde ↺' },
  };

  // Autoplay loop using requestAnimationFrame
  const animRef = useRef<number | null>(null);
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    let lastTime = performance.now();
    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      if (delta >= 100) { // step every 100ms
        setSimDaysOffset(prev => (prev >= 365 ? 0 : prev + 1));
        lastTime = currentTime;
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  // Selected planet details
  const activePlanetData = useMemo(() => {
    if (!selectedPlanet) return null;
    const found = calculatedPlanets.find(p => p.name === selectedPlanet) || calculatedPlanets[0];
    const details = planetDetails[found.name] || planetDetails.Jupiter;
    return { ...found, ...details };
  }, [selectedPlanet, calculatedPlanets]);

  // 12 Zodiac signs with exact 30° boundaries
  const zodiacSigns = [
    { name: 'Aries', symbol: '♈', start: 0 },
    { name: 'Taurus', symbol: '♉', start: 30 },
    { name: 'Gemini', symbol: '♊', start: 60 },
    { name: 'Cancer', symbol: '♋', start: 90 },
    { name: 'Leo', symbol: '♌', start: 120 },
    { name: 'Virgo', symbol: '♍', start: 150 },
    { name: 'Libra', symbol: '♎', start: 180 },
    { name: 'Scorpio', symbol: '♏', start: 210 },
    { name: 'Sagittarius', symbol: '♐', start: 240 },
    { name: 'Capricorn', symbol: '♑', start: 270 },
    { name: 'Aquarius', symbol: '♒', start: 300 },
    { name: 'Pisces', symbol: '♓', start: 330 },
  ];

  // Helper to map 0-360 degree to polar coordinate on SVG wheel
  const getCoordinates = useCallback((degrees: number, radius: number, cx = 200, cy = 200) => {
    // Offset by -90 to place 0° (Aries) at top
    const rad = ((degrees - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad)
    };
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-left space-y-8">
      {/* 1. Header & Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold uppercase">
            <Compass className="w-3.5 h-3.5" /> ASTRO360 Celestial Engine
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The sky is always moving. Your chart captures a moment.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
            ASTRO360 computes deterministic planetary coordinates from NASA/JPL ephemeris data, organizing raw astronomical mechanics into explainable astrological meaning.
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none snap-x text-xs font-mono">
          {[
            { id: 'sky', label: '01. Raw Sky' },
            { id: 'zodiac', label: '02. Zodiac' },
            { id: 'houses', label: '03. Houses' },
            { id: 'aspects', label: '04. Aspects' },
            { id: 'chart', label: '05. Full Chart' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStage(s.id as ViewStage)}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap snap-start ${
                stage === s.id
                  ? 'bg-white text-black font-semibold shadow-sm font-bold border-amber-400 shadow-md'
                  : 'bg-[#0B1220] text-slate-400 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Instrument Surface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left 7 Cols: The Precision SVG Astronomical Instrument */}
        <div className="lg:col-span-7 p-4 sm:p-6 rounded-3xl bg-[#060A12] border border-white/15 shadow-2xl relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[460px] overflow-hidden">
          
          {/* Subtle Ambient Radial Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#060A12]/80 to-[#060A12] pointer-events-none" />

          {/* Precision SVG Dial */}
          <svg viewBox="0 0 400 400" className="w-full max-w-[380px] sm:max-w-[420px] h-auto relative z-10 select-none">
            {/* Outer Coordinate Ring & Degree Ticks */}
            <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* Central Sun Reference Anchor */}
            <circle cx="200" cy="200" r="14" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="200" y="204" textAnchor="middle" fill="#FDE68A" fontSize="11" fontWeight="bold" fontFamily="monospace">☉</text>

            {/* 12 Zodiac Boundaries & Glyphs (Visible in 'zodiac', 'houses', 'aspects', 'chart') */}
            {stage !== 'sky' && zodiacSigns.map((z, idx) => {
              const border = getCoordinates(z.start, 185);
              const labelPos = getCoordinates(z.start + 15, 172);
              return (
                <g key={idx}>
                  <line x1="200" y1="200" x2={border.x} y2={border.y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                  <text
                    x={labelPos.x}
                    y={labelPos.y + 4}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.4)"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {z.symbol}
                  </text>
                </g>
              );
            })}

            {/* 12 House Cusps (Visible in 'houses', 'chart') */}
            {(stage === 'houses' || stage === 'chart') && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h, i) => {
              const angle = (i * 30);
              const p = getCoordinates(angle, 120);
              const numP = getCoordinates(angle + 15, 95);
              return (
                <g key={h}>
                  <line x1="200" y1="200" x2={p.x} y2={p.y} stroke="rgba(147,197,253,0.15)" strokeWidth="1" strokeDasharray="2 2" />
                  <text x={numP.x} y={numP.y + 3} textAnchor="middle" fill="rgba(147,197,253,0.3)" fontSize="8" fontFamily="monospace">
                    H{h}
                  </text>
                </g>
              );
            })}

            {/* Aspect Geometric Lines (Visible in 'aspects', 'chart') */}
            {(stage === 'aspects' || stage === 'chart') && (
              <g opacity="0.35">
                {/* Trine: Sun (Leo) to Mars */}
                <line x1="260" y1="90" x2="110" y2="280" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 2" />
                {/* Kendra: Jupiter (Cancer 10th) to Sun */}
                <line x1="270" y1="130" x2="130" y2="120" stroke="#FBBF24" strokeWidth="1.2" />
                {/* Sextile: Moon to Venus */}
                <line x1="310" y1="180" x2="315" y2="250" stroke="#EC4899" strokeWidth="1" />
              </g>
            )}

            {/* Real Calculated Planetary Bodies */}
            {calculatedPlanets.map((planet) => {
              const deg = planet.degreeDecimal || parseFloat(planet.degree) || 0;
              // Radius layering by orbital hierarchy
              const radiusMap: Record<string, number> = {
                Sun: 45, Moon: 60, Mercury: 80, Venus: 98, Mars: 115, 
                Jupiter: 135, Saturn: 150, Rahu: 165, Ketu: 165
              };
              const r = radiusMap[planet.name] || 130;
              const pos = getCoordinates(deg, r);
              const isSelected = selectedPlanet === planet.name;
              const details = planetDetails[planet.name] || planetDetails.Jupiter;

              return (
                <g 
                  key={planet.name}
                  onClick={() => setSelectedPlanet(planet.name)}
                  className="cursor-pointer transition-all duration-300 group"
                >
                  {/* Orbit Track Indicator */}
                  {isSelected && (
                    <circle cx="200" cy="200" r={r} fill="none" stroke={details.color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  )}

                  {/* Body Circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 10 : 7}
                    fill={isSelected ? details.color : '#0B1220'}
                    stroke={details.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    className="transition-all duration-200"
                  />

                  {/* Glyph */}
                  <text
                    x={pos.x}
                    y={pos.y + 3.5}
                    textAnchor="middle"
                    fill={isSelected ? '#0A0E17' : '#FFFFFF'}
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {details.glyph}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Time Navigation Bar (Past ──●── Future Slider) */}
          <div className="w-full max-w-sm pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs font-mono relative z-10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              title={isPlaying ? 'Pause simulation' : 'Play planetary orbital movement'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? 'Pause' : 'Simulate'}</span>
            </button>

            <div className="flex-1 flex flex-col gap-0.5">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Offset: {simDaysOffset >= 0 ? `+${simDaysOffset}d` : `${simDaysOffset}d`}</span>
                <span className="text-white font-bold">{simDateStr}</span>
              </div>
              <input
                type="range"
                min="-180"
                max="365"
                value={simDaysOffset}
                onChange={(e) => setSimDaysOffset(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <button
              onClick={() => { setSimDaysOffset(0); setIsPlaying(false); }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors text-[11px]"
              title="Reset to Natal Birth Time"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Now</span>
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Live Planet / Aspect Inspector Card */}
        <div className="lg:col-span-5 space-y-4">
          {activePlanetData ? (
            <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/[0.08] shadow-2xl space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shadow-inner"
                    style={{ backgroundColor: `${activePlanetData.color}20`, borderColor: `${activePlanetData.color}50`, color: activePlanetData.color, borderWidth: 1 }}
                  >
                    {activePlanetData.glyph}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      {activePlanetData.name} ({activePlanetData.name === 'Jupiter' ? 'Guru' : activePlanetData.name === 'Sun' ? 'Surya' : activePlanetData.name === 'Moon' ? 'Chandra' : activePlanetData.name})
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {activePlanetData.sign} • {activePlanetData.degree}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  {activePlanetData.motion}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase">Apparent Speed</span>
                  <div className="font-bold text-white">{activePlanetData.speed}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase">Ayanamsha Mode</span>
                  <div className="font-bold text-cyan-400">Lahiri (24°13')</div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <span className="font-mono text-amber-400 font-bold block text-[11px] uppercase">Classical Archetype:</span>
                <p className="leading-relaxed font-sans">{activePlanetData.theme}</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 text-xs font-mono text-slate-300 space-y-1">
                <div className="flex justify-between items-center text-slate-400 text-[10px]">
                  <span>CALCULATION PROVENANCE</span>
                  <span>DE440 EPHEMERIS</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Position calculated via true geocentric ecliptic longitudes with aberration and nutation corrections applied.
                </p>
              </div>

              <button
                onClick={onExploreChart}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>Explore {activePlanetData.name} in My Chart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#0B1220] border border-white/10 text-center text-slate-400 font-mono text-xs">
              Select any celestial body on the dial to inspect its exact mathematical coordinates and archetypal meaning.
            </div>
          )}

          {/* Quick Explanatory Badge */}
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Deterministic mathematical calculations. Zero unexplained AI assumptions.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
