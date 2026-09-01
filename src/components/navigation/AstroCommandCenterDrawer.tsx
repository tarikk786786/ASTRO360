import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Search, Compass, Sparkles, Activity, Bot, Box, BookOpen, 
  Layers, Radio, Sliders, Sun, Moon, Clock, Flame, Shield, 
  FileText, ShieldCheck, HeartHandshake, Eye, Volume2, Gem, 
  RotateCcw, SlidersHorizontal, Settings, User, LogIn, ChevronRight,
  HelpCircle, CheckCircle2, Lock, ArrowDown
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { useGlobalConfig } from '../../context/GlobalConfigContext';

export interface AstroCommandCenterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onNavigate: (tabId: string) => void;
  userProfile?: UserProfile;
  onOpenSettings?: () => void;
  onOpenAuth?: () => void;
}

interface CommandItem {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  icon: any;
  flag?: string;
  description?: string;
}

interface CommandSection {
  id: string;
  title: string;
  items: CommandItem[];
}

export const COMMAND_CENTER_SECTIONS: CommandSection[] = [
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    items: [
      { id: 'radar', name: 'Live Cosmic Radar', badge: 'Live', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: Activity, description: 'Real-time celestial telemetry & transit radar' },
      { id: 'copilot', name: 'AI Oracle Copilot', badge: 'AI', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: Bot, description: 'Deterministic multi-tradition synthesis AI' },
      { id: '3d', name: 'Cosmic 3D Studio', badge: '3D', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', icon: Box, description: 'WebGL planetary orbit & celestial sphere' },
      { id: 'research', name: 'Consensus Core', badge: 'Research', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: BookOpen, description: 'Multi-system convergence & statistical rigor' }
    ]
  },
  {
    id: 'charts',
    title: 'Ephemeris & Charts',
    items: [
      { id: 'charts', name: 'Birth Chart Engine', icon: Compass, description: 'North, South & Western high-res Kundli' },
      { id: 'dual-wheel', name: 'Dual Wheel Studio', badge: 'Dual', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: RotateCcw, description: 'Synastry & transit overlay comparison' },
      { id: 'divisional', name: 'Divisional Charts (D1-D60)', icon: Layers, description: 'Harmonics from D1 Rashi to D60 Shashtiamsha' },
      { id: 'shadbala', name: '6-Fold Shadbala Potency', badge: 'Bala', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: Sliders, description: 'Sthana, Dik, Kala, Cheshta, Naisargika & Drik' },
      { id: 'frequencies', name: 'Planetary Frequencies', badge: 'Audio', badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30', icon: Volume2, description: 'Hans Cousto Cosmic Octave acoustic synthesis' },
      { id: 'ephemeris-lab', name: 'Ephemeris Comparison Lab', icon: Activity, description: 'NASA JPL DE440 sub-arcsecond validator' },
      { id: 'sabian', name: 'Sabian Symbols (360°)', icon: Sparkles, description: 'Marc Edmund Jones 360-degree archetypes' }
    ]
  },
  {
    id: 'forecasts',
    title: 'Forecasts & Timing',
    items: [
      { id: 'forecast', name: 'Dasha & Time Horizon', badge: '120y', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: Clock, description: '120-Year Vimshottari Mahadasha timeline' },
      { id: 'transits', name: 'Sade Sati & Transits', icon: Moon, description: '7.5-year Saturn transit & Gochara movements' },
      { id: 'dossier', name: 'Executive PDF Dossier', badge: 'PDF', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: FileText, description: 'Gold-embossed 5-page publication-grade PDF' },
      { id: 'news-radar', name: 'Cosmic News Hub', badge: 'Live', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', icon: Radio, description: 'Mundane world events & celestial correlations' },
      { id: 'muhurta', name: 'Electional Muhurta', icon: Sun, description: 'Abhijit, Brahma Muhurta & Rahu Kaal calculations' },
      { id: 'horas', name: 'Planetary Horas Clock', icon: Clock, description: 'Hourly planetary rulers & auspicious activity timing' },
      { id: 'btr', name: 'Birth Time Rectification', icon: SlidersHorizontal, description: 'Life-event micro-tuner for exact Lagna' }
    ]
  },
  {
    id: 'traditions',
    title: '7-Fold Traditions',
    items: [
      { id: 'vedic', name: 'Vedic / Parashari Jyotish', flag: '🇮🇳', icon: Sun, description: 'Classical Sidereal Lahiri & Brihat Parashara' },
      { id: 'western', name: 'Western Tropical & Hellenistic', flag: '🏛️', icon: Compass, description: 'Placidus houses, Ptolemaic aspects & essential dignities' },
      { id: 'kp', name: 'KP Stellar Sub-Lords', flag: '⭐', icon: Sparkles, description: '249 Sub-Lord precision electional methodology' },
      { id: 'jaimini', name: 'Jaimini Chara Sutras', flag: '☸️', icon: Layers, description: '7 Chara Karakas, Arudha Padas & Upapada Lagna' },
      { id: 'bazi', name: 'Chinese BaZi 4-Pillars', flag: '🐉', icon: Flame, description: '10 Stems, 12 Branches & 5 Elements balance' },
      { id: 'islamic', name: 'Islamic Ilm al-Falak', flag: '🌙', icon: Moon, description: '28 Lunar Mansions (Manazil) & Abjad sciences' },
      { id: 'mayan', name: 'Mayan & Mesoamerican', flag: '☀️', icon: Eye, description: '260-day Tzolk\'in & 13 Galactic Tones' }
    ]
  },
  {
    id: 'mystic',
    title: 'Mystic & Healing Suites',
    items: [
      { id: 'gemstone', name: 'Gemstone & Rudraksha', icon: Gem, description: 'Prescribed Jyotish gems & sacred bead alignments' },
      { id: 'mantras', name: 'Sacred Mantra Audio', icon: Volume2, description: 'Vedic Beej mantras & Sanskrit chants' },
      { id: 'chakra', name: 'Chakra Alignment', icon: Sparkles, description: '7 Energy vortexes & planetary correlations' },
      { id: 'tarot', name: 'Tarot & I-Ching Oracle', icon: Eye, description: '78-Card Arcana & 64 Hexagram castings' },
      { id: 'numerology', name: 'Name Numerology Matrix', icon: FileText, description: 'Chaldean & Pythagorean compound vibrations' },
      { id: 'fengshui', name: 'Cosmic Feng Shui', icon: Box, description: 'Bagua directional energies & spatial alchemy' },
      { id: 'shlokas', name: 'Classical Sanskrit Shlokas', icon: BookOpen, description: 'Original Sanskrit treatises & verified citations' }
    ]
  }
];

export const AstroCommandCenterDrawer: React.FC<AstroCommandCenterDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigate,
  userProfile,
  onOpenSettings,
  onOpenAuth,
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { config } = useGlobalConfig();

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const seekerName = userProfile?.name || 'Seeker';
  const seekerDob = userProfile?.dob || '1998-06-15';
  const seekerSystem = userProfile?.preferredSystem || config.system || 'vedic';

  const filteredSections = useMemo(() => {
    let sections = COMMAND_CENTER_SECTIONS;
    if (activeCategory !== 'all') {
      sections = sections.filter(sec => sec.id === activeCategory);
    }
    if (!search.trim()) return sections;
    const q = search.toLowerCase();
    return sections.map(sec => ({
      ...sec,
      items: sec.items.filter(item => 
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        item.id.toLowerCase().includes(q)
      )
    })).filter(sec => sec.items.length > 0);
  }, [search, activeCategory]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-start">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          aria-hidden="true"
        />

        {/* Sidebar / Modal Drawer */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="ASTRO360 Command Center"
          initial={{ x: '-100%', opacity: 0.8 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-sm sm:max-w-md h-[100dvh] max-h-[100dvh] bg-[#070B14] border-r border-white/15 shadow-2xl flex flex-col z-10 overflow-hidden text-left"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#0A101D] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="text-base font-black text-white font-sans tracking-tight flex items-center gap-1.5">
                  Command Center
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                    ASTRO360
                  </span>
                </h2>
                <p className="text-[11px] font-mono text-slate-400">
                  Master Ephemeris & Multi-Tradition Navigation
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Command Center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box & Category Jump Bar */}
          <div className="p-3 border-b border-white/10 bg-[#090E1A] space-y-2 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 32+ tools, traditions, timing, remedies..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#0F172A] border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/60"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs font-mono cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none font-mono text-[10.5px]">
              {[
                { id: 'all', label: 'All (32+)' },
                { id: 'dashboard', label: 'Overview' },
                { id: 'charts', label: 'Charts' },
                { id: 'forecasts', label: 'Timing' },
                { id: 'traditions', label: '7 Traditions' },
                { id: 'mystic', label: 'Mystic' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fully Scrollable Navigation Tree Container */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-5"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
          >
            {filteredSections.map((sec) => (
              <div key={sec.id} className="space-y-1.5">
                <div className="px-2 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400/90 flex items-center justify-between sticky top-0 bg-[#070B14]/95 py-1 backdrop-blur-sm z-10">
                  <span>{sec.title}</span>
                  <span className="text-[9.5px] text-slate-500 font-mono font-normal">{sec.items.length} tools</span>
                </div>

                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const isSelected = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          onClose();
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between transition-all cursor-pointer group ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/10'
                            : 'text-slate-200 hover:bg-white/[0.08] hover:text-white border border-transparent hover:border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          {item.flag ? (
                            <span className="text-base leading-none shrink-0">{item.flag}</span>
                          ) : (
                            <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-slate-400 group-hover:text-amber-400 transition-colors'}`} />
                          )}
                          <div className="truncate">
                            <div className="truncate font-sans font-semibold text-xs leading-tight">{item.name}</div>
                            {item.description && (
                              <div className={`text-[10px] truncate leading-tight mt-0.5 ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>

                        {item.badge && (
                          <span className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                            isSelected 
                              ? 'bg-slate-950/20 text-slate-950 border-slate-950/30' 
                              : item.badgeColor || 'bg-white/10 text-slate-300 border-white/15'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredSections.length === 0 && (
              <div className="p-8 text-center text-xs font-mono text-slate-400">
                No tools or traditions found for "{search}"
              </div>
            )}
          </div>

          {/* User Profile & Security Footer (Fixed Bottom) */}
          <div className="p-3.5 border-t border-white/10 bg-[#090E1A] space-y-2 shrink-0">
            {/* Seeker Identity Card */}
            <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-inner shrink-0">
                  {seekerName.charAt(0).toUpperCase() || 'S'}
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs font-bold text-white leading-tight truncate">{seekerName}</div>
                  <div className="text-[10px] font-mono text-slate-400 leading-tight truncate">
                    {seekerSystem} • {seekerDob}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    onOpenSettings ? onOpenSettings() : onNavigate('control');
                    onClose();
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Settings"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    onOpenAuth ? onOpenAuth() : onNavigate('auth');
                    onClose();
                  }}
                  className="px-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Sign In</span>
                </button>
              </div>
            </div>

            {/* Zero-PII Encryption Stamp */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero-PII Encrypted
              </span>
              <span>100% In-Browser</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AstroCommandCenterDrawer;
