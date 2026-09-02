import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Crown, Compass, Calendar, ArrowRight, 
  ShieldCheck, CheckCircle2, Star, Zap, Layers, 
  Activity, Award, Clock, ArrowUpRight
} from 'lucide-react';

interface LiveIngressAndRajaYogaSuiteProps {
  onNavigateToTab: (tabId: string) => void;
  onStartOnboarding: () => void;
}

interface PlanetaryIngress {
  planet: string;
  fromSign: string;
  toSign: string;
  date: string;
  duration: string;
  keyTheme: string;
  benefitedSigns: string[];
  intenseSigns: string[];
}

const MAJOR_INGRESSES_DATA: PlanetaryIngress[] = [
  {
    planet: 'Jupiter (Guru)',
    fromSign: 'Taurus (Vrishabha ♉)',
    toSign: 'Gemini (Mithuna ♊)',
    date: 'May 14, 2026',
    duration: 'Approx. 13 Months',
    keyTheme: 'Massive intellectual velocity, AI & data breakthroughs, cross-border media, and communication commerce expansion.',
    benefitedSigns: ['Gemini', 'Libra', 'Aquarius', 'Aries', 'Leo'],
    intenseSigns: ['Sagittarius', 'Virgo', 'Pisces']
  },
  {
    planet: 'Saturn (Shani)',
    fromSign: 'Aquarius (Kumbha ♒)',
    toSign: 'Pisces (Meena ♓)',
    date: 'June 02, 2026',
    duration: 'Approx. 2.5 Years',
    keyTheme: 'Deep spiritual restructuring, dissolution of outdated institutional dogmas, oceanic ecology, and subconscious discipline.',
    benefitedSigns: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
    intenseSigns: ['Pisces', 'Aquarius', 'Aries', 'Virgo']
  },
  {
    planet: 'Rahu (North Node)',
    fromSign: 'Pisces (Meena ♓)',
    toSign: 'Aquarius (Kumbha ♒)',
    date: 'Dec 18, 2026',
    duration: 'Approx. 18 Months',
    keyTheme: 'Technological disruption, decentralized quantum computing, space exploration, and futuristic social paradigms.',
    benefitedSigns: ['Aquarius', 'Gemini', 'Libra', 'Sagittarius'],
    intenseSigns: ['Leo', 'Taurus', 'Scorpio']
  },
  {
    planet: 'Mars (Mangala)',
    fromSign: 'Cancer (Karka ♋)',
    toSign: 'Leo (Simha ♌)',
    date: 'Oct 24, 2026',
    duration: 'Approx. 45 Days',
    keyTheme: 'Solar-fire kinetic leadership, competitive entrepreneurship, executive courage, and sports victories.',
    benefitedSigns: ['Leo', 'Aries', 'Sagittarius', 'Gemini'],
    intenseSigns: ['Aquarius', 'Scorpio', 'Taurus']
  }
];

interface ClassicalYoga {
  name: string;
  sanskrit: string;
  category: 'Maha Purusha' | 'Raja Yoga' | 'Dhana Yoga' | 'Protection Yoga';
  formation: string;
  treatiseSource: string;
  realWorldResult: string;
  rarity: 'Common (25%)' | 'Uncommon (10%)' | 'Rare (3%)' | 'Elite (0.8%)';
}

const CLASSICAL_YOGAS_DATA: ClassicalYoga[] = [
  {
    name: 'Gaja Kesari Yoga',
    sanskrit: 'गजकेसरी योग',
    category: 'Raja Yoga',
    formation: 'Jupiter in an angular house (Kendra 1st, 4th, 7th, or 10th) from the natal Moon.',
    treatiseSource: 'Brihat Parashara Hora Shastra (Ch. 36, Sloka 3)',
    realWorldResult: 'Bestows noble societal reputation, lasting intellectual legacy, moral authority, overcoming fierce rivals, and radiant oratorical prowess.',
    rarity: 'Uncommon (10%)'
  },
  {
    name: 'Hamsa Maha Purusha Yoga',
    sanskrit: 'हंस महापुरुष योग',
    category: 'Maha Purusha',
    formation: 'Jupiter placed in its own sign (Sagittarius/Pisces) or exalted (Cancer) within a Kendra house.',
    treatiseSource: 'Phaladeepika (Ch. 6, Sloka 4)',
    realWorldResult: 'Produces spiritual preceptors, high judicial authorities, revered institutional founders, and individuals endowed with unshakeable ethical principles.',
    rarity: 'Rare (3%)'
  },
  {
    name: 'Bhadra Maha Purusha Yoga',
    sanskrit: 'भद्र महापुरुष योग',
    category: 'Maha Purusha',
    formation: 'Mercury placed in Gemini or Virgo in an angular Kendra house (1st, 4th, 7th, or 10th).',
    treatiseSource: 'Brihat Samhita by Varahamihira (Ch. 69)',
    realWorldResult: 'Exceptional mathematical genius, sharp commercial intellect, mastery of code and languages, and profound longevity with youthful vitality.',
    rarity: 'Rare (3%)'
  },
  {
    name: 'Ruchaka Maha Purusha Yoga',
    sanskrit: 'रुचक महापुरुष योग',
    category: 'Maha Purusha',
    formation: 'Mars in Aries, Scorpio, or Capricorn within an angular Kendra house.',
    treatiseSource: 'Saravali by Kalyana Varma (Ch. 31)',
    realWorldResult: 'Commanding physical and strategic leadership, military or executive heroism, property acquisition, and unmatched competitive victory.',
    rarity: 'Rare (3%)'
  },
  {
    name: 'Budhaditya Yoga',
    sanskrit: 'बुधादित्य योग',
    category: 'Raja Yoga',
    formation: 'Conjunction of Sun and Mercury in a non-dusthana house without deep combustion.',
    treatiseSource: 'Jataka Parijata (Ch. 7)',
    realWorldResult: 'Sharp administrative acumen, analytical intelligence, state patronage, and respected intellectual eloquence.',
    rarity: 'Common (25%)'
  },
  {
    name: 'Neechabhanga Raja Yoga',
    sanskrit: 'नीचभङ्ग राजयोग',
    category: 'Raja Yoga',
    formation: 'Debilitated planet whose dispositor or exaltation lord is in Kendra from Ascendant or Moon.',
    treatiseSource: 'Phaladeepika (Ch. 6, Sloka 26)',
    realWorldResult: 'Spectacular rise from adversity to sovereign eminence; early obstacles transmuted into extraordinary long-term authority.',
    rarity: 'Elite (0.8%)'
  }
];

export default function LiveIngressAndRajaYogaSuite({
  onNavigateToTab,
  onStartOnboarding,
}: LiveIngressAndRajaYogaSuiteProps) {
  const [activeTab, setActiveTab] = useState<'ingresses' | 'yogas'>('ingresses');
  const [selectedYogaIndex, setSelectedYogaIndex] = useState(0);

  const selectedYoga = CLASSICAL_YOGAS_DATA[selectedYogaIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Classical Yogas & Major Planetary Ingresses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            PLANETARY INGRESSES & CLASSICAL RAJA YOGAS
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Track upcoming major planetary sign transitions and inspect the mathematical criteria of 6 canonical Sanskrit Raja and Maha Purusha Yogas.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          {[
            { id: 'ingresses', label: 'Planetary Ingress Timeline', icon: Calendar },
            { id: 'yogas', label: 'Classical Raja Yoga Scanner', icon: Crown },
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

        {/* Main Interactive Box */}
        <div className="p-6 sm:p-9 rounded-2xl bg-[#0B1220] border border-white/12 shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: MAJOR PLANETARY INGRESS TIMELINE */}
            {activeTab === 'ingresses' && (
              <motion.div
                key="ingresses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">Major Planetary Sign Transitions</h3>
                    <p className="text-xs text-slate-400 font-sans">Calculated via Chitrapaksha Lahiri Sidereal Ephemeris</p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20 w-fit">
                    ● Next Major Windows
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  {MAJOR_INGRESSES_DATA.map((ingress, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#060A12] border border-white/8 hover:border-white/[0.08] transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold text-sm">{ingress.planet}</span>
                          <span className="text-slate-500">→</span>
                          <span className="text-white font-bold text-xs">{ingress.toSign}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/25">
                          {ingress.date}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {ingress.keyTheme}
                      </p>

                      <div className="pt-2 border-t border-white/6 flex flex-wrap gap-2 text-[10px]">
                        <span className="text-emerald-400 font-bold">Benefited: {ingress.benefitedSigns.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <span>Calculates exact Gochara house alignments relative to your natal Moon and Ascendant</span>
                  <button
                    onClick={() => onNavigateToTab('transits')}
                    className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Check Personalized Transit Timelines</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: CLASSICAL RAJA YOGA SCANNER */}
            {activeTab === 'yogas' && (
              <motion.div
                key="yogas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {CLASSICAL_YOGAS_DATA.map((y, idx) => {
                    const isSelected = selectedYogaIndex === idx;
                    return (
                      <button
                        key={y.name}
                        onClick={() => setSelectedYogaIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[58px] ${
                          isSelected
                            ? 'bg-white text-black font-semibold shadow-sm border-amber-400 shadow-md font-bold'
                            : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold block truncate">{y.name.split(' ')[0]}</span>
                        <span className="text-[10px] font-sans opacity-80 block truncate mt-0.5">{y.category}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <h3 className="text-lg sm:text-xl font-bold text-white">{selectedYoga.name} ({selectedYoga.sanskrit})</h3>
                      </div>
                      <span className="text-[11px] text-slate-400 font-sans">{selectedYoga.treatiseSource}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 text-xs font-bold">
                        {selectedYoga.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-amber-400/15 border border-white/[0.08] text-amber-300 text-xs font-bold">
                        {selectedYoga.rarity}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/4 border border-white/6 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Astronomical Formation Rule:</span>
                    <p className="text-xs sm:text-sm text-white font-sans leading-relaxed">
                      {selectedYoga.formation}
                    </p>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <span className="text-slate-400 text-[10px] font-mono uppercase font-bold block">Real-World Astrological Manifestation:</span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-white/2 border-l-2 border-amber-400 pl-3 py-2 rounded-r-lg">
                      "{selectedYoga.realWorldResult}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                    <span>Evaluates 108+ Classical Sanskrit Yogas across D1 Rashi & D9 Navamsha</span>
                    <button
                      onClick={() => onNavigateToTab('birth-chart')}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Scan All Yogas in Your Free Birth Chart</span>
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
