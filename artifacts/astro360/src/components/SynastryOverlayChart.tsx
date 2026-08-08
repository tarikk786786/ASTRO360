import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Compass, Sparkles, ShieldCheck, User, Users, Info, Award, Settings, CheckCircle2 } from 'lucide-react';
import { calculatePlanetaryPositions, type PlanetPosition } from '../lib/astroCalculations';

interface SynastryOverlayChartProps {
  personAPositions?: PlanetPosition[];
  personBPositions?: PlanetPosition[];
  personAName?: string;
  personBName?: string;
}

export default function SynastryOverlayChart({
  personAPositions = calculatePlanetaryPositions('1998-06-15', '12:00'),
  personBPositions = calculatePlanetaryPositions('1998-06-15', '12:00'),
  personAName = 'Tarik Islam',
  personBName = 'Spouse / Partner'
}: SynastryOverlayChartProps = {}) {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);
  const [showPartnerModal, setShowPartnerModal] = useState<boolean>(false);
  const [partnerName, setPartnerName] = useState<string>(personBName);
  const [partnerDob, setPartnerDob] = useState<string>('2000-02-14');
  const [partnerTime, setPartnerTime] = useState<string>('14:30');

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
            Inter-Natal Chart Comparison: {personAName} vs {partnerName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPartnerModal(true)}
            className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono font-bold flex items-center gap-1 border border-white/10 cursor-pointer transition-all"
          >
            <Settings className="w-3.5 h-3.5 text-pink-400" /> Partner Details
          </button>
          <span className="text-xs font-mono font-bold text-pink-300 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30 flex items-center gap-1.5 shadow-md">
            <Award className="w-4 h-4 text-pink-400" />
            Synastry Score: {synastryScore}/100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Dual Concentric Ring Chart Visualizer */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <svg 
            role="img"
            aria-label="Synastry Dual-Ring Inter-Natal Chart Overlay comparison"
            viewBox="0 0 340 340" 
            className="w-72 h-72 sm:w-80 sm:h-80 overflow-visible"
          >
            {/* Outer Ring: Person B */}
            <circle cx="170" cy="170" r="140" fill="none" stroke="#EC4899" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <text x="170" y="22" textAnchor="middle" fill="#EC4899" fontSize="9" fontWeight="bold" fontFamily="monospace">
              Outer Ring: {partnerName}
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
              Strong elemental convergence between <strong className="text-cyan-300">{personAName}</strong> and <strong className="text-pink-300">{partnerName}</strong>. 
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

      {/* PARTNER INPUT MODAL */}
      <AnimatePresence>
        {showPartnerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-md w-full rounded-3xl bg-[#111827] border border-pink-500/40 p-6 space-y-4 shadow-2xl relative text-left"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400" /> Spouse / Partner Birth Details
                </h3>
                <button onClick={() => setShowPartnerModal(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block font-bold mb-1">Partner's Full Name:</label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-xs text-white focus:outline-none focus:border-pink-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block font-bold mb-1">Date of Birth:</label>
                    <input
                      type="date"
                      value={partnerDob}
                      onChange={(e) => setPartnerDob(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-pink-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block font-bold mb-1">Time of Birth:</label>
                    <input
                      type="time"
                      value={partnerTime}
                      onChange={(e) => setPartnerTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-pink-400"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowPartnerModal(false)}
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg mt-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save & Compute Synastry Overlay
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
