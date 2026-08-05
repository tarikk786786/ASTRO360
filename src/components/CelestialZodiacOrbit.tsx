import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sun, Moon } from 'lucide-react';
import type { PlanetPosition } from '../lib/astrologyEngines';

interface CelestialZodiacOrbitProps {
  planetPositions: PlanetPosition[];
  onSelectPlanet?: (planet: PlanetPosition) => void;
}

const ZODIAC_SIGNS = [
  { symbol: '♈', name: 'Aries', deg: 0, color: 'text-red-400' },
  { symbol: '♉', name: 'Taurus', deg: 30, color: 'text-[#22C55E]' },
  { symbol: '♊', name: 'Gemini', deg: 60, color: 'text-[#06B6D4]' },
  { symbol: '♋', name: 'Cancer', deg: 90, color: 'text-indigo-400' },
  { symbol: '♌', name: 'Leo', deg: 120, color: 'text-amber-400' },
  { symbol: '♍', name: 'Virgo', deg: 150, color: 'text-[#22C55E]' },
  { symbol: '♎', name: 'Libra', deg: 180, color: 'text-pink-400' },
  { symbol: '♏', name: 'Scorpio', deg: 210, color: 'text-red-400' },
  { symbol: '♐', name: 'Sagittarius', deg: 240, color: 'text-purple-400' },
  { symbol: '♑', name: 'Capricorn', deg: 270, color: 'text-slate-300' },
  { symbol: '♒', name: 'Aquarius', deg: 300, color: 'text-[#06B6D4]' },
  { symbol: '♓', name: 'Pisces', deg: 330, color: 'text-indigo-400' },
];

export default function CelestialZodiacOrbit({ planetPositions, onSelectPlanet }: CelestialZodiacOrbitProps) {
  return (
    <div className="relative w-full aspect-square max-w-[380px] mx-auto flex items-center justify-center p-4">
      {/* Radiant Glowing Nebula Backdrop */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/15 via-purple-600/20 to-amber-500/15 blur-2xl animate-pulse pointer-events-none" />

      {/* Outer Zodiac Belt Ring (Rotates Slowly) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2 rounded-full border border-blue-500/20 flex items-center justify-center pointer-events-none"
      >
        {ZODIAC_SIGNS.map((z, idx) => {
          const angleRad = (z.deg - 90) * (Math.PI / 180);
          const radius = 160; // radius in px
          const x = radius * Math.cos(angleRad);
          const y = radius * Math.sin(angleRad);
          return (
            <div
              key={idx}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              className="absolute text-xs font-bold font-mono text-slate-400 hover:text-white transition-colors"
            >
              <span>{z.symbol}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Middle Orbit Track */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-12 rounded-full border border-dashed border-cyan-500/30 flex items-center justify-center pointer-events-none"
      />

      {/* Inner Orbit Track */}
      <div className="absolute inset-24 rounded-full border border-purple-500/30 flex items-center justify-center pointer-events-none" />

      {/* Central Solar Core (Glowing Sun & Moon Balance) */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-[0_0_35px_rgba(245,158,11,0.5)] flex items-center justify-center z-10 cursor-pointer"
      >
        <div className="w-full h-full rounded-full bg-[#0B1220] flex flex-col items-center justify-center text-center p-1 border border-white/20">
          <div className="flex items-center gap-1">
            <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <Moon className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-[9px] font-mono font-bold text-amber-300 pt-0.5">CORE SOL</span>
        </div>
      </motion.div>

      {/* Dynamic Floating 9 Planets Nodes on Orbital Positions */}
      {planetPositions.map((p, idx) => {
        const stepAngle = (idx * 40 - 90) * (Math.PI / 180);
        const orbitRadius = 115;
        const px = orbitRadius * Math.cos(stepAngle);
        const py = orbitRadius * Math.sin(stepAngle);

        return (
          <motion.button
            key={idx}
            onClick={() => onSelectPlanet?.(p)}
            whileHover={{ scale: 1.3, zIndex: 30 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3 + (idx % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.2
            }}
            style={{ transform: `translate(${px}px, ${py}px)` }}
            className="absolute z-20 p-2 rounded-2xl bg-[#111827]/95 border border-white/20 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:border-cyan-400 cursor-pointer group flex flex-col items-center justify-center space-y-0.5"
          >
            <div className="flex items-center gap-1">
              <span className={`text-sm font-bold ${p.color}`}>{p.symbol}</span>
              {p.retrograde && <span className="text-[8px] font-mono text-red-400 font-bold animate-pulse">Rx</span>}
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
    </div>
  );
}
