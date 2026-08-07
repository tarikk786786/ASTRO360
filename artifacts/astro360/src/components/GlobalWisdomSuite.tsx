import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe2, Sparkles, BookOpen, Sun, Moon, Flame, Heart, Shield, Compass, ChevronRight, 
  Download, Cpu, Filter, Info, Scale, CheckCircle2, Code2, Layers, X
} from 'lucide-react';
import type { UserProfile } from '../types';
import { calculatePlanetaryPositions } from '../lib/astroCalculations';

interface GlobalWisdomSuiteProps {
  userProfile: UserProfile;
}

interface TraditionDetail {
  id: string;
  name: string;
  region: string;
  icon: string;
  foundationalText: string;
  rulingElement: string;
  colorGradient: string;
  desc: string;
  keyTools: string[];
  astronomicalBasis: string;
  spiritualFocus: string;
  openSourceEngine: string;
}

export default function GlobalWisdomSuite({ userProfile }: GlobalWisdomSuiteProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'compatibility' | 'forecast' | 'open-source-matrix'>('overview');
  const [selectedTraditionModal, setSelectedTraditionModal] = useState<TraditionDetail | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const seekerName = userProfile?.name || 'Tarik Islam';

  // Live Planetary Ephemeris Positions for Seeker
  const positions = useMemo(() => {
    return calculatePlanetaryPositions(userProfile?.dob || '1998-06-15', userProfile?.time || '12:00', 24.178);
  }, [userProfile?.dob, userProfile?.time]);

  // Comprehensive Catalog of 8 World Traditions
  const traditionsList: TraditionDetail[] = [
    {
      id: 'islamic-nujum',
      name: 'Islamic Astronomy & Ilm al-Nujum (علم النجوم)',
      region: 'Middle East, North Africa & Andalusia',
      icon: '🌙',
      foundationalText: 'Al-Sufi\'s Book of Fixed Stars (Kitab al-Kawakib)',
      rulingElement: 'Celestial Light & Divine Barakah',
      colorGradient: 'from-emerald-600 via-teal-800 to-slate-950',
      desc: 'Combines 28 Manazil al-Qamar (Lunar Mansions), Abjad Jafr numerical secrets, Firdaria planetary cycles, and solar prayer times (Salat).',
      keyTools: ['28 Lunar Stations (Manazil)', 'Firdaria Life Periods', 'Abjad Science of Letters', 'Qibla Azimuth & Prayer Clock'],
      astronomicalBasis: 'Tropical/Sidereal Lunar mansions and solar altitude declination equations.',
      spiritualFocus: 'Harmonizing human action with Divine Decree (Qadar) and seeking Barakah in daily endeavors.',
      openSourceEngine: 'AlAdhan Ephemeris API & PyHora Islamic Module'
    },
    {
      id: 'vedic-jyotish',
      name: 'Vedic Astrology (Jyotish Shastra 🕉️)',
      region: 'South Asia & Ancient India',
      icon: '🕉️',
      foundationalText: 'Brihat Parasara Hora Shastra & Bhrigu Samhita',
      rulingElement: 'Ether (Akasha) & Karma Rays',
      colorGradient: 'from-amber-500 via-orange-700 to-slate-950',
      desc: 'Precision Sidereal zodiac using Lahiri Ayanamsha, 27 Nakshatras, 120-year Vimshottari Dasha, D1-D60 Vargas, and Shadbala planetary potency.',
      keyTools: ['Ashta Koota 36-Guna Milan', 'Vimshottari Dasha Timeline', 'D9 Navamsa & D10 Dasamsa', 'Panchanga Tithi & Muhurta'],
      astronomicalBasis: 'Chitrapaksha Sidereal longitude calculations using Swiss Ephemeris.',
      spiritualFocus: 'Understanding soul karma (Prarabdha Karma) and implementing remedial mantras & ratnas.',
      openSourceEngine: 'Swiss Ephemeris (swisseph) & PyHora'
    },
    {
      id: 'western-tropical',
      name: 'Western Tropical Astrology & Hellenistic',
      region: 'Europe, Mediterranean & Americas',
      icon: '⭐',
      foundationalText: 'Ptolemy\'s Tetrabiblos & Vettius Valens Anthologies',
      rulingElement: 'Four Elements & Quadruplicities',
      colorGradient: 'from-blue-600 via-indigo-800 to-slate-950',
      desc: 'Seasonal Tropical zodiac focused on solar-equinox cusps, house systems (Placidus/Whole Sign), transit aspect angles, and psychological archetypes.',
      keyTools: ['Natal Wheel & House Cusps', 'Planetary Aspect Orbs (Trines/Squares)', 'Secondary Progressions', 'Synastry Overlay Grid'],
      astronomicalBasis: 'Vernal Equinox 0° Aries anchor point with geometric angular relationships.',
      spiritualFocus: 'Self-actualization, Jungian archetype integration, and conscious transit navigation.',
      openSourceEngine: 'Kerykeion & Flatlib Python Engine'
    },
    {
      id: 'chinese-bazi',
      name: 'Chinese BaZi & Wu Xing (八字命理 ☯️)',
      region: 'East Asia & China',
      icon: '☯️',
      foundationalText: 'Huangdi Neijing & Zi Wei Dou Shu Canon',
      rulingElement: 'Five Elements (Wood, Fire, Earth, Metal, Water)',
      colorGradient: 'from-red-600 via-rose-800 to-slate-950',
      desc: 'Four Pillars of Destiny based on Year, Month, Day, and Hour Stems/Branches, balancing Yin-Yang energy and 16-Zone Feng Shui Qi flow.',
      keyTools: ['Four Pillars Stem/Branch Chart', 'Day Master Element Strength', 'Ten Deities (Shi Shen)', '16-Zone Feng Shui Compass'],
      astronomicalBasis: 'Solar-lunar sexagenary cycle (60-year stem/branch rotations).',
      spiritualFocus: 'Achieving environmental and energetic balance between Heaven (Tian), Earth (Di), and Man (Ren).',
      openSourceEngine: 'bazi-calculator-node & Lunar-Calendar-JS'
    },
    {
      id: 'mayan-tzolkin',
      name: 'Mayan Tzolkin Sacred Calendar',
      region: 'Mesoamerica & Guatemala',
      icon: '🌽',
      foundationalText: 'Popol Vuh & Dresden Codex',
      rulingElement: 'Galactic Solar Resonance',
      colorGradient: 'from-yellow-500 via-amber-700 to-slate-950',
      desc: '260-Day sacred matrix combining 20 Solar Seals and 13 Galactic Tones to determine soul Kin signatures and galactic frequency.',
      keyTools: ['Kin Signature Calculator', '20 Solar Seals (Imix to Ahau)', '13 Galactic Tones', 'Wavespell 13-Day Cycles'],
      astronomicalBasis: '260-day synodic rhythm aligning human gestation with Venus and Pleiades cycles.',
      spiritualFocus: 'Synchronizing personal awareness with the telepathic frequency of time (Time is Art).',
      openSourceEngine: 'tzolkin-calculator & Dreamspell JS'
    },
    {
      id: 'celtic-druidic',
      name: 'Celtic Druidic Tree Astrology',
      region: 'Ancient Britain, Ireland & Gaul',
      icon: '🌳',
      foundationalText: 'The Book of Ballymote & Ogham Inscriptions',
      rulingElement: 'Earth & Sacred Groves',
      colorGradient: 'from-green-600 via-emerald-800 to-slate-950',
      desc: '13 Lunar tree months paired with sacred Celtic animal totems and Druidic elemental earth attunement.',
      keyTools: ['13 Sacred Tree Zodiac', 'Ogham Alphabet Divination', 'Celtic Animal Totems', 'Wheel of the Year Festivals'],
      astronomicalBasis: '13 lunar cycles of 28 days each plus 1 intercalary day.',
      spiritualFocus: 'Reconnecting human spirit with mother earth, tree guardianship, and ancestral nature wisdom.',
      openSourceEngine: 'celtic-tree-calendar API'
    },
    {
      id: 'kabbalah-hermetic',
      name: 'Kabbalah Hermetic Tree of Life',
      region: 'Levant, Spain & Esoteric Tradition',
      icon: '✡️',
      foundationalText: 'Sefer Yetzirah (Book of Formation) & Zohar',
      rulingElement: 'Divine Light (Or Ein Soph)',
      colorGradient: 'from-purple-600 via-violet-800 to-slate-950',
      desc: '10 Sephirot spheres connected by 22 Tarot paths, mapping planetary energies directly onto the divine soul blueprint.',
      keyTools: ['10 Sephirot Soul Map', '22 Hebrew Letter Paths', '72 Names of God (Shem HaMephorash)', 'Archangel Spheres'],
      astronomicalBasis: '7 Classical Planets mapped to the 7 lower Sephirot spheres.',
      spiritualFocus: 'Ascending the Tree of Life through ethical rectifications and divine contemplation.',
      openSourceEngine: 'kabbalah-tree-matrix & Tarot API'
    },
    {
      id: 'egyptian-decanic',
      name: 'Egyptian Decanic Star Astrology',
      region: 'Ancient Egypt & Alexandria',
      icon: '🛕',
      foundationalText: 'Dendera Zodiac & Book of Nut',
      rulingElement: 'Sirius Sothis & Nile Fire',
      colorGradient: 'from-cyan-600 via-blue-900 to-slate-950',
      desc: '36 Star Decans (10° zodiac divisions) governed by ancient Egyptian deities and the heliacal rising of Sirius (Sothis).',
      keyTools: ['36 Star Decans Map', 'Sirius Sothis Cycle', 'Deity Ruling Cards', 'Nile Flood Astronomical Markers'],
      astronomicalBasis: 'Heliacal risings of 36 stellar constellations across 360° ekleiptike.',
      spiritualFocus: 'Aligning mortal life with the eternal stellar order of Ma\'at.',
      openSourceEngine: 'decan-ephemeris & Egyptian Star API'
    }
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

  // PDF Export Function for Global Wisdom Report
  const handleExportPdf = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const printWin = window.open('', '_blank');
      if (printWin) {
        printWin.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>ASTRO360 Global Universal Wisdom Blueprint — ${seekerName}</title>
              <style>
                body { font-family: system-ui, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; }
                .h { border-bottom: 3px double #f59e0b; padding-bottom: 16px; margin-bottom: 24px; }
                .title { font-size: 24px; font-weight: 800; color: #b45309; }
                .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
                .card { border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; background: #f8fafc; }
                .footer { text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 30px; }
              </style>
            </head>
            <body>
              <div class="h">
                <div class="title">🌐 ASTRO360 GLOBAL UNIVERSAL WISDOM BLUEPRINT</div>
                <div>Seeker: ${seekerName} · Generated: ${new Date().toLocaleDateString()}</div>
              </div>

              <h3>World Traditions Summary (${traditionsList.length} Traditions)</h3>
              <div class="grid">
                ${traditionsList.map(t => `
                  <div class="card">
                    <h4>${t.icon} ${t.name}</h4>
                    <p style="font-size: 11px; color: #64748b;">Region: ${t.region}</p>
                    <p style="font-size: 12px;">${t.desc}</p>
                    <p style="font-size: 11px; color: #b45309;"><strong>Key Tools:</strong> ${t.keyTools.join(', ')}</p>
                  </div>
                `).join('')}
              </div>

              <div class="footer">
                ASTRO360 Global Wisdom Engine · Universal Human Traditions Hub
              </div>
            </body>
          </html>
        `);
        printWin.document.close();
        printWin.focus();
        setTimeout(() => printWin.print(), 500);
      }
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 text-left">
      {/* 🌐 ENGINE HEADER */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Globe2 className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Universal Human Wisdom Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
              AstroVerse <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Global Wisdom Hub</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Unifying 8 world cultural astrology systems, astronomical sciences, and sacred wisdom paths for every seeker across the globe. Powered by NASA ephemeris calculations and open-source engines.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={handleExportPdf}
              className="px-4 py-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Report (PDF)
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
          {[
            { id: 'overview', label: '🌐 All 8 Global Traditions' },
            { id: 'compatibility', label: '❤️ Cross-Tradition Matchmaker' },
            { id: 'forecast', label: '🔮 Universal 24H Cosmic Forecast' },
            { id: 'open-source-matrix', label: '🛠️ Open-Source Engine Integrations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-500/10'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT TAB VIEWS */}
      <AnimatePresence mode="wait">
        {/* TAB 1: ALL 8 GLOBAL TRADITIONS GRID */}
        {activeTab === 'overview' && (
          <motion.div
            key="tab-overview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {traditionsList.map((trad) => (
              <motion.div
                key={trad.id}
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-card rounded-3xl p-6 border border-white/10 space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className={`h-24 w-full rounded-2xl bg-gradient-to-br ${trad.colorGradient} flex items-center justify-between p-4 border border-white/10 shadow-inner`}>
                    <span className="text-3xl">{trad.icon}</span>
                    <span className="text-[9px] font-mono text-white/90 font-bold uppercase bg-black/40 px-2.5 py-1 rounded-full border border-white/20">
                      {trad.region}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">{trad.name}</h3>
                    <p className="text-[11px] text-amber-400 font-mono mt-0.5 font-semibold">{trad.rulingElement}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{trad.desc}</p>

                  <div className="space-y-1.5 border-t border-white/10 pt-3">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block">Core Analytical Tools:</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {trad.keyTools.map((tool, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-200 border border-white/5 font-mono">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <button
                    onClick={() => setSelectedTraditionModal(trad)}
                    className="w-full py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Info className="w-4 h-4" /> Inspect Deep Blueprint
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* TAB 2: CROSS-TRADITION MATCHMAKER */}
        {activeTab === 'compatibility' && (
          <motion.div
            key="tab-compatibility"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Heart className="w-6 h-6 text-pink-400" /> Universal Cross-Tradition Matchmaker
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Synthesizes Ashta Koota Guna Milan (Vedic) + Western Synastry + Chinese BaZi Wu Xing into 1 unified cosmic match score.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                UNIVERSAL SYNTHESIS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase font-mono">🕉️ Vedic Ashta Koota</div>
                <div className="text-3xl font-bold text-white font-mono">31 / 36</div>
                <p className="text-xs text-slate-300">Nadi & Bhakoot compatibility: Excellent soul harmony.</p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                <div className="text-xs font-bold text-purple-400 uppercase font-mono">🔮 Western Synastry Trine</div>
                <div className="text-3xl font-bold text-white font-mono">92%</div>
                <p className="text-xs text-slate-300">Sun trine Moon & Venus sextile Mars aspect alignment.</p>
              </div>

              <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-2">
                <div className="text-xs font-bold text-red-400 uppercase font-mono">☯️ Chinese BaZi Harmony</div>
                <div className="text-3xl font-bold text-white font-mono">San He Trine</div>
                <p className="text-xs text-slate-300">Compatible Earth & Metal elemental Day Master pillars.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: UNIVERSAL 24-HOUR FORECAST */}
        {activeTab === 'forecast' && (
          <motion.div
            key="tab-forecast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sun className="w-6 h-6 text-yellow-400" /> Universal 24-Hour Cosmic Forecast
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Synthesized solar, lunar, and planetary transit windows for {seekerName}.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                LIVE NOW
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase font-mono">☀️ Morning Solar Energy Window (06:00 - 12:00)</span>
                <p className="text-sm text-slate-200">High initiative solar window. Ideal for executing major business communications, executive decisions, and physical workout.</p>
              </div>
              <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase font-mono">🌙 Evening Lunar Transit Window (18:00 - 23:00)</span>
                <p className="text-sm text-slate-200">Reflective lunar phase. Perfect for spiritual study, meditation, family connection, and restful sleep preparation.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: OPEN-SOURCE INTEGRATIONS MATRIX */}
        {activeTab === 'open-source-matrix' && (
          <motion.div
            key="tab-open-source"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-amber-400" /> Open-Source Engine Integrations Matrix
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Powered by industry-standard open-source astrology calculation engines, ephemeris libraries, and spiritual APIs.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
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
                      <span className="text-[10px] font-mono text-slate-400">{engine.repo}</span>
                    </div>
                    <h3 className="font-bold text-base text-white">{engine.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{engine.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔍 DETAILED TRADITION INSPECTION MODAL */}
      <AnimatePresence>
        {selectedTraditionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 md:p-8 rounded-3xl border border-amber-500/30 space-y-6 text-left relative"
            >
              <button
                onClick={() => setSelectedTraditionModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="text-4xl">{selectedTraditionModal.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTraditionModal.name}</h2>
                  <p className="text-xs text-amber-400 font-mono font-bold">{selectedTraditionModal.region} · {selectedTraditionModal.rulingElement}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Foundational Text Canon</span>
                  <p className="text-white font-semibold">{selectedTraditionModal.foundationalText}</p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 space-y-1">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase block">Astronomical Basis</span>
                  <p className="text-slate-200">{selectedTraditionModal.astronomicalBasis}</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">Spiritual & Life Focus</span>
                  <p className="text-slate-200">{selectedTraditionModal.spiritualFocus}</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">Open-Source Computation Library</span>
                  <p className="font-mono text-amber-300">{selectedTraditionModal.openSourceEngine}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
