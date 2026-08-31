import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Eye, Sparkles, Layers, ShieldCheck, 
  ArrowRight, Info, CheckCircle2, RotateCw, Globe
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface InteractiveDualChartStudioProps {
  userProfile?: UserProfile;
  onNavigateToTab?: (tab: string) => void;
}

interface PlanetPosition {
  name: string;
  sanskrit: string;
  symbol: string;
  sign: string;
  degree: string;
  house: number;
  nakshatra: string;
  pada: number;
  dignity: 'Exalted' | 'Own Sign' | 'Moolatrikona' | 'Friendly' | 'Neutral' | 'Debilitated';
  dignityColor: string;
  speed: string;
}

const SAMPLE_PLANETS: PlanetPosition[] = [
  { name: 'Sun', sanskrit: 'Surya', symbol: '☉', sign: 'Aquarius', degree: '09°28\'14"', house: 7, nakshatra: 'Shatabhisha', pada: 1, dignity: 'Friendly', dignityColor: 'text-amber-400 bg-amber-400/10 border-amber-400/25', speed: '0°59\'42"/day' },
  { name: 'Moon', sanskrit: 'Chandra', symbol: '☽', sign: 'Sagittarius', degree: '18°45\'22"', house: 5, nakshatra: 'Purva Ashadha', pada: 2, dignity: 'Friendly', dignityColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25', speed: '13°12\'10"/day' },
  { name: 'Mars', sanskrit: 'Mangala', symbol: '♂', sign: 'Capricorn', degree: '24°10\'05"', house: 6, nakshatra: 'Dhanishta', pada: 1, dignity: 'Exalted', dignityColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25', speed: '0°42\'15"/day' },
  { name: 'Mercury', sanskrit: 'Budha', symbol: '☿', sign: 'Aquarius', degree: '28°15\'30"', house: 7, nakshatra: 'Purva Bhadrapada', pada: 3, dignity: 'Neutral', dignityColor: 'text-slate-300 bg-slate-400/10 border-slate-400/25', speed: '1°15\'40"/day' },
  { name: 'Jupiter', sanskrit: 'Guru', symbol: '♃', sign: 'Pisces', degree: '12°50\'18"', house: 8, nakshatra: 'Uttara Bhadrapada', pada: 3, dignity: 'Own Sign', dignityColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25', speed: '0°08\'22"/day' },
  { name: 'Venus', sanskrit: 'Shukra', symbol: '♀', sign: 'Pisces', degree: '27°04\'11"', house: 8, nakshatra: 'Revati', pada: 4, dignity: 'Exalted', dignityColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25', speed: '1°12\'05"/day' },
  { name: 'Saturn', sanskrit: 'Shani', symbol: '♄', sign: 'Aquarius', degree: '04°22\'45"', house: 7, nakshatra: 'Dhanishta', pada: 4, dignity: 'Moolatrikona', dignityColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25', speed: '0°04\'18"/day' },
  { name: 'Rahu', sanskrit: 'North Node', symbol: '☊', sign: 'Pisces', degree: '15°32\'09"', house: 8, nakshatra: 'Uttara Bhadrapada', pada: 4, dignity: 'Neutral', dignityColor: 'text-purple-400 bg-purple-400/10 border-purple-400/25', speed: '-0°03\'11"/day (Vakri)' },
  { name: 'Ketu', sanskrit: 'South Node', symbol: '☋', sign: 'Virgo', degree: '15°32\'09"', house: 2, nakshatra: 'Hasta', pada: 2, dignity: 'Neutral', dignityColor: 'text-purple-400 bg-purple-400/10 border-purple-400/25', speed: '-0°03\'11"/day (Vakri)' },
];

export default function InteractiveDualChartStudio({ userProfile, onNavigateToTab }: InteractiveDualChartStudioProps) {
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'western'>('north');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition>(SAMPLE_PLANETS[0]);

  const ascendantSign = 'Leo (Simha ♌)';
  const ascendantDegree = '14°28\'12"';

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-bold">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Multi-Tradition Chart Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            INTERACTIVE DUAL CHART WHEEL STUDIO
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Seamlessly toggle between North Indian Diamond, South Indian Square, and Western 360° Circular Aspect formats with sub-arcsecond precision.
          </p>
        </div>

        {/* Style Selector */}
        <div className="flex items-center gap-1.5 bg-[#060A12] p-1.5 rounded-2xl border border-white/10 font-mono text-xs shrink-0">
          {[
            { id: 'north', label: 'North Indian' },
            { id: 'south', label: 'South Indian' },
            { id: 'western', label: 'Western 360°' },
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => setChartStyle(style.id as any)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                chartStyle === style.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Main: Interactive SVG Chart Canvas */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl flex flex-col items-center justify-center min-h-[420px]">
          <div className="w-full flex items-center justify-between border-b border-white/8 pb-3 mb-4 font-mono text-xs">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Format: {chartStyle === 'north' ? 'North Indian Diamond' : chartStyle === 'south' ? 'South Indian Square' : 'Western Tropical Wheel'}</span>
            </span>
            <span className="text-slate-400 text-[11px]">Asc: <strong className="text-white">{ascendantSign} {ascendantDegree}</strong></span>
          </div>

          {/* SVG Canvas Renderer */}
          <div className="w-full max-w-[360px] aspect-square relative flex items-center justify-center">
            
            {/* 1. NORTH INDIAN DIAMOND */}
            {chartStyle === 'north' && (
              <svg viewBox="0 0 400 400" className="w-full h-full stroke-amber-400/40 fill-none stroke-[1.5]">
                {/* Outer Box */}
                <rect x="10" y="10" width="380" height="380" className="stroke-amber-400/60" />
                {/* Diagonals */}
                <line x1="10" y1="10" x2="390" y2="390" />
                <line x1="390" y1="10" x2="10" y2="390" />
                {/* Inner Diamond */}
                <polygon points="200,10 390,200 200,390 10,200" className="stroke-amber-400" fill="#060A12" fillOpacity="0.8" />
                
                {/* House Labels */}
                <text x="200" y="90" textAnchor="middle" className="fill-amber-400 text-xs font-mono font-bold stroke-none">H1 (Asc: Leo)</text>
                <text x="120" y="60" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">H2 (Ketu)</text>
                <text x="60" y="120" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">H3</text>
                <text x="100" y="200" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">H4</text>
                <text x="60" y="280" textAnchor="middle" className="fill-cyan-400 text-[10px] font-mono stroke-none font-bold">H5 (☽ Moon)</text>
                <text x="120" y="340" textAnchor="middle" className="fill-emerald-400 text-[10px] font-mono stroke-none font-bold">H6 (♂ Mars Ex)</text>
                <text x="200" y="310" textAnchor="middle" className="fill-amber-300 text-xs font-mono stroke-none font-bold">H7 (☉ ☿ ♄)</text>
                <text x="280" y="340" textAnchor="middle" className="fill-emerald-400 text-[10px] font-mono stroke-none font-bold">H8 (♃ ♀ Ex ☊)</text>
                <text x="340" y="280" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">H9</text>
                <text x="300" y="200" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">H10</text>
                <text x="340" y="120" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">H11</text>
                <text x="280" y="60" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">H12</text>
              </svg>
            )}

            {/* 2. SOUTH INDIAN SQUARE */}
            {chartStyle === 'south' && (
              <svg viewBox="0 0 400 400" className="w-full h-full stroke-cyan-400/40 fill-none stroke-[1.5]">
                {/* 4x4 Grid with hollow center */}
                <rect x="10" y="10" width="380" height="380" className="stroke-cyan-400/60" />
                <line x1="105" y1="10" x2="105" y2="390" />
                <line x1="200" y1="10" x2="200" y2="105" />
                <line x1="200" y1="295" x2="200" y2="390" />
                <line x1="295" y1="10" x2="295" y2="390" />
                
                <line x1="10" y1="105" x2="390" y2="105" />
                <line x1="10" y1="200" x2="105" y2="200" />
                <line x1="295" y1="200" x2="390" y2="200" />
                <line x1="10" y1="295" x2="390" y2="295" />

                {/* Center Plaque */}
                <rect x="105" y="105" width="190" height="190" fill="#060A12" fillOpacity="0.9" className="stroke-white/10" />
                <text x="200" y="195" textAnchor="middle" className="fill-cyan-400 text-xs font-mono font-bold stroke-none">SOUTH INDIAN</text>
                <text x="200" y="215" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">Fixed Zodiac Grid</text>

                {/* Signs */}
                <text x="55" y="60" textAnchor="middle" className="fill-white text-[10px] font-mono stroke-none">Pisces (♃ ♀ ☊)</text>
                <text x="150" y="60" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">Aries</text>
                <text x="245" y="60" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">Taurus</text>
                <text x="345" y="60" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">Gemini</text>
                <text x="345" y="155" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">Cancer</text>
                <text x="345" y="250" textAnchor="middle" className="fill-amber-400 text-[10px] font-mono font-bold stroke-none">Leo (ASC)</text>
                <text x="345" y="345" textAnchor="middle" className="fill-purple-400 text-[10px] font-mono stroke-none">Virgo (☋ Ketu)</text>
                <text x="245" y="345" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">Libra</text>
                <text x="150" y="345" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">Scorpio</text>
                <text x="55" y="345" textAnchor="middle" className="fill-cyan-300 text-[10px] font-mono font-bold stroke-none">Sagittarius (☽)</text>
                <text x="55" y="250" textAnchor="middle" className="fill-emerald-400 text-[10px] font-mono font-bold stroke-none">Capr (♂ Mars)</text>
                <text x="55" y="155" textAnchor="middle" className="fill-amber-300 text-[10px] font-mono font-bold stroke-none">Aquar (☉ ☿ ♄)</text>
              </svg>
            )}

            {/* 3. WESTERN 360° CIRCULAR WHEEL */}
            {chartStyle === 'western' && (
              <svg viewBox="0 0 400 400" className="w-full h-full stroke-emerald-400/40 fill-none stroke-[1.5]">
                {/* Outer Wheels */}
                <circle cx="200" cy="200" r="180" className="stroke-emerald-400/50" />
                <circle cx="200" cy="200" r="140" className="stroke-white/20" />
                <circle cx="200" cy="200" r="60" fill="#060A12" fillOpacity="0.8" className="stroke-emerald-400" />
                
                {/* Aspect Lines */}
                <line x1="200" y1="20" x2="200" y2="380" className="stroke-white/15" />
                <line x1="20" y1="200" x2="380" y2="200" className="stroke-white/15" />
                
                {/* Trine Aspect Line (Blue) */}
                <polygon points="200,60 320,270 80,270" className="stroke-cyan-400/60" strokeDasharray="3,3" />
                {/* Square Aspect Line (Red) */}
                <rect x="115" y="115" width="170" height="170" className="stroke-rose-400/50" strokeDasharray="2,2" />

                <text x="200" y="195" textAnchor="middle" className="fill-emerald-400 text-xs font-mono font-bold stroke-none">WESTERN 360°</text>
                <text x="200" y="215" textAnchor="middle" className="fill-slate-400 text-[10px] font-mono stroke-none">Aspect Matrix</text>
              </svg>
            )}

          </div>
        </div>

        {/* Right: Interactive Planetary Diagnostics Matrix */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <h3 className="text-sm font-bold text-white uppercase">Planetary Dignities & Longitudes</h3>
            <span className="text-[10px] text-slate-400">Click planet to inspect</span>
          </div>

          <div className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
            {SAMPLE_PLANETS.map((planet) => {
              const isSelected = selectedPlanet.name === planet.name;
              return (
                <button
                  key={planet.name}
                  onClick={() => setSelectedPlanet(planet)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold'
                      : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{planet.symbol}</span>
                    <div>
                      <strong className="text-xs block leading-tight">{planet.name} ({planet.sanskrit})</strong>
                      <span className={`text-[10px] font-sans ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                        {planet.sign} • H{planet.house} • {planet.nakshatra} (P{planet.pada})
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold block">{planet.degree}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded border font-bold inline-block mt-0.5 ${
                      isSelected ? 'bg-slate-950/20 text-slate-950 border-slate-950/30' : planet.dignityColor
                    }`}>
                      {planet.dignity}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Planet Inspector */}
          <div className="p-3.5 rounded-2xl bg-[#060A12] border border-white/8 space-y-1.5">
            <div className="flex items-center justify-between text-amber-300 font-bold text-xs">
              <span>{selectedPlanet.name} Dignity Analysis:</span>
              <span className="text-slate-400 text-[10px] font-sans">Speed: {selectedPlanet.speed}</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Located in <strong>{selectedPlanet.sign}</strong> in the <strong>{selectedPlanet.house}th House</strong>. Placed in <strong>{selectedPlanet.nakshatra} Pada {selectedPlanet.pada}</strong>. Dignity rated as <strong className="text-emerald-400">{selectedPlanet.dignity}</strong>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
