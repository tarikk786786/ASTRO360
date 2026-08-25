import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, HelpCircle, ShieldCheck, CheckCircle2, 
  AlertCircle, BookOpen, ChevronRight, Layers, ArrowRight 
} from 'lucide-react';

interface OmniWhyShowcaseProps {
  onExploreMethodology: () => void;
}

export default function OmniWhyShowcase({ onExploreMethodology }: OmniWhyShowcaseProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          EXPLAINABLE ASTROLOGY INTELLIGENCE
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          We don't just give you a prediction. We show you why.
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Every important forecast can be traced back to the calculations, astrology system, timing technique, and classical interpretation behind it.
        </p>
      </div>

      {/* Interactive Prediction Card & Reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Prediction Card */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0F172A] border border-white/15 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-amber-400">💼 CAREER EXPANSION</span>
            <span className="text-xs font-mono text-slate-400">Sep 12 – Oct 28</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Astrological Activation</span>
              <span className="text-emerald-400 font-bold">Strong (88%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 w-[88%]" />
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <div className="text-[10px] uppercase text-slate-500 font-bold">Supported By:</div>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">✓ Vedic (Jyotish)</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">✓ Western Modern</span>
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">✓ KP System</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {isRevealed ? "Hide Why Explanation" : "Why this period? (Click to reveal)"}
            </button>
          </div>
        </div>

        {/* Right: Transparent "Why?" Evidence Panel */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0B1220] border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Multi-Tradition Consensus Reason
            </h4>
            <span className="text-[10px] font-mono text-slate-500">DE440 Ephemeris</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Three selected systems independently identify increased career activity during this timing window. Because traditions differ slightly on exact manifestation (Vedic emphasizes leadership duty, while Western highlights creative autonomy), ASTRO360 presents a calibrated theme rather than a guaranteed event.
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <strong className="text-amber-400">1. Planetary Activation:</strong> Transiting Jupiter enters 10th Kendra house in Cancer.
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <strong className="text-cyan-400">2. Solar Progression:</strong> Progressed Sun forms direct trine with natal Midheaven (MC).
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <strong className="text-indigo-400">3. Classical Rule Citation:</strong> BPHS Ch.24 v.12 & Tetrabiblos Bk.4 c.3.
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onExploreMethodology}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              See complete methodology pipeline <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
