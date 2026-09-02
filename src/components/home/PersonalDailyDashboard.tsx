import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Clock, Calendar, ShieldCheck, Activity, ArrowRight, 
  HelpCircle, ChevronRight, CheckCircle2, AlertTriangle, BookOpen, 
  Layers, ExternalLink, Download, Check, History, Edit3, MessageSquare
} from 'lucide-react';
import { UserProfile } from '../../types';
import { CurrentThemeEngine, TodayForYouBriefing, ActiveLifeTheme } from '../../lib/prediction/currentThemeEngine';
import { PredictionDiffEngine, PredictionDiffItem } from '../../lib/prediction/predictionDiffEngine';
import { AstrologyJournalEngine, JournalEntry, OutcomeVerdict } from '../../lib/prediction/astrologyJournalEngine';
import { toast } from 'sonner';

interface PersonalDailyDashboardProps {
  userProfile: UserProfile;
  onNavigate: (tabId: string) => void;
  onSelectProblem?: (problemText: string) => void;
}

export const PersonalDailyDashboard: React.FC<PersonalDailyDashboardProps> = ({
  userProfile,
  onNavigate,
  onSelectProblem
}) => {
  const briefing: TodayForYouBriefing = CurrentThemeEngine.evaluateToday(userProfile);
  const diffs: PredictionDiffItem[] = PredictionDiffEngine.computeDiffs();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(AstrologyJournalEngine.getEntries());
  const [selectedThemeWhy, setSelectedThemeWhy] = useState<ActiveLifeTheme | null>(null);
  const [activeOutcomeId, setActiveOutcomeId] = useState<string | null>(null);

  const handleRecordOutcome = (entryId: string, verdict: OutcomeVerdict) => {
    AstrologyJournalEngine.recordOutcome(entryId, verdict);
    setJournalEntries([...AstrologyJournalEngine.getEntries()]);
    toast.success(`Recorded outcome feedback: ${verdict}`);
    setActiveOutcomeId(null);
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 font-sans text-left">
      {/* ═══ 1. TODAY FOR YOU: DYNAMIC RANKED LIFE THEMES ═══ */}
      <div className="p-5 sm:p-7 rounded-3xl bg-[#0E1422] border border-white/[0.12] shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                TODAY FOR YOU • {briefing.dateStr}
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono pt-0.5">
              Ranked by NASA JPL DE440 Ecliptic Transit Signals & Active Vimshottari Dasha
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 font-bold">
              Main Focus: {briefing.mainTheme.label}
            </span>
          </div>
        </div>

        {/* 6 Ranked Active Life Domains */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {briefing.rankedThemes.map((theme) => {
            const isElevated = theme.activityLevel === 'Elevated';
            const isModerate = theme.activityLevel === 'Moderate';
            const badgeColor = isElevated ? 'bg-amber-400/15 text-amber-300 border-amber-400/30' : isModerate ? 'bg-cyan-400/15 text-cyan-300 border-cyan-400/30' : 'bg-slate-800 text-slate-300 border-slate-700';

            return (
              <div
                key={theme.id}
                className="p-4 rounded-2xl bg-[#090D18] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-all space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white group-hover:text-amber-300 transition-colors">
                    {theme.label}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${badgeColor}`}>
                    {theme.activityLevel} ({theme.activityScore}%)
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-2">
                  {theme.whyReason}
                </p>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-amber-400/90 font-medium">⚡ {theme.auspiciousHours}</span>
                  <button
                    onClick={() => setSelectedThemeWhy(theme)}
                    className="text-slate-300 hover:text-white flex items-center gap-0.5 cursor-pointer underline"
                  >
                    <span>Why?</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Today's Recommended Action & Transit Highlight */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/5 to-transparent border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-amber-400">💡 Today's High-Leverage Strategic Action:</span>
            <p className="text-slate-200 font-sans">{briefing.recommendedNextAction}</p>
          </div>
          <button
            onClick={() => onSelectProblem ? onSelectProblem("What is the overarching planetary theme in my life right now?") : onNavigate('ask')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-black font-bold font-sans text-xs transition-all cursor-pointer shrink-0 shadow-md flex items-center gap-1.5"
          >
            <span>Ask AI Copilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ═══ 2. "WHAT CHANGED SINCE YOUR LAST VISIT?" ═══ */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E1422] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              WHAT CHANGED SINCE YOUR LAST VISIT?
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Calculated Ephemeris Diffs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          {diffs.map((d, dIdx) => (
            <div key={dIdx} className="p-3.5 rounded-2xl bg-[#090D18] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{d.domain}</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                  {d.currentValue}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Shift: <span className="line-through text-slate-500">{d.previousValue}</span> → <strong className="text-white">{d.currentValue}</strong>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed pt-1 border-t border-white/[0.06]">
                {d.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 3. MY ASTROLOGY JOURNAL & OUTCOME TRACKING ═══ */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E1422] border border-white/[0.08] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-purple-400" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                MY ASTROLOGY JOURNAL & OUTCOME TRACKING
              </h3>
              <p className="text-xs text-slate-400 font-mono">Track life outcomes against historical timing windows</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('forecast')}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-bold"
          >
            <span>View Full Timeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {journalEntries.map(entry => (
            <div key={entry.id} className="p-4 rounded-2xl bg-[#090D18] border border-white/[0.08] space-y-2.5 text-xs font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 font-bold border border-amber-400/20">
                    {entry.domain}
                  </span>
                  <span className="font-bold text-white text-sm font-sans">"{entry.question}"</span>
                </div>
                <span className="text-slate-400 text-[11px]">
                  Window: <strong className="text-white">{entry.predictedWindow}</strong> ({entry.agreementPercent}% Agreement)
                </span>
              </div>

              {entry.historicalSimilarityNote && (
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-slate-300 font-sans flex items-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Historical Cycle Comparison:</strong> {entry.historicalSimilarityNote}</span>
                </div>
              )}

              {/* Outcome Feedback Bar */}
              <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Outcome Status:</span>
                  {entry.outcome ? (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                      ✓ Recorded: {entry.outcome} {entry.userNotes ? `("${entry.userNotes}")` : ''}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      {(['YES', 'PARTIAL', 'NO', 'NOT_SURE'] as const).map(v => (
                        <button
                          key={v}
                          onClick={() => handleRecordOutcome(entry.id, v)}
                          className="px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white text-[10px] transition-colors cursor-pointer"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onSelectProblem ? onSelectProblem(entry.question) : onNavigate('ask')}
                  className="text-cyan-400 hover:text-cyan-300 text-[11px] flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>Re-evaluate in Problem Solver</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Theme Modal */}
      <AnimatePresence>
        {selectedThemeWhy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-[#0E1422] border border-white/20 p-6 space-y-4 text-xs font-mono shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Why is {selectedThemeWhy.label} {selectedThemeWhy.activityLevel}?
                </span>
                <button
                  onClick={() => setSelectedThemeWhy(null)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-200 font-sans leading-relaxed">
                {selectedThemeWhy.whyReason}
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Astronomical & Dasha Triggers:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedThemeWhy.planetaryTriggers.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 text-amber-300 border border-white/10">
                      • {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-emerald-400 font-bold">Auspicious: {selectedThemeWhy.auspiciousHours}</span>
                <button
                  onClick={() => setSelectedThemeWhy(null)}
                  className="px-4 py-2 rounded-xl bg-white text-black font-bold font-sans cursor-pointer hover:bg-slate-200"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalDailyDashboard;
