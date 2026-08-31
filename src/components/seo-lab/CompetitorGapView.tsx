import React from 'react';
import { 
  Building2, ExternalLink, RefreshCw, Layers, 
  AlertTriangle, CheckCircle2, ArrowRight, Shield 
} from 'lucide-react';
import { CompetitorGapItem, CompetitorAction } from '../../lib/seo-lab/types';

interface CompetitorGapViewProps {
  gaps: CompetitorGapItem[];
  onNavigateToTarget?: (url: string) => void;
}

export default function CompetitorGapView({
  gaps,
  onNavigateToTarget
}: CompetitorGapViewProps) {
  if (!gaps.length) {
    return (
      <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center text-slate-400 font-mono text-xs">
        No competitor gap data available. Run keyword research to analyze gaps against industry benchmarks.
      </div>
    );
  }

  const getActionBadge = (action: CompetitorAction) => {
    switch (action) {
      case 'BUILD':
        return <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">BUILD NEW</span>;
      case 'UPDATE':
        return <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">UPDATE PAGE</span>;
      case 'MERGE':
        return <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">MERGE & REDIRECT</span>;
      default:
        return <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-slate-500/20 text-slate-400 border border-slate-500/40">IGNORE</span>;
    }
  };

  return (
    <div className="space-y-4 text-left font-sans">
      <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-1">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cyan-400" /> Competitor Benchmark & Strategic Gap Matrix
        </h3>
        <p className="text-xs text-slate-400">
          Comparing ASTRO360 coverage vs key competitors (AstroSage, Astro-Seek, CafeAstrology, GaneshaSpeaks) without scraping prohibited endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="p-4 rounded-2xl bg-[#0B1220]/80 border border-white/[0.08] hover:border-cyan-500/30 transition-all space-y-3 font-mono text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5 truncate">
                <span className="text-white font-bold text-sm block truncate">{gap.keyword}</span>
                <span className="text-[10px] text-cyan-400 block">{gap.cluster} • {gap.searchIntent}</span>
              </div>
              {getActionBadge(gap.action)}
            </div>

            <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.04] space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">ASTRO360 URL:</span>
                <span className="text-cyan-300 font-bold truncate max-w-[200px]">{gap.astro360Url || 'None (Gap)'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Competitor:</span>
                <span className="text-amber-400 truncate max-w-[200px]">{gap.competitorDomain}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 font-sans leading-snug">
              💡 {gap.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
