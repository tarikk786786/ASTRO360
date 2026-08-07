import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Sparkles, Volume2, ShieldCheck, Sun, Moon, Compass, CheckCircle2 } from 'lucide-react';
import type { PlanetPosition } from '../lib/astroCalculations';

interface SacredChakraAlignmentProps {
  planetPositions?: PlanetPosition[];
}

const CHAKRAS = [
  {
    name: 'Muladhara (Root Chakra)',
    hz: '396 Hz',
    planet: 'Saturn ♄',
    element: 'Earth 🌍',
    color: 'border-red-500 text-red-400 bg-red-500/10',
    glyph: '🔴',
    desc: 'Grounding, physical security, survival instincts & financial stability.',
    mudra: 'Prithvi Mudra (Ring finger to thumb tip)',
    affirmation: 'I am safe, grounded, and supported by the universe.'
  },
  {
    name: 'Svadhisthana (Sacral Chakra)',
    hz: '417 Hz',
    planet: 'Jupiter ♃ / Mars ♂',
    element: 'Water 🌊',
    color: 'border-orange-500 text-orange-400 bg-orange-500/10',
    glyph: '🟠',
    desc: 'Creative expression, emotional flow, passion & adaptability.',
    mudra: 'Varuna Mudra (Little finger to thumb tip)',
    affirmation: 'I embrace change, creativity, and healthy emotional flow.'
  },
  {
    name: 'Manipura (Solar Plexus)',
    hz: '528 Hz',
    planet: 'Sun ☉ / Mars ♂',
    element: 'Fire 🔥',
    color: 'border-yellow-500 text-amber-300 bg-amber-500/10',
    glyph: '🟡',
    desc: 'Personal power, willpower, executive decision-making & digestive fire.',
    mudra: 'Surya Mudra (Ring finger pressed under thumb)',
    affirmation: 'I am confident, powerful, and execute my purpose with clarity.'
  },
  {
    name: 'Anahata (Heart Chakra)',
    hz: '639 Hz',
    planet: 'Venus ♀',
    element: 'Air 💨',
    color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
    glyph: '🟢',
    desc: 'Unconditional love, compassion, relationship synergy & forgiveness.',
    mudra: 'Vayu Mudra (Index finger pressed under thumb)',
    affirmation: 'I give and receive love effortlessly and freely.'
  },
  {
    name: 'Vishuddha (Throat Chakra)',
    hz: '741 Hz',
    planet: 'Mercury ☿',
    element: 'Ether ✨',
    color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
    glyph: '🔵',
    desc: 'Truthful communication, public speaking, negotiation & artistic voice.',
    mudra: 'Akash Mudra (Middle finger to thumb tip)',
    affirmation: 'I speak my truth with clarity, wisdom, and grace.'
  },
  {
    name: 'Ajna (Third Eye Chakra)',
    hz: '852 Hz',
    planet: 'Moon ☽ / Rahu ☊',
    element: 'Light 💡',
    color: 'border-indigo-500 text-indigo-300 bg-indigo-500/10',
    glyph: '🟣',
    desc: 'Intuition, strategic foresight, vivid dreaming & mental focus.',
    mudra: 'Hakini Mudra (All fingertips touching lightly)',
    affirmation: 'I trust my inner vision and cosmic intuition.'
  },
  {
    name: 'Sahasrara (Crown Chakra)',
    hz: '963 Hz',
    planet: 'Ketu ☋ / Universal Sol',
    element: 'Pure Consciousness 🌌',
    color: 'border-purple-500 text-purple-300 bg-purple-500/10',
    glyph: '⚪',
    desc: 'Spiritual connection, transcendent awareness & divine unity.',
    mudra: 'Dhyana Mudra (Hands resting palms upward in lap)',
    affirmation: 'I am one with divine wisdom and cosmic light.'
  }
];

export default function SacredChakraAlignment({ planetPositions }: SacredChakraAlignmentProps) {
  const [selectedChakra, setSelectedChakra] = useState(CHAKRAS[2]); // Manipura default
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-purple-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" /> Sacred Geometry & 7-Chakra Solfeggio Frequency Alignment
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Planetary Rulerships, Solfeggio Sound Frequencies (396Hz–963Hz) & Sacred Mudra Guidance
          </p>
        </div>
        <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30 font-bold">
          Kundalini Solfeggio Matrix
        </span>
      </div>

      {/* 7 CHAKRA PILLS SELECTOR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {CHAKRAS.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedChakra(ch)}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
              selectedChakra.name === ch.name
                ? 'bg-purple-500/20 border-purple-400 text-white scale-105 shadow-lg'
                : 'bg-[#0B1220] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-lg">{ch.glyph}</span>
            <span className="text-[10px] font-mono font-bold text-center leading-tight truncate w-full">{ch.name.split(' ')[0]}</span>
            <span className="text-[9px] font-mono text-purple-300 font-bold">{ch.hz}</span>
          </button>
        ))}
      </div>

      {/* SELECTED CHAKRA TELEMETRY CARD */}
      <div className="p-5 rounded-2xl bg-[#0B1220] border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedChakra.glyph}</span>
            <div>
              <h4 className="text-base font-bold text-white">{selectedChakra.name}</h4>
              <span className="text-xs font-mono text-purple-300 font-bold">Solfeggio Frequency: {selectedChakra.hz}</span>
            </div>
          </div>

          <button
            onClick={() => setIsPlayingSound(!isPlayingSound)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-2 ${
              isPlayingSound
                ? 'bg-purple-500/30 text-purple-200 border-purple-400 animate-pulse'
                : 'bg-white/5 text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <Volume2 className="w-4 h-4 text-purple-400" />
            {isPlayingSound ? `Resonating at ${selectedChakra.hz}...` : `Play ${selectedChakra.hz} Sound`}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 block">Planetary Ruler & Element</span>
            <span className="font-bold text-cyan-300 block">{selectedChakra.planet}</span>
            <span className="text-emerald-400 block">{selectedChakra.element}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 block">Sacred Mudra Gesture</span>
            <span className="font-bold text-amber-300 block">{selectedChakra.mudra}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 block">Daily Alignment Affirmation</span>
            <span className="font-semibold text-purple-200 block italic">"{selectedChakra.affirmation}"</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          <strong className="text-purple-300">Cosmic Function:</strong> {selectedChakra.desc}
        </p>
      </div>
    </div>
  );
}
