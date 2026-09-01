import React, { useCallback, memo } from 'react';
import { 
  Home, 
  Calendar, 
  Sparkles, 
  Compass, 
  Layers,
  LucideIcon 
} from 'lucide-react';

export interface AstroMobileBottomNavProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  className?: string;
  onPrefetch?: (tabId: string) => void;
}

interface MobileNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  isHero?: boolean;
}

const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'forecast', label: 'Forecast', icon: Calendar },
  { id: 'ask', label: 'Ask AI', icon: Sparkles, isHero: true },
  { id: 'charts', label: 'Charts', icon: Compass },
  { id: 'tools-catalog', label: '152+ Tools', icon: Layers },
];

export const AstroMobileBottomNav: React.FC<AstroMobileBottomNavProps> = memo(({
  activeTab,
  onNavigate,
  className = '',
  onPrefetch,
}) => {
  const handleItemClick = useCallback((id: string) => {
    onNavigate(id);
  }, [onNavigate]);

  return (
    <nav
      role="navigation"
      aria-label="Mobile Navigation Bar"
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 select-none px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pt-1 pointer-events-auto ${className}`}
    >
      {/* Solid High-Contrast Glass Dock */}
      <div className="mx-auto max-w-md bg-[#070D1A]/96 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.9)] p-1.5 flex items-center justify-around ring-1 ring-white/10">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'tools-catalog' && (activeTab === 'more' || activeTab === 'tools-catalog'));
          const isHero = Boolean(item.isHero);

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={item.label}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => onPrefetch?.(item.id)}
              onTouchStart={() => onPrefetch?.(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[58px] min-h-[50px] px-1 py-1 rounded-2xl transition-all cursor-pointer touch-manipulation active:scale-90 focus:outline-none ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active Tab Highlight Pill */}
              {isActive && !isHero && (
                <div className="absolute inset-0 rounded-2xl bg-amber-400/15 border border-amber-400/30 -z-10 shadow-[0_0_12px_rgba(251,191,36,0.2)]" />
              )}

              {/* Central "Ask AI" Hero Button */}
              {isHero ? (
                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-2xl transition-all shadow-md ${
                    isActive
                      ? 'bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 shadow-amber-400/40 scale-105 font-black ring-2 ring-amber-300/50'
                      : 'bg-amber-400/10 text-amber-300 border border-amber-400/40 hover:bg-amber-400/20'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
              ) : (
                <div className="relative p-0.5 flex items-center justify-center">
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110 text-amber-300' : 'text-slate-400'
                    }`}
                    aria-hidden="true"
                  />
                  {isActive && (
                    <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                  )}
                </div>
              )}

              {/* Crystal-Clear Typography Label */}
              <span
                className={`text-[10.5px] mt-0.5 tracking-tight font-sans ${
                  isActive ? 'font-black text-amber-300' : 'font-medium text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

export default AstroMobileBottomNav;
