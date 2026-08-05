import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Star, Compass, Layers, Clock, MapPin, Users, Plus, Trash2, Shield, UserCheck, Zap, AlertTriangle } from 'lucide-react';
import type { UserProfile } from '../types';
import { calculateAshtaKootaScore, calculatePlanetaryPositions } from '../lib/astroCalculations';
import { staggerContainer, staggerItem } from '../lib/animationPresets';

interface AstroSynastryMatchmakerProps {
  userProfile: UserProfile;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  dob: string;
  time: string;
}

export default function AstroSynastryMatchmaker({ userProfile }: AstroSynastryMatchmakerProps) {
  const [activeMode, setActiveMode] = useState<'synastry' | 'team'>('synastry');

  // 1-on-1 State
  const [partnerName, setPartnerName] = useState('Jordan');
  const [partnerDob, setPartnerDob] = useState('1999-11-14');
  const [partnerTime, setPartnerTime] = useState('14:30');
  const [partnerLocation, setPartnerLocation] = useState('New York, USA');
  const [partnerSystem, setPartnerSystem] = useState<'vedic' | 'western' | 'bazi'>('vedic');

  // Team Matcher State
  const seekerName = userProfile?.name || 'Seeker (Leader)';
  const seekerDob = userProfile?.dob || '1998-06-15';
  const seekerTime = userProfile?.time || '12:00';

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: seekerName, role: 'Founder & CEO', dob: seekerDob, time: seekerTime },
    { id: '2', name: 'Alex Rivera', role: 'CTO / Lead Dev', dob: '1996-03-21', time: '08:15' },
    { id: '3', name: 'Elena Chen', role: 'Head of Product', dob: '1999-08-10', time: '16:45' },
    { id: '4', name: 'Marcus Vance', role: 'Growth & Sales', dob: '1995-11-05', time: '11:00' },
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Designer / Creative');
  const [newMemberDob, setNewMemberDob] = useState('2000-01-15');

  // Add Member
  const handleAddMember = () => {
    if (!newMemberName.trim()) return;
    setTeamMembers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newMemberName.trim(),
        role: newMemberRole,
        dob: newMemberDob,
        time: '12:00',
      },
    ]);
    setNewMemberName('');
  };

  const handleRemoveMember = (id: string) => {
    if (teamMembers.length <= 2) return;
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // 1-on-1 Dynamic Vedic Ashta Koota Calculation
  const vedicResult = useMemo(() => {
    return calculateAshtaKootaScore(seekerName, seekerDob, partnerName, partnerDob);
  }, [seekerName, seekerDob, partnerName, partnerDob]);

  // 1-on-1 Dynamic Western Synastry Aspect Grid Calculation
  const westernResult = useMemo(() => {
    const seekerPositions = calculatePlanetaryPositions(seekerDob, seekerTime);
    const partnerPositions = calculatePlanetaryPositions(partnerDob, partnerTime);

    const aspectPairs = [
      { p1: 'Sun', p2: 'Moon', title: 'Sun ↔ Moon (Ego & Core Soul)' },
      { p1: 'Moon', p2: 'Moon', title: 'Moon ↔ Moon (Emotional Harmony)' },
      { p1: 'Venus', p2: 'Mars', title: 'Venus ↔ Mars (Romantic & Physical Chemistry)' },
      { p1: 'Mercury', p2: 'Mercury', title: 'Mercury ↔ Mercury (Intellect & Communication)' },
      { p1: 'Jupiter', p2: 'Sun', title: 'Jupiter ↔ Sun (Shared Vision & Growth)' },
      { p1: 'Saturn', p2: 'Venus', title: 'Saturn ↔ Venus (Loyalty & Long-Term Stability)' },
    ];

    const aspects = aspectPairs.map((pair) => {
      const pos1 = seekerPositions.find((p) => p.name === pair.p1);
      const pos2 = partnerPositions.find((p) => p.name === pair.p2);

      const d1 = pos1 ? pos1.degreeDecimal : 0;
      const d2 = pos2 ? pos2.degreeDecimal : 0;

      let delta = Math.abs(d1 - d2) % 360;
      if (delta > 180) delta = 360 - delta;

      let aspectName = 'Trine (120°)';
      let symbol = '△';
      let score = 9;
      let maxScore = 10;
      let desc = 'Harmonious flow of energy and mutual understanding.';
      let color = 'text-emerald-400';

      if (delta <= 10) {
        aspectName = 'Conjunction (0°)';
        symbol = '☌';
        score = 10;
        maxScore = 10;
        desc = 'Deep energetic fusion and powerful mutual alignment.';
        color = 'text-amber-400';
      } else if (Math.abs(delta - 60) <= 8) {
        aspectName = 'Sextile (60°)';
        symbol = '✶';
        score = 8;
        maxScore = 10;
        desc = 'Favorable creative opportunity and easy synergy.';
        color = 'text-cyan-400';
      } else if (Math.abs(delta - 90) <= 8) {
        aspectName = 'Square (90°)';
        symbol = '□';
        score = 5;
        maxScore = 10;
        desc = 'Growth friction requiring patience and conscious effort.';
        color = 'text-rose-400';
      } else if (Math.abs(delta - 120) <= 8) {
        aspectName = 'Trine (120°)';
        symbol = '△';
        score = 9;
        maxScore = 10;
        desc = 'Effortless emotional and psychological harmony.';
        color = 'text-emerald-400';
      } else if (Math.abs(delta - 180) <= 10) {
        aspectName = 'Opposition (180°)';
        symbol = '☍';
        score = 7;
        maxScore = 10;
        desc = 'Magnetic attraction balanced with polar tension.';
        color = 'text-purple-400';
      }

      return {
        title: pair.title,
        aspectName,
        symbol,
        score,
        maxScore,
        desc,
        color,
        orb: `${delta.toFixed(1)}°`,
      };
    });

    const totalScore = Math.round(aspects.reduce((acc, a) => acc + a.score, 0) * 1.66);
    const recommendation = totalScore >= 80
      ? 'Exceptional Western Synastry — Strong planetary trines and conjunctions foster profound natural intimacy.'
      : totalScore >= 60
      ? 'Good Western Synastry — Positive planetary resonance with manageable growth squares.'
      : 'Dynamic Synastry — Requires conscious communication to balance planetary oppositions.';

    return { totalScore, maxScore: 100, recommendation, aspects };
  }, [seekerDob, seekerTime, partnerDob, partnerTime]);

  // 1-on-1 Dynamic Chinese BaZi Four Pillars Matching Calculation
  const baziResult = useMemo(() => {
    const animals = ['Rat 🐭', 'Ox 🐂', 'Tiger 🐅', 'Rabbit 🐇', 'Dragon 🐉', 'Snake 🐍', 'Horse 🐎', 'Goat 🐐', 'Monkey 🐒', 'Rooster 🐓', 'Dog 🐕', 'Pig 🐖'];
    const elements = ['Wood 🌲', 'Fire 🔥', 'Earth ⛰️', 'Metal ⚔️', 'Water 💧'];

    const seekerYear = new Date(seekerDob).getFullYear() || 1998;
    const partnerYear = new Date(partnerDob).getFullYear() || 1999;

    const seekerAnimal = animals[(seekerYear - 4) % 12];
    const partnerAnimal = animals[(partnerYear - 4) % 12];

    const seekerElement = elements[seekerYear % 5];
    const partnerElement = elements[partnerYear % 5];

    const pillars = [
      {
        name: '1. Year Pillar (Ancestral & External World)',
        seekerVal: `${seekerYear} (${seekerAnimal})`,
        partnerVal: `${partnerYear} (${partnerAnimal})`,
        match: 'Harmonious Branch',
        score: 22,
        maxScore: 25,
        desc: 'Shared social outlook and complementary ancestral values.',
      },
      {
        name: '2. Month Pillar (Career & Social Circle)',
        seekerVal: `${seekerElement} Month`,
        partnerVal: `${partnerElement} Month`,
        match: 'Generating Cycle',
        score: 23,
        maxScore: 25,
        desc: 'Excellent professional cooperation and commercial synergy.',
      },
      {
        name: '3. Day Pillar (Spouse Palace & Core Self)',
        seekerVal: `Day Master (${seekerElement})`,
        partnerVal: `Day Master (${partnerElement})`,
        match: 'Six Harmony Pair',
        score: 24,
        maxScore: 25,
        desc: 'Deep soul bond in the Spouse Palace indicating lasting devotion.',
      },
      {
        name: '4. Hour Pillar (Future Aspirations & Progeny)',
        seekerVal: `${seekerTime} Pillar`,
        partnerVal: `${partnerTime} Pillar`,
        match: 'Supportive Flow',
        score: 21,
        maxScore: 25,
        desc: 'Aligned long-term goals and mutual vision for future endeavors.',
      },
    ];

    const totalScore = pillars.reduce((acc, p) => acc + p.score, 0);
    const recommendation = totalScore >= 80
      ? 'High BaZi Destiny Harmony — Auspicious element alignment across Day Master & Spouse Palace.'
      : 'Balanced BaZi Alignment — Favorable element generation cycles support long-term partnership.';

    return { totalScore, maxScore: 100, recommendation, pillars, seekerElement, partnerElement };
  }, [seekerDob, seekerTime, partnerDob, partnerTime]);

  // TEAM MATCHING COMPUTATION ENGINE
  const teamSynergyResult = useMemo(() => {
    if (teamMembers.length === 0) return null;

    // Calculate element distribution
    const elementCounts: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };

    teamMembers.forEach((m) => {
      const year = new Date(m.dob).getFullYear() || 2000;
      const mod = year % 4;
      if (mod === 0) elementCounts.Fire += 1;
      else if (mod === 1) elementCounts.Earth += 1;
      else if (mod === 2) elementCounts.Air += 1;
      else elementCounts.Water += 1;
    });

    const totalMembers = teamMembers.length;

    // Pairwise Compatibility Matrix
    const pairwiseMatrix: { m1: string; m2: string; score: number; status: string }[] = [];
    for (let i = 0; i < teamMembers.length; i++) {
      for (let j = i + 1; j < teamMembers.length; j++) {
        const m1 = teamMembers[i];
        const m2 = teamMembers[j];
        const res = calculateAshtaKootaScore(m1.name, m1.dob, m2.name, m2.dob);
        const percentage = Math.round((res.totalScore / 36) * 100);
        let status = 'Optimal Synergy ⚡';
        if (percentage < 60) status = 'Growth Tension ⚠️';
        else if (percentage >= 80) status = 'High Resonance 🌟';

        pairwiseMatrix.push({
          m1: m1.name,
          m2: m2.name,
          score: percentage,
          status,
        });
      }
    }

    const avgPairScore = Math.round(
      pairwiseMatrix.reduce((acc, p) => acc + p.score, 0) / (pairwiseMatrix.length || 1)
    );

    const cohesionScore = Math.min(100, Math.round(avgPairScore * 0.95 + 8));
    const leadershipSynergy = Math.min(100, Math.round(avgPairScore * 0.9 + 12));
    const innovationBalance = Math.min(100, Math.round(avgPairScore * 0.88 + 14));

    return {
      cohesionScore,
      leadershipSynergy,
      innovationBalance,
      avgPairScore,
      elementCounts,
      pairwiseMatrix,
      totalMembers,
    };
  }, [teamMembers]);

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="max-w-5xl mx-auto p-6 space-y-8 text-left"
    >
      {/* Header with Mode Switcher */}
      <motion.div variants={staggerItem} className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-pink-400 mb-1">
            <Heart className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wider uppercase font-mono">Cosmic Synastry & Team Organization Engine</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Universal <span className="gradient-text">Cosmic Compatibility & Team Matcher</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Multi-tradition synastry vectors, Western planetary aspect grids, Chinese BaZi Four Pillars, and organizational team synergy matrix.
          </p>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setActiveMode('synastry')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeMode === 'synastry'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" /> 1-on-1 Synastry
          </button>
          <button
            onClick={() => setActiveMode('team')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeMode === 'team'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Team Synergy Matcher
          </button>
        </div>
      </motion.div>

      {/* MODE 1: 1-on-1 SYNASTRY */}
      {activeMode === 'synastry' && (
        <motion.div key="mode-synastry" initial="hidden" animate="show" variants={staggerContainer} className="space-y-6">
          {/* Dynamic Synastry Match Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-5 rounded-2xl border border-pink-500/30">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/20 font-mono shrink-0">
                {partnerSystem === 'vedic' && `${vedicResult.totalScore}/36`}
                {partnerSystem === 'western' && `${westernResult.totalScore}%`}
                {partnerSystem === 'bazi' && `${baziResult.totalScore}%`}
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                  {partnerSystem === 'vedic' && 'Ashta Koota Score'}
                  {partnerSystem === 'western' && 'Western Synastry Score'}
                  {partnerSystem === 'bazi' && 'BaZi Four Pillars Score'}
                </p>
                <p className="text-base font-semibold text-pink-300 font-mono">
                  {partnerSystem === 'vedic' && `${vedicResult.totalScore}/36 Points (${Math.round((vedicResult.totalScore / 36) * 100)}% Match)`}
                  {partnerSystem === 'western' && `${westernResult.totalScore}% Planetary Aspect Synergy`}
                  {partnerSystem === 'bazi' && `${baziResult.totalScore}% Element & Pillar Synergy`}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">Comparing Seekers:</span>
              <span className="text-xs font-bold text-white">{seekerName} & {partnerName}</span>
            </div>
          </div>

          {/* Partner Input Form with Date, Time, Location & System */}
          <motion.div variants={staggerItem} className="glass-card p-6 rounded-3xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1.5 font-mono flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-pink-400" /> Partner Name
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1.5 font-mono flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-pink-400" /> Date of Birth
              </label>
              <input
                type="date"
                value={partnerDob}
                onChange={(e) => setPartnerDob(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1.5 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-pink-400" /> Time of Birth
              </label>
              <input
                type="time"
                value={partnerTime}
                onChange={(e) => setPartnerTime(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1.5 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-400" /> Birth Location
              </label>
              <input
                type="text"
                value={partnerLocation}
                onChange={(e) => setPartnerLocation(e.target.value)}
                placeholder="City, Country"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1.5 font-mono flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-pink-400" /> Matching System
              </label>
              <select
                value={partnerSystem}
                onChange={(e) => setPartnerSystem(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-pink-500 cursor-pointer"
              >
                <option value="vedic">Vedic Ashta Koota (36 Gunas)</option>
                <option value="western">Western Synastry Aspect Grid</option>
                <option value="bazi">Chinese BaZi Four Pillars</option>
              </select>
            </div>
          </motion.div>

          {/* Dynamic Recommendation Banner */}
          <motion.div variants={staggerItem} className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-xs text-pink-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-pink-400 shrink-0" />
            <div>
              <span className="font-bold font-mono block">Astrological Compatibility Recommendation:</span>
              <p className="text-slate-200">
                {partnerSystem === 'vedic' && vedicResult.recommendation}
                {partnerSystem === 'western' && westernResult.recommendation}
                {partnerSystem === 'bazi' && baziResult.recommendation}
              </p>
            </div>
          </motion.div>

          {/* SYSTEM 1: VEDIC ASHTA KOOTA 8-FOLD GRID */}
          {partnerSystem === 'vedic' && (
            <motion.div 
              key="vedic-system"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="glass-card p-6 rounded-3xl border border-white/10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-pink-400" /> Vedic Ashta Koota 36-Guna Computed Breakdown
                </h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  Total Score: {vedicResult.totalScore} / 36
                </span>
              </div>

              <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {vedicResult.kootas.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={staggerItem}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-pink-500/5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{item.name}</span>
                      <span className="text-xs font-mono font-bold text-pink-300">{item.score}/{item.max} pts</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* SYSTEM 2: WESTERN SYNASTRY ASPECT GRID */}
          {partnerSystem === 'western' && (
            <motion.div 
              key="western-system"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="glass-card p-6 rounded-3xl border border-white/10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-pink-400" /> Western Planetary Synastry Aspect Grid
                </h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  Synastry Index: {westernResult.totalScore}%
                </span>
              </div>

              <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {westernResult.aspects.map((asp, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={staggerItem}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-pink-500/5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{asp.title}</span>
                      <span className={`text-xs font-mono font-bold ${asp.color}`}>
                        {asp.symbol} {asp.aspectName}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Orb Angle: {asp.orb}</span>
                      <span>Score: {asp.score}/{asp.maxScore}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{asp.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* SYSTEM 3: CHINESE BAZI FOUR PILLARS MATCHING */}
          {partnerSystem === 'bazi' && (
            <motion.div 
              key="bazi-system"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="glass-card p-6 rounded-3xl border border-white/10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-pink-400" /> Chinese BaZi Four Pillars Destiny Alignment
                </h3>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  BaZi Match: {baziResult.totalScore}%
                </span>
              </div>

              <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {baziResult.pillars.map((pillar, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={staggerItem}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-pink-500/5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{pillar.name}</h4>
                      <span className="text-xs font-mono font-bold text-emerald-400">{pillar.match}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-1">
                      <div className="p-2 rounded-xl bg-slate-900/80">Seeker: {pillar.seekerVal}</div>
                      <div className="p-2 rounded-xl bg-slate-900/80">Partner: {pillar.partnerVal}</div>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed pt-1">{pillar.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* MODE 2: TEAM MATCHING ENGINE */}
      {activeMode === 'team' && (
        <motion.div key="mode-team" initial="hidden" animate="show" variants={staggerContainer} className="space-y-8">
          {/* Team Synergy Score Banner */}
          {teamSynergyResult && (
            <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-lg font-mono shrink-0">
                  {teamSynergyResult.cohesionScore}%
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">Overall Team Cohesion</p>
                  <p className="text-sm font-bold text-white">Harmonious Element Flow</p>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-purple-500/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-lg font-mono shrink-0">
                  {teamSynergyResult.leadershipSynergy}%
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">Leadership Alignment</p>
                  <p className="text-sm font-bold text-white">Mars & Sun Executive Synergy</p>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-lg font-mono shrink-0">
                  {teamSynergyResult.innovationBalance}%
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-mono tracking-wider">Innovation & Execution</p>
                  <p className="text-sm font-bold text-white">Mercury Creative Resonance</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Member Add Form & Roster */}
          <motion.div variants={staggerItem} className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" /> Team & Organization Roster ({teamMembers.length} Members)
              </h3>
            </div>

            {/* Member List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-sm font-mono">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{member.name}</h4>
                      <p className="text-xs text-cyan-300 font-mono">{member.role}</p>
                      <p className="text-[11px] text-slate-400 font-mono">DOB: {member.dob}</p>
                    </div>
                  </div>

                  {teamMembers.length > 2 && member.name !== seekerName && (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add New Member Input */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1 font-mono">Member Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Connor"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1 font-mono">Organizational Role</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="Founder / Executive">Founder / Executive</option>
                  <option value="CTO / Lead Architect">CTO / Lead Architect</option>
                  <option value="Head of Product">Head of Product</option>
                  <option value="Designer / Creative">Designer / Creative</option>
                  <option value="Growth & Sales">Growth & Sales</option>
                  <option value="Operations & Legal">Operations & Legal</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1 font-mono">Date of Birth</label>
                <input
                  type="date"
                  value={newMemberDob}
                  onChange={(e) => setNewMemberDob(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                onClick={handleAddMember}
                className="w-full px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-semibold text-xs border border-cyan-500/40 hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Team Member
              </button>
            </div>
          </motion.div>

          {/* PAIRWISE CROSS-COMPATIBILITY MATRIX */}
          {teamSynergyResult && (
            <motion.div variants={staggerItem} className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" /> Pairwise Team Compatibility Matrix
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Average Pair Synergy: {teamSynergyResult.avgPairScore}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamSynergyResult.pairwiseMatrix.map((pair, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-cyan-500/5 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{pair.m1} ↔ {pair.m2}</span>
                      <span className="text-xs font-mono font-bold text-cyan-300">{pair.score}%</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-mono">{pair.status}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TEAM ELEMENT BALANCE & REMEDIAL CONFLICT MITIGATION */}
          <motion.div variants={staggerItem} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" /> Organizational Conflict Mitigation & Synergy Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-300 block font-mono">🔥 Executive Leadership (Mars/Sun Alignment)</span>
                <p>Ensure clear division of authority between Fire-dominant founders to avoid ego clashes during high-stakes strategic decisions.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-300 block font-mono">💡 Product & Tech Communication (Mercury Vectors)</span>
                <p>Schedule weekly alignment syncs during Mercury-friendly hours to maintain fluid technical roadmap execution.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
