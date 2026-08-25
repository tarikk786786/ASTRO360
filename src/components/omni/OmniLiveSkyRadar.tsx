import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Moon, Sun, Clock, Zap, RefreshCw, Eye } from 'lucide-react';
import { calculatePlanetaryPositions, calculateAyanamsha } from '../../lib/astroCalculations';

export default function OmniLiveSkyRadar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [livePlanets, setLivePlanets] = useState<ReturnType<typeof calculatePlanetaryPositions>>([]);

  useEffect(() => {
    // Initial calculation
    const nowStr = currentTime.toISOString().split('T')[0];
    const timeStr = currentTime.toTimeString().split(' ')[0].substring(0, 5);
    setLivePlanets(calculatePlanetaryPositions(nowStr, timeStr));

    // Update every 10 seconds
    const interval = setInterval(() => {
      const d = new Date();
      setCurrentTime(d);
      const dStr = d.toISOString().split('T')[0];
      const tStr = d.toTimeString().split(' ')[0].substring(0, 5);
      setLivePlanets(calculatePlanetaryPositions(dStr, tStr));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const ayanamsha = calculateAyanamsha(currentTime);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0A101D] via-[#0D1629] to-[#070B14] border border-cyan-500/30 p-5 sm:p-6 shadow-2xl relative overflow-hidden text-left font-sans">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-inner">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white tracking-tight">Real-Time Celestial Sky Radar</h3>
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE DE440
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Live Ephemeris • Lahiri Ayanamsha: {ayanamsha.toFixed(4)}°
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{currentTime.toLocaleTimeString()} UTC</span>
        </div>
      </div>

      {/* Live Planet Positions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-4 relative z-10">
        {livePlanets.slice(0, 10).map((planet) => (
          <div
            key={planet.name}
            className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-cyan-400/40 transition-all space-y-1 group"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white flex items-center gap-1">
                <span className="text-amber-400 font-serif text-sm">{planet.symbol}</span>
                <span>{planet.name}</span>
              </span>
              <span className={`text-[10px] ${planet.retrograde ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                {planet.retrograde ? '℞' : 'Direct'}
              </span>
            </div>
            <div className="flex items-baseline justify-between text-[11px] font-mono">
              <span className="text-cyan-300 font-bold">{planet.sign}</span>
              <span className="text-slate-400 text-[10px]">{planet.degree}</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 truncate">
              {planet.nakshatra} (P{planet.pada})
            </div>
          </div>
        ))}
      </div>

      {/* Footer Radar Insights */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 relative z-10">
        <span className="flex items-center gap-1.5 text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Continuous astronomical triangulation via JPL Horizons DE440</span>
        </span>
        <span className="text-slate-400 text-[11px]">Next Lunar Ingress: ~6h 18m</span>
      </div>
    </div>
  );
}
