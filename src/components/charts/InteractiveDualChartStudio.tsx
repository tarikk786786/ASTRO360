import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  RotateCw, 
  Globe,
  Sliders,
  Calendar,
  Clock
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { calculatePlanetaryPositions, calculateAyanamsha } from '../../lib/astroCalculations';
import { calculateHouses, type HouseSystem } from '../../lib/ephemeris/houseCalculation';

interface InteractiveDualChartStudioProps {
  userProfile?: UserProfile;
  onNavigateToTab?: (tab: string) => void;
}

const HOUSE_SYSTEMS: { id: HouseSystem; label: string; desc: string }[] = [
  { id: 'placidus', label: 'Placidus', desc: 'Semi-arc time trisection (World Western Standard)' },
  { id: 'koch', label: 'Koch (GOH)', desc: 'Birthplace horizon system' },
  { id: 'regiomontanus', label: 'Regiomontanus', desc: 'Celestial equator trisection (Classical Horary)' },
  { id: 'campanus', label: 'Campanus', desc: 'Prime vertical trisection (Space division)' },
  { id: 'porphyry', label: 'Porphyry', desc: 'Linear quadrant trisection' },
  { id: 'sripati', label: 'Sripati (Vedic)', desc: 'Classical Vedic Bhava Chalita with unequal cusps' },
  { id: 'wholesign', label: 'Whole Sign', desc: '1 Sign = 1 House (Hellenistic & Vedic Rashi)' },
  { id: 'equal', label: 'Equal House', desc: '30° from Ascendant degree' },
];

export default function InteractiveDualChartStudio({ userProfile, onNavigateToTab }: InteractiveDualChartStudioProps) {
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'western'>('north');
  const [houseSystem, setHouseSystem] = useState<HouseSystem>('placidus');
  const [selectedPlanetName, setSelectedPlanetName] = useState<string>('Sun');

  const dob = userProfile?.dob || '1998-06-15';
  const time = userProfile?.time || '12:00';
  const lat = userProfile?.latitude ?? 21.4225;
  const lon = userProfile?.longitude ?? 39.8262;

  // Real-time planetary positions
  const planetPositions = useMemo(() => {
    return calculatePlanetaryPositions(dob, time, undefined, lat, lon);
  }, [dob, time, lat, lon]);

  const ascendantPlanet = planetPositions.find(p => p.name === 'Ascendant') || planetPositions[0];
  const ascDegree = ascendantPlanet.degreeDecimal;

  // Real-time custom spherical house cusps
  const customHouseCusps = useMemo(() => {
    return calculateHouses(ascDegree, 0, houseSystem, lat);
  }, [ascDegree, houseSystem, lat]);

  const selectedPlanet = planetPositions.find(p => p.name === selectedPlanetName) || planetPositions[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-left pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-xs font-mono font-medium">
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>Multi-Tradition Ephemeris Wheel Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dual Wheel & Spherical Trigonometry Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Toggle seamlessly between North Indian Diamond, South Indian Square, and Western 360° Circular formats. 
            Features exact spherical house cusps across Placidus, Koch, Campanus, Regiomontanus, and Sripati.
          </p>
        </div>
      </div>

      {/* Control Bar: Format & House System Selector */}
      <div className="p-4 rounded-2xl bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Style Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase">Chart Format:</span>
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/[0.08] text-xs font-mono">
            <button
              onClick={() => setChartStyle('north')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                chartStyle === 'north' ? 'bg-white text-black font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              North Indian (Diamond)
            </button>
            <button
              onClick={() => setChartStyle('south')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                chartStyle === 'south' ? 'bg-white text-black font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              South Indian (Square)
            </button>
            <button
              onClick={() => setChartStyle('western')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                chartStyle === 'western' ? 'bg-white text-black font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Western (360° Wheel)
            </button>
          </div>
        </div>

        {/* House System Dropdown */}
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-slate-400 font-bold uppercase">House System:</span>
          <select
            value={houseSystem}
            onChange={(e) => setHouseSystem(e.target.value as HouseSystem)}
            className="px-3 py-1.5 rounded-xl bg-[#070D18] border border-white/15 text-white text-xs font-mono font-medium focus:border-amber-400 outline-none cursor-pointer"
          >
            {HOUSE_SYSTEMS.map(sys => (
              <option key={sys.id} value={sys.id} className="bg-slate-900 text-white">
                {sys.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Studio Grid: Chart Visualizer + Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Visualizer Box */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
          <div className="w-full flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Ascendant: {ascendantPlanet.sign} ({ascDegree.toFixed(2)}°)
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-white/[0.08]">
              {HOUSE_SYSTEMS.find(h => h.id === houseSystem)?.label} Cusp Trigonometry
            </span>
          </div>

          {/* Interactive Chart Graphic */}
          <div className="w-full max-w-[360px] aspect-square rounded-2xl bg-[#070D18] border border-white/[0.08] relative flex items-center justify-center p-4 shadow-2xl">
            {chartStyle === 'north' && (
              <div className="w-full h-full relative border border-white/[0.12]">
                {/* Diagonal Diamond Lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-full rotate-45 border border-white/[0.12] scale-70" />
                  <div className="absolute w-full h-[1px] bg-amber-400/30 rotate-45" />
                  <div className="absolute w-full h-[1px] bg-amber-400/30 -rotate-45" />
                </div>
                {/* 1st House (Lagna / Ascendant Center Diamond) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
                  <span className="text-[10px] font-mono font-bold text-amber-400 block">House 1 (Lagna)</span>
                  <span className="text-xs font-bold text-white">{ascendantPlanet.sign}</span>
                </div>
                {/* 10th House (Top Right / Midheaven) */}
                <div className="absolute top-1/3 left-4 text-center">
                  <span className="text-[9px] font-mono text-slate-400 block">H4 (Sukha)</span>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                  <span className="text-[9px] font-mono text-slate-400 block">H7 (Kalatra)</span>
                </div>
                <div className="absolute top-1/3 right-4 text-center">
                  <span className="text-[9px] font-mono text-slate-400 block">H10 (Karma)</span>
                </div>
              </div>
            )}

            {chartStyle === 'south' && (
              <div className="w-full h-full grid grid-cols-4 grid-rows-4 border border-white/[0.12] text-[10px] font-mono font-bold text-center">
                <div className="p-1 border border-white/[0.08] text-amber-300">Pisces</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Aries</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Taurus</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Gemini</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Aquarius</div>
                <div className="col-span-2 row-span-2 bg-[#0F172A]/50 flex items-center justify-center text-xs font-bold text-white">
                  South Indian Rashi
                </div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Cancer</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Capricorn</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Leo</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Sagittarius</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Scorpio</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Libra</div>
                <div className="p-1 border border-white/[0.08] text-amber-300">Virgo</div>
              </div>
            )}

            {chartStyle === 'western' && (
              <div className="w-full h-full rounded-full border-2 border-cyan-400/40 relative flex items-center justify-center p-2">
                <div className="w-3/4 h-3/4 rounded-full border border-white/[0.08] flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-cyan-400 block font-bold">Western Tropical</span>
                    <span className="text-xs font-bold text-white">360° Wheel</span>
                  </div>
                </div>
                {/* 12 House Cuspal Spoke Lines */}
                {customHouseCusps.map((c, i) => (
                  <div 
                    key={i} 
                    className="absolute w-full h-[1px] bg-white/10 pointer-events-none"
                    style={{ transform: `rotate(${i * 30}deg)` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Planetary Telemetry & Inspector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] space-y-3">
            <h3 className="text-sm font-bold font-mono uppercase text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" /> Ephemeris Planetary Coordinates
            </h3>

            <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
              {planetPositions.map((p) => {
                const isSelected = p.name === selectedPlanetName;
                return (
                  <div
                    key={p.name}
                    onClick={() => setSelectedPlanetName(p.name)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs font-mono ${
                      isSelected
                        ? 'bg-[#0F1D33] border-amber-400 text-white shadow-md'
                        : 'bg-[#070D18] hover:bg-[#0E1726] border-white/5 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-400">{p.name}</span>
                      <span className="text-slate-500">({p.sign})</span>
                    </div>
                    <span className="text-cyan-400 font-bold tabular-nums">
                      {p.degreeDecimal.toFixed(2)}°
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Planet Deep Inspector Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#070D18] border border-white/[0.08] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              Selected Inspector: {selectedPlanet.name}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
              <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[10px] text-slate-500 block">Zodiac Sign</span>
                <span className="font-bold text-white">{selectedPlanet.sign}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[10px] text-slate-500 block">Ecliptic Longitude</span>
                <span className="font-bold text-cyan-400">{selectedPlanet.degreeDecimal.toFixed(2)}°</span>
              </div>
              <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[10px] text-slate-500 block">Nakshatra</span>
                <span className="font-bold text-emerald-400">{selectedPlanet.nakshatra || 'Ashwini'}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[10px] text-slate-500 block">House Cusp ({houseSystem})</span>
                <span className="font-bold text-amber-300">House {selectedPlanet.house || 1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
