import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Compass, 
  Calendar, Layers, Heart, Briefcase, DollarSign, Globe, 
  Clock, BookOpen, ChevronRight, User, TrendingUp, RefreshCw,
  Scale, HelpCircle, Eye, Sliders, Check, Search, FileText,
  MapPin, Moon, Sun, Star, Activity, AlertCircle, ArrowUpRight
} from 'lucide-react';
import { UserProfile } from '../../types';
import OmniLandingNavbar from './OmniLandingNavbar';

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
  
  // Section 3: Categories & Questions State
  const [selectedCategory, setSelectedCategory] = useState<string>('CAREER');
  
  // Section 7: Interactive Timeline Slider State
  const [timelineIndex, setTimelineIndex] = useState<number>(0);
  
  // Section 8: Birth-Time Sensitivity Test State
  const [selectedBirthTime, setSelectedBirthTime] = useState<string>('10:50');
  
  // Section 9: Simple vs Expert Mode Switcher State
  const [demoDensity, setDemoDensity] = useState<'simple' | 'expert'>('simple');
  
  // Section 6: Tradition Compare Selector
  const [selectedTradition, setSelectedTradition] = useState<'vedic' | 'western' | 'kp' | 'jaimini' | 'chinese'>('vedic');

  // Question Categories Data
  const questionCategories = [
    { id: 'CAREER', label: 'CAREER', icon: Briefcase, color: 'text-amber-400' },
    { id: 'LOVE', label: 'LOVE', icon: Heart, color: 'text-rose-400' },
    { id: 'RELATIONSHIPS', label: 'RELATIONSHIPS', icon: User, color: 'text-pink-400' },
    { id: 'MONEY', label: 'MONEY', icon: DollarSign, color: 'text-emerald-400' },
    { id: 'TIMING', label: 'TIMING', icon: Clock, color: 'text-cyan-400' },
    { id: 'GROWTH', label: 'GROWTH', icon: TrendingUp, color: 'text-indigo-400' },
    { id: 'MY CHART', label: 'MY CHART', icon: Compass, color: 'text-purple-400' },
    { id: 'FAMILY', label: 'FAMILY', icon: Globe, color: 'text-orange-400' },
    { id: 'TRAVEL', label: 'TRAVEL', icon: MapPin, color: 'text-teal-400' },
    { id: 'EDUCATION', label: 'EDUCATION', icon: BookOpen, color: 'text-blue-400' },
  ];

  const categoryQuestions: Record<string, { q: string; sub: string }[]> = {
    CAREER: [
      { q: 'When is my next important career period?', sub: 'Evaluates 10th house transits, Jupiter cycles & Dasha lords' },
      { q: 'Why is this period significant?', sub: 'Shows planetary dignity, aspect convergence & historical baseline' },
      { q: 'What do different traditions say?', sub: 'Compares Vedic Sidereal, Western Solar Arcs & KP cuspal sub-lords' },
      { q: 'How stable is this result?', sub: 'Tests ±15 min birth-time uncertainty to show reliability' },
    ],
    LOVE: [
      { q: 'What does my chart say about relationships?', sub: 'Evaluates 7th house Kendra, Venus dignity & Darakaraka' },
      { q: 'What periods are important?', sub: 'Highlights benefic Jupiter & Venus transits across relationship axis' },
      { q: 'How compatible are we?', sub: 'Ashta Koota 36-Guna matching + Synastry aspect grid' },
      { q: 'What patterns should I be mindful of?', sub: 'Identifies Kuja (Manglik) influences with classical cancellation rules' },
    ],
    RELATIONSHIPS: [
      { q: 'How do our timing cycles align?', sub: 'Overlay dual Vimshottari dasha periods and Jupiter transits' },
      { q: 'Where do we have natural harmony?', sub: 'Evaluates Moon sign element chemistry, Trines & Navamsha D9' },
      { q: 'What areas require patience?', sub: 'Highlights Saturn-Mars aspect friction and communication cusps' },
    ],
    MONEY: [
      { q: 'When are my strongest financial cycles?', sub: 'Analyzes 2nd (wealth) and 11th (gains) houses + Dhana Yogas' },
      { q: 'How do different systems evaluate resource stability?', sub: 'Compares Vedic Indu Lagna with Western 2nd house progressions' },
      { q: 'What does my chart say about long-term asset building?', sub: 'Evaluates Saturn-Jupiter structural compounding' },
    ],
    TIMING: [
      { q: 'What matters right now in my life?', sub: 'Current active planetary phase, transit triggers & daily Panchanga' },
      { q: 'What comes next over the next 6 months?', sub: 'Near-term transit horizon with entering and separating aspects' },
      { q: 'Which period looks stronger for key initiatives?', sub: 'Multi-system timing score based on benefic planetary support' },
    ],
    GROWTH: [
      { q: 'What is my primary soul purpose in this life?', sub: 'Evaluates Atmakaraka (soul planet), Rahu-Ketu nodal axis & Sun' },
      { q: 'What inner strengths are highlighted in my chart?', sub: 'Shadbala 6-fold planetary potency matrix' },
      { q: 'How can I align with my natural strengths?', sub: 'D1 Rashi and D9 Navamsha harmonic integration' },
    ],
    'MY CHART': [
      { q: 'What are my Sun, Moon, and Rising signs?', sub: 'Exact sub-arcsecond degrees, Nakshatras and Pada placements' },
      { q: 'Which planets are in their strongest dignity?', sub: 'Exaltation, Moolatrikona, Own Sign vs Debilitation' },
      { q: 'What special Yogas are present in my birth chart?', sub: 'Identifies Raja, Dhana, Nipuna & Pancha Mahapurusha yogas' },
    ],
    FAMILY: [
      { q: 'What does my chart say about family roots & ancestry?', sub: 'Analyzes 4th house (mother/home) and 9th house (lineage)' },
      { q: 'What timing cycles affect family harmony?', sub: 'Evaluates Jupiter-Moon transit interactions' },
    ],
    TRAVEL: [
      { q: 'When are my most favorable windows for travel & relocation?', sub: 'Analyzes 3rd (short journeys), 9th (long travel), and 12th (overseas)' },
      { q: 'What do different traditions indicate about foreign residence?', sub: 'Rahu dasha & 12th house planetary alignments' },
    ],
    EDUCATION: [
      { q: 'What fields of study align best with my intellectual strengths?', sub: 'Analyzes Mercury, Jupiter, 5th house (intelligence) & Saraswati Yoga' },
      { q: 'When is my most supportive timing for exams & certifications?', sub: '5th house benefic dasha and transit activations' },
    ],
  };

  // Timeline Demo Data
  const timelinePhases = [
    { label: 'NOW', range: 'Active Current Window', event: 'Saturn Transit through 10th House', focus: 'Career Focus & Foundation Building', sky: 'Saturn in Aquarius ♒ • Jupiter in Taurus ♉' },
    { label: '3 MONTHS', range: 'Nov 2026 – Jan 2027', event: 'Jupiter Trine Natal Midheaven', focus: 'Professional Expansion & Recognition', sky: 'Jupiter Trine MC • Sun activating 10th Cusp' },
    { label: '6 MONTHS', range: 'Feb 2027 – May 2027', event: 'Venus-Mercury Conjunction in 11th House', focus: 'Financial Gains & Key Collaborative Alliances', sky: 'Venus entering 11th Bhava • Mercury Direct' },
    { label: '1 YEAR', range: 'Jul 2027 – Dec 2027', event: 'New Mahadasha Antardasha Shift', focus: 'Personal Growth & Creative Milestone', sky: 'Jupiter entering Gemini ♊ • Lunar Node Shift' },
    { label: '3 YEARS', range: '2028 – 2029', event: 'Major Progressed Planetary Cycle', focus: 'Long-Term Structural Mastery & Leadership', sky: 'Saturn-Jupiter Sextile • Solar Arc Trine' }
  ];

  // Birth-Time Sensitivity Test Cases
  const sensitivityData: Record<string, { career: string; relationship: string; cusps: string; note: string }> = {
    '10:45': { career: 'Stable (High)', relationship: 'Stable (High)', cusps: "Capricorn Lagna 28°14' (Near cusp)", note: 'Planetary signs and major Dasha periods remain identical.' },
    '10:50': { career: 'Stable (High)', relationship: 'Stable (High)', cusps: "Aquarius Lagna 00°22' (Sign change)", note: 'Ascendant changes from Capricorn to Aquarius; house cusps shift by 1 sign.' },
    '10:55': { career: 'Stable (High)', relationship: 'Moderate', cusps: "Aquarius Lagna 02°38' (Secure in sign)", note: 'Ascendant firmly established in Aquarius; D9 Navamsha shifts by 1 Pada.' },
    '11:00': { career: 'Stable (High)', relationship: 'Moderate', cusps: "Aquarius Lagna 05°04'", note: 'House cusps fully stabilized; planetary aspects unchanged.' },
  };

  // Multi-Tradition Comparison Data
  const traditionDetails = {
    vedic: {
      name: 'Vedic Sidereal (Jyotish)',
      status: 'Strong Activation',
      theme: 'Expansion through Karma & Dasha cycles',
      indicators: 'Jupiter transiting 10th bhava from Lagna; Moon in Rohini Nakshatra; Jupiter-Saturn Dasha balance active.',
      source: 'Brihat Parashara Hora Shastra, Ch. 45'
    },
    western: {
      name: 'Western Tropical',
      status: 'Strong Activation',
      theme: 'Midheaven Elevation & Social Recognition',
      indicators: 'Transiting Jupiter sextile natal Sun; Progressed Midheaven forming trine with natal Jupiter in 10th house.',
      source: "Ptolemy's Tetrabiblos & Modern Solar Arc"
    },
    kp: {
      name: 'KP Stellar System',
      status: 'Moderate Alignment',
      theme: 'Specific Sub-Lord Cuspal Significations',
      indicators: '10th house cuspal sub-lord signifies houses 2, 6, 10, and 11, indicating steady occupational elevation.',
      source: 'Krishnamurti Padhdhati Reader III'
    },
    jaimini: {
      name: 'Jaimini Sutras',
      status: 'Favorable Influence',
      theme: 'Amatyakaraka (AmK) Career Dignity',
      indicators: 'Chara Dasha period activating Amatyakaraka sign with benefic aspect from Jupiter on Arudha Lagna (AL).',
      source: 'Jaimini Upadesha Sutras'
    },
    chinese: {
      name: 'Chinese BaZi & Qi Cycles',
      status: 'Harmonious Flow',
      theme: 'Resource Element Support',
      indicators: 'Current 10-Year Luck Pillar brings supportive Yang Wood energy nourishing career day-master.',
      source: 'Classical 4-Pillars of Destiny'
    }
  };

  return (
    <div className="min-h-screen bg-[#060A12] text-white selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* 1. Global Navigation Bar */}
      <OmniLandingNavbar 
        onStartOnboarding={onStartOnboarding}
        onNavigateToTab={onNavigateToTab}
        userProfile={userProfile}
      />

      {/* ============================================================
          SECTION 1: HERO — "BE YOUR OWN ASTROLOGER."
          ============================================================ */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PERSONAL ASTROLOGY, MADE EXPLORABLE</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            BE YOUR OWN <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              ASTROLOGER.
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Your chart. Your questions. Your timing. Explore multiple astrology traditions, understand the reasoning behind a result, and discover what matters to you.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              onClick={() => onStartOnboarding()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black text-sm font-mono flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              <span>CREATE MY FREE CHART</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToTab('home')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold text-sm font-mono flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px]"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>ASK ASTRO360</span>
            </button>
          </div>

          {/* Small Line */}
          <p className="text-xs text-slate-400 font-mono pt-1">
            Calculated first. Explained second.
          </p>
        </div>

        {/* ============================================================
            HERO VISUAL: REAL INTERACTIVE PRODUCT DEMO
            ============================================================ */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="bg-[#0B1220] border-2 border-amber-400/30 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden text-left">
            
            {/* Window chrome header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">ASTRO360 Interactive Exploration Engine</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                ● Live Ephemeris Grounding
              </span>
            </div>

            {/* User Question */}
            <div className="space-y-2">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">WHAT WOULD YOU LIKE TO KNOW?</p>
              <div className="flex items-center gap-3 bg-[#060A12] border border-white/15 rounded-2xl px-4 py-3.5 text-white font-sans text-sm sm:text-base">
                <Search className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-amber-200">“When is my strongest career period?”</span>
              </div>
            </div>

            {/* ASTRO360 Response Headline */}
            <div className="bg-amber-400/10 border border-amber-400/25 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase">CAREER ACTIVITY</span>
                </div>
                <span className="text-xs font-mono bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full">
                  High Convergence
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                Sep 12 – Oct 28
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Elevated occupational activity and leadership expansion. Both Vedic Dasha and Western transits activate the 10th house career axis simultaneously.
              </p>
            </div>

            {/* Interactive View Buttons: WHY | COMPARE | TIMELINE | TECHNICAL | ASK FOLLOW-UP */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 pt-1 border-b border-white/10 pb-3">
                {[
                  { id: 'why', label: 'WHY?' },
                  { id: 'compare', label: 'COMPARE' },
                  { id: 'timeline', label: 'TIMELINE' },
                  { id: 'technical', label: 'TECHNICAL' },
                  { id: 'followup', label: 'ASK FOLLOW-UP' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setHeroActiveView(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[38px] ${
                      heroActiveView === tab.id
                        ? 'bg-amber-400 text-slate-950 shadow-md scale-102'
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
                    <div className="bg-[#060A12] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                      <span className="text-[10px] text-slate-400 uppercase">Primary Factor</span>
                      <p className="font-bold text-amber-300">Jupiter in Taurus (10th House)</p>
                      <p className="text-[11px] text-slate-400 font-sans">Benefic transit casting protective aspect on Lagna and 2nd house of wealth.</p>
                    </div>

                    <div className="bg-[#060A12] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                      <span className="text-[10px] text-slate-400 uppercase">Timing Window</span>
                      <p className="font-bold text-cyan-300">Jupiter-Saturn Dasha Sub-Period</p>
                      <p className="text-[11px] text-slate-400 font-sans">Exact degree activation occurs during Sep 12 – Oct 28 window.</p>
                    </div>

                    <div className="bg-[#060A12] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                      <span className="text-[10px] text-slate-400 uppercase">Supporting Systems</span>
                      <p className="font-bold text-emerald-300">3 of 3 Traditions Agree</p>
                      <p className="text-[11px] text-slate-400 font-sans">Vedic (Strong), Western (Strong), KP Stellar (Moderate).</p>
                    </div>

                    <div className="bg-[#060A12] border border-white/10 rounded-xl p-3.5 space-y-1.5">
                      <span className="text-[10px] text-slate-400 uppercase">Stability & Uncertainty</span>
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
                      { system: 'Vedic Sidereal', strength: 'Strong', badge: 'bg-emerald-400/20 text-emerald-300', desc: 'Jupiter transiting 10th house with supportive Vimshottari dasha sub-period.' },
                      { system: 'Western Tropical', strength: 'Strong', badge: 'bg-emerald-400/20 text-emerald-300', desc: 'Progressed Midheaven trine natal Jupiter with Sun entering 10th solar house.' },
                      { system: 'KP Stellar System', strength: 'Moderate', badge: 'bg-amber-400/20 text-amber-300', desc: '10th cuspal sub-lord signifies 2, 6, 10, 11 (favorable for steady career effort).' },
                    ].map((row, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#060A12] border border-white/10 rounded-xl p-3">
                        <div className="space-y-0.5">
                          <span className="font-bold text-white">{row.system}</span>
                          <p className="text-[11px] text-slate-400 font-sans">{row.desc}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full w-fit ${row.badge}`}>
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
                    className="bg-[#060A12] border border-white/10 rounded-xl p-4 space-y-3 text-xs font-mono"
                  >
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Aug 2026</span>
                      <span className="text-amber-400 font-bold">Sep 12 – Oct 28 (Peak Active Period)</span>
                      <span>Dec 2026</span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden relative">
                      <div className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 h-full w-[45%] ml-[30%] rounded-full shadow-lg" />
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
                    className="bg-[#060A12] border border-white/10 rounded-xl p-4 space-y-2 text-xs font-mono"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div><span className="text-slate-500">Ayanamsha:</span> <span className="text-amber-300">True Lahiri (24°13'08")</span></div>
                      <div><span className="text-slate-500">Jupiter Longitude:</span> <span className="text-white">18°24' Taurus (Rohini P3)</span></div>
                      <div><span className="text-slate-500">10th House Cusp:</span> <span className="text-white">12°11' MC (Placidus/Sripati)</span></div>
                      <div><span className="text-slate-500">Classical Rule:</span> <span className="text-white">BPHS Ch. 45 / Sloka 12</span></div>
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
                    <p className="text-[11px] font-mono text-slate-400">Suggested next exploratory questions:</p>
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
                          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-amber-400/20 text-slate-300 hover:text-amber-200 border border-white/10 hover:border-amber-400/30 text-left transition-all cursor-pointer"
                        >
                          {item} ➔
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Proof Note */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Demonstrates ASTRO360's open, explorable architecture.
              </span>
              <button 
                onClick={() => onStartOnboarding()}
                className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
              >
                Explore with your own birth details ➔
              </button>
            </div>

          </div>
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
            { step: '01', label: 'READ', desc: 'See your chart placements and timing windows.' },
            { step: '02', label: 'QUESTION', desc: 'Ask natural questions in your own words.' },
            { step: '03', label: 'UNDERSTAND', desc: 'Understand the reasons and planetary factors behind a result.' },
            { step: '04', label: 'COMPARE', desc: 'See where Vedic, Western and KP perspectives align.' },
            { step: '05', label: 'EXPLORE', desc: 'Drag timelines and test birth-time assumptions.' },
            { step: '06', label: 'DISCOVER', desc: 'Reach your own informed conclusions.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0B1220] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 space-y-2 transition-all group">
              <span className="text-[10px] font-mono text-amber-400/70 font-bold block">{item.step}</span>
              <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">{item.label}</h3>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 3: ASK THE QUESTIONS YOU ACTUALLY CARE ABOUT.
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono">
            <span>Natural Language Intelligence</span>
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
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg scale-102'
                    : 'bg-[#0B1220] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
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
              className="bg-[#0B1220] border border-white/10 hover:border-amber-400/40 rounded-2xl p-5 space-y-2 text-left cursor-pointer transition-all hover:translate-y-[-2px] group"
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
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 4: YOUR FIRST QUESTION DOESN'T HAVE TO BE PERFECT.
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            YOUR FIRST QUESTION DOESN'T HAVE TO BE PERFECT.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
            ASTRO360 helps turn natural questions into the right astrology analysis.
          </p>
        </div>

        {/* Interactive Query Transformation Diagram */}
        <div className="max-w-3xl mx-auto bg-[#0B1220] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
          
          {/* Step 1: User Asks */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold">USER INPUT</span>
            <div className="bg-[#060A12] border border-white/15 rounded-2xl p-4 text-white font-semibold text-base sm:text-lg">
              “Will my career change soon?”
            </div>
          </div>

          <div className="flex justify-center text-amber-400">
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>

          {/* Step 2: ASTRO360 Understood */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">ASTRO360 INTENT ENGINE</span>
            <div className="bg-[#060A12] border border-cyan-400/20 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Domain</span>
                <span className="text-cyan-300 font-bold">Career & Vocation</span>
              </div>
              <div>
                <span className="text-slate-500 block">Intent</span>
                <span className="text-cyan-300 font-bold">Timing Analysis</span>
              </div>
              <div>
                <span className="text-slate-500 block">Scope</span>
                <span className="text-cyan-300 font-bold">Near-Term (6-12 Mo)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-amber-400">
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>

          {/* Step 3: Required Data */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">REQUIRED INFORMATION</span>
            <div className="bg-[#060A12] border border-emerald-400/20 rounded-2xl p-4 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Your existing birth chart & current planetary ephemeris</span>
            </div>
          </div>

          <div className="flex justify-center text-amber-400">
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>

          {/* Step 4: Analysis Output */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-bold">ANALYSIS & DESTINATION</span>
            <div className="bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-transparent border border-purple-400/30 rounded-2xl p-4 text-xs font-mono space-y-1">
              <p className="font-bold text-white">Calculates 10th House Transit + Vimshottari Mahadasha Alignment</p>
              <p className="text-slate-400 font-sans text-[11px]">Routes directly to your interactive career timing forecast with full explainability.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          SECTION 5: SEE WHY. (EVIDENCE INTERFACE)
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            SEE WHY.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
            Transparent evidence behind every prediction. No black boxes.
          </p>
        </div>

        {/* Evidence Card */}
        <div className="max-w-3xl mx-auto bg-[#0B1220] border-2 border-amber-400/30 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
          
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Prediction Headline</span>
            <h3 className="text-xl sm:text-2xl font-black text-amber-300 pt-1">
              Career activity is elevated.
            </h3>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>WHY? (Supporting Evidence Tree)</span>
            </span>

            <div className="space-y-2 text-xs font-mono">
              {[
                { title: 'Supporting Factors', detail: 'Jupiter in 10th house Kendra + Venus benefic aspect.' },
                { title: 'Timing Alignment', detail: 'Vimshottari Dasha sub-period active from Sep 12 – Oct 28.' },
                { title: 'Selected Systems', detail: 'Vedic Sidereal (True Lahiri) & Western Tropical consensus.' },
                { title: 'Classical Rule', detail: 'Brihat Parashara Hora Shastra, Chapter 45, Sloka 12.' },
                { title: 'Stability Index', detail: 'High stability (Result holds across ±15 min birth-time variance).' },
              ].map((row, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-[#060A12] border border-white/10 rounded-xl p-3">
                  <span className="text-slate-400 font-bold">{row.title}:</span>
                  <span className="text-slate-200 text-left sm:text-right">{row.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onStartOnboarding()}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-black text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>[ Explore the chart ]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================
          SECTION 6: COMPARE. DON'T JUST ACCEPT ONE PERSPECTIVE.
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            COMPARE. DON'T JUST ACCEPT ONE PERSPECTIVE.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-2xl mx-auto">
            Different traditions can emphasize different parts of the same period. ASTRO360 keeps them distinct so you can explore the differences yourself.
          </p>
        </div>

        {/* Tradition Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-6">
          {[
            { id: 'vedic', label: 'VEDIC (JYOTISH)' },
            { id: 'western', label: 'WESTERN TROPICAL' },
            { id: 'kp', label: 'KP STELLAR' },
            { id: 'jaimini', label: 'JAIMINI SUTRAS' },
            { id: 'chinese', label: 'CHINESE BAZI' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTradition(t.id as any)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer min-h-[40px] ${
                selectedTradition === t.id
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                  : 'bg-[#0B1220] text-slate-300 hover:text-white border-white/10'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Multi-System Active Card */}
        <div className="max-w-3xl mx-auto bg-[#0B1220] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">COMMON THEME</span>
              <p className="text-lg font-bold text-white">Career Activity & Milestone</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">SYSTEM EMPHASIS</span>
              <p className="text-lg font-bold text-amber-300">{traditionDetails[selectedTradition].theme}</p>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <span className="text-slate-400 font-bold block">Planetary Indicators:</span>
            <p className="text-slate-200 font-sans text-sm bg-[#060A12] border border-white/10 rounded-xl p-4 leading-relaxed">
              {traditionDetails[selectedTradition].indicators}
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2">
            <span>Classical Source: <strong className="text-slate-200">{traditionDetails[selectedTradition].source}</strong></span>
            <span className="text-amber-400 font-bold">Status: {traditionDetails[selectedTradition].status}</span>
          </div>

        </div>
      </section>

      {/* ============================================================
          SECTION 7: MOVE THROUGH YOUR FUTURE. (INTERACTIVE TIMELINE)
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
        <div className="max-w-4xl mx-auto bg-[#0B1220] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
          
          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-white/10 pb-4">
            {timelinePhases.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => setTimelineIndex(idx)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer min-h-[44px] ${
                  timelineIndex === idx
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-lg scale-102'
                    : 'bg-[#060A12] text-slate-400 hover:text-white border-white/10'
                }`}
              >
                <span className="text-xs font-mono font-bold block">{phase.label}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Details */}
          <div className="bg-[#060A12] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
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

          <div className="text-[11px] font-mono text-slate-400 text-center">
            Connects: <span className="text-amber-300">Sky Positions</span> ➔ <span className="text-cyan-300">Timing Cycles</span> ➔ <span className="text-emerald-300">Prediction</span> ➔ <span className="text-purple-300">Explanation</span>
          </div>

        </div>
      </section>

      {/* ============================================================
          SECTION 8: SEE HOW YOUR ASSUMPTIONS CHANGE THE RESULT.
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            SEE HOW YOUR ASSUMPTIONS CHANGE THE RESULT.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
            Not every result is equally sensitive to your birth information. This teaches you to think critically about uncertainty.
          </p>
        </div>

        {/* Sensitivity Demo Box */}
        <div className="max-w-3xl mx-auto bg-[#0B1220] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
          
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
                      : 'bg-[#060A12] text-slate-300 hover:text-white border-white/10'
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
              <div className="bg-[#060A12] border border-white/10 rounded-xl p-3 space-y-1">
                <span className="text-[10px] text-slate-500">Career Indicator</span>
                <p className="font-bold text-emerald-400">{sensitivityData[selectedBirthTime].career}</p>
                <span className="text-[9px] text-slate-500">Unaffected by minor minute drift</span>
              </div>

              <div className="bg-[#060A12] border border-white/10 rounded-xl p-3 space-y-1">
                <span className="text-[10px] text-slate-500">Relationship Timing</span>
                <p className="font-bold text-amber-300">{sensitivityData[selectedBirthTime].relationship}</p>
                <span className="text-[9px] text-slate-500">Navamsha D9 Pada sensitivity</span>
              </div>

              <div className="bg-[#060A12] border border-white/10 rounded-xl p-3 space-y-1">
                <span className="text-[10px] text-slate-500">House Cusps</span>
                <p className="font-bold text-purple-300 text-[11px] leading-tight">{sensitivityData[selectedBirthTime].cusps}</p>
                <span className="text-[9px] text-slate-500">Ascendant degree changes</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-sans pt-2 bg-white/5 p-3 rounded-xl border border-white/5">
              💡 <strong>Insight:</strong> {sensitivityData[selectedBirthTime].note}
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================
          SECTION 9: YOU DON'T NEED TO BE AN ASTROLOGER TO EXPLORE.
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            YOU DON'T NEED TO BE AN ASTROLOGER TO EXPLORE ASTROLOGY.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
            Simple when you want clarity. Deep when you want detail.
          </p>
        </div>

        {/* Simple vs Expert Interactive Switcher */}
        <div className="max-w-3xl mx-auto bg-[#0B1220] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono text-slate-400">Toggle View Density:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setDemoDensity('simple')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[38px] ${
                  demoDensity === 'simple'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-[#060A12] text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                Simple Mode
              </button>
              <button
                onClick={() => setDemoDensity('expert')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[38px] ${
                  demoDensity === 'expert'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-[#060A12] text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                Expert Mode
              </button>
            </div>
          </div>

          {demoDensity === 'simple' ? (
            <div className="space-y-4">
              <div className="bg-[#060A12] border border-white/10 rounded-2xl p-6 space-y-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">Executive Summary</span>
                <h3 className="text-xl font-bold text-white">Career activity is elevated.</h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Your current timing window strongly supports initiative, structured growth, and long-term career commitments.
                </p>
                <button
                  onClick={() => setDemoDensity('expert')}
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer"
                >
                  [ Why? Show Technical Details ]
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-[#060A12] border border-white/10 rounded-2xl p-6 space-y-3">
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
          SECTION 10: YOU MAY HAVE ALREADY ASKED SOMEONE ELSE.
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            YOU MAY HAVE ALREADY ASKED SOMEONE ELSE.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Different perspectives can be useful. ASTRO360 helps you organize, compare and explore them in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto text-left">
          {[
            { label: 'Vedic Reading', icon: Compass, note: 'Understand your Nakshatra, Dasha timeline & planetary yogas.' },
            { label: 'Western Reading', icon: Sun, note: 'Explore your Placidus houses, solar returns & psychological arcs.' },
            { label: 'KP Interpretation', icon: Layers, note: 'Evaluate cuspal sub-lords and high-precision event timing.' },
            { label: 'Transit Reading', icon: Clock, note: 'Track active Gochara transits across your natal chart.' },
            { label: 'Traditional Remedy', icon: ShieldCheck, note: 'Explore classical mantras, gemstones & lifestyle alignments.' },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-[#0B1220] border border-white/10 rounded-2xl p-4 space-y-2 text-left">
                <Icon className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-mono font-bold text-white">{card.label}</h3>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{card.note}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SECTION 11: EXPLORE TRADITIONAL REMEDIES WITH CONTEXT.
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            EXPLORE TRADITIONAL REMEDIES WITH CONTEXT.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-2xl mx-auto">
            Traditional remedies are cultural and symbolic practices designed for reflection and discipline. We provide classical scripture context without false promises.
          </p>
        </div>

        {/* Remedy Context Matrix */}
        <div className="max-w-3xl mx-auto bg-[#0B1220] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 text-left font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">Traditional Practice</span>
              <p className="font-bold text-white">Jupiter Mantra & Yellow Sapphire</p>
            </div>
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">Tradition</span>
              <p className="font-bold text-amber-300">Vedic (Jyotish Ratna Shastra)</p>
            </div>
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">Classical Reasoning</span>
              <p className="font-bold text-slate-200">Strengthens benefic vibrations for wisdom and discernment.</p>
            </div>
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase">Relevant Period</span>
              <p className="font-bold text-cyan-300">During active Jupiter Mahadasha/Antardasha</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10">
            <span className="text-[10px] text-slate-400">
              * Remedies do not guarantee life outcomes or replace professional medical/legal counsel.
            </span>
            <button
              onClick={() => onNavigateToTab('remedies')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer"
            >
              EXPLORE THE TRADITION ➔
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 12: KEEP YOUR OWN ASTROLOGY HISTORY.
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            KEEP YOUR OWN ASTROLOGY HISTORY.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
            Build your own personal astrology journal over time. Track questions, transits, and milestones across the years.
          </p>
        </div>

        {/* Years Timeline Visual */}
        <div className="max-w-4xl mx-auto bg-[#0B1220] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
            {['2022', '2023', '2024', '2025', '2026+'].map((yr, idx) => (
              <div key={idx} className="text-center px-4 py-2 bg-[#060A12] border border-white/10 rounded-xl">
                <span className="text-xs font-mono font-bold text-amber-300">{yr}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-3 space-y-1">
              <FileText className="w-4 h-4 text-amber-400" />
              <p className="font-bold text-white">Saved Birth Charts</p>
              <p className="text-[10px] text-slate-400">Manage family & client profiles.</p>
            </div>
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-3 space-y-1">
              <Search className="w-4 h-4 text-cyan-400" />
              <p className="font-bold text-white">Question Archive</p>
              <p className="text-[10px] text-slate-400">Revisit past inquiries and answers.</p>
            </div>
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-3 space-y-1">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <p className="font-bold text-white">Timing Calendar</p>
              <p className="text-[10px] text-slate-400">Export transit dates to iCal/Google.</p>
            </div>
            <div className="bg-[#060A12] border border-white/10 rounded-xl p-3 space-y-1">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <p className="font-bold text-white">Executive Dossiers</p>
              <p className="text-[10px] text-slate-400">High-res printable vector reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 13: ONE ANSWER CAN LEAD TO A BETTER QUESTION.
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            ONE ANSWER CAN LEAD TO A BETTER QUESTION.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
            The continuous exploration loop that turns curiosity into deep astrological understanding.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto text-xs font-mono">
          {[
            'Career Question',
            'Why?',
            'Compare Systems',
            'What About Next Year?',
            'How Stable Is It?',
            'Add to Calendar',
            'Generate Report'
          ].map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="px-4 py-2.5 rounded-xl bg-[#0B1220] border border-amber-400/30 text-amber-200 font-bold shadow-md">
                {step}
              </div>
              {idx < 6 && <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 14: START FREE. (FREE VALUE SUITE)
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            START FREE.
          </h2>
          <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
            Experience the precision of ASTRO360 with no payment, subscription, or login required.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 max-w-5xl mx-auto text-left">
          {[
            { title: 'Free Birth Chart', desc: 'D1 Rashi & Planetary Positions', tab: 'free-tools' },
            { title: 'Free Moon Sign', desc: 'Exact degree & Nakshatra placement', tab: 'free-tools' },
            { title: 'Free Rising Sign', desc: 'Lagna & Ascendant cusp calculation', tab: 'free-tools' },
            { title: 'Free Nakshatra Calculator', desc: '27 Lunar Mansions & Padas', tab: 'free-tools' },
            { title: 'Free Panchanga', desc: 'Daily Tithi, Vara, Nakshatra, Yoga, Karana', tab: 'panchanga' },
            { title: 'Free Compatibility', desc: 'Ashta Koota 36-Guna Synastry', tab: 'free-tools' },
            { title: 'Free Daily Insight', desc: 'Real-time Moon transit activations', tab: 'free-tools' },
            { title: 'Free 7-Day Forecast', desc: 'Planetary transit wave summary', tab: 'free-tools' },
            { title: 'Free Moon Calendar', desc: 'Full moon, new moon & eclipse dates', tab: 'free-tools' },
          ].map((tool, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateToTab(tool.tab)}
              className="bg-[#0B1220] border border-white/10 hover:border-amber-400/40 rounded-2xl p-4 space-y-1.5 cursor-pointer transition-all hover:translate-y-[-2px] group"
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
            className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-400/30 font-bold font-mono text-sm inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>EXPLORE ALL FREE TOOLS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ============================================================
          SECTION 15: TRUST & PROVENANCE
          ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            YOU SHOULD BE ABLE TO SEE HOW A RESULT WAS REACHED.
          </h2>
          <p className="text-sm text-slate-400 font-sans max-w-xl mx-auto">
            ASTRO360 operates under a strict four-layer pipeline to ensure complete mathematical transparency.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left font-mono text-xs mb-8">
          <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] text-amber-400 font-bold">STEP 1</span>
            <p className="font-bold text-white">CALCULATED</p>
            <p className="text-[11px] text-slate-400 font-sans">NASA JPL DE440 sub-arcsecond physics.</p>
          </div>
          <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] text-cyan-400 font-bold">STEP 2</span>
            <p className="font-bold text-white">STRUCTURED</p>
            <p className="text-[11px] text-slate-400 font-sans">Multi-tradition mathematical rules codified.</p>
          </div>
          <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold">STEP 3</span>
            <p className="font-bold text-white">COMPARED</p>
            <p className="text-[11px] text-slate-400 font-sans">Cross-system consensus and variance mapped.</p>
          </div>
          <div className="bg-[#0B1220] border border-white/10 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] text-purple-400 font-bold">STEP 4</span>
            <p className="font-bold text-white">EXPLAINED</p>
            <p className="text-[11px] text-slate-400 font-sans">Grounded natural language explainability.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> OWASP ASVS 5.0.0 Tested</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero PII Storage</span>
          <span className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-emerald-400" /> No Fake Claims</span>
        </div>
      </section>

      {/* ============================================================
          SECTION 16: FINAL CTA — "BE YOUR OWN ASTROLOGER."
          ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none rounded-3xl" />

        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>START YOUR EXPLORATION TODAY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            BE YOUR OWN <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              ASTROLOGER.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">
            Ask your questions. Explore your chart. Compare perspectives. Understand the reasoning. Discover your own astrology.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              onClick={() => onStartOnboarding()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black text-sm font-mono flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[48px]"
            >
              <span>CREATE MY FREE CHART</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToTab('home')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-bold text-sm font-mono flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px]"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>ASK ASTRO360</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 font-mono pt-1">
            No astrology knowledge required. 100% free and private.
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
              <li><button onClick={() => onNavigateToTab('vedic-astrology')} className="hover:text-amber-300">Vedic Sidereal (Jyotish)</button></li>
              <li><button onClick={() => onNavigateToTab('western-astrology')} className="hover:text-amber-300">Western Tropical</button></li>
              <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-amber-300">KP Stellar System</button></li>
              <li><button onClick={() => onNavigateToTab('panchanga')} className="hover:text-amber-300">Daily Panchanga</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold block">Free Tools</span>
            <ul className="space-y-1 text-[11px]">
              <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-amber-300">Free Birth Chart</button></li>
              <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-amber-300">Free Moon Sign & Nakshatra</button></li>
              <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-amber-300">Free Ashta Koota Compatibility</button></li>
              <li><button onClick={() => onNavigateToTab('methodology')} className="hover:text-amber-300">Ephemeris Methodology</button></li>
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
  );
}
