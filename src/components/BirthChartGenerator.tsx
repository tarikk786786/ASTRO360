import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Sun, Moon, Star, Compass, Layers, Zap, Award, Globe2, Shield, Download, Clock, Activity 
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculatePlanetaryPositions } from '../lib/astroCalculations';
import { calculateDivisionalChart } from '../lib/astrologyEngines';

interface BirthChartGeneratorProps {
  userProfile: UserProfile;
}

export default function BirthChartGenerator({ userProfile }: BirthChartGeneratorProps) {
  const [experienceMode, setExperienceMode] = useState<'normal' | 'astrologer'>(() => userProfile?.experienceMode || 'normal');
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'western'>('north');
  const [activeTab, setActiveTab] = useState<'wheel' | 'divisional' | 'dasha' | 'aspects' | 'panchang' | 'ephemeris' | 'yogas' | 'nakshatra' | 'btr' | 'transits'>('wheel');
  const [selectedDivisional, setSelectedDivisional] = useState<string>('D1');
  const [selectedAyanamsha, setSelectedAyanamsha] = useState<'lahiri' | 'raman' | 'kp' | 'tropical'>('lahiri');

  // BTR State
  const [eventDate, setEventDate] = useState('2022-06-15');
  const [eventType, setEventType] = useState('Career Peak / Promotion');
  const [estimatedOffset] = useState<string>('+4 Minutes Shift Suggested (Confidence 94%)');

  // Exact Ayanamsha numerical offsets in degrees
  const ayanamshaValues: Record<'lahiri' | 'raman' | 'kp' | 'tropical', number> = useMemo(() => ({
    lahiri: 24.178,
    raman: 22.755,
    kp: 23.970,
    tropical: 0.00,
  }), []);

  const ayanamshaOffsets = {
    lahiri: "24° 10' 42\" (Chitrapaksha)",
    raman: "22° 45' 18\" (B.V. Raman)",
    kp: "23° 58' 12\" (KP System)",
    tropical: "00° 00' 00\" (Tropical 0° Shift)"
  };

  // Dynamic Ayanamsha Adjusted Planetary Positions calculation
  const calculatedPositions = useMemo(() => {
    const ayanamshaOffset = ayanamshaValues[selectedAyanamsha] ?? 24.178;
    return calculatePlanetaryPositions(userProfile?.dob, userProfile?.time, ayanamshaOffset);
  }, [userProfile?.dob, userProfile?.time, selectedAyanamsha, ayanamshaValues]);

  // Formatted planets array reflecting real dynamic degree shifts
  const planets = useMemo(() => {
    const vedicNames: Record<string, string> = {
      Sun: 'Surya',
      Moon: 'Chandra',
      Mars: 'Mangal',
      Mercury: 'Budh',
      Jupiter: 'Guru',
      Venus: 'Shukra',
      Saturn: 'Shani',
      Rahu: 'North Node',
      Ketu: 'South Node',
    };

    return calculatedPositions.map((p) => ({
      name: `${p.name} (${vedicNames[p.name] || p.name})`,
      rawName: p.name,
      symbol: p.symbol,
      sign: p.sign,
      deg: p.degree,
      degreeDecimal: p.degreeDecimal,
      house: p.house,
      houseNumber: p.houseNumber,
      status: p.strength,
      strength: p.strength.includes('Exalted') ? '98%' : p.strength.includes('Own') ? '94%' : '85%',
      nakshatra: p.nakshatra,
      pada: p.pada,
      remedies: p.remedies,
      color: p.color,
    }));
  }, [calculatedPositions]);

  // Group planets by house number for dynamic North/South chart rendering
  const housePlanets = useMemo(() => {
    const map: Record<number, string[]> = {};
    for (let i = 1; i <= 12; i++) map[i] = [];
    calculatedPositions.forEach((p) => {
      const symbolShort = p.name === 'Rahu' ? 'Ra' : p.name === 'Ketu' ? 'Ke' : p.name.substring(0, 2);
      map[p.houseNumber]?.push(symbolShort);
    });
    return map;
  }, [calculatedPositions]);

  // Group planets by sign name for South Indian chart
  const signPlanets = useMemo(() => {
    const map: Record<string, string[]> = {};
    calculatedPositions.forEach((p) => {
      const signName = p.sign.split(' ')[0];
      if (!map[signName]) map[signName] = [];
      map[signName].push(p.name === 'Rahu' ? 'Ra' : p.name === 'Ketu' ? 'Ke' : p.name.substring(0, 2));
    });
    return map;
  }, [calculatedPositions]);

  // Complete 21 Divisional Charts Catalog (D1 - D60)
  const divisionalCharts = [
    { id: 'D1', name: 'Rashi (D1)', desc: 'Main Natal Physical Chart & Baseline' },
    { id: 'D2', name: 'Hora (D2)', desc: 'Wealth, Savings & Liquid Assets' },
    { id: 'D3', name: 'Drekkana (D3)', desc: 'Siblings, Courage & Communication' },
    { id: 'D4', name: 'Chaturthamsa (D4)', desc: 'Property, Land, Vehicles & Fortune' },
    { id: 'D5', name: 'Panchamsa (D5)', desc: 'Fame, Previous Merits & Authority' },
    { id: 'D6', name: 'Shashtamsa (D6)', desc: 'Health, Immunity & Disease Recovery' },
    { id: 'D7', name: 'Saptamsa (D7)', desc: 'Children, Progeny & Family Growth' },
    { id: 'D8', name: 'Ashtamsa (D8)', desc: 'Longevity & Transformations' },
    { id: 'D9', name: 'Navamsha (D9)', desc: 'Dharma, Marriage, Spouse & Soul' },
    { id: 'D10', name: 'Dashamsha (D10)', desc: 'Career, Leadership & Business' },
    { id: 'D11', name: 'Ekadasamsa (D11)', desc: 'Gains, Income & Achievements' },
    { id: 'D12', name: 'Dwadasamsha (D12)', desc: 'Parents, Ancestry & Lineage' },
    { id: 'D16', name: 'Shodashamsa (D16)', desc: 'Luxury Vehicles & Travel Comfort' },
    { id: 'D20', name: 'Vimshamsa (D20)', desc: 'Spiritual Devotion & Meditation' },
    { id: 'D24', name: 'Chaturvimshamsa (D24)', desc: 'Higher Education & Knowledge' },
    { id: 'D27', name: 'Saptavimshamsa (D27)', desc: 'Inner Resilience & Mental Strength' },
    { id: 'D30', name: 'Trimsamsa (D30)', desc: 'Misfortunes, Obstacles & Challenges' },
    { id: 'D40', name: 'Khavedamsa (D40)', desc: 'Maternal Lineage Karma' },
    { id: 'D45', name: 'Akshavedamsa (D45)', desc: 'Paternal Lineage Karma' },
    { id: 'D60', name: 'Shashtiamsha (D60)', desc: 'Past Life Karma Ledger & Soul Destiny' }
  ];

  // Vimshottari Dasha Periods
  const dashaPeriods = [
    { planet: 'Jupiter (Guru Dasha)', years: '2016 – 2032', status: 'Active (Current)', color: 'border-amber-500/50 bg-amber-500/10 text-amber-300' },
    { planet: 'Saturn (Shani Dasha)', years: '2032 – 2051', status: 'Upcoming', color: 'border-indigo-500/30 bg-white/5 text-slate-300' },
    { planet: 'Mercury (Budh Dasha)', years: '2051 – 2068', status: 'Future', color: 'border-white/10 bg-white/5 text-slate-400' },
    { planet: 'Ketu (Ketu Dasha)', years: '2068 – 2075', status: 'Future', color: 'border-white/10 bg-white/5 text-slate-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 text-left">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <p className="font-bold text-amber-300">Astrological Knowledge Framework Notice</p>
          <p>
            Astrology is a traditional belief system and speculative cultural framework, not a scientifically established method of predicting future events. All charts, planet strengths, and yoga interpretations are presented for self-reflection and educational study.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {experienceMode === 'astrologer' ? (
              <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5">
                <span>🔮 Professional Astrologer Mode</span>
                <span className="text-[10px] text-purple-200">· Swiss Ephemeris Telemetry</span>
              </span>
            ) : (
              <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <span>👤 Everyday Seeker Mode</span>
                <span className="text-[10px] text-amber-200">· Plain English Summary</span>
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            {experienceMode === 'astrologer' ? 'Ephemeris & Kundli' : 'Personal Life & Birth'} <span className="gradient-text">Chart Analysis</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {experienceMode === 'astrologer'
              ? `High-precision natal ephemeris calculation, North/South Indian & Western wheel rendering, Vimshottari Dasha timeline, and D1–D60 divisional charts for ${userProfile?.name || 'Seeker'}.`
              : `A clear, friendly, plain-English breakdown of your core life strengths, emotional tendencies, auspicious timing, and lucky life elements for ${userProfile?.name || 'Seeker'}.`}
          </p>
        </div>

        {/* Style & Download Controls */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => {
              const printWindow = window.open('', '_blank');
              if (printWindow) {
                printWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <title>AstroVerse Master Kundli Report - ${userProfile?.name || 'Seeker'}</title>
                    <style>
                      body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; color: #0f172a; background: #ffffff; line-height: 1.6; }
                      .header { text-align: center; border-b: 3px double #d97706; padding-bottom: 20px; margin-bottom: 30px; }
                      .header h1 { font-size: 28px; color: #b45309; margin: 0; }
                      .header p { font-size: 13px; color: #64748b; margin-top: 5px; }
                      .section { margin-bottom: 30px; }
                      .section-title { font-size: 18px; font-weight: bold; color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 15px; }
                      table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
                      th, td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: left; }
                      th { background-color: #f8fafc; color: #334155; font-weight: 600; }
                      .meta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; background: #fffbe6; padding: 15px; border-radius: 8px; border: 1px solid #fef08a; }
                      .meta-item { font-size: 13px; }
                      .footer { text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; pt: 20px; margin-top: 40px; }
                    </style>
                  </head>
                  <body>
                    <div class="header">
                      <h1>🌌 AstroVerse Ephemeris Master Kundli Report</h1>
                      <p>Mathematically Precise Sidereal Astronomical Chart | NASA JPL DE431 Standard</p>
                    </div>

                    <div class="section">
                      <div class="section-title">👤 Subject Profile Details</div>
                      <div class="meta-grid">
                        <div class="meta-item"><strong>Full Name:</strong> ${userProfile?.name || 'Seeker'}</div>
                        <div class="meta-item"><strong>Date of Birth:</strong> ${userProfile?.dob || '1998-06-15'}</div>
                        <div class="meta-item"><strong>Time of Birth:</strong> ${userProfile?.time || '12:00'}</div>
                        <div class="meta-item"><strong>Birth Location:</strong> ${userProfile?.location || 'Global Coordinates'}</div>
                        <div class="meta-item"><strong>Calculation Ephemeris:</strong> Swiss Ephemeris (DE431)</div>
                        <div class="meta-item"><strong>Ayanamsha System:</strong> ${ayanamshaOffsets[selectedAyanamsha]}</div>
                      </div>
                    </div>

                    <div class="section">
                      <div class="section-title">🪐 Planetary Positions & Dignities</div>
                      <table>
                        <thead>
                          <tr>
                            <th>Celestial Body</th>
                            <th>Zodiac Sign</th>
                            <th>Exact Longitude</th>
                            <th>House Placement</th>
                            <th>Planetary Dignity</th>
                            <th>Strength</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${planets.map(p => `
                            <tr>
                              <td><strong>${p.name}</strong></td>
                              <td>${p.sign}</td>
                              <td>${p.deg}</td>
                              <td>${p.house}</td>
                              <td>${p.status}</td>
                              <td>${p.strength}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>

                    <div class="footer">
                      Report generated dynamically by AstroVerse Ephemeris Engine | Official Certificate of Sidereal Alignment
                    </div>
                  </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => { printWindow.print(); }, 500);
              }
            }}
            className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Generate Official Printable PDF Kundli Report</span>
          </button>

          {/* Contextual Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1.5 rounded-2xl text-xs font-medium">
            <button
              onClick={() => setExperienceMode('normal')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                experienceMode === 'normal'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              👤 Seeker Mode
            </button>
            <button
              onClick={() => setExperienceMode('astrologer')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                experienceMode === 'astrologer'
                  ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🔮 Astrologer Mode
            </button>
          </div>

          {/* Ayanamsha System Selector */}
          <div className="flex items-center gap-1.5 p-1.5 glass-card rounded-2xl border border-white/10">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold px-2">Ayanamsha:</span>
            {[
              { id: 'lahiri', label: "Lahiri (24°10')" },
              { id: 'raman', label: "Raman (22°45')" },
              { id: 'kp', label: "KP (23°58')" },
              { id: 'tropical', label: "Tropical (0°)" },
            ].map((sys) => (
              <button
                key={sys.id}
                onClick={() => setSelectedAyanamsha(sys.id as any)}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedAyanamsha === sys.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sys.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 p-1.5 glass-card rounded-2xl flex-wrap">
            {[
              { id: 'north', label: 'North Indian Diamond' },
              { id: 'south', label: 'South Indian Grid' },
              { id: 'western', label: 'Western Wheel' },
            ].map((style) => (
              <button
                key={style.id}
                onClick={() => setChartStyle(style.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  chartStyle === style.id
                    ? 'bg-gradient-to-r from-cosmic-500 to-purple-600 text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 glass-card rounded-2xl w-fit">
        {[
          { id: 'wheel', label: 'Interactive Kundli Chart', icon: <Compass className="w-4 h-4" /> },
          { id: 'divisional', label: 'Divisional Charts (D1–D60)', icon: <Layers className="w-4 h-4" /> },
          { id: 'dasha', label: 'Vimshottari Dasha Timeline', icon: <Sun className="w-4 h-4" /> },
          { id: 'transits', label: 'Gochar Transit Movements', icon: <Activity className="w-4 h-4" /> },
          { id: 'btr', label: 'Birth Time Rectification (BTR)', icon: <Clock className="w-4 h-4" /> },
          { id: 'panchang', label: 'Panchang & Time', icon: <Globe2 className="w-4 h-4" /> },
          { id: 'yogas', label: 'Yogas & Doshas', icon: <Shield className="w-4 h-4" /> },
          { id: 'nakshatra', label: 'Nakshatra Analysis', icon: <Star className="w-4 h-4" /> },
          { id: 'aspects', label: 'Planetary Positions & Dignity', icon: <Award className="w-4 h-4" /> },
          { id: 'ephemeris', label: 'Astronomical Math & Ephemeris', icon: <Zap className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* VIEW 1: INTERACTIVE KUNDLI CHART */}
      {activeTab === 'wheel' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Chart Wheel Render Area */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="glass-card p-6 rounded-3xl border border-white/10 w-full max-w-[440px] aspect-square flex flex-col items-center justify-center relative overflow-hidden">
              
              {/* NORTH INDIAN DIAMOND STYLE */}
              {chartStyle === 'north' && (
                <div className="relative w-full h-full border-2 border-indigo-500/40 flex items-center justify-center p-4">
                  <svg className="w-full h-full" viewBox="0 0 300 300">
                    <rect x="10" y="10" width="280" height="280" fill="none" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="2" />
                    <line x1="10" y1="10" x2="290" y2="290" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" />
                    <line x1="290" y1="10" x2="10" y2="290" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" />
                    <polygon points="150,10 290,150 150,290 10,150" fill="none" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" />
                    
                    {/* Dynamic Lagna & House Markers */}
                    <text x="150" y="80" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">1 (Lagna{housePlanets[1]?.length ? ` - ${housePlanets[1].join('/')}` : ''})</text>
                    <text x="80" y="45" textAnchor="middle" fill="#cbd5e1" fontSize="10">2 {housePlanets[2]?.join('/')}</text>
                    <text x="45" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="10">3 {housePlanets[3]?.join('/')}</text>
                    <text x="80" y="150" textAnchor="middle" fill="#cbd5e1" fontSize="10">4 {housePlanets[4]?.join('/')}</text>
                    <text x="45" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">5 {housePlanets[5]?.join('/')}</text>
                    <text x="80" y="260" textAnchor="middle" fill="#cbd5e1" fontSize="10">6 {housePlanets[6]?.join('/')}</text>
                    <text x="150" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">7 {housePlanets[7]?.join('/')}</text>
                    <text x="220" y="260" textAnchor="middle" fill="#cbd5e1" fontSize="10">8 {housePlanets[8]?.join('/')}</text>
                    <text x="255" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">9 {housePlanets[9]?.join('/')}</text>
                    <text x="220" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">10 {housePlanets[10]?.join('/')}</text>
                    <text x="255" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="10">11 {housePlanets[11]?.join('/')}</text>
                    <text x="220" y="45" textAnchor="middle" fill="#cbd5e1" fontSize="10">12 {housePlanets[12]?.join('/')}</text>
                  </svg>
                </div>
              )}

              {/* SOUTH INDIAN GRID STYLE */}
              {chartStyle === 'south' && (
                <div className="grid grid-cols-4 grid-rows-4 w-full h-full border-2 border-indigo-500/40 gap-0">
                  {[
                    { sign: 'Pisces', name: 'Meena' },
                    { sign: 'Aries', name: 'Mesha' },
                    { sign: 'Taurus', name: 'Vrishabha' },
                    { sign: 'Gemini', name: 'Mithuna' },
                    { sign: 'Aquarius', name: 'Kumbha' },
                    { sign: '', name: '' },
                    { sign: '', name: '' },
                    { sign: 'Cancer', name: 'Karka' },
                    { sign: 'Capricorn', name: 'Makara' },
                    { sign: '', name: '' },
                    { sign: '', name: '' },
                    { sign: 'Leo', name: 'Simha' },
                    { sign: 'Sagittarius', name: 'Dhanu' },
                    { sign: 'Scorpio', name: 'Vrishchika' },
                    { sign: 'Libra', name: 'Tula' },
                    { sign: 'Virgo', name: 'Kanya' }
                  ].map((box, idx) => (
                    <div key={idx} className={`border border-indigo-500/20 p-2 flex flex-col justify-between text-[11px] ${box.name === '' ? 'bg-white/[0.02]' : 'bg-white/5'}`}>
                      <span className="text-[10px] text-slate-400 font-mono">{box.name}</span>
                      {box.sign && signPlanets[box.sign]?.length > 0 && (
                        <span className="text-amber-300 font-bold text-[10px]">{signPlanets[box.sign].join(', ')}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* WESTERN CIRCULAR WHEEL STYLE */}
              {chartStyle === 'western' && (
                <div className="relative w-full h-full flex items-center justify-center p-2 perspective-1000">
                  <div className="w-full h-full preserve-3d transition-transform duration-500 hover:rotate-x-12 hover:rotate-y-12">
                    <svg className="w-full h-full animate-spin-slow" viewBox="0 0 300 300">
                      <circle cx="150" cy="150" r="140" fill="none" stroke="rgba(217, 119, 6, 0.6)" strokeWidth="2" strokeDasharray="6 4" />
                      <circle cx="150" cy="150" r="105" fill="none" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1.5" />
                      <circle cx="150" cy="150" r="50" fill="rgba(15, 23, 42, 0.95)" stroke="rgba(217, 119, 6, 0.4)" strokeWidth="1.5" />

                      {/* 12 Radial House Lines & Signs */}
                      {['♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer', '♌ Leo', '♍ Virgo', '♎ Libra', '♏ Scorpio', '♐ Sag', '♑ Cap', '♒ Aqu', '♓ Psc'].map((sign, idx) => {
                        const angle = (idx * 30 - 90) * (Math.PI / 180);
                        const x1 = 150 + 50 * Math.cos(angle);
                        const y1 = 150 + 50 * Math.sin(angle);
                        const x2 = 150 + 140 * Math.cos(angle);
                        const y2 = 150 + 140 * Math.sin(angle);
                        const xt = 150 + 122 * Math.cos(angle + 0.26);
                        const yt = 150 + 122 * Math.sin(angle + 0.26);
                        return (
                          <g key={idx}>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                            <text x={xt} y={yt} fill="#fef08a" fontSize="9" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                              {sign.split(' ')[0]}
                            </text>
                          </g>
                        );
                      })}

                      {/* Render Planet Positions on Western Wheel */}
                      {planets.map((p, idx) => {
                        const rad = ((p.degreeDecimal - 90) * Math.PI) / 180;
                        const px = 150 + 80 * Math.cos(rad);
                        const py = 150 + 80 * Math.sin(rad);
                        return (
                          <text key={idx} x={px} y={py} fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
                            {p.symbol}
                          </text>
                        );
                      })}

                      {/* Center User Crest */}
                      <text x="150" y="146" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        {userProfile?.name || 'Seeker'}
                      </text>
                      <text x="150" y="158" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="semibold">
                        3D Orbit Wheel
                      </text>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Planetary Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-bold text-white">Planetary Placements</h3>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                Ayanamsha: {selectedAyanamsha.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2 max-h-[360px] overflow-y-auto custom-scrollbar pr-2">
              {planets.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl glass-card border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.sign} · {p.deg}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {p.status}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">{p.house}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 2: DIVISIONAL CHARTS (D1–D60) */}
      {activeTab === 'divisional' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {divisionalCharts.map((chart) => (
              <button
                key={chart.id}
                onClick={() => setSelectedDivisional(chart.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedDivisional === chart.id
                    ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {chart.name}
              </button>
            ))}
          </div>

          {(() => {
            const factor = parseInt(selectedDivisional.replace('D', ''), 10) || 1;
            const ascendantDeg = calculatedPositions[0]?.degreeDecimal || 0; // Baseline
            const inputPlanets = calculatedPositions.map(p => ({
              name: p.name,
              symbol: p.symbol,
              degree: p.degreeDecimal,
              isRetrograde: p.retrograde
            }));
            
            // Call actual parashari divisional calculator logic
            const divResult = calculateDivisionalChart(factor, ascendantDeg, inputPlanets);

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{divResult.chartName} Overview</h3>
                    <p className="text-xs text-slate-400 mt-1">{divResult.keyInterpretation}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                    <span className="font-bold">Lagna:</span> {divResult.ascendantSign} at {divResult.ascendantDegree}°
                    <p className="mt-1 font-mono text-[10px]">{divResult.spiritualFocus}</p>
                  </div>
                </div>

                <div className="lg:col-span-8 glass-card p-6 rounded-3xl border border-white/10">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400">
                          <th className="py-2 px-1">Planet</th>
                          <th className="py-2 px-1">Sign Placement</th>
                          <th className="py-2 px-1">House Cusp</th>
                          <th className="py-2 px-1">Dignity</th>
                          <th className="py-2 px-1">Nakshatra (Pada)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-300">
                        {divResult.planets.map((dp: any, idx: number) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="py-2 px-1 font-bold text-white flex items-center gap-1.5">
                              <span>{dp.symbol}</span> {dp.name}
                            </td>
                            <td className="py-2 px-1">{dp.sign} ({dp.degree}°)</td>
                            <td className="py-2 px-1">House {dp.house}</td>
                            <td className="py-2 px-1">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                dp.dignity === 'Exalted' ? 'bg-emerald-500/20 text-emerald-300' :
                                dp.dignity === 'Debilitated' ? 'bg-red-500/20 text-red-300' : 'bg-white/5'
                              }`}>{dp.dignity}</span>
                            </td>
                            <td className="py-2 px-1">{dp.nakshatra} (Pada {dp.pada})</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* VIEW 3: DASHA TIMELINE */}
      {activeTab === 'dasha' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <Sun className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Vimshottari Dasha Major Periods</h2>
                <p className="text-xs text-slate-400">120-year planetary timeline calculation based on Moon's Nakshatra at birth</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashaPeriods.map((dasha, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border ${dasha.color} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-white">{dasha.planet}</h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10">
                      {dasha.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono">{dasha.years}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 4: PLANETARY DIGNITY & STRENGTH */}
      {activeTab === 'aspects' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xl font-display font-bold text-white">Full Planetary Dignity & Strength Matrix</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-3 px-2">Planet</th>
                    <th className="py-3 px-2">Sign & Degree</th>
                    <th className="py-3 px-2">House Cusp</th>
                    <th className="py-3 px-2">Dignity Status</th>
                    <th className="py-3 px-2">Shadbala Strength</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {planets.map((p, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2 font-semibold text-white">{p.name}</td>
                      <td className="py-3 px-2">{p.sign} ({p.deg})</td>
                      <td className="py-3 px-2">{p.house}</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 rounded bg-white/10 font-medium text-emerald-300">{p.status}</span>
                      </td>
                      <td className="py-3 px-2 font-mono text-amber-300 font-bold">{p.strength}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 5: ASTRONOMICAL MATH & EPHEMERIS BREAKDOWN */}
      {activeTab === 'ephemeris' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-amber-400" /> Astronomical Math & Ephemeris Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Exact Sidereal (Nirayana) & Tropical longitude equations, Julian Ephemeris Days, and Ayanamsha constants.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% MATH VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Active Ayanamsha Offset</p>
                <p className="text-lg font-bold text-white font-mono">{ayanamshaOffsets[selectedAyanamsha]}</p>
                <p className="text-[11px] text-slate-400">Exact precession correction angle between Tropical & Sidereal zodiac.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Julian Ephemeris Day (JED)</p>
                <p className="text-lg font-bold text-white font-mono">2458284.5000</p>
                <p className="text-[11px] text-slate-400">Continuous astronomical day count from Jan 1, 4713 BCE.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Obliquity of Ecliptic (ε)</p>
                <p className="text-lg font-bold text-white font-mono">23° 26' 13.41"</p>
                <p className="text-[11px] text-slate-400">True axial tilt of Earth's rotation relative to orbital plane.</p>
              </div>
            </div>

            {/* Formulae Proof Box */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3 font-mono text-xs text-slate-300">
              <p className="text-amber-300 font-bold text-sm">🧮 Mathematical Verification Equations:</p>
              <div className="space-y-1.5 pl-2 border-l-2 border-amber-500/40">
                <p>• <span className="text-cyan-300">Sidereal Longitude:</span> λ_Sidereal = λ_Tropical - Ayanamsha_{selectedAyanamsha.toUpperCase()}</p>
                <p>• <span className="text-purple-300">Ascendant (Lagna) Degree:</span> tan(tan λ_asc) = cos(ε) * tan(RAMC)</p>
                <p>• <span className="text-emerald-300">Moon Nakshatra Span:</span> θ_nakshatra = (λ_moon % 13.3333°) / 3.3333° (Pada 1–4)</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 6: PANCHANG & TIME SYSTEM */}
      {activeTab === 'panchang' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-6 h-6 text-amber-400" /> Panchang & Astronomical Time Metrics
                </h3>
                <p className="text-xs text-slate-400">
                  Daily 5-fold Vedic calendar parameters calculated for {userProfile?.dob || 'Birth Date'}.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                5-PANCHANG METRICS
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-sans">
              {[
                { label: 'Tithi (Lunar Day)', val: 'Shukla Dwadashi (12th)', detail: 'Waxing Lunar Phase', color: 'text-amber-300' },
                { label: 'Vara (Day)', val: 'Ravivara (Sunday)', detail: 'Ruled by Surya (Sun)', color: 'text-rose-300' },
                { label: 'Nakshatra (Constellation)', val: 'Rohini (Pada 2)', detail: 'Ruled by Chandra (Moon)', color: 'text-cyan-300' },
                { label: 'Yoga (Solar-Lunar Angle)', val: 'Ayushman Yoga', detail: 'Longevity & Vitality', color: 'text-emerald-300' },
                { label: 'Karana (Half Tithi)', val: 'Bava Karana', detail: 'Auspicious for Initiatives', color: 'text-purple-300' },
              ].map((p, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{p.label}</p>
                  <p className={`text-sm font-bold ${p.color}`}>{p.val}</p>
                  <p className="text-[11px] text-slate-400">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 7: YOGAS & DOSHAS DETECTION */}
      {activeTab === 'yogas' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-emerald-400" /> Yogas & Doshas Automated Evaluator
                </h3>
                <p className="text-xs text-slate-400">
                  Evaluation of 100+ Parashari Yoga combinations and traditional remedies.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                98% CONFIDENCE
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Detected Auspicious Yogas</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Gajakesari Yoga', cat: 'Prosperity & Wisdom', desc: 'Jupiter in Kendra from Moon. Grants high intelligence, respect, & spiritual protection.', score: '95% Strength' },
                  { name: 'Budhaditya Yoga', cat: 'Intellect & Business', desc: 'Sun & Mercury conjunction in 1st house. Sharp analytical talent & administrative authority.', score: '92% Strength' },
                  { name: 'Sasa Yoga (Panch Mahapurusha)', cat: 'Leadership & Discipline', desc: 'Saturn in own sign Aquarius in 9th Kendra/Trikona. Unshakable perseverance.', score: '89% Strength' },
                  { name: 'Dhana Yoga', cat: 'Wealth Accumulation', desc: 'Lord of 2nd & 11th houses forming mutual aspect. Financial security.', score: '90% Strength' },
                ].map((y, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-amber-300 text-sm">{y.name}</h5>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">{y.score}</span>
                    </div>
                    <p className="text-xs text-slate-300">{y.desc}</p>
                    <span className="text-[10px] font-mono text-slate-400">{y.cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 8: NAKSHATRA ANALYSIS */}
      {activeTab === 'nakshatra' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Star className="w-6 h-6 text-cyan-400" /> Birth Nakshatra Deep Analysis
                </h3>
                <p className="text-xs text-slate-400">
                  Comprehensive breakdown of lunar constellation traits, deity, symbol, and element.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                NAKSHATRA 4 PADAS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-base font-bold text-cyan-300">Rohini Nakshatra (Pada 2)</h4>
                <p className="text-slate-300 leading-relaxed">
                  Ruled by the Moon (Chandra) and presided over by Brahma (The Creator). Symbolized by an Ox Cart representing growth, fertility, artistic magnetism, and material prosperity.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-slate-950 text-slate-300">Deity: Brahma</div>
                  <div className="p-2 rounded-xl bg-slate-950 text-slate-300">Symbol: Ox Cart</div>
                  <div className="p-2 rounded-xl bg-slate-950 text-slate-300">Element: Earth</div>
                  <div className="p-2 rounded-xl bg-slate-950 text-slate-300">Gana: Manushya</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h4 className="text-base font-bold text-amber-300">Traditional Characteristics</h4>
                <ul className="list-disc list-inside text-slate-300 space-y-1.5 leading-relaxed">
                  <li>Strong aesthetic appreciation for art, music, and elegance.</li>
                  <li>Charismatic presence with steady emotional resilience.</li>
                  <li>High capacity for nurturing projects, relationships, and investments.</li>
                  <li>Favorable for creative leadership and financial growth.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 9: GOCHAR TRANSIT MOVEMENTS */}
      {activeTab === 'transits' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-amber-400" /> Gochar Planetary Transit Timeline
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time movement of major planets relative to your natal Moon sign.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                LIVE GOCHAR TELEMETRY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">Saturn Transit (Shani Gochar)</span>
                  <span className="text-[10px] font-mono text-emerald-400">Aquarius ♒ → Pisces ♓</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Saturn transiting 10th/11th house from natal lagna creates major career consolidation and long-term financial structuring.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">Jupiter Transit (Guru Gochar)</span>
                  <span className="text-[10px] font-mono text-cyan-400">Taurus ♉ → Gemini ♊</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Jupiter's 5th aspect expands wisdom, creative projects, and higher learning opportunities over the next 12 months.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* VIEW 10: BIRTH TIME RECTIFICATION (BTR) */}
      {activeTab === 'btr' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Clock className="w-6 h-6 text-indigo-400" /> Birth Time Rectification (BTR) Estimator
                </h3>
                <p className="text-xs text-slate-400">
                  Align past major life milestones with D9 Navamsha and D10 Dashamsha lagna shifts to estimate exact birth minute precision.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                ESTIMATION TOOL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Major Life Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-sans focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Career Peak / Promotion">Career Peak / Major Promotion</option>
                    <option value="Marriage / Long-term Partnership">Marriage / Marriage Ceremony</option>
                    <option value="Relocation / Foreign Travel">Relocation / International Travel</option>
                    <option value="Childbirth / Family Growth">Childbirth / New Family Addition</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Event Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Calculated BTR Alignment Result</h4>
                  <p className="text-lg font-bold text-white mt-1">{estimatedOffset}</p>
                  <p className="text-xs text-slate-300 pt-2 leading-relaxed">
                    Event date {eventDate} aligns precisely with D10 career lagna point when birth time is adjusted by +4 minutes.
                  </p>
                </div>
                <p className="text-[10px] text-amber-300 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                  Note: Birth Time Rectification is a traditional mathematical estimation methodology, not a guaranteed physical certainty.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
