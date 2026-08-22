/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, Suspense } from 'react';
import {
  Sparkles, Menu, X, LayoutDashboard, MessageCircle, ChevronDown, User, Users, Globe2, Bell,
  Compass, Moon, ShieldCheck, Activity, Gem, HeartHandshake, Globe, Search, Command, CloudMoon,
  Zap, Wrench, DollarSign, Wallet, ArrowLeft, Home,
  // Previously rendered in the sidebar but never imported — each one threw
  // ReferenceError as soon as the nav mounted. esbuild does not flag undefined
  // identifiers, which is why the build stayed green while the app crashed.
  AlertTriangle, BarChart2, BookOpen, Calendar, Clock, Eye, FileText, Hash, Map, MapPin,
  Music, Network, Radar, Shield, Sun, Sunrise,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRADITIONS, CategoryInfo, TraditionGroup, UserProfile, GROUP_ICONS } from './types';
import { useWalletStore } from './stores/walletStore';
import CosmicIntelligenceCenter from './components/CosmicIntelligenceCenter';
import LandingPage from './components/landing/LandingPage';
import AstrologyChat from './components/AstrologyChat';
import TraditionView from './components/TraditionView';
import Onboarding from './components/Onboarding';
import UnifiedChartEngine from './components/UnifiedChartEngine';
import UnifiedIslamicSuite from './components/UnifiedIslamicSuite';
import AstroCoreBrainConsole from './components/AstroCoreBrainConsole';
import BirthChartGenerator from './components/BirthChartGenerator';
import HolisticAdvisor from './components/HolisticAdvisor';
import LiveCosmicDiagnostics from './components/LiveCosmicDiagnostics';
import CustomRemedialMediumEngine from './components/CustomRemedialMediumEngine';
import AstroMultiTraditionRemedySuite from './components/AstroMultiTraditionRemedySuite';
import GlobalWisdomSuite from './components/GlobalWisdomSuite';
import AstroSynastryMatchmaker from './components/AstroSynastryMatchmaker';
import Astro150ToolsCatalog from './components/Astro150ToolsCatalog';
import CommandPaletteModal from './components/CommandPaletteModal';
import DreamInterpretationEngine from './components/DreamInterpretationEngine';
import UniversalProblemSolverSuite from './components/UniversalProblemSolverSuite';
import PremiumHoroscopeEngine from './components/PremiumHoroscopeEngine';
import SpiritualTraditionsModule from './components/SpiritualTraditionsModule';
import BhagavadGitaSuite from './components/BhagavadGitaSuite';
import AstrologyControlCenter from './components/AstrologyControlCenter';
import CommunityConsultationHub from './components/CommunityConsultationHub';
import ExecutivePDFDossier from './components/ExecutivePDFDossier';
import Footer from './components/Footer';
import AuthScreen from './components/AuthScreen';
import DivisionalChartsSuite from './components/DivisionalChartsSuite';
import BirthTimeRectificationSuite from './components/BirthTimeRectificationSuite';
import GemstoneRudrakshaSuite from './components/GemstoneRudrakshaSuite';
import NumerologyNameSuite from './components/NumerologyNameSuite';
import TarotIChingSuite from './components/TarotIChingSuite';
import TimeHorizonForecastSuite from './components/TimeHorizonForecastSuite';
import DoshaRemedyEngine from './components/DoshaRemedyEngine';
import CosmicBiorhythmTracker from './components/CosmicBiorhythmTracker';
import SacredChakraAlignment from './components/SacredChakraAlignment';
import CosmicFengShuiMatrix from './components/CosmicFengShuiMatrix';
import ElectionalMuhurtaEngine from './components/ElectionalMuhurtaEngine';
import PlanetaryHorasTracker from './components/PlanetaryHorasTracker';
import SacredMantraSoundboard from './components/SacredMantraSoundboard';
import PlanetaryTransitRadar from './components/PlanetaryTransitRadar';
import PanchangDeitiesEngine from './components/PanchangDeitiesEngine';
import CosmicCompassVisualizer from './components/CosmicCompassVisualizer';
import AstroCartographyMatrix from './components/AstroCartographyMatrix';
import CosmicTransitCalendar from './components/CosmicTransitCalendar';
import SynastryOverlayChart from './components/SynastryOverlayChart';
import AstrologicalMindMap from './components/AstrologicalMindMap';
import CosmicChartAnalytics from './components/CosmicChartAnalytics';
import AstrologyLearningHub from './components/AstrologyLearningHub';
import ExecutiveReportGenerator from './components/ExecutiveReportGenerator';
import AdminAnalyticsDashboard from './components/AdminAnalyticsDashboard';
import CosmicLeafletMap from './components/CosmicLeafletMap';
import CosmicParticleBackground from './components/CosmicParticleBackground';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalLanguageSelector from './components/GlobalLanguageSelector';
import { useGlobalConfig } from './context/GlobalConfigContext';
import { Toaster, toast } from 'sonner';

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
  } catch (e) {
    console.warn("localStorage unavailable", e);
  }
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
  
  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      return localStorage.getItem(TAB_KEY) || 'dashboard';
    } catch {
      return 'dashboard';
    }
  });
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

  // Persist active tab
  useEffect(() => {
    localStorage.setItem(TAB_KEY, activeTab);
  }, [activeTab]);

  // Close sidebar on mobile when navigating
  const navigateTo = useCallback((tab: string) => {
    setActiveTab(tab);
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

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
    if (activeTab === 'earnings-hub' || activeTab === 'monetization') return 'Astrology Business & Revenue Hub (Cashfree PG)';
    if (activeTab === 'landing') return 'Product Overview & Free Birth Chart';
    if (TRADITIONS[activeTab]) return TRADITIONS[activeTab].name;
    return 'Cosmos OMNI';
  };

  if (!hasOnboarded) {
    if (showOnboarding) {
      return (
        <Onboarding
          initialProfile={landingPreset}
          onComplete={handleOnboardingComplete}
        />
      );
    }
    return (
      <LandingPage
        onStartOnboarding={(preset) => {
          setLandingPreset(preset);
          setShowOnboarding(true);
        }}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          setHasOnboarded(true);
        }}
        userProfile={userProfile}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#090d16] text-slate-100 flex overflow-hidden font-sans">
      {/* 🌌 High-Resolution Animated Cosmic Background (Ken Burns Nebula + Twinkling Stars + Meteors) */}
      <CosmicParticleBackground />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 md:static h-full w-64 bg-[#090d16]/98 md:bg-[#090d16]/60 backdrop-blur-3xl border-r border-white/[0.04] flex flex-col z-50 transition-transform duration-300 ease-out md:translate-x-0 shrink-0 ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        } ${!isSidebarOpen ? 'max-md:pointer-events-none max-md:hidden md:flex' : 'flex'}`}
      >
        {/* Logo area */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-white/[0.04] flex-shrink-0">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('dashboard')}>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cosmic-500/20 to-nebula-500/20 border border-cosmic-500/30 flex items-center justify-center">
              <Compass className="w-4 h-4 text-cosmic-400" />
            </div>
            <span className="font-bold text-sm tracking-wide text-slate-200">
              COSMOS <span className="text-cosmic-400 font-light">OMNI</span>
            </span>
          </div>
          <button className="md:hidden p-1 text-slate-500 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
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
                  <button onClick={() => navigateTo('admin-dashboard')} className={`sidebar-item ${activeTab === 'admin-dashboard' ? 'sidebar-item-active' : ''}`}><Shield className="w-4 h-4" /><span>Admin Dashboard</span></button>
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
                <span className="sidebar-section-label">{groupName}</span>
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
                          <span className="text-sm mr-2.5 opacity-80">{tradition.icon}</span>
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

      {/* Main Content */}
      <main className="flex-1 min-w-0 w-full relative z-10 flex flex-col h-[100dvh] overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-white/[0.04] bg-[#090d16]/90 backdrop-blur-2xl flex items-center justify-between px-3 sm:px-5 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button 
              className="md:hidden text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/[0.05] transition-colors shrink-0 active:scale-95 cursor-pointer" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Navigation Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Prominent Back to Home / Landing Button */}
            {activeTab !== 'landing' ? (
              <button
                onClick={() => navigateTo('landing')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C9A86A]/10 hover:bg-[#C9A86A] text-[#C9A86A] hover:text-[#070A12] border border-[#C9A86A]/30 hover:border-[#C9A86A] transition-all text-xs font-bold shrink-0 cursor-pointer shadow-sm active:scale-95"
                title="Return to Landing Page"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('dashboard')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#C9A86A] text-slate-300 hover:text-[#070A12] border border-white/[0.08] hover:border-[#C9A86A] transition-all text-xs font-semibold shrink-0 cursor-pointer shadow-sm active:scale-95"
                title="Enter Studio Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>Dashboard</span>
              </button>
            )}

            {/* Jump to Dashboard button when deep in other tools */}
            {activeTab !== 'landing' && activeTab !== 'dashboard' && (
              <button
                onClick={() => navigateTo('dashboard')}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-all text-xs font-medium shrink-0 cursor-pointer"
                title="Jump to Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                <span>Dashboard</span>
              </button>
            )}

            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-xs sm:text-sm font-semibold text-slate-200 tracking-tight truncate max-w-[130px] sm:max-w-xs md:max-w-md">
                {getPageTitle()}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span className="hidden sm:inline">100% Free Pro Access</span>
              <span className="sm:hidden">Free</span>
            </div>
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white hover:border-white/[0.12] transition-all text-xs active:scale-95"
              title="Search Tools"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400">⌘K</kbd>
            </button>
            <button
              onClick={() => navigateTo('control-center')}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors active:scale-95"
              title="Settings"
            >
              <Wrench className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-cosmic-500/30 to-nebula-500/30 text-cosmic-300 flex items-center justify-center text-xs font-bold ring-1 ring-white/10 hover:ring-cosmic-500/30 transition-all cursor-pointer active:scale-95"
            >
              {userProfile.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-24 md:pb-6 w-full">
          <div className="max-w-7xl mx-auto h-full px-2.5 sm:px-4 lg:px-6 w-full">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
                <p className="text-xs font-mono text-cyan-300">Synchronizing Cosmic Intelligence Engines...</p>
              </div>
            }>
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
                  {activeTab === 'landing' && (
                    <LandingPage
                      onStartOnboarding={(preset) => {
                        if (preset && preset.name && preset.dob) {
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
                          navigateTo('birth-chart');
                        } else {
                          setLandingPreset(preset);
                          setShowOnboarding(true);
                        }
                      }}
                      onNavigateToTab={(tab) => navigateTo(tab)}
                      userProfile={userProfile}
                    />
                  )}
                  {activeTab === 'dashboard' && <CosmicIntelligenceCenter onNavigate={navigateTo} userProfile={userProfile} onUpdateProfile={(updated) => { setUserProfile(updated); saveProfile(updated); }} />}
                  {activeTab === 'live-diagnostics' && <LiveCosmicDiagnostics userProfile={userProfile} />}
                  {activeTab === 'advisor' && <HolisticAdvisor userProfile={userProfile} />}
                  {(activeTab === 'remedies' || activeTab === 'remedy') && <AstroMultiTraditionRemedySuite />}
                  {activeTab === 'custom-remedies' && <CustomRemedialMediumEngine userProfile={userProfile} />}
                  {(activeTab === 'synastry' || activeTab === 'compatibility' || activeTab === 'match') && <AstroSynastryMatchmaker userProfile={userProfile} />}
                  {activeTab === 'global-suite' && <GlobalWisdomSuite userProfile={userProfile} />}
                  {activeTab === 'tools-catalog' && <Astro150ToolsCatalog userProfile={userProfile} onNavigate={navigateTo} activeCategory={activeTab} initialCategory={activeTab} />}
                  {(activeTab === 'birth-chart' || activeTab === 'kundli') && <BirthChartGenerator userProfile={userProfile} />}
                  {activeTab === 'master-chart' && <UnifiedChartEngine userProfile={userProfile} activeTab={activeTab} initialTab={activeTab} />}
                  {(activeTab === 'islamic-astrology' || activeTab === 'islamic-suite' || activeTab === 'islamic') && <UnifiedIslamicSuite userProfile={userProfile} />}
                  {activeTab === 'chat' && <AstrologyChat />}
                  {(activeTab === 'dream-interpreter' || activeTab === 'dream') && <DreamInterpretationEngine userProfile={userProfile} />}
                  {activeTab === 'problem-solver' && <UniversalProblemSolverSuite userProfile={userProfile} />}
                  {activeTab === 'spiritual-traditions' && <SpiritualTraditionsModule userProfile={userProfile} />}
                  {activeTab === 'consultation-hub' && <CommunityConsultationHub />}
                  {activeTab === 'divisional-charts' && <DivisionalChartsSuite planetPositions={[]} />}
                  {activeTab === 'btr-suite' && <BirthTimeRectificationSuite />}
                  {activeTab === 'gemstone-suite' && <GemstoneRudrakshaSuite />}
                  {activeTab === 'numerology-suite' && <NumerologyNameSuite />}
                  {activeTab === 'tarot-iching' && <TarotIChingSuite />}
                  {activeTab === 'time-horizon' && <TimeHorizonForecastSuite userProfile={userProfile} />}
                  {activeTab === 'dosha-engine' && <DoshaRemedyEngine planetPositions={[]} userProfile={userProfile} />}
                  {activeTab === 'biorhythm-tracker' && <CosmicBiorhythmTracker userProfile={userProfile} />}
                  {activeTab === 'chakra-alignment' && <SacredChakraAlignment planetPositions={[]} />}
                  {activeTab === 'fengshui-matrix' && <CosmicFengShuiMatrix userProfile={userProfile} />}
                  {activeTab === 'electional-muhurta' && <ElectionalMuhurtaEngine />}
                  {activeTab === 'planetary-horas' && <PlanetaryHorasTracker />}
                  {activeTab === 'mantra-soundboard' && <SacredMantraSoundboard />}
                  {activeTab === 'transit-radar' && <PlanetaryTransitRadar />}
                  {activeTab === 'panchang-deities' && <PanchangDeitiesEngine />}
                  {activeTab === 'cosmic-compass' && <CosmicCompassVisualizer userProfile={userProfile} />}
                  {activeTab === 'astro-cartography' && <AstroCartographyMatrix userProfile={userProfile} />}
                  {activeTab === 'transit-calendar' && <CosmicTransitCalendar />}
                  {activeTab === 'synastry-overlay' && <SynastryOverlayChart personAPositions={[]} />}
                  {activeTab === 'mind-map' && <AstrologicalMindMap />}
                  {activeTab === 'chart-analytics' && <CosmicChartAnalytics />}
                  {activeTab === 'learning-hub' && <AstrologyLearningHub />}
                  {activeTab === 'report-generator' && <ExecutiveReportGenerator />}
                  {activeTab === 'admin-dashboard' && <AdminAnalyticsDashboard />}
                  {activeTab === 'control-center' && <AstrologyControlCenter />}
                  {activeTab === 'horoscope' && <PremiumHoroscopeEngine userProfile={userProfile} />}
                  {(activeTab === 'compatibility' || activeTab === 'ashta-koota') && <AstroSynastryMatchmaker userProfile={userProfile} />}
                  {activeTab === 'islamic-suite' && <UnifiedIslamicSuite userProfile={userProfile} />}
                  {activeTab === 'remedy' && <AstroMultiTraditionRemedySuite />}
                  {(activeTab === 'kundli' || activeTab === 'nakshatra') && <BirthChartGenerator userProfile={userProfile} />}
                  {activeTab === 'dasha' && <UnifiedChartEngine userProfile={userProfile} activeTab="dasha" initialTab="dasha" />}
                  {activeTab === 'career' && <TimeHorizonForecastSuite userProfile={userProfile} />}
                  {activeTab === 'muhurta' && <ElectionalMuhurtaEngine />}
                  {activeTab === 'panchang' && <PanchangDeitiesEngine />}
                  {activeTab === 'dream' && <DreamInterpretationEngine userProfile={userProfile} />}
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

      {/* 📱 MOBILE BOTTOM NAVIGATION DOCK (Glassmorphic + Active Micro-Interactions) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 pb-safe bg-[#090d16]/95 backdrop-blur-3xl border-t border-white/[0.08] z-40 px-3 flex items-center justify-around shadow-[0_-8px_30px_rgba(0,0,0,0.5)] select-none">
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: 'Overview', color: 'cyan' },
          { id: 'live-diagnostics', icon: Activity, label: 'Diagnose', color: 'amber' },
          { id: 'birth-chart', icon: Compass, label: 'Kundli', color: 'purple' },
          { id: 'tools-catalog', icon: Sparkles, label: 'Tools', color: 'emerald' },
          { id: 'chat', icon: MessageCircle, label: 'Oracle', color: 'blue' },
        ].map(({ id, icon: Icon, label, color }) => {
          const isActive = activeTab === id;
          return (
            <motion.button
              key={id}
              onClick={() => navigateTo(id)}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 cursor-pointer ${
                isActive ? `text-${color}-400 font-bold` : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? `text-${color}-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)] scale-110` : ''}`} />
                {isActive && (
                  <motion.div 
                    layoutId="mobileActiveDot"
                    className={`w-1 h-1 rounded-full bg-${color}-400 mx-auto mt-0.5 shadow-[0_0_6px_currentColor]`} 
                  />
                )}
              </div>
              <span className={`text-[10.5px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
            </motion.button>
          );
        })}
      </div>
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

      {/* Sonner Toast Provider */}
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
