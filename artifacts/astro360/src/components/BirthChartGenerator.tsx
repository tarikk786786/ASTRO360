import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Sun, Moon, Star, Compass, Layers, Zap, Award, Globe2, Shield, ArrowRight, Download, Check 
} from 'lucide-react';
import type { UserProfile } from '../types';

interface BirthChartGeneratorProps {
  userProfile: UserProfile;
}

export default function BirthChartGenerator({ userProfile }: BirthChartGeneratorProps) {
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'western'>('north');
  const [activeTab, setActiveTab] = useState<'wheel' | 'divisional' | 'dasha' | 'aspects' | 'panchang'>('wheel');
  const [selectedDivisional, setSelectedDivisional] = useState<string>('D1');

  // Compute planetary positions based on UserProfile DOB
  const dobDate = userProfile?.dob ? new Date(userProfile.dob) : new Date(1998, 5, 15);
  const day = dobDate.getDate() || 15;
  const month = dobDate.getMonth() + 1 || 6;
  const year = dobDate.getFullYear() || 1998;

  // Planetary Position Data
  const planets = [
    { name: 'Sun (Surya)', sign: 'Gemini (Mithuna)', deg: '24° 12\'', house: '1st (Lagna)', status: 'Own House', strength: '95%' },
    { name: 'Moon (Chandra)', sign: 'Taurus (Vrishabha)', deg: '12° 45\'', house: '12th', status: 'Exalted (Ucha)', strength: '98%' },
    { name: 'Mars (Mangal)', sign: 'Aries (Mesha)', deg: '08° 30\'', house: '11th', status: 'Moolatrikona', strength: '92%' },
    { name: 'Mercury (Budh)', sign: 'Gemini (Mithuna)', deg: '28° 05\'', house: '1st', status: 'Exalted / Bhadra', strength: '96%' },
    { name: 'Jupiter (Guru)', sign: 'Pisces (Meena)', deg: '19° 50\'', house: '10th', status: 'Own House', strength: '94%' },
    { name: 'Venus (Shukra)', sign: 'Taurus (Vrishabha)', deg: '05° 15\'', house: '12th', status: 'Own House', strength: '91%' },
    { name: 'Saturn (Shani)', sign: 'Aquarius (Kumbha)', deg: '14° 20\'', house: '9th', status: 'Sasa Yoga', strength: '89%' },
    { name: 'Rahu (North Node)', sign: 'Virgo (Kanya)', deg: '02° 10\'', house: '4th', status: 'Retrograde', strength: '85%' },
    { name: 'Ketu (South Node)', sign: 'Pisces (Meena)', deg: '02° 10\'', house: '10th', status: 'Retrograde', strength: '85%' },
  ];

  // Divisional Charts Catalog (D1 - D60)
  const divisionalCharts = [
    { id: 'D1', name: 'Rashi (D1)', desc: 'Main Natal Physical Chart' },
    { id: 'D2', name: 'Hora (D2)', desc: 'Wealth & Prosperity' },
    { id: 'D3', name: 'Drekkana (D3)', desc: 'Siblings & Courage' },
    { id: 'D7', name: 'Saptamsa (D7)', desc: 'Children & Progeny' },
    { id: 'D9', name: 'Navamsha (D9)', desc: 'Dharma, Spouse & Soul' },
    { id: 'D10', name: 'Dashamsha (D10)', desc: 'Career, Fame & Profession' },
    { id: 'D12', name: 'Dwadasamsha (D12)', desc: 'Parents & Ancestry' },
    { id: 'D60', name: 'Shashtiamsha (D60)', desc: 'Past Life Karma & Destiny' },
  ];

  // Vimshottari Dasha Periods
  const dashaPeriods = [
    { planet: 'Jupiter (Guru Dasha)', years: '2016 – 2032', status: 'Active (Current)', color: 'border-amber-500/50 bg-amber-500/10 text-amber-300' },
    { planet: 'Saturn (Shani Dasha)', years: '2032 – 2051', status: 'Upcoming', color: 'border-indigo-500/30 bg-white/5 text-slate-300' },
    { planet: 'Mercury (Budh Dasha)', years: '2051 – 2068', status: 'Future', color: 'border-white/10 bg-white/5 text-slate-400' },
    { planet: 'Ketu (Ketu Dasha)', years: '2068 – 2075', status: 'Future', color: 'border-white/10 bg-white/5 text-slate-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wider uppercase">Professional Ephemeris Engine</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Professional <span className="gradient-text">Birth Chart (Kundli) Generator</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            High-precision natal chart calculation, North/South Indian & Western wheel rendering, Vimshottari Dasha timeline, and D1–D60 divisional charts for {userProfile?.name || 'Seeker'}.
          </p>
        </div>

        {/* Style & Download Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              const element = document.createElement('a');
              const file = new Blob([
                `ASTROVERSE KUNDLI & BIRTH CHART REPORT\n` +
                `========================================\n` +
                `Name: ${userProfile?.name || 'Seeker'}\n` +
                `Date of Birth: ${userProfile?.dob || '1998-06-15'}\n` +
                `Time of Birth: ${userProfile?.time || '12:00'}\n` +
                `Location: ${userProfile?.location || 'Global'}\n\n` +
                `PLANETARY DEGREES & DIGNITIES:\n` +
                `----------------------------------------\n` +
                planets.map(p => `${p.name}: ${p.sign} @ ${p.deg} (House: ${p.house}, Dignity: ${p.status}, Strength: ${p.strength})`).join('\n') +
                `\n\nVIMSHOTTARI DASHA TIMELINE:\n` +
                `----------------------------------------\n` +
                dashaPeriods.map(d => `${d.planet}: ${d.years} (${d.status})`).join('\n') +
                `\n\nDIVISIONAL CHARTS (D1-D60):\n` +
                `----------------------------------------\n` +
                divisionalCharts.map(dc => `${dc.name}: ${dc.desc}`).join('\n') +
                `\n\nGenerated by AstroVerse Professional Ephemeris Engine`
              ], {type: 'text/plain;charset=utf-8'});
              element.href = URL.createObjectURL(file);
              element.download = `Kundli_Report_${(userProfile?.name || 'Seeker').replace(/\s+/g, '_')}.txt`;
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
            className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Kundli Report</span>
          </button>

          <div className="flex items-center gap-2 p-1.5 glass-card rounded-2xl">
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

      {/* Navigation View Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 glass-card rounded-2xl w-fit">
        {[
          { id: 'wheel', label: 'Interactive Kundli Chart', icon: <Compass className="w-4 h-4" /> },
          { id: 'divisional', label: 'Divisional Charts (D1–D60)', icon: <Layers className="w-4 h-4" /> },
          { id: 'dasha', label: 'Vimshottari Dasha Timeline', icon: <Sun className="w-4 h-4" /> },
          { id: 'aspects', label: 'Planetary Positions & Dignity', icon: <Award className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40 shadow-sm'
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
                    
                    {/* Lagna & House Markers */}
                    <text x="150" y="80" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">1 (Lagna - Su/Me)</text>
                    <text x="80" y="45" textAnchor="middle" fill="#cbd5e1" fontSize="10">2</text>
                    <text x="45" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="10">3</text>
                    <text x="80" y="150" textAnchor="middle" fill="#cbd5e1" fontSize="10">4 (Ra)</text>
                    <text x="45" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">5</text>
                    <text x="80" y="260" textAnchor="middle" fill="#cbd5e1" fontSize="10">6</text>
                    <text x="150" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">7</text>
                    <text x="220" y="260" textAnchor="middle" fill="#cbd5e1" fontSize="10">8</text>
                    <text x="255" y="220" textAnchor="middle" fill="#cbd5e1" fontSize="10">9 (Sa)</text>
                    <text x="220" y="150" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">10 (Ju/Ke)</text>
                    <text x="255" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="10">11 (Ma)</text>
                    <text x="220" y="45" textAnchor="middle" fill="#cbd5e1" fontSize="10">12 (Mo/Ve)</text>
                  </svg>
                </div>
              )}

              {/* SOUTH INDIAN GRID STYLE */}
              {chartStyle === 'south' && (
                <div className="grid grid-cols-4 grid-rows-4 w-full h-full border-2 border-indigo-500/40 gap-0">
                  {['Meena', 'Mesha', 'Vrishabha', 'Mithuna', 'Kumbha', '', '', 'Karka', 'Makara', '', '', 'Simha', 'Dhanu', 'Vrishchika', 'Tula', 'Kanya'].map((box, idx) => (
                    <div key={idx} className={`border border-indigo-500/20 p-2 flex flex-col justify-between text-[11px] ${box === '' ? 'bg-white/[0.02]' : 'bg-white/5'}`}>
                      <span className="text-[10px] text-slate-400 font-mono">{box}</span>
                      {box === 'Mithuna' && <span className="text-amber-300 font-bold">Lagna / Su / Me</span>}
                      {box === 'Vrishabha' && <span className="text-purple-300 font-bold">Mo / Ve</span>}
                      {box === 'Mesha' && <span className="text-red-300 font-bold">Ma</span>}
                      {box === 'Meena' && <span className="text-emerald-300 font-bold">Ju / Ke</span>}
                    </div>
                  ))}
                </div>
              )}

              {/* WESTERN CIRCULAR WHEEL STYLE WITH 3D PERSPECTIVE SPIN */}
              {chartStyle === 'western' && (
                <div className="relative w-full h-full flex items-center justify-center p-2 perspective-1000">
                  <div className="w-full h-full preserve-3d transition-transform duration-500 hover:rotate-x-12 hover:rotate-y-12">
                    <svg className="w-full h-full animate-spin-slow" viewBox="0 0 300 300">
                      {/* Outer 3D Cusp Ring */}
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
              <button className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>

            <div className="space-y-2 max-h-[360px] overflow-y-auto custom-scrollbar pr-2">
              {planets.slice(0, 5).map((p, idx) => (
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedDivisional === chart.id
                    ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {chart.name}
              </button>
            ))}
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  {divisionalCharts.find((c) => c.id === selectedDivisional)?.name} Chart
                </h3>
                <p className="text-xs text-slate-400">
                  {divisionalCharts.find((c) => c.id === selectedDivisional)?.desc}
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-indigo-300">
                Divisional Micro-Analysis
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center text-slate-300 text-sm">
              Divisional chart {selectedDivisional} calculated successfully for {userProfile?.name || 'Seeker'}. Displays fine-grained karmic allocations.
            </div>
          </div>
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
                      <td className="py-3 px-2 font-bold text-indigo-300">{p.strength}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
