import React from 'react';
import { Home, Calendar, Sparkles, Compass, User } from 'lucide-react';

interface OmniBottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export default function OmniBottomNav({ activeTab, onNavigate }: OmniBottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'forecast', label: 'Forecast', icon: Calendar },
    { id: 'ask', label: 'Ask', icon: Sparkles },
    { id: 'charts', label: 'Charts', icon: Compass },
    { id: 'me', label: 'Me', icon: User }
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B1220]/95 backdrop-blur-xl border-t border-white/10 px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 px-2.5 rounded-2xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-mono tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-amber-400 absolute bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
