import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, HelpCircle, Compass, Clock, ArrowRight, 
  ShieldCheck, CheckCircle2, Star, Layers, Activity,
  Search, BookOpen, AlertCircle, Check
} from 'lucide-react';

interface LivePrashnaAndKPSubLordSuiteProps {
  onNavigateToTab: (tabId: string) => void;
  onStartOnboarding: () => void;
}

interface PrashnaFactor {
  parameter: string;
  value: string;
  significance: string;
  treatiseSource: string;
}

const PRASHNA_FACTORS_DATA: PrashnaFactor[] = [
  {
    parameter: 'Prashna Lagna (Query Ascendant)',
    value: 'Leo (Simha ♌) 14°28\'',
    significance: 'Fixed Fire sign indicates steady, resolute outcome with executive authority and clarity.',
    treatiseSource: 'Prashna Marga (Ch. 2, Sloka 14)'
  },
  {
    parameter: 'Arudha Lagna (Ray of Inquiry)',
    value: 'Aries (Mesha ♈) 22°10\'',
    significance: 'Kendra placement from Prashna Lagna confirms prompt resolution through direct initiative.',
    treatiseSource: 'Daivajna Vallabha by Varahamihira'
  },
  {
    parameter: 'Prashna Chandra (Moon Mental State)',
    value: 'Taurus (Vrishabha ♉) 08°15\' (Exalted)',
    significance: 'Exalted Moon in 10th house reflects noble, constructive, and highly fertile inquirer intent.',
    treatiseSource: 'Shatpanchasika by Prithuyasas'
  },
  {
    parameter: 'Active Tajika Aspect (Sambandha)',
    value: 'Muthasila (Ithasala) Conjunction',
    significance: 'Applying aspect between Lagna Lord (Sun) and 10th Lord (Venus) promises complete success.',
    treatiseSource: 'Tajika Neelakanthi (Ch. 3)'
  }
];

interface KPSubLordInfo {
  sign: string;
  signLord: string;
  star: string;
  starLord: string;
  subLord: string;
  arcSpan: string;
  signification: string;
}

const KP_SUB_LORDS_DATA: KPSubLordInfo[] = [
  {
    sign: 'Aries (0° - 30°)',
    signLord: 'Mars (Mangala)',
    star: 'Ashwini (0° - 13°20\')',
    starLord: 'Ketu',
    subLord: 'Ketu (0° - 0°53\'20")',
    arcSpan: '0°00\'00" to 0°53\'20"',
    signification: 'High spiritual intuition, sudden kinetic sparks, and rapid initiation.'
  },
  {
    sign: 'Aries (0° - 30°)',
    signLord: 'Mars (Mangala)',
    star: 'Ashwini (0° - 13°20\')',
    starLord: 'Ketu',
    subLord: 'Venus (0°53\'20" - 3°06\'40")',
    arcSpan: '0°53\'20" to 3°06\'40"',
    signification: 'Material luxury impulse, refined design instincts, and dynamic charm.'
  },
  {
    sign: 'Aries (0° - 30°)',
    signLord: 'Mars (Mangala)',
    star: 'Ashwini (0° - 13°20\')',
    starLord: 'Ketu',
    subLord: 'Sun (3°06\'40" - 3°46\'40")',
    arcSpan: '3°06\'40" to 3°46\'40"',
    signification: 'Executive willpower, institutional authority, and administrative brilliance.'
  },
  {
    sign: 'Aries (0° - 30°)',
    signLord: 'Mars (Mangala)',
    star: 'Ashwini (0° - 13°20\')',
    starLord: 'Ketu',
    subLord: 'Moon (3°46\'40" - 4°53\'20")',
    arcSpan: '3°46\'40" to 4°53\'20"',
    signification: 'Emotional receptivity, public charisma, and fertile creative imagination.'
  },
  {
    sign: 'Aries (0° - 30°)',
    signLord: 'Mars (Mangala)',
    star: 'Ashwini (0° - 13°20\')',
    starLord: 'Ketu',
    subLord: 'Mars (4°53\'20" - 5°40\'00")',
    arcSpan: '4°53\'20" to 5°40\'00"',
    signification: 'Uncompromising tactical drive, surgical precision, and physical stamina.'
  },
  {
    sign: 'Aries (0° - 30°)',
    signLord: 'Mars (Mangala)',
    star: 'Ashwini (0° - 13°20\')',
    starLord: 'Ketu',
    subLord: 'Rahu (5°40\'00" - 7°40\'00")',
    arcSpan: '5°40\'00" to 7°40\'00"',
    signification: 'Unconventional breakthroughs, technological ambition, and global reach.'
  }
];

export default function LivePrashnaAndKPSubLordSuite({
  onNavigateToTab,
  onStartOnboarding,
}: LivePrashnaAndKPSubLordSuiteProps) {
  const [activeTab, setActiveTab] = useState<'prashna' | 'kp'>('prashna');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Horary Ephemeris & KP 249 Sub-Division</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            LIVE PRASHNA HORARY & KP STELLAR MATRIX
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Inspect real-time Horary (Prashna) query coordinates and explore the mathematical precision of Krishnamurti Padhdhati (KP) 249 Sub-Lord divisions.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          {[
            { id: 'prashna', label: 'Live Prashna (Horary)', icon: HelpCircle },
            { id: 'kp', label: 'KP 249 Sub-Lord Table', icon: Layers },
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
            
            {/* VIEW 1: LIVE PRASHNA (HORARY ASTROLOGY) */}
            {activeTab === 'prashna' && (
              <motion.div
                key="prashna"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">Current Instantaneous Horary (Prashna) Alignment</h3>
                    <p className="text-xs text-slate-400 font-sans">Timestamped celestial chart for time-of-inquiry divination</p>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20 w-fit">
                    ● Momentary Ephemeris Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {PRASHNA_FACTORS_DATA.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#060A12] border border-white/8 space-y-2">
                      <div className="flex items-center justify-between border-b border-white/6 pb-1.5">
                        <strong className="text-amber-400 text-xs">{item.parameter}</strong>
                        <span className="text-white font-bold text-xs">{item.value}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {item.significance}
                      </p>
                      <span className="text-[10px] text-slate-400 block pt-1 font-sans">
                        📜 {item.treatiseSource}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <span>Used when birth time is unknown or for urgent single-question decisions</span>
                  <button
                    onClick={() => onNavigateToTab('prashna')}
                    className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Cast Your Real-Time Horary Inquiry</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: KP 249 SUB-LORD TABLE */}
            {activeTab === 'kp' && (
              <motion.div
                key="kp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white font-mono">KP Stellar 249 Sub-Lord Division Matrix</h3>
                    <p className="text-xs text-slate-400 font-sans">Dividing 27 Nakshatras into 9 unequal sub-arcs according to Vimshottari dasha ratios</p>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 bg-cyan-400/10 px-2.5 py-1 rounded border border-cyan-400/20 w-fit">
                    Prof. K.S. Krishnamurti Standard
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {KP_SUB_LORDS_DATA.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#060A12] border border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-amber-400 font-bold text-xs">{row.star.split('(')[0]}</span>
                        <span className="text-slate-500">→</span>
                        <span className="px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 text-xs font-bold border border-cyan-400/20">
                          Sub-Lord: {row.subLord.split('(')[0]}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>Arc: <strong className="text-white">{row.arcSpan}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                  <span>Enables to-the-minute event timing by verifying Cuspal Sub-Lord connections</span>
                  <button
                    onClick={() => onNavigateToTab('kp-system')}
                    className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Generate Full KP Cuspal Sub-Lord Chart</span>
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
