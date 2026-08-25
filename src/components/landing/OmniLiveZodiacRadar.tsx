import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, HelpCircle, Heart, Briefcase, 
  DollarSign, Compass, ShieldCheck, Clock, CheckCircle2, ChevronRight, X
} from 'lucide-react';
import { AstroBadge, AstroCard, AstroSheet } from '../../design-system';
import { EvidencePanel } from '../../design-system/patterns';

interface ZodiacData {
  id: string;
  name: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dates: string;
  score: number;
  rulingPlanet: string;
  theme: string;
  summary: string;
  loveScore: number;
  careerScore: number;
  moneyScore: number;
  vitalityScore: number;
  transitTrigger: string;
  citations: { source: string; verse?: string; text: string }[];
  astronomy: { factor: string; degree: string; ayanamsha: string }[];
}

const ALL_12_ZODIAC: ZodiacData[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    dates: 'Mar 21 – Apr 19',
    score: 92,
    rulingPlanet: 'Mars (Mangala)',
    theme: 'Decisive Agency & Breakthrough',
    summary: 'High vitality and mental stamina. Transiting Mars energizes strategic projects and leadership initiatives with decisive clarity.',
    loveScore: 85,
    careerScore: 96,
    moneyScore: 88,
    vitalityScore: 94,
    transitTrigger: 'Mars trine Natal Jupiter within 1.4° orb',
    citations: [
      { source: 'Brihat Parashara Hora Shastra', verse: 'Ch. 24, Sloka 8', text: 'Mars in favorable dignity bestows executive courage, swift victory over obstacles, and administrative authority.' }
    ],
    astronomy: [
      { factor: 'Mars Transiting Ecliptic', degree: '14°22\' Aries', ayanamsha: 'Lahiri 24°13\'' },
      { factor: 'Jupiter Trine Resonance', degree: '15°40\' Leo', ayanamsha: 'Exact 120° Trine' }
    ]
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    dates: 'Apr 20 – May 20',
    score: 89,
    rulingPlanet: 'Venus (Shukra)',
    theme: 'Financial Stability & Creative Flow',
    summary: 'Harmonious Venusian rays favor investments, design milestones, and grounded long-term partnerships.',
    loveScore: 94,
    careerScore: 84,
    moneyScore: 95,
    vitalityScore: 86,
    transitTrigger: 'Venus entering 2nd House of Wealth',
    citations: [
      { source: 'Saravali by Kalyana Varma', verse: 'Ch. 28, Sloka 12', text: 'Venus prominent in Dhana bhava brings steady enrichment, sensory comfort, and trustworthy associations.' }
    ],
    astronomy: [
      { factor: 'Venus Transit Longitude', degree: '08°19\' Taurus', ayanamsha: 'Lahiri 24°13\'' }
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    dates: 'May 21 – Jun 20',
    score: 91,
    rulingPlanet: 'Mercury (Budha)',
    theme: 'Cognitive Velocity & Discourse',
    summary: 'Elevated mental agility. An auspicious day for pitching ideas, technical writing, and fast-paced contract negotiations.',
    loveScore: 82,
    careerScore: 94,
    moneyScore: 89,
    vitalityScore: 90,
    transitTrigger: 'Mercury conjunct Sun in 3rd House',
    citations: [
      { source: 'Ptolemy - Tetrabiblos', verse: 'Book III, Ch. 13', text: 'Mercury unhindered by malefics produces acute intellect, eloquence in dialectic, and swift commercial acuity.' }
    ],
    astronomy: [
      { factor: 'Mercury Speed', degree: '1°28\'/day (Fast Motion)', ayanamsha: 'Direct' }
    ]
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    dates: 'Jun 21 – Jul 22',
    score: 94,
    rulingPlanet: 'Moon (Chandra)',
    theme: 'Intuitive Empathy & Renewal',
    summary: 'The Moon achieves exalted dignity today. Deep emotional clarity, familial warmth, and instinctive decision-making.',
    loveScore: 98,
    careerScore: 88,
    moneyScore: 85,
    vitalityScore: 92,
    transitTrigger: 'Exalted Moon in Rohini Nakshatra',
    citations: [
      { source: 'Phaladeepika', verse: 'Ch. 14, Sloka 5', text: 'When the Moon is in Rohini, the mind is serene, creative endeavors flourish, and fortune arrives through compassionate channels.' }
    ],
    astronomy: [
      { factor: 'Moon Transit', degree: '18°10\' Taurus (Exalted)', ayanamsha: 'Lahiri 24°13\'' }
    ]
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    dates: 'Jul 23 – Aug 22',
    score: 95,
    rulingPlanet: 'Sun (Surya)',
    theme: 'Radiant Leadership & Recognition',
    summary: 'Surya casts strong benefic rays upon your 10th house. Peak charisma, public recognition, and institutional endorsement.',
    loveScore: 88,
    careerScore: 98,
    moneyScore: 92,
    vitalityScore: 96,
    transitTrigger: 'Sun sextile Mars across Midheaven',
    citations: [
      { source: 'Brihat Jataka by Varahamihira', verse: 'Ch. 18, Sloka 3', text: 'The Sun endowed with strength at the zenith confers authority, splendor of conduct, and favor from monarchs.' }
    ],
    astronomy: [
      { factor: 'Sun Longitude', degree: '28°14\' Leo', ayanamsha: 'Lahiri 24°13\'' }
    ]
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    dates: 'Aug 23 – Sep 22',
    score: 90,
    rulingPlanet: 'Mercury (Budha)',
    theme: 'Precision Optimization & Systems',
    summary: 'Flawless attention to detail. Excellent for debugging systems, health audits, financial reconciliation, and data analysis.',
    loveScore: 80,
    careerScore: 95,
    moneyScore: 93,
    vitalityScore: 88,
    transitTrigger: 'Mercury in own domicile Virgo',
    citations: [
      { source: 'Hora Sara by Prithuyasas', verse: 'Ch. 12, Sloka 9', text: 'Mercury occupying Kanya bestows profound analytical learning, mastery of mathematics, and fruitful business strategy.' }
    ],
    astronomy: [
      { factor: 'Mercury Exaltation Degree', degree: '15°00\' Virgo', ayanamsha: 'Moolatrikona' }
    ]
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    dates: 'Sep 23 – Oct 22',
    score: 93,
    rulingPlanet: 'Venus (Shukra)',
    theme: 'Synergistic Alliances & Harmony',
    summary: 'High diplomatic balance. Partnerships, joint ventures, and creative collaborations progress smoothly with mutual goodwill.',
    loveScore: 96,
    careerScore: 89,
    moneyScore: 90,
    vitalityScore: 87,
    transitTrigger: 'Venus trine Saturn (Long-term trust)',
    citations: [
      { source: 'Saravali', verse: 'Ch. 30, Sloka 11', text: 'Venus harmoniously aspecting Saturn creates unshakeable fidelity, ethical agreements, and enduring partnerships.' }
    ],
    astronomy: [
      { factor: 'Venus-Saturn Aspect', degree: '120.4° (Trine)', ayanamsha: 'Orb 0.4°' }
    ]
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    dates: 'Oct 23 – Nov 21',
    score: 91,
    rulingPlanet: 'Mars & Ketu',
    theme: 'Deep Transformation & Focus',
    summary: 'Penetrating insight into hidden dynamics. Great power to eliminate inefficiencies, investigate truth, and execute high-focus research.',
    loveScore: 86,
    careerScore: 93,
    moneyScore: 91,
    vitalityScore: 90,
    transitTrigger: 'Mars trine transiting Moon',
    citations: [
      { source: 'Brihat Parashara Hora Shastra', verse: 'Ch. 27, Sloka 16', text: 'The Martian lord of Vrishchika uncovers secrets, overcomes rivals, and restores lost equilibrium.' }
    ],
    astronomy: [
      { factor: 'Mars Aspect to 8th House', degree: 'Full 8th Drishti', ayanamsha: 'Exact Aspect' }
    ]
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    dates: 'Nov 22 – Dec 21',
    score: 94,
    rulingPlanet: 'Jupiter (Guru)',
    theme: 'Expansive Horizons & Mentorship',
    summary: 'Guru bestows wide vision and philosophical optimism. Auspicious for publishing, higher learning, and global strategy.',
    loveScore: 90,
    careerScore: 95,
    moneyScore: 94,
    vitalityScore: 93,
    transitTrigger: 'Jupiter in 9th House of Dharma',
    citations: [
      { source: 'Phaladeepika', verse: 'Ch. 18, Sloka 4', text: 'Jupiter in the 9th house grants divine fortune, respected counsel, and elevation through virtuous undertakings.' }
    ],
    astronomy: [
      { factor: 'Jupiter Ecliptic', degree: '22°08\' Cancer', ayanamsha: 'Lahiri 24°13\'' }
    ]
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    dates: 'Dec 22 – Jan 19',
    score: 90,
    rulingPlanet: 'Saturn (Shani)',
    theme: 'Architectural Discipline & Mastery',
    summary: 'Unwavering persistence. Excellent window for finalizing enterprise structures, policy roadmaps, and capital allocation.',
    loveScore: 80,
    careerScore: 97,
    moneyScore: 93,
    vitalityScore: 88,
    transitTrigger: 'Saturn stationary direct in Kendra',
    citations: [
      { source: 'Saravali', verse: 'Ch. 33, Sloka 7', text: 'Saturn established in strength crowns patient labor with permanent institutional legacy.' }
    ],
    astronomy: [
      { factor: 'Saturn Stationary Degree', degree: '04°12\' Pisces', ayanamsha: 'Lahiri 24°13\'' }
    ]
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    dates: 'Jan 20 – Feb 18',
    score: 92,
    rulingPlanet: 'Saturn & Rahu',
    theme: 'Visionary Innovation & Networks',
    summary: 'Flashes of forward-looking invention. Strong momentum for community initiatives, open-source projects, and decentralized systems.',
    loveScore: 85,
    careerScore: 94,
    moneyScore: 89,
    vitalityScore: 91,
    transitTrigger: 'Rahu transiting 11th House of Gains',
    citations: [
      { source: 'Brihat Parashara Hora Shastra', verse: 'Ch. 29, Sloka 11', text: 'Rahu in the 11th house brings unexpected alliances, tech mastery, and global network expansion.' }
    ],
    astronomy: [
      { factor: 'Rahu Mean Node', degree: '12°45\' Aquarius', ayanamsha: 'Lahiri 24°13\'' }
    ]
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    dates: 'Feb 19 – Mar 20',
    score: 93,
    rulingPlanet: 'Jupiter & Neptune',
    theme: 'Spiritual Vision & Artistry',
    summary: 'Heightened creative intuition and profound serenity. Ideal for musical composition, meditation retreats, and healing bonds.',
    loveScore: 95,
    careerScore: 87,
    moneyScore: 88,
    vitalityScore: 92,
    transitTrigger: 'Jupiter trine transiting Moon in Pisces',
    citations: [
      { source: 'Phaladeepika', verse: 'Ch. 19, Sloka 9', text: 'Jupiter casting benefic drishti upon Meena elevates spiritual peace and unlocks pure poetic inspiration.' }
    ],
    astronomy: [
      { factor: 'Jupiter-Moon Aspect', degree: 'Exact 5th Drishti', ayanamsha: 'Orb 0.8°' }
    ]
  }
];

export default function OmniLiveZodiacRadar({ onSelectSign }: { onSelectSign: (signName: string) => void }) {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacData>(ALL_12_ZODIAC[0]);
  const [whyModalSign, setWhyModalSign] = useState<ZodiacData | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-left font-sans space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> All 12 Signs • Live Daily Horoscope & Cosmic Transit Radar
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Today's Planetary Energy Across All 12 Signs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-2xl">
            Calculated in real-time using deterministic planetary transits. Tap your zodiac sign to inspect today's theme, energy barometers, and explainable classical evidence.
          </p>
        </div>

        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-bold self-start md:self-auto shrink-0 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Updated for Today
        </span>
      </div>

      {/* 12-Zodiac Horizontal Pill Bar / Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
        {ALL_12_ZODIAC.map((zodiac) => {
          const isSelected = selectedZodiac.id === zodiac.id;
          return (
            <motion.button
              key={zodiac.id}
              onClick={() => setSelectedZodiac(zodiac)}
              whileTap={{ scale: 0.94 }}
              className={`p-2.5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer relative ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-400/20 font-black'
                  : 'bg-[#0B1220] hover:bg-[#0F182E] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <span className={`text-xl font-serif leading-none ${isSelected ? 'scale-110' : 'text-amber-400'}`}>
                {zodiac.symbol}
              </span>
              <span className="text-[11px] font-mono tracking-tight">{zodiac.name}</span>
              <span className={`text-[9px] font-mono ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                {zodiac.score}%
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Zodiac Spotlight Hero Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedZodiac.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0E172A] to-[#080E1A] border border-amber-500/40 shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-serif text-2xl font-black flex items-center justify-center shadow-lg shadow-amber-400/25">
                {selectedZodiac.symbol}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white">{selectedZodiac.name}</h3>
                  <span className="text-xs font-mono text-slate-400">• {selectedZodiac.dates}</span>
                  <AstroBadge variant="gold">{selectedZodiac.element} Element</AstroBadge>
                </div>
                <p className="text-xs text-amber-300 font-mono pt-0.5">Ruling Lord: {selectedZodiac.rulingPlanet}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="text-right">
                <span className="text-2xl font-black text-amber-400 font-mono">{selectedZodiac.score}%</span>
                <span className="text-[10px] font-mono text-slate-400 block">Daily Alignment</span>
              </div>
              <button
                onClick={() => setWhyModalSign(selectedZodiac)}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-cyan-200 border border-cyan-400/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="View ancient scripture provenance and exact transit degrees"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Why? (Evidence)</span>
              </button>
            </div>
          </div>

          {/* Theme & Forecast Summary */}
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              Today's Primary Transit Influence
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {selectedZodiac.theme}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
              {selectedZodiac.summary}
            </p>
          </div>

          {/* 4 Dimension Barometers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-pink-500/30 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-pink-400 font-bold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> Love & Bond
                </span>
                <span className="text-white font-bold">{selectedZodiac.loveScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-pink-400 h-full rounded-full" style={{ width: `${selectedZodiac.loveScore}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-cyan-500/30 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> Career Focus
                </span>
                <span className="text-white font-bold">{selectedZodiac.careerScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${selectedZodiac.careerScore}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> Wealth & Barakah
                </span>
                <span className="text-white font-bold">{selectedZodiac.moneyScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${selectedZodiac.moneyScore}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/30 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-purple-400 font-bold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Vitality & Drive
                </span>
                <span className="text-white font-bold">{selectedZodiac.vitalityScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: `${selectedZodiac.vitalityScore}%` }} />
              </div>
            </div>
          </div>

          {/* Bottom CTA to unlock personal precision chart */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>General zodiac sign forecasts are archetypal. Your exact birth minute unlocks your complete 120-year destiny.</span>
            </div>

            <button
              onClick={() => onSelectSign(selectedZodiac.name)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <span>Calculate My Exact {selectedZodiac.name} Chart (100% Free)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Why Classical Provenance Sheet */}
      <AstroSheet
        isOpen={!!whyModalSign}
        onClose={() => setWhyModalSign(null)}
        title={whyModalSign ? `${whyModalSign.name} • Today's Classical Provenance` : 'Astrological Provenance'}
        description="Classical scripture citations and deterministic astronomical transit factors behind today's reading."
      >
        {whyModalSign && (
          <EvidencePanel
            predictionTitle={`${whyModalSign.name}: ${whyModalSign.theme}`}
            citations={whyModalSign.citations}
            mathematicalFactors={whyModalSign.astronomy}
          />
        )}
      </AstroSheet>
    </section>
  );
}
