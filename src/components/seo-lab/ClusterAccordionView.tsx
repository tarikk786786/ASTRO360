import React, { useState } from 'react';
import { 
  ChevronDown, Layers, Wrench, BookOpen, HelpCircle, 
  Sparkles, ExternalLink, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClusterGroup, KeywordItem } from '../../lib/seo-lab/types';

interface ClusterAccordionViewProps {
  clusters: ClusterGroup[];
  onGenerateBrief: (item: KeywordItem) => void;
  onNavigateToTarget?: (url: string, tab?: string) => void;
}

export default function ClusterAccordionView({
  clusters,
  onGenerateBrief,
  onNavigateToTarget
}: ClusterAccordionViewProps) {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(clusters[0]?.pillar || null);

  const togglePillar = (pillar: string) => {
    setExpandedPillar(prev => prev === pillar ? null : pillar);
  };

  if (!clusters.length) {
    return (
      <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center text-slate-400 font-mono text-xs">
        No cluster data available. Mine a keyword to generate topic groupings.
      </div>
    );
  }

  return (
    <div className="space-y-3 text-left font-sans">
      {clusters.map((cluster) => {
        const isExpanded = expandedPillar === cluster.pillar;

        return (
          <div
            key={cluster.pillar}
            className={`rounded-2xl border transition-all overflow-hidden backdrop-blur-md ${
              isExpanded 
                ? 'bg-[#0B1220] border-cyan-500/40 shadow-xl' 
                : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
            }`}
          >
            {/* Header Accordion Button */}
            <button
              onClick={() => togglePillar(cluster.pillar)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 font-bold text-xs font-mono">
                  {cluster.clusterKeywords.length}
                </div>
                <div className="space-y-0.5 truncate">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate flex items-center gap-2">
                    <span>{cluster.pillar}</span>
                    {cluster.totalOpportunities > 0 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {cluster.totalOpportunities} High Priority
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 truncate">
                    Hub: <span className="text-cyan-300">{cluster.pillarUrl}</span> • Tool: {cluster.primaryToolName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>
              </div>
            </button>

            {/* Accordion Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-5 sm:px-5 sm:pb-6 space-y-4 border-t border-white/[0.04]"
                >
                  {/* Pillar Architecture Mapping Banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <Wrench className="w-4 h-4 text-purple-400 shrink-0" />
                        <div className="truncate">
                          <span className="text-[10px] text-slate-400 block uppercase">Primary Tool</span>
                          <span className="text-white font-bold truncate">{cluster.primaryToolName}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigateToTarget?.(cluster.primaryToolUrl)}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-[11px] shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        Launch <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                        <div className="truncate">
                          <span className="text-[10px] text-slate-400 block uppercase">Content Hub</span>
                          <span className="text-white font-bold truncate">{cluster.pillarUrl}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigateToTarget?.(cluster.pillarUrl)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[11px] shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Keywords in this Cluster */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" /> Cluster Keywords ({cluster.clusterKeywords.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {cluster.clusterKeywords.map(kw => (
                        <div
                          key={kw.id}
                          className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-cyan-500/30 flex items-center justify-between gap-2 text-xs font-mono transition-all"
                        >
                          <div className="space-y-0.5 truncate">
                            <span className="text-white font-bold block truncate">{kw.rawKeyword}</span>
                            <span className="text-[10px] text-slate-500 block truncate">
                              {kw.primaryIntent} • Trend: {kw.trend.score}/100 • Priority: {kw.opportunity.total}
                            </span>
                          </div>
                          <button
                            onClick={() => onGenerateBrief(kw)}
                            className="px-2 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-[10px] font-bold shrink-0 cursor-pointer"
                          >
                            Brief
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Questions identified for this Pillar */}
                  {cluster.questions.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Core Seeker Questions (AEO/GEO Targets)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                        {cluster.questions.map((q, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-black/30 border border-white/[0.04] text-slate-300 flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">Q:</span>
                            <span className="leading-snug">{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
