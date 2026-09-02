import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Clock, Sparkles, CheckCircle2, ShieldCheck, Zap, Compass, Activity } from 'lucide-react';

interface HoraSlot {
  hourNumber: number;
  timeRange: string;
  planet: string;
  symbol: string;
  color: string;
  bgColor: string;
  borderColor: string;
  energy: string;
  recommended: string;
  avoid: string;
  isCurrent: boolean;
}

const HORA_PLANET_ORDER = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'];

const PLANET_METADATA: Record<string, { symbol: string; color: string; bgColor: string; borderColor: string; energy: string; recommended: string; avoid: string }> = {
  Sun: {
    symbol: '☉',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-white/[0.08]',
    energy: 'Executive Leadership, Authority, Vitality & Official Decisions',
    recommended: 'Apply for promotions, meet authority figures, launch campaigns & sign major contracts.',
    avoid: 'Submissive behavior or passive procrastination.'
  },
  Venus: {
    symbol: '♀',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    energy: 'Romance, Harmony, Fine Arts, Luxury & Financial Agreements',
    recommended: 'Social gatherings, romantic proposals, artistic creation & purchasing luxury assets.',
    avoid: 'Aggressive confrontations or harsh arguments.'
  },
  Mercury: {
    symbol: '☿',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-white/[0.08]',
    energy: 'Commerce, Technology, Data Analysis, Writing & Trade',
    recommended: 'Publishing software, sending pitch emails, trading stocks & studying complex data.',
    avoid: 'Careless contract reading or rushing without auditing.'
  },
  Moon: {
    symbol: '☽',
    color: 'text-blue-300',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    energy: 'Intuition, Domestic Affairs, Emotional Flow & Public Care',
    recommended: 'Family conversations, intuitive brainstorming, nursing & water-related activities.',
    avoid: 'Making permanent financial commitments while emotionally unstable.'
  },
  Saturn: {
    symbol: '♄',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    energy: 'Discipline, Deep Structure, Hard Work & Real Estate Auditing',
    recommended: 'Tackling difficult technical debt, structural organization & long-term planning.',
    avoid: 'Starting celebratory festivities or expecting quick shortcuts.'
  },
  Jupiter: {
    symbol: '♃',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-white/[0.08]',
    energy: 'Higher Wisdom, Wealth Growth, Mentorship & Auspicious Deeds',
    recommended: 'Financial investments, seeking mentor advice, academic study & charity.',
    avoid: 'Greed or over-extending financial leverage.'
  },
  Mars: {
    symbol: '♂',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    energy: 'Physical Courage, Athletic Power, Problem-Solving & Action',
    recommended: 'Workouts, physical construction, overcoming technical blockers & competitive tasks.',
    avoid: 'Impulsive anger or reckless driving.'
  }
};

export default function PlanetaryHorasTracker() {
  const currentHourIndex = new Date().getHours();

  const horasTimeline: HoraSlot[] = useMemo(() => {
    const startPlanetIdx = 0; // Sun day default start
    return Array.from({ length: 24 }).map((_, i) => {
      const planetName = HORA_PLANET_ORDER[(startPlanetIdx + i) % 7];
      const meta = PLANET_METADATA[planetName];
      const startH = i.toString().padStart(2, '0');
      const endH = ((i + 1) % 24).toString().padStart(2, '0');
      
      return {
        hourNumber: i + 1,
        timeRange: `${startH}:00 - ${endH}:00`,
        planet: planetName,
        symbol: meta.symbol,
        color: meta.color,
        bgColor: meta.bgColor,
        borderColor: meta.borderColor,
        energy: meta.energy,
        recommended: meta.recommended,
        avoid: meta.avoid,
        isCurrent: i === currentHourIndex
      };
    });
  }, [currentHourIndex]);

  const currentHora = horasTimeline[currentHourIndex] || horasTimeline[0];

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-cyan-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" /> Planetary Hours & Solar Horas Real-Time Tracker
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Live 24-Hour Planetary Rulership Timeline (Sun ☉, Venus ♀, Mercury ☿, Moon ☽, Saturn ♄, Jupiter ♃, Mars ♂)
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold">
          24-Hora Telemetry Sync
        </span>
      </div>

      {/* LIVE CURRENT HORA HIGHLIGHT CARD */}
      <div className={`p-5 rounded-2xl bg-[#0B1220] border ${currentHora.borderColor} space-y-3 shadow-xl relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${currentHora.bgColor} border ${currentHora.borderColor} flex items-center justify-center text-2xl font-bold ${currentHora.color}`}>
              {currentHora.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-white/[0.08] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CURRENT ACTIVE HORA
                </span>
                <span className="text-xs font-mono text-slate-400">{currentHora.timeRange}</span>
              </div>
              <h4 className="text-lg font-bold text-white mt-0.5">{currentHora.planet} Hora Phase</h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 block font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Active Cosmic Energy:
            </span>
            <p className="text-slate-200 text-[11px] leading-relaxed">{currentHora.energy}</p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-white/[0.08] text-emerald-300 space-y-1">
            <span className="text-[10px] font-bold block flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Prescribed Action Steps:
            </span>
            <p className="text-[11px] leading-relaxed text-slate-200">{currentHora.recommended}</p>
          </div>
        </div>
      </div>

      {/* 24 HORAS HORIZONTAL SCROLL TIMELINE */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-slate-400 block">Today's 24-Hour Planetary Hora Flow:</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 font-mono text-xs">
          {horasTimeline.map((h, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border text-left transition-all space-y-1 ${
                h.isCurrent
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg scale-105'
                  : 'bg-[#0B1220] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">{h.timeRange}</span>
                <span className={`text-sm font-bold ${h.color}`}>{h.symbol}</span>
              </div>
              <span className="font-bold text-white text-[11px] block">{h.planet}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
