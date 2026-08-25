import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Flame, Droplet, Wind, Sun, Gem, Copy, Check, 
  Volume2, ShieldCheck, Clock, Zap, Star
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniDailyVibeScoreProps {
  userProfile: UserProfile;
}

export default function OmniDailyVibeScore({ userProfile }: OmniDailyVibeScoreProps) {
  const [copiedMantra, setCopiedMantra] = useState(false);

  const seekerName = userProfile.name || 'Seeker';

  const dailyMantra = "Om Som Somaya Namaha — May lunar clarity and harmonious vitality illuminate all decisions today.";

  const handleCopyMantra = () => {
    navigator.clipboard.writeText(dailyMantra);
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0F182E] to-[#090E1A] border border-amber-400/30 p-5 sm:p-6 shadow-2xl space-y-5 text-left font-sans relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3.5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              Daily Cosmic Alignment & Lucky Metrics
            </h3>
            <p className="text-xs text-slate-400 font-mono">Personalized for {seekerName}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-xl border border-emerald-500/20 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Aura Score: 92/100 (Peak Vibe)</span>
        </div>
      </div>

      {/* 4 Lucky Attributes Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        {/* Lucky Color */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Auspicious Color</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
            <span className="text-xs font-bold text-white font-mono">Imperial Gold</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">Attracts solar clarity</span>
        </div>

        {/* Lucky Numbers */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Lucky Numbers</span>
          <div className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">3</span>
            <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">7</span>
            <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10">12</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">Jupiter resonant</span>
        </div>

        {/* Auspicious Hora */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Golden Hora Hour</span>
          <div className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>14:20 – 15:35</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">Venusian harmony window</span>
        </div>

        {/* Sacred Gemstone */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Harmonic Stone</span>
          <div className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1">
            <Gem className="w-3.5 h-3.5 text-emerald-400" />
            <span>Yellow Sapphire</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block">Strengthens Guru blessing</span>
        </div>
      </div>

      {/* Daily Affirmation / Mantra Strip */}
      <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400" /> Daily Astrological Mantra & Affirmation
          </span>
          <p className="text-xs text-slate-200 font-sans italic">
            "{dailyMantra}"
          </p>
        </div>

        <button
          onClick={handleCopyMantra}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer transition-colors"
        >
          {copiedMantra ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
          <span>{copiedMantra ? 'Copied!' : 'Copy Mantra'}</span>
        </button>
      </div>
    </div>
  );
}
