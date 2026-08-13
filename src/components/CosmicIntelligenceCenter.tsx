import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  Sparkles, Sun, Moon, Compass, CloudMoon, Bot, Clock, Activity,
  Search, ShieldCheck, Heart, Award, User, Users, Wrench, X, ChevronRight, Globe2, Layers,
  BookOpen, ArrowUpRight, CheckCircle2, RotateCcw, Zap, HelpCircle, AlertTriangle,
  Briefcase, Brain
} from 'lucide-react';
import { type UserProfile } from '../types';
import AstrologyTargetProfileModal, { type AstrologyTargetProfile } from './AstrologyTargetProfileModal';
import { 
  calculatePlanetaryPositions, 
  calculatePanchang, 
  calculateVimshottariDasha, 
  type PlanetPosition, 
  type PanchangInfo, 
  type VimshottariDashaInfo 
} from '../lib/astroCalculations';
import CelestialZodiacOrbit from './CelestialZodiacOrbit';
import { BorderBeam } from './magicui/border-beam';
import { ShimmerButton } from './magicui/shimmer-button';
import { Marquee } from './magicui/marquee';
import { NumberTicker } from './magicui/number-ticker';
import { BentoGrid, BentoCard } from './magicui/bento-grid';
import { SplitText } from './reactbits/SplitText';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { MagnetButton } from './reactbits/MagnetButton';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import CosmicParticleBackground from './CosmicParticleBackground';
import PlanetaryAspectGraph from './PlanetaryAspectGraph';
import CosmicAnalyticsKPI from './CosmicAnalyticsKPI';
import EphemerisDataTable from './EphemerisDataTable';
import CosmicTransitCalendar from './CosmicTransitCalendar';
import DailyMuhurtaPlanner from './DailyMuhurtaPlanner';
import LunarMansionsWheel from './LunarMansionsWheel';
import SynastryOverlayChart from './SynastryOverlayChart';
import AstrologicalMindMap from './AstrologicalMindMap';
import CosmicChartAnalytics from './CosmicChartAnalytics';
import GlobalLanguageSelector from './GlobalLanguageSelector';
import DivisionalChartsSuite from './DivisionalChartsSuite';
import AstrologyLearningHub from './AstrologyLearningHub';
import ExecutiveReportGenerator from './ExecutiveReportGenerator';
import CommunityConsultationHub from './CommunityConsultationHub';

import BirthTimeRectificationSuite from './BirthTimeRectificationSuite';
import GemstoneRudrakshaSuite from './GemstoneRudrakshaSuite';
import NumerologyNameSuite from './NumerologyNameSuite';
import TarotIChingSuite from './TarotIChingSuite';
import TimeHorizonForecastSuite from './TimeHorizonForecastSuite';
import DoshaRemedyEngine from './DoshaRemedyEngine';
import CosmicBiorhythmTracker from './CosmicBiorhythmTracker';
import SacredChakraAlignment from './SacredChakraAlignment';
import CosmicFengShuiMatrix from './CosmicFengShuiMatrix';
import ElectionalMuhurtaEngine from './ElectionalMuhurtaEngine';
import PlanetaryHorasTracker from './PlanetaryHorasTracker';
import SacredMantraSoundboard from './SacredMantraSoundboard';
import PlanetaryTransitRadar from './PlanetaryTransitRadar';
import PanchangDeitiesEngine from './PanchangDeitiesEngine';
import CosmicCompassVisualizer from './CosmicCompassVisualizer';
import AstroCartographyMatrix from './AstroCartographyMatrix';
import TarikIslamCosmicPassport from './TarikIslamCosmicPassport';
import { useGlobalConfig } from '../context/GlobalConfigContext';
import { fadeInUp, staggerContainer, staggerItem, scaleIn, cardHoverProps, buttonPressProps } from '../lib/animationPresets';

interface CosmicIntelligenceCenterProps {
  onNavigate: (tab: string) => void;
  userProfile: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
}

const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const SUN_HOUSE_DIAGNOSTICS: Record<number, { what: string; solution: string }> = {
  1: {
    what: "High vital energy driving personal re-invention, leadership initiatives, and self-identity alignment.",
    solution: "Focus morning hours on physical discipline, personal strategy, and high-visibility leadership decisions."
  },
  2: {
    what: "Financial restructuring, accumulated wealth focus, and evaluation of speech & family resources.",
    solution: "Consolidate financial assets, review long-term investments, and engage in harmonious family communication."
  },
  3: {
    what: "Surge in courage, creative writing, digital media projects, and skill acquisition.",
    solution: "Channel mental drive into short-term execution goals, publication, and collaborative networking."
  },
  4: {
    what: "Deep focus on domestic harmony, property matters, mental peace, and foundational stability.",
    solution: "Establish clear work-life boundaries, optimize living spaces, and practice grounding meditation."
  },
  5: {
    what: "Expansion of creative intellect, speculative insights, educational pursuits, and romantic joy.",
    solution: "Take calculated strategic risks, dedicate time to analytical learning, and foster creative hobbies."
  },
  6: {
    what: "Active problem-solving around daily work routines, health optimization, and competitive hurdles.",
    solution: "Implement strict dietary and fitness protocols, resolve pending tasks, and eliminate operational bottlenecks."
  },
  7: {
    what: "Emphasis on strategic business partnerships, client negotiations, and core interpersonal contracts.",
    solution: "Prioritize transparent communication in agreements, balance partner expectations, and seek win-win terms."
  },
  8: {
    what: "Transformative internal shift, research orientation, sudden insights, and unearned asset management.",
    solution: "Embrace psychological introspection, avoid speculative gambles, and study occult or deep technical subjects."
  },
  9: {
    what: "Philosophical expansion, mentor interactions, higher academic learning, and auspicious long-distance plans.",
    solution: "Seek advice from experienced mentors, study foundational texts, and plan strategic travel or growth."
  },
  10: {
    what: "Peak focus on professional career growth, executive authority, public reputation, and major deliverables.",
    solution: "Lead critical projects during solar hours, maintain transparent public accountability, and execute key deliverables."
  },
  11: {
    what: "Monetary gains, social network expansion, community influence, and fulfillment of long-term desires.",
    solution: "Leverage group synergies, engage with high-value professional networks, and scale existing income streams."
  },
  12: {
    what: "Subconscious healing, international connections, spiritual retreat, and expenditure auditing.",
    solution: "Audit monthly overhead expenses, practice nightly meditation, and explore international opportunities."
  }
};

const MAHADASHA_DIAGNOSTICS: Record<string, string> = {
  Sun: "Sun Mahadasha demands solar discipline, clear boundaries, and confident execution.",
  Moon: "Moon Mahadasha highlights emotional intelligence, intuitive decision-making, and public resonance.",
  Mars: "Mars Mahadasha injects decisive action, technical problem-solving, and physical vitality.",
  Mercury: "Mercury Mahadasha accelerates analytical speed, trade, writing, and digital communications.",
  Jupiter: "Jupiter Mahadasha brings expansive wisdom, ethical wealth creation, and spiritual clarity.",
  Venus: "Venus Mahadasha fosters creative aesthetics, harmonious relationships, and luxury refinement.",
  Saturn: "Saturn Mahadasha enforces structural rigor, patience, long-term perseverance, and karmic duty.",
  Rahu: "Rahu Mahadasha activates rapid innovation, unconventional paths, and global ambitions.",
  Ketu: "Ketu Mahadasha encourages deep analytical research, spiritual detachment, and intuitive breakthroughs."
};

const DAILY_HOROSCOPE_DICTIONARY: Record<string, { theme: string; career: string; love: string; health: string; luckyNumber: number; luckyColor: string; overallScore: number }> = {
  'Aries': { theme: 'Bold action brings unexpected rewards today. Mars fuels your ambition.', career: 'A leadership opportunity may present itself. Speak up in meetings.', love: 'Passion runs high — express your feelings directly.', health: 'High energy; channel it through vigorous exercise.', luckyNumber: 9, luckyColor: 'Red', overallScore: 85 },
  'Taurus': { theme: 'Stability meets transformation. Venus brings comfort and beauty.', career: 'Financial matters favor careful planning and long-term investments.', love: 'Sensual energy surrounds you — plan a romantic evening.', health: 'Focus on nourishing foods and grounding activities.', luckyNumber: 6, luckyColor: 'Emerald', overallScore: 78 },
  'Gemini': { theme: 'Communication channels open wide. Mercury sharpens your intellect.', career: 'Networking pays dividends today. Make those connections.', love: 'Stimulating conversations lead to deeper bonds.', health: 'Mental stimulation is key — try puzzles or reading.', luckyNumber: 5, luckyColor: 'Yellow', overallScore: 82 },
  'Cancer': { theme: 'Emotional depth brings wisdom. The Moon illuminates your inner world.', career: 'Trust your intuition about a work decision.', love: 'Nurturing energy draws others to you naturally.', health: 'Water-based activities restore your energy.', luckyNumber: 2, luckyColor: 'Silver', overallScore: 75 },
  'Leo': { theme: 'Your radiance attracts abundance. The Sun crowns your endeavors.', career: 'Creative projects receive recognition. Step into the spotlight.', love: 'Generosity in love returns tenfold today.', health: 'Heart-centered activities and golden sunlight energize you.', luckyNumber: 1, luckyColor: 'Gold', overallScore: 92 },
  'Virgo': { theme: 'Precision and service create opportunities. Mercury refines your vision.', career: 'Detail-oriented work wins praise from superiors.', love: 'Acts of service speak louder than words today.', health: 'Digestive health benefits from mindful eating.', luckyNumber: 7, luckyColor: 'Forest Green', overallScore: 80 },
  'Libra': { theme: 'Harmony and justice guide your path. Venus bestows grace.', career: 'Diplomatic skills resolve a lingering workplace tension.', love: 'Partnership energy is strong — collaborate and co-create.', health: 'Balance active and rest periods equally today.', luckyNumber: 6, luckyColor: 'Rose', overallScore: 83 },
  'Scorpio': { theme: 'Transformation deepens your power. Pluto reveals hidden truths.', career: 'Research and investigation lead to breakthrough insights.', love: 'Vulnerability creates true intimacy — let walls down.', health: 'Detox and renewal practices restore vitality.', luckyNumber: 8, luckyColor: 'Crimson', overallScore: 88 },
  'Sagittarius': { theme: 'Adventure calls your spirit. Jupiter expands horizons.', career: 'International connections or higher learning opportunities arise.', love: 'Shared adventures strengthen romantic bonds.', health: 'Outdoor activities and travel invigorate body and soul.', luckyNumber: 3, luckyColor: 'Purple', overallScore: 86 },
  'Capricorn': { theme: 'Discipline builds lasting legacy. Saturn rewards patience.', career: 'Long-term planning today yields compound returns tomorrow.', love: 'Commitment and reliability deepen trust in relationships.', health: 'Bone and joint care; structured exercise routines help.', luckyNumber: 4, luckyColor: 'Charcoal', overallScore: 77 },
  'Aquarius': { theme: 'Innovation disrupts the ordinary. Uranus sparks genius.', career: 'Unconventional approaches solve problems others can\'t.', love: 'Intellectual connection matters more than tradition today.', health: 'Circulation and nervous system benefit from meditation.', luckyNumber: 11, luckyColor: 'Electric Blue', overallScore: 84 },
  'Pisces': { theme: 'Intuition flows like water. Neptune deepens spiritual sight.', career: 'Creative and artistic pursuits are especially favored.', love: 'Empathic connections create soulful moments.', health: 'Swimming and water therapy restore energetic balance.', luckyNumber: 12, luckyColor: 'Sea Green', overallScore: 79 },
};

/**
 * CSS-Animated Moon Phase Graphic Component
 */
function MoonPhaseVisual({ panchang }: { panchang: PanchangInfo }) {
  const illumination = panchang.moonIllumination ?? 50;
  const isWaxing = panchang.moonPhase.toLowerCase().includes('waxing');
  
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3 text-center relative overflow-hidden group">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-[#06B6D4]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Animated Graphic Disc */}
      <motion.div 
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.25)] border border-[#06B6D4]/40"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full rounded-full">
          <defs>
            <radialGradient id="moonSurface" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </radialGradient>
            <radialGradient id="moonShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B1220" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0.98" />
            </radialGradient>
          </defs>
          
          {/* Base Illuminated Disc */}
          <circle cx="50" cy="50" r="48" fill="url(#moonSurface)" />
          
          {/* Subtle Craters */}
          <circle cx="35" cy="40" r="6" fill="#CBD5E1" opacity="0.4" />
          <circle cx="60" cy="30" r="8" fill="#CBD5E1" opacity="0.3" />
          <circle cx="45" cy="65" r="10" fill="#CBD5E1" opacity="0.35" />
          <circle cx="70" cy="60" r="5" fill="#CBD5E1" opacity="0.4" />

          {/* Dynamic Phase Shadow Overlay */}
          <path
            d={
              illumination >= 95
                ? ''
                : illumination <= 5
                ? 'M 50 2 A 48 48 0 0 1 50 98 A 48 48 0 0 1 50 2 Z'
                : isWaxing
                ? `M 50 2 A 48 48 0 0 1 50 98 A ${Math.abs(50 - illumination) * 0.96} 48 0 0 ${illumination > 50 ? 1 : 0} 50 2 Z`
                : `M 50 2 A 48 48 0 0 0 50 98 A ${Math.abs(50 - illumination) * 0.96} 48 0 0 ${illumination > 50 ? 0 : 1} 50 2 Z`
            }
            fill="url(#moonShadow)"
          />
        </svg>

        {/* Illumination % Badge */}
        <span className="absolute -bottom-1 text-[10px] font-mono font-bold bg-[#0B1220]/90 text-[#06B6D4] px-2 py-0.5 rounded-full border border-[#06B6D4]/40 shadow-md">
          {illumination}% Illuminated
        </span>
      </motion.div>

      <div>
        <h4 className="text-xs font-bold text-white tracking-wide">{panchang.moonPhase}</h4>
        <p className="text-[10px] font-mono text-[#94A3B8] pt-0.5">{panchang.tithi}</p>
      </div>
    </div>
  );
}

export default function CosmicIntelligenceCenter({ onNavigate, userProfile, onUpdateProfile }: CosmicIntelligenceCenterProps) {
  // Target Profile Modal State ("For Whom")
  const [isTargetModalOpen, setIsTargetModalOpen] = useState<boolean>(false);
  const [targetProfile, setTargetProfile] = useState<AstrologyTargetProfile>({
    targetType: 'self',
    name: userProfile.name || 'Tarik Islam',
    gender: 'universal',
    dob: userProfile.dob || '1998-06-15',
    time: userProfile.time || '12:00',
    location: userProfile.location || 'Mecca, Saudi Arabia',
    preferredSystem: 'vedic',
    predictionFocus: 'wealth'
  });

  // Selected Planet for Detail Modal
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);

  // Daily Horoscope Sign Selection State
  const [selectedHoroscopeSign, setSelectedHoroscopeSign] = useState<string>('Leo');
  const selectedHoroscopeInsight = useMemo(() => DAILY_HOROSCOPE_DICTIONARY[selectedHoroscopeSign] || DAILY_HOROSCOPE_DICTIONARY['Leo'], [selectedHoroscopeSign]);

  // Global Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const { config, updateConfig } = useGlobalConfig();
  const selectedReligionView = config.faithPerspective || 'universal';
  const setSelectedReligionView = (v: any) => updateConfig({ faithPerspective: v });
  const selectedLanguage = config.language || 'en';
  const setSelectedLanguage = (l: any) => updateConfig({ language: l });
  const [isBetaBannerVisible, setIsBetaBannerVisible] = useState<boolean>(true);

  // Multi-Language Dictionary for Dashboard Labels
  const i18n = useMemo(() => {
    const dict = {
      en: {
        welcome: "Welcome Back",
        systemActive: "SYSTEM ACTIVE",
        todaysDiagnostics: "Today's Cosmic Diagnostic & Solution",
        ephemerisPositions: "Live Ephemeris Positions (Computed)",
        activeDasha: "Active Dasha Period",
        quickActions: "Essential Quick Actions",
        viewByReligion: "Filter Dashboard Perspective by Faith / Tradition:",
        languageSelect: "Language / اللُّغَة:"
      },
      ar: {
        welcome: "مرحباً بعودتك",
        systemActive: "النظام نشط",
        todaysDiagnostics: "التشخيص الكوني والحل اليومي",
        ephemerisPositions: "مواقع الكواكب الحية الحسابية",
        activeDasha: "الفترة الفلكية النشطة (الدشا)",
        quickActions: "الإجراءات السريعة الأساسية",
        viewByReligion: "تصفية لوحة التحكم حسب الديانة / التقليد:",
        languageSelect: "Language / اللُّغَة:"
      },
      hi: {
        welcome: "पुनः स्वागत है",
        systemActive: "सिस्टम सक्रिय",
        todaysDiagnostics: "आज का कॉस्मिक निदान और समाधान",
        ephemerisPositions: "लाइव ग्रह स्थिति (गणना की गई)",
        activeDasha: "सक्रिय दशा अवधि",
        quickActions: "आवश्यक त्वरित कार्य",
        viewByReligion: "धर्म / परंपरा द्वारा डैशबोर्ड फ़िल्टर करें:",
        languageSelect: "भाषा / Language:"
      },
      ur: {
        welcome: "خوش آمدید",
        systemActive: "سسٹم فعال ہے",
        todaysDiagnostics: "آج کا کاسمک تشخیص اور حل",
        ephemerisPositions: "لائیو سیاروں کی پوزیشنیں",
        activeDasha: "فعال دشا کی مدت",
        quickActions: "اہم فوری اقدامات",
        viewByReligion: "مذہب / روایت کے لحاظ سے ڈیش بورڈ فلٹر کریں:",
        languageSelect: "زبان / Language:"
      },
      es: {
        welcome: "Bienvenido de nuevo",
        systemActive: "SISTEMA ACTIVO",
        todaysDiagnostics: "Diagnóstico Cósmico y Solución de Hoy",
        ephemerisPositions: "Posiciones Efemérides en Vivo (Calculadas)",
        activeDasha: "Período Dasha Activo",
        quickActions: "Acciones Rápidas Esenciales",
        viewByReligion: "Filtrar Perspectiva del Panel por Fe / Tradición:",
        languageSelect: "Idioma / Language:"
      },
      fr: {
        welcome: "Content de vous revoir",
        systemActive: "SYSTÈME ACTIF",
        todaysDiagnostics: "Diagnostic et Solution Cosmiques du Jour",
        ephemerisPositions: "Positions Éphémérides en Direct (Calculées)",
        activeDasha: "Période Dasha Active",
        quickActions: "Actions Rapides Essentielles",
        viewByReligion: "Filtrer la Perspective du Tableau de Bord par Foi / Tradition:",
        languageSelect: "Langue / Language:"
      },
      zh: {
        welcome: "欢迎回来",
        systemActive: "系统已激活",
        todaysDiagnostics: "今日宇宙诊断与解决方案",
        ephemerisPositions: "实时星历位置（计算值）",
        activeDasha: "活跃的大运周期",
        quickActions: "核心快捷操作",
        viewByReligion: "按信仰/传统过滤仪表板视角：",
        languageSelect: "语言 / Language:"
      }
    };
    return dict[selectedLanguage] || dict['en'];
  }, [selectedLanguage]);

  // Accurate Local Time Telemetry with Timezone Abbreviation
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [timeZoneAbbr, setTimeZoneAbbr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      try {
        const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(now);
        const tz = parts.find(p => p.type === 'timeZoneName')?.value || '';
        setTimeZoneAbbr(tz);
      } catch {
        setTimeZoneAbbr('LOCAL');
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const todayDateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

  // Dynamic Astronomical Position Calculations from target DOB & time
  const planetPositions: PlanetPosition[] = useMemo(() => {
    try {
      return calculatePlanetaryPositions(targetProfile.dob, targetProfile.time);
    } catch (e) {
      console.error("Failed to compute planet positions", e);
      return calculatePlanetaryPositions();
    }
  }, [targetProfile.dob, targetProfile.time]);

  // Dynamic Panchang Calculation
  const panchang: PanchangInfo = useMemo(() => {
    try {
      return calculatePanchang(new Date());
    } catch (e) {
      console.error("Failed to calculate Panchang", e);
      return {
        tithi: 'Shukla Navami',
        tithiIndex: 8,
        nakshatra: 'Rohini (Pada 2)',
        nakshatraPada: 2,
        yoga: 'Siddhi Yoga',
        karana: 'Bava Karana',
        abhijitMuhurta: '11:48 AM - 12:36 PM',
        rahuKalam: '04:30 PM - 06:00 PM',
        moonPhase: 'Waxing Gibbous 78%',
        moonIllumination: 78,
        sunSign: 'Cancer ♋',
        moonSign: 'Taurus ♉'
      };
    }
  }, []);

  // FIX 1: Correct Nakshatra Index (0-26) passed to calculateVimshottariDasha
  const moonNakshatraIdx = useMemo(() => {
    const moonPlanet = planetPositions.find(p => p.name === 'Moon');
    if (!moonPlanet) return 3;
    const nakClean = moonPlanet.nakshatra.split(' (')[0].trim();
    const idxByName = NAKSHATRA_NAMES.indexOf(nakClean);
    if (idxByName !== -1) return idxByName;
    return Math.floor((moonPlanet.degreeDecimal % 360) / (360 / 27)) % 27;
  }, [planetPositions]);

  // Dynamic Vimshottari Dasha Calculation
  const dashaInfo: VimshottariDashaInfo = useMemo(() => {
    return calculateVimshottariDasha(moonNakshatraIdx, targetProfile.dob);
  }, [moonNakshatraIdx, targetProfile.dob]);

  // FIX 3: Compute dynamic Cosmic Score from planetary dignities
  const cosmicScoreData = useMemo(() => {
    let score = 70; // baseline neutral score
    let exaltedCount = 0;
    let ownSignCount = 0;
    let retrogradeCount = 0;

    planetPositions.forEach(p => {
      if (p.strength.includes('Exalted')) {
        score += 5;
        exaltedCount++;
      } else if (p.strength.includes('Own House')) {
        score += 3.5;
        ownSignCount++;
      }

      if (p.retrograde) {
        retrogradeCount++;
        if (['Saturn', 'Mars', 'Rahu', 'Ketu'].includes(p.name)) {
          score -= 1.5;
        }
      }

      // Kendra / Trikona house placement boost (1, 4, 5, 7, 9, 10)
      if ([1, 4, 5, 7, 9, 10].includes(p.houseNumber)) {
        score += 1.5;
      }
    });

    const finalScore = Math.min(99, Math.max(50, Math.round(score)));
    return {
      score: finalScore,
      exaltedCount,
      ownSignCount,
      retrogradeCount,
    };
  }, [planetPositions]);

  // Compute Elemental Balance from planetary sign placements
  const elementalBalance = useMemo(() => {
    const counts = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
    planetPositions.forEach(p => {
      if (['Aries ♈', 'Leo ♌', 'Sagittarius ♐'].includes(p.sign)) counts.Fire++;
      else if (['Taurus ♉', 'Virgo ♍', 'Capricorn ♑'].includes(p.sign)) counts.Earth++;
      else if (['Gemini ♊', 'Libra ♎', 'Aquarius ♒'].includes(p.sign)) counts.Air++;
      else if (['Cancer ♋', 'Scorpio ♏', 'Pisces ♓'].includes(p.sign)) counts.Water++;
    });
    const total = planetPositions.length || 1;
    return {
      firePct: Math.round((counts.Fire / total) * 100),
      earthPct: Math.round((counts.Earth / total) * 100),
      airPct: Math.round((counts.Air / total) * 100),
      waterPct: Math.round((counts.Water / total) * 100),
      counts
    };
  }, [planetPositions]);

  // Compute Current Active Planetary Hour (Hora)
  const currentHora = useMemo(() => {
    const hour = new Date().getHours();
    const horaOrder = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'];
    const planetName = horaOrder[hour % 7];
    const horaInfo: Record<string, string> = {
      Sun: 'Ideal for executive leadership, authority & clarity.',
      Venus: 'Harmonious for arts, romance & financial agreements.',
      Mercury: 'Accelerates trade, writing, data analysis & tech.',
      Moon: 'Best for intuitive decisions, public care & family.',
      Saturn: 'Focus on discipline, deep structure & hard work.',
      Jupiter: 'Auspicious for wisdom, investment & learning.',
      Mars: 'Injects courage, physical effort & problem-solving.'
    };
    return { name: planetName, desc: horaInfo[planetName] || 'Balanced cosmic hour.' };
  }, []);

  // Recharts Radar Data for Elemental Balance Chart
  const radarData = useMemo(() => [
    { subject: 'Fire (Action)', A: elementalBalance.firePct, fullMark: 100 },
    { subject: 'Earth (Assets)', A: elementalBalance.earthPct, fullMark: 100 },
    { subject: 'Air (Mind)', A: elementalBalance.airPct, fullMark: 100 },
    { subject: 'Water (Soul)', A: elementalBalance.waterPct, fullMark: 100 },
  ], [elementalBalance]);

  // FIX 4: Compute dynamic What / Why / Solution text from Sun house & Mahadasha, customized by Religion View
  const dynamicDiagnostics = useMemo(() => {
    const sunPlanet = planetPositions.find(p => p.name === 'Sun');
    const sunHouseNum = sunPlanet?.houseNumber || 1;
    const houseData = SUN_HOUSE_DIAGNOSTICS[sunHouseNum] || SUN_HOUSE_DIAGNOSTICS[1];
    const mahadashaDesc = MAHADASHA_DIAGNOSTICS[dashaInfo.mahadasha] || MAHADASHA_DIAGNOSTICS['Jupiter'];

    let religionSolution = `${houseData.solution} Maintain daily solar discipline and align actions with ${dashaInfo.mahadasha} energy.`;
    
    if (selectedReligionView === 'islamic') {
      religionSolution = `🕌 Islamic Guidance: Recite Ayatul Kursi & Surah Ash-Sharh for clarity. Give Sadaqah on Friday and maintain morning Adhkar for divine protection and Barakah in income.`;
    } else if (selectedReligionView === 'vedic') {
      religionSolution = `🕉️ Vedic Remedy: Offer Surya Arghya at sunrise with copper vessel. Wear Yellow Sapphire (Pukhraj) / Ruby based on Lagna Lord, and chant ${dashaInfo.mahadasha} Gayatri Mantra (108x).`;
    } else if (selectedReligionView === 'western') {
      religionSolution = `⭐ Western Insight: Invoke Archangel Michael for spiritual courage. Work with Golden Citrine crystal to amplify solar 10th house executive focus and alignment.`;
    } else if (selectedReligionView === 'chinese') {
      religionSolution = `☯️ BaZi & Feng Shui: Balance Fire (火) and Earth (土) elements in South-East sector. Place Wu Lou or jade ornament to harmonize Qi and stimulate career luck.`;
    } else if (selectedReligionView === 'kabbalah') {
      religionSolution = `✡️ Kabbalistic Focus: Align with Tiphereth (Heart Sun Center). Recite Psalm 91 and meditate on YHVH Eloah Va-Daath for spiritual elevation and peace.`;
    }

    return {
      what: houseData.what,
      why: `Sun transiting your ${sunPlanet?.house || '10th House'} combined with active ${dashaInfo.mahadasha} Mahadasha (${dashaInfo.antardasha} Antardasha). ${mahadashaDesc}`,
      solution: religionSolution
    };
  }, [planetPositions, dashaInfo, selectedReligionView]);

  // Global Tool Search Items
  const TOOLS_CATALOG = [
    { title: 'Birth Chart (Kundli)', cat: 'Chart', tab: 'birth-chart', desc: 'Natal planetary positions & houses' },
    { title: 'Daily Horoscope & Transits', cat: 'Horoscope', tab: 'horoscope', desc: 'Real-time planetary transit impacts' },
    { title: '36-Guna Compatibility Match', cat: 'Love', tab: 'compatibility', desc: 'Ashta Koota marriage & relationship score' },
    { title: 'Holy Qur\'an & Sahih Hadith Hub', cat: 'Islamic', tab: 'islamic-suite', desc: '28 Lunar Mansions, Istikhara & Abjad' },
    { title: 'Dream Interpretation Engine', cat: 'Dreams', tab: 'dream-interpreter', desc: 'Symbolic subconscious analysis' },
    { title: 'Gemstones & Yantras Remedies', cat: 'Remedies', tab: 'remedies', desc: 'Planetary remedial recommendations' },
    { title: '150+ Astrological Tools Catalog', cat: 'Catalog', tab: 'tools-catalog', desc: 'Full directory of all planetary systems' },
    { title: 'Live Cosmic Diagnostics', cat: 'Diagnostics', tab: 'live-diagnostics', desc: 'Root-cause What/Why/Solution analysis' },
  ];

  const SEARCH_RESULTS = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return TOOLS_CATALOG.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.cat.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Keyboard navigation for search input
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsSearchFocused(false);
      setSearchQuery('');
    } else if (e.key === 'Enter') {
      if (SEARCH_RESULTS.length > 0) {
        onNavigate(SEARCH_RESULTS[0].tab);
        setSearchQuery('');
        setIsSearchFocused(false);
      }
    }
  };

  // Sun, Moon & Ascendant Highlights
  const keyPlanetsHighlight = useMemo(() => {
    const sun = planetPositions.find(p => p.name === 'Sun');
    const moon = planetPositions.find(p => p.name === 'Moon');
    const jupiter = planetPositions.find(p => p.name === 'Jupiter');
    return { sun, moon, jupiter };
  }, [planetPositions]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans overflow-hidden flex relative selection:bg-blue-500/30">
      <CosmicParticleBackground />

      {/* SIDEBAR NAVIGATION (TypeUI Style) */}
      <nav className="hidden md:flex w-64 h-screen flex-col bg-[#09090b]/80 backdrop-blur-2xl border-r border-white/5 p-4 z-20 relative shadow-2xl">
        <div className="flex items-center gap-3 mb-10 px-2 mt-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-tight">ASTRO360</h1>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">System Omni</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
          <div className="space-y-1">
            <h2 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest px-2 mb-2">Core Tools</h2>
            {[
              { id: 'birth-chart', title: 'Birth Chart', icon: <Compass className="w-4 h-4" /> },
              { id: 'horoscope', title: 'Horoscope', icon: <Sun className="w-4 h-4" /> },
              { id: 'compatibility', title: 'Compatibility', icon: <Heart className="w-4 h-4" /> },
              { id: 'chat', title: 'AI Oracle', icon: <Bot className="w-4 h-4" /> },
              { id: 'tools-catalog', title: 'Catalog (150+)', icon: <Layers className="w-4 h-4" /> },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {tool.icon}
                {tool.title}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <h2 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest px-2 mb-2">Intelligence</h2>
            {[
              { id: 'islamic-suite', title: 'Islamic Hub', icon: <Moon className="w-4 h-4" /> },
              { id: 'dream-interpreter', title: 'Dream Engine', icon: <CloudMoon className="w-4 h-4" /> },
              { id: 'remedies', title: 'Remedies', icon: <Award className="w-4 h-4" /> },
              { id: 'live-diagnostics', title: 'Diagnostics', icon: <Activity className="w-4 h-4" /> },
              { id: 'report-generator', title: 'Dossier Report', icon: <FileText className="w-4 h-4" /> },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {tool.icon}
                {tool.title}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 mt-auto">
          <button
            onClick={() => onNavigate('consultation-hub')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-white text-black text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4" />
            Book Consultation
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative z-10 p-4 md:p-8 lg:p-10 pb-24">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* TOP BAR: PROFILE, SEARCH, TIME */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-3xl bg-[#09090b]/40 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight">{targetProfile.name}</h2>
                <p className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  System Active • {currentTimeStr} {timeZoneAbbr}
                </p>
              </div>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search tools, charts, remedies..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute top-11 left-0 right-0 z-50 rounded-xl bg-[#09090b] border border-white/10 shadow-2xl p-1 overflow-hidden backdrop-blur-3xl">
                  {SEARCH_RESULTS.length > 0 ? (
                    SEARCH_RESULTS.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => { onNavigate(res.tab); setSearchQuery(''); setIsSearchFocused(false); }}
                        className="w-full p-2 rounded-lg hover:bg-white/5 flex items-center justify-between text-left cursor-pointer transition-colors"
                      >
                        <span className="text-xs text-white font-medium">{res.title}</span>
                        <span className="text-[9px] text-zinc-500 font-mono uppercase">{res.cat}</span>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-zinc-500">No results found.</div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <GlobalLanguageSelector />
            </div>
          </div>

          {/* BENTO GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,_auto)]">
            
            {/* HERO CARD: DAILY SYNTHESIS (Spans 2 columns) */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-black to-zinc-900 border border-white/10 shadow-2xl relative overflow-hidden group">
              <BorderBeam size={300} duration={12} delay={0} colorFrom="#3b82f6" colorTo="#8b5cf6" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Daily Synthesis
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    Score: {cosmicScoreData.score}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {selectedHoroscopeInsight.theme}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed max-w-xl">
                    Sun in <strong className="text-zinc-200">{keyPlanetsHighlight.sun?.sign}</strong> ({keyPlanetsHighlight.sun?.house}). 
                    Moon transiting <strong className="text-zinc-200">{panchang.nakshatra}</strong>. 
                    {dashaInfo.mahadasha} Mahadasha is active. Maximize focus during <strong className="text-emerald-400">{panchang.abhijitMuhurta}</strong>.
                  </p>
                </div>
                
                <div className="pt-2 flex flex-wrap gap-2">
                  <button onClick={() => onNavigate('horoscope')} className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors cursor-pointer">
                    View Full Forecast
                  </button>
                  <button onClick={() => onNavigate('report-generator')} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium hover:bg-white/10 transition-colors cursor-pointer">
                    Generate Dossier
                  </button>
                </div>
              </div>
            </div>

            {/* DIAGNOSTICS & REMEDIES BENTO */}
            <div className="p-5 rounded-3xl bg-[#09090b] border border-red-500/30 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Live Diagnostic
                </span>
                <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                  {dynamicDiagnostics.what}
                </p>
                <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <p className="text-[10px] text-emerald-400 font-mono leading-relaxed">
                    <strong>Remedy:</strong> {dynamicDiagnostics.solution}
                  </p>
                </div>
              </div>
              <button onClick={() => onNavigate('live-diagnostics')} className="w-full mt-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors cursor-pointer">
                Resolve Now
              </button>
            </div>

            {/* EPHEMERIS GRID (Spans full width) */}
            <div className="lg:col-span-3 p-5 rounded-3xl bg-zinc-950 border border-white/5 shadow-lg overflow-x-auto no-scrollbar">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Live Ephemeris</span>
                <span className="text-[10px] font-mono text-zinc-600">Lahiri Ayanamsha</span>
              </div>
              <div className="flex gap-2 min-w-max pb-2">
                {planetPositions.map((p, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedPlanet(p)}
                    className="p-3 rounded-2xl bg-[#09090b] border border-white/5 hover:border-white/20 transition-colors text-left min-w-[120px] cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] font-bold ${p.color}`}>{p.symbol} {p.name}</span>
                      {p.retrograde && <span className="text-[8px] text-red-500 font-mono">Rx</span>}
                    </div>
                    <span className="block text-xs font-semibold text-white">{p.sign}</span>
                    <span className="block text-[9px] text-zinc-500 font-mono">{p.degree}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* DYNAMIC PLANETARY ORBIT COMPONENT */}
            <div className="lg:col-span-2 rounded-3xl bg-black border border-white/10 overflow-hidden relative min-h-[300px]">
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                  Zodiac Orbit
                </span>
              </div>
              <div className="w-full h-full transform scale-[0.8] origin-top">
                <CelestialZodiacOrbit planetPositions={planetPositions} onSelectPlanet={(p) => setSelectedPlanet(p)} />
              </div>
            </div>

            {/* ACTIVE DASHA TIMELINE */}
            <div className="p-5 rounded-3xl bg-zinc-950 border border-white/5 flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 flex items-center gap-1.5 mb-3">
                <Clock className="w-3.5 h-3.5" /> Vimshottari Dasha
              </span>
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center space-y-1 mb-4">
                  <span className="text-2xl font-bold text-white">{dashaInfo.mahadasha}</span>
                  <span className="block text-xs text-zinc-500">Current Mahadasha</span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-2 mb-2 overflow-hidden border border-white/5">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: `${dashaInfo.progressPercent}%` }}></div>
                </div>
                <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                  <span>{dashaInfo.startDate}</span>
                  <span>{dashaInfo.endDate}</span>
                </div>
              </div>
            </div>

            {/* MOON PHASE VISUALIZER */}
            <div className="lg:col-span-1 rounded-3xl bg-zinc-950 border border-white/5 overflow-hidden">
               <div className="p-4 border-b border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Lunar Phase</span>
               </div>
               <div className="p-4 transform scale-90 origin-top">
                 <MoonPhaseVisual panchang={panchang} />
               </div>
            </div>
            
            {/* PANCHANG TICKER TAPE */}
            <div className="lg:col-span-2 rounded-3xl bg-[#09090b] border border-white/10 flex items-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:20s] py-4">
                <span className="px-4 text-[10px] font-mono text-zinc-400 uppercase"><strong className="text-blue-400">Tithi:</strong> {panchang.tithi}</span>
                <span className="px-4 text-[10px] font-mono text-zinc-400 uppercase"><strong className="text-emerald-400">Nakshatra:</strong> {panchang.nakshatra}</span>
                <span className="px-4 text-[10px] font-mono text-zinc-400 uppercase"><strong className="text-amber-400">Muhurta:</strong> {panchang.abhijitMuhurta}</span>
                <span className="px-4 text-[10px] font-mono text-zinc-400 uppercase"><strong className="text-red-400">Rahu:</strong> {panchang.rahuKalam}</span>
              </Marquee>
            </div>

          </div>
          
          {/* ALL TOOLS SECTION RESTORED (Rendered as independent modules) */}
          <div className="pt-10 space-y-10">
            <TarikIslamCosmicPassport userProfile={userProfile} onEditProfile={() => setIsTargetModalOpen(true)} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-white/5 overflow-hidden bg-zinc-950/50"><PlanetaryAspectGraph planetPositions={planetPositions} /></div>
              <div className="rounded-3xl border border-white/5 overflow-hidden bg-zinc-950/50"><CosmicTransitCalendar /></div>
            </div>
            
            <DailyMuhurtaPlanner />
            <LunarMansionsWheel />
            <SynastryOverlayChart personAPositions={planetPositions} />
            <AstrologicalMindMap />
            <CosmicChartAnalytics />
            <DivisionalChartsSuite planetPositions={planetPositions} />
            <AstrologyLearningHub />
            <ExecutiveReportGenerator />
            <CommunityConsultationHub />
            
            <BirthTimeRectificationSuite />
            <GemstoneRudrakshaSuite />
            <NumerologyNameSuite />
            <TarotIChingSuite />
            <TimeHorizonForecastSuite userProfile={userProfile} />
            <DoshaRemedyEngine planetPositions={planetPositions} userProfile={userProfile} />
            <CosmicBiorhythmTracker userProfile={userProfile} />
            <SacredChakraAlignment planetPositions={planetPositions} />
          </div>

          <div className="pt-10 pb-6 text-center text-[10px] font-mono text-zinc-600">
            ASTRO360 Omni System • {new Date().getFullYear()}
          </div>
        </div>
      </main>

      {/* PLANET MODAL */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-md w-full rounded-2xl bg-[#09090b] border border-white/10 p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPlanet(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold">{selectedPlanet.symbol}</span>
                <div>
                  <h3 className={`text-base font-bold ${selectedPlanet.color}`}>{selectedPlanet.name}</h3>
                  <p className="text-[10px] font-mono text-zinc-500">{selectedPlanet.sign} • {selectedPlanet.degree}</p>
                </div>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-500 block mb-1">Dignity</span>
                  <span className="font-semibold text-white">{selectedPlanet.strength}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/5">
                  <span className="text-zinc-500 block mb-1">Remedies</span>
                  <span className="text-zinc-300 leading-relaxed">{selectedPlanet.remedies}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING AI ASSISTANT BUTTON */}
      <button
        onClick={() => onNavigate('chat')}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-2xl transition-transform hover:scale-110 cursor-pointer border border-white/20 flex items-center justify-center group z-40"
        title="Open AI Oracle"
      >
        <Bot className="w-6 h-6" />
      </button>
    </div>
  );
}
