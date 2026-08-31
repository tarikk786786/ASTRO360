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
import { TRADITIONS, CategoryInfo, TraditionGroup, UserProfile, GROUP_ICONS } from './types';
import { useWalletStore } from './stores/walletStore';
import CommandPaletteModal from './components/CommandPaletteModal';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalLanguageSelector from './components/GlobalLanguageSelector';
import { AstroMiniAudioPlayer, AstroAudioPlayer } from './components/audio';
import { AstroNotificationCenterModal, AstroNotificationPrePermissionCard } from './components/notifications';
import { useGlobalConfig } from './context/GlobalConfigContext';
import { Toaster, toast } from 'sonner';
import { AstroNavigationShell } from './components/navigation';
import CosmicCelestialLoader from './components/ui/CosmicCelestialLoader';
import { updatePageSEO } from './lib/seoManager';
import { warmCosmicProfileCache, prefetchRouteData } from './lib/prefetchEngine';

// Code-split dynamic views for instant landing page load
const LandingPage = lazy(() => import('./components/landing/LandingPage'));
const OmniSimpleHome = lazy(() => import('./components/omni/OmniSimpleHome'));
const OmniForecastView = lazy(() => import('./components/omni/OmniForecastView'));
const OmniAskAssistant = lazy(() => import('./components/omni/OmniAskAssistant'));
const OmniChartsView = lazy(() => import('./components/omni/OmniChartsView'));
const OmniMoreHub = lazy(() => import('./components/omni/OmniMoreHub'));
const OmniMeView = lazy(() => import('./components/omni/OmniMeView'));
const OmniOnboardingWizard = lazy(() => import('./components/omni/OmniOnboardingWizard'));
const OmniFreeToolsHub = lazy(() => import('./components/free-tools/OmniFreeToolsHub'));
const OmniCompatibilityLab = lazy(() => import('./components/omni/OmniCompatibilityLab'));
const SEOTopicHub = lazy(() => import('./components/seo/SEOTopicHub'));
const OmniSEOGrowthSuite = lazy(() => import('./components/seo/OmniSEOGrowthSuite'));
const KeywordResearchLab = lazy(() => import('./components/seo-lab/KeywordResearchLab'));
const BacklinkOpportunityLab = lazy(() => import('./components/backlink-lab/BacklinkOpportunityLab'));
const CosmicNewsIntelligenceHub = lazy(() => import('./components/news-prediction/CosmicNewsIntelligenceHub'));

// Heavy secondary astrology suites
const CosmicIntelligenceCenter = lazy(() => import('./components/CosmicIntelligenceCenter'));
const AstrologyChat = lazy(() => import('./components/AstrologyChat'));
const TraditionView = lazy(() => import('./components/TraditionView'));
const UnifiedChartEngine = lazy(() => import('./components/UnifiedChartEngine'));
const UnifiedIslamicSuite = lazy(() => import('./components/UnifiedIslamicSuite'));
const BirthChartGenerator = lazy(() => import('./components/BirthChartGenerator'));
const HolisticAdvisor = lazy(() => import('./components/HolisticAdvisor'));
const LiveCosmicDiagnostics = lazy(() => import('./components/LiveCosmicDiagnostics'));
const CustomRemedialMediumEngine = lazy(() => import('./components/CustomRemedialMediumEngine'));
const AstroMultiTraditionRemedySuite = lazy(() => import('./components/AstroMultiTraditionRemedySuite'));
const GlobalWisdomSuite = lazy(() => import('./components/GlobalWisdomSuite'));
const AstroSynastryMatchmaker = lazy(() => import('./components/AstroSynastryMatchmaker'));
const Astro150ToolsCatalog = lazy(() => import('./components/Astro150ToolsCatalog'));
const DreamInterpretationEngine = lazy(() => import('./components/DreamInterpretationEngine'));
const UniversalProblemSolverSuite = lazy(() => import('./components/UniversalProblemSolverSuite'));
const PremiumHoroscopeEngine = lazy(() => import('./components/PremiumHoroscopeEngine'));
const SpiritualTraditionsModule = lazy(() => import('./components/SpiritualTraditionsModule'));
const AstrologyControlCenter = lazy(() => import('./components/AstrologyControlCenter'));
const CommunityConsultationHub = lazy(() => import('./components/CommunityConsultationHub'));
const AuthScreen = lazy(() => import('./components/AuthScreen'));
const DivisionalChartsSuite = lazy(() => import('./components/DivisionalChartsSuite'));
const GemstoneRudrakshaSuite = lazy(() => import('./components/GemstoneRudrakshaSuite'));
const NumerologyNameSuite = lazy(() => import('./components/NumerologyNameSuite'));
const TarotIChingSuite = lazy(() => import('./components/TarotIChingSuite'));
const TimeHorizonForecastSuite = lazy(() => import('./components/TimeHorizonForecastSuite'));
const DoshaRemedyEngine = lazy(() => import('./components/DoshaRemedyEngine'));
const CosmicBiorhythmTracker = lazy(() => import('./components/CosmicBiorhythmTracker'));
const SacredChakraAlignment = lazy(() => import('./components/SacredChakraAlignment'));
const CosmicFengShuiMatrix = lazy(() => import('./components/CosmicFengShuiMatrix'));
const ElectionalMuhurtaEngine = lazy(() => import('./components/ElectionalMuhurtaEngine'));
const PlanetaryHorasTracker = lazy(() => import('./components/PlanetaryHorasTracker'));
const SacredMantraSoundboard = lazy(() => import('./components/SacredMantraSoundboard'));
const PlanetaryTransitRadar = lazy(() => import('./components/PlanetaryTransitRadar'));
const PanchangDeitiesEngine = lazy(() => import('./components/PanchangDeitiesEngine'));
const CosmicCompassVisualizer = lazy(() => import('./components/CosmicCompassVisualizer'));
const CosmicTransitCalendar = lazy(() => import('./components/CosmicTransitCalendar'));
const SynastryOverlayChart = lazy(() => import('./components/SynastryOverlayChart'));
const CosmicChartAnalytics = lazy(() => import('./components/CosmicChartAnalytics'));
const AstrologyLearningHub = lazy(() => import('./components/AstrologyLearningHub'));

// Studio tools
const ExecutiveReportGenerator = lazy(() => import('./components/ExecutiveReportGenerator'));
const AdminAnalyticsDashboard = lazy(() => import('./components/AdminAnalyticsDashboard'));
const CosmicStudioSuite = lazy(() => import('./components/CosmicStudioSuite'));
const UniverseCanvas = lazy(() => import('./components/3d/UniverseCanvas'));
const AstroOmniResearchSuite = lazy(() => import('./components/AstroOmniResearchSuite').then(m => ({ default: m.AstroOmniResearchSuite })));
const BirthTimeRectificationSuite = lazy(() => import('./components/BirthTimeRectificationSuite'));
const AstrologicalMindMap = lazy(() => import('./components/AstrologicalMindMap'));
const AstroCartographyMatrix = lazy(() => import('./components/AstroCartographyMatrix'));
const CosmicPassportCard = lazy(() => import('./components/social/CosmicPassportCard'));
const EmbeddableWidgetGenerator = lazy(() => import('./components/widgets/EmbeddableWidgetGenerator'));
const ProgrammaticSeoDirectory = lazy(() => import('./components/seo/ProgrammaticSeoDirectory'));
const InteractiveDualChartStudio = lazy(() => import('./components/charts/InteractiveDualChartStudio'));
const ExecutiveCosmicDossierSuite = lazy(() => import('./components/dossier/ExecutiveCosmicDossierSuite'));
const AstroDeterministicCopilot = lazy(() => import('./components/ai/AstroDeterministicCopilot'));
const PwaCosmicBriefing = lazy(() => import('./components/pwa/PwaCosmicBriefing'));
const ClassicalShlokaLibrary = lazy(() => import('./components/scripture/ClassicalShlokaLibrary'));
const SabianSymbolsDegreeExplorer = lazy(() => import('./components/sabian/SabianSymbolsDegreeExplorer'));
const MultiSystemEphemerisDiagnosticLab = lazy(() => import('./components/diagnostics/MultiSystemEphemerisDiagnosticLab'));
const PlanetaryFrequencyStudio = lazy(() => import('./components/audio/PlanetaryFrequencyStudio'));

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
  const navigateTo = useCallback((tab: string, replace = false, forceBypass = false) => {
    const isPublicTab = (
      tab === 'landing' ||
      tab === 'free-tools' ||
      tab === 'birth-chart' ||
      tab === 'vedic-astrology' ||
      tab === 'western-astrology' ||
      tab === 'panchanga' ||
      tab === 'compatibility' ||
      tab === 'dasha' ||
      tab === 'transits' ||
      tab === 'muhurta' ||
      tab === 'astrocartography' ||
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
      tab === 'planetary-frequencies'
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

  // Group traditions by TraditionGroup
  const groupedTraditions = Object.values(TRADITIONS || {}).reduce((acc, tradition) => {
    if (tradition && tradition.group) {
      if (!acc[tradition.group]) {
        acc[tradition.group] = [];
      }
      acc[tradition.group].push(tradition);
    }
    return acc;
  }, {} as Record<TraditionGroup, CategoryInfo[]>);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'tools': false,
    'standalone': false,
    'Asian & Eastern': false,
    'Western & European': false,
    'Middle Eastern & Semitic': false,
    'Indigenous & Ancient': false
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

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
      {/* ✨ High-Resolution Animated Cosmic Background (React Three Fiber) */}
      <Suspense fallback={null}>
        <UniverseCanvas />
      </Suspense>

      {/* Sidebar Overlay for Mobile (App only) */}
      {activeTab !== 'landing' && (
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      )}

      {/* Sidebar (Desktop Static / Mobile Slide-Over) - ONLY inside app tabs, NOT on landing */}
      {activeTab !== 'landing' && (
        <aside
          className={`fixed inset-y-0 left-0 md:static h-full w-64 bg-[#090d16]/98 md:bg-[#090d16]/95 backdrop-blur-3xl border-r border-white/[0.06] flex flex-col z-50 transition-transform duration-300 ease-out shrink-0 ${
            isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
          }`}
        >
        {/* Logo area */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-white/[0.04] flex-shrink-0">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-7 h-7 rounded-xl bg-slate-900 border border-white/15 flex items-center justify-center shadow-inner">
              <div className="w-3.5 h-3.5 rounded-full border border-amber-400/80" />
            </div>
            <span className="font-bold text-sm tracking-wide text-white">
              ASTRO360 <span className="text-amber-400 font-light">OMNI</span>
            </span>
          </div>
          <button className="p-1 text-slate-500 hover:text-white cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 space-y-5">
          {/* Back to Home / Landing Button */}
          <div className="pb-1">
            <button
              onClick={() => navigateTo('landing')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeTab === 'landing'
                  ? 'bg-[#C9A86A] text-[#070A12] border-[#C9A86A] shadow-md'
                  : 'bg-white/[0.04] text-[#C9A86A] border-[#C9A86A]/30 hover:bg-[#C9A86A] hover:text-[#070A12]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>← Back to Landing Page</span>
              </div>
            </button>
          </div>

          {/* PRIMARY HUB */}
          <div className="space-y-0.5">
            <button onClick={() => navigateTo('dashboard')} className={`sidebar-item ${activeTab === 'dashboard' ? 'sidebar-item-active' : ''}`}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button onClick={() => navigateTo('live-diagnostics')} className={`sidebar-item ${activeTab === 'live-diagnostics' ? 'sidebar-item-active' : ''}`}>
              <Activity className="w-4 h-4" />
              <span>Live Diagnostics</span>
            </button>
            <button onClick={() => navigateTo('advisor')} className={`sidebar-item ${activeTab === 'advisor' ? 'sidebar-item-active' : ''}`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Life Advisor</span>
            </button>
            <button onClick={() => navigateTo('birth-chart')} className={`sidebar-item ${activeTab === 'birth-chart' ? 'sidebar-item-active' : ''}`}>
              <Compass className="w-4 h-4" />
              <span>Birth Chart</span>
            </button>
            <button onClick={() => navigateTo('studio')} className={`sidebar-item ${activeTab === 'studio' ? 'sidebar-item-active' : ''}`}>
              <Sparkles className="w-4 h-4 text-[#C9A86A]" />
              <span className="font-semibold text-[#C9A86A]">Cosmic Studio</span>
            </button>
            <button onClick={() => navigateTo('omni-research')} className={`sidebar-item ${activeTab === 'omni-research' || activeTab === 'comparative-mode' ? 'sidebar-item-active' : ''}`}>
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-indigo-300">OMNI Research Core</span>
            </button>
            <button onClick={() => navigateTo('chat')} className={`sidebar-item ${activeTab === 'chat' ? 'sidebar-item-active' : ''}`}>
              <MessageCircle className="w-4 h-4" />
              <span>AI Oracle</span>
            </button>
          </div>

          {/* TOOLS & ENGINES */}
          <div className="mt-4">
            <button onClick={() => toggleGroup('tools')} className="w-full flex items-center justify-between px-3 py-2 group">
              <span className="sidebar-section-label">Tools & Engines</span>
              <motion.div animate={{ rotate: expandedGroups['tools'] ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedGroups['tools'] && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden space-y-0.5 mt-1">
                  <button onClick={() => navigateTo('remedies')} className={`sidebar-item ${activeTab === 'remedies' ? 'sidebar-item-active' : ''}`}><Gem className="w-4 h-4" /><span>Gemstone Remedies</span></button>
                  <button onClick={() => navigateTo('custom-remedies')} className={`sidebar-item ${activeTab === 'custom-remedies' ? 'sidebar-item-active' : ''}`}><HeartHandshake className="w-4 h-4" /><span>Problem Solver</span></button>
                  <button onClick={() => navigateTo('synastry')} className={`sidebar-item ${activeTab === 'synastry' ? 'sidebar-item-active' : ''}`}><Sparkles className="w-4 h-4" /><span>Synastry Matcher</span></button>
                  <button onClick={() => navigateTo('global-suite')} className={`sidebar-item ${activeTab === 'global-suite' ? 'sidebar-item-active' : ''}`}><Globe className="w-4 h-4" /><span>Global Wisdom</span></button>
                  <button onClick={() => navigateTo('tools-catalog')} className={`sidebar-item ${activeTab === 'tools-catalog' ? 'sidebar-item-active' : ''}`}><Sparkles className="w-4 h-4" /><span>150+ Tools</span></button>
                  <button onClick={() => navigateTo('master-chart')} className={`sidebar-item ${activeTab === 'master-chart' ? 'sidebar-item-active' : ''}`}><Compass className="w-4 h-4" /><span>Master Chart</span></button>
                  <button onClick={() => navigateTo('islamic-astrology')} className={`sidebar-item ${activeTab === 'islamic-astrology' ? 'sidebar-item-active' : ''}`}><Moon className="w-4 h-4" /><span>Islamic Sciences</span></button>
                  <button onClick={() => navigateTo('dream-interpreter')} className={`sidebar-item ${activeTab === 'dream-interpreter' ? 'sidebar-item-active' : ''}`}><CloudMoon className="w-4 h-4" /><span>Dream Engine</span></button>
                  <button onClick={() => navigateTo('problem-solver')} className={`sidebar-item ${activeTab === 'problem-solver' ? 'sidebar-item-active' : ''}`}><Zap className="w-4 h-4" /><span>Interactive Tools</span></button>
                  <button onClick={() => navigateTo('spiritual-traditions')} className={`sidebar-item ${activeTab === 'spiritual-traditions' ? 'sidebar-item-active' : ''}`}><ShieldCheck className="w-4 h-4" /><span>Spiritual Beliefs</span></button>
                  <button onClick={() => navigateTo('consultation-hub')} className={`sidebar-item ${activeTab === 'consultation-hub' ? 'sidebar-item-active' : ''}`}><Users className="w-4 h-4" /><span>Consultations</span></button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* STANDALONE TOOLS */}
          <div className="mt-4">
            <button onClick={() => toggleGroup('standalone')} className="w-full flex items-center justify-between px-3 py-2 group">
              <span className="sidebar-section-label">Standalone Tools</span>
              <motion.div animate={{ rotate: expandedGroups['standalone'] ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
              </motion.div>
            </button>
            <AnimatePresence>
              {expandedGroups['standalone'] && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden space-y-0.5 mt-1">
                  <button onClick={() => navigateTo('divisional-charts')} className={`sidebar-item ${activeTab === 'divisional-charts' ? 'sidebar-item-active' : ''}`}><Compass className="w-4 h-4" /><span>Divisional Charts</span></button>
                  <button onClick={() => navigateTo('btr-suite')} className={`sidebar-item ${activeTab === 'btr-suite' ? 'sidebar-item-active' : ''}`}><Clock className="w-4 h-4" /><span>Birth Time Rectification</span></button>
                  <button onClick={() => navigateTo('gemstone-suite')} className={`sidebar-item ${activeTab === 'gemstone-suite' ? 'sidebar-item-active' : ''}`}><Gem className="w-4 h-4" /><span>Gemstones</span></button>
                  <button onClick={() => navigateTo('numerology-suite')} className={`sidebar-item ${activeTab === 'numerology-suite' ? 'sidebar-item-active' : ''}`}><Hash className="w-4 h-4" /><span>Numerology</span></button>
                  <button onClick={() => navigateTo('tarot-iching')} className={`sidebar-item ${activeTab === 'tarot-iching' ? 'sidebar-item-active' : ''}`}><Eye className="w-4 h-4" /><span>Tarot & I Ching</span></button>
                  <button onClick={() => navigateTo('time-horizon')} className={`sidebar-item ${activeTab === 'time-horizon' ? 'sidebar-item-active' : ''}`}><Calendar className="w-4 h-4" /><span>Time Horizon</span></button>
                  <button onClick={() => navigateTo('dosha-engine')} className={`sidebar-item ${activeTab === 'dosha-engine' ? 'sidebar-item-active' : ''}`}><AlertTriangle className="w-4 h-4" /><span>Dosha Engine</span></button>
                  <button onClick={() => navigateTo('biorhythm-tracker')} className={`sidebar-item ${activeTab === 'biorhythm-tracker' ? 'sidebar-item-active' : ''}`}><Activity className="w-4 h-4" /><span>Biorhythm Tracker</span></button>
                  <button onClick={() => navigateTo('chakra-alignment')} className={`sidebar-item ${activeTab === 'chakra-alignment' ? 'sidebar-item-active' : ''}`}><Sunrise className="w-4 h-4" /><span>Chakra Alignment</span></button>
                  <button onClick={() => navigateTo('fengshui-matrix')} className={`sidebar-item ${activeTab === 'fengshui-matrix' ? 'sidebar-item-active' : ''}`}><Map className="w-4 h-4" /><span>Feng Shui Matrix</span></button>
                  <button onClick={() => navigateTo('electional-muhurta')} className={`sidebar-item ${activeTab === 'electional-muhurta' ? 'sidebar-item-active' : ''}`}><Clock className="w-4 h-4" /><span>Electional Muhurta</span></button>
                  <button onClick={() => navigateTo('planetary-horas')} className={`sidebar-item ${activeTab === 'planetary-horas' ? 'sidebar-item-active' : ''}`}><Sun className="w-4 h-4" /><span>Planetary Horas</span></button>
                  <button onClick={() => navigateTo('mantra-soundboard')} className={`sidebar-item ${activeTab === 'mantra-soundboard' ? 'sidebar-item-active' : ''}`}><Music className="w-4 h-4" /><span>Mantra Soundboard</span></button>
                  <button onClick={() => navigateTo('transit-radar')} className={`sidebar-item ${activeTab === 'transit-radar' ? 'sidebar-item-active' : ''}`}><Radar className="w-4 h-4" /><span>Transit Radar</span></button>
                  <button onClick={() => navigateTo('panchang-deities')} className={`sidebar-item ${activeTab === 'panchang-deities' ? 'sidebar-item-active' : ''}`}><Calendar className="w-4 h-4" /><span>Panchang & Deities</span></button>
                  <button onClick={() => navigateTo('cosmic-compass')} className={`sidebar-item ${activeTab === 'cosmic-compass' ? 'sidebar-item-active' : ''}`}><Compass className="w-4 h-4" /><span>Cosmic Compass</span></button>
                  <button onClick={() => navigateTo('astro-cartography')} className={`sidebar-item ${activeTab === 'astro-cartography' ? 'sidebar-item-active' : ''}`}><MapPin className="w-4 h-4" /><span>Astro-Cartography</span></button>
                  <button onClick={() => navigateTo('transit-calendar')} className={`sidebar-item ${activeTab === 'transit-calendar' ? 'sidebar-item-active' : ''}`}><Calendar className="w-4 h-4" /><span>Transit Calendar</span></button>
                  <button onClick={() => navigateTo('synastry-overlay')} className={`sidebar-item ${activeTab === 'synastry-overlay' ? 'sidebar-item-active' : ''}`}><Sparkles className="w-4 h-4" /><span>Synastry Overlay</span></button>
                  <button onClick={() => navigateTo('mind-map')} className={`sidebar-item ${activeTab === 'mind-map' ? 'sidebar-item-active' : ''}`}><Network className="w-4 h-4" /><span>Mind Map</span></button>
                  <button onClick={() => navigateTo('chart-analytics')} className={`sidebar-item ${activeTab === 'chart-analytics' ? 'sidebar-item-active' : ''}`}><BarChart2 className="w-4 h-4" /><span>Chart Analytics</span></button>
                  <button onClick={() => navigateTo('learning-hub')} className={`sidebar-item ${activeTab === 'learning-hub' ? 'sidebar-item-active' : ''}`}><BookOpen className="w-4 h-4" /><span>Learning Hub</span></button>
                  <button onClick={() => navigateTo('report-generator')} className={`sidebar-item ${activeTab === 'report-generator' ? 'sidebar-item-active' : ''}`}><FileText className="w-4 h-4" /><span>Report Generator</span></button>
                  <button onClick={() => navigateTo('seo-lab')} className={`sidebar-item ${activeTab === 'seo-lab' || activeTab === 'keywords' ? 'sidebar-item-active' : ''}`}><Search className="w-4 h-4 text-cyan-400" /><span className="text-cyan-300 font-bold">SEO Keyword Lab</span></button>
                  <button onClick={() => navigateTo('backlink-lab')} className={`sidebar-item ${activeTab === 'backlink-lab' || activeTab === 'backlinks' ? 'sidebar-item-active' : ''}`}><Globe className="w-4 h-4 text-purple-400" /><span className="text-purple-300 font-bold">Backlink Lab</span></button>
                  <button onClick={() => navigateTo('news-intelligence')} className={`sidebar-item ${activeTab === 'news-intelligence' || activeTab === 'cosmic-news' || activeTab === 'mundane' ? 'sidebar-item-active' : ''}`}><Radio className="w-4 h-4 text-amber-400" /><span className="text-amber-300 font-bold">Cosmic News Hub</span></button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* GLOBAL SYSTEMS */}
          {Object.entries(groupedTraditions).map(([groupName, traditions]) => (
            <div key={groupName} className="mt-4">
              <button
                onClick={() => toggleGroup(groupName)}
                className="w-full flex items-center justify-between px-3 py-2 group"
              >
                <span className="sidebar-section-label">
                  {/* GROUP_ICONS was imported but never referenced — the group glyph it
                      exists to supply was missing from the UI entirely. */}
                  <span className="mr-1.5 opacity-80">{GROUP_ICONS[groupName as TraditionGroup]}</span>
                  {groupName}
                </span>
                <motion.div
                  animate={{ rotate: expandedGroups[groupName] ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedGroups[groupName] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-0.5 mt-1">
                      {traditions.map((tradition) => (
                        <button
                          key={tradition.id}
                          onClick={() => navigateTo(tradition.id)}
                          className={`sidebar-item ${activeTab === tradition.id ? 'sidebar-item-active' : ''}`}
                        >
                          {tradition.icon && (
                            <span className="text-sm mr-2.5 opacity-80">{tradition.icon}</span>
                          )}
                          <span>{tradition.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Bottom area */}
        <div className="p-3 border-t border-white/[0.04] space-y-2">
          <div className="rounded-xl p-2.5 bg-white/[0.02] border border-white/[0.04] space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cosmic-500/30 to-nebula-500/30 text-cosmic-300 flex items-center justify-center shrink-0 text-xs font-bold ring-1 ring-white/10">
                {userProfile.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-semibold text-white truncate">{userProfile.name || 'Seeker'}</p>
                <p className="text-[10px] text-slate-400 truncate capitalize">{userProfile.preferredSystem || 'Western'} • {userProfile.dob || '1998-06-15'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="py-1.5 px-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 border border-white/[0.06] text-[10px] font-medium transition-all truncate"
              >
                Customise
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="py-1.5 px-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 border border-white/[0.06] text-[10px] font-medium transition-all truncate"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[10px] space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Verified System</span>
            </div>
            <p className="text-slate-500 leading-tight">
              Engineered for absolute accuracy.
            </p>
          </div>
        </div>
      </aside>
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
            onUpdateSystem={(sys) => setUserProfile({ ...userProfile, preferredSystem: sys })}
          />
        )}

        {/* Page Content */}
        <div 
          ref={mainScrollRef}
          className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar ${activeTab === 'landing' ? 'p-0' : 'pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-6'} w-full`}
        >
          <div className={`${activeTab === 'landing' ? 'w-full' : 'max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6'} h-full w-full`}>
            <Suspense fallback={<CosmicCelestialLoader message="Synchronizing Celestial Intelligence" />}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0 }}
                  className="h-full"
                >
                <ErrorBoundary>
                  {(showOnboarding || activeTab === 'onboarding') && (
                    <OmniOnboardingWizard
                      initialPreset={landingPreset}
                      onClose={() => {
                        setShowOnboarding(false);
                        if (activeTab === 'onboarding') setActiveTab('landing');
                      }}
                      onComplete={(profile) => {
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
                      onStartOnboarding={(preset) => {
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
                      onNavigateToTab={(tab) => {
                        navigateTo(tab);
                      }}
                      userProfile={userProfile}
                    />
                  )}
                  {activeTab === 'free-tools' && (
                    <OmniFreeToolsHub
                      userProfile={userProfile}
                      onStartOnboarding={(preset) => {
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
                  {activeTab === 'home' && (
                    <OmniSimpleHome
                      userProfile={userProfile}
                      onNavigate={navigateTo}
                      onOpenProfile={() => setIsProfileModalOpen(true)}
                      onUpdateProfile={(updated) => { setUserProfile(updated); saveProfile(updated); }}
                    />
                  )}
                  {(activeTab === 'dashboard' || activeTab === 'pro-dashboard' || activeTab === 'overview') && (
                    <CosmicIntelligenceCenter
                      onNavigate={navigateTo}
                      userProfile={userProfile}
                      onUpdateProfile={(updated) => { setUserProfile(updated); saveProfile(updated); }}
                    />
                  )}
                  {activeTab === 'forecast' && (
                    <OmniForecastView userProfile={userProfile} />
                  )}
                  {activeTab === 'ask' && (
                    <OmniAskAssistant userProfile={userProfile} onNavigate={navigateTo} />
                  )}
                  {activeTab === 'charts' && (
                    <OmniChartsView userProfile={userProfile} />
                  )}
                  {(activeTab === 'me' || activeTab === 'profile') && (
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
                  {activeTab === 'live-diagnostics' && <LiveCosmicDiagnostics userProfile={userProfile} />}
                  {activeTab === 'advisor' && <HolisticAdvisor userProfile={userProfile} />}
                  {(activeTab === 'remedies' || activeTab === 'remedy') && <AstroMultiTraditionRemedySuite />}
                  {activeTab === 'custom-remedies' && <CustomRemedialMediumEngine userProfile={userProfile} />}
                  {(activeTab === 'synastry' || activeTab === 'match') && <AstroSynastryMatchmaker userProfile={userProfile} />}
                  {(activeTab === 'compatibility' || activeTab === 'ashta-koota') && <OmniCompatibilityLab userProfile={userProfile} />}
                  {activeTab === 'global-suite' && <GlobalWisdomSuite userProfile={userProfile} />}
                  {(activeTab === 'omni-research' || activeTab === 'comparative-mode' || activeTab === 'consensus' || activeTab === 'research') && <AstroOmniResearchSuite userProfile={userProfile} />}
                  {activeTab === 'tools-catalog' && <Astro150ToolsCatalog userProfile={userProfile} onNavigate={navigateTo} activeCategory={activeTab} initialCategory={activeTab} />}
                  {(activeTab === 'birth-chart' || activeTab === 'kundli' || activeTab === 'nakshatra') && <BirthChartGenerator userProfile={userProfile} />}
                  {activeTab === 'master-chart' && <UnifiedChartEngine userProfile={userProfile} activeTab={activeTab} initialTab={activeTab} />}
                  {activeTab === 'dasha' && <UnifiedChartEngine userProfile={userProfile} activeTab="dasha" initialTab="dasha" />}
                  {(activeTab === 'islamic-astrology' || activeTab === 'islamic-suite' || activeTab === 'islamic') && <UnifiedIslamicSuite userProfile={userProfile} />}
                  {activeTab === 'chat' && <AstrologyChat />}
                  {(activeTab === 'dream-interpreter' || activeTab === 'dream') && <DreamInterpretationEngine userProfile={userProfile} />}
                  {activeTab === 'problem-solver' && <UniversalProblemSolverSuite userProfile={userProfile} />}
                  {activeTab === 'spiritual-traditions' && <SpiritualTraditionsModule userProfile={userProfile} />}
                  {activeTab === 'consultation-hub' && <CommunityConsultationHub />}
                  {(activeTab === 'divisional-charts' || activeTab === 'vargas') && <DivisionalChartsSuite userProfile={userProfile} />}
                  {(activeTab === 'shadbala' || activeTab === 'planetary-strengths') && <UnifiedChartEngine userProfile={userProfile} activeTab="shadbala" initialTab="shadbala" />}
                  {(activeTab === 'sadesati' || activeTab === 'saturn-transit') && <TimeHorizonForecastSuite userProfile={userProfile} />}
                  {(activeTab === 'report-generator' || activeTab === 'executive-report') && <ExecutiveReportGenerator userProfile={userProfile} />}
                  {activeTab === 'btr-suite' && <BirthTimeRectificationSuite />}
                  {(activeTab === 'gemstone-suite' || activeTab === 'gemstones') && <GemstoneRudrakshaSuite />}
                  {(activeTab === 'numerology' || activeTab === 'numerology-suite') && <NumerologyNameSuite />}
                  {(activeTab === 'tarot-iching' || activeTab === 'tarot') && <TarotIChingSuite />}
                  {(activeTab === 'time-horizon' || activeTab === 'career') && <TimeHorizonForecastSuite userProfile={userProfile} />}
                  {activeTab === 'dosha-engine' && <DoshaRemedyEngine userProfile={userProfile} />}
                  {activeTab === 'biorhythm-tracker' && <CosmicBiorhythmTracker userProfile={userProfile} />}
                  {(activeTab === 'chakras' || activeTab === 'chakra-alignment') && <SacredChakraAlignment />}
                  {(activeTab === 'feng-shui' || activeTab === 'fengshui-matrix') && <CosmicFengShuiMatrix userProfile={userProfile} />}
                  {(activeTab === 'muhurta' || activeTab === 'electional-muhurta') && <ElectionalMuhurtaEngine />}
                  {(activeTab === 'horas' || activeTab === 'planetary-horas') && <PlanetaryHorasTracker />}
                  {(activeTab === 'mantras' || activeTab === 'mantra-soundboard') && <SacredMantraSoundboard />}
                  {activeTab === 'transit-radar' && <PlanetaryTransitRadar />}
                  {(activeTab === 'panchang-deities' || activeTab === 'panchang') && <PanchangDeitiesEngine />}
                  {activeTab === 'cosmic-compass' && <CosmicCompassVisualizer userProfile={userProfile} />}
                  {(activeTab === 'astrocartography' || activeTab === 'astro-cartography') && <AstroCartographyMatrix userProfile={userProfile} />}
                  {(activeTab === 'vedic-astrology' || activeTab === 'western-astrology' || activeTab === 'panchanga' || activeTab === 'methodology') && (
                    <SEOTopicHub
                      hubId={activeTab as any}
                      onStartChart={() => setShowOnboarding(true)}
                      onNavigate={navigateTo}
                      userProfile={userProfile}
                    />
                  )}
                  {activeTab === 'transit-calendar' && <CosmicTransitCalendar />}
                  {activeTab === 'synastry-overlay' && <SynastryOverlayChart userProfile={userProfile} />}
                  {activeTab === 'mind-map' && <AstrologicalMindMap />}
                  {activeTab === 'chart-analytics' && <CosmicChartAnalytics userProfile={userProfile} />}
                  {activeTab === 'learning-hub' && <AstrologyLearningHub />}
                  {activeTab === 'admin-dashboard' && <AdminAnalyticsDashboard />}
                  {(activeTab === 'seo' || activeTab === 'seo-suite' || activeTab === 'seo-auditor' || activeTab === 'seo-growth') && <OmniSEOGrowthSuite />}
                  {(activeTab === 'seo-lab' || activeTab === 'keyword-lab' || activeTab === 'keywords' || activeTab === 'seo-lab/keywords') && <KeywordResearchLab onNavigate={navigateTo} />}
                  {(activeTab === 'backlink-lab' || activeTab === 'backlinks' || activeTab === 'link-lab' || activeTab === 'seo-lab/backlinks') && <BacklinkOpportunityLab onNavigate={navigateTo} />}
                  {(activeTab === 'news-intelligence' || activeTab === 'cosmic-news' || activeTab === 'mundane' || activeTab === 'news-prediction') && <CosmicNewsIntelligenceHub userProfile={userProfile} onNavigate={navigateTo} />}
                  {activeTab === 'control-center' && <AstrologyControlCenter />}
                  {activeTab === 'studio' && <CosmicStudioSuite userProfile={userProfile} />}
                  {activeTab === 'horoscope' && <PremiumHoroscopeEngine userProfile={userProfile} />}
                  {activeTab === 'passport' && <CosmicPassportCard userProfile={userProfile} onNavigateToTab={navigateTo} />}
                  {(activeTab === 'widgets' || activeTab === 'embed') && <EmbeddableWidgetGenerator onNavigateToTab={navigateTo} />}
                  {(activeTab === 'directory' || activeTab === 'celebrities') && <ProgrammaticSeoDirectory onNavigateToTab={navigateTo} />}
                  {(activeTab === 'chart-studio' || activeTab === 'dual-chart') && <InteractiveDualChartStudio userProfile={userProfile} onNavigateToTab={navigateTo} />}
                  {(activeTab === 'dossier' || activeTab === 'pdf-report') && <ExecutiveCosmicDossierSuite userProfile={userProfile} onNavigateToTab={navigateTo} />}
                  {(activeTab === 'copilot' || activeTab === 'ask') && <AstroDeterministicCopilot userProfile={userProfile} onNavigateToTab={navigateTo} />}
                  {(activeTab === 'pwa' || activeTab === 'briefing') && <PwaCosmicBriefing onNavigateToTab={navigateTo} />}
                  {(activeTab === 'shlokas' || activeTab === 'scripture') && <ClassicalShlokaLibrary />}
                  {(activeTab === 'sabian' || activeTab === 'sabian-symbols') && <SabianSymbolsDegreeExplorer />}
                  {(activeTab === 'ephemeris-lab' || activeTab === 'diagnostic-lab') && <MultiSystemEphemerisDiagnosticLab userProfile={userProfile} />}
                  {(activeTab === 'frequencies' || activeTab === 'binaural' || activeTab === 'sound-studio' || activeTab === 'planetary-frequencies') && <PlanetaryFrequencyStudio />}
                  {TRADITIONS[activeTab] && (
                    <TraditionView
                      tradition={TRADITIONS[activeTab]}
                      category={TRADITIONS[activeTab]}
                      onNavigate={navigateTo}
                      userProfile={userProfile}
                      onUpdateProfile={setUserProfile}
                    />
                  )}
                </ErrorBoundary>
                <Footer />
              </motion.div>
            </AnimatePresence>
          </Suspense>
          </div>
        </div>



      {/* ✦ PERSISTENT FLOATING ASK BUTTON */}
      {activeTab !== 'ask' && activeTab !== 'landing' && (
        <button
          onClick={() => navigateTo('ask')}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs font-mono shadow-xl shadow-amber-500/25 border border-amber-300/40 transition-all active:scale-95 cursor-pointer"
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
                onAuthSuccess={(updated) => {
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
