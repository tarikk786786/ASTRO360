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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1220]/95 backdrop-blur-lg border-t border-white/10 px-2 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-mono tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
