import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, Sun, Moon, Sparkles, Clock, 
  ChevronRight, Info, AlertTriangle, ShieldCheck, CheckCircle2, 
  Download, ExternalLink, Share2, Filter, Layers
} from 'lucide-react';
import { downloadIcsFile, getGoogleCalendarUrl, type CalendarEventPayload } from '../lib/icsCalendarExporter';
import { toast } from 'sonner';

interface TransitEvent {
  id: number;
  dateStr: string;
  rawDate: string; // ISO date format YYYY-MM-DD
  planet: string;
  symbol: string;
  eventType: 'Ingress' | 'Retrograde' | 'Direct' | 'Eclipse' | 'FullMoon' | 'NewMoon';
  title: string;
  description: string;
  impactCategory: 'Wealth' | 'Career' | 'Relationships' | 'Spirituality' | 'Health';
  remedy: string;
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
      rawDate: '2026-08-17',
      planet: 'Sun',
      symbol: '☉',
      eventType: 'Ingress',
      title: 'Sun Ingress into Leo (Simha Sankranti)',
      description: 'Sun enters its own sign of Leo. Highly auspicious for executive leadership, personal branding, authority, and public recognition.',
      impactCategory: 'Career',
      remedy: 'Recite Aditya Hrudayam Stotram during sunrise & offer Arghya with copper vessel.',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 2,
      dateStr: 'Aug 23, 2026',
      rawDate: '2026-08-23',
      planet: 'Mercury',
      symbol: '☿',
      eventType: 'Direct',
      title: 'Mercury Turns Direct in Exalted Virgo',
      description: 'Mercury ends retrograde motion and turns direct in its exaltation sign of Virgo. Accelerates trade, analytical contracts, coding, and strategic financial investments.',
      impactCategory: 'Wealth',
      remedy: 'Donate green mung beans on Wednesday morning & chant Vishnu Sahasranama.',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 3,
      dateStr: 'Aug 28, 2026',
      rawDate: '2026-08-28',
      planet: 'Moon',
      symbol: '☽',
      eventType: 'FullMoon',
      title: 'Full Moon Supermoon in Shatabhisha Nakshatra',
      description: 'Illuminating 100 Healing Stars of Shatabhisha. Peak intuitive awareness, spiritual detachment, and breakthrough solutions for long-standing challenges.',
      impactCategory: 'Spirituality',
      remedy: 'Meditate during 11:48 AM - 12:36 PM Abhijit Muhurta & recite Surah Al-Waqi\'ah.',
      badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      id: 4,
      dateStr: 'Sep 05, 2026',
      rawDate: '2026-09-05',
      planet: 'Jupiter',
      symbol: '♃',
      eventType: 'Ingress',
      title: 'Jupiter Transit Alignment in Gemini',
      description: 'Jupiter expands 3rd and 9th house intellect, publishing, multi-lingual learning, and international commercial expansion.',
      impactCategory: 'Wealth',
      remedy: 'Apply yellow chandan tilak on forehead & honor spiritual mentors.',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 5,
      dateStr: 'Sep 12, 2026',
      rawDate: '2026-09-12',
      planet: 'Saturn',
      symbol: '♄',
      eventType: 'Retrograde',
      title: 'Saturn Retrograde Transit in Pisces',
      description: 'Saturn encourages structural auditing of spiritual goals, expenditures, and subconscious habit patterns. Discipline brings lasting karmic reward.',
      impactCategory: 'Career',
      remedy: 'Light mustard oil lamp under Peepal tree on Saturdays & recite Hanuman Chalisa.',
      badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
    },
    {
      id: 6,
      dateStr: 'Sep 21, 2026',
      rawDate: '2026-09-21',
      planet: 'Sun & Moon',
      symbol: '☉☽',
      eventType: 'Eclipse',
      title: 'Annular Solar Eclipse Window in Uttara Phalguni',
      description: 'Powerful karmic reset. Avoid starting major financial gambles during the 6-hour eclipse window; engage in silent meditation, prayer, and charity.',
      impactCategory: 'Health',
      remedy: 'Chant Mahamrityunjaya Mantra & give black sesame seeds in charity after eclipse.',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      id: 7,
      dateStr: 'Oct 14, 2026',
      rawDate: '2026-10-14',
      planet: 'Venus',
      symbol: '♀',
      eventType: 'Ingress',
      title: 'Venus Ingress into Libra (Own Sign Malavya Yoga)',
      description: 'Venus enters its own cardinal sign of Libra forming Malavya Mahapurusha Yoga. Enhances artistic creation, luxury prosperity, and romantic marriage harmony.',
      impactCategory: 'Relationships',
      remedy: 'Wear white silk or silver ring & recite Sri Suktam for Mahalakshmi blessings.',
      badgeColor: 'text-pink-300 bg-pink-500/10 border-pink-500/20',
    },
    {
      id: 8,
      dateStr: 'Nov 03, 2026',
      rawDate: '2026-11-03',
      planet: 'Rahu & Ketu',
      symbol: '☊☋',
      eventType: 'Ingress',
      title: 'Rahu Ingress Cancer & Ketu Ingress Capricorn (18-Month Node Shift)',
      description: 'Major global axis shift. Rahu in Cancer intensifies emotional intelligence & domestic tech, while Ketu in Capricorn streamlines corporate structures.',
      impactCategory: 'Career',
      remedy: 'Chant Om Raam Rahave Namah 108x & feed stray animals on Saturdays.',
      badgeColor: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      id: 9,
      dateStr: 'Mar 03, 2027',
      rawDate: '2027-03-03',
      planet: 'Sun & Moon',
      symbol: '☉☽',
      eventType: 'Eclipse',
      title: 'Total Lunar Eclipse Window in Purva Phalguni',
      description: 'Total Lunar Eclipse in Leo-Virgo axis. Deep psychological cleansing, releasing past attachments, and spiritual awakening.',
      impactCategory: 'Spirituality',
      remedy: 'Perform silent Ruqyah & water charity during eclipse totality.',
      badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
    }
  ], []);

  const filteredEvents = useMemo(() => {
    if (selectedFilter === 'All') return transitEvents;
    return transitEvents.filter(e => e.eventType === selectedFilter);
  }, [transitEvents, selectedFilter]);

  // Export all filtered events to .ics file
  const handleExportAllIcs = () => {
    const payloads: CalendarEventPayload[] = filteredEvents.map(e => ({
      title: `${e.symbol} ${e.title}`,
      description: `${e.description}\n\nRemedy: ${e.remedy}`,
      startDate: new Date(e.rawDate + 'T06:00:00Z'),
      category: `Astrology - ${e.impactCategory}`
    }));
    downloadIcsFile(payloads, `ASTRO360_Transits_${selectedFilter}.ics`);
    toast.success(`Exported ${payloads.length} transit events to calendar (.ics)!`);
  };

  // Export single event to .ics file
  const handleExportSingleIcs = (evt: TransitEvent) => {
    const payload: CalendarEventPayload = {
      title: `${evt.symbol} ${evt.title}`,
      description: `${evt.description}\n\nRemedy: ${evt.remedy}`,
      startDate: new Date(evt.rawDate + 'T06:00:00Z'),
      category: `Astrology - ${evt.impactCategory}`
    };
    downloadIcsFile([payload], `${evt.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    toast.success(`Added "${evt.title}" to calendar!`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left select-none pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-white/[0.08] text-cyan-300 text-xs font-mono font-bold">
            <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>NASA JPL DE440 Astronomical Transit Calendar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            PLANETARY INGRESS & TIMING CALENDAR
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            1-Click synchronization of planetary sign changes, retrogrades, eclipse windows & electional timings into your personal calendar.
          </p>
        </div>

        {/* Calendar Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleExportAllIcs}
            className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 text-black font-mono font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
            title="Download iCalendar file for Apple, Google, and Outlook"
          >
            <Download className="w-4 h-4" />
            <span>Download .ICS Calendar</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Filter & Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#111315] border border-white/[0.08]">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['All', 'Ingress', 'Retrograde', 'FullMoon', 'Eclipse'] as const).map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                selectedFilter === f
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {f === 'All' ? '🌌 All Events' : f === 'Ingress' ? '🪐 Ingresses' : f === 'Retrograde' ? '🔄 Retrogrades' : f === 'FullMoon' ? '🌕 Full Moons' : '🌑 Eclipses'}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono text-slate-400 shrink-0">
          Showing <strong className="text-white">{filteredEvents.length}</strong> calibrated events
        </span>
      </div>

      {/* 3. Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((evt) => (
          <motion.div
            key={evt.id}
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-5 rounded-2xl bg-[#111315] border border-white/[0.08] hover:border-white/20 transition-all space-y-3 group shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">{evt.symbol}</span>
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">{evt.planet}</span>
                    <span className="text-[10px] font-mono text-slate-400">{evt.dateStr}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${evt.badgeColor}`}>
                  {evt.eventType}
                </span>
              </div>

              <div className="space-y-1">
                <h4 
                  onClick={() => setSelectedEvent(evt)}
                  className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors leading-tight cursor-pointer"
                >
                  {evt.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                  {evt.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => handleExportSingleIcs(evt)}
                className="flex items-center gap-1 text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-lg border border-white/[0.06] transition-all cursor-pointer"
                title="Add this event to Apple / Outlook Calendar"
              >
                <CalendarIcon className="w-3 h-3 text-cyan-400" />
                <span>+ iCal</span>
              </button>

              <a
                href={getGoogleCalendarUrl({
                  title: `${evt.symbol} ${evt.title}`,
                  description: `${evt.description}\n\nSacred Remedy: ${evt.remedy}`,
                  startDate: new Date(evt.rawDate + 'T06:00:00Z'),
                  category: evt.impactCategory
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded-lg border border-white/[0.06] transition-all cursor-pointer"
                title="Add this event to Google Calendar"
              >
                <ExternalLink className="w-3 h-3 text-emerald-400" />
                <span>+ Google</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedEvent(evt)}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-0.5 cursor-pointer ml-auto"
              >
                <span>Details</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. Transit Event Detail Modal */}
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
              className="max-w-lg w-full rounded-3xl bg-[#111315] border border-white/[0.12] p-6 sm:p-7 space-y-4 shadow-2xl relative text-left"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-white p-2 rounded-2xl bg-white/[0.04] border border-white/[0.08]">{selectedEvent.symbol}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white font-sans">{selectedEvent.title}</h3>
                    <span className="text-xs text-slate-400 font-mono">{selectedEvent.dateStr} • {selectedEvent.eventType}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-200 leading-relaxed space-y-1.5 font-sans">
                <span className="font-bold text-white font-mono block">Astronomical Analysis & Life Impact:</span>
                <p>{selectedEvent.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs space-y-1.5 font-sans">
                <span className="font-bold text-emerald-400 font-mono block flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recommended Action & Sacred Remedy:
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {selectedEvent.remedy}
                </p>
              </div>

              {/* Modal Calendar Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleExportSingleIcs(selectedEvent)}
                    className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.08] font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download .ICS</span>
                  </button>

                  <a
                    href={getGoogleCalendarUrl({
                      title: `${selectedEvent.symbol} ${selectedEvent.title}`,
                      description: `${selectedEvent.description}\n\nRemedy: ${selectedEvent.remedy}`,
                      startDate: new Date(selectedEvent.rawDate + 'T06:00:00Z'),
                      category: selectedEvent.impactCategory
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Google Calendar</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white text-xs font-mono cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
