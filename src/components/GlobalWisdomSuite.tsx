import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe2, Sparkles, BookOpen, Sun, Moon, Flame, Heart, Shield, Compass, ChevronRight } from 'lucide-react';
import type { UserProfile } from '../types';

interface GlobalWisdomSuiteProps {
  userProfile: UserProfile;
}

export default function GlobalWisdomSuite({ userProfile }: GlobalWisdomSuiteProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'compatibility' | 'forecast' | 'open-source-matrix'>('overview');

  const traditionsList = [
    { name: 'Islamic Astronomy (Nujum)', region: 'Middle East & North Africa', icon: '🌙', desc: '28 Lunar Mansions, Abjad Jafr numerology, Firdaria planetary periods, and Prayer alignment.' },
    { name: 'Vedic Astrology (Jyotish)', region: 'South Asia & India', icon: '🕉️', desc: 'Sidereal natal chart, Nakshatras, Vimshottari Dasha, Shadbala dignity, and D1-D60 charts.' },
    { name: 'Western Tropical Astrology', region: 'Europe & Americas', icon: '⭐', desc: 'Sun-sign archetypes, house cusps, geometric planetary aspects, and transit cycles.' },
    { name: 'Chinese BaZi & Feng Shui', region: 'East Asia & China', icon: '☯️', desc: 'Four Pillars of Destiny, 5 Elements (Wood, Fire, Earth, Metal, Water), and Yin-Yang dynamics.' },
    { name: 'Mayan Tzolkin Sacred Calendar', region: 'Mesoamerica & Americas', icon: '🌽', desc: '260-day sacred matrix, 20 Day Signs, 13 Galactic Tones, and Kin solar energy.' },
    { name: 'Celtic Tree Astrology', region: 'Ancient Britain & Ireland', icon: '🌳', desc: '13 Lunar sacred trees, Druidic earth wisdom, and seasonal lunar attunement.' },
  ];

  // Open-Source Engine Integrations Catalog
  const openSourceEngines = [
    { name: 'Swiss Ephemeris (swisseph)', repo: 'aloistr/swisseph', domain: 'Astrology Math', desc: 'NASA JPL DE431 ephemeris calculations, planetary longitudes, & exact house cusps.' },
    { name: 'Flatlib', repo: 'flatangle/flatlib', domain: 'Python Astrology', desc: 'Natal charts, planetary aspects, retrograde motion, & transit orb detection.' },
    { name: 'PyHora (Vedic)', repo: 'naturalstupid/PyHora', domain: 'Vedic Jyotish', desc: 'Panchanga tithi, Nakshatra padas, Vimshottari Dasha, & Yogas calculation.' },
    { name: 'VedAstro', repo: 'VedAstro/VedAstro', domain: 'Global Astrological Engine', desc: 'Multi-system predictive algorithm, planetary strength scores, & transits.' },
    { name: 'Kerykeion', repo: 'g-battaglia/kerykeion', domain: 'Natal & Synastry SVG', desc: 'SVG wheel chart generator, composite charts, & dual-synastry vector matching.' },
    { name: 'AlAdhan API & Hadith API', repo: 'islamic-network/api.aladhan.com', domain: 'Islamic Astronomy', desc: 'Hijri lunar calendar calculation, Qibla azimuth, & prayer time ephemeris.' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Globe2 className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase">Universal Human Wisdom Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">
            AstroVerse <span className="gradient-text">Global Wisdom Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            A universal platform unifying all global cultural astrology, astronomical sciences, and spiritual traditions for every seeker worldwide.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: '🌐 All Global Traditions' },
          { id: 'compatibility', label: '❤️ Cross-Tradition Matchmaker' },
          { id: 'forecast', label: '🔮 Universal 24H Forecast' },
          { id: 'open-source-matrix', label: '🛠️ Open-Source Engine Integrations' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'glass-card text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Views */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {traditionsList.map((trad, idx) => (
              <div key={idx} className="glass-card rounded-3xl p-6 border border-slate-800 space-y-3 hover:border-amber-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{trad.icon}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{trad.region}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-slate-100">{trad.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{trad.desc}</p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'compatibility' && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6"
          >
            <h2 className="text-2xl font-display font-bold text-slate-100">Universal Cross-Tradition Matchmaker</h2>
            <p className="text-xs text-slate-400">Synthesizes Ashta Kuta Guna Milan (Vedic) + Western Synastry + Chinese Animal Harmony into 1 score.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase">Vedic Ashta Kuta Score</div>
                <div className="text-3xl font-display font-bold text-slate-100">31 / 36</div>
                <p className="text-xs text-slate-300">Nadi & Bhakoot compatibility: Excellent harmony.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase">Western Synastry Trine</div>
                <div className="text-3xl font-display font-bold text-slate-100">92%</div>
                <p className="text-xs text-slate-300">Sun trine Moon & Venus sextile Mars alignment.</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-blue-400 uppercase">Chinese BaZi Harmony</div>
                <div className="text-3xl font-display font-bold text-slate-100">San He Trine</div>
                <p className="text-xs text-slate-300">Compatible Earth & Metal elemental pillars.</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'forecast' && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6"
          >
            <h2 className="text-2xl font-display font-bold text-slate-100">Universal 24-Hour Cosmic Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase">Morning Solar Energy</span>
                <p className="text-sm text-slate-200">High initiative window. Ideal for executing major communications and strategy.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase">Evening Lunar Transit</span>
                <p className="text-sm text-slate-200">Reflective lunar phase. Perfect for spiritual study, meditation, and rest.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* NEW OPEN-SOURCE REPOSITORIES & LIBRARIES MATRIX */}
        {activeTab === 'open-source-matrix' && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-400" /> Open-Source Engine Integrations Matrix
                  </h2>
                  <p className="text-xs text-slate-400">
                    Integrating industry-standard open-source astrology calculation engines, ephemeris libraries, and spiritual APIs.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  GITHUB INTEGRATED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                {openSourceEngines.map((engine, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-amber-500/30 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {engine.domain}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{engine.repo}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-100">{engine.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{engine.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
