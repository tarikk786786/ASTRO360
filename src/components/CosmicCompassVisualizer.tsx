import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Compass, Sun, Moon, ShieldCheck, Sparkles, Navigation } from 'lucide-react';
import { calculatePlanetaryPositions } from '../lib/astroCalculations';
import type { UserProfile } from '../types';

interface CosmicCompassVisualizerProps {
  userProfile: UserProfile;
}

export default function CosmicCompassVisualizer({ userProfile }: CosmicCompassVisualizerProps) {
  const planetPositions = useMemo(() => {
    return calculatePlanetaryPositions(
      userProfile.dob || '1998-06-15',
      userProfile.time || '12:00'
    );
  }, [userProfile]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-cyan-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" /> 360° Sidereal Ephemeris Compass & Vastu Directional Matrix
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Real-Time 9 Graha Angular Degrees & Celestial Coordinate Tracking
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold">
          360° Sidereal Alignment
        </span>
      </div>

      {/* 360 DEGREE COMPASS WHEEL */}
      <div className="flex flex-col lg:flex-row items-center gap-8 p-4 rounded-2xl bg-[#0B1220] border border-white/10">
        {/* COMPASS SVG CANVAS */}
        <div className="relative w-72 h-72 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 300 300">
            {/* Outer Compass Ring */}
            <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="150" cy="150" r="110" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.5" />
            <circle cx="150" cy="150" r="50" fill="rgba(15, 23, 42, 0.95)" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1.5" />

            {/* Cardinal Markers */}
            <text x="150" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">N (0°)</text>
            <text x="282" y="154" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">E (90°)</text>
            <text x="150" y="288" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">S (180°)</text>
            <text x="18" y="154" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">W (270°)</text>

            {/* 9 Planet Dots on 360 Wheel */}
            {planetPositions.map((p, idx) => {
              const angleRad = (((p.degreeDecimal || 0) - 90) * Math.PI) / 180;
              const px = 150 + 110 * Math.cos(angleRad);
              const py = 150 + 110 * Math.sin(angleRad);
              const lx = 150 + 128 * Math.cos(angleRad);
              const ly = 150 + 128 * Math.sin(angleRad);

              return (
                <g key={idx}>
                  <line x1="150" y1="150" x2={px} y2={py} stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" />
                  <circle cx={px} cy={py} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                  <text x={lx} y={ly} fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                    {p.name.slice(0, 3)}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[10px] font-mono text-cyan-400 font-bold">SIDEREAL</span>
            <span className="text-xs font-bold text-white">24.21°</span>
          </div>
        </div>

        {/* PLANET ANGULAR DEGREES LIST */}
        <div className="w-full space-y-2 text-xs font-mono">
          <span className="text-slate-400 font-bold block mb-1">Live Angular Longitudes & Zodiac Signs:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {planetPositions.map((p, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {p.name}
                </span>
                <span className="text-cyan-300 font-bold">
                  {p.sign} ({p.degree})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
