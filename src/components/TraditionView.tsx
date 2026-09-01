import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Globe2, 
  Compass, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { computeTraditionDiagnostics, type TraditionDiagnosticResult } from '../lib/multiTraditionCoordinator';
import { ASTROLOGY_SYSTEMS } from './navigation/navigationConfig';
import type { CategoryInfo, UserProfile } from '../types';

interface TraditionViewProps {
  tradition?: CategoryInfo;
  category?: CategoryInfo;
  onNavigate?: (tab: string) => void;
  userProfile?: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
}

export const TraditionView: React.FC<TraditionViewProps> = ({
  tradition: traditionProp,
  category: categoryProp,
  onNavigate,
  userProfile = {
    name: 'Cosmic Seeker',
    dob: '1998-06-15',
    time: '12:00',
    preferredSystem: 'vedic',
  } as UserProfile,
}) => {
  const currentTraditionId = traditionProp?.id || categoryProp?.id || userProfile.preferredSystem || 'vedic';
  const [selectedSystemId, setSelectedSystemId] = useState<string>(currentTraditionId);

  // Compute live multi-tradition diagnostics based on user birth data & selected tradition
  const diagnostics: TraditionDiagnosticResult = useMemo(() => {
    return computeTraditionDiagnostics(userProfile, selectedSystemId);
  }, [userProfile, selectedSystemId]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-8 text-left select-none">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#070D1D] to-[#040813] border border-white/10 shadow-2xl overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono font-bold">
            <Globe2 className="w-3.5 h-3.5" />
            <span>{diagnostics.traditionGroup}</span>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {diagnostics.zodiacSystem}
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            {diagnostics.traditionName}
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl font-sans leading-relaxed">
            High-precision astronomical ephemeris and classical scripture rules applied to your personalized birth coordinates.
          </p>
        </div>

        {/* 6 TRADITION QUICK-SWITCH SELECTOR PILLS */}
        <div className="pt-3 border-t border-white/10 flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          {ASTROLOGY_SYSTEMS.map((sys: any) => {
            const isSelected = selectedSystemId.toLowerCase() === sys.id || (selectedSystemId.toLowerCase().includes('vedic') && sys.id === 'vedic');
            return (
              <button
                key={sys.id}
                onClick={() => setSelectedSystemId(sys.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>{sys.name.split('/')[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE PLACEMENT TILES */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-extrabold text-white font-sans">
            Primary Computational Placements
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {diagnostics.coreHighlights.map((hl, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 rounded-2xl bg-[#0B1220]/90 border border-white/10 hover:border-amber-400/30 transition-all space-y-1.5 shadow-lg"
            >
              <span className="text-[11px] font-mono text-slate-400 block font-bold">
                {hl.label}
              </span>
              <div className="text-base font-extrabold text-amber-300 font-sans">
                {hl.value}
              </div>
              <p className="text-xs text-slate-400 leading-snug font-sans pt-1">
                {hl.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DEEP SCRIPTURE & MATHEMATICAL INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deep Interpretation Insights */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#080E1B] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-extrabold text-white font-sans">
              Classical Synthesis & Dynamics
            </h3>
          </div>

          <div className="space-y-3">
            {diagnostics.deepInsights.map((insight, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-cyan-400/10 text-cyan-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Canonical Power Remedy Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/20 via-[#0C1424] to-[#080D1A] border border-amber-500/20 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Flame className="w-5 h-5" />
              <h3 className="text-base font-extrabold font-sans">
                Canonical Remedy
              </h3>
            </div>

            <div className="text-sm font-bold text-amber-200 font-sans">
              {diagnostics.powerRemedy.title}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {diagnostics.powerRemedy.practice}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-[11px] font-mono text-amber-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="truncate">{diagnostics.powerRemedy.citation}</span>
          </div>
        </div>
      </div>

      {/* QUICK LAUNCH ACTIONS */}
      <div className="p-5 rounded-2xl bg-[#091122] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-white font-sans">
            Ready to explore detailed calculations?
          </h4>
          <p className="text-xs text-slate-400 font-sans">
            Launch specialized chart studios, ephemeris diagnostics, and timing calculators.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate?.('charts')}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-amber-400/10 active:scale-95"
          >
            <span>Open Chart Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate?.('forecast')}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs font-mono border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <span>View Timeline</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraditionView;
