/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import {
  Sparkles, Menu, X, LayoutDashboard, MessageCircle, ChevronDown, User, Users, Globe2, Bell,
  Compass, Moon, ShieldCheck, Activity, Gem, HeartHandshake, Globe, Search, Command, CloudMoon,
  Zap, Wrench, DollarSign, Wallet, ArrowLeft, Home, Cpu, Layers,
  AlertTriangle, BarChart2, BookOpen, Calendar, Clock, Eye, FileText, Hash, Map, MapPin,
  Music, Network, Radar, Shield, Sun, Sunrise, TrendingUp, Radio,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRADITIONS, CategoryInfo, TraditionGroup, UserProfile } from './types';
import { useWalletStore } from './stores/walletStore';
import CommandPaletteModal from './components/CommandPaletteModal';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalLanguageSelector from './components/GlobalLanguageSelector';
import { AstroMiniAudioPlayer, AstroAudioPlayer } from './components/audio';
import { AstroNotificationCenterModal, AstroNotificationPrePermissionCard } from './components/notifications';
import { useGlobalConfig } from './context/GlobalConfigContext';
import { Toaster, toast } from 'sonner';
import { AstroNavigationShell, OmniAppSidebar } from './components/navigation';
import CosmicCelestialLoader from './components/ui/CosmicCelestialLoader';
import { updatePageSEO } from './lib/seoManager';
import { warmCosmicProfileCache, prefetchRouteData } from './lib/prefetchEngine';
import { lazyWithRetry } from './lib/lazyWithRetry';

// Code-split dynamic views for instant landing page load
const LandingPage = lazyWithRetry(() => import('./components/landing/LandingPage'));
const OmniSimpleHome = lazyWithRetry(() => import('./components/omni/OmniSimpleHome'));
const OmniForecastView = lazyWithRetry(() => import('./components/omni/OmniForecastView'));
const OmniAskAssistant = lazyWithRetry(() => import('./components/omni/OmniAskAssistant'));
const OmniChartsView = lazyWithRetry(() => import('./components/omni/OmniChartsView'));
const OmniMoreHub = lazyWithRetry(() => import('./components/omni/OmniMoreHub'));
const OmniMeView = lazyWithRetry(() => import('./components/omni/OmniMeView'));
const OmniOnboardingWizard = lazyWithRetry(() => import('./components/omni/OmniOnboardingWizard'));
const OmniFreeToolsHub = lazyWithRetry(() => import('./components/free-tools/OmniFreeToolsHub'));
const OmniCompatibilityLab = lazyWithRetry(() => import('./components/omni/OmniCompatibilityLab'));
const SEOTopicHub = lazyWithRetry(() => import('./components/seo/SEOTopicHub'));
const OmniSEOGrowthSuite = lazyWithRetry(() => import('./components/seo/OmniSEOGrowthSuite'));
const KeywordResearchLab = lazyWithRetry(() => import('./components/seo-lab/KeywordResearchLab'));
const BacklinkOpportunityLab = lazyWithRetry(() => import('./components/backlink-lab/BacklinkOpportunityLab'));
const CosmicNewsIntelligenceHub = lazyWithRetry(() => import('./components/news-prediction/CosmicNewsIntelligenceHub'));

// Heavy secondary astrology suites
const CosmicIntelligenceCenter = lazyWithRetry(() => import('./components/CosmicIntelligenceCenter'));
const AstrologyChat = lazyWithRetry(() => import('./components/AstrologyChat'));
const TraditionView = lazyWithRetry(() => import('./components/TraditionView'));
const UnifiedChartEngine = lazyWithRetry(() => import('./components/UnifiedChartEngine'));
const UnifiedIslamicSuite = lazyWithRetry(() => import('./components/UnifiedIslamicSuite'));
const BirthChartGenerator = lazyWithRetry(() => import('./components/BirthChartGenerator'));
const HolisticAdvisor = lazyWithRetry(() => import('./components/HolisticAdvisor'));
const LiveCosmicDiagnostics = lazyWithRetry(() => import('./components/LiveCosmicDiagnostics'));
const CustomRemedialMediumEngine = lazyWithRetry(() => import('./components/CustomRemedialMediumEngine'));
const AstroMultiTraditionRemedySuite = lazyWithRetry(() => import('./components/AstroMultiTraditionRemedySuite'));
const GlobalWisdomSuite = lazyWithRetry(() => import('./components/GlobalWisdomSuite'));
const AstroSynastryMatchmaker = lazyWithRetry(() => import('./components/AstroSynastryMatchmaker'));
const Astro150ToolsCatalog = lazyWithRetry(() => import('./components/Astro150ToolsCatalog'));
const DreamInterpretationEngine = lazyWithRetry(() => import('./components/DreamInterpretationEngine'));
const UniversalProblemSolverSuite = lazyWithRetry(() => import('./components/UniversalProblemSolverSuite'));
const PremiumHoroscopeEngine = lazyWithRetry(() => import('./components/PremiumHoroscopeEngine'));
const SpiritualTraditionsModule = lazyWithRetry(() => import('./components/SpiritualTraditionsModule'));
const AstrologyControlCenter = lazyWithRetry(() => import('./components/AstrologyControlCenter'));
const CommunityConsultationHub = lazyWithRetry(() => import('./components/CommunityConsultationHub'));
const AuthScreen = lazyWithRetry(() => import('./components/AuthScreen'));
const DivisionalChartsSuite = lazyWithRetry(() => import('./components/DivisionalChartsSuite'));
const GemstoneRudrakshaSuite = lazyWithRetry(() => import('./components/GemstoneRudrakshaSuite'));
const NumerologyNameSuite = lazyWithRetry(() => import('./components/NumerologyNameSuite'));
const TarotIChingSuite = lazyWithRetry(() => import('./components/TarotIChingSuite'));
const TimeHorizonForecastSuite = lazyWithRetry(() => import('./components/TimeHorizonForecastSuite'));
const DoshaRemedyEngine = lazyWithRetry(() => import('./components/DoshaRemedyEngine'));
const CosmicBiorhythmTracker = lazyWithRetry(() => import('./components/CosmicBiorhythmTracker'));
const SacredChakraAlignment = lazyWithRetry(() => import('./components/SacredChakraAlignment'));
const CosmicFengShuiMatrix = lazyWithRetry(() => import('./components/CosmicFengShuiMatrix'));
const ElectionalMuhurtaEngine = lazyWithRetry(() => import('./components/ElectionalMuhurtaEngine'));
const PlanetaryHorasTracker = lazyWithRetry(() => import('./components/PlanetaryHorasTracker'));
const SacredMantraSoundboard = lazyWithRetry(() => import('./components/SacredMantraSoundboard'));
const PlanetaryTransitRadar = lazyWithRetry(() => import('./components/PlanetaryTransitRadar'));
const PanchangDeitiesEngine = lazyWithRetry(() => import('./components/PanchangDeitiesEngine'));
const CosmicCompassVisualizer = lazyWithRetry(() => import('./components/CosmicCompassVisualizer'));
const CosmicTransitCalendar = lazyWithRetry(() => import('./components/CosmicTransitCalendar'));
const SynastryOverlayChart = lazyWithRetry(() => import('./components/SynastryOverlayChart'));
const CosmicChartAnalytics = lazyWithRetry(() => import('./components/CosmicChartAnalytics'));
const AstrologyLearningHub = lazyWithRetry(() => import('./components/AstrologyLearningHub'));

// Studio tools
const ExecutiveReportGenerator = lazyWithRetry(() => import('./components/ExecutiveReportGenerator'));
const AdminAnalyticsDashboard = lazyWithRetry(() => import('./components/AdminAnalyticsDashboard'));
const CosmicStudioSuite = lazyWithRetry(() => import('./components/CosmicStudioSuite'));
const CosmicAtmosphereCanvas = lazyWithRetry(() => import('./components/3d/CosmicAtmosphereCanvas'));
const AstroOmniResearchSuite = lazyWithRetry(() => import('./components/AstroOmniResearchSuite').then(m => ({ default: m.AstroOmniResearchSuite })));
const BirthTimeRectificationSuite = lazyWithRetry(() => import('./components/BirthTimeRectificationSuite'));
const AstrologicalMindMap = lazyWithRetry(() => import('./components/AstrologicalMindMap'));
const AstroCartographyMatrix = lazyWithRetry(() => import('./components/AstroCartographyMatrix'));
const CosmicPassportCard = lazyWithRetry(() => import('./components/social/CosmicPassportCard'));
const EmbeddableWidgetGenerator = lazyWithRetry(() => import('./components/widgets/EmbeddableWidgetGenerator'));
const ProgrammaticSeoDirectory = lazyWithRetry(() => import('./components/seo/ProgrammaticSeoDirectory'));
const InteractiveDualChartStudio = lazyWithRetry(() => import('./components/charts/InteractiveDualChartStudio'));
const ExecutiveCosmicDossierSuite = lazyWithRetry(() => import('./components/dossier/ExecutiveCosmicDossierSuite'));
const AstroDeterministicCopilot = lazyWithRetry(() => import('./components/ai/AstroDeterministicCopilot'));
const PwaCosmicBriefing = lazyWithRetry(() => import('./components/pwa/PwaCosmicBriefing'));
const ClassicalShlokaLibrary = lazyWithRetry(() => import('./components/scripture/ClassicalShlokaLibrary'));
const SabianSymbolsDegreeExplorer = lazyWithRetry(() => import('./components/sabian/SabianSymbolsDegreeExplorer'));
const MultiSystemEphemerisDiagnosticLab = lazyWithRetry(() => import('./components/diagnostics/MultiSystemEphemerisDiagnosticLab'));
const PlanetaryFrequencyStudio = lazyWithRetry(() => import('./components/audio/PlanetaryFrequencyStudio'));
const KundliMatchingSuite = lazyWithRetry(() => import('./components/compatibility/KundliMatchingSuite'));
const PlanetaryHoraClock = lazyWithRetry(() => import('./components/timing/PlanetaryHoraClock'));
const HighPrecisionPredictionStudio = lazyWithRetry(() => import('./components/prediction/HighPrecisionPredictionStudio').then(m => ({ default: m.HighPrecisionPredictionStudio })));

const STORAGE_KEY = 'astroverse_profile';
const TAB_KEY = 'astroverse_tab';

const EMPTY_PROFILE: UserProfile = {
  name: '',
  email: '',
  phone: '',
  gender: 'universal',
  dob: '',
  time: '12:00',
  location: '',
  preferredSystem: 'vedic',
  careerGoal: 'Personal Growth & Prosperity',
  relationshipStatus: 'Seeking Harmony',
  primaryLifeFocus: 'Cosmic Alignment & Purpose',
};

function loadProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.name === 'string' && parsed.name.trim().length > 0) {
        return { ...EMPTY_PROFILE, ...parsed };
      }
    }
  } catch (e) {
    console.warn("localStorage read error", e);
  }
  return EMPTY_PROFILE;
}

function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    localStorage.setItem('astro_has_onboarded', 'true');
  } catch (e) {
    console.warn("localStorage unavailable", e);
  }
}

// Helper to resolve route and tab from current window location
function resolveInitialTab(): string {
  if (typeof window === 'undefined') return 'landing';
  const searchParams = new URLSearchParams(window.location.search);
  const tabParam = searchParams.get('tab');
  if (tabParam) return tabParam;

  const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!rawPath) return 'landing';

  if (rawPath === 'seo-lab' || rawPath === 'keywords' || rawPath === 'seo-lab/keywords') return 'seo-lab';
  if (rawPath === 'backlink-lab' || rawPath === 'backlinks' || rawPath === 'link-lab') return 'backlink-lab';
  if (rawPath === 'news-intelligence' || rawPath === 'cosmic-news' || rawPath === 'mundane' || rawPath === 'news-prediction') return 'news-intelligence';
  if (rawPath.startsWith('learn/')) return 'learning-hub';
  if (rawPath === 'birth-chart' || rawPath === 'kundli') return 'birth-chart';
  if (rawPath === 'vedic-astrology' || rawPath === 'western-astrology' || rawPath === 'panchanga' || rawPath === 'methodology') return rawPath;
  if (rawPath === 'compatibility' || rawPath === 'ashta-koota') return 'compatibility';
  if (rawPath === 'dasha') return 'dasha';
  if (rawPath === 'transits' || rawPath === 'transit-radar') return 'transits';
  if (rawPath === 'muhurta' || rawPath === 'electional-muhurta') return 'muhurta';
  if (rawPath === 'astrocartography' || rawPath === 'astro-cartography') return 'astrocartography';
  if (rawPath === 'free-tools') return 'free-tools';

  return rawPath;
}

export default function AppContent() {
  const { config, updateConfig } = useGlobalConfig();
  const [userProfile, setUserProfile] = useState<UserProfile>(loadProfile);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed && typeof parsed.name === 'string' && parsed.name.trim().length > 0 && parsed.dob);
      }
      return false;
    } catch {
      return false;
    }
  });
  
  // Initialize activeTab with query param, pathname or fallback to landing
  const [activeTab, setActiveTab] = useState<string>(resolveInitialTab);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(() => {
    const init = resolveInitialTab();
    return init === 'landing' ? ['landing'] : ['landing', init];
  });

  // Synchronize SEO tags and history on load
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.history) {
        const initial = resolveInitialTab();
        updatePageSEO(initial);
      }
    } catch (e) {
      console.warn("history init error", e);
    }
  }, []);

  const handleResetAllData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TAB_KEY);
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn("Storage reset error", e);
    }
    setUserProfile(EMPTY_PROFILE);
    setHasOnboarded(false);
    setShowOnboarding(false);
    setLandingPreset(undefined);
    setActiveTab('landing');
    setNavigationHistory(['landing']);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [landingPreset, setLandingPreset] = useState<Partial<UserProfile> | undefined>(undefined);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mainScrollRef = useRef<HTMLDivElement>(null);

  // Scroll to absolute top whenever activeTab or navigation changes
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
      mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [activeTab]);

  // Persist active tab and dynamically synchronize SEO Head tags & JSON-LD
  useEffect(() => {
    localStorage.setItem(TAB_KEY, activeTab);
    updatePageSEO(activeTab);
  }, [activeTab]);

  // Background Cache Warming: Precomputes natal coordinates & today's summary in idle time
  useEffect(() => {
    if (userProfile && userProfile.dob) {
      warmCosmicProfileCache(userProfile);
    }
  }, [userProfile]);

  // Navigate with full history tracking & browser URL sync
  const navigateTo = useCallback((tabInput: string, replace = false, forceBypass = false) => {
    const tab = (tabInput || '').replace(/^\/+/, '').trim();
    const isPublicTab = (
      tab === 'home' ||
      tab === 'landing' ||
      tab === 'overview' ||
      tab === 'dashboard' ||
      tab === 'free-tools' ||
      tab === 'tools-catalog' ||
      tab === 'birth-chart' ||
      tab === 'vedic-astrology' ||
      tab === 'western-astrology' ||
      tab === 'panchanga' ||
      tab === 'compatibility' ||
      tab === 'dasha' ||
      tab === 'transits' ||
      tab === 'muhurta' ||
      tab === 'astrocartography' ||
      tab === 'astro-cartography' ||
      tab === 'methodology' ||
      tab === 'learning-hub' ||
      tab.startsWith('learn/') ||
      tab === 'seo' ||
      tab === 'seo-lab' ||
      tab === 'keyword-lab' ||
      tab === 'keywords' ||
      tab === 'seo-lab/keywords' ||
      tab === 'backlink-lab' ||
      tab === 'backlinks' ||
      tab === 'link-lab' ||
      tab === 'news-intelligence' ||
      tab === 'cosmic-news' ||
      tab === 'mundane' ||
      tab === 'news-prediction' ||
      tab === 'passport' ||
      tab === 'widgets' ||
      tab === 'embed' ||
      tab === 'directory' ||
      tab === 'celebrities' ||
      tab === 'chart-studio' ||
      tab === 'dual-chart' ||
      tab === 'dossier' ||
      tab === 'pdf-report' ||
      tab === 'copilot' ||
      tab === 'ask' ||
      tab === 'pwa' ||
      tab === 'briefing' ||
      tab === 'shlokas' ||
      tab === 'scripture' ||
      tab === 'sabian' ||
      tab === 'sabian-symbols' ||
      tab === 'ephemeris-lab' ||
      tab === 'diagnostic-lab' ||
      tab === 'vargas' ||
      tab === 'divisional-charts' ||
      tab === 'shadbala' ||
      tab === 'planetary-strengths' ||
      tab === 'sadesati' ||
      tab === 'saturn-transit' ||
      tab === 'report-generator' ||
      tab === 'executive-report' ||
      tab === 'seo-lab/backlinks' ||
      tab === 'frequencies' ||
      tab === 'binaural' ||
      tab === 'sound-studio' ||
      tab === 'planetary-frequencies' ||
      tab === 'compatibility' ||
      tab === 'synastry' ||
      tab === 'kundli-matching' ||
      tab === 'match' ||
      tab === 'planetary-horas' ||
      tab === 'horas' ||
      tab === 'hora-clock' ||
      tab === 'btr-suite' ||
      tab === 'gemstone-suite' ||
      tab === 'gemstones' ||
      tab === 'numerology' ||
      tab === 'numerology-suite' ||
      tab === 'tarot' ||
      tab === 'tarot-iching' ||
      tab === 'time-horizon' ||
      tab === 'career' ||
      tab === 'dosha-engine' ||
      tab === 'biorhythm-tracker' ||
      tab === 'chakras' ||
      tab === 'chakra-alignment' ||
      tab === 'feng-shui' ||
      tab === 'fengshui-matrix' ||
      tab === 'electional-muhurta' ||
      tab === 'mantras' ||
      tab === 'mantra-soundboard' ||
      tab === 'transit-radar' ||
      tab === 'panchang-deities' ||
      tab === 'panchang' ||
      tab === 'cosmic-compass' ||
      tab === 'transit-calendar' ||
      tab === 'synastry-overlay' ||
      tab === 'mind-map' ||
      tab === 'chart-analytics' ||
      tab === 'admin-dashboard' ||
      tab === 'control-center' ||
      tab === 'studio' ||
      tab === 'horoscope' ||
      tab === 'dream-interpreter' ||
      tab === 'dream' ||
      tab === 'problem-solver' ||
      tab === 'spiritual-traditions' ||
      tab === 'consultation-hub' ||
      tab === 'islamic-astrology' ||
      tab === 'islamic-suite' ||
      tab === 'islamic' ||
      tab === 'live-diagnostics' ||
      tab === 'advisor' ||
      tab === 'remedies' ||
      tab === 'remedy' ||
      tab === 'custom-remedies' ||
      tab === 'global-suite' ||
      tab === 'omni-research' ||
      tab === 'comparative-mode' ||
      tab === 'consensus' ||
      tab === 'research' ||
      tab === 'master-chart' ||
      tab === 'kundli' ||
      tab === 'nakshatra' ||
      tab === 'me' ||
      tab === 'profile' ||
      tab === 'more'
    );
    const storedOnboarded = typeof window !== 'undefined' && (localStorage.getItem('astro_has_onboarded') === 'true' || localStorage.getItem('astro_user_profile') !== null);
    const isProfileConfigured = Boolean((userProfile && userProfile.name && userProfile.name.trim().length > 0 && userProfile.dob) || storedOnboarded);

    if (!forceBypass && !isPublicTab && !hasOnboarded && !isProfileConfigured) {
      setLandingPreset(userProfile);
      setShowOnboarding(true);
      if (isMobile) setIsSidebarOpen(false);
      return;
    }

    setActiveTab(tab);
    if (isMobile) setIsSidebarOpen(false);
    setNavigationHistory(prev => {
      if (prev[prev.length - 1] === tab) return prev;
      return replace ? [...prev.slice(0, -1), tab] : [...prev, tab];
    });
    try {
      if (typeof window !== 'undefined' && window.history) {
        window.history.pushState({ tab }, '', `?tab=${tab}`);
      }
    } catch (e) {
      console.warn("history pushState error", e);
    }
  }, [isMobile, hasOnboarded, userProfile]);

  // Dedicated Go Back action returning to previous screen or fallback to home
  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // remove current
      const previousTab = newHistory[newHistory.length - 1] || 'home';
      setNavigationHistory(newHistory);
      setActiveTab(previousTab);
      try {
        if (typeof window !== 'undefined' && window.history) {
          window.history.pushState({ tab: previousTab }, '', `?tab=${previousTab}`);
        }
      } catch (e) {
        console.warn("history pushState error", e);
      }
    } else {
      setActiveTab('home');
      setNavigationHistory(['home']);
      try {
        if (typeof window !== 'undefined' && window.history) {
          window.history.pushState({ tab: 'home' }, '', `?tab=home`);
        }
      } catch (e) {
        console.warn("history pushState error", e);
      }
    }
  }, [navigationHistory]);

  // Sync browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.tab) {
        setActiveTab(e.state.tab);
        setNavigationHistory(prev => {
          const idx = prev.lastIndexOf(e.state.tab);
          return idx !== -1 ? prev.slice(0, idx + 1) : [...prev, e.state.tab];
        });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    saveProfile(profile);
    setHasOnboarded(true);
  };

  const getPageTitle = (): string => {
    if (activeTab === 'dashboard') return 'Cosmic Overview';
    if (activeTab === 'live-diagnostics') return 'Live Cosmic Diagnostics (What, Why & Solution)';
    if (activeTab === 'advisor') return 'Holistic Life Advisor';
    if (activeTab === 'remedies') return 'Remedial Gemstones, Yantras & Mantras';
    if (activeTab === 'custom-remedies') return 'Problem & Solution Remedies (Selectable Medium)';
    if (activeTab === 'global-suite') return 'Global Universal Wisdom Suite (All Seeker Features)';
    if (activeTab === 'birth-chart') return 'Birth Chart (Kundli) Generator';
    if (activeTab === 'master-chart') return 'Master Overall Chart';
    if (activeTab === 'islamic-astrology') return 'Islamic Astronomy & Sciences';
    if (activeTab === 'chat') return 'Astrologer Consultation';
    if (activeTab === 'core-brain') return 'ASTRO360 Multi-Agent Core Brain Console';
    if (activeTab === 'auth' || activeTab === 'login') return 'Seeker Account & Authentication';
    if (activeTab === 'leaflet-map' || activeTab === 'location-picker') return 'OpenStreetMap & Nominatim Interactive Geocoding';
    if (activeTab === 'divisional-charts') return 'D1–D60 Divisional Varga Charts';
    if (activeTab === 'btr-suite') return 'Birth Time Rectification Suite';
    if (activeTab === 'gemstone-suite') return 'Gemstone & Rudraksha Advisor';
    if (activeTab === 'numerology-suite') return 'Numerology & Name Vibration';
    if (activeTab === 'tarot-iching') return 'Tarot & 64 I Ching Oracle';
    if (activeTab === 'time-horizon') return 'Time Horizon Forecast Suite';
    if (activeTab === 'dosha-engine') return 'Sade Sati & Dosha Remedy Engine';
    if (activeTab === 'biorhythm-tracker') return 'Cosmic Biorhythm Energy Tracker';
    if (activeTab === 'chakra-alignment') return '7-Chakra Solfeggio Alignment';
    if (activeTab === 'fengshui-matrix') return 'Cosmic Feng Shui Matrix';
    if (activeTab === 'electional-muhurta') return 'Shubh Muhurta Time Engine';
    if (activeTab === 'planetary-horas') return 'Planetary Horas Real-Time Tracker';
    if (activeTab === 'mantra-soundboard') return 'Sacred Mantra & Vibrational Soundboard';
    if (activeTab === 'transit-radar') return 'Planetary Transit Ingress Radar';
    if (activeTab === 'panchang-deities') return 'Panchang Tithi Deities & Vrats';
    if (activeTab === 'cosmic-compass') return '360° Sidereal Ephemeris Compass';
    if (activeTab === 'astro-cartography') return 'Astro-Cartography Relocation Matrix';
    if (activeTab === 'transit-calendar') return 'Cosmic Transit Calendar';
    if (activeTab === 'synastry-overlay') return 'Synastry Dual-Ring Overlay';
    if (activeTab === 'mind-map') return 'Astrological Mind Map';
    if (activeTab === 'chart-analytics') return 'Shadbala & Element Analytics';
    if (activeTab === 'learning-hub') return 'Astrology Encyclopedia';
    if (activeTab === 'report-generator') return 'Executive Report Generator';
    if (activeTab === 'admin-dashboard') return 'Admin Analytics & AI Tracing';
    if (activeTab === 'consultation-hub') return 'Astrologer Consultations & Community Q&A';
    if (activeTab === 'earnings-hub' || activeTab === 'monetization') return 'Astrology Business & Global Revenue Hub';
    if (activeTab === 'omni-research' || activeTab === 'comparative-mode' || activeTab === 'consensus') return 'ASTRO360 OMNI • Research & Consensus Core';
    if (activeTab === 'seo' || activeTab === 'seo-suite' || activeTab === 'seo-growth') return 'Search Visibility & Growth Engine';
    if (activeTab === 'seo-lab' || activeTab === 'keyword-lab' || activeTab === 'keywords' || activeTab === 'seo-lab/keywords') return 'SEO Keyword Research Lab';
    if (activeTab === 'backlink-lab' || activeTab === 'backlinks' || activeTab === 'link-lab') return 'Backlink Opportunity & Digital PR Lab';
    if (activeTab === 'news-intelligence' || activeTab === 'cosmic-news' || activeTab === 'mundane' || activeTab === 'news-prediction') return 'Cosmic News & Mundane Prediction Hub';
    if (activeTab === 'landing') return 'Product Overview & Free Birth Chart';
    if (TRADITIONS[activeTab]) return TRADITIONS[activeTab].name;
    return 'Cosmos OMNI';
  };

  return (
    <div className="relative min-h-screen bg-[#090d16] text-slate-100 flex overflow-hidden font-sans">
      {/* ✨ High-Resolution Deep Space Animated Atmosphere (React Three Fiber & Constellations) */}
      <Suspense fallback={null}>
        <CosmicAtmosphereCanvas userProfile={userProfile} />
      </Suspense>

      {/* Redesigned Glassmorphic Sidebar Navigation (Desktop Static / Mobile Slide-Over) */}
      {activeTab !== 'landing' && (
        <>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
          </AnimatePresence>
          <OmniAppSidebar
            activeTab={activeTab}
            onNavigate={navigateTo}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            userProfile={userProfile}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 w-full relative z-10 flex flex-col h-[100dvh] overflow-hidden">
        {/* Canonical Multi-Platform Navigation Shell (AstroMobileHeader, 5-Word Desktop Bar, AstroMobileBottomNav & Sheets) */}
        {activeTab !== 'landing' && (
          <AstroNavigationShell
            activeTab={activeTab}
            onNavigate={navigateTo}
            onBack={goBack}
            canGoBack={navigationHistory.length > 1}
            pageTitle={getPageTitle()}
            userProfile={userProfile}
            onUpdateSystem={(sys) => {
              const updated = { ...userProfile, preferredSystem: sys };
              setUserProfile(updated);
              saveProfile(updated);
              updateConfig({ astrologySystem: sys as any });
            }}
          />
        )}

        {/* Page Content */}
        <div 
          ref={mainScrollRef}
          className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar ${activeTab === 'landing' ? 'p-0' : 'pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-6'} w-full`}
        >
          <div className={`${activeTab === 'landing' ? 'w-full' : 'max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6'} h-full w-full`}>
            <Suspense fallback={<CosmicCelestialLoader message="Synchronizing Celestial Intelligence" />}>
              <div key={activeTab} className="h-full">
                <ErrorBoundary>
                  {(showOnboarding || activeTab === 'onboarding') && (
                    <OmniOnboardingWizard
                      initialPreset={landingPreset}
                      onClose={() => {
                        setShowOnboarding(false);
                        if (activeTab === 'onboarding') setActiveTab('landing');
                      }}
                      onComplete={(profile: UserProfile) => {
                        setUserProfile(profile);
                        saveProfile(profile);
                        setHasOnboarded(true);
                        setShowOnboarding(false);
                        setActiveTab('home');
                        if (typeof window !== 'undefined' && window.history) {
                          try {
                            window.history.pushState({ tab: 'home' }, '', '?tab=home');
                          } catch (e) {}
                        }
                        toast.success(`Welcome ${profile.name || 'Seeker'}! Personalized ephemeris & dashboard ready.`);
                      }}
                    />
                  )}
                  {activeTab === 'landing' && (
                    <LandingPage
                      onStartOnboarding={(preset: any) => {
                        if (preset && preset.dob) {
                          const updated: UserProfile = {
                            ...userProfile,
                            ...preset,
                            name: preset.name || userProfile.name || 'Seeker',
                            dob: preset.dob,
                            time: preset.time || userProfile.time || '12:00',
                            location: preset.location || userProfile.location || 'London, UK',
                          };
                          setUserProfile(updated);
                          saveProfile(updated);
                          setHasOnboarded(true);
                          setShowOnboarding(false);
                          setActiveTab('home');
                          if (typeof window !== 'undefined' && window.history) {
                            try {
                              window.history.pushState({ tab: 'home' }, '', '?tab=home');
                            } catch (e) {}
                          }
                          toast.success(`Profile customized for ${updated.name}!`);
                        } else {
                          setLandingPreset(preset);
                          setShowOnboarding(true);
                        }
                      }}
                      onNavigateToTab={(tab: string) => {
                        navigateTo(tab);
                      }}
                      userProfile={userProfile}
                    />
                  )}
                  {activeTab === 'free-tools' && (
                    <OmniFreeToolsHub
                      userProfile={userProfile}
                      onStartOnboarding={(preset: any) => {
                        if (preset && preset.dob) {
                          const updated: UserProfile = {
                            ...userProfile,
                            ...preset,
                            name: preset.name || userProfile.name,
                            dob: preset.dob || userProfile.dob,
                            time: preset.time || userProfile.time,
                            location: preset.location || userProfile.location,
                          };
                          setUserProfile(updated);
                          saveProfile(updated);
                          setHasOnboarded(true);
                          navigateTo('home');
                        } else {
                          setLandingPreset(preset);
                          setShowOnboarding(true);
                        }
                      }}
                      onNavigate={navigateTo}
                    />
                  )}
                                    {/* Core 5-Root Views */}
                  {(activeTab === 'home' || activeTab === 'overview' || activeTab === 'todays-horoscope' || activeTab === 'daily-summary' || activeTab === 'daily' || activeTab === 'summary') && (
                    <OmniSimpleHome
                      userProfile={userProfile}
                      onNavigate={navigateTo}
                      onOpenProfile={() => setIsProfileModalOpen(true)}
                      onUpdateProfile={(updated: UserProfile) => { setUserProfile(updated); saveProfile(updated); }}
                    />
                  )}
                  {(activeTab === 'dashboard' || activeTab === 'pro-dashboard') && (
                    <CosmicIntelligenceCenter
                      onNavigate={navigateTo}
                      userProfile={userProfile}
                      onUpdateProfile={(updated: UserProfile) => { setUserProfile(updated); saveProfile(updated); }}
                    />
                  )}
                  {(activeTab === 'forecast' || activeTab === 'predictions' || activeTab === 'prediction' || activeTab === 'precision-forecast' || activeTab === 'forecast-studio') && (
                    <OmniForecastView userProfile={userProfile} />
                  )}
                  {(activeTab === 'copilot' || activeTab === 'ask' || activeTab === 'oracle') && (
                    <OmniAskAssistant userProfile={userProfile} onNavigate={navigateTo} />
                  )}
                  {activeTab === 'charts' && (
                    <OmniChartsView userProfile={userProfile} />
                  )}
                  {(activeTab === 'me' || activeTab === 'profile' || activeTab === 'account') && (
                    <OmniMeView
                      userProfile={userProfile}
                      onEditProfile={() => setIsProfileModalOpen(true)}
                      onNavigate={navigateTo}
                      onResetAllData={handleResetAllData}
                    />
                  )}
                  {activeTab === 'more' && (
                    <OmniMoreHub onNavigate={navigateTo} userProfile={userProfile} />
                  )}

                  {/* Overview & Core Tools */}
                  {(activeTab === 'radar' || activeTab === 'transit-radar') && <PlanetaryTransitRadar />}
                  {(activeTab === '3d' || activeTab === 'studio' || activeTab === 'cosmic-studio') && <CosmicStudioSuite userProfile={userProfile} />}
                  {(activeTab === 'omni-research' || activeTab === 'comparative-mode' || activeTab === 'consensus' || activeTab === 'research') && <AstroOmniResearchSuite userProfile={userProfile} />}

                  {/* Ephemeris & Charts */}
                  {(activeTab === 'birth-chart' || activeTab === 'kundli' || activeTab === 'nakshatra') && <BirthChartGenerator userProfile={userProfile} />}
                  {(activeTab === 'dual-wheel' || activeTab === 'chart-studio' || activeTab === 'dual-chart') && <InteractiveDualChartStudio userProfile={userProfile} onNavigateToTab={navigateTo} />}
                  {(activeTab === 'divisional' || activeTab === 'divisional-charts' || activeTab === 'vargas') && <DivisionalChartsSuite userProfile={userProfile} />}
                  {(activeTab === 'shadbala' || activeTab === 'planetary-strengths') && <UnifiedChartEngine userProfile={userProfile} activeTab="shadbala" initialTab="shadbala" />}
                  {(activeTab === 'frequencies' || activeTab === 'binaural' || activeTab === 'sound-studio' || activeTab === 'planetary-frequencies') && <PlanetaryFrequencyStudio />}
                  {(activeTab === 'ephemeris-lab' || activeTab === 'diagnostic-lab') && <MultiSystemEphemerisDiagnosticLab userProfile={userProfile} />}
                  {(activeTab === 'sabian' || activeTab === 'sabian-symbols') && <SabianSymbolsDegreeExplorer />}
                  {activeTab === 'master-chart' && <UnifiedChartEngine userProfile={userProfile} activeTab={activeTab} initialTab={activeTab} />}
                  {activeTab === 'dasha' && <UnifiedChartEngine userProfile={userProfile} activeTab="dasha" initialTab="dasha" />}
                  {activeTab === 'chart-analytics' && <CosmicChartAnalytics userProfile={userProfile} />}

                  {/* Forecasts & Timing */}
                  {(activeTab === 'time-horizon' || activeTab === 'transits' || activeTab === 'sadesati' || activeTab === 'saturn-transit' || activeTab === 'career') && <TimeHorizonForecastSuite userProfile={userProfile} />}
                  {(activeTab === 'dossier' || activeTab === 'pdf-report' || activeTab === 'executive-dossier') && <ExecutiveCosmicDossierSuite userProfile={userProfile} onNavigateToTab={navigateTo} />}
                  {(activeTab === 'news-radar' || activeTab === 'news-intelligence' || activeTab === 'cosmic-news' || activeTab === 'mundane' || activeTab === 'news-prediction') && <CosmicNewsIntelligenceHub userProfile={userProfile} onNavigate={navigateTo} />}
                  {(activeTab === 'muhurta' || activeTab === 'electional-muhurta') && <ElectionalMuhurtaEngine />}
                  {(activeTab === 'horas' || activeTab === 'planetary-horas' || activeTab === 'hora-clock') && <PlanetaryHoraClock />}
                  {(activeTab === 'btr' || activeTab === 'btr-suite' || activeTab === 'rectification') && <BirthTimeRectificationSuite />}
                  {activeTab === 'transit-calendar' && <CosmicTransitCalendar />}

                  {/* 7-Fold Traditions */}
                  {(activeTab === 'islamic-astrology' || activeTab === 'islamic-suite' || activeTab === 'islamic') && <UnifiedIslamicSuite userProfile={userProfile} />}
                  {(activeTab === 'vedic' || activeTab === 'vedic-astrology') && <TraditionView tradition={TRADITIONS.vedic} category={TRADITIONS.vedic} onNavigate={navigateTo} userProfile={userProfile} onUpdateProfile={setUserProfile} />}
                  {(activeTab === 'western' || activeTab === 'western-astrology') && <TraditionView tradition={TRADITIONS.western || TRADITIONS.hellenistic || TRADITIONS.vedic} category={TRADITIONS.western || TRADITIONS.vedic} onNavigate={navigateTo} userProfile={userProfile} onUpdateProfile={setUserProfile} />}
                  {(activeTab === 'chinese' || activeTab === 'bazi') && <TraditionView tradition={TRADITIONS.chinese || TRADITIONS.vedic} category={TRADITIONS.chinese || TRADITIONS.vedic} onNavigate={navigateTo} userProfile={userProfile} onUpdateProfile={setUserProfile} />}
                  {activeTab === 'kp' && <UnifiedChartEngine userProfile={userProfile} activeTab="kp" initialTab="kp" />}
                  {activeTab === 'jaimini' && <UnifiedChartEngine userProfile={userProfile} activeTab="jaimini" initialTab="jaimini" />}
                  {activeTab === 'mayan' && <TraditionView tradition={TRADITIONS.mayan || TRADITIONS.mesoamerican || TRADITIONS.vedic} category={TRADITIONS.mayan || TRADITIONS.vedic} onNavigate={navigateTo} userProfile={userProfile} onUpdateProfile={setUserProfile} />}
                  {TRADITIONS[activeTab] && !['vedic', 'western', 'chinese'].includes(activeTab) && (
                    <TraditionView
                      tradition={TRADITIONS[activeTab]}
                      category={TRADITIONS[activeTab]}
                      onNavigate={navigateTo}
                      userProfile={userProfile}
                      onUpdateProfile={setUserProfile}
                    />
                  )}

                  {/* Mystic & Healing Suites */}
                  {(activeTab === 'gemstone' || activeTab === 'gemstone-suite' || activeTab === 'gemstones') && <GemstoneRudrakshaSuite />}
                  {(activeTab === 'mantras' || activeTab === 'mantra-soundboard') && <SacredMantraSoundboard />}
                  {(activeTab === 'chakra' || activeTab === 'chakras' || activeTab === 'chakra-alignment') && <SacredChakraAlignment />}
                  {(activeTab === 'tarot' || activeTab === 'tarot-iching') && <TarotIChingSuite />}
                  {(activeTab === 'numerology' || activeTab === 'numerology-suite') && <NumerologyNameSuite />}
                  {(activeTab === 'fengshui' || activeTab === 'feng-shui' || activeTab === 'fengshui-matrix') && <CosmicFengShuiMatrix userProfile={userProfile} />}
                  {(activeTab === 'shlokas' || activeTab === 'scripture') && <ClassicalShlokaLibrary />}

                  {/* Secondary Specialized Engines */}
                  {activeTab === 'live-diagnostics' && <LiveCosmicDiagnostics userProfile={userProfile} />}
                  {activeTab === 'advisor' && <HolisticAdvisor userProfile={userProfile} />}
                  {(activeTab === 'remedies' || activeTab === 'remedy') && <AstroMultiTraditionRemedySuite userProfile={userProfile} />}
                  {activeTab === 'custom-remedies' && <CustomRemedialMediumEngine userProfile={userProfile} />}
                  {(activeTab === 'synastry' || activeTab === 'match' || activeTab === 'compatibility' || activeTab === 'ashta-koota' || activeTab === 'kundli-matching') && (
                    <KundliMatchingSuite userProfile={userProfile} onNavigateToTab={navigateTo} />
                  )}
                  {activeTab === 'global-suite' && <GlobalWisdomSuite userProfile={userProfile} />}
                  {activeTab === 'tools-catalog' && <Astro150ToolsCatalog userProfile={userProfile} onNavigate={navigateTo} activeCategory={activeTab} initialCategory={activeTab} />}
                  {activeTab === 'chat' && <AstrologyChat />}
                  {(activeTab === 'dream-interpreter' || activeTab === 'dream') && <DreamInterpretationEngine userProfile={userProfile} />}
                  {activeTab === 'problem-solver' && <UniversalProblemSolverSuite userProfile={userProfile} />}
                  {activeTab === 'spiritual-traditions' && <SpiritualTraditionsModule userProfile={userProfile} />}
                  {activeTab === 'consultation-hub' && <CommunityConsultationHub />}
                  {(activeTab === 'report-generator' || activeTab === 'executive-report') && <ExecutiveReportGenerator userProfile={userProfile} />}
                  {activeTab === 'dosha-engine' && <DoshaRemedyEngine userProfile={userProfile} />}
                  {activeTab === 'biorhythm-tracker' && <CosmicBiorhythmTracker userProfile={userProfile} />}
                  {(activeTab === 'panchang-deities' || activeTab === 'panchang') && <PanchangDeitiesEngine />}
                  {activeTab === 'cosmic-compass' && <CosmicCompassVisualizer userProfile={userProfile} />}
                  {(activeTab === 'astrocartography' || activeTab === 'astro-cartography') && <AstroCartographyMatrix userProfile={userProfile} />}
                  {(activeTab === 'panchanga' || activeTab === 'methodology') && (
                    <SEOTopicHub
                      hubId={activeTab as any}
                      onStartChart={() => setShowOnboarding(true)}
                      onNavigate={navigateTo}
                      userProfile={userProfile}
                    />
                  )}
                  {activeTab === 'synastry-overlay' && <SynastryOverlayChart userProfile={userProfile} />}
                  {activeTab === 'mind-map' && <AstrologicalMindMap />}
                  {activeTab === 'learning-hub' && <AstrologyLearningHub />}
                  {activeTab === 'admin-dashboard' && <AdminAnalyticsDashboard />}
                  {(activeTab === 'seo' || activeTab === 'seo-suite' || activeTab === 'seo-auditor' || activeTab === 'seo-growth') && <OmniSEOGrowthSuite />}
                  {(activeTab === 'seo-lab' || activeTab === 'keyword-lab' || activeTab === 'keywords' || activeTab === 'seo-lab/keywords') && <KeywordResearchLab onNavigate={navigateTo} />}
                  {(activeTab === 'backlink-lab' || activeTab === 'backlinks' || activeTab === 'link-lab' || activeTab === 'seo-lab/backlinks') && <BacklinkOpportunityLab onNavigate={navigateTo} />}
                  {activeTab === 'control-center' && <AstrologyControlCenter />}
                  {activeTab === 'horoscope' && <PremiumHoroscopeEngine userProfile={userProfile} />}
                  {activeTab === 'passport' && <CosmicPassportCard userProfile={userProfile} onNavigateToTab={navigateTo} />}
                  {(activeTab === 'widgets' || activeTab === 'embed') && <EmbeddableWidgetGenerator onNavigateToTab={navigateTo} />}
                  {(activeTab === 'directory' || activeTab === 'celebrities') && <ProgrammaticSeoDirectory onNavigateToTab={navigateTo} />}
                  {(activeTab === 'pwa' || activeTab === 'briefing') && <PwaCosmicBriefing onNavigateToTab={navigateTo} />}

                  {/* Fallback for unknown / direct deep-links */}
                  {![
                    'landing', 'free-tools', 'home', 'overview', 'todays-horoscope', 'daily-summary', 'daily', 'summary',
                    'dashboard', 'pro-dashboard', 'forecast', 'predictions', 'prediction', 'precision-forecast', 'forecast-studio',
                    'copilot', 'ask', 'oracle', 'charts', 'me', 'profile', 'account', 'more',
                    'radar', 'transit-radar', '3d', 'studio', 'cosmic-studio', 'omni-research', 'comparative-mode', 'consensus', 'research',
                    'birth-chart', 'kundli', 'nakshatra', 'dual-wheel', 'chart-studio', 'dual-chart', 'divisional', 'divisional-charts', 'vargas',
                    'shadbala', 'planetary-strengths', 'frequencies', 'binaural', 'sound-studio', 'planetary-frequencies',
                    'ephemeris-lab', 'diagnostic-lab', 'sabian', 'sabian-symbols', 'master-chart', 'dasha', 'chart-analytics',
                    'time-horizon', 'transits', 'sadesati', 'saturn-transit', 'career', 'dossier', 'pdf-report', 'executive-dossier',
                    'news-radar', 'news-intelligence', 'cosmic-news', 'mundane', 'news-prediction', 'muhurta', 'electional-muhurta',
                    'horas', 'planetary-horas', 'hora-clock', 'btr', 'btr-suite', 'rectification', 'transit-calendar',
                    'islamic-astrology', 'islamic-suite', 'islamic', 'vedic', 'vedic-astrology', 'western', 'western-astrology',
                    'chinese', 'bazi', 'kp', 'jaimini', 'mayan', 'gemstone', 'gemstone-suite', 'gemstones', 'mantras', 'mantra-soundboard',
                    'chakra', 'chakras', 'chakra-alignment', 'tarot', 'tarot-iching', 'numerology', 'numerology-suite', 'fengshui',
                    'feng-shui', 'fengshui-matrix', 'shlokas', 'scripture', 'live-diagnostics', 'advisor', 'remedies', 'remedy',
                    'custom-remedies', 'synastry', 'match', 'compatibility', 'ashta-koota', 'kundli-matching', 'global-suite',
                    'tools-catalog', 'chat', 'dream-interpreter', 'dream', 'problem-solver', 'spiritual-traditions', 'consultation-hub',
                    'report-generator', 'executive-report', 'dosha-engine', 'biorhythm-tracker', 'panchang-deities', 'panchang',
                    'cosmic-compass', 'astrocartography', 'astro-cartography', 'panchanga', 'methodology', 'synastry-overlay',
                    'mind-map', 'learning-hub', 'admin-dashboard', 'seo', 'seo-suite', 'seo-auditor', 'seo-growth', 'seo-lab',
                    'keyword-lab', 'keywords', 'seo-lab/keywords', 'backlink-lab', 'backlinks', 'link-lab', 'seo-lab/backlinks',
                    'control-center', 'horoscope', 'passport', 'widgets', 'embed', 'directory', 'celebrities', 'pwa', 'briefing'
                  ].includes(activeTab) && (
                    <OmniSimpleHome
                      userProfile={userProfile}
                      onNavigate={navigateTo}
                      onOpenProfile={() => setIsProfileModalOpen(true)}
                      onUpdateProfile={(updated: UserProfile) => { setUserProfile(updated); saveProfile(updated); }}
                    />
                  )}

                </ErrorBoundary>
                {activeTab !== 'landing' && <Footer />}
              </div>
          </Suspense>

          </div>
        </div>



      {/* ✦ PERSISTENT FLOATING ASK BUTTON (Desktop only, mobile has central dock Ask button) */}
      {activeTab !== 'ask' && activeTab !== 'landing' && (
        <button
          onClick={() => navigateTo('ask')}
          className="hidden md:flex fixed bottom-6 right-6 z-30 items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-black font-semibold text-xs font-sans shadow-xl shadow-black/50 border border-white/20 transition-all active:scale-95 cursor-pointer"
          title="Ask ASTRO360"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Ask ASTRO360</span>
        </button>
      )}
      </main>


      {/* AUTH MODAL DIALOG */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <AuthScreen
                userProfile={userProfile}
                onAuthSuccess={(updated: UserProfile) => {
                  setUserProfile(updated);
                  saveProfile(updated);
                  setIsAuthModalOpen(false);
                  toast.success('Account synced successfully!');
                }}
                onSkip={() => setIsAuthModalOpen(false)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* PROFILE CUSTOMISATION MODAL DIALOG */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#111827] border border-amber-500/40 shadow-2xl space-y-5 text-left text-xs font-mono my-8"
            >
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                  COSMIC ENGINE CUSTOMISATION
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Seeker Birth Profile & System Settings</h3>
                <p className="text-slate-400 text-[11px] font-sans">
                  Configure your birth details, ayanamsha calculations, and preferred tradition system to recalculate all 24 tool engines.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveProfile(userProfile);
                  setIsProfileModalOpen(false);
                  toast.success('🔮 Birth Profile & Astrological Engine Recalculated!');
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">Full Name</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">Email Address</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">Birth Date (YYYY-MM-DD)</label>
                    <input
                      type="date"
                      value={userProfile.dob}
                      onChange={(e) => setUserProfile({ ...userProfile, dob: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">Birth Time (24h HH:MM)</label>
                    <input
                      type="time"
                      value={userProfile.time}
                      onChange={(e) => setUserProfile({ ...userProfile, time: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Birth City & Location</label>
                  <input
                    type="text"
                    value={userProfile.location}
                    onChange={(e) => setUserProfile({ ...userProfile, location: e.target.value })}
                    placeholder="e.g. Mecca, Saudi Arabia or London, UK"
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">Preferred Tradition</label>
                    <select
                      value={userProfile.preferredSystem}
                      onChange={(e) => setUserProfile({ ...userProfile, preferredSystem: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="vedic">Vedic Jyotish (Sidereal)</option>
                      <option value="islamic">Islamic Astronomy (Ilm al-Nujum)</option>
                      <option value="western">Western Tropical</option>
                      <option value="bazi">Chinese BaZi (4 Pillars)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold block">Primary Life Focus</label>
                    <select
                      value={userProfile.primaryLifeFocus}
                      onChange={(e) => setUserProfile({ ...userProfile, primaryLifeFocus: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Wealth, Purpose & Protection">Wealth, Purpose & Protection</option>
                      <option value="Career & Executive Power">Career & Executive Power</option>
                      <option value="Relationship Harmony & Love">Relationship Harmony & Love</option>
                      <option value="Spiritual Light & Healing">Spiritual Light & Healing</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold font-mono transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Save Profile & Recalculate Master Engines
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={navigateTo}
      />

      {/* Global ASTRO360 Audio Players (Mini Dock & Full Player Sheet) */}
      <AstroMiniAudioPlayer />
      <AstroAudioPlayer />

      {/* Global ASTRO360 Notification Center & Pre-Permission Modals */}
      <AstroNotificationCenterModal onNavigate={navigateTo} onOpenSettings={() => navigateTo('me')} />
      <AstroNotificationPrePermissionCard />

      {/* Sonner Toast Provider */}
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
