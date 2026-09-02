import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Sun, Moon, Sparkles, Layers, CheckCircle2, ShieldCheck, 
  HelpCircle, Eye, Sliders, ChevronRight, Info, BookOpen, Volume2, X,
  Globe2, Flame, Award
} from 'lucide-react';
import { calculatePlanetaryPositions, type PlanetPosition } from '../../lib/astroCalculations';
import { computeTraditionDiagnostics } from '../../lib/multiTraditionCoordinator';
import { playSolfeggioTone, stopSolfeggioTone } from '../../lib/audioResonator';
import type { UserProfile } from '../../types';

const PLANET_FREQUENCIES: Record<string, number> = {
  'Sun': 528,
  'Moon': 432,
  'Jupiter': 639,
  'Venus': 741,
  'Mars': 396,
  'Mercury': 417,
  'Saturn': 852,
  'Rahu': 963,
  'Ketu': 174,
};

const PLANET_REMEDIES: Record<string, { gemstone: string; mantra: string; metal: string; herb: string }> = {
  'Sun': { gemstone: 'Ruby (Manikya)', mantra: 'Om Hram Hrim Hraum Sah Suryaya Namah', metal: 'Copper / Gold', herb: 'Bel Fruit / Saffron' },
  'Moon': { gemstone: 'Natural Pearl (Moti)', mantra: 'Om Shram Shrim Shraum Sah Chandraya Namah', metal: 'Silver', herb: 'Palasa / Sandalwood' },
  'Mars': { gemstone: 'Red Coral (Moonga)', mantra: 'Om Kram Krim Kraum Sah Bhaumaya Namah', metal: 'Copper', herb: 'Khadira / Red Sandal' },
  'Mercury': { gemstone: 'Emerald (Panna)', mantra: 'Om Bram Brim Braum Sah Budhaya Namah', metal: 'Bronze / Brass', herb: 'Apamarga / Tulsi' },
  'Jupiter': { gemstone: 'Yellow Sapphire (Pukhraj)', mantra: 'Om Gram Grim Graum Sah Gurave Namah', metal: 'Gold', herb: 'Ashwattha / Turmeric' },
  'Venus': { gemstone: 'Diamond (Heera) / Zircon', mantra: 'Om Dram Drim Draum Sah Shukraya Namah', metal: 'Silver / Platinum', herb: 'Audumbara / White Lotus' },
  'Saturn': { gemstone: 'Blue Sapphire (Neelam)', mantra: 'Om Pram Prim Praum Sah Shanaishcharaya Namah', metal: 'Iron / Lead', herb: 'Shami / Sesame' },
  'Rahu': { gemstone: 'Hessonite Garnet (Gomed)', mantra: 'Om Bhram Bhrim Bhraum Sah Rahave Namah', metal: 'Mixed Alloy / Ashtadhatu', herb: 'Durva Grass' },
  'Ketu': { gemstone: "Cat's Eye (Chrysoberyl)", mantra: 'Om Stram Strim Straum Sah Ketave Namah', metal: 'White Gold / Iron', herb: 'Kusha Grass' },
};

export default function OmniChartsView({ userProfile }: { userProfile: UserProfile }) {
  const [chartMode, setChartMode] = useState<'simple' | 'technical' | 'synthesis'>('simple');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const planetPositions = useMemo(() => {
    return calculatePlanetaryPositions(
      userProfile?.dob || '1998-06-15',
      userProfile?.time || '12:00'
    );
  }, [userProfile]);

  const sun = planetPositions.find(p => p.name === 'Sun') || planetPositions[1];
  const moon = planetPositions.find(p => p.name === 'Moon') || planetPositions[2];
  const asc = planetPositions.find(p => p.name === 'Ascendant') || planetPositions[0];

  // Compute live multi-tradition diagnostics across all 6 frameworks
  const vedicDiag = useMemo(() => computeTraditionDiagnostics(userProfile, 'vedic'), [userProfile]);
  const westernDiag = useMemo(() => computeTraditionDiagnostics(userProfile, 'western'), [userProfile]);
  const kpDiag = useMemo(() => computeTraditionDiagnostics(userProfile, 'kp'), [userProfile]);
  const jaiminiDiag = useMemo(() => computeTraditionDiagnostics(userProfile, 'jaimini'), [userProfile]);
  const baziDiag = useMemo(() => computeTraditionDiagnostics(userProfile, 'chinese'), [userProfile]);
  const islamicDiag = useMemo(() => computeTraditionDiagnostics(userProfile, 'islamic'), [userProfile]);

  const handlePlaySound = (planetName: string) => {
    const freq = PLANET_FREQUENCIES[planetName] || 528;
    setIsPlayingAudio(true);
    playSolfeggioTone(freq, 0.25, 'binaural', 4.5);
    setTimeout(() => {
      stopSolfeggioTone();
      setIsPlayingAudio(false);
    }, 2800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 text-left pb-16 select-none">
      {/* Header & Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Compass className="w-7 h-7 text-amber-400" />
            Interactive Birth Chart & Multi-Tradition Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            {userProfile.name || 'Seeker'} • Born {userProfile.dob || '1998-06-15'} {userProfile.time || '12:00'} • {userProfile.location || 'Universal Coordinates'}
          </p>
        </div>

        {/* 3-Way Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#111315]/80 p-1 rounded-xl border border-white/[0.08] self-start sm:self-auto">
          {[
            { id: 'simple', label: 'SIMPLE' },
            { id: 'technical', label: 'TECHNICAL' },
            { id: 'synthesis', label: '6-TRADITION SYNTHESIS' },
          ].map((mode) => {
            const isSelected = chartMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setChartMode(mode.id as any)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                  isSelected
                    ? 'text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="chartModePill"
                    className="absolute inset-0 rounded-lg bg-white shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Placement Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Sun */}
        <div className="p-5 rounded-3xl bg-[#111315]/80 border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" /> Sun Sign
            </span>
            <span className="text-[10px] font-mono text-slate-400">{sun?.degree}</span>
          </div>
          <div className="text-xl font-black text-white">{sun?.sign}</div>
          <p className="text-xs text-slate-400">Core identity, willpower, leadership drive & vital energy.</p>
        </div>

        {/* Moon */}
        <div className="p-5 rounded-3xl bg-[#111315]/80 border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-cyan-400" /> Moon Sign
            </span>
            <span className="text-[10px] font-mono text-slate-400">{moon?.degree}</span>
          </div>
          <div className="text-xl font-black text-white">{moon?.sign}</div>
          <p className="text-xs text-slate-400">Inner emotional needs, intuition, subconscious mind & mental peace.</p>
        </div>

        {/* Ascendant */}
        <div className="p-5 rounded-3xl bg-[#111315]/80 border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-400" /> Ascendant (Lagna)
            </span>
            <span className="text-[10px] font-mono text-slate-400">{asc?.degree}</span>
          </div>
          <div className="text-xl font-black text-white">{asc?.sign}</div>
          <p className="text-xs text-slate-400">Physical vitality, worldly approach, and outer life trajectory.</p>
        </div>
      </div>

      {/* 6-TRADITION SYNTHESIS COMPARISON VIEW */}
      {chartMode === 'synthesis' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#080E1C] to-[#040812] border border-white/[0.08] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2 text-amber-300">
                <Globe2 className="w-5 h-5" />
                <h3 className="text-base font-extrabold font-sans">
                  Cross-Tradition Unified Convergence Matrix
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-white/[0.08] font-bold">
                HIGH CONVERGENCE (88%)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {/* 1. Vedic */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/[0.08] space-y-2">
                <div className="text-xs font-mono text-amber-400 font-bold flex items-center justify-between">
                  <span>1. Vedic / Parashari</span>
                  <span className="text-[9px] text-slate-400">Sidereal</span>
                </div>
                <div className="text-sm font-bold text-white">{vedicDiag.coreHighlights[0]?.value} Lagna</div>
                <p className="text-xs text-slate-400 leading-snug">{vedicDiag.deepInsights[0]}</p>
              </div>

              {/* 2. Western */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/[0.08] space-y-2">
                <div className="text-xs font-mono text-cyan-400 font-bold flex items-center justify-between">
                  <span>2. Western Hellenistic</span>
                  <span className="text-[9px] text-slate-400">Tropical</span>
                </div>
                <div className="text-sm font-bold text-white">{westernDiag.coreHighlights[0]?.value} Sun</div>
                <p className="text-xs text-slate-400 leading-snug">{westernDiag.deepInsights[0]}</p>
              </div>

              {/* 3. KP Stellar */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/[0.08] space-y-2">
                <div className="text-xs font-mono text-emerald-400 font-bold flex items-center justify-between">
                  <span>3. KP System</span>
                  <span className="text-[9px] text-slate-400">249 Sub-Lords</span>
                </div>
                <div className="text-sm font-bold text-white">{kpDiag.coreHighlights[0]?.value} Sub-Lord</div>
                <p className="text-xs text-slate-400 leading-snug">{kpDiag.deepInsights[0]}</p>
              </div>

              {/* 4. Jaimini */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/[0.08] space-y-2">
                <div className="text-xs font-mono text-purple-400 font-bold flex items-center justify-between">
                  <span>4. Jaimini Sutra</span>
                  <span className="text-[9px] text-slate-400">Chara Karaka</span>
                </div>
                <div className="text-sm font-bold text-white">{jaiminiDiag.coreHighlights[0]?.value} (Soul)</div>
                <p className="text-xs text-slate-400 leading-snug">{jaiminiDiag.deepInsights[0]}</p>
              </div>

              {/* 5. Chinese BaZi */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/[0.08] space-y-2">
                <div className="text-xs font-mono text-rose-400 font-bold flex items-center justify-between">
                  <span>5. Chinese BaZi</span>
                  <span className="text-[9px] text-slate-400">Four Pillars</span>
                </div>
                <div className="text-sm font-bold text-white">{baziDiag.coreHighlights[0]?.value}</div>
                <p className="text-xs text-slate-400 leading-snug">{baziDiag.deepInsights[0]}</p>
              </div>

              {/* 6. Islamic */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/[0.08] space-y-2">
                <div className="text-xs font-mono text-teal-400 font-bold flex items-center justify-between">
                  <span>6. Islamic Ilm al-Falak</span>
                  <span className="text-[9px] text-slate-400">Manazil</span>
                </div>
                <div className="text-sm font-bold text-white">{islamicDiag.coreHighlights[1]?.value}</div>
                <p className="text-xs text-slate-400 leading-snug">{islamicDiag.deepInsights[0]}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Interactive 9 Planets Matrix with Click-to-Inspect Telemetry Modal */}
      <div className="p-6 rounded-3xl bg-[#111315]/80/90 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white font-sans">
              9 Planetary Spheres & Coordinates
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Tap any planet to inspect remedies & Solfeggio audio
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {planetPositions.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPlanet(p)}
              className="p-3.5 rounded-2xl bg-[#091122] hover:bg-white/10 border border-white/5 hover:border-white/[0.08] transition-all text-left space-y-1 group cursor-pointer active:scale-95 shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className={`text-base font-bold ${p.color}`}>{p.symbol}</span>
                {p.retrograde && <span className="text-[8px] font-mono text-red-400 font-bold">Rx</span>}
              </div>
              <div className="text-xs font-bold text-white font-sans group-hover:text-amber-300 transition-colors">
                {p.name}
              </div>
              <div className="text-[11px] font-mono text-amber-300 font-bold">
                {p.degree}
              </div>
              <div className="text-[10px] font-mono text-slate-400 truncate">
                {p.sign} • H{p.house}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Technical Mode Planetary Coordinates Table */}
      {chartMode === 'technical' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-6 rounded-3xl bg-[#111315]/80 border border-indigo-500/30 space-y-3"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Exact Ephemeris Coordinates (DE440 / Lahiri Ayanamsha)
            </h4>
            <span className="text-[10px] font-mono text-slate-400">Sub-Arcsecond Accuracy</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left font-mono">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400">
                  <th className="py-2 px-2">Planet</th>
                  <th className="py-2 px-2">Zodiac Sign</th>
                  <th className="py-2 px-2">Degree</th>
                  <th className="py-2 px-2">House</th>
                  <th className="py-2 px-2">Nakshatra</th>
                  <th className="py-2 px-2">Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {planetPositions.map((p, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-2 px-2 font-bold text-white flex items-center gap-1.5">
                      <span>{p.symbol}</span>
                      <span>{p.name}</span>
                    </td>
                    <td className="py-2 px-2">{p.sign}</td>
                    <td className="py-2 px-2 text-amber-400">{p.degree}</td>
                    <td className="py-2 px-2">{p.house}</td>
                    <td className="py-2 px-2 text-cyan-300">{p.nakshatra}</td>
                    <td className="py-2 px-2 text-slate-400">{p.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* PLANET INSPECTOR & REMEDY MODAL DIALOG */}
      <AnimatePresence>
        {selectedPlanet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlanet(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#091122] border border-white/[0.08] shadow-2xl space-y-5 text-left z-10 overflow-hidden"
            >
              <button
                onClick={() => setSelectedPlanet(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-white/[0.08] flex items-center justify-center text-2xl font-bold text-amber-400">
                  {selectedPlanet.symbol}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white font-sans">
                    {selectedPlanet.name} in {selectedPlanet.sign}
                  </h3>
                  <p className="text-xs font-mono text-amber-300">
                    {selectedPlanet.degree} • House {selectedPlanet.house} • {selectedPlanet.nakshatra}
                  </p>
                </div>
              </div>

              {/* Solfeggio Audio Trigger */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/[0.08] flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-white block">
                    Planetary Resonance Frequency
                  </span>
                  <span className="text-[11px] font-mono text-cyan-300">
                    {PLANET_FREQUENCIES[selectedPlanet.name] || 528} Hz Binaural Tone
                  </span>
                </div>
                <button
                  onClick={() => handlePlaySound(selectedPlanet.name)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-white/10 hover:bg-white/15 text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? 'Resonating...' : 'Play Tone'}</span>
                </button>
              </div>

              {/* Remedy Matrix */}
              {PLANET_REMEDIES[selectedPlanet.name] && (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                    <Flame className="w-4 h-4" />
                    <span>Classical Astrological Remedies</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400 text-[10px] block">Prescribed Gemstone:</span>
                      <span className="text-white font-bold">{PLANET_REMEDIES[selectedPlanet.name].gemstone}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400 text-[10px] block">Harmonic Metal:</span>
                      <span className="text-white font-bold">{PLANET_REMEDIES[selectedPlanet.name].metal}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 col-span-2">
                      <span className="text-slate-400 text-[10px] block">Vedic Bija Mantra:</span>
                      <span className="text-amber-300 font-bold">{PLANET_REMEDIES[selectedPlanet.name].mantra}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
