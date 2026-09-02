import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Calendar, 
  Sparkles, 
  Compass, 
  User, 
  Layers, 
  Search, 
  Cpu, 
  Globe2, 
  Bell, 
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { PRIMARY_NAV_ITEMS, PrimaryNavItem } from './navigationConfig';
import { AstroMobileHeader } from './AstroMobileHeader';
import { AstroMobileBottomNav } from './AstroMobileBottomNav';
import { AstroMoreSheet } from './AstroMoreSheet';
import { AstroSystemSheet } from './AstroSystemSheet';
import { AstroCommandFinder } from './AstroCommandFinder';
import { AstroCommandCenterDrawer } from './AstroCommandCenterDrawer';
import { prefetchRouteData } from '../../lib/prefetchEngine';
import { useNotifications } from '../../context/NotificationContext';

export interface AstroNavigationShellProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
  pageTitle?: string;
  userProfile: UserProfile;
  onUpdateSystem?: (system: string) => void;
}

export const AstroNavigationShell: React.FC<AstroNavigationShellProps> = ({
  activeTab,
  onNavigate,
  onBack,
  canGoBack = false,
  pageTitle,
  userProfile,
  onUpdateSystem,
}) => {
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);
  const [isSystemSheetOpen, setIsSystemSheetOpen] = useState(false);
  const [isCommandFinderOpen, setIsCommandFinderOpen] = useState(false);
  const [activeSystem, setActiveSystem] = useState(userProfile?.preferredSystem || 'Vedic');
  const { unreadCount, openCenter } = useNotifications();

  // Bind ⌘K or Ctrl+K to Command Center
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandCenterOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check if current view is a secondary / sub-page (not one of the 5 canonical roots)
  const isSubPage = !['home', 'forecast', 'ask', 'charts', 'me', 'landing'].includes(activeTab);

  const handleSelectSystem = (sysId: string) => {
    setActiveSystem(sysId);
    onUpdateSystem?.(sysId);
  };

  const handlePrefetch = useCallback((tabId: string) => {
    prefetchRouteData(tabId, userProfile);
  }, [userProfile]);

  return (
    <>
      {/* ── 1. MOBILE HEADER (Compact, Fast, Contextual) ─────────────── */}
      <div className="md:hidden">
        <AstroMobileHeader
          title={pageTitle}
          activeTab={activeTab}
          isSubPage={isSubPage}
          onBack={onBack}
          onOpenSearch={() => setIsCommandFinderOpen(true)}
          onOpenSystemSheet={() => setIsSystemSheetOpen(true)}
          onOpenMoreSheet={() => setIsMoreSheetOpen(true)}
          onOpenNotifications={openCenter}
          notificationCount={unreadCount}
          userProfile={userProfile}
          activeSystem={activeSystem.charAt(0).toUpperCase() + activeSystem.slice(1)}
        />
      </div>

      {/* ── 2. DESKTOP & TABLET GLASS HEADER (Unified 5-Word Navigation) ── */}
      <header className="hidden md:flex sticky top-0 z-40 w-full h-16 bg-[#111315]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 lg:px-6 items-center justify-between transition-all select-none">
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl"
          >
            <div className="relative w-8 h-8 rounded-xl bg-slate-950 border border-white/15 flex items-center justify-center shadow-inner group-hover:border-amber-400/50 transition-colors">
              <div className="w-4 h-4 rounded-full border border-amber-400/80 group-hover:scale-105 transition-transform" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 top-1.5 right-1.5 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-tight text-white font-sans flex items-center gap-1.5">
                ASTRO360
                <span className="text-[9.5px] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-white/[0.08]">
                  CALCULATED
                </span>
              </span>
              <span className="text-[8.5px] font-mono text-slate-400 tracking-widest leading-none">
                PREDICTION ENGINE
              </span>
            </div>
          </button>

          {/* System Switcher Pill */}
          <button
            type="button"
            onClick={() => setIsSystemSheetOpen(true)}
            aria-label="Change active astrology system"
            className="ml-2 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="capitalize">{activeSystem}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
        </div>

        {/* Center: Canonical 5-Word Navigation Pills */}
        <nav
          role="tablist"
          aria-label="Desktop Primary Navigation"
          className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/[0.08] shadow-inner"
        >
          {PRIMARY_NAV_ITEMS.map((item: PrimaryNavItem) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isHero = Boolean(item.isHero);

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => handlePrefetch(item.id)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'text-black font-bold'
                    : isHero
                    ? 'text-amber-300 hover:text-white bg-amber-400/5 hover:bg-amber-400/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktopActiveNavPill"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Command Center, Notifications & Profile Avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Master Command Center Trigger */}
          <button
            type="button"
            onClick={() => setIsCommandCenterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 hover:text-white border border-white/[0.08] transition-all cursor-pointer shadow-sm"
            title="Open Master Command Center (⌘K)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Command Center</span>
            <kbd className="hidden lg:inline bg-amber-400/20 px-1.5 py-0.5 rounded text-[9px] text-amber-300">⌘K</kbd>
          </button>

          {/* Desktop Notifications Bell Trigger */}
          <button
            type="button"
            onClick={openCenter}
            className="relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Astrology Alerts & Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
            )}
          </button>

          {/* Me / Profile Avatar Pill */}
          <button
            type="button"
            onClick={() => onNavigate('me')}
            className={`flex items-center gap-2 p-1 px-2.5 py-1.5 rounded-xl border transition-all text-xs font-mono font-bold cursor-pointer ${
              activeTab === 'me'
                ? 'bg-white text-black font-semibold shadow-sm border-amber-400 shadow-md font-black'
                : 'bg-[#0B1220] border-white/10 text-slate-200 hover:text-white hover:border-white/20'
            }`}
            title="Account, Profile & Saved Items"
          >
            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center text-[10px] shadow-inner">
              {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="hidden lg:inline truncate max-w-[80px] font-sans text-xs">
              {userProfile?.name || 'Profile'}
            </span>
          </button>
        </div>
      </header>

      {/* ── 3. CANONICAL MOBILE BOTTOM BAR (Exact 5 Canonical Tabs) ───── */}
      <AstroMobileBottomNav
        activeTab={activeTab}
        onNavigate={onNavigate}
        onPrefetch={handlePrefetch}
      />

      {/* ── 4. MASTER COMMAND CENTER DRAWER (All Screens) ───────────── */}
      <AstroCommandCenterDrawer
        isOpen={isCommandCenterOpen}
        onClose={() => setIsCommandCenterOpen(false)}
        activeTab={activeTab}
        onNavigate={onNavigate}
        userProfile={userProfile}
      />

      {/* ── 5. MORE ASTROLOGICAL SYSTEMS SHEET ──────────────────────── */}
      <AstroMoreSheet
        isOpen={isMoreSheetOpen}
        onClose={() => setIsMoreSheetOpen(false)}
        onNavigate={onNavigate}
      />

      {/* ── 6. ASTROLOGY SYSTEM SWITCHER SHEET ──────────────────────── */}
      <AstroSystemSheet
        isOpen={isSystemSheetOpen}
        activeSystem={activeSystem}
        onSelectSystem={handleSelectSystem}
        onClose={() => setIsSystemSheetOpen(false)}
      />

      {/* ── 7. GLOBAL SEARCH & COMMAND FINDER ───────────────────────── */}
      <AstroCommandFinder
        isOpen={isCommandFinderOpen}
        onClose={() => setIsCommandFinderOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default AstroNavigationShell;
