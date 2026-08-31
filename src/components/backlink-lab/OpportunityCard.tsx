import React from 'react';
import { 
  ShieldCheck, ExternalLink, Mail, Sparkles, AlertTriangle, 
  Bookmark, CheckCircle2, ArrowUpRight, Copy, Check 
} from 'lucide-react';
import { BacklinkOpportunity } from '../../lib/backlink-lab/types';

interface OpportunityCardProps {
  item: BacklinkOpportunity;
  onDraftOutreach: (item: BacklinkOpportunity) => void;
  onVerify: (item: BacklinkOpportunity) => void;
  onToggleSave: (item: BacklinkOpportunity) => void;
  onNavigateToTarget?: (url: string) => void;
}

export default function OpportunityCard({
  item,
  onDraftOutreach,
  onVerify,
  onToggleSave,
  onNavigateToTarget
}: OpportunityCardProps) {
  const tierColor =
    item.opportunityScore.tier === 'HIGH'
      ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
      : item.opportunityScore.tier === 'MEDIUM'
      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      : 'text-slate-400 bg-slate-500/10 border-slate-500/30';

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#0E172A]/90 border border-white/10 hover:border-cyan-500/30 transition-all space-y-3.5 text-left text-xs font-sans shadow-lg relative overflow-hidden group">
      {/* Top Bar */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
              {item.sourceDomain}
            </span>
            <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${tierColor}`}>
              {item.opportunityScore.tier} ({item.opportunityScore.total}/100)
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {item.sourceType}
            </span>
          </div>

          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1 font-mono truncate max-w-xs sm:max-w-md block"
          >
            <span>{item.sourceUrl}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        </div>

        <button
          onClick={() => onToggleSave(item)}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            item.isSaved
              ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
              : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
          }`}
          title="Save to shortlist"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Relevance & Editorial Reason */}
      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1 text-slate-300 text-[11px]">
        <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
          <span>Topic: {item.topic}</span>
          <span>Country: {item.country}</span>
        </div>
        <p className="text-slate-300 line-clamp-2">
          {item.notes || item.suggestedAngle}
        </p>
      </div>

      {/* Target Asset & Score Breakdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-white/5 font-mono text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-400 truncate">
          <span className="text-slate-500">Target:</span>
          <button
            onClick={() => onNavigateToTarget?.(item.targetUrl)}
            className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            <span>{item.targetUrl}</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onVerify(item)}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Verify</span>
          </button>

          <button
            onClick={() => onDraftOutreach(item)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
          >
            <Mail className="w-3 h-3" />
            <span>Draft Pitch</span>
          </button>
        </div>
      </div>
    </div>
  );
}
