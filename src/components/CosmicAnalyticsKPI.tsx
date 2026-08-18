import React from 'react';
import { motion } from 'motion/react';
import { Award, Zap, Activity, ShieldCheck, ArrowUpRight, TrendingUp } from 'lucide-react';
import { NumberTicker } from './magicui/number-ticker';

interface CosmicAnalyticsKPIProps {
  score: number;
  exaltedCount: number;
  ownSignCount: number;
  retrogradeCount: number;
}

export default function CosmicAnalyticsKPI({
  score,
  exaltedCount,
  ownSignCount,
  retrogradeCount,
}: CosmicAnalyticsKPIProps) {
  const kpis = [
    {
      title: 'Cosmic Alignment Score',
      value: score,
      suffix: '/100',
      change: '+4.2% today',
      icon: <Award className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-500/20 to-purple-500/10 border-amber-500/30',
      badge: 'High Resonance',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
    },
    {
      title: 'Dignified Planets',
      value: exaltedCount + ownSignCount,
      suffix: ' active',
      change: `${exaltedCount} Exalted • ${ownSignCount} Own Sign`,
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/20 to-cyan-500/10 border-emerald-500/30',
      badge: 'Strong Assets',
      badgeColor: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Retrograde Friction (Rx)',
      value: retrogradeCount,
      suffix: ' planets',
      change: retrogradeCount > 2 ? 'High Review Period' : 'Optimal Direct Speed',
      icon: <Activity className="w-5 h-5 text-rose-400" />,
      color: 'from-rose-500/20 to-indigo-500/10 border-rose-500/30',
      badge: retrogradeCount > 2 ? 'Review Focus' : 'Clear Velocity',
      badgeColor: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
    },
    {
      title: 'Executability & Karma',
      value: Math.min(99, Math.round(score * 1.05)),
      suffix: '%',
      change: '+6.8% momentum',
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
      badge: 'Solar Peak',
      badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 text-left">
      {kpis.map((kpi, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${kpi.color} border shadow-lg backdrop-blur-xl space-y-2 sm:space-y-3 relative overflow-hidden group`}
        >
          <div className="flex items-center justify-between">
            <div className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#0B1220] border border-white/10 shrink-0">
              {kpi.icon}
            </div>
            <span className={`text-[8.5px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border truncate max-w-[90px] ${kpi.badgeColor}`}>
              {kpi.badge}
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10.5px] sm:text-xs font-mono text-slate-400 block truncate">{kpi.title}</span>
            <div className="text-lg sm:text-2xl font-bold text-white font-mono flex items-baseline gap-1">
              <NumberTicker value={kpi.value} className="text-white" />
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400">{kpi.suffix}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-emerald-400 border-t border-white/10 pt-1.5 sm:pt-2 truncate">
            <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">{kpi.change}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
