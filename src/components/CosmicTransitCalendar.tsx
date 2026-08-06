import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Sun, Moon, Sparkles, Clock, ChevronRight, Info, AlertTriangle, ShieldCheck } from 'lucide-react';

interface TransitEvent {
  id: number;
  dateStr: string;
  planet: string;
  symbol: string;
  eventType: 'Ingress' | 'Retrograde' | 'Direct' | 'Eclipse' | 'FullMoon' | 'NewMoon';
  title: string;
  description: string;
  impactCategory: 'Wealth' | 'Career' | 'Relationships' | 'Spirituality' | 'Health';
  badgeColor: string;
}

export default function CosmicTransitCalendar() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Ingress' | 'Retrograde' | 'Eclipse' | 'FullMoon'>('All');
  const [selectedEvent, setSelectedEvent] = useState<TransitEvent | null>(null);

  // Computed Upcoming Astronomical Ingress & Transit Events
  const transitEvents: TransitEvent[] = useMemo(() => [
    {
      id: 1,
      dateStr: 'Aug 17, 2026',
      planet: 'Sun',
      symbol: '☉',
      eventType: 'Ingress',
      title: 'Sun Ingress into Leo (Simha Sankranti)',
      description: 'Sun enters its own sign of Leo. Highly auspicious for executive leadership, personal branding, authority, and public recognition.',
      impactCategory: 'Career',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 2,
      dateStr: 'Aug 23, 2026',
      planet: 'Mercury',
      symbol: '☿',
      eventType: 'Direct',
      title: 'Mercury Turns Direct in Virgo (Exalted)',
      description: 'Mercury ends retrograde motion and turns direct in its exaltation sign of Virgo. Accelerates trade, analytical contracts, coding, and strategic financial investments.',
      impactCategory: 'Wealth',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      id: 3,
      dateStr: 'Aug 28, 2026',
      planet: 'Moon',
      symbol: '☽',
      eventType: 'FullMoon',
      title: 'Full Moon Supermoon in Shatabhisha Nakshatra',
      description: 'Illuminating 100 Healing Stars of Shatabhisha. Peak intuitive awareness, spiritual detachment, and breakthrough solutions for long-standing challenges.',
      impactCategory: 'Spirituality',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: 4,
      dateStr: 'Sep 05, 2026',
      planet: 'Jupiter',
      symbol: '♃',
      eventType: 'Ingress',
      title: 'Jupiter Transit Alignment in Gemini',
      description: 'Jupiter expands 3rd and 9th house intellect, publishing, multi-lingual learning, and international commercial expansion.',
      impactCategory: 'Wealth',
      badgeColor: 'text-[#D4AF37] bg-yellow-500/10 border-yellow-500/30',
    },
    {
      id: 5,
      dateStr: 'Sep 12, 2026',
      planet: 'Saturn',
      symbol: '♄',
      eventType: 'Retrograde',
      title: 'Saturn Retrograde Transit in Pisces',
      description: 'Saturn encourages structural auditing of spiritual goals, expenditures, and subconscious habit patterns. Discipline brings lasting karmic reward.',
      impactCategory: 'Career',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      id: 6,
      dateStr: 'Sep 21, 2026',
      planet: 'Sun & Moon',
      symbol: '☉☽',
      eventType: 'Eclipse',
      title: 'Solar Eclipse Window in Uttara Phalguni',
      description: 'Powerful karmic reset. Avoid starting major financial gambles during the 6-hour eclipse window; engage in silent meditation, prayer, and charity.',
      impactCategory: 'Health',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
  ], []);

  const filteredEvents = useMemo(() => {
    if (selectedFilter === 'All') return transitEvents;
    return transitEvents.filter(e => e.eventType === selectedFilter);
  }, [transitEvents, selectedFilter]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#06B6D4]" /> Cosmic Transit & Planetary Ingress Calendar
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Upcoming Planetary Sign Changes, Retrogrades & Eclipse Windows
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {['All', 'Ingress', 'Retrograde', 'FullMoon', 'Eclipse'].map(f => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f as any)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedFilter === f
                  ? 'bg-[#06B6D4]/20 text-cyan-300 border border-cyan-500/40 shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((evt) => (
          <motion.div
            key={evt.id}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => setSelectedEvent(evt)}
            className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer space-y-2.5 group shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-cyan-400">{evt.symbol}</span>
                <span className="text-xs font-mono font-bold text-white">{evt.planet}</span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${evt.badgeColor}`}>
                {evt.eventType}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 block">{evt.dateStr}</span>
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                {evt.title}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {evt.description}
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400">Impact: <strong className="text-white">{evt.impactCategory}</strong></span>
              <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                Details <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transit Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-md w-full rounded-3xl bg-[#111827] border border-cyan-500/40 p-6 space-y-4 shadow-2xl relative text-left"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-cyan-400">{selectedEvent.symbol}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white font-mono">{selectedEvent.title}</h3>
                    <span className="text-[10px] text-cyan-400 font-mono">{selectedEvent.dateStr}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-white/10 text-xs text-slate-300 leading-relaxed space-y-2">
                <span className="font-bold text-amber-300 font-mono block">Astronomical Analysis & Impact:</span>
                <p>{selectedEvent.description}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B1220] border border-emerald-500/30 text-xs space-y-1">
                <span className="font-bold text-emerald-400 font-mono block">Recommended Action / Solution:</span>
                <p className="text-slate-300 text-[11px]">
                  Align important initiatives with morning hours. Maintain charity, targeted focus, and personal discipline.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
