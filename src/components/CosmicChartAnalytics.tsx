import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, PieChart, Activity, ShieldCheck, Sparkles } from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';

const ELEMENT_DATA = [
  { subject: 'Fire (Agni)', value: 85, fullMark: 100 },
  { subject: 'Earth (Prithvi)', value: 92, fullMark: 100 },
  { subject: 'Air (Vayu)', value: 68, fullMark: 100 },
  { subject: 'Water (Jala)', value: 74, fullMark: 100 },
  { subject: 'Ether (Akasha)', value: 88, fullMark: 100 },
];

const SHADBALA_DATA = [
  { planet: 'Sun ☉', strength: 145, color: '#F59E0B' },
  { planet: 'Moon ☽', strength: 160, color: '#06B6D4' },
  { planet: 'Mars ♂', strength: 95, color: '#EF4444' },
  { planet: 'Mercury ☿', strength: 155, color: '#10B981' },
  { planet: 'Jupiter ♃', strength: 135, color: '#D4AF37' },
  { planet: 'Venus ♀', strength: 120, color: '#EC4899' },
  { planet: 'Saturn ♄', strength: 110, color: '#8B5CF6' }
];

export default function CosmicChartAnalytics() {
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
            <span className="text-[10px] font-mono text-emerald-400">Earth Dominant (92%)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ELEMENT_DATA}>
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
            <span className="text-[10px] font-mono text-cyan-400">Peak: Moon (160) & Mercury (155)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SHADBALA_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="planet" stroke="#94A3B8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94A3B8" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.2)', color: '#FFF', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="strength" radius={[6, 6, 0, 0]}>
                  {SHADBALA_DATA.map((entry, index) => (
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
