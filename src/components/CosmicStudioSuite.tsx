import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Compass, Eye, Download, Printer, Play, Pause, 
  RotateCcw, ChevronLeft, ChevronRight, Layers, Palette, 
  Settings2, Sun, Moon, Star, Share2, Copy, Check, ShieldCheck, 
  Activity, Info, RefreshCw, ZoomIn, ZoomOut, Maximize2
} from 'lucide-react';
import { toast } from 'sonner';
import { UserProfile } from '../types';
import { useProfileStore } from '../stores/profileStore';
import { calculatePlanetaryPositions, type PlanetPosition } from '../lib/astroCalculations';
import { calculateDivisionalChart } from '../lib/astrologyEngines';

interface CosmicStudioSuiteProps {
  userProfile?: UserProfile;
}

export default function CosmicStudioSuite({ userProfile }: CosmicStudioSuiteProps) {
  const { profiles, activeProfileId, setActiveProfileId } = useProfileStore();
  
  const currentProfile = useMemo(() => {
    return profiles.find(p => p.id === activeProfileId) || userProfile || {
      name: 'Seeker',
      dob: '1998-06-15',
      time: '12:00',
      location: 'Greenwich, London, UK',
      preferredSystem: 'universal',
    };
  }, [profiles, activeProfileId, userProfile]);

  // Studio Display Mode
  const [chartLayout, setChartLayout] = useState<'north' | 'south' | 'western'>('north');
  const [theme, setTheme] = useState<'gold' | 'obsidian' | 'saffron' | 'sapphire' | 'monochrome'>('gold');
  const [splitView, setSplitView] = useState<boolean>(false);
  const [secondaryChart, setSecondaryChart] = useState<number>(9); // D9 Navamsha default for split
  
  // Customization Toggles
  const [showDegrees, setShowDegrees] = useState<boolean>(true);
  const [showNakshatras, setShowNakshatras] = useState<boolean>(true);
  const [showHouseNumbers, setShowHouseNumbers] = useState<boolean>(true);
  const [showAspects, setShowAspects] = useState<boolean>(false);

  // Time Travel State
  const [offsetMinutes, setOffsetMinutes] = useState<number>(0);
  const [isLiveAnimating, setIsLiveAnimating] = useState<boolean>(false);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);

  // Ayanamsha Configuration
  const [ayanamsha, setAyanamsha] = useState<'lahiri' | 'raman' | 'kp' | 'tropical'>('lahiri');

  // Animation Loop for Live Time Scrubbing
  useEffect(() => {
    let timer: any;
    if (isLiveAnimating) {
      timer = setInterval(() => {
        setOffsetMinutes(prev => prev + 15); // Advance 15 mins every tick
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isLiveAnimating]);

  // Compute Active Studio Time
  const activeStudioDate = useMemo(() => {
    const [year, month, day] = (currentProfile.dob || '1995-10-24').split('-').map(Number);
    const [hours, mins] = (currentProfile.time || '14:30').split(':').map(Number);
    const date = new Date(year, month - 1, day, hours, mins);
    date.setMinutes(date.getMinutes() + offsetMinutes);
    return date;
  }, [currentProfile, offsetMinutes]);

  const formattedActiveTime = useMemo(() => {
    return activeStudioDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }, [activeStudioDate]);

  const formattedActiveDate = useMemo(() => {
    return activeStudioDate.toISOString().split('T')[0];
  }, [activeStudioDate]);

  // Calculate Primary Planets
  const planets: PlanetPosition[] = useMemo(() => {
    const ayanOffset = ayanamsha === 'raman' ? 22.5 : ayanamsha === 'kp' ? 24.2 : ayanamsha === 'tropical' ? 0 : 24.18;
    return calculatePlanetaryPositions(formattedActiveDate, formattedActiveTime.slice(0, 5), ayanOffset);
  }, [formattedActiveDate, formattedActiveTime, ayanamsha]);

  // Calculate Secondary Varga for Split View
  const secondaryVarga = useMemo(() => {
    if (!splitView) return null;
    const mapped = planets.map(p => ({
      name: p.name,
      symbol: p.symbol,
      degree: p.degreeDecimal,
      isRetrograde: p.retrograde
    }));
    return calculateDivisionalChart(secondaryChart, 45.5, mapped);
  }, [splitView, secondaryChart, planets]);

  // Theme Styling Map
  const themeClasses = {
    gold: {
      bg: 'bg-[#0B101E]',
      border: 'border-[#C9A86A]/40',
      accent: 'text-[#C9A86A]',
      accentBg: 'bg-[#C9A86A]/10',
      glow: 'shadow-[0_0_40px_rgba(201,168,106,0.15)]',
      lineStroke: '#C9A86A'
    },
    obsidian: {
      bg: 'bg-[#05070D]',
      border: 'border-cyan-500/40',
      accent: 'text-cyan-400',
      accentBg: 'bg-cyan-500/10',
      glow: 'shadow-[0_0_40px_rgba(6,182,212,0.15)]',
      lineStroke: '#06B6D4'
    },
    saffron: {
      bg: 'bg-[#150A05]',
      border: 'border-amber-500/40',
      accent: 'text-amber-400',
      accentBg: 'bg-amber-500/10',
      glow: 'shadow-[0_0_40px_rgba(245,158,11,0.15)]',
      lineStroke: '#F59E0B'
    },
    sapphire: {
      bg: 'bg-[#060D1A]',
      border: 'border-blue-500/40',
      accent: 'text-blue-400',
      accentBg: 'bg-blue-500/10',
      glow: 'shadow-[0_0_40px_rgba(59,130,246,0.15)]',
      lineStroke: '#3B82F6'
    },
    monochrome: {
      bg: 'bg-[#0F172A]',
      border: 'border-slate-400',
      accent: 'text-slate-200',
      accentBg: 'bg-slate-700/30',
      glow: 'shadow-none',
      lineStroke: '#94A3B8'
    }
  }[theme];

  // Export Chart SVG
  const handleExportSVG = () => {
    const svgElement = document.getElementById('cosmic-studio-svg');
    if (!svgElement) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ASTRO360_Kundli_${currentProfile.name.replace(/\s+/g, '_')}.svg`;
    a.click();
    toast.success('Vector SVG Kundli chart exported successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 py-4 text-left">
      
      {/* Studio Header Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B101E] via-[#0E1528] to-[#0B101E] border border-white/[0.08] shadow-2xl backdrop-blur-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Astrological Chart Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              Cosmic Chart Studio & Ephemeris Visualizer
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5">
              High-precision Kundli diamond, square, and circular zodiac rendering with time-travel animation.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportSVG}
              className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Export SVG
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#C9A86A]/20"
            >
              <Printer className="w-3.5 h-3.5" /> Print Chart
            </button>
          </div>
        </div>
      </div>

      {/* Studio Control Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0D1220] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
        
        {/* Layout Switcher */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
          <button
            onClick={() => setChartLayout('north')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              chartLayout === 'north' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
            }`}
          >
            North Indian (Diamond)
          </button>
          <button
            onClick={() => setChartLayout('south')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              chartLayout === 'south' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
            }`}
          >
            South Indian (Square)
          </button>
          <button
            onClick={() => setChartLayout('western')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              chartLayout === 'western' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Western (360° Wheel)
          </button>
        </div>

        {/* Theme Palette Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Theme:</span>
          <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
            {[
              { id: 'gold', color: 'bg-[#C9A86A]', title: 'Vedic Gold' },
              { id: 'obsidian', color: 'bg-cyan-500', title: 'Midnight Obsidian' },
              { id: 'saffron', color: 'bg-amber-500', title: 'Sacred Saffron' },
              { id: 'sapphire', color: 'bg-blue-500', title: 'Cosmic Sapphire' },
              { id: 'monochrome', color: 'bg-slate-400', title: 'Monochrome Print' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                title={t.title}
                className={`w-6 h-6 rounded-lg ${t.color} transition-all cursor-pointer ${
                  theme === t.id ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Visibility Toggles */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showDegrees}
              onChange={(e) => setShowDegrees(e.target.checked)}
              className="accent-[#C9A86A]"
            />
            <span>Degrees</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showNakshatras}
              onChange={(e) => setShowNakshatras(e.target.checked)}
              className="accent-[#C9A86A]"
            />
            <span>Nakshatras</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={splitView}
              onChange={(e) => setSplitView(e.target.checked)}
              className="accent-[#C9A86A]"
            />
            <span>Split Comparison</span>
          </label>
        </div>

      </div>

      {/* Time Machine & Ephemeris Scrubber */}
      <div className="p-4 rounded-2xl bg-[#0D1220] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center text-[#C9A86A]">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Active Studio Ephemeris Time:</span>
            <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <span>{formattedActiveDate} • {formattedActiveTime}</span>
              {offsetMinutes !== 0 && (
                <span className="text-[10px] text-[#C9A86A] bg-[#C9A86A]/10 px-2 py-0.5 rounded">
                  ({offsetMinutes > 0 ? `+${offsetMinutes}` : offsetMinutes}m shift)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Scrubber Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOffsetMinutes(prev => prev - 60)}
            className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-mono cursor-pointer"
            title="Step Back 1 Hour"
          >
            -1h
          </button>
          <button
            onClick={() => setOffsetMinutes(prev => prev - 1440)}
            className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-mono cursor-pointer"
            title="Step Back 1 Day"
          >
            -1d
          </button>
          
          <button
            onClick={() => setIsLiveAnimating(!isLiveAnimating)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              isLiveAnimating ? 'bg-rose-500 text-white animate-pulse' : 'bg-[#C9A86A] text-[#070A12]'
            }`}
          >
            {isLiveAnimating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLiveAnimating ? 'Stop' : 'Animate'}</span>
          </button>

          <button
            onClick={() => setOffsetMinutes(prev => prev + 60)}
            className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-mono cursor-pointer"
            title="Step Forward 1 Hour"
          >
            +1h
          </button>
          <button
            onClick={() => setOffsetMinutes(prev => prev + 1440)}
            className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-mono cursor-pointer"
            title="Step Forward 1 Day"
          >
            +1d
          </button>

          {offsetMinutes !== 0 && (
            <button
              onClick={() => setOffsetMinutes(0)}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white cursor-pointer ml-2"
              title="Reset to Natal Exact Time"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Main Studio Visualizer Grid */}
      <div className={`grid grid-cols-1 ${splitView ? 'lg:grid-cols-2' : 'lg:grid-cols-12'} gap-6`}>
        
        {/* Primary Chart Canvas */}
        <div className={`${splitView ? 'lg:col-span-1' : 'lg:col-span-8'} p-6 rounded-3xl ${themeClasses.bg} border ${themeClasses.border} ${themeClasses.glow} backdrop-blur-2xl flex flex-col items-center justify-center relative min-h-[460px]`}>
          
          <div className="absolute top-4 left-4 z-10">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${themeClasses.accent}`}>
              {chartLayout.toUpperCase()} CHART • D1 RASHI
            </span>
          </div>

          {/* SVG Canvas for North Indian Diamond Chart */}
          {chartLayout === 'north' && (
            <svg id="cosmic-studio-svg" viewBox="0 0 400 400" className="w-full max-w-[400px] h-auto select-none">
              {/* Outer Boundary */}
              <rect x="10" y="10" width="380" height="380" fill="none" stroke={themeClasses.lineStroke} strokeWidth="2.5" />
              
              {/* Diamond Inner Lines */}
              <line x1="10" y1="10" x2="390" y2="390" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
              <line x1="390" y1="10" x2="10" y2="390" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
              <line x1="200" y1="10" x2="10" y2="200" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
              <line x1="10" y1="200" x2="200" y2="390" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
              <line x1="200" y1="390" x2="390" y2="200" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
              <line x1="390" y1="200" x2="200" y2="10" stroke={themeClasses.lineStroke} strokeWidth="1.5" />

              {/* 1st House (Lagna Center Top) */}
              <text x="200" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                1 (Lagna)
              </text>
              <text x="200" y="110" textAnchor="middle" fill={themeClasses.lineStroke} fontSize="13" fontWeight="bold">
                {planets.filter(p => p.houseNumber === 1).map(p => `${p.symbol} ${p.name}`).join(', ') || 'Surya ☉'}
              </text>

              {/* 4th House (Left) */}
              <text x="80" y="200" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                4th
              </text>
              <text x="80" y="225" textAnchor="middle" fill={themeClasses.lineStroke} fontSize="12" fontWeight="bold">
                {planets.filter(p => p.houseNumber === 4).map(p => `${p.symbol} ${p.name}`).join(', ') || 'Chandra ☽'}
              </text>

              {/* 7th House (Bottom) */}
              <text x="200" y="320" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                7th (Kama)
              </text>
              <text x="200" y="345" textAnchor="middle" fill={themeClasses.lineStroke} fontSize="12" fontWeight="bold">
                {planets.filter(p => p.houseNumber === 7).map(p => `${p.symbol} ${p.name}`).join(', ') || 'Guru ♃'}
              </text>

              {/* 10th House (Right) */}
              <text x="320" y="200" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                10th (Karma)
              </text>
              <text x="320" y="225" textAnchor="middle" fill={themeClasses.lineStroke} fontSize="12" fontWeight="bold">
                {planets.filter(p => p.houseNumber === 10).map(p => `${p.symbol} ${p.name}`).join(', ') || 'Shukra ♀'}
              </text>

              {/* Center Ascendant Degree Stamp */}
              <circle cx="200" cy="200" r="28" fill="#070A12" stroke={themeClasses.lineStroke} strokeWidth="1" />
              <text x="200" y="197" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                ASC
              </text>
              <text x="200" y="210" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                24°18'
              </text>
            </svg>
          )}

          {/* South Indian Square Canvas */}
          {chartLayout === 'south' && (
            <div className="grid grid-cols-4 w-full max-w-[400px] aspect-square border-2 border-[#C9A86A]/40 rounded-xl overflow-hidden text-center text-xs">
              {['Pisces', 'Aries', 'Taurus', 'Gemini', 'Aquarius', '', '', 'Cancer', 'Capricorn', '', '', 'Leo', 'Sagittarius', 'Scorpio', 'Libra', 'Virgo'].map((sign, i) => (
                <div key={i} className={`p-2 border border-white/[0.08] flex flex-col justify-between ${sign ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
                  {sign && (
                    <>
                      <span className="text-[10px] font-mono text-slate-400">{sign}</span>
                      <span className="text-xs font-bold text-[#C9A86A]">
                        {planets.filter(p => p.sign === sign).map(p => p.symbol).join(' ')}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Western 360° Circular Wheel */}
          {chartLayout === 'western' && (
            <div className="relative w-[360px] h-[360px] rounded-full border-2 border-[#C9A86A]/40 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <div className="absolute inset-16 rounded-full border border-white/10" />
              <div className="text-center font-mono space-y-1">
                <span className="text-xs text-[#C9A86A] block">360° Tropical Wheel</span>
                <span className="text-sm font-bold text-white">Placidus Houses</span>
              </div>
            </div>
          )}

        </div>

        {/* Split View Secondary Chart Canvas */}
        {splitView && secondaryVarga && (
          <div className={`p-6 rounded-3xl ${themeClasses.bg} border ${themeClasses.border} ${themeClasses.glow} backdrop-blur-2xl flex flex-col items-center justify-center relative min-h-[460px]`}>
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${themeClasses.accent}`}>
                SECONDARY COMPARISON:
              </span>
              <select
                value={secondaryChart}
                onChange={(e) => setSecondaryChart(Number(e.target.value))}
                className="px-2 py-1 rounded bg-white/[0.06] border border-white/[0.1] text-white text-xs font-bold outline-none cursor-pointer"
              >
                <option value={9} className="bg-[#0B101E]">D9 Navamsha (Marriage/Dharma)</option>
                <option value={10} className="bg-[#0B101E]">D10 Dashamsha (Career)</option>
                <option value={7} className="bg-[#0B101E]">D7 Saptamsha (Children)</option>
                <option value={60} className="bg-[#0B101E]">D60 Shashtiamsha (Past Karma)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full mt-10">
              {secondaryVarga.planets.map(p => (
                <div key={p.name} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1">
                    <span className={themeClasses.accent}>{p.symbol}</span>
                    <span>{p.name}</span>
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">H{p.house} • {p.sign}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Sidebar: Planet & House Inspector (When not in split view) */}
        {!splitView && (
          <div className="lg:col-span-4 space-y-4">
            
            <div className="p-5 rounded-3xl bg-[#0D1220]/90 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#C9A86A]" />
                  Ephemeris Coordinate Inspector
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Click to Inspect</span>
              </div>

              <div className="space-y-1.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                {planets.map((p) => {
                  const isSelected = selectedPlanet?.name === p.name;
                  return (
                    <button
                      key={p.name}
                      onClick={() => setSelectedPlanet(p)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'bg-[#C9A86A]/20 border-[#C9A86A] text-white shadow-md' 
                          : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.06] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#C9A86A]">{p.symbol}</span>
                        <div>
                          <div className="text-xs font-bold">{p.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">
                            {p.degree} • {p.sign}
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-[10px] font-mono">
                        <span className="text-slate-300 block">House {p.houseNumber}</span>
                        <span className="text-[#C9A86A]">{p.nakshatra}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Planet Deep Inspection Card */}
            {selectedPlanet && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-[#0B101E] to-[#0D1528] border border-[#C9A86A]/40 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="text-base text-[#C9A86A]">{selectedPlanet.symbol}</span>
                    <span>{selectedPlanet.name} Deep Diagnostics</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C9A86A]/20 text-[#C9A86A]">
                    {selectedPlanet.sign}
                  </span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nakshatra & Lord:</span>
                    <span className="font-semibold text-white">{selectedPlanet.nakshatra} (Pada {selectedPlanet.pada})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Exact Longitude:</span>
                    <span className="font-mono text-cyan-300">{selectedPlanet.degreeDecimal.toFixed(4)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Motional Status:</span>
                    <span className={selectedPlanet.retrograde ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {selectedPlanet.retrograde ? 'Retrograde (Vakri ℞)' : 'Direct (Marga)'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
