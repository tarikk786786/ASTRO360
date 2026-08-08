import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Compass, Sun, Moon, DollarSign, Heart, Briefcase, MapPin, Sparkles } from 'lucide-react';
import type { UserProfile } from '../types';

interface RelocationZone {
  city: string;
  country: string;
  dominantLine: 'Jupiter (Wealth & Career)' | 'Venus (Love & Harmony)' | 'Mercury (Trade & Tech)' | 'Sun (Leadership)' | 'Saturn (Focus & Grounding)';
  planetSymbol: string;
  lineColor: string;
  beneficCategory: 'Career Peak' | 'Soul Connection' | 'Financial Expansion' | 'Spiritual Peace';
  recommendation: string;
}

const GLOBAL_ZONES: RelocationZone[] = [
  {
    city: 'Dubai / Abu Dhabi',
    country: 'United Arab Emirates',
    dominantLine: 'Jupiter (Wealth & Career)',
    planetSymbol: '♃',
    lineColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    beneficCategory: 'Financial Expansion',
    recommendation: 'Triggers Jupiter Midheaven line — ideal for business scaling, real estate ventures, and wealth accumulation.'
  },
  {
    city: 'London / Oxford',
    country: 'United Kingdom',
    dominantLine: 'Mercury (Trade & Tech)',
    planetSymbol: '☿',
    lineColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    beneficCategory: 'Career Peak',
    recommendation: 'Activates Mercury IC line — ideal for writing, tech publishing, legal trade, and intellectual authority.'
  },
  {
    city: 'Kyoto / Tokyo',
    country: 'Japan',
    dominantLine: 'Venus (Love & Harmony)',
    planetSymbol: '♀',
    lineColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
    beneficCategory: 'Soul Connection',
    recommendation: 'Activates Venus Ascendant line — highly favorable for artistic creation, soulmate connections, and emotional harmony.'
  },
  {
    city: 'New York / Boston',
    country: 'United States',
    dominantLine: 'Sun (Leadership)',
    planetSymbol: '☉',
    lineColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    beneficCategory: 'Career Peak',
    recommendation: 'Activates Sun Zenith line — unlocks high-visibility executive roles, public recognition, and personal authority.'
  }
];

export default function AstroCartographyMatrix({ userProfile }: { userProfile: UserProfile }) {
  const [selectedZone, setSelectedZone] = useState<RelocationZone>(GLOBAL_ZONES[0]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-cyan-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" /> Astro-Cartography & Relocation Locality Matrix
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Global Planetary Horizon Lines (Sun ☉, Venus ♀, Mercury ☿, Jupiter ♃) for Relocation
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 font-bold">
          Global Horizon Telemetry
        </span>
      </div>

      {/* GLOBAL RELOCATION ZONES CAROUSEL */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {GLOBAL_ZONES.map((zone, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedZone(zone)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
              selectedZone.city === zone.city
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md scale-105'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {zone.city}
          </button>
        ))}
      </div>

      {/* SELECTED ZONE HIGHLIGHT CARD */}
      <div className="p-5 rounded-2xl bg-[#0B1220] border border-cyan-500/40 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/30">
              {selectedZone.country}
            </span>
            <h4 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" /> {selectedZone.city}
            </h4>
          </div>

          <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border shrink-0 ${selectedZone.lineColor}`}>
            {selectedZone.planetSymbol} {selectedZone.dominantLine}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-mono space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold">Relocation Insight & Auspicious Energies:</span>
          <p className="text-slate-200 text-[11px] leading-relaxed">{selectedZone.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
