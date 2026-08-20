import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CompatibilitySectionProps {
  onCheckDeepCompatibility: (signA: string, signB: string) => void;
}

const SIGNS_LIST = [
  { id: 'aries', symbol: '♈', name: 'Aries', element: 'Fire' },
  { id: 'taurus', symbol: '♉', name: 'Taurus', element: 'Earth' },
  { id: 'gemini', symbol: '♊', name: 'Gemini', element: 'Air' },
  { id: 'cancer', symbol: '♋', name: 'Cancer', element: 'Water' },
  { id: 'leo', symbol: '♌', name: 'Leo', element: 'Fire' },
  { id: 'virgo', symbol: '♍', name: 'Virgo', element: 'Earth' },
  { id: 'libra', symbol: '♎', name: 'Libra', element: 'Air' },
  { id: 'scorpio', symbol: '♏', name: 'Scorpio', element: 'Water' },
  { id: 'sagittarius', symbol: '♐', name: 'Sagittarius', element: 'Fire' },
  { id: 'capricorn', symbol: '♑', name: 'Capricorn', element: 'Earth' },
  { id: 'aquarius', symbol: '♒', name: 'Aquarius', element: 'Air' },
  { id: 'pisces', symbol: '♓', name: 'Pisces', element: 'Water' },
];

export default function CompatibilitySection({ onCheckDeepCompatibility }: CompatibilitySectionProps) {
  const [signA, setSignA] = useState('aries');
  const [signB, setSignB] = useState('libra');
  const [calculated, setCalculated] = useState(true);

  const selectedA = SIGNS_LIST.find((s) => s.id === signA) || SIGNS_LIST[0];
  const selectedB = SIGNS_LIST.find((s) => s.id === signB) || SIGNS_LIST[6];

  // Dynamic compatibility estimation based on elements & polarity
  const isOpposite = (signA === 'aries' && signB === 'libra') || (signA === 'taurus' && signB === 'scorpio') || (signA === 'gemini' && signB === 'sagittarius') || (signA === 'cancer' && signB === 'capricorn') || (signA === 'leo' && signB === 'aquarius') || (signA === 'virgo' && signB === 'pisces');
  const isSameElement = selectedA.element === selectedB.element;

  const score = isSameElement ? 88 : isOpposite ? 84 : 78;
  const emotional = isSameElement ? 92 : 84;
  const communication = isOpposite ? 88 : 76;
  const lifestyle = isSameElement ? 86 : 80;
  const longTerm = isOpposite ? 85 : 79;

  return (
    <section id="compatibility-section" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05] bg-[#070A12]/90">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Ashta Koota & Synastry
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Relationship Compatibility
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            Select two zodiac placements to explore mutual emotional rhythms, communication dynamics, and spiritual harmony.
          </p>
        </div>

        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0D1220]/90 border border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          {/* Sign Selectors Row */}
          <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-center mb-8">
            
            {/* Person A Sign */}
            <div className="sm:col-span-5 space-y-2">
              <label className="block text-xs font-mono text-slate-300">Your Zodiac Sign</label>
              <select
                value={signA}
                onChange={(e) => setSignA(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-semibold focus:border-[#C9A86A] outline-none cursor-pointer"
              >
                {SIGNS_LIST.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#0D1220] text-white">
                    {s.symbol} {s.name} ({s.element})
                  </option>
                ))}
              </select>
            </div>

            {/* Heart Center */}
            <div className="sm:col-span-1 flex justify-center py-2">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 animate-pulse">
                <Heart className="w-5 h-5 fill-rose-400/40" />
              </div>
            </div>

            {/* Person B Sign */}
            <div className="sm:col-span-5 space-y-2">
              <label className="block text-xs font-mono text-slate-300">Partner’s Zodiac Sign</label>
              <select
                value={signB}
                onChange={(e) => setSignB(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-semibold focus:border-[#C9A86A] outline-none cursor-pointer"
              >
                {SIGNS_LIST.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#0D1220] text-white">
                    {s.symbol} {s.name} ({s.element})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Compatibility Breakdown Result */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider block">
                  Harmonic Synastry Index
                </span>
                <div className="text-xl font-bold text-white font-serif mt-0.5">
                  {selectedA.name} ({selectedA.symbol}) & {selectedB.name} ({selectedB.symbol})
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold font-serif text-[#C9A86A]">{score}%</span>
                <span className="text-xs font-mono text-slate-400">Match Score</span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Emotional Resonance</span>
                <span className="font-bold text-rose-300 text-sm">{emotional}%</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Communication Flow</span>
                <span className="font-bold text-cyan-300 text-sm">{communication}%</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Lifestyle Harmony</span>
                <span className="font-bold text-amber-300 text-sm">{lifestyle}%</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Long-Term Growth</span>
                <span className="font-bold text-purple-300 text-sm">{longTerm}%</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {isOpposite
                ? `${selectedA.name} and ${selectedB.name} sit directly opposite each other on the zodiac axis (180° polarity), creating an intense magnetic attraction and the capacity to balance each other's blind spots.`
                : isSameElement
                ? `Sharing the same ${selectedA.element} element creates an immediate intuitive shorthand, natural mutual empathy, and effortless lifestyle alignment.`
                : `${selectedA.name} (${selectedA.element}) and ${selectedB.name} (${selectedB.element}) bring complementary perspectives. Right effort in mutual communication unlocks profound growth.`}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] font-mono text-slate-500">
                *Astrological interpretation based on elemental triplicities and Ashta Koota indices.
              </span>
              <button
                onClick={() => onCheckDeepCompatibility(signA, signB)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] text-xs font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Generate Full 36-Guna Match Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
