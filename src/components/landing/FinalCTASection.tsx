import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface FinalCTASectionProps {
  onCreateChart: () => void;
  onExploreHoroscope: () => void;
}

export default function FinalCTASection({ onCreateChart, onExploreHoroscope }: FinalCTASectionProps) {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05] overflow-hidden bg-[#070A12]/95">
      
      {/* Background Subtle Radial Glow & Celestial Zodiac Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[650px] aspect-square rounded-full border border-[#C9A86A]/15 pointer-events-none opacity-40">
        <div className="absolute inset-8 rounded-full border border-dashed border-[#C9A86A]/20" />
        <div className="absolute inset-16 rounded-full border border-white/[0.04]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#C9A86A]/30 text-[11px] font-mono tracking-widest text-[#C9A86A] uppercase">
          <Sparkles className="w-3 h-3 text-[#C9A86A]" />
          <span>Begin Your Self-Discovery</span>
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-tight">
          Start with the moment{' '}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C9A86A] via-[#E6D5AC] to-[#C9A86A]">
            you were born.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Enter your birth details and discover a clearer, dignified, and insightful way to understand your planetary blueprint.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onCreateChart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] text-sm font-bold shadow-[0_0_30px_rgba(201,168,106,0.4)] hover:shadow-[0_0_40px_rgba(201,168,106,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Create My Free Birth Chart</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreHoroscope}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
          >
            <Compass className="w-4 h-4 text-[#C9A86A]" />
            <span>Explore Today’s Horoscope</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 font-mono pt-4">
          Free natal calculation • No credit card required • Instant access
        </p>
      </div>
    </section>
  );
}
