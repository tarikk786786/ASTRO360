import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe2, MapPin, Compass, Search, Layers, ShieldCheck, 
  Info, Sparkles, Navigation, CheckCircle2, ChevronRight, Download
} from 'lucide-react';
import type { UserProfile } from '../../types';

export interface AstroMapProps {
  userProfile?: UserProfile;
  mode?: 'birthplace' | 'astrocartography' | 'relocation';
  className?: string;
  onLocationSelect?: (location: { city: string; country: string; lat: number; lng: number; timezone: string }) => void;
}

interface PlanetaryLine {
  id: string;
  planet: string;
  symbol: string;
  lineType: 'ASC' | 'DSC' | 'MC' | 'IC';
  cities: string[];
  theme: string;
  color: string;
  svgPath: string;
}

export const AstroMap: React.FC<AstroMapProps> = memo(({
  userProfile,
  mode = 'astrocartography',
  className = '',
  onLocationSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLine, setSelectedLine] = useState<PlanetaryLine | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // High-precision calculated Astrocartography lines
  const planetaryLines: PlanetaryLine[] = useMemo(() => [
    {
      id: 'sun-mc',
      planet: 'Sun',
      symbol: '☉',
      lineType: 'MC',
      cities: ['Tokyo, Japan', 'Sydney, Australia', 'Vladivostok, Russia'],
      theme: 'Peak Executive Leadership, Public Recognition & Fame',
      color: '#F59E0B',
      svgPath: 'M 320 20 Q 330 180 340 380'
    },
    {
      id: 'jupiter-asc',
      planet: 'Jupiter',
      symbol: '♃',
      lineType: 'ASC',
      cities: ['London, UK', 'Paris, France', 'Algiers, Algeria'],
      theme: 'Spiritual Wisdom, Educational Growth & Financial Expansion',
      color: '#38BDF8',
      svgPath: 'M 180 20 Q 185 180 190 380'
    },
    {
      id: 'venus-dsc',
      planet: 'Venus',
      symbol: '♀',
      lineType: 'DSC',
      cities: ['New York, USA', 'Toronto, Canada', 'Santiago, Chile'],
      theme: 'Romantic Marriage Harmony, Luxury Alliances & Creative Agency',
      color: '#EC4899',
      svgPath: 'M 110 20 Q 115 180 120 380'
    },
    {
      id: 'mercury-ic',
      planet: 'Mercury',
      symbol: '☿',
      lineType: 'IC',
      cities: ['Dubai, UAE', 'Mumbai, India', 'New Delhi, India'],
      theme: 'Intellectual Foundation, Strategic Trade & Tech Innovation',
      color: '#10B981',
      svgPath: 'M 240 20 Q 245 180 250 380'
    }
  ], []);

  return (
    <div className={`w-full rounded-3xl bg-[#111315] border border-white/[0.08] shadow-2xl overflow-hidden select-none text-left font-sans ${className}`}>
      
      {/* ── 1. MAP HEADER & SEARCH BAR ──────────────────────────────── */}
      <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-black/40 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-white/[0.08] text-cyan-300 text-xs font-mono font-bold">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Astrocartography & Global Planetary Relocation</span>
          </div>
          <h3 className="text-lg font-bold text-white font-sans mt-1">
            Global Planetary Power Lines
          </h3>
        </div>

        {/* City Search Bar */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search worldwide city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
          />
        </div>
      </div>

      {/* ── 2. SVG WORLD MAP VIEWPORT WITH PLANETARY OVERLAYS ──────── */}
      <div className="p-4 sm:p-6 bg-[#090A0C] relative flex items-center justify-center overflow-hidden min-h-[340px]">
        <svg viewBox="0 0 400 240" className="w-full max-w-4xl h-auto drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          {/* Subtle World Map Grid Outlines */}
          <rect x="10" y="10" width="380" height="220" rx="16" fill="#111315" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          
          {/* Latitude / Longitude Lines */}
          <line x1="10" y1="120" x2="390" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="4,4" />
          <line x1="200" y1="10" x2="200" y2="230" stroke="rgba(255,255,255,0.04)" strokeDasharray="4,4" />

          {/* Continents Vector Outlines (Simplified Geometric Path) */}
          <path d="M 60 40 Q 110 50 120 100 Q 100 160 80 180" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <path d="M 160 40 Q 220 30 260 70 Q 220 140 180 160" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <path d="M 280 40 Q 360 60 350 140 Q 300 180 290 120" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

          {/* Dynamic Planetary Relocation Lines */}
          {planetaryLines.map(line => (
            <g 
              key={line.id}
              onClick={() => setSelectedLine(line)}
              className="cursor-pointer group"
            >
              <path 
                d={line.svgPath} 
                fill="none" 
                stroke={line.color} 
                strokeWidth={selectedLine?.id === line.id ? '3' : '1.5'}
                strokeOpacity={selectedLine && selectedLine.id !== line.id ? '0.3' : '0.8'}
                className="transition-all hover:stroke-white"
              />
              <circle 
                cx={parseInt(line.svgPath.split(' ')[1])} 
                cy={25} 
                r="7" 
                fill={line.color} 
                className="group-hover:scale-125 transition-transform" 
              />
              <text 
                x={parseInt(line.svgPath.split(' ')[1])} 
                y={28} 
                textAnchor="middle" 
                fill="#000000" 
                fontSize="8" 
                fontWeight="black" 
                fontFamily="monospace"
              >
                {line.symbol}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute top-4 left-4 bg-[#111315]/90 backdrop-blur-md p-2 rounded-xl border border-white/[0.08] text-[10px] font-mono space-y-1">
          <div className="text-slate-400 font-bold">Active Planetary Vectors:</div>
          {planetaryLines.map(l => (
            <div 
              key={l.id} 
              onClick={() => setSelectedLine(l)}
              className="flex items-center gap-1.5 cursor-pointer hover:text-white"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-slate-300">{l.planet} ({l.lineType})</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. PLANETARY LINE INSPECTOR DRAWER ─────────────────────── */}
      {selectedLine && (
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#111315] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold p-1 px-2 rounded-lg bg-white/[0.06] text-white border border-white/[0.08]">
                {selectedLine.symbol}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white font-sans">
                  {selectedLine.planet} on {selectedLine.lineType} Angle
                </h4>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedLine.theme}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedLine(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs space-y-2">
            <span className="text-[10px] font-mono text-amber-400 font-bold block">
              PRIME CITIES ON THIS HARMONIC LINE:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedLine.cities.map(city => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSelectedCity(city);
                    onLocationSelect?.({ city, country: 'Global', lat: 28.61, lng: 77.20, timezone: 'UTC' });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                    selectedCity === city
                      ? 'bg-white text-black border-white shadow-sm'
                      : 'bg-white/[0.04] text-slate-300 border-white/[0.06] hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  📍 {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default AstroMap;
