import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Target, Users, Code, Database, Shield, LineChart, Cpu, Calendar, Search, CheckCircle2, ChevronRight, Sparkles, Layers, Layers3, Activity, Globe, Compass, Grid, BookOpen, ShoppingBag, Settings, Lock, Server, Terminal, ListChecks
} from 'lucide-react';

const PRD_SECTIONS = [
  { id: 'sec-1', title: '1. Project Vision', icon: Target },
  { id: 'sec-2', title: '2. Core Objectives', icon: Sparkles },
  { id: 'sec-3', title: '3. Complete Module Architecture', icon: Grid },
  { id: 'sec-4', title: '4. Astrology Engine', icon: Compass },
  { id: 'sec-5', title: '5. Divisional Charts (D1-D60)', icon: Layers },
  { id: 'sec-6', title: '6. Dasha Engine', icon: Calendar },
  { id: 'sec-7', title: '7. Transit Engine', icon: Activity },
  { id: 'sec-8', title: '8. Yoga Detection Engine', icon: Sparkles },
  { id: 'sec-9', title: '9. Dosha Engine', icon: Shield },
  { id: 'sec-10', title: '10. Compatibility Engine', icon: Activity },
  { id: 'sec-11', title: '11. Numerology Engine', icon: Code },
  { id: 'sec-12', title: '12. Palmistry AI', icon: Layers3 },
  { id: 'sec-13', title: '13. Face Reading (Mian Xiang)', icon: Search },
  { id: 'sec-14', title: '14. Tarot Engine (78 Cards)', icon: BookOpen },
  { id: 'sec-15', title: '15. Chinese Astrology (BaZi)', icon: Globe },
  { id: 'sec-16', title: '16. Feng Shui', icon: Compass },
  { id: 'sec-17', title: '17. AI Astrologer & Chat', icon: Cpu },
  { id: 'sec-18', title: '18. Reports (PDF/DOCX)', icon: FileText },
  { id: 'sec-19', title: '19. Notification Engine', icon: Activity },
  { id: 'sec-20', title: '20. Learning Center', icon: BookOpen },
  { id: 'sec-21', title: '21. Marketplace', icon: ShoppingBag },
  { id: 'sec-22', title: '22. Admin Dashboard', icon: Settings },
  { id: 'sec-23', title: '23. SEO Architecture', icon: LineChart },
  { id: 'sec-24', title: '24. APIs & Endpoints', icon: Server },
  { id: 'sec-25', title: '25. User Roles', icon: Users },
  { id: 'sec-26', title: '26. Security & GDPR', icon: Lock },
  { id: 'sec-27', title: '27. Recommended Tech Stack', icon: Terminal },
  { id: 'sec-28', title: '28. Development Roadmap', icon: ListChecks },
];

export default function PRDViewer() {
  const [activeSection, setActiveSection] = useState('sec-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = PRD_SECTIONS.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-white/[0.12] text-xs font-bold font-mono">
              OFFICIAL SPECIFICATION
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> v2.5 MASTER PRD
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">
            AI Astrology <span className="gradient-text">Super Platform</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Product Requirements Document (PRD) specifying the end-to-end architecture, 28 core engine modules, technology stack, and 5-phase development roadmap.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search 28 PRD Modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
          />
        </div>
      </div>

      {/* Main PRD Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-4 xl:col-span-3 glass-card rounded-3xl p-4 border border-slate-800 space-y-2 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <p className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider px-3 py-1">
            28 PRD Modules Overview
          </p>
          <div className="space-y-1">
            {filteredSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 font-bold border border-white/[0.12] shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="truncate">{sec.title}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* PRD Content Body */}
        <div className="lg:col-span-8 xl:col-span-9 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar font-sans text-slate-300 leading-relaxed text-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Section 1: Vision */}
              {activeSection === 'sec-1' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">SECTION 01</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">1. Project Vision</h2>
                  <p className="text-slate-300 leading-relaxed">
                    Develop the world's most comprehensive AI-powered astrology platform that combines traditional astrology systems, AI analysis, modern UI/UX, personalized reports, and educational content into one ecosystem.
                  </p>
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-white/[0.08] text-amber-200 text-xs leading-relaxed">
                    💡 <strong>Core Principle:</strong> The platform provides accurate calculations according to each supported astrological tradition, while clearly distinguishing traditional astrological guidance from scientifically established advice.
                  </div>
                </div>
              )}

              {/* Section 2: Objectives */}
              {activeSection === 'sec-2' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">SECTION 02</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">2. Core Objectives</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      'AI Astrologer', 'AI Horoscope Generator', 'AI Remedy Generator', 'Birth Chart Generator',
                      'Kundli Matching', 'Daily Horoscope', 'Numerology', 'Palmistry', 'Tarot', 'Feng Shui',
                      'Chinese Astrology', 'Face Reading', 'AI Chat', 'PDF Reports', 'Subscription System',
                      'Admin Dashboard', 'Analytics', 'Multi-language', 'SEO'
                    ].map((obj, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-semibold text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Architecture */}
              {activeSection === 'sec-3' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">SECTION 03</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">3. Complete Module Architecture</h2>
                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`Home
├── Astrology
│   ├── Birth Chart, Divisional Charts (D1-D60), Dasha, Gochar, Yogas, Doshas
│   ├── Nakshatra, Houses, Planet Analysis, Annual/Monthly/Weekly/Daily Predictions
│   ├── Career, Marriage, Health, Finance, Education, Children, Property, Business, Travel, Foreign Settlement
│   └── Muhurta, Prashna, Lal Kitab, KP, Nadi, Jaimini, Varshaphal
├── Numerology (Life Path, Destiny, Soul Urge, Expression, Personal Year)
├── Tarot (78 Cards, Celtic Cross, Spreads)
├── Palmistry (Life, Head, Heart, Fate Lines & Mounts)
├── Face Reading (Mian Xiang & Facial Structure Analysis)
├── Chinese Astrology (BaZi & Animal Zodiac)
├── Feng Shui (Bagua Map, Flying Stars & Five Elements)
├── Zodiac & Daily Alerts
├── Learning Center & Academy
├── Blog & Articles
├── AI Assistant & Voice Chat
├── Marketplace & Consultations
├── Reports (PDF / DOCX)
├── Settings & Personalization
└── Enterprise Admin Dashboard`}
                  </pre>
                </div>
              )}

              {/* Section 4: Astrology Engine */}
              {activeSection === 'sec-4' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">SECTION 04</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">4. Astrology Engine Parameters</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Required Input Data</h3>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        <li>Name & Gender</li>
                        <li>Date & Exact Time of Birth</li>
                        <li>Timezone & Daylight Savings</li>
                        <li>Latitude & Longitude</li>
                        <li>Country, State, City</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Generated Calculations</h3>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                        <li>Ascendant (Lagna) & Moon / Sun Signs</li>
                        <li>12 House Cusps & Lords</li>
                        <li>27 Nakshatras & Padas</li>
                        <li>9 Planets (Degrees, Retrograde, Combustion)</li>
                        <li>Exaltation / Debilitation States</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 5: Divisional Charts */}
              {activeSection === 'sec-5' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">SECTION 05</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">5. Divisional Charts (D1 - D60)</h2>
                  <p className="text-xs text-slate-400">Automatic generation of SVG micro-divisional charts with planetary lord analysis & AI summary:</p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
                    {['D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11','D12','D16','D20','D24','D27','D30','D40','D45','D60'].map(d => (
                      <div key={d} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-xs font-bold text-amber-300">
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 6: Dasha Engine */}
              {activeSection === 'sec-6' && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">SECTION 06</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">6. Dasha Engine</h2>
                  <p className="text-xs text-slate-300">Multi-system predictive dasha calculation with timeline breakdown:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                    {['Vimshottari (120Y)', 'Yogini (36Y)', 'Chara (Jaimini)', 'Kalachakra', 'Narayana', 'Ashtottari', 'Panchottari', 'Dwisaptati'].map((d, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-semibold text-center">
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 7 - 10 */}
              {['sec-7', 'sec-8', 'sec-9', 'sec-10'].includes(activeSection) && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">PREDICTIVE ENGINES</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Transits, Yogas, Doshas & Kundli Matching</h2>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                    <p>⚡ <strong>100+ Yoga Rule Detection:</strong> Raj Yoga, Dhana Yoga, Gajakesari, Vipreet Raj, Lakshmi, Budhaditya, Panch Mahapurusha.</p>
                    <p>🛡️ <strong>Dosha Detection & Neutralizers:</strong> Manglik, Pitra, Kaal Sarp, Guru Chandal, Shrapit, Nadi, Bhakoot.</p>
                    <p>❤️ <strong>Ashta Koota Compatibility:</strong> 36 Guna Kundli Matching covering Nadi, Bhakoot, Gana, Yoni, Varna, and Planetary Friendship.</p>
                  </div>
                </div>
              )}

              {/* Section 11 - 16: Divination & Esoteric */}
              {['sec-11', 'sec-12', 'sec-13', 'sec-14', 'sec-15', 'sec-16'].includes(activeSection) && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">ESOTERIC SUITE</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Numerology, Palmistry AI, Face Reading, Tarot & Feng Shui</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <h3 className="font-bold text-amber-300">🃏 78-Card Tarot Suite</h3>
                      <p className="text-slate-400">Single Card, 3-Card Spread, Celtic Cross, Career & Relationship Spreads with AI interpretation.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <h3 className="font-bold text-purple-300">✋ Palmistry & 👤 Face Reading AI</h3>
                      <p className="text-slate-400">Image detection for Life/Head/Heart lines, mounts, facial features (Mian Xiang), and structural destiny.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <h3 className="font-bold text-cyan-300">☯️ BaZi & 🧭 Feng Shui</h3>
                      <p className="text-slate-400">Four Pillars of Destiny, Wu Xing Five Elements, Bagua map, Flying Stars, desk & sleeping directions.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <h3 className="font-bold text-emerald-300">🔢 Chaldean & Pythagorean Numerology</h3>
                      <p className="text-slate-400">Life Path, Destiny, Soul Urge, Expression, Personal Year, and Lucky Color/Number matrix.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Section 17 - 28: Architecture, Admin & Roadmap */}
              {['sec-17', 'sec-18', 'sec-19', 'sec-20', 'sec-21', 'sec-22', 'sec-23', 'sec-24', 'sec-25', 'sec-26', 'sec-27', 'sec-28'].includes(activeSection) && (
                <div className="space-y-4">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">PLATFORM INFRASTRUCTURE & ROADMAP</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Enterprise Stack, SEO, Security & 5-Phase Roadmap</h2>
                  
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
                    <p>⚡ <strong>Tech Stack:</strong> Next.js, React 19, TypeScript, Tailwind CSS, Framer Motion, Node.js, PostgreSQL, Redis, Three.js.</p>
                    <p>🔒 <strong>Security & Auth:</strong> OAuth 2.0, JWT, 2FA, Encrypted User Data, Rate Limiting, Audit Logs, GDPR Privacy Controls.</p>
                    <p>🚀 <strong>5-Phase Development Roadmap:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
                      <li>Phase 1: Authentication, Birth Chart, Horoscope, PDF Reports</li>
                      <li>Phase 2: Dasha, Transits, D1-D60 Charts, Numerology</li>
                      <li>Phase 3: Tarot, Palmistry AI, Face Reading, Chinese Astrology</li>
                      <li>Phase 4: AI Assistant, Voice, Marketplace, Notifications</li>
                      <li>Phase 5: Enterprise Admin, Programmatic SEO, Mobile Apps & Public API</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
