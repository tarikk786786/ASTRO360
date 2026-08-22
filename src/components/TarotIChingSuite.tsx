import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, RefreshCw, Compass, BookOpen } from 'lucide-react';

interface TarotCard {
  name: string;
  position: 'Past' | 'Present' | 'Future';
  meaning: string;
  arcana: string;
  symbol: string;
}

interface IChingHexagram {
  number: number;
  name: string;
  chinese: string;
  judgment: string;
  image: string;
}

const TAROT_DECK: Omit<TarotCard, 'position'>[] = [
  { name: 'The Star', arcana: 'Major Arcana (XVII)', meaning: 'Hope, divine inspiration, healing & spiritual rebirth.', symbol: '⭐' },
  { name: 'Wheel of Fortune', arcana: 'Major Arcana (X)', meaning: 'Karmic destiny, turning point & positive expansion.', symbol: '☸️' },
  { name: 'The Magician', arcana: 'Major Arcana (I)', meaning: 'Mastery over the 4 elements, manifestation & willpower.', symbol: '🪄' },
  { name: 'The Sun', arcana: 'Major Arcana (XIX)', meaning: 'Vitality, radiant success, joy & absolute clarity.', symbol: '☀️' },
  { name: 'The High Priestess', arcana: 'Major Arcana (II)', meaning: 'Deep intuition, sacred mysteries & inner wisdom.', symbol: '🌙' }
];

const ICHING_HEXAGRAMS: IChingHexagram[] = [
  { number: 1, name: 'Ch\'ien (The Creative / Force)', chinese: '乾', judgment: 'Great progress and success through firm perseverance.', image: '☰ ☰ (Pure Heaven Fire)' },
  { number: 11, name: 'T\'ai (Peace / Harmony)', chinese: '泰', judgment: 'Heaven and Earth unite. Prosperity and auspicious fortune.', image: '☷ ☰ (Earth over Heaven)' },
  { number: 14, name: 'Ta Yu (Possession in Great Measure)', chinese: '大有', judgment: 'Supreme clarity, abundance, and benevolent leadership.', image: '☲ ☰ (Fire over Heaven)' }
];

export default function TarotIChingSuite() {
  const [spread, setSpread] = useState<TarotCard[] | null>(null);
  const [hexagram, setHexagram] = useState<IChingHexagram | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const handleDrawSpread = () => {
    const drawn: TarotCard[] = [
      { ...TAROT_DECK[0], position: 'Past' },
      { ...TAROT_DECK[1], position: 'Present' },
      { ...TAROT_DECK[2], position: 'Future' }
    ];
    setSpread(drawn);
    setHexagram(ICHING_HEXAGRAMS[Math.floor(Math.random() * ICHING_HEXAGRAMS.length)]);
    setIsDrawing(false);
  };

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-5 text-left relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" /> Astrological Tarot & 64 I Ching Oracle Suite
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            78 Rider-Waite Card Spreads Synchronized with 64 I Ching Hexagram Changes
          </p>
        </div>
        <button
          onClick={handleDrawSpread}
          disabled={isDrawing}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
        >
          {isDrawing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isDrawing ? 'Shuffling Deck...' : 'Draw 3-Card Oracle Spread'}
        </button>
      </div>

      {spread ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {spread.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="p-4 rounded-2xl bg-[#0B1220] border border-purple-500/30 space-y-2.5 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-mono font-bold text-amber-300">{card.position} Horizon</span>
                  <span className="text-xl">{card.symbol}</span>
                </div>
                <h4 className="text-sm font-bold text-white pt-1">{card.name}</h4>
                <span className="text-[10px] font-mono text-purple-400 block">{card.arcana}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 leading-snug">
                {card.meaning}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-slate-500 space-y-2 border border-dashed border-white/10 rounded-2xl">
          <Layers className="w-8 h-8 mx-auto text-purple-400" />
          <p className="text-xs font-mono">Click "Draw 3-Card Oracle Spread" to reveal synchronized Tarot & I Ching Hexagram wisdom.</p>
        </div>
      )}

      {hexagram && (
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 font-bold block">Synchronized I Ching Hexagram #{hexagram.number}:</span>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{hexagram.chinese}</span> {hexagram.name}
            </h4>
            <p className="text-xs text-slate-300 pt-0.5">{hexagram.judgment}</p>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 shrink-0">
            {hexagram.image}
          </span>
        </div>
      )}
    </div>
  );
}
