import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, Compass, Clock, CheckCircle2, AlertTriangle, 
  HelpCircle, ArrowRight, Calendar as CalendarIcon, Download, 
  ExternalLink, Copy, Check, ChevronRight, Layers, ShieldCheck, 
  BookOpen, Activity, Zap, Heart, Briefcase, DollarSign, Globe2, 
  Sliders, User, RefreshCw, Eye, MessageSquare, History, FileText,
  ZapOff, CheckCircle
} from 'lucide-react';
import { UserProfile } from '../../types';
import { ProblemDomain, ProblemIntentRouter } from '../../lib/prediction/problemIntentRouter';
import { MainScreenProblemSolver, SolvedMainScreenProblem } from '../../lib/prediction/mainScreenProblemSolver';
import { downloadIcsFile, getGoogleCalendarUrl, CalendarEventPayload } from '../../lib/icsCalendarExporter';
import { toast } from 'sonner';

interface ProblemToSolutionHeroProps {
  userProfile: UserProfile;
  onNavigate: (tabId: string) => void;
  onOpenProfile?: () => void;
}

const QUICK_CATEGORIES: { id: ProblemDomain; label: string; icon: string }[] = [
  { id: 'CAREER', label: 'Career', icon: '💼' },
  { id: 'LOVE', label: 'Love', icon: '❤️' },
  { id: 'MONEY', label: 'Money', icon: '💰' },
  { id: 'MARRIAGE', label: 'Marriage', icon: '💍' },
  { id: 'BUSINESS', label: 'Business', icon: '🚀' },
  { id: 'EDUCATION', label: 'Education', icon: '📚' },
  { id: 'TRAVEL', label: 'Travel', icon: '✈️' },
  { id: 'RELOCATION', label: 'Relocation', icon: '🌍' },
  { id: 'FAMILY', label: 'Family', icon: '🏡' },
  { id: 'LIFE_DIRECTION', label: 'Life Direction', icon: '🧭' },
  { id: 'OTHER', label: 'Other', icon: '✨' },
];

const QUICK_PROMPTS = [
  "My career feels stuck. When will things improve?",
  "When is my next strong relationship & love period?",
  "Should I consider relocating or moving abroad?",
  "When are my strongest financial & wealth timing cycles?",
  "When is a favorable time to launch my new business?",
  "What is the overarching planetary theme in my life right now?"
];

export const ProblemToSolutionHero: React.FC<ProblemToSolutionHeroProps> = ({
  userProfile,
  onNavigate,
  onOpenProfile
}) => {
  const [problemQuery, setProblemQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStageText, setAnalysisStageText] = useState('Analyzing Chart...');
  const [executionLatencyMs, setExecutionLatencyMs] = useState<number | null>(null);
  const [analysisResult, setAnalysisResult] = useState<SolvedMainScreenProblem | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<'ALL' | 'vedic' | 'western' | 'kp' | 'jaimini' | 'tajika'>('ALL');
  const [isWhyDrawerOpen, setIsWhyDrawerOpen] = useState(false);
  const [recentQueries, setRecentQueries] = useState<string[]>([
    "Why is my career stuck and when will it improve?",
    "When is commitment more likely in my relationship?",
    "Should I move abroad in 2026?"
  ]);
  const [copiedText, setCopiedText] = useState(false);

  // AbortController ref for request cancellation & race prevention
  const abortControllerRef = useRef<AbortController | null>(null);

  const seekerName = userProfile.name?.trim() || 'Seeker';

  // Auto-solve default career question on initial render if no result yet
  useEffect(() => {
    if (!analysisResult) {
      handleAnalyze("My career feels stuck. When will things improve?");
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleAnalyze = async (queryText?: string) => {
    const q = (queryText || problemQuery).trim();
    if (!q) return;

    // Abort previous in-flight calculation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsAnalyzing(true);
    setAnalysisStageText('Understanding question intent...');
    const startTime = performance.now();

    try {
      const res = await MainScreenProblemSolver.solve(
        q,
        userProfile,
        selectedEngine,
        {
          signal: controller.signal,
          onStageChange: (_stage, message) => {
            setAnalysisStageText(message);
          }
        }
      );

      const elapsed = Math.round(performance.now() - startTime);
      setExecutionLatencyMs(elapsed);
      setAnalysisResult(res);
      setProblemQuery(q);
      
      // Update recent queries
      setRecentQueries(prev => {
        const filtered = prev.filter(item => item.toLowerCase() !== q.toLowerCase());
        return [q, ...filtered].slice(0, 5);
      });
    } catch (err: any) {
      if (err?.name === 'AbortError' || err?.message?.includes('aborted') || err?.message?.includes('cancelled')) {
        // Ignored, user submitted newer query
        return;
      }
      console.error('Problem solver error:', err);
      toast.error('Unable to complete chart analysis. Please verify your birth details.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadIcs = (res: SolvedMainScreenProblem) => {
    const payload: CalendarEventPayload = {
      title: `ASTRO360: ${res.executionPlan.normalizedTitle}`,
      description: `${res.summary}\n\nStrategic Advice: ${res.practicalView.strategicAdvice}\nTiming Window: ${res.timing.window}\nAgreement: ${res.agreement.agreementPercent}% Directional Consensus`,
      startDate: res.timing.startDate,
      endDate: res.timing.endDate,
      category: `Astrology - ${res.executionPlan.domain}`,
      location: 'Topocentric Ecliptic Meridian'
    };
    downloadIcsFile([payload], `ASTRO360_${res.executionPlan.domain}_Timing.ics`);
    toast.success('Downloaded .ics calendar file for Apple/Outlook/Mobile!');
  };

  const handleOpenGoogleCalendar = (res: SolvedMainScreenProblem) => {
    const payload: CalendarEventPayload = {
      title: `ASTRO360: ${res.executionPlan.normalizedTitle}`,
      description: `${res.summary}\n\nStrategic Advice: ${res.practicalView.strategicAdvice}\nTiming Window: ${res.timing.window}`,
      startDate: res.timing.startDate,
      endDate: res.timing.endDate,
      category: `Astrology - ${res.executionPlan.domain}`
    };
    const url = getGoogleCalendarUrl(payload);
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success('Opening Google Calendar in new tab!');
  };

  const handleCopySummary = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    toast.success('Analysis copied to clipboard!');
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 font-sans text-left">
      {/* ═══ 1. HERO PROBLEM INTAKE SECTION ═══ */}
      <div className="relative p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#111726] to-[#0A0E1A] border border-white/[0.12] shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        
        {/* Active Chart Context Pill & Latency Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-300">
              Active Chart: <strong className="text-white">{seekerName}</strong> ({userProfile.dob || '1998-02-22'} • {userProfile.time || '10:30'} • {userProfile.preferredSystem || 'Vedic'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {executionLatencyMs !== null && (
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold hidden sm:inline-block">
                ⚡ {executionLatencyMs}ms (AstroCalculationContext)
              </span>
            )}
            <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 font-bold">
              NASA JPL DE440 Sub-Arcsec
            </span>
            <button
              onClick={onOpenProfile}
              className="text-[11px] font-mono text-slate-400 hover:text-white underline cursor-pointer"
            >
              Change Chart
            </button>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="pt-4 pb-3 space-y-1 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            WHAT ARE YOU TRYING TO UNDERSTAND?
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-3xl">
            Tell ASTRO360 what's happening in your life. We'll analyze it through your chart, multi-engine consensus, and show you why.
          </p>
        </div>

        {/* Large Problem Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="mt-3 space-y-3"
        >
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-[#080C14] border border-white/15 focus-within:border-amber-400/70 focus-within:ring-1 focus-within:ring-amber-400/70 transition-all shadow-inner">
            <input
              type="text"
              value={problemQuery}
              onChange={(e) => setProblemQuery(e.target.value)}
              placeholder="e.g. My career feels stuck. When will things improve?"
              disabled={isAnalyzing}
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-slate-500 text-sm sm:text-base font-sans focus:outline-none disabled:opacity-50"
            />
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="submit"
                disabled={!problemQuery.trim() || isAnalyzing}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-40 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span className="truncate max-w-[140px]">{analysisStageText}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>ANALYZE MY ASTROLOGY</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onNavigate('birth-chart')}
                className="hidden lg:flex px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10 text-xs sm:text-sm font-semibold transition-all cursor-pointer items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>EXPLORE MY CHART</span>
              </button>
            </div>
          </div>

          {/* Quick Problem Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs font-mono">
            <span className="text-[10px] text-slate-400 uppercase font-bold shrink-0 pr-1">Intents:</span>
            {QUICK_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleAnalyze(`Analyze my ${cat.label.toLowerCase()} timing and planetary influences.`)}
                className="px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] transition-all cursor-pointer shrink-0 text-[11px] flex items-center gap-1 active:scale-95"
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Start Prompt Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block pr-1">
              ⚡ Try Asking:
            </span>
            {QUICK_PROMPTS.map((prompt, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => handleAnalyze(prompt)}
                className="px-2.5 py-1 rounded-lg bg-[#0E1524] hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/[0.06] text-[11px] font-sans transition-colors cursor-pointer text-left truncate max-w-xs"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* ═══ 2. STRUCTURED PROBLEM-TO-SOLUTION RESULT CARD ═══ */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 sm:p-7 rounded-3xl bg-[#0E1422] border border-white/[0.12] shadow-2xl space-y-6"
        >
          {/* Top Result Header: Problem & Categorization */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                  {analysisResult.executionPlan.domain} ANALYSIS
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  Intent: {analysisResult.executionPlan.problem}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Problem:</span>
                <span className="text-amber-200 italic font-normal">"{analysisResult.question}"</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => handleCopySummary(analysisResult.summary)}
                className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Copy structured summary"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => setIsWhyDrawerOpen(!isWhyDrawerOpen)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/30 text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>WHY?</span>
              </button>
            </div>
          </div>

          {/* Core Synthesis Grid: Astrology View vs Timing vs Consensus */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* ASTROLOGY VIEW */}
            <div className="lg:col-span-2 p-4 sm:p-5 rounded-2xl bg-[#090D18] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-cyan-400" /> ASTROLOGY VIEW
                </span>
                <span className="text-[11px] font-mono text-cyan-400">
                  {analysisResult.chartContext.lagnaSign} Ascendant
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {analysisResult.summary}
              </p>
              
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono">
                {analysisResult.astrologyView.chartFactors.map((f, fIdx) => (
                  <span key={fIdx} className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                    • {f}
                  </span>
                ))}
              </div>
            </div>

            {/* TIMING & CONSENSUS STAT CARD */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090D18] border border-white/[0.08] space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" /> TIMING WINDOW
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                    {analysisResult.timing.intensity}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="text-base sm:text-lg font-extrabold text-white font-mono">
                    {analysisResult.timing.window}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 pt-0.5">
                    Common Overlap: <strong className="text-emerald-300">{analysisResult.timing.commonWindow}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Engine Agreement:</span>
                  <span className="text-emerald-400 font-bold">{analysisResult.agreement.agreementPercent}% ({analysisResult.agreement.supportiveCount}/{analysisResult.agreement.eligibleCount} Systems)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Timing Agreement:</span>
                  <span className="text-cyan-400 font-bold">{analysisResult.timing.timingAgreementPercent}%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Stability:</span>
                  <span className="text-amber-300 font-bold">{analysisResult.stability.level} ({analysisResult.stability.driftInterval})</span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ 3. MULTI-ENGINE VIEWS BAR ═══ */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> 5-Tradition Engine Views & Contributions
              </span>

              {/* Engine Switcher */}
              <div className="flex items-center gap-1 bg-[#090D18] p-1 rounded-xl border border-white/[0.08] text-xs font-mono overflow-x-auto">
                {(['ALL', 'vedic', 'western', 'kp', 'jaimini', 'tajika'] as const).map(eng => (
                  <button
                    key={eng}
                    type="button"
                    onClick={() => setSelectedEngine(eng)}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      selectedEngine === eng
                        ? 'bg-white text-black font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {eng.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Engine Contribution Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
              {(Object.entries(analysisResult.engineViews) as [keyof typeof analysisResult.engineViews, typeof analysisResult.engineViews['vedic']][])
                .filter(([key]) => selectedEngine === 'ALL' || selectedEngine === key)
                .map(([key, item]) => (
                  <div key={key} className="p-3.5 rounded-2xl bg-[#090D18] border border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <span className={item.statusIcon === '✓' ? 'text-emerald-400' : 'text-amber-400'}>{item.statusIcon}</span>
                        <span>{item.name}</span>
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${item.statusIcon === '✓' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-300'}`}>
                        {item.verdict}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                      {item.outcome}
                    </p>
                    <div className="text-[10px] text-slate-400 border-t border-white/[0.06] pt-1.5 flex items-center justify-between">
                      <span>Techniques: {item.techniques.join(', ')}</span>
                      <span className="text-amber-300 font-bold">{item.timingWindow}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* ═══ 4. WHY? EXPLAINABILITY SECTION ═══ */}
          <AnimatePresence>
            {isWhyDrawerOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-5 rounded-2xl bg-[#080B14] border border-amber-400/30 space-y-4 text-xs font-mono"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                  <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-400" /> EXPLAINABLE PROVENANCE & WHY
                  </span>
                  <span className="text-[10px] text-slate-400">Zero-Hallucination Verification</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="font-bold text-white block uppercase text-[10px]">What Was Calculated:</span>
                    <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                      {analysisResult.whyBreakdown.whatWasCalculated.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-white block uppercase text-[10px]">Classical Rules Applied:</span>
                    <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                      {analysisResult.whyBreakdown.whichRulesApplied.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/20 text-amber-300 space-y-1 text-[11px]">
                  <strong className="block text-[10px] uppercase">What Makes This Less Certain:</strong>
                  {analysisResult.whyBreakdown.whatMakesThisLessCertain.map((u, i) => (
                    <div key={i}>• {u}</div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══ 5. SOLUTION / NEXT STEP CARD (NextStepCard) ═══ */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900 border border-white/[0.12] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" /> WHAT YOU CAN DO NEXT • PRACTICAL PLAYBOOK
                </span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Astrology provides strategic timing intelligence; human action and execution create the outcome.
                </p>
              </div>

              {/* Calendar Sync Action Group */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadIcs(analysisResult)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                  title="Export .ics to Apple Calendar or Outlook"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sync (.ics)</span>
                </button>

                <button
                  onClick={() => handleOpenGoogleCalendar(analysisResult)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                  title="Add directly to Google Calendar Web"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Cal</span>
                </button>
              </div>
            </div>

            {/* Practical Action Items Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {analysisResult.practicalView.actionItems.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-slate-200 leading-relaxed font-sans">{item}</span>
                </div>
              ))}
            </div>

            {/* Action Navigation Buttons */}
            <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
              <button
                onClick={() => onNavigate('forecast')}
                className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>See Full Prediction Timeline</span>
              </button>

              <button
                onClick={() => onNavigate('ask')}
                className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask a Follow-Up Question</span>
              </button>

              <button
                onClick={() => onNavigate('dasha')}
                className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Inspect Dasha Balance</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══ 6. DASHBOARD CONTEXT: PRIORITY LIFE FOCUS & COMPACT CALENDAR ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Priority Areas */}
        <div className="p-5 rounded-3xl bg-[#0E1422] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" /> Current Priority Areas
            </span>
            <span className="text-[10px] font-mono text-slate-400">Ranked by Consensus</span>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Career Restructuring', score: 82, window: 'Sep 12 – Oct 28', status: 'Active Peak', color: 'text-cyan-400', barColor: 'bg-cyan-400' },
              { label: 'Relationship Harmony', score: 71, window: 'Oct 04 – Nov 18', status: 'Upcoming', color: 'text-pink-400', barColor: 'bg-pink-400' },
              { label: 'Foreign Relocation', score: 64, window: 'Oct 01 – Jan 20', status: 'Evaluating', color: 'text-purple-400', barColor: 'bg-purple-400' },
              { label: 'Financial Expansion', score: 58, window: 'Sep 28 – Nov 25', status: 'Stable', color: 'text-emerald-400', barColor: 'bg-emerald-400' },
            ].map((p, pIdx) => (
              <div 
                key={pIdx}
                onClick={() => handleAnalyze(`What is my upcoming ${p.label.toLowerCase()} timing?`)}
                className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] cursor-pointer transition-colors space-y-1.5 group"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold group-hover:text-amber-300 transition-colors">{p.label}</span>
                  <span className={`${p.color} font-bold`}>{p.score}% Consensus</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{p.window}</span>
                  <span className="px-1.5 py-0.2 rounded bg-white/5">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Prediction Calendar Preview */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-[#0E1422] border border-white/[0.08] space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" /> Prediction Calendar Preview (Sep – Nov 2026)
              </span>
              <button
                onClick={() => onNavigate('forecast')}
                className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-bold"
              >
                <span>Open Full Calendar</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-mono">
              {[
                { date: 'SEP 12', title: 'Career Acceleration Window Begins', badge: '82% Agreement', type: 'CAREER', color: 'border-l-cyan-400' },
                { date: 'SEP 28', title: 'Dhana Yoga Wealth Inflow Trigger', badge: '75% Agreement', type: 'MONEY', color: 'border-l-emerald-400' },
                { date: 'OCT 04', title: 'Jupiter Trine Peak Leadership Phase', badge: '91% High', type: 'CAREER', color: 'border-l-amber-400' },
                { date: 'OCT 24', title: 'Relationship Resonance Window', badge: '71% Agreement', type: 'LOVE', color: 'border-l-pink-400' },
              ].map((ev, eIdx) => (
                <div key={eIdx} className={`p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] border-l-2 ${ev.color} space-y-1`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-white">{ev.date}</span>
                    <span className="text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">{ev.badge}</span>
                  </div>
                  <div className="text-[11px] font-sans text-slate-200 font-medium truncate">{ev.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Questions / Continue Where You Left Off */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2 text-[11px] font-mono overflow-x-auto no-scrollbar">
            <span className="text-slate-500 uppercase shrink-0 flex items-center gap-1">
              <History className="w-3 h-3" /> Continue:
            </span>
            {recentQueries.map((rq, rqIdx) => (
              <button
                key={rqIdx}
                onClick={() => handleAnalyze(rq)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] truncate max-w-xs transition-colors cursor-pointer shrink-0"
              >
                "{rq}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemToSolutionHero;
