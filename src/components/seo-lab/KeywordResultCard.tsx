import React from 'react';
import { 
  Sparkles, ExternalLink, Bookmark, BookmarkCheck, 
  FileText, TrendingUp, TrendingDown, Minus, Wrench, 
  AlertTriangle, CheckCircle2, ChevronRight, Layers 
} from 'lucide-react';
import { KeywordItem } from '../../lib/seo-lab/types';

interface KeywordResultCardProps {
  item: KeywordItem;
  onGenerateBrief: (item: KeywordItem) => void;
  onToggleSave: (item: KeywordItem) => void;
  onNavigateToTarget?: (url: string, tab?: string) => void;
}

export default function KeywordResultCard({
  item,
  onGenerateBrief,
  onToggleSave,
  onNavigateToTarget
}: KeywordResultCardProps) {
  const {
    rawKeyword,
    primaryIntent,
    secondaryIntent,
    cluster,
    source,
    trend,
    gscData,
    mapping,
    opportunity,
    isSaved
  } = item;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'CRITICAL': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'HIGH': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'MEDIUM': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'TOOL': return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      case 'COMMERCIAL': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'TRANSACTIONAL': return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'NAVIGATIONAL': return 'bg-slate-500/10 text-slate-300 border-slate-500/30';
      case 'LOCAL': return 'bg-pink-500/10 text-pink-300 border-pink-500/30';
      default: return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
    }
  };

  const getMappingStatusBadge = (status: string) => {
    switch (status) {
      case 'EXISTS_OPTIMIZED':
        return <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30"><CheckCircle2 className="w-3 h-3" /> Live Page</span>;
      case 'TOOL_NEEDED':
        return <span className="inline-flex items-center gap-1 text-[10px] text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30"><Wrench className="w-3 h-3" /> New Tool Needed</span>;
      case 'MISSING_NEW_PAGE':
        return <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30"><FileText className="w-3 h-3" /> Content Gap</span>;
      case 'CANNIBALIZATION_RISK':
        return <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30"><AlertTriangle className="w-3 h-3" /> Cannibalization Risk</span>;
      default:
        return null;
    }
  };

  // Generate SVG Sparkline Polyline Points
  const minVal = Math.min(...trend.sparkline, 0);
  const maxVal = Math.max(...trend.sparkline, 100);
  const width = 80;
  const height = 24;
  const points = trend.sparkline.map((val, idx) => {
    const x = (idx / (trend.sparkline.length - 1)) * width;
    const y = height - ((val - minVal) / Math.max(1, maxVal - minVal)) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1220]/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all space-y-3.5 text-left font-sans backdrop-blur-md shadow-lg group">
      
      {/* 1. Header: Keyword, Cluster & Bookmark */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight break-words">
              {rawKeyword}
            </h3>
            {getMappingStatusBadge(mapping.status)}
          </div>
          <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 flex-wrap">
            <span className="text-cyan-400 font-bold">{cluster}</span>
            <span>•</span>
            <span className="text-slate-500">{source}</span>
          </p>
        </div>

        {/* Priority Badge & Bookmark */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-black border ${getTierColor(opportunity.tier)}`}>
            {opportunity.tier} • {opportunity.total}
          </div>
          <button
            onClick={() => onToggleSave(item)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isSaved
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]'
            }`}
            title={isSaved ? 'Remove from Watchlist' : 'Save to Watchlist'}
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. Signals Row: Trend Sparkline + Intent Badges + GSC */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 rounded-xl bg-black/30 border border-white/[0.04] text-xs font-mono">
        
        {/* Trend Direction & Sparkline */}
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <div className="flex items-center gap-1 text-[11px]">
            {trend.direction === 'RISING' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
            {trend.direction === 'DECLINING' && <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
            {trend.direction === 'STABLE' && <Minus className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
            <span className={trend.direction === 'RISING' ? 'text-emerald-400 font-bold' : trend.direction === 'DECLINING' ? 'text-rose-400' : 'text-slate-400'}>
              {trend.score}/100
            </span>
          </div>

          <svg width={width} height={height} className="overflow-visible shrink-0">
            <polyline
              fill="none"
              stroke={trend.direction === 'RISING' ? '#34d399' : trend.direction === 'DECLINING' ? '#f43f5e' : '#94a3b8'}
              strokeWidth="2"
              points={points}
            />
          </svg>
        </div>

        {/* Intent Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${getIntentColor(primaryIntent)}`}>
            {primaryIntent}
          </span>
          {secondaryIntent !== 'GENERAL' && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.04] text-slate-400 border border-white/10">
              {secondaryIntent}
            </span>
          )}
        </div>

        {/* First-Party GSC / Target URL */}
        <div className="text-[11px] truncate flex items-center justify-between sm:justify-end gap-1">
          {gscData ? (
            <span className="text-amber-300 font-bold truncate" title={`Pos ${gscData.position.toFixed(1)}, ${gscData.impressions} impr, ${(gscData.ctr * 100).toFixed(1)}% CTR`}>
              GSC: Pos {gscData.position.toFixed(1)} ({gscData.impressions} imp)
            </span>
          ) : (
            <span className="text-slate-400 truncate" title={mapping.targetUrl}>
              URL: <span className="text-cyan-300">{mapping.targetUrl}</span>
            </span>
          )}
        </div>
      </div>

      {/* 3. Action Buttons & Quick Preview */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
        <p className="text-[11px] text-slate-400 font-sans line-clamp-1 italic">
          💡 {opportunity.explanation}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onGenerateBrief(item)}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Content Brief</span>
          </button>

          {mapping.targetUrl && (
            <button
              onClick={() => onNavigateToTarget?.(mapping.targetUrl, mapping.toolTab)}
              className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center justify-center gap-1 transition-all cursor-pointer"
              title="Open ASTRO360 Route"
            >
              <span>View Tool</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
