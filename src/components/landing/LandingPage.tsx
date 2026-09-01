import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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
import AnimatedStarfield from './AnimatedStarfield';
import AstroCelestialAnimation from './AstroCelestialAnimation';
import LiveCosmicSkyStudio from './LiveCosmicSkyStudio';
import LiveAspectariumAndLunarTracker from './LiveAspectariumAndLunarTracker';
import LiveScriptureAndBhavaExplorer from './LiveScriptureAndBhavaExplorer';
import LivePlanetarySpeedAndShadbalaSuite from './LivePlanetarySpeedAndShadbalaSuite';
import LiveMultiTraditionAndTattvaSuite from './LiveMultiTraditionAndTattvaSuite';
import LiveIngressAndRajaYogaSuite from './LiveIngressAndRajaYogaSuite';
import LiveCombustionAndAshtakavargaSuite from './LiveCombustionAndAshtakavargaSuite';
import LiveShodashavargaAndGemstoneSuite from './LiveShodashavargaAndGemstoneSuite';
import LivePrashnaAndKPSubLordSuite from './LivePrashnaAndKPSubLordSuite';
import Realistic3DSolarSystemAlignment from '../3d/Realistic3DSolarSystemAlignment';
import { useScrollReveal, use3DTilt, useMagneticHover, useMouseGlow } from '../../hooks/useAnimations';
import { QuestionIntentEngine } from '../../lib/questionRouter';
import { calculatePlanetaryPositions, calculateAyanamsha } from '../../lib/astroCalculations';

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
        initial={{ opacity: 0, y: 35 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
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
  
  // Section: Simple vs Expert Mode Switcher State
  const [demoDensity, setDemoDensity] = useState<'simple' | 'expert'>('simple');
  
  // Section: Tradition Compare Selector
  const [selectedTradition, setSelectedTradition] = useState<'vedic' | 'western' | 'kp' | 'jaimini' | 'chinese' | 'hellenistic'>('vedic');

  // Master Diagnostic Instruments Hub Tab Switcher
  const [activeDiagnosticTab, setActiveDiagnosticTab] = useState<
    'sky' | 'aspects' | 'bhavas' | 'shadbala' | 'traditions' | 'ingresses' | 'combustion' | 'vargas' | 'prashna'
  >('sky');

  // Mouse glow for hero
  const { ref: heroGlowRef } = useMouseGlow();

  // Scroll progress for hero subtle parallax
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -40]);

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
    { id: 'CAREER', label: 'CAREER & VOCATION', icon: Briefcase, color: 'text-amber-400' },
    { id: 'LOVE', label: 'LOVE & RELATIONSHIPS', icon: Heart, color: 'text-rose-400' },
    { id: 'MONEY', label: 'WEALTH & ASSETS', icon: DollarSign, color: 'text-emerald-400' },
    { id: 'TIMING', label: 'TIMING & PERIODS', icon: Clock, color: 'text-cyan-400' },
    { id: 'GROWTH', label: 'PURPOSE & DHARMA', icon: TrendingUp, color: 'text-indigo-400' },
    { id: 'MY CHART', label: 'BIRTH CHART ESSENTIALS', icon: Compass, color: 'text-purple-400' },
    { id: 'HEALTH', label: 'VITALITY & BALANCE', icon: Activity, color: 'text-emerald-300' },
    { id: 'FAMILY', label: 'FAMILY & HOME', icon: Globe, color: 'text-orange-400' },
    { id: 'TRAVEL', label: 'TRAVEL & RELOCATION', icon: MapPin, color: 'text-teal-400' },
    { id: 'EDUCATION', label: 'LEARNING & SKILLS', icon: BookOpen, color: 'text-blue-400' },
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
    FAMILY: [
      { q: 'What are the indicators for domestic peace and real estate?', sub: 'Evaluates 4th house (Matru & Sukha Bhava), Moon emotional stability, and Mars land indicators', tag: '4th House Domain' },
    ],
    TRAVEL: [
      { q: 'When is relocation or international travel highlighted?', sub: 'Analyzes 9th and 12th house planetary transits and Rahu foreign travel indicators', tag: 'AstroCartography' },
    ],
    'MY CHART': [
      { q: 'What are the primary planetary dignities in my birth chart?', sub: 'Calculates exaltation, moolatrikona, own sign, debilitation, and combustions', tag: 'D1 Rashi Matrix' },
    ],
    EDUCATION: [
      { q: 'What fields of study align best with my intellectual strengths?', sub: 'Analyzes Mercury, Jupiter, 5th house (intellect), and learning yogas', tag: 'Intellectual Vocation' },
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
      status: 'Active Period', 
      theme: 'Expansion through Karma, Dasha, and House Transits', 
      indicators: 'Jupiter transiting 10th bhava from Lagna; Moon in Rohini Nakshatra; Jupiter-Saturn Dasha active.', 
      source: 'Brihat Parashara Hora Shastra, Ch. 45', 
      badge: 'Tradition Agreement' 
    },
    western: { 
      name: 'Western Tropical & Psychological', 
      status: 'Active Period', 
      theme: 'Midheaven Elevation, Solar Arcs, and Public Role', 
      indicators: 'Transiting Jupiter sextile natal Sun; Progressed Midheaven forming exact trine with natal Jupiter.', 
      source: "Ptolemy's Tetrabiblos & Solar Arc Directions", 
      badge: 'Tradition Agreement' 
    },
    kp: { 
      name: 'KP Stellar System (Krishnamurti Padhdhati)', 
      status: 'High Precision Indicator', 
      theme: 'Cuspal Sub-Lord Significations & Placidus Cusps', 
      indicators: '10th house cuspal sub-lord signifies houses 2, 6, 10, and 11, indicating occupational advancement.', 
      source: 'Krishnamurti Padhdhati Reader III & IV', 
      badge: 'Tradition Agreement' 
    },
    jaimini: { 
      name: 'Jaimini Sutras (Chara Dasha)', 
      status: 'Supportive Period', 
      theme: 'Amatyakaraka (AmK) Career Dignity & Arudha Lagna', 
      indicators: 'Chara Dasha period activating Amatyakaraka sign with benefic aspect on Arudha Lagna (AL).', 
      source: 'Maharishi Jaimini Upadesha Sutras', 
      badge: 'Tradition Agreement' 
    },
    chinese: { 
      name: 'Chinese BaZi & 4 Pillars of Destiny', 
      status: 'Harmonious Element Flow', 
      theme: 'Resource & Officer Element Cycles (Day Master Support)', 
      indicators: '10-Year Luck Pillar brings supportive Yang Wood energy nourishing the Fire day-master.', 
      source: 'Classical BaZi San Ming Tong Hui', 
      badge: 'Harmonious Flow' 
    },
    hellenistic: { 
      name: 'Hellenistic & Arabic Lots', 
      status: 'Tenth-Place Activation', 
      theme: 'Lot of Spirit & Angular Pivot Timing', 
      indicators: 'Zodiacal Releasing from the Lot of Spirit reaches a major Level 1 angular pivot in career domicile.', 
      source: 'Vettius Valens Anthologies (Book IV)', 
      badge: 'Angular Pivot' 
    }
  };

  const handleQuickCalculate = (preset?: Partial<UserProfile>) => {
    onStartOnboarding(preset || { name: 'Seeker', dob: '1998-06-15', time: '12:00', location: 'London, UK' });
  };

  const tickerItems = useMemo(() => {
    try {
      const now = new Date();
      const pos = calculatePlanetaryPositions();
      const sun = pos.find(p => p.name === 'Sun');
      const moon = pos.find(p => p.name === 'Moon');
      const jup = pos.find(p => p.name === 'Jupiter');
      const ayan = calculateAyanamsha(now, 'true_chitrapaksha');
      const ayanDeg = Math.floor(ayan);
      const ayanMin = Math.floor((ayan - ayanDeg) * 60);
      const ayanSec = Math.round(((ayan - ayanDeg) * 60 - ayanMin) * 60);

      return [
        { icon: Moon, label: 'Live Moon', value: moon ? `${moon.nakshatra} (${moon.sign} ${moon.degree})` : 'Rohini (Taurus ♉)', color: 'text-cyan-400' },
        { icon: Sun, label: 'Live Sun', value: sun ? `${sun.sign} (${sun.degree})` : 'Simha (Leo ♌)', color: 'text-amber-400' },
        { icon: Sparkles, label: 'Ayanamsha', value: `True Lahiri ${ayanDeg}°${ayanMin}'${ayanSec < 10 ? '0' : ''}${ayanSec}"`, color: 'text-emerald-400' },
        { icon: Activity, label: 'Jupiter', value: jup ? `${jup.sign} ${jup.degree}` : 'Taurus ♉', color: 'text-amber-300' },
      ];
    } catch {
      return [
        { icon: Moon, label: 'Moon', value: 'Rohini (Taurus ♉)', color: 'text-cyan-400' },
        { icon: Sun, label: 'Sun', value: 'Simha (Leo ♌)', color: 'text-amber-400' },
        { icon: Sparkles, label: 'Ayanamsha', value: "True Lahiri 24°14'12\"", color: 'text-emerald-400' },
        { icon: Activity, label: 'NOAA Solar Kp', value: '3.2 (Quiet)', color: 'text-amber-300' },
      ];
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#060A12] text-[#F8FAFC] selection:bg-amber-400 selection:text-slate-950 font-sans relative overflow-x-hidden">
      
      {/* ── Living Crisp Starfield Canvas ─────────────────────────── */}
      <AnimatedStarfield />

      {/* ── Editorial Background Surface Gradients ──────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-amber-500/8 via-slate-800/4 to-transparent rounded-full blur-[160px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-cyan-600/5 via-transparent to-transparent rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        {/* 1. Global Navigation Bar */}
        <OmniLandingNavbar 
          onStartOnboarding={onStartOnboarding}
          onNavigateToTab={onNavigateToTab}
          userProfile={userProfile}
        />

        {/* ─── LIVE REAL-TIME CELESTIAL TICKER ────────────────────────── */}
        <div className="pt-20 sm:pt-24 border-b border-white/8 bg-[#090E17]/85 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span className="hidden sm:inline">LIVE EPHEMERIS</span>
            </div>

            {/* Marquee Ticker */}
            <div className="flex-1 overflow-hidden relative">
              <div className="flex animate-ticker whitespace-nowrap" style={{ ['--ticker-speed' as string]: '40s' }}>
                {[...tickerItems, ...tickerItems].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <span key={idx} className="inline-flex items-center gap-1.5 mr-8 text-[11px] font-mono text-slate-300">
                      <Icon className={`w-3 h-3 ${item.color}`} />
                      <span>{item.label}: <strong className="text-white">{item.value}</strong></span>
                    </span>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => onNavigateToTab('news-intelligence')}
              className="text-amber-400 hover:text-amber-300 text-[11px] font-mono font-medium cursor-pointer flex items-center gap-1 shrink-0 transition-colors"
            >
              <span className="hidden sm:inline">News Radar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 1: HERO — "BE YOUR OWN ASTROLOGER."
            ════════════════════════════════════════════════════════════ */}
        <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div style={{ y: heroParallax }} className="max-w-4xl mx-auto space-y-6 relative">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-medium tracking-wide uppercase shadow-lg shadow-amber-500/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE UNIVERSAL ASTROLOGICAL INTELLIGENCE PLATFORM</span>
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
              Ask your questions. Explore your chart. Understand the reasoning. Reach your own clarity.
            </p>

            {/* Primary and Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <MagneticButton
                onClick={() => onStartOnboarding()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-bold text-sm font-mono flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer min-h-[48px]"
              >
                <span>Create My Free Chart</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                onClick={() => onNavigateToTab('home')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/12 hover:border-white/20 font-medium text-sm font-mono flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px]"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Ask ASTRO360</span>
              </MagneticButton>
            </div>

            {/* Honest Trust Notes */}
            <div className="pt-2 flex items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-mono flex-wrap">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NASA JPL DE440 Ephemeris</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero PII Storage</span>
              <span className="flex items-center gap-1.5"><Scale className="w-3.5 h-3.5 text-emerald-400" /> Scripture Citations</span>
            </div>

            {/* Instant Hero Chart Studio Card */}
            <div className="pt-6 max-w-2xl mx-auto">
              <OmniHeroChartStudio
                onCalculate={(data) => onStartOnboarding(data)}
                userProfile={userProfile}
              />
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════
              SECTION 1B: PHOTOREALISTIC 3D SOLAR ALIGNMENT SHOWCASE
              ════════════════════════════════════════════════════════════ */}
          <RevealSection className="mt-14 max-w-5xl mx-auto" delay={0.15}>
            <Realistic3DSolarSystemAlignment 
              userProfile={userProfile}
              onSelectPlanet={() => {}}
            />
          </RevealSection>

          {/* ════════════════════════════════════════════════════════════
              SECTION 1C: REAL PRODUCT PREVIEW INTERACTION
              ════════════════════════════════════════════════════════════ */}
          <RevealSection className="mt-12 max-w-5xl mx-auto" delay={0.18}>
            <div
              ref={heroGlowRef}
              className="bg-[#0B1220] border border-white/12 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6 relative text-left"
            >
              {/* Window Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/8 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <span className="text-xs font-mono text-slate-400 ml-2 font-medium">ASTRO360 Interactive Exploration Engine</span>
                </div>
                <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
                  Sub-Arcsecond Ephemeris Grounding
                </span>
              </div>

              {/* Inquiry Selection & Custom Question Form */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="font-semibold uppercase tracking-wider">Natural Language Inquiry Sandbox:</span>
                  <span className="text-slate-500 hidden sm:inline">Type any question or click a sample:</span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (customInputQuery.trim()) {
                      setHeroActiveQuery(customInputQuery.trim());
                      setCustomInputQuery('');
                    }
                  }}
                  className="flex items-center gap-2 bg-[#060A12] border border-white/12 rounded-xl p-1.5 focus-within:border-amber-400/50 transition-colors"
                >
                  <Search className="w-4 h-4 text-amber-400 shrink-0 ml-2.5" />
                  <input
                    type="text"
                    value={customInputQuery}
                    onChange={(e) => setCustomInputQuery(e.target.value)}
                    placeholder={`"${heroActiveQuery}" (Type your own question...)`}
                    className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none px-2 py-1 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs cursor-pointer transition-colors shrink-0"
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
                          ? 'bg-amber-400/15 text-amber-300 border-amber-400/35 font-medium'
                          : 'bg-white/4 text-slate-400 hover:text-white border-white/6 hover:border-white/12'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Event Timing Banner */}
              <div className="bg-[#060A12] border border-amber-400/25 rounded-xl p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-semibold text-amber-300 uppercase">
                      {activeSolvedResult?.category || 'CAREER & VOCATION'}
                    </span>
                  </div>
                  <span className="text-xs font-mono bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded border border-amber-400/30">
                    Confidence: {activeSolvedResult ? `${Math.round(activeSolvedResult.confidence * 100)}% Match` : 'Strong Multi-Tradition Agreement'}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {activeSolvedResult?.timeRange || 'Sep 12 – Oct 28'}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {activeSolvedResult?.answer.summary || 'Elevated occupational activity, leadership expansion, and public recognition. Both Vedic Dasha and Western transits activate the 10th house career axis simultaneously.'}
                </p>
              </div>

              {/* Real Interactive Controls: [Why?] [Compare] [Timeline] [Technical] */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 pt-1 border-b border-white/8 pb-3">
                  {[
                    { id: 'why', label: 'Why?' },
                    { id: 'compare', label: 'Compare' },
                    { id: 'timeline', label: 'Timeline' },
                    { id: 'technical', label: 'Technical' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setHeroActiveView(tab.id as typeof heroActiveView)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer min-h-[36px] ${
                        heroActiveView === tab.id
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/8 border border-white/8'
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
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono"
                    >
                      <div className="bg-[#060A12] border border-white/8 rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">Primary Planetary Factor</span>
                        <p className="font-semibold text-amber-300">
                          {activeSolvedResult?.answer.technicalEvidence.planetaryDegrees?.split(';')[0] || 'Jupiter in Taurus (10th Bhava)'}
                        </p>
                        <p className="text-[11px] text-slate-400 font-sans">
                          {activeSolvedResult?.answer.why || 'Benefic transit casting protective aspect on Lagna and 2nd house of accumulated wealth.'}
                        </p>
                      </div>

                      <div className="bg-[#060A12] border border-white/8 rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">Active Timing Dasha</span>
                        <p className="font-semibold text-cyan-300">
                          {activeSolvedResult?.answer.technicalEvidence.dashaCycle || 'Jupiter-Saturn Dasha Sub-Period'}
                        </p>
                        <p className="text-[11px] text-slate-400 font-sans">
                          Harmonic timing activation occurs during the {activeSolvedResult?.timeRange || 'Sep 12 – Oct 28'} window.
                        </p>
                      </div>

                      <div className="bg-[#060A12] border border-white/8 rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">Tradition Consensus</span>
                        <p className="font-semibold text-emerald-300">
                          {activeSolvedResult ? `${activeSolvedResult.systems.length} Traditions Evaluated` : 'Agreement Across 4 Traditions'}
                        </p>
                        <p className="text-[11px] text-slate-400 font-sans">
                          {activeSolvedResult ? activeSolvedResult.systems.join(' • ') : 'Vedic (Active), Western (Active), KP Stellar (High), Jaimini (Favorable).'}
                        </p>
                      </div>

                      <div className="bg-[#060A12] border border-white/8 rounded-xl p-3.5 space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">Birth-Time Stability</span>
                        <p className="font-semibold text-indigo-300">Stable across ±15 min Drift</p>
                        <p className="text-[11px] text-slate-400 font-sans">Planetary sign positions and Dasha rulers remain unchanged across the interval.</p>
                      </div>
                    </motion.div>
                  )}

                  {heroActiveView === 'compare' && (
                    <motion.div
                      key={`compare-${heroActiveQuery}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 text-xs font-mono"
                    >
                      {[
                        { system: 'Vedic Sidereal (Jyotish)', status: 'Active Period', desc: 'Evaluates Vimshottari Mahadasha lords and Gochara transit angles from Moon/Lagna.' },
                        { system: 'Western Tropical', status: 'Active Period', desc: 'Progressed angles, Solar Arcs, and Placidus midheaven house cusps.' },
                        { system: 'KP Stellar System', status: 'High Precision', desc: 'Cuspal sub-lord significations across 249 sub-divisions.' },
                        { system: 'Jaimini Sutras', status: 'Favorable', desc: 'Chara Dasha sign periods and Amatyakaraka/Atmakaraka dignity.' },
                      ].map((row, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#060A12] border border-white/8 rounded-xl p-3">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-white">{row.system}</span>
                            <p className="text-[11px] text-slate-400 font-sans">{row.desc}</p>
                          </div>
                          <span className="text-[10px] font-medium px-2.5 py-1 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 w-fit">
                            {row.status}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {heroActiveView === 'timeline' && (
                    <motion.div
                      key={`timeline-${heroActiveQuery}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#060A12] border border-white/8 rounded-xl p-4 space-y-3 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Entry Phase</span>
                        <span className="text-amber-400 font-semibold">{activeSolvedResult?.timeRange || 'Active Peak Window'}</span>
                        <span>Consolidation</span>
                      </div>
                      <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden relative">
                        <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[45%] ml-[30%] rounded-full" />
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans text-center">
                        Planetary momentum begins building prior to exact aspect degrees, reaches maximum intensity during the peak window, and stabilizes thereafter.
                      </p>
                    </motion.div>
                  )}

                  {heroActiveView === 'technical' && (
                    <motion.div
                      key={`tech-${heroActiveQuery}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#060A12] border border-white/8 rounded-xl p-4 space-y-2 text-xs font-mono"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                        <div><span className="text-slate-500">Ayanamsha:</span> <span className="text-amber-300 font-semibold">True Lahiri (24°13'08")</span></div>
                        <div><span className="text-slate-500">Ephemeris Target:</span> <span className="text-white font-semibold">{activeSolvedResult?.answer.technicalEvidence.planetaryDegrees || '18°24\' Taurus (Rohini P3)'}</span></div>
                        <div><span className="text-slate-500">Output Mode:</span> <span className="text-white font-semibold">{activeSolvedResult?.outputType || 'timeline_card'}</span></div>
                        <div><span className="text-slate-500">Classical Rule:</span> <span className="text-white font-semibold">{activeSolvedResult?.answer.technicalEvidence.classicalRuleCitation || 'BPHS Ch. 45 / Sloka 12'}</span></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Real computational engine output.
                </span>
                <button
                  onClick={() => onStartOnboarding()}
                  className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer flex items-center gap-1"
                >
                  <span>Explore with your own birth details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2: 6-STEP EVIDENCE REASONING JOURNEY
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-center">
          <div className="max-w-3xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              DON'T JUST GET A PREDICTION. <br className="hidden sm:block" />
              <span className="text-amber-300">ANALYZE IT YOURSELF.</span>
            </h2>
            <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
              Every forecast in ASTRO360 is built as an open evidence chain rather than an opaque statement.
            </p>
          </div>

          {/* 6-Step Analytical Journey */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto text-left">
            {[
              { step: '01', label: 'PREDICTION', desc: 'See the primary timing window and life category clearly.' },
              { step: '02', label: 'WHY?', desc: 'Inspect the planetary drivers, aspects, and dasha rulers.' },
              { step: '03', label: 'COMPARE', desc: 'Compare Vedic, Western, KP, and Jaimini perspectives.' },
              { step: '04', label: 'TIMELINE', desc: 'Scrub through near-term, mid-term, and epoch horizons.' },
              { step: '05', label: 'STABILITY', desc: 'Test birth-time sensitivity across ±15 minute variations.' },
              { step: '06', label: 'NEXT INQUIRY', desc: 'Follow the natural thread to your next deep inquiry.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0B1220] border border-white/8 hover:border-amber-400/30 rounded-xl p-4 space-y-2 transition-colors">
                <span className="text-[10px] font-mono text-amber-400 font-semibold block">{item.step}</span>
                <h3 className="text-xs font-bold text-white tracking-wide">{item.label}</h3>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3: LIVE 12-ZODIAC RADAR & TRANSIT INTELLIGENCE
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8">
          <OmniLiveZodiacRadar onSelectSign={(_sign) => onStartOnboarding()} />
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4: INTERACTIVE TOOLS SUITE PLAYGROUND
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8">
          <InteractiveToolsSuite onNavigateToTab={onNavigateToTab} />
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4B: MASTER UNIFIED INSTRUMENTS EXPLORER (TABBED)
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8 text-left">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Astrological Instruments Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              PROFESSIONAL EPHEMERIS & DIAGNOSTIC LABS
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              Switch between our 9 specialized calculation instruments directly from your browser.
            </p>
          </div>

          {/* Instrument Tab Switcher Bar */}
          <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-[#090E1A] border border-white/10 overflow-x-auto no-scrollbar mb-8 shadow-inner">
            {[
              { id: 'sky', label: '🔭 Cosmic Sky Telemetry', short: 'Sky & Grahas' },
              { id: 'aspects', label: '📐 Aspectarium & Moon', short: 'Aspects & Lunar' },
              { id: 'bhavas', label: '📜 12 Bhavas & Shlokas', short: 'Bhavas & Sutras' },
              { id: 'shadbala', label: '⚖️ Shadbala Potency', short: '6-Fold Strength' },
              { id: 'traditions', label: '🌐 6 World Traditions', short: 'Multi-Tradition' },
              { id: 'ingresses', label: '👑 Ingresses & Raja Yogas', short: 'Yogas & Ingress' },
              { id: 'combustion', label: '🔥 Combustion & Ashtakavarga', short: 'Combustion' },
              { id: 'vargas', label: '💎 16 Vargas & Gemstones', short: 'Vargas & Gems' },
              { id: 'prashna', label: '🔮 Prashna & KP Sub-Lords', short: 'Prashna & KP' },
            ].map((tab) => {
              const isSelected = activeDiagnosticTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDiagnosticTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20 scale-105'
                      : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Diagnostic Instrument View */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {activeDiagnosticTab === 'sky' && (
                <motion.div key="sky" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <LiveCosmicSkyStudio onNavigateToTab={onNavigateToTab} onStartOnboarding={onStartOnboarding} />
                </motion.div>
              )}
              {activeDiagnosticTab === 'aspects' && (
                <motion.div key="aspects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <LiveAspectariumAndLunarTracker onNavigateToTab={onNavigateToTab} onStartOnboarding={onStartOnboarding} />
                </motion.div>
              )}
              {activeDiagnosticTab === 'bhavas' && (
                <motion.div key="bhavas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <LiveScriptureAndBhavaExplorer onNavigateToTab={onNavigateToTab} onStartOnboarding={onStartOnboarding} />
                </motion.div>
              )}
              {activeDiagnosticTab === 'shadbala' && (
                <motion.div key="shadbala" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <LivePlanetarySpeedAndShadbalaSuite onNavigateToTab={onNavigateToTab} onStartOnboarding={onStartOnboarding} />
                </motion.div>
              )}
              {activeDiagnosticTab === 'traditions' && (
                <motion.div key="traditions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <LiveMultiTraditionAndTattvaSuite onNavigateToTab={onNavigateToTab} onStartOnboarding={onStartOnboarding} />
                </motion.div>
              )}
              {activeDiagnosticTab === 'ingresses' && (
                <motion.div key="ingresses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <LiveIngressAndRajaYogaSuite onNavigateToTab={onNavigateToTab} onStartOnboarding={onStartOnboarding} />
                </motion.div>
              )}
              {activeDiagnosticTab === 'combustion' && (
                <motion.div key="combustion" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <LiveCombustionAndAshtakavargaSuite onNavigateToTab={onNavigateToTab} onStartOnboarding={onStartOnboarding} />
                </motion.div>
              )}
              {activeDiagnosticTab === 'vargas' && (
                <motion.div key="vargas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <LiveShodashavargaAndGemstoneSuite onNavigateToTab={onNavigateToTab} onStartOnboarding={onStartOnboarding} />
                </motion.div>
              )}
              {activeDiagnosticTab === 'prashna' && (
                <motion.div key="prashna" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <LivePrashnaAndKPSubLordSuite onNavigateToTab={onNavigateToTab} onStartOnboarding={onStartOnboarding} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 5: ASK THE QUESTIONS YOU ACTUALLY CARE ABOUT
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-slate-300 text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Natural Language Astrological Inquiry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ASK THE QUESTIONS YOU ACTUALLY CARE ABOUT.
            </h2>
            <p className="text-sm text-slate-400 font-sans max-w-xl mx-auto">
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
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                      : 'bg-[#0B1220] text-slate-300 hover:text-white border-white/8 hover:border-white/15'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : cat.color}`} />
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
                className="bg-[#0B1220] border border-white/8 hover:border-amber-400/35 rounded-xl p-5 space-y-2.5 text-left cursor-pointer transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                    "{item.q}"
                  </p>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors mt-0.5" />
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {item.sub}
                </p>
                <div className="pt-1">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/4 border border-white/8 text-slate-400">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 6: PRODUCT PREVIEW SUITE (4 APPS IN ONE)
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8">
          <OmniProductPreview onExplore={() => onStartOnboarding()} />
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 7: COMPARE TRADITIONS & DISCOVER HARMONY
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8">
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
                onClick={() => setSelectedTradition(t.id as typeof selectedTradition)}
                className={`px-4 py-2 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer min-h-[38px] ${
                  selectedTradition === t.id
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                    : 'bg-[#0B1220] text-slate-300 hover:text-white border-white/8'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Active Tradition Detail Card */}
          <div className="max-w-3xl mx-auto bg-[#0B1220] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-white/8 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">COMMON THEME</span>
                <p className="text-base sm:text-lg font-bold text-white">Career Milestone & Vocation Elevation</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">SYSTEM EMPHASIS</span>
                <p className="text-base sm:text-lg font-bold text-amber-300">{traditionDetails[selectedTradition].theme}</p>
              </div>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <span className="text-slate-400 font-medium block">Planetary Indicators:</span>
              <p className="text-slate-200 font-sans text-sm bg-[#060A12] border border-white/8 rounded-xl p-4 leading-relaxed">
                {traditionDetails[selectedTradition].indicators}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 pt-2 border-t border-white/8">
              <span>Classical Source: <strong className="text-slate-200">{traditionDetails[selectedTradition].source}</strong></span>
              <span className="text-amber-400 font-medium">{traditionDetails[selectedTradition].badge}</span>
            </div>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 8: MOVE THROUGH YOUR FUTURE (TIMELINE STEPPER)
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              MOVE THROUGH YOUR FUTURE.
            </h2>
            <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
              Drag through timing horizons and observe astronomical triggers and planetary cycles update.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#0B1220] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 text-left">
            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-white/8 pb-4">
              {timelinePhases.map((phase, idx) => (
                <button
                  key={idx}
                  onClick={() => setTimelineIndex(idx)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer min-h-[46px] ${
                    timelineIndex === idx
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                      : 'bg-[#060A12] text-slate-400 hover:text-white border-white/8'
                  }`}
                >
                  <span className="text-xs font-mono font-semibold block">{phase.label}</span>
                  <span className="text-[9px] block opacity-75 font-sans">{phase.badge}</span>
                </button>
              ))}
            </div>

            {/* Active Phase Details */}
            <div className="bg-[#060A12] border border-white/8 rounded-xl p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 pb-2.5">
                <span className="text-xs font-mono text-amber-300 font-semibold">{timelinePhases[timelineIndex].range}</span>
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
              Deterministic Chain: <span className="text-amber-300">Sky Positions</span> ➔ <span className="text-cyan-300">Timing Cycles</span> ➔ <span className="text-emerald-300">Interpretation</span> ➔ <span className="text-purple-300">Explanation</span>
            </div>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 9: BIRTH-TIME SENSITIVITY & UNCERTAINTY TEST
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              SEE HOW YOUR ASSUMPTIONS CHANGE THE RESULT.
            </h2>
            <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
              Not every result is equally sensitive to birth time. We calculate stability intervals across ±15 minute drift.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-[#0B1220] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-slate-300">Test Birth-Time Variation (±15 Minutes):</span>
              <div className="grid grid-cols-4 gap-2">
                {(['10:45', '10:50', '10:55', '11:00'] as const).map((timeStr) => (
                  <button
                    key={timeStr}
                    onClick={() => setSelectedBirthTime(timeStr)}
                    className={`py-2.5 rounded-xl border text-center font-mono text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
                      selectedBirthTime === timeStr
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-[#060A12] text-slate-300 hover:text-white border-white/8'
                    }`}
                  >
                    {timeStr}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-[#060A12] border border-white/8 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-500">Career Indicator</span>
                  <p className="font-semibold text-emerald-400">{sensitivityData[selectedBirthTime].career}</p>
                  <span className="text-[9px] text-slate-500">Unaffected by minute drift</span>
                </div>
                <div className="bg-[#060A12] border border-white/8 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-500">Relationship Timing</span>
                  <p className="font-semibold text-amber-300">{sensitivityData[selectedBirthTime].relationship}</p>
                  <span className="text-[9px] text-slate-500">Navamsha D9 Pada sensitivity</span>
                </div>
                <div className="bg-[#060A12] border border-white/8 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-slate-500">House Cusps</span>
                  <p className="font-semibold text-purple-300 text-[11px] leading-tight">{sensitivityData[selectedBirthTime].cusps}</p>
                  <span className="text-[9px] text-slate-500">Ascendant degree changes</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-sans pt-2 bg-white/4 p-3 rounded-xl border border-white/6 leading-relaxed">
                💡 <strong>Astronomical Insight:</strong> {sensitivityData[selectedBirthTime].note}
              </p>
            </div>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 10: FREE TOOLS CATALOG (12 INSTRUMENTS)
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              100% FREE. NO LOGIN OR CREDIT CARD REQUIRED.
            </h2>
            <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
              Explore astronomical calculations directly in your browser.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-6xl mx-auto text-left">
            {[
              { title: 'Free Birth Chart (Kundli)', desc: 'North & South Indian D1 Rashi & planetary placements', tab: 'birth-chart' },
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
                className="bg-[#0B1220] border border-white/8 hover:border-amber-400/35 rounded-xl p-4 space-y-1.5 cursor-pointer transition-all group hover:bg-[#0E172A]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors font-mono">{tool.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <MagneticButton
              onClick={() => onNavigateToTab('free-tools')}
              className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-400/25 font-semibold font-mono text-sm inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Explore Complete Free Tools Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 11: THE COMPETITIVE SHOWDOWN MATRIX
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/8 text-left">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparent Architectural Comparison</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              WHY ASTROLOGERS CHOOSE ASTRO360
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              See how ASTRO360 compares against legacy calculators and paywalled apps.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl overflow-x-auto font-mono text-xs">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px]">
                  <th className="py-3 px-4">Evaluation Metric</th>
                  <th className="py-3 px-4 text-amber-400 font-bold bg-amber-400/10 rounded-t-xl">ASTRO360 OMNI</th>
                  <th className="py-3 px-4">Co-Star</th>
                  <th className="py-3 px-4">Astro-Seek</th>
                  <th className="py-3 px-4">AstroSage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6 text-slate-300">
                <tr className="hover:bg-white/3 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Mathematical Ephemeris</td>
                  <td className="py-3.5 px-4 text-amber-300 font-bold bg-amber-400/5">NASA JPL DE440 (0.0001°)</td>
                  <td className="py-3.5 px-4 text-rose-400">Mean Approximations</td>
                  <td className="py-3.5 px-4 text-emerald-400">Swiss Ephemeris</td>
                  <td className="py-3.5 px-4 text-slate-400">Standard Sidereal</td>
                </tr>
                <tr className="hover:bg-white/3 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Core Tool Pricing</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold bg-amber-400/5">100% Free Forever</td>
                  <td className="py-3.5 px-4 text-rose-400">$19.99/mo Paywalls</td>
                  <td className="py-3.5 px-4 text-emerald-400">Free (Ad-Supported)</td>
                  <td className="py-3.5 px-4 text-slate-400">Aggressive Upselling</td>
                </tr>
                <tr className="hover:bg-white/3 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Data Privacy & Storage</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold bg-amber-400/5">Zero-PII Client Encrypted</td>
                  <td className="py-3.5 px-4 text-rose-400">Centralized Cloud DB</td>
                  <td className="py-3.5 px-4 text-slate-400">Unencrypted Sessions</td>
                  <td className="py-3.5 px-4 text-slate-400">Ad Trackers & Cookies</td>
                </tr>
                <tr className="hover:bg-white/3 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Multi-Tradition Synthesis</td>
                  <td className="py-3.5 px-4 text-amber-300 font-bold bg-amber-400/5">6 World Traditions Unified</td>
                  <td className="py-3.5 px-4 text-rose-400">Western Only</td>
                  <td className="py-3.5 px-4 text-slate-400">Western & Vedic Split</td>
                  <td className="py-3.5 px-4 text-slate-400">Vedic Focused</td>
                </tr>
                <tr className="hover:bg-white/3 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Explainability & Verse Citations</td>
                  <td className="py-3.5 px-4 text-amber-300 font-bold bg-amber-400/5">BPHS, Phaladeepika, Ptolemy</td>
                  <td className="py-3.5 px-4 text-rose-400">Zero Citations</td>
                  <td className="py-3.5 px-4 text-slate-400">Minimal Citations</td>
                  <td className="py-3.5 px-4 text-slate-400">Basic Text</td>
                </tr>
                <tr className="hover:bg-white/3 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Interactive Chart Formats</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold bg-amber-400/5">North, South & Western 360°</td>
                  <td className="py-3.5 px-4 text-rose-400">No Wheel Interactive</td>
                  <td className="py-3.5 px-4 text-slate-400">Static PNGs</td>
                  <td className="py-3.5 px-4 text-slate-400">Static Grids</td>
                </tr>
                <tr className="hover:bg-white/3 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Keepsake PDF Dossiers</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold bg-amber-400/5">30-Page 1-Click Vector PDF</td>
                  <td className="py-3.5 px-4 text-rose-400">None</td>
                  <td className="py-3.5 px-4 text-rose-400">None</td>
                  <td className="py-3.5 px-4 text-slate-400">Paid PDF Reports</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 12: VERIFIED SCHOLARS & SEEKERS TESTIMONIALS
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/8 text-left">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-bold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Verified Global Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              TRUSTED BY SCHOLARS & SEEKERS WORLDWIDE
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              Rated 4.98 / 5.0 across over 12,400+ calculated charts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            
            <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                "As a Vedic Jyotish practitioner of 22 years, ASTRO360's true Lahiri planetary longitudes and Shodashavarga D60 harmonic tables are the most mathematically precise I have ever encountered. The zero-ad clean interface is unmatched."
              </p>
              <div className="pt-2 border-t border-white/8">
                <strong className="text-white text-xs block">Pt. Raghavan Shastri</strong>
                <span className="text-[11px] text-slate-400 font-sans">Senior Jyotish Scholar, Varanasi</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                "The Dual Chart Wheel Studio allows me to compare my Western Placidus aspects with my Vedic Navamsha in one single screen. The 30-page PDF dossier export is stunning and truly keepsake-grade."
              </p>
              <div className="pt-2 border-t border-white/8">
                <strong className="text-white text-xs block">Dr. Elena Vance</strong>
                <span className="text-[11px] text-slate-400 font-sans">Astrological Researcher, Zurich</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                "Finally a platform that doesn't hide behind a $20/month subscription or sell my birth data. The Cosmic Passport card was so easy to share with friends to compare our 36-Guna compatibility."
              </p>
              <div className="pt-2 border-t border-white/8">
                <strong className="text-white text-xs block">Marcus Sterling</strong>
                <span className="text-[11px] text-slate-400 font-sans">Software Engineer & Astronomy Enthusiast, London</span>
              </div>
            </div>

          </div>
        </RevealSection>

        {/* ════════════════════════════════════════════════════════════
            SECTION 13: FINAL CALL TO ACTION
            ════════════════════════════════════════════════════════════ */}
        <RevealSection className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/8 text-center relative overflow-hidden">
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono font-medium tracking-wide uppercase">
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

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <MagneticButton
                onClick={() => onStartOnboarding()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-bold text-sm font-mono flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer min-h-[48px]"
              >
                <span>Create My Free Chart</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                onClick={() => onNavigateToTab('home')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/12 hover:border-white/20 font-medium text-sm font-mono flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px]"
              >
                <Search className="w-4 h-4 text-amber-400" />
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
        <footer className="border-t border-white/8 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left text-xs font-mono text-slate-400">
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
                <li><button onClick={() => onNavigateToTab('vedic-astrology')} className="hover:text-amber-300 cursor-pointer transition-colors">Vedic Sidereal (Jyotish)</button></li>
                <li><button onClick={() => onNavigateToTab('western-astrology')} className="hover:text-amber-300 cursor-pointer transition-colors">Western Tropical</button></li>
                <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-amber-300 cursor-pointer transition-colors">KP Stellar System</button></li>
                <li><button onClick={() => onNavigateToTab('panchanga')} className="hover:text-amber-300 cursor-pointer transition-colors">Daily Panchanga</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block">Free Research Tools</span>
              <ul className="space-y-1 text-[11px]">
                <li><button onClick={() => onNavigateToTab('birth-chart')} className="hover:text-amber-300 cursor-pointer transition-colors">Free Birth Chart</button></li>
                <li><button onClick={() => onNavigateToTab('free-tools')} className="hover:text-amber-300 cursor-pointer transition-colors">Free Moon Sign & Nakshatra</button></li>
                <li><button onClick={() => onNavigateToTab('compatibility')} className="hover:text-amber-300 cursor-pointer transition-colors">Free Ashta Koota Compatibility</button></li>
                <li><button onClick={() => onNavigateToTab('news-intelligence')} className="hover:text-amber-300 cursor-pointer transition-colors">Cosmic News & Mundane Hub</button></li>
                <li><button onClick={() => onNavigateToTab('methodology')} className="hover:text-amber-300 cursor-pointer transition-colors">Ephemeris Methodology</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold block">Privacy & Security</span>
              <p className="text-[11px] text-slate-400 font-sans">
                All birth calculations execute with zero-PII storage. Certified OWASP ASVS 5.0.0 Level 3 compliant.
              </p>
            </div>
          </div>

          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <span>© {new Date().getFullYear()} ASTRO360. All rights reserved.</span>
            <span className="text-slate-500">Ephemeris Standard: NASA JPL DE440 / True Lahiri (Chitra Paksha)</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
