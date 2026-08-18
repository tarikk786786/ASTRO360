import React, { useRef, useState, useEffect } from 'react';
import { LayoutDashboard, LineChart, Clock, Sparkles, UserCircle, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardSubNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'charts', label: 'Charts & Analysis', icon: LineChart },
  { id: 'timing', label: 'Timing & Ephemeris', icon: Clock },
  { id: 'remedies', label: 'Remedies', icon: Sparkles },
  { id: 'profile', label: 'Profile', icon: UserCircle },
  { id: 'reports', label: 'Reports & Hub', icon: BookOpen },
];

export default function DashboardSubNav({ activeCategory, onSelectCategory }: DashboardSubNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(`[data-category="${activeCategory}"]`) as HTMLElement;
    if (activeBtn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerRect.left + container.scrollLeft,
        width: btnRect.width,
      });
      // Scroll into view on mobile
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeCategory]);

  return (
    <div className="w-full sticky top-0 z-40 bg-[#0a0f1a]/90 backdrop-blur-2xl border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div
          ref={containerRef}
          className="relative flex gap-1 overflow-x-auto no-scrollbar py-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {/* Animated Sliding Indicator */}
          <motion.div
            className="absolute bottom-0 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(90deg, #06b6d4, #2563eb)' }}
            animate={indicatorStyle}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />

          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                data-category={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{ scrollSnapAlign: 'start' }}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors duration-200 ${
                  isActive ? 'text-cyan-400' : 'text-slate-600'
                }`} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
