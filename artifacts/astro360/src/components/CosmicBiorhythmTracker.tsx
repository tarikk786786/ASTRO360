import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Heart, Brain, Eye, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';
import type { UserProfile } from '../types';

interface CosmicBiorhythmTrackerProps {
  userProfile?: UserProfile;
}

export default function CosmicBiorhythmTracker({ userProfile }: CosmicBiorhythmTrackerProps) {
  const dob = userProfile?.dob || '1995-05-15';

  const biorhythm = useMemo(() => {
    const birthDate = new Date(dob);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Biorhythm formulas: sin(2π * days / T) * 100
    const physical = Math.round(Math.sin((2 * Math.PI * days) / 23) * 50 + 50);
    const emotional = Math.round(Math.sin((2 * Math.PI * days) / 28) * 50 + 50);
    const intellectual = Math.round(Math.sin((2 * Math.PI * days) / 33) * 50 + 50);
    const intuitive = Math.round(Math.sin((2 * Math.PI * days) / 38) * 50 + 50);

    const overallScore = Math.round((physical + emotional + intellectual + intuitive) / 4);

    return { days, physical, emotional, intellectual, intuitive, overallScore };
  }, [dob]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-cyan-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" /> Biorhythm & Cosmic Energy Frequency Tracker
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Physical (23d), Emotional (28d), Intellectual (33d) & Intuitive (38d) Sine-Wave Telemetry
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            Overall Energy: {biorhythm.overallScore}%
          </span>
        </div>
      </div>

      {/* 4 BIORHYTHM BARS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        {/* PHYSICAL (23 DAYS) */}
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-red-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-400 font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-red-400" /> Physical Energy (23-Day Cycle)
            </span>
            <span className="text-white font-bold">{biorhythm.physical}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-full transition-all duration-500" style={{ width: `${biorhythm.physical}%` }} />
          </div>
          <span className="text-[10px] text-slate-400 block">Stamina, vitality, physical endurance & recovery capacity.</span>
        </div>

        {/* EMOTIONAL (28 DAYS) */}
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-pink-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-pink-400 font-bold flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-pink-400" /> Emotional Harmony (28-Day Cycle)
            </span>
            <span className="text-white font-bold">{biorhythm.emotional}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-600 to-rose-400 rounded-full transition-all duration-500" style={{ width: `${biorhythm.emotional}%` }} />
          </div>
          <span className="text-[10px] text-slate-400 block">Mood stability, empathy, relationships & emotional resilience.</span>
        </div>

        {/* INTELLECTUAL (33 DAYS) */}
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-cyan-400" /> Intellectual Focus (33-Day Cycle)
            </span>
            <span className="text-white font-bold">{biorhythm.intellectual}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 rounded-full transition-all duration-500" style={{ width: `${biorhythm.intellectual}%` }} />
          </div>
          <span className="text-[10px] text-slate-400 block">Analytical processing, memory retention & strategic planning.</span>
        </div>

        {/* INTUITIVE (38 DAYS) */}
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-purple-400 font-bold flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-purple-400" /> Intuitive Perception (38-Day Cycle)
            </span>
            <span className="text-white font-bold">{biorhythm.intuitive}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full transition-all duration-500" style={{ width: `${biorhythm.intuitive}%` }} />
          </div>
          <span className="text-[10px] text-slate-400 block">Subconscious awareness, gut instinct & spiritual receptivity.</span>
        </div>
      </div>
    </div>
  );
}
