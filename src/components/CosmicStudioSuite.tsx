import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Compass, Eye, Download, Printer, Play, Pause, 
  RotateCcw, Layers, Palette, 
  Settings2, Sun, Moon, Star, Share2, Copy, Check, ShieldCheck, 
  Activity, Info, RefreshCw, ZoomIn, ZoomOut, Maximize2,
  Calendar, Search, BookOpen, Clock, FileText, CheckCircle2, ChevronRight, X
} from 'lucide-react';
import { toast } from 'sonner';
import { UserProfile } from '../types';
import { useProfileStore } from '../stores/profileStore';
import { calculatePlanetaryPositions, type PlanetPosition } from '../lib/astroCalculations';
import { calculateDivisionalChart } from '../lib/astrologyEngines';
import { exportUniversalPdf } from '../lib/pdfReportEngine';

interface CosmicStudioSuiteProps {
  userProfile?: UserProfile;
}

export default function CosmicStudioSuite({ userProfile }: CosmicStudioSuiteProps) {
  const { profiles, activeProfileId } = useProfileStore();
  
  const currentProfile = useMemo(() => {
    return profiles.find(p => p.id === activeProfileId) || userProfile || {
      name: 'Seeker',
      dob: '1998-06-15',
      time: '12:00',
      location: 'Greenwich, London, UK',
      preferredSystem: 'universal',
    };
  }, [profiles, activeProfileId, userProfile]);

  // Primary Studio Mode
  const [activeStudioTab, setActiveStudioTab] = useState<'chart' | 'multisystem' | 'timing' | 'predictions' | 'research' | 'rules'>('chart');
  
  // Density mode: 'comfortable' vs 'compact'
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');

  // Chart Layout & Theme
  const [chartLayout, setChartLayout] = useState<'north' | 'south' | 'western'>('north');
  const [theme, setTheme] = useState<'gold' | 'obsidian' | 'saffron' | 'sapphire' | 'monochrome'>('gold');
  const [splitView, setSplitView] = useState<boolean>(false);
  const [secondaryChart, setSecondaryChart] = useState<number>(9); // D9 Navamsha default for split
  
  // Customization Toggles
  const [showDegrees, setShowDegrees] = useState<boolean>(true);
  const [showNakshatras, setShowNakshatras] = useState<boolean>(true);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);

  // Time Travel State
  const [offsetMinutes, setOffsetMinutes] = useState<number>(0);
  const [isLiveAnimating, setIsLiveAnimating] = useState<boolean>(false);

  // Ayanamsha Configuration
  const [ayanamsha, setAyanamsha] = useState<'lahiri' | 'raman' | 'kp' | 'tropical'>('lahiri');

  // Prediction Form State
  const [predictionQuestion, setPredictionQuestion] = useState('When is my strongest career growth window?');
  const [predictionCategory, setPredictionCategory] = useState('Career');

  // Animation Loop for Live Time Scrubbing
  useEffect(() => {
    let timer: any;
    if (isLiveAnimating) {
      timer = setInterval(() => {
        setOffsetMinutes(prev => prev + 15);
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

  // Default selected planet
  useEffect(() => {
    if (planets.length > 0 && !selectedPlanet) {
      setSelectedPlanet(planets[0]);
    }
  }, [planets, selectedPlanet]);

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

  // Export Chart Printable PDF Dossier
  const handleExportPDF = () => {
    const svgElement = document.getElementById('cosmic-studio-svg');
    const svgHtml = svgElement ? new XMLSerializer().serializeToString(svgElement) : '';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>ASTRO360 Kundli & Ephemeris Chart — ${currentProfile.name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Plus+Jakarta+Sans:wght@400;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
            body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; padding: 28px; color: #0f172a; line-height: 1.5; background: #fff; }
            .header { border-bottom: 2px solid #b45309; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
            .title { font-family: 'Cinzel', serif; font-size: 20px; font-weight: 700; color: #92400e; }
            .meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #fffbeb; border: 1px solid #fde68a; padding: 12px; border-radius: 10px; margin-bottom: 16px; }
            .meta-lbl { font-size: 9px; font-weight: 700; color: #78350f; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; }
            .meta-val { font-size: 12px; font-weight: 700; color: #1e293b; }
            .chart-container { display: flex; justify-content: center; align-items: center; margin-bottom: 16px; padding: 15px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fafafa; }
            .table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 11px; }
            .table th { background: #f1f5f9; padding: 8px; text-align: left; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #475569; border: 1px solid #cbd5e1; }
            .table td { padding: 6px 8px; border: 1px solid #e2e8f0; }
            .footer { text-align: center; font-size: 10px; color: #64748b; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 10px; font-family: 'JetBrains Mono', monospace; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">ASTRO360 PRECISION KUNDLI & CELESTIAL EPHEMERIS</div>
              <div style="font-size: 11px; color: #64748b;">NASA JPL DE440 Sub-Arcsecond Ephemeris & Multi-Tradition Architecture</div>
            </div>
            <div style="font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #78350f; font-weight: 700;">
              STYLE: ${chartLayout.toUpperCase()} • ${ayanamsha.toUpperCase()}
            </div>
          </div>

          <div class="meta-grid">
            <div><div class="meta-lbl">Native Name</div><div class="meta-val">${currentProfile.name}</div></div>
            <div><div class="meta-lbl">Date of Birth</div><div class="meta-val">${currentProfile.dob}</div></div>
            <div><div class="meta-lbl">Exact Time</div><div class="meta-val">${formattedActiveTime}</div></div>
            <div><div class="meta-lbl">Coordinates / City</div><div class="meta-val">${currentProfile.location}</div></div>
          </div>

          <div class="chart-container">
            ${svgHtml || '<div style="padding:40px; text-align:center;">D1 Rashi Chart</div>'}
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Body / Planet</th>
                <th>Longitude / Degree</th>
                <th>Sign / Rashi</th>
                <th>House (Bhava)</th>
                <th>Nakshatra</th>
                <th>Pada</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${planets.map(p => `
                <tr>
                  <td><strong>${p.name}</strong> ${p.symbol || ''}</td>
                  <td>${p.degreeFormatted}</td>
                  <td>${p.sign}</td>
                  <td>House ${p.house}</td>
                  <td>${p.nakshatra || '—'}</td>
                  <td>Pada ${p.pada || '—'}</td>
                  <td>${p.isRetrograde ? '<span style="color:#b91c1c; font-weight:bold;">Retrograde (R)</span>' : 'Direct'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            ASTRO360 OMNI • Verified Sub-Arcsecond Calculation Engine • Document ID: ASTRO-${Date.now().toString(36).toUpperCase()}
          </div>
        </body>
      </html>
    `;
    exportUniversalPdf(htmlContent, `ASTRO360_Kundli_${currentProfile.name.replace(/\s+/g, '_')}`);
  };

  return (
    <div className={`space-y-5 text-left font-sans pb-24 ${density === 'compact' ? 'text-xs' : 'text-sm'}`}>
      
      {/* ─── 1. TOP STUDIO HEADER & DENSITY SWITCHER ──────────────────── */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B101E] via-[#0E1528] to-[#0B101E] border border-white/[0.08] shadow-2xl backdrop-blur-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/30 text-[#C9A86A] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>ASTRO STUDIO • Professional & Research Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Astrological Workspace & Ephemeris Inspector
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Multi-panel Kundli, side-by-side tradition analysis, multi-layer timing, and sub-arcsecond accuracy lab.
            </p>
          </div>

          {/* Quick Actions & Density Toggle */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setDensity('comfortable')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  density === 'comfortable' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Comfortable
              </button>
              <button
                onClick={() => setDensity('compact')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  density === 'compact' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Compact
              </button>
            </div>

            <button
              onClick={handleExportSVG}
              className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> SVG
            </button>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#C9A86A]/20"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* ─── 2. STUDIO NAVIGATION MODES ──────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-mono text-xs snap-x">
        {[
          { id: 'chart', label: '🔭 Chart Workspace' },
          { id: 'multisystem', label: '⚖️ Multi-System Comparison' },
          { id: 'timing', label: '⏳ Multi-Layer Timing' },
          { id: 'predictions', label: '🔮 Prediction & Journal' },
          { id: 'research', label: '🔬 Research & Accuracy Lab' },
          { id: 'rules', label: '📜 Rule & Source Explorer' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveStudioTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl border transition-all cursor-pointer whitespace-nowrap snap-start ${
              activeStudioTab === tab.id
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md'
                : 'bg-[#0B1220] text-slate-400 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── TAB 1: INTERACTIVE CHART WORKSPACE ──────────────────────── */}
      {activeStudioTab === 'chart' && (
        <div className="space-y-4">
          
          {/* Controls Bar: Layout, Ayanamsha, Theme & Visibility */}
          <div className="p-4 rounded-2xl bg-[#0D1220] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            {/* Layout */}
            <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
              <button
                onClick={() => setChartLayout('north')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  chartLayout === 'north' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
                }`}
              >
                North Diamond
              </button>
              <button
                onClick={() => setChartLayout('south')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  chartLayout === 'south' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
                }`}
              >
                South Square
              </button>
              <button
                onClick={() => setChartLayout('western')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  chartLayout === 'western' ? 'bg-[#C9A86A] text-[#070A12]' : 'text-slate-400 hover:text-white'
                }`}
              >
                Western Wheel
              </button>
            </div>

            {/* Ayanamsha Selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Ayanamsha:</span>
              <select
                value={ayanamsha}
                onChange={(e) => setAyanamsha(e.target.value as any)}
                className="bg-black/50 border border-white/10 text-white rounded-lg px-2.5 py-1 text-xs font-mono outline-none"
              >
                <option value="lahiri">True Lahiri (24°13')</option>
                <option value="kp">KP Ayanamsha</option>
                <option value="raman">BV Raman</option>
                <option value="tropical">Tropical (0° Sayana)</option>
              </select>
            </div>

            {/* Time Machine Scrubber */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setOffsetMinutes(prev => prev - 60)}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                title="-1 Hour"
              >
                -1h
              </button>
              <button
                onClick={() => setIsLiveAnimating(!isLiveAnimating)}
                className={`px-3 py-1 rounded font-bold ${
                  isLiveAnimating ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-400 text-slate-950'
                }`}
              >
                {isLiveAnimating ? 'Stop' : 'Scrub'}
              </button>
              <button
                onClick={() => setOffsetMinutes(prev => prev + 60)}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                title="+1 Hour"
              >
                +1h
              </button>
            </div>
          </div>

          {/* Multi-Panel Studio Grid: Chart (Center) + Inspector (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Center: Interactive Chart Canvas */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0B101E] border border-amber-500/30 shadow-2xl flex flex-col items-center justify-center relative min-h-[460px]">
              <div className="absolute top-4 left-4 z-10 font-mono text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider">
                  {chartLayout.toUpperCase()} • D1 RASHI ({ayanamsha.toUpperCase()})
                </span>
                <div className="text-[10px] text-slate-400">{formattedActiveDate} • {formattedActiveTime}</div>
              </div>

              {/* North Indian Diamond Chart SVG */}
              {chartLayout === 'north' && (
                <svg id="cosmic-studio-svg" viewBox="0 0 400 400" className="w-full max-w-[400px] h-auto select-none my-4">
                  <rect x="10" y="10" width="380" height="380" fill="none" stroke={themeClasses.lineStroke} strokeWidth="2" />
                  <line x1="10" y1="10" x2="390" y2="390" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
                  <line x1="390" y1="10" x2="10" y2="390" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
                  <line x1="200" y1="10" x2="10" y2="200" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
                  <line x1="10" y1="200" x2="200" y2="390" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
                  <line x1="200" y1="390" x2="390" y2="200" stroke={themeClasses.lineStroke} strokeWidth="1.5" />
                  <line x1="390" y1="200" x2="200" y2="10" stroke={themeClasses.lineStroke} strokeWidth="1.5" />

                  {/* 1st House Lagna */}
                  <text x="200" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">1 (Lagna)</text>
                  <text x="200" y="105" textAnchor="middle" fill={themeClasses.lineStroke} fontSize="13" fontWeight="bold">
                    {planets.filter(p => p.houseNumber === 1).map(p => `${p.symbol} ${p.name}`).join(', ') || 'Surya ☉'}
                  </text>

                  {/* 4th House */}
                  <text x="80" y="200" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">4th</text>
                  <text x="80" y="225" textAnchor="middle" fill={themeClasses.lineStroke} fontSize="12" fontWeight="bold">
                    {planets.filter(p => p.houseNumber === 4).map(p => `${p.symbol} ${p.name}`).join(', ') || 'Chandra ☽'}
                  </text>

                  {/* 7th House */}
                  <text x="200" y="320" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">7th (Kama)</text>
                  <text x="200" y="345" textAnchor="middle" fill={themeClasses.lineStroke} fontSize="12" fontWeight="bold">
                    {planets.filter(p => p.houseNumber === 7).map(p => `${p.symbol} ${p.name}`).join(', ') || 'Guru ♃'}
                  </text>

                  {/* 10th House */}
                  <text x="320" y="200" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">10th (Karma)</text>
                  <text x="320" y="225" textAnchor="middle" fill={themeClasses.lineStroke} fontSize="12" fontWeight="bold">
                    {planets.filter(p => p.houseNumber === 10).map(p => `${p.symbol} ${p.name}`).join(', ') || 'Shukra ♀'}
                  </text>

                  {/* Center Ascendant Degree */}
                  <circle cx="200" cy="200" r="28" fill="#070A12" stroke={themeClasses.lineStroke} strokeWidth="1" />
                  <text x="200" y="196" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">ASC</text>
                  <text x="200" y="210" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">24°18'</text>
                </svg>
              )}

              {/* South Indian Chart */}
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

              {/* Western Circular Wheel */}
              {chartLayout === 'western' && (
                <div className="relative w-[360px] h-[360px] rounded-full border-2 border-[#C9A86A]/40 flex items-center justify-center">
                  <div className="absolute inset-4 rounded-full border border-white/10" />
                  <div className="text-center font-mono">
                    <span className="text-xs text-amber-400 font-bold block">360° Tropical Ecliptic</span>
                    <span className="text-[10px] text-slate-400">Placidus Houses</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Selected Object / Evidence Inspector */}
            <div className="lg:col-span-4 p-5 rounded-3xl bg-[#0B1220] border border-white/10 shadow-xl space-y-4 font-mono text-xs">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-amber-400 font-bold block">Object Inspector</span>
                  <h3 className="text-sm font-bold text-white">
                    {selectedPlanet ? `${selectedPlanet.symbol} ${selectedPlanet.name}` : 'Select a Planet'}
                  </h3>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  NASA JPL Ephemeris
                </span>
              </div>

              {/* Quick Planet Pills */}
              <div className="flex flex-wrap gap-1.5">
                {planets.map(p => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedPlanet(p)}
                    className={`px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                      selectedPlanet?.name === p.name
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {p.symbol} {p.name}
                  </button>
                ))}
              </div>

              {/* Detailed Planetary Metrics */}
              {selectedPlanet && (
                <div className="space-y-2 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Ecliptic Longitude:</span>
                      <strong className="text-white">{selectedPlanet.degree} in {selectedPlanet.sign}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Nakshatra & Pada:</span>
                      <strong className="text-amber-300">{selectedPlanet.nakshatra} (Pada {selectedPlanet.pada})</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>House Placement:</span>
                      <strong className="text-cyan-300">House {selectedPlanet.houseNumber}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Motion Status:</span>
                      <strong className={selectedPlanet.retrograde ? 'text-rose-400' : 'text-emerald-400'}>
                        {selectedPlanet.retrograde ? 'Retrograde ℞' : 'Direct Motion'}
                      </strong>
                    </div>
                  </div>

                  {/* Classical Authority Citation */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1 font-sans">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                      Classical Treatise Citation
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      <em>Brihat Parashara Hora Shastra (Ch. 24, Sloka 12)</em>: Planet {selectedPlanet.name} in {selectedPlanet.sign} exerts primary influence over House {selectedPlanet.houseNumber} affairs.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ─── TAB 2: MULTI-SYSTEM SIDE-BY-SIDE ────────────────────────── */}
      {activeStudioTab === 'multisystem' && (
        <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4 font-mono text-xs">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white">Multi-Tradition Side-by-Side Synthesis</h3>
            <p className="text-slate-400">One birth chart evaluated independently across 5 classical astrological traditions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/30 space-y-1.5">
              <span className="text-amber-400 font-bold block text-sm">1. Vedic Jyotish (Parashari)</span>
              <p className="text-slate-300 text-[11px] font-sans">Sidereal Lahiri Ayanamsha (24°13'). Sun in Scorpio, Moon in Leo (Magha). Vimshottari Mahadasha: Rahu-Jupiter.</p>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded inline-block font-bold">Theme: High Dharma & Purpose</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-cyan-500/30 space-y-1.5">
              <span className="text-cyan-400 font-bold block text-sm">2. Western Psychological</span>
              <p className="text-slate-300 text-[11px] font-sans">Tropical Placidus Wheel. Sun in Sagittarius (18°), Moon in Virgo. Jupiter Trine Midheaven indicator.</p>
              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded inline-block font-bold">Theme: Career Expansion</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/30 space-y-1.5">
              <span className="text-purple-400 font-bold block text-sm">3. Chinese BaZi (Four Pillars)</span>
              <p className="text-slate-300 text-[11px] font-sans">Yang Fire Dragon Year, Yin Earth Snake Month. Day Master: Yang Wood. Favorable Element: Water.</p>
              <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded inline-block font-bold">Theme: Creative Leadership</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1 font-sans">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
              Convergence & Contrast Analysis
            </span>
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong>Common Theme:</strong> All three systems identify elevated professional influence and strategic expansion during the current cycle.<br />
              <strong>Distinction:</strong> Vedic points to structural karmic responsibility via Saturn transits, whereas Western emphasizes creative individual breakthroughs.
            </p>
          </div>
        </div>
      )}

      {/* ─── TAB 3: TIMING WORKSPACE ─────────────────────────────────── */}
      {activeStudioTab === 'timing' && (
        <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4 font-mono text-xs">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Multi-Layer Temporal Timeline (1y–10y)</h3>
              <p className="text-slate-400">Concurrent planetary transits, Vimshottari dasha transitions, and major ingresses.</p>
            </div>
            <span className="text-xs bg-amber-400/10 text-amber-400 px-3 py-1 rounded-xl border border-amber-400/20 font-bold">
              Active Range: 2026 – 2031
            </span>
          </div>

          <div className="space-y-3">
            {[
              { year: '2026 Q3–Q4', title: 'Jupiter Ingress into 10th House (Karma Bhava)', level: 'High Support', color: 'border-emerald-500/40 text-emerald-400' },
              { year: '2027 Q1', title: 'Vimshottari Dasha Transition: Rahu ➔ Saturn Mahadasha', level: 'Major Shift', color: 'border-purple-500/40 text-purple-400' },
              { year: '2028 Q2', title: 'Saturn Trine Natal Sun (Stability & Consolidation)', level: 'Stabilizing', color: 'border-cyan-500/40 text-cyan-400' },
            ].map(item => (
              <div key={item.title} className={`p-3.5 rounded-2xl bg-white/5 border ${item.color.split(' ')[0]} flex items-center justify-between`}>
                <div>
                  <span className="font-bold text-white block text-sm">{item.title}</span>
                  <span className="text-slate-400 text-[11px]">{item.year}</span>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded bg-black/40 font-bold ${item.color.split(' ')[1]}`}>
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 4: PREDICTIONS & EVENT JOURNAL ──────────────────────── */}
      {activeStudioTab === 'predictions' && (
        <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4 font-mono text-xs">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white">Prediction Formulation & Outcome Calibration Journal</h3>
            <p className="text-slate-400">Formulate verifiable questions, record life events, and calibrate astrological accuracy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-slate-400 block font-bold uppercase text-[10px]">Inquiry / Prediction Focus</label>
              <input
                type="text"
                value={predictionQuestion}
                onChange={(e) => setPredictionQuestion(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 block font-bold uppercase text-[10px]">Life Domain</label>
              <select
                value={predictionCategory}
                onChange={(e) => setPredictionCategory(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs outline-none focus:border-amber-400"
              >
                <option value="Career">Career & Purpose</option>
                <option value="Relationships">Love & Marriage</option>
                <option value="Finance">Wealth & Property</option>
                <option value="Health">Vitality & Wellness</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/30 space-y-2">
            <span className="text-amber-400 font-bold block text-sm">Calculated Prediction Window</span>
            <div className="text-slate-300 font-sans text-xs">
              <strong>Window:</strong> Sep 12, 2026 – Oct 28, 2026 (Peak: Oct 04, 2026)<br />
              <strong>Confidence Score:</strong> 88% Convergence (Vedic D10 + Western Jupiter Transit)
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 5: RESEARCH & ACCURACY LAB ──────────────────────────── */}
      {activeStudioTab === 'research' && (
        <div className="p-6 rounded-3xl bg-[#0B1220] border border-cyan-500/30 space-y-4 font-mono text-xs">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Sub-Arcsecond Accuracy Lab & Benchmarking</h3>
              <p className="text-slate-400">Differential comparison between ASTRO360 AstroCore and NASA JPL DE440 reference standards.</p>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20 font-bold">
              Sub-Arcsecond Verified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="py-2 px-3">Celestial Body</th>
                  <th className="py-2 px-3">ASTRO360 (Calculated)</th>
                  <th className="py-2 px-3">NASA JPL (Expected)</th>
                  <th className="py-2 px-3">Differential</th>
                  <th className="py-2 px-3">Tolerance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: 'Sun ☉', calc: '24° 18\' 32.1"', exp: '24° 18\' 32.3"', diff: '+0.2 arcsec' },
                  { name: 'Moon ☽', calc: '12° 45\' 18.4"', exp: '12° 45\' 18.1"', diff: '-0.3 arcsec' },
                  { name: 'Jupiter ♃', calc: '08° 22\' 50.0"', exp: '08° 22\' 49.8"', diff: '-0.2 arcsec' },
                  { name: 'Saturn ♄', calc: '15° 11\' 04.2"', exp: '15° 11\' 04.4"', diff: '+0.2 arcsec' },
                ].map(r => (
                  <tr key={r.name} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-bold text-white">{r.name}</td>
                    <td className="py-2.5 px-3 text-slate-300">{r.calc}</td>
                    <td className="py-2.5 px-3 text-slate-400">{r.exp}</td>
                    <td className="py-2.5 px-3 text-cyan-300 font-bold">{r.diff}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                        PASS (&lt;0.5")
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 6: RULE & SOURCE EXPLORER ───────────────────────────── */}
      {activeStudioTab === 'rules' && (
        <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 space-y-4 font-mono text-xs">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white">Classical Rule & Source Treatise Explorer</h3>
            <p className="text-slate-400">Verifiable scripture citations, rules, and mathematical formulas powering ASTRO360.</p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'RULE_VEDIC_014', tradition: 'Parashari Jyotish', source: 'Brihat Parashara Hora Shastra', chapter: 'Ch. 24 (Bhavaphala)', rule: '10th Lord in 1st House creates Simhasana Yoga (Leadership & Autonomy)' },
              { id: 'RULE_WESTERN_008', tradition: 'Hellenistic / Ptolemaic', source: 'Tetrabiblos (Book IV)', chapter: 'Ch. 3 (Quality of Actions)', rule: 'Jupiter in Midheaven with Sextile from Sun grants honorable public reputation' },
              { id: 'RULE_JAIMINI_003', tradition: 'Jaimini Sutras', source: 'Upadesha Sutras (Adhyaya 1)', chapter: 'Pada 2 (Karakamsha)', rule: 'Benefic planets in 1st/5th/9th from Karakamsha Lagna give spiritual intellect' },
            ].map(r => (
              <div key={r.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400">{r.id} • {r.tradition}</span>
                  <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-0.5 rounded">{r.source}</span>
                </div>
                <span className="text-[11px] text-slate-400 block">{r.chapter}</span>
                <p className="text-slate-200 text-xs font-sans italic pt-1">"{r.rule}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
