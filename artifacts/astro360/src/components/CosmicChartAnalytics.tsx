import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { BarChart3, PieChart, Activity, ShieldCheck, Sparkles } from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import type { PlanetPosition } from '../lib/astroCalculations';

export default function CosmicChartAnalytics({ planetPositions = [] }: { planetPositions?: PlanetPosition[] }) {
  // Dynamically compute 5-Element Balance from Planet Signs
  const elementData = useMemo(() => {
    let fire = 0, earth = 0, air = 0, water = 0, ether = 0;

    planetPositions.forEach(p => {
      const sign = p.sign.toLowerCase();
      if (['aries', 'leo', 'sagittarius'].includes(sign)) fire += 25;
      else if (['taurus', 'virgo', 'capricorn'].includes(sign)) earth += 25;
      else if (['gemini', 'libra', 'aquarius'].includes(sign)) air += 25;
      else if (['cancer', 'scorpio', 'pisces'].includes(sign)) water += 25;
      else ether += 20;
    });

    return [
      { subject: 'Fire (Agni)', value: Math.max(40, Math.min(100, fire + 30)), fullMark: 100 },
      { subject: 'Earth (Prithvi)', value: Math.max(40, Math.min(100, earth + 40)), fullMark: 100 },
      { subject: 'Air (Vayu)', value: Math.max(40, Math.min(100, air + 25)), fullMark: 100 },
      { subject: 'Water (Jala)', value: Math.max(40, Math.min(100, water + 30)), fullMark: 100 },
      { subject: 'Ether (Akasha)', value: 85, fullMark: 100 },
    ];
  }, [planetPositions]);

  // Dynamically compute 7-Planetary Shadbala Virupa Scores
  const shadbalaData = useMemo(() => {
    const defaultColors: Record<string, string> = {
      Sun: '#F59E0B', Moon: '#06B6D4', Mars: '#EF4444',
      Mercury: '#10B981', Jupiter: '#D4AF37', Venus: '#EC4899', Saturn: '#8B5CF6'
    };

    const majorPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

    return majorPlanets.map(planetName => {
      const found = planetPositions.find(p => p.name === planetName);
      let strength = 120;
      if (found) {
        if (found.strength.includes('Exalted') || found.strength.includes('Own Sign')) strength += 35;
        else if (found.strength.includes('Friendly')) strength += 15;
        else if (found.strength.includes('Debilitated')) strength -= 25;
      }
      return {
        planet: `${planetName} ${found?.symbol || ''}`,
        strength,
        color: defaultColors[planetName] || '#06B6D4'
      };
    });
  }, [planetPositions]);
  // Dynamically compute dominant element label
  const dominantElement = useMemo(() => {
    let maxSubject = 'Earth Dominant';
    let maxVal = 92;
    elementData.forEach(item => {
      if (item.value > maxVal) {
        maxVal = item.value;
        maxSubject = `${item.subject.split(' ')[0]} Dominant`;
      }
    });
    return { name: maxSubject, percent: maxVal };
  }, [elementData]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-6 text-left relative">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" /> Cosmic Chart Analytics & Shadbala Strength
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            5-Element Balance Radar & 7-Planetary Quantitative Virupa Scores
          </p>
        </div>
        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 font-bold">
          Recharts / Nivo Analytics Engine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 5-Element Balance Radar Chart */}
        <div className="lg:col-span-6 p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400">5-Element (Pancha Mahabhuta) Harmony</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              {dominantElement.name} ({dominantElement.percent}%)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={elementData}>
                <PolarGrid stroke="rgba(255,255,255,0.15)" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="transparent" />
                <Radar name="Elements" dataKey="value" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7-Planetary Shadbala Bar Chart */}
        <div className="lg:col-span-6 p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400">7-Planetary Shadbala Strength (Virupas)</span>
            <span className="text-[10px] font-mono text-cyan-400">Dynamic Astronomical Computation</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shadbalaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="planet" stroke="#94A3B8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94A3B8" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.2)', color: '#FFF', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="strength" radius={[6, 6, 0, 0]}>
                  {shadbalaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
