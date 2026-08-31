import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Heart, Briefcase, DollarSign, Compass, ArrowRight, 
  HelpCircle, CheckCircle2, AlertTriangle, Clock, Calendar, ShieldCheck, 
  MessageSquare, ChevronRight, Moon, Layers, Award, Globe, FileText, Bot,
  Sun, Zap, Star, Sliders, Settings, LineChart, Globe2, User
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer, { type OmniWhyDrawerProps } from './OmniWhyDrawer';
import OmniAudioBriefing from './OmniAudioBriefing';
import OmniTransitAlertCenter from './OmniTransitAlertCenter';
import OmniDailyVibeScore from './OmniDailyVibeScore';
import OmniAskUniversalHero from './OmniAskUniversalHero';
import AstroDashboardControlDrawer from '../dashboard/AstroDashboardControlDrawer';
import CosmicIntelligenceCenter from '../CosmicIntelligenceCenter';
import BirthChartGenerator from '../BirthChartGenerator';
import CosmicChartAnalytics from '../CosmicChartAnalytics';
import { useGlobalConfig } from '../../context/GlobalConfigContext';
import BorderBeam from '../magicui/border-beam';
import { fadeInUp, staggerContainer, staggerItem } from '../../lib/animationPresets';
import { calculatePlanetaryPositions, calculatePanchang, calculateVimshottariDasha } from '../../lib/astroCalculations';

interface OmniSimpleHomeProps {
  userProfile: UserProfile;
  onNavigate: (tab: string) => void;
  onOpenProfile?: () => void;
  onUpdateProfile?: (updated: UserProfile) => void;
}

export default function OmniSimpleHome({
  userProfile,
  onNavigate,
  onOpenProfile,
  onUpdateProfile
}: OmniSimpleHomeProps) {
  const [whyModalOpen, setWhyModalOpen] = useState(false);
  const [selectedWhyPayload, setSelectedWhyPayload] = useState<Partial<OmniWhyDrawerProps>>({});
  const [activeViewMode, setActiveViewMode] = useState<'simple' | 'master' | 'vargas' | 'analytics'>('simple');
  const [isControlDrawerOpen, setIsControlDrawerOpen] = useState(false);
  const { config } = useGlobalConfig();

  // Dynamic greeting based on current local hour
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const seekerName = userProfile.name?.trim() || 'Cosmic Seeker';

  // Calculate live personalized astronomical natal placements
  const astroData = useMemo(() => {
    try {
      const positions = calculatePlanetaryPositions(userProfile.dob || '1998-06-15', userProfile.time || '12:00');
      const sun = positions.find(p => p.name === 'Sun');
      const moon = positions.find(p => p.name === 'Moon');
      const asc = positions.find(p => p.name === 'Ascendant') || positions[0];
      const panchang = calculatePanchang(new Date());
      const dasha = calculateVimshottariDasha(moon?.degreeDecimal ? Math.floor(moon.degreeDecimal / (360 / 27)) : 3, userProfile.dob || '1998-06-15');

      const moonDeg = moon?.degreeDecimal || 74;
      const sunDeg = sun?.degreeDecimal || 118;
      const loveScore = Math.min(95, Math.max(68, Math.round(72 + ((moonDeg % 30) / 30) * 22)));
      const careerScore = Math.min(96, Math.max(70, Math.round(75 + ((sunDeg % 30) / 30) * 20)));
      const moneyScore = Math.min(92, Math.max(65, Math.round(70 + (((sunDeg + moonDeg) % 30) / 30) * 22)));
      const travelScore = Math.min(94, Math.max(66, Math.round(71 + (((moonDeg * 2) % 30) / 30) * 23)));

      return {
        sunSign: sun ? `${sun.sign} (${sun.degree})` : 'Cancer ♋ (28°)',
        moonSign: moon ? `${moon.sign} (${moon.degree})` : 'Gemini ♊ (14°)',
        nakshatra: moon?.nakshatra ? `${moon.nakshatra} (Pada ${moon.pada})` : 'Mrigashira (Pada 2)',
        ascendant: asc ? `${asc.sign}` : 'Aries ♈',
        dasha: `${dasha.mahadasha} - ${dasha.antardasha}`,
        dashaProgress: dasha.progressPercent || 65,
        tithi: panchang.tithi,
        yoga: panchang.yoga,
        abhijit: panchang.abhijitMuhurta,
        rahuKalam: panchang.rahuKalam,
        loveScore,
        careerScore,
        moneyScore,
        travelScore,
      };
    } catch {
      return {
        sunSign: 'Cancer ♋ (28°)',
        moonSign: 'Gemini ♊ (14°)',
        nakshatra: 'Mrigashira (Pada 2)',
        ascendant: 'Aries ♈',
        dasha: 'Rahu - Jupiter',
        dashaProgress: 65,
        tithi: 'Shukla Navami',
        yoga: 'Siddhi Yoga',
        abhijit: '11:48 AM - 12:36 PM',
        rahuKalam: '04:30 PM - 06:00 PM',
        loveScore: 84,
        careerScore: 91,
        moneyScore: 78,
        travelScore: 82,
      };
    }
  }, [userProfile.dob, userProfile.time]);

  const handleOpenWhy = (payload?: Partial<OmniWhyDrawerProps>) => {
    setSelectedWhyPayload(payload || {});
    setWhyModalOpen(true);
  };

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-6 sm:space-y-8 text-left pb-20 pt-2 sm:pt-4 relative"
    >
      {/* ═══ LIVING AMBIENT BACKGROUND LAYER ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Slow-orbiting amber nebula glow — upper left */}
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-500/12 via-amber-600/6 to-transparent blur-[120px]"
        />
        {/* Slow-orbiting indigo nebula glow — lower right */}
        <motion.div
          animate={{ x: [0, -30, 25, 0], y: [0, 35, -15, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] -right-16 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-indigo-500/10 via-purple-600/5 to-transparent blur-[140px]"
        />
        {/* Cyan accent nebula — center */}
        <motion.div
          animate={{ x: [0, 20, -15, 0], y: [0, -20, 15, 0], opacity: [0.4, 0.7, 0.5, 0.4] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-gradient-to-r from-cyan-500/8 via-teal-400/4 to-transparent blur-[100px]"
        />
        {/* Floating micro-particle constellation dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [0, -(15 + i * 3), 0],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: 4 + (i % 5) * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              top: `${10 + (i * 7.5) % 85}%`,
              left: `${5 + (i * 8.3) % 90}%`,
            }}
          />
        ))}
      </div>

      {/* ═══ RELATIVE Z-INDEX CONTENT LAYER ═══ */}
      <div className="relative z-10 space-y-6 sm:space-y-8">
      {/* 1. Header Greeting & Date Banner */}
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {greeting},{' '}
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-200 bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                {seekerName}
              </motion.span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono pt-1 flex items-center gap-2">
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-1"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Live Ephemeris Active
            </motion.span>
            <span className="text-slate-600">•</span>
            Personal Astrology Command • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <motion.span
            animate={{ boxShadow: ['0 0 0px rgba(16, 185, 129, 0)', '0 0 12px rgba(16, 185, 129, 0.3)', '0 0 0px rgba(16, 185, 129, 0)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 font-bold shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> High-Precision Ephemeris
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(251, 191, 36, 0.35)' }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ['0 4px 14px rgba(251, 191, 36, 0.15)', '0 4px 24px rgba(251, 191, 36, 0.3)', '0 4px 14px rgba(251, 191, 36, 0.15)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => onNavigate('studio')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Master 152+ Studio Suite →</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 1.25 DASHBOARD COMMAND & CONTROL BAR (Mobile & Desktop) */}
      <motion.div variants={staggerItem} className="space-y-2.5">
        {/* Segmented Mode Selector Bar */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#070D18] border border-white/10 overflow-x-auto no-scrollbar shadow-inner">
          {[
            { id: 'simple', label: '⚡ Daily Summary' },
            { id: 'master', label: '📊 Master Dashboard' },
            { id: 'vargas', label: '🌌 Vargas & Dasha' },
            { id: 'analytics', label: '📈 Chart Analytics' },
          ].map(tab => {
            const isSelected = activeViewMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveViewMode(tab.id as any)}
                className={`relative flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-colors cursor-pointer ${
                  isSelected
                    ? 'text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="homeViewModeHighlight"
                    className="absolute inset-0 rounded-xl bg-amber-400 shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Customization Pill Actions */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsControlDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold shrink-0 transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize Controls & Options</span>
          </button>

          <button
            type="button"
            onClick={() => setIsControlDrawerOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 shrink-0 transition-all cursor-pointer capitalize"
          >
            <Globe2 className="w-3 h-3 text-cyan-400" />
            <span>{userProfile.preferredSystem || 'Vedic'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsControlDrawerOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 shrink-0 transition-all cursor-pointer"
          >
            <Compass className="w-3 h-3 text-amber-400" />
            <span>{config.houseSystem || 'Whole Sign'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 shrink-0 transition-all cursor-pointer"
          >
            <User className="w-3 h-3 text-purple-400" />
            <span>Edit Profile</span>
          </button>
        </div>
      </motion.div>

      {/* Render View Modes */}
      {activeViewMode === 'master' ? (
        <div className="pt-1">
          <CosmicIntelligenceCenter
            onNavigate={onNavigate}
            userProfile={userProfile}
            onUpdateProfile={onUpdateProfile}
          />
        </div>
      ) : activeViewMode === 'vargas' ? (
        <div className="pt-1">
          <BirthChartGenerator userProfile={userProfile} />
        </div>
      ) : activeViewMode === 'analytics' ? (
        <div className="pt-1">
          <CosmicChartAnalytics userProfile={userProfile} />
        </div>
      ) : (
        <>
          {/* 1.5 UNIVERSAL ENTRY EXPERIENCE: ASK ASTRO360 HERO */}
          <OmniAskUniversalHero
            userProfile={userProfile}
            onNavigate={onNavigate}
            onOpenProfile={onOpenProfile}
          />

          {/* 2. Personalized Cosmic Placements Card (Live Computed) */}
          <motion.div
            variants={staggerItem}
            className="relative p-[1px] rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Animated gradient border */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,#F59E0B,#6366F1,#06B6D4,#F59E0B)]"
              style={{ padding: '1px' }}
            />
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0C1322] via-[#0F172A] to-[#0C1322] backdrop-blur-xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Sun Placement */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-amber-500/5 border border-white/5 hover:border-amber-400/30 space-y-1 transition-colors cursor-default"
              >
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-bold">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                    <Sun className="w-3.5 h-3.5" />
                  </motion.div>
                  <span>Sun Sign</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">{astroData.sunSign}</p>
                <span className="text-[10px] text-slate-400 font-mono">Core Vitality & Will</span>
              </motion.div>

              {/* Moon Placement & Nakshatra */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-500/5 border border-white/5 hover:border-cyan-400/30 space-y-1 transition-colors cursor-default"
              >
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono font-bold">
                  <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                    <Moon className="w-3.5 h-3.5" />
                  </motion.div>
                  <span>Moon & Star</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">{astroData.nakshatra}</p>
                <span className="text-[10px] text-slate-400 font-mono">{astroData.moonSign}</span>
              </motion.div>

              {/* Rising / Ascendant */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-indigo-500/5 border border-white/5 hover:border-indigo-400/30 space-y-1 transition-colors cursor-default"
              >
                <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-mono font-bold">
                  <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                    <Compass className="w-3.5 h-3.5" />
                  </motion.div>
                  <span>Ascendant (Lagna)</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">{astroData.ascendant}</p>
                <span className="text-[10px] text-slate-400 font-mono">1st House Horizon</span>
              </motion.div>

              {/* Current Mahadasha */}
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-purple-500/5 border border-white/5 hover:border-purple-400/30 space-y-1 transition-colors cursor-default"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-purple-400 text-xs font-mono font-bold">
                    <motion.div animate={{ rotate: [0, -360] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
                      <Clock className="w-3.5 h-3.5" />
                    </motion.div>
                    <span>Current Dasha</span>
                  </div>
                  <span className="text-[9px] font-mono text-purple-300 bg-purple-500/15 px-1.5 py-0.5 rounded">
                    {astroData.dashaProgress}%
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">{astroData.dasha}</p>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${astroData.dashaProgress}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                    className="bg-gradient-to-r from-purple-400 to-indigo-400 h-full rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

      {/* 3. Quick Action Navigation Jump Dock */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'birth-chart', label: '🌌 Natal Kundli & Chart' },
          { id: 'dasha', label: '🔮 120-Yr Dasha Timeline' },
          { id: 'forecast', label: '🪐 Daily Timing Radar' },
          { id: 'ask', label: '💬 Ask AI Oracle' },
          { id: 'compatibility', label: '❤️ 36-Guna Matchmaker' },
          { id: 'report-generator', label: '📜 Executive PDF Dossier' },
          { id: 'free-tools', label: '✨ Free Tools Hub' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B1220] hover:bg-[#131F37] border border-white/10 hover:border-amber-400/40 text-xs font-mono font-bold text-slate-300 hover:text-white shrink-0 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* 4. Hero: Strongest Astronomical Alignment Today */}
      <motion.div
        variants={staggerItem}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/15 via-indigo-950/40 to-[#090D16] border border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-5"
      >
        <BorderBeam size={220} duration={12} colorFrom="#F59E0B" colorTo="#6366F1" />
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Strongest Planetary Influence Today
            </span>
            <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 88% Harmonic Alignment
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Ayanamsha: Lahiri 24.18° • Tropical Sun Sextile Mars
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            EXECUTIVE CLARITY & STRATEGIC BREAKTHROUGH
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
            You are operating under an elevated Solar-Mars harmonic trine activating your 10th Kendra house of profession. Your cognitive stamina and decisiveness are peaked. Ideal for locking down commercial agreements, pitching major proposals, and concluding high-value initiatives.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('forecast')}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-400/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Read In-Depth Day Forecast</span> <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenWhy({
              title: "Executive Clarity & Strategic Breakthrough",
              period: "Today",
              confidence: "High",
              confidenceScore: 88,
              factors: [
                "Sun-Mars harmonic sextile providing 3.4σ above average physical stamina",
                `Moon transiting ${astroData.nakshatra} harmonizes with natal Ascendant lord`,
                `Vimshottari sub-period (${astroData.dasha}) activates 1st & 10th houses of leadership`,
                "Daily Panchanga Yoga confirms auspicious momentum for commercial initiation"
              ]
            })}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> <span>Why? Explain Calculation</span>
          </button>
        </div>
      </motion.div>

      {/* 5. Daily Audio Briefing & Live Vibe Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6">
          <OmniAudioBriefing userProfile={userProfile} />
        </div>
        <div className="lg:col-span-6">
          <OmniDailyVibeScore userProfile={userProfile} />
        </div>
      </div>

      {/* 6. Today's Auspicious Muhurta & Panchang Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1220] border border-cyan-500/30 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Today's Tithi & Yoga</span>
            <p className="text-xs font-bold text-white">{astroData.tithi} • {astroData.yoga}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Abhijit Muhurta (Auspicious)</span>
            <p className="text-xs font-bold text-emerald-300">{astroData.abhijit}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">Rahu Kalam (Caution Window)</span>
            <p className="text-xs font-bold text-rose-300">{astroData.rahuKalam}</p>
          </div>
        </div>
      </div>

      {/* 7. 4 Core Life Pillar Guidance Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> 4 Core Life Dimensions (Today's Resonance)
          </h3>
          <span className="text-xs font-mono text-slate-400">Click any card to inspect forecast</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Love */}
          <div 
            onClick={() => onNavigate('forecast')}
            className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] hover:bg-[#131F37] border border-white/10 hover:border-pink-500/40 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center">
                <Heart className="w-4 h-4 text-pink-400" />
              </div>
              <span className="text-[10px] font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-md border border-pink-500/20">
                {astroData.loveScore}% Resonance
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">Love & Bonds</h3>
              <p className="text-xs text-slate-400 pt-0.5 leading-snug">Warm empathy & meaningful honest discussions</p>
            </div>
          </div>

          {/* Career */}
          <div 
            onClick={() => onNavigate('forecast')}
            className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] hover:bg-[#131F37] border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                {astroData.careerScore}% Strong
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Career & Work</h3>
              <p className="text-xs text-slate-400 pt-0.5 leading-snug">Peak focus for major project closure and review</p>
            </div>
          </div>

          {/* Money */}
          <div 
            onClick={() => onNavigate('forecast')}
            className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] hover:bg-[#131F37] border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                {astroData.moneyScore}% Balanced
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Money & Assets</h3>
              <p className="text-xs text-slate-400 pt-0.5 leading-snug">Steady flow; audit upcoming tax and expenditure</p>
            </div>
          </div>

          {/* Travel / Growth */}
          <div 
            onClick={() => onNavigate('forecast')}
            className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] hover:bg-[#131F37] border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                <Compass className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                {astroData.travelScore}% Active
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">Travel & Horizon</h3>
              <p className="text-xs text-slate-400 pt-0.5 leading-snug">Intellectual expansion & long-distance research</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Practical Advice: Favorable vs Caution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#0B1220] border border-emerald-500/30 space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Highly Favorable Today:
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>High-stakes negotiations, leadership presentations, and contractual commitments</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Publishing research, launching campaigns, and organizing technical architecture</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Establishing structured fitness routines and grounding meditation</span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B1220] border border-amber-500/30 space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Cautionary Guidance:
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Avoid starting critical financial speculation during Rahu Kalam ({astroData.rahuKalam})</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Overcommitting to simultaneous emotional obligations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Neglecting evening restorative sleep and eye rest</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 9. Live Planetary Transit Alert Stream */}
      <OmniTransitAlertCenter userProfile={userProfile} />

      {/* 10. AI Astrological Oracle Assistant Prompt Card */}
      <div 
        onClick={() => onNavigate('ask')}
        className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-[#0F172A] to-[#090D16] border border-indigo-500/40 hover:border-indigo-500/70 shadow-xl transition-all cursor-pointer space-y-3 group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-300 font-mono font-bold text-xs">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>ASTRO360 MULTI-TRADITION AI ORACLE</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Classical Scripture + Math Grounded</span>
        </div>
        <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#070B14] border border-white/10 text-slate-400 group-hover:text-slate-200 transition-colors text-xs font-mono">
          <span className="truncate">Ask: "When is my peak financial timing window in 2026?" or "Analyze my 7th house compatibility"</span>
          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* 11. Master 152+ Universal Tools & Calculation Engines Hub */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Master 152+ Calculation Tools & Research Engines
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Launch deterministic astronomical calculators, timing radars, harmonic vargas & divination suites.
            </p>
          </div>
          <button
            onClick={() => onNavigate('studio')}
            className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            Open Full Cosmic Studio <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { id: 'birth-chart', title: 'Natal Kundli & Planetary Coordinates', desc: 'D1–D60 vargas, planetary degrees & padas', icon: Compass, color: 'text-amber-400', border: 'border-amber-500/30' },
            { id: 'dasha', title: 'Vimshottari Dasha Engine', desc: '120-year timeline, Mahadasha, Antardasha & Pratyantar', icon: Clock, color: 'text-cyan-400', border: 'border-cyan-500/30' },
            { id: 'transit-calendar', title: 'Planetary Transit Radar', desc: 'Real-time planetary ingresses & speed tracking', icon: Calendar, color: 'text-purple-400', border: 'border-purple-500/30' },
            { id: 'compatibility', title: 'Synastry & 36-Guna Matchmaker', desc: 'Ashta Koota marriage & relationship harmony', icon: Heart, color: 'text-pink-400', border: 'border-pink-500/30' },
            { id: 'islamic-suite', title: 'Islamic Ilm al-Falak Hub', desc: 'Qur\'anic astronomical verses & lunar calendar', icon: Moon, color: 'text-emerald-400', border: 'border-emerald-500/30' },
            { id: 'numerology', title: 'Pythagorean & Chaldean Numerology', desc: 'Life Path, Destiny, Soul Urge & Name vibration', icon: DollarSign, color: 'text-teal-400', border: 'border-teal-500/30' },
            { id: 'tarot-iching', title: '78 Tarot & 64 I Ching Oracle', desc: 'Hexagram casting, astrological tarot spreads', icon: Layers, color: 'text-indigo-400', border: 'border-indigo-500/30' },
            { id: 'remedies', title: 'Multi-Tradition Remedies & Gems', desc: 'Prescribed gemstones, rudraksha & yantras', icon: Award, color: 'text-yellow-400', border: 'border-yellow-500/30' },
            { id: 'feng-shui', title: 'Cosmic Feng Shui & Bagua Matrix', desc: 'Directional energies, 5-element home balance', icon: Globe, color: 'text-rose-400', border: 'border-rose-500/30' },
            { id: 'muhurta', title: 'Electional Muhurta & Horas', desc: 'Auspicious timings for business, travel & weddings', icon: Clock, color: 'text-orange-400', border: 'border-orange-500/30' },
            { id: 'astrocartography', title: 'AstroCartography Global Map', desc: 'Planetary relocation lines across worldwide cities', icon: Globe, color: 'text-blue-400', border: 'border-blue-500/30' },
            { id: 'btr-suite', title: 'Birth Time Rectification (BTR)', desc: 'Tattwa Shodhana & life event inverse alignment', icon: ShieldCheck, color: 'text-cyan-400', border: 'border-cyan-500/30' },
            { id: 'divisional-charts', title: 'D1–D60 Divisional Varga Suite', desc: 'Navamsha (D9), Dashamsha (D10) & Shashtiamsa (D60)', icon: Layers, color: 'text-amber-400', border: 'border-amber-500/30' },
            { id: 'report-generator', title: 'Executive PDF Dossier Generator', desc: '18+ page structured analytical client reports', icon: FileText, color: 'text-emerald-400', border: 'border-emerald-500/30' },
            { id: 'chat', title: 'AI Astrological Oracle Assistant', desc: 'Conversational consultation with classical sources', icon: Bot, color: 'text-purple-400', border: 'border-purple-500/30' },
            { id: 'omni-research', title: 'OMNI Multi-Tradition Research Core', desc: 'Direct side-by-side consensus calculation matrix', icon: Sparkles, color: 'text-amber-300', border: 'border-amber-400/40' },
          ].map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * idx, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className={`p-4 rounded-2xl bg-[#0F172A] hover:bg-[#131F37] border ${tool.border} transition-all duration-200 text-left space-y-2 group cursor-pointer shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-400/40 transition-colors">
                    <Icon className={`w-4 h-4 ${tool.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {tool.title}
                  </h4>
                  <p className="text-[10.5px] text-slate-400 line-clamp-2 pt-0.5 leading-snug">
                    {tool.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      </>
      )}

      </div>{/* ═══ END CONTENT Z-10 LAYER ═══ */}

      {/* Universal Explainability Drawer Modal */}
      <OmniWhyDrawer
        isOpen={whyModalOpen}
        onClose={() => setWhyModalOpen(false)}
        {...selectedWhyPayload}
      />

      {/* Astro Dashboard Controls & Customizer Drawer */}
      <AstroDashboardControlDrawer
        isOpen={isControlDrawerOpen}
        onClose={() => setIsControlDrawerOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={onUpdateProfile}
        activeViewMode={activeViewMode}
        onChangeViewMode={setActiveViewMode}
        onNavigate={onNavigate}
      />
    </motion.div>
  );
}
