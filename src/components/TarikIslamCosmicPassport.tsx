import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, Sparkles, MapPin, Mail, Sun, Moon, Crown, Award, Compass, Star } from 'lucide-react';
import type { UserProfile } from '../types';

interface TarikIslamCosmicPassportProps {
  userProfile: UserProfile;
}

export default function TarikIslamCosmicPassport({ userProfile }: TarikIslamCosmicPassportProps) {
  const name = userProfile?.name || 'Tarik Islam';
  const email = userProfile?.email || 'princetarikislam@gmail.com';
  const location = userProfile?.location || 'Mecca, Saudi Arabia';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border border-amber-500/40 shadow-2xl space-y-4 text-left relative overflow-hidden"
    >
      {/* BACKGROUND GLOW ACCENT */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER TOP BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 p-[2px] shadow-lg shadow-amber-500/20 shrink-0">
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{name}</h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold flex items-center gap-1">
                <UserCheck className="w-3 h-3" /> VERIFIED SEEKER PROFILE
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono flex items-center gap-2 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" /> {email}
              <span className="text-slate-500">•</span>
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> {location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Primary Focus: Wealth & Purpose
          </span>
        </div>
      </div>

      {/* ASTROLOGICAL PROFILE SUMMARY METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold flex items-center gap-1">
            <Sun className="w-3 h-3 text-amber-400" /> Dominant Graha
          </span>
          <span className="text-amber-300 font-bold text-xs block">Sun ☉ (Surya Solar)</span>
          <span className="text-[9px] text-slate-400 block">Executive Authority</span>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold flex items-center gap-1">
            <Moon className="w-3 h-3 text-cyan-400" /> Sidereal Lagna
          </span>
          <span className="text-cyan-300 font-bold text-xs block">Leo ♌ (Magha Pada 1)</span>
          <span className="text-[9px] text-slate-400 block">Lahiri Ayanamsha 24.21°</span>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold flex items-center gap-1">
            <Award className="w-3 h-3 text-emerald-400" /> Active Dasha
          </span>
          <span className="text-emerald-300 font-bold text-xs block">Jupiter ♃ Mahadasha</span>
          <span className="text-[9px] text-slate-400 block">10th House Career Peak</span>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 block font-bold flex items-center gap-1">
            <Compass className="w-3 h-3 text-purple-400" /> Abjad Numerology
          </span>
          <span className="text-purple-300 font-bold text-xs block">Abjad al-Kabir</span>
          <span className="text-[9px] text-slate-400 block">Divine Protection Matrix</span>
        </div>
      </div>
    </motion.div>
  );
}
