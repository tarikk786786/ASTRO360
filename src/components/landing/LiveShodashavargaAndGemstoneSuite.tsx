import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Layers, Gem, Compass, ArrowRight, 
  ShieldCheck, CheckCircle2, Award, Clock, BookOpen,
  Calendar, Check, Shield
} from 'lucide-react';

interface LiveShodashavargaAndGemstoneSuiteProps {
  onNavigateToTab: (tabId: string) => void;
  onStartOnboarding: () => void;
}

interface DivisionalChartInfo {
  division: string;
  sanskrit: string;
  harmonicFactor: number;
  domain: string;
  signification: string;
  parasharaRule: string;
}

const SHODASHAVARGA_DATA: DivisionalChartInfo[] = [
  {
    division: 'D1 Rashi',
    sanskrit: 'राशि चक्र',
    harmonicFactor: 1,
    domain: 'Physical Constitution & Overall Life Blueprint',
    signification: 'Gross physical plane, primary Lagna, vitality, life longevity, and base planetary placements.',
    parasharaRule: 'BPHS Ch. 6, Sloka 2: "Rashi reveals gross bodily existence and the general arc of fortune."'
  },
  {
    division: 'D2 Hora',
    sanskrit: 'होरा चक्र',
    harmonicFactor: 2,
    domain: 'Liquid Wealth & Treasury (Dhana)',
    signification: 'Capacity to compound wealth, financial assets, treasury accumulation, and material stability.',
    parasharaRule: 'BPHS Ch. 6, Sloka 3: "Hora ruled by Sun (solar day) and Moon (lunar night) indicates financial gain."'
  },
  {
    division: 'D3 Drekkana',
    sanskrit: 'द्रेष्काण चक्र',
    harmonicFactor: 3,
    domain: 'Siblings, Enterprise & Kinetic Courage',
    signification: 'Co-borns, initiative, physical courage, sports stamina, manual dexterity, and brotherly alliances.',
    parasharaRule: 'BPHS Ch. 6, Sloka 5: "Drekkana denotes siblings, valor, and the source of enterprise."'
  },
  {
    division: 'D4 Chaturthamsha',
    sanskrit: 'चतुर्थांश चक्र',
    harmonicFactor: 4,
    domain: 'Real Estate, Fixed Assets & Domestic Fortune',
    signification: 'Immovable property, land acquisitions, vehicles, home foundation, and domestic peace.',
    parasharaRule: 'BPHS Ch. 6, Sloka 7: "Chaturthamsha reveals fixed properties and inherited fortunes."'
  },
  {
    division: 'D7 Saptamsha',
    sanskrit: 'सप्तांश चक्र',
    harmonicFactor: 7,
    domain: 'Children, Lineage & Creative Progeny',
    signification: 'Sons, daughters, grand-lineage, creative intellectual output, and generational continuity.',
    parasharaRule: 'BPHS Ch. 6, Sloka 8: "Saptamsha governs children, creative fertility, and generational legacy."'
  },
  {
    division: 'D9 Navamsha',
    sanskrit: 'नवांश चक्र',
    harmonicFactor: 9,
    domain: 'Dharma, Marriage Partner & Ultimate Destiny',
    signification: 'Spouse characteristics, marital harmony, second half of life, and the true fructification of all D1 yogas.',
    parasharaRule: 'BPHS Ch. 6, Sloka 9: "Navamsha reveals the fruit of destiny, marital alliance, and righteous dharma."'
  },
  {
    division: 'D10 Dashamsha',
    sanskrit: 'दशांश चक्र',
    harmonicFactor: 10,
    domain: 'Career, Executive Power & Public Reputation',
    signification: 'Professional status, corporate leadership, state honors, business success, and public authority.',
    parasharaRule: 'BPHS Ch. 6, Sloka 11: "Dashamsha indicates high executive status, sovereign influence, and profession."'
  },
  {
    division: 'D12 Dwadashamsha',
    sanskrit: 'द्वादशांश चक्र',
    harmonicFactor: 12,
    domain: 'Parents & Ancestral Lineage (Pitru Karma)',
    signification: 'Father, mother, inherited genealogical traits, and blessings or debts from parental lineages.',
    parasharaRule: 'BPHS Ch. 6, Sloka 13: "Dwadashamsha signifies father, mother, and ancestral lineages."'
  },
  {
    division: 'D20 Vimsamsha',
    sanskrit: 'विंशांश चक्र',
    harmonicFactor: 20,
    domain: 'Spiritual Tapas, Meditation & Mantra Siddhi',
    signification: 'Devotional inclinations, sacred mantras, inner spiritual realization, and meditative depth.',
    parasharaRule: 'BPHS Ch. 6, Sloka 17: "Vimsamsha denotes devotion to deity, worship, and inner spiritual prowess."'
  },
  {
    division: 'D24 Chaturvimsamsha',
    sanskrit: 'चतुर्विंशांश चक्र',
    harmonicFactor: 24,
    domain: 'Higher Learning, Academic Intellect & Skill',
    signification: 'Scholarly degrees, profound intellect, specialized technical arts, and knowledge mastery.',
    parasharaRule: 'BPHS Ch. 6, Sloka 19: "Chaturvimsamsha indicates deep scholastic mastery and learning prowess."'
  },
  {
    division: 'D30 Trimsamsha',
    sanskrit: 'त्रिंशांश चक्र',
    harmonicFactor: 30,
    domain: 'Misfortunes, Arishta & Subconscious Debts',
    signification: 'Hidden afflictions, acute physical vulnerabilities, moral dilemmas, and karmic tests.',
    parasharaRule: 'BPHS Ch. 6, Sloka 23: "Trimsamsha indicates evil afflictions, hidden vulnerabilities, and misfortunes."'
  },
  {
    division: 'D60 Shashtiamsha',
    sanskrit: 'षष्ट्यंश चक्र',
    harmonicFactor: 60,
    domain: 'Past Life Karma & Micro-Harmonic Supreme Determinant',
    signification: 'Supreme Parashari harmonic (given highest weightage in Shadbala); determines deep karmic causality.',
    parasharaRule: 'BPHS Ch. 6, Sloka 31: "Shashtiamsha is the master supreme harmonic. Without it, no prediction is final."'
  }
];

interface GemstonePranaData {
  planet: string;
  stone: string;
  metal: string;
  finger: string;
  dayAndHora: string;
  mantra: string;
  formula: string;
}

const GEMSTONE_DATA: GemstonePranaData[] = [
  {
    planet: 'Sun (Surya ☉)',
    stone: 'Ruby (Manikya)',
    metal: '22K Gold or Copper',
    finger: 'Ring Finger (Anamika)',
    dayAndHora: 'Sunday morning during Sun Hora (within 1 hr of sunrise)',
    mantra: 'Om Hram Hrim Hraum Sah Suryaya Namah (108 times)',
    formula: 'Body weight (kg) ÷ 10 + 0.5 Ratti (e.g. 70kg = 7.5 Ratti)'
  },
  {
    planet: 'Jupiter (Guru ♃)',
    stone: 'Yellow Sapphire (Pukhraj)',
    metal: '22K Yellow Gold',
    finger: 'Index Finger (Tarjani)',
    dayAndHora: 'Thursday morning during Jupiter Hora',
    mantra: 'Om Gram Grim Graum Sah Gurave Namah (108 times)',
    formula: 'Body weight (kg) ÷ 12 + 1.0 Ratti (e.g. 70kg = 6.5–7 Ratti)'
  },
  {
    planet: 'Mercury (Budha ☿)',
    stone: 'Emerald (Panna)',
    metal: '22K Gold or Panchadhatu',
    finger: 'Little Finger (Kanishtha)',
    dayAndHora: 'Wednesday morning during Mercury Hora',
    mantra: 'Om Bram Brim Braum Sah Budhaya Namah (108 times)',
    formula: 'Body weight (kg) ÷ 10 + 0.25 Ratti (e.g. 70kg = 7.25 Ratti)'
  },
  {
    planet: 'Venus (Shukra ♀)',
    stone: 'Natural Diamond / White Zircon',
    metal: 'Platinum or White Gold',
    finger: 'Middle or Ring Finger',
    dayAndHora: 'Friday morning during Venus Hora',
    mantra: 'Om Dram Drim Draum Sah Shukraya Namah (108 times)',
    formula: 'Minimum 0.75 Carat (1.00+ Carat optimal for remedial potency)'
  },
  {
    planet: 'Mars (Mangala ♂)',
    stone: 'Red Coral (Moonga)',
    metal: 'Copper or 18K Gold',
    finger: 'Ring Finger (Anamika)',
    dayAndHora: 'Tuesday morning during Mars Hora',
    mantra: 'Om Kram Krim Kraum Sah Bhaumaya Namah (108 times)',
    formula: 'Body weight (kg) ÷ 9 + 0.5 Ratti (e.g. 70kg = 8.25 Ratti)'
  },
  {
    planet: 'Saturn (Shani ♄)',
    stone: 'Blue Sapphire (Neelam)',
    metal: 'Panchadhatu or Silver / White Gold',
    finger: 'Middle Finger (Madhyama)',
    dayAndHora: 'Saturday twilight during Saturn Hora',
    mantra: 'Om Pram Prim Praum Sah Shanaischaraya Namah (108 times)',
    formula: 'Body weight (kg) ÷ 11 + 0.5 Ratti (Requires 3-day trial period)'
  }
];

export default function LiveShodashavargaAndGemstoneSuite({
  onNavigateToTab,
  onStartOnboarding,
}: LiveShodashavargaAndGemstoneSuiteProps) {
  const [activeTab, setActiveTab] = useState<'shodashavarga' | 'gemstone'>('shodashavarga');
  const [selectedVargaIndex, setSelectedVargaIndex] = useState(5); // Default to D9 Navamsha
  const [selectedGemIndex, setSelectedGemIndex] = useState(1); // Default to Jupiter

  const selectedVarga = SHODASHAVARGA_DATA[selectedVargaIndex];
  const selectedGem = GEMSTONE_DATA[selectedGemIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>16 Divisional Harmonics & Prana Pratishtha</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            SHODASHAVARGA MATRIX & GEMSTONE PRANA
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Inspect the 16 micro-harmonic divisional charts (D1 to D60) and verify authentic Vedic gemstone carat weight formulas and purification mantras.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          {[
            { id: 'shodashavarga', label: '16 Divisional Harmonics', icon: Layers },
            { id: 'gemstone', label: 'Gemstone Prana Guide', icon: Gem },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md'
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
            
            {/* VIEW 1: 16 SHODASHAVARGA DIVISIONAL HARMONICS */}
            {activeTab === 'shodashavarga' && (
              <motion.div
                key="shodashavarga"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                  {SHODASHAVARGA_DATA.map((varga, idx) => {
                    const isSelected = selectedVargaIndex === idx;
                    return (
                      <button
                        key={varga.division}
                        onClick={() => setSelectedVargaIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[58px] ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold'
                            : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold block truncate">{varga.division}</span>
                        <span className="text-[10px] font-sans opacity-80 block truncate mt-0.5">{varga.sanskrit}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-semibold">Parashari Micro-Harmonic</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{selectedVarga.division} ({selectedVarga.sanskrit})</h3>
                    </div>
                    <span className="text-xs font-bold text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded border border-cyan-400/20 w-fit">
                      Harmonic 1/{selectedVarga.harmonicFactor} Arc Division
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/4 border border-white/6 space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Primary Life Domain Architecture:</span>
                    <strong className="text-sm text-white font-sans block">{selectedVarga.domain}</strong>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                      {selectedVarga.signification}
                    </p>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <span className="text-slate-400 text-[10px] font-mono uppercase font-bold block">Canonical Shastra Authority:</span>
                    <p className="text-xs sm:text-sm text-amber-300 italic bg-amber-400/5 border border-amber-400/15 p-3 rounded-lg">
                      {selectedVarga.parasharaRule}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                    <span>ASTRO360 calculates all 16 divisional charts simultaneously for sub-arcsecond precision</span>
                    <button
                      onClick={() => onNavigateToTab('divisional-charts')}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Explore Full Shodashavarga Suite</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: VEDIC GEMSTONE PRANA PRATISHTHA */}
            {activeTab === 'gemstone' && (
              <motion.div
                key="gemstone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {GEMSTONE_DATA.map((gem, idx) => {
                    const isSelected = selectedGemIndex === idx;
                    return (
                      <button
                        key={gem.stone}
                        onClick={() => setSelectedGemIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[58px] ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold'
                            : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold block truncate">{gem.stone.split('(')[0]}</span>
                        <span className="text-[10px] font-sans opacity-80 block truncate mt-0.5">{gem.planet.split('(')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-amber-400" />
                        <h3 className="text-lg sm:text-xl font-bold text-white">{selectedGem.stone} for {selectedGem.planet}</h3>
                      </div>
                      <span className="text-[11px] text-slate-400 font-sans">Vedic Jyotish Ratna Pratishtha Standards</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-400/15 text-amber-300 font-bold border border-amber-400/25 w-fit">
                      100% Natural Unheated Standard
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6 space-y-1">
                      <span className="text-slate-500 uppercase text-[10px] block">Consecrated Metal</span>
                      <strong className="text-white text-xs">{selectedGem.metal}</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6 space-y-1">
                      <span className="text-slate-500 uppercase text-[10px] block">Auspicious Finger</span>
                      <strong className="text-amber-300 text-xs">{selectedGem.finger}</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6 space-y-1">
                      <span className="text-slate-500 uppercase text-[10px] block">Prana Timing Window</span>
                      <strong className="text-cyan-300 text-xs">{selectedGem.dayAndHora}</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/4 border border-white/6 space-y-1 font-sans">
                    <span className="text-slate-400 text-[10px] font-mono uppercase font-bold block">Vedic Carat / Ratti Calculation Formula:</span>
                    <strong className="text-xs sm:text-sm text-white font-mono">{selectedGem.formula}</strong>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <span className="text-slate-400 text-[10px] font-mono uppercase font-bold block">Purification & Consecration Mantra:</span>
                    <p className="text-xs sm:text-sm text-amber-300 font-mono italic bg-white/2 border-l-2 border-amber-400 pl-3 py-2 rounded-r-lg">
                      "{selectedGem.mantra}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                    <span>Only recommended for functional benefics and Yogakaraka lords</span>
                    <button
                      onClick={() => onNavigateToTab('remedies')}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Find Your Benefic Gemstone Prescription</span>
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
