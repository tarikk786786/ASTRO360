import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Calendar, Compass, Layers, Heart, Briefcase, 
  DollarSign, ArrowRight, ShieldCheck, Clock, CheckCircle2 
} from 'lucide-react';

interface OmniProductPreviewProps {
  onExplore: () => void;
}

export default function OmniProductPreview({ onExplore }: OmniProductPreviewProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'forecast' | 'chart' | 'compare'>('today');

  return (
    <section id="product-preview" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Your entire astrology experience. In one place.
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          From your birth chart to long-term cycles, ASTRO360 brings different traditions into one simple interface.
        </p>
      </div>

      {/* 4 Interactive Tab Switchers */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: 'today', label: 'Today', icon: Sparkles },
          { id: 'forecast', label: 'Forecast', icon: Calendar },
          { id: 'chart', label: 'Birth Chart', icon: Compass },
          { id: 'compare', label: 'Compare Systems', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-sm border-amber-400 shadow-lg shadow-amber-400/20'
                  : 'bg-[#0B1220] text-slate-400 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Screen Mockup Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/15 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* Tab 1: Today */}
          {activeTab === 'today' && (
            <motion.div
              key="today"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                    TODAY'S GUIDANCE
                  </span>
                  <h3 className="text-lg font-bold text-white">Strongest Theme: ✨ Personal Growth</h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold self-start sm:self-auto">
                  Strong Resonance Today
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-pink-500/30 text-slate-200">
                  <div className="text-pink-400 font-bold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> Love
                  </div>
                  <div className="text-sm font-bold text-white pt-1">Positive Flow</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/[0.08] text-slate-200">
                  <div className="text-cyan-400 font-bold flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> Career
                  </div>
                  <div className="text-sm font-bold text-white pt-1">High Focus</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/[0.08] text-slate-200">
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> Money
                  </div>
                  <div className="text-sm font-bold text-white pt-1">Balanced</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/30 text-slate-200">
                  <div className="text-purple-400 font-bold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Travel
                  </div>
                  <div className="text-sm font-bold text-white pt-1">Active Horizon</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-between gap-4">
                <span>You have elevated solar discipline today. Ideal for finalizing key proposals and high-visibility decisions.</span>
                <button
                  onClick={onExplore}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs shrink-0 cursor-pointer"
                >
                  Explore Today's Guidance →
                </button>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Forecast */}
          {activeTab === 'forecast' && (
            <motion.div
              key="forecast"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="border-b border-white/10 pb-3 space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  YOUR NEXT IMPORTANT TIMING WINDOWS
                </span>
                <h3 className="text-lg font-bold text-white">See what's coming next across months & cycles</h3>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {/* Career Bar */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Career Expansion & Leadership
                    </span>
                    <span className="text-cyan-400 font-bold">Sep 12 – Oct 28</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 w-[88%]" />
                  </div>
                </div>

                {/* Love Bar */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-pink-400" /> Relationship Depth & Commitment
                    </span>
                    <span className="text-pink-400 font-bold">Oct 4 – Nov 18</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-purple-400 w-[74%]" />
                  </div>
                </div>

                {/* Growth Bar */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Academic & Soul Wisdom
                    </span>
                    <span className="text-amber-400 font-bold">Late 2026</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 w-[92%]" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Birth Chart */}
          {activeTab === 'chart' && (
            <motion.div
              key="chart"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
            >
              <div className="sm:col-span-6 flex justify-center py-2">
                <svg viewBox="0 0 200 200" className="w-48 h-48">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
                  <circle cx="100" cy="100" r="30" fill="#0F172A" stroke="#F59E0B" strokeWidth="1" />
                  <text x="100" y="104" textAnchor="middle" fill="#F59E0B" fontSize="8" fontWeight="bold" fontFamily="monospace">
                    CHART
                  </text>
                  <circle cx="100" cy="20" r="6" fill="#F59E0B" />
                  <circle cx="170" cy="100" r="6" fill="#06B6D4" />
                  <circle cx="50" cy="150" r="6" fill="#A855F7" />
                </svg>
              </div>

              <div className="sm:col-span-6 space-y-3 text-xs font-mono text-left">
                <div className="border-b border-white/10 pb-2">
                  <span className="text-[10px] uppercase text-amber-400 font-bold">KEY PLACEMENTS</span>
                  <h4 className="text-sm font-bold text-white">Your Celestial Blueprint</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-amber-400 font-bold">☀️ Sun in Leo</span>
                    <span className="text-slate-300">Confidence & Purpose</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-cyan-400 font-bold">🌙 Moon in Taurus</span>
                    <span className="text-slate-300">Emotional Stability</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-purple-400 font-bold">↑ Asc in Sagittarius</span>
                    <span className="text-slate-300">Exploration & Truth</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Compare Systems */}
          {activeTab === 'compare' && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-xs font-mono"
            >
              <div className="border-b border-white/10 pb-2 flex justify-between items-center">
                <span className="text-[10px] uppercase text-emerald-400 font-bold">
                  MULTI-TRADITION CONSENSUS
                </span>
                <span className="text-[10px] text-slate-400">4 Traditions Analyzed</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-500">
                      <th className="py-1 px-2">Domain</th>
                      <th className="py-1 px-2">Vedic</th>
                      <th className="py-1 px-2">Western</th>
                      <th className="py-1 px-2">KP</th>
                      <th className="py-1 px-2">Chinese</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    <tr>
                      <td className="py-2 px-2 font-bold text-white">💼 Career</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">Strong</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">Strong</td>
                      <td className="py-2 px-2 text-cyan-400 font-bold">Moderate</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">Strong</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 font-bold text-white">❤️ Love</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">Strong</td>
                      <td className="py-2 px-2 text-cyan-400 font-bold">Moderate</td>
                      <td className="py-2 px-2 text-emerald-400 font-bold">Strong</td>
                      <td className="py-2 px-2 text-cyan-400 font-bold">Moderate</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] leading-relaxed">
                ✓ All 4 traditions agree: Your professional execution and vitality are in an expansive peak period.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
