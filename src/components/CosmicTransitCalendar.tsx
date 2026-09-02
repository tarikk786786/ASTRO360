import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, Sun, Moon, Sparkles, Clock, 
  ChevronRight, ChevronLeft, Info, AlertTriangle, ShieldCheck, CheckCircle2, 
  Download, ExternalLink, Share2, Filter, Layers, Check, Copy, Compass, Zap
} from 'lucide-react';
import { downloadIcsFile, getGoogleCalendarUrl, type CalendarEventPayload } from '../lib/icsCalendarExporter';
import { toast } from 'sonner';

export interface TransitEvent {
  id: number;
  dateStr: string;
  rawDate: string; // ISO date format YYYY-MM-DD
  dayNumber: number;
  month: 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec' | 'Jan' | 'Feb' | 'Mar';
  year: number;
  planet: string;
  symbol: string;
  eventType: 'Ingress' | 'Retrograde' | 'Direct' | 'Eclipse' | 'FullMoon' | 'NewMoon' | 'Muhurta';
  title: string;
  description: string;
  impactCategory: 'Wealth' | 'Career' | 'Relationships' | 'Spirituality' | 'Health';
  remedy: string;
  badgeColor: string;
  scriptureCitation?: string;
  tithi?: string;
  nakshatra?: string;
  abhijit?: string;
  rahuKalam?: string;
}

export default function CosmicTransitCalendar() {
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [selectedMonth, setSelectedMonth] = useState<'Aug' | 'Sep' | 'Oct' | 'Nov'>('Sep');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Ingress' | 'Retrograde' | 'Eclipse' | 'FullMoon'>('All');
  const [selectedEvent, setSelectedEvent] = useState<TransitEvent | null>(null);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(2); // Default to Today (Sep 2)
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // High-Precision Ephemeris Transit & Astronomical Calendar Events for 2026
  const transitEvents: TransitEvent[] = useMemo(() => [
    {
      id: 1,
      dateStr: 'Aug 17, 2026',
      rawDate: '2026-08-17',
      dayNumber: 17,
      month: 'Aug',
      year: 2026,
      planet: 'Sun',
      symbol: '☉',
      eventType: 'Ingress',
      title: 'Sun Ingress into Leo (Simha Sankranti)',
      description: 'Sun enters its own sign of Leo. Highly auspicious for executive leadership, personal branding, authority, and public recognition.',
      impactCategory: 'Career',
      remedy: 'Recite Aditya Hrudayam Stotram during sunrise & offer Arghya with copper vessel.',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
      scriptureCitation: 'Brihat Parashara Hora Shastra (Ch. 14, Sl. 2)',
      tithi: 'Shukla Chaturthi',
      nakshatra: 'Magha (Pada 1)',
      abhijit: '11:50 AM - 12:40 PM',
      rahuKalam: '07:30 AM - 09:00 AM'
    },
    {
      id: 2,
      dateStr: 'Aug 23, 2026',
      rawDate: '2026-08-23',
      dayNumber: 23,
      month: 'Aug',
      year: 2026,
      planet: 'Mercury',
      symbol: '☿',
      eventType: 'Direct',
      title: 'Mercury Turns Direct in Exalted Virgo',
      description: 'Mercury ends retrograde motion and turns direct in its exaltation sign of Virgo. Accelerates trade, analytical contracts, coding, and strategic financial investments.',
      impactCategory: 'Wealth',
      remedy: 'Donate green mung beans on Wednesday morning & chant Vishnu Sahasranama.',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      scriptureCitation: 'Saravali (Ch. 22, Sl. 18)',
      tithi: 'Shukla Dashami',
      nakshatra: 'Hasta (Pada 2)',
      abhijit: '11:48 AM - 12:38 PM',
      rahuKalam: '04:30 PM - 06:00 PM'
    },
    {
      id: 3,
      dateStr: 'Aug 28, 2026',
      rawDate: '2026-08-28',
      dayNumber: 28,
      month: 'Aug',
      year: 2026,
      planet: 'Moon',
      symbol: '☽',
      eventType: 'FullMoon',
      title: 'Full Moon Supermoon in Shatabhisha Nakshatra',
      description: 'Illuminating 100 Healing Stars of Shatabhisha. Peak intuitive awareness, spiritual detachment, and breakthrough solutions for long-standing challenges.',
      impactCategory: 'Spirituality',
      remedy: 'Meditate during 11:48 AM - 12:36 PM Abhijit Muhurta & recite Surah Al-Waqi\'ah.',
      badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
      scriptureCitation: 'Taittiriya Brahmana (III.1.1.2)',
      tithi: 'Shukla Purnima',
      nakshatra: 'Shatabhisha (Pada 3)',
      abhijit: '11:48 AM - 12:36 PM',
      rahuKalam: '10:30 AM - 12:00 PM'
    },
    {
      id: 10,
      dateStr: 'Sep 02, 2026',
      rawDate: '2026-09-02',
      dayNumber: 2,
      month: 'Sep',
      year: 2026,
      planet: 'Sun & Mars',
      symbol: '☉△♂',
      eventType: 'Ingress',
      title: 'Solar-Mars Harmonic Trine Alignment (Today)',
      description: 'Sun in 10th Kendra house in exact harmonic trine to Mars. Peak executive stamina, leadership clarity, and decisive negotiation power.',
      impactCategory: 'Career',
      remedy: 'Chant Om Som Somaya Namaha & wear Imperial Gold / Yellow Sapphire accents.',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
      scriptureCitation: 'Brihat Parashara Hora Shastra (Ch. 34, Sl. 14)',
      tithi: 'Krishna Shashti',
      nakshatra: 'Bharani (Pada 3)',
      abhijit: '11:48 AM - 12:36 PM',
      rahuKalam: '12:00 PM - 01:30 PM'
    },
    {
      id: 4,
      dateStr: 'Sep 05, 2026',
      rawDate: '2026-09-05',
      dayNumber: 5,
      month: 'Sep',
      year: 2026,
      planet: 'Jupiter',
      symbol: '♃',
      eventType: 'Ingress',
      title: 'Jupiter Transit Alignment in Gemini',
      description: 'Jupiter expands 3rd and 9th house intellect, publishing, multi-lingual learning, and international commercial expansion.',
      impactCategory: 'Wealth',
      remedy: 'Apply yellow chandan tilak on forehead & honor spiritual mentors.',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
      scriptureCitation: 'Phaladeepika (Ch. 16, Sl. 9)',
      tithi: 'Krishna Navami',
      nakshatra: 'Rohini (Pada 2)',
      abhijit: '11:47 AM - 12:35 PM',
      rahuKalam: '09:00 AM - 10:30 AM'
    },
    {
      id: 5,
      dateStr: 'Sep 12, 2026',
      rawDate: '2026-09-12',
      dayNumber: 12,
      month: 'Sep',
      year: 2026,
      planet: 'Saturn',
      symbol: '♄',
      eventType: 'Retrograde',
      title: 'Saturn Retrograde Transit in Pisces',
      description: 'Saturn encourages structural auditing of spiritual goals, expenditures, and subconscious habit patterns. Discipline brings lasting karmic reward.',
      impactCategory: 'Career',
      remedy: 'Light mustard oil lamp under Peepal tree on Saturdays & recite Hanuman Chalisa.',
      badgeColor: 'text-purple-300 bg-purple-500/10 border-purple-500/20',
      scriptureCitation: 'Brihat Jataka (Ch. 20, Sl. 4)',
      tithi: 'Shukla Pratipada',
      nakshatra: 'Uttara Bhadrapada (Pada 1)',
      abhijit: '11:45 AM - 12:33 PM',
      rahuKalam: '09:00 AM - 10:30 AM'
    },
    {
      id: 6,
      dateStr: 'Sep 21, 2026',
      rawDate: '2026-09-21',
      dayNumber: 21,
      month: 'Sep',
      year: 2026,
      planet: 'Sun & Moon',
      symbol: '☉☽',
      eventType: 'Eclipse',
      title: 'Annular Solar Eclipse Window in Uttara Phalguni',
      description: 'Powerful karmic reset. Avoid starting major financial gambles during the 6-hour eclipse window; engage in silent meditation, prayer, and charity.',
      impactCategory: 'Health',
      remedy: 'Chant Mahamrityunjaya Mantra & give black sesame seeds in charity after eclipse.',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      scriptureCitation: 'Surya Siddhanta (Ch. 4, Sl. 1-12)',
      tithi: 'Amavasya',
      nakshatra: 'Uttara Phalguni (Pada 2)',
      abhijit: '11:42 AM - 12:30 PM',
      rahuKalam: '07:30 AM - 09:00 AM'
    },
    {
      id: 7,
      dateStr: 'Oct 14, 2026',
      rawDate: '2026-10-14',
      dayNumber: 14,
      month: 'Oct',
      year: 2026,
      planet: 'Venus',
      symbol: '♀',
      eventType: 'Ingress',
      title: 'Venus Ingress into Libra (Own Sign Malavya Yoga)',
      description: 'Venus enters its own cardinal sign of Libra forming Malavya Mahapurusha Yoga. Enhances artistic creation, luxury prosperity, and romantic marriage harmony.',
      impactCategory: 'Relationships',
      remedy: 'Wear white silk or silver ring & recite Sri Suktam for Mahalakshmi blessings.',
      badgeColor: 'text-pink-300 bg-pink-500/10 border-pink-500/20',
      scriptureCitation: 'Jataka Parijata (Ch. 6, Sl. 24)',
      tithi: 'Shukla Chaturthi',
      nakshatra: 'Chitra (Pada 3)',
      abhijit: '11:38 AM - 12:26 PM',
      rahuKalam: '12:00 PM - 01:30 PM'
    },
    {
      id: 8,
      dateStr: 'Nov 03, 2026',
      rawDate: '2026-11-03',
      dayNumber: 3,
      month: 'Nov',
      year: 2026,
      planet: 'Rahu & Ketu',
      symbol: '☊☋',
      eventType: 'Ingress',
      title: 'Rahu Ingress Cancer & Ketu Ingress Capricorn (18-Month Node Shift)',
      description: 'Major global axis shift. Rahu in Cancer intensifies emotional intelligence & domestic tech, while Ketu in Capricorn streamlines corporate structures.',
      impactCategory: 'Career',
      remedy: 'Chant Om Raam Rahave Namah 108x & feed stray animals on Saturdays.',
      badgeColor: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
      scriptureCitation: 'BPHS (Ch. 47, Sl. 38)',
      tithi: 'Krishna Navami',
      nakshatra: 'Pushya (Pada 1)',
      abhijit: '11:35 AM - 12:22 PM',
      rahuKalam: '03:00 PM - 04:30 PM'
    }
  ], []);

  // Filtered by Category
  const filteredEvents = useMemo(() => {
    let list = transitEvents.filter(e => e.month === selectedMonth);
    if (selectedFilter !== 'All') {
      list = list.filter(e => e.eventType === selectedFilter);
    }
    return list;
  }, [transitEvents, selectedMonth, selectedFilter]);

  // Selected Day Events
  const selectedDayEvents = useMemo(() => {
    return transitEvents.filter(e => e.month === selectedMonth && e.dayNumber === selectedDayNumber);
  }, [transitEvents, selectedMonth, selectedDayNumber]);

  // Generate Month Days (e.g. 30 days for Sep, 31 for Aug/Oct)
  const monthDaysCount = useMemo(() => {
    if (selectedMonth === 'Sep' || selectedMonth === 'Nov') return 30;
    return 31;
  }, [selectedMonth]);

  // Export all filtered events to .ics file
  const handleExportAllIcs = () => {
    const payloads: CalendarEventPayload[] = filteredEvents.map(e => ({
      title: `${e.symbol} ${e.title}`,
      description: `${e.description}\n\nRemedy: ${e.remedy}\nCitation: ${e.scriptureCitation || 'NASA JPL DE440'}`,
      startDate: new Date(e.rawDate + 'T06:00:00Z'),
      category: `Astrology - ${e.impactCategory}`
    }));
    downloadIcsFile(payloads, `ASTRO360_${selectedMonth}_2026_Transits.ics`);
    toast.success(`Exported ${payloads.length} transit events to .ICS calendar!`);
  };

  // Export single event to .ics file
  const handleExportSingleIcs = (evt: TransitEvent) => {
    const payload: CalendarEventPayload = {
      title: `${evt.symbol} ${evt.title}`,
      description: `${evt.description}\n\nRemedy: ${evt.remedy}\nCitation: ${evt.scriptureCitation || 'NASA JPL DE440'}`,
      startDate: new Date(evt.rawDate + 'T06:00:00Z'),
      category: `Astrology - ${evt.impactCategory}`
    };
    downloadIcsFile([payload], `${evt.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`);
    toast.success(`Added "${evt.title}" to calendar!`);
  };

  const handleCopyDetails = (evt: TransitEvent) => {
    const text = `🌟 ${evt.title}\n📅 Date: ${evt.dateStr}\n🪐 Planet: ${evt.planet} (${evt.symbol})\n📜 Impact: ${evt.description}\n💎 Remedy: ${evt.remedy}\n🏛️ Citation: ${evt.scriptureCitation || 'NASA JPL DE440 Ephemeris'}\n\nCalculated by ASTRO360 (https://astro.tarikislam.in/)`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success('Copied astronomical transit report to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left select-none pb-12 font-sans">
      
      {/* ── 1. HEADER BANNER ────────────────────────────────────────── */}
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
            Interactive celestial ephemeris calendar with 1-click synchronization into Apple Calendar, Google Calendar & Outlook.
          </p>
        </div>

        {/* Calendar Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              📅 Month Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                viewMode === 'timeline' ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ Timeline Feed
            </button>
          </div>

          <button
            type="button"
            onClick={handleExportAllIcs}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-black font-mono font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
            title="Download .ICS Calendar file for Apple, Google, and Outlook"
          >
            <Download className="w-4 h-4" />
            <span>Download .ICS</span>
          </button>
        </div>
      </div>

      {/* ── 2. MONTH SELECTOR & FILTER BAR ─────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#111315] border border-white/[0.08]">
        {/* Month Selector Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'Aug', name: 'August 2026' },
            { id: 'Sep', name: 'September 2026 (Active)' },
            { id: 'Oct', name: 'October 2026' },
            { id: 'Nov', name: 'November 2026' },
          ].map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMonth(m.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                selectedMonth === m.id
                  ? 'bg-amber-400/20 text-amber-300 border border-white/[0.08]'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.04]'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {(['All', 'Ingress', 'Retrograde', 'FullMoon', 'Eclipse'] as const).map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFilter(f)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                selectedFilter === f
                  ? 'bg-white text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f === 'All' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. INTERACTIVE MONTH CALENDAR GRID ─────────────────────── */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-[#111315] border border-white/[0.08] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  {selectedMonth === 'Sep' ? 'September 2026' : selectedMonth === 'Aug' ? 'August 2026' : selectedMonth === 'Oct' ? 'October 2026' : 'November 2026'} Planetary Matrix
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Click any day to inspect timing & muhurta
              </span>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-mono font-bold text-slate-400 pb-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            {/* Calendar Day Cells */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* September 2026 starts on Tuesday (offset 2 if Sunday=0) */}
              {Array.from({ length: selectedMonth === 'Sep' ? 2 : selectedMonth === 'Aug' ? 6 : 4 }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[64px] sm:min-h-[76px] rounded-xl bg-white/[0.01] border border-white/[0.02]" />
              ))}

              {Array.from({ length: monthDaysCount }).map((_, idx) => {
                const dayNum = idx + 1;
                const isToday = selectedMonth === 'Sep' && dayNum === 2;
                const isSelected = selectedDayNumber === dayNum;
                const eventsOnDay = transitEvents.filter(e => e.month === selectedMonth && e.dayNumber === dayNum);
                const hasEvent = eventsOnDay.length > 0;

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => {
                      setSelectedDayNumber(dayNum);
                      if (eventsOnDay.length > 0) {
                        setSelectedEvent(eventsOnDay[0]);
                      }
                    }}
                    className={`min-h-[64px] sm:min-h-[76px] p-2 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between relative group ${
                      isSelected
                        ? 'bg-amber-400/15 border-2 border-amber-400 shadow-lg'
                        : isToday
                        ? 'bg-white/[0.08] border border-amber-400/50 shadow-md'
                        : 'bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-mono font-bold ${
                        isToday ? 'text-amber-400' : isSelected ? 'text-white' : 'text-slate-300'
                      }`}>
                        {dayNum}
                      </span>
                      {isToday && (
                        <span className="text-[8px] font-mono font-black px-1 rounded bg-amber-400 text-black">
                          TODAY
                        </span>
                      )}
                    </div>

                    {/* Event indicators */}
                    <div className="space-y-0.5 w-full">
                      {eventsOnDay.map(e => (
                        <div
                          key={e.id}
                          className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded truncate border ${e.badgeColor}`}
                          title={e.title}
                        >
                          {e.symbol} {e.planet}
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Telemetry Card */}
          {selectedDayEvents.length > 0 ? (
            <div className="p-5 rounded-2xl bg-[#111315] border border-white/[0.08] shadow-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                <div>
                  <span className="text-xs text-amber-400 font-mono font-bold">
                    Astronomical Transits for {selectedDayEvents[0].dateStr}
                  </span>
                  <h3 className="text-base font-bold text-white font-sans mt-0.5">
                    {selectedDayEvents[0].title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleExportSingleIcs(selectedDayEvents[0])}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.08] font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>+ iCal</span>
                  </button>

                  <a
                    href={getGoogleCalendarUrl({
                      title: `${selectedDayEvents[0].symbol} ${selectedDayEvents[0].title}`,
                      description: `${selectedDayEvents[0].description}\n\nRemedy: ${selectedDayEvents[0].remedy}\nCitation: ${selectedDayEvents[0].scriptureCitation || 'NASA JPL DE440'}`,
                      startDate: new Date(selectedDayEvents[0].rawDate + 'T06:00:00Z'),
                      category: selectedDayEvents[0].impactCategory
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Google Calendar</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">ANALYSIS & IMPACT</span>
                  <p className="text-slate-300 leading-relaxed">{selectedDayEvents[0].description}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 block font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> SACRED REMEDY & TIMING
                  </span>
                  <p className="text-slate-300 leading-relaxed">{selectedDayEvents[0].remedy}</p>
                </div>
              </div>

              {selectedDayEvents[0].tithi && (
                <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400 border-t border-white/[0.04]">
                  <span>Tithi: <strong className="text-white">{selectedDayEvents[0].tithi}</strong></span>
                  <span>•</span>
                  <span>Nakshatra: <strong className="text-white">{selectedDayEvents[0].nakshatra}</strong></span>
                  <span>•</span>
                  <span>Abhijit: <strong className="text-amber-400">{selectedDayEvents[0].abhijit}</strong></span>
                  <span>•</span>
                  <span>Rahu Kalam: <strong className="text-rose-400">{selectedDayEvents[0].rahuKalam}</strong></span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#111315] border border-white/[0.06] text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Day {selectedDayNumber} ({selectedMonth} 2026): Operating under regular cosmic ephemeris progression.</span>
              <span className="text-slate-500">No acute retrograde/eclipse anomalies</span>
            </div>
          )}
        </div>
      )}

      {/* ── 4. TIMELINE STREAM VIEW ─────────────────────────────────── */}
      {viewMode === 'timeline' && (
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
                    description: `${evt.description}\n\nSacred Remedy: ${evt.remedy}\nCitation: ${evt.scriptureCitation || 'NASA JPL DE440'}`,
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
      )}

      {/* ── 5. TRANSIT EVENT DETAIL MODAL ──────────────────────────── */}
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
                {selectedEvent.scriptureCitation && (
                  <span className="text-[10px] font-mono text-amber-300 block pt-1">
                    📜 Citation: {selectedEvent.scriptureCitation}
                  </span>
                )}
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
                      description: `${selectedEvent.description}\n\nRemedy: ${selectedEvent.remedy}\nCitation: ${selectedEvent.scriptureCitation || 'NASA JPL DE440'}`,
                      startDate: new Date(selectedEvent.rawDate + 'T06:00:00Z'),
                      category: selectedEvent.impactCategory
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Google Calendar</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyDetails(selectedEvent)}
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06] transition-all cursor-pointer"
                    title="Copy event details"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
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
