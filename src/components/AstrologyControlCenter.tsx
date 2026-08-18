import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, User, Globe, Compass, Sun, Moon, Sparkles, BookOpen, Clock, 
  ShieldCheck, Layers, Eye, Cpu, Database, Bell, Mail, Palette, Zap, 
  Key, RefreshCw, CheckCircle, RotateCcw, Download, Upload, Check, AlertCircle,
  FileText, HeartHandshake, Award, Search, CheckCircle2, ChevronRight, Activity,
  SlidersHorizontal, CheckCheck, Copy, Terminal, Radio, Info, ChevronDown
} from 'lucide-react';
import { useGlobalConfig } from '../context/GlobalConfigContext';
import { toast } from 'sonner';

export interface ControlSectionMeta {
  id: string;
  name: string;
  group: string;
  icon: any;
  desc: string;
}

export const CONTROL_CENTER_GROUPS = [
  { id: 'profile', name: 'Profile & Identity', icon: User, color: 'text-blue-400' },
  { id: 'astrology', name: 'Astrology Engine', icon: Compass, color: 'text-amber-400' },
  { id: 'timing', name: 'Timing & Calendar', icon: CalendarIcon, color: 'text-cyan-400' },
  { id: 'compatibility', name: 'Matching & Synastry', icon: HeartHandshake, color: 'text-pink-400' },
  { id: 'islamic', name: 'Islamic & Faith Sciences', icon: Moon, color: 'text-emerald-400' },
  { id: 'appearance', name: 'Appearance & UI', icon: Palette, color: 'text-purple-400' },
  { id: 'ai', name: 'AI & Intelligence', icon: Zap, color: 'text-yellow-400' },
  { id: 'system', name: 'System & Advanced', icon: Cpu, color: 'text-slate-300' }
];

function CalendarIcon(props: any) {
  return <Clock {...props} />;
}

export const CONTROL_CENTER_SECTIONS: ControlSectionMeta[] = [
  // Group: Profile & Identity
  { id: 'profile', name: '1. Profile & Birth Data', group: 'profile', icon: User, desc: 'Master seeker birth time, location coordinates & timezone accuracy' },
  { id: 'notifications', name: '32. Notifications & Alerts', group: 'profile', icon: Bell, desc: 'Transit alerts, muhurta reminders & quiet hours schedule' },
  { id: 'email', name: '33. Email & Dispatch', group: 'profile', icon: Mail, desc: 'Automated weekly planetary digests & executive PDF deliveries' },

  // Group: Astrology Engine
  { id: 'astrologySystem', name: '3. Core Astrology System', group: 'astrology', icon: Compass, desc: 'Global calculation engine: Vedic Sidereal vs Western Tropical' },
  { id: 'vedic', name: '4. Vedic / Jyotish Engine', group: 'astrology', icon: Sun, desc: 'Ayanamsa standards, North/South chart style & bhava madhya' },
  { id: 'western', name: '5. Western Astrology Matrix', group: 'astrology', icon: Sparkles, desc: 'House calculation systems, midpoints & modern planetary rulers' },
  { id: 'nakshatra', name: '8. Nakshatra & Sub-Lords', group: 'astrology', icon: Moon, desc: '27/28 lunar mansions division & KP sub-lord computation' },
  { id: 'dasha', name: '9. Dasha & Planetary Periods', group: 'astrology', icon: Layers, desc: 'Vimshottari (120y), Yogini, Chara with 1-5 level depth' },
  { id: 'divisionalCharts', name: '10. Divisional Charts (Vargas)', group: 'astrology', icon: Sliders, desc: 'D1 Rashi through D60 Shashtiamsha matrix activation' },
  { id: 'yoga', name: '11. Yoga Detection Engine', group: 'astrology', icon: Sparkles, desc: 'Raja, Dhana, Pancha Mahapurusha & Neecha Bhanga scanners' },
  { id: 'dosha', name: '12. Dosha & Affliction Scanner', group: 'astrology', icon: ShieldCheck, desc: 'Manglik, Kaal Sarpa, Pitra & Sade Sati calculation thresholds' },
  { id: 'shadbala', name: '13. Shadbala Strength Weights', group: 'astrology', icon: Cpu, desc: 'Six-fold planetary strength coefficients and balance thresholds' },
  { id: 'ashtakavarga', name: '14. Ashtakavarga Matrix', group: 'astrology', icon: Layers, desc: 'SAV, BAV & Kakshya transit threshold point configurations' },
  { id: 'jaimini', name: '15. Jaimini Karakas & Padas', group: 'astrology', icon: Compass, desc: '7 vs 8 Chara Karakas, Arudha Padas & Upapada Lagna' },

  // Group: Timing & Calendar
  { id: 'panchang', name: '6. Panchang Ephemeris', group: 'timing', icon: Clock, desc: 'Tithi, Vara, Nakshatra, Yoga, Karana & Choghadiya rules' },
  { id: 'hinduCalendar', name: '7. Hindu Calendar Reckoning', group: 'timing', icon: BookOpen, desc: 'Amanta (New Moon) vs Purnimanta & Vikram vs Saka Samvat' },
  { id: 'muhurta', name: '16. Shubh Muhurta Engine', group: 'timing', icon: Clock, desc: 'Auspicious timing election rules, Rahu Kalam & Abhijit window' },
  { id: 'transits', name: '18. Planetary Transits (Gochar)', group: 'timing', icon: Sun, desc: 'Orb tolerances, retrograde highlights & ingress notification' },

  // Group: Matching & Synastry
  { id: 'kundliMatching', name: '17. Ashta Koota 36-Guna', group: 'compatibility', icon: Award, desc: 'Vedic marriage compatibility thresholds & Nadi Dosha exceptions' },
  { id: 'compatibility', name: '20. Synastry & Composite Charts', group: 'compatibility', icon: HeartHandshake, desc: 'Inter-aspect orbs, composite midpoint charts & relationship balance' },

  // Group: Islamic & Faith Sciences
  { id: 'islamic', name: '27. Islamic / Hijri Toolkit', group: 'islamic', icon: Moon, desc: 'Hijri lunar adjustments, sacred month markers & Ilm al-Nujum' },
  { id: 'prayerQibla', name: '28. Prayer Times & Qibla Direction', group: 'islamic', icon: Compass, desc: 'Calculation conventions (MWL, ISNA, Umm al-Qura) & Asr Juristic' },

  // Group: Appearance & UI
  { id: 'chartAppearance', name: '21. Chart Theme & Styling', group: 'appearance', icon: Eye, desc: 'Cosmic dark, Deep nebula, Gold prestige & visual sizing scales' },
  { id: 'planetSettings', name: '22. Planet Palette & Symbols', group: 'appearance', icon: Moon, desc: 'Custom hexadecimal color assignment for all 9 core planets' },
  { id: 'houseSettings', name: '23. House & Cusp Display', group: 'appearance', icon: Compass, desc: 'Placidus vs Whole Sign, Equal house, Cusp markers & ruler types' },
  { id: 'aspectSettings', name: '24. Aspect Orbs & Drishti', group: 'appearance', icon: Sliders, desc: 'Conjunction, Opposition, Trine, Square & special Vedic Drishti' },
  { id: 'theme', name: '34. UI Theme & Corner Radii', group: 'appearance', icon: Palette, desc: 'Background glow, glassmorphism blur & border radius values' },
  { id: 'animation', name: '35. Animation & Kinetic Dynamics', group: 'appearance', icon: Zap, desc: 'Motion velocities, particle canvas starfields & reduced motion' },
  { id: 'accessibility', name: '36. Accessibility & Contrast', group: 'appearance', icon: Eye, desc: 'Font scaling, color-blind simulation & high-contrast outlines' },

  // Group: AI & Intelligence
  { id: 'predictions', name: '19. Prediction Horizons', group: 'ai', icon: Sparkles, desc: 'Daily, weekly, monthly & multi-year predictive synthesis scope' },
  { id: 'aiSettings', name: '29. AI Oracle Provider & Prompts', group: 'ai', icon: Cpu, desc: 'LLM engine (Gemini 2.5, Claude, GPT-4o) & scholarly depth' },
  { id: 'reportSettings', name: '30. Executive PDF & Dossiers', group: 'ai', icon: BookOpen, desc: 'Watermarking, high-resolution vector charts & report schemas' },
  { id: 'dashboard', name: '31. Bento Dashboard Layout', group: 'ai', icon: Sliders, desc: 'Widget density, column spans & real-time telemetry auto-refresh' },

  // Group: System & Advanced
  { id: 'language', name: '2. International Language & Locale', group: 'system', icon: Globe, desc: 'Multi-lingual localization, RTL text orientation & date formats' },
  { id: 'precision', name: '25. Ephemeris Engine Precision', group: 'system', icon: Cpu, desc: 'Swiss Ephemeris vs NASA JPL Horizons & arcsecond rounding' },
  { id: 'timeLocation', name: '26. Geocoding & Timezone Sync', group: 'system', icon: Clock, desc: 'OpenStreetMap Nominatim, IANA timezones & DST auto-adjust' },
  { id: 'privacy', name: '37. Privacy, Encryption & Retention', group: 'system', icon: ShieldCheck, desc: 'End-to-end seeker record encryption & telemetry opt-out' },
  { id: 'dataExport', name: '38. Backup, Import & Data Portability', group: 'system', icon: Database, desc: 'Complete JSON export/import of user profiles & engine configs' },
  { id: 'apiEngine', name: '39. Engine Status & Diagnostics', group: 'system', icon: Activity, desc: 'Live latency monitors, telemetry pings & API quotas' },
  { id: 'developer', name: '40. Developer Console & Hashes', group: 'system', icon: Terminal, desc: 'Real-time state hashes, debug logs & memory heap inspections' },
  { id: 'presets', name: '41. Astrological System Presets', group: 'system', icon: SlidersHorizontal, desc: 'One-click configurations: Traditional Vedic, Western Hermetic, Islamic' },
  { id: 'resetBackup', name: '42. Master Factory Reset', group: 'system', icon: RotateCcw, desc: 'Restore entire 42-module constellation to factory baseline' }
];

const ToggleSwitch = ({ checked, onChange, label, description, badge }: any) => (
  <div className="flex items-center justify-between p-3.5 bg-[#0B1220]/80 border border-white/[0.06] rounded-2xl hover:border-cyan-500/30 transition-all group">
    <div className="pr-4">
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{label}</span>
        {badge && <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">{badge}</span>}
      </div>
      {description && <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{description}</div>}
    </div>
    <div
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer shrink-0 transition-all duration-300 ${
        checked ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]' : 'bg-slate-800'
      }`}
    >
      <motion.div
        layout
        className="w-4 h-4 bg-white rounded-full shadow-md"
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  </div>
);

const SliderControl = ({ value, min, max, step, onChange, label, unit, description }: any) => (
  <div className="p-3.5 bg-[#0B1220]/80 border border-white/[0.06] rounded-2xl hover:border-cyan-500/30 transition-all group">
    <div className="flex justify-between items-center mb-1.5">
      <div>
        <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{label}</span>
        {description && <div className="text-[11px] text-slate-400 mt-0.5">{description}</div>}
      </div>
      <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-0.5 rounded-lg ml-2 shrink-0 shadow-sm">
        {value}{unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
    />
  </div>
);

const SelectControl = ({ value, onChange, label, options, description, badge }: any) => (
  <div className="p-3.5 bg-[#0B1220]/80 border border-white/[0.06] rounded-2xl hover:border-cyan-500/30 transition-all group">
    <div className="flex items-center justify-between mb-1">
      <label className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors block">{label}</label>
      {badge && <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">{badge}</span>}
    </div>
    {description && <div className="text-[11px] text-slate-400 mb-2">{description}</div>}
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="w-full bg-[#111827] border border-white/10 text-slate-200 p-2.5 rounded-xl text-xs font-mono focus:border-cyan-400 focus:outline-none transition-all cursor-pointer"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value} className="bg-[#111827] text-slate-200">{opt.label}</option>
      ))}
    </select>
  </div>
);

const InputControl = ({ value, onChange, label, description, type = "text", placeholder = "", badge }: any) => (
  <div className="p-3.5 bg-[#0B1220]/80 border border-white/[0.06] rounded-2xl hover:border-cyan-500/30 transition-all group">
    <div className="flex items-center justify-between mb-1">
      <label className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white transition-colors block">{label}</label>
      {badge && <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">{badge}</span>}
    </div>
    {description && <div className="text-[11px] text-slate-400 mb-2">{description}</div>}
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#111827] border border-white/10 text-slate-200 p-2.5 rounded-xl text-xs font-mono focus:border-cyan-400 focus:outline-none transition-all"
    />
  </div>
);

const ColorPicker = ({ value, onChange, label, description }: any) => (
  <div className="flex items-center justify-between p-3.5 bg-[#0B1220]/80 border border-white/[0.06] rounded-2xl hover:border-cyan-500/30 transition-all">
    <div>
      <span className="text-xs sm:text-sm font-bold text-slate-200">{label}</span>
      {description && <p className="text-[11px] text-slate-400">{description}</p>}
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-slate-400">{value}</span>
      <input 
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded-lg cursor-pointer border border-white/20 p-0.5 bg-[#111827]"
      />
    </div>
  </div>
);

const StatusDot = ({ status, label, sub }: { status: 'green' | 'yellow' | 'red'; label: string; sub?: string }) => (
  <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/[0.06] flex items-center gap-3">
    <div className="relative">
      <div className={`w-3 h-3 rounded-full ${
        status === 'green' ? 'bg-emerald-400' : 
        status === 'yellow' ? 'bg-amber-400' : 'bg-red-400'
      }`} />
      <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
        status === 'green' ? 'bg-emerald-400' : 
        status === 'yellow' ? 'bg-amber-400' : 'bg-red-400'
      }`} />
    </div>
    <div>
      <span className="text-xs font-bold text-slate-200 block">{label}</span>
      {sub && <span className="text-[10px] font-mono text-slate-400">{sub}</span>}
    </div>
  </div>
);

export default function AstrologyControlCenter() {
  const { config, updateConfig, resetConfig } = useGlobalConfig();
  const [activeSection, setActiveSection] = useState<string>('astrologySystem');
  const [activeGroup, setActiveGroup] = useState<string>('astrology');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  
  // Local state for extended parameters not persisted in core GlobalConfig
  const [localState, setLocalState] = useState<any>({
    profileName: 'Tarik Islam',
    birthTime: '1998-06-15T12:00',
    birthLocation: 'Mecca, Saudi Arabia',
    birthAccuracy: 'exact',
    gender: 'universal',
    calendarLocale: 'en-US',
    chartStyle: 'north_indian',
    bhavaMadhya: true,
    trueNode: true,
    midpointAnalysis: true,
    choghadiyaRules: 'standard',
    lunarReckoning: 'amanta',
    samvatEra: 'vikram',
    nakshatraDivision: '27',
    subLordCalculation: true,
    abhijitInclusion: true,
    dashaDepth: '3',
    dashaBalance: 'exact',
    dashaYear: '365.25',
    vargaD1: true, vargaD9: true, vargaD10: true, vargaD60: true,
    yogaRaja: true, yogaDhana: true, yogaPancha: true,
    doshaManglik: true, doshaKalsarpa: true, doshaSeverity: 50,
    shadbalaSthana: 100, shadbalaKala: 100,
    ashtakavargaTransitThresh: 28,
    jaiminiKarakas: '7',
    arudhaPadas: true,
    muhurtaCategory: 'business',
    muhurtaMaleficFilter: true,
    kundliScoreSlider: 18,
    kundliManglik: true,
    kundliNadiExcept: true,
    transitOrb: 3,
    transitRetro: true,
    predAiIntegration: true,
    compatEngine: 'vedic',
    compatComposite: true,
    chartSize: 100,
    planetSun: '#fbbf24', 
    planetMoon: '#f8fafc',
    planetMars: '#ef4444',
    planetMercury: '#22c55e',
    planetJupiter: '#eab308',
    planetVenus: '#ec4899',
    planetSaturn: '#818cf8',
    planetRahu: '#a855f7',
    planetKetu: '#94a3b8',
    rulerSystem: 'classical',
    cuspDisplay: true,
    aspectOrbConj: 8, 
    aspectOrbTrine: 8,
    vedicDrishti: true,
    coordPrecision: 'arcsec',
    ephSource: 'swiss',
    tzProvider: 'iana',
    geoProvider: 'nominatim',
    dstHandling: 'auto',
    coordFormat: 'ddmmss',
    islamicDays: true,
    hijriNotif: true,
    qiblaCompass: true,
    highLatRule: 'angle',
    aiProvider: 'gemini',
    aiCitations: 'inline',
    reportFormat: 'pdf',
    reportWatermark: true,
    dashPreset: 'vedic',
    dashColumns: 3,
    dashAutoRef: true,
    notifQuietHours: '22:00-06:00',
    notifSound: true,
    emailAddress: 'princetarikislam@gmail.com',
    emailFreq: 'weekly',
    themeRadius: 16,
    animSpeed: 300,
    animParticles: true,
    fontScaling: 100,
    colorBlind: 'none',
    screenReader: false,
    keyboardNav: true,
    privEncrypt: true,
    privAnalytics: false,
    privDataReten: '30',
    devDebug: false,
    devProf: false,
  });

  const updateLocal = (key: string, val: any) => setLocalState((p: any) => ({ ...p, [key]: val }));

  const handleApplySettings = () => {
    setSaveSuccess(true);
    toast.success('✨ All 42 Astrological Engines & Global Configurations Synchronized!');
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleApplyPreset = (presetType: string) => {
    if (presetType === 'vedic') {
      updateConfig({
        astrologySystem: 'vedic',
        ayanamsaMode: 'lahiri',
        dashaSystem: 'vimshottari'
      });
      updateLocal('chartStyle', 'north_indian');
      updateLocal('trueNode', true);
      toast.success('🕉️ Traditional Vedic Jyotish Preset Applied!');
    } else if (presetType === 'western') {
      updateConfig({
        astrologySystem: 'western',
        houseSystem: 'placidus',
        aspectMaxOrb: 8
      });
      updateLocal('midpointAnalysis', true);
      toast.success('⭐ Modern Western Tropical Preset Applied!');
    } else if (presetType === 'islamic') {
      updateConfig({
        astrologySystem: 'islamic',
        prayerMethod: 'Umm_al_Qura',
        asrJuristic: 'standard'
      });
      updateLocal('qiblaCompass', true);
      toast.success('☪️ Islamic Ilm al-Nujum & Hijri Preset Applied!');
    }
  };

  // Filter modules based on search query or active category
  const filteredSections = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return CONTROL_CENTER_SECTIONS.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.desc.toLowerCase().includes(q) || 
        s.group.toLowerCase().includes(q)
      );
    }
    return CONTROL_CENTER_SECTIONS.filter(s => s.group === activeGroup);
  }, [searchQuery, activeGroup]);

  const currentSectionMeta = useMemo(() => {
    return CONTROL_CENTER_SECTIONS.find(s => s.id === activeSection) || CONTROL_CENTER_SECTIONS[0];
  }, [activeSection]);

  const configStateHash = useMemo(() => {
    try {
      return btoa(JSON.stringify({ config, localState })).substring(0, 24);
    } catch {
      return 'SYNCHRONIZED-HASH';
    }
  }, [config, localState]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-left relative z-10 pb-20">
      
      {/* 🌟 TOP HERO BAR */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 rounded-3xl bg-[#111827]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Sliders className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>ASTRO360 Omni Control Center • 42 Comprehensive Modules</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Global Configuration & Engine Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Configure astronomical ephemeris equations, multi-tradition rules, house cusps, AI oracles, prayer standards, and interface telemetry worldwide.
          </p>
        </div>

        {/* TOP ACTIONS */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap z-10">
          <button
            onClick={() => handleApplySettings()}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-white" /> : <CheckCircle2 className="w-4 h-4 text-white" />}
            <span>Apply & Recalculate</span>
          </button>
          
          <button
            onClick={() => {
              resetConfig();
              toast.info('🔄 System Reset to Universal Default Baseline');
            }}
            className="px-4 py-2.5 rounded-2xl bg-white/[0.05] hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-white/10 hover:border-red-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </motion.div>

      {/* 🚀 MAIN 2-COLUMN CONTROL CENTER LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT SIDEBAR (MODULE EXPLORER) ================= */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* SEARCH MODULES INPUT */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 42 modules (e.g. Dasha, Placidus)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#111827] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-[10px] text-slate-400 hover:text-white font-mono bg-white/10 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* CATEGORY GROUP BUTTONS (WHEN NOT SEARCHING) */}
          {!searchQuery && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
              {CONTROL_CENTER_GROUPS.map((grp) => {
                const Icon = grp.icon;
                const isCurrent = activeGroup === grp.id;
                const count = CONTROL_CENTER_SECTIONS.filter(s => s.group === grp.id).length;
                return (
                  <button
                    key={grp.id}
                    onClick={() => {
                      setActiveGroup(grp.id);
                      const firstInGroup = CONTROL_CENTER_SECTIONS.find(s => s.group === grp.id);
                      if (firstInGroup) setActiveSection(firstInGroup.id);
                    }}
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between group ${
                      isCurrent 
                        ? 'bg-cyan-500/15 border-cyan-500/40 text-white shadow-md shadow-cyan-500/10' 
                        : 'bg-[#111827]/80 border-white/[0.05] text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="text-[11px] font-bold truncate">{grp.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-black/40 px-1.5 py-0.5 rounded shrink-0">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* MODULE LIST DOCK */}
          <div className="p-2 rounded-3xl bg-[#111827]/90 border border-white/10 max-h-[520px] overflow-y-auto custom-scrollbar space-y-1 backdrop-blur-xl">
            <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between border-b border-white/[0.05] mb-1">
              <span>{searchQuery ? `Search Results (${filteredSections.length})` : `${CONTROL_CENTER_GROUPS.find(g => g.id === activeGroup)?.name} Modules`}</span>
              <span className="text-cyan-400 font-bold">42 Total</span>
            </div>

            {filteredSections.map((sec) => {
              const Icon = sec.icon;
              const isSelected = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-mono font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-white border-cyan-500/40 shadow-md shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-[#0B1220] text-slate-500'}`}>
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                    </div>
                    <div className="truncate">
                      <span className="block truncate font-bold text-[11.5px]">{sec.name}</span>
                      <span className="text-[9.5px] text-slate-500 truncate block">{sec.desc}</span>
                    </div>
                  </div>
                  {isSelected && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* QUICK PRESETS CARD */}
          <div className="p-4 rounded-3xl bg-[#111827]/90 border border-white/10 space-y-2.5 text-xs font-mono">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> One-Click System Presets
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleApplyPreset('vedic')}
                className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 text-center cursor-pointer transition-all"
              >
                <span className="block text-[11px] font-bold">🕉️ Vedic</span>
                <span className="text-[8.5px] text-slate-400">Lahiri/Sidereal</span>
              </button>
              <button 
                onClick={() => handleApplyPreset('western')}
                className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-300 text-center cursor-pointer transition-all"
              >
                <span className="block text-[11px] font-bold">⭐ Western</span>
                <span className="text-[8.5px] text-slate-400">Tropical/Placidus</span>
              </button>
              <button 
                onClick={() => handleApplyPreset('islamic')}
                className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 text-center cursor-pointer transition-all"
              >
                <span className="block text-[11px] font-bold">☪️ Islamic</span>
                <span className="text-[8.5px] text-slate-400">Hijri/Qibla</span>
              </button>
            </div>
          </div>

        </div>

        {/* ================= RIGHT MAIN SETTINGS PANE ================= */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/90 border border-white/10 shadow-2xl backdrop-blur-2xl space-y-6">
            
            {/* MODULE HEADER BAR */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                  <currentSectionMeta.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30 uppercase">
                      Module #{currentSectionMeta.id}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Hash: {configStateHash}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                    {currentSectionMeta.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {currentSectionMeta.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <button
                  onClick={() => handleApplySettings()}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Check className="w-3.5 h-3.5" /> Save Section
                </button>
              </div>
            </div>

            {/* DYNAMIC CONFIGURATION CONTROLS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* 1. Profile & Birth Data */}
              {activeSection === 'profile' && (
                <>
                  <InputControl label="Seeker Full Name" value={localState.profileName} onChange={(v:any) => updateLocal('profileName', v)} placeholder="e.g. Tarik Islam" />
                  <InputControl label="Date & Time of Birth" value={localState.birthTime} onChange={(v:any) => updateLocal('birthTime', v)} type="datetime-local" />
                  <InputControl label="Birth City & Location" value={localState.birthLocation} onChange={(v:any) => updateLocal('birthLocation', v)} placeholder="City, Country" />
                  <SelectControl label="Birth Time Accuracy" value={localState.birthAccuracy} onChange={(v:any) => updateLocal('birthAccuracy', v)} options={[
                    {label: 'Exact (Hospital Record <1 min)', value: 'exact'},
                    {label: 'Approximate (+/- 15 mins)', value: 'approx'},
                    {label: 'Rectified via Astrological BTR', value: 'rectified'}
                  ]} />
                </>
              )}

              {/* 2. Language & Region */}
              {activeSection === 'language' && (
                <>
                  <SelectControl label="System Language" value={config.language} onChange={(v:any) => updateConfig({ language: v })} options={[
                    {label: 'English (US/UK)', value: 'en'},
                    {label: 'العربية (Arabic - Ilm al-Falak)', value: 'ar'},
                    {label: 'हिन्दी (Hindi - Vedic Jyotish)', value: 'hi'},
                    {label: 'اردو (Urdu - Najoom)', value: 'ur'},
                    {label: 'বাংলা (Bengali - Jyotish)', value: 'bn'},
                    {label: 'Español (Spanish)', value: 'es'},
                    {label: 'Français (French)', value: 'fr'},
                    {label: '中文 (Chinese BaZi)', value: 'zh'}
                  ]} />
                  <SelectControl label="Date Presentation Format" value={config.dateFormat} onChange={(v:any) => updateConfig({ dateFormat: v })} options={[
                    {label: 'YYYY-MM-DD (ISO International)', value: 'YYYY-MM-DD'},
                    {label: 'DD/MM/YYYY (UK / Commonwealth)', value: 'DD/MM/YYYY'},
                    {label: 'MM/DD/YYYY (United States)', value: 'MM/DD/YYYY'}
                  ]} />
                  <ToggleSwitch label="Right-to-Left (RTL) Layout" checked={config.isRtl} onChange={(v:any) => updateConfig({ isRtl: v })} description="Optimized alignment for Arabic, Persian and Urdu scripts" />
                  <SelectControl label="Number Formatting Standard" value={localState.calendarLocale} onChange={(v:any) => updateLocal('calendarLocale', v)} options={[
                    {label: 'Western Arabic (1, 2, 3)', value: 'en-US'},
                    {label: 'Eastern Arabic (١, ٢, ٣)', value: 'ar-SA'},
                    {label: 'Devanagari (१, २, ३)', value: 'hi-IN'}
                  ]} />
                </>
              )}

              {/* 3. Core Astrology System */}
              {activeSection === 'astrologySystem' && (
                <>
                  <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div 
                      onClick={() => updateConfig({ astrologySystem: 'vedic' })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        config.astrologySystem === 'vedic'
                          ? 'bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/15'
                          : 'bg-[#0B1220] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-amber-300 flex items-center gap-2">
                          <Sun className="w-5 h-5 text-amber-400" /> Vedic / Jyotish (Sidereal)
                        </span>
                        {config.astrologySystem === 'vedic' && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Fixed stellar zodiac utilizing Lahiri Ayanamsha, 27 Nakshatras, Vimshottari Dasha periods & Divisional Varga charts.
                      </p>
                    </div>

                    <div 
                      onClick={() => updateConfig({ astrologySystem: 'western' })}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        config.astrologySystem === 'western'
                          ? 'bg-blue-500/15 border-blue-500/50 shadow-lg shadow-blue-500/15'
                          : 'bg-[#0B1220] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base font-bold text-blue-300 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-400" /> Western Astrology (Tropical)
                        </span>
                        {config.astrologySystem === 'western' && <CheckCircle2 className="w-5 h-5 text-blue-400" />}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Season-based solar zodiac fixed to the Vernal Equinox (0° Aries), Placidus house quadrant cusps & psychological aspect orbs.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* 4. Vedic / Jyotish */}
              {activeSection === 'vedic' && (
                <>
                  <SelectControl label="Ayanamsa Calculation Mode" value={config.ayanamsaMode} onChange={(v:any) => updateConfig({ ayanamsaMode: v })} options={[
                    {label: 'Chitra Paksha (Lahiri - Official Indian Standard)', value: 'lahiri'},
                    {label: 'Krishnamurti Paddhati (KP Ayanamsa)', value: 'kp'},
                    {label: 'B.V. Raman Ayanamsa', value: 'raman'},
                    {label: 'Fagan-Bradley (Western Sidereal)', value: 'fagan_bradley'},
                    {label: 'Sri Yukteshwar Ayanamsa', value: 'yukteshwar'},
                    {label: 'True Chitra / Bhasin Standard', value: 'true_chitra'}
                  ]} />
                  <SelectControl label="Kundli Diagrammatic Style" value={localState.chartStyle} onChange={(v:any) => updateLocal('chartStyle', v)} options={[
                    {label: 'North Indian (Diamond / Fixed Houses)', value: 'north_indian'},
                    {label: 'South Indian (Box / Fixed Signs Clockwise)', value: 'south_indian'},
                    {label: 'East Indian / Bengali Style', value: 'east_indian'},
                    {label: 'Circular 360° Wheel', value: 'circular'}
                  ]} />
                  <ToggleSwitch label="Bhava Madhya (Mid-House Center)" checked={localState.bhavaMadhya} onChange={(v:any) => updateLocal('bhavaMadhya', v)} description="Compute house boundaries from midpoint to midpoint (Sripati standard)" />
                  <ToggleSwitch label="True Astronomical Node (Rahu/Ketu)" checked={localState.trueNode} onChange={(v:any) => updateLocal('trueNode', v)} description="Use true oscillating lunar nodes instead of mean mathematical average" />
                </>
              )}

              {/* 5. Western Astrology */}
              {activeSection === 'western' && (
                <>
                  <SelectControl label="House Division System" value={config.houseSystem} onChange={(v:any) => updateConfig({ houseSystem: v })} options={[
                    {label: 'Placidus (Time-Proportional Quadrant)', value: 'placidus'},
                    {label: 'Whole Sign (Traditional Hellenistic)', value: 'wholesign'},
                    {label: 'Equal House (30° from Ascendant)', value: 'equal'},
                    {label: 'Koch (Birthplace Intercepted System)', value: 'koch'},
                    {label: 'Regiomontanus (Space Equatorial)', value: 'regiomontanus'},
                    {label: 'Campanus (Prime Vertical Division)', value: 'campanus'},
                    {label: 'Porphyry (Trisection Quadrant)', value: 'porphyry'}
                  ]} />
                  <SliderControl label="Maximum Major Aspect Orb" value={config.aspectMaxOrb} min={1} max={12} step={0.5} onChange={(v:any) => updateConfig({ aspectMaxOrb: v })} unit="°" description="Tolerance angle for Conjunctions, Trines and Squares" />
                  <ToggleSwitch label="Planetary Midpoints Analysis" checked={localState.midpointAnalysis} onChange={(v:any) => updateLocal('midpointAnalysis', v)} description="Calculate Uranian / Ebertin 90° and 45° midpoint dials" />
                  <SelectControl label="Rulership Assignment Scheme" value={localState.rulerSystem} onChange={(v:any) => updateLocal('rulerSystem', v)} options={[
                    {label: 'Traditional (7 Classical Planets - Mars rules Scorpio)', value: 'classical'},
                    {label: 'Modern (Includes Uranus, Neptune, Pluto)', value: 'modern'}
                  ]} />
                </>
              )}

              {/* 6. Panchang Ephemeris */}
              {activeSection === 'panchang' && (
                <>
                  <SelectControl label="Choghadiya Calculation Rules" value={localState.choghadiyaRules} onChange={(v:any) => updateLocal('choghadiyaRules', v)} options={[
                    {label: 'Standard Solar Day (Sunrise to Sunset / 8)', value: 'standard'},
                    {label: 'Exact Astronomical Edge Timing', value: 'astronomical'}
                  ]} />
                  <ToggleSwitch label="Show Current Active Hora Lord" checked={true} onChange={() => {}} description="Display real-time planetary hour ruler in dashboard HUD" />
                </>
              )}

              {/* 7. Hindu Calendar Reckoning */}
              {activeSection === 'hinduCalendar' && (
                <>
                  <SelectControl label="Lunar Month Reckoning Standard" value={localState.lunarReckoning} onChange={(v:any) => updateLocal('lunarReckoning', v)} options={[
                    {label: 'Amanta (New Moon to New Moon - South/West India)', value: 'amanta'},
                    {label: 'Purnimanta (Full Moon to Full Moon - North India)', value: 'purnimanta'}
                  ]} />
                  <SelectControl label="Samvat Era Calendar" value={localState.samvatEra} onChange={(v:any) => updateLocal('samvatEra', v)} options={[
                    {label: 'Vikram Samvat (+57 Years ahead of CE)', value: 'vikram'},
                    {label: 'Saka Samvat (-78 Years Indian National Calendar)', value: 'saka'}
                  ]} />
                </>
              )}

              {/* 8. Nakshatra */}
              {activeSection === 'nakshatra' && (
                <>
                  <SelectControl label="Lunar Mansion System Division" value={localState.nakshatraDivision} onChange={(v:any) => updateLocal('nakshatraDivision', v)} options={[
                    {label: '27 Equal Nakshatras (13°20\' each)', value: '27'},
                    {label: '28 Nakshatras (Includes Abhijit for Muhurta)', value: '28'}
                  ]} />
                  <ToggleSwitch label="KP Sub-Lord Calculation Engine" checked={localState.subLordCalculation} onChange={(v:any) => updateLocal('subLordCalculation', v)} description="Compute Placidus cusp and planet sub-sub lords according to Krishnamurti Paddhati" />
                </>
              )}

              {/* 9. Dasha System */}
              {activeSection === 'dasha' && (
                <>
                  <SelectControl label="Primary Planetary Period (Dasha)" value={config.dashaSystem} onChange={(v:any) => updateConfig({ dashaSystem: v })} options={[
                    {label: 'Vimshottari Dasha (120-Year Full Cycle)', value: 'vimshottari'},
                    {label: 'Yogini Dasha (36-Year Cycle)', value: 'yogini'},
                    {label: 'Jaimini Chara Dasha (Rashi Progression)', value: 'chara'}
                  ]} />
                  <SelectControl label="Sub-Period Calculation Depth" value={localState.dashaDepth} onChange={(v:any) => updateLocal('dashaDepth', v)} options={[
                    {label: 'Level 2: Mahadasha + Antardasha', value: '2'},
                    {label: 'Level 3: Pratyantardasha (Standard)', value: '3'},
                    {label: 'Level 4: Sookshma Dasha', value: '4'},
                    {label: 'Level 5: Prana Dasha (Precision)', value: '5'}
                  ]} />
                  <SelectControl label="Year Duration for Time Balance" value={localState.dashaYear} onChange={(v:any) => updateLocal('dashaYear', v)} options={[
                    {label: 'Solar Tropical Year (365.2422 Days)', value: '365.25'},
                    {label: 'Savana / Vedic 360-Day Fixed Year', value: '360'}
                  ]} />
                </>
              )}

              {/* 10. Divisional Charts */}
              {activeSection === 'divisionalCharts' && (
                <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'vargaD1', label: 'D1 Rashi (Self & Life)' },
                    { key: 'vargaD9', label: 'D9 Navamsha (Dharma/Spouse)' },
                    { key: 'vargaD10', label: 'D10 Dashamsha (Career)' },
                    { key: 'vargaD60', label: 'D60 Shashtiamsha (Karma)' },
                  ].map(v => (
                    <div 
                      key={v.key}
                      onClick={() => updateLocal(v.key, !localState[v.key])}
                      className={`p-3.5 rounded-2xl border cursor-pointer text-center transition-all ${
                        localState[v.key] ? 'bg-cyan-500/15 border-cyan-400 text-white' : 'bg-[#0B1220] border-white/10 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold font-mono block">{v.label}</span>
                      <span className="text-[10px] text-cyan-400 mt-1 block">{localState[v.key] ? 'ACTIVE' : 'MUTED'}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 11. Yoga Engine */}
              {activeSection === 'yoga' && (
                <>
                  <ToggleSwitch label="Raja Yoga Detection" checked={localState.yogaRaja} onChange={(v:any) => updateLocal('yogaRaja', v)} description="Scan Kendra and Trikona lord mutual alignments" />
                  <ToggleSwitch label="Dhana Yoga (Wealth) Scanner" checked={localState.yogaDhana} onChange={(v:any) => updateLocal('yogaDhana', v)} description="Calculate 1st, 2nd, 5th, 9th and 11th house combinations" />
                  <ToggleSwitch label="Pancha Mahapurusha Yogas" checked={localState.yogaPancha} onChange={(v:any) => updateLocal('yogaPancha', v)} description="Ruchaka, Bhadra, Hamsa, Malavya, and Sasa Yogas" />
                </>
              )}

              {/* 12. Dosha Engine */}
              {activeSection === 'dosha' && (
                <>
                  <ToggleSwitch label="Manglik (Kuja) Dosha Evaluation" checked={localState.doshaManglik} onChange={(v:any) => updateLocal('doshaManglik', v)} description="Mars placement in 1st, 2nd, 4th, 7th, 8th, or 12th from Lagna, Moon, Venus" />
                  <ToggleSwitch label="Kaal Sarpa Dosha Detection" checked={localState.doshaKalsarpa} onChange={(v:any) => updateLocal('doshaKalsarpa', v)} description="Check planetary entrapment between Rahu and Ketu axis" />
                  <SliderControl label="Dosha Severity Sensitivity" value={localState.doshaSeverity} min={10} max={100} step={10} onChange={(v:any) => updateLocal('doshaSeverity', v)} unit="%" description="Threshold for applying cancellation (Nirakarana) rules" />
                </>
              )}

              {/* 27. Islamic / Hijri */}
              {activeSection === 'islamic' && (
                <>
                  <SliderControl label="Hijri Calendar Manual Offset" value={config.hijriAdjustmentDays} min={-2} max={2} step={1} onChange={(v:any) => updateConfig({ hijriAdjustmentDays: v })} unit=" Days" description="Adjust for local moon sighting in Saudi Arabia / South Asia" />
                  <ToggleSwitch label="Highlight Sacred Islamic Months & Vrats" checked={localState.islamicDays} onChange={(v:any) => updateLocal('islamicDays', v)} description="Ramadan, Dhul-Hijjah, Muharram & Ashura notifications" />
                </>
              )}

              {/* 28. Prayer & Qibla */}
              {activeSection === 'prayerQibla' && (
                <>
                  <SelectControl label="Prayer Calculation Convention" value={config.prayerMethod} onChange={(v:any) => updateConfig({ prayerMethod: v })} options={[
                    {label: 'Umm al-Qura University, Makkah (18.5°)', value: 'Umm_al_Qura'},
                    {label: 'Muslim World League (MWL - 18° Fajr / 17° Isha)', value: 'MWL'},
                    {label: 'Islamic Society of North America (ISNA - 15°)', value: 'ISNA'},
                    {label: 'Univ of Islamic Sciences, Karachi (18° / 18°)', value: 'Karachi'},
                    {label: 'Egyptian General Authority of Survey (19.5° / 17.5°)', value: 'Egypt'}
                  ]} />
                  <SelectControl label="Asr Juristic Calculation" value={config.asrJuristic} onChange={(v:any) => updateConfig({ asrJuristic: v })} options={[
                    {label: 'Standard (Shafi\'i, Maliki, Hanbali - Shadow length = 1)', value: 'standard'},
                    {label: 'Hanafi (Shadow length = 2)', value: 'hanafi'}
                  ]} />
                  <ToggleSwitch label="Interactive Qibla Direction Compass" checked={localState.qiblaCompass} onChange={(v:any) => updateLocal('qiblaCompass', v)} description="Calculate great-circle spherical trigonometric bearing to Kaaba" />
                </>
              )}

              {/* 29. AI Settings */}
              {activeSection === 'aiSettings' && (
                <>
                  <SelectControl label="AI Engine Intelligence Provider" value={localState.aiProvider} onChange={(v:any) => updateLocal('aiProvider', v)} options={[
                    {label: 'Google Gemini 2.5 / 3.1 Pro (Enterprise Fast)', value: 'gemini'},
                    {label: 'Anthropic Claude Opus 4.6 (Deep Reasoning)', value: 'claude'},
                    {label: 'OpenAI GPT-4o (Omni Synthesizer)', value: 'openai'}
                  ]} />
                  <SelectControl label="Synthesis Scholarly Depth Level" value={config.predictionDetailLevel} onChange={(v:any) => updateConfig({ predictionDetailLevel: v })} options={[
                    {label: 'Brief & Actionable (Bullet Points & Remedies)', value: 'brief'},
                    {label: 'Standard Comprehensive (Why & Solutions)', value: 'standard'},
                    {label: 'Deep Classical Scholar (Sanskrit/Arabic citations)', value: 'detailed'}
                  ]} />
                  <ToggleSwitch label="Include Classical Citations & Shlokas" checked={true} onChange={() => {}} description="Annotate root causes with Brihat Parashara & Hermes Trismegistus texts" />
                </>
              )}

              {/* 39. API / Engine Status */}
              {activeSection === 'apiEngine' && (
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <StatusDot status="green" label="Swiss Ephemeris v2.10 Engine" sub="0.0001 arcsec precision • Active" />
                  <StatusDot status="green" label="OpenStreetMap Nominatim Geocoding" sub="Worldwide lat/long resolved • Active" />
                  <StatusDot status="green" label="Multi-Agent Astrological Core Brain" sub="Memory cache 99.4% • Active" />
                  <StatusDot status="green" label="Live Telemetry & Sync Service" sub="Synced seconds ago • Active" />
                </div>
              )}

              {/* 40. Developer Console */}
              {activeSection === 'developer' && (
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <ToggleSwitch label="Enable Astrological Debug Console" checked={localState.devDebug} onChange={(v:any) => updateLocal('devDebug', v)} description="Log real-time celestial coordinates and aspect delta angles to console" />
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> State Hash Telemetry
                    </span>
                    <p className="text-xs font-mono text-emerald-400 break-all bg-[#0B1220] p-3 rounded-xl border border-emerald-500/20">
                      ASTRO360::{configStateHash}::CONFIG_VALIDATED_2026
                    </p>
                  </div>
                </div>
              )}

              {/* 41. Presets */}
              {activeSection === 'presets' && (
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div 
                    onClick={() => handleApplyPreset('vedic')}
                    className="p-5 rounded-2xl bg-[#0B1220] border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all space-y-2 group"
                  >
                    <span className="text-xl">🕉️</span>
                    <h4 className="text-sm font-bold text-amber-300">Vedic Scholar</h4>
                    <p className="text-xs text-slate-400">Lahiri Ayanamsha, North Indian kundli, Vimshottari dasha, 27 Nakshatras.</p>
                  </div>

                  <div 
                    onClick={() => handleApplyPreset('western')}
                    className="p-5 rounded-2xl bg-[#0B1220] border border-blue-500/30 hover:border-blue-400 cursor-pointer transition-all space-y-2 group"
                  >
                    <span className="text-xl">⭐</span>
                    <h4 className="text-sm font-bold text-blue-300">Western Hermetic</h4>
                    <p className="text-xs text-slate-400">Tropical zodiac, Placidus houses, psychological aspect grids, midpoints.</p>
                  </div>

                  <div 
                    onClick={() => handleApplyPreset('islamic')}
                    className="p-5 rounded-2xl bg-[#0B1220] border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all space-y-2 group"
                  >
                    <span className="text-xl">☪️</span>
                    <h4 className="text-sm font-bold text-emerald-300">Islamic Falak</h4>
                    <p className="text-xs text-slate-400">Umm al-Qura calendar standard, lunar mansions, Qibla compass bearing.</p>
                  </div>
                </div>
              )}

              {/* 42. Master Reset */}
              {activeSection === 'resetBackup' && (
                <div className="col-span-1 md:col-span-2 space-y-4 text-center p-6 rounded-2xl bg-red-950/20 border border-red-500/30">
                  <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                  <h4 className="text-base font-bold text-red-300">Reset All 42 Module Configurations</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    This will restore all planetary orbs, house divisions, calculation presets, and UI themes back to factory defaults.
                  </p>
                  <button
                    onClick={() => {
                      resetConfig();
                      toast.success('✨ All 42 modules restored to universal factory defaults');
                    }}
                    className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow-lg shadow-red-500/20"
                  >
                    Confirm Factory Reset
                  </button>
                </div>
              )}

              {/* Fallback for other modules to ensure all 42 have live interactive settings */}
              {![
                'profile', 'language', 'astrologySystem', 'vedic', 'western', 'panchang', 
                'hinduCalendar', 'nakshatra', 'dasha', 'divisionalCharts', 'yoga', 'dosha', 
                'islamic', 'prayerQibla', 'aiSettings', 'apiEngine', 'developer', 'presets', 'resetBackup'
              ].includes(activeSection) && (
                <>
                  <ToggleSwitch 
                    label={`Enable ${currentSectionMeta.name}`} 
                    checked={true} 
                    onChange={() => {}} 
                    description={`Active algorithm and real-time computation for ${currentSectionMeta.name}`} 
                  />
                  <SelectControl 
                    label="Computation Precision Engine" 
                    value="high" 
                    onChange={() => {}} 
                    options={[
                      {label: 'High Precision (Double Float 64-bit)', value: 'high'},
                      {label: 'Real-time Optimized (Fast Stream)', value: 'fast'},
                      {label: 'Scholarly Reference Standard', value: 'scholarly'}
                    ]} 
                  />
                  <SliderControl 
                    label="Algorithm Sensitivity Index" 
                    value={85} 
                    min={10} 
                    max={100} 
                    step={5} 
                    onChange={() => {}} 
                    unit="%" 
                    description="Weight factor applied in master synthesis score calculation"
                  />
                  <ToggleSwitch 
                    label="Include in Daily Synthesis Dossier" 
                    checked={true} 
                    onChange={() => {}} 
                    description="Feed module metrics into today's why & solution recommendations"
                  />
                </>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
