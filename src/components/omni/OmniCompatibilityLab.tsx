import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, ShieldCheck, ChevronRight, User, 
  ArrowRight, Flame, Scale, Compass, CheckCircle2
} from 'lucide-react';
import { AstroButton, AstroCard, AstroBadge } from '../../design-system';
import type { UserProfile } from '../../types';

interface OmniCompatibilityLabProps {
  userProfile: UserProfile;
}

export default function OmniCompatibilityLab({ userProfile }: OmniCompatibilityLabProps) {
  const [partnerName, setPartnerName] = useState('Elena Vance');
  const [partnerDOB, setPartnerDOB] = useState('1998-11-22');
  const [partnerTime, setPartnerTime] = useState('14:45');
  const [partnerLocation, setPartnerLocation] = useState('Tokyo, Japan');
  const [hasCalculated, setHasCalculated] = useState(true);

  const seekerName = userProfile.name || 'You';

  const harmonyDimensions = [
    { name: 'Emotional Resonance (Nadi & Moon)', score: 94, category: 'Exceptional', note: 'Deep psychological comfort and instinctual mutual empathy.' },
    { name: 'Magnetic Attraction (Venus-Mars)', score: 88, category: 'Dynamic', note: 'Strong physical chemistry and complementary creative drives.' },
    { name: 'Intellectual & Communication (Mercury)', score: 82, category: 'Harmonious', note: 'Effortless discourse, shared humor, and mutual problem solving.' },
    { name: 'Financial & Ambition Barakah (2nd/11th)', score: 91, category: 'Expansive', note: 'Mutual compounding of resources, stability, and enterprise.' },
    { name: 'Long-Term Longevity & Dharma (Saturn/7th)', score: 86, category: 'Enduring', note: 'Resilient partnership commitment with high mutual respect.' }
  ];

  const ashtaKootaPoints = [
    { name: 'Varna (Spiritual Compatibility)', points: '1 / 1', max: 1, full: true },
    { name: 'Vashya (Mutual Influence)', points: '2 / 2', max: 2, full: true },
    { name: 'Tara (Destiny & Longevity)', points: '3 / 3', max: 3, full: true },
    { name: 'Yoni (Sexual & Instinctive Affinity)', points: '4 / 4', max: 4, full: true },
    { name: 'Graha Maitri (Mental Friendship)', points: '5 / 5', max: 5, full: true },
    { name: 'Gana (Temperament & Lifestyle)', points: '5 / 6', max: 6, full: false },
    { name: 'Bhakoot (Emotional Welfare & Growth)', points: '7 / 7', max: 7, full: true },
    { name: 'Nadi (Genetics & Vitality Flow)', points: '8 / 8', max: 8, full: true },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left font-sans pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Synastry & Compatibility Lab
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono pt-1">
            Multi-Tradition Ashta Koota (36-pt) + Western Synastry Overlay
          </p>
        </div>

        <AstroBadge variant="rose" icon={<Sparkles className="w-3.5 h-3.5" />}>
          35 / 36 Match Score (97%)
        </AstroBadge>
      </div>

      {/* 2. Partner Input Strip */}
      <AstroCard variant="elevated" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            Comparing Profiles
          </span>
          <span className="text-xs font-mono text-amber-400 font-semibold">Dual Natal Computation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Seeker Profile Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-amber-400 font-bold">Primary Seeker</span>
              <span className="text-slate-400">Natal Active</span>
            </div>
            <h4 className="text-base font-bold text-white">{seekerName}</h4>
            <p className="text-xs text-slate-400 font-mono">
              {userProfile.birthDate || '1995-04-14'} • {userProfile.birthCity || 'London, UK'}
            </p>
          </div>

          {/* Partner Profile Input */}
          <div className="p-4 rounded-2xl bg-white/5 border border-rose-500/30 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-rose-400 font-bold">Partner / Match</span>
              <span className="text-slate-400">Input Data</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Partner Name"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400 font-mono"
              />
              <input
                type="date"
                value={partnerDOB}
                onChange={(e) => setPartnerDOB(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400 font-mono"
              />
            </div>
          </div>
        </div>
      </AstroCard>

      {/* 3. Overall Compatibility Score Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-rose-950/40 via-[#0E172A] to-[#080E1A] border border-rose-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-rose-300 bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-500/30">
                Consensus Compatibility
              </span>
              <span className="text-xs font-mono text-amber-300">★ Utkrishta (Supreme Synergy)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {seekerName} & {partnerName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Exceptionally rare vibrational affinity. The Moon placements share mutual friendliness with zero Nadi Dosha obstructions. The synastry reveals strong mutual expansion, natural trust, and lasting dharmic stability.
            </p>
          </div>

          {/* Big Score Gauge */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/10 shrink-0 min-w-[160px]">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300 font-mono">
              35/36
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-300 mt-1">Ashta Koota Score</span>
            <span className="text-[10px] font-mono text-emerald-400 mt-0.5">97.2% Overall Match</span>
          </div>
        </div>
      </motion.div>

      {/* 4. Ashta Koota 8-Koota Breakdown */}
      <AstroCard variant="elevated" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">36-Point Ashta Koota Scoring</h4>
            <p className="text-xs text-slate-400 font-mono">Vedic Classical Metric (Brihat Parashara Hora Shastra)</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">Passing Threshold: 18/36</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ashtaKootaPoints.map((k, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${k.full ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span className="text-slate-200">{k.name}</span>
              </div>
              <span className="font-bold text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                {k.points}
              </span>
            </div>
          ))}
        </div>
      </AstroCard>

      {/* 5. 5 Dimensional Synergy Gauges */}
      <AstroCard variant="elevated" className="space-y-4">
        <h4 className="text-base font-bold text-white tracking-tight border-b border-white/10 pb-3">
          5 Pillars of Life Partnership Synergy
        </h4>

        <div className="space-y-4">
          {harmonyDimensions.map((dim, idx) => (
            <div key={idx} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-slate-200">{dim.name}</span>
                <span className="text-amber-400 font-bold">{dim.score}% • {dim.category}</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 h-full rounded-full"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">{dim.note}</p>
            </div>
          ))}
        </div>
      </AstroCard>
    </div>
  );
}
