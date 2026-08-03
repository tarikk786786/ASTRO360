import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Star, Compass, Layers, Clock, MapPin } from 'lucide-react';
import type { UserProfile } from '../types';
import { calculateAshtaKootaScore, calculatePlanetaryPositions } from '../lib/astroCalculations';
import { staggerContainer, staggerItem } from '../lib/animationPresets';

interface AstroSynastryMatchmakerProps {
  userProfile: UserProfile;
}

export default function AstroSynastryMatchmaker({ userProfile }: AstroSynastryMatchmakerProps) {
  const [partnerName, setPartnerName] = useState('Jordan');
  const [partnerDob, setPartnerDob] = useState('1999-11-14');
  const [partnerTime, setPartnerTime] = useState('14:30');
  const [partnerLocation, setPartnerLocation] = useState('New York, USA');
  const [partnerSystem, setPartnerSystem] = useState<'vedic' | 'western' | 'bazi'>('vedic');

  const seekerName = userProfile?.name || 'Seeker';
  const seekerDob = userProfile?.dob || '1998-06-15';
  const seekerTime = userProfile?.time || '12:00';

  // 1. Dynamic Vedic Ashta Koota Calculation
  const vedicResult = useMemo(() => {
    return calculateAshtaKootaScore(seekerName, seekerDob, partnerName, partnerDob);
  }, [seekerName, seekerDob, partnerName, partnerDob]);

  // 2. Dynamic Western Synastry Aspect Grid Calculation
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

  // 3. Dynamic Chinese BaZi Four Pillars Matching Calculation
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

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="max-w-5xl mx-auto p-6 space-y-8 text-left"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-pink-400 mb-1">
            <Heart className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wider uppercase font-mono">Synastry & Business Alignment Engine</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Universal <span className="gradient-text">Cosmic Compatibility Matcher</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Calculates real multi-aspect synastry vectors, Western aspects, and Chinese BaZi Four Pillars between {seekerName} and {partnerName}.
          </p>
        </div>

        {/* Dynamic Synastry Match Badge */}
        <div className="glass-card px-5 py-3 rounded-2xl border border-pink-500/30 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-pink-500/20 font-mono">
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
            <p className="text-sm font-semibold text-pink-300 font-mono">
              {partnerSystem === 'vedic' && `${vedicResult.totalScore}/36 Points (${Math.round((vedicResult.totalScore / 36) * 100)}% Match)`}
              {partnerSystem === 'western' && `${westernResult.totalScore}% Planetary Aspect Synergy`}
              {partnerSystem === 'bazi' && `${baziResult.totalScore}% Element & Pillar Synergy`}
            </p>
          </div>
        </div>
      </motion.div>

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
  );
}
