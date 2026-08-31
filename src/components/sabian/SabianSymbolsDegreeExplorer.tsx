import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Compass, Search, Star, Eye, 
  Layers, ArrowRight, Check, BookOpen, ShieldCheck
} from 'lucide-react';

interface SabianDegree {
  sign: string;
  degreeNumber: number; // 1 to 30
  symbolName: string;
  keyword: string;
  archetype: string;
  evolutionaryTheme: string;
  shadowPitfall: string;
}

const SAMPLE_SABIAN_DEGREES: SabianDegree[] = [
  {
    sign: 'Aries ♈',
    degreeNumber: 1,
    symbolName: 'A Woman Just Risen From The Sea; A Seal Is Embracing Her',
    keyword: 'Emergence',
    archetype: 'The Primal Dawn',
    evolutionaryTheme: 'Emergence of self-conscious awareness from the primordial unconscious ocean.',
    shadowPitfall: 'Fear of regression into unconscious instincts.'
  },
  {
    sign: 'Leo ♌',
    degreeNumber: 15,
    symbolName: 'A Pageant Moving Along A Street Packed With Cheering People',
    keyword: 'Demonstration',
    archetype: 'The Radiant Monarch',
    evolutionaryTheme: 'The capacity to dramatize human achievements and inspire collective joy.',
    shadowPitfall: 'Addiction to external validation and vanity.'
  },
  {
    sign: 'Scorpio ♏',
    degreeNumber: 21,
    symbolName: 'A Soldier Derelict In His Duty Resisting An Unjust Military Order',
    keyword: 'Conscience',
    archetype: 'The Sovereign Rebel',
    evolutionaryTheme: 'Refusal to subordinate individual moral conscience to institutional coercion.',
    shadowPitfall: 'Self-destructive defiance without a higher moral cause.'
  },
  {
    sign: 'Aquarius ♒',
    degreeNumber: 10,
    symbolName: 'A Man Who Had For A Time Become The Embodiment Of An Ideal',
    keyword: 'Personification',
    archetype: 'The Living Avatar',
    evolutionaryTheme: 'The capacity to translate abstract cosmic visions into concrete human example.',
    shadowPitfall: 'Messianic complex and dogmatic rigidity.'
  },
  {
    sign: 'Pisces ♓',
    degreeNumber: 30,
    symbolName: 'A Majestic Rock Formation Resembling A Noble Face Looking East',
    keyword: 'Archetypal Permanence',
    archetype: 'The Eternal Watcher',
    evolutionaryTheme: 'Enduring spiritual identity unaffected by temporal storm or cyclic decay.',
    shadowPitfall: 'Petrification of consciousness and refusal to adapt.'
  }
];

export default function SabianSymbolsDegreeExplorer() {
  const [selectedSign, setSelectedSign] = useState<string>('Leo ♌');
  const [selectedDegreeNum, setSelectedDegreeNum] = useState<number>(15);
  const [searchQuery, setSearchQuery] = useState('');

  const currentDegree = SAMPLE_SABIAN_DEGREES.find(
    d => d.sign === selectedSign && d.degreeNumber === selectedDegreeNum
  ) || SAMPLE_SABIAN_DEGREES[1];

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/25 text-purple-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>360° Clairvoyant Degree Symbolism</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            SABIAN SYMBOLS DEGREE EXPLORER
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Explore the archetypal clairvoyant visions for all 360 zodiac degrees channeled by Marc Edmund Jones and Dane Rudhyar.
          </p>
        </div>
      </div>

      {/* Degree Selector & Sign Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sign & Degree Selection Matrix */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-4 font-mono text-xs">
          <span className="text-xs font-bold text-white uppercase block">Select Zodiac Sign & Degree:</span>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
            {[
              'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋',
              'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏',
              'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
            ].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSign(s)}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer text-[11px] ${
                  selectedSign === s
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md'
                    : 'bg-[#060A12] text-slate-400 hover:text-white border-white/8'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-white/8">
            <span className="text-[11px] text-slate-400 block">Degree Dial (1° to 30°):</span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={30}
                value={selectedDegreeNum}
                onChange={(e) => setSelectedDegreeNum(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <span className="text-amber-300 font-bold text-sm min-w-[36px] text-right">
                {selectedDegreeNum}°
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#060A12] border border-white/8 space-y-1">
            <span className="text-[10px] text-slate-400 block">Active Degree Coordinate:</span>
            <strong className="text-white text-xs block">{selectedSign} at {selectedDegreeNum}°00' – {selectedDegreeNum}°59'</strong>
          </div>
        </div>

        {/* Right Column: Sabian Symbol Detailed Oracle Card */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-5 font-mono text-xs">
          
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase block">Sabian Degree #{selectedDegreeNum}</span>
              <h3 className="text-base font-bold text-white font-sans">{selectedSign} {selectedDegreeNum}°</h3>
            </div>
            <span className="text-xs text-purple-300 bg-purple-400/10 px-3 py-1 rounded-xl border border-purple-400/20 font-bold">
              {currentDegree.keyword}
            </span>
          </div>

          {/* Symbol Visualization Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#060A12] to-[#121B2D] border border-amber-400/30 text-center space-y-2">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Channeled Clairvoyant Vision</span>
            <p className="text-base sm:text-lg font-serif text-amber-200 font-bold leading-snug">
              "{currentDegree.symbolName}"
            </p>
            <span className="text-xs text-slate-400 font-sans block">
              Archetypal Role: <strong className="text-white">{currentDegree.archetype}</strong>
            </span>
          </div>

          {/* Evolutionary Theme */}
          <div className="p-4 rounded-2xl bg-emerald-400/5 border border-emerald-400/15 space-y-1 font-sans">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">Evolutionary Spiritual Gift:</span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{currentDegree.evolutionaryTheme}</p>
          </div>

          {/* Shadow Pitfall */}
          <div className="p-4 rounded-2xl bg-rose-400/5 border border-rose-400/15 space-y-1 font-sans">
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block">Shadow Vulnerability to Transmute:</span>
            <p className="text-xs text-slate-300 leading-relaxed">{currentDegree.shadowPitfall}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
