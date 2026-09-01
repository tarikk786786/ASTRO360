import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  Clock, 
  Sparkles, 
  Calendar, 
  Layers, 
  Activity, 
  Compass, 
  Radar, 
  MapPin, 
  Heart, 
  FileText, 
  Cpu, 
  BookOpen, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { MORE_SHEET_ITEMS, MoreSheetItem } from './navigationConfig';

export interface AstroMoreSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const AstroMoreSheet: React.FC<AstroMoreSheetProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'astrology' | 'tools' | 'advanced'>('all');

  const filteredItems = useMemo(() => {
    return MORE_SHEET_ITEMS.filter((item: MoreSheetItem) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery = 
        !searchQuery ||
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tradition && item.tradition.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Bottom Sheet Drawer */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="more-sheet-title"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-[#070C16] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden"
          style={{
            paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Header & Close Button */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h2 id="more-sheet-title" className="text-base sm:text-lg font-extrabold text-white font-sans">
                  Astrology Systems & Tools Catalog
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  Access 152+ classical techniques and timing engines
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close tools catalog"
              className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Quick Search & Category Filter Pills */}
          <div className="p-3 sm:p-4 border-b border-white/10 space-y-3 bg-[#0B1220]/60">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Dasha, Nakshatra, KP, Panchanga, Vargas..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/60 transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
              {(['all', 'astrology', 'tools', 'advanced'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold capitalize whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat === 'all' ? 'All Systems (152+)' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid / List */}
          <div 
            className="p-3 sm:p-4 flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-2 text-left"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
          >
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <Search className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-mono text-slate-400">No astrological tools match "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-mono text-amber-400 hover:underline"
                >
                  Clear search filter
                </button>
              </div>
            ) : (
              filteredItems.map((item: MoreSheetItem) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.route);
                      onClose();
                    }}
                    className="w-full p-3 rounded-2xl bg-[#0D1526] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-amber-400/30 transition-all flex items-center justify-between gap-3 text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-white font-sans group-hover:text-amber-300 transition-colors">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate font-mono mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AstroMoreSheet;
