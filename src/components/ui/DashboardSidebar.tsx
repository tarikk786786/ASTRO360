import React from 'react';
import { LayoutDashboard, LineChart, Clock, Sparkles, UserCircle, BookOpen } from 'lucide-react';

interface DashboardSidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'overview', label: 'Cosmic Overview', icon: LayoutDashboard },
  { id: 'charts', label: 'Charts & Analysis', icon: LineChart },
  { id: 'timing', label: 'Timing & Ephemeris', icon: Clock },
  { id: 'remedies', label: 'Cosmic Remedies', icon: Sparkles },
  { id: 'profile', label: 'Seeker Profile', icon: UserCircle },
  { id: 'reports', label: 'Reports & Hub', icon: BookOpen },
];

export default function DashboardSidebar({ activeCategory, onSelectCategory }: DashboardSidebarProps) {
  return (
    <div className="w-64 flex-shrink-0 bg-[#0B1220]/80 backdrop-blur-xl border-r border-white/10 p-4 space-y-6 hidden md:block z-20">
      <div className="pt-2">
        <h2 className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest px-3 mb-3">
          Dashboard Modules
        </h2>
        <nav className="space-y-1.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 mt-auto absolute bottom-8 w-[calc(100%-2rem)]">
        <p className="text-[10px] font-mono text-indigo-300 font-bold">Omni System Active</p>
        <p className="text-[9px] text-slate-400 leading-tight pt-1">TypeUI Interface Enabled. All 23+ legacy tools retained.</p>
      </div>
    </div>
  );
}
