import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Compass, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2,
  ExternalLink,
  Cpu,
  Info
} from 'lucide-react';

interface TrustAndExplainabilityBannerProps {
  currentAyanamsha?: string;
}

export default function TrustAndExplainabilityBanner({ currentAyanamsha = '24.23° (Chitra Paksha Lahiri)' }: TrustAndExplainabilityBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Compute live Julian Day for mathematical authenticity
  const now = new Date();
  const julianDay = (now.getTime() / 86400000 + 2440587.5).toFixed(4);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#0B1220]/90 via-[#0E172A]/90 to-[#0B1220]/90 border border-emerald-500/25 p-3.5 sm:p-4 text-left shadow-lg relative overflow-hidden backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Trust & Precision Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Client-Side Private</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>NASA JPL DE440 Sub-Arcsecond Ephemeris</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>JD: {julianDay}</span>
          </div>
        </div>

        {/* Right: Expandable Explainability Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 transition-colors cursor-pointer self-start md:self-auto"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold">{isExpanded ? 'Hide Trust & Precision Details' : 'Why Trust ASTRO360?'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Expandable Deep Trust & Scripture Citations Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 pt-4 border-t border-white/10 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. Client-Side WebCrypto Security */}
              <div className="p-3.5 rounded-xl bg-[#070D18] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono">
                  <Lock className="w-3.5 h-3.5" /> Zero-PII Data Privacy
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Your exact birth date, time, coordinates, and questions are computed locally inside your browser using Web Workers. 
                  Zero personal data is stored on remote servers.
                </p>
              </div>

              {/* 2. Sub-Arcsecond Mathematical Ephemeris */}
              <div className="p-3.5 rounded-xl bg-[#070D18] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono">
                  <Compass className="w-3.5 h-3.5" /> Astronomical Accuracy
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Planetary longitudes use high-precision VSOP87/DE440 planetary theory with nutation, topocentric parallax, 
                  and true Chitra Paksha Lahiri Ayanamsha ({currentAyanamsha}).
                </p>
              </div>

              {/* 3. Authentic Scripture Citations */}
              <div className="p-3.5 rounded-xl bg-[#070D18] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono">
                  <BookOpen className="w-3.5 h-3.5" /> Classical Scripture Citations
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Every interpretive rule is citing classical treatises: <em>Brihat Parashara Hora Shastra</em>, <em>Jaimini Upadesha Sutras</em>, 
                  <em>Tetrabiblos</em>, and <em>Al-Biruni's Kitab al-Tafhim</em>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Deterministic, Transparent, and 100% Free Open Calculations
              </span>
              <span className="text-slate-500">
                Calculation Standard: IAU 2006 / IERS Conventions
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
