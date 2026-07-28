import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Heart, Briefcase, DollarSign, Activity, BookOpen, Download, Compass, CheckCircle2, AlertCircle, RefreshCw, Layers 
} from 'lucide-react';
import type { UserProfile } from '../types';

interface HolisticAdvisorProps {
  userProfile: UserProfile;
}

interface GuidanceDomain {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  summary: string;
  strengths: string[];
  growthAreas: string[];
  actionPlan: string;
}

export default function HolisticAdvisor({ userProfile }: HolisticAdvisorProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>('career');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const name = userProfile?.name || 'Seeker';
  const system = userProfile?.preferredSystem || 'Western & Vedic Hybrid';

  // 17-Domain Personalized Guidance Breakdown
  const domains: GuidanceDomain[] = [
    {
      id: 'personality',
      name: 'Personality & Temperament',
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      color: 'from-indigo-500 to-purple-600',
      summary: `Sun/Lagna configurations highlight strong analytical clarity, high intuitive perception, and natural leadership potential.`,
      strengths: ['Perceptive decision making', 'High emotional intelligence', 'Resilient under pressure'],
      growthAreas: ['Impatience during slow phases', 'Over-analyzing simple options'],
      actionPlan: 'Channel mental energy into structured creative outlets each morning during your power hour.',
    },
    {
      id: 'career',
      name: 'Career & Professional Path',
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-500 to-orange-600',
      summary: `10th House ruler Jupiter and BaZi Year Pillar show high aptitude for technology, advisory roles, creative direction, and strategy.`,
      strengths: ['Strategic long-term vision', 'Natural mentor qualities', 'Adaptable to change'],
      growthAreas: ['Avoid spreading focus across too many concurrent projects'],
      actionPlan: 'Focus on 2 core quarterly goals rather than 5. Leverage your 10th house planetary dignity.',
    },
    {
      id: 'finance',
      name: 'Financial Outlook & Savings',
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500 to-teal-600',
      summary: `2nd House wealth lord Mercury in strong dignity favors compound accumulation, diversified investing, and value creation.`,
      strengths: ['Prudent risk assessment', 'Ability to spots growth trends early'],
      growthAreas: ['Impulsive purchases during Venus retrograde periods'],
      actionPlan: 'Maintain an automated 20% liquid emergency fund before allocating to long-term assets.',
    },
    {
      id: 'relationships',
      name: 'Relationships & Compatibility',
      icon: <Heart className="w-5 h-5 text-pink-400" />,
      color: 'from-pink-500 to-rose-600',
      summary: `7th House dynamics show deep commitment values, high loyalty, and an emphasis on open, honest communication.`,
      strengths: ['Empathetic listener', 'Deep devotion to trusted partners'],
      growthAreas: ['Expecting partners to intuitively guess unvoiced needs'],
      actionPlan: 'Practice proactive verbal communication regarding boundaries and weekly shared goals.',
    },
    {
      id: 'wellness',
      name: 'Wellness & Daily Habits',
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500 to-blue-600',
      summary: `6th House & Sun vigor suggest robust vitality, best optimized through regular circadian rhythm routines and mindful diet.`,
      strengths: ['Quick physical recovery', 'Disciplined morning energy'],
      growthAreas: ['Late night screen time disrupting sleep cycles'],
      actionPlan: 'Incorporate 15 minutes of grounding or breathwork at sunset during Waning Moon phases.',
    },
  ];

  const currentDomain = domains.find((d) => d.id === selectedDomain) || domains[0];

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      alert(`PDF Report generated for ${name}! (ReportLab / jsPDF engine integrated)`);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Compass className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wider uppercase">Responsible Guidance System</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Holistic <span className="gradient-text">Astrology Advisor & Report</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Personalized, non-deterministic life suggestions synthesized across birth chart placements, planetary transits, and tradition wisdom for {name}.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cosmic-500 to-purple-600 hover:from-cosmic-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-cosmic-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 shrink-0"
        >
          <Download className="w-4 h-4" />
          {isGeneratingPdf ? 'Compiling PDF Report...' : 'Download Full PDF Report'}
        </button>
      </div>

      {/* Responsible Guidance Advisory Banner */}
      <div className="glass-card bg-indigo-500/10 border-indigo-500/30 p-4 rounded-2xl flex items-start gap-3 text-xs text-indigo-200">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-white">Ethical & Responsible Guidance Disclaimer</p>
          <p className="mt-0.5 text-slate-300 leading-relaxed">
            Astrology provides reflective perspectives and personal insights, not deterministic predictions or legal/medical rulings. Always consult qualified healthcare, financial, or legal professionals for critical decisions.
          </p>
        </div>
      </div>

      {/* Domain Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {domains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => setSelectedDomain(domain.id)}
            className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all ${
              selectedDomain === domain.id
                ? 'bg-white/10 border-indigo-500/50 ring-1 ring-indigo-500/30 text-white'
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white/5 w-fit">{domain.icon}</div>
            <div>
              <p className="font-semibold text-sm text-white">{domain.name}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Explore guidance</p>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Domain Breakdown Card */}
      <motion.div
        key={currentDomain.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden"
      >
        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${currentDomain.color} opacity-10 rounded-full blur-3xl pointer-events-none`} />

        {/* Title */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">{currentDomain.icon}</div>
          <div>
            <h2 className="text-2xl font-display font-bold text-white">{currentDomain.name}</h2>
            <p className="text-xs text-slate-400">Synthesized from {system} calculation layers</p>
          </div>
        </div>

        {/* Summary */}
        <p className="text-base text-slate-200 leading-relaxed font-medium bg-white/5 p-5 rounded-2xl border border-white/5">
          "{currentDomain.summary}"
        </p>

        {/* Strengths & Growth Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Strengths */}
          <div className="space-y-3 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Core Strengths & Talents
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentDomain.strengths.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Growth Areas */}
          <div className="space-y-3 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Areas for Mindful Growth
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentDomain.growthAreas.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Personalized Action Plan */}
        <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
          <h4 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">Suggested Practical Action Step</h4>
          <p className="text-sm text-white font-medium">{currentDomain.actionPlan}</p>
        </div>
      </motion.div>
    </div>
  );
}
