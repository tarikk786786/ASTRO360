import React, { useState } from 'react';
import { Heart, Briefcase, Brain, Coins, Moon, Sparkles, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChartExplorationSectionProps {
  onReadFullChart: () => void;
}

const EXPLORATION_DOMAINS = [
  {
    id: 'love',
    label: 'Love & Relationships',
    icon: Heart,
    color: '#EC4899',
    headline: 'Understanding Emotional Bonds & Attachment Patterns',
    points: [
      '7th House ruler and Venus dignity in Navamsha (D9) chart',
      'Compatibility markers and communicative harmony',
      'Attachment dynamics and relationship timing',
      'Karmic soulmate connections through Rahu-Ketu axis',
    ],
    highlightQuote: '“Your Venus and 7th lord reveal what makes you feel cherished and safe in intimacy.”',
  },
  {
    id: 'career',
    label: 'Career & Ambition',
    icon: Briefcase,
    color: '#38BDF8',
    headline: 'Vocational Strengths, Leadership, & Work Preferences',
    points: [
      '10th House (Karma Bhava) planetary aspects and executive yogas',
      'Amatyakaraka planet revealing primary soul vocation',
      'Optimal industries: Tech, Finance, Creative, Advisory, or Leadership',
      'Favorable planetary periods for job changes and promotions',
    ],
    highlightQuote: '“Your 10th house placements indicate how you naturally lead, solve problems, and create value.”',
  },
  {
    id: 'personality',
    label: 'Personality & Mind',
    icon: Brain,
    color: '#A855F7',
    headline: 'Cognitive Tendencies, Core Drivers, & Temperament',
    points: [
      'Ascendant (Lagna) physical vitality and social aura',
      'Mercury positioning for analytical and creative thought flow',
      'Elemental distribution: Fire, Earth, Air, and Water balance',
      'Sun placement showing conscious identity and purpose',
    ],
    highlightQuote: '“Your Ascendant and Mercury determine the lens through which you perceive reality.”',
  },
  {
    id: 'wealth',
    label: 'Wealth & Prosperity',
    icon: Coins,
    color: '#F59E0B',
    headline: 'Financial Accumulation, Investments, & Abundance Yogas',
    points: [
      '2nd House (Liquid Assets) & 11th House (Income & Gains) alignment',
      'Dhana Yogas formed by Jupiter, Venus, and Lakshmi house lords',
      'Natural risk tolerance and investment timing cycles',
      'Charitable karma balancing material growth with purpose',
    ],
    highlightQuote: '“Dhana yogas indicate how wealth naturally flows into your life through right effort.”',
  },
  {
    id: 'emotions',
    label: 'Emotional Life',
    icon: Moon,
    color: '#67E8F9',
    headline: 'Subconscious Needs, Lunar Rhythms, & Inner Peace',
    points: [
      'Moon sign (Rashi) and Nakshatra governing mental tranquility',
      '4th House (Matru Bhava) emotional stability and domestic comfort',
      'Transit sensitivities during New Moon and Full Moon cycles',
      'Grounding meditation and somatic practices tailored to your chart',
    ],
    highlightQuote: '“The Moon reveals your subconscious sanctuary and what restores your nervous system.”',
  },
  {
    id: 'purpose',
    label: 'Life Direction & Dharma',
    icon: Sparkles,
    color: '#C9A86A',
    headline: 'Soul Purpose, Spiritual Evolution, & Destiny Patterns',
    points: [
      '9th House (Dharma) philosophical alignment and spiritual teachers',
      'Atmakaraka (Soul Planet) lessons and spiritual maturity',
      'Major Vimshottari Mahadasha shifts across your life chapters',
      'Karmic evolution path from South Node (Ketu) to North Node (Rahu)',
    ],
    highlightQuote: '“Atmakaraka points to the deeper mastery your soul chose to explore in this lifetime.”',
  },
];

export default function ChartExplorationSection({ onReadFullChart }: ChartExplorationSectionProps) {
  const [selectedId, setSelectedId] = useState('career');
  const activeDomain = EXPLORATION_DOMAINS.find((d) => d.id === selectedId) || EXPLORATION_DOMAINS[0];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#070A12]/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Targeted Life Dimensions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            What would you like to explore?
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-normal">
            Select a life area to see how your birth chart maps your natural tendencies.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-10">
          {EXPLORATION_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isSelected = selectedId === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedId(domain.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#C9A86A] text-[#070A12] shadow-[0_0_20px_rgba(201,168,106,0.4)] scale-105'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 border border-white/[0.06]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#070A12]' : ''}`} style={{ color: !isSelected ? domain.color : undefined }} />
                <span>{domain.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Domain Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomain.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0D1220]/90 border border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-7 space-y-4">
              <span className="text-[11px] font-mono text-[#C9A86A] uppercase tracking-wider block">
                {activeDomain.label} Analysis
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif leading-snug">
                {activeDomain.headline}
              </h3>
              
              <ul className="space-y-2.5 pt-2">
                {activeDomain.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-[#C9A86A] flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <button
                  onClick={onReadFullChart}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] text-xs font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)] hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Read My Full {activeDomain.label} Chart</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="md:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between h-full space-y-4">
              <div className="text-xs italic text-slate-300 font-serif leading-relaxed">
                {activeDomain.highlightQuote}
              </div>
              <div className="pt-3 border-t border-white/[0.06] text-[10.5px] font-mono text-slate-400 flex items-center justify-between">
                <span>Calculated via Vedic Ephemeris</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
