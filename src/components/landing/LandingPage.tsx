import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Compass, 
  Calendar, Layers, Heart, Briefcase, DollarSign, Globe, 
  Clock, BookOpen, ChevronRight, User, TrendingUp, RefreshCw,
  Scale, HelpCircle, Eye, Sliders, Check, Search, FileText,
  MapPin, Moon, Sun, Star, Activity, AlertCircle, ArrowUpRight,
  Zap, Lock, Award, PlayCircle, BarChart3, ChevronDown, Radio,
  Cpu, Flame, Gem, Hash, ShieldAlert, CheckSquare, Share2,
  Maximize2, Database, Download, Terminal, Info
} from 'lucide-react';
import { UserProfile } from '../../types';
import OmniLandingNavbar from './OmniLandingNavbar';
import OmniLiveZodiacRadar from './OmniLiveZodiacRadar';
import InteractiveToolsSuite from './InteractiveToolsSuite';
import OmniHeroChartStudio from './OmniHeroChartStudio';
import OmniProductPreview from './OmniProductPreview';

interface LandingPageProps {
  onStartOnboarding: (presetData?: Partial<UserProfile>) => void;
  onNavigateToTab: (tabId: string) => void;
  userProfile?: UserProfile;
}

export default function LandingPage({
  onStartOnboarding,
  onNavigateToTab,
  userProfile,
}: LandingPageProps) {
  // Hero Interactive Demo State
  const [heroActiveView, setHeroActiveView] = useState<'why' | 'compare' | 'timeline' | 'technical' | 'followup'>('why');
  const [heroActiveQuery, setHeroActiveQuery] = useState<string>('When is my next important career period?');
  
  // Section: Question Categories State
  const [selectedCategory, setSelectedCategory] = useState<string>('CAREER');
  
  // Section: Interactive Timeline Slider State
  const [timelineIndex, setTimelineIndex] = useState<number>(0);
  
  // Section: Birth-Time Sensitivity Test State
  const [selectedBirthTime, setSelectedBirthTime] = useState<string>('10:50');
  
  // Section: Simple vs Expert Mode Switcher State
  const [demoDensity, setDemoDensity] = useState<'simple' | 'expert'>('simple');
  
  // Section: Tradition Compare Selector
  const [selectedTradition, setSelectedTradition] = useState<'vedic' | 'western' | 'kp' | 'jaimini' | 'chinese' | 'hellenistic'>('vedic');

  // Interactive Live Ephemeris Sandbox State
  const [sandboxAyanamsha, setSandboxAyanamsha] = useState<'lahiri' | 'raman' | 'krishnamurti' | 'tropical'>('lahiri');
  const [sandboxHouseSystem, setSandboxHouseSystem] = useState<'placidus' | 'equal' | 'whole_sign' | 'sripati'>('placidus');

  // Question Categories Data
  const questionCategories = [
    { id: 'CAREER', label: 'CAREER & VOCATION', icon: Briefcase, color: 'text-amber-400', count: '4 Inquiries' },
    { id: 'LOVE', label: 'LOVE & MARRIAGE', icon: Heart, color: 'text-rose-400', count: '4 Inquiries' },
    { id: 'RELATIONSHIPS', label: 'RELATIONSHIPS', icon: User, color: 'text-pink-400', count: '3 Inquiries' },
    { id: 'MONEY', label: 'WEALTH & ASSETS', icon: DollarSign, color: 'text-emerald-400', count: '3 Inquiries' },
    { id: 'TIMING', label: 'TIMING & PERIODS', icon: Clock, color: 'text-cyan-400', count: '3 Inquiries' },
    { id: 'GROWTH', label: 'PURPOSE & DHARMA', icon: TrendingUp, color: 'text-indigo-400', count: '3 Inquiries' },
    { id: 'MY CHART', label: 'BIRTH CHART ESSENTIALS', icon: Compass, color: 'text-purple-400', count: '3 Inquiries' },
    { id: 'HEALTH', label: 'VITALITY & WELLNESS', icon: Activity, color: 'text-emerald-300', count: '3 Inquiries' },
    { id: 'FAMILY', label: 'FAMILY & LINEAGE', icon: Globe, color: 'text-orange-400', count: '2 Inquiries' },
    { id: 'TRAVEL', label: 'TRAVEL & RELOCATION', icon: MapPin, color: 'text-teal-400', count: '2 Inquiries' },
    { id: 'EDUCATION', label: 'LEARNING & SKILLS', icon: BookOpen, color: 'text-blue-400', count: '2 Inquiries' },
  ];

  const categoryQuestions: Record<string, { q: string; sub: string; tag: string }[]> = {
    CAREER: [
      { q: 'When is my next important career period?', sub: 'Evaluates 10th house transits, Jupiter cycles & Vimshottari dasha lords with sub-arcsecond precision', tag: 'Timing + Transits' },
      { q: 'Why is this period significant for leadership?', sub: 'Shows planetary dignity, Raja Yogas, aspect convergence & historical baseline', tag: 'Dignity + Yogas' },
      { q: 'What do different traditions say about my vocation?', sub: 'Compares Vedic Sidereal (10th Bhava), Western Midheaven & KP cuspal sub-lords', tag: 'Multi-System' },
      { q: 'How stable is this career timing result?', sub: 'Tests ±15 min birth-time uncertainty to verify if Lagna or D9 Navamsha shifts', tag: 'Uncertainty Index' },
    ],
    LOVE: [
      { q: 'What does my chart say about long-term relationships?', sub: 'Evaluates 7th house Kendra, Venus dignity & Darakaraka planetary status across D1 and D9', tag: '7th Bhava' },
      { q: 'What timing periods highlight connection & marriage?', sub: 'Highlights benefic Jupiter & Venus transits across the 1st/7th relationship axis', tag: 'Transit Activation' },
      { q: 'How compatible are our two birth charts?', sub: 'Ashta Koota 36-Guna matching + Western synastry aspect grid and composite Midpoints', tag: 'Synastry + Koota' },
      { q: 'What patterns should I be mindful of?', sub: 'Identifies Kuja (Manglik) influences with classical BPHS cancellation rules', tag: 'Dosha Evaluation' },
    ],
    RELATIONSHIPS: [
      { q: 'How do our timing cycles align over the next year?', sub: 'Overlay dual Vimshottari dasha periods and Jupiter-Saturn transit intersections', tag: 'Dual Timeline' },
      { q: 'Where do we have natural emotional harmony?', sub: 'Evaluates Moon sign element chemistry, Trines & Navamsha D9 planetary resonance', tag: 'D9 Navamsha' },
      { q: 'What areas require conscious communication?', sub: 'Highlights Saturn-Mars aspect friction and 3rd/7th house cuspal tensions', tag: 'Aspect Geometry' },
    ],
    MONEY: [
      { q: 'When are my strongest financial timing cycles?', sub: 'Analyzes 2nd (wealth) and 11th (gains) houses + classical Dhana & Lakshmi Yogas', tag: 'Dhana Yogas' },
      { q: 'How do different systems evaluate resource stability?', sub: 'Compares Vedic Indu Lagna with Western 2nd house solar arcs and KP sub-lords', tag: 'Consensus' },
      { q: 'What does my chart say about long-term asset building?', sub: 'Evaluates Saturn-Jupiter structural compounding cycles and 4th house real estate', tag: 'Long-Range' },
    ],
    TIMING: [
      { q: 'What matters right now in my life timing?', sub: 'Current active planetary phase, transit triggers & daily Vedic Panchanga (Tithi, Vara, Nakshatra)', tag: 'Real-Time Sky' },
      { q: 'What comes next over the next 6 to 12 months?', sub: 'Near-term transit horizon with entering and separating planetary aspects', tag: 'Horizon Forecast' },
      { q: 'Which window looks strongest for major decisions?', sub: 'Multi-system timing score based on benefic planetary support and Abhijit Muhurta', tag: 'Decision Window' },
    ],
    GROWTH: [
      { q: 'What is my primary soul purpose in this lifetime?', sub: 'Evaluates Atmakaraka (soul planet), Rahu-Ketu nodal axis & Sun spiritual dignity', tag: 'Atmakaraka' },
      { q: 'What inner strengths are highlighted in my chart?', sub: 'Shadbala 6-fold planetary potency matrix (Sthana, Dik, Kala, Chesta, Naisargika, Drik)', tag: 'Shadbala Potency' },
      { q: 'How can I align with my natural strengths?', sub: 'D1 Rashi and D9 Navamsha harmonic integration and Ishta Devata analysis', tag: 'Harmonic Synthesis' },
    ],
    'MY CHART': [
      { q: 'What are my exact Sun, Moon, and Rising signs?', sub: 'Sub-arcsecond degrees, Nakshatras, Padas and planetary house positions (DE440)', tag: 'DE440 Precision' },
      { q: 'Which planets are in their strongest dignity?', sub: 'Exaltation, Moolatrikona, Own Sign vs Debilitation and Neecha Bhanga calculation', tag: 'Essential Dignity' },
      { q: 'What special Yogas are present in my birth chart?', sub: 'Identifies Raja, Dhana, Gajakesari, Budhaditya & Pancha Mahapurusha yogas', tag: 'Classical Yogas' },
    ],
    HEALTH: [
      { q: 'How is my general vitality and constitutional balance?', sub: 'Evaluates 1st house (Lagna), Sun vitality, 6th house resilience and Ayurvedic Dosha balance', tag: 'Constitutional Vitality' },
      { q: 'What timing cycles indicate periods for rest and recovery?', sub: 'Tracks 6th/8th/12th house transit activations and Rahu/Ketu sub-periods', tag: 'Recovery Windows' },
      { q: 'What lifestyle practices align with my planetary archetypes?', sub: 'Classical diurnal routines (Dinacharya) based on planetary hora and Moon phases', tag: 'Ayurvedic Jyotish' },
    ],
    FAMILY: [
      { q: 'What does my chart say about family roots & ancestry?', sub: 'Analyzes 4th house (mother/home), 9th house (lineage & dharma) and Pitra Dosha status', tag: '4th & 9th Bhava' },
      { q: 'What timing cycles affect family harmony?', sub: 'Evaluates Jupiter-Moon transit interactions and Dasha sub-periods across domestic bhavas', tag: 'Family Transits' },
    ],
    TRAVEL: [
      { q: 'When are my most favorable windows for travel & relocation?', sub: 'Analyzes 3rd (short journeys), 9th (long pilgrimage), and 12th (overseas residence)', tag: 'Relocation Timing' },
      { q: 'What do different traditions indicate about foreign residence?', sub: 'Rahu dasha, 12th house planetary alignments and Astrocartography planetary lines', tag: 'Astrocartography' },
    ],
    EDUCATION: [
      { q: 'What fields of study align best with my intellectual strengths?', sub: 'Analyzes Mercury, Jupiter, 5th house (intellect) & Saraswati/Nipuna Yogas', tag: 'Intellectual Vocation' },
      { q: 'When is my most supportive timing for exams & certifications?', sub: '5th and 10th house benefic dasha and transit activations', tag: 'Academic Timing' },
    ],
  };

  // Timeline Demo Data
  const timelinePhases = [
    { label: 'NOW', range: 'Active Current Window', event: 'Saturn Transit through 10th House', focus: 'Career Focus & Foundation Building', sky: 'Saturn in Aquarius ♒ • Jupiter in Taurus ♉', badge: 'High Activity' },
    { label: '3 MONTHS', range: 'Nov 2026 – Jan 2027', event: 'Jupiter Trine Natal Midheaven', focus: 'Professional Expansion & Recognition', sky: 'Jupiter Trine MC • Sun activating 10th Cusp', badge: 'Peak Window' },
    { label: '6 MONTHS', range: 'Feb 2027 – May 2027', event: 'Venus-Mercury Conjunction in 11th House', focus: 'Financial Gains & Key Collaborative Alliances', sky: 'Venus entering 11th Bhava • Mercury Direct', badge: 'Harmonic Flow' },
    { label: '1 YEAR', range: 'Jul 2027 – Dec 2027', event: 'New Mahadasha Antardasha Shift', focus: 'Personal Growth & Creative Milestone', sky: 'Jupiter entering Gemini ♊ • Lunar Node Shift', badge: 'Major Shift' },
    { label: '3 YEARS', range: '2028 – 2029', event: 'Major Progressed Planetary Cycle', focus: 'Long-Term Structural Mastery & Leadership', sky: 'Saturn-Jupiter Sextile • Solar Arc Trine', badge: 'Epoch Milestone' }
  ];

  // Birth-Time Sensitivity Test Cases
  const sensitivityData: Record<string, { career: string; relationship: string; cusps: string; note: string; status: 'Stable' | 'Moderate' | 'Boundary Shift' }> = {
    '10:45': { career: 'Stable (High)', relationship: 'Stable (High)', cusps: "Capricorn Lagna 28°14' (Near cusp)", note: 'Planetary signs and major Dasha periods remain identical across entire hour.', status: 'Stable' },
    '10:50': { career: 'Stable (High)', relationship: 'Stable (High)', cusps: "Aquarius Lagna 00°22' (Sign change)", note: 'Ascendant changes from Capricorn to Aquarius; house cusps shift by 1 sign.', status: 'Boundary Shift' },
    '10:55': { career: 'Stable (High)', relationship: 'Moderate', cusps: "Aquarius Lagna 02°38' (Secure in sign)", note: 'Ascendant firmly established in Aquarius; D9 Navamsha shifts by 1 Pada.', status: 'Moderate' },
    '11:00': { career: 'Stable (High)', relationship: 'Moderate', cusps: "Aquarius Lagna 05°04'", note: 'House cusps fully stabilized; planetary aspects and transits remain unchanged.', status: 'Stable' },
  };

  // Multi-Tradition Comparison Data
  const traditionDetails = {
    vedic: {
      name: 'Vedic Sidereal (Jyotish)',
      status: 'Strong Activation',
      theme: 'Expansion through Karma, Dasha & Shodashavarga cycles',
      indicators: 'Jupiter transiting 10th bhava from Lagna; Moon in Rohini Nakshatra; Jupiter-Saturn Dasha balance active.',
      source: 'Brihat Parashara Hora Shastra, Ch. 45',
      badge: '92% Alignment'
    },
    western: {
      name: 'Western Tropical & Psychological',
      status: 'Strong Activation',
      theme: 'Midheaven Elevation, Solar Arcs & Social Recognition',
      indicators: 'Transiting Jupiter sextile natal Sun; Progressed Midheaven forming exact trine with natal Jupiter in 10th house.',
      source: "Ptolemy's Tetrabiblos & Modern Solar Arc Directions",
      badge: '89% Alignment'
    },
    kp: {
      name: 'KP Stellar System (Krishnamurti Padhdhati)',
      status: 'High Precision',
      theme: 'Specific Sub-Lord Cuspal Significations & Placidus Cusps',
      indicators: '10th house cuspal sub-lord signifies houses 2, 6, 10, and 11, indicating steady occupational elevation and gain.',
      source: 'Krishnamurti Padhdhati Reader III & IV',
      badge: '88% Alignment'
    },
    jaimini: {
      name: 'Jaimini Sutras (Chara Dasha)',
      status: 'Favorable Influence',
      theme: 'Amatyakaraka (AmK) Career Dignity & Arudha Lagna',
      indicators: 'Chara Dasha period activating Amatyakaraka sign with benefic Rashi Drishti from Jupiter on Arudha Lagna (AL).',
      source: 'Maharishi Jaimini Upadesha Sutras',
      badge: '85% Alignment'
    },
    chinese: {
      name: 'Chinese BaZi & 4 Pillars of Destiny',
      status: 'Harmonious Flow',
      theme: 'Resource & Officer Element Cycles (Day Master Support)',
      indicators: 'Current 10-Year Luck Pillar brings supportive Yang Wood energy nourishing the Fire day-master.',
      source: 'Classical BaZi San Ming Tong Hui',
      badge: '82% Alignment'
    },
    hellenistic: {
      name: 'Hellenistic & Arabic Lots',
      status: 'Favorable Lot of Fortune',
      theme: 'Lot of Spirit & Tenth-Place Climax Timing',
      indicators: 'Zodiacal Releasing from the Lot of Spirit reaches a major Level 1 angular pivot in career domicile.',
      source: 'Vettius Valens Anthologies (Book IV)',
      badge: '80% Alignment'
    }
  };

  // Sample quick calculate handler
  const handleQuickCalculate = (preset?: Partial<UserProfile>) => {
    onStartOnboarding(preset || {
      name: 'Seeker',
      dob: '1998-06-15',
      time: '12:00',
      location: 'London, UK'
    });
  };

  return (
    <div className="min-h-screen bg-[#040711] text-white selection:bg-amber-400 selection:text-slate-950 font-sans relative overflow-x-hidden">
      
      {/* Background Starfield & Subtle Cosmic Nebula Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-amber-500/12 via-indigo-600/6 to-transparent rounded-full blur-[150px]" />
        <div className="absolute top-[35%] right-[-10%] w-[650px] h-[650px] bg-gradient-to-br from-cyan-500/8 via-purple-600/6 to-transparent rounded-full blur-[130px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[750px] h-[750px] bg-gradient-to-tr from-amber-600/8 via-rose-600/6 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* 1. Global Navigation Bar */}
        <OmniLandingNavbar 
          onStartOnboarding={onStartOnboarding}
          onNavigateToTab={onNavigateToTab}
          userProfile={userProfile}
        />

        {/* ─── LIVE REAL-TIME CELESTIAL STATUS TICKER ────────────────────────── */}
        <div className="pt-20 sm:pt-24 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>LIVE EPHEMERIS (NASA JPL DE440):</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Moon className="w-3 h-3 text-cyan-400" />
                <span>Moon: <strong className="text-white">Rohini (Taurus ♉)</strong></span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Sun className="w-3 h-3 text-amber-400" />
                <span>Sun: <strong className="text-white">Simha (Leo ♌)</strong></span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Ayanamsha: <strong className="text-white">True Lahiri 24°13'08"</strong></span>
              </span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Sun className="w-3 h-3 text-rose-400" />
                <span>NOAA Solar Kp: <strong className="text-amber-400">5.8 (G2 Moderate)</strong></span>
              </span>
            </div>

            <button
              onClick={() => onNavigateToTab('news-intelligence')}
              className="text-amber-400 hover:text-amber-300 underline text-[11px] cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>Space & News Radar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ============================================================
            SECTION 1: HERO — "BE YOUR OWN ASTROLOGER."
            ============================================================ */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase shadow-lg shadow-amber-400/5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>THE UNIVERSAL ASTROLOGICAL INTELLIGENCE PLATFORM</span>
            </div>

            {/* Master Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
              BE YOUR OWN <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                ASTROLOGER.
              </span>
            </h1>

            {/* Supporting Statement */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
              Your chart. Your questions. Your timing. Explore multiple classical traditions, understand the mathematical reasoning behind every prediction, and discover what truly matters.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <button
                onClick={() => onStartOnboarding()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black text-sm font-mono flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <span>CREATE MY FREE BIRTH CHART</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateToTab('home')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold text-sm font-mono flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px]"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>ASK ASTRO360 OMNI</span>
              </button>
            </div>

            {/* Small Trust Line */}
            <p className="text-xs text-slate-400 font-mono pt-1 flex items-center justify-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NASA JPL DE440 Ephemeris</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero PII Storage</span>
              <span className="flex items-center gap-1.5"><Scale className="w-3.5 h-3.5 text-emerald-400" /> Classical Scripture Citations</span>
            </p>
          </div>

          {/* ============================================================
              HERO VISUAL: DUAL INTERACTIVE SUITE (LIVE ENGINE & DEMO)
              ============================================================ */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto space-y-6">
            
            {/* Real Interactive Product Demo Container */}
            <div className="bg-[#0A101D] border-2 border-amber-400/30 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden text-left backdrop-blur-xl">
              
              {/* Window chrome header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2 font-bold">ASTRO360 Interactive Exploration Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/25 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    Sub-Arcsecond Mathematical Grounding
                  </span>
                </div>
              </div>

              {/* Interactive Question Input Box with Quick Suggestion Chips */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold">WHAT WOULD YOU LIKE TO EXPLORE?</p>
                  <span className="text-[10px] font-mono text-slate-500">Try clicking a sample inquiry:</span>
                </div>

                <div className="flex items-center gap-3 bg-[#050811] border border-white/15 rounded-2xl px-4 py-3.5 text-white font-sans text-sm sm:text-base shadow-inner">
                  <Search className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-amber-200">“{heroActiveQuery}”</span>
                </div>

                {/* Quick Switcher Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'When is my next important career period?',
                    'What does my chart say about long-term relationships?',
                    'When are my strongest financial timing cycles?',
                    'What is my primary soul purpose in this lifetime?'
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroActiveQuery(chip)}
                      className={`text-[11px] font-mono px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                        heroActiveQuery === chip
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 font-bold'
                          : 'bg-white/5 text-slate-400 hover:text-white border-white/5 hover:border-white/15'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* ASTRO360 Response Headline */}
              <div className="bg-gradient-to-r from-amber-400/15 via-amber-400/10 to-transparent border border-amber-400/30 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase">CAREER & VOCATION ACTIVATION</span>
                  </div>
                  <span className="text-xs font-mono bg-amber-400 text-slate-950 font-black px-3 py-0.5 rounded-full shadow-md">
                    High Multi-System Convergence (92%)
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  Sep 12 – Oct 28
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Elevated occupational activity, leadership expansion, and public recognition. Both Vedic Dasha and Western transits activate the 10th house career axis simultaneously.
                </p>
              </div>

              {/* Interactive View Tabs: WHY | COMPARE | TIMELINE | TECHNICAL | ASK FOLLOW-UP */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 pt-1 border-b border-white/10 pb-3">
                  {[
                    { id: 'why', label: 'WHY? (Evidence Tree)' },
                    { id: 'compare', label: 'COMPARE (Traditions)' },
                    { id: 'timeline', label: 'TIMELINE (Wave)' },
                    { id: 'technical', label: 'TECHNICAL (Degrees)' },
                    { id: 'followup', label: 'ASK FOLLOW-UP' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setHeroActiveView(tab.id as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[38px] ${
                        heroActiveView === tab.id
                          ? 'bg-amber-400 text-slate-950 shadow-md scale-102 font-black'
                          : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic View Expansion */}
                <AnimatePresence mode="wait">
                  {heroActiveView === 'why' && (
                    <motion.div
                      key="why"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono"
                    >
                      <div className="bg-[#050811] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Primary Planetary Factor</span>
                        <p className="font-bold text-amber-300">Jupiter in Taurus (10th Bhava)</p>
                        <p className="text-[11px] text-slate-400 font-sans">Benefic transit casting protective aspect on Lagna and 2nd house of accumulated wealth.</p>
                      </div>

                      <div className="bg-[#050811] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Active Timing Dasha</span>
                        <p className="font-bold text-cyan-300">Jupiter-Saturn Dasha Sub-Period</p>
                        <p className="text-[11px] text-slate-400 font-sans">Exact degree activation occurs during Sep 12 – Oct 28 window.</p>
                      </div>

                      <div className="bg-[#050811] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Tradition Consensus</span>
                        <p className="font-bold text-emerald-300">4 of 4 Major Systems Agree</p>
                        <p className="text-[11px] text-slate-400 font-sans">Vedic (Strong), Western (Strong), KP Stellar (High), Jaimini (Favorable).</p>
                      </div>

                      <div className="bg-[#050811] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Birth-Time Stability Index</span>
                        <p className="font-bold text-indigo-300">High Stability (±15 min Safe)</p>
                        <p className="text-[11px] text-slate-400 font-sans">Result is robust even if birth time is off by up to 15 minutes.</p>
                      </div>
                    </motion.div>
                  )}

                  {heroActiveView === 'compare' && (
                    <motion.div
                      key="compare"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-2 text-xs font-mono"
                    >
                      {[
                        { system: 'Vedic Sidereal (Jyotish)', strength: 'Strong', badge: 'bg-emerald-400/20 text-emerald-300', desc: 'Jupiter transiting 10th house with supportive Vimshottari dasha sub-period.' },
                        { system: 'Western Tropical', strength: 'Strong', badge: 'bg-emerald-400/20 text-emerald-300', desc: 'Progressed Midheaven trine natal Jupiter with Sun entering 10th solar house.' },
                        { system: 'KP Stellar System', strength: 'High Precision', badge: 'bg-emerald-400/20 text-emerald-300', desc: '10th cuspal sub-lord signifies 2, 6, 10, 11 (favorable for steady career effort).' },
                        { system: 'Jaimini Sutras', strength: 'Favorable', badge: 'bg-amber-400/20 text-amber-300', desc: 'Chara Dasha activates Amatyakaraka sign with benefic aspect on Arudha Lagna.' },
                      ].map((row, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#050811] border border-white/10 rounded-xl p-3">
                          <div className="space-y-0.5">
                            <span className="font-bold text-white">{row.system}</span>
                            <p className="text-[11px] text-slate-400 font-sans">{row.desc}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full w-fit ${row.badge}`}>
                            {row.strength}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {heroActiveView === 'timeline' && (
                    <motion.div
                      key="timeline"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-[#050811] border border-white/10 rounded-xl p-4 space-y-3 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Aug 2026</span>
                        <span className="text-amber-400 font-bold">Sep 12 – Oct 28 (Peak Active Period)</span>
                        <span>Dec 2026</span>
                      </div>
                      <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden relative">
                        <div className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 h-full w-[45%] ml-[30%] rounded-full shadow-lg shadow-amber-400/30" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans text-center">
                        Planetary momentum begins building in late August, peaks between Sep 12 and Oct 28, and transitions into consolidation in November.
                      </p>
                    </motion.div>
                  )}

                  {heroActiveView === 'technical' && (
                    <motion.div
                      key="technical"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-[#050811] border border-white/10 rounded-xl p-4 space-y-2 text-xs font-mono"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                        <div><span className="text-slate-500">Ayanamsha:</span> <span className="text-amber-300 font-bold">True Lahiri (24°13'08")</span></div>
                        <div><span className="text-slate-500">Jupiter Longitude:</span> <span className="text-white font-bold">18°24' Taurus (Rohini P3)</span></div>
                        <div><span className="text-slate-500">10th House Cusp:</span> <span className="text-white font-bold">12°11' MC (Placidus/Sripati)</span></div>
                        <div><span className="text-slate-500">Classical Rule:</span> <span className="text-white font-bold">BPHS Ch. 45 / Sloka 12</span></div>
                      </div>
                    </motion.div>
                  )}

                  {heroActiveView === 'followup' && (
                    <motion.div
                      key="followup"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-2 text-xs"
                    >
                      <p className="text-[11px] font-mono text-slate-400">Suggested next exploratory inquiries:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'What about relationship timing during this window?',
                          'How sensitive is this period to my exact birth time?',
                          'Add this window to my ASTRO360 calendar',
                          'Generate complete executive career report'
                        ].map((item, i) => (
                          <button
                            key={i}
                            onClick={() => onStartOnboarding()}
                            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-amber-400/20 text-slate-300 hover:text-amber-200 border border-white/10 hover:border-amber-400/30 text-left transition-all cursor-pointer font-sans text-xs"
                          >
                            {item} ➔
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Proof Note & CTA Bridge */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Demonstrates ASTRO360's open, explorable architecture.
                </span>
                <button 
                  onClick={() => onStartOnboarding()}
                  className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer flex items-center gap-1"
                >
                  <span>Explore with your own birth details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Instant Quick Calculator Studio */}
            <OmniHeroChartStudio onCalculate={handleQuickCalculate} userProfile={userProfile} />

          </div>
        </section>

        {/* ============================================================
            SECTION 2: STOP JUST READING YOUR ASTROLOGY. START EXPLORING IT.
            ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 text-center">
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              STOP JUST READING YOUR ASTROLOGY.
            </h2>
            <p className="text-lg text-amber-300 font-mono font-bold">
              Start exploring it.
            </p>
          </div>

          {/* 6-Step Journey Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto text-left">
            {[
              { step: '01', label: 'READ', desc: 'See your chart placements, nakshatras, and exact timing windows.' },
              { step: '02', label: 'QUESTION', desc: 'Ask natural questions in your own words without jargon.' },
              { step: '03', label: 'UNDERSTAND', desc: 'Understand the reasons and planetary factors behind a result.' },
              { step: '04', label: 'COMPARE', desc: 'See where Vedic, Western, KP, and Jaimini systems align.' },
              { step: '05', label: 'EXPLORE', desc: 'Drag timelines and test birth-time assumptions.' },
              { step: '06', label: 'DISCOVER', desc: 'Reach your own informed, confident conclusions.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0A101D] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 space-y-2 transition-all group hover:translate-y-[-2px] shadow-lg shadow-black/40">
                <span className="text-[10px] font-mono text-amber-400/80 font-bold block">{item.step}</span>
                <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">{item.label}</h3>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 3: LIVE 12-ZODIAC RADAR & TRANSIT INTELLIGENCE
            ============================================================ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <OmniLiveZodiacRadar onSelectSign={(_sign) => onStartOnboarding()} />
        </section>

        {/* ============================================================
            SECTION 4: INTERACTIVE TOOLS SUITE PLAYGROUND
            ============================================================ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <InteractiveToolsSuite onNavigateToTab={onNavigateToTab} />
        </section>

        {/* ============================================================
            SECTION 5: ASK THE QUESTIONS YOU ACTUALLY CARE ABOUT.
            ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Natural Language Astrological Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ASK THE QUESTIONS YOU ACTUALLY CARE ABOUT.
            </h2>
            <p className="text-sm text-slate-400 font-sans max-w-xl mx-auto">
              Choose a domain to see the types of clear, multi-tradition inquiries you can explore.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-8">
            {questionCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer min-h-[42px] ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-400/20 scale-102 font-black'
                      : 'bg-[#0A101D] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : cat.color}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Category Questions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {(categoryQuestions[selectedCategory] || categoryQuestions.CAREER).map((item, idx) => (
              <div
                key={idx}
                onClick={() => onStartOnboarding()}
                className="bg-[#0A101D] border border-white/10 hover:border-amber-400/40 rounded-2xl p-5 space-y-2.5 text-left cursor-pointer transition-all hover:translate-y-[-2px] group shadow-lg shadow-black/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    “{item.q}”
                  </p>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors mt-0.5" />
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {item.sub}
                </p>
                <div className="pt-1">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 6: PRODUCT PREVIEW SUITE (4 APPS IN ONE)
            ============================================================ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <OmniProductPreview onExplore={() => onStartOnboarding()} />
        </section>

        {/* ============================================================
            SECTION 7: COMPARE TRADITIONS & DISCOVER HARMONY
            ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              COMPARE. DON'T JUST ACCEPT ONE PERSPECTIVE.
            </h2>
            <p className="text-base text-slate-300 font-sans max-w-2xl mx-auto">
              Different traditions emphasize different dimensions of the same celestial configuration. ASTRO360 calculates them simultaneously so you can explore consensus.
            </p>
          </div>

          {/* Tradition Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-6">
            {[
              { id: 'vedic', label: 'VEDIC (JYOTISH)' },
              { id: 'western', label: 'WESTERN TROPICAL' },
              { id: 'kp', label: 'KP STELLAR' },
              { id: 'jaimini', label: 'JAIMINI SUTRAS' },
              { id: 'chinese', label: 'CHINESE BAZI' },
              { id: 'hellenistic', label: 'HELLENISTIC LOTS' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTradition(t.id as any)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer min-h-[40px] ${
                  selectedTradition === t.id
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                    : 'bg-[#0A101D] text-slate-300 hover:text-white border-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Multi-System Active Card */}
          <div className="max-w-3xl mx-auto bg-[#0A101D] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-white/10 pb-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">COMMON THEME</span>
                <p className="text-lg font-bold text-white">Career Milestone & Vocation Elevation</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">SYSTEM EMPHASIS</span>
                <p className="text-lg font-bold text-amber-300">{traditionDetails[selectedTradition].theme}</p>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <span className="text-slate-400 font-bold block">Planetary Indicators:</span>
              <p className="text-slate-200 font-sans text-sm bg-[#050811] border border-white/10 rounded-xl p-4 leading-relaxed">
                {traditionDetails[selectedTradition].indicators}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
              <span>Classical Source: <strong className="text-slate-200">{traditionDetails[selectedTradition].source}</strong></span>
              <span className="text-amber-400 font-bold">{traditionDetails[selectedTradition].badge}</span>
            </div>

          </div>
        </section>

        {/* ============================================================
            SECTION 8: MOVE THROUGH YOUR FUTURE (INTERACTIVE TIMELINE)
            ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              MOVE THROUGH YOUR FUTURE.
            </h2>
            <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
              Drag through timing horizons and watch astronomical triggers, transits, and predictions update in real time.
            </p>
          </div>

          {/* Interactive Timeline Stepper */}
          <div className="max-w-4xl mx-auto bg-[#0A101D] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl">
            
            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-white/10 pb-4">
              {timelinePhases.map((phase, idx) => (
                <button
                  key={idx}
                  onClick={() => setTimelineIndex(idx)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer min-h-[48px] ${
                    timelineIndex === idx
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-lg scale-102'
                      : 'bg-[#050811] text-slate-400 hover:text-white border-white/10'
                  }`}
                >
                  <span className="text-xs font-mono font-bold block">{phase.label}</span>
                  <span className="text-[9px] block opacity-75 font-sans">{phase.badge}</span>
                </button>
              ))}
            </div>

            {/* Active Phase Details */}
            <div className="bg-[#050811] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-amber-300 font-bold">{timelinePhases[timelineIndex].range}</span>
                <span className="text-xs font-mono text-slate-400">{timelinePhases[timelineIndex].sky}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Major Astronomical Event</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">{timelinePhases[timelineIndex].event}</h3>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Core Life Focus</span>
                <p className="text-sm font-sans text-slate-300">{timelinePhases[timelineIndex].focus}</p>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 text-center">
              Deterministic Chain: <span className="text-amber-300">Sky Positions</span> ➔ <span className="text-cyan-300">Timing Cycles</span> ➔ <span className="text-emerald-300">Prediction</span> ➔ <span className="text-purple-300">Explanation</span>
            </div>

          </div>
        </section>

        {/* ============================================================
            SECTION 9: BIRTH-TIME SENSITIVITY & UNCERTAINTY TEST
            ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              SEE HOW YOUR ASSUMPTIONS CHANGE THE RESULT.
            </h2>
            <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
              Not every result is equally sensitive to your birth time. We calculate mathematical confidence intervals across ±15 minute drift.
            </p>
          </div>

          {/* Sensitivity Demo Box */}
          <div className="max-w-3xl mx-auto bg-[#0A101D] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl">
            
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-300">Test Birth-Time Variation (±15 Minutes):</span>
              <div className="grid grid-cols-4 gap-2">
                {['10:45', '10:50', '10:55', '11:00'].map((timeStr) => (
                  <button
                    key={timeStr}
                    onClick={() => setSelectedBirthTime(timeStr)}
                    className={`py-3 rounded-xl border text-center font-mono text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                      selectedBirthTime === timeStr
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                        : 'bg-[#050811] text-slate-300 hover:text-white border-white/10'
                    }`}
                  >
                    {timeStr}
                  </button>
                ))}
              </div>
            </div>

            {/* Results for selected birth time */}
            <div className="space-y-2 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-[#050811] border border-white/10 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-500">Career Indicator</span>
                  <p className="font-bold text-emerald-400">{sensitivityData[selectedBirthTime].career}</p>
                  <span className="text-[9px] text-slate-500">Unaffected by minute drift</span>
                </div>

                <div className="bg-[#050811] border border-white/10 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-500">Relationship Timing</span>
                  <p className="font-bold text-amber-300">{sensitivityData[selectedBirthTime].relationship}</p>
                  <span className="text-[9px] text-slate-500">Navamsha D9 Pada sensitivity</span>
                </div>

                <div className="bg-[#050811] border border-white/10 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-500">House Cusps</span>
                  <p className="font-bold text-purple-300 text-[11px] leading-tight">{sensitivityData[selectedBirthTime].cusps}</p>
                  <span className="text-[9px] text-slate-500">Ascendant degree changes</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-sans pt-2 bg-white/5 p-3 rounded-xl border border-white/5 leading-relaxed">
                💡 <strong>Astronomical Insight:</strong> {sensitivityData[selectedBirthTime].note}
              </p>
            </div>

          </div>
        </section>

        {/* ============================================================
            SECTION 10: SIMPLE VS EXPERT MODE TOGGLE
            ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              SIMPLE WHEN YOU WANT CLARITY. DEEP WHEN YOU WANT DETAIL.
            </h2>
            <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
              Switch between concise executive summaries and full ephemeris calculations at any time.
            </p>
          </div>

          {/* Simple vs Expert Interactive Switcher */}
          <div className="max-w-3xl mx-auto bg-[#0A101D] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-slate-400 font-bold">Toggle View Density:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setDemoDensity('simple')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[38px] ${
                    demoDensity === 'simple'
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'bg-[#050811] text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  Simple Mode
                </button>
                <button
                  onClick={() => setDemoDensity('expert')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[38px] ${
                    demoDensity === 'expert'
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'bg-[#050811] text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  Expert Mode
                </button>
              </div>
            </div>

            {demoDensity === 'simple' ? (
              <div className="space-y-4">
                <div className="bg-[#050811] border border-white/10 rounded-2xl p-6 space-y-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">Executive Summary</span>
                  <h3 className="text-xl font-bold text-white">Career activity is elevated.</h3>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    Your current timing window strongly supports initiative, structured growth, and long-term career commitments.
                  </p>
                  <button
                    onClick={() => setDemoDensity('expert')}
                    className="text-xs font-mono text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>[ Why? Show Technical Details ]</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-[#050811] border border-white/10 rounded-2xl p-6 space-y-3">
                  <span className="text-[10px] text-amber-400 uppercase font-bold">AstroCore Calculation Engine Output</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
                    <div><span className="text-slate-500 block">Planet:</span> <strong className="text-white">Jupiter</strong></div>
                    <div><span className="text-slate-500 block">Longitude:</span> <strong className="text-white">18°24' Taurus</strong></div>
                    <div><span className="text-slate-500 block">House:</span> <strong className="text-white">10th House (Kendra)</strong></div>
                    <div><span className="text-slate-500 block">Dasha:</span> <strong className="text-white">Jupiter-Saturn</strong></div>
                    <div><span className="text-slate-500 block">Ayanamsha:</span> <strong className="text-white">Lahiri 24°13'08"</strong></div>
                    <div><span className="text-slate-500 block">Source:</span> <strong className="text-white">BPHS Ch. 45 / S12</strong></div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ============================================================
            SECTION 11: START FREE (EXPLORE ALL 10+ FREE SUITES)
            ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              100% FREE. NO LOGIN OR CREDIT CARD REQUIRED.
            </h2>
            <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
              Experience the mathematical precision of ASTRO360 with instantaneous browser calculations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 max-w-5xl mx-auto text-left">
            {[
              { title: 'Free Birth Chart (Kundli)', desc: 'North & South Indian D1 Rashi & Planetary Positions', tab: 'birth-chart' },
              { title: 'Free Moon Sign & Nakshatra', desc: 'Exact degree, Nakshatra Pada & Lord placement', tab: 'free-tools' },
              { title: 'Free Rising Sign (Lagna)', desc: 'Lagna cusp calculation with sub-arcsecond accuracy', tab: 'free-tools' },
              { title: 'Free Daily Panchanga', desc: 'Tithi, Vara, Nakshatra, Yoga, Karana & Rahu Kaal', tab: 'panchanga' },
              { title: 'Free Compatibility (36-Guna)', desc: 'Ashta Koota Synastry with cancellation rules', tab: 'compatibility' },
              { title: 'Free Vimshottari Dasha', desc: '120-year planetary timeline with Antardasha cycles', tab: 'dasha' },
              { title: 'Free Transit Radar', desc: 'Live Gochara transits across your natal houses', tab: 'transits' },
              { title: 'Free Electional Muhurta', desc: 'Abhijit, Brahma & Choghadiya auspicious windows', tab: 'muhurta' },
              { title: 'Free Astrocartography', desc: 'Global planetary relocation lines & AC/MC crossings', tab: 'astrocartography' },
            ].map((tool, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateToTab(tool.tab)}
                className="bg-[#0A101D] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 space-y-1.5 cursor-pointer transition-all hover:translate-y-[-2px] group shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">{tool.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <p className="text-[11px] text-slate-400 font-sans">{tool.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <button
              onClick={() => onNavigateToTab('free-tools')}
              className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-400/30 font-bold font-mono text-sm inline-flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <span>EXPLORE COMPLETE FREE TOOLS CATALOG</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ============================================================
            SECTION 12: MATHEMATICAL ACCURACY & SCIENTIFIC PROVENANCE
            ============================================================ */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 text-center">
          <div className="max-w-3xl mx-auto space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              CALCULATED FIRST. EXPLAINED SECOND.
            </h2>
            <p className="text-sm text-slate-400 font-sans max-w-xl mx-auto">
              ASTRO360 operates under a strict four-layer architecture ensuring mathematical purity and complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-5xl mx-auto text-left font-mono text-xs mb-8">
            <div className="bg-[#0A101D] border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] text-amber-400 font-bold">LAYER 1</span>
              <p className="font-bold text-white">EPHEMERIS PHYSICS</p>
              <p className="text-[11px] text-slate-400 font-sans">NASA JPL DE440 sub-arcsecond orbital dynamics.</p>
            </div>
            <div className="bg-[#0A101D] border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] text-cyan-400 font-bold">LAYER 2</span>
              <p className="font-bold text-white">CLASSICAL RULES</p>
              <p className="text-[11px] text-slate-400 font-sans">BPHS, Phaladeepika, Tetrabiblos rules codified.</p>
            </div>
            <div className="bg-[#0A101D] border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold">LAYER 3</span>
              <p className="font-bold text-white">CONSENSUS ENGINE</p>
              <p className="text-[11px] text-slate-400 font-sans">Multi-system alignment and divergence mapped.</p>
            </div>
            <div className="bg-[#0A101D] border border-white/10 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] text-purple-400 font-bold">LAYER 4</span>
              <p className="font-bold text-white">EXPLAINABILITY</p>
              <p className="text-[11px] text-slate-400 font-sans">Grounded, transparent natural language synthesis.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> OWASP ASVS 5.0.0 Tested</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero PII Storage</span>
            <span className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-emerald-400" /> Scripture-Grounded Truth</span>
          </div>
        </section>

        {/* ============================================================
            SECTION 13: FINAL CALL TO ACTION — "BE YOUR OWN ASTROLOGER."
            ============================================================ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none rounded-3xl" />

          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>START YOUR PERSONAL EXPLORATION TODAY</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
              BE YOUR OWN <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                ASTROLOGER.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
              Ask your questions. Explore your birth chart. Compare world traditions. Understand the reasoning. Reach your own clarity.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <button
                onClick={() => onStartOnboarding()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black text-sm font-mono flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer min-h-[48px]"
              >
                <span>CREATE MY FREE BIRTH CHART</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateToTab('home')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold text-sm font-mono flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px]"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>ASK ASTRO360 OMNI</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 font-mono pt-1">
              No astrology background required. 100% free, private, and calculated in real time.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left text-xs font-mono text-slate-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>ASTRO360</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Universal astrological & computational ephemeris platform. Calculated first. Explained second.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block">Astrology Traditions</span>
              <ul className="space-y-1 text-[11px]">
                <li><button onClick={() => onNavigateToTab('vedic-astrology')} className="hover:text-amber-300 cursor-pointer">Vedic Sidereal (Jyotish)</button></li>
                <li><button onClick={() => onNavigateToTab('western-astrology')} className="hover:text-amber-300 cursor-pointer">Western Tropical</button></li>
                <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-amber-300 cursor-pointer">KP Stellar System</button></li>
                <li><button onClick={() => onNavigateToTab('panchanga')} className="hover:text-amber-300 cursor-pointer">Daily Panchanga</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block">Free Research Tools</span>
              <ul className="space-y-1 text-[11px]">
                <li><button onClick={() => onNavigateToTab('birth-chart')} className="hover:text-amber-300 cursor-pointer">Free Birth Chart</button></li>
                <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-amber-300 cursor-pointer">Free Moon Sign & Nakshatra</button></li>
                <li><button onClick={() => onNavigateToTab('compatibility')} className="hover:text-amber-300 cursor-pointer">Free Ashta Koota Compatibility</button></li>
                <li><button onClick={() => onNavigateToTab('news-intelligence')} className="hover:text-amber-300 cursor-pointer">Cosmic News & Mundane Hub</button></li>
                <li><button onClick={() => onNavigateToTab('methodology')} className="hover:text-amber-300 cursor-pointer">Ephemeris Methodology</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block">Privacy & Security</span>
              <p className="text-[11px] text-slate-400 font-sans">
                All birth calculations execute with zero-PII storage. Certified OWASP ASVS 5.0.0 Level 3 compliant.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <span>© 2026 ASTRO360. All rights reserved.</span>
            <span className="text-slate-500">Ephemeris Standard: NASA JPL DE440 / True Lahiri (Chitra Paksha)</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
