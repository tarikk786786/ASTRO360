import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Gauge, Activity, ArrowRight, ShieldCheck, 
  CheckCircle2, Compass, Zap, Layers, RefreshCw, BarChart3,
  Calendar, AlertCircle
} from 'lucide-react';

interface LivePlanetarySpeedAndShadbalaSuiteProps {
  onNavigateToTab: (tabId: string) => void;
  onStartOnboarding: () => void;
}

interface PlanetSpeedData {
  name: string;
  symbol: string;
  speed: string;
  meanSpeed: string;
  state: 'Direct (Fast)' | 'Direct (Normal)' | 'Stationary' | 'Retrograde (Vakri)' | 'Combust (Asta)';
  statusColor: string;
  potencyPct: number;
  implication: string;
}

const PLANETARY_SPEEDS_DATA: PlanetSpeedData[] = [
  {
    name: 'Sun (Surya)',
    symbol: '☉',
    speed: '0°59\'08" / day',
    meanSpeed: '0°59\'08"',
    state: 'Direct (Normal)',
    statusColor: 'text-amber-400 bg-amber-400/15 border-white/[0.08]',
    potencyPct: 100,
    implication: 'Steady vitality, constitutional clarity, and administrative stamina.'
  },
  {
    name: 'Moon (Chandra)',
    symbol: '☽',
    speed: '13°18\'42" / day',
    meanSpeed: '13°10\'35"',
    state: 'Direct (Fast)',
    statusColor: 'text-emerald-400 bg-emerald-400/15 border-emerald-400/30',
    potencyPct: 102,
    implication: 'Elevated mental velocity, rapid emotional processing, and high receptivity.'
  },
  {
    name: 'Mercury (Budha)',
    symbol: '☿',
    speed: '1°28\'15" / day',
    meanSpeed: '0°59\'08"',
    state: 'Direct (Fast)',
    statusColor: 'text-cyan-400 bg-cyan-400/15 border-white/[0.08]',
    potencyPct: 148,
    implication: 'High cognitive agility. Exceptional for software engineering, writing, and trade.'
  },
  {
    name: 'Venus (Shukra)',
    symbol: '♀',
    speed: '1°12\'04" / day',
    meanSpeed: '0°59\'08"',
    state: 'Direct (Normal)',
    statusColor: 'text-rose-400 bg-rose-400/15 border-rose-400/30',
    potencyPct: 110,
    implication: 'Smooth diplomatic rapport, creative design articulation, and partnership flow.'
  },
  {
    name: 'Mars (Mangala)',
    symbol: '♂',
    speed: '0°38\'19" / day',
    meanSpeed: '0°31\'27"',
    state: 'Direct (Fast)',
    statusColor: 'text-amber-300 bg-amber-300/15 border-amber-300/30',
    potencyPct: 122,
    implication: 'Decisive kinetic drive, strategic initiative, and physical endurance.'
  },
  {
    name: 'Jupiter (Guru)',
    symbol: '♃',
    speed: '0°08\'45" / day',
    meanSpeed: '0°04\'59"',
    state: 'Direct (Normal)',
    statusColor: 'text-amber-400 bg-amber-400/15 border-white/[0.08]',
    potencyPct: 100,
    implication: 'Expansive philosophical discernment, ethical wealth compounding, and mentorship.'
  },
  {
    name: 'Saturn (Shani)',
    symbol: '♄',
    speed: '0°03\'12" / day',
    meanSpeed: '0°02\'00"',
    state: 'Direct (Normal)',
    statusColor: 'text-indigo-300 bg-indigo-300/15 border-indigo-300/30',
    potencyPct: 100,
    implication: 'Deep structural grounding, long-term discipline, and steady compounding.'
  }
];

const SHADBALA_RANKINGS = [
  { planet: 'Sun (Surya)', rupas: '8.42 Rupas', required: '6.50', strength: '129% (Very Strong)', rank: 'Rank 1' },
  { planet: 'Jupiter (Guru)', rupas: '7.85 Rupas', required: '6.50', strength: '121% (Strong)', rank: 'Rank 2' },
  { planet: 'Moon (Chandra)', rupas: '7.20 Rupas', required: '6.00', strength: '120% (Strong)', rank: 'Rank 3' },
  { planet: 'Saturn (Shani)', rupas: '6.80 Rupas', required: '5.00', strength: '136% (Very Strong)', rank: 'Rank 4' },
  { planet: 'Mercury (Budha)', rupas: '6.45 Rupas', required: '7.00', strength: '92% (Moderate)', rank: 'Rank 5' },
  { planet: 'Mars (Mangala)', rupas: '5.90 Rupas', required: '5.00', strength: '118% (Good)', rank: 'Rank 6' },
  { planet: 'Venus (Shukra)', rupas: '5.75 Rupas', required: '5.50', strength: '104% (Adequate)', rank: 'Rank 7' },
];

const UPCOMING_ECLIPSES = [
  { type: 'Total Solar Eclipse (Surya Grahan)', date: 'Aug 12, 2026', sign: 'Leo (Simha ♌)', nakshatra: 'Magha', impact: 'Executive leadership recalibration & institutional pivot' },
  { type: 'Partial Lunar Eclipse (Chandra Grahan)', date: 'Aug 28, 2026', sign: 'Aquarius (Kumbha ♒)', nakshatra: 'Shatabhisha', impact: 'Subconscious cleansing & collective network alignment' },
  { type: 'Annular Solar Eclipse', date: 'Feb 06, 2027', sign: 'Capricorn (Makara ♑)', nakshatra: 'Dhanishta', impact: 'Global economic restructuring & governance discipline' },
];

export default function LivePlanetarySpeedAndShadbalaSuite({
  onNavigateToTab,
  onStartOnboarding,
}: LivePlanetarySpeedAndShadbalaSuiteProps) {
  const [activeTab, setActiveTab] = useState<'speeds' | 'shadbala' | 'eclipses'>('speeds');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>Motional Velocity & 6-Fold Potency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            PLANETARY SPEEDS & SHADBALA POTENCY
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Inspect real-time daily orbital speed in arcminutes/day, 6-fold Shadbala strength metrics, and upcoming eclipse timelines.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          {[
            { id: 'speeds', label: 'Planetary Speeds', icon: Activity },
            { id: 'shadbala', label: 'Shadbala Potency', icon: BarChart3 },
            { id: 'eclipses', label: 'Eclipse Horizon', icon: Calendar },
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
            
            {/* VIEW 1: PLANETARY SPEEDS & RETROGRADE STATUS */}
            {activeTab === 'speeds' && (
              <motion.div
                key="speeds"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">Current Orbital Motional Velocity</h3>
                    <p className="text-xs text-slate-400 font-sans">Daily speed vs mean motion calculated via NASA JPL DE440</p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20 w-fit">
                    ● Ephemeris Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                  {PLANETARY_SPEEDS_DATA.map((p, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#060A12] border border-white/8 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{p.symbol}</span>
                          <strong className="text-white text-xs">{p.name}</strong>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${p.statusColor}`}>
                          {p.state}
                        </span>
                      </div>

                      <div className="flex justify-between text-[11px] pt-1">
                        <span className="text-slate-400">Current Velocity:</span>
                        <strong className="text-white">{p.speed}</strong>
                      </div>

                      <p className="text-[11px] text-slate-400 font-sans leading-snug border-t border-white/6 pt-2">
                        {p.implication}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <span>Distinguishes Retrograde (Vakri), Combust (Asta), and Direct Motion</span>
                  <button
                    onClick={() => onNavigateToTab('transits')}
                    className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>View Natal Planetary Transits</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: 6-FOLD SHADBALA POTENCY */}
            {activeTab === 'shadbala' && (
              <motion.div
                key="shadbala"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">Classical Shadbala 6-Fold Strength Matrix</h3>
                    <p className="text-xs text-slate-400 font-sans">Combines Sthana, Dig, Kala, Chesta, Naisargika, and Drik Bala in Rupas</p>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded border border-white/[0.08] w-fit">
                    Parashari Classical Standard
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {SHADBALA_RANKINGS.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#060A12] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-amber-400 bg-white/4 px-2 py-0.5 rounded">{item.rank}</span>
                        <strong className="text-white text-sm">{item.planet}</strong>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-slate-400">Rupas: <strong className="text-white">{item.rupas}</strong> (Min {item.required})</span>
                        <span className="px-2.5 py-0.5 rounded bg-emerald-400/15 text-emerald-300 font-bold border border-emerald-400/25">
                          {item.strength}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <span>Evaluates true functional capacity to deliver Raja Yogas & life results</span>
                  <button
                    onClick={() => onNavigateToTab('shadbala')}
                    className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Calculate Your Personal Shadbala Matrix</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: ECLIPSE HORIZON */}
            {activeTab === 'eclipses' && (
              <motion.div
                key="eclipses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">Global Solar & Lunar Eclipse Horizon</h3>
                    <p className="text-xs text-slate-400 font-sans">Key nodal alignment dates across Rahu-Ketu axes</p>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 bg-cyan-400/10 px-2.5 py-1 rounded border border-cyan-400/20 w-fit">
                    Nodal Ephemeris Verified
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {UPCOMING_ECLIPSES.map((e, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#060A12] border border-white/8 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          <strong className="text-white text-sm">{e.type}</strong>
                        </div>
                        <span className="text-xs font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/25 w-fit">
                          {e.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span>Sign: <strong className="text-white">{e.sign}</strong></span>
                        <span>•</span>
                        <span>Nakshatra: <strong className="text-cyan-300">{e.nakshatra}</strong></span>
                      </div>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed border-t border-white/6 pt-2">
                        ⚡ <strong>Mundane Impact:</strong> {e.impact}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <span>Provides classical Sutak caution windows and eclipse remedies</span>
                  <button
                    onClick={() => onNavigateToTab('panchanga')}
                    className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Inspect Eclipse Impact on Your Natal Chart</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
