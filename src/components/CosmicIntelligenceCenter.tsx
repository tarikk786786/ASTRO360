import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  Sparkles, Sun, Moon, Compass, CloudMoon, Bot, Clock, Activity,
  Search, ShieldCheck, Heart, Award, User, Users, Wrench, X, ChevronRight, Globe2, Layers,
  BookOpen, ArrowUpRight, CheckCircle2, RotateCcw, Zap, HelpCircle, AlertTriangle,
  Briefcase, Brain, FileText, LineChart, UserCircle, LayoutDashboard
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
import { ErrorBoundary } from 'react-error-boundary';

import DashboardSubNav from './ui/DashboardSubNav';
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
import DashboardSidebar from './ui/DashboardSidebar';
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
    name: userProfile.name || 'Seeker',
    gender: userProfile.gender || 'universal',
    dob: userProfile.dob || '2000-01-01',
    time: userProfile.time || '12:00',
    location: userProfile.location || 'Local Birth Coordinates',
    preferredSystem: 'vedic',
    predictionFocus: 'wealth'
  });

  useEffect(() => {
    if (userProfile && userProfile.name) {
      setTargetProfile(prev => ({
        ...prev,
        name: userProfile.name,
        dob: userProfile.dob || prev.dob,
        time: userProfile.time || prev.time,
        location: userProfile.location || prev.location
      }));
    }
  }, [userProfile]);

  // Selected Planet for Detail Modal
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);


  const [activeCategory, setActiveCategory] = useState('overview');

  // Local Component States
  const [selectedHoroscopeSign, setSelectedHoroscopeSign] = useState<string>('Aries');
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
      },
      bn: {
        welcome: "স্বাগতম",
        systemActive: "সিস্টেম সক্রিয়",
        todaysDiagnostics: "আজকের কসমিক নির্ণয় এবং প্রতিকার",
        ephemerisPositions: "লাইভ গ্রহের অবস্থান (গণনা করা)",
        activeDasha: "সক্রিয় দশা সময়কাল",
        quickActions: "প্রয়োজনীয় সরঞ্জাম",
        viewByReligion: "ধর্ম ও ঐতিহ্য অনুযায়ী ড্যাশবোর্ড ফিল্টার করুন:",
        languageSelect: "ভাষা / Language:"
      },
      ta: {
        welcome: "மீண்டும் வருக",
        systemActive: "அமைப்பு செயலில் உள்ளது",
        todaysDiagnostics: "இன்றைய கிரக நிலை மற்றும் தீர்வுகள்",
        ephemerisPositions: "நிகழ்நேர கிரக நிலைகள்",
        activeDasha: "தற்போதைய தசா காலம்",
        quickActions: "முக்கிய கருவிகள்",
        viewByReligion: "பாரம்பரியத்தின்படி வடிகட்டவும்:",
        languageSelect: "மொழி / Language:"
      },
      de: {
        welcome: "Willkommen zurück",
        systemActive: "SYSTEM AKTIV",
        todaysDiagnostics: "Heutige kosmische Diagnose & Lösung",
        ephemerisPositions: "Live-Ephemeridenpositionen (Berechnet)",
        activeDasha: "Aktive Dasha-Periode",
        quickActions: "Wichtige Schnellaktionen",
        viewByReligion: "Dashboard-Perspektive nach Glauben / Tradition filtern:",
        languageSelect: "Sprache / Language:"
      },
      ru: {
        welcome: "С возвращением",
        systemActive: "СИСТЕМА АКТИВНА",
        todaysDiagnostics: "Космическая диагностика и решения на сегодня",
        ephemerisPositions: "Текущие эфемеридные позиции (расчетные)",
        activeDasha: "Активный период Даша",
        quickActions: "Основные быстрые действия",
        viewByReligion: "Фильтр панели по духовным традициям:",
        languageSelect: "Язык / Language:"
      },
      ja: {
        welcome: "おかえりなさい",
        systemActive: "システム稼働中",
        todaysDiagnostics: "本日の宇宙診断と解決策",
        ephemerisPositions: "リアルタイム天体位置（計算値）",
        activeDasha: "現在のアクティブなダシャー周期",
        quickActions: "クイックアクション",
        viewByReligion: "信仰・伝統別にダッシュボードを絞り込む:",
        languageSelect: "言語 / Language:"
      }
    };
    return (dict as any)[selectedLanguage] || dict['en'];
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

  // Interactive Recent Activity Log
  const recentActivities = [
    { 
      id: 1, 
      text: `Kundli Ephemeris Recalculated for ${targetProfile.name}`, 
      time: 'Just now', 
      type: 'calc', 
      tab: 'birth-chart',
      badge: 'Active Target' 
    },
    { 
      id: 2, 
      text: `Abhijit Muhurta Window Synchronized (${panchang.abhijitMuhurta})`, 
      time: 'Today', 
      type: 'panchang', 
      tab: 'horoscope',
      badge: 'Panchang' 
    },
    { 
      id: 3, 
      text: `Active Dasha Phase Verified (${dashaInfo.mahadasha} - ${dashaInfo.antardasha})`, 
      time: 'Today', 
      type: 'dasha', 
      tab: 'live-diagnostics',
      badge: 'Dasha Sync' 
    },
    { 
      id: 4, 
      text: 'Ashta Koota 36-Guna Compatibility Engine Standby', 
      time: '2h ago', 
      type: 'love', 
      tab: 'compatibility',
      badge: 'Ready' 
    },
  ];

  return (
    <div className="w-full relative bg-transparent min-h-full">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="w-full text-[#F8FAFC] font-sans text-left relative transform-gpu flex flex-col"
      >
        <DashboardSubNav activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        <div className="w-full py-3 sm:py-6 relative">
          <div className="w-full max-w-7xl mx-auto space-y-6 relative z-10">

        {/* SECTION 1: GLOBAL HEADER WITH SEARCH & ACCURATE LOCAL TIME */}
        <motion.div variants={staggerItem} className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 sm:gap-4 p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl glass-card border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-start gap-2 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB]" /> ASTRO360 OMNI
              </h1>
              <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-[#22C55E]/30 font-semibold flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                SYSTEM ACTIVE
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#94A3B8] font-mono">
              {todayDateStr} • <span className="text-[#06B6D4] font-semibold">{currentTimeStr || '12:00:00 PM'}</span> <span className="text-white font-bold">{timeZoneAbbr}</span>
            </p>
          </div>

          {/* GLOBAL SEARCH WITH KEYBOARD NAV & EMPTY STATE */}
          <div className="relative w-full lg:w-96">
            <div className="relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search 150+ tools, charts, remedies..."
                className="w-full pl-10 pr-16 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#0B1220] border border-white/10 text-xs text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
              />
              <div className="absolute right-3 top-2.5 sm:top-3 flex items-center gap-1">
                <kbd className="text-[9px] font-mono text-[#94A3B8] bg-white/10 px-1.5 py-0.5 rounded border border-white/10">ESC</kbd>
              </div>
            </div>

            {/* FIX 5 & 6: SEARCH DROPDOWN & EMPTY STATE */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-12 sm:top-14 left-0 right-0 z-50 rounded-2xl bg-[#111827] border border-white/10 shadow-2xl overflow-hidden p-2 space-y-1 backdrop-blur-2xl">
                {SEARCH_RESULTS.length > 0 ? (
                  <>
                    <div className="px-3 py-1.5 text-[10px] font-mono text-[#94A3B8] flex items-center justify-between border-b border-white/10">
                      <span>Matching Tools ({SEARCH_RESULTS.length})</span>
                      <span className="text-[#06B6D4]">Press Enter ↵ to Jump</span>
                    </div>
                    {SEARCH_RESULTS.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => { onNavigate(res.tab); setSearchQuery(''); setIsSearchFocused(false); }}
                        className={`w-full p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs text-left cursor-pointer transition-colors ${i === 0 ? 'bg-white/5 border border-white/10' : ''}`}
                      >
                        <div>
                          <span className="font-semibold text-[#F8FAFC] block">{res.title}</span>
                          <span className="text-[10px] text-[#94A3B8]">{res.desc}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded-md border border-[#06B6D4]/20 shrink-0">
                          {res.cat}
                        </span>
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="p-6 text-center space-y-3">
                    <AlertTriangle className="w-6 h-6 text-[#F59E0B] mx-auto" />
                    <p className="text-xs text-[#94A3B8]">
                      No tools found matching "<span className="text-white font-semibold">{searchQuery}</span>"
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* READINGS BUTTON */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <div className="w-full sm:w-auto">
              <ShimmerButton
                onClick={() => onNavigate('chat')}
                shimmerColor="#06B6D4"
                background="rgba(37, 99, 235, 0.9)"
                className="w-full sm:w-auto justify-center"
              >
                <Bot className="w-4 h-4 text-cyan-200" /> AI Oracle Consultation
              </ShimmerButton>
            </div>
          </div>
        </motion.div>

        {/* DYNAMIC CATEGORY VIEWS (CHANGABLE AS SELECTED ON ALL DEVICES) */}
        <AnimatePresence mode="wait">
          {activeCategory === 'overview' && (
            <motion.div
              key="category-overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* 🔮 FIRST & PROMINENT SECTION: DAILY HOROSCOPE & ZODIAC PREDICTIONS */}
              <div className="p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] space-y-4 sm:space-y-5 text-left relative overflow-hidden ring-1 ring-white/5 hover:border-amber-500/30 hover:shadow-[0_8px_32px_0_rgba(245,158,11,0.15)] transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-4 relative z-10">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:scale-105 transition-transform duration-500 shrink-0">
                      <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 tracking-tight flex items-center gap-2">
                        Daily Cosmic Intelligence
                      </h2>
                      <p className="text-[11px] sm:text-xs text-amber-300/80 font-mono font-medium tracking-wide">
                        Real-time Ephemeris Telemetry • {todayDateStr}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 shrink-0">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                      Score: {selectedHoroscopeInsight.overallScore}% Excellent
                    </span>
                    <button
                      onClick={() => onNavigate('horoscope')}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-purple-500/10 hover:from-amber-500/20 hover:to-purple-500/20 text-amber-300 border border-amber-500/30 hover:border-amber-400 text-[11px] sm:text-xs font-mono font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-lg active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Full Forecast
                    </button>
                  </div>
                </div>

                {/* 12 ZODIAC SIGN SELECTOR DOCK */}
                <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-2 relative z-10 scroll-smooth" style={{ scrollSnapType: 'x mandatory' }}>
                  {[
                    { sign: 'Aries', symbol: '♈' },
                    { sign: 'Taurus', symbol: '♉' },
                    { sign: 'Gemini', symbol: '♊' },
                    { sign: 'Cancer', symbol: '♋' },
                    { sign: 'Leo', symbol: '♌' },
                    { sign: 'Virgo', symbol: '♍' },
                    { sign: 'Libra', symbol: '♎' },
                    { sign: 'Scorpio', symbol: '♏' },
                    { sign: 'Sagittarius', symbol: '♐' },
                    { sign: 'Capricorn', symbol: '♑' },
                    { sign: 'Aquarius', symbol: '♒' },
                    { sign: 'Pisces', symbol: '♓' },
                  ].map((z) => {
                    const isSelected = selectedHoroscopeSign === z.sign;
                    return (
                      <button
                        key={z.sign}
                        onClick={() => setSelectedHoroscopeSign(z.sign)}
                        style={{ scrollSnapAlign: 'start' }}
                        className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 shrink-0 border select-none active:scale-95 ${
                          isSelected
                            ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 border-transparent shadow-[0_4px_15px_rgba(245,158,11,0.4)] scale-105'
                            : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-sm drop-shadow-sm">{z.symbol}</span>
                        <span>{z.sign}</span>
                      </button>
                    );
                  })}
                </div>

                {/* HOROSCOPE INSIGHT BODY */}
                <div className="p-4 sm:p-5 rounded-[1.25rem] bg-black/30 backdrop-blur-md border border-white/5 space-y-4 relative z-10 group/body hover:border-white/10 transition-colors duration-500">
                  <p className="text-xs sm:text-sm text-white leading-relaxed font-medium flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{selectedHoroscopeInsight.theme}</span>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-1">
                    <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-cyan-500/30 transition-colors duration-300 space-y-1.5 text-xs group/card">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-bold group-hover/card:text-cyan-300">
                        <Briefcase className="w-4 h-4" /> CAREER & FINANCE
                      </div>
                      <p className="text-slate-300 text-[11.5px] leading-relaxed group-hover/card:text-white transition-colors">{selectedHoroscopeInsight.career}</p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-rose-500/30 transition-colors duration-300 space-y-1.5 text-xs group/card">
                      <div className="flex items-center gap-1.5 text-rose-400 font-mono font-bold group-hover/card:text-rose-300">
                        <Heart className="w-4 h-4" /> LOVE & HARMONY
                      </div>
                      <p className="text-slate-300 text-[11.5px] leading-relaxed group-hover/card:text-white transition-colors">{selectedHoroscopeInsight.love}</p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-emerald-500/30 transition-colors duration-300 space-y-1.5 text-xs group/card">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold group-hover/card:text-emerald-300">
                        <Brain className="w-4 h-4" /> HEALTH & VITALITY
                      </div>
                      <p className="text-slate-300 text-[11.5px] leading-relaxed group-hover/card:text-white transition-colors">{selectedHoroscopeInsight.health}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] font-mono text-slate-400 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                      <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">Lucky Number: <strong className="text-amber-300 font-bold text-xs">{selectedHoroscopeInsight.luckyNumber}</strong></span>
                      <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">Lucky Color: <strong className="text-amber-300 font-bold text-xs">{selectedHoroscopeInsight.luckyColor}</strong></span>
                    </div>
                    <span className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-lg w-fit">Transit: <strong className="font-bold text-xs">Sun in {keyPlanetsHighlight.sun?.sign || 'Leo'}</strong></span>
                  </div>
                </div>
              </div>

              {/* 👑 SEEKER COSMIC PASSPORT & PERSONALIZED IDENTITY HEADER */}
              <div>
                <TarikIslamCosmicPassport userProfile={userProfile} onEditProfile={() => setIsTargetModalOpen(true)} />
              </div>

              <AstrologyTargetProfileModal
                isOpen={isTargetModalOpen}
                onClose={() => setIsTargetModalOpen(false)}
                onSaveProfile={(prof) => {
                  setTargetProfile(prof);
                  if (onUpdateProfile) {
                    onUpdateProfile({
                      ...userProfile,
                      name: prof.name,
                      dob: prof.dob,
                      time: prof.time,
                      location: prof.location,
                    });
                  }
                }}
                currentProfile={userProfile}
              />

              {/* 🌐 RELIGION PERSPECTIVE & LANGUAGE SELECTOR BAR */}
              <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl glass-card border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 text-xs font-sans">
                {/* Religion View Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                  <span className="font-bold text-amber-400 font-mono flex items-center gap-1.5 shrink-0 text-xs">
                    <Globe2 className="w-4 h-4 text-amber-400" /> {i18n.viewByReligion}
                  </span>
                  <div className="flex overflow-x-auto no-scrollbar pb-1 sm:pb-0 gap-1.5 max-w-full scroll-smooth" style={{ scrollSnapType: 'x mandatory' }}>
                    {[
                      { id: 'universal', label: '🌐 All Systems', badge: 'Multi-Faith' },
                      { id: 'islamic', label: '🕌 Islamic (النُّجوم)', badge: 'Sunnah' },
                      { id: 'vedic', label: '🕉️ Vedic (ज्योतिष)', badge: 'Sidereal' },
                      { id: 'western', label: '⭐ Western', badge: 'Tropical' },
                      { id: 'chinese', label: '☯️ BaZi (八字)', badge: 'Wu Xing' },
                      { id: 'kabbalah', label: '✡️ Kabbalah', badge: 'Sephirot' },
                    ].map((rel) => (
                      <button
                        key={rel.id}
                        onClick={() => setSelectedReligionView(rel.id as any)}
                        style={{ scrollSnapAlign: 'start' }}
                        className={`min-h-[36px] px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 select-none ${
                          selectedReligionView === rel.id
                            ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-500/10'
                            : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                        }`}
                      >
                        <span>{rel.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language Selector */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2.5 md:pt-0 border-white/10">
                  <span className="font-bold text-cyan-400 font-mono text-xs">{i18n.languageSelect}</span>
                  <GlobalLanguageSelector />
                </div>
              </div>

              {/* 📈 ENTERPRISE COSMIC ANALYTICS KPI BAR */}
              <div>
                <CosmicAnalyticsKPI
                  score={cosmicScoreData.score}
                  exaltedCount={cosmicScoreData.exaltedCount}
                  ownSignCount={cosmicScoreData.ownSignCount}
                  retrogradeCount={cosmicScoreData.retrogradeCount}
                />
              </div>

              {/* 🪄 MAGIC UI INFINITE MARQUEE COSMIC TICKER */}
              <div className="rounded-2xl bg-[#111827]/90 border border-cyan-500/30 shadow-xl overflow-hidden py-1.5 backdrop-blur-xl">
                <Marquee pauseOnHover repeat={4} className="[--duration:28s]">
                  <span className="text-xs font-mono text-cyan-300 font-bold px-4 flex items-center gap-1.5 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Tithi: <strong className="text-white">{panchang.tithi}</strong>
                  </span>
                  <span className="text-xs font-mono text-emerald-300 font-bold px-4 flex items-center gap-1.5 shrink-0">
                    <Moon className="w-3.5 h-3.5 text-emerald-400" /> Nakshatra: <strong className="text-white">{panchang.nakshatra}</strong>
                  </span>
                  <span className="text-xs font-mono text-amber-300 font-bold px-4 flex items-center gap-1.5 shrink-0">
                    <Sun className="w-3.5 h-3.5 text-amber-400" /> Golden Window: <strong className="text-white">{panchang.abhijitMuhurta}</strong>
                  </span>
                  <span className="text-xs font-mono text-purple-300 font-bold px-4 flex items-center gap-1.5 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> Friction Hours: <strong className="text-white">{panchang.rahuKalam}</strong>
                  </span>
                  <span className="text-xs font-mono text-rose-300 font-bold px-4 flex items-center gap-1.5 shrink-0">
                    <Activity className="w-3.5 h-3.5 text-rose-400" /> Sun Ingress: <strong className="text-white">{keyPlanetsHighlight.sun?.sign || 'Leo'}</strong>
                  </span>
                </Marquee>
              </div>

              {/* 🚨 DYNAMIC DAILY COSMIC WHY & PRESCRIBED SOLUTION */}
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#111827] to-emerald-950/40 border border-amber-500/30 shadow-2xl space-y-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white font-mono">Today's Cosmic Diagnostic & Prescribed Solution</h3>
                      <span className="text-[10px] text-slate-400 font-mono">Universal Root Cause & Practical Action Strategy</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 font-bold w-fit">
                    Active Dasha: {dashaInfo.mahadasha} / {dashaInfo.antardasha}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs font-mono">
                  {/* TODAY'S WHY */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-black/50 border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-400" /> Today's Cosmic WHY:
                      </span>
                      <span className="text-[10px] text-slate-400">{panchang.tithi}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed text-[11px]">
                      {dashaInfo.mahadasha} Mahadasha is active while Sun in {keyPlanetsHighlight.sun?.sign || 'Leo'} illuminates your 1st House of self-drive. Moon transiting {panchang.nakshatra} creates high mental activity, requiring steady focus during {panchang.rahuKalam} Rahu Kalam.
                    </p>
                  </div>

                  {/* TODAY'S PRESCRIBED SOLUTION */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 space-y-2 text-emerald-300">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Prescribed Solution & Remedy:
                      </span>
                      <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">Golden Muhurta</span>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-slate-200">
                      <p><strong className="text-amber-300">1. Sacred Recitation:</strong> Mahagayatri Mantra / Ayatul Kursi</p>
                      <p><strong className="text-cyan-300">2. Acoustic Frequency:</strong> 528 Hz (Solar Repair)</p>
                      <p><strong className="text-emerald-300">3. Gemstone & Rudraksha:</strong> Yellow Sapphire / 5 Mukhi</p>
                      <p><strong className="text-purple-300">4. Best Execution Window:</strong> {panchang.abhijitMuhurta}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={() => onNavigate('mantra-soundboard')}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Soundboard & Tones
                  </button>

                  <button
                    onClick={() => onNavigate('report-generator')}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Executive PDF Dossier
                  </button>

                  <button
                    onClick={() => onNavigate('consultation-hub')}
                    className="min-h-[40px] px-3.5 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Scholar Consultation
                  </button>
                </div>
              </div>

              {/* SECTION 2: HERO AI DAILY SUMMARY & COMPUTED PLANETARY POSITIONS GRID */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl p-4 sm:p-8">
                <BorderBeam size={250} duration={12} delay={0} colorFrom="#06B6D4" colorTo="#3B82F6" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                  {/* LEFT: PERSONALIZED COSMIC SYNTHESIS & DYNAMIC SCORE */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#06B6D4] text-xs font-mono font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                      <span>Today's Dynamic Cosmic Synthesis</span>
                    </div>

                    <h2 className="text-xl sm:text-4xl font-semibold tracking-tight text-[#F8FAFC]">
                      Welcome Back, <span className="text-[#2563EB]">{targetProfile.name}</span>
                    </h2>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 text-xs text-[#CBD5E1]">
                      <p className="font-semibold text-[#D4AF37] flex items-center gap-1.5 font-mono">
                        <Activity className="w-4 h-4 text-[#D4AF37]" /> Astronomical Alignment Summary:
                      </p>
                      <p className="leading-relaxed">
                        Sun in <strong className="text-white">{keyPlanetsHighlight.sun?.sign}</strong> illuminates your <strong className="text-white">{keyPlanetsHighlight.sun?.house}</strong>. 
                        Moon in <strong className="text-white">{keyPlanetsHighlight.moon?.sign}</strong> ({keyPlanetsHighlight.moon?.nakshatra}) provides intuitive clarity during <strong className="text-[#22C55E]">{panchang.abhijitMuhurta}</strong>.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 pt-1 flex-wrap">
                      <span className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md">
                        <Award className="w-4 h-4 text-[#D4AF37]" />
                        Score: <NumberTicker value={cosmicScoreData.score} className="text-[#D4AF37] font-bold" />/100
                      </span>
                      <span className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-mono font-semibold">
                        Exalted: {cosmicScoreData.exaltedCount}
                      </span>
                      <span className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-xs font-mono font-semibold">
                        Own Sign: {cosmicScoreData.ownSignCount}
                      </span>
                      <span className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono font-semibold">
                        Abhijit: {panchang.abhijitMuhurta}
                      </span>
                    </div>

                    {/* 🪐 ANIMATED CELESTIAL ZODIAC ORBIT VISUALIZER */}
                    <div className="pt-2">
                      <div className="p-3 sm:p-4 rounded-2xl bg-[#0B1220] border border-cyan-500/30 space-y-2 shadow-2xl overflow-hidden relative">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-400" /> 3D Celestial Zodiac Orbit
                          </span>
                          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">Interactive Solfeggio</span>
                        </div>
                        <CelestialZodiacOrbit planetPositions={planetPositions} onSelectPlanet={(p) => setSelectedPlanet(p)} />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: DYNAMIC REAL-TIME 9 PLANETS POSITIONS GRID */}
                  <div className="lg:col-span-6 p-3.5 sm:p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-mono font-semibold text-[#06B6D4] flex items-center gap-1.5">
                        <Globe2 className="w-4 h-4 text-[#06B6D4]" /> Live Ephemeris Positions (Computed)
                      </span>
                      <span className="text-[10px] font-mono text-[#94A3B8]">Lahiri Ayanamsha</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      {planetPositions.map((p, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => setSelectedPlanet(p)}
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`min-h-[64px] p-2 sm:p-2.5 rounded-xl bg-[#111827] border ${p.border} text-left space-y-0.5 hover:bg-[#1E293B] hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all cursor-pointer group`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-[11px] sm:text-xs font-bold ${p.color}`}>{p.symbol} {p.name}</span>
                            {p.retrograde && <span className="text-[8px] font-mono text-[#EF4444] font-bold">Rx</span>}
                          </div>
                          <span className="text-[10.5px] sm:text-[11px] font-semibold text-white block truncate">{p.sign}</span>
                          <span className="text-[9.5px] font-mono text-[#94A3B8] block">{p.degree}</span>
                        </motion.button>
                      ))}
                    </div>

                    {/* 📊 ELEMENTAL BALANCE TELEMETRY & RECHARTS RADAR */}
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Elemental Balance Radar:
                        </span>
                        <span className="text-[#94A3B8]">4 Elements</span>
                      </div>

                      <div className="h-44 sm:h-48 w-full bg-[#111827]/80 rounded-2xl border border-white/10 p-1 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fontSize: 9, fill: '#CBD5E1' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 8 }} />
                            <Radar name="Elemental Strength" dataKey="A" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.4} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center text-[9.5px] sm:text-[10px] font-mono">
                        <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          <span className="font-bold block">🔥 Fire</span>
                          <span>{elementalBalance.firePct}%</span>
                        </div>
                        <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                          <span className="font-bold block">🌍 Earth</span>
                          <span>{elementalBalance.earthPct}%</span>
                        </div>
                        <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                          <span className="font-bold block">💨 Air</span>
                          <span>{elementalBalance.airPct}%</span>
                        </div>
                        <div className="p-1.5 sm:p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                          <span className="font-bold block">🌊 Water</span>
                          <span>{elementalBalance.waterPct}%</span>
                        </div>
                      </div>
                    </div>

                    {/* ⏰ CURRENT PLANETARY HORA (HOUR) WIDGET */}
                    <div className="p-3 rounded-xl bg-[#111827] border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="font-bold text-white">Active Hora: <strong className="text-cyan-300">{currentHora.name} Hour</strong></span>
                          <span className="text-[10px] text-slate-400 block">{currentHora.desc}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0">Live Hora</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PLANET DETAIL MODAL */}
              <AnimatePresence>
                {selectedPlanet && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
                    onClick={() => setSelectedPlanet(null)}
                  >
                    <div
                      className="w-full max-w-lg p-5 sm:p-6 rounded-3xl bg-[#111827] border border-cyan-500/40 shadow-2xl space-y-4 text-left relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold ${selectedPlanet.color}`}>
                            {selectedPlanet.symbol}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                              {selectedPlanet.name} Telemetry
                              {selectedPlanet.retrograde && (
                                <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30 font-bold">
                                  Rx
                                </span>
                              )}
                            </h3>
                            <span className="text-xs text-slate-400 font-mono">{selectedPlanet.sign} • {selectedPlanet.degree}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedPlanet(null)}
                          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-mono px-2.5 py-1"
                        >
                          ✕ Close
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 space-y-0.5">
                          <span className="text-[10px] text-slate-400 block">House Placement</span>
                          <span className="font-bold text-cyan-300">{selectedPlanet.house}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 space-y-0.5">
                          <span className="text-[10px] text-slate-400 block">Nakshatra Mansion</span>
                          <span className="font-bold text-amber-300">{selectedPlanet.nakshatra}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 space-y-0.5">
                          <span className="text-[10px] text-slate-400 block">Pada / Quarter</span>
                          <span className="font-bold text-emerald-300">Pada {selectedPlanet.pada}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 space-y-0.5">
                          <span className="text-[10px] text-slate-400 block">Daily Speed</span>
                          <span className="font-bold text-slate-200">{selectedPlanet.speed}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 space-y-0.5">
                          <span className="text-[10px] text-slate-400 block">Element</span>
                          <span className="font-bold text-purple-300">{selectedPlanet.element}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 space-y-0.5">
                          <span className="text-[10px] text-slate-400 block">Planetary Dignity</span>
                          <span className="font-bold text-cyan-400 truncate block">{selectedPlanet.strength}</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1.5 text-xs font-mono">
                        <span className="text-amber-400 font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Prescribed Energetic Gemstone & Action:
                        </span>
                        <p className="text-slate-200 leading-relaxed text-[11px]">{selectedPlanet.remedies}</p>
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">Lahiri Ephemeris</span>
                        <button
                          onClick={() => {
                            setSelectedPlanet(null);
                            onNavigate('remedies');
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-mono font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
                        >
                          View All Remedies ➔
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SECTION 3: QUICK ACTIONS GRID (9 ESSENTIAL CORE TOOLS) */}
              <div className="space-y-3 sm:space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                    <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" /> Essential Quick Actions
                  </h3>
                  <span className="text-xs font-mono text-[#94A3B8]">9 Core Astrological Engines</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-3">
                  {[
                    { id: 'birth-chart', title: 'Birth Chart', desc: 'Natal Kundli', icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" /> },
                    { id: 'horoscope', title: 'Horoscope', desc: 'Transits & energy', icon: <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" /> },
                    { id: 'compatibility', title: 'Compatibility', desc: '36-Guna match', icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#EC4899]" /> },
                    { id: 'consultation-hub', title: 'Consultations', desc: 'Book Scholars', icon: <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />, isComingSoon: true },
                    { id: 'islamic-suite', title: 'Islamic Hub', desc: 'Qur\'an & Hadith', icon: <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E]" /> },
                    { id: 'dream-interpreter', title: 'Dream Engine', desc: 'Symbol analysis', icon: <CloudMoon className="w-4 h-4 sm:w-5 sm:h-5 text-[#7C3AED]" /> },
                    { id: 'remedies', title: 'Remedies', desc: 'Gemstones & Yantras', icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" /> },
                    { id: 'live-diagnostics', title: 'Diagnostics', desc: 'What & Solution', icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#EF4444]" /> },
                    { id: 'tools-catalog', title: '150+ Tools', desc: 'Full Directory', icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#06B6D4]" /> },
                  ].map((tool) => (
                    <motion.button
                      key={tool.id}
                      onClick={() => onNavigate(tool.id)}
                      whileHover={{ scale: 1.04, y: -3 }}
                      whileTap={{ scale: 0.94 }}
                      className="min-h-[84px] sm:min-h-[96px] p-2.5 sm:p-3 rounded-2xl bg-[#111827]/90 border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 text-left space-y-1 sm:space-y-1.5 group cursor-pointer shadow-md backdrop-blur-xl relative overflow-hidden flex flex-col justify-between"
                    >
                      {tool.isComingSoon && (
                        <span className="absolute top-1 right-1 text-[7px] font-mono font-bold text-amber-300 bg-amber-500/20 px-1 py-0.2 rounded border border-amber-500/30">
                          Soon
                        </span>
                      )}
                      <div className="p-1.5 rounded-xl bg-[#0B1220] border border-white/10 w-fit group-hover:border-cyan-400/40 group-hover:scale-110 transition-all duration-300">
                        {tool.icon}
                      </div>
                      <div>
                        <h4 className="text-[10.5px] sm:text-xs font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight truncate">{tool.title}</h4>
                        <p className="text-[8.5px] sm:text-[9px] text-[#94A3B8] pt-0.5 truncate">{tool.desc}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* SECTION 4: LIVE PANCHANG SNAPSHOT & ANIMATED MOON PHASE VISUAL */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 text-left">
                <div className="lg:col-span-7 p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-card border border-white/10 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                      <Sun className="w-4 h-4 text-[#F59E0B]" /> Live Panchang Ephemeris Snapshot
                    </h3>
                    <span className="text-[10px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-0.5 rounded-full border border-[#F59E0B]/30 font-semibold">
                      Lahiri UTC Sync
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-mono">
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0B1220]/60 border border-white/10 space-y-0.5">
                      <span className="text-[10px] text-[#94A3B8] block">Tithi (Lunar Day)</span>
                      <span className="font-semibold text-[#F59E0B] truncate block">{panchang.tithi}</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0B1220]/60 border border-white/10 space-y-0.5">
                      <span className="text-[10px] text-[#94A3B8] block">Nakshatra</span>
                      <span className="font-semibold text-[#22C55E] truncate block">{panchang.nakshatra}</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0B1220]/60 border border-white/10 space-y-0.5">
                      <span className="text-[10px] text-[#94A3B8] block">Yoga (Harmony)</span>
                      <span className="font-semibold text-[#06B6D4] truncate block">{panchang.yoga}</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0B1220]/60 border border-white/10 space-y-0.5">
                      <span className="text-[10px] text-[#94A3B8] block">Golden Window</span>
                      <span className="font-semibold text-[#22C55E] truncate block">{panchang.abhijitMuhurta}</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0B1220]/60 border border-white/10 space-y-0.5">
                      <span className="text-[10px] text-[#94A3B8] block">Rahu Kalam</span>
                      <span className="font-semibold text-[#EF4444] truncate block">{panchang.rahuKalam}</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0B1220]/60 border border-white/10 space-y-0.5">
                      <span className="text-[10px] text-[#94A3B8] block">Karana</span>
                      <span className="font-semibold text-[#CBD5E1] truncate block">{panchang.karana}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-card border border-white/10 space-y-4 shadow-2xl flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                      <Moon className="w-4 h-4 text-[#06B6D4]" /> Lunar Phase Visualizer
                    </h3>
                    <span className="text-[10px] font-mono text-[#06B6D4] bg-[#06B6D4]/10 px-2.5 py-0.5 rounded-full border border-[#06B6D4]/30 font-semibold">
                      Real-Time Graphic
                    </span>
                  </div>
                  <MoonPhaseVisual panchang={panchang} />
                </div>
              </div>

              {/* SECTION 5: ACTIVE DASHA & LIVE DIAGNOSTICS PREVIEW */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 text-left">
                <div className="lg:col-span-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-card border border-white/10 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#7C3AED]" /> Active Dasha Period
                    </h3>
                    <span className="text-[10px] font-mono text-[#7C3AED] bg-[#7C3AED]/10 px-2.5 py-0.5 rounded-full border border-[#7C3AED]/30 font-semibold">
                      {dashaInfo.mahadasha} Mahadasha
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300">{dashaInfo.mahadasha} - {dashaInfo.antardasha} Sub-Period</span>
                      <span className="text-cyan-400 font-bold">{dashaInfo.progressPercent}% Elapsed</span>
                    </div>

                    <div className="w-full bg-[#0B1220]/60 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                        style={{ width: `${dashaInfo.progressPercent}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-[#0B1220]/60 p-3 rounded-xl border border-white/5">
                      {dashaInfo.interpretation}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-card border border-white/10 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-sm sm:text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" /> Daily Ephemeris Alignment
                    </h3>
                    <button
                      onClick={() => onNavigate('live-diagnostics')}
                      className="px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
                    >
                      <span>Full Diagnostics</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-[#0B1220] border border-cyan-500/30 space-y-1">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" /> 1. What is Happening Today
                      </span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{dynamicDiagnostics.what}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0B1220] border border-amber-500/30 space-y-1">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-amber-400" /> 2. Why it is Happening (Root Cause)
                      </span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{dynamicDiagnostics.why}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeCategory === 'charts' && (
            <motion.div
              key="category-charts"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 sm:space-y-6 text-left"
            >
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-950/50 via-[#111827] to-cyan-950/50 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shrink-0">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white font-mono">Charts & Celestial Analysis Suite</h2>
                    <p className="text-xs text-slate-400 font-mono">Aspect Graphs, Lunar Mansions, Synastry, Mind Map & Divisional D1–D60 Matrices</p>
                  </div>
                </div>
              </div>
              <PlanetaryAspectGraph planetPositions={planetPositions} />
              <LunarMansionsWheel />
              <SynastryOverlayChart personAPositions={planetPositions} />
              <AstrologicalMindMap />
              <CosmicChartAnalytics />
              <DivisionalChartsSuite planetPositions={planetPositions} />
              <CosmicCompassVisualizer userProfile={userProfile} />
              <AstroCartographyMatrix userProfile={userProfile} />
            </motion.div>
          )}

          {activeCategory === 'timing' && (
            <motion.div
              key="category-timing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 sm:space-y-6 text-left"
            >
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#111827] to-indigo-950/50 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white font-mono">Timing, Transit & Ephemeris Suite</h2>
                    <p className="text-xs text-slate-400 font-mono">Live Muhurta Planner, Planetary Horas, Transit Radars, Biorhythms & Ephemeris</p>
                  </div>
                </div>
              </div>
              <CosmicTransitCalendar />
              <DailyMuhurtaPlanner />
              <BirthTimeRectificationSuite />
              <TimeHorizonForecastSuite userProfile={userProfile} />
              <CosmicBiorhythmTracker userProfile={userProfile} />
              <ElectionalMuhurtaEngine />
              <PlanetaryHorasTracker />
              <PlanetaryTransitRadar />
              <EphemerisDataTable planetPositions={planetPositions} />
            </motion.div>
          )}

          {activeCategory === 'remedies' && (
            <motion.div
              key="category-remedies"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 sm:space-y-6 text-left"
            >
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-950/50 via-[#111827] to-emerald-950/50 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white font-mono">Multi-Faith Remedies & Spiritual Solutions</h2>
                    <p className="text-xs text-slate-400 font-mono">Gemstones, Rudraksha, Dosha Peace Engines, Chakras, Feng Shui & Mantras</p>
                  </div>
                </div>
              </div>
              <GemstoneRudrakshaSuite />
              <DoshaRemedyEngine planetPositions={planetPositions} userProfile={userProfile} />
              <SacredChakraAlignment planetPositions={planetPositions} />
              <CosmicFengShuiMatrix userProfile={userProfile} />
              <SacredMantraSoundboard />
            </motion.div>
          )}

          {activeCategory === 'profile' && (
            <motion.div
              key="category-profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 sm:space-y-6 text-left"
            >
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-950/50 via-[#111827] to-blue-950/50 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shrink-0">
                    <UserCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white font-mono">Seeker Identity & Personal Blueprint</h2>
                    <p className="text-xs text-slate-400 font-mono">Personal Cosmic Passport, Numerology Name Analysis & Calculation Parameters</p>
                  </div>
                </div>
              </div>
              <TarikIslamCosmicPassport userProfile={userProfile} onEditProfile={() => setIsTargetModalOpen(true)} />
              <NumerologyNameSuite />
            </motion.div>
          )}

          {activeCategory === 'reports' && (
            <motion.div
              key="category-reports"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 sm:space-y-6 text-left"
            >
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-950/50 via-[#111827] to-teal-950/50 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white font-mono">Executive Reports & Scholar Knowledge Hub</h2>
                    <p className="text-xs text-slate-400 font-mono">Astrology Learning Hub, PDF Dossiers, Consultations, Tarot & Sacred Deities</p>
                  </div>
                </div>
              </div>
              <AstrologyLearningHub />
              <ExecutiveReportGenerator />
              <CommunityConsultationHub />
              <TarotIChingSuite />
              <PanchangDeitiesEngine />
            </motion.div>
          )}
        </AnimatePresence>

        {/* KEYBOARD SHORTCUT FOOTER HINTS */}
        <motion.div variants={staggerItem} className="p-3 rounded-2xl bg-[#111827]/80 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#94A3B8]">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[10px]">Enter ↵</kbd> Search
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[10px]">ESC</kbd> Close
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[10px]">Click</kbd> Planet
            </span>
          </div>
          <span className="text-[10px]">ASTRO360 Mission Control v3.0</span>
        </motion.div>

      </div>

      {/* 🔮 FLOATING AI ORACLE BUTTON (Mobile Safe & Animated) */}
      <motion.button
        onClick={() => onNavigate('chat')}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer border border-white/20 flex items-center justify-center group z-40"
        title="Open AI Oracle Consultation"
      >
        <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
      </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
