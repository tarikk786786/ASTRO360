import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Compass, 
  Calendar, Layers, Bot, Heart, Briefcase, DollarSign, Globe, 
  MapPin, Clock, Award, HelpCircle, BookOpen, Code2, Server, Cpu,
  ChevronRight, Terminal, User, Check, TrendingUp, RefreshCw
} from 'lucide-react';
import { UserProfile } from '../../types';
import OmniLandingNavbar from './OmniLandingNavbar';
import OmniProductPreview from './OmniProductPreview';
import AstroCelestialAnimation from './AstroCelestialAnimation';
import OmniWhyShowcase from './OmniWhyShowcase';
import OmniFAQSection from './OmniFAQSection';
import OmniAudioBriefing from '../omni/OmniAudioBriefing';
import OmniLiveSkyRadar from '../omni/OmniLiveSkyRadar';
import OmniLiveZodiacRadar from './OmniLiveZodiacRadar';
import OmniHeroChartStudio from './OmniHeroChartStudio';

interface LandingPageProps {
  onStartOnboarding: (presetData?: Partial<UserProfile>) => void;
  onNavigateToTab: (tabId: string) => void;
  userProfile?: UserProfile;
}

export default function LandingPage({
  onStartOnboarding,
  onNavigateToTab,
  userProfile,
}: LandingPageProps) {
  const [checkedItems, setCheckedItems] = useState<number[]>([0, 1, 2, 4]);
  const [selectedCuriosity, setSelectedCuriosity] = useState<'career' | 'love' | 'money' | 'timing' | 'growth'>('career');
  const [viewMode, setViewMode] = useState<'simple' | 'deep'>('simple');

  const toggleCheck = (idx: number) => {
    if (checkedItems.includes(idx)) {
      setCheckedItems(checkedItems.filter(i => i !== idx));
    } else {
      setCheckedItems([...checkedItems, idx]);
    }
  };

  const curiosityData = {
    career: {
      label: 'Career & Purpose',
      icon: Briefcase,
      headline: 'Your next professional cycle',
      window: 'Sep 2026 – Feb 2027',
      theme: 'Leadership expansion and structured responsibility',
      systems: [
        { name: 'Vedic', status: 'Strong', note: 'Jupiter-Saturn Dasha transit through 10th house' },
        { name: 'Western', status: 'Strong', note: 'Progressed Sun trine Midheaven' },
        { name: 'KP', status: 'Moderate', note: '10th Cusp sub-lord signifies 2, 6, 10, 11' },
      ],
      why: 'Multiple timing systems converge on elevation of responsibility and career milestones during this window.',
      cta: 'Explore My Career Astrology'
    },
    love: {
      label: 'Love & Connection',
      icon: Heart,
      headline: 'Relationship harmony & depth',
      window: 'Nov 2026 – Apr 2027',
      theme: 'Emotional clarity, shared values, and relational stability',
      systems: [
        { name: 'Vedic', status: 'Favorable', note: 'Venus transit activating 7th house Kendra' },
        { name: 'Western', status: 'Strong', note: 'Jupiter entering 7th house partnership zone' },
        { name: 'Ashta Koota', status: 'Balanced', note: 'High Bhakoot & Gana chemistry' },
      ],
      why: 'Benefic activations across both traditions support mutual understanding and meaningful commitment.',
      cta: 'Explore My Relationship Astrology'
    },
    money: {
      label: 'Financial Rhythm',
      icon: DollarSign,
      headline: 'Wealth building & resource cycles',
      window: 'Jan 2027 – Jul 2027',
      theme: 'Disciplined compounding and long-term asset focus',
      systems: [
        { name: 'Vedic', status: 'Active', note: 'Dhana yoga activation in 2nd and 11th bhavas' },
        { name: 'Western', status: 'Steady', note: 'Saturn trine natal Taurus placements' },
        { name: 'KP', status: 'Favorable', note: '2nd house significators receiving benefic aspects' },
      ],
      why: 'Calculations point toward sustainable resource growth rather than speculative risk.',
      cta: 'Explore My Financial Astrology'
    },
    timing: {
      label: 'Crucial Timing',
      icon: Clock,
      headline: 'Personal timing & planetary transits',
      window: 'Next 30 Days to 12 Months',
      theme: 'Clear windows of high initiative vs periods of quiet consolidation',
      systems: [
        { name: 'Vedic Dasha', status: 'Active', note: 'Mahadasha lord transit timing' },
        { name: 'Panchanga', status: 'Optimal', note: 'Abhijit Muhurta & favorable lunar tithis' },
        { name: 'Western Transits', status: 'Aligned', note: 'Major outer planet stations' },
      ],
      why: 'Understanding when planetary tides support action helps plan major life decisions calmly.',
      cta: 'Explore My Timing Horizons'
    },
    growth: {
      label: 'Inner Growth',
      icon: TrendingUp,
      headline: 'Personal evolution & self-discovery',
      window: 'Continuous 2026 – 2028',
      theme: 'Integration of life lessons, shadow work, and purpose alignment',
      systems: [
        { name: 'Jaimini', status: 'Deep', note: 'Atmakaraka placement and soul purpose alignment' },
        { name: 'Western', status: 'Transformative', note: 'Pluto-Saturn developmental cycle' },
        { name: 'Vedic Nakshatra', status: 'Grounded', note: 'Pada harmonics for inner clarity' },
      ],
      why: 'Helps contextualize challenging periods as structured developmental chapters.',
      cta: 'Explore My Inner Growth'
    }
  };

  const checklistItems = [
    "Talked to an astrologer about your birth chart",
    "Consulted another astrologer who emphasized different placements",
    "Compared Vedic (Sidereal) and Western (Tropical) signs",
    "Looked up your Moon Sign, Rising Sign, and Nakshatra",
    "Checked your 120-year Vimshottari Dasha timeline",
    "Read daily, monthly, and yearly forecasts across multiple apps",
    "Explored traditional remedies, mantras, or gemstone recommendations",
    "Searched for the 'right' timing window for career, marriage, or moving",
    "Asked the same important life question in several different ways"
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateChart = () => {
    onStartOnboarding({
      name: userProfile?.name || '',
      dob: userProfile?.dob || '1998-06-15',
      time: userProfile?.time || '12:00',
      location: userProfile?.location || 'London, UK'
    });
  };

  return (
    <div className="relative min-h-screen bg-[#070A12] text-slate-100 font-sans selection:bg-amber-400/30 selection:text-white">
      
      {/* 1. Announcement Bar & Sticky Header */}
      <OmniLandingNavbar
        onCreateChart={handleCreateChart}
        onExploreHowItWorks={() => scrollToSection('methodology-section')}
        onNavigateSection={scrollToSection}
        onOpenDashboard={() => onNavigateToTab('home')}
      />

      {/* 2. Hero Section (PRD Section 4 & 6) */}
      <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 via-emerald-400/20 to-indigo-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold tracking-wider uppercase shadow-md shadow-amber-400/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>YOU'VE PROBABLY LOOKED IN MORE THAN ONE PLACE.</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]"
            >
              What if all the astrology <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                you've explored
              </span> <br />
              could finally feel easier to understand?
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              You've probably seen different charts, readings, predictions and remedies. ASTRO360 brings your chart, timing, multiple traditions and explanations together in one connected experience.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1"
            >
              <button
                onClick={handleCreateChart}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-amber-400/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create My Free Chart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('journey-section')}
                className="px-6 py-3.5 rounded-2xl bg-[#0F172A] hover:bg-[#131F37] text-slate-300 hover:text-white border border-white/10 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer min-h-[48px]"
              >
                <span>Explore the Experience</span>
              </button>
            </motion.div>

            {/* Micro-Trust Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-400 font-mono pt-1"
            >
              <span className="flex items-center gap-1.5 text-amber-400 font-bold"><Sparkles className="w-3.5 h-3.5" /> Calculated first. Explained second.</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 100% Free Launch Tier</span>
              <span>•</span>
              <span>No credit card needed</span>
            </motion.div>
          </div>

          {/* Right Column: Interactive Instant Hero Chart Calculator & Studio */}
          <div className="lg:col-span-5">
            <OmniHeroChartStudio
              onCalculate={(data) => onStartOnboarding(data)}
              userProfile={userProfile}
            />
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2.1 THE SEEKER'S JOURNEY: VISUAL CARDS SEQUENCE               */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="journey-section" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            THE SEEKER'S JOURNEY
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Different astrologers. Different traditions. Different answers.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            You've likely gathered pieces of the puzzle in many places. ASTRO360 is built to connect them.
          </p>
        </div>

        {/* 4 Illustrative Past Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 relative overflow-hidden group">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/5 pb-2">
              <span className="font-bold text-amber-400/90">01. Astrologer Reading</span>
              <span>Vedic (Sidereal)</span>
            </div>
            <p className="text-xs text-slate-200 font-serif italic">
              "Career looks significant this year. Focus on long-term discipline under Saturn's gaze."
            </p>
            <span className="text-[10px] font-mono text-slate-500 block pt-1">
              Emphasized: 10th House & Dasha
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 relative overflow-hidden group">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/5 pb-2">
              <span className="font-bold text-cyan-400/90">02. Another Perspective</span>
              <span>Western (Tropical)</span>
            </div>
            <p className="text-xs text-slate-200 font-serif italic">
              "A major transit brings creative self-expression and leadership opportunities."
            </p>
            <span className="text-[10px] font-mono text-slate-500 block pt-1">
              Emphasized: Solar Arc & Transits
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 relative overflow-hidden group">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/5 pb-2">
              <span className="font-bold text-indigo-400/90">03. Another System</span>
              <span>KP Stellar</span>
            </div>
            <p className="text-xs text-slate-200 font-serif italic">
              "Sub-lord indicates professional milestone between September and November."
            </p>
            <span className="text-[10px] font-mono text-slate-500 block pt-1">
              Emphasized: Sub-Lord Cuspal Math
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 relative overflow-hidden group">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/5 pb-2">
              <span className="font-bold text-emerald-400/90">04. Traditional Practice</span>
              <span>Remedy with Context</span>
            </div>
            <p className="text-xs text-slate-200 font-serif italic">
              "Consider traditional mindful practices aligned with your planetary periods."
            </p>
            <span className="text-[10px] font-mono text-slate-500 block pt-1">
              Emphasized: Cultural Context & Timing
            </span>
          </div>
        </div>

        {/* Unified Convergence Banner */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#142342] to-[#0F172A] border border-amber-400/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              ASTRO360 UNIFIED CONVERGENCE
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Same chart. Multiple perspectives. Clearer timeline. Visible reasoning.
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              *Illustrative demonstration of how diverse astrological traditions connect inside ASTRO360.
            </p>
          </div>
          <button
            onClick={handleCreateChart}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer transition-all hover:scale-105 min-h-[44px]"
          >
            <span>See My Connected Chart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2.2 YOU MAY HAVE TRIED THIS ALREADY (Interactive Checklist)   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              RECOGNITION
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              You may have already tried more than one way to understand your chart.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Tap the experiences you've had in your astrological journey so far:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {checklistItems.map((item, idx) => {
              const isChecked = checkedItems.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 text-xs font-sans select-none min-h-[44px] ${
                    isChecked
                      ? 'bg-amber-400/10 border-amber-400/40 text-slate-100'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                    isChecked ? 'bg-amber-400 border-amber-400 text-slate-950 font-black' : 'border-slate-600'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase">And still had one central question:</span>
              <p className="text-base font-bold text-amber-300 font-serif italic">
                "How does it all fit together?"
              </p>
            </div>
            <button
              onClick={handleCreateChart}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0 border border-white/15 min-h-[44px]"
            >
              <span>See How ASTRO360 Connects It</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2.3 THE PROBLEM ISN'T TOO LITTLE INFORMATION (Before / After) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            CLARITY OVER CLUTTER
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            The problem isn't a lack of astrology.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            It can be exhausting to keep track of disparate charts, conflicting apps, notes, and loose predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#0B101E] border border-rose-500/20 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                <span>✕</span> FRAGMENTED ASTROLOGY (BEFORE)
              </span>
              <span className="text-[10px] font-mono text-slate-500">Scattered Pieces</span>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-slate-400">
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-center justify-between">
                <span>Astrologer consultation notes</span>
                <span className="text-rose-400 text-[10px]">Notebook</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-center justify-between">
                <span>Vedic Dasha chart generator</span>
                <span className="text-rose-400 text-[10px]">App 1</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-center justify-between">
                <span>Western horoscope forecast</span>
                <span className="text-rose-400 text-[10px]">App 2</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-center justify-between">
                <span>Remedy recommendations</span>
                <span className="text-rose-400 text-[10px]">Bookmarks</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-center justify-between">
                <span>Life events & question history</span>
                <span className="text-rose-400 text-[10px]">Forgotten</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-sans italic pt-1">
              Result: Many opinions, no central timeline, difficult to verify reasoning.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0F1D38] to-[#0A1326] border border-amber-400/40 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-amber-400/20 pb-3">
              <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> ASTRO360 (CONNECTED)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">One Unified Home</span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-200">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">01.</span>
                <span>Your Chart (Precision JPL NASA Ephemeris)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">02.</span>
                <span>Your Timing (120y Dasha + Transits + Muhurta)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">03.</span>
                <span>Multiple Perspectives (Vedic, Western, KP, Jaimini)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">04.</span>
                <span>Transparent Evidence ("Why this period?")</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">05.</span>
                <span>Your Saved Question & Life Journey History</span>
              </div>
            </div>
            <p className="text-[11px] text-amber-200/90 font-sans italic pt-1">
              Result: Clear, calm synthesis where every interpretation can be inspected.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2.4 COMPARE, DON'T CHOOSE BLINDLY (Cross-Tradition Consensus) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#090E1C] border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              CROSS-TRADITION CONSENSUS
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              You don't have to choose one perspective before exploring another.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              See how different traditions answer the same life inquiry without dogmatic conflict.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-white/5 pb-2">
              <span className="text-amber-400 font-bold">SEEKER QUESTION:</span>
              <span className="text-slate-200">"When might my career become more active?"</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 block text-[10px]">VEDIC (JYOTISH)</span>
                <span className="text-emerald-400 font-bold">Strong (88%)</span>
                <p className="text-[10px] text-slate-400">Jupiter Mahadasha activating 10th Kendra</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 block text-[10px]">WESTERN TROPICAL</span>
                <span className="text-emerald-400 font-bold">Strong (84%)</span>
                <p className="text-[10px] text-slate-400">Solar Arc Midheaven transit alignment</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-cyan-400 font-bold">Moderate (72%)</span>
                <p className="text-[10px] text-slate-400">10th Cusp sub-lord signifies 2, 6, 10</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-cyan-400 font-bold">Moderate (70%)</span>
                <p className="text-[10px] text-slate-400">Amatyakaraka aspecting 10th rashi</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> COMMON THEME
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Elevated professional visibility, leadership responsibility, and recognition across all primary systems.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> NUANCED DIFFERENCES
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Vedic emphasizes disciplined long-term institutional duty, while Western highlights creative initiative and autonomy.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCreateChart}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all min-h-[44px]"
            >
              <span>Compare My Own Chart Across Traditions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2.5 EXPLORE TRADITIONAL REMEDIES WITH CONTEXT (Respectful)    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#090E1B] border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              GROUNDED TRADITIONAL PRACTICES
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Explore traditional remedies with context, not guarantees.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-2xl">
              ASTRO360 helps you understand the cultural tradition, timing, and reasoning behind a practice so you can explore it thoughtfully without fear or false promises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] text-amber-400 font-bold uppercase block">TRADITIONAL PRACTICE</span>
              <h4 className="text-sm font-bold text-white">Mindful Saturn/Shani Alignment</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Practices of service, disciplined routines, and Saturday mindfulness.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] text-cyan-400 font-bold uppercase block">HISTORICAL CONTEXT & SCRIPTURE</span>
              <h4 className="text-sm font-bold text-white">Brihat Parashara Hora Shastra</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Traditionally cited to cultivate patience during periods of heavy karmic responsibility.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">RELEVANT TIMING WINDOW</span>
              <h4 className="text-sm font-bold text-white">Saturn Mahadasha / Sade Sati</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Most relevant during active Saturn dasha sub-periods and major transits.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-[11px] text-slate-400 font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>ASTRO360 does not provide medical, legal, or financial guarantees. Practices are framed purely through cultural and philosophical context.</span>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2.6 STOP STARTING OVER (Connected Life Timeline)              */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#080D1A] border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              CONNECTED LIFE MEMORY
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Your astrology shouldn't disappear every time you change tools.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Keep your birth chart, forecasts, question history, and major life milestones in one permanent workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-slate-500 text-[10px] block">2021</span>
              <span className="text-slate-300 font-bold block">First Chart</span>
              <p className="text-[10px] text-slate-500">Initial basic reading</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-slate-500 text-[10px] block">2022</span>
              <span className="text-slate-300 font-bold block">Second Reading</span>
              <p className="text-[10px] text-slate-500">Different astrologer</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-slate-500 text-[10px] block">2023</span>
              <span className="text-slate-300 font-bold block">New System</span>
              <p className="text-[10px] text-slate-500">Western & KP study</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-slate-500 text-[10px] block">2024</span>
              <span className="text-slate-300 font-bold block">Life Milestone</span>
              <p className="text-[10px] text-slate-500">Career & relocation</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-slate-500 text-[10px] block">2025</span>
              <span className="text-slate-300 font-bold block">New Forecast</span>
              <p className="text-[10px] text-slate-500">Transit radar</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/40 space-y-1">
              <span className="text-amber-400 font-bold text-[10px] block">2026+</span>
              <span className="text-amber-300 font-bold block">ASTRO360</span>
              <p className="text-[10px] text-amber-200/80">Everything unified</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-400 font-sans text-center sm:text-left">
              Explore how your real life events correlate with classical timing techniques without starting from scratch.
            </p>
            <button
              onClick={handleCreateChart}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer min-h-[44px]"
            >
              <span>Create My Permanent Chart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2.7 STILL HAVE THE SAME QUESTION? (Conversational Oracle)     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1224] border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              CONVERSATIONAL INTELLIGENCE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Still have the same question? Ask it naturally.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Unlike static horoscopes, ASTRO360's AI is strictly grounded in deterministic ephemeris calculations and classical texts.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-start gap-2.5 max-w-xl ml-auto justify-end">
              <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950 font-bold shadow-md">
                "When is my strongest upcoming career timing window?"
              </div>
            </div>

            <div className="flex items-start gap-2.5 max-w-2xl">
              <div className="p-4 rounded-2xl bg-slate-900 border border-white/15 text-slate-200 space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> DIRECT ANSWER & SYNTHESIS
                  </span>
                  <span className="text-[10px] text-emerald-400">Confidence: 88%</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Your primary career activation occurs between <strong>September 12 and November 28</strong>. During this window, Jupiter transits your 10th house while your Vimshottari Jupiter-Saturn period is active.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-slate-400">
                    Timing: Sep 12 – Nov 28
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-cyan-400">
                    Stability: High (±30m birth drift tested)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 max-w-xl ml-auto justify-end">
              <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950 font-bold shadow-md">
                "What if my birth time is off by 10 minutes?"
              </div>
            </div>

            <div className="flex items-start gap-2.5 max-w-2xl">
              <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 text-slate-200 space-y-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] text-cyan-400 font-bold">PREDICTION STABILITY ANALYSIS</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Stable</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  The 10-minute shift moves your Ascendant by only 2.5°, keeping your 10th house lord and Vimshottari Mahadasha timing completely unchanged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2.8 SIMPLE OUTSIDE. DEEP INSIDE. (Adaptive Density View)      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#090F20] border border-white/10 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                ADAPTIVE DENSITY
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Simple when you want clarity. Deep when you want detail.
              </h2>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setViewMode('simple')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer min-h-[44px] ${
                  viewMode === 'simple' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Simple View
              </button>
              <button
                onClick={() => setViewMode('deep')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer min-h-[44px] ${
                  viewMode === 'deep' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Expert Deep View
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'simple' ? (
              <motion.div
                key="simple"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3"
              >
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">✦ Everyday Clarity</span>
                <h3 className="text-lg font-bold text-white">Career momentum is strongly elevated.</h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Your upcoming period favors launching initiatives, discussing advancement, and expanding your professional reach. Focus on steady, structured effort.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="deep"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 rounded-2xl bg-[#060B16] border border-amber-500/40 space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between text-amber-400 border-b border-white/10 pb-2 font-bold">
                  <span>✦ ASTRONOMICAL & SCRIPTURAL PROVENANCE</span>
                  <span>JPL DE440 / True Lahiri</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
                  <div><strong>Jupiter:</strong> 18°24' Cancer (Exalted)</div>
                  <div><strong>House:</strong> 10th Bhava (Midheaven)</div>
                  <div><strong>Vedic Dasha:</strong> Guru / Shani</div>
                  <div><strong>KP Sub-Lord:</strong> Mercury (Signifies 2, 10, 11)</div>
                </div>
                <p className="text-[11px] text-slate-400 font-mono pt-1">
                  Source: Brihat Parashara Hora Shastra Ch. 42 (Rajayoga Adhyaya) & KP Cuspal Interlinks.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2.9 WHAT ARE YOU MOST CURIOUS ABOUT? (Personalization)        */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D182E] to-[#080D1A] border border-amber-400/30 space-y-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              PERSONALIZED DISCOVERY
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              What are you most curious about right now?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select an area of life to see how ASTRO360 breaks down timing and perspectives:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(curiosityData) as Array<keyof typeof curiosityData>).map((key) => {
              const item = curiosityData[key];
              const isSelected = selectedCuriosity === key;
              const Icon = item.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCuriosity(key)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer select-none min-h-[44px] ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-lg scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCuriosity}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-white/15 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{curiosityData[selectedCuriosity].headline}</h3>
                  <span className="text-xs font-mono text-amber-400">{curiosityData[selectedCuriosity].theme}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold self-start sm:self-auto">
                  Window: {curiosityData[selectedCuriosity].window}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                {curiosityData[selectedCuriosity].systems.map((sys, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{sys.name}</span>
                      <span className="text-emerald-400 text-[10px] font-bold">{sys.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">{sys.note}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-300 font-sans italic">
                Reasoning: {curiosityData[selectedCuriosity].why}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-slate-400">
                  *Sample demonstration based on standard natal chart alignment.
                </span>
                <button
                  onClick={handleCreateChart}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105 min-h-[44px]"
                >
                  <span>{curiosityData[selectedCuriosity].cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 2.10 Start Free — See the Difference (Free PRD Section 12 & 44) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-left space-y-8 border-y border-white/5 bg-[#050811]">
        
        {/* Unlocked Free Pro Capabilities Highlight */}
        <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#111C35] to-[#0F172A] border border-amber-500/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">Full ASTRO360 Pro Intelligence Unlocked Free</h3>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">Early Launch Access • $0 Forever for Early Users</span>
              </div>
            </div>
            <button
              onClick={handleCreateChart}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-md self-start sm:self-auto cursor-pointer"
            >
              <span>Unlock My Free Chart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Full 120y Dasha</span>
              <p className="text-[10px] text-slate-400 leading-tight">Vimshottari Mahadasha, Antar & Pratyantar timing</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 4 Forecast Horizons</span>
              <p className="text-[10px] text-slate-400 leading-tight">7 Days, 30 Days, 12 Months & 5-Year timeline</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 36-Point Synastry</span>
              <p className="text-[10px] text-slate-400 leading-tight">Ashta Koota compatibility & communication chemistry</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Classical Citations</span>
              <p className="text-[10px] text-slate-400 leading-tight">BPHS, Tetrabiblos & KP Sub-Lord evidence provenance</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Executive Dossier</span>
              <p className="text-[10px] text-slate-400 leading-tight">Comprehensive high-res PDF summary export</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ask ASTRO360</span>
              <p className="text-[10px] text-slate-400 leading-tight">Natural-language answers backed by real planetary math</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Instant Free Tools
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Start free. See the difference.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl">
              No subscription needed to discover your birth chart, lunar Nakshatra, daily Panchanga, Muhurta, and compatibility.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('free-tools')}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>Explore All Free Tools</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* 6 Free Tools Quick Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { title: "Free Birth Chart", desc: "Sun, Moon, Ascendant & Placements", tab: "free-tools" },
            { title: "Free Daily Insight", desc: "Today's strongest themes & focus", tab: "forecast" },
            { title: "Free 7-Day Forecast", desc: "Upcoming key timing windows", tab: "forecast" },
            { title: "Free Panchanga", desc: "Tithi, Nakshatra & Rahu Kalam", tab: "free-tools" },
            { title: "Free Nakshatra", desc: "Birth star & Pada calculator", tab: "free-tools" },
            { title: "Free Compatibility", desc: "Instant elemental harmony score", tab: "free-tools" },
          ].map((tool, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateToTab(tool.tab)}
              className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer space-y-1.5 group shadow-sm"
            >
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">100% Free</span>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">{tool.title}</h3>
              <p className="text-[11px] text-slate-400 leading-tight">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2.8 Real-Time Celestial Sky Radar (Live JPL DE440 Positions) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <OmniLiveSkyRadar />
      </section>

      {/* 3. Product Preview Section (4 Interactive Tabs) */}
      <OmniProductPreview onExplore={handleCreateChart} />

      {/* 3.5 ASTRO360 Celestial Engine (Real Data-Driven Astronomical Precision Instrument) */}
      <AstroCelestialAnimation 
        onExploreChart={handleCreateChart}
        userDob={userProfile?.dob}
        userTime={userProfile?.time}
      />

      {/* 3.7 Interactive Live Audio Briefing Demo on Landing */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <OmniAudioBriefing userProfile={userProfile || { name: 'Visitor', dob: '1998-06-15', time: '12:00', location: 'London, UK', gender: 'universal', preferredSystem: 'universal' }} />
      </section>

      {/* 4. Signature Brand Block (PRD Section 48 & 49) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center space-y-6">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculated first. Explained second.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            ASTRO360 separates astronomical computation from interpretive reasoning.
          </p>
        </div>

        {/* 4-Stage Horizontal Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left font-mono text-xs pt-2">
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
            <span className="text-amber-400 font-bold">01. Calculation</span>
            <p className="text-[11px] text-slate-400">JPL Ephemeris coordinates & house boundaries</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
            <span className="text-cyan-400 font-bold">02. Systems</span>
            <p className="text-[11px] text-slate-400">Vedic, Western, KP, and BaZi engines</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
            <span className="text-indigo-400 font-bold">03. Timing</span>
            <p className="text-[11px] text-slate-400">Dashas, planetary horas, and transits</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
            <span className="text-emerald-400 font-bold">04. Synthesis</span>
            <p className="text-[11px] text-slate-400">Explainable, human-readable intelligence</p>
          </div>
        </div>

        {/* 3 Foundation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-2">
          <div className="p-5 rounded-3xl bg-[#0B1220] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Astronomical Foundation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Planetary coordinates, timing, and house boundaries are computed through deterministic algorithms grounded in JPL DE440 ephemeris data.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0B1220] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Tradition-Aware</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vedic, Western, KP, Jaimini, Tajika, and Chinese systems remain distinct rather than being silently mixed into generic horoscopes.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0B1220] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Explainable AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI translates and explains the calculated astronomical results and classical rules. It never invents fake planetary positions.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Multi-System Comparison Feature */}
      <section id="systems-section" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            CROSS-TRADITION CONSENSUS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            One question. Multiple traditions.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            ASTRO360 lets you compare what different traditions emphasize—and where they disagree.
          </p>
        </div>

        <div className="p-5 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/15 shadow-2xl space-y-6">
          {/* Mobile Stacked Cards (PRD Section 45) */}
          <div className="grid grid-cols-2 gap-2.5 sm:hidden font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Vedic (Jyotish)</span>
              <div className="font-bold text-emerald-400">Strong (88%)</div>
              <p className="text-[10px] text-slate-400">10th House Kendra</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Western Tropical</span>
              <div className="font-bold text-emerald-400">Strong (84%)</div>
              <p className="text-[10px] text-slate-400">Sun trine Midheaven</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-cyan-500/30 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">KP Astrology</span>
              <div className="font-bold text-cyan-400">Moderate (72%)</div>
              <p className="text-[10px] text-slate-400">10th Sub-Lord</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Chinese BaZi</span>
              <div className="font-bold text-emerald-400">Strong (85%)</div>
              <p className="text-[10px] text-slate-400">Yang Stem Support</p>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="py-2.5 px-3">Life Theme</th>
                  <th className="py-2.5 px-3">Vedic (Jyotish)</th>
                  <th className="py-2.5 px-3">Western Tropical</th>
                  <th className="py-2.5 px-3">KP Astrology</th>
                  <th className="py-2.5 px-3">Chinese BaZi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-bold text-white">💼 Career & Authority</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (88%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (84%)</td>
                  <td className="py-3 px-3 text-cyan-400 font-bold">Moderate (72%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (85%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">❤️ Love & Partnership</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (82%)</td>
                  <td className="py-3 px-3 text-cyan-400 font-bold">Moderate (68%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (80%)</td>
                  <td className="py-3 px-3 text-cyan-400 font-bold">Moderate (70%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">✨ Personal Evolution</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (90%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (89%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (86%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (92%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
              <span className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> What Traditions Agree On:
              </span>
              <p className="text-slate-300">
                Career drive, public leadership, and personal vitality are currently elevated across all calculation models.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-amber-500/30 space-y-1">
              <span className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Nuances & Variation:
              </span>
              <p className="text-slate-300">
                Vedic focuses on long-term karmic duty and disciplined structure, whereas Western emphasizes creative opportunity and autonomous expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.8 All 12 Zodiac Live Horoscope & Transit Radar for Today */}
      <OmniLiveZodiacRadar onSelectSign={(sign) => handleCreateChart()} />

      {/* 6. "Why This Prediction?" Deep Dive */}
      <OmniWhyShowcase onExploreMethodology={() => scrollToSection('methodology-section')} />

      {/* 6.5 Interactive Birth Chart Showcase (PRD Section 6 & 7) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            START WITH YOUR CHART
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Your birth chart is the foundation for everything.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Every planetary position, house cusp, and aspect connects to explainable life themes. Tap a placement to inspect.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/15 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Placements Selector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-bold text-white uppercase">Natal Chart Key Placements</span>
                <span className="text-xs font-mono text-emerald-400">JPL DE440</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="p-3 rounded-2xl bg-white/5 border border-amber-400/40 space-y-0.5">
                  <span className="text-[10px] text-amber-400 uppercase font-bold">Sun</span>
                  <div className="font-black text-white">Leo ♌</div>
                  <span className="text-[10px] text-slate-400">22°14'</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-cyan-400/40 space-y-0.5">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold">Moon</span>
                  <div className="font-black text-white">Taurus ♉</div>
                  <span className="text-[10px] text-slate-400">14°08'</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-indigo-400/40 space-y-0.5">
                  <span className="text-[10px] text-indigo-400 uppercase font-bold">Ascendant</span>
                  <div className="font-black text-white">Sagittarius ♐</div>
                  <span className="text-[10px] text-slate-400">08°45'</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>Selected Planet: <strong className="text-amber-400">♃ Jupiter (Guru)</strong></span>
                <span className="text-emerald-400 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded">Active Focus</span>
              </div>
            </div>

            {/* Right: Jupiter Tap Inspector (PRD Section 7) */}
            <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#0F172A] border border-amber-500/40 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-xs">
                    ♃
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Jupiter in Cancer ♋</h4>
                    <span className="text-[10px] font-mono text-slate-400">18°24' • 10th House (Midheaven)</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  Exalted Placement
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-white">Traditional Theme: </strong>
                Growth • Mentorship • Philosophical Wisdom • Executive Expansion. Positioned in the 10th Kendra house, it signals natural authority, ethical governance, and public recognition during major Jupiter-ruled Dasha and transit cycles.
              </p>

              <div className="flex items-center justify-between pt-1 font-mono text-xs">
                <button
                  onClick={() => onNavigateToTab('ask')}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask ASTRO360 about Jupiter</span>
                </button>
                <button
                  onClick={handleCreateChart}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore My Chart →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.6 Birth-Time Intelligence & Rectification (PRD Section 13) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            UNCERTAINTY TOLERANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What happens when your birth time is uncertain?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            ASTRO360 measures how sensitive every prediction is to time window drift so you never rely on fragile calculations.
          </p>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-[#0B1220] border border-white/15 shadow-xl space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">Test Window: 10:45 AM</span>
              <div className="text-emerald-400 font-bold">Stable (96%)</div>
              <span className="text-[10px] text-slate-400">Planetary Signs Solid</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">Test Window: 10:50 AM</span>
              <div className="text-emerald-400 font-bold">Stable (94%)</div>
              <span className="text-[10px] text-slate-400">Dasha Periods Intact</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-amber-500/30 space-y-1">
              <span className="text-slate-400 text-[10px]">Test Window: 10:55 AM</span>
              <div className="text-amber-400 font-bold">Moderate (78%)</div>
              <span className="text-[10px] text-slate-400">Sub-Lord Boundary Shifts</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-rose-500/30 space-y-1">
              <span className="text-slate-400 text-[10px]">Test Window: 11:00 AM</span>
              <div className="text-rose-400 font-bold">Sensitive (62%)</div>
              <span className="text-[10px] text-slate-400">Ascendant Cusp Transition</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
            <span>Deterministic sensitivity analysis tests ±15 minute drift across D1–D60 charts.</span>
            <button
              onClick={handleCreateChart}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer shrink-0"
            >
              Explore Birth-Time Rectification (BTR) →
            </button>
          </div>
        </div>
      </section>

      {/* 6.7 Life Timeline & Prediction Journal (PRD Section 14 & 15) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            PERSONAL RESEARCH JOURNAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            See your astrology alongside your real life.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Track what was forecasted against what actually happened. Turn astrology into your personal empirical record.
          </p>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-[#0B1220] border border-white/15 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">2019 • Education</span>
              <div className="font-bold text-white">Jupiter Dasha</div>
              <span className="text-[10px] text-emerald-400">✓ Strong Match</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">2021 • Career</span>
              <div className="font-bold text-white">Sun / Mars Kendra</div>
              <span className="text-[10px] text-emerald-400">✓ Strong Match</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">2023 • Relocation</span>
              <div className="font-bold text-white">4th House Transit</div>
              <span className="text-[10px] text-cyan-400">✓ Partial Match</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">2025 • Partnership</span>
              <div className="font-bold text-white">7th House Venus</div>
              <span className="text-[10px] text-emerald-400">✓ Strong Match</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-amber-500/40 space-y-1">
              <span className="text-amber-400 text-[10px] font-bold">2027 • Forecast</span>
              <div className="font-bold text-white">Major Pivot</div>
              <span className="text-[10px] text-amber-400">Upcoming Cycle</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6.8 Accuracy & Validation: "Built to be Checked" (PRD Section 16) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center space-y-6">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            EMPIRICAL RIGOR
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Built to be checked.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            We don't make claims like "99.9% accurate." We build verifiable systems you can inspect and reproduce.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-left font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Deterministic</span>
            <span className="text-[11px] text-slate-400">100% reproducible ephemeris math</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Multi-System</span>
            <span className="text-[11px] text-slate-400">Cross-verified against classical rules</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Versioned</span>
            <span className="text-[11px] text-slate-400">Timestamped calculation models</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Rule Provenance</span>
            <span className="text-[11px] text-slate-400">Cited classical scripture sources</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Open Schema</span>
            <span className="text-[11px] text-slate-400">Exportable Astro Schema JSON</span>
          </div>
        </div>
      </section>

      {/* 7. "What Can ASTRO360 Explore?" 8-Card Clean Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-left space-y-6">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What Can ASTRO360 Explore?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Focused, purposeful modules designed for real life areas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            { icon: Heart, title: "Love & Relationships", desc: "Synastry aspect overlays, Ashta Koota gunas & communication rhythm.", color: "text-pink-400" },
            { icon: Briefcase, title: "Career & Business", desc: "10th house activations, leadership timing & enterprise milestone windows.", color: "text-cyan-400" },
            { icon: Sparkles, title: "Personal Growth", desc: "Soul purpose, psychological archetypes & spiritual evolution milestones.", color: "text-amber-400" },
            { icon: DollarSign, title: "Financial Themes", desc: "Asset stability, investment cycles & resource consolidation timing.", color: "text-emerald-400" },
            { icon: Calendar, title: "Timing & Cycles", desc: "Vimshottari Dashas, transits, planetary horas & timing horizons.", color: "text-indigo-400" },
            { icon: MapPin, title: "Relocation & Power Lines", desc: "Astrocartography geographical line projections for global harmony.", color: "text-teal-400" },
            { icon: Clock, title: "Muhurta & Electional", desc: "Auspicious timing windows for launches, signings & ceremonies.", color: "text-purple-400" },
            { icon: Compass, title: "Birth Charts & Placements", desc: "High-precision D1–D60 vargas, tropical wheels & planetary degrees.", color: "text-rose-400" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                onClick={handleCreateChart}
                className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 hover:border-white/25 transition-all cursor-pointer space-y-2 group shadow-md"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Professional vs Everyone Capabilities */}
      <section id="professional-section" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            DUAL-AUDIENCE ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Built for serious astrology work.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            A simpler interface for everyone. A deeper workspace for professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For Everyone */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-amber-400 font-bold">FOR EVERYDAY SEEKERS</span>
              <h3 className="text-lg font-bold text-white">Effortless Personal Guidance</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>One-tap today's reading & key daily themes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Multi-month timeline without astrology jargon</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Natural-language AI assistant with "Why?" explanations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Beautiful, readable executive summary reports</span>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0B1220] border border-indigo-500/30 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-indigo-400 font-bold">FOR PROFESSIONAL ASTROLOGERS</span>
              <h3 className="text-lg font-bold text-white">Full Research & Precision Suite</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Exact ±0.0001° coordinates & 11 house systems</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Classical Tier 1/2 rule provenance (BPHS, Tetrabiblos)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Canonical Astro Schema JSON export & Developer MCP</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Birth Time Rectification (BTR) & D1–D60 vargas</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9. Methodology Section */}
      <section id="methodology-section" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            TRANSPARENT METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Transparent by design.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            AI explains the result. It doesn't make up the chart.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 space-y-2">
            <span className="text-2xl font-black text-amber-400 font-mono">01</span>
            <h3 className="text-sm font-bold text-white">Birth Data Normalization</h3>
            <p className="text-xs text-slate-400">
              Birth date, time, and coordinates are normalized into UTC, Julian Day, Delta T, and Local Sidereal Time.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 space-y-2">
            <span className="text-2xl font-black text-cyan-400 font-mono">02</span>
            <h3 className="text-sm font-bold text-white">Astronomical Calculation</h3>
            <p className="text-xs text-slate-400">
              Deterministic ephemeris computes true celestial longitudes, declinations, speeds, and house boundaries.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 space-y-2">
            <span className="text-2xl font-black text-indigo-400 font-mono">03</span>
            <h3 className="text-sm font-bold text-white">Tradition-Specific Rules</h3>
            <p className="text-xs text-slate-400">
              Vedic, Western, KP, and BaZi engines apply verified classical rules with cited evidence sources.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 space-y-2">
            <span className="text-2xl font-black text-emerald-400 font-mono">04</span>
            <h3 className="text-sm font-bold text-white">Explainable Synthesis</h3>
            <p className="text-xs text-slate-400">
              Cross-system consensus and calibrated confidence synthesize a clear, human-readable interpretation.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Security & Privacy (PRD Section 11 & 25) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-left">
        <div className="p-7 sm:p-8 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Your personal data should remain yours.</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Birth information is used solely to calculate planetary coordinates and timing cycles. We do not sell user charts, train public AI models on your private data, or share personal profiles with third parties.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs text-slate-400">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-bold text-white block pb-0.5">Encrypted Local Cache</span>
              <span>Secure browser storage for instant return visits</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-bold text-white block pb-0.5">No Public URLs</span>
              <span>Birth coordinates never exposed in query params</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-bold text-white block pb-0.5">1-Tap Account Wipe</span>
              <span>Full control to purge profile and history at any time</span>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <OmniFAQSection />

      {/* 12. Final High-Impact CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#080E1A] border border-white/15 shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Start with your chart.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              Explore your astrology across traditions—with clear explanations and transparent calculations.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCreateChart}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-amber-400/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Create My Free Chart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToTab('free-tools')}
              className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Free Tools</span>
            </button>
          </div>
        </div>
      </section>

      {/* 13. Comprehensive Footer with Ethical Disclaimer */}
      <footer className="border-t border-white/10 bg-[#050810] py-12 text-left text-xs font-mono text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="font-bold text-white block">Product</span>
              <button onClick={() => scrollToSection('hero')} className="block hover:text-white cursor-pointer">Home</button>
              <button onClick={() => onNavigateToTab('forecast')} className="block hover:text-white cursor-pointer">Forecast</button>
              <button onClick={() => onNavigateToTab('charts')} className="block hover:text-white cursor-pointer">Birth Charts</button>
              <button onClick={() => onNavigateToTab('ask')} className="block hover:text-white cursor-pointer">Ask AI</button>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white block">Traditions</span>
              <button onClick={() => onNavigateToTab('divisional-charts')} className="block hover:text-white cursor-pointer">Vedic Jyotish</button>
              <button onClick={() => onNavigateToTab('charts')} className="block hover:text-white cursor-pointer">Western Tropical</button>
              <button onClick={() => onNavigateToTab('spiritual-traditions')} className="block hover:text-white cursor-pointer">Chinese BaZi</button>
              <button onClick={() => onNavigateToTab('islamic-astrology')} className="block hover:text-white cursor-pointer">Islamic Ilm al-Falak</button>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white block">Professional & Research</span>
              <button onClick={() => onNavigateToTab('omni-research')} className="block hover:text-white cursor-pointer">OMNI Research Core</button>
              <button onClick={() => onNavigateToTab('report-generator')} className="block hover:text-white cursor-pointer">PDF Dossier Generator</button>
              <button onClick={() => onNavigateToTab('btr-suite')} className="block hover:text-white cursor-pointer">Birth Time Rectification</button>
              <button onClick={() => onNavigateToTab('admin-dashboard')} className="block hover:text-white cursor-pointer">Admin Analytics</button>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white block">Governance</span>
              <button onClick={() => scrollToSection('faq-section')} className="block hover:text-white cursor-pointer">FAQ</button>
              <button onClick={() => scrollToSection('methodology-section')} className="block hover:text-white cursor-pointer">Methodology</button>
              <span className="block text-slate-500">Open-Source Engine</span>
              <span className="block text-slate-500">© 2026 ASTRO360</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-slate-400 leading-relaxed">
            <strong>Ethical & Scientific Disclaimer:</strong> ASTRO360 provides astronomical and astrological information for educational, personal reflection, and research purposes. Astrological interpretations are symbolic and are not deterministic predictions or substitutes for licensed professional medical, legal, or financial counsel.
          </div>
        </div>
      </footer>

      {/* 14. Mobile Floating Quick Action Dock (Sticky Bottom on small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060A12]/95 backdrop-blur-xl border-t border-amber-400/30 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center justify-between gap-2 shadow-2xl">
        <div className="text-left">
          <span className="text-[10px] font-mono text-amber-400 font-bold block leading-none">LIMITED LAUNCH</span>
          <span className="text-xs font-bold text-white leading-tight block">100% Free Pro Chart</span>
        </div>
        <button
          onClick={handleCreateChart}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 active:scale-95 text-slate-950 font-black text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-amber-400/25 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          <span>Get Free Chart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
