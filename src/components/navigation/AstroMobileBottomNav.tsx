import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PRIMARY_NAV_ITEMS, PrimaryNavItem } from './navigationConfig';

export interface AstroMobileBottomNavProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  className?: string;
  onPrefetch?: (tabId: string) => void;
}

export const AstroMobileBottomNav: React.FC<AstroMobileBottomNavProps> = ({
  activeTab,
  onNavigate,
  className = '',
  onPrefetch,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  // 1. Intelligent Virtual Keyboard Detection to prevent covering inputs on mobile
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    const handleViewportResize = () => {
      if (window.visualViewport) {
        const isShrunk = window.visualViewport.height < window.innerHeight * 0.75;
        setIsKeyboardOpen(isShrunk);
      }
    };

    document.addEventListener('focusin', handleFocusIn, { passive: true });
    document.addEventListener('focusout', handleFocusOut, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize, { passive: true });
    }

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize);
      }
    };
  }, []);

  // 2. Directional Scroll Listener with Passive Throttling
  useEffect(() => {
    const handleScroll = () => {
      if (isKeyboardOpen) return;
      const currentScrollY = window.scrollY;

      if (currentScrollY < 60) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;
      if (diff > 15 && currentScrollY > 120) {
        setIsVisible(false);
      } else if (diff < -10) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isKeyboardOpen]);

  // 3. Accessible Keyboard Left / Right navigation between tab items
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (index + 1) % PRIMARY_NAV_ITEMS.length;
        onNavigate(PRIMARY_NAV_ITEMS[nextIndex].id);
        const buttons = navRef.current?.querySelectorAll('button');
        buttons?.[nextIndex]?.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (index - 1 + PRIMARY_NAV_ITEMS.length) % PRIMARY_NAV_ITEMS.length;
        onNavigate(PRIMARY_NAV_ITEMS[prevIndex].id);
        const buttons = navRef.current?.querySelectorAll('button');
        buttons?.[prevIndex]?.focus();
      }
    },
    [onNavigate]
  );

  if (isKeyboardOpen) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Primary Mobile Navigation"
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ease-out select-none px-2.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } ${className}`}
    >
      {/* Floating Luxury Glass Dock */}
      <div className="mx-auto max-w-md bg-[#070D1A]/92 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_12px_48px_rgba(0,0,0,0.85)] p-1.5 flex items-center justify-around ring-1 ring-white/10">
        {PRIMARY_NAV_ITEMS.map((item: PrimaryNavItem, index: number) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isHero = Boolean(item.isHero);

          return (
            <motion.button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`${item.label}: ${item.meaning}`}
              tabIndex={0}
              whileTap={{ scale: 0.90 }}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => onPrefetch?.(item.id)}
              onFocus={() => onPrefetch?.(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-2xl transition-colors cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active Tab Background Pill Animation */}
              {isActive && !isHero && !shouldReduceMotion && (
                <motion.div
                  layoutId="mobileBottomNavActivePill"
                  className="absolute inset-0 rounded-2xl bg-amber-400/10 border border-amber-400/25 -z-10 shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}

              {/* Central "Ask" Hero Button Treatment — Quiet, confident, slightly emphasized */}
              {isHero ? (
                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-lg shadow-amber-400/35 scale-105'
                      : 'bg-white/[0.08] text-amber-300 border border-amber-400/30 hover:bg-white/[0.14]'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  {isActive && !shouldReduceMotion && (
                    <motion.div
                      layoutId="heroTabGlow"
                      className="absolute -inset-1.5 rounded-2xl bg-amber-400/25 -z-10 blur-sm animate-pulse"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </div>
              ) : (
                <div className="relative p-0.5 flex items-center justify-center">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : ''
                    }`}
                    aria-hidden="true"
                  />
                  {isActive && !shouldReduceMotion && (
                    <motion.div
                      layoutId="activeTabDot"
                      className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
              )}

              {/* Accessible text label */}
              <span
                className={`text-[10px] mt-0.5 tracking-tight font-mono ${
                  isActive ? 'font-black text-amber-300' : 'font-medium text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default AstroMobileBottomNav;