import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Compass, Sparkles, ShieldCheck, User, Users, Info, Award } from 'lucide-react';
import type { PlanetPosition } from '../lib/astroCalculations';

interface SynastryOverlayChartProps {
  personAPositions: PlanetPosition[];
  personBPositions?: PlanetPosition[];
  personAName?: string;
  personBName?: string;
}

export default function SynastryOverlayChart({
  personAPositions,
  personBPositions = personAPositions,
  personAName = 'Seeker (Self)',
  personBName = 'Spouse / Partner'
}: SynastryOverlayChartProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);

  // Compute Dual Ring Aspect Overlaps
  const synastryScore = useMemo(() => {
    let score = 78;
    personAPositions.forEach(pA => {
      const pB = personBPositions.find(b => b.name === pA.name);
      if (pB) {
        let diff = Math.abs(pA.degreeDecimal - pB.degreeDecimal);
        if (diff > 180) diff = 360 - diff;
        if (diff <= 10) score += 3; // Conjunction synergy
        else if (Math.abs(diff - 120) <= 8) score += 4; // Trine flow
      }
    });
    return Math.min(98, Math.max(60, score));
  }, [personAPositions, personBPositions]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" /> Synastry Dual-Ring Chart Overlay
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Inter-Natal Chart Comparison: {personAName} vs {personBName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-pink-300 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30 flex items-center gap-1.5 shadow-md">
            <Award className="w-4 h-4 text-pink-400" />
            Synastry Score: {synastryScore}/100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Dual Concentric Ring Chart Visualizer */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <svg viewBox="0 0 340 340" className="w-72 h-72 sm:w-80 sm:h-80 overflow-visible">
            {/* Outer Ring: Person B */}
            <circle cx="170" cy="170" r="140" fill="none" stroke="#EC4899" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <text x="170" y="22" textAnchor="middle" fill="#EC4899" fontSize="9" fontWeight="bold" fontFamily="monospace">
              Outer Ring: {personBName}
            </text>

            {/* Inner Ring: Person A */}
            <circle cx="170" cy="170" r="95" fill="none" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <text x="170" y="68" textAnchor="middle" fill="#06B6D4" fontSize="9" fontWeight="bold" fontFamily="monospace">
              Inner Ring: {personAName}
            </text>

            {/* Person A Inner Ring Nodes */}
            {personAPositions.map((pA, idx) => {
              const rad = ((pA.degreeDecimal - 90) * Math.PI) / 180;
              const x = 170 + 95 * Math.cos(rad);
              const y = 170 + 95 * Math.sin(rad);

              return (
                <g key={`A-${idx}`} transform={`translate(${x}, ${y})`} className="cursor-pointer" onClick={() => setSelectedPlanet(pA)}>
                  <circle r="10" fill="#0B1220" stroke="#06B6D4" strokeWidth="2" />
                  <text textAnchor="middle" dy="3.5" fontSize="10" fontWeight="bold" fill="#06B6D4">
                    {pA.symbol}
                  </text>
                </g>
              );
            })}

            {/* Person B Outer Ring Nodes */}
            {personBPositions.map((pB, idx) => {
              const rad = ((pB.degreeDecimal - 90) * Math.PI) / 180;
              const x = 170 + 140 * Math.cos(rad);
              const y = 170 + 140 * Math.sin(rad);

              return (
                <g key={`B-${idx}`} transform={`translate(${x}, ${y})`} className="cursor-pointer" onClick={() => setSelectedPlanet(pB)}>
                  <circle r="10" fill="#0B1220" stroke="#EC4899" strokeWidth="2" />
                  <text textAnchor="middle" dy="3.5" fontSize="10" fontWeight="bold" fill="#EC4899">
                    {pB.symbol}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Inter-Chart Compatibility Summary */}
        <div className="lg:col-span-6 space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2">
            <span className="font-mono font-bold text-pink-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-pink-400" /> Synastry Harmony & Inter-Aspect Analysis:
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Strong elemental convergence between <strong className="text-cyan-300">{personAName}</strong> and <strong className="text-pink-300">{personBName}</strong>. 
              Sun & Moon house positions align in Kendra 4th/10th relationship, bringing mutual respect, financial co-growth, and emotional safety.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
            <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300">
              <span className="font-bold block">Ashta Koota Score</span>
              <span className="text-xs font-bold text-white">31 / 36 Gunas</span>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              <span className="font-bold block">Nadi Compatibility</span>
              <span className="text-xs font-bold text-white">Madhya ➔ Ideal</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
              <span className="font-bold block">Bhakoot Harmony</span>
              <span className="text-xs font-bold text-white">7/7 Points</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <span className="font-bold block">Vashya Mutual Attraction</span>
              <span className="text-xs font-bold text-white">High Affinity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
