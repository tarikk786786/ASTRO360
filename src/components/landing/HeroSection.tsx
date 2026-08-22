import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Compass, Sun, Moon, Clock, Activity, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { calculatePlanetaryPositions, calculatePanchang, type PlanetPosition, type PanchangInfo } from '../../lib/astroCalculations';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreHoroscope: () => void;
}

const ZODIAC_RING = [
  { symbol: '♈', name: 'Aries', element: 'Fire' },
  { symbol: '♉', name: 'Taurus', element: 'Earth' },
  { symbol: '♊', name: 'Gemini', element: 'Air' },
  { symbol: '♋', name: 'Cancer', element: 'Water' },
  { symbol: '♌', name: 'Leo', element: 'Fire' },
  { symbol: '♍', name: 'Virgo', element: 'Earth' },
  { symbol: '♎', name: 'Libra', element: 'Air' },
  { symbol: '♏', name: 'Scorpio', element: 'Water' },
  { symbol: '♐', name: 'Sagittarius', element: 'Fire' },
  { symbol: '♑', name: 'Capricorn', element: 'Earth' },
  { symbol: '♒', name: 'Aquarius', element: 'Air' },
  { symbol: '♓', name: 'Pisces', element: 'Water' },
];

export default function HeroSection({ onGetStarted, onExploreHoroscope }: HeroSectionProps) {
  const [hoveredZodiac, setHoveredZodiac] = useState<string | null>(null);
  const [selectedPlanetName, setSelectedPlanetName] = useState<string>('Sun');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Live Clock Tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute Real Ephemeris on Mount
  const livePlanets = useMemo(() => {
    return calculatePlanetaryPositions();
  }, []);

  const livePanchang: PanchangInfo = useMemo(() => {
    return calculatePanchang(currentTime);
  }, [currentTime]);

  const activePlanet = livePlanets.find(p => p.name === selectedPlanetName) || livePlanets[0];

  // Greenwich Mean Sidereal Time (GMST) calculation approximation
  const gmstString = useMemo(() => {
    const d = currentTime;
    const utHours = d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600;
    const gmst = (utHours * 1.0027379) % 24;
    const h = Math.floor(gmst);
    const m = Math.floor((gmst - h) * 60);
    const s = Math.floor(((gmst - h) * 60 - m) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} GMST`;
  }, [currentTime]);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Real-time Ephemeris Pulse Bar */}
      <div className="max-w-7xl mx-auto w-full mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl text-[11px] font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE CELESTIAL EPHEMERIS
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">Lahiri Ayanamsha: 24° 11' 14"</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-[#C9A86A]">
              <Clock className="w-3.5 h-3.5" />
              {gmstString}
            </span>
            <span className="text-slate-200 font-semibold">
              Tithi: <span className="text-cyan-300">{livePanchang.tithi}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Human-First Value Copy */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[11px] font-mono tracking-widest text-[#C9A86A] uppercase shadow-[0_0_15px_rgba(201,168,106,0.15)]"
          >
            <Sparkles className="w-3 h-3 animate-pulse text-[#C9A86A]" />
            <span>High-Precision Astronomical Ephemeris • Sidereal & Tropical</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] font-serif"
          >
            What does the sky say about{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C9A86A] via-[#E6D5AC] to-[#C9A86A]">
              your chart?
            </span>
          </motion.h1>

          {/* Supporting Natural Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
          >
            A precision astronomical calculation engine and multi-tradition astrological observatory. Enter your exact birth time and location to map your planetary positions, houses, dashas, and classical interpretations with Swiss Ephemeris accuracy.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] text-sm font-bold shadow-[0_0_25px_rgba(201,168,106,0.35)] hover:shadow-[0_0_35px_rgba(201,168,106,0.6)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Create Your Birth Chart</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreHoroscope}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-slate-200 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-[#C9A86A]" />
              <span>Explore Astrology Tools</span>
            </button>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-2 font-mono"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Free Complete Access
            </span>
            <span className="text-slate-600">•</span>
            <span>Real-time Astronomical Positions</span>
          </motion.div>
        </div>

        {/* Right Column: Live Real-Time Interactive Birth-Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center z-10"
        >
          <div className="relative w-full max-w-[430px] aspect-square rounded-3xl p-5 bg-gradient-to-b from-[#0D1220]/90 to-[#070A12]/95 border border-[#C9A86A]/30 shadow-[0_16px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between select-none">
            
            {/* Header Telemetry */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/[0.06] pb-3">
              <span className="flex items-center gap-1.5 text-[#C9A86A]">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Live Astronomical Wheel
              </span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Real-Time Ephemeris
              </span>
            </div>

            {/* Central Interactive Wheel */}
            <div className="relative w-full aspect-square flex items-center justify-center my-2">
              
              {/* Outer Zodiac Ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-[#C9A86A]/30 animate-[spin_120s_linear_infinite]" />
              
              {/* Inner Concentric Rings */}
              <div className="absolute inset-8 rounded-full border border-white/[0.08]" />
              <div className="absolute inset-16 rounded-full border border-[#C9A86A]/20 bg-white/[0.01]" />

              {/* Diamond Vedic Kundli House Cross */}
              <svg className="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] opacity-35 stroke-[#C9A86A]" viewBox="0 0 100 100" fill="none">
                <rect x="15" y="15" width="70" height="70" strokeWidth="0.8" />
                <line x1="15" y1="15" x2="85" y2="85" strokeWidth="0.6" />
                <line x1="15" y1="85" x2="85" y2="15" strokeWidth="0.6" />
                <polygon points="50,15 85,50 50,85 15,50" strokeWidth="0.8" />
              </svg>

              {/* 12 Zodiac Symbols on Outer Orbit */}
              {ZODIAC_RING.map((z, idx) => {
                const angle = (idx * 30 - 90) * (Math.PI / 180);
                const radius = 42; // percent
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                const isHovered = hoveredZodiac === z.name;

                return (
                  <button
                    key={z.name}
                    onMouseEnter={() => setHoveredZodiac(z.name)}
                    onMouseLeave={() => setHoveredZodiac(null)}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-[#C9A86A] text-[#070A12] scale-125 shadow-[0_0_12px_rgba(201,168,106,0.8)] z-20 font-bold'
                        : 'text-slate-400 hover:text-white bg-black/50 hover:bg-white/10'
                    }`}
                    title={`${z.name} (${z.element})`}
                  >
                    {z.symbol}
                  </button>
                );
              })}

              {/* Real-time Planetary Hotspots */}
              {livePlanets.map((planet, idx) => {
                const angle = (planet.degreeDecimal - 90) * (Math.PI / 180);
                const radius = 26 + (idx % 3) * 6; // slightly varied radius so they don't overlap
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                const isSelected = activePlanet?.name === planet.name;

                return (
                  <motion.button
                    key={planet.name}
                    onClick={() => setSelectedPlanetName(planet.name)}
                    whileHover={{ scale: 1.3 }}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white text-black ring-4 ring-[#C9A86A]/40 shadow-[0_0_20px_rgba(201,168,106,0.9)] z-30 scale-110'
                        : 'bg-black/80 border border-white/20 text-slate-300 hover:border-[#C9A86A] z-10'
                    }`}
                    title={`${planet.name} in ${planet.sign}`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: planet.color || '#C9A86A' }}
                    />
                  </motion.button>
                );
              })}

              {/* Center Ascendant Core */}
              <div className="z-10 text-center p-3 rounded-2xl bg-[#070A12]/95 border border-white/[0.1] shadow-xl backdrop-blur-md">
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#C9A86A]">Current Lagna</div>
                <div className="text-sm font-bold text-white font-serif">{livePanchang.sunSign || 'Leo'} ♌</div>
                <div className="text-[9px] text-cyan-300 font-mono">{livePanchang.nakshatra} Nakshatra</div>
              </div>
            </div>

            {/* Active Planetary Telemetry Card */}
            {activePlanet && (
              <div className="mt-1 p-3 rounded-xl bg-white/[0.04] border border-[#C9A86A]/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activePlanet.color || '#C9A86A' }}
                  />
                  <div>
                    <div className="font-bold text-slate-100">{activePlanet.name} {activePlanet.symbol} in {activePlanet.sign}</div>
                    <div className="text-[10.5px] text-slate-400 font-mono">
                      {activePlanet.degree} • {activePlanet.nakshatra} (Pada {activePlanet.pada}) {activePlanet.retrograde ? '• [Retrograde ℞]' : ''}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C9A86A]/15 text-[#C9A86A] border border-[#C9A86A]/25">
                  Live Coordinate
                </span>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
