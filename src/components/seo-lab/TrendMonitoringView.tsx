import React from 'react';
import { 
  Bell, Bookmark, Sparkles, TrendingUp, TrendingDown, 
  Trash2, RefreshCw, Zap, AlertTriangle 
} from 'lucide-react';
import { TrendAlertItem } from '../../lib/seo-lab/types';

interface TrendMonitoringViewProps {
  watchlist: string[];
  alerts: TrendAlertItem[];
  onRemoveFromWatchlist: (keyword: string) => void;
  onSearchKeyword: (keyword: string) => void;
}

export default function TrendMonitoringView({
  watchlist,
  alerts,
  onRemoveFromWatchlist,
  onSearchKeyword
}: TrendMonitoringViewProps) {
  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* 1. Real-Time Trend Alerts Banner */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" /> Automated Trend Alerts & Momentum Triggers
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {alerts.length} Active Alerts
          </span>
        </div>

        {alerts.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center text-slate-400 font-mono text-xs">
            No active breakout or volatility alerts for your tracked keywords.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-2xl bg-[#0B1220] border border-white/[0.08] space-y-2 font-mono text-xs shadow-lg"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {alert.changeType === 'BREAKOUT' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        ⚡ BREAKOUT
                      </span>
                    )}
                    {alert.changeType === 'TREND_SURGE' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        ▲ SURGE
                      </span>
                    )}
                    {alert.changeType === 'TREND_DECLINE' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        ▼ DECLINE
                      </span>
                    )}
                    <h4 className="text-white font-bold">{alert.keyword}</h4>
                  </div>
                  <span className="text-amber-400 font-bold">
                    {alert.previousScore} → {alert.currentScore}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 font-sans leading-snug">
                  {alert.notes}
                </p>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => onSearchKeyword(alert.keyword)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    Mine Keyword Graph →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Tracked Keywords Watchlist */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-cyan-400" /> Saved Keyword Watchlist ({watchlist.length})
        </h3>

        {watchlist.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center text-slate-400 font-mono text-xs">
            Your watchlist is empty. Click the bookmark icon on any keyword card to track it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {watchlist.map((kw) => (
              <div
                key={kw}
                className="p-3 rounded-xl bg-[#0B1220]/80 border border-white/[0.08] hover:border-white/[0.08] flex items-center justify-between gap-2 font-mono text-xs transition-all"
              >
                <button
                  onClick={() => onSearchKeyword(kw)}
                  className="text-left font-bold text-white hover:text-cyan-300 truncate cursor-pointer"
                  title="Click to search keyword"
                >
                  {kw}
                </button>
                <button
                  onClick={() => onRemoveFromWatchlist(kw)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Remove from Watchlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
