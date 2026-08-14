import React from 'react';
import { LayoutDashboard, LineChart, Clock, Sparkles, UserCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardSubNavProps {
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

export default function DashboardSubNav({ activeCategory, onSelectCategory }: DashboardSubNavProps) {
  return (
    <div className="w-full sticky top-0 z-40 bg-[#0B1220]/80 backdrop-blur-2xl border-b border-white/[0.05] shadow-sm shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'text-slate-400 hover:bg-white/[0.05] hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
