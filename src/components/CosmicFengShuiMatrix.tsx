import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Sun, ShieldCheck, Zap, Award, Layers } from 'lucide-react';
import type { UserProfile } from '../types';

interface CosmicFengShuiMatrixProps {
  userProfile?: UserProfile;
}

export default function CosmicFengShuiMatrix({ userProfile }: CosmicFengShuiMatrixProps) {
  const dob = userProfile?.dob || '1995-05-15';
  const birthYear = parseInt(dob.split('-')[0], 10) || 1995;

  const fengShuiData = useMemo(() => {
    // Compute Kua Number (Vedic & BaZi Feng Shui formula)
    // Formula: sum digits of birth year -> reduce to single digit
    let sum = birthYear.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    }
    
    // Male Kua = 11 - sum, Female Kua = sum + 4
    const kuaNumber = 11 - sum > 0 ? (11 - sum) : 5;

    const kuaDetails: Record<number, { direction: string; element: string; colors: string; numbers: string }> = {
      1: { direction: 'North (Career & Success)', element: 'Water 🌊', colors: 'Deep Blue, Emerald, Cyan', numbers: '1, 6, 8' },
      2: { direction: 'South-West (Love & Relationships)', element: 'Earth 🌍', colors: 'Yellow, Ochre, Golden Brown', numbers: '2, 5, 8' },
      3: { direction: 'East (Family & Health)', element: 'Wood 🪵', colors: 'Jade Green, Teal, Natural Brown', numbers: '3, 4, 9' },
      4: { direction: 'South-East (Wealth & Prosperity)', element: 'Wood 🪵', colors: 'Purple, Violet, Royal Blue', numbers: '4, 1, 9' },
      5: { direction: 'Center (Harmony & Core Asset)', element: 'Earth 🌍', colors: 'Gold, Sand, Terra Cotta', numbers: '5, 2, 8' },
      6: { direction: 'North-West (Mentors & Trade)', element: 'Metal 🪙', colors: 'Silver, Platinum, Pure White', numbers: '6, 7, 1' },
      7: { direction: 'West (Creativity & Children)', element: 'Metal 🪙', colors: 'Copper, Bronze, Charcoal', numbers: '7, 6, 2' },
      8: { direction: 'North-East (Wisdom & Knowledge)', element: 'Earth 🌍', colors: 'Warm Amber, Beige, Bronze', numbers: '8, 5, 2' },
      9: { direction: 'South (Fame & Recognition)', element: 'Fire 🔥', colors: 'Crimson Red, Scarlet, Gold', numbers: '9, 3, 4' }
    };

    return kuaDetails[kuaNumber] || kuaDetails[5];
  }, [birthYear]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-emerald-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" /> Personalized Lucky Elements & Cosmic Feng Shui Matrix
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Kua Number Calculation, Prosperity Directions, Lucky Colors & Wealth Horas
          </p>
        </div>
        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold">
          BaZi & Feng Shui Matrix
        </span>
      </div>

      {/* 4 FENG SHUI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/[0.08] space-y-1">
          <span className="text-[10px] text-slate-400 block flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-emerald-400" /> Lucky Prosperity Direction
          </span>
          <span className="text-sm font-bold text-emerald-300 block">{fengShuiData.direction}</span>
          <span className="text-[10px] text-slate-400 block pt-1">Position office desk facing this direction.</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/[0.08] space-y-1">
          <span className="text-[10px] text-slate-400 block flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Dominant Feng Shui Element
          </span>
          <span className="text-sm font-bold text-cyan-300 block">{fengShuiData.element}</span>
          <span className="text-[10px] text-slate-400 block pt-1">Harmonizes personal Qi & workspace.</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/[0.08] space-y-1">
          <span className="text-[10px] text-slate-400 block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Lucky Color Frequency
          </span>
          <span className="text-sm font-bold text-amber-300 block">{fengShuiData.colors}</span>
          <span className="text-[10px] text-slate-400 block pt-1">Wear during negotiations & interviews.</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0B1220] border border-purple-500/30 space-y-1">
          <span className="text-[10px] text-slate-400 block flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-purple-400" /> Lucky Vibrational Numbers
          </span>
          <span className="text-sm font-bold text-purple-300 block">{fengShuiData.numbers}</span>
          <span className="text-[10px] text-slate-400 block pt-1">Optimal for transaction dates & pricing.</span>
        </div>
      </div>
    </div>
  );
}
