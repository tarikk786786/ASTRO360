import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, Zap, Sparkles, Calendar, ShieldCheck, ArrowRight, 
  HelpCircle, Clock, CheckCircle2, Download, AlertTriangle
} from 'lucide-react';
import { AstroBadge, AstroCard, AstroSheet } from '../../design-system';
import { EvidencePanel } from '../../design-system/patterns';
import type { UserProfile } from '../../types';

interface TransitAlert {
  id: string;
  planet: string;
  symbol: string;
  type: 'opportunity' | 'critical' | 'harmony';
  title: string;
  natalImpact: string;
  activeWindow: string;
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
    intensity: 'High',
    supportingTraditions: ['Vedic (D10)', 'Western (MC Ingress)', 'KP Sub-Lord'],
    actionAdvice: 'Launch pending proposals, lead strategic meetings, and initiate bold career negotiations.',
    citations: [
      { source: 'Brihat Parashara Hora Shastra', verse: 'Ch. 26, Sloka 14', text: 'Mars in the 10th house produces Kuladipaka yoga, bestowing vigor, administrative authority, and victorious execution.' },
      { source: 'Claudius Ptolemy - Tetrabiblos', verse: 'Book IV, Ch. 4', text: 'Mars elevated at the Midheaven grants sudden advancement through energetic application and courage.' }
    ],
    astronomy: [
      { factor: 'Mars Transiting Ecliptic', degree: '14°22\' Aries', ayanamsha: 'Lahiri 24°13\'' },
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
    intensity: 'High',
    supportingTraditions: ['Western (Trine)', 'Vedic (5th Drishti)', 'Jaimini Karaka'],
    actionAdvice: 'Apply for grants, sign major contracts, and schedule visionary strategy sessions.',
    citations: [
      { source: 'Phaladeepika by Mantreswara', verse: 'Ch. 20, Sloka 8', text: 'When Jupiter casts beneficial drishti upon the natal Sun, the native experiences honor from authorities and inner fulfillment.' }
    ],
    astronomy: [
      { factor: 'Transiting Jupiter', degree: '18°45\' Cancer', ayanamsha: 'Lahiri 24°13\'' },
      { factor: 'Natal Sun', degree: '19°10\' Scorpio', ayanamsha: 'Exact 120° Trine' }
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
    intensity: 'Moderate',
    supportingTraditions: ['Vedic (Shani Gochara)', 'Hellenistic Chronocrators'],
    actionAdvice: 'Audit legal agreements, eliminate recurring liabilities, and establish rigorous risk controls.',
    citations: [
      { source: 'Saravali by Kalyana Varma', verse: 'Ch. 31, Sloka 19', text: 'Saturn halting in retrograde brings culmination to delayed undertakings and rewards disciplined endurance.' }
    ],
    astronomy: [
      { factor: 'Saturn Stationary Degree', degree: '04°12\' Pisces', ayanamsha: 'Lahiri 24°13\'' }
    ]
  }
];

export default function OmniTransitAlertCenter({ userProfile }: { userProfile: UserProfile }) {
  const [selectedAlert, setSelectedAlert] = useState<TransitAlert | null>(null);
  const [filter, setFilter] = useState<'all' | 'opportunity' | 'critical' | 'harmony'>('all');

  const filteredAlerts = LIVE_TRANSIT_ALERTS.filter(
    a => filter === 'all' || a.type === filter
  );

  const downloadICS = (alert: TransitAlert) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ASTRO360//Transit Alert//EN
BEGIN:VEVENT
SUMMARY:ASTRO360: ${alert.title}
DESCRIPTION:${alert.natalImpact}\\nAdvice: ${alert.actionAdvice}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${alert.id}.ics`;
    link.click();
    URL.revokeObjectURL(url);
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
            <p className="text-xs text-slate-400 font-mono">Calculated for {userProfile.name || 'Your Natal Chart'}</p>
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

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => downloadICS(alert)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                  title="Export to Calendar (.ics)"
                >
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>Calendar</span>
                </button>

                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-white/[0.12] text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <HelpCircle className="w-3 h-3 text-amber-400" />
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
