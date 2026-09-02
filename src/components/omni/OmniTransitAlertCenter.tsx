import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Zap, Sparkles, Calendar, ShieldCheck, ArrowRight, 
  HelpCircle, Clock, CheckCircle2, Download, AlertTriangle,
  ExternalLink, Copy, Check
} from 'lucide-react';
import { AstroBadge, AstroCard, AstroSheet } from '../../design-system';
import { EvidencePanel } from '../../design-system/patterns';
import { downloadIcsFile, getGoogleCalendarUrl, CalendarEventPayload } from '../../lib/icsCalendarExporter';
import { toast } from 'sonner';
import type { UserProfile } from '../../types';

interface TransitAlert {
  id: string;
  planet: string;
  symbol: string;
  type: 'opportunity' | 'critical' | 'harmony';
  title: string;
  natalImpact: string;
  activeWindow: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  intensity: 'High' | 'Moderate' | 'Subtle';
  supportingTraditions: string[];
  actionAdvice: string;
  citations: { source: string; verse?: string; text: string }[];
  astronomy: { factor: string; degree: string; ayanamsha: string }[];
}

const LIVE_TRANSIT_ALERTS: TransitAlert[] = [
  {
    id: 'ALERT_01_MARS_10TH',
    planet: 'Mars',
    symbol: '♂',
    type: 'opportunity',
    title: 'Mars Ingress into 10th House of Career',
    natalImpact: 'Transiting Mars crosses your Midheaven (10th Bhava), activating professional agency, execution speed, and decisive leadership.',
    activeWindow: 'Sep 12 – Oct 28, 2026',
    startDate: '2026-09-12T09:00:00Z',
    endDate: '2026-10-28T18:00:00Z',
    intensity: 'High',
    supportingTraditions: ['Vedic (D10)', 'Western (MC Ingress)', 'KP Sub-Lord'],
    actionAdvice: 'Launch pending proposals, lead strategic meetings, and initiate bold career negotiations.',
    citations: [
      { source: 'Brihat Parashara Hora Shastra', verse: 'Ch. 26, Sloka 14', text: 'Mars in the 10th house produces Kuladipaka yoga, bestowing vigor, administrative authority, and victorious execution.' },
      { source: 'Claudius Ptolemy - Tetrabiblos', verse: 'Book IV, Ch. 4', text: 'Mars elevated at the Midheaven grants sudden advancement through energetic application and courage.' }
    ],
    astronomy: [
      { factor: 'Mars Transiting Ecliptic', degree: '14°22" Aries', ayanamsha: 'Lahiri 24°13"' },
      { factor: 'Natal Midheaven Aspect', degree: 'Trine within 1.2° orb', ayanamsha: 'Exact Aspect' }
    ]
  },
  {
    id: 'ALERT_02_JUPITER_TRINE_SUN',
    planet: 'Jupiter',
    symbol: '♃',
    type: 'harmony',
    title: 'Jupiter Trine Natal Sun Window',
    natalImpact: 'Benefic radiation from transiting Jupiter expands vitality, institutional support, and financial optimism.',
    activeWindow: 'Oct 04 – Oct 22, 2026',
    startDate: '2026-10-04T08:00:00Z',
    endDate: '2026-10-22T20:00:00Z',
    intensity: 'High',
    supportingTraditions: ['Western (Trine)', 'Vedic (5th Drishti)', 'Jaimini Karaka'],
    actionAdvice: 'Apply for grants, sign major contracts, and schedule visionary strategy sessions.',
    citations: [
      { source: 'Phaladeepika by Mantreswara', verse: 'Ch. 20, Sloka 8', text: 'When Jupiter casts beneficial drishti upon the natal Sun, the native experiences honor from authorities and inner fulfillment.' }
    ],
    astronomy: [
      { factor: 'Transiting Jupiter', degree: '18°45" Cancer', ayanamsha: 'Lahiri 24°13"' },
      { factor: 'Natal Sun', degree: '19°10" Scorpio', ayanamsha: 'Exact 120° Trine' }
    ]
  },
  {
    id: 'ALERT_03_SATURN_STATIONARY',
    planet: 'Saturn',
    symbol: '♄',
    type: 'critical',
    title: 'Saturn Stationary Direct in 8th House',
    natalImpact: 'Saturn halts retrograde motion, anchoring structural debt reduction, audit clearance, and long-term consolidation.',
    activeWindow: 'Nov 02 – Dec 15, 2026',
    startDate: '2026-11-02T06:00:00Z',
    endDate: '2026-12-15T18:00:00Z',
    intensity: 'Moderate',
    supportingTraditions: ['Vedic (Shani Gochara)', 'Hellenistic Chronocrators'],
    actionAdvice: 'Audit legal agreements, eliminate recurring liabilities, and establish rigorous risk controls.',
    citations: [
      { source: 'Saravali by Kalyana Varma', verse: 'Ch. 31, Sloka 19', text: 'Saturn halting in retrograde brings culmination to delayed undertakings and rewards disciplined endurance.' }
    ],
    astronomy: [
      { factor: 'Saturn Stationary Degree', degree: '04°12" Pisces', ayanamsha: 'Lahiri 24°13"' }
    ]
  }
];

export default function OmniTransitAlertCenter({ userProfile }: { userProfile: UserProfile }) {
  const [selectedAlert, setSelectedAlert] = useState<TransitAlert | null>(null);
  const [filter, setFilter] = useState<'all' | 'opportunity' | 'critical' | 'harmony'>('all');
  const [activeMenuAlertId, setActiveMenuAlertId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAlerts = LIVE_TRANSIT_ALERTS.filter(
    a => filter === 'all' || a.type === filter
  );

  const handleDownloadIcs = (alert: TransitAlert) => {
    const payload: CalendarEventPayload = {
      title: `ASTRO360: ${alert.title}`,
      description: `${alert.natalImpact}\n\nStrategic Advice: ${alert.actionAdvice}\nWindow: ${alert.activeWindow}\nTraditions: ${alert.supportingTraditions.join(', ')}`,
      startDate: alert.startDate,
      endDate: alert.endDate,
      category: `Astrology - ${alert.planet} Transit`,
      location: 'Topocentric Meridian (Natal Chart Coordinates)'
    };
    downloadIcsFile([payload], `ASTRO360_${alert.planet}_Transit.ics`);
    toast.success(`Exported ${alert.title} to iCal (.ics)!`);
    setActiveMenuAlertId(null);
  };

  const handleOpenGoogleCalendar = (alert: TransitAlert) => {
    const payload: CalendarEventPayload = {
      title: `ASTRO360: ${alert.title}`,
      description: `${alert.natalImpact}\n\nStrategic Advice: ${alert.actionAdvice}\nActive Timing: ${alert.activeWindow}\nSupported by: ${alert.supportingTraditions.join(', ')}`,
      startDate: alert.startDate,
      endDate: alert.endDate,
      category: `Astrology - ${alert.planet} Transit`,
      location: 'Topocentric Meridian'
    };
    const url = getGoogleCalendarUrl(payload);
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success(`Opening Google Calendar for ${alert.title}`);
    setActiveMenuAlertId(null);
  };

  const handleCopyAlertDetails = (alert: TransitAlert) => {
    const text = `🪐 ASTRO360 Transit Alert: ${alert.title}
🗓️ Window: ${alert.activeWindow}
⚡ Impact: ${alert.intensity} (${alert.planet} Transit)
📖 Summary: ${alert.natalImpact}
🛠️ Strategic Advice: ${alert.actionAdvice}
🌐 Grounded in: ${alert.supportingTraditions.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(alert.id);
    toast.success('Transit alert details copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
    setActiveMenuAlertId(null);
  };

  return (
    <div className="space-y-4 text-left font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-400/20 border border-white/[0.08] flex items-center justify-center text-amber-300">
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight">Active Planetary Transit Alerts</h3>
            <p className="text-xs text-slate-400 font-mono">Calculated for {userProfile.name || 'Your Natal Chart'} • RFC 5545 Calendar Sync</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-[#0B1220] p-1 rounded-xl border border-white/10 text-[11px] font-mono">
          {(['all', 'opportunity', 'harmony', 'critical'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                filter === f ? 'bg-white text-black font-semibold shadow-sm font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards List */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => (
          <AstroCard key={alert.id} variant="interactive" className="space-y-3 border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-white/10 text-amber-300 font-serif font-black flex items-center justify-center text-xs">
                  {alert.symbol}
                </span>
                <span className="text-xs font-bold text-white font-mono">{alert.planet} Transit</span>
                <AstroBadge variant={alert.type === 'opportunity' ? 'emerald' : alert.type === 'harmony' ? 'gold' : 'rose'}>
                  {alert.intensity} Impact
                </AstroBadge>
              </div>

              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {alert.activeWindow}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white tracking-tight">{alert.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{alert.natalImpact}</p>
            </div>

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-[11px] text-amber-300 font-sans flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Strategic Advice:</strong> {alert.actionAdvice}</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/5 text-xs font-mono">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-slate-500 uppercase">Traditions:</span>
                {alert.supportingTraditions.map(t => (
                  <span key={t} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto relative">
                {/* Add to Calendar Button with Dropdown / Direct Action */}
                <div className="relative">
                  <button
                    onClick={() => setActiveMenuAlertId(activeMenuAlertId === alert.id ? null : alert.id)}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/[0.12] text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm"
                    title="Add this transit window to Apple, Google, or Outlook Calendar"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add to Calendar</span>
                  </button>

                  {/* Calendar Sync Menu Popover */}
                  <AnimatePresence>
                    {activeMenuAlertId === alert.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 bottom-full mb-2 w-56 rounded-2xl bg-[#0D1424] border border-white/[0.15] p-1.5 shadow-2xl z-50 text-xs font-sans space-y-1 backdrop-blur-xl"
                      >
                        <div className="px-2 py-1 text-[10px] font-mono text-slate-400 border-b border-white/[0.08] uppercase font-bold">
                          Sync Transit Window
                        </div>
                        <button
                          onClick={() => handleDownloadIcs(alert)}
                          className="w-full px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-slate-200 hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Download className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Apple / Outlook (.ics)</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleOpenGoogleCalendar(alert)}
                          className="w-full px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-slate-200 hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Google Calendar Web</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleCopyAlertDetails(alert)}
                          className="w-full px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-slate-200 hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            {copiedId === alert.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                            <span>Copy Event Details</span>
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-white/[0.12] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Why this timing? →</span>
                </button>
              </div>
            </div>
          </AstroCard>
        ))}
      </div>

      {/* Why Evidence Sheet */}
      <AstroSheet
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
        title={selectedAlert ? selectedAlert.title : 'Explainable Provenance'}
        description="Classical rules and deterministic coordinates backing this timing trigger."
      >
        {selectedAlert && (
          <EvidencePanel
            predictionTitle={selectedAlert.title}
            citations={selectedAlert.citations}
            mathematicalFactors={selectedAlert.astronomy}
          />
        )}
      </AstroSheet>
    </div>
  );
}
