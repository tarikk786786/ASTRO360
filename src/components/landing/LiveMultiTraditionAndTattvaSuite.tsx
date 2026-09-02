import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Globe2, Compass, Layers, ArrowRight, 
  ShieldCheck, CheckCircle2, Zap, Flame, Droplets, 
  Wind, Mountain, Sun, Star, Activity, Award
} from 'lucide-react';

interface LiveMultiTraditionAndTattvaSuiteProps {
  onNavigateToTab: (tabId: string) => void;
  onStartOnboarding: () => void;
}

interface TraditionComparison {
  name: string;
  zodiacBasis: string;
  timingEngine: string;
  houseSystem: string;
  uniqueStrength: string;
  exampleVerdict: string;
  color: string;
}

const TRADITIONS_DATA: TraditionComparison[] = [
  {
    name: 'Vedic Sidereal (Parashari Jyotish)',
    zodiacBasis: 'Physical Fixed Stars (Chitrapaksha Lahiri Ayanamsha ~24°13\')',
    timingEngine: '120-Year Vimshottari Dasha Cycles + Gochara Transits',
    houseSystem: 'Equal House / Shripati / Bhava Chalit',
    uniqueStrength: 'Shodashavarga (D1 to D60 divisional harmonics) and 6-fold Shadbala planetary strength matrix.',
    exampleVerdict: 'Jupiter in Taurus in 10th Kendra signals strong long-term career growth, reinforced by Jupiter-Saturn Dasha.',
    color: 'text-amber-400 border-white/[0.08] bg-amber-400/10'
  },
  {
    name: 'Western Tropical (Modern & Psychological)',
    zodiacBasis: 'Equinoctial Alignment (0° Aries anchored to Vernal Equinox)',
    timingEngine: 'Secondary Progressions + Solar Arc Directions + Transits',
    houseSystem: 'Placidus / Koch / Porphyry',
    uniqueStrength: 'Deep psychological archetype synthesis, major Ptolemaic aspect orbs, and planetary midpoints.',
    exampleVerdict: 'Sun trine Midheaven in 10th house reflects expanding public recognition and executive autonomy.',
    color: 'text-cyan-400 border-white/[0.08] bg-cyan-400/10'
  },
  {
    name: 'KP Stellar System (Krishnamurti Padhdhati)',
    zodiacBasis: 'Placidus House Cusps with Precise KP Ayanamsha',
    timingEngine: 'Ruling Planets (RP) + Sub-Lord Verification',
    houseSystem: 'Placidus Unequal Cusps',
    uniqueStrength: 'Sub-Lord precision dividing each Nakshatra into 249 unequal sub-segments for pinpoint event timing.',
    exampleVerdict: '10th Cusp Sub-Lord connected to 2nd, 6th, and 11th houses confirms imminent financial promotion.',
    color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
  },
  {
    name: 'Hellenistic Classical (1st Century BCE)',
    zodiacBasis: 'Tropical / Babylonian Sidereal with Sect Calculation',
    timingEngine: 'Zodiacal Releasing + Annual Profections + Decennials',
    houseSystem: 'Whole Sign Houses',
    uniqueStrength: 'Essential Dignities (Domicile, Exaltation, Triplicity, Bound/Term, Decan) and Diurnal/Nocturnal Sect.',
    exampleVerdict: 'Diurnal Sect benefic Jupiter in 10th house acts as the primary constructive Time Lord for legacy.',
    color: 'text-purple-400 border-purple-400/30 bg-purple-400/10'
  },
  {
    name: 'Medieval Islamic & Persian Astrology',
    zodiacBasis: 'Ptolemaic Ephemeris with Arabic Parts / Lots',
    timingEngine: 'Firdaria Planetary Chapters + Continuous Profection',
    houseSystem: 'Alcabitius / Whole Sign',
    uniqueStrength: 'Mathematical calculation of Arabic Lots (Lot of Fortune, Lot of Spirit) and Triplicity Lords.',
    exampleVerdict: 'Lot of Fortune aligned with 10th Lord under Jupiter Firdaria indicates wealth through leadership.',
    color: 'text-teal-400 border-teal-400/30 bg-teal-400/10'
  },
  {
    name: 'Chinese BaZi & Four Pillars of Destiny',
    zodiacBasis: 'Solar Hsia Calendar with 60 Sexagenary Stem-Branch Cycles',
    timingEngine: '10-Year Luck Pillars (Da Yun) + Annual Pillars',
    houseSystem: 'Year, Month, Day & Hour Pillars',
    uniqueStrength: '5-Element (Wood, Fire, Earth, Metal, Water) Yin/Yang dynamic balance and Seasonal Command analysis.',
    exampleVerdict: 'Strong Yang Wood Day Master supported by Water Resource Pillar brings resilient intellectual enterprise.',
    color: 'text-rose-400 border-rose-400/30 bg-rose-400/10'
  }
];

const TATTVA_CYCLES = [
  { name: 'Prithvi (Earth ⛰️)', duration: '24 Minutes', quality: 'Grounded, stable, enduring', bestFor: 'Signing long-term contracts, property purchases, financial planning', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25' },
  { name: 'Jala (Water 💧)', duration: '24 Minutes', quality: 'Fluid, intuitive, receptive', bestFor: 'Artistic design, emotional healing, negotiations, creative writing', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25' },
  { name: 'Agni (Fire 🔥)', duration: '24 Minutes', quality: 'Kinetic, passionate, decisive', bestFor: 'Physical exercise, competitive pitches, surgery, overcoming hurdles', color: 'text-amber-400 bg-amber-400/10 border-amber-400/25' },
  { name: 'Vayu (Air 💨)', duration: '24 Minutes', quality: 'Agile, communicative, rapid', bestFor: 'Writing code, dialectic debate, networking, short travel', color: 'text-teal-300 bg-teal-300/10 border-teal-300/25' },
  { name: 'Akasha (Ether 🌌)', duration: '24 Minutes', quality: 'Subtle, transcendent, spiritual', bestFor: 'Mantra chanting, deep meditation, philosophical study, solitude', color: 'text-purple-400 bg-purple-400/10 border-purple-400/25' },
];

export default function LiveMultiTraditionAndTattvaSuite({
  onNavigateToTab,
  onStartOnboarding,
}: LiveMultiTraditionAndTattvaSuiteProps) {
  const [activeTab, setActiveTab] = useState<'traditions' | 'tattvas'>('traditions');
  const [selectedTraditionIndex, setSelectedTraditionIndex] = useState(0);

  // Live Tattva Clock
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());
  useEffect(() => {
    const timer = setInterval(() => setCurrentMinute(new Date().getMinutes()), 30000);
    return () => clearInterval(timer);
  }, []);

  const activeTattvaIndex = Math.floor((currentMinute % 120) / 24) % 5;
  const currentTattva = TATTVA_CYCLES[activeTattvaIndex];
  const selectedTradition = TRADITIONS_DATA[selectedTraditionIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Universal Ephemeris Synthesis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            6 WORLD TRADITIONS & 5-TATTVA CLOCK
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Compare analytical methodologies side-by-side and monitor real-time diurnal 5-element Tattva bio-rhythms.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          {[
            { id: 'traditions', label: '6 World Traditions', icon: Layers },
            { id: 'tattvas', label: 'Live 5-Tattva Clock', icon: Activity },
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

        {/* Main Content Box */}
        <div className="p-6 sm:p-9 rounded-2xl bg-[#0B1220] border border-white/12 shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: 6 WORLD TRADITIONS COMPARISON */}
            {activeTab === 'traditions' && (
              <motion.div
                key="traditions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {TRADITIONS_DATA.map((t, idx) => {
                    const isSelected = selectedTraditionIndex === idx;
                    return (
                      <button
                        key={t.name}
                        onClick={() => setSelectedTraditionIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[58px] ${
                          isSelected
                            ? 'bg-white text-black font-semibold shadow-sm border-amber-400 shadow-md font-bold'
                            : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold block truncate">{t.name.split('(')[0]}</span>
                        <span className="text-[10px] font-sans opacity-80 block truncate mt-0.5">{t.zodiacBasis.split('(')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-semibold">Tradition Architecture</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{selectedTradition.name}</h3>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded border w-fit ${selectedTradition.color}`}>
                      Canonical System
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6 space-y-1">
                      <span className="text-slate-500 uppercase text-[10px] block">Zodiac Anchor</span>
                      <strong className="text-white text-xs">{selectedTradition.zodiacBasis}</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6 space-y-1">
                      <span className="text-slate-500 uppercase text-[10px] block">Timing Engine</span>
                      <strong className="text-amber-300 text-xs">{selectedTradition.timingEngine}</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6 space-y-1">
                      <span className="text-slate-500 uppercase text-[10px] block">House Division</span>
                      <strong className="text-cyan-300 text-xs">{selectedTradition.houseSystem}</strong>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Methodological Strength:</span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedTradition.uniqueStrength}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/3 border border-white/6 space-y-1 font-sans">
                    <span className="text-amber-400 text-[11px] font-mono font-semibold block">⚡ Real Synthesis Analysis Output:</span>
                    <p className="text-xs text-slate-300 italic">
                      "{selectedTradition.exampleVerdict}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                    <span>ASTRO360 calculates all 6 systems simultaneously so you can compare</span>
                    <button
                      onClick={() => onNavigateToTab('vedic-astrology')}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Explore Multi-Tradition Matrix</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: 5-TATTVA LIVE CLOCK */}
            {activeTab === 'tattvas' && (
              <motion.div
                key="tattvas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Pancha Mahabhuta Diurnal Rhythm
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Live 5-Tattva Elemental Clock
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Vedic wisdom teaches that solar energy cycles through the 5 elements in 24-minute rhythmic pulses every two hours, influencing bio-mental states.
                  </p>

                  <div className="p-4 rounded-xl bg-[#060A12] border border-white/8 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Active Element Right Now:</span>
                      <span className={`px-2.5 py-0.5 rounded font-bold border ${currentTattva.color}`}>
                        {currentTattva.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/6 pt-2">
                      <span className="text-slate-400">Tattva Cycle Pulse:</span>
                      <strong className="text-white">{currentTattva.duration} Per Wave</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('panchanga')}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Open 24-Hour Pancha Mahabhuta Tracker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="border-b border-white/8 pb-2">
                    <span className="text-slate-400 uppercase text-[10px] block">Elemental Bio-Mental Quality</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{currentTattva.quality}</h4>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <span className="text-slate-400 text-[10px] font-mono uppercase font-bold block">Best Suited Actions:</span>
                    <p className="text-xs text-slate-200 leading-relaxed bg-white/3 p-3 rounded-lg border border-white/6">
                      {currentTattva.bestFor}
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-1 pt-2 border-t border-white/6 text-center text-[9px] font-mono">
                    {TATTVA_CYCLES.map((t, idx) => (
                      <div
                        key={t.name}
                        className={`p-1.5 rounded-lg border ${
                          activeTattvaIndex === idx ? 'bg-white text-black font-semibold shadow-sm font-bold border-amber-400' : 'bg-white/2 border-white/6 text-slate-400'
                        }`}
                      >
                        <span className="block truncate">{t.name.split(' ')[0]}</span>
                      </div>
                    ))}
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
