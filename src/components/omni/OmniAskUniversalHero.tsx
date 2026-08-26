import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, Search, Compass, Heart, Briefcase, DollarSign, 
  Clock, ShieldCheck, ArrowRight, HelpCircle, RefreshCw, Layers, 
  BookOpen, ChevronDown, ChevronUp, Bot, Star, Moon, Sun, CheckCircle2,
  SlidersHorizontal, Award, CornerDownLeft
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { QuestionIntentEngine, type RoutedQuestionResult } from '../../lib/questionRouter';
import OmniWhyDrawer, { type OmniWhyDrawerProps } from './OmniWhyDrawer';

interface OmniAskUniversalHeroProps {
  userProfile: UserProfile;
  onNavigate: (tab: string) => void;
  onOpenProfile?: () => void;
}

export default function OmniAskUniversalHero({
  userProfile,
  onNavigate,
  onOpenProfile
}: OmniAskUniversalHeroProps) {
  const [query, setQuery] = useState('');
  const [activeResult, setActiveResult] = useState<RoutedQuestionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [whyDrawerOpen, setWhyDrawerOpen] = useState(false);
  const [whyPayload, setWhyPayload] = useState<Partial<OmniWhyDrawerProps>>({});

  const suggestedQuestions = [
    "When is my strongest career period?",
    "What's my Nakshatra & Moon Sign?",
    "Why am I having relationship challenges?",
    "How compatible are we with another chart?",
    "Do I have Manglik or Sade Sati active?",
    "When is an auspicious time this week?"
  ];

  const popularTopics = [
    {
      label: 'Career & Ambition',
      icon: Briefcase,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20 hover:border-amber-400/40',
      sample: 'When is my next major career promotion window?'
    },
    {
      label: 'Love & Romance',
      icon: Heart,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20 hover:border-rose-400/40',
      sample: 'What does my 7th house reveal about partnership timing?'
    },
    {
      label: 'Crucial Timing',
      icon: Clock,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-400/40',
      sample: 'What planetary transits are active for me this month?'
    },
    {
      label: 'Vedic Nakshatras',
      icon: Moon,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-400/40',
      sample: "What is my birth star Nakshatra and Pada?"
    },
    {
      label: 'Compatibility Lab',
      icon: Sparkles,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20 hover:border-purple-400/40',
      sample: 'How compatible are our charts across 36 Ashta Kootas?'
    },
    {
      label: 'Grounded Remedies',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-400/40',
      sample: 'What traditional practices support my current Dasha cycle?'
    }
  ];

  const handleAsk = (questionToAsk?: string) => {
    const text = (questionToAsk || query).trim();
    if (!text) return;

    setIsLoading(true);
    // Deterministic instant calculation with brief organic delay for UX
    setTimeout(() => {
      const result = QuestionIntentEngine.routeAndSolve(text, userProfile);
      setActiveResult(result);
      setIsLoading(false);
      setQuery('');
    }, 280);
  };

  const handleOpenWhyDrawer = () => {
    if (!activeResult) return;
    setWhyPayload({
      title: activeResult.query,
      period: activeResult.answer.technicalEvidence.dashaCycle || 'Active Window',
      confidence: (activeResult.confidence > 0.85 ? 'High' : 'Moderate–High') as any,
      confidenceScore: Math.round(activeResult.confidence * 100),
      factors: [
        activeResult.answer.why,
        activeResult.answer.technicalEvidence.planetaryDegrees,
        activeResult.answer.technicalEvidence.dashaCycle
      ],
      supportedSystems: [
        {
          name: activeResult.systems[0] || 'Vedic Sidereal',
          status: 'Strong',
          note: activeResult.answer.why
        },
        {
          name: activeResult.systems[1] || 'Western Tropical',
          status: 'Favorable',
          note: activeResult.answer.technicalEvidence.planetaryDegrees
        }
      ],
      technicalRules: [
        {
          id: 'RULE_01',
          source: activeResult.answer.technicalEvidence.classicalRuleCitation || 'Classical Scripture',
          rule: activeResult.answer.why
        }
      ]
    });
    setWhyDrawerOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. UNIVERSAL QUESTION HERO HEADER                            */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-9 rounded-3xl bg-gradient-to-b from-[#0F172A] via-[#0C1324] to-[#080D1A] border border-amber-400/30 shadow-2xl space-y-6 text-left relative overflow-hidden">
        {/* Subtle cosmic background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 font-mono text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Universal Astrological Assistant
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            What would you like to explore?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
            Type any question about your life, chart, or timing. ASTRO360 understands the intent, computes the ephemeris math, and explains why.
          </p>
        </div>

        {/* 2. Natural Language Question Input Box */}
        <div className="relative z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-slate-950/90 border border-white/20 shadow-inner focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all"
          >
            <Search className="w-5 h-5 text-slate-400 ml-2.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about love, career, timing, relationships, birth chart..."
              className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none px-2 py-1 font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all shrink-0 min-h-[44px]"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Ask ASTRO360</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* 3. Suggested Question Quick Pills */}
        <div className="space-y-2 relative z-10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
            Suggested questions:
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(sq)}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 hover:border-amber-400/40 text-slate-300 hover:text-white border border-white/10 text-xs font-sans transition-all cursor-pointer select-none text-left min-h-[38px] flex items-center gap-1.5"
              >
                <span>{sq}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* 4. ACTIVE QUESTION RESULT DISPLAY (When Answer is Ready)      */}
        {/* ───────────────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeResult && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="p-5 sm:p-7 rounded-2xl bg-[#070D1A] border border-amber-400/40 space-y-5 shadow-2xl relative z-10"
            >
              {/* Intent Classification Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 font-mono text-[11px]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-bold">
                    {activeResult.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                    Intent: {activeResult.intent}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Confidence: {Math.round(activeResult.confidence * 100)}%
                  </span>
                </div>
                <div className="text-slate-400">
                  {activeResult.systems.join(' • ')}
                </div>
              </div>

              {/* Level 1: Concise Direct Answer */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span>QUESTION: "{activeResult.query}"</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {activeResult.answer.summary}
                </h3>
              </div>

              {/* Level 2: "Why?" Reasoning disclosure */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> WHY THIS ANSWER?
                  </span>
                  <button
                    onClick={handleOpenWhyDrawer}
                    className="text-[11px] font-mono text-cyan-300 hover:text-cyan-200 underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Inspect Full Evidence Tree</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {activeResult.answer.why}
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
                  {activeResult.answer.supportedSystems.map((sys, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                      ✓ {sys}
                    </span>
                  ))}
                </div>
              </div>

              {/* Level 3: Technical Precision Disclosure Toggle */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 text-left flex items-center justify-between text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-bold">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                    Technical Ephemeris & Scriptural Citation
                  </span>
                  {showTechnicalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <AnimatePresence>
                  {showTechnicalDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-4 bg-[#050811] space-y-2 text-xs font-mono text-slate-300 border-t border-white/10"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div><strong className="text-amber-300">Planetary Longitudes:</strong> {activeResult.answer.technicalEvidence.planetaryDegrees}</div>
                        <div><strong className="text-amber-300">Active Houses:</strong> {activeResult.answer.technicalEvidence.activeHouse}</div>
                        <div><strong className="text-amber-300">Dasha Period:</strong> {activeResult.answer.technicalEvidence.dashaCycle}</div>
                        <div><strong className="text-amber-300">Scriptural Rule:</strong> {activeResult.answer.technicalEvidence.classicalRuleCitation}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Next Best Action Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-indigo-950/30 border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                    RECOMMENDED NEXT STEP
                  </span>
                  <p className="text-xs text-slate-200 font-sans">
                    {activeResult.nextBestAction.description}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate(activeResult.nextBestAction.destinationTab)}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all self-start sm:self-auto shrink-0 min-h-[44px]"
                >
                  <span>{activeResult.nextBestAction.label}</span>
                </button>
              </div>

              {/* Contextual Follow-Up Suggestions */}
              {activeResult.followUpQuestions.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block">
                    Follow-up questions you can ask:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeResult.followUpQuestions.map((fq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAsk(fq)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-200 border border-white/10 text-xs font-sans transition-all cursor-pointer text-left min-h-[36px]"
                      >
                        <span>{fq}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 5. POPULAR TOPICS DIRECTORY                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="space-y-3 text-left">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Popular Astrological Inquiries</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">1-Tap Intent Exploration</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div
                key={idx}
                onClick={() => handleAsk(topic.sample)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 select-none group min-h-[44px] ${topic.bg}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${topic.color}`} />
                    <span className="text-xs font-bold text-white">{topic.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed italic">
                  "{topic.sample}"
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6. EXPLORE FULL CATALOG OF TOOLS BRIDGE                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#090E1C] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Prefer browsing by specific tools & calculations?</span>
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            Access the complete catalog of 150+ engines, divisional charts, synastry tools, and ephemeris tables.
          </p>
        </div>
        <button
          onClick={() => onNavigate('tools-catalog')}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0 min-h-[44px]"
        >
          <span>Explore All 150+ Tools</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>

      {/* Why Evidence Modal Drawer */}
      <OmniWhyDrawer
        isOpen={whyDrawerOpen}
        onClose={() => setWhyDrawerOpen(false)}
        {...whyPayload}
      />
    </div>
  );
}
