import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sun, Moon, Calendar, Sparkles, CheckCircle2, ShieldCheck, AlertTriangle, Building, Briefcase, Heart, Plane, ShieldAlert, DollarSign } from 'lucide-react';
import type { PanchangInfo } from '../lib/astroCalculations';

type MuhurtaCategory = 'Business' | 'Marriage' | 'Property' | 'Investment' | 'Travel' | 'Medical';

interface MuhurtaWindow {
  activity: string;
  category: MuhurtaCategory;
  optimalTime: string;
  quality: 'Exalted Golden' | 'Auspicious' | 'Neutral' | 'Avoid';
  qualityColor: string;
  panchangFactor: string;
  choghadiya: string;
  recommendation: string;
  remedy: string;
}

const MUHURTA_WINDOWS: Record<MuhurtaCategory, MuhurtaWindow[]> = {
  Business: [
    {
      activity: "Company Incorporation & Tech Product Launch",
      category: "Business",
      optimalTime: "11:48 AM - 12:36 PM (Abhijit Sol Hora)",
      quality: "Exalted Golden",
      qualityColor: "text-emerald-400 bg-emerald-500/10 border-white/[0.08]",
      panchangFactor: "Shukla Navami + Rohini Nakshatra + Siddhi Yoga",
      choghadiya: "Amrit & Labh Window",
      recommendation: "Execute legal contracts, publish code releases, and initiate high-profile corporate partnerships.",
      remedy: "Chant 'Om Gan Ganapataye Namaha' 11x before signing."
    },
    {
      activity: "Client Sales Pitch & Contract Negotiations",
      category: "Business",
      optimalTime: "08:15 AM - 09:30 AM (Mercury Hora)",
      quality: "Auspicious",
      qualityColor: "text-cyan-400 bg-cyan-500/10 border-white/[0.08]",
      panchangFactor: "Bava Karana + Exalted Mercury Transit",
      choghadiya: "Shubh Window",
      recommendation: "Best for commercial presentations, pricing discussions, and strategic negotiation.",
      remedy: "Keep a green aventurine stone on desk during call."
    }
  ],

  Marriage: [
    {
      activity: "Sacred Wedding Ceremony & Ring Engagement",
      category: "Marriage",
      optimalTime: "06:15 PM - 07:45 PM (Twilight Godhuli Muhurta)",
      quality: "Exalted Golden",
      qualityColor: "text-emerald-400 bg-emerald-500/10 border-white/[0.08]",
      panchangFactor: "Uttara Phalguni Nakshatra + Saubhagya Yoga",
      choghadiya: "Amrit Window",
      recommendation: "Perfect for vows, engagement rings, and eternal marital harmony.",
      remedy: "Offer pink flowers to Lakshmi-Narayan before ceremony."
    }
  ],

  Property: [
    {
      activity: "Griha Pravesh (Housewarming) & Land Purchase",
      category: "Property",
      optimalTime: "07:30 AM - 09:15 AM (Prithvi Hora)",
      quality: "Exalted Golden",
      qualityColor: "text-emerald-400 bg-emerald-500/10 border-white/[0.08]",
      panchangFactor: "Rohini Nakshatra + Dhriti Yoga",
      choghadiya: "Shubh Window",
      recommendation: "Ideal for land registry, key handover, and first entry into new home.",
      remedy: "Boil milk in new kitchen & perform Vastu Puja."
    }
  ],

  Investment: [
    {
      activity: "Stock Portfolio Buy & Long-Term Asset Investment",
      category: "Investment",
      optimalTime: "10:00 AM - 11:30 AM (Jupiter Hora)",
      quality: "Exalted Golden",
      qualityColor: "text-emerald-400 bg-emerald-500/10 border-white/[0.08]",
      panchangFactor: "Pushya Nakshatra + Siddhi Yoga",
      choghadiya: "Labh Window",
      recommendation: "Maximize compound asset growth and long-term financial security.",
      remedy: "Donate yellow lentils on Thursday morning."
    }
  ],

  Travel: [
    {
      activity: "International Flight Departs & Long-Distance Journey",
      category: "Travel",
      optimalTime: "02:00 PM - 03:30 PM (Air Hora)",
      quality: "Auspicious",
      qualityColor: "text-cyan-400 bg-cyan-500/10 border-white/[0.08]",
      panchangFactor: "Swati Nakshatra + Chara Rashi Transit",
      choghadiya: "Char Window",
      recommendation: "Ensures smooth transit, zero delays, and safe arrival.",
      remedy: "Eat a spoonful of curd & sugar before leaving."
    }
  ],

  Medical: [
    {
      activity: "Surgical Procedures & Holistic Detox Therapy",
      category: "Medical",
      optimalTime: "06:45 AM - 08:00 AM (Sun Hora)",
      quality: "Auspicious",
      qualityColor: "text-emerald-400 bg-emerald-500/10 border-white/[0.08]",
      panchangFactor: "Ashwini Nakshatra (Divine Healers)",
      choghadiya: "Amrit Window",
      recommendation: "Rapid physical recovery, cellular regeneration, and successful treatment.",
      remedy: "Chant Dhanvantari Mantra (11x)."
    }
  ]
};

export default function ElectionalMuhurtaEngine() {
  const [selectedCategory, setSelectedCategory] = useState<MuhurtaCategory>('Business');

  const activeWindows = MUHURTA_WINDOWS[selectedCategory] || MUHURTA_WINDOWS['Business'];

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/[0.12] shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" /> Electional Astrology & Shubh Muhurta Time Engine
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Astronomical Electional Windows for Business, Marriage, Property & Wealth Investment
          </p>
        </div>
        <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold">
          Choghadiya & Panchang Sync
        </span>
      </div>

      {/* CATEGORY FILTER BUTTONS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['Business', 'Marriage', 'Property', 'Investment', 'Travel', 'Medical'] as MuhurtaCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-lg scale-105'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {cat === 'Business' && <Briefcase className="w-3.5 h-3.5" />}
            {cat === 'Marriage' && <Heart className="w-3.5 h-3.5" />}
            {cat === 'Property' && <Building className="w-3.5 h-3.5" />}
            {cat === 'Investment' && <DollarSign className="w-3.5 h-3.5" />}
            {cat === 'Travel' && <Plane className="w-3.5 h-3.5" />}
            {cat === 'Medical' && <Sparkles className="w-3.5 h-3.5" />}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* MUHURTA CARDS LIST */}
      <div className="space-y-4">
        {activeWindows.map((mw, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3 hover:border-white/[0.12] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">{mw.activity}</h4>
                <span className="text-xs font-mono text-amber-300 font-bold">Optimal Window: {mw.optimalTime}</span>
              </div>

              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border shrink-0 ${mw.qualityColor}`}>
                {mw.quality}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">Panchang Astronomical Factors</span>
                <span className="text-cyan-300 font-bold block">{mw.panchangFactor}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">Choghadiya Timing</span>
                <span className="text-emerald-300 font-bold block">{mw.choghadiya}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300 font-mono">Recommendation:</strong> {mw.recommendation}
            </p>

            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-white/[0.08] text-[11px] text-amber-200 font-mono">
              <strong className="text-amber-400">Sacred Remedy:</strong> {mw.remedy}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
