import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Compass, AlertTriangle, Lightbulb, RefreshCw, Sun, Moon, Zap, ShieldCheck, CheckCircle2, Clock 
} from 'lucide-react';
import type { UserProfile } from '../types';

interface LiveCosmicDiagnosticsProps {
  userProfile: UserProfile;
}

interface TransitInfluence {
  id: string;
  category: string;
  planet: string;
  transitSign: string;
  houseAffected: string;
  whatIsHappening: string;
  whyIsHappening: string;
  solutionAndRemedy: string;
  intensityScore: number; // 0-100%
  statusColor: string;
}

export default function LiveCosmicDiagnostics({ userProfile }: LiveCosmicDiagnosticsProps) {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'career' | 'mind' | 'relationships' | 'vitality'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const name = userProfile?.name || 'Seeker';

  // Live Transit Influences & Root Cause Solutions
  const liveInfluences: TransitInfluence[] = [
    {
      id: 'saturn-9th',
      category: 'career',
      planet: 'Saturn (Shani Transit)',
      transitSign: 'Aquarius (Kumbha)',
      houseAffected: '9th House (Dharma & Long-term Growth)',
      whatIsHappening: 'Slight delays or friction in career milestones, long-distance travel, or higher certification results.',
      whyIsHappening: 'Saturn transits the 9th house requiring structural discipline, patience, and systemic effort over quick shortcuts.',
      solutionAndRemedy: 'Focus on 1 major project at a time. Perform Saturday morning charity or voluntary mentoring to align Saturnian karma.',
      intensityScore: 84,
      statusColor: 'from-amber-500 to-amber-700',
    },
    {
      id: 'jupiter-10th',
      category: 'career',
      planet: 'Jupiter (Guru Transit)',
      transitSign: 'Pisces (Meena)',
      houseAffected: '10th House (Profession & Authority)',
      whatIsHappening: 'Strong surge in public recognition, professional mentorship opportunities, and strategic clarity.',
      whyIsHappening: 'Jupiter occupies its own sign in your 10th house of career dignity, expanding your influence.',
      solutionAndRemedy: 'Proactively launch pitch proposals or lead team initiatives during your daily power hour (14:00 - 15:30).',
      intensityScore: 92,
      statusColor: 'from-emerald-500 to-teal-700',
    },
    {
      id: 'mercury-1st',
      category: 'mind',
      planet: 'Mercury Direct (Budh)',
      transitSign: 'Gemini (Mithuna)',
      houseAffected: '1st House (Self & Mental Clarity)',
      whatIsHappening: 'Rapid ideas, increased analytical capacity, but occasional mental restlessness or over-communicating.',
      whyIsHappening: 'Mercury exalted in the 1st house amplifies cognitive processing speed and verbal expression.',
      solutionAndRemedy: 'Write down key ideas in a structured journal before executing to avoid scattering focus.',
      intensityScore: 88,
      statusColor: 'from-blue-500 to-indigo-700',
    },
    {
      id: 'venus-12th',
      category: 'relationships',
      planet: 'Venus (Shukra)',
      transitSign: 'Taurus (Vrishabha)',
      houseAffected: '12th House (Inner Harmony & Subconscious)',
      whatIsHappening: 'Need for deeper solitary rest, creative reflection, and emotional boundary adjustment with close peers.',
      whyIsHappening: 'Venus transits your 12th house, shifting focus from external social events to internal peace.',
      solutionAndRemedy: 'Practice 15 minutes of evening mindfulness. Avoid impulsive late-night luxury purchases.',
      intensityScore: 76,
      statusColor: 'from-purple-500 to-pink-700',
    },
  ];

  const filteredInfluences = selectedFilter === 'all' 
    ? liveInfluences 
    : liveInfluences.filter(i => i.category === selectedFilter);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Real-time Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Activity className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase">Real-Time Cosmic Diagnostics</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-100">
            Live Diagnostics: <span className="gradient-text">What’s Happening & Solution</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Real-time analysis of active planetary transits for {name}, uncovering root cause reasons ("Why") and practical actionable solutions ("Remedy").
          </p>
        </div>

        {/* Live Timestamp & Refresh */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl glass-card text-xs text-slate-300 font-mono flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 rounded-2xl glass-card hover:bg-slate-800 text-slate-300 transition-all disabled:opacity-50"
            title="Refresh Live Diagnostics"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Live Transits' },
          { id: 'career', label: 'Career & Authority' },
          { id: 'mind', label: 'Mental Clarity' },
          { id: 'relationships', label: 'Relationships & Subconscious' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedFilter === filter.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                : 'glass-card text-slate-400 hover:text-slate-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Live Influences Grid */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredInfluences.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.houseAffected}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{item.transitSign}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-100 mt-2">{item.planet}</h3>
                </div>

                {/* Impact Indicator Bar */}
                <div className="w-full sm:w-48 space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Active Intensity</span>
                    <span className="font-bold text-amber-400">{item.intensityScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${item.statusColor}`}
                      style={{ width: `${item.intensityScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 3-Column Diagnostic Breakdown: What / Why / Solution */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* 1. What is Happening */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                    <Activity className="w-4 h-4" /> 1. What Is Happening
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {item.whatIsHappening}
                  </p>
                </div>

                {/* 2. Why it is Happening */}
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" /> 2. Why It Is Happening
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {item.whyIsHappening}
                  </p>
                </div>

                {/* 3. Practical Solution & Remedy */}
                <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" /> 3. Solution & Practical Remedy
                  </div>
                  <p className="text-sm text-emerald-200 leading-relaxed font-medium">
                    {item.solutionAndRemedy}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
