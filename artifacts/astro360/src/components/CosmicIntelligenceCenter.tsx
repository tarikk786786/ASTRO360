import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { 
  Sparkles, Sun, Moon, Compass, CloudMoon, Bot, Clock, Activity,
  Search, ShieldCheck, Heart, Award, User, X, ChevronRight, Globe2, Layers,
  BookOpen, ArrowUpRight, CheckCircle2, RotateCcw, Zap, HelpCircle, AlertTriangle
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
import { fadeInUp, staggerContainer, staggerItem, scaleIn, cardHoverProps, buttonPressProps } from '../lib/animationPresets';

interface CosmicIntelligenceCenterProps {
  onNavigate: (tab: string) => void;
  userProfile: UserProfile;
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
        animate={{ scale: [1, 1.03, 1], rotate: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
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

export default function CosmicIntelligenceCenter({ onNavigate, userProfile }: CosmicIntelligenceCenterProps) {
  // Target Profile Modal State ("For Whom")
  const [isTargetModalOpen, setIsTargetModalOpen] = useState<boolean>(false);
  const [targetProfile, setTargetProfile] = useState<AstrologyTargetProfile>({
    targetType: 'self',
    name: userProfile.name || 'Seeker',
    gender: 'universal',
    dob: userProfile.dob || '1998-06-15',
    time: userProfile.time || '12:00',
    location: userProfile.location || 'Mecca, Saudi Arabia',
    preferredSystem: 'vedic',
    predictionFocus: 'wealth'
  });

  // Selected Planet for Detail Modal
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);

  // Global Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  // Selected Religion Perspective & Language State
  const [selectedReligionView, setSelectedReligionView] = useState<'universal' | 'islamic' | 'vedic' | 'western' | 'chinese' | 'kabbalah'>('universal');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ar' | 'hi' | 'ur' | 'es' | 'fr' | 'zh'>('en');
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
    <motion.div 
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="min-h-screen bg-[#0B1220] text-[#F8FAFC] font-sans overflow-y-auto custom-scrollbar p-4 sm:p-8 lg:p-12 pb-28 text-left relative"
    >
      {/* 🌌 INTERACTIVE CANVAS PARTICLE STARFIELD */}
      <CosmicParticleBackground />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">

        {/* 🚀 UNIVERSAL BETA TEST MODE & DEVELOPER ATTRIBUTION BANNER (TOGGLEABLE HIDE/SHOW) */}
        <AnimatePresence>
          {isBetaBannerVisible ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              variants={staggerItem}
              className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
            >
              <div className="flex items-start md:items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
                  🧪
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      BETA TEST MODE
                    </span>
                    <span className="text-xs font-bold text-white">
                      Universal Global Platform for All People & Beliefs Worldwide
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Architected & Created by <strong className="text-amber-300">Tarik Islam</strong>. For suggestions, feature requests, or bug reports, connect directly.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <a
                  href="https://tarikislam.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>tarikislam.in ↗</span>
                </a>

                <a
                  href="mailto:princetarikislam@gmail.com?subject=ASTRO360%20Beta%20Feedback%20%2F%20Bug%20Report"
                  className="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>✉️ Send Feedback</span>
                </a>

                <button
                  onClick={() => setIsBetaBannerVisible(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer border border-white/10"
                  title="Hide Beta Info Banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
              <button
                onClick={() => setIsBetaBannerVisible(true)}
                className="px-3.5 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>🧪 BETA TEST MODE | Created by Tarik Islam (Show Info 👁️)</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 1: GLOBAL HEADER WITH SEARCH & ACCURATE LOCAL TIME */}
        <motion.div variants={staggerItem} className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Compass className="w-6 h-6 text-[#2563EB]" /> ASTRO360 OMNI
              </h1>
              <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-0.5 rounded-full border border-[#22C55E]/30 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                SYSTEM ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] font-mono pt-1">
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
                className="w-full pl-10 pr-16 py-2.5 rounded-2xl bg-[#0B1220] border border-white/10 text-xs text-[#F8FAFC] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
              />
              <div className="absolute right-3 top-2.5 flex items-center gap-1">
                <kbd className="text-[9px] font-mono text-[#94A3B8] bg-white/10 px-1.5 py-0.5 rounded border border-white/10">ESC</kbd>
              </div>
            </div>

            {/* FIX 5 & 6: SEARCH DROPDOWN & EMPTY STATE */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-12 left-0 right-0 z-50 rounded-2xl bg-[#111827] border border-white/10 shadow-2xl overflow-hidden p-2 space-y-1 backdrop-blur-2xl">
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

          {/* TARGET SUBJECT & READINGS BUTTON */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <button
              onClick={() => setIsTargetModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-[#1E293B] hover:bg-[#334155] border border-[#2563EB]/40 text-[#06B6D4] text-xs font-mono font-semibold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-[#2563EB]" />
              <span>For Whom: <strong className="text-white capitalize">{targetProfile.targetType} ({targetProfile.name})</strong></span>
            </button>

            <ShimmerButton
              onClick={() => onNavigate('chat')}
              shimmerColor="#06B6D4"
              background="rgba(37, 99, 235, 0.9)"
            >
              <Bot className="w-4 h-4 text-cyan-200" /> AI Oracle
            </ShimmerButton>
          </div>
        </motion.div>

        {/* TARGET ASTROLOGY PROFILE & SUBJECT MODAL ("FOR WHOM") */}
        <AstrologyTargetProfileModal
          isOpen={isTargetModalOpen}
          onClose={() => setIsTargetModalOpen(false)}
          onSaveProfile={(prof) => setTargetProfile(prof)}
          currentProfile={userProfile}
        />

        {/* 🌐 RELIGION PERSPECTIVE & LANGUAGE SELECTOR BAR */}
        <motion.div variants={staggerItem} className="p-4 sm:p-5 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-sans">
          {/* Religion View Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="font-bold text-amber-400 font-mono flex items-center gap-1.5 shrink-0">
              <Globe2 className="w-4 h-4 text-amber-400" /> {i18n.viewByReligion}
            </span>
            <div className="flex overflow-x-auto no-scrollbar pb-1 sm:pb-0 gap-1.5 max-w-full">
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
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
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
          <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-white/10">
            <span className="font-bold text-cyan-400 font-mono">{i18n.languageSelect}</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as any)}
              className="bg-[#0B1220] border border-white/10 text-white rounded-xl px-3 py-1.5 font-bold focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="en">🇺🇸 English</option>
              <option value="ar">🇸🇦 العربية (Arabic)</option>
              <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
              <option value="ur">🇵🇰 اردو (Urdu)</option>
              <option value="es">🇪🇸 Español (Spanish)</option>
              <option value="fr">🇫🇷 Français (French)</option>
              <option value="zh">🇨🇳 中文 (Chinese)</option>
            </select>
          </div>
        </motion.div>

        {/* 📈 ENTERPRISE COSMIC ANALYTICS KPI BAR */}
        <motion.div variants={staggerItem}>
          <CosmicAnalyticsKPI
            score={cosmicScoreData.score}
            exaltedCount={cosmicScoreData.exaltedCount}
            ownSignCount={cosmicScoreData.ownSignCount}
            retrogradeCount={cosmicScoreData.retrogradeCount}
          />
        </motion.div>

        {/* 🪄 MAGIC UI INFINITE MARQUEE COSMIC TICKER */}
        <motion.div variants={staggerItem} className="rounded-2xl bg-[#111827]/90 border border-cyan-500/30 shadow-xl overflow-hidden py-1.5 backdrop-blur-xl">
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
              <Clock className="w-3.5 h-3.5 text-purple-400" /> Active Dasha: <strong className="text-white">{dashaInfo.mahadasha} - {dashaInfo.antardasha}</strong>
            </span>
            <span className="text-xs font-mono text-rose-300 font-bold px-4 flex items-center gap-1.5 shrink-0">
              <Activity className="w-3.5 h-3.5 text-rose-400" /> Rahu Kalam: <strong className="text-white">{panchang.rahuKalam}</strong>
            </span>
          </Marquee>
        </motion.div>

        {/* SECTION 2: HERO AI DAILY SUMMARY & COMPUTED PLANETARY POSITIONS GRID */}
        <motion.div variants={staggerItem} className="relative rounded-3xl overflow-hidden bg-[#111827] border border-white/10 shadow-2xl p-6 sm:p-8">
          {/* Magic UI Border Beam */}
          <BorderBeam size={250} duration={12} delay={0} colorFrom="#06B6D4" colorTo="#3B82F6" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: PERSONALIZED COSMIC SYNTHESIS & DYNAMIC SCORE */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#06B6D4] text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Today's Dynamic Cosmic Synthesis</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F8FAFC]">
                Welcome Back, <span className="text-[#2563EB]">{targetProfile.name}</span>
              </h2>

              <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 text-xs text-[#CBD5E1]">
                <p className="font-semibold text-[#D4AF37] flex items-center gap-1.5 font-mono">
                  <Activity className="w-4 h-4 text-[#D4AF37]" /> Astronomical Alignment Summary:
                </p>
                <p className="leading-relaxed">
                  Sun in <strong className="text-white">{keyPlanetsHighlight.sun?.sign}</strong> illuminates your <strong className="text-white">{keyPlanetsHighlight.sun?.house}</strong>. 
                  Moon in <strong className="text-white">{keyPlanetsHighlight.moon?.sign}</strong> ({keyPlanetsHighlight.moon?.nakshatra}) provides intuitive clarity during <strong className="text-[#22C55E]">{panchang.abhijitMuhurta}</strong>.
                </p>
              </div>

              {/* FIX 3: DYNAMIC COSMIC SCORE BADGES */}
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <span className="px-3.5 py-2 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  Cosmic Score: <NumberTicker value={cosmicScoreData.score} className="text-[#D4AF37] font-bold" />/100
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-xs font-mono font-semibold">
                  Exalted: {cosmicScoreData.exaltedCount}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-xs font-mono font-semibold">
                  Own Sign: {cosmicScoreData.ownSignCount}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono font-semibold">
                  Abhijit: {panchang.abhijitMuhurta}
                </span>
              </div>

              {/* 🪐 ANIMATED CELESTIAL ZODIAC ORBIT VISUALIZER */}
              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-[#0B1220] border border-cyan-500/30 space-y-2 shadow-2xl overflow-hidden relative">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Animated Zodiac Orbit & Ephemeris Wheel
                    </span>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">Interactive 3D Rings</span>
                  </div>
                  <CelestialZodiacOrbit planetPositions={planetPositions} onSelectPlanet={(p) => setSelectedPlanet(p)} />
                </div>
              </div>
            </div>

            {/* RIGHT: DYNAMIC REAL-TIME 9 PLANETS POSITIONS GRID */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-semibold text-[#06B6D4] flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-[#06B6D4]" /> Live Ephemeris Positions (Computed)
                </span>
                <span className="text-[10px] font-mono text-[#94A3B8]">Lahiri Ayanamsha</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {planetPositions.map((p, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedPlanet(p)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`p-2.5 rounded-xl bg-[#111827] border ${p.border} text-left space-y-0.5 hover:bg-[#1E293B] hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all cursor-pointer group`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${p.color}`}>{p.symbol} {p.name}</span>
                      {p.retrograde && <span className="text-[9px] font-mono text-[#EF4444] font-bold animate-pulse">Rx</span>}
                    </div>
                    <span className="text-[11px] font-semibold text-white block truncate">{p.sign}</span>
                    <span className="text-[10px] font-mono text-[#94A3B8] block">{p.degree}</span>
                  </motion.button>
                ))}
              </div>

              {/* 📊 ELEMENTAL BALANCE TELEMETRY & RECHARTS RADAR */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Elemental Balance Radar (Recharts):
                  </span>
                  <span className="text-[#94A3B8]">4 Elements Breakdown</span>
                </div>

                {/* Recharts Radar Visualization */}
                <div className="h-40 w-full bg-[#111827]/80 rounded-2xl border border-white/10 p-1 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fontSize: 9, fill: '#CBD5E1' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 8 }} />
                      <Radar name="Elemental Strength" dataKey="A" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                    <span className="font-bold block">🔥 Fire</span>
                    <span>{elementalBalance.firePct}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    <span className="font-bold block">🌍 Earth</span>
                    <span>{elementalBalance.earthPct}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                    <span className="font-bold block">💨 Air</span>
                    <span>{elementalBalance.airPct}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                    <span className="font-bold block">🌊 Water</span>
                    <span>{elementalBalance.waterPct}%</span>
                  </div>
                </div>
              </div>

              {/* ⏰ CURRENT PLANETARY HORA (HOUR) WIDGET */}
              <div className="p-3 rounded-xl bg-[#111827] border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <div>
                    <span className="font-bold text-white">Active Hora: <strong className="text-cyan-300">{currentHora.name} Hour</strong></span>
                    <span className="text-[10px] text-slate-400 block">{currentHora.desc}</span>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0">Live Hora</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* PLANET DETAIL MODAL */}
        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="max-w-lg w-full rounded-3xl bg-[#111827] border border-white/10 p-6 space-y-4 shadow-2xl relative text-left"
              >
                <button
                  onClick={() => setSelectedPlanet(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <span className="text-2xl font-bold">{selectedPlanet.symbol}</span>
                  <div>
                    <h3 className={`text-lg font-semibold ${selectedPlanet.color}`}>{selectedPlanet.name} Overview & Remedies</h3>
                    <p className="text-xs text-[#94A3B8]">{selectedPlanet.sign} • {selectedPlanet.house}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10">
                    <span className="text-[10px] text-[#94A3B8] block">Longitudinal Position</span>
                    <span className="font-semibold text-white">{selectedPlanet.degree}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10">
                    <span className="text-[10px] text-[#94A3B8] block">Daily Speed</span>
                    <span className="font-semibold text-white">{selectedPlanet.speed}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10">
                    <span className="text-[10px] text-[#94A3B8] block">Elemental Dominance</span>
                    <span className="font-semibold text-[#06B6D4]">{selectedPlanet.element}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10">
                    <span className="text-[10px] text-[#94A3B8] block">Nakshatra Station</span>
                    <span className="font-semibold text-[#22C55E]">{selectedPlanet.nakshatra} (Pada {selectedPlanet.pada})</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-[#D4AF37] font-mono block">Astrological Dignity / Strength:</span>
                  <p className="text-xs text-white font-semibold">{selectedPlanet.strength}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-[#D4AF37] font-mono block">Vedic Astrological Remedies:</span>
                  <p className="text-xs text-[#CBD5E1]">{selectedPlanet.remedies}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 3: QUICK ACTIONS GRID (8 ESSENTIAL CORE TOOLS) */}
        <motion.div variants={staggerItem} className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#2563EB]" /> Essential Quick Actions
            </h3>
            <span className="text-xs font-mono text-[#94A3B8]">8 Core Astrological Tools</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { id: 'birth-chart', title: 'Birth Chart', desc: 'Natal Kundli', icon: <Compass className="w-5 h-5 text-[#2563EB]" /> },
              { id: 'horoscope', title: 'Horoscope', desc: 'Transits & energy', icon: <Sun className="w-5 h-5 text-[#F59E0B]" /> },
              { id: 'compatibility', title: 'Compatibility', desc: '36-Guna match', icon: <Heart className="w-5 h-5 text-[#EC4899]" /> },
              { id: 'islamic-suite', title: 'Islamic Hub', desc: 'Qur\'an & Hadith', icon: <Moon className="w-5 h-5 text-[#22C55E]" /> },
              { id: 'dream-interpreter', title: 'Dream Engine', desc: 'Symbol analysis', icon: <CloudMoon className="w-5 h-5 text-[#7C3AED]" /> },
              { id: 'remedies', title: 'Remedies', desc: 'Gemstones & Yantras', icon: <Award className="w-5 h-5 text-[#D4AF37]" /> },
              { id: 'live-diagnostics', title: 'Diagnostics', desc: 'What & Solution', icon: <Activity className="w-5 h-5 text-[#EF4444]" /> },
              { id: 'tools-catalog', title: '150+ Tools', desc: 'Full Directory', icon: <Layers className="w-5 h-5 text-[#06B6D4]" /> },
            ].map((tool) => (
              <motion.button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-2xl bg-[#111827]/90 border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(37,99,235,0.25)] transition-all duration-300 text-left space-y-2.5 group cursor-pointer shadow-lg backdrop-blur-xl"
              >
                <div className="p-2.5 rounded-xl bg-[#0B1220] border border-white/10 w-fit group-hover:border-blue-400/40 group-hover:scale-110 transition-all duration-300">
                  {tool.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{tool.title}</h4>
                  <p className="text-[10px] text-[#94A3B8]">{tool.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 🕸️ INTERACTIVE PLANETARY ASPECT NETWORK GRAPH */}
        <motion.div variants={staggerItem}>
          <PlanetaryAspectGraph planetPositions={planetPositions} />
        </motion.div>

        {/* 📅 COSMIC TRANSIT & PLANETARY INGRESS CALENDAR */}
        <motion.div variants={staggerItem}>
          <CosmicTransitCalendar />
        </motion.div>

        {/* ⏱️ DAILY MUHURTA & HOURLY HORA SCHEDULE PLANNER */}
        <motion.div variants={staggerItem}>
          <DailyMuhurtaPlanner />
        </motion.div>

        {/* 🌙 28 LUNAR MANSIONS (MANAZIL AL-QAMAR / NAKSHATRAS) HUB */}
        <motion.div variants={staggerItem}>
          <LunarMansionsWheel />
        </motion.div>

        {/* 💞 SYNASTRY DUAL-RING CHART OVERLAY */}
        <motion.div variants={staggerItem}>
          <SynastryOverlayChart personAPositions={planetPositions} />
        </motion.div>

        {/* 🕸️ INTERACTIVE ASTROLOGICAL MIND MAP NODE GRAPH */}
        <motion.div variants={staggerItem}>
          <AstrologicalMindMap />
        </motion.div>

        {/* 📊 COSMIC CHART ANALYTICS & SHADBALA STRENGTH */}
        <motion.div variants={staggerItem}>
          <CosmicChartAnalytics />
        </motion.div>

        {/* SECTION 4: LIVE PANCHANG SNAPSHOT & ANIMATED MOON PHASE VISUAL */}
        <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
          
          {/* TODAY'S COMPUTED PANCHANG SNAPSHOT */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#111827] border border-white/10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#F59E0B]" /> Live Panchang Ephemeris Snapshot
              </h3>
              <span className="text-[10px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-0.5 rounded-full border border-[#F59E0B]/30 font-semibold">
                Lahiri UTC Sync
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-0.5">
                <span className="text-[10px] text-[#94A3B8] block">Tithi (Lunar Day Phase)</span>
                <span className="font-semibold text-[#F59E0B]">{panchang.tithi}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-0.5">
                <span className="text-[10px] text-[#94A3B8] block">Nakshatra (Lunar Mansion)</span>
                <span className="font-semibold text-[#22C55E]">{panchang.nakshatra}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-0.5">
                <span className="text-[10px] text-[#94A3B8] block">Yoga (Sol-Lunar Harmony)</span>
                <span className="font-semibold text-[#06B6D4]">{panchang.yoga}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-0.5">
                <span className="text-[10px] text-[#94A3B8] block">Golden Window (Abhijit)</span>
                <span className="font-semibold text-[#22C55E]">{panchang.abhijitMuhurta}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-0.5">
                <span className="text-[10px] text-[#94A3B8] block">Friction Hours (Rahu Kalam)</span>
                <span className="font-semibold text-[#EF4444]">{panchang.rahuKalam}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-0.5">
                <span className="text-[10px] text-[#94A3B8] block">Karana (Action Energy)</span>
                <span className="font-semibold text-[#CBD5E1]">{panchang.karana}</span>
              </div>
            </div>
          </div>

          {/* FIX 7: MOON PHASE ANIMATED VISUAL COMPONENT */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#111827] border border-white/10 space-y-4 shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                <Moon className="w-4 h-4 text-[#06B6D4]" /> Lunar Phase Visualizer
              </h3>
              <span className="text-[10px] font-mono text-[#06B6D4] bg-[#06B6D4]/10 px-2.5 py-0.5 rounded-full border border-[#06B6D4]/30 font-semibold">
                Real-Time Graphic
              </span>
            </div>

            <MoonPhaseVisual panchang={panchang} />
          </div>

        </motion.div>

        {/* SECTION 5: ACTIVE DASHA & LIVE DIAGNOSTICS PREVIEW */}
        <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
          
          {/* ACTIVE DASHA SNAPSHOT WITH PROGRESS BAR */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-[#111827] border border-white/10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7C3AED]" /> Active Dasha Period
              </h3>
              <span className="text-[10px] font-mono text-[#7C3AED] bg-[#7C3AED]/10 px-2.5 py-0.5 rounded-full border border-[#7C3AED]/30 font-semibold">
                {dashaInfo.mahadasha} Mahadasha
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#7C3AED] font-semibold">{dashaInfo.mahadasha} → {dashaInfo.antardasha} Sub-Period</span>
                <span className="text-[#94A3B8]">Timeline: {dashaInfo.startDate} to {dashaInfo.endDate}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-[#0B1220] border border-white/10 overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full transition-all duration-500" style={{ width: `${dashaInfo.progressPercent}%` }} />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>Progress: {dashaInfo.progressPercent}%</span>
                <span>Vimshottari Timeline</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 text-xs text-[#CBD5E1]">
                <p className="font-semibold text-[#7C3AED] font-mono">Astrological Insight:</p>
                <p className="text-[11px] leading-relaxed pt-0.5">
                  {dashaInfo.interpretation}
                </p>
              </div>
            </div>
          </div>

          {/* FIX 4: LIVE DIAGNOSTICS BANNER (DYNAMIC WHAT/WHY/SOLUTION) */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-[#111827] border border-[#EF4444]/40 shadow-2xl space-y-4 flex flex-col justify-between relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2 text-[#EF4444] text-xs font-mono font-semibold mb-1">
                  <Activity className="w-4 h-4 text-[#EF4444] animate-pulse" />
                  <span>Today's Cosmic Diagnostic & Solution</span>
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC]">Active Life Transits: What, Why & Multi-Religious Solutions</h3>
              </div>

              <button
                onClick={() => onNavigate('live-diagnostics')}
                className="px-3.5 py-1.5 rounded-xl bg-[#EF4444]/20 hover:bg-[#EF4444]/30 text-rose-200 border border-[#EF4444]/40 text-xs font-mono font-semibold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
              >
                <span>Full Diagnostics</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 text-xs">
              {/* 1. WHAT IS HAPPENING */}
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-[#2563EB]/40 space-y-1">
                <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider block flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#2563EB]" /> 1. What is Happening Today
                </span>
                <p className="text-[#CBD5E1] leading-relaxed text-[11px]">
                  {dynamicDiagnostics.what}
                </p>
              </div>

              {/* 2. WHY IT IS HAPPENING */}
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-[#F59E0B]/40 space-y-1">
                <span className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider block flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#F59E0B]" /> 2. Why it is Happening (Root Cause)
                </span>
                <p className="text-[#CBD5E1] leading-relaxed text-[11px]">
                  {dynamicDiagnostics.why}
                </p>
              </div>

              {/* 3. SOLUTION & PRACTICAL REMEDY */}
              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-[#22C55E]/40 space-y-1.5">
                <span className="text-xs font-mono font-bold text-[#22C55E] uppercase tracking-wider block flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" /> 3. Prescribed Solution & Multi-Religious Remedy
                </span>
                <p className="text-[#22C55E] leading-relaxed text-[11px] font-medium">
                  {dynamicDiagnostics.solution}
                </p>

                {/* MULTI-RELIGIOUS QUICK REMEDY SNIPPETS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                  <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                    <span className="font-bold block">🕌 Islamic:</span>
                    <span>Recite Ayatul Kursi & Give Sadaqah</span>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300">
                    <span className="font-bold block">🕉️ Vedic:</span>
                    <span>Surya Arghya & Yellow Sapphire</span>
                  </div>
                  <div className="p-2 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300">
                    <span className="font-bold block">🧠 CBT:</span>
                    <span>4-7-8 Breathwork & Task Audit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

        {/* SECTION 6: RECENT ACTIVITY FEED & DAILY COSMIC WISDOM CARD */}
        <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
          
          {/* FIX 9: RECENT ACTIVITY FEED CARD */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-[#111827] border border-white/10 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#06B6D4]" /> Recent System Calculations
              </h3>
              <span className="text-[10px] font-mono text-[#94A3B8]">Interactive Feed</span>
            </div>

            <div className="space-y-2.5">
              {recentActivities.map((act) => (
                <button
                  key={act.id}
                  onClick={() => onNavigate(act.tab)}
                  className="w-full p-3 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white group-hover:text-[#2563EB] transition-colors">{act.text}</p>
                      <span className="text-[10px] font-mono text-[#94A3B8]">{act.time}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded-full border border-[#06B6D4]/20 shrink-0 flex items-center gap-1">
                    {act.badge}
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* FIX 10: DAILY COSMIC WISDOM & LEARNING TIP CARD */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-[#111827] border border-white/10 space-y-4 shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-semibold text-[#F8FAFC] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Daily Cosmic Wisdom & Tip
              </h3>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 font-semibold">
                Vedic Principle
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37]">
                <Zap className="w-4 h-4 text-[#D4AF37]" />
                <span>Karma Bhava & Solar Timing Principle</span>
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                When the Sun transits Kendra houses (1st, 4th, 7th, 10th), executive focus and leadership output peak. 
                Utilize morning solar hours for critical decisions, strategic communications, and initiating long-term endeavors.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#94A3B8]">Learn natal chart dignities & remedies</span>
              <button
                onClick={() => onNavigate('tools-catalog')}
                className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md"
              >
                <span>Explore Catalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </motion.div>

        {/* 📋 SEARCHABLE & SORTABLE EPHEMERIS DATA TABLE */}
        <motion.div variants={staggerItem}>
          <EphemerisDataTable planetPositions={planetPositions} />
        </motion.div>

        {/* KEYBOARD SHORTCUT FOOTER HINTS */}
        <motion.div variants={staggerItem} className="p-3 rounded-2xl bg-[#111827]/80 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#94A3B8]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[10px]">Enter ↵</kbd> Jump Search
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[10px]">ESC</kbd> Close Search
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white text-[10px]">Click</kbd> Planet Details
            </span>
          </div>
          <span>ASTRO360 Mission Control v3.0</span>
        </motion.div>

      </div>

      {/* FLOATING AI ASSISTANT BUTTON */}
      <button
        onClick={() => onNavigate('chat')}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-2xl transition-transform hover:scale-110 cursor-pointer border border-white/20 flex items-center justify-center group z-40"
        title="Open AI Oracle"
      >
        <Bot className="w-6 h-6" />
      </button>
    </motion.div>
  );
}
