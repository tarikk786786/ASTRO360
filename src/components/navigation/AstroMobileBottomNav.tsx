import React, { useCallback, memo } from 'react';
import { 
  Home, 
  Calendar, 
  Sparkles, 
  Compass, 
  User,
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
  { id: 'ask', label: 'Ask', icon: Sparkles, isHero: true },
  { id: 'charts', label: 'Charts', icon: Compass },
  { id: 'me', label: 'Me', icon: User },
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
      <div className="mx-auto max-w-md bg-[#0b0d12]/95 backdrop-blur-2xl border border-[#c9a227]/15 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] p-1.5 flex items-center justify-around">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'me' && (activeTab === 'profile' || activeTab === 'settings'));
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
                  ? 'text-[#e8d5a3] font-medium'
                  : 'text-[#57534e] hover:text-[#a8a29e]'
              }`}
            >
              {isActive && !isHero && (
                <div className="absolute inset-0 rounded-2xl bg-[#c9a227]/10 border border-[#c9a227]/20 -z-10" />
              )}

              {isHero ? (
                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-[#c9a227] text-[#0b0d12] shadow-md shadow-[#c9a227]/20 scale-105'
                      : 'bg-white/[0.04] text-[#78716c] border border-white/[0.06] hover:border-[#c9a227]/20'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
              ) : (
                <div className="relative p-0.5 flex items-center justify-center">
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110 text-[#c9a227]' : 'text-[#57534e]'
                    }`}
                    aria-hidden="true"
                  />
                  {isActive && (
                    <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#c9a227] shadow-[0_0_6px_rgba(201,162,39,0.6)]" />
                  )}
                </div>
              )}

              <span
                className={`text-[10px] tracking-tight mt-0.5 transition-colors ${
                  isActive ? 'text-[#e8d5a3]' : 'text-[#57534e]'
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
