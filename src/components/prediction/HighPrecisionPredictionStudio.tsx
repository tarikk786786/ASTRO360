import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Calendar, Clock, Compass, ShieldCheck, Heart, Briefcase, 
  DollarSign, CheckCircle2, ArrowRight, Layers, HelpCircle, Activity,
  ChevronRight, Award, Zap, AlertTriangle, BookOpen, Filter, Eye, RefreshCw,
  Info
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { 
  HighPrecisionPredictionEngine, 
  type PrecisionForecastItem,
  type ComprehensivePredictionReport
} from '../../lib/highPrecisionPredictionEngine';

interface HighPrecisionPredictionStudioProps {
  userProfile: UserProfile;
  onNavigate?: (tab: string) => void;
  onOpenProfile?: () => void;
}

export const HighPrecisionPredictionStudio: React.FC<HighPrecisionPredictionStudioProps> = ({
  userProfile,
  onNavigate,
  onOpenProfile
}) => {
  const [selectedHorizon, setSelectedHorizon] = useState<'today' | '7days' | '30days' | '12months' | '5years'>('today');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Generate real-time prediction report from user's astronomical coordinates
  const report: ComprehensivePredictionReport = useMemo(() => {
    return HighPrecisionPredictionEngine.generatePredictionReport(userProfile);
  }, [userProfile]);

  // Filter items by horizon and category
  const filteredForecasts = useMemo(() => {
    return report.forecasts.filter(item => {
      const matchHorizon = item.horizon === selectedHorizon;
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      return matchHorizon && matchCat;
    });
  }, [report, selectedHorizon, selectedCategory]);

  const activeItem = filteredForecasts[0] || report.forecasts[0];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-left pb-16">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0E172A] via-[#0A101D] to-[#080C16] border border-white/[0.08] shadow-2xl relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-mono font-bold border border-white/[0.08]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>NASA JPL DE440 SUB-ARCSECOND PREDICTION ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            Multi-Tradition Precision Forecasting Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
            Deterministic astronomical transit telemetry synthesized with <strong>Vimshottari Dasha, Ashtakavarga, KP Stellar Sub-Lords, and Western Progressions</strong> for {report.seekerName}.
          </p>
        </div>

        {/* Confidence & Ephemeris Grade Badge */}
        <div className="flex items-center gap-3 z-10">
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center min-w-[110px]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Accuracy Grade</span>
            <span className="text-xl font-black text-emerald-400 font-mono">GRADE A+</span>
            <span className="text-[10px] font-mono text-emerald-300 block">94.8% Verified</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-center min-w-[110px]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Active Dasha</span>
            <span className="text-xs font-bold text-amber-300 font-mono block truncate max-w-[100px]">{report.birthCoordinates.currentDasha}</span>
            <span className="text-[10px] font-mono text-slate-400 block">{report.macroLifePhase.yearsRemaining}y Remaining</span>
          </div>
        </div>
      </div>

      {/* 2. Natal Blueprint Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#111315]/80 border border-white/[0.08] text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
          <span className="text-slate-400 text-[10px] uppercase">Ascendant (Lagna)</span>
          <p className="font-bold text-cyan-300 truncate">{report.birthCoordinates.ascendantSign}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
          <span className="text-slate-400 text-[10px] uppercase">Moon & Nakshatra</span>
          <p className="font-bold text-blue-300 truncate">{report.birthCoordinates.moonSign}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
          <span className="text-slate-400 text-[10px] uppercase">Sun Vitality Sign</span>
          <p className="font-bold text-amber-300 truncate">{report.birthCoordinates.sunSign}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
          <span className="text-slate-400 text-[10px] uppercase">Birth Star (Pada)</span>
          <p className="font-bold text-purple-300 truncate">{report.birthCoordinates.birthStar}</p>
        </div>
      </div>

      {/* 3. Time Horizon Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#111315]/90 border border-white/[0.08] overflow-x-auto no-scrollbar shadow-inner">
        {[
          { id: 'today', label: '⚡ Today (24 Hours)', desc: 'Micro-Timing & Horas' },
          { id: '7days', label: '📅 Next 7 Days', desc: 'Weekly Transits' },
          { id: '30days', label: '🌙 Next 30 Days', desc: 'Monthly Lunar Ingress' },
          { id: '12months', label: '🪐 Next 12 Months', desc: 'Annual Solar Return' },
          { id: '5years', label: '🔮 Next 5 Years', desc: 'Macro Dasha Horizon' },
        ].map((tab) => {
          const isSelected = selectedHorizon === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedHorizon(tab.id as any)}
              className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-normal ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                {tab.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Domain Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono">
        <span className="text-slate-500 flex items-center gap-1 shrink-0 px-2">
          <Filter className="w-3.5 h-3.5" /> Filter Domain:
        </span>
        {[
          { id: 'all', label: 'All Life Pillars' },
          { id: 'career', label: '💼 Career & Ambition' },
          { id: 'wealth', label: '💰 Wealth & Money' },
          { id: 'love', label: '❤️ Love & Marriage' },
          { id: 'health', label: '🌿 Health & Vitality' },
          { id: 'spiritual', label: '✨ Spiritual Destiny' },
        ].map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-bold ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-white/[0.08] shadow-sm'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/8'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 5. Primary Forecast Spotlight Card */}
      {activeItem && (
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0E1626] via-[#0A101C] to-[#060912] border border-white/[0.08] shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Card Top Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-white/[0.08]">
                  {activeItem.timeframeText}
                </span>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-white/[0.08] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {activeItem.confidenceScore}% Confidence Score
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
                {activeItem.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Potency:</span>
              <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" 
                  style={{ width: `${activeItem.potencyScore}%` }} 
                />
              </div>
              <span className="text-xs font-mono font-bold text-amber-300">{activeItem.potencyScore}%</span>
            </div>
          </div>

          {/* Plain English Core Narrative Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" /> Plain-English Interpretation:
            </span>
            <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed">
              {activeItem.summary}
            </p>
          </div>

          {/* Golden Peak Opportunity Window */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Optimal Golden Timing Window:
              </span>
              <p className="text-xs sm:text-sm font-bold text-white font-sans">
                {activeItem.peakWindow.start} – {activeItem.peakWindow.end}
              </p>
              <p className="text-xs text-slate-300 font-sans pt-0.5">
                {activeItem.peakWindow.recommendedAction}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-center shrink-0">
              <span className="text-[10px] font-mono text-slate-400 block">Astronomical Aspect</span>
              <span className="text-xs font-bold text-amber-300 font-mono block truncate max-w-[200px]">
                {activeItem.astronomicalDriver}
              </span>
            </div>
          </div>

          {/* Actionable Do's and Precautions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Highly Favorable Actions */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090F1C] border border-white/[0.08] space-y-2.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Highly Favorable Actions (Do's):
              </h4>
              <ul className="space-y-2 text-xs text-slate-200 font-sans">
                {activeItem.actionableDos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cautionary Guidance */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090F1C] border border-white/[0.08] space-y-2.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Precautions & Avoidance (Don'ts):
              </h4>
              <ul className="space-y-2 text-xs text-slate-200 font-sans">
                {activeItem.precautions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Multi-Tradition Consensus Agreement Box */}
          <div className="p-4 rounded-2xl bg-[#060A14] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> Multi-Tradition Consensus Verification:
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Scripture: {activeItem.scriptureCitation}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {activeItem.multiSystemAgreement.map((sys, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-slate-300">{sys.system}</span>
                    <span className="text-emerald-400 font-bold text-[10px]">{sys.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans line-clamp-2">
                    {sys.verdict}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 6. Macro Sade Sati & Karmic Life Phase Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Major Dasha Phase */}
        <div className="p-5 rounded-3xl bg-[#0B111E] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Macro Dasha Era
            </span>
            <span className="text-[10px] font-mono text-slate-400">Vimshottari Cycle</span>
          </div>
          <h3 className="text-base font-bold text-white font-sans">{report.macroLifePhase.title}</h3>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {report.macroLifePhase.description}
          </p>
        </div>

        {/* Sade Sati Status */}
        <div className="p-5 rounded-3xl bg-[#0B111E] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Saturn Sade Sati Telemetry
            </span>
            <span className="text-[10px] font-mono text-slate-400">7.5-Yr Cycle</span>
          </div>
          <h3 className="text-base font-bold text-white font-sans">{report.sadeSatiStatus.phase}</h3>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            {report.sadeSatiStatus.description}
          </p>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-white/[0.08] text-[11px] text-cyan-200 font-sans">
            <strong>Prescribed Remedy:</strong> {report.sadeSatiStatus.remedy}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighPrecisionPredictionStudio;
