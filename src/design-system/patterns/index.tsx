import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, ShieldCheck, ChevronRight, HelpCircle, ArrowRight, 
  Calendar, Layers, CheckCircle2, Clock, Bot, Send
} from 'lucide-react';
import { AstroButton, AstroCard, AstroBadge } from '../components';

/* ─────────────────────────────────────────────────────────────
 * 1. PredictionCard Pattern
 * ──────────────────────────────────────────────────────────── */
export interface PredictionCardProps {
  title: string;
  category: 'career' | 'relationship' | 'vitality' | 'finance' | 'travel';
  windowDate: string;
  intensity: 'High' | 'Moderate' | 'Subtle';
  supportingSystems: string[];
  explanation: string;
  onWhyClick: () => void;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  title,
  category,
  windowDate,
  intensity,
  supportingSystems,
  explanation,
  onWhyClick
}) => {
  const categoryBadgeVariant: Record<string, 'gold' | 'cyan' | 'emerald' | 'purple' | 'rose'> = {
    career: 'gold',
    relationship: 'rose',
    vitality: 'emerald',
    finance: 'cyan',
    travel: 'purple',
  };

  return (
    <AstroCard variant="interactive" className="space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <AstroBadge variant={categoryBadgeVariant[category] || 'gold'}>
            {category}
          </AstroBadge>
          <span className="text-[11px] font-mono text-slate-400 font-semibold">• {intensity} Resonance</span>
        </div>
        <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {windowDate}
        </span>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-base font-bold text-white tracking-tight">{title}</h4>
        <p className="text-xs text-slate-300 font-sans leading-relaxed">{explanation}</p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Supporting:</span>
          {supportingSystems.map(sys => (
            <span key={sys} className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-slate-300 border border-white/10">
              {sys}
            </span>
          ))}
        </div>

        <button
          onClick={onWhyClick}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Why this timing? →</span>
        </button>
      </div>
    </AstroCard>
  );
};

/* ─────────────────────────────────────────────────────────────
 * 2. EvidencePanel Pattern (Explainable Why Architecture)
 * ──────────────────────────────────────────────────────────── */
export interface EvidencePanelProps {
  predictionTitle: string;
  citations: { source: string; verse?: string; text: string }[];
  mathematicalFactors: { factor: string; degree: string; ayanamsha: string }[];
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  predictionTitle,
  citations,
  mathematicalFactors
}) => {
  return (
    <div className="space-y-4 text-left font-sans text-xs">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 font-mono">
        <span className="text-[10px] text-amber-400 uppercase font-bold">Prediction Target</span>
        <h4 className="text-sm font-bold text-white">{predictionTitle}</h4>
      </div>

      <div className="space-y-2">
        <span className="font-mono text-slate-400 uppercase font-bold text-[10px] block">
          01. Deterministic Astronomical Positions
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {mathematicalFactors.map((m, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#080E1A] border border-white/10 font-mono space-y-0.5">
              <span className="text-white font-bold block">{m.factor}</span>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Degree: <strong className="text-cyan-400">{m.degree}</strong></span>
                <span>Ayanamsha: {m.ayanamsha}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <span className="font-mono text-slate-400 uppercase font-bold text-[10px] block">
          02. Classical Scripture & Rules Provenance
        </span>
        <div className="space-y-2">
          {citations.map((c, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#080E1A] border border-amber-500/20 space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <strong className="text-amber-400">{c.source}</strong>
                {c.verse && <span className="text-slate-400">{c.verse}</span>}
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
 * 3. SystemComparison Pattern
 * ──────────────────────────────────────────────────────────── */
export interface SystemComparisonProps {
  theme: string;
  traditions: { name: string; assessment: string; strength: number; note: string }[];
}

export const SystemComparison: React.FC<SystemComparisonProps> = ({
  theme,
  traditions
}) => {
  return (
    <AstroCard variant="elevated" className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Cross-System Consensus</span>
          <h4 className="text-base font-bold text-white">{theme}</h4>
        </div>
        <AstroBadge variant="gold" icon={<ShieldCheck className="w-3 h-3" />}>
          Multi-System Validation
        </AstroBadge>
      </div>

      <div className="space-y-2.5">
        {traditions.map((t, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1 text-xs">
            <div className="flex items-center justify-between font-mono">
              <strong className="text-white">{t.name}</strong>
              <span className="text-amber-400 font-bold">{t.assessment}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full" style={{ width: `${t.strength}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 font-sans">{t.note}</p>
          </div>
        ))}
      </div>
    </AstroCard>
  );
};
