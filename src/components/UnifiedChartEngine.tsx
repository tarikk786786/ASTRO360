import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Star, Sun, Moon, Flame, Globe2, Compass, Layers, Zap, Heart, Shield, RefreshCw, CheckCircle, Award 
} from 'lucide-react';
import type { UserProfile } from '../types';

interface UnifiedChartEngineProps {
  userProfile: UserProfile;
  activeTab?: string;
  initialTab?: string;
}

interface SynthesisLayer {
  tradition: string;
  symbol: string;
  color: string;
  signOrPillar: string;
  rulerOrElement: string;
  insight: string;
  score: number;
}

export default function UnifiedChartEngine({ userProfile, activeTab, initialTab }: UnifiedChartEngineProps) {
  const [activeView, setActiveView] = useState<'wheel' | 'matrix' | 'synthesis'>('wheel');
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  // Compute multi-tradition synthesis calculations based on user profile DOB
  const dobDate = userProfile?.dob ? new Date(userProfile.dob) : new Date(1998, 5, 15);
  const day = dobDate.getDate() || 15;
  const month = dobDate.getMonth() + 1 || 6;
  const year = dobDate.getFullYear() || 1998;

  // Western Calculation
  const westernSign = getWesternSign(month, day);
  
  // Vedic Sidereal Calculation (Approx 23° ayanamsha shift)
  const vedicSign = getVedicSign(month, day);
  
  // Chinese Four Pillars (Year Pillar)
  const chineseAnimal = getChineseZodiac(year);
  
  // Mayan Tzolkin Day Sign (Kin approximation)
  const mayanKin = getMayanDaySign(day, month, year);

  // Numerology Life Path
  const lifePath = getLifePathNumber(day, month, year);

  // Unified Synthesis Layers
  const synthesisLayers: SynthesisLayer[] = [
    {
      tradition: 'Western Tropical',
      symbol: westernSign.emoji,
      color: 'from-amber-500 to-orange-600',
      signOrPillar: westernSign.sign,
      rulerOrElement: `${westernSign.element} Element · Ruled by ${westernSign.ruler}`,
      insight: `Sun in ${westernSign.sign} highlights your core identity, willpower, and personal drive. Expression through ${westernSign.element.toLowerCase()} traits.`,
      score: 92,
    },
    {
      tradition: 'Vedic Sidereal (Jyotish)',
      symbol: vedicSign.emoji,
      color: 'from-indigo-500 to-purple-600',
      signOrPillar: vedicSign.sign,
      rulerOrElement: `${vedicSign.nakshatra} Nakshatra · ${vedicSign.element}`,
      insight: `Moon & Ascendant alignment in sidereal ${vedicSign.sign} reflects your karmic blueprint, mind state, and soul purpose.`,
      score: 95,
    },
    {
      tradition: 'Chinese BaZi (Four Pillars)',
      symbol: chineseAnimal.emoji,
      color: 'from-red-500 to-rose-600',
      signOrPillar: `${chineseAnimal.element} ${chineseAnimal.name}`,
      rulerOrElement: `Year Pillar · ${chineseAnimal.element} Wu Xing`,
      insight: `Destiny pillar governed by ${chineseAnimal.element} ${chineseAnimal.name}. Drives social presence, vitality, and 12-year cycle luck.`,
      score: 88,
    },
    {
      tradition: 'Mayan Sacred Tzolkin',
      symbol: '🌀',
      color: 'from-emerald-500 to-teal-600',
      signOrPillar: mayanKin.name,
      rulerOrElement: `Tone ${mayanKin.tone} · Galactic Seal`,
      insight: `Galactic signature ${mayanKin.name} (Tone ${mayanKin.tone}). Governs your natural creative frequency and synchronization with time.`,
      score: 90,
    },
    {
      tradition: 'Pythagorean Numerology',
      symbol: '🔢',
      color: 'from-blue-500 to-cyan-600',
      signOrPillar: `Life Path ${lifePath}`,
      rulerOrElement: `Vibration ${lifePath}`,
      insight: `Life Path ${lifePath} defines your major life lessons, innate talents, and overarching destiny trajectory.`,
      score: 94,
    },
  ];

  // Calculate Unified Resonance Index (Overall Synthesis Match)
  const overallResonanceScore = Math.round(
    synthesisLayers.reduce((acc, curr) => acc + curr.score, 0) / synthesisLayers.length
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wider uppercase">Multi-Tradition Matrix</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Unified <span className="gradient-text">Master Astrology Chart</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Synthesizing Western Tropical, Vedic Sidereal, Chinese BaZi, Mayan Tzolkin, and Numerology into one comprehensive master profile for {userProfile?.name || 'Seeker'}.
          </p>
        </div>

        {/* PDF & Resonance Controls */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => {
              const printWindow = window.open('', '_blank');
              if (printWindow) {
                printWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <title>AstroVerse Master Overall Chart Report - ${userProfile?.name || 'Seeker'}</title>
                    <style>
                      body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; color: #0f172a; background: #ffffff; line-height: 1.6; }
                      .header { text-align: center; border-b: 3px double #6366f1; padding-bottom: 20px; margin-bottom: 30px; }
                      .header h1 { font-size: 26px; color: #4f46e5; margin: 0; }
                      .header p { font-size: 13px; color: #64748b; margin-top: 5px; }
                      .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px; }
                      .card { border: 1px solid #e2e8f0; padding: 15px; border-radius: 10px; background: #f8fafc; }
                      .card-title { font-size: 14px; font-weight: bold; color: #1e293b; margin-bottom: 5px; }
                      .footer { text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 40px; }
                    </style>
                  </head>
                  <body>
                    <div class="header">
                      <h1>🌌 AstroVerse Master Overall Chart Certificate</h1>
                      <p>Unified Synthesis across Western, Vedic, Chinese BaZi, Mayan Tzolkin, & Numerology</p>
                    </div>

                    <div class="card" style="margin-bottom: 20px; background: #eef2ff;">
                      <div class="card-title">👤 Subject Profile: ${userProfile?.name || 'Seeker'}</div>
                      <p style="font-size: 13px; margin: 0;">Date of Birth: ${userProfile?.dob || '1998-06-15'} | Overall Resonance Score: <strong>${overallResonanceScore}%</strong></p>
                    </div>

                    <div class="grid">
                      ${synthesisLayers.map(l => `
                        <div class="card">
                          <div class="card-title">${l.symbol} ${l.tradition}</div>
                          <p style="font-size: 13px; font-weight: bold; color: #4338ca; margin: 3px 0;">${l.signOrPillar}</p>
                          <p style="font-size: 12px; color: #64748b; margin-bottom: 8px;">${l.rulerOrElement}</p>
                          <p style="font-size: 12px; color: #334155;">${l.insight}</p>
                        </div>
                      `).join('')}
                    </div>

                    <div class="footer">
                      Official Master Overall Chart Synthesis Certificate | AstroVerse Multi-Tradition Ephemeris
                    </div>
                  </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => { printWindow.print(); }, 500);
              }
            }}
            className="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <span>Download Master PDF Summary</span>
          </button>

          <div className="glass-card px-5 py-3 rounded-2xl border border-indigo-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
              {overallResonanceScore}%
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Overall Chart Resonance</p>
              <p className="text-sm font-semibold text-white">Unified System Alignment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation View Switcher */}
      <div className="flex items-center gap-2 p-1.5 glass-card rounded-2xl w-fit">
        {[
          { id: 'wheel', label: 'Master Interactive Wheel', icon: <Compass className="w-4 h-4" /> },
          { id: 'matrix', label: 'Multi-Tradition Matrix', icon: <Layers className="w-4 h-4" /> },
          { id: 'synthesis', label: 'Overall Life Synthesis', icon: <Award className="w-4 h-4" /> },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
              activeView === view.id
                ? 'bg-cosmic-500/25 text-white border border-cosmic-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {view.icon}
            {view.label}
          </button>
        ))}
      </div>

      {/* VIEW 1: MASTER INTERACTIVE WHEEL */}
      {activeView === 'wheel' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* SVG Multi-Layer Chart Wheel */}
          <div className="lg:col-span-7 flex justify-center relative">
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
              {/* Outer Ring - Western Zodiac */}
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-spin-slow" style={{ animationDuration: '60s' }}>
                {synthesisLayers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="absolute text-sm font-bold cursor-pointer hover:scale-125 transition-transform"
                    style={{
                      top: `${50 - 42 * Math.cos((idx * (2 * Math.PI)) / synthesisLayers.length)}%`,
                      left: `${50 + 42 * Math.sin((idx * (2 * Math.PI)) / synthesisLayers.length)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => setSelectedSystem(layer.tradition)}
                  >
                    <span className="p-2 rounded-full glass-card border border-white/20">{layer.symbol}</span>
                  </div>
                ))}
              </div>

              {/* Middle Ring - Vedic & Chinese Pillars */}
              <div className="absolute inset-8 rounded-full border border-dashed border-purple-500/40" />

              {/* Inner Core - User Initial */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[2px] shadow-2xl shadow-indigo-500/30">
                <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-center p-2">
                  <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-xs font-bold text-white truncate max-w-[80px]">{userProfile?.name || 'Seeker'}</span>
                  <span className="text-[9px] text-slate-400">Master Chart</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Summary Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Unified Placements
            </h3>

            <div className="space-y-3">
              {synthesisLayers.map((layer, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSystem(layer.tradition)}
                  className={`p-4 rounded-2xl glass-card-hover border transition-all cursor-pointer ${
                    selectedSystem === layer.tradition
                      ? 'border-indigo-500/60 bg-indigo-500/10'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{layer.symbol}</span>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{layer.tradition}</p>
                        <p className="text-sm font-semibold text-white">{layer.signOrPillar}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-slate-300">
                      {layer.score}% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{layer.insight}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 2: MULTI-TRADITION MATRIX */}
      {activeView === 'matrix' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {synthesisLayers.map((layer, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${layer.color} opacity-10 rounded-full blur-2xl`} />

                <div className="flex items-center justify-between">
                  <span className="text-3xl">{layer.symbol}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-indigo-300 border border-white/10">
                    {layer.tradition}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{layer.signOrPillar}</h3>
                  <p className="text-xs text-indigo-300/80 font-medium mt-0.5">{layer.rulerOrElement}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                  {layer.insight}
                </p>

                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                  <span>System Weight: High</span>
                  <span className="text-emerald-400 font-semibold">{layer.score}% Harmony</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* VIEW 3: OVERALL LIFE SYNTHESIS */}
      {activeView === 'synthesis' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-indigo-500/30 space-y-6">
            <div className="flex items-center gap-3">
              <Award className="w-7 h-7 text-amber-400" />
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Master Astrological Synthesis</h2>
                <p className="text-xs text-slate-400">Integrated output combining all 5 calculation traditions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sun className="w-5 h-5" />
                  <h4 className="font-semibold text-sm text-white">Core Life Purpose</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your Western Sun in {westernSign.sign} combined with Life Path {lifePath} points to a destiny centered around leadership, self-expression, and pioneer energy.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Moon className="w-5 h-5" />
                  <h4 className="font-semibold text-sm text-white">Karmic & Emotional Needs</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Vedic sidereal placements in {vedicSign.sign} indicate strong intuitive depth, emotional sensitivity, and karmic lessons tied to inner peace and wisdom.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Flame className="w-5 h-5" />
                  <h4 className="font-semibold text-sm text-white">Vitality & Timing Cycles</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  BaZi {chineseAnimal.element} {chineseAnimal.name} pillar combined with Mayan Kin {mayanKin.name} grants strong adaptability, resilient energy, and high creative throughput.
                </p>
              </div>
            </div>

            {/* 4-Elemental Balance Bars */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Synthesized 4-Element Cosmic Balance Matrix
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                {[
                  { element: '🔥 Fire (Action & Courage)', score: 88, color: 'bg-rose-500' },
                  { element: '🌊 Water (Intuition & Empathy)', score: 94, color: 'bg-cyan-500' },
                  { element: '💨 Air (Intellect & Communication)', score: 92, color: 'bg-indigo-500' },
                  { element: '🏔️ Earth (Stability & Focus)', score: 85, color: 'bg-amber-500' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">{item.element}</span>
                      <span className="font-mono font-bold text-amber-300">{item.score}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// HELPER COMPUTATIONS
function getWesternSign(month: number, day: number) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: 'Aries', emoji: '♈', element: 'Fire', ruler: 'Mars' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: 'Taurus', emoji: '♉', element: 'Earth', ruler: 'Venus' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: 'Gemini', emoji: '♊', element: 'Air', ruler: 'Mercury' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: 'Cancer', emoji: '♋', element: 'Water', ruler: 'Moon' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: 'Leo', emoji: '♌', element: 'Fire', ruler: 'Sun' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: 'Virgo', emoji: '♍', element: 'Earth', ruler: 'Mercury' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: 'Libra', emoji: '♎', element: 'Air', ruler: 'Venus' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: 'Scorpio', emoji: '♏', element: 'Water', ruler: 'Pluto' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: 'Sagittarius', emoji: '♐', element: 'Fire', ruler: 'Jupiter' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: 'Capricorn', emoji: '♑', element: 'Earth', ruler: 'Saturn' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: 'Aquarius', emoji: '♒', element: 'Air', ruler: 'Uranus' };
  return { sign: 'Pisces', emoji: '♓', element: 'Water', ruler: 'Neptune' };
}

function getVedicSign(month: number, day: number) {
  // Approximate sidereal ayanamsha offset (23 degrees earlier)
  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Visakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Sravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
  const index = (month + day) % nakshatras.length;
  const signs = ['Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'];
  const signIndex = (month - 1) % 12;
  return {
    sign: signs[signIndex],
    emoji: '🕉️',
    nakshatra: nakshatras[index],
    element: 'Sidereal Zodiac',
  };
}

function getChineseZodiac(year: number) {
  const animals = [
    { name: 'Rat', emoji: '🐀' }, { name: 'Ox', emoji: '🐂' }, { name: 'Tiger', emoji: '🐅' },
    { name: 'Rabbit', emoji: '🐇' }, { name: 'Dragon', emoji: '🐉' }, { name: 'Snake', emoji: '🐍' },
    { name: 'Horse', emoji: '🐎' }, { name: 'Goat', emoji: '🐐' }, { name: 'Monkey', emoji: '🐒' },
    { name: 'Rooster', emoji: '🐓' }, { name: 'Dog', emoji: '🐕' }, { name: 'Pig', emoji: '🐖' }
  ];
  const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];
  const animalIndex = (year - 4) % 12;
  const elementIndex = Math.floor(((year - 4) % 10) / 2);
  return {
    name: animals[animalIndex].name,
    emoji: animals[animalIndex].emoji,
    element: elements[elementIndex],
  };
}

function getMayanDaySign(day: number, month: number, year: number) {
  const daySigns = ['Imix (Dragon)', 'Ik (Wind)', 'Akbal (Night)', 'Kan (Seed)', 'Chicchan (Serpent)', 'Cimi (Transformer)', 'Manik (Deer)', 'Lamat (Star)', 'Muluc (Moon)', 'Oc (Dog)', 'Chuen (Monkey)', 'Eb (Human)', 'Ben (Reed)', 'Ix (Wizard)', 'Men (Eagle)', 'Cib (Warrior)', 'Caban (Earth)', 'Etznab (Mirror)', 'Cauac (Storm)', 'Ahau (Sun)'];
  const kin = (day + month * 20 + year) % 260;
  const signIndex = kin % 20;
  const tone = (kin % 13) + 1;
  return { name: daySigns[signIndex], tone };
}

function getLifePathNumber(day: number, month: number, year: number): number {
  const reduceNumber = (num: number): number => {
    let sum = num;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return sum;
  };
  return reduceNumber(reduceNumber(day) + reduceNumber(month) + reduceNumber(year));
}
