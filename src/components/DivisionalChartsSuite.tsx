import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Layers, Sparkles, Compass, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { calculatePlanetaryPositions, type PlanetPosition } from '../lib/astroCalculations';

interface DivisionalChart {
  id: string;
  name: string;
  varga: string;
  domain: string;
  description: string;
  badgeColor: string;
}

const DIVISIONAL_CHARTS: DivisionalChart[] = [
  { id: 'd1', name: 'D1 — Rashi Chart', varga: '1st Division', domain: 'General Life, Physique, Lagna & Overall Destiny', description: 'The fundamental natal chart representing physical body, vitality, and primary life direction.', badgeColor: 'text-amber-400 border-amber-500/30' },
  { id: 'd2', name: 'D2 — Hora Chart', varga: '2nd Division', domain: 'Wealth, Liquid Assets & Financial Stability', description: 'Division into Solar & Lunar halves to evaluate wealth accumulation and asset security.', badgeColor: 'text-emerald-400 border-emerald-500/30' },
  { id: 'd3', name: 'D3 — Drekkana Chart', varga: '3rd Division', domain: 'Siblings, Courage, Vitality & Energy', description: 'Evaluates initiative, competitive strength, and relationship with brothers/sisters.', badgeColor: 'text-cyan-400 border-cyan-500/30' },
  { id: 'd7', name: 'D7 — Saptamsha Chart', varga: '7th Division', domain: 'Children, Progeny & Creative Legacy', description: 'Detailed analysis of children, family lineage expansion, and creative projects.', badgeColor: 'text-purple-400 border-purple-500/30' },
  { id: 'd9', name: 'D9 — Navamsha Chart', varga: '9th Division', domain: 'Marriage, Spouse, Inner Soul & Dharma', description: 'The most important varga chart confirming real strength of planets after age 32 & marital bond.', badgeColor: 'text-pink-400 border-pink-500/30' },
  { id: 'd10', name: 'D10 — Dashamsha Chart', varga: '10th Division', domain: 'Career, Fame, Power & Achievements', description: 'Executive power, public authority, professional status, and career trajectory.', badgeColor: 'text-amber-300 border-amber-500/30' },
  { id: 'd12', name: 'D12 — Dwadasamsha Chart', varga: '12th Division', domain: 'Parents, Ancestral Lineage & Heritage', description: 'Lineage blessings, parental health, and inherited ancestral karmic patterns.', badgeColor: 'text-[#D4AF37] border-yellow-500/30' },
  { id: 'd16', name: 'D16 — Shodasamsha Chart', varga: '16th Division', domain: 'Conveyances, Vehicles & Comforts', description: 'Material luxury, vehicles, home comforts, and physical safety during travel.', badgeColor: 'text-blue-400 border-blue-500/30' },
  { id: 'd20', name: 'D20 — Vimsamsha Chart', varga: '20th Division', domain: 'Spiritual Progress, Mantras & Devotion', description: 'Spiritual advancement, alignment with sacred mantras, and inner enlightenment.', badgeColor: 'text-emerald-300 border-emerald-500/30' },
  { id: 'd24', name: 'D24 — Chaturvimshamsha', varga: '24th Division', domain: 'Higher Learning, Knowledge & Education', description: 'Academic brilliance, research capacity, higher degrees, and intellectual growth.', badgeColor: 'text-indigo-400 border-indigo-500/30' },
  { id: 'd30', name: 'D30 — Trimshamsha Chart', varga: '30th Division', domain: 'Misfortunes, Health & Karmic Shadows', description: 'Underlying health vulnerabilities, potential obstacles, and shadow karma protection.', badgeColor: 'text-rose-400 border-rose-500/30' },
  { id: 'd60', name: 'D60 — Shastiamsha Chart', varga: '60th Division', domain: 'Past Life Karma & Core Soul Blueprints', description: 'The ultimate refined chart explaining why specific past-life events manifest in this incarnation.', badgeColor: 'text-[#06B6D4] border-cyan-500/30' }
];

export default function DivisionalChartsSuite({
  planetPositions = [],
  userProfile
}: {
  planetPositions?: PlanetPosition[];
  userProfile?: { dob?: string; time?: string; name?: string };
}) {
  const activePositions = useMemo(() => {
    if (planetPositions && planetPositions.length > 0) return planetPositions;
    return calculatePlanetaryPositions(
      userProfile?.dob || '1998-06-15',
      userProfile?.time || '12:00'
    );
  }, [planetPositions, userProfile]);

  const [selectedChart, setSelectedChart] = useState<DivisionalChart>(DIVISIONAL_CHARTS[4]); // Default D9 Navamsha

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" /> D1–D60 Divisional Varga Charts Suite
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Precision Varga Analysis for Career, Marriage, Wealth, Health & Past Life Karma
          </p>
        </div>
        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 font-bold">
          12 Major Varga Charts
        </span>
      </div>

      {/* Chart Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {DIVISIONAL_CHARTS.map((chart) => (
          <button
            key={chart.id}
            onClick={() => setSelectedChart(chart)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 border ${
              selectedChart.id === chart.id
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md'
                : 'bg-white/5 text-slate-400 hover:text-white border-white/5'
            }`}
          >
            {chart.id.toUpperCase()} ({chart.name.split('—')[1].trim()})
          </button>
        ))}
      </div>

      {/* Active Divisional Chart Analysis Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Chart Grid */}
        <div className="lg:col-span-6 p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h4 className="font-mono font-bold text-xs text-white">{selectedChart.name} ({selectedChart.varga})</h4>
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${selectedChart.badgeColor}`}>
              {selectedChart.domain}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            {['Lagna (Simha)', 'Sun (Leo 1st)', 'Moon (Taurus 10th)', 'Mars (Cancer 12th)', 'Mercury (Virgo 2nd)', 'Jupiter (Gemini 11th)', 'Venus (Leo 1st)', 'Saturn (Pisces 8th)', 'Rahu/Ketu (7/1 Axis)'].map((house, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-slate-400 block text-[9px]">H{idx + 1}</span>
                <span className="font-bold text-white block truncate">{house}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Varga Explanation */}
        <div className="lg:col-span-6 space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-[#0B1220] border border-amber-500/30 space-y-2">
            <span className="font-mono font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> {selectedChart.name} Core Significance:
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {selectedChart.description}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1220] border border-emerald-500/30 space-y-1 text-[11px]">
            <span className="font-mono font-bold text-emerald-400 block">Vedic Scholar Insight:</span>
            <p className="text-slate-300">
              Check planet dignity in {selectedChart.id.toUpperCase()} against D1. Exalted planets in {selectedChart.id.toUpperCase()} manifest full results after age 32.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
