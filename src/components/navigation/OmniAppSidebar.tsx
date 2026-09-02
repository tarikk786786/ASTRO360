import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  Home, 
  LayoutDashboard, 
  Activity, 
  MessageCircle, 
  Sparkles, 
  Cpu, 
  Compass, 
  Layers, 
  Radio, 
  Volume2, 
  Clock, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Globe, 
  Gem, 
  Music, 
  Sunrise, 
  Eye, 
  Hash, 
  Map, 
  BookOpen, 
  ChevronDown, 
  ChevronRight,
  User,
  SlidersHorizontal,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SidebarItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
  tag?: string;
}

interface SidebarSection {
  id: string;
  title: string;
  icon: any;
  accentColor: string;
  items: SidebarItem[];
}

interface OmniAppSidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onOpenProfileModal: () => void;
  onOpenAuthModal: () => void;
}

export default function OmniAppSidebar({
  activeTab,
  onNavigate,
  isOpen,
  onClose,
  userProfile,
  onOpenProfileModal,
  onOpenAuthModal,
}: OmniAppSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    traditions: false,
    remedies: false
  });

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections: SidebarSection[] = useMemo(() => [
    {
      id: 'command',
      title: 'Command Center',
      icon: LayoutDashboard,
      accentColor: 'text-amber-400',
      items: [
        { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'live-diagnostics', label: 'Live Cosmic Radar', icon: Activity, badge: 'Live', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-white/[0.08]' },
        { id: 'copilot', label: 'AI Oracle Copilot', icon: MessageCircle, badge: 'AI', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-white/[0.08]' },
        { id: 'studio', label: 'Master Studio Suite', icon: Sparkles, badge: '152+', badgeColor: 'bg-amber-500/20 text-amber-300 border-white/[0.08]' },
        { id: 'omni-research', label: 'Consensus Core', icon: Cpu, badge: 'Research', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
      ]
    },
    {
      id: 'ephemeris',
      title: 'Ephemeris & Charts',
      icon: Compass,
      accentColor: 'text-cyan-400',
      items: [
        { id: 'birth-chart', label: 'Birth Chart Engine', icon: Compass },
        { id: 'chart-studio', label: 'Dual Wheel Studio', icon: Layers, badge: 'Dual', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-white/[0.08]' },
        { id: 'divisional-charts', label: 'Divisional Charts (D1-D60)', icon: Layers },
        { id: 'shadbala', label: '6-Fold Shadbala Potency', icon: Flame, badge: 'Bala', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
        { id: 'frequencies', label: 'Planetary Frequencies', icon: Volume2, badge: 'Audio', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
        { id: 'ephemeris-lab', label: 'Ephemeris Comparison Lab', icon: Activity },
        { id: 'sabian', label: 'Sabian Symbols (360°)', icon: Sparkles },
      ]
    },
    {
      id: 'forecasts',
      title: 'Forecasts & Timing',
      icon: Calendar,
      accentColor: 'text-indigo-400',
      items: [
        { id: 'time-horizon', label: 'Dasha & Time Horizon', icon: Clock, badge: '120y', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
        { id: 'transit-radar', label: 'Sade Sati & Transits', icon: Radio },
        { id: 'dossier', label: 'Executive PDF Dossier', icon: FileText, badge: 'PDF', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-white/[0.08]' },
        { id: 'news-intelligence', label: 'Cosmic News Hub', icon: Radio, badge: 'Live', badgeColor: 'bg-amber-500/20 text-amber-300 border-white/[0.08]' },
        { id: 'electional-muhurta', label: 'Electional Muhurta', icon: Clock },
        { id: 'planetary-horas', label: 'Planetary Horas Clock', icon: Activity },
        { id: 'btr-suite', label: 'Birth Time Rectification', icon: ShieldCheck },
      ]
    },
    {
      id: 'traditions',
      title: '7-Fold Traditions',
      icon: Globe,
      accentColor: 'text-purple-400',
      items: [
        { id: 'vedic', label: 'Vedic / Parashari Jyotish', icon: Globe, tag: '🇮🇳' },
        { id: 'western', label: 'Western Tropical & Hellenistic', icon: Globe, tag: '🏛️' },
        { id: 'kp', label: 'KP Stellar Sub-Lords', icon: Globe, tag: '⭐' },
        { id: 'jaimini', label: 'Jaimini Chara Sutras', icon: Globe, tag: '☸️' },
        { id: 'chinese', label: 'Chinese BaZi 4-Pillars', icon: Globe, tag: '🐉' },
        { id: 'islamic', label: 'Islamic Ilm al-Falak', icon: Globe, tag: '🌙' },
        { id: 'mayan', label: 'Mayan & Mesoamerican', icon: Globe, tag: '☀️' },
      ]
    },
    {
      id: 'remedies',
      title: 'Mystic & Healing Suites',
      icon: Gem,
      accentColor: 'text-emerald-400',
      items: [
        { id: 'gemstone-suite', label: 'Gemstone & Rudraksha', icon: Gem },
        { id: 'mantra-soundboard', label: 'Sacred Mantra Audio', icon: Music },
        { id: 'chakra-alignment', label: 'Chakra Alignment', icon: Sunrise },
        { id: 'tarot-iching', label: 'Tarot & I-Ching Oracle', icon: Eye },
        { id: 'numerology-suite', label: 'Name Numerology Matrix', icon: Hash },
        { id: 'fengshui-matrix', label: 'Cosmic Feng Shui', icon: Map },
        { id: 'shlokas', label: 'Classical Sanskrit Shlokas', icon: BookOpen },
      ]
    }
  ], []);

  // Filter items if user types in search
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections
      .map(sec => ({
        ...sec,
        items: sec.items.filter(item => 
          item.label.toLowerCase().includes(q) || 
          item.id.toLowerCase().includes(q)
        )
      }))
      .filter(sec => sec.items.length > 0);
  }, [sections, searchQuery]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 md:static h-full w-72 bg-[#060A12]/98 md:bg-[#070D18]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col z-50 transition-all duration-300 ease-out shrink-0 shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Top Header & Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0 bg-[#060A12]/50">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/20 via-cyan-400/20 to-indigo-500/20 border border-white/[0.08] flex items-center justify-center shadow-lg group-hover:border-amber-400 transition-colors">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="font-black text-sm tracking-wider text-white flex items-center gap-1.5">
              ASTRO360 <span className="text-amber-400 font-bold text-xs px-1.5 py-0.2 rounded bg-amber-400/10 border border-white/[0.08]">OMNI</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 block -mt-0.5">Unified Ephemeris Core</span>
          </div>
        </div>

        <button 
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer md:hidden"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Switch to Landing + Search Bar */}
      <div className="p-3 space-y-2.5 border-b border-white/5 shrink-0">
        <button
          onClick={() => onNavigate('landing')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-amber-500/10 via-white/5 to-cyan-500/10 hover:from-amber-500/20 hover:to-cyan-500/20 text-amber-300 border border-white/[0.08] hover:border-white/[0.12] transition-all cursor-pointer group shadow-sm"
        >
          <Home className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Landing Page</span>
        </button>

        {/* Live Filter Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 150+ tools & systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 rounded-xl bg-[#0B1220] border border-white/10 focus:border-cyan-400/50 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-[10px] cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Nav Items List */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-3 space-y-4">
        {filteredSections.map((section) => {
          const isCollapsed = Boolean(collapsedSections[section.id]) && !searchQuery;
          const SectionIcon = section.icon;

          return (
            <div key={section.id} className="space-y-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-mono font-bold tracking-wider uppercase text-slate-400 hover:text-slate-200 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <SectionIcon className={`w-3.5 h-3.5 ${section.accentColor}`} />
                  <span>{section.title}</span>
                </div>
                {!searchQuery && (
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`} />
                )}
              </button>

              {/* Section Items */}
              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-0.5 overflow-hidden pl-1"
                  >
                    {section.items.map((item) => {
                      const isActive = activeTab === item.id || (item.id === 'omni-research' && activeTab === 'comparative-mode');
                      const ItemIcon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => onNavigate(item.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer group ${
                            isActive
                              ? 'bg-gradient-to-r from-amber-500/20 via-cyan-500/10 to-transparent text-white font-semibold border-l-2 border-amber-400 shadow-sm'
                              : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {item.tag ? (
                              <span className="text-xs shrink-0">{item.tag}</span>
                            ) : (
                              <ItemIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                            )}
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${item.badgeColor || 'bg-white/10 text-slate-300 border-white/20'}`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-xs font-mono space-y-1">
            <p>No instruments matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-cyan-400 underline cursor-pointer text-[11px]"
            >
              Clear search filter
            </button>
          </div>
        )}
      </nav>

      {/* Bottom User Card & Encryption Indicator */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-[#060A12]/80 shrink-0">
        <div className="rounded-2xl p-2.5 bg-[#0B1220] border border-white/5 space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/20 to-indigo-500/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-white/10 shrink-0">
              {userProfile.name?.charAt(0).toUpperCase() || <User className="w-3.5 h-3.5" />}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-white truncate">{userProfile.name || 'Seeker'}</p>
              <p className="text-[10px] text-slate-400 truncate capitalize font-mono">
                {userProfile.preferredSystem || 'True Lahiri'} • {userProfile.dob || '1998-06-15'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={onOpenProfileModal}
              className="py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[10px] font-mono transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3 text-cyan-400" />
              <span>Settings</span>
            </button>
            <button
              onClick={onOpenAuthModal}
              className="py-1 px-2 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/25 text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3 h-3 text-amber-400" />
              <span>Sign In</span>
            </button>
          </div>
        </div>

        {/* Client Privacy Badge */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3 h-3" /> Zero-PII Encrypted
          </span>
          <span className="text-slate-500">v3.0.0</span>
        </div>
      </div>
    </aside>
  );
}
