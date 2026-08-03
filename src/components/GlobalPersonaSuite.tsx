import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, Sparkles, Compass, CheckCircle2, ArrowRight, ShieldCheck, Moon, Sun, BookOpen, ChevronRight } from 'lucide-react';
import { GLOBAL_PERSONA_MAP, type GlobalCultureRegion, type GlobalUserPersonaProfile } from '../lib/globalPersonaEngine';

interface GlobalPersonaSuiteProps {
  activeRegion: GlobalCultureRegion;
  onSelectRegion: (region: GlobalCultureRegion) => void;
  onNavigateModule: (module: string) => void;
}

export default function GlobalPersonaSuite({ activeRegion, onSelectRegion, onNavigateModule }: GlobalPersonaSuiteProps) {
  const selectedPersona: GlobalUserPersonaProfile = GLOBAL_PERSONA_MAP[activeRegion] || GLOBAL_PERSONA_MAP.vedic_south_asia;

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-6 text-left">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#06B6D4] text-xs font-mono font-semibold mb-1">
            <Globe2 className="w-4 h-4" />
            <span>Universal Cultural & Regional Personalization Engine</span>
          </div>
          <h2 className="text-xl font-bold text-[#F8FAFC]">Global Tradition & System Selector</h2>
        </div>
        <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full border border-[#22C55E]/20">
          6 Worldwide Systems Supported
        </span>
      </div>

      {/* REGION SELECTION TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(GLOBAL_PERSONA_MAP) as GlobalCultureRegion[]).map((regionKey) => {
          const profile = GLOBAL_PERSONA_MAP[regionKey];
          const isSelected = activeRegion === regionKey;
          return (
            <button
              key={regionKey}
              onClick={() => onSelectRegion(regionKey)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-[#1E293B] border-[#2563EB] shadow-lg ring-1 ring-[#2563EB]'
                  : 'bg-[#0B1220] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${profile.colorScheme.bgBadge} ${profile.colorScheme.border}`}>
                    {profile.regionLabel}
                  </span>
                  <h3 className="text-sm font-bold text-[#F8FAFC] pt-2">{profile.title}</h3>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />}
              </div>

              <p className="text-xs text-[#94A3B8] line-clamp-2">{profile.subtitle}</p>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#CBD5E1] pt-1">
                <span>Style: {profile.terminologyStyle}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </div>
            </button>
          );
        })}
      </div>

      {/* SELECTED PERSONA DETAIL BANNER */}
      <div className={`p-5 rounded-2xl bg-[#0B1220] border ${selectedPersona.colorScheme.border} space-y-3`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Active System Calibration
          </span>
          <span className="text-xs font-bold text-white font-mono">{selectedPersona.title}</span>
        </div>

        <p className="text-xs text-[#CBD5E1] leading-relaxed">
          {selectedPersona.aiTonePrompt}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2">
          {selectedPersona.recommendedModules.map((mod) => (
            <button
              key={mod}
              onClick={() => onNavigateModule(mod)}
              className="px-3 py-1 rounded-xl bg-[#111827] hover:bg-[#1E293B] border border-white/10 text-xs font-mono text-[#06B6D4] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Launch {mod}</span>
              <ArrowRight className="w-3 h-3 text-[#06B6D4]" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
