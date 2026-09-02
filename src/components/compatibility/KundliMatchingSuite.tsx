import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Flame, 
  Layers, 
  Star, 
  RefreshCw, 
  Share2, 
  CheckCircle2, 
  Info,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import { calculateAshtaKootaScore } from '../../lib/astroCalculations';
import { UserProfile } from '../../types';

interface KundliMatchingSuiteProps {
  userProfile?: UserProfile;
  onNavigateToTab?: (tab: string) => void;
}

export default function KundliMatchingSuite({ userProfile }: KundliMatchingSuiteProps) {
  const [partner1Name, setPartner1Name] = useState(userProfile?.name || 'Partner 1');
  const [partner1Dob, setPartner1Dob] = useState(userProfile?.dob || '1998-06-15');
  const [partner1Time, setPartner1Time] = useState(userProfile?.time || '12:00');

  const [partner2Name, setPartner2Name] = useState('Partner 2');
  const [partner2Dob, setPartner2Dob] = useState('1999-09-21');
  const [partner2Time, setPartner2Time] = useState('14:30');

  const matchData = useMemo(() => {
    return calculateAshtaKootaScore(partner1Name, partner1Dob, partner2Name, partner2Dob);
  }, [partner1Name, partner1Dob, partner2Name, partner2Dob]);

  const scorePercentage = Math.round((matchData.totalScore / matchData.maxScore) * 100);

  // Category dimension calculations derived from kootas
  const emotionalScore = Math.round(((matchData.kootas[4].score + matchData.kootas[6].score) / 12) * 100);
  const physicalScore = Math.round(((matchData.kootas[1].score + matchData.kootas[3].score) / 6) * 100);
  const spiritualScore = Math.round(((matchData.kootas[0].score + matchData.kootas[7].score) / 9) * 100);
  const destinyScore = Math.round(((matchData.kootas[2].score + matchData.kootas[5].score) / 9) * 100);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border border-rose-500/30 relative overflow-hidden">
        
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <span>Classical Vedic Ashta Koota 36-Guna Synthesis</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Vedic Kundli Matching & Synastry Heatmap
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            High-precision astronomical compatibility calculation based on lunar nakshatras, 
            Gana temperament balance, Yoni animal archetypes, and Nadi genetic resonance.
          </p>
        </div>
      </div>

      {/* Dual Partner Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Partner 1 Card */}
        <div className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-mono text-xs uppercase tracking-wider">
            <User className="w-4 h-4" /> Partner 1 (Self)
          </div>
          <div className="space-y-3 font-sans text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={partner1Name}
                onChange={(e) => setPartner1Name(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#070D18] border border-white/10 text-white font-medium focus:border-amber-400 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={partner1Dob}
                  onChange={(e) => setPartner1Dob(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D18] border border-white/10 text-white font-medium focus:border-amber-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Birth Time</label>
                <input
                  type="time"
                  value={partner1Time}
                  onChange={(e) => setPartner1Time(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D18] border border-white/10 text-white font-medium focus:border-amber-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Partner 2 Card */}
        <div className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold font-mono text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4" /> Partner 2 (Prospective Partner)
          </div>
          <div className="space-y-3 font-sans text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={partner2Name}
                onChange={(e) => setPartner2Name(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#070D18] border border-white/10 text-white font-medium focus:border-rose-400 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={partner2Dob}
                  onChange={(e) => setPartner2Dob(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D18] border border-white/10 text-white font-medium focus:border-rose-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Birth Time</label>
                <input
                  type="time"
                  value={partner2Time}
                  onChange={(e) => setPartner2Time(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070D18] border border-white/10 text-white font-medium focus:border-rose-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Score & Recommendation Card */}
      <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Big Score Dial */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#070D18] border border-white/5 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Total Compatibility Score</span>
          <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 tracking-tight my-2">
            {matchData.totalScore} <span className="text-2xl font-bold text-slate-500">/ 36</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
            matchData.totalScore >= 28 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
              : matchData.totalScore >= 18 
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
              : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
          }`}>
            {matchData.totalScore >= 28 ? '🌟 Excellent Match' : matchData.totalScore >= 18 ? '⚡ Good Potential' : '⚠️ Requires Remedial Balance'}
          </span>
        </div>

        {/* Verdict & 4-Pillar Bars */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Vedic Astrological Verdict</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {matchData.recommendation}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#070D18] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block">Emotional Bonding</span>
              <div className="text-base font-bold text-cyan-400">{emotionalScore}%</div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: `${emotionalScore}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#070D18] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block">Physical Attraction</span>
              <div className="text-base font-bold text-rose-400">{physicalScore}%</div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-400" style={{ width: `${physicalScore}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#070D18] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block">Spiritual Health</span>
              <div className="text-base font-bold text-emerald-400">{spiritualScore}%</div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: `${spiritualScore}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#070D18] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 block">Destiny & Prosperity</span>
              <div className="text-base font-bold text-amber-400">{destinyScore}%</div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: `${destinyScore}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete 8 Ashta Kootas Breakdown Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" /> Complete 8-Koota Breakdown (Brihat Parashara Hora Shastra)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {matchData.kootas.map((koota) => {
            const isMax = koota.score === koota.max;
            return (
              <div 
                key={koota.name}
                className="p-4 rounded-2xl bg-[#090E17] border border-white/10 hover:border-white/20 transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-white truncate">{koota.name}</span>
                    <span className={`font-bold ${isMax ? 'text-emerald-400' : koota.score > 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {koota.score} / {koota.max}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {koota.desc}
                  </p>
                </div>

                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${isMax ? 'bg-emerald-400' : koota.score > 0 ? 'bg-amber-400' : 'bg-rose-400'}`}
                    style={{ width: `${(koota.score / koota.max) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
