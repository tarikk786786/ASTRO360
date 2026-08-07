/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, Suspense } from 'react';
import { Sparkles, Menu, X, LayoutDashboard, MessageCircle, ChevronDown, User, Users, Globe2, Bell, Compass, Moon, ShieldCheck, Activity, Gem, HeartHandshake, Globe, Search, Command, CloudMoon, Zap, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRADITIONS, CategoryInfo, TraditionGroup, UserProfile, GROUP_ICONS } from './types';
import CosmicIntelligenceCenter from './components/CosmicIntelligenceCenter';
import AstrologyChat from './components/AstrologyChat';
import TraditionView from './components/TraditionView';
import Onboarding from './components/Onboarding';
import NotificationManager from './components/NotificationManager';
import UnifiedChartEngine from './components/UnifiedChartEngine';
import UnifiedIslamicSuite from './components/UnifiedIslamicSuite';
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
import CommunityConsultationHub from './components/CommunityConsultationHub';
import { Toaster, toast } from 'sonner';

const STORAGE_KEY = 'astroverse_profile';
const TAB_KEY = 'astroverse_tab';

function loadProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn("localStorage unavailable", e);
  }
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Tarik Islam',
  email: 'princetarikislam@gmail.com',
  phone: '',
  gender: 'universal',
  dob: '1998-06-15',
  time: '12:00',
  location: 'Mecca, Saudi Arabia',
  preferredSystem: 'western',
  careerGoal: 'Business Growth & Prosperity',
  relationshipStatus: 'Seeking Harmony',
  primaryLifeFocus: 'Wealth, Purpose & Protection',
};

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadProfile());
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(true);
  
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
  const groupedTraditions = Object.values(TRADITIONS).reduce((acc, tradition) => {
    if (!acc[tradition.group]) {
      acc[tradition.group] = [];
    }
    acc[tradition.group].push(tradition);
    return acc;
  }, {} as Record<TraditionGroup, CategoryInfo[]>);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Asian & Eastern': true,
    'Western & European': true,
    'Middle Eastern & Semitic': true,
    'Indigenous & Ancient': true
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
    if (activeTab === 'notifications') return 'Notification Settings';
    if (TRADITIONS[activeTab]) return TRADITIONS[activeTab].name;
    return 'AstroVerse AI';
  };

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="relative min-h-screen bg-[#090d16] text-slate-100 flex overflow-hidden font-sans">
      {/* Clean Static Professional Dark Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#090d16] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-[#090d16] to-[#090d16]" />

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
        className={`w-72 border-r border-white/[0.08] bg-[#090d16]/95 backdrop-blur-2xl z-50 flex-shrink-0 fixed md:relative inset-y-0 left-0 h-full flex flex-col transition-transform duration-300 ease-out shadow-2xl ${
          isSidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-5 flex items-center justify-between shrink-0 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cosmic-500 to-nebula-500 flex items-center justify-center shadow-lg shadow-cosmic-500/20">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight gradient-text block leading-tight font-display">
                Cosmos
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-amber-400 font-semibold">Free & Perfect Universal Engine</span>
            </div>
          </div>
          <button className="md:hidden text-slate-400 hover:text-white p-1" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
          {/* Quick Command Palette Search Button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 mb-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-cosmic-500/40 text-slate-400 hover:text-white transition-all text-xs font-sans cursor-pointer focus-ring"
            aria-label="Open Search Command Palette"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cosmic-400" />
              <span>Search Tools...</span>
            </span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-300 flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" />K
            </span>
          </button>

          {/* Main Nav */}
          <button 
            onClick={() => navigateTo('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'dashboard' 
                ? 'bg-cosmic-500/15 text-cosmic-300 border border-cosmic-500/25 shadow-sm shadow-cosmic-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </button>
          
          <button 
            onClick={() => navigateTo('live-diagnostics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'live-diagnostics' 
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25 shadow-sm shadow-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="font-medium text-sm">Live Diagnostics (What & Solution)</span>
          </button>

          <button 
            onClick={() => navigateTo('advisor')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'advisor' 
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 shadow-sm shadow-emerald-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="font-medium text-sm">Holistic Life Advisor</span>
          </button>

          <button 
            onClick={() => navigateTo('remedies')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'remedies' 
                ? 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/25 shadow-sm shadow-yellow-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Gem className="w-5 h-5" />
            <span className="font-medium text-sm">Remedial Gemstones & Yantras</span>
          </button>

          <button 
            onClick={() => navigateTo('custom-remedies')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'custom-remedies' 
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25 shadow-sm shadow-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <HeartHandshake className="w-5 h-5" />
            <span className="font-medium text-sm">Problem & Solution (By Medium)</span>
          </button>

          <button 
            onClick={() => navigateTo('synastry')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'synastry' 
                ? 'bg-pink-500/15 text-pink-300 border border-pink-500/25 shadow-sm shadow-pink-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="font-medium text-sm">Synastry & Team Matcher</span>
          </button>

          <button 
            onClick={() => navigateTo('global-suite')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'global-suite' 
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 shadow-sm shadow-cyan-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Globe className="w-5 h-5" />
            <span className="font-medium text-sm">Global Universal Wisdom Suite</span>
          </button>

          <button 
            onClick={() => navigateTo('tools-catalog')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'tools-catalog' 
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25 shadow-sm shadow-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="font-medium text-sm font-bold">150+ Astro Tools Suite</span>
          </button>

          <button 
            onClick={() => navigateTo('birth-chart')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'birth-chart' 
                ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25 shadow-sm shadow-purple-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium text-sm">Birth Chart (Kundli)</span>
          </button>

          <button 
            onClick={() => navigateTo('master-chart')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'master-chart' 
                ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 shadow-sm shadow-indigo-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="font-medium text-sm">Master Overall Chart</span>
          </button>

          <button 
            onClick={() => navigateTo('islamic-suite')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'islamic-suite' || activeTab === 'islamic-astrology'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 shadow-sm shadow-emerald-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Moon className="w-5 h-5 text-emerald-400" />
            <span className="font-medium text-sm font-bold">Islamic Guidance & Ilm al-Nujum</span>
          </button>
          
          <button 
            onClick={() => navigateTo('chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'chat' 
                ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25 shadow-sm shadow-purple-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium text-sm">Astrologer Consultation</span>
          </button>

          <button 
            onClick={() => navigateTo('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === 'notifications' 
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25 shadow-sm shadow-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="font-medium text-sm">Daily / Hourly Alerts</span>
          </button>

          <button 
            onClick={() => navigateTo('dream-interpreter')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'dream-interpreter' 
                ? 'bg-purple-500/15 text-purple-300 border border-purple-500/25 shadow-sm shadow-purple-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <CloudMoon className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-sm font-bold">Dream Interpretation Suite</span>
          </button>

          <button 
            onClick={() => navigateTo('problem-solver')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'problem-solver' 
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25 shadow-sm shadow-cyan-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="font-medium text-sm font-bold text-cyan-300">Interactive Problem Tools</span>
          </button>

          <button 
            onClick={() => navigateTo('spiritual-traditions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'spiritual-traditions' 
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25 shadow-sm shadow-amber-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="font-medium text-sm font-bold text-amber-300">Spiritual & Cultural Beliefs</span>
          </button>

          {/* Astrologer Consultation & Community Q&A Hub Side Option */}
          <button 
            onClick={() => navigateTo('consultation-hub')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border ${
              activeTab === 'consultation-hub' 
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="font-medium text-sm font-bold text-cyan-300">Astrologer Consultations</span>
            </div>
            <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              Coming Soon
            </span>
          </button>

          {/* DEDICATED ASTROLOGICAL TOOLS SUITE (SIDEBAR NAV) */}
          <div className="pt-3 pb-1 border-t border-white/10 my-2">
            <div className="px-4 text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" /> Standalone Astro Tools
            </div>

            <div className="space-y-1 pl-1">
              {/* 🤝 ASTROLOGER CONSULTATION & COMMUNITY Q&A HUB */}
              <button 
                onClick={() => navigateTo('consultation-hub')}
                className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer border mb-2 ${
                  activeTab === 'consultation-hub' 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <span>🤝</span>
                  <span className="text-white font-mono">Astrologer Consultations & Q&A</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-mono font-bold ml-auto">Soon</span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-1 leading-snug">
                  Book 1-on-1 Consultations with Certified Scholars & Engage in Sacred Q&A Forums
                </p>
              </button>

              <button 
                onClick={() => navigateTo('divisional-charts')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'divisional-charts' ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🪐</span> D1–D60 Divisional Charts
              </button>

              <button 
                onClick={() => navigateTo('btr-suite')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'btr-suite' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>⏱️</span> Birth Time Rectification
              </button>

              <button 
                onClick={() => navigateTo('gemstone-suite')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'gemstone-suite' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>💎</span> Gemstone & Rudraksha
              </button>

              <button 
                onClick={() => navigateTo('numerology-suite')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'numerology-suite' ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🔢</span> Numerology & Name Vibration
              </button>

              <button 
                onClick={() => navigateTo('tarot-iching')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'tarot-iching' ? 'bg-pink-500/15 text-pink-300 border border-pink-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🎴</span> Tarot & 64 I Ching Oracle
              </button>

              <button 
                onClick={() => navigateTo('time-horizon')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'time-horizon' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>⏳</span> Time Horizon Forecast
              </button>

              <button 
                onClick={() => navigateTo('dosha-engine')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'dosha-engine' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🔥</span> Sade Sati & Dosha Engine
              </button>

              <button 
                onClick={() => navigateTo('biorhythm-tracker')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'biorhythm-tracker' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🌊</span> Biorhythm Energy Tracker
              </button>

              <button 
                onClick={() => navigateTo('chakra-alignment')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'chakra-alignment' ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🕉️</span> 7-Chakra Solfeggio Alignment
              </button>

              <button 
                onClick={() => navigateTo('fengshui-matrix')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'fengshui-matrix' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🧭</span> Cosmic Feng Shui Matrix
              </button>

              <button 
                onClick={() => navigateTo('electional-muhurta')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'electional-muhurta' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>⏰</span> Shubh Muhurta Time Engine
              </button>

              <button 
                onClick={() => navigateTo('planetary-horas')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'planetary-horas' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>☀️</span> Planetary Horas Real-Time Tracker
              </button>

              <button 
                onClick={() => navigateTo('mantra-soundboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'mantra-soundboard' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>📻</span> Sacred Mantra Soundboard
              </button>

              <button 
                onClick={() => navigateTo('transit-radar')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'transit-radar' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🛰️</span> Planetary Transit Ingress Radar
              </button>

              <button 
                onClick={() => navigateTo('panchang-deities')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'panchang-deities' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🌙</span> Panchang Tithi Deities & Vrats
              </button>

              <button 
                onClick={() => navigateTo('cosmic-compass')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'cosmic-compass' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🧭</span> 360° Sidereal Ephemeris Compass
              </button>

              <button 
                onClick={() => navigateTo('astro-cartography')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'astro-cartography' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🌐</span> Astro-Cartography Relocation Matrix
              </button>

              <button 
                onClick={() => navigateTo('transit-calendar')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'transit-calendar' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>📅</span> Cosmic Transit Calendar
              </button>

              <button 
                onClick={() => navigateTo('synastry-overlay')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'synastry-overlay' ? 'bg-pink-500/15 text-pink-300 border border-pink-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>💞</span> Synastry Dual-Ring Overlay
              </button>

              <button 
                onClick={() => navigateTo('mind-map')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'mind-map' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>🕸️</span> Astrological Mind Map
              </button>

              <button 
                onClick={() => navigateTo('chart-analytics')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'chart-analytics' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>📊</span> Shadbala & Element Analytics
              </button>

              <button 
                onClick={() => navigateTo('learning-hub')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'learning-hub' ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>📚</span> Astrology Encyclopedia
              </button>

              <button 
                onClick={() => navigateTo('report-generator')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === 'report-generator' ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>📑</span> Executive PDF Dossier
              </button>

              <button 
                onClick={() => navigateTo('admin-dashboard')}
                className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer border mt-2 ${
                  activeTab === 'admin-dashboard' 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-lg' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <span>🛡️</span>
                  <span className="text-white font-mono">Admin Analytics & AI Tracing</span>
                  <span className="text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.2 rounded font-mono font-bold ml-auto">Admin</span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-1 leading-snug">
                  User Management, Subscription Metrics, AI Token Tracing (Langfuse) & Audit Logs
                </p>
              </button>
            </div>
          </div>

          {/* Traditions Section */}
          <div className="pt-5 pb-2 px-2">
            <div className="flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.15em]">Global Systems</span>
            </div>
          </div>
          
          {Object.entries(groupedTraditions).map(([group, traditions]) => (
            <div key={group} className="mb-1">
              <button
                onClick={() => toggleGroup(group)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-400 hover:text-slate-200 transition-colors rounded-lg hover:bg-white/[0.03]"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{GROUP_ICONS[group as TraditionGroup]}</span>
                  <span className="font-medium text-xs">{group}</span>
                </span>
                <motion.div animate={{ rotate: expandedGroups[group] ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedGroups[group] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-0.5 pl-3 border-l border-white/[0.05] ml-4 mt-1 mb-2">
                      {traditions.map((tradition) => (
                        <button
                          key={tradition.id}
                          onClick={() => navigateTo(tradition.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 text-left ${
                            activeTab === tradition.id 
                              ? 'bg-white/[0.08] text-white' 
                              : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            activeTab === tradition.id ? 'bg-cosmic-400' : 'bg-slate-700'
                          }`} />
                          <span className="font-medium text-[13px] truncate">{tradition.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* User Profile Card & Professional Engineering Verification */}
        <div className="p-3 border-t border-white/[0.06] space-y-2">
          <button 
            onClick={() => setHasOnboarded(false)}
            className="w-full flex items-center gap-3 rounded-xl p-2.5 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] transition-colors cursor-pointer text-left group"
            title="Click to edit profile & re-calculate birth chart"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cosmic-500/30 to-nebula-500/30 text-cosmic-300 flex items-center justify-center shrink-0 text-xs font-bold ring-1 ring-cosmic-500/20 group-hover:ring-amber-500/40">
              {userProfile.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-semibold text-white truncate group-hover:text-amber-300">{userProfile.name || 'Seeker'}</p>
              <p className="text-[10px] text-slate-400 truncate capitalize">Edit Profile / System Settings</p>
            </div>
          </button>

          {/* Senior Developer & Master Astrologer Verification Badge */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/20 text-[10px] space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Verified Pro Engineering</span>
            </div>
            <p className="text-slate-400 leading-tight">
              Built by Senior Astronomical Systems Engineers & Master Astrologers. 100% Math Verified.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-white/[0.06] bg-black/30 backdrop-blur-xl flex items-center justify-between px-5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base font-semibold text-slate-200">
              {getPageTitle()}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              🧪 BETA TEST MODE
            </span>
            <a
              href="https://tarikislam.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/30 hover:bg-[#06B6D4]/20 px-2.5 py-1 rounded-full font-bold transition-all flex items-center gap-1"
            >
              <span>By Tarik Islam (tarikislam.in) ↗</span>
            </a>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
            </span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto custom-scrollbar pb-16 md:pb-0">
          <div className="max-w-7xl mx-auto h-full">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
                <p className="text-xs font-mono text-slate-400">Loading Cosmic Intelligence Engine...</p>
              </div>
            }>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="h-full"
                >
                {activeTab === 'dashboard' && <CosmicIntelligenceCenter onNavigate={navigateTo} userProfile={userProfile} />}
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
                {(activeTab === 'consultation-hub' || activeTab === 'astrologers' || activeTab === 'community-consultation') && <CommunityConsultationHub />}
                {(activeTab === 'horoscope' || activeTab === 'transits' || activeTab === 'panchang') && <PremiumHoroscopeEngine userProfile={userProfile} activeTab={activeTab} initialTab={activeTab} />}
                {(activeTab === 'reports' || activeTab === 'gemstone' || activeTab === 'muhurta' || activeTab === 'learning') && <Astro150ToolsCatalog userProfile={userProfile} onNavigate={navigateTo} activeCategory={activeTab} initialCategory={activeTab} />}
                {(activeTab === 'notifications' || activeTab === 'settings' || activeTab === 'admin') && (
                  <NotificationManager 
                    userProfile={userProfile} 
                    onUpdateProfile={(updated) => {
                      setUserProfile(updated);
                      saveProfile(updated);
                    }} 
                  />
                )}
                {TRADITIONS[activeTab] && (
                  <TraditionView tradition={TRADITIONS[activeTab]} onNavigate={navigateTo} />
                )}
                {!['dashboard', 'live-diagnostics', 'advisor', 'remedies', 'remedy', 'custom-remedies', 'synastry', 'compatibility', 'match', 'global-suite', 'tools-catalog', 'birth-chart', 'kundli', 'master-chart', 'islamic-astrology', 'islamic-suite', 'islamic', 'chat', 'dream-interpreter', 'dream', 'problem-solver', 'spiritual-traditions', 'horoscope', 'transits', 'panchang', 'reports', 'gemstone', 'muhurta', 'learning', 'notifications', 'settings', 'admin'].includes(activeTab) && !TRADITIONS[activeTab] && (
                  <CosmicIntelligenceCenter onNavigate={navigateTo} userProfile={userProfile} />
                )}
              </motion.div>
            </AnimatePresence>
          </Suspense>
          </div>
        </div>

        {/* 📱 MOBILE BOTTOM NAVIGATION BAR (Ultra-Responsive & Animated for Smartphones) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#090d16]/95 backdrop-blur-2xl border-t border-white/10 z-40 px-1 flex items-center justify-around shadow-2xl">
          <button
            onClick={() => navigateTo('dashboard')}
            className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 relative ${
              activeTab === 'dashboard' ? 'text-amber-400 font-bold scale-110 mobile-active-glow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 transition-transform ${activeTab === 'dashboard' ? 'drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''}`} />
            <span className="text-[10px] mt-0.5 font-medium tracking-tight">Home</span>
          </button>

          <button
            onClick={() => navigateTo('global-suite')}
            className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 relative ${
              activeTab === 'global-suite' ? 'text-cyan-400 font-bold scale-110 mobile-active-glow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className={`w-5 h-5 text-cyan-400 transition-transform ${activeTab === 'global-suite' ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : ''}`} />
            <span className="text-[10px] mt-0.5 font-medium tracking-tight">Global</span>
          </button>

          <button
            onClick={() => navigateTo('live-diagnostics')}
            className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 relative ${
              activeTab === 'live-diagnostics' ? 'text-amber-300 font-bold scale-110 mobile-active-glow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className={`w-5 h-5 transition-transform ${activeTab === 'live-diagnostics' ? 'drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''}`} />
            <span className="text-[10px] mt-0.5 font-medium tracking-tight">Solution</span>
          </button>

          <button
            onClick={() => navigateTo('birth-chart')}
            className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 relative ${
              activeTab === 'birth-chart' ? 'text-purple-400 font-bold scale-110 mobile-active-glow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className={`w-5 h-5 transition-transform ${activeTab === 'birth-chart' ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : ''}`} />
            <span className="text-[10px] mt-0.5 font-medium tracking-tight">Kundli</span>
          </button>

          <button
            onClick={() => navigateTo('chat')}
            className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all duration-200 relative ${
              activeTab === 'chat' ? 'text-indigo-400 font-bold scale-110 mobile-active-glow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageCircle className={`w-5 h-5 transition-transform ${activeTab === 'chat' ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]' : ''}`} />
            <span className="text-[10px] mt-0.5 font-medium tracking-tight">Chat</span>
          </button>
        </div>
      </main>

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
