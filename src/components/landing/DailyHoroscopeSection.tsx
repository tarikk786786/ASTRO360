import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart, Briefcase, Zap, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DailyHoroscopeSectionProps {
  onReadFullHoroscope: (sign: string) => void;
}

const ZODIAC_SIGNS = [
  { id: 'aries', symbol: '♈', name: 'Aries', dates: 'Mar 21 – Apr 19', element: 'Fire', ruler: 'Mars', energy: 85, love: 75, career: 90, forecast: 'Today presents high initiative and decisive clarity. The Moon’s favorable aspect empowers bold conversations and proactive career moves.' },
  { id: 'taurus', symbol: '♉', name: 'Taurus', dates: 'Apr 20 – May 20', element: 'Earth', ruler: 'Venus', energy: 80, love: 92, career: 82, forecast: 'Patience brings unexpected rewards today. Focus on grounding routines, financial planning, and cultivating warmth in your personal connections.' },
  { id: 'gemini', symbol: '♊', name: 'Gemini', dates: 'May 21 – Jun 20', element: 'Air', ruler: 'Mercury', energy: 90, love: 80, career: 88, forecast: 'A day of intellectual breakthroughs and lively collaborations. Ideas shared with teammates or mentors gain fast momentum.' },
  { id: 'cancer', symbol: '♋', name: 'Cancer', dates: 'Jun 21 – Jul 22', element: 'Water', ruler: 'Moon', energy: 78, love: 95, career: 76, forecast: 'Trust your intuitive compass today. Emotional clarity allows you to resolve lingering misunderstandings and create domestic sanctuary.' },
  { id: 'leo', symbol: '♌', name: 'Leo', dates: 'Jul 23 – Aug 22', element: 'Fire', ruler: 'Sun', energy: 92, love: 85, career: 94, forecast: 'Your natural executive presence shines brightly. Step up to lead a project or express your creative vision with authentic confidence.' },
  { id: 'virgo', symbol: '♍', name: 'Virgo', dates: 'Aug 23 – Sep 22', element: 'Earth', ruler: 'Mercury', energy: 82, love: 78, career: 92, forecast: 'Strategic precision is your superpower today. Organizing complex tasks and refining work systems yields immediate peace of mind.' },
  { id: 'libra', symbol: '♎', name: 'Libra', dates: 'Sep 23 – Oct 22', element: 'Air', ruler: 'Venus', energy: 84, love: 94, career: 80, forecast: 'Harmonious social vibrations favor negotiations, creative collaborations, and romantic intimacy. Balance action with restful contemplation.' },
  { id: 'scorpio', symbol: '♏', name: 'Scorpio', dates: 'Oct 23 – Nov 21', element: 'Water', ruler: 'Mars & Ketu', energy: 88, love: 84, career: 91, forecast: 'Deep investigative focus helps you solve a challenging technical or emotional puzzle. Your resilience inspires those around you.' },
  { id: 'sagittarius', symbol: '♐', name: 'Sagittarius', dates: 'Nov 22 – Dec 21', element: 'Fire', ruler: 'Jupiter', energy: 94, love: 82, career: 87, forecast: 'Philosophical optimism and expansive ideas take center stage. An ideal moment to outline long-term educational or travel goals.' },
  { id: 'capricorn', symbol: '♑', name: 'Capricorn', dates: 'Dec 22 – Jan 19', element: 'Earth', ruler: 'Saturn', energy: 86, love: 76, career: 96, forecast: 'Disciplined progress on high-stakes objectives. Senior colleagues acknowledge your dependability and structured foresight.' },
  { id: 'aquarius', symbol: '♒', name: 'Aquarius', dates: 'Jan 20 – Feb 18', element: 'Air', ruler: 'Saturn & Rahu', energy: 87, love: 88, career: 89, forecast: 'Innovative group work and humanitarian thinking open new horizons. Embrace unconventional approaches to existing routines.' },
  { id: 'pisces', symbol: '♓', name: 'Pisces', dates: 'Feb 19 – Mar 20', element: 'Water', ruler: 'Jupiter', energy: 80, love: 96, career: 84, forecast: 'Heightened creative and spiritual sensitivity. Dedicate time to artistic creation, meditation, and compassionate service.' },
];

export default function DailyHoroscopeSection({ onReadFullHoroscope }: DailyHoroscopeSectionProps) {
  const [selectedSign, setSelectedSign] = useState(ZODIAC_SIGNS[0]);

  return (
    <section id="horoscope-section" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Real-Time Celestial Transits
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Today’s Planetary Insights
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            Select your zodiac sign to view transit dynamics, energy ratings, and focal themes for today.
          </p>
        </div>

        {/* Horizontal Zodiac Selector */}
        <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar max-w-5xl mx-auto mb-10 px-2 justify-start sm:justify-center">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = selectedSign.id === sign.id;
            return (
              <button
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className={`flex flex-col items-center justify-center min-w-[72px] sm:min-w-[80px] p-3 rounded-2xl transition-all cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? 'bg-[#C9A86A] text-[#070A12] shadow-[0_0_20px_rgba(201,168,106,0.4)] scale-105'
                    : 'bg-[#0D1220]/80 hover:bg-[#0D1220] text-slate-300 border border-white/[0.06]'
                }`}
              >
                <span className="text-xl mb-1">{sign.symbol}</span>
                <span className="text-xs font-bold font-serif">{sign.name}</span>
                <span className={`text-[9px] font-mono mt-0.5 ${isSelected ? 'text-[#070A12]/80' : 'text-slate-500'}`}>
                  {sign.element}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Sign Detailed Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSign.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0D1220]/90 border border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Sign Identity & Daily Forecast */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/30 flex items-center justify-center text-2xl text-[#C9A86A]">
                    {selectedSign.symbol}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-serif">{selectedSign.name}</h3>
                    <div className="text-xs text-slate-400 font-mono">
                      {selectedSign.dates} • Ruler: {selectedSign.ruler}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-normal pt-2">
                  {selectedSign.forecast}
                </p>

                <div className="pt-3">
                  <button
                    onClick={() => onReadFullHoroscope(selectedSign.id)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] text-xs font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Read Full Daily Horoscope for {selectedSign.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Energy Metrics */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider block">
                  Today's Vitality Indices
                </span>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> Vital Energy</span>
                      <span className="font-mono">{selectedSign.energy}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedSign.energy}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-rose-400" /> Relationship Flow</span>
                      <span className="font-mono">{selectedSign.love}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full bg-rose-400 rounded-full" style={{ width: `${selectedSign.love}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Career Momentum</span>
                      <span className="font-mono">{selectedSign.career}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${selectedSign.career}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onReadFullHoroscope(selectedSign.name)}
                    className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Read Full {selectedSign.name} Horoscope & Transits</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A86A]" />
                  </button>
                </div>

                <div className="pt-1 text-[10px] font-mono text-slate-500 text-center">
                  Updated every sunrise based on sidereal planetary ingress.
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
