import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Compass, Eye, Star, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreHoroscope: () => void;
}

const PLANETARY_POINTS = [
  { name: 'Sun ☉', sign: 'Aries', house: '1st House', degree: '14°22\'', color: '#F59E0B', x: 50, y: 15 },
  { name: 'Moon ☽', sign: 'Taurus', house: '2nd House', degree: '08°45\'', color: '#38BDF8', x: 78, y: 30 },
  { name: 'Mars ♂', sign: 'Capricorn', house: '10th House', degree: '22°10\'', color: '#EF4444', x: 82, y: 70 },
  { name: 'Jupiter ♃', sign: 'Pisces', house: '12th House', degree: '19°34\'', color: '#C9A86A', x: 50, y: 85 },
  { name: 'Venus ♀', sign: 'Libra', house: '7th House', degree: '04°50\'', color: '#EC4899', x: 20, y: 70 },
  { name: 'Saturn ♄', sign: 'Aquarius', house: '11th House', degree: '11°18\'', color: '#818CF8', x: 18, y: 30 },
];

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
  const [activePoint, setActivePoint] = useState<typeof PLANETARY_POINTS[0] | null>(PLANETARY_POINTS[0]);
  const [hoveredZodiac, setHoveredZodiac] = useState<string | null>(null);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Human-First Value Copy */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#C9A86A]/30 text-[11px] font-mono tracking-widest text-[#C9A86A] uppercase shadow-[0_0_15px_rgba(201,168,106,0.15)]"
          >
            <Sparkles className="w-3 h-3 animate-pulse text-[#C9A86A]" />
            <span>Vedic Astrology • Personalized Insights</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]"
          >
            Your birth chart has a story.{' '}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C9A86A] via-[#E6D5AC] to-[#C9A86A]">
              Discover yours.
            </span>
          </motion.h1>

          {/* Supporting Natural Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
          >
            Explore your personality, relationships, career, strengths, and life patterns through a personalized reading based on the exact moment and location you were born.
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
              <span>Get Your Free Birth Chart</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreHoroscope}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-slate-200 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-[#C9A86A]" />
              <span>Explore Astrology</span>
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
              No credit card required
            </span>
            <span className="text-slate-600">•</span>
            <span>Personalized to your birth details</span>
          </motion.div>
        </div>

        {/* Right Column: Interactive Birth-Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center z-10"
        >
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl p-5 bg-gradient-to-b from-[#0D1220]/90 to-[#070A12]/95 border border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between select-none">
            
            {/* Header Telemetry */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/[0.06] pb-3">
              <span className="flex items-center gap-1.5 text-[#C9A86A]">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Vedic Natal Wheel
              </span>
              <span className="text-slate-500">Lahiri Ayanamsa</span>
            </div>

            {/* Central Interactive Wheel */}
            <div className="relative w-full aspect-square flex items-center justify-center my-2">
              
              {/* Outer Zodiac Ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-[#C9A86A]/25" />
              
              {/* Inner Concentric Rings */}
              <div className="absolute inset-8 rounded-full border border-white/[0.06]" />
              <div className="absolute inset-16 rounded-full border border-[#C9A86A]/15 bg-white/[0.01]" />

              {/* Diamond Vedic Kundli House Cross */}
              <svg className="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] opacity-30 stroke-[#C9A86A]" viewBox="0 0 100 100" fill="none">
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
                        ? 'bg-[#C9A86A] text-[#070A12] scale-125 shadow-[0_0_12px_rgba(201,168,106,0.8)] z-20'
                        : 'text-slate-400 hover:text-white bg-black/40 hover:bg-white/10'
                    }`}
                    title={`${z.name} (${z.element})`}
                  >
                    {z.symbol}
                  </button>
                );
              })}

              {/* Planetary Interactive Hotspots */}
              {PLANETARY_POINTS.map((planet) => {
                const isSelected = activePoint?.name === planet.name;
                return (
                  <motion.button
                    key={planet.name}
                    onClick={() => setActivePoint(planet)}
                    whileHover={{ scale: 1.25 }}
                    style={{ left: `${planet.x}%`, top: `${planet.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white text-black ring-4 ring-[#C9A86A]/40 shadow-[0_0_20px_rgba(201,168,106,0.9)] z-30 scale-110'
                        : 'bg-black/80 border border-white/20 text-slate-300 hover:border-[#C9A86A] z-10'
                    }`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: planet.color }}
                    />
                  </motion.button>
                );
              })}

              {/* Center Ascendant Core */}
              <div className="z-10 text-center p-3 rounded-2xl bg-[#070A12]/90 border border-white/[0.1] shadow-xl backdrop-blur-md">
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#C9A86A]">Lagna (ASC)</div>
                <div className="text-sm font-bold text-white font-serif">Aries ♈</div>
                <div className="text-[9px] text-slate-400 font-mono">Ashwini Nakshatra</div>
              </div>
            </div>

            {/* Active Planetary Tooltip Box */}
            {activePoint && (
              <div className="mt-1 p-3 rounded-xl bg-white/[0.04] border border-[#C9A86A]/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activePoint.color }}
                  />
                  <div>
                    <div className="font-bold text-slate-100">{activePoint.name} in {activePoint.sign}</div>
                    <div className="text-[10.5px] text-slate-400 font-mono">{activePoint.house} • {activePoint.degree}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C9A86A]/15 text-[#C9A86A] border border-[#C9A86A]/25">
                  Direct Ingress
                </span>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
