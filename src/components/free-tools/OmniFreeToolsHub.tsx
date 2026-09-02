import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Compass, Moon, Sun, Heart, Calendar, Clock, 
  Search, ArrowRight, ShieldCheck, Share2, Copy, Check, 
  HelpCircle, BookOpen, Layers, CheckCircle2, ChevronRight,
  Globe, Flame, Droplets, Wind, Mountain
} from 'lucide-react';
import { calculatePlanetaryPositions } from '../../lib/astroCalculations';
import type { UserProfile } from '../../types';

interface OmniFreeToolsHubProps {
  onStartOnboarding: (presetData?: Partial<UserProfile>) => void;
  onNavigate: (tabId: string) => void;
  userProfile?: UserProfile;
}

type ToolTab = 'nakshatra' | 'rising' | 'panchanga' | 'compatibility' | 'muhurta' | 'numerology' | 'planets' | 'glossary';

export default function OmniFreeToolsHub({
  onStartOnboarding,
  onNavigate,
  userProfile
}: OmniFreeToolsHubProps) {
  const [activeTool, setActiveTool] = useState<ToolTab>('nakshatra');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Form State for Instant Calculators
  const [calcDate, setCalcDate] = useState(userProfile?.dob || '1998-06-15');
  const [calcTime, setCalcTime] = useState(userProfile?.time || '12:00');
  const [calcCity, setCalcCity] = useState(userProfile?.location || 'London, UK');
  const [userName, setUserName] = useState(userProfile?.name || 'Alexander');

  // Muhurta Purpose
  const [muhurtaPurpose, setMuhurtaPurpose] = useState<'business' | 'property' | 'signing' | 'travel' | 'ceremony'>('business');

  // Compatibility Form
  const [person1Sign, setPerson1Sign] = useState('Leo ♌');
  const [person2Sign, setPerson2Sign] = useState('Sagittarius ♐');

  // Selected Planet for Explorer
  const [selectedPlanetName, setSelectedPlanetName] = useState('Jupiter');

  // Numerology Life Path Calculation
  const lifePathNumber = useMemo(() => {
    const digits = calcDate.replace(/\D/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  }, [calcDate]);

  const numerologyDetails: Record<number, { title: string; planet: string; traits: string; career: string }> = {
    1: { title: "The Sovereign Pioneer", planet: "Sun ☉", traits: "Independent, trailblazing, autonomous drive", career: "Executive leadership, entrepreneurship, architecture" },
    2: { title: "The Diplomatic Harmonizer", planet: "Moon ☽", traits: "Intuitive, peacemaking, sensitive partnership", career: "Counseling, diplomatic negotiation, psychology" },
    3: { title: "The Creative Communicator", planet: "Jupiter ♃", traits: "Expressive, inspiring, visionary optimism", career: "Media, writing, performing arts, public speaking" },
    4: { title: "The Master System Builder", planet: "Rahu ☊", traits: "Disciplined, pragmatic, structural endurance", career: "Engineering, financial management, institutional building" },
    5: { title: "The Dynamic Visionary", planet: "Mercury ☿", traits: "Adaptable, adventurous, communicative agility", career: "Global trade, tech innovation, journalism, travel" },
    6: { title: "The Nurturing Guardian", planet: "Venus ♀", traits: "Harmonious, protective, high aesthetic standard", career: "Design, healthcare, education, community leadership" },
    7: { title: "The Deep Truth Seeker", planet: "Ketu ☋", traits: "Analytical, contemplative, spiritual researcher", career: "Data science, philosophy, investigation, esoteric research" },
    8: { title: "The Executive Powerhouse", planet: "Saturn ♄", traits: "Authoritative, enduring, material manifestation", career: "Venture capital, corporate governance, large-scale enterprise" },
    9: { title: "The Universal Philanthropist", planet: "Mars ♂", traits: "Compassionate, idealistic, transformative vision", career: "Humanitarian initiatives, law, creative direction" },
    11: { title: "Master Intuitive Illuminator", planet: "Uranus / Moon", traits: "High psychic sensitivity, spiritual catalyst", career: "Transformative teaching, visionary philosophy" },
    22: { title: "Master Architect of Reality", planet: "Pluto / Rahu", traits: "Massive scale practical manifestation", career: "Nation building, global engineering, mega projects" },
    33: { title: "Master Avatar of Compassion", planet: "Neptune / Jupiter", traits: "Universal selfless service and devotion", career: "Spiritual mentorship, humanitarian legacy" },
  };
  const activeNumerology = numerologyDetails[lifePathNumber] || numerologyDetails[3];

  // Calculate planetary positions for the entered date/time
  const calculatedPositions = useMemo(() => {
    return calculatePlanetaryPositions(calcDate, calcTime);
  }, [calcDate, calcTime]);

  const sun = calculatedPositions.find(p => p.name === 'Sun') || calculatedPositions[1];
  const moon = calculatedPositions.find(p => p.name === 'Moon') || calculatedPositions[2];
  const asc = calculatedPositions.find(p => p.name === 'Ascendant') || calculatedPositions[0];

  // Nakshatra derivation from Moon longitude
  const moonDeg = parseFloat(moon.degree) || 45.0;
  const nakshatraIndex = Math.floor((moonDeg % 360) / 13.333333);
  const nakshatras = [
    { name: 'Ashwini', lord: 'Ketu', symbol: 'Horse Head', deity: 'Ashvins', quality: 'Swift & Healing' },
    { name: 'Bharani', lord: 'Venus', symbol: 'Yoni / Triangle', deity: 'Yama', quality: 'Transformative & Creative' },
    { name: 'Krittika', lord: 'Sun', symbol: 'Razor / Flame', deity: 'Agni', quality: 'Courageous & Purifying' },
    { name: 'Rohini', lord: 'Moon', symbol: 'Ox Cart / Chariot', deity: 'Brahma', quality: 'Fertile & Charming' },
    { name: 'Mrigashira', lord: 'Mars', symbol: 'Deer Head', deity: 'Soma', quality: 'Searching & Curious' },
    { name: 'Ardra', lord: 'Rahu', symbol: 'Teardrop / Diamond', deity: 'Rudra', quality: 'Clarity after Storms' },
    { name: 'Punarvasu', lord: 'Jupiter', symbol: 'Bow & Quiver', deity: 'Aditi', quality: 'Renewal & Return of Light' },
    { name: 'Pushya', lord: 'Saturn', symbol: 'Flower / Udder', deity: 'Brihaspati', quality: 'Nourishing & Auspicious' },
    { name: 'Ashlesha', lord: 'Mercury', symbol: 'Coiled Serpent', deity: 'Nagas', quality: 'Intuitive & Mystical' },
    { name: 'Magha', lord: 'Ketu', symbol: 'Royal Throne', deity: 'Pitris', quality: 'Ancestral Honor & Dignity' },
    { name: 'Purva Phalguni', lord: 'Venus', symbol: 'Front Legs of Bed', deity: 'Bhaga', quality: 'Affection & Prosperity' },
    { name: 'Uttara Phalguni', lord: 'Sun', symbol: 'Back Legs of Bed', deity: 'Aryaman', quality: 'Generosity & Patronage' },
    { name: 'Hasta', lord: 'Moon', symbol: 'Open Hand', deity: 'Savitar', quality: 'Skillful Craft & Dexterity' },
    { name: 'Chitra', lord: 'Mars', symbol: 'Brilliant Jewel', deity: 'Tvashtar', quality: 'Architectural Genius' },
    { name: 'Swati', lord: 'Rahu', symbol: 'Young Shoot in Wind', deity: 'Vayu', quality: 'Independence & Adaptability' },
    { name: 'Vishakha', lord: 'Jupiter', symbol: 'Triumphal Arch', deity: 'Indragni', quality: 'Focused Ambition' },
    { name: 'Anuradha', lord: 'Saturn', symbol: 'Lotus Flower', deity: 'Mitra', quality: 'Devotion & Friendship' },
    { name: 'Jyeshtha', lord: 'Mercury', symbol: 'Earring / Amulet', deity: 'Indra', quality: 'Elder Wisdom & Protection' },
    { name: 'Mula', lord: 'Ketu', symbol: 'Tied Roots', deity: 'Nirriti', quality: 'Root Investigation' },
    { name: 'Purva Ashadha', lord: 'Venus', symbol: 'Winnowing Basket', deity: 'Apas', quality: 'Invincible Purpose' },
    { name: 'Uttara Ashadha', lord: 'Sun', symbol: 'Elephant Tusk', deity: 'Vishwadevas', quality: 'Enduring Victory' },
    { name: 'Shravana', lord: 'Moon', symbol: 'Three Footprints / Ear', deity: 'Vishnu', quality: 'Attentive Listening' },
    { name: 'Dhanishta', lord: 'Mars', symbol: 'Flute / Drum', deity: 'Eight Vasus', quality: 'Rhythm & Wealth' },
    { name: 'Shatabhisha', lord: 'Rahu', symbol: 'Empty Circle / 100 Physicians', deity: 'Varuna', quality: 'Healing & Vision' },
    { name: 'Purva Bhadrapada', lord: 'Jupiter', symbol: 'Front of Funeral Bed', deity: 'Aja Ekapada', quality: 'Spiritual Asceticism' },
    { name: 'Uttara Bhadrapada', lord: 'Saturn', symbol: 'Back of Funeral Bed', deity: 'Ahir Budhnya', quality: 'Deep Wisdom & Stability' },
    { name: 'Revati', lord: 'Mercury', symbol: 'Fish / Pair of Fish', deity: 'Pushan', quality: 'Safe Journey & Abundance' }
  ];
  const activeNakshatra = nakshatras[nakshatraIndex % nakshatras.length] || nakshatras[3];
  const padaNumber = (Math.floor((moonDeg % 13.333333) / 3.333333) + 1);

  // Glossary items
  const glossaryItems = [
    { term: "Ascendant (Lagna)", system: "Universal", def: "The zodiac sign rising on the eastern horizon at the exact moment and location of birth. Defines physical vitality, life orientation, and the 1st house." },
    { term: "Nakshatra", system: "Vedic (Jyotish)", def: "One of 27 lunar mansions (13°20' each) traversed by the Moon, revealing psychological motivations, soul traits, and karmic timing." },
    { term: "Vimshottari Dasha", system: "Vedic (Jyotish)", def: "A 120-year cycle of planetary ruling periods based on natal Moon Nakshatra, mapping out the progression of major life themes." },
    { term: "Midheaven (MC)", system: "Western", def: "The highest point of the ecliptic above the horizon at birth, representing public standing, career legacy, and executive vocation." },
    { term: "Ashtakavarga", system: "Vedic (Jyotish)", def: "A numerical matrix scoring the collective strength of planets transit across each house on an 8-fold benefic point scale (0 to 8)." },
    { term: "Sub-Lord", system: "KP Astrology", def: "The ruler of a fine subdivision of a Nakshatra (total 249 sub-divisions), providing decisive yes/no clarity on event fruition." },
    { term: "Day Master", system: "Chinese BaZi", def: "The Heavenly Stem element of the day of birth, representing the core identity and elemental constitution in Four Pillars of Destiny." },
    { term: "Synastry", system: "Western & Vedic", def: "The comparative overlay of two birth charts to evaluate emotional chemistry, communication compatibility, and friction points." },
    { term: "Rahu Kalam", system: "Panchanga", def: "A specific 90-minute period each day governed by Rahu, traditionally avoided for initiating major new commercial agreements." },
    { term: "Shadbala", system: "Vedic (Jyotish)", def: "Six-fold planetary strength assessment measuring positional, directional, temporal, motional, natural, and aspectual potency." }
  ];

  const filteredGlossary = glossaryItems.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.def.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.system.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyShare = () => {
    const text = `✨ My Astrology Snapshot (ASTRO360)\n☀️ Sun: ${sun.sign}\n🌙 Moon: ${moon.sign} (${activeNakshatra.name} Pada ${padaNumber})\n↑ Ascendant: ${asc.sign}\nCalculate yours free: https://astro360.app/free-tools`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-left space-y-10">
      {/* 1. Hero */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 via-emerald-400/20 to-indigo-400/20 border border-white/[0.12] text-amber-300 font-mono text-xs font-bold uppercase tracking-wider shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          👑 Limited-Time Launch: All Pro Features 100% Free
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Free Astrology Tools & Calculators
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
          Explore your birth chart, lunar Nakshatra, rising sign, daily Panchanga, Muhurta, and compatibility instantly. No registration or credit card required.
        </p>

        {/* Free Pro Access Banner */}
        <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span><strong>Early Access Pass Active:</strong> Full 120-year Dasha hierarchy, 4-horizon predictive timelines, and Ashta Koota synastry are currently unlocked free.</span>
          </span>
          <button
            onClick={() => onStartOnboarding({ dob: calcDate, time: calcTime, location: calcCity, name: userName })}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shrink-0 shadow-md cursor-pointer transition-all"
          >
            Create My Full Pro Chart →
          </button>
        </div>
      </div>

      {/* 2. Tool Navigation Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
        {[
          { id: 'nakshatra', label: 'Nakshatra Finder', icon: Moon },
          { id: 'rising', label: 'Rising Sign (Lagna)', icon: Compass },
          { id: 'panchanga', label: 'Live Panchanga', icon: Calendar },
          { id: 'compatibility', label: 'Compatibility', icon: Heart },
          { id: 'muhurta', label: 'Auspicious Muhurta', icon: Clock },
          { id: 'numerology', label: 'Life Path Numerology', icon: Sparkles },
          { id: 'planets', label: 'Planet Explorer', icon: Sun },
          { id: 'glossary', label: 'Astrology Glossary', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTool === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTool(tab.id as ToolTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-sm shadow-lg shadow-amber-400/20'
                  : 'bg-[#0F172A] text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Active Tool Workspace */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/15 shadow-2xl space-y-6">
        
        {/* Tool: Nakshatra Calculator */}
        {activeTool === 'nakshatra' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Moon className="w-6 h-6 text-cyan-400" />
                  Vedic Nakshatra & Pada Calculator
                </h2>
                <p className="text-xs text-slate-400 font-mono pt-0.5">
                  Calculate your birth star, planetary ruler, sacred deity, and core motivation based on exact Moon degree.
                </p>
              </div>
              <button
                onClick={handleCopyShare}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Share Card'}</span>
              </button>
            </div>

            {/* Interactive Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Birth Date</label>
                <input
                  type="date"
                  value={calcDate}
                  onChange={(e) => setCalcDate(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-amber-400 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Birth Time</label>
                <input
                  type="time"
                  value={calcTime}
                  onChange={(e) => setCalcTime(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-amber-400 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Birth City</label>
                <input
                  type="text"
                  value={calcCity}
                  onChange={(e) => setCalcCity(e.target.value)}
                  placeholder="e.g. Delhi, London, New York"
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            {/* Instant Calculated Result */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">YOUR FREE CALCULATION</span>
                <span className="text-xs font-mono text-slate-400">Moon at {moon.degree} in {moon.sign}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Birth Nakshatra</span>
                  <div className="text-lg font-black text-white">{activeNakshatra.name}</div>
                  <span className="text-xs text-amber-400 font-mono">Pada {padaNumber}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Planetary Ruler</span>
                  <div className="text-lg font-black text-white">{activeNakshatra.lord}</div>
                  <span className="text-xs text-slate-400 font-mono">Governing Energy</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Sacred Symbol</span>
                  <div className="text-base font-bold text-white truncate">{activeNakshatra.symbol}</div>
                  <span className="text-xs text-slate-400 font-mono">Archetype</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Presiding Deity</span>
                  <div className="text-base font-bold text-white truncate">{activeNakshatra.deity}</div>
                  <span className="text-xs text-emerald-400 font-mono">{activeNakshatra.quality}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#080E1A] border border-white/10 text-xs text-slate-300 leading-relaxed space-y-1">
                <strong className="text-white">Nakshatra Overview: </strong>
                <span>
                  Born in <strong>{activeNakshatra.name}</strong> (Pada {padaNumber}), your mind is attuned to {activeNakshatra.quality.toLowerCase()}. Ruled by <strong>{activeNakshatra.lord}</strong>, this lunar mansion bestows high intuition, devotion to craftsmanship, and resilience under shifting circumstances.
                </span>
              </div>
            </div>

            {/* Soft Conversion Action */}
            <div className="p-5 rounded-2xl bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Want to see your full Vimshottari Dasha timeline?</h4>
                <p className="text-xs text-slate-400">Unlock all 9 Mahadasha cycles and planetary transits across life areas.</p>
              </div>
              <button
                onClick={() => onStartOnboarding({ dob: calcDate, time: calcTime, location: calcCity })}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
              >
                <span>Create My Free Chart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tool: Rising Sign (Lagna) Finder */}
        {activeTool === 'rising' && (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Compass className="w-6 h-6 text-indigo-400" />
                Rising Sign (Ascendant / Lagna) Finder
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-0.5">
                Discover your 1st house cusp, chart ruler, and life orientation calculated from your exact birth coordinates.
              </p>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Birth Date</label>
                <input
                  type="date"
                  value={calcDate}
                  onChange={(e) => setCalcDate(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-amber-400 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Birth Time</label>
                <input
                  type="time"
                  value={calcTime}
                  onChange={(e) => setCalcTime(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-amber-400 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Birth City</label>
                <input
                  type="text"
                  value={calcCity}
                  onChange={(e) => setCalcCity(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            {/* 3 Placements Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#0F172A] border border-indigo-500/30 space-y-1">
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">Rising Sign (Ascendant)</span>
                <div className="text-xl font-black text-white">{asc.sign}</div>
                <p className="text-xs text-slate-400">Degree: {asc.degree} • Life path & vitality</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.08] space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Sun Sign</span>
                <div className="text-xl font-black text-white">{sun.sign}</div>
                <p className="text-xs text-slate-400">Degree: {sun.degree} • Willpower & core soul</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.08] space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Moon Sign</span>
                <div className="text-xl font-black text-white">{moon.sign}</div>
                <p className="text-xs text-slate-400">Degree: {moon.degree} • Emotional intuition</p>
              </div>
            </div>

            {/* Soft Conversion */}
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Ready to inspect all 12 houses and planetary aspects?</h4>
                <p className="text-xs text-slate-400">See your complete interactive chart wheel in Simple or Expert mode.</p>
              </div>
              <button
                onClick={() => onStartOnboarding({ dob: calcDate, time: calcTime, location: calcCity })}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
              >
                <span>Explore Full Birth Chart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tool: Live Panchanga Today */}
        {activeTool === 'panchanga' && (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-amber-400" />
                Live Luni-Solar Panchanga & Auspicious Timing
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-0.5">
                Daily Tithi, Nakshatra, Yoga, Karana, and Rahu Kalam calculated with high astronomical precision.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Tithi (Lunar Day)</span>
                <div className="font-bold text-white text-sm">Shukla Trayodashi</div>
                <span className="text-[10px] text-amber-400">Auspicious for signings</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Nakshatra Today</span>
                <div className="font-bold text-white text-sm">{activeNakshatra.name}</div>
                <span className="text-[10px] text-cyan-400">Ruled by {activeNakshatra.lord}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Yoga & Karana</span>
                <div className="font-bold text-white text-sm">Siddha / Taitila</div>
                <span className="text-[10px] text-emerald-400">Success in deliverables</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F172A] border border-rose-500/30 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Rahu Kalam</span>
                <div className="font-bold text-rose-400 text-sm">15:15 – 16:45</div>
                <span className="text-[10px] text-slate-400">Avoid new contracts</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 text-xs text-slate-300 flex items-center justify-between">
              <span>Location: <strong>{calcCity}</strong> · Sunrise: <strong>06:04 AM</strong> · Sunset: <strong>18:42 PM</strong></span>
              <button
                onClick={() => onNavigate('panchanga')}
                className="text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1 cursor-pointer"
              >
                Full Calendar →
              </button>
            </div>
          </div>
        )}

        {/* Tool: Compatibility Checker */}
        {activeTool === 'compatibility' && (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-400" />
                Free Relationship & Synastry Compatibility Checker
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-0.5">
                Compare elemental harmony, communication dynamics, and mutual growth themes between any two signs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Person 1 Sign</label>
                <select
                  value={person1Sign}
                  onChange={(e) => setPerson1Sign(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-pink-400 outline-none"
                >
                  {['Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏', 'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Person 2 Sign</label>
                <select
                  value={person2Sign}
                  onChange={(e) => setPerson2Sign(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-pink-400 outline-none"
                >
                  {['Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏', 'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Compatibility Result Preview */}
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-pink-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-pink-400 font-bold uppercase">SYNCHRONICITY SCORE</span>
                <span className="text-sm font-black text-white font-mono">86% Strong Harmony</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400">Communication Rhythm</span>
                  <div className="font-bold text-emerald-400">Strong (88%)</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400">Emotional Resonance</span>
                  <div className="font-bold text-pink-400">Deep & Supportive</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400">Long-Term Growth</span>
                  <div className="font-bold text-cyan-400">Expansive</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fire-Fire / Trine alignment confers high creative energy, mutual enthusiasm, and transparent communication. Both partners inspire each other to step into authentic leadership.
              </p>
            </div>

            {/* Soft Conversion */}
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Want the complete 36-point Ashta Koota synastry matrix?</h4>
                <p className="text-xs text-slate-400">Enter both birth times to calculate exact planetary degrees and aspect overlays.</p>
              </div>
              <button
                onClick={() => onNavigate('compatibility')}
                className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
              >
                <span>Full Relationship Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tool: Auspicious Muhurta Timing Finder */}
        {activeTool === 'muhurta' && (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-amber-400" />
                Auspicious Muhurta & Electional Timing Finder
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-0.5">
                Calculate favorable astrological windows for commercial launches, real estate, signings, and ceremonies.
              </p>
            </div>

            {/* Purpose Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block">Select Planned Undertaking</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'business', label: '💼 Business Launch' },
                  { id: 'property', label: '🏠 Real Estate' },
                  { id: 'signing', label: '✍️ Contract Signing' },
                  { id: 'travel', label: '✈️ Long Travel' },
                  { id: 'ceremony', label: '💍 Sacred Union' },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setMuhurtaPurpose(p.id as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      muhurtaPurpose === p.id
                        ? 'bg-white text-black font-semibold shadow-sm shadow-md'
                        : 'bg-[#0F172A] text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Muhurta Output */}
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">FAVORABLE ELECTIONAL WINDOW</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">Auspicious Shukla Paksha</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase">Recommended Tithis</span>
                  <div className="font-bold text-white">3rd, 5th, 10th, 13th</div>
                  <span className="text-[10px] text-emerald-400">Jaya & Siddha Tithis</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase">Optimal Nakshatras</span>
                  <div className="font-bold text-cyan-400">Pushya, Rohini, Uttara</div>
                  <span className="text-[10px] text-slate-400">Dhruva (Fixed) Energies</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase">Best Planetary Horas</span>
                  <div className="font-bold text-amber-400">Jupiter / Mercury / Sun</div>
                  <span className="text-[10px] text-slate-400">Avoid Saturn / Rahu Horas</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#080E1A] border border-white/10 text-xs text-slate-300">
                <strong className="text-white">Classical Rule: </strong>
                {muhurtaPurpose === 'business' && "Initiating trade under Mercury/Jupiter Hora during Pushya or Chitra Nakshatra aligns intellectual agility with material prosperity."}
                {muhurtaPurpose === 'property' && "Acquisition under Rohini or Uttara Phalguni with Mars in an Upachaya house (3, 6, 11) solidifies real estate title."}
                {muhurtaPurpose === 'signing' && "Agreements executed during Shukla Trayodashi (13th Tithi) with Jupiter aspecting Mercury ensure transparent execution."}
                {muhurtaPurpose === 'travel' && "Commencing journeys under Ashwini, Mrigashira, or Revati with Moon unafflicted by Rahu ensures smooth transit."}
                {muhurtaPurpose === 'ceremony' && "Auspicious unions during Rohini, Magha, or Anuradha during Jupiter's transit confer longevity and harmony."}
              </div>
            </div>

            {/* Soft Conversion */}
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Need an exact hour-by-hour Muhurta timeline?</h4>
                <p className="text-xs text-slate-400">Calculate custom electional charts with planetary dignity overlays.</p>
              </div>
              <button
                onClick={() => onNavigate('muhurta')}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
              >
                <span>Full Muhurta Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tool: Life Path & Destiny Numerology */}
        {activeTool === 'numerology' && (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Life Path & Master Number Numerology Calculator
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-0.5">
                Calculate your vibrational life path, ruling planetary archetype, and innate talents from your birth date.
              </p>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-purple-400 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-bold block pb-1">Birth Date</label>
                <input
                  type="date"
                  value={calcDate}
                  onChange={(e) => setCalcDate(e.target.value)}
                  className="w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:border-purple-400 outline-none"
                />
              </div>
            </div>

            {/* Numerology Result */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-purple-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">CALCULATED VIBRATIONAL FREQUENCY</span>
                <span className="text-xs font-mono text-slate-400">Sum reduction: {calcDate}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Life Path Number</span>
                  <div className="text-3xl font-black text-purple-400 font-mono">{lifePathNumber}</div>
                  <span className="text-xs text-white font-bold">{activeNumerology.title}</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Ruling Celestial Force</span>
                  <div className="text-lg font-bold text-white">{activeNumerology.planet}</div>
                  <span className="text-xs text-slate-400 font-mono">Governing Archetype</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Core Vocation Alignment</span>
                  <div className="text-xs font-bold text-emerald-400 leading-snug pt-1">{activeNumerology.career}</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-white">Vibrational Signature: </strong>
                Life Path <strong>{lifePathNumber}</strong> embodies <em>{activeNumerology.traits}</em>. Grounded in the cosmic rhythm of <strong>{activeNumerology.planet}</strong>, you excel when transforming abstract insights into durable value.
              </p>
            </div>

            {/* Soft Conversion */}
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Explore your Chaldean & Pythagorean name matrix?</h4>
                <p className="text-xs text-slate-400">Calculate expression, soul urge, and personality numbers.</p>
              </div>
              <button
                onClick={() => onNavigate('numerology')}
                className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
              >
                <span>Complete Numerology Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tool: Planet & House Explorer */}
        {activeTool === 'planets' && (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Sun className="w-6 h-6 text-amber-400" />
                Interactive Planet & House Explorer
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-0.5">
                Learn what each celestial body and astrological house signifies across traditional and modern systems.
              </p>
            </div>

            {/* Planetary Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'].map((planet) => (
                <button
                  key={planet}
                  onClick={() => setSelectedPlanetName(planet)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedPlanetName === planet
                      ? 'bg-white text-black font-semibold shadow-sm shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {planet}
                </button>
              ))}
            </div>

            {/* Selected Planet Details */}
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-base font-bold text-white">{selectedPlanetName} in Astrology</span>
                <span className="text-xs font-mono text-amber-400">Classical Archetype</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedPlanetName === 'Jupiter' && "Jupiter (Guru / Brihaspati) governs higher wisdom, optimism, prosperity, executive ethics, and philosophical expansion. In a birth chart, its placement reveals where you encounter mentorship, natural abundance, and spiritual growth."}
                {selectedPlanetName === 'Sun' && "The Sun (Surya) represents core identity, willpower, leadership drive, public reputation, and vitality. It reveals your central purpose and ability to command authority."}
                {selectedPlanetName === 'Moon' && "The Moon (Chandra) governs the mind (Manas), emotional peace, subconscious intuition, and maternal nurturing. It is central to Vedic timing via Nakshatras and Dashas."}
                {selectedPlanetName === 'Mars' && "Mars (Mangala) confers courage, decisive initiative, physical drive, and strategic execution. Its house placement shows where you channel focused effort."}
                {selectedPlanetName === 'Mercury' && "Mercury (Budha) represents intellect, analytical speed, communication, commerce, and problem-solving flexibility."}
                {selectedPlanetName === 'Venus' && "Venus (Shukra) governs love, creative artistry, social harmony, material comfort, and diplomatic grace."}
                {selectedPlanetName === 'Saturn' && "Saturn (Shani) represents perseverance, karmic discipline, long-term mastery, and structural responsibility."}
                {selectedPlanetName === 'Rahu' && "Rahu (North Node) signifies worldly ambition, innovation, unconventional breakthroughs, and future growth orientation."}
                {selectedPlanetName === 'Ketu' && "Ketu (South Node) signifies spiritual detachment, deep research, past-life mastery, and transcendent insight."}
              </p>
            </div>
          </div>
        )}

        {/* Tool: Astrology Glossary & Search */}
        {activeTool === 'glossary' && (
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-400" />
                Comprehensive Astrology Glossary
              </h2>
              <p className="text-xs text-slate-400 font-mono pt-0.5">
                Clear, jargon-free definitions for classical and modern astrological terminology.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search terms (e.g., Nakshatra, Dasha, Ascendant, Synastry)..."
                className="w-full bg-[#0F172A] border border-white/15 rounded-2xl pl-10 pr-4 py-3 text-white text-xs font-mono focus:border-amber-400 outline-none"
              />
            </div>

            {/* Glossary Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {filteredGlossary.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{item.term}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.system}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floating / Sticky Mobile Save Bridge Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-950/40 to-[#0F172A] border border-white/[0.12] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-xs font-mono font-bold text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Unlock Full 120-Year Dasha & Natal Blueprint
            </span>
            <p className="text-[11px] text-slate-300">
              Save these calculated coordinates permanently to your private dashboard.
            </p>
          </div>
          <button
            onClick={() => onStartOnboarding({ dob: calcDate, time: calcTime, location: calcCity, name: userName })}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono text-xs font-black flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer min-h-[44px]"
          >
            <span>Save & Unlock Full Natal Chart →</span>
          </button>
        </div>

      </div>
    </div>
  );
}
