import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';

interface CosmicCelestialLoaderProps {
  message?: string;
  subMessage?: string;
  isFullScreen?: boolean;
}

const COMPUTATIONAL_STAGES = [
  'Aligning NASA JPL DE440 Planetary Ephemeris...',
  'Calibrating True Lahiri Ayanamsha (24.2216°)...',
  'Computing 12 Bhava Cusps & Ascendant (Lagna)...',
  'Calculating 27 Nakshatras & Sub-Lord Lords...',
  'Synthesizing 120-Year Vimshottari Dasha Timelines...',
  'Harmonizing Multi-Tradition Consensus Matrix...',
  'Finalizing High-Precision Astrological Chart...'
];

const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export default function CosmicCelestialLoader({
  message = 'Calculating Celestial Alignment',
  subMessage = 'Running deterministic multi-tradition astronomical algorithms',
  isFullScreen = false
}: CosmicCelestialLoaderProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    // Stage text cycle
    const stageTimer = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % COMPUTATIONAL_STAGES.length);
    }, 1600);

    // Progress counter cycle
    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev >= 98 ? 98 : prev + Math.floor(Math.random() * 8) + 3));
    }, 180);

    return () => {
      clearInterval(stageTimer);
      clearInterval(progressTimer);
    };
  }, []);

  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-6 select-none font-sans relative">
      
      {/* ─── 1. LUXURY SACRED CELESTIAL ASTROLOGICAL DIAL ─────────────── */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        
        {/* Ambient Radial Nebula Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-cyan-500/20 to-purple-500/20 blur-2xl animate-pulse" />
        
        {/* Layer 1: Outer Zodiac Ring (Clockwise Rotation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-white/[0.08] flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.15)]"
        >
          {ZODIAC_SYMBOLS.map((symbol, idx) => {
            const angle = (idx * 30) * (Math.PI / 180);
            const radius = 94; // radius in px
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <span
                key={idx}
                style={{
                  position: 'absolute',
                  transform: `translate(${x}px, ${y}px) rotate(${idx * 30 + 90}deg)`
                }}
                className="text-[11px] sm:text-xs font-serif font-black text-amber-300/80 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]"
              >
                {symbol}
              </span>
            );
          })}
        </motion.div>

        {/* Layer 2: Nakshatra Division Ring (Counter-Clockwise Rotation) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
          className="absolute inset-4 sm:inset-5 rounded-full border border-dashed border-cyan-400/40 flex items-center justify-center"
        >
          {Array.from({ length: 27 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                transform: `rotate(${i * (360 / 27)}deg) translateY(-76px)`
              }}
              className="w-0.5 h-1.5 bg-cyan-400/60 rounded-full"
            />
          ))}
        </motion.div>

        {/* Layer 3: Sacred Aspect Geometry (Golden Triangles & Square) */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
          viewBox="0 0 100 100"
          className="absolute inset-10 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none opacity-40"
        >
          {/* Trine Triangle */}
          <polygon points="50,10 90,80 10,80" fill="none" stroke="#FBBF24" strokeWidth="1" />
          {/* Sextile Triangle */}
          <polygon points="50,90 90,20 10,20" fill="none" stroke="#38BDF8" strokeWidth="1" />
          {/* Kendra Square */}
          <rect x="22" y="22" width="56" height="56" fill="none" stroke="#A855F7" strokeWidth="0.8" />
        </motion.svg>

        {/* Layer 4: Orbiting Planetary Entities */}
        {/* Sun Golden Orb */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_12px_#FBBF24] -translate-y-16 flex items-center justify-center">
            <span className="text-[7px] text-slate-950 font-black">☉</span>
          </div>
        </motion.div>

        {/* Moon Silver Crescent */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-200 shadow-[0_0_10px_#38BDF8] translate-x-12 -translate-y-8 flex items-center justify-center">
            <span className="text-[6px] text-slate-950 font-bold">☽</span>
          </div>
        </motion.div>

        {/* Jupiter Benefic Spark */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#C084FC] translate-y-12 translate-x-10" />
        </motion.div>

        {/* Center Singularity: Pulsing Cosmic Core */}
        <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-950 border-2 border-amber-400/80 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.6)]">
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-[0_0_12px_#FBBF24] flex items-center justify-center"
          >
            <Compass className="w-3 h-3 text-slate-950 animate-spin" />
          </motion.div>
        </div>
      </div>

      {/* ─── 2. PROGRESSIVE STATUS & LIVE METRICS ─────────────────────── */}
      <div className="space-y-3 max-w-md w-full">
        
        {/* Main Title & Rotating Calculation Stage */}
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{message}</span>
          </h3>
          
          <div className="h-6 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={stageIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-xs font-mono font-semibold text-cyan-300 truncate"
              >
                {COMPUTATIONAL_STAGES[stageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-900 border border-white/10 h-2 rounded-full overflow-hidden p-0.5 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-amber-500 via-cyan-400 to-purple-500 h-full rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3 h-3" />
              <span>NASA JPL Ephemeris Active</span>
            </span>
            <span className="text-amber-400 font-bold">{progress}% Synced</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-sans leading-tight">
          {subMessage}
        </p>
      </div>

    </div>
  );

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050811]/95 backdrop-blur-3xl flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center w-full">
      {content}
    </div>
  );
}
