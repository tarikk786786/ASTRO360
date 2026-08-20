import React from 'react';
import { Compass, Moon, Sun, Clock, Heart, Sparkles, Briefcase, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface FeatureGridSectionProps {
  onSelectFeature: (featureTab: string) => void;
}

const FEATURES = [
  {
    id: 'birth-chart',
    title: 'Birth Chart',
    description: 'Understand your planetary placements, dignities, and the overarching patterns they create across your life.',
    icon: Compass,
    tag: 'Core Natal',
  },
  {
    id: 'master-chart',
    title: 'Vedic Kundli',
    description: 'Explore your complete traditional 12-house Vedic chart (D1 to D60) with North, South, and East Indian formats.',
    icon: Sun,
    tag: 'Divisional',
  },
  {
    id: 'nakshatra',
    title: 'Nakshatra Analysis',
    description: 'Discover the 27 lunar constellations that govern your emotional archetype, mind, and inner motivations.',
    icon: Moon,
    tag: 'Lunar Wisdom',
  },
  {
    id: 'dasha',
    title: 'Vimshottari Dasha',
    description: 'Track major and sub-planetary cycles (Mahadasha & Antardasha) to understand life timing and pivotal transitions.',
    icon: Clock,
    tag: 'Timing Engine',
  },
  {
    id: 'compatibility',
    title: 'Relationship Synastry',
    description: 'Compare two charts through 36-point Ashta Koota matching and Western aspect overlays with psychological depth.',
    icon: Heart,
    tag: 'Harmony',
  },
  {
    id: 'horoscope',
    title: 'Daily Horoscope',
    description: 'Start each day with actionable planetary transit updates, Rahu Kaal alerts, and auspicious Muhurta windows.',
    icon: Sparkles,
    tag: 'Daily Ingress',
  },
  {
    id: 'career',
    title: 'Career & Ambition',
    description: 'Analyze 10th House ruler, Amatyakaraka, and planetary yogas to discover natural executive and vocational strengths.',
    icon: Briefcase,
    tag: 'Life Path',
  },
  {
    id: 'consultation-hub',
    title: 'Expert Consultations',
    description: 'Connect with seasoned Vedic astrologers and spiritual mentors for 1-on-1 personalized chart reviews.',
    icon: Users,
    tag: 'Human Guidance',
  },
];

export default function FeatureGridSection({ onSelectFeature }: FeatureGridSectionProps) {
  return (
    <section id="features-section" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Comprehensive Astrological Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            Designed for depth. Built for clarity.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 font-normal">
            Whether you want a quick daily check-in or a deep dive into divisional vargas and planetary periods, explore with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onSelectFeature(feat.id)}
                className="p-6 rounded-2xl bg-[#0D1220]/60 hover:bg-[#0D1220]/95 border border-white/[0.06] hover:border-[#C9A86A]/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[#C9A86A]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.04]">
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

                <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-[#C9A86A] transition-colors">
                  <span>Explore Tool</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
