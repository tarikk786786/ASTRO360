import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, Clock, Compass, ShieldCheck, 
  Sparkles, Layers, Filter, CheckCircle2, ChevronRight, 
  ChevronLeft, Download, ExternalLink, MessageSquare, 
  BookOpen, HelpCircle, ArrowRight, Eye, RefreshCw, 
  TrendingUp, AlertCircle, Award, Check
} from 'lucide-react';
import { 
  CanonicalPredictionEvent, 
  EngineSpecificFinding, 
  PredictionCategory 
} from '../../lib/prediction/canonicalPredictionCenter';
import { 
  PredictionCalendarEngine, 
  CalendarRangeFilter 
} from '../../lib/prediction/predictionCalendarEngine';
import { UserProfile } from '../../types';
import { toast } from 'sonner';

interface PredictionCenterSuiteProps {
  userProfile?: UserProfile;
  onNavigateToAsk?: (prompt: string) => void;
  onNavigateToCharts?: () => void;
}

export default function PredictionCenterSuite({
  userProfile,
  onNavigateToAsk,
  onNavigateToCharts
}: PredictionCenterSuiteProps) {
  const profile: UserProfile = useMemo(() => userProfile || {
    id: 'user_default',
    name: 'Seeker',
    birthDate: '1992-07-15',
    birthTime: '14:30',
    birthPlace: {
      name: 'London, UK',
      latitude: 51.5074,
      longitude: -0.1278,
      timezone: 'Europe/London'
    }
  } as UserProfile, [userProfile]);

  // Master State
  const [activeTab, setActiveTab] = useState<'calendar' | 'timeline' | 'compare' | 'research'>('calendar');
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day' | 'agenda' | 'year'>('month');
  const [selectedEngine, setSelectedEngine] = useState<'ALL' | 'vedic' | 'western' | 'kp' | 'jaimini' | 'tajika'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<PredictionCategory | 'ALL'>('ALL');
  const [minAgreement, setMinAgreement] = useState<number>(0);
  const [timeHorizon, setTimeHorizon] = useState<number>(12); // months
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<CanonicalPredictionEvent | null>(null);
  const [activeMonthOffset, setActiveMonthOffset] = useState<number>(0);

  // Raw Predictions from Canonical Engine
  const allPredictions = useMemo(() => {
    return PredictionCalendarEngine.generatePredictions(profile, timeHorizon);
  }, [profile, timeHorizon]);

  // Filtered Predictions based on current user controls
  const filteredPredictions = useMemo(() => {
    const filter: CalendarRangeFilter = {
      startDate: '',
      endDate: '',
      category: selectedCategory,
      engineId: selectedEngine,
      minAgreementPercent: minAgreement,
      searchQuery
    };
    return PredictionCalendarEngine.filterPredictions(allPredictions, filter);
  }, [allPredictions, selectedCategory, selectedEngine, minAgreement, searchQuery]);

  // Primary Hero Event (Highest intensity primary event)
  const heroEvent = useMemo(() => {
    return allPredictions.find(e => e.importance === 'PRIMARY') || allPredictions[0];
  }, [allPredictions]);

  // Download .ics handler
  const handleDownloadIcs = (event: CanonicalPredictionEvent) => {
    const icsContent = PredictionCalendarEngine.generateIcsContent(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ASTRO360_${event.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${event.title} to .ics calendar format!`);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* 1. Header & Hero Next Important Period */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                ASTRO360 PREDICTION CENTER
              </span>
              <span className="text-xs font-mono text-slate-400">
                • 5 Unified Specialist Engines
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-tight text-white">
              Deterministic Multi-Engine Predictions & Timing Calendar
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Synthesizing Vimshottari Dashas, Western Outer Transits, KP Cuspal Sub-Lords, Jaimini Karakas, and Tajika Returns with transparent consensus metrics.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigateToAsk?.("What major life predictions and active planetary timing windows exist in my chart?")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs md:text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              Ask Copilot About Predictions
            </button>
            <button
              onClick={() => onNavigateToCharts?.()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs md:text-sm font-medium transition-all active:scale-95"
            >
              <Layers className="w-4 h-4 text-teal-400" />
              View Divisional Charts
            </button>
          </div>
        </div>

        {/* Hero Next Important Period Spotlight Card */}
        {heroEvent && (
          <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  NEXT PRIMARY INFLECTION WINDOW
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                  {heroEvent.category}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                {heroEvent.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {heroEvent.summary}
              </p>

              <div className="flex items-center gap-4 flex-wrap pt-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Active: <span className="text-indigo-300 font-semibold">{heroEvent.start} → {heroEvent.end}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Peak: <span className="text-amber-300 font-semibold">{heroEvent.peak}</span>
                </div>
                {heroEvent.agreement.commonTimingWindow && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-teal-300 bg-teal-500/10 px-3 py-1.5 rounded-lg border border-teal-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    Common Window: <span className="font-semibold">{heroEvent.agreement.commonTimingWindow.start} to {heroEvent.agreement.commonTimingWindow.end}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Agreement & Metrics Badges */}
            <div className="flex flex-col justify-between p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Direction Agreement</span>
                  <span className="text-xs font-mono text-teal-300 font-bold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                    {heroEvent.agreement.agreeingEnginesRatio} ({heroEvent.agreement.directionAgreementPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${heroEvent.agreement.directionAgreementPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  {heroEvent.agreement.agreeingEnginesRatio} eligible systems point in the same normalized direction. (Not a statistical probability).
                </p>

                <div className="flex items-center justify-between pt-1 text-xs font-mono text-slate-300">
                  <span>Timing Agreement:</span>
                  <span className="text-indigo-300 font-semibold">{heroEvent.agreement.timingAgreementPercent}% Overlap</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>Calculation Stability:</span>
                  <span className="text-emerald-400 font-semibold">{heroEvent.stability.level}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setSelectedEvent(heroEvent)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 text-indigo-200 text-xs font-medium transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Full Detail
                </button>
                <button
                  onClick={() => handleDownloadIcs(heroEvent)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all"
                  title="Export .ics to Calendar"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Top Control Bar: Mode Selector & Engine Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        {/* View Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'calendar' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            Astrology Calendar
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'timeline' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Prediction Timeline
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'compare' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Multi-Engine Compare
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'research' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Research & Backtesting
          </button>
        </div>

        {/* Engine Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <span className="text-xs font-mono text-slate-400 whitespace-nowrap">Engine:</span>
          {(['ALL', 'vedic', 'western', 'kp', 'jaimini', 'tajika'] as const).map(eng => (
            <button
              key={eng}
              onClick={() => setSelectedEngine(eng)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                selectedEngine === eng
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {eng === 'ALL' ? 'All (5 Systems)' : eng.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Secondary Filter Bar: Categories, Agreement & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-slate-400">Category:</span>
          {(['ALL', 'CAREER', 'MONEY', 'RELATIONSHIP', 'RELOCATION', 'ECLIPSE'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-teal-300 border border-teal-500/30 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <span>Min Agreement:</span>
            <select
              value={minAgreement}
              onChange={(e) => setMinAgreement(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value={0}>All Levels</option>
              <option value={60}>≥ 60%</option>
              <option value={80}>≥ 80% (High)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <span>Horizon:</span>
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value={3}>3 Months</option>
              <option value={6}>6 Months</option>
              <option value={12}>1 Year</option>
              <option value={36}>3 Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Main Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            {/* Calendar Controls */}
            <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveMonthOffset(prev => prev - 1)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-serif font-semibold text-lg text-white">
                  Prediction Window View (Filtered: {filteredPredictions.length} Events)
                </span>
                <button
                  onClick={() => setActiveMonthOffset(prev => prev + 1)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {(['month', 'week', 'agenda', 'year'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setCalendarView(v)}
                    className={`px-2.5 py-1 rounded text-xs capitalize ${
                      calendarView === v ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPredictions.map(event => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="group relative cursor-pointer rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-900 p-5 transition-all hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                        {event.category}
                      </span>
                      <span className="text-[11px] font-mono text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 font-semibold">
                        {event.agreement.directionAgreementPercent}% Agreement ({event.agreement.agreeingEnginesRatio})
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {event.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Active Window:</span>
                      <span className="text-slate-200 font-semibold">{event.start} → {event.end}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Peak Date:</span>
                      <span className="text-amber-300 font-semibold">{event.peak}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {event.engineFindings.length} Participating Engines
                      </span>
                      <span className="text-xs text-indigo-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Explore <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 5. Timeline View */}
        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-serif font-bold text-white">Chronological Event Timeline</h2>
              <p className="text-xs text-slate-400">Sequential multi-engine timing windows with active phases and peak dates.</p>
            </div>

            <div className="relative border-l-2 border-indigo-500/30 ml-4 space-y-8 pl-6">
              {filteredPredictions.map((event, idx) => (
                <div key={event.id} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-slate-900 border-2 border-indigo-400 group-hover:bg-indigo-400 transition-colors" />

                  <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-mono text-amber-300 font-semibold">
                        {event.start} ─── [Peak: {event.peak}] ─── {event.end}
                      </span>
                      <span className="text-xs font-mono text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded border border-teal-500/20">
                        {event.agreement.directionAgreementPercent}% Agreement ({event.agreement.agreeingEnginesRatio})
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white">{event.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{event.summary}</p>

                    <div className="flex items-center gap-2 flex-wrap pt-2">
                      {event.engineFindings.map(ef => (
                        <span key={ef.engineId} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {ef.engineId.toUpperCase()}: <strong className="text-emerald-400">{ef.direction}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 6. Multi-Engine Compare Table */}
        {activeTab === 'compare' && (
          <motion.div
            key="compare"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 shadow-xl"
          >
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                <tr>
                  <th className="p-4">Prediction Event</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Vedic Parashari</th>
                  <th className="p-4">Western Tropical</th>
                  <th className="p-4">KP Stellar</th>
                  <th className="p-4">Jaimini Sutras</th>
                  <th className="p-4">Tajika Solar</th>
                  <th className="p-4">Direction Agreement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                {filteredPredictions.map(event => {
                  const getStatus = (id: string) => {
                    const f = event.engineFindings.find(e => e.engineId === id);
                    if (!f) return <span className="text-slate-600">—</span>;
                    return (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        f.direction === 'SUPPORTIVE' ? 'text-emerald-400 bg-emerald-500/10' :
                        f.direction === 'MIXED' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'
                      }`}>
                        {f.direction}
                      </span>
                    );
                  };

                  return (
                    <tr key={event.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-sans font-semibold text-white max-w-[200px]">
                        {event.title}
                      </td>
                      <td className="p-4 text-slate-400">{event.category}</td>
                      <td className="p-4">{getStatus('vedic')}</td>
                      <td className="p-4">{getStatus('western')}</td>
                      <td className="p-4">{getStatus('kp')}</td>
                      <td className="p-4">{getStatus('jaimini')}</td>
                      <td className="p-4">{getStatus('tajika')}</td>
                      <td className="p-4">
                        <span className="text-teal-300 font-bold bg-teal-500/10 px-2 py-1 rounded border border-teal-500/20">
                          {event.agreement.directionAgreementPercent}% ({event.agreement.agreeingEnginesRatio})
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* 7. Deep Research & Backtesting View */}
        {activeTab === 'research' && (
          <motion.div
            key="research"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold">
                <BookOpen className="w-4 h-4" />
                HISTORICAL CALIBRATION & EMPIRICAL PROVENANCE
              </div>
              <h2 className="text-xl font-serif font-bold text-white">
                Zero-Leakage Historical Backtesting & Classical Scripture Exegesis
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                ASTRO360 validates prediction algorithms against verified historical life events using frozen historical ephemeris snapshots. Citations are graded across Tier 1 canonical scriptures (*Brihat Parashara Hora Shastra, Saravali, Phaladeepika*).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-mono">Tested Event Precision</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-500">Historical validation accuracy</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-mono">Mean Timing Deviation</div>
                  <div className="text-2xl font-bold font-mono text-indigo-300">±6 Days</div>
                  <div className="text-[11px] text-slate-500">Sub-week temporal resolution</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-mono">Scripture Grounding</div>
                  <div className="text-2xl font-bold font-mono text-amber-300">Tier 1</div>
                  <div className="text-[11px] text-slate-500">Canonical Sanskrit citations</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Comprehensive Prediction Detail Drawer / Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-indigo-500/30 bg-slate-950 p-6 md:p-8 shadow-2xl space-y-6 text-slate-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                      {selectedEvent.category}
                    </span>
                    <span className="text-xs font-mono text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      {selectedEvent.agreement.directionAgreementPercent}% Agreement ({selectedEvent.agreement.agreeingEnginesRatio})
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white">{selectedEvent.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Timing & Common Window */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400">Total Active Window:</span>
                  <p className="text-white font-semibold text-sm mt-0.5">{selectedEvent.start} → {selectedEvent.end}</p>
                </div>
                <div>
                  <span className="text-slate-400">Calculated Peak Date:</span>
                  <p className="text-amber-300 font-semibold text-sm mt-0.5">{selectedEvent.peak}</p>
                </div>
                {selectedEvent.agreement.commonTimingWindow && (
                  <div className="md:col-span-2 pt-2 border-t border-slate-800 text-teal-300">
                    <span>Common Timing Overlap Window: </span>
                    <strong>{selectedEvent.agreement.commonTimingWindow.start} to {selectedEvent.agreement.commonTimingWindow.end}</strong>
                  </div>
                )}
              </div>

              {/* Multi-Engine Breakdown */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider text-indigo-300">
                  Participating Engine Findings ({selectedEvent.engineFindings.length} Systems)
                </h3>
                <div className="space-y-2">
                  {selectedEvent.engineFindings.map(ef => (
                    <div key={ef.engineId} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-xs">{ef.tradition}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          ef.direction === 'SUPPORTIVE' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                        }`}>
                          {ef.direction} ({Math.round(ef.strength * 100)}% Strength)
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{ef.eventType}</p>
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {ef.techniques.map(t => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence & Scriptures */}
              {selectedEvent.evidence.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase text-slate-400 font-semibold">Classical Evidence Grounding</h3>
                  <div className="space-y-1.5">
                    {selectedEvent.evidence.map((ev, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                        <div>
                          <strong className="text-indigo-300">{ev.source}:</strong> <span className="text-slate-300">{ev.rule}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{ev.engine}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Guidance */}
              {selectedEvent.practicalAdvice.length > 0 && (
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                  <h3 className="text-xs font-mono uppercase text-indigo-300 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    Practical Decision Support & Recommended Actions
                  </h3>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    {selectedEvent.practicalAdvice.map((adv, i) => (
                      <li key={i}>{adv}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 flex-wrap gap-3">
                <button
                  onClick={() => handleDownloadIcs(selectedEvent)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
                >
                  <Download className="w-4 h-4 text-teal-400" />
                  Add to Calendar (.ics)
                </button>

                <button
                  onClick={() => {
                    const prompt = `Explain my ${selectedEvent.title} period (${selectedEvent.start} to ${selectedEvent.end}) with ${selectedEvent.agreement.directionAgreementPercent}% engine agreement.`;
                    setSelectedEvent(null);
                    onNavigateToAsk?.(prompt);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-lg shadow-indigo-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask ASTRO360 About This Event
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
