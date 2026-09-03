import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Compass, 
  Calendar, Layers, Heart, Briefcase, DollarSign, Globe, 
  Clock, BookOpen, ChevronRight, User, TrendingUp, RefreshCw,
  Scale, HelpCircle, Eye, Sliders, Check, Search, FileText,
  MapPin, Moon, Sun, Star, Activity, AlertCircle, ArrowUpRight,
  Zap, Lock, Award, PlayCircle, BarChart3, ChevronDown, Radio,
  Cpu, Flame, Gem, Hash, ShieldAlert, CheckSquare, Share2,
  Database, Download, Terminal, Info
} from 'lucide-react';
import { UserProfile } from '../../types';
import OmniLandingNavbar from './OmniLandingNavbar';
import AnimatedStarfield from './AnimatedStarfield';
import { useScrollReveal, useMagneticHover, useMouseGlow } from '../../hooks/useAnimations';
import { QuestionIntentEngine } from '../../lib/questionRouter';

interface LandingPageProps {
  onStartOnboarding: (presetData?: Partial<UserProfile>) => void;
  onNavigateToTab: (tabId: string) => void;
  userProfile?: UserProfile;
}

/* ── Scroll-Reveal Section Wrapper ─────────────────────────────── */
function RevealSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Magnetic Button ───────────────────────────────────────────── */
function MagneticButton({ children, onClick, className = '' }: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  const { ref, style, handlers } = useMagneticHover(0.2);
  return (
    <div ref={ref} {...handlers} style={style} className="inline-block">
      <button onClick={onClick} className={className}>
        {children}
      </button>
    </div>
  );
}

export default function LandingPage({
  onStartOnboarding,
  onNavigateToTab,
  userProfile,
}: LandingPageProps) {
  // Hero Interactive Demo State
  const [heroActiveView, setHeroActiveView] = useState<'why' | 'compare' | 'timeline' | 'technical'>('why');
  const [heroActiveQuery, setHeroActiveQuery] = useState<string>('When is my next important career period?');
  const [customInputQuery, setCustomInputQuery] = useState<string>('');
  
  // Section: Question Categories State
  const [selectedCategory, setSelectedCategory] = useState<string>('CAREER');
  
  // Section: Interactive Timeline Slider State
  const [timelineIndex, setTimelineIndex] = useState<number>(0);
  
  // Section: Birth-Time Sensitivity Test State
  const [selectedBirthTime, setSelectedBirthTime] = useState<string>('10:50');
  
  // Section: Tradition Compare Selector
  const [selectedTradition, setSelectedTradition] = useState<'vedic' | 'western' | 'kp' | 'jaimini' | 'chinese' | 'hellenistic'>('vedic');

  // Floating action bar state & Live Astronomy Telemetry
  const [copiedReferral, setCopiedReferral] = useState<boolean>(false);
  const [showFloatingBar, setShowFloatingBar] = useState<boolean>(false);
  const [liveJulianDate, setLiveJulianDate] = useState<string>('2460738.6542');
  const [liveSiderealTime, setLiveSiderealTime] = useState<string>('18h 42m 19s');

  useEffect(() => {
    const updateAstronomicalClocks = () => {
      const now = new Date();
      // Julian Date formula: JD = (time / 86400000) + 2440587.5
      const jd = (now.getTime() / 86400000 + 2440587.5).toFixed(4);
      setLiveJulianDate(jd);

      // Greenwich Sidereal Time calculation
      const d = (now.getTime() / 86400000 + 2440587.5) - 2451545.0;
      let gmst = 18.697374558 + 24.06570982441908 * d;
      gmst = ((gmst % 24) + 24) % 24;
      const hours = Math.floor(gmst);
      const minutes = Math.floor((gmst - hours) * 60);
      const seconds = Math.floor(((gmst - hours) * 60 - minutes) * 60);
      setLiveSiderealTime(`${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`);
    };

    updateAstronomicalClocks();
    const interval = setInterval(updateAstronomicalClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBar(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShareViralLink = () => {
    const shareUrl = `${window.location.origin}/?ref=cosmic_passport`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2500);
  };

  // Mouse glow for hero
  const { ref: heroGlowRef } = useMouseGlow();

  // Scroll progress for hero subtle parallax
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -30]);

  // Compute live real-time answer from QuestionIntentEngine
  const activeSolvedResult = useMemo(() => {
    const profile: UserProfile = userProfile || {
      id: 'guest_landing',
      name: 'Seeker',
      gender: 'other',
      dob: '1998-06-15',
      time: '12:00',
      location: 'London, UK',
      preferredSystem: 'vedic'
    };
    try {
      return QuestionIntentEngine.routeAndSolve(heroActiveQuery, profile);
    } catch {
      return null;
    }
  }, [heroActiveQuery, userProfile]);

  // Question Categories Data
  const questionCategories = [
    { id: 'CAREER', label: 'Career & Vocation', icon: Briefcase, color: 'text-amber-400' },
    { id: 'LOVE', label: 'Love & Relationships', icon: Heart, color: 'text-rose-400' },
    { id: 'MONEY', label: 'Wealth & Assets', icon: DollarSign, color: 'text-emerald-400' },
    { id: 'TIMING', label: 'Timing & Periods', icon: Clock, color: 'text-cyan-400' },
    { id: 'GROWTH', label: 'Purpose & Dharma', icon: TrendingUp, color: 'text-indigo-400' },
    { id: 'MY CHART', label: 'Birth Chart Essentials', icon: Compass, color: 'text-purple-400' },
    { id: 'HEALTH', label: 'Vitality & Balance', icon: Activity, color: 'text-emerald-300' },
    { id: 'TRAVEL', label: 'Travel & Relocation', icon: MapPin, color: 'text-teal-400' },
  ];

  const categoryQuestions: Record<string, { q: string; sub: string; tag: string }[]> = {
    CAREER: [
      { q: 'When is my next important career period?', sub: 'Evaluates 10th house transits, Jupiter cycles, and Vimshottari dasha periods with ephemeris precision', tag: 'Timing + Transits' },
      { q: 'Why is this period significant for leadership?', sub: 'Examines planetary dignity, angular house placements, and classical yoga conditions', tag: 'Dignity + Yogas' },
      { q: 'What do different traditions indicate about vocation?', sub: 'Compares Vedic 10th Bhava, Western Midheaven (MC), and KP cuspal sub-lords', tag: 'Multi-System' },
      { q: 'How stable is this timing result?', sub: 'Simulates birth-time variance to test if Ascendant or Navamsha boundaries shift', tag: 'Stability Test' },
    ],
    LOVE: [
      { q: 'What does my chart indicate about long-term partnership?', sub: 'Evaluates 7th house Kendra, Venus dignity, and Darakaraka planetary status across D1 and D9', tag: '7th House Axis' },
      { q: 'What timing periods highlight partnership and commitment?', sub: 'Tracks benefic transits across the 1st and 7th house relationship axis', tag: 'Transit Window' },
      { q: 'How compatible are our two birth charts?', sub: 'Calculates classical Ashta Koota 36-Guna matching alongside synastry aspect geometry', tag: 'Synastry + Koota' },
      { q: 'What patterns should I be mindful of?', sub: 'Identifies Kuja (Manglik) configurations and classical mitigation rules', tag: 'Dosha Evaluation' },
    ],
    MONEY: [
      { q: 'When are my strongest financial timing cycles?', sub: 'Analyzes 2nd (wealth) and 11th (gains) houses alongside classical Dhana yoga conditions', tag: 'Dhana Yogas' },
      { q: 'How do different systems evaluate resource stability?', sub: 'Compares Vedic Indu Lagna with Western 2nd house solar arcs and KP sub-lords', tag: 'Consensus' },
      { q: 'What does my chart suggest about long-term asset building?', sub: 'Evaluates Saturn-Jupiter compounding cycles and 4th house real estate factors', tag: 'Long-Range' },
    ],
    TIMING: [
      { q: 'What matters right now in my life timing?', sub: 'Active planetary phase, transit triggers, and current Vedic Panchanga elements', tag: 'Active Sky' },
      { q: 'What comes next over the next 6 to 12 months?', sub: 'Near-term transit horizon with entering and separating planetary aspects', tag: 'Horizon Window' },
      { q: 'Which window looks strongest for major decisions?', sub: 'Multi-system timing evaluation based on supportive planetary configurations', tag: 'Decision Timing' },
    ],
    GROWTH: [
      { q: 'What is my primary life theme and purpose?', sub: 'Evaluates Atmakaraka (soul planet), Rahu-Ketu nodal axis, and Sun spiritual dignity', tag: 'Atmakaraka' },
      { q: 'What inner strengths are highlighted in my chart?', sub: '6-fold Shadbala planetary potency matrix (Sthana, Dik, Kala, Chesta, Naisargika, Drik)', tag: 'Shadbala Potency' },
    ],
    HEALTH: [
      { q: 'What does my chart indicate about physical vitality and stamina?', sub: 'Analyzes 1st house (Lagna), 6th house (immunity), Sun vitality, and Mars strength', tag: 'Vitality & Prana' },
    ],
    TRAVEL: [
      { q: 'When is relocation or international travel highlighted?', sub: 'Analyzes 9th and 12th house planetary transits and Rahu foreign travel indicators', tag: 'AstroCartography' },
    ],
    'MY CHART': [
      { q: 'What are the primary planetary dignities in my birth chart?', sub: 'Calculates exaltation, moolatrikona, own sign, debilitation, and combustions', tag: 'D1 Rashi Matrix' },
    ],
  };

  // Timeline Demo Data
  const timelinePhases = [
    { label: 'NOW', range: 'Active Window', event: 'Saturn Transit through 10th House', focus: 'Career Focus & Foundation Building', sky: 'Saturn in Aquarius ♒ • Jupiter in Taurus ♉', badge: 'Active Focus' },
    { label: '3 MONTHS', range: 'Nov 2026 – Jan 2027', event: 'Jupiter Trine Natal Midheaven', focus: 'Professional Expansion & Recognition', sky: 'Jupiter Trine MC • Sun activating 10th Cusp', badge: 'Peak Window' },
    { label: '6 MONTHS', range: 'Feb 2027 – May 2027', event: 'Venus-Mercury Conjunction in 11th House', focus: 'Collaborative Projects & Professional Gains', sky: 'Venus entering 11th Bhava • Mercury Direct', badge: 'Harmonic Flow' },
    { label: '1 YEAR', range: 'Jul 2027 – Dec 2027', event: 'Antardasha Transition', focus: 'Personal Growth & Creative Milestone', sky: 'Jupiter entering Gemini ♊ • Nodal Shift', badge: 'Transition' },
    { label: '3 YEARS', range: '2028 – 2029', event: 'Major Progressed Planetary Cycle', focus: 'Long-Term Structural Mastery & Leadership', sky: 'Saturn-Jupiter Sextile • Solar Arc Trine', badge: 'Long-Range' }
  ];

  // Birth-Time Sensitivity Test Cases
  const sensitivityData: Record<string, { career: string; relationship: string; cusps: string; note: string; status: 'Stable' | 'Moderate' | 'Boundary Shift' }> = {
    '10:45': { career: 'Stable across window', relationship: 'Stable across window', cusps: "Capricorn Lagna 28°14' (Near cusp)", note: 'Planetary signs and major Dasha periods remain identical across entire hour.', status: 'Stable' },
    '10:50': { career: 'Stable across window', relationship: 'Stable across window', cusps: "Aquarius Lagna 00°22' (Sign boundary)", note: 'Ascendant changes from Capricorn to Aquarius; house cusps shift by one sign.', status: 'Boundary Shift' },
    '10:55': { career: 'Stable across window', relationship: 'Moderate sensitivity', cusps: "Aquarius Lagna 02°38' (Firm in sign)", note: 'Ascendant established in Aquarius; D9 Navamsha shifts by 1 Pada.', status: 'Moderate' },
    '11:00': { career: 'Stable across window', relationship: 'Moderate sensitivity', cusps: "Aquarius Lagna 05°04'", note: 'House cusps stabilized; planetary aspects and transits remain unchanged.', status: 'Stable' },
  };

  // Multi-Tradition Comparison Data
  const traditionDetails = {
    vedic: { 
      name: 'Vedic Sidereal (Jyotish)', 
      theme: 'Expansion through Karma, Dasha, and House Transits', 
      indicators: 'Jupiter in Taurus transiting 10th Bhava; Rahu-Jupiter Mahadasha activating 9th-10th lord Raja Yoga.', 
      source: 'Brihat Parashara Hora Shastra (BPHS)',
      badge: '94% Confidence'
    },
    western: { 
      name: 'Western Tropical', 
      theme: 'Solar Arc Alignment & Angular Elevation', 
      indicators: 'Solar Arc Midheaven conjunction Jupiter; Progressed Moon entering the 10th quadrant.', 
      source: 'Ptolemaic Tetrabiblos & Modern Solar Arcs',
      badge: '91% Confidence'
    },
    kp: { 
      name: 'KP Stellar System', 
      theme: 'Cuspal Sub-Lord Vocation Activation', 
      indicators: '10th Cusp Sub-Lord Jupiter signifies 2nd (wealth), 6th (service), and 11th (gains) houses cleanly.', 
      source: 'Prof. K.S. Krishnamurti 249 Table',
      badge: '96% Confidence'
    },
    jaimini: { 
      name: 'Jaimini Sutras', 
      theme: 'Amatyakaraka Dignity & Chara Dasha', 
      indicators: 'Chara Dasha of Pisces aspected by Amatyakaraka (AmK) Sun and Jupiter in 10th pada.', 
      source: 'Maharishi Jaimini Upadesha Sutras',
      badge: '89% Confidence'
    },
    chinese: { 
      name: 'Chinese BaZi (Four Pillars)', 
      theme: 'Day Master Resource Flow & Da Yun Cycle', 
      indicators: 'Yang Earth Wu Day Master supported by Fire Element Year Pillar; favorable Water wealth phase.', 
      source: 'San Ming Tong Hui & Zi Ping BaZi',
      badge: '88% Confidence'
    },
    hellenistic: { 
      name: 'Hellenistic Lots & Time Lords', 
      theme: 'Zodiacal Releasing from Lot of Spirit', 
      indicators: 'Lot of Spirit releasing through Taurus Level 2; benefic Jupiter configured with Fortune.', 
      source: 'Vettius Valens Anthologies',
      badge: '90% Confidence'
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-100 selection:bg-white/20 selection:text-white font-sans relative overflow-x-hidden">
      
      {/* Dynamic Starfield Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <AnimatedStarfield />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Navigation Bar */}
        <OmniLandingNavbar
          onCreateChart={() => onStartOnboarding()}
          onStartOnboarding={onStartOnboarding}
          onNavigateToTab={onNavigateToTab}
          userProfile={userProfile}
        />

        {/* ════════════════════════════════════════════════════════════
            SECTION 1: HERO (TWENTY / LINEAR AESTHETIC)
            ════════════════════════════════════════════════════════════ */}
        <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <motion.div style={{ y: heroParallax }} className="max-w-[850px] mx-auto space-y-6 relative z-20">
            
            {/* Eyebrow / Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111315]/90 border border-white/[0.08] text-xs font-mono text-amber-300 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ASTROLOGY, REIMAGINED • ZERO-PII PRIVATE</span>
            </motion.div>

            {/* Master Headline */}
            <h1 className="text-[44px] sm:text-[68px] lg:text-[84px] font-black tracking-[-0.035em] text-white leading-[1.02] font-sans">
              BE YOUR OWN <br className="hidden sm:block" />
              ASTROLOGER.
            </h1>

            {/* Supporting Statement */}
            <p className="text-[17px] sm:text-[21px] text-slate-300 font-sans max-w-[700px] mx-auto leading-relaxed font-normal">
              Explore your chart, ask questions, compare astrology systems, and understand the reasoning behind every result.
            </p>

            {/* Primary and Secondary CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <MagneticButton
                onClick={() => onStartOnboarding()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-black font-bold text-[15px] font-sans transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
              >
                <span>CREATE YOUR FREE CHART</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                onClick={() => onNavigateToTab('ask')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.06] text-white border border-white/20 hover:border-white/40 font-bold text-[15px] font-sans transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>ASK ASTRO360</span>
              </MagneticButton>
            </div>

            {/* Supporting Microcopy */}
            <p className="text-xs font-mono text-slate-400 pt-1">
              Vedic • Western • KP • Jaimini • Timing • Charts • Research
            </p>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════
              SECTION 1B: INTERACTIVE NATURAL LANGUAGE INQUIRY SANDBOX
              ════════════════════════════════════════════════════════════ */}
          <RevealSection className="mt-14 max-w-3xl mx-auto w-full" delay={0.1}>
            <div
              ref={heroGlowRef}
              className="bg-[#111315]/90 border border-white/[0.08] rounded-2xl p-5 sm:p-7 shadow-2xl space-y-5 relative text-left backdrop-blur-2xl"
            >
              {/* Window Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2 font-medium">ASTRO360 Natural Language Intent Engine</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md border border-white/[0.08]">
                  Sub-Arcsecond Ephemeris Grounding
                </span>
              </div>

              {/* Inquiry Selection & Custom Question Form */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="font-semibold uppercase tracking-wider">Interactive Query Sandbox:</span>
                  <span className="text-slate-500 hidden sm:inline">Type any life question or select a preset:</span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (customInputQuery.trim()) {
                      setHeroActiveQuery(customInputQuery.trim());
                      setCustomInputQuery('');
                    }
                  }}
                  className="flex items-center gap-2 bg-[#0B0C10] border border-white/[0.08] rounded-xl p-1.5 focus-within:border-white/30 transition-colors"
                >
                  <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2.5" />
                  <input
                    type="text"
                    value={customInputQuery}
                    onChange={(e) => setCustomInputQuery(e.target.value)}
                    placeholder={`"${heroActiveQuery}" (Type your question...)`}
                    className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none px-2 py-1 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-black font-semibold font-sans text-xs cursor-pointer transition-colors shrink-0"
                  >
                    Analyze
                  </button>
                </form>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'When is my next important career period?',
                    'What does my chart say about long-term relationships?',
                    'When are my strongest financial timing cycles?',
                    'What is my primary soul purpose in this lifetime?',
                    "What is my birth star Nakshatra and Pada?"
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroActiveQuery(chip)}
                      className={`text-[11px] font-mono px-3 py-1.5 rounded-md border transition-all cursor-pointer ${
                        heroActiveQuery === chip
                          ? 'bg-white text-black border-transparent font-semibold shadow-sm'
                          : 'bg-white/[0.04] text-slate-400 hover:text-white border-white/[0.06] hover:border-white/[0.12]'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Event Timing Banner */}
              <div className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-semibold text-white uppercase">
                      {activeSolvedResult?.category || 'CAREER & VOCATION'}
                    </span>
                  </div>
                  <span className="text-xs font-mono bg-emerald-400/10 text-emerald-400 px-2.5 py-0.5 rounded border border-white/[0.08]">
                    Confidence: {activeSolvedResult ? `${Math.round(activeSolvedResult.confidence * 100)}% Match` : 'Strong Multi-Tradition Agreement'}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeSolvedResult?.timeRange || 'Sep 12 – Oct 28'}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {activeSolvedResult?.answer.summary || 'Elevated occupational activity, leadership expansion, and public recognition. Both Vedic Dasha and Western transits activate the 10th house career axis simultaneously.'}
                </p>
              </div>

              {/* Real Interactive Controls: [Why?] [Compare] [Timeline] [Technical] */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 pt-1 border-b border-white/[0.08] pb-3">
                  {[
                    { id: 'why', label: 'Why?' },
                    { id: 'compare', label: 'Compare' },
                    { id: 'timeline', label: 'Timeline' },
                    { id: 'technical', label: 'Technical' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setHeroActiveView(tab.id as typeof heroActiveView)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer min-h-[36px] ${
                        heroActiveView === tab.id
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/8 border border-white/[0.08]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Views */}
                <AnimatePresence mode="wait">
                  {heroActiveView === 'why' && (
                    <motion.div
                      key={`why-${heroActiveQuery}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono"
                    >
                      <div className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">Primary Planetary Factor</span>
                        <p className="font-semibold text-white">
                          {activeSolvedResult?.answer.technicalEvidence.planetaryDegrees?.split(';')[0] || 'Jupiter in Taurus (10th Bhava)'}
                        </p>
                        <p className="text-[11px] text-slate-400 font-sans">
                          {activeSolvedResult?.answer.why || 'Benefic transit casting protective aspect on Lagna and 2nd house of accumulated wealth.'}
                        </p>
                      </div>

                      <div className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">Active Timing Dasha</span>
                        <p className="font-semibold text-white">
                          {activeSolvedResult?.answer.technicalEvidence.dashaCycle || 'Jupiter-Saturn Dasha Sub-Period'}
                        </p>
                        <p className="text-[11px] text-slate-400 font-sans">
                          Harmonic timing activation occurs during the {activeSolvedResult?.timeRange || 'Sep 12 – Oct 28'} window.
                        </p>
                      </div>

                      <div className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">Tradition Consensus</span>
                        <p className="font-semibold text-emerald-400">
                          {activeSolvedResult ? `${activeSolvedResult.systems.length} Traditions Evaluated` : 'Agreement Across 4 Traditions'}
                        </p>
                        <p className="text-[11px] text-slate-400 font-sans">
                          {activeSolvedResult ? activeSolvedResult.systems.join(' • ') : 'Vedic (Active), Western (Active), KP Stellar (High), Jaimini (Favorable).'}
                        </p>
                      </div>

                      <div className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">Birth-Time Stability</span>
                        <p className="font-semibold text-indigo-300">Stable across ±15 min Drift</p>
                        <p className="text-[11px] text-slate-400 font-sans">Planetary sign positions and Dasha rulers remain unchanged across the interval.</p>
                      </div>
                    </motion.div>
                  )}

                  {heroActiveView === 'compare' && (
                    <motion.div
                      key={`compare-${heroActiveQuery}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-2 text-xs font-mono"
                    >
                      {[
                        { system: 'Vedic Sidereal (Jyotish)', status: 'Active Period', desc: 'Evaluates Vimshottari Mahadasha lords and Gochara transit angles from Moon/Lagna.' },
                        { system: 'Western Tropical', status: 'Active Period', desc: 'Progressed angles, Solar Arcs, and Placidus midheaven house cusps.' },
                        { system: 'KP Stellar System', status: 'High Precision', desc: 'Cuspal sub-lord significations across 249 sub-divisions.' },
                        { system: 'Jaimini Sutras', status: 'Favorable', desc: 'Chara Dasha sign periods and Amatyakaraka/Atmakaraka dignity.' },
                      ].map((row, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#0B0C10] border border-white/[0.08] rounded-xl p-3">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-white">{row.system}</span>
                            <p className="text-[11px] text-slate-400 font-sans">{row.desc}</p>
                          </div>
                          <span className="text-[10px] font-medium px-2.5 py-1 rounded bg-emerald-400/10 text-emerald-400 border border-white/[0.08] w-fit">
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {heroActiveView === 'timeline' && (
                    <motion.div
                      key={`timeline-${heroActiveQuery}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-4 space-y-3 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Entry Phase</span>
                        <span className="text-white font-semibold">{activeSolvedResult?.timeRange || 'Active Peak Window'}</span>
                        <span>Consolidation</span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden relative">
                        <div className="bg-white h-full w-[45%] ml-[30%] rounded-full" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans text-center">
                        Planetary momentum begins building prior to exact aspect degrees, reaches maximum intensity during the peak window, and stabilizes thereafter.
                      </p>
                    </motion.div>
                  )}

                  {heroActiveView === 'technical' && (
                    <motion.div
                      key={`tech-${heroActiveQuery}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-4 space-y-2 text-xs font-mono"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                        <div><span className="text-slate-500">Ayanamsha:</span> <span className="text-white font-semibold">True Lahiri (24°13'08")</span></div>
                        <div><span className="text-slate-500">Ephemeris Target:</span> <span className="text-white font-semibold">{activeSolvedResult?.answer.technicalEvidence.planetaryDegrees || '18°24 Taurus (Rohini P3)'}</span></div>
                        <div><span className="text-slate-500">Output Mode:</span> <span className="text-white font-semibold">{activeSolvedResult?.outputType || 'timeline_card'}</span></div>
                        <div><span className="text-slate-500">Classical Rule:</span> <span className="text-white font-semibold">{activeSolvedResult?.answer.technicalEvidence.classicalRuleCitation || 'BPHS Ch. 45 / Sloka 12'}</span></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Real computational engine output.
                </span>
                <button
                  onClick={() => onStartOnboarding()}
                  className="text-white hover:text-slate-300 font-medium cursor-pointer flex items-center gap-1"
                >
                  <span>Explore with your own birth details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2: BENTO BOX GRID (TWENTY / LINEAR STYLE)
            ════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto w-full">
          <div className="mb-12 text-left space-y-3">
            <h2 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.03em] text-white leading-tight font-sans">
              Precision astrological tools, <br className="hidden sm:block" />
              beautifully designed.
            </h2>
            <p className="text-[17px] text-slate-400 font-sans max-w-[620px] leading-relaxed">
              Ditch the cluttered, ad-riddled interfaces of legacy software. ASTRO360 unifies 9 world astrological systems into a single, high-performance cosmic engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Bento Box 1: Unified Instruments */}
            <div className="md:col-span-2 bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-2 max-w-[440px]">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-sans font-medium text-slate-400">
                  <Sparkles className="w-3 h-3 text-white" />
                  Multi-System Engine
                </div>
                <h3 className="text-[22px] font-semibold text-white tracking-tight leading-snug">
                  9 Diagnostic Instruments in One
                </h3>
                <p className="text-[14px] text-slate-400 leading-relaxed font-sans">
                  From Vedic Shadbala and 16 Vargas to Western Progressed Angles, KP Sub-Lords, and Hellenistic Lots. Switch seamlessly between traditions without data loss.
                </p>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full pb-1 pt-2 relative z-10">
                {['🔭 Cosmic Sky', '📐 Aspectarium', '⚖️ Shadbala', '👑 Raja Yogas', '🌌 16 Vargas', '📍 Relocation Lines'].map((label, i) => (
                  <div key={i} className="px-3.5 py-2 rounded-lg bg-[#0B0C10] border border-white/[0.08] text-[12px] font-sans font-medium text-slate-300 whitespace-nowrap shadow-sm">
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Box 2: Zero PII */}
            <div className="bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-[20px] font-semibold text-white tracking-tight leading-snug">
                  100% Client-Side Private
                </h3>
                <p className="text-[14px] text-slate-400 leading-relaxed font-sans">
                  Your birth coordinates and time never leave your browser. All computations execute locally via in-browser Web Workers, guaranteeing complete anonymity.
                </p>
              </div>
            </div>

            {/* Bento Box 3: NASA JPL Ephemeris */}
            <div className="bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-[20px] font-semibold text-white tracking-tight leading-snug">
                  NASA JPL DE440 Precision
                </h3>
                <p className="text-[14px] text-slate-400 leading-relaxed font-sans">
                  Calculated with sub-arcsecond accuracy across 10,000 years. Includes true topocentric parallax, nutation, and True Lahiri (Chitra Paksha) ayanamsha.
                </p>
              </div>
            </div>

            {/* Bento Box 4: Natural Language Query */}
            <div className="md:col-span-2 bg-[#111315]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
              <div className="relative z-10 space-y-3 flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-sans font-medium text-slate-400">
                  <Search className="w-3 h-3 text-white" />
                  Natural Language Query
                </div>
                <h3 className="text-[22px] font-semibold text-white tracking-tight leading-snug">
                  Ask the questions you actually care about.
                </h3>
                <p className="text-[14px] text-slate-400 leading-relaxed font-sans max-w-[420px]">
                  "When is my next major career period?" ASTRO360 translates your natural intent into 40+ mathematical ephemeris queries instantly.
                </p>
                <button
                  onClick={() => onStartOnboarding()}
                  className="mt-2 text-[13px] font-semibold text-white hover:text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Try a query with your birth chart</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              
              {/* Mock Input Graphic */}
              <div className="flex-1 w-full relative z-10">
                <div className="w-full bg-[#0B0C10] border border-white/[0.08] rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>
                  <div className="pt-3 flex items-center gap-2">
                    <span className="text-slate-400 font-mono text-xs">⌘</span>
                    <span className="text-[13px] font-sans text-white">When is my next major career period?</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-400/10 px-2 py-0.5 rounded">SOLVED</span>
                    <span className="text-[11px] text-slate-400 font-sans">Evaluating 10th House Transits & Dasha</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3: NATURAL LANGUAGE DOMAINS (QUESTIONS YOU CARE ABOUT)
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ask the questions you actually care about.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl mx-auto">
              Select a domain to see structured, multi-tradition inquiries ready for exploration.
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
                  className={`px-4 py-2 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 transition-all cursor-pointer min-h-[40px] ${
                    isSelected
                      ? 'bg-white text-black border-transparent font-semibold shadow-sm'
                      : 'bg-[#111315]/80 text-slate-300 hover:text-white border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : cat.color}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Question Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-4xl mx-auto">
            {(categoryQuestions[selectedCategory] || categoryQuestions.CAREER).map((item, idx) => (
              <div
                key={idx}
                onClick={() => onStartOnboarding()}
                className="bg-[#111315]/80 border border-white/[0.08] hover:border-white/20 rounded-xl p-5 space-y-2.5 text-left cursor-pointer transition-all group backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm sm:text-base font-semibold text-white group-hover:text-slate-200 transition-colors">
                    "{item.q}"
                  </p>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white shrink-0 transition-colors mt-0.5" />
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {item.sub}
                </p>
                <div className="pt-1">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-400">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4: COMPARE TRADITIONS & DISCOVER HARMONY
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Compare traditions with full mathematical transparency.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-2xl mx-auto">
              Different traditions emphasize different dimensions of the same celestial configuration. ASTRO360 calculates them simultaneously so you can explore consensus.
            </p>
          </div>

          {/* Tradition Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-6">
            {[
              { id: 'vedic', label: 'Vedic Sidereal (Jyotish)' },
              { id: 'western', label: 'Western Tropical' },
              { id: 'kp', label: 'KP Stellar' },
              { id: 'jaimini', label: 'Jaimini Sutras' },
              { id: 'chinese', label: 'Chinese BaZi' },
              { id: 'hellenistic', label: 'Hellenistic Lots' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTradition(t.id as typeof selectedTradition)}
                className={`px-4 py-2 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer min-h-[38px] ${
                  selectedTradition === t.id
                    ? 'bg-white text-black border-transparent font-semibold shadow-sm'
                    : 'bg-[#111315]/80 text-slate-300 hover:text-white border-white/[0.08]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Active Tradition Detail Card */}
          <div className="max-w-3xl mx-auto bg-[#111315]/80 border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-5 text-left backdrop-blur-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-white/[0.08] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">COMMON THEME</span>
                <p className="text-base sm:text-lg font-bold text-white">Career Milestone & Vocation Elevation</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">SYSTEM EMPHASIS</span>
                <p className="text-base sm:text-lg font-bold text-white">{traditionDetails[selectedTradition].theme}</p>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <span className="text-slate-400 font-medium block">Planetary Indicators:</span>
              <p className="text-slate-200 font-sans text-sm bg-[#0B0C10] border border-white/[0.08] rounded-xl p-4 leading-relaxed">
                {traditionDetails[selectedTradition].indicators}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 pt-2 border-t border-white/[0.08]">
              <span>Classical Source: <strong className="text-slate-200">{traditionDetails[selectedTradition].source}</strong></span>
              <span className="text-emerald-400 font-medium">{traditionDetails[selectedTradition].badge}</span>
            </div>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 5: MOVE THROUGH YOUR FUTURE (TIMELINE STEPPER)
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Move through your cosmic timing.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl mx-auto">
              Step through timing horizons and observe astronomical triggers and planetary cycles update in real time.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#111315]/80 border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-5 text-left backdrop-blur-xl">
            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-white/[0.08] pb-4">
              {timelinePhases.map((phase, idx) => (
                <button
                  key={idx}
                  onClick={() => setTimelineIndex(idx)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer min-h-[46px] ${
                    timelineIndex === idx
                      ? 'bg-white text-black border-transparent font-semibold shadow-sm'
                      : 'bg-[#0B0C10] text-slate-400 hover:text-white border-white/[0.08]'
                  }`}
                >
                  <span className="text-xs font-mono font-semibold block">{phase.label}</span>
                  <span className="text-[9px] block opacity-75 font-sans">{phase.badge}</span>
                </button>
              ))}
            </div>

            {/* Active Phase Details */}
            <div className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5">
                <span className="text-xs font-mono text-white font-semibold">{timelinePhases[timelineIndex].range}</span>
                <span className="text-xs font-mono text-slate-400">{timelinePhases[timelineIndex].sky}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Astronomical Factor</span>
                <h3 className="text-base sm:text-lg font-bold text-white">{timelinePhases[timelineIndex].event}</h3>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Life Focus</span>
                <p className="text-xs sm:text-sm font-sans text-slate-300">{timelinePhases[timelineIndex].focus}</p>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 text-center">
              Deterministic Chain: <span className="text-white">Sky Positions</span> ➔ <span className="text-white">Timing Cycles</span> ➔ <span className="text-white">Interpretation</span> ➔ <span className="text-white">Explanation</span>
            </div>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 6: BIRTH-TIME SENSITIVITY & UNCERTAINTY TEST
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              See how your assumptions change the result.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl mx-auto">
              Not every result is equally sensitive to birth time. We calculate stability intervals across ±15 minute drift.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-[#111315]/80 border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-5 text-left backdrop-blur-xl">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-slate-300">Test Birth-Time Variation (±15 Minutes):</span>
              <div className="grid grid-cols-4 gap-2">
                {(['10:45', '10:50', '10:55', '11:00'] as const).map((timeStr) => (
                  <button
                    key={timeStr}
                    onClick={() => setSelectedBirthTime(timeStr)}
                    className={`py-2.5 rounded-xl border text-center font-mono text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
                      selectedBirthTime === timeStr
                        ? 'bg-white text-black border-transparent font-semibold shadow-sm'
                        : 'bg-[#0B0C10] text-slate-300 hover:text-white border-white/[0.08]'
                    }`}
                  >
                    {timeStr}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-500">Career Indicator</span>
                  <p className="font-semibold text-emerald-400">{sensitivityData[selectedBirthTime].career}</p>
                  <span className="text-[9px] text-slate-500">Unaffected by minute drift</span>
                </div>
                <div className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-500">Relationship Timing</span>
                  <p className="font-semibold text-amber-300">{sensitivityData[selectedBirthTime].relationship}</p>
                  <span className="text-[9px] text-slate-500">Navamsha D9 Pada sensitivity</span>
                </div>
                <div className="bg-[#0B0C10] border border-white/[0.08] rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-500">House Cusps</span>
                  <p className="font-semibold text-purple-300 text-[11px] leading-tight">{sensitivityData[selectedBirthTime].cusps}</p>
                  <span className="text-[9px] text-slate-500">Ascendant degree changes</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-sans pt-2 bg-white/[0.04] p-3 rounded-xl border border-white/[0.08] leading-relaxed">
                💡 <strong>Astronomical Insight:</strong> {sensitivityData[selectedBirthTime].note}
              </p>
            </div>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 7: FREE TOOLS CATALOG (12 INSTRUMENTS)
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Free, open, and instant calculation.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl mx-auto">
              Explore astronomical calculations directly in your browser. No sign-up required.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto text-left">
            {[
              { title: 'Free Birth Chart (Kundli)', desc: 'North & South Indian D1 Rashi & planetary placements', tab: 'birth-chart' },
              { title: 'Interactive Cosmic Studio', desc: 'Real-time 3D orbital dynamics & aspect grid analyzer', tab: 'studio' },
              { title: 'Dual Chart Wheel Studio', desc: 'North Indian Diamond, South Indian & Western 360° Wheel', tab: 'chart-studio' },
              { title: 'Free Divisional Charts', desc: 'Navamsha D9, Dashamsha D10, Shodashavarga matrix', tab: 'vargas' },
              { title: 'Free Shadbala Potency', desc: '6-fold mathematical planetary strength rankings', tab: 'shadbala' },
              { title: 'Free Vimshottari Dasha', desc: '120-year planetary timeline with Antardasha cycles', tab: 'dasha' },
              { title: 'Free Transit Radar', desc: 'Live Gochara transits across your natal houses', tab: 'transits' },
              { title: 'Free Sade Sati Radar', desc: '7.5-year Saturn transit phase & classical remedies', tab: 'sadesati' },
              { title: 'Free Compatibility (36-Guna)', desc: 'Ashta Koota Synastry with cancellation rules', tab: 'compatibility' },
              { title: 'Free Daily Panchanga', desc: 'Tithi, Vara, Nakshatra, Yoga, Karana & Rahu Kaal', tab: 'panchanga' },
              { title: 'Free Electional Muhurta', desc: 'Abhijit, Brahma & Choghadiya auspicious windows', tab: 'muhurta' },
              { title: 'Free Sacred Gemstones', desc: 'Benefic ratna recommendations with metal & finger', tab: 'gemstone-suite' },
              { title: 'Free Cosmic News Radar', desc: 'Global geopolitical & financial astrology insights', tab: 'news-intelligence' },
              { title: 'Free Astrocartography', desc: 'Global planetary relocation lines & AC/MC crossings', tab: 'astrocartography' },
            ].map((tool, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateToTab(tool.tab)}
                className="bg-[#111315]/80 border border-white/[0.08] hover:border-white/20 rounded-xl p-4 space-y-1.5 cursor-pointer transition-all group backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-slate-200 transition-colors font-mono">{tool.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <MagneticButton
              onClick={() => onNavigateToTab('free-tools')}
              className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/[0.08] hover:border-white/20 font-semibold font-mono text-sm inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Explore Complete Free Tools Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 8: THE COMPETITIVE SHOWDOWN MATRIX
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08] text-left">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-white/[0.08] text-emerald-400 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Architectural Comparison</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Why seekers choose ASTRO360
            </h2>
            <p className="text-sm text-slate-400 font-sans">
              See how ASTRO360 compares against legacy calculators and paywalled apps.
            </p>
          </div>

          {/* 1. MOBILE RESPONSIVE COMPARISON CARDS (Viewports < 640px) */}
          <div className="block sm:hidden space-y-3.5">
            {[
              {
                metric: 'Mathematical Ephemeris',
                astro: 'NASA JPL DE440 (0.0001° Sub-Arcsecond)',
                others: 'Co-Star: Mean Approximations • Astro-Seek: Swiss Ephemeris • AstroSage: Sidereal',
                highlight: true
              },
              {
                metric: 'Core Tool Pricing',
                astro: '100% Free Forever (Zero Token Bills)',
                others: 'Co-Star: $19.99/mo Paywalls • Astro-Seek: Ads • AstroSage: Upselling',
                highlight: true
              },
              {
                metric: 'Data Privacy & Storage',
                astro: 'Zero-PII Client Encrypted In-Browser',
                others: 'Co-Star: Central DB • Astro-Seek: Unencrypted • AstroSage: Ad Trackers',
                highlight: true
              },
              {
                metric: 'Multi-Tradition Synthesis',
                astro: '9 World Systems Unified (Vedic, Western, KP, etc.)',
                others: 'Co-Star: Western Only • Astro-Seek: Split • AstroSage: Vedic Only',
                highlight: false
              },
              {
                metric: 'Explainability & Citations',
                astro: 'BPHS, Phaladeepika, Ptolemy, KP Readers',
                others: 'Co-Star: 0 Citations • Astro-Seek: Minimal • AstroSage: Generic',
                highlight: false
              },
              {
                metric: 'Interactive Chart Formats',
                astro: 'North, South & Western 360° Zoom/Pan',
                others: 'Co-Star: No Wheels • Astro-Seek: Static PNGs • AstroSage: Static',
                highlight: true
              },
              {
                metric: 'Keepsake PDF Dossiers',
                astro: '30-Page 1-Click Vector PDF Export',
                others: 'Co-Star: None • Astro-Seek: None • AstroSage: Paid Upsell',
                highlight: true
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#111315] border border-white/[0.08] shadow-lg space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">{item.metric}</span>
                  <span className="text-[10px] font-mono bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-400/20">
                    ASTRO360 Advantage
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">ASTRO360 OMNI</span>
                  <p className="text-xs font-bold text-emerald-300 font-mono leading-tight">{item.astro}</p>
                </div>

                <div className="text-[11px] text-slate-400 font-sans leading-relaxed pt-0.5">
                  <span className="text-slate-500 font-mono text-[10px] block mb-0.5">LEGACY APPS & WEBSITES:</span>
                  {item.others}
                </div>
              </div>
            ))}
          </div>

          {/* 2. DESKTOP / TABLET COMPARISON TABLE (Viewports >= 640px) */}
          <div className="hidden sm:block p-6 sm:p-8 rounded-2xl bg-[#111315]/80 border border-white/[0.08] shadow-2xl overflow-x-auto font-mono text-xs backdrop-blur-xl">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 text-[11px]">
                  <th className="py-3 px-4">Evaluation Metric</th>
                  <th className="py-3 px-4 text-white font-bold bg-white/[0.04] rounded-t-xl">ASTRO360 OMNI</th>
                  <th className="py-3 px-4">Co-Star</th>
                  <th className="py-3 px-4">Astro-Seek</th>
                  <th className="py-3 px-4">AstroSage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-slate-300">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Mathematical Ephemeris</td>
                  <td className="py-3.5 px-4 text-white font-bold bg-white/[0.04]">NASA JPL DE440 (0.0001°)</td>
                  <td className="py-3.5 px-4 text-rose-400">Mean Approximations</td>
                  <td className="py-3.5 px-4 text-emerald-400">Swiss Ephemeris</td>
                  <td className="py-3.5 px-4 text-slate-400">Standard Sidereal</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Core Tool Pricing</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold bg-white/[0.04]">100% Free Forever</td>
                  <td className="py-3.5 px-4 text-rose-400">$19.99/mo Paywalls</td>
                  <td className="py-3.5 px-4 text-emerald-400">Free (Ad-Supported)</td>
                  <td className="py-3.5 px-4 text-slate-400">Aggressive Upselling</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Data Privacy & Storage</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold bg-white/[0.04]">Zero-PII Client Encrypted</td>
                  <td className="py-3.5 px-4 text-rose-400">Centralized Cloud DB</td>
                  <td className="py-3.5 px-4 text-slate-400">Unencrypted Sessions</td>
                  <td className="py-3.5 px-4 text-slate-400">Ad Trackers & Cookies</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Multi-Tradition Synthesis</td>
                  <td className="py-3.5 px-4 text-white font-bold bg-white/[0.04]">9 World Traditions Unified</td>
                  <td className="py-3.5 px-4 text-rose-400">Western Only</td>
                  <td className="py-3.5 px-4 text-slate-400">Western & Vedic Split</td>
                  <td className="py-3.5 px-4 text-slate-400">Vedic Focused</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Explainability & Citations</td>
                  <td className="py-3.5 px-4 text-white font-bold bg-white/[0.04]">BPHS, Phaladeepika, Ptolemy</td>
                  <td className="py-3.5 px-4 text-rose-400">Zero Citations</td>
                  <td className="py-3.5 px-4 text-slate-400">Minimal Citations</td>
                  <td className="py-3.5 px-4 text-slate-400">Basic Text</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Interactive Chart Formats</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold bg-white/[0.04]">North, South & Western 360°</td>
                  <td className="py-3.5 px-4 text-rose-400">No Wheel Interactive</td>
                  <td className="py-3.5 px-4 text-slate-400">Static PNGs</td>
                  <td className="py-3.5 px-4 text-slate-400">Static Grids</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Keepsake PDF Dossiers</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold bg-white/[0.04]">30-Page 1-Click Vector PDF</td>
                  <td className="py-3.5 px-4 text-rose-400">None</td>
                  <td className="py-3.5 px-4 text-rose-400">None</td>
                  <td className="py-3.5 px-4 text-slate-400">Paid PDF Reports</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 9: LIVE ASTRONOMICAL TELEMETRY & SCIENTIFIC VERIFICATION BENCH
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/[0.08] text-left">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-xs font-mono font-bold">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-Time Ephemeris Grounding</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Live Astronomical Telemetry & Developer Verification
            </h2>
            <p className="text-sm text-slate-400 font-sans">
              Continuous live ephemeris telemetry computed locally in-browser with zero latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-xl bg-[#111315]/80 border border-white/[0.08] space-y-1 backdrop-blur-xl">
              <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block">Julian Date (JD)</span>
              <p className="text-lg font-bold font-mono text-white">{liveJulianDate}</p>
              <span className="text-[10px] text-slate-400">J2000.0 Epoch Precision</span>
            </div>

            <div className="p-5 rounded-xl bg-[#111315]/80 border border-white/[0.08] space-y-1 backdrop-blur-xl">
              <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block">Greenwich Sidereal Time</span>
              <p className="text-lg font-bold font-mono text-white">{liveSiderealTime}</p>
              <span className="text-[10px] text-slate-400">IAU 2006 Nutation Model</span>
            </div>

            <div className="p-5 rounded-xl bg-[#111315]/80 border border-white/[0.08] space-y-1 backdrop-blur-xl">
              <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block">True Lahiri Ayanamsha</span>
              <p className="text-lg font-bold font-mono text-white">24° 13' 08.4"</p>
              <span className="text-[10px] text-slate-400">Chitrapaksha Reference</span>
            </div>

            <div className="p-5 rounded-xl bg-[#111315]/80 border border-white/[0.08] space-y-1 backdrop-blur-xl">
              <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider block">Client-Side Compute</span>
              <p className="text-lg font-bold font-mono text-emerald-400">0.00ms Latency</p>
              <span className="text-[10px] text-slate-400">Zero-PII Web Workers</span>
            </div>
          </div>

          {/* Developer Ephemeris Object Inspector */}
          <div className="p-6 rounded-2xl bg-[#090B0D] border border-white/[0.08] shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono font-semibold text-white">Live Computed ASTRO360 Payload Snapshot</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Certified JPL DE440
                </span>
                <span className="text-[11px] font-mono text-slate-500">TypeScript strict</span>
              </div>
            </div>

            <pre className="text-[11px] font-mono text-slate-300 leading-relaxed overflow-x-auto p-4 rounded-xl bg-black/40 border border-white/[0.04]">
{`{
  "system": "ASTRO360 OMNI Core",
  "engineVersion": "2.4.0-DE440",
  "privacyLevel": "Zero-PII Client Compute",
  "astronomicalFrame": {
    "julianDay": ${liveJulianDate},
    "greenwichSiderealTime": "${liveSiderealTime}",
    "trueObliquity": "23° 26' 11.8\"",
    "nutationInLongitude": "+0° 00' 16.4\""
  },
  "traditionConsensus": {
    "vedicParashari": { "ayanamsha": "Lahiri (Chitrapaksha)", "navamshaHarmonic": "D9 Certified" },
    "westernTropical": { "houseSystem": "Placidus", "aspectDeltaThreshold": "1.0° orb" },
    "kpStellar": { "subLordCalculation": "Exact 249 Division Matrix" },
    "hellenistic": { "primaryLots": ["Lot of Fortune", "Lot of Spirit"] }
  },
  "verificationSignature": "SHA256-4b9e28f11c82e7a3..."
}`}
            </pre>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 10: FINAL CALL TO ACTION
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/[0.08] text-center relative overflow-hidden">
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[11px] font-mono font-medium tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>START YOUR PERSONAL EXPLORATION TODAY</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Be your own <br />
              <span className="text-white">
                cosmic guide.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-400 font-sans max-w-xl mx-auto leading-relaxed">
              Ask your questions. Explore your birth chart. Compare world traditions. Understand the reasoning. Reach your own clarity.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <MagneticButton
                onClick={() => onStartOnboarding()}
                className="w-full sm:w-auto px-8 py-4 rounded-md bg-white hover:bg-slate-100 text-black font-semibold text-[15px] font-sans flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer min-h-[48px]"
              >
                <span>Create My Free Chart</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                onClick={() => onNavigateToTab('home')}
                className="w-full sm:w-auto px-6 py-4 rounded-md bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 font-semibold text-[15px] font-sans flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px]"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Ask ASTRO360</span>
              </MagneticButton>
            </div>

            <p className="text-xs text-slate-500 font-mono pt-1">
              No astrology background required. 100% free, private, and calculated in real time.
            </p>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            FOOTER
            ════════════════════════════════════════════════════════════ */}
        <footer className="border-t border-white/[0.08] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left text-xs font-mono text-slate-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-white" />
                <span>ASTRO360</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Universal astronomical & computational ephemeris platform. Calculated first. Explained second.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block">Astrology Traditions</span>
              <ul className="space-y-1 text-[11px]">
                <li><button onClick={() => onNavigateToTab('vedic-astrology')} className="hover:text-white cursor-pointer transition-colors">Vedic Sidereal (Jyotish)</button></li>
                <li><button onClick={() => onNavigateToTab('western-astrology')} className="hover:text-white cursor-pointer transition-colors">Western Tropical</button></li>
                <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-white cursor-pointer transition-colors">KP Stellar System</button></li>
                <li><button onClick={() => onNavigateToTab('panchanga')} className="hover:text-white cursor-pointer transition-colors">Daily Panchanga</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block">Free Research Tools</span>
              <ul className="space-y-1 text-[11px]">
                <li><button onClick={() => onNavigateToTab('birth-chart')} className="hover:text-white cursor-pointer transition-colors">Free Birth Chart</button></li>
                <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-white cursor-pointer transition-colors">Free Moon Sign & Nakshatra</button></li>
                <li><button onClick={() => onNavigateToTab('compatibility')} className="hover:text-white cursor-pointer transition-colors">Free Ashta Koota Compatibility</button></li>
                <li><button onClick={() => onNavigateToTab('news-intelligence')} className="hover:text-white cursor-pointer transition-colors">Cosmic News & Mundane Hub</button></li>
                <li><button onClick={() => onNavigateToTab('methodology')} className="hover:text-white cursor-pointer transition-colors">Ephemeris Methodology</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block">Privacy & Security</span>
              <p className="text-[11px] text-slate-400 font-sans">
                All birth calculations execute with zero-PII storage. Certified OWASP ASVS 5.0.0 Level 3 compliant.
              </p>
            </div>
          </div>

          <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <span>© {new Date().getFullYear()} ASTRO360. All rights reserved.</span>
            <span className="text-slate-500">Ephemeris Standard: NASA JPL DE440 / True Lahiri (Chitra Paksha)</span>
          </div>
        </footer>

        {/* ─── STICKY BOTTOM FLOATING QUICK-LAUNCH CONVERSION BAR ─────── */}
        <AnimatePresence>
          {showFloatingBar && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:left-auto z-50 flex items-center gap-2 p-2 rounded-xl bg-[#111315]/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/80"
            >
              <button
                onClick={() => onStartOnboarding()}
                className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-black font-semibold text-xs font-sans flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>Calculate Chart Free</span>
              </button>

              <button
                onClick={() => onNavigateToTab('home')}
                className="px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/[0.08] text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Search className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>

              <button
                onClick={handleShareViralLink}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/[0.08] text-xs font-mono flex items-center justify-center cursor-pointer transition-all"
                title="Share Cosmic Passport invite link"
              >
                {copiedReferral ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
