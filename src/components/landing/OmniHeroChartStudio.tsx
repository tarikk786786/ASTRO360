import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, Heart, Briefcase, DollarSign, 
  Compass, ShieldCheck, Clock, CheckCircle2, User, Calendar, MapPin
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniHeroChartStudioProps {
  onCalculate: (data: Partial<UserProfile>) => void;
  userProfile?: UserProfile;
}

export default function OmniHeroChartStudio({ onCalculate, userProfile }: OmniHeroChartStudioProps) {
  const [activeTab, setActiveTab] = useState<'calculator' | 'today' | 'placements' | 'dasha'>('calculator');
  
  // Instant form state
  const [name, setName] = useState(userProfile?.name || '');
  const [dob, setDob] = useState(userProfile?.dob || '1998-06-15');
  const [time, setTime] = useState(userProfile?.time || '12:00');
  const [location, setLocation] = useState(userProfile?.location || 'London, UK');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      name: name.trim() || 'Seeker',
      dob,
      time,
      location
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0E172A] to-[#070B14] border-2 border-white/[0.12] shadow-2xl text-left space-y-4 relative overflow-hidden"
    >
      {/* Ambient background blur */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Top Bar Switcher */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center gap-1 bg-[#060911] p-1 rounded-xl border border-white/10 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'calculator' ? 'bg-white text-black font-semibold shadow-sm shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Instant Calculator
          </button>
          <button
            onClick={() => setActiveTab('today')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'today' ? 'bg-white text-black font-semibold shadow-sm shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Today's Theme
          </button>
          <button
            onClick={() => setActiveTab('placements')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'placements' ? 'bg-white text-black font-semibold shadow-sm shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Big 3
          </button>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold hidden sm:inline">
          100% Free
        </span>
      </div>

      {/* Tab 1: Instant Hero Birth Data Calculator */}
      {activeTab === 'calculator' && (
        <form onSubmit={handleSubmit} className="space-y-3 relative z-10 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Enter Birth Details for Instant Precision Chart
            </span>
            <p className="text-[11px] text-slate-300 font-sans">
              Calculates your Vedic D1/D9, Western Wheel, and 120-year Vimshottari Dasha in real time.
            </p>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name (e.g. Alexander)"
                className="w-full bg-[#060A12] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 sm:py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-amber-400 font-sans min-h-[42px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-[#060A12] border border-white/15 rounded-xl pl-9 pr-2 py-2.5 sm:py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-amber-400 font-mono min-h-[42px]"
                  required
                />
              </div>

              <div className="relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#060A12] border border-white/15 rounded-xl pl-9 pr-2 py-2.5 sm:py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-amber-400 font-mono min-h-[42px]"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Birth City (e.g. London, UK)"
                className="w-full bg-[#060A12] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 sm:py-2 text-sm sm:text-xs text-white focus:outline-none focus:border-amber-400 font-sans min-h-[42px]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm font-mono flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Calculate Full Natal Chart (100% Free)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-3 h-3" /> Private & Client-Encrypted
            </span>
            <span>No account or credit card needed</span>
          </div>
        </form>
      )}

      {/* Tab 2: Today's Theme Preview */}
      {activeTab === 'today' && (
        <div className="space-y-3 relative z-10">
          <div className="space-y-1">
            <span className="text-xs font-mono text-slate-400">Today's strongest astrological resonance</span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Personal Growth & Clarity
            </h3>
            <p className="text-xs text-slate-300 leading-snug">Mental drive and strategic clarity are elevated today.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-pink-500/25 space-y-0.5">
              <span className="text-pink-400 font-bold flex items-center gap-1"><Heart className="w-3 h-3" /> Love</span>
              <span className="text-white font-bold text-xs">Strong (94%)</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/5 border border-cyan-500/25 space-y-0.5">
              <span className="text-cyan-400 font-bold flex items-center gap-1"><Briefcase className="w-3 h-3" /> Career</span>
              <span className="text-white font-bold text-xs">Elevated (88%)</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/5 border border-emerald-500/25 space-y-0.5">
              <span className="text-emerald-400 font-bold flex items-center gap-1"><DollarSign className="w-3 h-3" /> Wealth</span>
              <span className="text-white font-bold text-xs">Expanding</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/5 border border-purple-500/25 space-y-0.5">
              <span className="text-purple-400 font-bold flex items-center gap-1"><Compass className="w-3 h-3" /> Vitality</span>
              <span className="text-white font-bold text-xs">Active</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('calculator')}
            className="w-full py-2.5 rounded-xl bg-white text-black font-semibold shadow-sm font-bold text-xs font-mono flex items-center justify-center gap-1 cursor-pointer shadow-md"
          >
            <span>Personalize for My Birth Chart →</span>
          </button>
        </div>
      )}

      {/* Tab 3: Big 3 Placements Preview */}
      {activeTab === 'placements' && (
        <div className="space-y-3 relative z-10 font-mono text-xs">
          <span className="text-[10px] uppercase text-amber-400 font-bold block">
            Core Archetypal Trinity
          </span>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/[0.08] text-center space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-bold block">Sun</span>
              <div className="text-base font-black text-white">Aries ♈</div>
              <span className="text-[10px] text-slate-400 block">Exalted Dignity</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/[0.08] text-center space-y-1">
              <span className="text-[10px] text-cyan-400 uppercase font-bold block">Moon</span>
              <div className="text-base font-black text-white">Scorpio ♏</div>
              <span className="text-[10px] text-slate-400 block">Anuradha</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-purple-400/30 text-center space-y-1">
              <span className="text-[10px] text-purple-400 uppercase font-bold block">Rising</span>
              <div className="text-base font-black text-white">Leo ♌</div>
              <span className="text-[10px] text-slate-400 block">Magha Pada 2</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('calculator')}
            className="w-full py-2.5 rounded-xl bg-white text-black font-semibold shadow-sm font-bold text-xs font-mono flex items-center justify-center gap-1 cursor-pointer shadow-md"
          >
            <span>Calculate My Big 3 (Free) →</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}
