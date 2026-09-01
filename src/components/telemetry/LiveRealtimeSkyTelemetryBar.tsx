import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, Radio, Clock, Compass, ShieldCheck, ChevronRight, X, Sparkles, Globe2, Activity 
} from 'lucide-react';
import { calculatePlanetaryPositions, calculatePanchang, type PlanetPosition } from '../../lib/astroCalculations';
import type { UserProfile } from '../../types';

interface LiveRealtimeSkyTelemetryBarProps {
  userProfile?: UserProfile;
  onOpenStudio?: () => void;
}

export const LiveRealtimeSkyTelemetryBar: React.FC<LiveRealtimeSkyTelemetryBarProps> = ({
  userProfile,
  onOpenStudio
}) => {
  const [now, setNow] = useState(new Date());
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // 1-second live clock update
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayIso = useMemo(() => now.toISOString().split('T')[0], [now]);
  const currentHour = now.getHours();

  // Current Ephemeris calculations for the exact moment
  const livePlanets = useMemo(() => {
    return calculatePlanetaryPositions(todayIso, `${currentHour}:${String(now.getMinutes()).padStart(2, '0')}`);
  }, [todayIso, currentHour, now.getMinutes()]);

  const livePanchang = useMemo(() => {
    return calculatePanchang(now);
  }, [now]);

  // Hourly Planetary Hora calculation (Chaldean Order: Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars)
  const horaOrder = ['Sun ☀️', 'Venus ♀️', 'Mercury ☿️', 'Moon 🌙', 'Saturn ♄', 'Jupiter ♃', 'Mars ♂️'];
  const dayRulers = [0, 3, 6, 2, 5, 1, 4]; // Sunday = Sun (0), Mon = Moon (3), Tue = Mars (6), Wed = Merc (2), Thu = Jup (5), Fri = Ven (1), Sat = Sat (4)
  const dayIndex = now.getDay();
  const startRulerIndex = dayRulers[dayIndex];
  const horaIndex = (startRulerIndex + currentHour) % 7;
  const currentHora = horaOrder[horaIndex];

  const sunPos = livePlanets.find(p => p.name === 'Sun') || livePlanets[0];
  const moonPos = livePlanets.find(p => p.name === 'Moon') || livePlanets[1];

  const secondsToNextHour = 3600 - (now.getMinutes() * 60 + now.getSeconds());
  const minsRemaining = Math.floor(secondsToNextHour / 60);
  const secsRemaining = secondsToNextHour % 60;

  return (
    <>
      {/* ── 1. COMPACT LIVE TELEMETRY BAR ────────────────────────── */}
      <div className="w-full bg-[#070D1A]/90 border border-white/12 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-3 text-left">
        {/* Left: Live Pulse + Ephemeris Status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0 shadow-inner">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white font-sans uppercase tracking-wider flex items-center gap-1.5">
                Real-Time Sky Telemetry
              </span>
              <span className="text-[9.5px] font-mono font-bold text-emerald-300 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20">
                LIVE 1-SEC SYNC
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono truncate">
              Sun in {sunPos?.sign} • Moon in {moonPos?.sign} ({livePanchang.nakshatra})
            </span>
          </div>
        </div>

        {/* Center: Live Planetary Hora & Next Ingress */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono shrink-0 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Hora: <strong>{currentHora}</strong> ({minsRemaining}m {secsRemaining}s left)</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300">
            <Moon className="w-3.5 h-3.5 text-cyan-400" />
            <span>{livePanchang.moonPhase}</span>
          </div>
        </div>

        {/* Right: Telemetry Inspector Trigger */}
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => setIsInspectorOpen(true)}
            className="w-full md:w-auto px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/15 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>View 9-Planet Coordinates</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>
        </div>
      </div>

      {/* ── 2. FULL 9-BODY LIVE CELESTIAL INSPECTOR MODAL ────────── */}
      <AnimatePresence>
        {isInspectorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#080E1C] border border-white/20 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 text-left max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white font-sans">
                      Live Astronomical Sky Coordinates
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      NASA JPL DE440 Sub-Arcsecond Planetary Ephemeris (UTC: {now.toUTCString()})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInspectorOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 9-Planet Real-Time Coordinate Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {livePlanets.map((planet: PlanetPosition) => (
                  <div
                    key={planet.name}
                    className="p-3 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-amber-400/30 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{planet.symbol}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">{planet.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{planet.nakshatra} (Pada {planet.pada})</span>
                      </div>
                    </div>
                    <div className="flex flex-col text-right font-mono">
                      <span className="text-xs font-bold text-amber-300">{planet.sign} {planet.degree}</span>
                      <span className="text-[9.5px] text-slate-400">{planet.speed} • {planet.strength}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Classical Remedial Harmonizer */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-400/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Auspicious Time Horizon & Hora Directive</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Current Hora is ruled by <strong>{currentHora}</strong>. High planetary alignment for mental focus and initiating commercial or spiritual actions during this window.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsInspectorOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono cursor-pointer shadow-md"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveRealtimeSkyTelemetryBar;
