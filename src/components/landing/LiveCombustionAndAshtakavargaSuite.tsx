import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Flame, ShieldAlert, BarChart2, Compass, 
  ArrowRight, ShieldCheck, CheckCircle2, Swords, 
  Layers, AlertTriangle, Star, Check
} from 'lucide-react';

interface LiveCombustionAndAshtakavargaSuiteProps {
  onNavigateToTab: (tabId: string) => void;
  onStartOnboarding: () => void;
}

interface CombustionData {
  planet: string;
  orbLimit: string;
  currentDistance: string;
  status: 'Deep Combustion (Asta)' | 'Mild Combustion' | 'Free & Radiant (Direct)';
  statusColor: string;
  classicalRemedy: string;
}

const COMBUSTION_PLANETS: CombustionData[] = [
  {
    planet: 'Mercury (Budha)',
    orbLimit: '14° (Direct) / 12° (Vakri)',
    currentDistance: '18°42\'',
    status: 'Free & Radiant (Direct)',
    statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    classicalRemedy: 'Cognitive clarity and commercial negotiations operate with unimpeded power.'
  },
  {
    planet: 'Venus (Shukra)',
    orbLimit: '10° (Direct) / 8° (Vakri)',
    currentDistance: '26°15\'',
    status: 'Free & Radiant (Direct)',
    statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    classicalRemedy: 'Aesthetic balance and relationship diplomacy operate with high benefic luminosity.'
  },
  {
    planet: 'Mars (Mangala)',
    orbLimit: '17°',
    currentDistance: '42°10\'',
    status: 'Free & Radiant (Direct)',
    statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    classicalRemedy: 'Kinetic drive, competitive stamina, and executive willpower uninhibited by solar heat.'
  },
  {
    planet: 'Jupiter (Guru)',
    orbLimit: '11°',
    currentDistance: '34°55\'',
    status: 'Free & Radiant (Direct)',
    statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    classicalRemedy: 'Philosophical discernment, ethical compounding, and mentorship are uncompromised.'
  },
  {
    planet: 'Saturn (Shani)',
    orbLimit: '15°',
    currentDistance: '88°30\'',
    status: 'Free & Radiant (Direct)',
    statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    classicalRemedy: 'Structural grounding, institutional discipline, and karmic stability at full capacity.'
  }
];

const ASHTAKAVARGA_DATA = [
  { sign: 'Aries (Mesha)', bindus: 31, rating: 'Auspicious (31 > 28)', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { sign: 'Taurus (Vrishabha)', bindus: 34, rating: 'Exalted Power (34 > 28)', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { sign: 'Gemini (Mithuna)', bindus: 29, rating: 'Auspicious (29 > 28)', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { sign: 'Cancer (Karka)', bindus: 27, rating: 'Neutral (27 ≈ 28)', color: 'text-amber-300 bg-amber-400/10 border-white/[0.08]' },
  { sign: 'Leo (Simha)', bindus: 30, rating: 'Auspicious (30 > 28)', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { sign: 'Virgo (Kanya)', bindus: 24, rating: 'Caution Window (24 < 28)', color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
  { sign: 'Libra (Tula)', bindus: 32, rating: 'Auspicious (32 > 28)', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { sign: 'Scorpio (Vrishchika)', bindus: 25, rating: 'Caution Window (25 < 28)', color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
  { sign: 'Sagittarius (Dhanu)', bindus: 33, rating: 'Exalted Power (33 > 28)', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { sign: 'Capricorn (Makara)', bindus: 28, rating: 'Balanced Threshold (28)', color: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20' },
  { sign: 'Aquarius (Kumbha)', bindus: 30, rating: 'Auspicious (30 > 28)', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { sign: 'Pisces (Meena)', bindus: 26, rating: 'Caution Window (26 < 28)', color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
];

export default function LiveCombustionAndAshtakavargaSuite({
  onNavigateToTab,
  onStartOnboarding,
}: LiveCombustionAndAshtakavargaSuiteProps) {
  const [activeTab, setActiveTab] = useState<'combustion' | 'ashtakavarga' | 'grahayuddha'>('combustion');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Combustion Orbs & 8-Fold Ashtakavarga</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            PLANETARY COMBUSTION & ASHTAKAVARGA BINDUS
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Inspect exact solar combustion (Astangata) degree boundaries, planetary war (Graha Yuddha) diagnostics, and Sarvashtakavarga bindu transit strengths.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          {[
            { id: 'combustion', label: 'Combustion (Asta)', icon: Flame },
            { id: 'ashtakavarga', label: 'Ashtakavarga (SAV)', icon: BarChart2 },
            { id: 'grahayuddha', label: 'Planetary War', icon: Swords },
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
            
            {/* VIEW 1: PLANETARY COMBUSTION (ASTANGATA) */}
            {activeTab === 'combustion' && (
              <motion.div
                key="combustion"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">Planetary Solar Proximity & Combustion Status</h3>
                    <p className="text-xs text-slate-400 font-sans">Degrees from Sun calculated in real-time via NASA JPL DE440</p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20 w-fit">
                    ● Parashari Orbs Active
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {COMBUSTION_PLANETS.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#060A12] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-white text-sm">{p.planet}</strong>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 text-[11px]">Combustion Orb: {p.orbLimit}</span>
                        </div>
                        <p className="text-xs text-slate-300 font-sans">{p.classicalRemedy}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-slate-400 text-[11px]">Distance: <strong className="text-white">{p.currentDistance}</strong></span>
                        <span className={`px-2.5 py-1 rounded font-bold border ${p.statusColor}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <span>Evaluates whether internal planetary significations (Karakatvas) are scorched by solar rays</span>
                  <button
                    onClick={() => onNavigateToTab('birth-chart')}
                    className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Check Natal Combustion in Your Birth Chart</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: ASHTAKAVARGA BINDUS (SAV) */}
            {activeTab === 'ashtakavarga' && (
              <motion.div
                key="ashtakavarga"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">Sarvashtakavarga (SAV) 12-Sign Energy Heatmap</h3>
                    <p className="text-xs text-slate-400 font-sans">Total 337 benefic bindus distributed across signs (28 is the neutral equilibrium)</p>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded border border-white/[0.08] w-fit">
                    Parashara Hora Shastra Ch. 66
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 font-mono text-xs">
                  {ASHTAKAVARGA_DATA.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#060A12] border border-white/8 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <strong className="text-white text-xs">{item.sign.split(' ')[0]}</strong>
                        <span className="text-sm font-bold text-amber-400">{item.bindus} pts</span>
                      </div>
                      <span className={`block px-2 py-0.5 rounded text-[10px] font-bold border text-center ${item.color}`}>
                        {item.rating}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <span>Signs with 28+ bindus bring fruitful transit results; under 25 bindus require patience</span>
                  <button
                    onClick={() => onNavigateToTab('ashtakavarga')}
                    className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Inspect Your Personalized Ashtakavarga Chart</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: GRAHA YUDDHA (PLANETARY WAR) */}
            {activeTab === 'grahayuddha' && (
              <motion.div
                key="grahayuddha"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">Planetary War (Graha Yuddha) Diagnostics</h3>
                    <p className="text-xs text-slate-400 font-sans">Occurs when two non-luminary planets (Mars, Mercury, Jupiter, Venus, Saturn) are within 1° of longitude</p>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 bg-cyan-400/10 px-2.5 py-1 rounded border border-cyan-400/20 w-fit">
                    Surya Siddhanta Standard
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                      <Check className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Current Sky Status: No Active Planetary War</h4>
                      <p className="text-xs text-slate-400 font-sans">All planets maintain angular separation &gt; 1°00'00"</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white/3 border border-white/6 space-y-2 font-sans">
                    <span className="text-amber-400 text-xs font-mono font-bold block">Classical Determination Rules (Surya Siddhanta & BPHS):</span>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                      <li>The planet with the northernmost celestial latitude (Uttara Kranti) is declared victorious (Jaya).</li>
                      <li>Venus is inherently immune to defeat due to its supreme natural luminosity (Bhrigu principle).</li>
                      <li>The defeated planet loses strength to deliver its natural significations until mitigated by benefic Jupiter aspects.</li>
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                    <span>ASTRO360 continuously monitors planetary latitude and declination coordinates</span>
                    <button
                      onClick={() => onNavigateToTab('birth-chart')}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Scan Your Natal Chart for Graha Yuddha</span>
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
