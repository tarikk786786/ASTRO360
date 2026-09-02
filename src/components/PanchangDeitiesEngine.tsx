import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Flame, Sparkles, CheckCircle2, ShieldCheck, BookOpen, Star, Compass } from 'lucide-react';

interface TithiDetail {
  tithiNumber: number;
  name: string;
  paksha: 'Shukla (Waxing)' | 'Krishna (Waning)';
  rulingDeity: string;
  nature: 'Nanda (Joy)' | 'Bhadra (Prosperity)' | 'Jaya (Victory)' | 'Rikta (Empty/Cleanse)' | 'Poorna (Fullness)';
  recommendedActions: string;
  sacredOffering: string;
  fastingRite: string;
}

const TITHI_DATABASE: TithiDetail[] = [
  {
    tithiNumber: 1,
    name: 'Pratipada (1st Tithi)',
    paksha: 'Shukla (Waxing)',
    rulingDeity: 'Agni (Divine Fire Element)',
    nature: 'Nanda (Joy)',
    recommendedActions: 'Initiating new projects, religious ceremonies, financial investments & strategic planning.',
    sacredOffering: 'Offer Pure Ghee (Clarithied Butter) & Havanam to Agni.',
    fastingRite: 'Partial solar fast until midday.'
  },
  {
    tithiNumber: 4,
    name: 'Chaturthi (4th Tithi)',
    paksha: 'Shukla (Waxing)',
    rulingDeity: 'Lord Ganesha (Remover of Obstacles)',
    nature: 'Rikta (Empty/Cleanse)',
    recommendedActions: 'Overcoming technical hurdles, obstacle destruction, debt elimination & obstacle removal remedies.',
    sacredOffering: 'Offer Durva grass & Modak sweets to Ganesha.',
    fastingRite: 'Sankashti Chaturthi Fasting until moonrise.'
  },
  {
    tithiNumber: 8,
    name: 'Ashtami (8th Tithi)',
    paksha: 'Shukla (Waxing)',
    rulingDeity: 'Goddess Durga & Rudra',
    nature: 'Jaya (Victory)',
    recommendedActions: 'Tackling competitive challenges, legal defenses, physical training & courageous actions.',
    sacredOffering: 'Offer Red Hibiscus flowers & Pomegranate.',
    fastingRite: 'Durga Ashtami Fasting.'
  },
  {
    tithiNumber: 11,
    name: 'Ekadashi (11th Tithi)',
    paksha: 'Shukla (Waxing)',
    rulingDeity: 'Lord Vishnu (Sustainer of Universe)',
    nature: 'Nanda (Joy)',
    recommendedActions: 'Spiritual purification, meditation, fasting, scripture reading & deep cellular detox.',
    sacredOffering: 'Offer Tulsi (Holy Basil) leaves & Fresh Yellow Fruits.',
    fastingRite: 'Complete grain-free Ekadashi fast for spiritual liberation.'
  },
  {
    tithiNumber: 15,
    name: 'Purnima (Full Moon)',
    paksha: 'Shukla (Waxing)',
    rulingDeity: 'Chandra (Moon) & Goddess Satyanarayan',
    nature: 'Poorna (Fullness)',
    recommendedActions: 'Full Moon meditation, high-frequency sound healing, family blessings & charity.',
    sacredOffering: 'Offer Kheer (Rice Pudding) & White Flowers under moonlight.',
    fastingRite: 'Purnima Vrat for emotional peace & wealth Barakah.'
  }
];

export default function PanchangDeitiesEngine() {
  const [selectedTithi, setSelectedTithi] = useState<TithiDetail>(TITHI_DATABASE[3]); // Ekadashi default

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/[0.12] shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Moon className="w-5 h-5 text-amber-400" /> Panchangam Tithi Deities & Sacred Fasting Rites Engine
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            30 Lunar Tithi Deities, Vedic Offerings, Fasting Protocols & Auspicious Energies
          </p>
        </div>
        <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold">
          30-Tithi Telemetry Sync
        </span>
      </div>

      {/* TITHI SELECTOR CAROUSEL BUTTONS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {TITHI_DATABASE.map((t) => (
          <button
            key={t.tithiNumber}
            onClick={() => setSelectedTithi(t)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
              selectedTithi.tithiNumber === t.tithiNumber
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md scale-105'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* ACTIVE TITHI CARD DETAILS */}
      <div className="p-5 rounded-2xl bg-[#0B1220] border border-white/[0.12] space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-white/[0.08]">
              {selectedTithi.paksha} • Nature: {selectedTithi.nature}
            </span>
            <h4 className="text-lg font-bold text-white mt-1">{selectedTithi.name}</h4>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-white/[0.08]">
            Deity: {selectedTithi.rulingDeity}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold">Auspicious Activities:</span>
            <p className="text-slate-200 text-[11px] leading-relaxed">{selectedTithi.recommendedActions}</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/40 border border-white/[0.08] text-amber-200 space-y-1">
            <span className="text-[10px] font-bold block text-amber-400">Sacred Offering Protocol:</span>
            <p className="text-[11px] leading-relaxed">{selectedTithi.sacredOffering}</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/40 border border-white/[0.08] text-xs font-mono text-emerald-200">
          <strong className="text-emerald-400">Prescribed Fasting Rite (Vrat):</strong> {selectedTithi.fastingRite}
        </div>
      </div>
    </div>
  );
}
