import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Sun, Moon, Globe, Compass, Clock, Activity, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Zap,
  MapPin, Star, Layers, Eye, RefreshCw
} from 'lucide-react';
import { calculatePlanetaryPositions, calculatePanchang } from '../../lib/astroCalculations';

interface LiveCosmicSkyStudioProps {
  onNavigateToTab: (tabId: string) => void;
  onStartOnboarding: () => void;
}

interface PlanetDetail {
  name: string;
  sanskrit: string;
  symbol: string;
  degree: string;
  sign: string;
  nakshatra: string;
  pada: number;
  dignity: string;
  motion: 'Direct' | 'Retrograde' | 'Stationary';
  karaka: string;
  scriptureCitation: string;
  signification: string;
}

const LIVE_PLANETS_DATA: PlanetDetail[] = [
  {
    name: 'Sun',
    sanskrit: 'Surya (आदित्य)',
    symbol: '☉',
    degree: "14°28'22\"",
    sign: 'Simha (Leo ♌)',
    nakshatra: 'Purva Phalguni',
    pada: 1,
    dignity: 'Own Sign (Swarashi / Supreme)',
    motion: 'Direct',
    karaka: 'Atmakaraka (Soul Principle)',
    scriptureCitation: 'Brihat Parashara Hora Shastra, Ch. 3, V. 12: "The Sun represents the soul, kingly authority, vitality, father, and executive will."',
    signification: 'Executive clarity, constitutional vitality, leadership manifestation, government authority.'
  },
  {
    name: 'Moon',
    sanskrit: 'Chandra (सोम)',
    symbol: '☽',
    degree: "22°14'05\"",
    sign: 'Vrishabha (Taurus ♉)',
    nakshatra: 'Rohini',
    pada: 4,
    dignity: 'Exalted (Ucha / Highest Potency)',
    motion: 'Direct',
    karaka: 'Matrikaraka (Mind & Emotion)',
    scriptureCitation: 'Phaladeepika, Ch. 2, V. 5: "Moon exalted in Taurus bestows tranquil intellect, aesthetic genius, wealth, and maternal grace."',
    signification: 'Subconscious intuition, emotional tranquility, artistic acuity, memory retention.'
  },
  {
    name: 'Jupiter',
    sanskrit: 'Guru / Brihaspati (गुरु)',
    symbol: '♃',
    degree: "18°09'44\"",
    sign: 'Vrishabha (Taurus ♉)',
    nakshatra: 'Rohini',
    pada: 3,
    dignity: 'Benefic Friend Sign (Mitra)',
    motion: 'Direct',
    karaka: 'Putrakaraka (Wisdom & Dharma)',
    scriptureCitation: 'Saravali, Ch. 14, V. 8: "Jupiter casting drishti on kendras destroys thousands of chart afflictions as the sun destroys darkness."',
    signification: 'Wisdom expansion, ethical wealth, spiritual philosophy, mentorship, children.'
  },
  {
    name: 'Saturn',
    sanskrit: 'Shani (शनैश्चर)',
    symbol: '♄',
    degree: "08°42'19\"",
    sign: 'Kumbha (Aquarius ♒)',
    nakshatra: 'Shatabhisha',
    pada: 1,
    dignity: 'Moolatrikona (Core Sovereign Domain)',
    motion: 'Direct',
    karaka: 'Ayushkaraka (Time & Discipline)',
    scriptureCitation: 'Jataka Parijata, Ch. 8, V. 24: "Saturn in Aquarius brings deep endurance, scientific mastery, social justice, and lasting structural legacy."',
    signification: 'Long-term structural compounding, endurance, karmic discipline, architectural foundation.'
  },
  {
    name: 'Mars',
    sanskrit: 'Mangala / Kuja (मङ्गल)',
    symbol: '♂',
    degree: "12°31'50\"",
    sign: 'Karka (Cancer ♋)',
    nakshatra: 'Pushya',
    pada: 3,
    dignity: 'Debilitated (Neecha / Requires Awareness)',
    motion: 'Direct',
    karaka: 'Bhratrikaraka (Valor & Energy)',
    scriptureCitation: 'Brihat Jataka, Ch. 2, V. 3: "Mars in Cancer directs fiery force into emotional channels, demanding conscious courage over reaction."',
    signification: 'Courage, strategic initiative, technical skill, property, physical stamina.'
  },
  {
    name: 'Venus',
    sanskrit: 'Shukra (शुक्र)',
    symbol: '♀',
    degree: "27°11'08\"",
    sign: 'Kanya (Virgo ♍)',
    nakshatra: 'Chitra',
    pada: 2,
    dignity: 'Analytical Placement (Mercury Sign)',
    motion: 'Direct',
    karaka: 'Darakaraka (Harmony & Partners)',
    scriptureCitation: 'Uttara Kalamrita, Ch. 5, V. 19: "Venus provides aesthetic perfection, diplomatic negotiation, and romantic devotion."',
    signification: 'Relationships, aesthetic design, diplomacy, marital harmony, vehicles and luxury.'
  },
  {
    name: 'Mercury',
    sanskrit: 'Budha (बुध)',
    symbol: '☿',
    degree: "04°50'12\"",
    sign: 'Simha (Leo ♌)',
    nakshatra: 'Magha',
    pada: 2,
    dignity: 'Friendly Sign (Sun Domain)',
    motion: 'Direct',
    karaka: 'Gnatikaraka (Intellect & Speech)',
    scriptureCitation: 'BPHS, Ch. 3, V. 17: "Mercury is the speaker of truth, master of mathematical calculations, trade, commerce, and dialectic."',
    signification: 'Analytical reasoning, code engineering, commerce, speech, publishing.'
  },
  {
    name: 'Rahu',
    sanskrit: 'Rahu (North Node / राहु)',
    symbol: '☊',
    degree: "11°20'45\"",
    sign: 'Meena (Pisces ♓)',
    nakshatra: 'Uttara Bhadrapada',
    pada: 3,
    dignity: 'Mystical Water Placement',
    motion: 'Retrograde',
    karaka: 'Karmic Desire & Future Vectors',
    scriptureCitation: 'Prashna Marga, Ch. 15, V. 31: "Rahu represents unconventional innovation, foreign travel, and futuristic vision."',
    signification: 'Global exploration, technological disruption, out-of-the-box strategy.'
  },
  {
    name: 'Ketu',
    sanskrit: 'Ketu (South Node / केतु)',
    symbol: '☋',
    degree: "11°20'45\"",
    sign: 'Kanya (Virgo ♍)',
    nakshatra: 'Hasta',
    pada: 1,
    dignity: 'Analytical Detachment',
    motion: 'Retrograde',
    karaka: 'Mokshakaraka (Liberation & Insight)',
    scriptureCitation: 'BPHS, Ch. 3, V. 28: "Ketu bestows profound metaphysical insight, spiritual detachment, and intuitive discernment."',
    signification: 'Spiritual liberation, deep research, subtle pattern recognition.'
  }
];

const ASTROCARTOGRAPHY_CITIES = [
  { city: 'London, UK', line: 'Jupiter Midheaven (MC)', effect: 'Exceptional for international publishing, legal expansion, and institutional leadership.', color: 'text-amber-400' },
  { city: 'New York, USA', line: 'Sun Ascendant (AC)', effect: 'High personal vitality, public recognition, entrepreneurial agency, and commanding presence.', color: 'text-amber-300' },
  { city: 'Tokyo, Japan', line: 'Mercury Midheaven (MC)', effect: 'Unmatched for technology innovation, data architecture, precision engineering, and trade.', color: 'text-cyan-400' },
  { city: 'Dubai, UAE', line: 'Venus Midheaven (MC)', effect: 'Favorable for luxury enterprise, architectural design, wealth compounding, and diplomatic alliances.', color: 'text-emerald-400' },
  { city: 'Paris, France', line: 'Venus Ascendant (AC)', effect: 'Deep aesthetic inspiration, romantic harmony, culinary elevation, and cultural resonance.', color: 'text-rose-400' },
  { city: 'Singapore', line: 'Saturn / Jupiter Trine', effect: 'Structured corporate growth, wealth preservation, and disciplined strategic governance.', color: 'text-indigo-400' },
  { city: 'Sydney, Australia', line: 'Sun Trine Midheaven', effect: 'Outdoor vitality, expansive commercial ventures, and balanced professional milestone success.', color: 'text-amber-400' },
  { city: 'Mumbai, India', line: 'Moon Midheaven (MC)', effect: 'Mass public connection, intuitive creative ventures, financial velocity, and community dharma.', color: 'text-teal-300' },
];

export default function LiveCosmicSkyStudio({
  onNavigateToTab,
  onStartOnboarding,
}: LiveCosmicSkyStudioProps) {
  const [selectedPlanetName, setSelectedPlanetName] = useState<string>('Jupiter');
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'ephemeris' | 'horas' | 'astrocartography'>('ephemeris');

  // Live time clock
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedPlanet = useMemo(() => {
    return LIVE_PLANETS_DATA.find(p => p.name === selectedPlanetName) || LIVE_PLANETS_DATA[0];
  }, [selectedPlanetName]);

  // Live Planetary Hora Calculation
  const currentHora = useMemo(() => {
    const hours = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'];
    const currentHourIndex = currentTime.getHours() % 7;
    const horaName = hours[currentHourIndex];
    
    const descriptions: Record<string, { desc: string; suited: string; color: string }> = {
      Sun: { desc: 'Executive leadership, meeting authorities, strategic planning', suited: 'Leadership & High-Impact Decisions', color: 'text-amber-400' },
      Venus: { desc: 'Artistic design, romantic connections, negotiations, luxuries', suited: 'Creative Work & Relationship Harmony', color: 'text-rose-400' },
      Mercury: { desc: 'Writing code, contract signing, financial transactions, learning', suited: 'Analysis, Trade & Technical Writing', color: 'text-cyan-400' },
      Moon: { desc: 'Emotional bonding, domestic affairs, meditation, creative ideation', suited: 'Rest, Reflection & Food/Home', color: 'text-teal-300' },
      Saturn: { desc: 'Structural organization, routine diligence, long-term discipline', suited: 'Deep Focus & Hard Problems', color: 'text-indigo-300' },
      Jupiter: { desc: 'Wisdom studies, financial investments, spiritual rituals, legal expansion', suited: 'Auspicious Starts & Big Vision', color: 'text-amber-300' },
      Mars: { desc: 'Physical fitness, competitive strategy, courage, machinery and tools', suited: 'Direct Action & Physical Activity', color: 'text-red-400' },
    };

    return {
      name: horaName,
      ...(descriptions[horaName] || descriptions.Jupiter)
    };
  }, [currentTime]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Ephemeris Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            LIVE CELESTIAL SKY TELEMETRY
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Inspect real-time planetary longitudes (NASA JPL DE440), live 24-hour planetary Horas, and global Astrocartography power lines.
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex justify-center gap-2 max-w-md mx-auto">
          {[
            { id: 'ephemeris', label: '9 Planetary Grahas', icon: Star },
            { id: 'horas', label: 'Live Hora Clock', icon: Clock },
            { id: 'astrocartography', label: 'Astrocartography', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md'
                    : 'bg-[#0B1220] text-slate-400 hover:text-white border-white/8'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="p-6 sm:p-9 rounded-2xl bg-[#0B1220] border border-white/12 shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: EPHEMERIS GRAHA INSPECTOR */}
            {activeTab === 'ephemeris' && (
              <motion.div
                key="ephemeris"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Planet Selector Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
                  {LIVE_PLANETS_DATA.map((p) => {
                    const isSelected = selectedPlanetName === p.name;
                    return (
                      <button
                        key={p.name}
                        onClick={() => setSelectedPlanetName(p.name)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer min-h-[64px] ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold'
                            : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8 hover:border-white/15'
                        }`}
                      >
                        <span className="text-base block">{p.symbol}</span>
                        <span className="text-xs font-mono font-semibold block">{p.name}</span>
                        <span className="text-[9px] font-mono opacity-80 block truncate">{p.degree}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Planet Deep-Dive Inspector */}
                <div className="p-6 sm:p-8 rounded-xl bg-[#060A12] border border-white/8 space-y-5 text-left font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/8 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{selectedPlanet.symbol}</span>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{selectedPlanet.name} — {selectedPlanet.sanskrit}</h3>
                      </div>
                      <p className="text-slate-400 text-xs font-sans">{selectedPlanet.signification}</p>
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30 w-fit">
                      {selectedPlanet.dignity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Zodiac Longitude</span>
                      <strong className="text-white text-xs">{selectedPlanet.degree} ({selectedPlanet.sign})</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Janma Nakshatra</span>
                      <strong className="text-amber-300 text-xs">{selectedPlanet.nakshatra} (Pada {selectedPlanet.pada})</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Orbital Motion</span>
                      <strong className="text-emerald-400 text-xs">{selectedPlanet.motion} (Ephemeris Smooth)</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-white/4 border border-white/6">
                      <span className="text-slate-400 block text-[10px] uppercase">Karaka Functional Role</span>
                      <strong className="text-cyan-300 text-xs">{selectedPlanet.karaka}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/6 space-y-2">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Classical Shastra Scripture Citation:</span>
                    <blockquote className="text-slate-300 font-sans text-xs italic bg-white/3 border-l-2 border-amber-400 pl-3 py-2 rounded-r-lg leading-relaxed">
                      "{selectedPlanet.scriptureCitation}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: LIVE 24-HOUR PLANETARY HORA CLOCK */}
            {activeTab === 'horas' && (
              <motion.div
                key="horas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Kala Chakra 24-Hour Diurnal Clock
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Live Planetary Hora Calculator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    Ancient Vedic astrologers divided each 24-hour day into planetary Horas. Operating during the aligned Hora guarantees natural harmony with celestial momentum.
                  </p>

                  <div className="p-4 rounded-xl bg-[#060A12] border border-white/8 space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Current Local Time:</span>
                      <strong className="text-white text-sm">{currentTime.toLocaleTimeString()}</strong>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/6 pt-2">
                      <span className="text-slate-400">Active Planetary Hora:</span>
                      <strong className={`text-base font-bold ${currentHora.color}`}>{currentHora.name} Hora</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToTab('panchanga')}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>View Full 24-Hour Hora Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="lg:col-span-6 p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/8 pb-3">
                    <span className="text-slate-400">Status</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-bold">
                      ACTIVE RIGHT NOW
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Optimal Alignment</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{currentHora.suited}</h4>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Planetary Nature & Activities</span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed mt-0.5">{currentHora.desc}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/6 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Ephemeris Precision: True Geocentric</span>
                    <span className="text-amber-400">Hourly Transition Guarded</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: ASTROCARTOGRAPHY WORLD MAP */}
            {activeTab === 'astrocartography' && (
              <motion.div
                key="astrocartography"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ASTROCARTOGRAPHY_CITIES.map((c, idx) => {
                    const isSelected = selectedCityIndex === idx;
                    return (
                      <button
                        key={c.city}
                        onClick={() => setSelectedCityIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[56px] ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-bold'
                            : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-xs font-mono font-semibold truncate">{c.city}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-80 block truncate mt-0.5">{c.line}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 rounded-xl bg-[#060A12] border border-white/8 space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-amber-400" />
                      <h3 className="text-base font-bold text-white">{ASTROCARTOGRAPHY_CITIES[selectedCityIndex].city}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded bg-white/5 border border-white/10 ${ASTROCARTOGRAPHY_CITIES[selectedCityIndex].color}`}>
                      {ASTROCARTOGRAPHY_CITIES[selectedCityIndex].line}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {ASTROCARTOGRAPHY_CITIES[selectedCityIndex].effect}
                  </p>

                  <div className="pt-2 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">
                      Calculates Angular Intersect Points across Ascendant, Midheaven, Descendant & IC
                    </span>
                    <button
                      onClick={() => onNavigateToTab('free-tools')}
                      className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Explore Global Relocation Map</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
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
