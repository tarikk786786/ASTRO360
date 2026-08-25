import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Layers, Compass, Heart, Calendar, Clock, MapPin, 
  BookOpen, Activity, FileText, Settings, ShieldCheck, Wrench, 
  HelpCircle, ChevronRight, Globe, Moon, Cpu, Award
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniMoreHubProps {
  onNavigate: (tab: string) => void;
  userProfile: UserProfile;
}

export default function OmniMoreHub({ onNavigate, userProfile }: OmniMoreHubProps) {
  const sections = [
    {
      title: "Universal Divination & Calculation Tools",
      description: "Interactive precision engines across global divination traditions",
      items: [
        { id: 'compatibility', label: 'Synastry & Compatibility', icon: Heart, color: 'text-pink-400', badge: 'Ashta Koota' },
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
      title: "World Astrology Traditions (9 Systems)",
      description: "Deep traditional computation engines with canonical source citation",
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
      {/* Header */}
      <div className="border-b border-white/10 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Layers className="w-7 h-7 text-indigo-400" />
          More Engines, Traditions & Advanced Tools
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Explore Specialized Astrological Modules, Divination Systems, and Research Tools
        </p>
      </div>

      {/* Sections */}
      {sections.map((sec, idx) => (
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
