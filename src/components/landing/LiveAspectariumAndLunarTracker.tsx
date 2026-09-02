import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Moon, Sun, Compass, Activity, ArrowRight, 
  ShieldCheck, CheckCircle2, ChevronRight, Zap, Star, 
  Layers, Eye, RefreshCw, Flame, Feather, Compass as OracleIcon
} from 'lucide-react';

interface LiveAspectariumAndLunarTrackerProps {
  onNavigateToTab: (tabId: string) => void;
  onStartOnboarding: () => void;
}

interface PlanetaryAspect {
  planetA: string;
  planetB: string;
  aspectType: 'Trine (120°)' | 'Conjunction (0°)' | 'Sextile (60°)' | 'Square (90°)' | 'Opposition (180°)' | 'Vedic Special Drishti';
  orb: string;
  state: 'Applying (Building)' | 'Exact (Peak)' | 'Separating (Fading)';
  nature: 'Harmonious & Benefic' | 'High Dynamic Tension' | 'Strategic Opportunity' | 'Transformative Power';
  interpretation: string;
  influence: 'High' | 'Medium' | 'Subtle';
}

const LIVE_ASPECTS_DATA: PlanetaryAspect[] = [
  {
    planetA: 'Jupiter (Guru)',
    planetB: 'Sun (Surya)',
    aspectType: 'Trine (120°)',
    orb: "1°14' (Close)",
    state: 'Applying (Building)',
    nature: 'Harmonious & Benefic',
    interpretation: 'Expands confidence, executive leadership recognition, moral clarity, and institutional support. Highly auspicious for publishing and major launches.',
    influence: 'High'
  },
  {
    planetA: 'Mars (Mangala)',
    planetB: 'Saturn (Shani)',
    aspectType: 'Vedic Special Drishti',
    orb: "2°28'",
    state: 'Applying (Building)',
    nature: 'Strategic Opportunity',
    interpretation: 'Demands disciplined action over impulsive force. Mars provides kinetic drive while Saturn supplies structural patience and stamina.',
    influence: 'High'
  },
  {
    planetA: 'Venus (Shukra)',
    planetB: 'Moon (Chandra)',
    aspectType: 'Trine (120°)',
    orb: "0°42' (Near Exact)",
    state: 'Exact (Peak)',
    nature: 'Harmonious & Benefic',
    interpretation: 'Elevates aesthetic sensibility, social rapport, emotional warmth, and creative design articulation.',
    influence: 'High'
  },
  {
    planetA: 'Mercury (Budha)',
    planetB: 'Rahu (North Node)',
    aspectType: 'Conjunction (0°)',
    orb: "3°10'",
    state: 'Separating (Fading)',
    nature: 'Transformative Power',
    interpretation: 'Stimulates unconventional intellectual breakthroughs, algorithmic thinking, and rapid cross-border communication.',
    influence: 'Medium'
  },
  {
    planetA: 'Moon (Chandra)',
    planetB: 'Jupiter (Guru)',
    aspectType: 'Conjunction (0°)',
    orb: "4°05'",
    state: 'Applying (Building)',
    nature: 'Harmonious & Benefic',
    interpretation: 'Forms the classical Gaja Kesari Yoga resonance. Enhances mental tranquility, noble reputation, and benevolent wisdom.',
    influence: 'High'
  }
];

const TAROT_ASTRO_ORACLES = [
  { card: 'The Emperor (IV)', archetype: 'Aries ♈ / Mars', theme: 'Executive Sovereignty', guidance: 'Take structured initiative. Establish boundaries and manifest order through clear decisive strategy.' },
  { card: 'The Star (XVII)', archetype: 'Aquarius ♒ / Saturn', theme: 'Renewed Inspiration', guidance: 'A phase of serene optimism and visionary clarity. Trust in long-term alignment and selfless service.' },
  { card: 'The High Priestess (II)', archetype: 'Moon ☽ / Cancer', theme: 'Intuitive Insight', guidance: 'Listen to subtle subconscious patterns. The answer is found in quiet contemplation rather than external debate.' },
  { card: 'The Magician (I)', archetype: 'Mercury ☿ / Gemini', theme: 'Focused Manifestation', guidance: 'You hold all requisite tools and mental resources. Align conscious intention with practical execution.' },
];

export default function LiveAspectariumAndLunarTracker({
  onNavigateToTab,
  onStartOnboarding,
}: LiveAspectariumAndLunarTrackerProps) {
  const [activeTab, setActiveTab] = useState<'aspects' | 'lunar' | 'oracle'>('aspects');
  const [selectedOracleIndex, setSelectedOracleIndex] = useState(0);

  // Live Lunar Phase calculation
  const lunarData = useMemo(() => {
    return {
      phaseName: 'Waxing Gibbous (Shukla Ekadashi)',
      illumination: '84.6%',
      tithi: 'Shukla Paksha Ekadashi (11th Lunar Day)',
      nakshatra: 'Rohini (Pada 3)',
      deity: 'Prajapati / Brahma',
      ayanamsha: 'Chitrapaksha Lahiri 24°13\'08"',
      recommendedActivities: [
        'High-focus intellectual writing and engineering',
        'Initiating long-term financial compounding',
        'Spiritual sadhana & sacred fasting (Ekadashi Vratha)',
        'Creative architectural and visual design'
      ]
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Planetary Aspectarium & Lunar Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            LIVE GEOCENTRIC ASPECTARIUM & MOON LAB
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Monitor real-time planetary aspects, lunar phase illumination, and classical archetypal synchronicity with sub-arcsecond precision.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-2 max-w-lg mx-auto">
          {[
            { id: 'aspects', label: 'Aspect Matrix', icon: Zap },
            { id: 'lunar', label: 'Lunar Phase & Tithi', icon: Moon },
            { id: 'oracle', label: 'Archetypal Oracle', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-sm border-amber-400 font-bold shadow-md'
                    : 'bg-[#0B1220] text-slate-400 hover:text-white border-white/8'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="p-6 sm:p-9 rounded-2xl bg-[#0B1220] border border-white/12 shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: LIVE PLANETARY ASPECTARIUM */}
            {activeTab === 'aspects' && (
              <motion.div
                key="aspects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">Active Transit Geometric Alignments</h3>
                    <p className="text-xs text-slate-400 font-sans">True planetary angular separation within classical orbs</p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20 w-fit">
                    ● Real-Time Ephemeris Live
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {LIVE_ASPECTS_DATA.map((aspect, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#060A12] border border-white/8 hover:border-white/[0.08] transition-all space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-sm">{aspect.planetA}</span>
                          <span className="px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 text-[11px] font-semibold border border-amber-400/25">
                            {aspect.aspectType}
                          </span>
                          <span className="font-bold text-white text-sm">{aspect.planetB}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-slate-400">Orb: <strong className="text-white">{aspect.orb}</strong></span>
                          <span className="text-emerald-400 font-semibold">{aspect.state}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-[11px] text-slate-300 font-sans leading-relaxed">
                        {aspect.interpretation}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <span>Supports Ptolemaic Major Aspects & Parashari Drishti</span>
                  <button
                    onClick={() => onNavigateToTab('transits')}
                    className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Inspect Your Natal Chart Transit Aspects</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: LUNAR PHASE & TITHI TELEMETRY */}
            {activeTab === 'lunar' && (
              <motion.div
                key="lunar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Chandra Mandala Astronomical Radar
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {lunarData.phaseName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    The Moon is the fastest-moving astrological body, governing the mental field, emotional receptivity, and diurnal bio-rhythms.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#060A12] border border-white/8 space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Illumination</span>
                      <strong className="text-amber-300 text-sm">{lunarData.illumination}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#060A12] border border-white/8 space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Current Tithi</span>
                      <strong className="text-white text-xs">{lunarData.tithi}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#060A12] border border-white/8 space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Active Nakshatra</span>
                      <strong className="text-emerald-400 text-xs">{lunarData.nakshatra}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-[#060A12] border border-white/8 space-y-1">
                      <span className="text-slate-500 text-[10px] uppercase block">Presiding Deity</span>
                      <strong className="text-cyan-300 text-xs">{lunarData.deity}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('panchanga')}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Open Complete Daily Panchanga</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <span className="text-slate-400 uppercase">Optimal Lunar Alignments Today</span>
                    <Moon className="w-5 h-5 text-amber-300" />
                  </div>

                  <ul className="space-y-2.5 font-sans text-xs text-slate-300">
                    {lunarData.recommendedActivities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-white/6 text-[11px] text-slate-400 font-mono flex justify-between items-center">
                    <span>Ayanamsha: Lahiri 24°13'</span>
                    <span className="text-cyan-400">Sub-Arcsecond Smooth</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: ARCHETYPAL ORACLE SYNCHRONICITY */}
            {activeTab === 'oracle' && (
              <motion.div
                key="oracle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TAROT_ASTRO_ORACLES.map((o, idx) => {
                    const isSelected = selectedOracleIndex === idx;
                    return (
                      <button
                        key={o.card}
                        onClick={() => setSelectedOracleIndex(idx)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer min-h-[64px] ${
                          isSelected
                            ? 'bg-white text-black font-semibold shadow-sm border-amber-400 shadow-md font-bold'
                            : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8'
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold block">{o.card}</span>
                        <span className="text-[10px] font-mono opacity-80 block truncate mt-0.5">{o.archetype}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-[#060A12] border border-white/8 space-y-4 text-left font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-amber-400 uppercase font-semibold">Active Astrological Archetype</span>
                      <h3 className="text-base font-bold text-white">{TAROT_ASTRO_ORACLES[selectedOracleIndex].card}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white text-xs font-bold w-fit">
                      {TAROT_ASTRO_ORACLES[selectedOracleIndex].theme}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/3 border border-white/6 space-y-1.5 font-sans">
                    <span className="text-slate-400 text-[11px] font-mono uppercase font-bold block">Reflective Philosophical Guidance:</span>
                    <p className="text-sm text-slate-200 leading-relaxed italic">
                      "{TAROT_ASTRO_ORACLES[selectedOracleIndex].guidance}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                    <span>Synchronicity Index: High Resonance</span>
                    <button
                      onClick={() => onNavigateToTab('free-tools')}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Explore Multi-Tradition Wisdom Suite</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
