import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Moon, Info, ShieldCheck, Compass, Activity, Eye, Layers, Volume2, VolumeX } from 'lucide-react';
import type { PlanetPosition } from '../lib/astroCalculations';
import { playSolfeggioTone, stopSolfeggioTone } from '../lib/audioResonator';

interface CelestialZodiacOrbitProps {
  planetPositions: PlanetPosition[];
  onSelectPlanet?: (planet: PlanetPosition) => void;
}

const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Aries', deg: 0, color: 'text-red-400', element: 'Fire 🔥' },
  { symbol: '♉', name: 'Taurus', deg: 30, color: 'text-emerald-400', element: 'Earth 🌍' },
  { symbol: '♊', name: 'Gemini', deg: 60, color: 'text-cyan-400', element: 'Air 💨' },
  { symbol: '♋', name: 'Cancer', deg: 90, color: 'text-indigo-400', element: 'Water 🌊' },
  { symbol: '♌', name: 'Leo', deg: 120, color: 'text-amber-400', element: 'Fire 🔥' },
  { symbol: '♍', name: 'Virgo', deg: 150, color: 'text-emerald-400', element: 'Earth 🌍' },
  { symbol: '♎', name: 'Libra', deg: 180, color: 'text-pink-400', element: 'Air 💨' },
  { symbol: '♏', name: 'Scorpio', deg: 210, color: 'text-red-400', element: 'Water 🌊' },
  { symbol: '♐', name: 'Sagittarius', deg: 240, color: 'text-purple-400', element: 'Fire 🔥' },
  { symbol: '♑', name: 'Capricorn', deg: 270, color: 'text-slate-300', element: 'Earth 🌍' },
  { symbol: '♒', name: 'Aquarius', deg: 300, color: 'text-cyan-400', element: 'Air 💨' },
  { symbol: '♓', name: 'Pisces', deg: 330, color: 'text-indigo-400', element: 'Water 🌊' },
];

const SIGN_BASE_DEGREES: Record<string, number> = {
  'Aries': 0, 'Taurus': 30, 'Gemini': 60, 'Cancer': 90,
  'Leo': 120, 'Virgo': 150, 'Libra': 180, 'Scorpio': 210,
  'Sagittarius': 240, 'Capricorn': 270, 'Aquarius': 300, 'Pisces': 330
};

const PLANET_FREQUENCIES: Record<string, number> = {
  'Sun': 528,
  'Moon': 432,
  'Jupiter': 639,
  'Venus': 741,
  'Mars': 396,
  'Mercury': 417,
  'Saturn': 852,
  'Rahu': 963,
  'Ketu': 174,
};

export default function CelestialZodiacOrbit({ planetPositions, onSelectPlanet }: CelestialZodiacOrbitProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetPosition | null>(null);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);

  // Parse numeric degree from string e.g. "14° 22'" -> 14.36
  const getDegreeValue = (degStr: string): number => {
    const match = degStr?.match(/(\d+)°/);
    return match ? parseInt(match[1], 10) : 15;
  };

  const planetNodes = useMemo(() => {
    return planetPositions.map((p, idx) => {
      const baseDeg = SIGN_BASE_DEGREES[p.sign] ?? (idx * 40);
      const inSignDeg = getDegreeValue(p.degree);
      const totalDeg = (baseDeg + inSignDeg - 90) * (Math.PI / 180);
      const orbitRadius = 118 - ((idx % 3) * 16);
      const x = orbitRadius * Math.cos(totalDeg);
      const y = orbitRadius * Math.sin(totalDeg);
      return { ...p, x, y, totalDeg, orbitRadius };
    });
  }, [planetPositions]);

  const handlePlanetClick = (planet: PlanetPosition) => {
    onSelectPlanet?.(planet);
    const freq = PLANET_FREQUENCIES[planet.name] || 528;
    setActiveFrequency(freq);
    setIsPlayingAudio(true);
    playSolfeggioTone(freq, 0.2, 'binaural', 5.0);
    setTimeout(() => {
      stopSolfeggioTone();
      setIsPlayingAudio(false);
      setActiveFrequency(null);
    }, 2800);
  };

  return (
    <div 
      role="img"
      aria-label="360-Degree Animated Zodiac Orbit and Ephemeris Wheel showing real-time planetary positions"
      className="relative w-full aspect-square max-w-[390px] mx-auto flex items-center justify-center p-2 sm:p-4 text-left group select-none"
    >
      {/* 3D PERSPECTIVE TILT TOGGLE BUTTON */}
      <div className="absolute top-2 right-2 z-40 flex items-center gap-1.5">
        <button
          onClick={() => setIs3DMode(!is3DMode)}
          className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-mono font-bold flex items-center gap-1 border border-white/10 cursor-pointer transition-all shadow-md active:scale-95"
        >
          <Layers className="w-3 h-3 text-cyan-400" />
          {is3DMode ? '2D View' : '3D Orbit View'}
        </button>
      </div>

      {/* AUDIO RESONANCE STATUS BADGE */}
      {isPlayingAudio && activeFrequency && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-2 left-2 z-40 px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg"
        >
          <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          <span>Resonating {activeFrequency} Hz</span>
        </motion.div>
      )}

      {/* Radiant Glowing Nebula Backdrop */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/25 to-amber-500/20 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      {/* MAIN CONTAINER WITH 3D PERSPECTIVE TRANSFORM */}
      <div 
        style={{
          transform: is3DMode ? 'perspective(800px) rotateX(46deg) rotateZ(-12deg)' : 'none',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative w-full h-full flex items-center justify-center pointer-events-auto"
      >
        {/* SVG ASPECT RAYS (Interconnecting Aspect Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="-195 -195 390 390">
          {/* Subtle connecting trines & sextiles */}
          {planetNodes.length >= 2 && (
            <>
              <line 
                x1={planetNodes[0].x} y1={planetNodes[0].y} 
                x2={planetNodes[1].x} y2={planetNodes[1].y} 
                stroke="rgba(6, 182, 212, 0.25)" 
                strokeWidth="1.2" 
                strokeDasharray="3 3" 
              />
              {planetNodes[2] && (
                <line 
                  x1={planetNodes[1].x} y1={planetNodes[1].y} 
                  x2={planetNodes[2].x} y2={planetNodes[2].y} 
                  stroke="rgba(212, 175, 55, 0.25)" 
                  strokeWidth="1.2" 
                  strokeDasharray="4 4" 
                />
              )}
            </>
          )}
        </svg>

        {/* Outer Zodiac Belt Ring */}
        <div className="absolute inset-2 rounded-full border border-blue-500/25 flex items-center justify-center pointer-events-none">
          {ZODIAC_SIGNS.map((z, idx) => {
            const angleRad = (z.deg - 90) * (Math.PI / 180);
            const radius = 158; // radius in px
            const x = radius * Math.cos(angleRad);
            const y = radius * Math.sin(angleRad);
            return (
              <div
                key={idx}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className="absolute text-xs font-bold font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-0.5"
              >
                <span className={z.color}>{z.symbol}</span>
              </div>
            );
          })}
        </div>

        {/* Middle Orbit Track */}
        <div className="absolute inset-10 rounded-full border border-dashed border-cyan-500/30 flex items-center justify-center pointer-events-none" />

        {/* Inner Orbit Track */}
        <div className="absolute inset-20 rounded-full border border-purple-500/30 flex items-center justify-center pointer-events-none" />

        {/* Central Solar Core */}
        <div 
          className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center z-10 cursor-pointer"
        >
          <div className="w-full h-full rounded-full bg-[#0B1220] flex flex-col items-center justify-center text-center p-1 border border-white/20">
            <div className="flex items-center gap-1">
              <Sun className="w-4 h-4 text-amber-400" />
              <Moon className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-[9px] font-mono font-bold text-amber-300 pt-0.5">CORE SOL</span>
          </div>
        </div>

        {/* Dynamic 9 Planets Nodes Computed on Real Longitude Angle */}
        {planetNodes.map((p, idx) => {
          const isExalted = p.strength?.toLowerCase().includes('exalt');
          const isOwnSign = p.strength?.toLowerCase().includes('own');

          return (
            <button
              key={idx}
              onClick={() => handlePlanetClick(p)}
              onMouseEnter={() => setHoveredPlanet(p)}
              onMouseLeave={() => setHoveredPlanet(null)}
              style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
              className={`absolute z-20 p-1.5 sm:p-2 rounded-2xl bg-[#111827]/95 border ${p.border} shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:border-cyan-400 hover:scale-110 hover:z-40 active:scale-95 cursor-pointer group flex flex-col items-center justify-center space-y-0.5 backdrop-blur-md transition-all duration-150`}
            >
              <div className="flex items-center gap-1">
                <span className={`text-xs sm:text-sm font-bold ${p.color}`}>{p.symbol}</span>
                {p.retrograde && <span className="text-[8px] font-mono text-red-400 font-bold">Rx</span>}
                {isExalted && <span className="text-[8px] text-amber-300">👑</span>}
                {isOwnSign && <span className="text-[8px] text-emerald-300">🏠</span>}
              </div>
              <span className="text-[9px] font-mono text-white font-semibold block leading-tight">{p.name}</span>
              <span className="text-[8px] font-mono text-slate-400 block">{p.degree}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Star Accents (Static) */}
      <div className="absolute top-4 left-6 pointer-events-none opacity-60">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
      </div>
      <div className="absolute bottom-6 right-8 pointer-events-none opacity-60">
        <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
      </div>
      <div className="absolute top-10 right-10 pointer-events-none opacity-60">
        <Sparkles className="w-3.5 h-3.5 text-purple-300" />
      </div>

      {/* REAL TELEMETRY CARD FOR HOVERED PLANET */}
      <AnimatePresence>
        {hoveredPlanet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 w-72 p-3 rounded-2xl bg-[#0B1220]/95 border border-cyan-500/50 shadow-2xl backdrop-blur-xl text-left space-y-1.5 pointer-events-none"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className={`text-base font-bold ${hoveredPlanet.color}`}>{hoveredPlanet.symbol}</span>
                <span className="text-xs font-bold text-white font-mono">{hoveredPlanet.name}</span>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                {hoveredPlanet.retrograde ? 'Retrograde (Rx)' : 'Direct Motion'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
              <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block">Sign & Deg:</span>
                <span className="text-amber-300 font-bold">{hoveredPlanet.sign} ({hoveredPlanet.degree})</span>
              </div>
              <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                <span className="text-slate-400 block">House Position:</span>
                <span className="text-cyan-300 font-bold">{hoveredPlanet.house}</span>
              </div>
              <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 col-span-2">
                <span className="text-slate-400 block">Nakshatra Mansion:</span>
                <span className="text-purple-300 font-bold">{hoveredPlanet.nakshatra} ({hoveredPlanet.pada})</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-300 leading-tight bg-slate-900/80 p-1.5 rounded-lg border border-white/5 flex items-center justify-between">
              <div><strong className="text-emerald-400">Dignity:</strong> {hoveredPlanet.strength}</div>
              <div className="text-[9px] text-amber-300 font-mono flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-amber-400" /> Tap for {PLANET_FREQUENCIES[hoveredPlanet.name] || 528} Hz
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
