import React, { useRef, useState, useEffect } from 'react';
import { LayoutDashboard, LineChart, Clock, Sparkles, UserCircle, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardSubNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: 'Live' },
  { id: 'charts', label: 'Charts & Analysis', icon: LineChart },
  { id: 'timing', label: 'Timing & Ephemeris', icon: Clock },
  { id: 'remedies', label: 'Remedies', icon: Sparkles },
  { id: 'profile', label: 'Profile', icon: UserCircle },
  { id: 'reports', label: 'Reports & Hub', icon: BookOpen },
];

export default function DashboardSubNav({ activeCategory, onSelectCategory }: DashboardSubNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

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
        opacity: 1,
      });
      // Horizontal scroll within sub-nav container only without triggering page vertical jump
      const targetScrollLeft = btnRect.left - containerRect.left + container.scrollLeft - (containerRect.width / 2) + (btnRect.width / 2);
      container.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div className="w-full sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="relative flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2 sm:py-2.5 px-1 scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {/* Animated Sliding Bottom Indicator */}
          <motion.div
            className="absolute bottom-0 h-[3px] rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #a855f7)' }}
            animate={indicatorStyle}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          />

          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                data-category={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{ scrollSnapAlign: 'center' }}
                className={`relative flex items-center gap-2 whitespace-nowrap min-h-[42px] sm:min-h-[44px] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                  isActive
                    ? 'text-cyan-300 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 transition-all duration-200 shrink-0 ${
                  isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-500'
                }`} />
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-white/5 text-slate-400'
                  }`}>
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
