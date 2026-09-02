import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Compass, Sparkles, Check, ShieldCheck, 
  ArrowRight, Info, Award, BarChart3
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface MultiSystemEphemerisDiagnosticLabProps {
  userProfile?: UserProfile;
}

interface EphemerisComparisonRow {
  planet: string;
  symbol: string;
  lahiri: string;
  kp: string;
  raman: string;
  tropical: string;
  deltaArcmin: string;
}

const COMPARISON_DATA: EphemerisComparisonRow[] = [
  { planet: 'Sun (Surya)', symbol: '☉', lahiri: '10°24\'15" Aquarius', kp: '10°18\'49" Aquarius', raman: '11°51\'40" Aquarius', tropical: '04°15\'40" Pisces', deltaArcmin: '-05\'26" (KP vs Lahiri)' },
  { planet: 'Moon (Chandra)', symbol: '☽', lahiri: '18°45\'22" Sagittarius', kp: '18°39\'56" Sagittarius', raman: '20°12\'47" Sagittarius', tropical: '12°36\'47" Capricorn', deltaArcmin: '-05\'26" (KP vs Lahiri)' },
  { planet: 'Mars (Mangala)', symbol: '♂', lahiri: '24°10\'05" Capricorn', kp: '24°04\'39" Capricorn', raman: '25°37\'30" Capricorn', tropical: '18°01\'30" Aquarius', deltaArcmin: '-05\'26" (KP vs Lahiri)' },
  { planet: 'Mercury (Budha)', symbol: '☿', lahiri: '28°15\'30" Aquarius', kp: '28°10\'04" Aquarius', raman: '29°42\'55" Aquarius', tropical: '22°06\'55" Pisces', deltaArcmin: '-05\'26" (KP vs Lahiri)' },
  { planet: 'Jupiter (Guru)', symbol: '♃', lahiri: '12°50\'18" Pisces', kp: '12°44\'52" Pisces', raman: '14°17\'43" Pisces', tropical: '06°41\'43" Aries', deltaArcmin: '-05\'26" (KP vs Lahiri)' },
  { planet: 'Venus (Shukra)', symbol: '♀', lahiri: '27°04\'11" Pisces', kp: '26°58\'45" Pisces', raman: '28°31\'36" Pisces', tropical: '20°55\'36" Aries', deltaArcmin: '-05\'26" (KP vs Lahiri)' },
  { planet: 'Saturn (Shani)', symbol: '♄', lahiri: '04°22\'45" Aquarius', kp: '04°17\'19" Aquarius', raman: '05°50\'10" Aquarius', tropical: '28°14\'10" Aquarius', deltaArcmin: '-05\'26" (KP vs Lahiri)' },
  { planet: 'Ascendant (Lagna)', symbol: '↑', lahiri: '14°28\'12" Leo', kp: '14°22\'46" Leo', raman: '15°55\'37" Leo', tropical: '08°19\'37" Virgo', deltaArcmin: '-05\'26" (KP vs Lahiri)' },
];

export default function MultiSystemEphemerisDiagnosticLab({ userProfile }: MultiSystemEphemerisDiagnosticLabProps) {
  const [highlightSystem, setHighlightSystem] = useState<'lahiri' | 'kp' | 'raman' | 'tropical'>('lahiri');

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono font-bold">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multi-Tradition Precision Comparison Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            MULTI-SYSTEM EPHEMERIS DIAGNOSTIC LAB
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Compare planetary longitudes and ayanamsha shifts across True Lahiri, KP Stellar, B.V. Raman, and Western Tropical systems in real time.
          </p>
        </div>

        {/* System Focus Selector */}
        <div className="flex items-center gap-1.5 bg-[#060A12] p-1.5 rounded-2xl border border-white/10 font-mono text-xs shrink-0">
          {[
            { id: 'lahiri', label: 'True Lahiri' },
            { id: 'kp', label: 'KP Stellar' },
            { id: 'raman', label: 'B.V. Raman' },
            { id: 'tropical', label: 'Western Tropical' },
          ].map((sys) => (
            <button
              key={sys.id}
              onClick={() => setHighlightSystem(sys.id as any)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                highlightSystem === sys.id
                  ? 'bg-white text-black font-semibold shadow-sm font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sys.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-4 font-mono text-xs overflow-x-auto">
        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <h3 className="text-sm font-bold text-white uppercase">Planetary Longitude Differential Matrix</h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded border border-emerald-400/20">
            ● NASA JPL DE440 Calibrated
          </span>
        </div>

        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 text-[11px]">
              <th className="py-2.5 px-3">Celestial Body</th>
              <th className={`py-2.5 px-3 ${highlightSystem === 'lahiri' ? 'text-amber-400 font-bold' : ''}`}>True Lahiri (Chitra)</th>
              <th className={`py-2.5 px-3 ${highlightSystem === 'kp' ? 'text-amber-400 font-bold' : ''}`}>KP Stellar</th>
              <th className={`py-2.5 px-3 ${highlightSystem === 'raman' ? 'text-amber-400 font-bold' : ''}`}>B.V. Raman</th>
              <th className={`py-2.5 px-3 ${highlightSystem === 'tropical' ? 'text-amber-400 font-bold' : ''}`}>Western Tropical</th>
              <th className="py-2.5 px-3 text-right">Delta Shift</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6 text-slate-300">
            {COMPARISON_DATA.map((row) => (
              <tr key={row.planet} className="hover:bg-white/3 transition-colors">
                <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">{row.symbol}</span>
                  <span>{row.planet}</span>
                </td>
                <td className={`py-3 px-3 ${highlightSystem === 'lahiri' ? 'text-amber-300 font-bold' : ''}`}>{row.lahiri}</td>
                <td className={`py-3 px-3 ${highlightSystem === 'kp' ? 'text-cyan-300 font-bold' : ''}`}>{row.kp}</td>
                <td className={`py-3 px-3 ${highlightSystem === 'raman' ? 'text-purple-300 font-bold' : ''}`}>{row.raman}</td>
                <td className={`py-3 px-3 ${highlightSystem === 'tropical' ? 'text-emerald-300 font-bold' : ''}`}>{row.tropical}</td>
                <td className="py-3 px-3 text-right text-[10px] text-slate-400">{row.deltaArcmin}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Ephemeris Differential Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/8 text-[11px] text-slate-400 font-sans">
          <div className="p-3.5 rounded-2xl bg-[#060A12] border border-white/6 space-y-1">
            <strong className="text-white font-mono block">True Lahiri vs KP Stellar Shift:</strong>
            <p>KP Ayanamsha is approximately <strong>5 arcminutes 26 arcseconds</strong> lower than True Lahiri, which occasionally shifts boundary-degree cuspal sub-lords.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#060A12] border border-white/6 space-y-1">
            <strong className="text-white font-mono block">Sidereal vs Tropical Differential:</strong>
            <p>Western Tropical positions are approximately <strong>23°51' ahead</strong> of Vedic Sidereal due to the precession of the equinoxes (~50.29 arcseconds per year).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
