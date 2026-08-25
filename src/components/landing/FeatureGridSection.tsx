import React, { useState } from 'react';
import { Compass, Moon, Sun, Clock, Heart, Sparkles, Briefcase, Users, Gem, Hash, Layers, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface FeatureGridSectionProps {
  onSelectFeature: (featureTab: string) => void;
}

const CATEGORIES = ['All Tools', 'Natal & Timing', 'Love & Career', 'Divination & Remedies'] as const;

const FEATURES = [
  {
    id: 'birth-chart',
    category: 'Natal & Timing',
    title: 'Universal Birth Chart Engine',
    description: 'Understand your planetary placements, dignities, and the overarching patterns across your 12 houses.',
    icon: Compass,
    tag: 'Core Natal',
  },
  {
    id: 'master-chart',
    category: 'Natal & Timing',
    title: 'D1 to D60 Harmonic Charts',
    description: 'Explore your complete harmonic charts with Universal Diamond, Fixed Zodiac Square, and Western Wheel layouts.',
    icon: Sun,
    tag: 'Harmonics',
  },
  {
    id: 'nakshatra',
    category: 'Natal & Timing',
    title: 'Nakshatra & Pada Analysis',
    description: 'Discover the 27 lunar constellations that govern your emotional archetype, mind, and inner motivations.',
    icon: Moon,
    tag: 'Lunar Wisdom',
  },
  {
    id: 'dasha',
    category: 'Natal & Timing',
    title: '120-Year Vimshottari Dasha',
    description: 'Track major and sub-planetary cycles (Mahadasha & Antardasha) to understand life timing and pivotal transitions.',
    icon: Clock,
    tag: 'Timing Engine',
  },
  {
    id: 'compatibility',
    category: 'Love & Career',
    title: '36-Point Ashta Koota Matching',
    description: 'Compare two charts through traditional 36-point Guna Milan matching and Western aspect overlays.',
    icon: Heart,
    tag: 'Harmony',
  },
  {
    id: 'horoscope',
    category: 'Natal & Timing',
    title: 'Daily Horoscope & Ingress',
    description: 'Real-time planetary transit updates, Rahu Kaal alerts, daily Choghadiya, and auspicious Muhurta windows.',
    icon: Sparkles,
    tag: 'Daily Ingress',
  },
  {
    id: 'career',
    category: 'Love & Career',
    title: 'Career & 10th House Ambition',
    description: 'Analyze 10th House ruler, Amatyakaraka, and planetary yogas to discover natural executive strengths.',
    icon: Briefcase,
    tag: 'Life Path',
  },
  {
    id: 'btr-suite',
    category: 'Natal & Timing',
    title: 'Birth Time Rectification (BTR)',
    description: 'Pinpoint your exact birth minute using life event milestones, Tattva Shodhana, and Kunda alignment.',
    icon: Clock,
    tag: 'Precision BTR',
  },
  {
    id: 'gemstone-suite',
    category: 'Divination & Remedies',
    title: 'Sacred Gemstones & Rudraksha',
    description: 'Receive authentic gemstone carat recommendations, Rudraksha Mukhi alignments, and planetary metal protocols.',
    icon: Gem,
    tag: 'Sacred Remedies',
  },
  {
    id: 'numerology-suite',
    category: 'Divination & Remedies',
    title: 'Chaldean & Pythagorean Numerology',
    description: 'Calculate your Life Path, Destiny, Soul Urge, and Name vibration matrices with lucky dates and colors.',
    icon: Hash,
    tag: 'Name Vibration',
  },
  {
    id: 'tarot-iching',
    category: 'Divination & Remedies',
    title: 'Astrological Tarot & 64 I-Ching',
    description: 'Synthesize 78-card archetypes and ancient Chinese I-Ching hexagrams with planetary transit alignments.',
    icon: Layers,
    tag: 'Oracle Suite',
  },
  {
    id: 'islamic-suite',
    category: 'Divination & Remedies',
    title: 'Islamic Astronomy & Ilm al-Nujum',
    description: 'Explore lunar Manazil al-Qamar, planetary Firdaria periods, and authentic sacred celestial wisdom.',
    icon: Globe,
    tag: 'Ancient Astronomy',
  },
];

export default function FeatureGridSection({ onSelectFeature }: FeatureGridSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tools');

  const filteredFeatures = selectedCategory === 'All Tools'
    ? FEATURES
    : FEATURES.filter(f => f.category === selectedCategory);

  return (
    <section id="features-section" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Comprehensive Astrological Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Designed for depth. Built for clarity.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 font-normal">
            Whether you want a quick daily transit check-in or a deep dive into divisional vargas, dasha timelines, and sacred remedies.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C9A86A] text-[#070A12] font-bold shadow-md shadow-[#C9A86A]/20'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => onSelectFeature(feat.id)}
                className="p-6 rounded-2xl bg-[#0D1220]/70 hover:bg-[#0D1220] border border-white/[0.08] hover:border-[#C9A86A]/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[#C9A86A]" />
                    </div>
                    <span className="text-[10px] font-mono text-[#C9A86A] uppercase tracking-wider px-2 py-0.5 rounded bg-[#C9A86A]/10 border border-[#C9A86A]/20">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 font-serif group-hover:text-[#C9A86A] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-[#C9A86A] transition-colors">
                  <span>Launch Tool</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
