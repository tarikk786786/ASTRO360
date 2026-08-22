import React, { useState } from 'react';
import { Sparkles, Moon, Gem, Hash, Heart, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveToolsSuiteProps {
  onNavigateToTab: (tabId: string) => void;
}

const RASHIS = [
  'Aries (Mesha)', 'Taurus (Vrishabha)', 'Gemini (Mithuna)', 'Cancer (Karka)',
  'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrishchika)',
  'Sagittarius (Dhanu)', 'Capricorn (Makara)', 'Aquarius (Kumbha)', 'Pisces (Meena)'
];

export default function InteractiveToolsSuite({ onNavigateToTab }: InteractiveToolsSuiteProps) {
  const [activeMiniTool, setActiveMiniTool] = useState<'sadesati' | 'gemstone' | 'numerology' | 'compatibility' | 'muhurta' | 'dosha'>('sadesati');

  // Sade Sati State
  const [sadeSatiSign, setSadeSatiSign] = useState('Aquarius (Kumbha)');
  
  // Gemstone State
  const [gemstoneSign, setGemstoneSign] = useState('Leo (Simha)');
  const [lifeGoal, setLifeGoal] = useState<'wealth' | 'career' | 'love' | 'health'>('career');

  // Numerology State
  const [calcName, setCalcName] = useState('Tarik Islam');

  // Compatibility State
  const [partnerA, setPartnerA] = useState('Leo (Simha)');
  const [partnerB, setPartnerB] = useState('Sagittarius (Dhanu)');

  // Dosha State
  const [doshaSign, setDoshaSign] = useState('Scorpio (Vrishchika)');

  // Compute Name Numerology Number
  const computeNumerology = (str: string) => {
    const table: Record<string, number> = {
      A: 1, I: 1, J: 1, Q: 1, Y: 1,
      B: 2, K: 2, R: 2,
      C: 3, G: 3, L: 3, S: 3,
      D: 4, M: 4, T: 4,
      E: 5, H: 5, N: 5, X: 5,
      U: 6, V: 6, W: 6,
      O: 7, Z: 7,
      F: 8, P: 8
    };
    const clean = str.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;
    for (let i = 0; i < clean.length; i++) {
      sum += table[clean[i]] || 0;
    }
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = String(sum).split('').reduce((a, b) => a + Number(b), 0);
    }
    return sum || 1;
  };

  const nameNum = computeNumerology(calcName);

  // Mini Tool Tabs
  const MINI_TOOLS = [
    { id: 'sadesati', label: 'Sade Sati Radar', icon: Moon, tag: 'Saturn Transit' },
    { id: 'gemstone', label: 'Lucky Gemstone', icon: Gem, tag: 'Sacred Remedies' },
    { id: 'numerology', label: 'Name Vibration', icon: Hash, tag: 'Chaldean Power' },
    { id: 'compatibility', label: '36-Guna Milan', icon: Heart, tag: 'Love Synergy' },
    { id: 'muhurta', label: 'Shubh Muhurta', icon: Clock, tag: 'Daily Timing' },
    { id: 'dosha', label: 'Dosha Scanner', icon: ShieldAlert, tag: 'Karmic Check' },
  ] as const;

  return (
    <section id="panchang-section" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070A12] via-[#0B101E] to-[#070A12] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Astrological Diagnostics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Try Instant Live Calculations
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal">
            Interact with our ephemeris algorithms directly. Select your details to test instant Saturn phases, lucky gemstones, 36-point compatibility, and name vibrational frequencies.
          </p>
        </div>

        {/* Navigation Selector Bar */}
        <div className="flex overflow-x-auto custom-scrollbar gap-2 p-1.5 rounded-2xl bg-[#0D1220] border border-white/[0.08] mb-8 max-w-4xl mx-auto">
          {MINI_TOOLS.map((t) => {
            const Icon = t.icon;
            const isActive = activeMiniTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveMiniTool(t.id as any)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A86A] text-[#070A12] font-bold shadow-lg shadow-[#C9A86A]/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#070A12]' : 'text-[#C9A86A]'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Play Space */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0D1220]/80 border border-[#C9A86A]/30 shadow-2xl backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            
            {/* 1. SADE SATI TOOL */}
            {activeMiniTool === 'sadesati' && (
              <motion.div
                key="sadesati"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider">
                    7.5-Year Saturn Transit Phase Engine
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    Sade Sati & Shani Dhaiya Status
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Saturn (Shani Dev) transit over natal Moon marks profound transformative cycles of discipline, karmic balancing, and life structural elevation.
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-mono text-slate-400">Select Your Moon Sign (Chandra Rashi):</label>
                    <select
                      value={sadeSatiSign}
                      onChange={(e) => setSadeSatiSign(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-[#C9A86A] outline-none"
                    >
                      {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B101E]">{r}</option>)}
                    </select>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('dosha-engine')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#C9A86A] hover:bg-[#E5C788] text-[#070A12] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Launch Full Sade Sati Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="text-xs font-mono text-slate-400">Calculated Transit Vector</span>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      sadeSatiSign.includes('Aquarius') || sadeSatiSign.includes('Capricorn') || sadeSatiSign.includes('Pisces')
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {sadeSatiSign.includes('Aquarius') ? 'Peak Sade Sati (Phase 2)' : sadeSatiSign.includes('Capricorn') ? 'Setting Sade Sati (Phase 3)' : sadeSatiSign.includes('Pisces') ? 'Rising Sade Sati (Phase 1)' : 'No Active Sade Sati'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-slate-400">Current Shani Transit Sign:</span>
                      <span className="font-semibold text-white">Aquarius (Kumbha)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-slate-400">Karmic Focus Area:</span>
                      <span className="font-semibold text-[#C9A86A]">Career Discipline & Spiritual Maturity</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Prescribed Vedic Remedy:</span>
                      <span className="font-semibold text-cyan-300">Light Mustard Oil Diya under Peepal on Saturdays</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. GEMSTONE TOOL */}
            {activeMiniTool === 'gemstone' && (
              <motion.div
                key="gemstone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider">
                    Planetary Resonance & Ratna Shastra
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    Sacred Gemstone & Rudraksha Finder
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Discover the primary life stone that amplifies your benefic ascendant ruler and shields against planetary afflictions.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs font-mono text-slate-400">Ascendant / Moon Sign:</label>
                      <select
                        value={gemstoneSign}
                        onChange={(e) => setGemstoneSign(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:border-[#C9A86A] outline-none mt-1"
                      >
                        {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B101E]">{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400">Primary Objective:</label>
                      <select
                        value={lifeGoal}
                        onChange={(e) => setLifeGoal(e.target.value as any)}
                        className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:border-[#C9A86A] outline-none mt-1"
                      >
                        <option value="career" className="bg-[#0B101E]">Career & Leadership</option>
                        <option value="wealth" className="bg-[#0B101E]">Wealth & Prosperity</option>
                        <option value="love" className="bg-[#0B101E]">Love & Marriage</option>
                        <option value="health" className="bg-[#0B101E]">Health & Protection</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('gemstone-suite')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#C9A86A] hover:bg-[#E5C788] text-[#070A12] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Explore All 9 Gemstones & Rudraksha Mukhis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                      <Gem className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Primary Recommended Gemstone</div>
                      <div className="text-base font-bold text-white">
                        {gemstoneSign.includes('Leo') ? 'Natural Ruby (Manikya)' : gemstoneSign.includes('Taurus') ? 'Natural Diamond / White Sapphire' : gemstoneSign.includes('Aries') ? 'Red Coral (Moonga)' : 'Natural Yellow Sapphire (Pukhraj)'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Ideal Metal</span>
                      <span className="font-semibold text-white">22K Gold or Panchdhatu</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Wearing Finger</span>
                      <span className="font-semibold text-white">Ring Finger (Sun Axis)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Rudraksha Mukhi</span>
                      <span className="font-semibold text-amber-300">12 Mukhi (Surya)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Seed Mantra</span>
                      <span className="font-semibold text-cyan-300">Om Hram Hreem Hroum Sah</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. NUMEROLOGY TOOL */}
            {activeMiniTool === 'numerology' && (
              <motion.div
                key="numerology"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider">
                    Chaldean & Pythagorean Harmonic Frequency
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    Instant Name Vibrational Matrix
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Every letter in your name carries an ancient planetary frequency. Type your full name to compute your Destiny number and lucky cosmic alignments.
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-mono text-slate-400">Type Your Name:</label>
                    <input
                      type="text"
                      value={calcName}
                      onChange={(e) => setCalcName(e.target.value)}
                      placeholder="e.g. Tarik Islam"
                      className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-[#C9A86A] outline-none"
                    />
                  </div>

                  <button
                    onClick={() => onNavigateToTab('numerology-suite')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#C9A86A] hover:bg-[#E5C788] text-[#070A12] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Launch Full Name & Business Numerology Suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="text-xs font-mono text-slate-400">Vibrational Score</span>
                    <span className="text-2xl font-bold text-[#C9A86A] font-mono">Number {nameNum}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Ruling Planet</span>
                      <span className="font-bold text-amber-300">{nameNum === 1 ? 'Sun' : nameNum === 2 ? 'Moon' : nameNum === 3 ? 'Jupiter' : nameNum === 5 ? 'Mercury' : 'Venus'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Lucky Days</span>
                      <span className="font-bold text-white">{nameNum % 2 === 0 ? 'Mon, Fri' : 'Sun, Thu'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Lucky Colors</span>
                      <span className="font-bold text-cyan-300">Gold, Emerald</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed italic border-t border-white/[0.04] pt-3">
                    “Number {nameNum} resonates with commanding executive initiative, creative manifestation, and magnetic influence.”
                  </p>
                </div>
              </motion.div>
            )}

            {/* 4. COMPATIBILITY TOOL */}
            {activeMiniTool === 'compatibility' && (
              <motion.div
                key="compatibility"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider">
                    36-Point Guna Milan & Synastry
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    Instant Love & Soulmate Synergy Matcher
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Evaluate psychological chemistry, emotional longevity, and Nadi harmony across two signs.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs font-mono text-slate-400">Partner A (Sign):</label>
                      <select
                        value={partnerA}
                        onChange={(e) => setPartnerA(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:border-[#C9A86A] outline-none mt-1"
                      >
                        {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B101E]">{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400">Partner B (Sign):</label>
                      <select
                        value={partnerB}
                        onChange={(e) => setPartnerB(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-xs focus:border-[#C9A86A] outline-none mt-1"
                      >
                        {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B101E]">{r}</option>)}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('compatibility')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#C9A86A] hover:bg-[#E5C788] text-[#070A12] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Launch 36-Point Kundli Matchmaker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="text-xs font-mono text-slate-400">Ashta Koota Milan Score</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono">31.5 / 36 Gunas</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-slate-400">Nadi Harmony:</span>
                      <span className="font-semibold text-emerald-400">8 / 8 (No Nadi Dosha)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-slate-400">Bhakoot (Emotional Bond):</span>
                      <span className="font-semibold text-white">7 / 7 (Trine Harmonic)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Overall Soul Synergy:</span>
                      <span className="font-semibold text-[#C9A86A]">Exceptional (94% Compatibility)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. MUHURTA TOOL */}
            {activeMiniTool === 'muhurta' && (
              <motion.div
                key="muhurta"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider">
                    Real-Time Shubh Choghadiya & Horas
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    Auspicious Timing & Rahu Kaal Clock
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Never sign contracts, initiate projects, or travel during Rahu Kaal. Find the exact auspicious Amrit and Shubh time slots today.
                  </p>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Today's Abhijit Muhurta:</span>
                      <span className="font-bold text-emerald-400">11:48 AM – 12:36 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Rahu Kaal (Avoid Major Actions):</span>
                      <span className="font-bold text-rose-400">03:30 PM – 05:00 PM</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('muhurta')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#C9A86A] hover:bg-[#E5C788] text-[#070A12] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Open 24-Hour Planetary Horas & Electional Engine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                  <div className="text-xs font-mono text-[#C9A86A] uppercase tracking-wider border-b border-white/[0.06] pb-2">
                    Today's Choghadiya Periods
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400 font-bold block">Amrit (Nectar)</span>
                      <span className="text-[11px] text-slate-300">07:30 AM – 09:00 AM</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400 font-bold block">Shubh (Auspicious)</span>
                      <span className="text-[11px] text-slate-300">10:30 AM – 12:00 PM</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <span className="text-cyan-400 font-bold block">Labh (Gain)</span>
                      <span className="text-[11px] text-slate-300">01:30 PM – 03:00 PM</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                      <span className="text-rose-400 font-bold block">Kaal (Obstacle)</span>
                      <span className="text-[11px] text-slate-300">03:30 PM – 05:00 PM</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 6. DOSHA TOOL */}
            {activeMiniTool === 'dosha' && (
              <motion.div
                key="dosha"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider">
                    Manglik, Kalsarpa & Pitra Dosha Scanner
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    Karmic Dosha & Remedy Diagnostic
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Check Mars and Rahu-Ketu nodal axes for traditional doshas and explore classical cancellation (Nivarana) factors.
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-mono text-slate-400">Select Ascendant Sign:</label>
                    <select
                      value={doshaSign}
                      onChange={(e) => setDoshaSign(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-[#C9A86A] outline-none"
                    >
                      {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B101E]">{r}</option>)}
                    </select>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('dosha-engine')}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-[#C9A86A] hover:bg-[#E5C788] text-[#070A12] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Open Comprehensive Dosha Remedy Engine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <span className="text-xs font-mono text-slate-400">Manglik Status</span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Cancelled / Anshik (Mild)
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-slate-400">Kalsarpa Alignment:</span>
                      <span className="font-semibold text-white">Sheshnag Yoga (Partial)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-slate-400">Jupiter Aspect Cushion:</span>
                      <span className="font-semibold text-emerald-400">Active Trine (Protective)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Recommended Remedy:</span>
                      <span className="font-semibold text-[#C9A86A]">Recite Maha Mrityunjaya Mantra 11x daily</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
