import React from 'react';
import { 
  Sparkles, Home, Calendar, Bot, Compass, Layers, 
  Search, Bell, User, Settings 
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniTopNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
  onOpenSearch: () => void;
}

export default function OmniTopNav({
  activeTab,
  onNavigate,
  userProfile,
  onOpenProfile,
  onOpenSearch
}: OmniTopNavProps) {
  const primaryTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'forecast', label: 'Forecast', icon: Calendar },
    { id: 'ask', label: 'Ask', icon: Bot },
    { id: 'charts', label: 'Charts', icon: Compass },
    { id: 'more', label: 'More', icon: Layers }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1220]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base sm:text-lg tracking-wider text-white">ASTRO360</span>
            <span className="text-[9px] font-mono text-amber-400 tracking-widest leading-none">OMNI INTELLIGENCE</span>
          </div>
        </div>

        {/* Center: 5 Primary Desktop Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0F172A] p-1 rounded-2xl border border-white/10">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Notifications & Profile Avatar */}
        <div className="flex items-center gap-2">
          {/* Quick Search Bar / Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden lg:inline text-[9px] bg-slate-800 px-1.5 py-0.5 rounded border border-white/10 text-slate-400">⌘K</kbd>
          </button>

          {/* Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-[11px] font-bold text-amber-300">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <span className="hidden sm:inline font-bold truncate max-w-[100px]">
              {userProfile.name || 'Profile'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
