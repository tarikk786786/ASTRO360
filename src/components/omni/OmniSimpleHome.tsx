import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Heart, Briefcase, DollarSign, Compass, ArrowRight, 
  HelpCircle, CheckCircle2, AlertTriangle, Clock, Calendar, ShieldCheck, 
  MessageSquare, ChevronRight, User, Globe2
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer, { type OmniWhyDrawerProps } from './OmniWhyDrawer';

interface OmniSimpleHomeProps {
  userProfile: UserProfile;
  onNavigate: (tab: string) => void;
  onOpenProfile?: () => void;
}

export default function OmniSimpleHome({
  userProfile,
  onNavigate,
  onOpenProfile
}: OmniSimpleHomeProps) {
  const [whyModalOpen, setWhyModalOpen] = useState(false);
  const [selectedWhyPayload, setSelectedWhyPayload] = useState<Partial<OmniWhyDrawerProps>>({});

  // Dynamic greeting based on current local hour
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const seekerName = userProfile.name?.trim() || 'Seeker';

  const handleOpenWhy = (payload?: Partial<OmniWhyDrawerProps>) => {
    setSelectedWhyPayload(payload || {});
    setWhyModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 text-left pb-16">
      {/* 1. Header Greeting & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {greeting}, <span className="text-amber-400">{seekerName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono pt-0.5">
            Your astrology for today • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        {userProfile.dob && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> High Confidence Birth Chart
            </span>
          </div>
        )}
      </div>

      {/* 2. Hero: Strongest Theme Today */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-indigo-900/40 to-slate-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl"
      >
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Strongest Theme Today
            </span>
            <span className="text-xs text-amber-300/80 font-mono font-semibold">• Strong Resonance</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              PERSONAL GROWTH & EXECUTIVE FOCUS
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              You have high solar-lunar alignment today. Mental drive and strategic clarity are elevated, making this an ideal window to finalize key initiatives and make confident practical decisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('forecast')}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
            >
              Read Today's Guidance <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleOpenWhy({
                title: "Personal Growth & Executive Focus",
                period: "Today",
                confidence: "High",
                confidenceScore: 88,
                factors: [
                  "Harmonious Sun-Mars sextile conferring high stamina and decisive clarity",
                  "Moon transit in trine with your natal Lagna lord",
                  "Vimshottari Dasha sub-period activates 1st & 10th houses of personal initiative"
                ]
              })}
              className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Why?
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3. 4-Grid Key Area Themes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Love */}
        <div 
          onClick={() => onNavigate('forecast')}
          className="p-5 rounded-3xl bg-[#0F172A] hover:bg-[#131F37] border border-white/10 hover:border-pink-500/40 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-400" />
            </div>
            <span className="text-[10px] font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-md border border-pink-500/20">
              Elevated
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">Love & Bonds</h3>
            <p className="text-xs text-slate-400 pt-0.5">Warm empathy & honest discussions</p>
          </div>
        </div>

        {/* Career */}
        <div 
          onClick={() => onNavigate('forecast')}
          className="p-5 rounded-3xl bg-[#0F172A] hover:bg-[#131F37] border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
              Strong
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Career & Work</h3>
            <p className="text-xs text-slate-400 pt-0.5">High focus for major project delivery</p>
          </div>
        </div>

        {/* Money */}
        <div 
          onClick={() => onNavigate('forecast')}
          className="p-5 rounded-3xl bg-[#0F172A] hover:bg-[#131F37] border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Balanced
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Money & Assets</h3>
            <p className="text-xs text-slate-400 pt-0.5">Stable flow; audit upcoming plans</p>
          </div>
        </div>

        {/* Travel / Growth */}
        <div 
          onClick={() => onNavigate('forecast')}
          className="p-5 rounded-3xl bg-[#0F172A] hover:bg-[#131F37] border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Compass className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
              Active
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Travel & Horizon</h3>
            <p className="text-xs text-slate-400 pt-0.5">Expansive horizons & research</p>
          </div>
        </div>
      </div>

      {/* 4. Next Important Period Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Upcoming Celestial Window
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white pt-0.5">
              Next Major Period: Career Expansion & Leadership Shift
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10 shrink-0">
            Sep 12 – Oct 28, 2026
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span><strong>3 independent systems</strong> support this timing window (Vedic, Western & KP)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jupiter transit directly triggers your 10th house of profession while Western solar progression activates new public responsibilities and collaborative authority.
            </p>
          </div>

          <div className="sm:col-span-4 flex sm:justify-end gap-2">
            <button
              onClick={() => handleOpenWhy({
                title: "Career Expansion & Leadership Shift",
                period: "Sep 12 – Oct 28, 2026",
                confidence: "Moderate–High",
                confidenceScore: 85,
                factors: [
                  "Jupiter transit into 10th Kendra house",
                  "Vedic D10 Dashamsha chart alignment",
                  "Progressed Sun trine natal Midheaven (MC)",
                  "KP sub-lord connections confirming career upgrade"
                ]
              })}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Why? <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Today's Practical Guidance (Good For vs Be Mindful Of) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-[#0B1220] border border-emerald-500/30 space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Favorable For Today:
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>High-stakes discussions, contract reviews, and leadership meetings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Completing pending technical deliverables and organizing files</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Setting structured personal fitness and nutritional routines</span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-3xl bg-[#0B1220] border border-amber-500/30 space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Be Mindful Of:
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Overcommitting to too many simultaneous obligations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Rushing written communications when emotion is elevated</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Skipping adequate evening rest and screen-free recovery</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 6. Quick Ask ASTRO360 Prompt Banner */}
      <div 
        onClick={() => onNavigate('ask')}
        className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-[#0F172A] border border-indigo-500/30 hover:border-indigo-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
              Have a specific question about your life or chart?
            </h4>
            <p className="text-xs text-slate-400">
              Ask ASTRO360: "When is my best career window?" or "Compare my Vedic & Western charts"
            </p>
          </div>
        </div>
        <span className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-md">
          Ask ASTRO360 <ChevronRight className="w-4 h-4" />
        </span>
      </div>

      {/* Universal Explainability Drawer Modal */}
      <OmniWhyDrawer
        isOpen={whyModalOpen}
        onClose={() => setWhyModalOpen(false)}
        {...selectedWhyPayload}
      />
    </div>
  );
}
