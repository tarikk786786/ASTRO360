import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Moon, Gem, Hash, Heart, Clock, ShieldAlert, 
  ArrowRight, Compass, CheckCircle2, ShieldCheck, Sun, 
  Layers, HelpCircle, Activity, Star, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveToolsSuiteProps {
  onNavigateToTab: (tabId: string) => void;
}

const RASHIS = [
  'Aries (Mesha ♈)', 'Taurus (Vrishabha ♉)', 'Gemini (Mithuna ♊)', 'Cancer (Karka ♋)',
  'Leo (Simha ♌)', 'Virgo (Kanya ♍)', 'Libra (Tula ♎)', 'Scorpio (Vrishchika ♏)',
  'Sagittarius (Dhanu ♐)', 'Capricorn (Makara ♑)', 'Aquarius (Kumbha ♒)', 'Pisces (Meena ♓)'
];

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export default function InteractiveToolsSuite({ onNavigateToTab }: InteractiveToolsSuiteProps) {
  const [activeMiniTool, setActiveMiniTool] = useState<
    'sadesati' | 'compatibility' | 'nakshatra' | 'gemstone' | 'numerology' | 'muhurta' | 'dosha' | 'rectification'
  >('sadesati');

  // Sade Sati State
  const [sadeSatiSign, setSadeSatiSign] = useState('Aquarius (Kumbha ♒)');
  
  // Gemstone State
  const [gemstoneSign, setGemstoneSign] = useState('Leo (Simha ♌)');
  const [lifeGoal, setLifeGoal] = useState<'career' | 'wealth' | 'love' | 'health'>('career');

  // Numerology State
  const [calcName, setCalcName] = useState('Tarik Islam');

  // Compatibility State
  const [partnerA, setPartnerA] = useState('Leo (Simha ♌)');
  const [partnerB, setPartnerB] = useState('Sagittarius (Dhanu ♐)');

  // Nakshatra State
  const [selectedNakshatra, setSelectedNakshatra] = useState('Rohini');
  const [selectedPada, setSelectedPada] = useState<1 | 2 | 3 | 4>(2);

  // Dosha State
  const [doshaSign, setDoshaSign] = useState('Scorpio (Vrishchika ♏)');

  // Rectification State
  const [rectTrait, setRectTrait] = useState<'intellectual' | 'action' | 'creative' | 'leadership'>('leadership');

  // Compute Name Numerology Number (Chaldean System)
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

  // Compute Compatibility Guna Matrix
  const compatibilityScore = useMemo(() => {
    const idxA = RASHIS.findIndex(r => r === partnerA);
    const idxB = RASHIS.findIndex(r => r === partnerB);
    const diff = Math.abs(idxA - idxB);
    
    if (diff === 0) return { score: 28, label: 'Harmonious Resonance (Same Sign)', nadi: '8/8', bhakoot: '7/7' };
    if (diff === 4 || diff === 8) return { score: 32.5, label: 'Trine Soul Connection (9/5 Axis)', nadi: '8/8', bhakoot: '7/7' };
    if (diff === 2 || diff === 10) return { score: 29, label: 'Benefic Sextile Synergy (3/11 Axis)', nadi: '8/8', bhakoot: '6/7' };
    if (diff === 6) return { score: 24.5, label: 'Complementary Polarity (1/7 Axis)', nadi: '6/8', bhakoot: '5/7' };
    if (diff === 5 || diff === 7) return { score: 21, label: 'Requires Conscious Alignment (6/8 Axis)', nadi: '4/8', bhakoot: '3/7' };
    return { score: 26, label: 'Moderate Planetary Synergy', nadi: '6/8', bhakoot: '5/7' };
  }, [partnerA, partnerB]);

  // Nakshatra Data Map
  const nakshatraData: Record<string, { deity: string; lord: string; symbol: string; animal: string; gana: string; dashaYears: number }> = {
    Ashwini: { deity: 'Ashwini Kumaras', lord: 'Ketu', symbol: "Horse's Head", animal: 'Male Horse', gana: 'Deva', dashaYears: 7 },
    Bharani: { deity: 'Yama', lord: 'Venus', symbol: 'Yoni', animal: 'Elephant', gana: 'Manushya', dashaYears: 20 },
    Krittika: { deity: 'Agni', lord: 'Sun', symbol: 'Razor/Flame', animal: 'Female Sheep', gana: 'Rakshasa', dashaYears: 6 },
    Rohini: { deity: 'Brahma / Prajapati', lord: 'Moon', symbol: 'Cart / Temple', animal: 'Male Serpent', gana: 'Manushya', dashaYears: 10 },
    Mrigashira: { deity: 'Soma', lord: 'Mars', symbol: "Deer's Head", animal: 'Female Serpent', gana: 'Deva', dashaYears: 7 },
    Ardra: { deity: 'Rudra', lord: 'Rahu', symbol: 'Teardrop / Diamond', animal: 'Female Dog', gana: 'Manushya', dashaYears: 18 },
    Punarvasu: { deity: 'Aditi', lord: 'Jupiter', symbol: 'Bow & Quiver', animal: 'Female Cat', gana: 'Deva', dashaYears: 16 },
    Pushya: { deity: 'Brihaspati', lord: 'Saturn', symbol: 'Cow Udder / Lotus', animal: 'Male Sheep', gana: 'Deva', dashaYears: 19 },
    Ashlesha: { deity: 'Sarpas (Serpents)', lord: 'Mercury', symbol: 'Coiled Snake', animal: 'Male Cat', gana: 'Rakshasa', dashaYears: 17 },
    Magha: { deity: 'Pitras (Ancestors)', lord: 'Ketu', symbol: 'Royal Throne', animal: 'Male Rat', gana: 'Rakshasa', dashaYears: 7 },
  };

  const currentNakshatraInfo = nakshatraData[selectedNakshatra] || {
    deity: 'Vedic Divinity',
    lord: 'Moon',
    symbol: 'Sacred Wheel',
    animal: 'Celestial Archetype',
    gana: 'Deva',
    dashaYears: 10
  };

  // Mini Tool Catalog
  const MINI_TOOLS = [
    { id: 'sadesati', label: 'Sade Sati Radar', icon: Moon, tag: 'Saturn Transit' },
    { id: 'compatibility', label: '36-Guna Matcher', icon: Heart, tag: 'Love Synergy' },
    { id: 'nakshatra', label: 'Nakshatra & Pada', icon: Star, tag: 'Birth Star' },
    { id: 'gemstone', label: 'Lucky Gemstone', icon: Gem, tag: 'Sacred Remedies' },
    { id: 'numerology', label: 'Name Frequency', icon: Hash, tag: 'Chaldean Power' },
    { id: 'muhurta', label: 'Shubh Muhurta', icon: Clock, tag: 'Daily Timing' },
    { id: 'dosha', label: 'Dosha Diagnostic', icon: ShieldAlert, tag: 'Karmic Check' },
    { id: 'rectification', label: 'Time Rectifier', icon: Compass, tag: 'Precision Test' },
  ] as const;

  return (
    <section id="panchang-section" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Astrological Diagnostics (100% Free)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            TRY INSTANT LIVE CALCULATIONS
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Test real astronomical algorithms in your browser. Inspect Saturn transit phases, 36-point compatibility, name vibrational numbers, and auspicious Muhurtas with zero signup.
          </p>
        </div>

        {/* Tool Category Selector Bar */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-[#0B1220] border border-white/10 max-w-5xl mx-auto">
          {MINI_TOOLS.map((t) => {
            const Icon = t.icon;
            const isActive = activeMiniTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveMiniTool(t.id as typeof activeMiniTool)}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Tool Playground Container */}
        <div className="p-6 sm:p-9 rounded-2xl bg-[#0B1220] border border-white/12 shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* 1. SADE SATI RADAR */}
            {activeMiniTool === 'sadesati' && (
              <motion.div
                key="sadesati"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    7.5-Year Saturn Transit Phase Engine
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Sade Sati & Shani Dhaiya Status
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Saturn (Shani Dev) transit over your natal Moon sign marks profound transformative cycles of discipline, structural maturity, and long-term accomplishment.
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-mono text-slate-400">Select Your Moon Sign (Chandra Rashi):</label>
                    <select
                      value={sadeSatiSign}
                      onChange={(e) => setSadeSatiSign(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none"
                    >
                      {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B1220]">{r}</option>)}
                    </select>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('transits')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Open Complete Shani Transit Radar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <span className="text-slate-400">Calculated Transit Vector</span>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      sadeSatiSign.includes('Aquarius') || sadeSatiSign.includes('Capricorn') || sadeSatiSign.includes('Pisces')
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                    }`}>
                      {sadeSatiSign.includes('Aquarius') ? 'Peak Sade Sati (Phase 2)' : sadeSatiSign.includes('Capricorn') ? 'Setting Sade Sati (Phase 3)' : sadeSatiSign.includes('Pisces') ? 'Rising Sade Sati (Phase 1)' : 'No Active Sade Sati (Clear Phase)'}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between py-1 border-b border-white/4">
                      <span className="text-slate-400">Active Saturn Gochara Sign:</span>
                      <span className="font-semibold text-white">Aquarius (Kumbha ♒)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/4">
                      <span className="text-slate-400">Karmic Life Focus:</span>
                      <span className="font-semibold text-amber-300">Structural Discipline & Professional Endurance</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Prescribed Vedic Practice:</span>
                      <span className="font-semibold text-cyan-300">Hanuman Chalisa & Sesame Oil Lamp on Saturdays</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. 36-GUNA COMPATIBILITY MATCHMAKER */}
            {activeMiniTool === 'compatibility' && (
              <motion.div
                key="compatibility"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Ashta Koota 36-Point Guna Milan
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Instant Relationship & Soulmate Synergy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Evaluate psychological resonance, emotional longevity, and Nadi genetic harmony between two Moon signs.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-xs font-mono text-slate-400">Partner A (Moon Sign):</label>
                      <select
                        value={partnerA}
                        onChange={(e) => setPartnerA(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none mt-1"
                      >
                        {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B1220]">{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400">Partner B (Moon Sign):</label>
                      <select
                        value={partnerB}
                        onChange={(e) => setPartnerB(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none mt-1"
                      >
                        {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B1220]">{r}</option>)}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('compatibility')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Launch Complete 36-Point Kundli Matchmaker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <span className="text-slate-400">Ashta Koota Score</span>
                    <span className="text-2xl font-bold text-emerald-400">{compatibilityScore.score} / 36 Gunas</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-white/4">
                      <span className="text-slate-400">Nadi Compatibility:</span>
                      <span className="font-semibold text-emerald-400">{compatibilityScore.nadi} (Healthy Genetic Harmony)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/4">
                      <span className="text-slate-400">Bhakoot (Emotional Bond):</span>
                      <span className="font-semibold text-white">{compatibilityScore.bhakoot} ({compatibilityScore.label})</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Overall Soul Synergy:</span>
                      <span className="font-semibold text-amber-300">{compatibilityScore.label}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. NAKSHATRA & PADA FINDER */}
            {activeMiniTool === 'nakshatra' && (
              <motion.div
                key="nakshatra"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    27 Lunar Mansions & Shodashavarga
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Nakshatra, Pada & Planetary Archetype
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Your Janma Nakshatra governs your subconscious mind, emotional instincts, and starting Vimshottari Mahadasha balance.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-xs font-mono text-slate-400">Select Nakshatra:</label>
                      <select
                        value={selectedNakshatra}
                        onChange={(e) => setSelectedNakshatra(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none mt-1"
                      >
                        {NAKSHATRAS.map(n => <option key={n} value={n} className="bg-[#0B1220]">{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400">Select Pada (Quarter):</label>
                      <select
                        value={selectedPada}
                        onChange={(e) => setSelectedPada(Number(e.target.value) as 1 | 2 | 3 | 4)}
                        className="w-full p-2.5 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none mt-1"
                      >
                        <option value={1} className="bg-[#0B1220]">Pada 1 (Dharma)</option>
                        <option value={2} className="bg-[#0B1220]">Pada 2 (Artha)</option>
                        <option value={3} className="bg-[#0B1220]">Pada 3 (Kama)</option>
                        <option value={4} className="bg-[#0B1220]">Pada 4 (Moksha)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('free-tools')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>View Full 27 Nakshatra Wisdom Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <span className="text-slate-400">Nakshatra Archetype</span>
                    <span className="text-amber-300 font-bold">{selectedNakshatra} (Pada {selectedPada})</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Presiding Deity</span>
                      <strong className="text-white">{currentNakshatraInfo.deity}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Planetary Lord</span>
                      <strong className="text-cyan-300">{currentNakshatraInfo.lord} ({currentNakshatraInfo.dashaYears} Yrs)</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Sacred Symbol</span>
                      <strong className="text-white">{currentNakshatraInfo.symbol}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Temperament (Gana)</span>
                      <strong className="text-emerald-300">{currentNakshatraInfo.gana}</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. GEMSTONE & RUDRAKSHA FINDER */}
            {activeMiniTool === 'gemstone' && (
              <motion.div
                key="gemstone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Planetary Resonance & Ratna Shastra
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Sacred Gemstone & Rudraksha Advisor
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Discover your primary benefic life stone that strengthens your functional lords and mitigates malefic transit friction.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-xs font-mono text-slate-400">Ascendant / Moon Sign:</label>
                      <select
                        value={gemstoneSign}
                        onChange={(e) => setGemstoneSign(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none mt-1"
                      >
                        {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B1220]">{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400">Primary Objective:</label>
                      <select
                        value={lifeGoal}
                        onChange={(e) => setLifeGoal(e.target.value as typeof lifeGoal)}
                        className="w-full p-2.5 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none mt-1"
                      >
                        <option value="career" className="bg-[#0B1220]">Career & Leadership</option>
                        <option value="wealth" className="bg-[#0B1220]">Wealth & Assets</option>
                        <option value="love" className="bg-[#0B1220]">Love & Marriage</option>
                        <option value="health" className="bg-[#0B1220]">Vitality & Protection</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('free-tools')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>View All 9 Gemstones & Rudraksha Mukhis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex items-center gap-3 border-b border-white/8 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                      <Gem className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Recommended Benefic Gemstone</div>
                      <div className="text-sm sm:text-base font-bold text-white">
                        {gemstoneSign.includes('Leo') ? 'Natural Ruby (Manikya)' : gemstoneSign.includes('Taurus') ? 'Natural White Sapphire' : gemstoneSign.includes('Aries') ? 'Red Coral (Moonga)' : 'Natural Yellow Sapphire (Pukhraj)'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Ideal Metal</span>
                      <strong className="text-white">22K Gold / Copper</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Wearing Finger</span>
                      <strong className="text-white">Ring / Index Finger</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Rudraksha Mukhi</span>
                      <strong className="text-amber-300">12 Mukhi (Surya)</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Traditional Seed Mantra</span>
                      <strong className="text-cyan-300">Om Hram Hreem Sah</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. NUMEROLOGY NAME VIBRATION */}
            {activeMiniTool === 'numerology' && (
              <motion.div
                key="numerology"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Chaldean & Pythagorean Vibrational Frequency
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Instant Name Number Calculator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Every letter carries an ancient planetary number resonance. Type your full name to compute your Destiny vibration and supportive cosmic alignments.
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-mono text-slate-400">Type Your Full Name:</label>
                    <input
                      type="text"
                      value={calcName}
                      onChange={(e) => setCalcName(e.target.value)}
                      placeholder="e.g. Alexander Hamilton"
                      className="w-full p-3 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none"
                    />
                  </div>

                  <button
                    onClick={() => onNavigateToTab('free-tools')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Launch Full Name & Business Numerology</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <span className="text-slate-400">Destiny Vibration</span>
                    <span className="text-2xl font-bold text-amber-400">Number {nameNum}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Ruler</span>
                      <strong className="text-amber-300">{nameNum === 1 ? 'Sun' : nameNum === 2 ? 'Moon' : nameNum === 3 ? 'Jupiter' : nameNum === 5 ? 'Mercury' : 'Venus'}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Lucky Days</span>
                      <strong className="text-white">{nameNum % 2 === 0 ? 'Mon, Fri' : 'Sun, Thu'}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Lucky Colors</span>
                      <strong className="text-cyan-300">Gold, Emerald</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans italic border-t border-white/6 pt-2.5">
                    "Number {nameNum} resonates with commanding executive initiative, creative manifestation, and clear strategic focus."
                  </p>
                </div>
              </motion.div>
            )}

            {/* 6. SHUBH MUHURTA & RAHU KAAL CLOCK */}
            {activeMiniTool === 'muhurta' && (
              <motion.div
                key="muhurta"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Real-Time Shubh Choghadiya & Horas
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Auspicious Timing & Rahu Kaal Clock
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Identify auspicious windows for initiating projects, signing contracts, or major travel, and avoid Rahu Kaal inauspicious windows.
                  </p>

                  <div className="p-4 rounded-xl bg-[#060A12] border border-white/8 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Today's Abhijit Muhurta:</span>
                      <span className="font-bold text-emerald-400">11:48 AM – 12:36 PM (Peak)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Rahu Kaal (Avoid Major Actions):</span>
                      <span className="font-bold text-rose-400">03:30 PM – 05:00 PM</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('panchanga')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Open 24-Hour Planetary Horas & Panchanga</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 uppercase tracking-wider border-b border-white/8 pb-2">
                    Today's Choghadiya Periods
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                      <span className="text-emerald-400 font-bold block">Amrit (Nectar)</span>
                      <span className="text-[10px] text-slate-300">07:30 AM – 09:00 AM</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                      <span className="text-emerald-400 font-bold block">Shubh (Auspicious)</span>
                      <span className="text-[10px] text-slate-300">10:30 AM – 12:00 PM</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-400/10 border border-cyan-400/20">
                      <span className="text-cyan-400 font-bold block">Labh (Gains)</span>
                      <span className="text-[10px] text-slate-300">01:30 PM – 03:00 PM</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-rose-400/10 border border-rose-400/20">
                      <span className="text-rose-400 font-bold block">Kaal (Avoid)</span>
                      <span className="text-[10px] text-slate-300">03:30 PM – 05:00 PM</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 7. DOSHA DIAGNOSTIC SCANNER */}
            {activeMiniTool === 'dosha' && (
              <motion.div
                key="dosha"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Manglik, Kalsarpa & Pitra Dosha Scanner
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Karmic Dosha & Cancellation Diagnostic
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Check Mars and Rahu-Ketu nodal axes for traditional doshas alongside classical BPHS cancellation (Nivarana) factors.
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-mono text-slate-400">Select Ascendant Sign:</label>
                    <select
                      value={doshaSign}
                      onChange={(e) => setDoshaSign(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none"
                    >
                      {RASHIS.map(r => <option key={r} value={r} className="bg-[#0B1220]">{r}</option>)}
                    </select>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('free-tools')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Open Comprehensive Dosha Remedy Suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <span className="text-slate-400">Manglik Status</span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                      Cancelled / Anshik (Mild)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-white/4">
                      <span className="text-slate-400">Kalsarpa Alignment:</span>
                      <span className="font-semibold text-white">Sheshnag Yoga (Partial)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/4">
                      <span className="text-slate-400">Jupiter Aspect Cushion:</span>
                      <span className="font-semibold text-emerald-400">Active Trine (Protective)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Classical Remedial Practice:</span>
                      <span className="font-semibold text-amber-300">Recite Maha Mrityunjaya Mantra 11x daily</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 8. BIRTH TIME RECTIFICATION ESTIMATOR */}
            {activeMiniTool === 'rectification' && (
              <motion.div
                key="rectification"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Tattva & Kunda Rectification Engine
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Birth-Time Uncertainty Estimator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Unsure if your birth time is exact? Test your primary psychological archetype to evaluate whether you sit on an Ascendant sign boundary.
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-mono text-slate-400">Primary Temperament Archetype:</label>
                    <select
                      value={rectTrait}
                      onChange={(e) => setRectTrait(e.target.value as typeof rectTrait)}
                      className="w-full p-3 rounded-xl bg-[#060A12] border border-white/12 text-white text-xs font-mono focus:border-amber-400 outline-none"
                    >
                      <option value="leadership" className="bg-[#0B1220]">Executive Leadership & Structure</option>
                      <option value="intellectual" className="bg-[#0B1220]">Analytical & Communication Vocation</option>
                      <option value="creative" className="bg-[#0B1220]">Artistic Expression & Intuition</option>
                      <option value="action" className="bg-[#0B1220]">Direct Action & Entrepreneurship</option>
                    </select>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('birth-chart')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Run Full Life-Event Rectification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <span className="text-slate-400">Probable Rising Sign</span>
                    <span className="text-amber-300 font-bold">
                      {rectTrait === 'leadership' ? 'Capricorn / Leo Lagna' : rectTrait === 'intellectual' ? 'Gemini / Virgo Lagna' : rectTrait === 'creative' ? 'Taurus / Pisces Lagna' : 'Aries / Scorpio Lagna'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-white/4">
                      <span className="text-slate-400">Tattva Dominance:</span>
                      <strong className="text-white">{rectTrait === 'leadership' ? 'Prithvi (Earth) / Agni (Fire)' : rectTrait === 'intellectual' ? 'Vayu (Air)' : rectTrait === 'creative' ? 'Jala (Water)' : 'Agni (Fire)'}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/4">
                      <span className="text-slate-400">Cusp Sensitivity:</span>
                      <strong className="text-emerald-400">Low (Stable Ascendant Arc)</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Next Action:</span>
                      <span className="text-slate-300 font-sans">Verify past career promotion dates against D9 Navamsha</span>
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
