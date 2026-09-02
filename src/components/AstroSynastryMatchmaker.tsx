import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Heart, Star, Compass, Layers, Clock, MapPin, Users, Plus, Trash2, 
  Shield, UserCheck, Zap, AlertTriangle, Globe, Download, Info, CheckCircle2
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculateAshtaKootaScore, calculatePlanetaryPositions } from '../lib/astroCalculations';
import { staggerContainer, staggerItem } from '../lib/animationPresets';
import { exportUniversalPdf } from '../lib/pdfReportEngine';

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
  const [matchingSystem, setMatchingSystem] = useState<'vedic' | 'western' | 'bazi' | 'islamic' | 'kabbalah'>('vedic');

  // 1-on-1 State
  const seekerName = userProfile?.name || 'Tarik Islam';
  const seekerDob = userProfile?.dob || '1998-06-15';
  const seekerTime = userProfile?.time || '12:00';

  const [partnerName, setPartnerName] = useState('Jordan');
  const [partnerDob, setPartnerDob] = useState('1999-11-14');
  const [partnerTime, setPartnerTime] = useState('14:30');
  const [partnerLocation, setPartnerLocation] = useState('New York, USA');

  // Team Matcher State
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

  // 🕉️ 1. VEDIC ASHTA KOOTA (36 GUNAS)
  const vedicResult = useMemo(() => {
    return calculateAshtaKootaScore(seekerName, seekerDob, partnerName, partnerDob);
  }, [seekerName, seekerDob, partnerName, partnerDob]);

  // 🔮 2. WESTERN PLANETARY SYNASTRY
  const westernResult = useMemo(() => {
    const seekerPositions = calculatePlanetaryPositions(seekerDob, seekerTime);
    const partnerPositions = calculatePlanetaryPositions(partnerDob, partnerTime);

    const aspectPairs = [
      { p1: 'Sun', p2: 'Moon', title: 'Sun ↔ Moon (Ego & Core Soul Harmony)' },
      { p1: 'Moon', p2: 'Moon', title: 'Moon ↔ Moon (Emotional Instinct Synergy)' },
      { p1: 'Venus', p2: 'Mars', title: 'Venus ↔ Mars (Romantic & Physical Chemistry)' },
      { p1: 'Mercury', p2: 'Mercury', title: 'Mercury ↔ Mercury (Intellect & Communication)' },
      { p1: 'Jupiter', p2: 'Sun', title: 'Jupiter ↔ Sun (Shared Vision & Spiritual Growth)' },
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
        desc = 'Deep energetic fusion and powerful mutual alignment.';
        color = 'text-amber-400';
      } else if (Math.abs(delta - 60) <= 8) {
        aspectName = 'Sextile (60°)';
        symbol = '✶';
        score = 8;
        desc = 'Favorable creative opportunity and easy synergy.';
        color = 'text-cyan-400';
      } else if (Math.abs(delta - 90) <= 8) {
        aspectName = 'Square (90°)';
        symbol = '□';
        score = 5;
        desc = 'Growth friction requiring patience and conscious effort.';
        color = 'text-rose-400';
      } else if (Math.abs(delta - 120) <= 8) {
        aspectName = 'Trine (120°)';
        symbol = '△';
        score = 9;
        desc = 'Effortless emotional and psychological harmony.';
        color = 'text-emerald-400';
      } else if (Math.abs(delta - 180) <= 10) {
        aspectName = 'Opposition (180°)';
        symbol = '☍';
        score = 7;
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
        orb: `${Number(delta ?? 0).toFixed(1)}°`,
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

  // ☯️ 3. CHINESE BAZI FOUR PILLARS
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
        name: '1. Year Pillar (Ancestral & World View)',
        seekerVal: `${seekerYear} (${seekerAnimal})`,
        partnerVal: `${partnerYear} (${partnerAnimal})`,
        match: 'Harmonious Branch',
        score: 22,
        desc: 'Shared social outlook and complementary ancestral values.',
      },
      {
        name: '2. Month Pillar (Career & Social Circle)',
        seekerVal: `${seekerElement} Month`,
        partnerVal: `${partnerElement} Month`,
        match: 'Generating Cycle',
        score: 23,
        desc: 'Excellent professional cooperation and commercial synergy.',
      },
      {
        name: '3. Day Pillar (Spouse Palace & Core Self)',
        seekerVal: `Day Master (${seekerElement})`,
        partnerVal: `Day Master (${partnerElement})`,
        match: 'Six Harmony Pair',
        score: 24,
        desc: 'Deep soul bond in the Spouse Palace indicating lasting devotion.',
      },
      {
        name: '4. Hour Pillar (Future Aspirations & Progeny)',
        seekerVal: `${seekerTime} Pillar`,
        partnerVal: `${partnerTime} Pillar`,
        match: 'Supportive Flow',
        score: 21,
        desc: 'Aligned long-term goals and mutual vision for future endeavors.',
      },
    ];

    const totalScore = pillars.reduce((acc, p) => acc + p.score, 0);
    const recommendation = totalScore >= 80
      ? 'High BaZi Destiny Harmony — Auspicious element alignment across Day Master & Spouse Palace.'
      : 'Balanced BaZi Alignment — Favorable element generation cycles support long-term partnership.';

    return { totalScore, maxScore: 100, recommendation, pillars };
  }, [seekerDob, seekerTime, partnerDob, partnerTime]);

  // 🕌 4. ISLAMIC SUNNAH & VALUES ALIGNMENT
  const islamicResult = useMemo(() => {
    const totalScore = 93;
    const items = [
      { name: '1. Shared Spiritual Values & Intention (Niyyah)', score: '96%', status: 'High Barakah Alignment', desc: 'Mutual devotion to ethical conduct, charity (Sadaqah), and family honor.' },
      { name: '2. Emotional Compassion (Mawaddah wa Rahmah)', score: '94%', status: 'Deep Mutual Mercy', desc: 'Inspired by Surah Ar-Rum 30:21 — deep tenderness, forgiveness, and emotional safety.' },
      { name: '3. Consultation & Mutual Decision (Shura)', score: '91%', status: 'Balanced Consultation', desc: 'Both partners honor respectful dialogue and shared decision making.' },
      { name: '4. Financial Stewardship & Trust (Amanah)', score: '92%', status: 'Ethical Financial Flow', desc: 'Clean, Halal earnings and mutual agreement on financial responsibility.' }
    ];
    return { totalScore, items, recommendation: 'Auspicious Islamic Compatibility — High Barakah potential rooted in mutual respect (Mawaddah wa Rahmah).' };
  }, []);

  // ✡️ 5. KABBALAH SEPHIROT PATH HARMONY
  const kabbalahResult = useMemo(() => {
    const totalScore = 91;
    const items = [
      { name: '1. Tiphereth Center (Heart & Soul Beauty)', match: 'Radiant Balance', desc: 'Harmonious soul reflection in the central Tiphereth energy sphere.' },
      { name: '2. Chesed ↔ Gevurah Balance', match: 'Mercy & Strength Fusion', desc: 'Generous lovingkindness balanced with righteous discipline.' },
      { name: '3. Chokhmah & Binah Synergy', match: 'Wisdom & Structure Synthesis', desc: 'Creative vision pairs seamlessly with practical organization.' }
    ];
    return { totalScore, items, recommendation: 'High Kabbalistic Path Resonance — Soul energies connect along the central pillar of balance.' };
  }, []);

  // 👥 TEAM SYNERGY MATRIX ENGINE
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
      totalMembers: teamMembers.length,
    };
  }, [teamMembers]);

  // PDF Export Function for Compatibility / Team Report
  const handleExportPdf = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ASTRO360 Compatibility & Team Matrix Report</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; }
            .h { border-bottom: 3px double #ec4899; padding-bottom: 16px; margin-bottom: 24px; }
            .title { font-size: 24px; font-weight: 800; color: #be185d; }
            .card { border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; background: #f8fafc; margin-bottom: 16px; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .footer { text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="h">
            <div class="title">ASTRO360 COSMIC COMPATIBILITY & TEAM MATRIX REPORT</div>
            <div>Mode: ${activeMode === 'synastry' ? `1-on-1 Synastry (${seekerName} & ${partnerName})` : `Team Organizational Matrix (${teamMembers.length} Members)`}</div>
          </div>

          ${activeMode === 'synastry' ? `
            <div class="card" style="background: #fdf2f8; border-color: #fbcfe8;">
              <h3 style="color: #9d174d; margin: 0 0 8px 0;">Compatibility Summary (${matchingSystem.toUpperCase()})</h3>
              <p><strong>Overall Synergy Score:</strong> ${
                matchingSystem === 'vedic' ? `${vedicResult.totalScore}/36 (${Math.round((vedicResult.totalScore/36)*100)}%)` :
                matchingSystem === 'western' ? `${westernResult.totalScore}%` :
                matchingSystem === 'bazi' ? `${baziResult.totalScore}%` :
                matchingSystem === 'islamic' ? `${islamicResult.totalScore}%` : `${kabbalahResult.totalScore}%`
              }</p>
              <p><strong>Recommendation:</strong> ${
                matchingSystem === 'vedic' ? vedicResult.recommendation :
                matchingSystem === 'western' ? westernResult.recommendation :
                matchingSystem === 'bazi' ? baziResult.recommendation :
                matchingSystem === 'islamic' ? islamicResult.recommendation : kabbalahResult.recommendation
              }</p>
            </div>
          ` : `
            <div class="card">
              <h3>Team Organizational Metrics</h3>
              <p>Overall Cohesion: <strong>${teamSynergyResult?.cohesionScore}%</strong> | Leadership Alignment: <strong>${teamSynergyResult?.leadershipSynergy}%</strong></p>
              <h4>Pairwise Matrix</h4>
              <div class="grid">
                ${teamSynergyResult?.pairwiseMatrix.map(p => `
                  <div style="background:#fff; border:1px solid #cbd5e1; padding:10px; border-radius:8px;">
                    <strong>${p.m1} ↔ ${p.m2}:</strong> ${p.score}% (${p.status})
                  </div>
                `).join('')}
              </div>
            </div>
          `}

          <div class="footer">
            ASTRO360 Universal Compatibility Engine · ${new Date().toLocaleDateString()}
          </div>
        </body>
      </html>
    `;
    exportUniversalPdf(htmlContent, `ASTRO360_Compatibility_${activeMode}`);
  };

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 text-left">
      {/* HEADER WITH MODE SELECTOR & EXPORT BUTTON */}
      <motion.div variants={staggerItem} className="glass-card p-6 sm:p-8 rounded-3xl border border-pink-500/30 relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-pink-400 mb-2">
              <Heart className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Universal Synastry & Team Matcher</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Cosmic Compatibility & <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Team Synergy Engine</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Multi-tradition 1-on-1 synastry & multi-member organizational matcher across 5 world astrology systems: Vedic Gunas, Western Aspects, BaZi Four Pillars, Islamic Barakah Alignment, and Kabbalah Tree of Life.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Mode Selector Buttons */}
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveMode('synastry')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  activeMode === 'synastry'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4" /> 1-on-1 Synastry
              </button>
              <button
                onClick={() => setActiveMode('team')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  activeMode === 'team'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" /> Team Synergy
              </button>
            </div>

            <button
              onClick={handleExportPdf}
              className="px-4 py-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-white/[0.12] hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Report (PDF)
            </button>
          </div>
        </div>

        {/* 🌐 SYSTEM SELECTOR TABS (FOR 1-ON-1 MODE) */}
        {activeMode === 'synastry' && (
          <div className="space-y-2 pt-4 border-t border-white/10 relative z-10">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-pink-400" /> Select Compatibility Astrology System:
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'vedic', label: '🕉️ Vedic Ashta Koota (36 Gunas)' },
                { id: 'western', label: '🔮 Western Aspect Grid' },
                { id: 'bazi', label: '☯️ Chinese BaZi Four Pillars' },
                { id: 'islamic', label: '🕌 Islamic Sunnah & Barakah' },
                { id: 'kabbalah', label: '✡️ Kabbalah Path Harmony' },
              ].map((sys) => (
                <button
                  key={sys.id}
                  onClick={() => setMatchingSystem(sys.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    matchingSystem === sys.id
                      ? 'bg-pink-500/25 text-pink-200 border border-pink-500/50 shadow-md shadow-pink-500/10'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {sys.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* MODE 1: 1-ON-1 SYNASTRY */}
      {
        activeMode === 'synastry' && (
          <motion.div key="mode-synastry" initial="hidden" animate="show" variants={staggerContainer} className="space-y-6">
            {/* Dynamic Synastry Match Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-pink-500/30">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/20 font-mono shrink-0">
                  {matchingSystem === 'vedic' && `${vedicResult.totalScore}/36`}
                  {matchingSystem === 'western' && `${westernResult.totalScore}%`}
                  {matchingSystem === 'bazi' && `${baziResult.totalScore}%`}
                  {matchingSystem === 'islamic' && `${islamicResult.totalScore}%`}
                  {matchingSystem === 'kabbalah' && `${kabbalahResult.totalScore}%`}
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                    {matchingSystem === 'vedic' && 'Vedic Ashta Koota Score'}
                    {matchingSystem === 'western' && 'Western Synastry Score'}
                    {matchingSystem === 'bazi' && 'BaZi Four Pillars Score'}
                    {matchingSystem === 'islamic' && 'Islamic Barakah Alignment'}
                    {matchingSystem === 'kabbalah' && 'Kabbalah Sephirot Harmony'}
                  </p>
                  <p className="text-base font-bold text-pink-300 font-mono">
                    {matchingSystem === 'vedic' && `${vedicResult.totalScore}/36 Points (${Math.round((vedicResult.totalScore / 36) * 100)}% Match)`}
                    {matchingSystem === 'western' && `${westernResult.totalScore}% Aspect Synergy`}
                    {matchingSystem === 'bazi' && `${baziResult.totalScore}% Element & Spouse Palace Synergy`}
                    {matchingSystem === 'islamic' && `${islamicResult.totalScore}% Sunnah & Values Alignment`}
                    {matchingSystem === 'kabbalah' && `${kabbalahResult.totalScore}% Tree of Life Path Harmony`}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block">Seeker & Partner:</span>
                <span className="text-sm font-bold text-white">{seekerName} & {partnerName}</span>
              </div>
            </div>

            {/* Partner Input Form with Date, Time, Location */}
            <motion.div variants={staggerItem} className="glass-card p-6 rounded-3xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-1.5 font-mono flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-pink-400" /> Partner Name
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-pink-500"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-pink-500"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-pink-500"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
            </motion.div>

            {/* Dynamic Recommendation Banner */}
            <motion.div variants={staggerItem} className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-xs text-pink-200 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-pink-400 shrink-0" />
              <div>
                <span className="font-bold font-mono block">Astrological Compatibility Recommendation:</span>
                <p className="text-slate-200">
                  {matchingSystem === 'vedic' && vedicResult.recommendation}
                  {matchingSystem === 'western' && westernResult.recommendation}
                  {matchingSystem === 'bazi' && baziResult.recommendation}
                  {matchingSystem === 'islamic' && islamicResult.recommendation}
                  {matchingSystem === 'kabbalah' && kabbalahResult.recommendation}
                </p>
              </div>
            </motion.div>

            {/* SYSTEM 1: VEDIC ASHTA KOOTA 8-FOLD GRID */}
            {matchingSystem === 'vedic' && (
              <motion.div key="vedic-system" initial="hidden" animate="show" variants={staggerContainer} className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
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
                    <motion.div key={idx} variants={staggerItem} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-pink-500/5 transition-all">
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
            {matchingSystem === 'western' && (
              <motion.div key="western-system" initial="hidden" animate="show" variants={staggerContainer} className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
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
                    <motion.div key={idx} variants={staggerItem} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-pink-500/5 transition-all">
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

            {/* SYSTEM 3: CHINESE BAZI FOUR PILLARS */}
            {matchingSystem === 'bazi' && (
              <motion.div key="bazi-system" initial="hidden" animate="show" variants={staggerContainer} className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
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
                    <motion.div key={idx} variants={staggerItem} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-pink-500/5 transition-all">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{pillar.name}</h4>
                        <span className="text-xs font-mono font-bold text-emerald-400">{pillar.match}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-1">
                        <div className="p-2 rounded-xl bg-slate-950">Seeker: {pillar.seekerVal}</div>
                        <div className="p-2 rounded-xl bg-slate-950">Partner: {pillar.partnerVal}</div>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed pt-1">{pillar.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* SYSTEM 4: ISLAMIC SUNNAH & VALUES */}
            {matchingSystem === 'islamic' && (
              <motion.div key="islamic-system" initial="hidden" animate="show" variants={staggerContainer} className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    🕌 Authentic Sunnah Values & Mawaddah Alignment
                  </h3>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Barakah Index: {islamicResult.totalScore}%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {islamicResult.items.map((it, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-emerald-950/30 border border-white/[0.08] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{it.name}</span>
                        <span className="text-xs font-mono font-bold text-emerald-300">{it.score}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{it.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* SYSTEM 5: KABBALAH SEPHIROT HARMONY */}
            {matchingSystem === 'kabbalah' && (
              <motion.div key="kabbalah-system" initial="hidden" animate="show" variants={staggerContainer} className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    ✡️ Kabbalah Tree of Life Path Resonance
                  </h3>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    Sephirot Match: {kabbalahResult.totalScore}%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {kabbalahResult.items.map((it, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{it.name}</span>
                        <span className="text-xs font-mono font-bold text-purple-300">{it.match}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{it.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )
      }

      {/* MODE 2: TEAM MATCHING ENGINE */}
      {
        activeMode === 'team' && (
          <motion.div key="mode-team" initial="hidden" animate="show" variants={staggerContainer} className="space-y-8">
            {/* Team Synergy Score Banner */}
            {teamSynergyResult && (
              <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card p-5 rounded-2xl border border-white/[0.08] flex items-center gap-4">
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

                <div className="glass-card p-5 rounded-2xl border border-white/[0.08] flex items-center gap-4">
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
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
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
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1 font-mono">Organizational Role</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
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
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  onClick={handleAddMember}
                  className="w-full px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-semibold text-xs border border-cyan-500/40 hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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

            {/* MULTI-RELIGIOUS TEAM HARMONY ADVISOR */}
            <motion.div variants={staggerItem} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" /> Multi-Religious Organizational Harmony & Conflict Mitigation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-white/[0.08] space-y-1">
                  <span className="font-bold text-emerald-300 block font-mono">🕌 Islamic Shura & Musharakah</span>
                  <p>Institute mutual consultation (Shura) before strategic pivots. Ensure profit-loss contracts honor equity and trust (Amanah).</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-white/[0.08] space-y-1">
                  <span className="font-bold text-amber-300 block font-mono">🕉️ Vedic Karma & Dharma Alignment</span>
                  <p>Balance Fire (Leadership) and Air (Product/Tech) team members to ensure no individual experiences burn-out or unaddressed friction.</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1">
                  <span className="font-bold text-purple-300 block font-mono">🔮 Western DiSC & Synastry Flow</span>
                  <p>Pair High-Vision (Sun/Jupiter) founders with High-Execution (Saturn/Mercury) managers for optimal operational velocity.</p>
                </div>
                <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 space-y-1">
                  <span className="font-bold text-red-300 block font-mono">☯️ Chinese Wu Xing Element Equilibrium</span>
                  <p>Balance Water (Strategy), Wood (Growth), Fire (Marketing), Earth (Operations), and Metal (Finance) across all core roles.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )
      }
    </motion.div >
  );
}
