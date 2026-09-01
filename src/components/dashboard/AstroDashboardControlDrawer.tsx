import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sliders, 
  Settings, 
  Globe2, 
  Compass, 
  Layers, 
  Sun, 
  Moon, 
  Clock, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  User, 
  Palette, 
  Zap, 
  RotateCcw,
  LayoutDashboard,
  LineChart,
  Heart,
  FileText
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { useGlobalConfig } from '../../context/GlobalConfigContext';

export interface AstroDashboardControlDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
  activeViewMode: 'simple' | 'master' | 'vargas' | 'analytics';
  onChangeViewMode: (mode: 'simple' | 'master' | 'vargas' | 'analytics') => void;
  onNavigate: (tab: string) => void;
}

export const AstroDashboardControlDrawer: React.FC<AstroDashboardControlDrawerProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  activeViewMode,
  onChangeViewMode,
  onNavigate,
}) => {
  const { config, updateConfig } = useGlobalConfig();
  const [activeTab, setActiveTab] = useState<'view' | 'tradition' | 'houses' | 'focus' | 'profile'>('view');

  if (!isOpen) return null;

  const TRADITIONS = [
    { id: 'vedic', name: 'Vedic Jyotish', badge: 'Sidereal Lahiri (23.856°)', desc: 'Moon nakshatras, Vimshottari 120y Dasha & D1-D60 Vargas' },
    { id: 'western', name: 'Western Astrology', badge: 'Tropical / Placidus', desc: 'Solar archetypes, geometric aspects & quadrant houses' },
    { id: 'kp', name: 'KP System', badge: 'Krishnamurti Padhdhati', desc: '249 sub-lords and ruling planets precision timing' },
    { id: 'jaimini', name: 'Jaimini Astrology', badge: 'Chara Karakas', desc: 'Sign-based aspects, Arudha padas & Chara dasha' },
    { id: 'bazi', name: 'Chinese BaZi', badge: 'Four Pillars of Destiny', desc: '10 Heavenly Stems, 12 Earthly Branches & 5 Elements' },
    { id: 'islamic', name: 'Islamic Astronomy', badge: 'Ilm al-Falak', desc: '28 Lunar Mansions (Manazil), Abjad & astronomical prayer' },
  ];

  const HOUSE_SYSTEMS = [
    { id: 'whole-sign', name: 'Whole Sign (Default Vedic)', desc: 'Entire sign constitutes house 1, preserving classic Rashi integrity' },
    { id: 'placidus', name: 'Placidus (Default Western)', desc: 'Time-proportional semi-arc division based on latitude' },
    { id: 'equal', name: 'Equal House', desc: 'Exact 30° increments starting from precise Ascendant degree' },
    { id: 'porphyry', name: 'Porphyry', desc: 'Trisection of ecliptic quadrants between angles' },
    { id: 'koch', name: 'Koch (Birthplace)', desc: 'Ascensional differences based on diurnal curves' },
  ];

  const LIFE_FOCUSES = [
    { id: 'wealth', label: 'Wealth, Purpose & Protection', icon: Zap, color: 'text-amber-400' },
    { id: 'career', label: 'Career & Executive Power', icon: Sparkles, color: 'text-cyan-400' },
    { id: 'love', label: 'Relationship Harmony & Love', icon: Heart, color: 'text-pink-400' },
    { id: 'spiritual', label: 'Spiritual Light & Healing', icon: Sun, color: 'text-purple-400' },
  ];

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
          aria-labelledby="dashboard-control-title"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-xl max-h-[88vh] bg-[#070C16] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden"
          style={{
            paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#0B1220]/90">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h2 id="dashboard-control-title" className="text-base sm:text-lg font-extrabold text-white font-sans">
                  Dashboard Controls & Customizer
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  Switch view modes, traditions, houses & calculation engines
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dashboard controls"
              className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center gap-1.5 p-3 border-b border-white/10 bg-[#090F1C] overflow-x-auto no-scrollbar">
            {[
              { id: 'view', label: 'View Modes' },
              { id: 'tradition', label: 'Tradition' },
              { id: 'houses', label: 'Houses' },
              { id: 'focus', label: 'Life Focus' },
              { id: 'profile', label: 'Birth Data' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div 
            className="p-4 flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-3 text-left"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
          >
            {/* 1. VIEW MODES */}
            {activeTab === 'view' && (
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Select Dashboard Presentation
                </span>
                
                {[
                  {
                    id: 'simple',
                    title: '⚡ Daily Cosmic Snapshot (Fast)',
                    desc: 'Essential daily vibe score, audio briefing, strongest planetary influence & 4 core pillars'
                  },
                  {
                    id: 'master',
                    title: '📊 Full Executive Analytics Dashboard',
                    desc: 'Complete 15+ telemetry panels, KPIs, aspect graph, ephemeris grid, transit radar & biorhythms'
                  },
                  {
                    id: 'vargas',
                    title: '🌌 Divisional Charts (D1–D60) & Dasha',
                    desc: 'Detailed Vedic Rasi Kundli, Navamsha (D9), Dashamsha (D10) and 120-Year Vimshottari timeline'
                  },
                  {
                    id: 'analytics',
                    title: '📈 Planetary Dignities & Shadbala Analytics',
                    desc: 'Mathematical strength scores, directional digbala, element balance and planetary speeds'
                  }
                ].map((mode) => {
                  const isSelected = activeViewMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        onChangeViewMode(mode.id as any);
                        onClose();
                      }}
                      className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-start justify-between gap-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400/50 shadow-md'
                          : 'bg-[#0D1526] hover:bg-white/[0.06] border-white/10'
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors block">
                          {mode.title}
                        </span>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {mode.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="p-1 rounded-full bg-amber-400 text-slate-950 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. TRADITIONS */}
            {activeTab === 'tradition' && (
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Active Computational Tradition
                </span>
                {TRADITIONS.map(sys => {
                  const isSelected = (userProfile.preferredSystem || 'vedic').toLowerCase() === sys.id;
                  return (
                    <button
                      key={sys.id}
                      onClick={() => {
                        onUpdateProfile?.({ ...userProfile, preferredSystem: sys.id });
                        onClose();
                      }}
                      className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-start justify-between gap-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400/50 shadow-md'
                          : 'bg-[#0D1526] hover:bg-white/[0.06] border-white/10'
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors">
                            {sys.name}
                          </span>
                          <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-amber-300">
                            {sys.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {sys.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="p-1 rounded-full bg-amber-400 text-slate-950 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. HOUSES */}
            {activeTab === 'houses' && (
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  House Calculation System
                </span>
                {HOUSE_SYSTEMS.map(house => {
                  const currentHouse = config.houseSystem || 'whole-sign';
                  const isSelected = currentHouse === house.id;
                  return (
                    <button
                      key={house.id}
                      onClick={() => {
                        updateConfig({ houseSystem: house.id as any });
                        onClose();
                      }}
                      className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-start justify-between gap-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400/50 shadow-md'
                          : 'bg-[#0D1526] hover:bg-white/[0.06] border-white/10'
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <span className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors block">
                          {house.name}
                        </span>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {house.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="p-1 rounded-full bg-amber-400 text-slate-950 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4. LIFE FOCUS */}
            {activeTab === 'focus' && (
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Primary Life Objective
                </span>
                {LIFE_FOCUSES.map(focus => {
                  const isSelected = userProfile.primaryLifeFocus === focus.label;
                  const Icon = focus.icon;
                  return (
                    <button
                      key={focus.id}
                      onClick={() => {
                        onUpdateProfile?.({ ...userProfile, primaryLifeFocus: focus.label });
                        onClose();
                      }}
                      className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400/50 shadow-md'
                          : 'bg-[#0D1526] hover:bg-white/[0.06] border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
                          <Icon className={`w-4 h-4 ${focus.color}`} />
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors">
                          {focus.label}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="p-1 rounded-full bg-amber-400 text-slate-950 shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 5. BIRTH PROFILE SHORTCUT */}
            {activeTab === 'profile' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#0D1526] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Current Seeker:</span>
                    <span className="text-xs font-bold text-white">{userProfile.name || 'Seeker'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Birth Date & Time:</span>
                    <span className="text-xs font-mono text-amber-300">{userProfile.dob || '1998-06-15'} at {userProfile.time || '12:00'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Location:</span>
                    <span className="text-xs font-mono text-white truncate max-w-[180px]">{userProfile.location || 'London, UK'}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onNavigate('me');
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <User className="w-4 h-4" />
                  <span>Edit Full Birth Parameters in Profile →</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AstroDashboardControlDrawer;
