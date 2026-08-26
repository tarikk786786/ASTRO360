import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Calendar, Sparkles, Compass, Heart, Layers, 
  Search, User, LayoutDashboard, Menu, X, ShieldCheck, ChevronRight
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniModernNavProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  userProfile: UserProfile;
  onOpenSearch: () => void;
  onToggleStudio: () => void;
  isStudioOpen: boolean;
}

export default function OmniModernNav({
  activeTab,
  onNavigate,
  userProfile,
  onOpenSearch,
  onToggleStudio,
  isStudioOpen
}: OmniModernNavProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const primaryDestinations = [
    { id: 'home', label: 'Home', icon: Home, badge: null },
    { id: 'forecast', label: 'Forecast', icon: Calendar, badge: '7d–5y' },
    { id: 'ask', label: 'Ask AI', icon: Sparkles, badge: 'Live' },
    { id: 'charts', label: 'Charts', icon: Compass, badge: null },
    { id: 'compatibility', label: 'Compatibility', icon: Heart, badge: null },
    { id: 'free-tools', label: 'Free Tools', icon: Layers, badge: 'Free' },
  ];

  return (
    <>
      {/* ─── 1. TOP DESKTOP & TABLET GLASS HEADER ─────────────────────── */}
      <header className="sticky top-0 z-40 w-full h-16 bg-[#060A12]/90 backdrop-blur-xl border-b border-white/[0.08] px-3 sm:px-6 flex items-center justify-between transition-all select-none">
        
        {/* Left: Brand Wordmark & Logo */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="relative w-8 h-8 rounded-xl bg-slate-950 border border-white/15 flex items-center justify-center shadow-inner group-hover:border-amber-400/50 transition-colors">
              <div className="w-4 h-4 rounded-full border border-amber-400/80 group-hover:scale-105 transition-transform" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 top-1.5 right-1.5 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-sm tracking-tight text-white font-sans flex items-center gap-1.5">
                ASTRO360 <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">PRO</span>
              </span>
              <span className="text-[8.5px] font-mono text-slate-400 tracking-widest leading-none hidden sm:inline">INTELLIGENCE</span>
            </div>
          </div>
        </div>

        {/* Center: Primary Navigation Tabs with Animated Layout Indicator */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0B1220] p-1 rounded-2xl border border-white/10 shadow-inner">
          {primaryDestinations.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive ? 'text-slate-950' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTabPill"
                    className="absolute inset-0 bg-amber-400 rounded-xl shadow-md"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono uppercase ${
                      isActive ? 'bg-slate-950 text-amber-300' : 'bg-white/10 text-slate-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Studio Toggle & Profile */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all text-xs font-mono cursor-pointer active:scale-95"
            title="Global Command Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block bg-white/10 px-1.5 py-0.5 rounded text-[9px] text-slate-400">⌘K</kbd>
          </button>

          {/* Master 152+ Tools Studio Toggle */}
          <button
            onClick={onToggleStudio}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer active:scale-95 ${
              isStudioOpen
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10'
            }`}
            title="Open Master 152+ Classical Tools Studio"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
            <span>152+ Studio</span>
          </button>

          {/* Me / Profile Avatar Pill */}
          <button
            onClick={() => onNavigate('me')}
            className={`flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border transition-all text-xs font-mono font-bold cursor-pointer active:scale-95 ${
              activeTab === 'me'
                ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                : 'bg-[#0B1220] border-white/10 text-slate-200 hover:text-white hover:border-white/20'
            }`}
            title="Profile & Settings"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-inner">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="hidden sm:inline truncate max-w-[80px] font-sans text-xs">
              {userProfile.name || 'Profile'}
            </span>
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ─── 2. MOBILE EXPANDABLE MENU DRAWER ─────────────────────────── */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed top-16 inset-x-0 bg-[#070C16]/98 backdrop-blur-2xl border-b border-white/15 p-4 z-40 shadow-2xl space-y-2"
          >
            <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
              {primaryDestinations.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onNavigate(tab.id);
                      setMobileDrawerOpen(false);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md font-black'
                        : 'bg-[#0D1526] text-slate-300 hover:text-white border-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  onToggleStudio();
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#0F172A] text-amber-300 border border-amber-400/30 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open 152+ Tools Technical Catalog →</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 3. FIXED MOBILE BOTTOM NAVIGATION BAR ───────────────────── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 pb-[env(safe-area-inset-bottom)] bg-[#070C16]/95 backdrop-blur-2xl border-t border-white/10 z-40 px-2 flex items-center justify-around shadow-[0_-8px_30px_rgba(0,0,0,0.6)] select-none">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'forecast', icon: Calendar, label: 'Forecast' },
          { id: 'ask', icon: Sparkles, label: 'Ask AI', isHero: true },
          { id: 'charts', icon: Compass, label: 'Charts' },
          { id: 'me', icon: User, label: 'Me' },
        ].map(({ id, icon: Icon, label, isHero }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex flex-col items-center justify-center w-full h-full py-1 transition-all cursor-pointer relative ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isHero ? (
                <div className={`p-2 rounded-2xl transition-all shadow-md ${
                  isActive ? 'bg-amber-400 text-slate-950 scale-110 shadow-amber-400/30' : 'bg-white/10 text-amber-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : ''}`} />
              )}
              <span className={`text-[10px] mt-0.5 tracking-tight font-mono ${isActive ? 'font-black' : 'font-medium'}`}>
                {label}
              </span>
              {isActive && !isHero && (
                <motion.div
                  layoutId="mobileActiveDot"
                  className="w-1 h-1 rounded-full bg-amber-400 mx-auto mt-0.5 shadow-[0_0_6px_currentColor]"
                />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
