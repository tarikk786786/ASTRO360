import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Activity, Info, X } from 'lucide-react';
import type { PlanetPosition } from '../lib/astroCalculations';

interface AspectInfo {
  planet1: PlanetPosition;
  planet2: PlanetPosition;
  type: 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';
  angle: number;
  orb: number;
  color: string;
  effect: string;
}

interface PlanetaryAspectGraphProps {
  planetPositions: PlanetPosition[];
}

export default function PlanetaryAspectGraph({ planetPositions }: PlanetaryAspectGraphProps) {
  const [selectedAspect, setSelectedAspect] = useState<AspectInfo | null>(null);
  const [hoveredPlanetName, setHoveredPlanetName] = useState<string | null>(null);

  // Compute aspects between all pairs of planets
  const aspects = useMemo(() => {
    const list: AspectInfo[] = [];
    const planets = planetPositions.filter(p => p.name !== 'Ascendant');

    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const p1 = planets[i];
        const p2 = planets[j];
        
        let diff = Math.abs(p1.degreeDecimal - p2.degreeDecimal);
        if (diff > 180) diff = 360 - diff;

        let aspectType: AspectInfo['type'] | null = null;
        let color = '#94A3B8';
        let effect = '';

        if (diff <= 8) {
          aspectType = 'Conjunction';
          color = '#06B6D4'; // Cyan
          effect = `Combined energy: ${p1.name} and ${p2.name} merge forces in ${p1.sign}. Dynamic focused momentum.`;
        } else if (Math.abs(diff - 60) <= 6) {
          aspectType = 'Sextile';
          color = '#22C55E'; // Green
          effect = `Harmonious opportunity: ${p1.name} sextile ${p2.name} opens creative pathways and easy collaboration.`;
        } else if (Math.abs(diff - 90) <= 7) {
          aspectType = 'Square';
          color = '#F59E0B'; // Amber
          effect = `Growth challenge: ${p1.name} square ${p2.name} demands conscious effort, discipline, and problem-solving.`;
        } else if (Math.abs(diff - 120) <= 8) {
          aspectType = 'Trine';
          color = '#3B82F6'; // Blue
          effect = `Auspicious flow: ${p1.name} trine ${p2.name} generates natural luck, wisdom, and effortless alignment.`;
        } else if (Math.abs(diff - 180) <= 8) {
          aspectType = 'Opposition';
          color = '#EF4444'; // Red
          effect = `Polar tension & awareness: ${p1.name} opposing ${p2.name} calls for balance between opposite life areas.`;
        }

        if (aspectType) {
          list.push({
            planet1: p1,
            planet2: p2,
            type: aspectType,
            angle: Math.round(diff * 10) / 10,
            orb: Math.round(Math.abs(diff - (aspectType === 'Conjunction' ? 0 : aspectType === 'Sextile' ? 60 : aspectType === 'Square' ? 90 : aspectType === 'Trine' ? 120 : 180)) * 10) / 10,
            color,
            effect
          });
        }
      }
    }
    return list;
  }, [planetPositions]);

  // Compute node coordinates around circle
  const nodePositions = useMemo(() => {
    const center = 160;
    const radius = 110;
    const planets = planetPositions.filter(p => p.name !== 'Ascendant');
    
    return planets.map((p, idx) => {
      const angleDeg = p.degreeDecimal - 90;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = center + radius * Math.cos(angleRad);
      const y = center + radius * Math.sin(angleRad);
      return { planet: p, x, y };
    });
  }, [planetPositions]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 relative text-left">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#06B6D4]" /> Planetary Aspect Network Graph
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Real-time Angular Aspects (Trine, Conjunction, Opposition, Square & Sextile)
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30 font-bold">
          {aspects.length} Active Aspects
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Network Graph Display */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <svg viewBox="0 0 320 320" className="w-72 h-72 sm:w-80 sm:h-80 overflow-visible">
            {/* Outer Zodiac Ring */}
            <circle cx="160" cy="160" r="110" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="160" cy="160" r="135" fill="none" stroke="#334155" strokeWidth="1" opacity="0.4" />

            {/* Aspect Connecting Lines */}
            {aspects.map((asp, idx) => {
              const node1 = nodePositions.find(n => n.planet.name === asp.planet1.name);
              const node2 = nodePositions.find(n => n.planet.name === asp.planet2.name);
              if (!node1 || !node2) return null;

              const isHighlighted = 
                selectedAspect?.planet1.name === asp.planet1.name && selectedAspect?.planet2.name === asp.planet2.name ||
                hoveredPlanetName === asp.planet1.name || hoveredPlanetName === asp.planet2.name;

              return (
                <line
                  key={idx}
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  stroke={asp.color}
                  strokeWidth={isHighlighted ? 3 : 1.5}
                  strokeOpacity={isHighlighted ? 1 : 0.6}
                  className="transition-all duration-300 cursor-pointer hover:stroke-width-3"
                  onClick={() => setSelectedAspect(asp)}
                />
              );
            })}

            {/* Planet Nodes */}
            {nodePositions.map((n, idx) => {
              const isHovered = hoveredPlanetName === n.planet.name;
              return (
                <g
                  key={idx}
                  transform={`translate(${n.x}, ${n.y})`}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredPlanetName(n.planet.name)}
                  onMouseLeave={() => setHoveredPlanetName(null)}
                  onClick={() => {
                    const foundAspect = aspects.find(a => a.planet1.name === n.planet.name || a.planet2.name === n.planet.name);
                    if (foundAspect) setSelectedAspect(foundAspect);
                  }}
                >
                  <circle
                    r={isHovered ? 16 : 13}
                    fill="#0B1220"
                    stroke={isHovered ? '#06B6D4' : '#334155'}
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    fontSize="11"
                    fontWeight="bold"
                    fill={n.planet.color.includes('amber') ? '#F59E0B' : n.planet.color.includes('cyan') ? '#06B6D4' : '#F8FAFC'}
                  >
                    {n.planet.symbol}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Aspects Feed List & Selected Details */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-400 flex items-center justify-between border-b border-white/10 pb-1.5">
            <span>Detected Planetary Angles ({aspects.length})</span>
            <span>Click line for interpretation</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
            {aspects.map((asp, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAspect(asp)}
                className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                  selectedAspect?.planet1.name === asp.planet1.name && selectedAspect?.planet2.name === asp.planet2.name
                    ? 'bg-white/10 border-cyan-400 shadow-md'
                    : 'bg-[#0B1220] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: asp.color }} />
                  <span className="font-bold text-white">
                    {asp.planet1.symbol} {asp.planet1.name} {asp.type} {asp.planet2.symbol} {asp.planet2.name}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 shrink-0">
                  {asp.angle}° (Orb {asp.orb}°)
                </span>
              </button>
            ))}
          </div>

          {/* Selected Aspect Detail Card */}
          {selectedAspect && (
            <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-cyan-500/40 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {selectedAspect.planet1.name} {selectedAspect.type} {selectedAspect.planet2.name} ({selectedAspect.angle}°)
                </span>
                <button onClick={() => setSelectedAspect(null)} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedAspect.effect}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
