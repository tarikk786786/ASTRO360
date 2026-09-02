import React, { useState, useEffect, memo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Bell, 
  WifiOff, 
  Layers, 
  ChevronDown,
  User,
  Sparkles
} from 'lucide-react';
import type { UserProfile } from '../../types';

export interface AstroMobileHeaderProps {
  title?: string;
  activeTab: string;
  isSubPage?: boolean;
  onBack?: () => void;
  onOpenSearch: () => void;
  onOpenSystemSheet: () => void;
  onOpenMoreSheet: () => void;
  onOpenNotifications?: () => void;
  userProfile?: UserProfile;
  activeSystem?: string;
  notificationCount?: number;
  className?: string;
}

export const AstroMobileHeader: React.FC<AstroMobileHeaderProps> = memo(({
  title,
  activeTab,
  isSubPage = false,
  onBack,
  onOpenSearch,
  onOpenSystemSheet,
  onOpenMoreSheet,
  onOpenNotifications,
  userProfile,
  activeSystem = 'Vedic',
  notificationCount = 0,
  className = '',
}) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-30 w-full bg-[#090A0C]/96 backdrop-blur-xl border-b border-white/[0.08] px-3 py-2 select-none shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${className}`}
      style={{
        paddingTop: 'calc(0.4rem + env(safe-area-inset-top, 0px))',
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* LEFT SECTION: Contextual Back Button OR Brand Logo & System Switcher */}
        {isSubPage && onBack ? (
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to dashboard"
              className="flex items-center justify-center min-w-[42px] min-h-[42px] rounded-xl bg-white/[0.08] active:scale-90 text-slate-200 border border-white/12 transition-all cursor-pointer touch-manipulation"
            >
              <ArrowLeft className="w-5 h-5 text-white" aria-hidden="true" />
            </button>
            <div className="flex flex-col min-w-0 text-left">
              <h1 className="text-sm font-extrabold text-white truncate font-sans tracking-tight">
                {title || 'ASTRO360'}
              </h1>
              <span className="text-[9.5px] font-mono text-emerald-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Precision Ephemeris
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            {/* Brand Logo */}
            <div className="relative w-8 h-8 rounded-xl bg-slate-950 border border-white/15 flex items-center justify-center shadow-inner shrink-0">
              <div className="w-4 h-4 rounded-full border border-amber-400/80" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 top-1.5 right-1.5 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
            </div>

            {/* Brand Name + System Selector Pill */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-tight text-white font-sans">
                  ASTRO360
                </span>
                <button
                  type="button"
                  onClick={onOpenSystemSheet}
                  aria-label={'Change system: ' + activeSystem}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/[0.08] active:bg-white/[0.15] border border-white/[0.1] text-[9.5px] font-mono font-semibold text-slate-200 transition-colors cursor-pointer touch-manipulation"
                >
                  <span>{activeSystem}</span>
                  <ChevronDown className="w-2.5 h-2.5 opacity-70" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT SECTION: Search, 152+ Tools & Notifications */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Offline Warning */}
          {isOffline && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[9.5px] font-mono text-slate-300">
              <WifiOff className="w-3 h-3" />
              <span className="hidden xs:inline">Offline</span>
            </div>
          )}

          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Open command search"
            className="flex items-center justify-center min-w-[40px] min-h-[40px] rounded-xl bg-white/[0.06] active:scale-90 border border-white/10 text-slate-300 transition-all cursor-pointer touch-manipulation"
          >
            <Search className="w-4 h-4 text-white" aria-hidden="true" />
          </button>

          {/* 152+ Tools Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenMoreSheet}
            aria-label="Open 152+ astrological tools sheet"
            className="flex items-center justify-center min-w-[40px] min-h-[40px] rounded-xl bg-white/[0.06] active:scale-90 border border-white/10 text-cyan-400 transition-all cursor-pointer touch-manipulation"
          >
            <Layers className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Notification Bell */}
          <button
            type="button"
            onClick={onOpenNotifications || onOpenMoreSheet}
            aria-label={'Notifications' + (notificationCount > 0 ? ', ' + notificationCount + ' unread' : '')}
            className="relative flex items-center justify-center min-w-[40px] min-h-[40px] rounded-xl bg-white/[0.06] active:scale-90 border border-white/10 text-slate-300 transition-all cursor-pointer touch-manipulation"
          >
            <Bell className="w-4 h-4" aria-hidden="true" />
            {notificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
});

export default AstroMobileHeader;
