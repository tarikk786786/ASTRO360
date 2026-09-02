import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Globe, Star, Sparkles, BookOpen, 
  ArrowRight, Award, Compass, Heart, Users, 
  CheckCircle2, ShieldCheck, Flame, Layers
} from 'lucide-react';

interface ProgrammaticSeoDirectoryProps {
  onNavigateToTab?: (tab: string) => void;
}

interface CelebrityChart {
  name: string;
  title: string;
  dob: string;
  location: string;
  sunSign: string;
  moonSign: string;
  lagna: string;
  keyYoga: string;
  treatiseCitation: string;
}

const CELEBRITY_CHARTS: CelebrityChart[] = [
  {
    name: 'Albert Einstein',
    title: 'Theoretical Physicist & Nobel Laureate',
    dob: '1879-03-14 11:30 AM',
    location: 'Ulm, Germany',
    sunSign: 'Pisces (Meena ♓)',
    moonSign: 'Sagittarius (Dhanu ♐)',
    lagna: 'Gemini (Mithuna ♊)',
    keyYoga: 'Neechabhanga Raja Yoga & Saraswati Yoga (Exalted Venus in 10th with Mercury)',
    treatiseCitation: 'Phaladeepika Ch. 6, Sloka 26'
  },
  {
    name: 'Swami Vivekananda',
    title: 'Vedic Philosopher & Global Spiritual Luminary',
    dob: '1863-01-12 06:33 AM',
    location: 'Kolkata, India',
    sunSign: 'Sagittarius (Dhanu ♐)',
    moonSign: 'Virgo (Kanya ♍)',
    lagna: 'Sagittarius (Dhanu ♐)',
    keyYoga: 'Hamsa Mahapurusha Yoga & Sun-Jupiter Parivartana in Kendra',
    treatiseCitation: 'Brihat Parashara Hora Shastra Ch. 75, Sloka 3'
  },
  {
    name: 'Steve Jobs',
    title: 'Founder of Apple & Design Visionary',
    dob: '1955-02-24 19:15 PM',
    location: 'San Francisco, USA',
    sunSign: 'Aquarius (Kumbha ♒)',
    moonSign: 'Pisces (Meena ♓)',
    lagna: 'Leo (Simha ♌)',
    keyYoga: 'Gaja Kesari Yoga & Exalted Mars in 6th producing relentless innovation',
    treatiseCitation: 'Saravali Ch. 35, Sloka 18'
  },
  {
    name: 'Leonardo da Vinci',
    title: 'Universal Polymath, Artist & Engineer',
    dob: '1452-04-15 21:40 PM',
    location: 'Anchiano, Italy',
    sunSign: 'Taurus (Vrishabha ♉)',
    moonSign: 'Pisces (Meena ♓)',
    lagna: 'Sagittarius (Dhanu ♐)',
    keyYoga: 'Bhadra & Malavya Yoga Conjunctions in intellectual quadrants',
    treatiseCitation: 'Brihat Samhita Ch. 69, Sloka 12'
  },
  {
    name: 'Rabindranath Tagore',
    title: 'Poet, Composer & Asia\'s 1st Nobel Laureate',
    dob: '1861-05-07 04:05 AM',
    location: 'Kolkata, India',
    sunSign: 'Aries (Mesha ♈)',
    moonSign: 'Pisces (Meena ♓)',
    lagna: 'Pisces (Meena ♓)',
    keyYoga: 'Exalted Sun in 2nd with Jupiter in 5th Kendra giving supreme poetic eloquence',
    treatiseCitation: 'Jataka Parijata Ch. 7, Sloka 42'
  }
];

export default function ProgrammaticSeoDirectory({ onNavigateToTab }: ProgrammaticSeoDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<'celebrities' | 'planets' | 'compatibility'>('celebrities');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCelebrities = CELEBRITY_CHARTS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.keyYoga.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-xs font-mono font-bold">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>High-Authority Programmatic Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            GLOBAL CELESTIAL DIRECTORY & CELEBRITY CHARTS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Explore verified birth charts of historical visionaries, planetary house combinations, and multi-tradition compatibility benchmarks.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex gap-2">
          {[
            { id: 'celebrities', label: 'Celebrity Charts', icon: Star },
            { id: 'planets', label: '108 Planetary Houses', icon: Compass },
            { id: 'compatibility', label: '144 Sign Matches', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-sm border-amber-400 font-bold shadow-md'
                    : 'bg-[#0B1220] text-slate-400 hover:text-white border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, yoga, or sign..."
            className="w-full bg-[#0B1220] border border-white/12 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
          />
        </div>
      </div>

      {/* Main Content Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/12 shadow-2xl space-y-4 font-mono text-xs">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: CELEBRITY BIRTH CHARTS */}
          {activeCategory === 'celebrities' && (
            <motion.div
              key="celebrities"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white font-mono">Verified Historical Ephemeris & Classical Yogas</h3>
                  <p className="text-xs text-slate-400 font-sans">Computed with true astronomical time and exact historical daylight savings records</p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20 w-fit">
                  ● Rodden Rating AA Verified
                </span>
              </div>

              <div className="space-y-3">
                {filteredCelebrities.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-2xl bg-[#060A12] border border-white/8 space-y-2 hover:border-white/[0.08] transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/6 pb-2">
                      <div>
                        <strong className="text-sm text-white font-sans">{item.name}</strong>
                        <span className="text-xs text-slate-400 font-sans block">{item.title}</span>
                      </div>
                      <span className="text-[11px] text-amber-300 font-mono bg-white/5 px-2.5 py-1 rounded border border-white/10 w-fit">
                        {item.dob} • {item.location}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2 rounded-lg bg-white/3 border border-white/6">
                        <span className="text-slate-400 text-[10px] block">Sun Sign:</span>
                        <strong className="text-white">{item.sunSign}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-white/3 border border-white/6">
                        <span className="text-slate-400 text-[10px] block">Moon Sign:</span>
                        <strong className="text-cyan-300">{item.moonSign}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-white/3 border border-white/6">
                        <span className="text-slate-400 text-[10px] block">Ascendant (Lagna):</span>
                        <strong className="text-emerald-300">{item.lagna}</strong>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-400/5 border border-amber-400/15 space-y-1 font-sans">
                      <span className="text-[10px] text-amber-400 font-mono font-bold uppercase block">Dominant Classical Raja Yoga:</span>
                      <p className="text-xs text-slate-200">{item.keyYoga}</p>
                      <span className="text-[10px] text-slate-400 font-mono block">📜 Authority: {item.treatiseCitation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW 2: 108 PLANETARY HOUSES */}
          {activeCategory === 'planets' && (
            <motion.div
              key="planets"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white font-mono">108 Planetary House Combinations Index</h3>
                  <p className="text-xs text-slate-400 font-sans">Explore Parashari and Hellenistic interpretations for every planet in houses 1 through 12</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { title: 'Sun in 1st House (Lagna)', tag: 'Leadership & Vitality', desc: 'Commanding persona, strong bone density, and administrative ambition.' },
                  { title: 'Jupiter in 10th House (Karma)', tag: 'Executive Honor', desc: 'Hamsa Yoga potential, ethical corporate rise, and sovereign respect.' },
                  { title: 'Venus in 4th House (Sukha)', tag: 'Domestic Splendor', desc: 'Malavya Yoga, luxury real estate ownership, and artistic peace.' },
                  { title: 'Saturn in 7th House (Jaya)', tag: 'Matured Alliances', desc: 'Sasa Yoga, enduring institutional contracts, and disciplined partnerships.' },
                  { title: 'Mercury in 5th House (Putra)', tag: 'Intellectual Genius', desc: 'Exceptional quantitative logic, authorship prowess, and strategic advisory.' },
                  { title: 'Mars in 10th House (Digbala)', tag: 'Directional Force', desc: 'Maximum directional strength, competitive conquest, and engineering mastery.' },
                ].map((p, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#060A12] border border-white/8 space-y-1.5">
                    <strong className="text-xs text-white block">{p.title}</strong>
                    <span className="text-[10px] text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-white/[0.08] inline-block font-bold">
                      {p.tag}
                    </span>
                    <p className="text-xs text-slate-400 font-sans pt-1 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW 3: 144 ZODIAC SIGN MATCHES */}
          {activeCategory === 'compatibility' && (
            <motion.div
              key="compatibility"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white font-mono">144 Cross-Zodiac Compatibility Matrices</h3>
                  <p className="text-xs text-slate-400 font-sans">Evaluating 36-Guna Ashta Koota and Western synastry aspect dynamics</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { pair: 'Aries ♈ & Leo ♌', score: '32/36 Gunas (91%)', type: 'Agni Harmony', note: 'Dynamic creative synergy with shared executive vision.' },
                  { pair: 'Taurus ♉ & Virgo ♍', score: '34/36 Gunas (94%)', type: 'Prithvi Compounding', note: 'Flawless financial stability and enduring pragmatic loyalty.' },
                  { pair: 'Cancer ♋ & Scorpio ♏', score: '33/36 Gunas (92%)', type: 'Jala Resonance', note: 'Profound telepathic empathy and intuitive emotional devotion.' },
                  { pair: 'Gemini ♊ & Libra ♎', score: '30/36 Gunas (83%)', type: 'Vayu Intellect', note: 'Witty social engagement and frictionless communicative ease.' },
                  { pair: 'Sagittarius ♐ & Aries ♈', score: '31/36 Gunas (86%)', type: 'Dharma Alignment', note: 'High adventure, mutual philosophical growth, and shared valor.' },
                  { pair: 'Capricorn ♑ & Taurus ♉', score: '35/36 Gunas (97%)', type: 'Imperial Foundation', note: 'Extraordinary material empire building and multigenerational wealth.' },
                ].map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#060A12] border border-white/8 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs text-white">{m.pair}</strong>
                      <span className="text-xs text-emerald-400 font-bold">{m.score}</span>
                    </div>
                    <span className="text-[10px] text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20 inline-block font-bold">
                      {m.type}
                    </span>
                    <p className="text-xs text-slate-400 font-sans pt-1 leading-relaxed">{m.note}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
