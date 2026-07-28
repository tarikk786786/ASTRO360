import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Menu, X, LayoutDashboard, MessageCircle, ChevronDown, ChevronRight, User, Globe2, Bell, Compass, Moon, ShieldCheck, Activity, Gem, HeartHandshake, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRADITIONS, type CategoryInfo, type TraditionGroup, type UserProfile, GROUP_ICONS } from './types';
import Dashboard from './components/Dashboard';
import AstrologyChat from './components/AstrologyChat';
import TraditionView from './components/TraditionView';
import Onboarding from './components/Onboarding';
import NotificationManager from './components/NotificationManager';
import UnifiedChartEngine from './components/UnifiedChartEngine';
import IslamicAstrologyEngine from './components/IslamicAstrologyEngine';
import BirthChartGenerator from './components/BirthChartGenerator';
import HolisticAdvisor from './components/HolisticAdvisor';
import LiveCosmicDiagnostics from './components/LiveCosmicDiagnostics';
import AstroRemedialGemstoneEngine from './components/AstroRemedialGemstoneEngine';
import CustomRemedialMediumEngine from './components/CustomRemedialMediumEngine';
import GlobalWisdomSuite from './components/GlobalWisdomSuite';

const STORAGE_KEY = 'astroverse_profile';
const TAB_KEY = 'astroverse_tab';

function loadProfile(): UserProfile | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Seeker',
  gender: 'universal',
  dob: '1998-06-15',
  time: '12:00',
  location: 'Global',
  preferredSystem: 'western',
};

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadProfile() || DEFAULT_PROFILE);
  const hasOnboarded = true;

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem(TAB_KEY) || 'dashboard';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    localStorage.setItem(TAB_KEY, activeTab);
  }, [activeTab]);

  const navigateTo = useCallback((tab: string) => {
    setActiveTab(tab);
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  const groupedTraditions = Object.values(TRADITIONS).reduce((acc, tradition) => {
    if (!acc[tradition.group]) {
      acc[tradition.group] = [];
    }
    acc[tradition.group].push(tradition);
    return acc;
  }, {} as Record<TraditionGroup, CategoryInfo[]>);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Asian & Eastern': true,
    'Western & European': true
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    saveProfile(profile);
  };

  const getPageTitle = (): string => {
    if (activeTab === 'dashboard') return 'Cosmic Overview';
    if (activeTab === 'live-diagnostics') return 'Live Cosmic Diagnostics (What, Why & Solution)';
    if (activeTab === 'advisor') return 'Holistic Life Advisor';
    if (activeTab === 'remedies') return 'Astro Remedial Gemstone Engine';
    if (activeTab === 'custom-remedies') return 'Custom Remedial Medium Engine';
    if (activeTab === 'global-suite') return 'Global Wisdom Suite';
    if (activeTab === 'birth-chart') return 'Birth Chart Generator';
    if (activeTab === 'master-chart') return 'Master Chart Engine';
    if (activeTab === 'islamic-astrology') return 'Islamic Astrology Engine';
    if (activeTab === 'chat') return 'AI Astrology Oracle';
    if (activeTab === 'notifications') return 'Cosmic Alerts & Notifications';
    if (TRADITIONS[activeTab]) return TRADITIONS[activeTab].name;
    return 'ASTRO360';
  };

  const CORE_TOOLS = [
    { id: 'live-diagnostics', label: 'Live Diagnostics', icon: <Activity className="w-5 h-5" />, description: 'What, Why & Solution' },
    { id: 'advisor', label: 'Holistic Advisor', icon: <HeartHandshake className="w-5 h-5" />, description: 'Life guidance' },
    { id: 'remedies', label: 'Gemstone Engine', icon: <Gem className="w-5 h-5" />, description: 'Astro remedies' },
    { id: 'custom-remedies', label: 'Custom Remedies', icon: <ShieldCheck className="w-5 h-5" />, description: 'Personal remedies' },
    { id: 'global-suite', label: 'Global Suite', icon: <Globe className="w-5 h-5" />, description: 'Wisdom traditions' },
    { id: 'birth-chart', label: 'Birth Chart', icon: <Compass className="w-5 h-5" />, description: 'Natal chart' },
    { id: 'master-chart', label: 'Master Chart', icon: <Sparkles className="w-5 h-5" />, description: 'Unified engine' },
    { id: 'islamic-astrology', label: 'Islamic Astrology', icon: <Moon className="w-5 h-5" />, description: 'Islamic wisdom' },
  ];

  if (!hasOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Brand */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold gradient-text">ASTRO360</h1>
            <p className="text-xs text-gray-500">Global Wisdom Platform</p>
          </div>
        </div>
      </div>

      {/* User Quick Profile */}
      <div className="px-4 py-3 border-b border-white/5">
        <button
          onClick={() => navigateTo('notifications')}
          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
            {userProfile.name?.[0]?.toUpperCase() || 'S'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userProfile.name || 'Seeker'}</p>
            <p className="text-xs text-gray-500">{userProfile.preferredSystem || 'Western'} system</p>
          </div>
          <User className="w-4 h-4 text-gray-500 shrink-0" />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {/* Dashboard */}
        <button
          onClick={() => navigateTo('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-amber-500/15 text-amber-300 nav-active'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          Dashboard
        </button>

        {/* AI Chat */}
        <button
          onClick={() => navigateTo('chat')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-amber-500/15 text-amber-300 nav-active'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          AI Oracle
        </button>

        {/* Tools */}
        <div className="pt-3">
          <button
            onClick={() => setIsToolModalOpen(!isToolModalOpen)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
          >
            <span>Advanced Tools</span>
            {isToolModalOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>

          <AnimatePresence>
            {isToolModalOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-0.5 mt-1">
                  {CORE_TOOLS.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => navigateTo(tool.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                        activeTab === tool.id
                          ? 'bg-amber-500/15 text-amber-300 nav-active'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="shrink-0">{tool.icon}</span>
                      <div className="text-left min-w-0">
                        <p className="text-xs font-medium truncate">{tool.label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Traditions */}
        <div className="pt-3">
          <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Traditions
          </p>
          <div className="space-y-0.5 mt-1">
            {(Object.entries(groupedTraditions) as [TraditionGroup, CategoryInfo[]][]).map(([group, traditions]) => (
              <div key={group}>
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{GROUP_ICONS[group]}</span>
                    <span className="font-medium">{group}</span>
                  </span>
                  {expandedGroups[group] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>

                <AnimatePresence>
                  {expandedGroups[group] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden ml-3"
                    >
                      {traditions.map(tradition => (
                        <button
                          key={tradition.id}
                          onClick={() => navigateTo(tradition.id)}
                          className={`w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                            activeTab === tradition.id
                              ? 'text-amber-300 bg-amber-500/10'
                              : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                          }`}
                        >
                          <span className="w-1 h-1 rounded-full bg-current shrink-0 opacity-50"></span>
                          {tradition.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Notifications */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => navigateTo('notifications')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-amber-500/15 text-amber-300 nav-active'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Bell className="w-4 h-4 shrink-0" />
          Notifications
        </button>
        <div className="mt-3 px-3">
          <p className="text-[10px] text-gray-600">ASTRO360 • 35+ Traditions</p>
          <p className="text-[10px] text-gray-600">Powered by Gemini AI</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen starfield text-white overflow-hidden">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(!isMobile || isSidebarOpen) && (
          <motion.aside
            initial={isMobile ? { x: -300 } : false}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -300 } : undefined}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-72' : 'relative w-72 shrink-0'} glass-card border-r border-white/5`}
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-4 border-b border-white/5 bg-cosmic-950/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            <div>
              <h2 className="text-sm font-semibold text-white/90">{getPageTitle()}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-full border border-white/5 text-xs text-gray-400">
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>35+ Traditions Live</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-full"
              >
                {activeTab === 'dashboard' && <Dashboard onNavigate={navigateTo} userProfile={userProfile} />}
                {activeTab === 'live-diagnostics' && <LiveCosmicDiagnostics userProfile={userProfile} />}
                {activeTab === 'advisor' && <HolisticAdvisor userProfile={userProfile} />}
                {activeTab === 'remedies' && <AstroRemedialGemstoneEngine userProfile={userProfile} />}
                {activeTab === 'custom-remedies' && <CustomRemedialMediumEngine userProfile={userProfile} />}
                {activeTab === 'global-suite' && <GlobalWisdomSuite userProfile={userProfile} />}
                {activeTab === 'birth-chart' && <BirthChartGenerator userProfile={userProfile} />}
                {activeTab === 'master-chart' && <UnifiedChartEngine userProfile={userProfile} />}
                {activeTab === 'islamic-astrology' && <IslamicAstrologyEngine userProfile={userProfile} />}
                {activeTab === 'chat' && <AstrologyChat />}
                {activeTab === 'notifications' && (
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
