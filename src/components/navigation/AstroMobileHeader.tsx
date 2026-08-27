import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Bell, 
  WifiOff, 
  Layers, 
  ChevronDown,
  Sparkles,
  Sliders
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

export const AstroMobileHeader: React.FC<AstroMobileHeaderProps> = ({
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
      className={`sticky top-0 z-30 w-full bg-[#060A14]/92 backdrop-blur-2xl border-b border-white/[0.08] px-3 sm:px-4 py-2 transition-all select-none shadow-[0_4px_24px_rgba(0,0,0,0.5)] ${className}`}
      style={{
        paddingTop: 'calc(0.5rem + env(safe-area-inset-top, 0px))',
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* LEFT SECTION: Back Button OR Logo & System Switcher */}
        {isSubPage && onBack ? (
          <div className="flex items-center gap-2 min-w-0">
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={onBack}
              aria-label="Go back to previous screen"
              className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </motion.button>
            <div className="flex flex-col min-w-0 text-left">
              <h1 className="text-sm sm:text-base font-extrabold text-white truncate font-sans tracking-tight">
                {title || 'ASTRO360'}
              </h1>
              <span className="text-[9.5px] font-mono text-amber-400/80 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Precision Ephemeris
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Brand Logo mark with ambient glow */}
            <div className="relative w-8 h-8 rounded-xl bg-slate-950 border border-white/15 flex items-center justify-center shadow-inner shrink-0 group">
              <div className="w-4 h-4 rounded-full border border-amber-400/80 group-hover:scale-110 transition-transform" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 top-1.5 right-1.5 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
            </div>

            {/* Brand Title + System Selector Pill */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-tight text-white font-sans">
                  ASTRO360
                </span>
                {/* Active Astrology System Pill (Opens System Switcher Bottom Sheet) */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={onOpenSystemSheet}
                  aria-label={'Astrology system: ' + activeSystem + '. Click to change.'}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 active:bg-amber-400/30 border border-amber-400/30 text-[9.5px] font-mono font-bold text-amber-300 transition-colors cursor-pointer shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>{activeSystem}</span>
                  <ChevronDown className="w-2.5 h-2.5 opacity-70" aria-hidden="true" />
                </motion.button>
              </div>
              <span className="text-[8px] font-mono text-slate-400 tracking-widest leading-none pt-0.5">
                CALCULATED INTELLIGENCE
              </span>
            </div>
          </div>
        )}

        {/* RIGHT SECTION: Offline Indicator, Search, More & Notifications */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Offline Warning Banner Pill */}
          {isOffline && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-300 animate-pulse"
            >
              <WifiOff className="w-3 h-3" aria-hidden="true" />
              <span className="hidden xs:inline">Offline</span>
            </div>
          )}

          {/* Global Search Finder Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onOpenSearch}
            aria-label="Open search and command finder"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Search className="w-4 h-4 text-amber-400" aria-hidden="true" />
          </motion.button>

          {/* More Astrological Tools Sheet Trigger (Contextual Discovery) */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onOpenMoreSheet}
            aria-label="Open catalog of 152+ astrological systems and tools"
            className="flex items-center gap-1 px-2.5 min-h-[44px] rounded-xl bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-mono font-bold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span className="hidden sm:inline">152+ Tools</span>
          </motion.button>

          {/* Notification Center */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onOpenNotifications || onOpenMoreSheet}
            aria-label={'Notifications' + (notificationCount > 0 ? ', ' + notificationCount + ' unread' : '')}
            className="relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Bell className="w-4 h-4 text-slate-300" aria-hidden="true" />
            {notificationCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default AstroMobileHeader;
