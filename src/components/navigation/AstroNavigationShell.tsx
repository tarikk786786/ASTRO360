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
import { prefetchRouteData } from '../../lib/prefetchEngine';

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
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);
  const [isSystemSheetOpen, setIsSystemSheetOpen] = useState(false);
  const [isCommandFinderOpen, setIsCommandFinderOpen] = useState(false);
  const [activeSystem, setActiveSystem] = useState(userProfile?.preferredSystem || 'Vedic');

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
          userProfile={userProfile}
          activeSystem={activeSystem.charAt(0).toUpperCase() + activeSystem.slice(1)}
        />
      </div>

      {/* ── 2. DESKTOP & TABLET GLASS HEADER (Unified 5-Word Navigation) ── */}
      <header className="hidden md:flex sticky top-0 z-40 w-full h-16 bg-[#060A12]/92 backdrop-blur-xl border-b border-white/[0.08] px-4 lg:px-6 items-center justify-between transition-all select-none">
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
                <span className="text-[9.5px] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">
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
          className="flex items-center gap-1 bg-[#0B1220] p-1 rounded-2xl border border-white/10 shadow-inner"
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
                    ? 'text-slate-950 font-black'
                    : isHero
                    ? 'text-amber-300 hover:text-white bg-amber-400/5 hover:bg-amber-400/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktopActiveNavPill"
                    className="absolute inset-0 bg-amber-400 rounded-xl shadow-md"
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

        {/* Right: Search, Tools Catalog & Profile Avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Global Search & Command Finder Button */}
          <button
            type="button"
            onClick={() => setIsCommandFinderOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all text-xs font-mono cursor-pointer"
            title="Global Command Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] text-slate-400">⌘K</kbd>
          </button>

          {/* 152+ Astrological Tools Catalog Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsMoreSheetOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Browse all 152+ Classical Astrology Techniques"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>152+ Tools</span>
          </button>

          {/* Me / Profile Avatar Pill */}
          <button
            type="button"
            onClick={() => onNavigate('me')}
            className={`flex items-center gap-2 p-1 px-2.5 py-1.5 rounded-xl border transition-all text-xs font-mono font-bold cursor-pointer ${
              activeTab === 'me'
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
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

      {/* ── 4. MORE ASTROLOGICAL SYSTEMS SHEET ──────────────────────── */}
      <AstroMoreSheet
        isOpen={isMoreSheetOpen}
        onClose={() => setIsMoreSheetOpen(false)}
        onNavigate={onNavigate}
      />

      {/* ── 5. ASTROLOGY SYSTEM SWITCHER SHEET ──────────────────────── */}
      <AstroSystemSheet
        isOpen={isSystemSheetOpen}
        activeSystem={activeSystem}
        onSelectSystem={handleSelectSystem}
        onClose={() => setIsSystemSheetOpen(false)}
      />

      {/* ── 6. GLOBAL SEARCH & COMMAND FINDER ───────────────────────── */}
      <AstroCommandFinder
        isOpen={isCommandFinderOpen}
        onClose={() => setIsCommandFinderOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default AstroNavigationShell;
