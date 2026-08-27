import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, Sparkles, Heart, Briefcase, DollarSign, Compass, 
  HelpCircle, ShieldCheck, ChevronRight, CheckCircle2, Filter, Layers, ArrowUpRight
} from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniWhyDrawer, { type OmniWhyDrawerProps } from './OmniWhyDrawer';

interface ForecastEvent {
  id: string;
  category: 'career' | 'love' | 'money' | 'growth' | 'travel';
  title: string;
  period: string;
  energyLevel: number; // 0 - 100
  statusText: string;
  systemsCount: number;
  summary: string;
  guidance: string[];
  whyPayload: Partial<OmniWhyDrawerProps>;
}

const FORECAST_DATA: Record<'7days' | '30days' | '12months' | '5years', ForecastEvent[]> = {
  '7days': [
    {
      id: 'f1',
      category: 'career',
      title: 'High-Impact Strategic Execution',
      period: 'Today – In 3 Days',
      energyLevel: 88,
      statusText: 'Strong Peak',
      systemsCount: 3,
      summary: 'Mars and Mercury align in your 10th house of profession. Excellent for high-visibility decisions, technical deliverables, and proposals.',
      guidance: [
        'Present your work confidently to senior collaborators',
        'Finalize agreements and clear communication backlogs',
        'Avoid hasty confrontations in team discussions'
      ],
      whyPayload: {
        title: "High-Impact Strategic Execution",
        period: "Today – In 3 Days",
        confidence: "High",
        confidenceScore: 90,
        factors: [
          "Mercury transit creates Bhadra Yoga resonance in intellectual house",
          "Mars confers executive energy and stamina",
          "Moon transit activates auspicious 11th house of gains"
        ]
      }
    },
    {
      id: 'f2',
      category: 'love',
      title: 'Harmonious Emotional Alignment',
      period: 'This Weekend',
      energyLevel: 82,
      statusText: 'Positive Flow',
      systemsCount: 2,
      summary: 'Venus aspects your natal Moon house, fostering deep empathy, openhearted conversations, and mutual reassurance in relationships.',
      guidance: [
        'Plan calm, quality time with loved ones or partner',
        'Express gratitude and appreciation openly',
        'Engage in creative arts, music, or restful nature walks'
      ],
      whyPayload: {
        title: "Harmonious Emotional Alignment",
        period: "This Weekend",
        confidence: "Moderate–High",
        confidenceScore: 82,
        factors: [
          "Transiting Venus forms favorable trine with natal Moon",
          "Western 7th house ruler receives solar support"
        ]
      }
    }
  ],
  '30days': [
    {
      id: 'f3',
      category: 'career',
      title: 'Career Expansion & Role Shift',
      period: 'Sep 12 – Oct 28',
      energyLevel: 92,
      statusText: 'Major Window',
      systemsCount: 4,
      summary: 'Four independent traditions indicate a significant surge in professional visibility, public authority, and career responsibility.',
      guidance: [
        'Step up into leadership opportunities without hesitation',
        'Organize strategic roadmaps for Q4 deliverables',
        'Maintain impeccable integrity and documentation'
      ],
      whyPayload: {
        title: "Career Expansion & Role Shift",
        period: "Sep 12 – Oct 28",
        confidence: "High",
        confidenceScore: 92,
        factors: [
          "Jupiter transit into 10th Kendra house",
          "Progressed Sun trine Midheaven (MC)",
          "KP 10th sub-lord connects to 2-6-10-11 wealth houses",
          "Chinese BaZi Yang Fire element fuels Day Master"
        ]
      }
    },
    {
      id: 'f4',
      category: 'money',
      title: 'Asset Consolidation & Wealth Restructuring',
      period: 'Next 3–4 Weeks',
      energyLevel: 75,
      statusText: 'Balanced & Secure',
      systemsCount: 3,
      summary: 'Saturn transit provides disciplined focus for long-term investments, asset security, and eliminating recurring overhead costs.',
      guidance: [
        'Review long-term savings, insurance, and retirement models',
        'Avoid speculative impulse bets or unverified schemes',
        'Establish automated savings milestones'
      ],
      whyPayload: {
        title: "Asset Consolidation & Wealth Restructuring",
        period: "Next 3–4 Weeks",
        confidence: "Moderate–High",
        confidenceScore: 78,
        factors: [
          "Saturn 2nd house transit enforces budgetary discipline",
          "Jupiter 11th house aspect supports steady asset retention"
        ]
      }
    }
  ],
  '12months': [
    {
      id: 'f5',
      category: 'growth',
      title: 'Spiritual Maturation & Academic Mastery',
      period: 'Late 2026 – Mid 2027',
      energyLevel: 90,
      statusText: 'Soul Evolution',
      systemsCount: 3,
      summary: 'Jupiter transit through your 9th house of higher learning and spiritual evolution stimulates intellectual breakthroughs and mentoring roles.',
      guidance: [
        'Pursue higher certifications, research, or specialized study',
        'Share knowledge and mentor emerging practitioners',
        'Engage in pilgrimage, meditation, and philosophical contemplation'
      ],
      whyPayload: {
        title: "Spiritual Maturation & Academic Mastery",
        period: "Late 2026 – Mid 2027",
        confidence: "High",
        confidenceScore: 89,
        factors: [
          "Jupiter activates 9th house Dharmasthana",
          "D9 Navamsha chart reflects soul wisdom ripening"
        ]
      }
    },
    {
      id: 'f6',
      category: 'travel',
      title: 'Major Relocation or International Horizon',
      period: 'Spring 2027',
      energyLevel: 84,
      statusText: 'Expansive Journey',
      systemsCount: 3,
      summary: 'Rahu transit in 9th/12th axis creates auspicious opportunities for cross-border collaboration, relocation, or long-distance travel.',
      guidance: [
        'Explore international research or global client bases',
        'Prepare visa and travel documentation well in advance',
        'Embrace diverse cultural philosophies'
      ],
      whyPayload: {
        title: "Major Relocation or International Horizon",
        period: "Spring 2027",
        confidence: "Moderate",
        confidenceScore: 81,
        factors: [
          "12th house Vyaya/Foreign residence activation",
          "Astrocartography planetary power lines support eastern migration"
        ]
      }
    }
  ],
  '5years': [
    {
      id: 'f7',
      category: 'career',
      title: 'Peak Enterprise Leadership & Legacy Milestone',
      period: '2028 – 2030',
      energyLevel: 95,
      statusText: 'Legacy Milestone',
      systemsCount: 4,
      summary: 'Mahadasha shift to an exalted benefic planet marks the defining professional epoch of your decade with enduring social and material impact.',
      guidance: [
        'Build durable systems and institutions rather than short-term gains',
        'Mentor the next generation and establish philanthropic foundations',
        'Cultivate lasting community reputation'
      ],
      whyPayload: {
        title: "Peak Enterprise Leadership & Legacy Milestone",
        period: "2028 – 2030",
        confidence: "High",
        confidenceScore: 94,
        factors: [
          "Major Vimshottari Mahadasha transition into Jupiter/Venus",
          "Western Secondary Progressions peak at Midheaven (MC)",
          "BaZi 10-Year Luck Pillar enters Golden Earth period"
        ]
      }
    }
  ]
};

export default function OmniForecastView({ userProfile }: { userProfile: UserProfile }) {
  const [activeHorizon, setActiveHorizon] = useState<'7days' | '30days' | '12months' | '5years'>('30days');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const [whyModalOpen, setWhyModalOpen] = useState(false);
  const [selectedWhyPayload, setSelectedWhyPayload] = useState<Partial<OmniWhyDrawerProps>>({});

  const events = useMemo(() => {
    const list = FORECAST_DATA[activeHorizon] || FORECAST_DATA['30days'];
    if (selectedCategory === 'all') return list;
    return list.filter(e => e.category === selectedCategory);
  }, [activeHorizon, selectedCategory]);

  const handleOpenWhy = (payload: Partial<OmniWhyDrawerProps>) => {
    setSelectedWhyPayload(payload);
    setWhyModalOpen(true);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'love': return <Heart className="w-4 h-4 text-pink-400" />;
      case 'career': return <Briefcase className="w-4 h-4 text-cyan-400" />;
      case 'money': return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'travel': return <Compass className="w-4 h-4 text-purple-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 text-left pb-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Calendar className="w-7 h-7 text-amber-400" />
          Astrological Forecast & Timing Timeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          Multi-Tradition Event Windows Grounded in Ephemeris Cycles • Calibrated Probabilities
        </p>
      </div>

      {/* Time Horizon Selector Tabs */}
      <div className="flex items-center gap-2 bg-[#0B1220] p-1.5 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
        {[
          { id: '7days', label: '7 DAYS' },
          { id: '30days', label: '30 DAYS' },
          { id: '12months', label: '12 MONTHS' },
          { id: '5years', label: '5 YEARS' },
        ].map((h) => {
          const isSelected = activeHorizon === h.id;
          return (
            <button
              key={h.id}
              type="button"
              onClick={() => setActiveHorizon(h.id as any)}
              className={`relative flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer text-center ${
                isSelected
                  ? 'text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="forecastHorizonPill"
                  className="absolute inset-0 rounded-xl bg-amber-400 shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{h.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
        {[
          { id: 'all', label: 'All Themes' },
          { id: 'career', label: '💼 Career' },
          { id: 'love', label: '❤️ Love' },
          { id: 'money', label: '💰 Money' },
          { id: 'growth', label: '✨ Personal Growth' },
          { id: 'travel', label: '✈️ Travel' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-white/15 text-white border-white/30 font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Event Cards List */}
      <div className="space-y-4">
        {events.map((event) => {
          const isExpanded = expandedCardId === event.id;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-[#0F172A] border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-xl"
            >
              {/* Top Row: Category, Title & Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {getCategoryIcon(event.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{event.title}</h3>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> {event.period}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                    {event.systemsCount} systems support this period
                  </span>
                </div>
              </div>

              {/* Energy Level Visual Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Astrological Activation Level</span>
                  <span className="font-bold text-amber-400">{event.statusText} ({event.energyLevel}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${event.energyLevel}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-amber-400 to-emerald-400"
                  />
                </div>
              </div>

              {/* One-Line Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {event.summary}
              </p>

              {/* Action Buttons: [Why?] & [Details Toggle] */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  onClick={() => handleOpenWhy(event.whyPayload)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 hover:text-amber-200 border border-amber-500/20 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Why?
                </button>

                <button
                  onClick={() => setExpandedCardId(isExpanded ? null : event.id)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {isExpanded ? 'Hide Details' : 'View Action Guidance'} <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expanded Action Guidance */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 pt-3"
                >
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recommended Strategic Actions:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {event.guidance.map((g, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Universal Explainability Drawer Modal */}
      <OmniWhyDrawer
        isOpen={whyModalOpen}
        onClose={() => setWhyModalOpen(false)}
        {...selectedWhyPayload}
      />
    </div>
  );
}
