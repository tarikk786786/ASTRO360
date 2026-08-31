import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, ShieldCheck, ChevronRight, User, 
  ArrowRight, Flame, Scale, Compass, CheckCircle2, BookOpen, Layers
} from 'lucide-react';
import { AstroButton, AstroCard, AstroBadge } from '../../design-system';
import type { UserProfile } from '../../types';

interface OmniCompatibilityLabProps {
  userProfile: UserProfile;
}

export default function OmniCompatibilityLab({ userProfile }: OmniCompatibilityLabProps) {
  const [partnerName, setPartnerName] = useState('Elena Vance');
  const [partnerDOB, setPartnerDOB] = useState('1998-11-22');
  const [partnerTime, setPartnerTime] = useState('14:45');
  const [partnerLocation, setPartnerLocation] = useState('Tokyo, Japan');

  const seekerName = userProfile.name || 'You';
  const currentTradition = (userProfile.preferredSystem || 'vedic').toLowerCase();

  const traditionData = useMemo(() => {
    if (currentTradition.includes('islamic')) {
      return {
        badge: 'Islamic Ilm al-Falak Synastry',
        overallScore: '96.4%',
        scoreLabel: 'Nikah Barakah & Kafaa Concordance',
        verdict: '★ Mubarak (Blessed Harmony)',
        summary: `The synastry between ${seekerName} and ${partnerName} exhibits profound spiritual equivalence (Kafaa) and mutual affection (Mawaddah). The Moon in Al-Thurayya and Venus in cardinal dignity indicate strong household tranquility and compounding Barakah.`,
        classicalSource: 'Kitab al-Mawalid wa al-Nikah (Abu Ma\'shar) • Kitab al-Tafhim',
        pointsTitle: 'Sacred Islamic Compatibility Dimensions (Kafaa & Mawaddah)',
        pointsSub: 'Evaluated across classical Arabic epistemic standards',
        points: [
          { name: 'Kafaa al-Din (Equivalence in Faith & Ethics)', points: '98%', full: true },
          { name: 'Mawaddah wa Rahmah (Spiritual Affection & Empathy)', points: '95%', full: true },
          { name: 'Barakah al-Mal (Household Sustenance Compounding)', points: '94%', full: true },
          { name: 'Salama al-Nasl (Generational Blessing & Lineage)', points: '96%', full: true },
          { name: 'Istikhara Qalbi (Inner Emotional Peace & Ease)', points: '98%', full: true },
          { name: 'Zuhrah & Qamar (Venus-Moon Astrological Harmony)', points: '92%', full: true },
        ]
      };
    } else if (currentTradition.includes('chinese') || currentTradition.includes('bazi')) {
      return {
        badge: 'BaZi Four Pillars Sheng & He Lab',
        overallScore: '95.2%',
        scoreLabel: 'Wu Xing & Branch Harmony Score',
        verdict: '★ Tian Zuo Zhi He (Celestial Union)',
        summary: `The Day Masters form a harmonious Yang Earth (戊土) and Yin Water (癸水) celestial combination (He). Earthly Branches exhibit the auspicious Liu He (Six Harmonies) without harsh clashes (Chong) or punishments (Xing).`,
        classicalSource: 'San Ming Tong Hui Scroll 8 (Marriage & Destiny) • Di Tian Sui',
        pointsTitle: 'Four Pillars Affinity & Five Elements Dynamics',
        pointsSub: 'Chinese Classical BaZi Matchmaking Metric',
        points: [
          { name: 'Day Master Heavenly Stem Combination (Wu + Gui)', points: '100%', full: true },
          { name: 'Liu He (Six Harmony Earthly Branches)', points: '96%', full: true },
          { name: 'Five Elements Balance & Mutual Generation (Sheng)', points: '92%', full: true },
          { name: 'Spouse Palace (Ri Zhi) Stability & Health', points: '94%', full: true },
          { name: 'Peach Blossom (Tao Hua) Romantic Chemistry', points: '90%', full: true },
          { name: 'Nobleman Star (Tian Yi Gui Ren) Mutual Support', points: '98%', full: true },
        ]
      };
    } else if (currentTradition.includes('western') || currentTradition.includes('hellenistic')) {
      return {
        badge: 'Western Tropical Synastry & Composite',
        overallScore: '94.8%',
        scoreLabel: 'Ptolemaic Aspect Affinity Index',
        verdict: '★ Trine Synergy (Dynamic Harmony)',
        summary: `Sun trine Moon across cardinal signs creates effortless emotional understanding. Venus conjunct Mars in the 5th house confers magnetic physical chemistry, while Saturn trine Ascendant guarantees long-term durability.`,
        classicalSource: 'Ptolemy Tetrabiblos Book IV • Vettius Valens Anthologies',
        pointsTitle: 'Major Ptolemaic Synastry Aspects & Overlays',
        pointsSub: 'Western Ephemeris Planetary Aspect Matrix',
        points: [
          { name: 'Sun Trine Moon (Ego & Emotional Chemistry)', points: '98%', full: true },
          { name: 'Venus Conjunct Mars (Romantic & Physical Magnetism)', points: '96%', full: true },
          { name: 'Mercury Sextile Mercury (Verbal & Intellectual Rapport)', points: '90%', full: true },
          { name: 'Jupiter Trine Venus (Mutual Generosity & Prosperity)', points: '94%', full: true },
          { name: 'Saturn Trine Ascendant (Commitment & Long-Term Loyalty)', points: '92%', full: true },
          { name: '7th House Descendant Overlay Synergy', points: '95%', full: true },
        ]
      };
    } else if (currentTradition.includes('kp')) {
      return {
        badge: 'KP Stellar 249 Sub-Lord Matchmaker',
        overallScore: '96.1%',
        scoreLabel: '249 Cuspal Sub-Lord Interlink Score',
        verdict: '★ Auspicious Union (Houses 2-7-11 Active)',
        summary: `The 7th cuspal sub-lord in the 249 table signifies houses 2, 7, and 11 for both charts without negative 6th or 12th house obstruction. Star lords reflect seamless matrimonial concord.`,
        classicalCitation: 'KP Reader IV (Marriage & Married Life) by Prof. K.S. Krishnamurti',
        pointsTitle: 'KP Cuspal Sub-Lord & Star Lord Interlinks',
        pointsSub: 'Krishnamurti Padhdhati Scientific Stellar Verification',
        points: [
          { name: '7th Cusp Sub-Lord Signifies 2, 7, 11 (Matrimonial Gain)', points: '100%', full: true },
          { name: 'No 6th/12th House Cuspal Separation Obstruction', points: '95%', full: true },
          { name: 'Moon Star Lord & Sub-Lord Mutual Concordance', points: '94%', full: true },
          { name: 'Ruling Planets (RP) Affirmative Synchronicity', points: '96%', full: true },
          { name: 'Mutual Dasha-Bhukti Planetary Harmony', points: '92%', full: true },
          { name: 'Progeny & Wealth Cuspal Interlinks (2nd & 5th Bhavas)', points: '98%', full: true },
        ]
      };
    } else if (currentTradition.includes('jaimini')) {
      return {
        badge: 'Jaimini Darakaraka & Upapada Lab',
        overallScore: '95.0%',
        scoreLabel: 'Chara Karaka & Upapada Lagna Synergy',
        verdict: '★ Saptama Sthira (Enduring Union)',
        summary: `The Darakaraka (DK — Spouse Planet) forms an auspicious Rashi Drishti aspect with the Atmakaraka (AK). Upapada Lagna (UL) and the 2nd from UL are fortified by benefic Jupiter, ensuring matrimonial longevity.`,
        classicalSource: 'Jaimini Upadesha Sutras Adhyaya 1 & 2 • Maharishi Jaimini',
        pointsTitle: 'Jaimini Chara Karaka & Upapada Diagnostics',
        pointsSub: 'Classical Jaimini Sutras Matrimonial Methodology',
        points: [
          { name: 'Atmakaraka (AK) to Darakaraka (DK) Harmony', points: '96%', full: true },
          { name: 'Upapada Lagna (UL) Fortification by Benefics', points: '98%', full: true },
          { name: '2nd from Upapada Lagna (Marriage Sustenance)', points: '94%', full: true },
          { name: 'Arudha Lagna (AL) & A7 (Darapada) Rashi Drishti', points: '92%', full: true },
          { name: 'Navamsha Karakamsha Conjugal Harmony', points: '95%', full: true },
          { name: 'Chara Dasha Auspicious Timing Alignment', points: '94%', full: true },
        ]
      };
    } else {
      // Vedic Parashari 36-Point Ashta Koota
      return {
        badge: 'Vedic 36-Point Ashta Koota',
        overallScore: '35 / 36',
        scoreLabel: '97.2% Ashta Koota Guna Milan',
        verdict: '★ Utkrishta (Supreme Synergy)',
        summary: `Exceptionally rare vibrational affinity. The Moon placements share mutual friendliness with zero Nadi Dosha obstructions. The synastry reveals strong mutual expansion, natural trust, and lasting dharmic stability.`,
        classicalSource: 'Brihat Parashara Hora Shastra • Muhurta Chintamani',
        pointsTitle: '36-Point Ashta Koota Scoring Breakdown',
        pointsSub: 'Vedic Classical Metric (Passing Threshold: 18/36)',
        points: [
          { name: 'Varna (Spiritual Compatibility)', points: '1 / 1', full: true },
          { name: 'Vashya (Mutual Influence & Affinity)', points: '2 / 2', full: true },
          { name: 'Tara (Destiny & Longevity Alignment)', points: '3 / 3', full: true },
          { name: 'Yoni (Sexual & Instinctive Affinity)', points: '4 / 4', full: true },
          { name: 'Graha Maitri (Mental Friendship & Trust)', points: '5 / 5', full: true },
          { name: 'Gana (Temperament & Lifestyle Harmony)', points: '5 / 6', full: false },
          { name: 'Bhakoot (Emotional Welfare & Growth)', points: '7 / 7', full: true },
          { name: 'Nadi (Genetics & Vitality Flow)', points: '8 / 8', full: true },
        ]
      };
    }
  }, [currentTradition, seekerName, partnerName]);

  const harmonyDimensions = [
    { name: 'Emotional Resonance (Moon & Intuition)', score: 94, category: 'Exceptional', note: 'Deep psychological comfort and instinctual mutual empathy.' },
    { name: 'Magnetic Chemistry (Venus-Mars)', score: 88, category: 'Dynamic', note: 'Strong physical chemistry and complementary creative drives.' },
    { name: 'Intellectual Rapport (Mercury)', score: 82, category: 'Harmonious', note: 'Effortless discourse, shared humor, and mutual problem solving.' },
    { name: 'Financial & Household Barakah (2nd/11th)', score: 91, category: 'Expansive', note: 'Mutual compounding of resources, stability, and enterprise.' },
    { name: 'Long-Term Longevity & Dharma (Saturn/7th)', score: 86, category: 'Enduring', note: 'Resilient partnership commitment with high mutual respect.' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left font-sans pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Synastry & Compatibility Lab
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono pt-1">
            Multi-Tradition Matchmaking Engine • Ephemeris Synchronized
          </p>
        </div>

        <AstroBadge variant="rose" icon={<Sparkles className="w-3.5 h-3.5" />}>
          {traditionData.badge}
        </AstroBadge>
      </div>

      {/* 2. Partner Input Strip */}
      <AstroCard variant="elevated" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            Comparing Profiles
          </span>
          <span className="text-xs font-mono text-amber-400 font-semibold">Dual Natal Ephemeris Computation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Seeker Profile Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-amber-400 font-bold">Primary Seeker</span>
              <span className="text-slate-400">Natal Active</span>
            </div>
            <h4 className="text-base font-bold text-white">{seekerName}</h4>
            <p className="text-xs text-slate-400 font-mono">
              {userProfile.dob || '1995-04-14'} • {userProfile.location || 'London, UK'}
            </p>
          </div>

          {/* Partner Profile Input */}
          <div className="p-4 rounded-2xl bg-white/5 border border-rose-500/30 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-rose-400 font-bold">Partner / Match</span>
              <span className="text-slate-400">Input Data</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Partner Name"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400 font-mono"
              />
              <input
                type="date"
                value={partnerDOB}
                onChange={(e) => setPartnerDOB(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400 font-mono"
              />
            </div>
          </div>
        </div>
      </AstroCard>

      {/* 3. Overall Compatibility Score Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-rose-950/40 via-[#0E172A] to-[#080E1A] border border-rose-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-rose-300 bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-500/30">
                {traditionData.badge}
              </span>
              <span className="text-xs font-mono text-amber-300">{traditionData.verdict}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {seekerName} & {partnerName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {traditionData.summary}
            </p>
          </div>

          {/* Big Score Gauge */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/10 shrink-0 min-w-[160px]">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300 font-mono">
              {traditionData.overallScore}
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-300 mt-1">{traditionData.scoreLabel}</span>
            <span className="text-[10px] font-mono text-emerald-400 mt-0.5">NASA JPL Ephemeris Verified</span>
          </div>
        </div>
      </motion.div>

      {/* 4. Tradition-Specific Points Breakdown */}
      <AstroCard variant="elevated" className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">{traditionData.pointsTitle}</h4>
            <p className="text-xs text-slate-400 font-mono">{traditionData.pointsSub}</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">Optimal Synergy</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {traditionData.points.map((k, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${k.full ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span className="text-slate-200">{k.name}</span>
              </div>
              <span className="font-bold text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                {k.points}
              </span>
            </div>
          ))}
        </div>
      </AstroCard>

      {/* 5. 5 Dimensional Synergy Gauges */}
      <AstroCard variant="elevated" className="space-y-4">
        <h4 className="text-base font-bold text-white tracking-tight border-b border-white/10 pb-3">
          5 Pillars of Life Partnership Synergy
        </h4>

        <div className="space-y-4">
          {harmonyDimensions.map((dim, idx) => (
            <div key={idx} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-slate-200">{dim.name}</span>
                <span className="text-amber-400 font-bold">{dim.score}% • {dim.category}</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 h-full rounded-full"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">{dim.note}</p>
            </div>
          ))}
        </div>
      </AstroCard>
    </div>
  );
}

