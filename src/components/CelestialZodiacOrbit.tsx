import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Moon, Info, ShieldCheck, Compass, Activity } from 'lucide-react';
import type { PlanetPosition } from '../lib/astroCalculations';

interface CelestialZodiacOrbitProps {
  planetPositions: PlanetPosition[];
  onSelectPlanet?: (planet: PlanetPosition) => void;
}

const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Aries', deg: 0, color: 'text-red-400' },
  { symbol: '♉', name: 'Taurus', deg: 30, color: 'text-emerald-400' },
  { symbol: '♊', name: 'Gemini', deg: 60, color: 'text-cyan-400' },
  { symbol: '♋', name: 'Cancer', deg: 90, color: 'text-indigo-400' },
  { symbol: '♌', name: 'Leo', deg: 120, color: 'text-amber-400' },
  { symbol: '♍', name: 'Virgo', deg: 150, color: 'text-emerald-400' },
  { symbol: '♎', name: 'Libra', deg: 180, color: 'text-pink-400' },
  { symbol: '♏', name: 'Scorpio', deg: 210, color: 'text-red-400' },
  { symbol: '♐', name: 'Sagittarius', deg: 240, color: 'text-purple-400' },
  { symbol: '♑', name: 'Capricorn', deg: 270, color: 'text-slate-300' },
  { symbol: '♒', name: 'Aquarius', deg: 300, color: 'text-cyan-400' },
  { symbol: '♓', name: 'Pisces', deg: 330, color: 'text-indigo-400' },
];

const SIGN_BASE_DEGREES: Record<string, number> = {
  'Aries': 0, 'Taurus': 30, 'Gemini': 60, 'Cancer': 90,
  'Leo': 120, 'Virgo': 150, 'Libra': 180, 'Scorpio': 210,
  'Sagittarius': 240, 'Capricorn': 270, 'Aquarius': 300, 'Pisces': 330
};

export default function CelestialZodiacOrbit({ planetPositions, onSelectPlanet }: CelestialZodiacOrbitProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetPosition | null>(null);

  // Parse numeric degree from string e.g. "14° 22'" -> 14.36
  const getDegreeValue = (degStr: string): number => {
    const match = degStr.match(/(\d+)°/);
    return match ? parseInt(match[1], 10) : 15;
  };

  return (
    <div className="relative w-full aspect-square max-w-[380px] mx-auto flex items-center justify-center p-2 sm:p-4">
      {/* Radiant Glowing Nebula Backdrop */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/25 to-amber-500/20 blur-2xl animate-pulse pointer-events-none" />

      {/* Outer Zodiac Belt Ring (Steady & Crisp) */}
      <div 
        className="absolute inset-2 rounded-full border border-blue-500/25 flex items-center justify-center pointer-events-none"
      >
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
      <div 
        className="absolute inset-10 rounded-full border border-dashed border-cyan-500/30 flex items-center justify-center pointer-events-none"
      />

      {/* Inner Orbit Track */}
      <div className="absolute inset-20 rounded-full border border-purple-500/30 flex items-center justify-center pointer-events-none" />

      {/* Central Solar Core (Glowing Sun & Moon Balance) */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-[0_0_35px_rgba(245,158,11,0.5)] flex items-center justify-center z-10 cursor-pointer"
      >
        <div className="w-full h-full rounded-full bg-[#0B1220] flex flex-col items-center justify-center text-center p-1 border border-white/20">
          <div className="flex items-center gap-1">
            <Sun className="w-4 h-4 text-amber-400" />
            <Moon className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-[9px] font-mono font-bold text-amber-300 pt-0.5">CORE SOL</span>
        </div>
      </motion.div>

      {/* Dynamic 9 Planets Nodes Computed on Real Longitude Angle */}
      {planetPositions.map((p, idx) => {
        // Calculate real angle: Sign base + planet degree within sign
        const baseDeg = SIGN_BASE_DEGREES[p.sign] ?? (idx * 40);
        const inSignDeg = getDegreeValue(p.degree);
        const totalDeg = (baseDeg + inSignDeg - 90) * (Math.PI / 180);
        
        // Vary orbit radius slightly for visual separation
        const orbitRadius = 118 - ((idx % 3) * 16);
        const px = orbitRadius * Math.cos(totalDeg);
        const py = orbitRadius * Math.sin(totalDeg);

        const isExalted = p.strength?.toLowerCase().includes('exalt');
        const isOwnSign = p.strength?.toLowerCase().includes('own');

        return (
          <motion.button
            key={idx}
            onClick={() => onSelectPlanet?.(p)}
            onMouseEnter={() => setHoveredPlanet(p)}
            onMouseLeave={() => setHoveredPlanet(null)}
            whileHover={{ scale: 1.3, zIndex: 40 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3 + (idx % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.15
            }}
            style={{ transform: `translate(${px}px, ${py}px)` }}
            className={`absolute z-20 p-1.5 sm:p-2 rounded-2xl bg-[#111827]/95 border ${p.border} shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:border-cyan-400 cursor-pointer group flex flex-col items-center justify-center space-y-0.5 backdrop-blur-md`}
          >
            <div className="flex items-center gap-1">
              <span className={`text-xs sm:text-sm font-bold ${p.color}`}>{p.symbol}</span>
              {p.retrograde && <span className="text-[8px] font-mono text-red-400 font-bold animate-pulse">Rx</span>}
              {isExalted && <span className="text-[8px] text-amber-300">👑</span>}
              {isOwnSign && <span className="text-[8px] text-emerald-300">🏠</span>}
            </div>
            <span className="text-[9px] font-mono text-white font-semibold block leading-tight">{p.name}</span>
            <span className="text-[8px] font-mono text-slate-400 block">{p.degree}</span>
          </motion.button>
        );
      })}

      {/* Floating Shimmer Star Particles */}
      <div className="absolute top-4 left-6 pointer-events-none animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
      </div>
      <div className="absolute bottom-6 right-8 pointer-events-none animate-pulse delay-500">
        <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
      </div>
      <div className="absolute top-10 right-10 pointer-events-none animate-pulse delay-1000">
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

            <div className="text-[10px] text-slate-300 leading-tight bg-slate-900/80 p-1.5 rounded-lg border border-white/5">
              <strong className="text-emerald-400">Dignity:</strong> {hoveredPlanet.strength}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
