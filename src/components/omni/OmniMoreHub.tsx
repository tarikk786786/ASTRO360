import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Layers, Compass, Heart, Calendar, Clock, MapPin, 
  BookOpen, Activity, FileText, Settings, ShieldCheck, Wrench, 
  HelpCircle, ChevronRight, Globe, Moon, Cpu, Award, Zap, Star
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniMoreHubProps {
  onNavigate: (tab: string) => void;
  userProfile: UserProfile;
}

export default function OmniMoreHub({ onNavigate, userProfile }: OmniMoreHubProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'vedic' | 'islamic' | 'bazi' | 'western' | 'kp' | 'jaimini' | 'esoteric'>('all');
  const currentTradition = (userProfile.preferredSystem || 'vedic').toLowerCase();

  const traditionSpotlight = useMemo(() => {
    if (currentTradition.includes('islamic')) {
      return {
        title: 'Islamic Astrology (Ilm al-Falak) Spotlight',
        desc: 'Canonical Arabic astrology engines grounded in Ptolemaic-Arab synthesis and lunar mansions.',
        badge: 'Active Engine',
        tools: [
          { id: 'islamic-astrology', label: '28 Lunar Mansions (Manazil)', desc: 'Moon stations & spiritual timing', icon: Moon, color: 'text-emerald-400' },
          { id: 'problem-solver', label: 'Istikhara & Planetary Hours', desc: 'Sa\'at al-Kawakib electional timing', icon: Clock, color: 'text-amber-400' },
          { id: 'remedy', label: 'Islamic Spiritual Remedies', desc: 'Asma al-Husna & Quranic Dhikr', icon: ShieldCheck, color: 'text-cyan-400' },
        ]
      };
    } else if (currentTradition.includes('chinese') || currentTradition.includes('bazi')) {
      return {
        title: 'Chinese BaZi & Feng Shui Spotlight',
        desc: '60 Jiazi Heavenly Stems & Earthly Branches with 5 Elements generation.',
        badge: 'Active Engine',
        tools: [
          { id: 'spiritual-traditions', label: 'Four Pillars of Destiny (BaZi)', desc: 'Day Master & 10-Year Luck Pillars', icon: Globe, color: 'text-red-400' },
          { id: 'fengshui-matrix', label: 'Cosmic Feng Shui & BaGua', desc: 'Spatial energy flow & Flying Stars', icon: Compass, color: 'text-teal-400' },
          { id: 'tarot-iching', label: 'I-Ching 64 Hexagram Oracle', desc: 'Book of Changes divination', icon: Sparkles, color: 'text-amber-400' },
        ]
      };
    } else if (currentTradition.includes('kp')) {
      return {
        badge: 'Active Engine',
        title: 'KP Stellar System (Krishnamurti Padhdhati)',
        desc: 'Sub-Lord precision based on 249 table and Cuspal Interlinks.',
        tools: [
          { id: 'omni-research', label: '249 Cuspal Sub-Lord Matrix', desc: 'Sign-Star-Sub significators', icon: Cpu, color: 'text-cyan-400' },
          { id: 'dasha', label: 'DBAS Dasha-Bhukti Timeline', desc: 'Sub-period timing of events', icon: Clock, color: 'text-amber-400' },
          { id: 'btr-suite', label: 'Ruling Planets BTR Solver', desc: 'Instant sub-minute rectification', icon: Compass, color: 'text-indigo-400' },
        ]
      };
    } else if (currentTradition.includes('jaimini')) {
      return {
        badge: 'Active Engine',
        title: 'Jaimini Sutras (Chara Karaka & Arudhas)',
        desc: 'Sign-based aspects, Atmakaraka soul evolution, and Chara Dasha.',
        tools: [
          { id: 'divisional-charts', label: '7 Chara Karakas & Karakamsha', desc: 'AK, AmK, BK, MK, PK, GK, DK', icon: Layers, color: 'text-amber-400' },
          { id: 'dasha', label: 'Chara Dasha Sign Cycles', desc: 'Direct & reverse zodiacal periods', icon: Clock, color: 'text-purple-400' },
          { id: 'problem-solver', label: 'Arudha Pada Diagnostic', desc: 'Maya, illusion & public status (AL/A10)', icon: Wrench, color: 'text-cyan-400' },
        ]
      };
    } else if (currentTradition.includes('western') || currentTradition.includes('hellenistic')) {
      return {
        badge: 'Active Engine',
        title: 'Western Tropical & Hellenistic Spotlight',
        desc: '360° zodiacal wheels, Ptolemaic aspects, solar arcs, and time lords.',
        tools: [
          { id: 'omni-research', label: 'Secondary Progressions & Solar Arc', desc: 'Year-by-year psychological unfoldment', icon: Zap, color: 'text-amber-400' },
          { id: 'astro-cartography', label: 'Astrocartography Relocation', desc: 'Planetary lines on world map', icon: MapPin, color: 'text-emerald-400' },
          { id: 'remedy', label: 'Planetary Talismans & Hours', desc: 'Picatrix & Agrippan remediation', icon: ShieldCheck, color: 'text-cyan-400' },
        ]
      };
    } else {
      // Vedic Parashari
      return {
        badge: 'Active Engine',
        title: 'Vedic Jyotish Parashari Spotlight',
        desc: 'Classical 16 Divisional Vargas, 120-Year Vimshottari Dasha & Nakshatra Deities.',
        tools: [
          { id: 'divisional-charts', label: 'Vedic D1–D60 Varga Suite', desc: 'D9 Navamsha, D10 Dashamsha, D60 Shashtiamsha', icon: Layers, color: 'text-amber-400' },
          { id: 'dasha', label: 'Vimshottari Dasha Engine', desc: 'Mahadasha, Antardasha & Pratyantar timing', icon: Clock, color: 'text-cyan-400' },
          { id: 'panchang-deities', label: 'Panchanga & 27 Nakshatra Deities', desc: 'Tithi, Vara, Nakshatra, Yoga, Karana', icon: Calendar, color: 'text-amber-400' },
        ]
      };
    }
  }, [currentTradition]);

  const allSections = [
    {
      title: "Universal Divination & Calculation Tools",
      description: "Interactive precision engines across global divination traditions",
      tradition: 'all',
      items: [
        { id: 'compatibility', label: 'Synastry & Compatibility', icon: Heart, color: 'text-pink-400', badge: 'Multi-Tradition' },
        { id: 'panchang-deities', label: 'Panchanga & Daily Deities', icon: Calendar, color: 'text-amber-400', badge: 'Tithi/Yoga' },
        { id: 'dasha', label: 'Vimshottari Dasha Engine', icon: Clock, color: 'text-cyan-400', badge: '120y Cycle' },
        { id: 'astro-cartography', label: 'Astrocartography Matrix', icon: MapPin, color: 'text-emerald-400', badge: 'Planetary Lines' },
        { id: 'btr-suite', label: 'Birth Time Rectification', icon: Compass, color: 'text-indigo-400', badge: 'BTR Solver' },
        { id: 'tarot-iching', label: 'Tarot & I-Ching Divination', icon: Sparkles, color: 'text-purple-400', badge: 'Divination' },
        { id: 'numerology-suite', label: 'Pythagorean & Chaldean Numerology', icon: Award, color: 'text-yellow-400', badge: 'Name Matrix' },
        { id: 'chakra-alignment', label: 'Sacred Chakra & Soundboard', icon: Activity, color: 'text-rose-400', badge: 'Solfeggio Hz' },
        { id: 'fengshui-matrix', label: 'Cosmic Feng Shui & BaGua', icon: Compass, color: 'text-teal-400', badge: 'Spatial Flow' }
      ]
    },
    {
      title: "World Astrology Traditions (7 Core Systems)",
      description: "Deep traditional computation engines with canonical source citation",
      tradition: 'all',
      items: [
        { id: 'divisional-charts', label: 'Vedic D1–D60 Varga Suite', icon: Layers, color: 'text-amber-400', badge: 'Parashari' },
        { id: 'islamic-astrology', label: 'Islamic Astrology (Ilm al-Falak)', icon: Moon, color: 'text-emerald-400', badge: '28 Mansions' },
        { id: 'spiritual-traditions', label: 'Chinese BaZi & 4 Pillars', icon: Globe, color: 'text-red-400', badge: '60 Jiazi' },
        { id: 'problem-solver', label: 'Universal Problem Solver', icon: Wrench, color: 'text-cyan-400', badge: 'Multi-Tradition' },
        { id: 'dream-interpreter', label: 'Cosmic Dream Interpreter', icon: Sparkles, color: 'text-indigo-400', badge: 'Symbolic AI' },
        { id: 'remedy', label: 'Multi-Tradition Remedy Suite', icon: ShieldCheck, color: 'text-emerald-300', badge: 'Prescriptive' }
      ]
    },
    {
      title: "Research, Reports & Advanced Governance",
      description: "Explainability architecture, classical rule citations & executive exports",
      tradition: 'all',
      items: [
        { id: 'omni-research', label: 'OMNI Research Core', icon: Cpu, color: 'text-cyan-400', badge: 'Explainable' },
        { id: 'report-generator', label: 'Executive PDF Report Generator', icon: FileText, color: 'text-amber-400', badge: 'Export' },
        { id: 'learning-hub', label: 'Astrology Academy & Learning Hub', icon: BookOpen, color: 'text-indigo-400', badge: 'Knowledge' },
        { id: 'admin-dashboard', label: 'Admin Analytics Dashboard', icon: Activity, color: 'text-slate-300', badge: 'Management' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left pb-16">
      {/* Return to Landing Page Action */}
      <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-[#111315] border border-white/[0.08] shadow-lg">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Public Overview & Features</span>
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Return to the public ASTRO360 home experience anytime.
          </p>
        </div>
        <button
          onClick={() => onNavigate('landing')}
          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-black font-bold font-sans text-xs cursor-pointer transition-all shrink-0 shadow-md flex items-center gap-1.5"
        >
          <span>Return to Landing</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-white/10 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Layers className="w-7 h-7 text-indigo-400" />
          More Engines, Traditions & Specialized Tools
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Explore 152+ Specialized Astrological Modules, Multi-Tradition Divination Systems & Research Tools
        </p>
      </div>

      {/* Featured Tradition Spotlight Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-[#0E172A] to-[#0A0F1D] border border-indigo-500/40 space-y-4 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-mono uppercase text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-bold">
              {traditionSpotlight.badge}
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 font-bold">100% Free Open Access</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">{traditionSpotlight.title}</h2>
          <p className="text-xs text-slate-300 font-mono pt-0.5">{traditionSpotlight.desc}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {traditionSpotlight.tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.id}
                onClick={() => onNavigate(t.id)}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/40 transition-all cursor-pointer space-y-1 group"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${t.color}`} />
                  <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {t.label}
                  </h3>
                </div>
                <p className="text-[10.5px] text-slate-400 line-clamp-1">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Sections */}
      {allSections.map((sec, idx) => (
        <div key={idx} className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">{sec.title}</h2>
            <p className="text-xs text-slate-400 font-mono">{sec.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sec.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="p-4 rounded-2xl bg-[#0F172A] hover:bg-[#131F37] border border-white/10 hover:border-indigo-500/40 transition-all cursor-pointer flex items-center justify-between group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.label}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500">{item.badge}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
