import React from 'react';
import { motion } from 'motion/react';
import { Radio, AlertTriangle, ShieldCheck, Zap, Sparkles, ArrowRight, Compass, ShieldAlert } from 'lucide-react';

interface TransitAlert {
  planet: string;
  symbol: string;
  fromSign: string;
  toSign: string;
  date: string;
  impactLevel: 'Major Impact' | 'High Opportunity' | 'Caution Needed';
  impactColor: string;
  description: string;
  prescribedRemedy: string;
}

const TRANSIT_ALERTS: TransitAlert[] = [
  {
    planet: 'Saturn ♄',
    symbol: '♄',
    fromSign: 'Aquarius ♒',
    toSign: 'Pisces ♓',
    date: 'March 2026',
    impactLevel: 'Major Impact',
    impactColor: 'text-amber-400 bg-amber-500/10 border-white/[0.08]',
    description: 'Saturn enters Pisces, shifting karmic discipline from collective structures to deep emotional and spiritual purification.',
    prescribedRemedy: 'Perform Saturday oil lamp charity & meditate on Mahamrityunjaya Mantra (396Hz).'
  },
  {
    planet: 'Jupiter ♃',
    symbol: '♃',
    fromSign: 'Taurus ♉',
    toSign: 'Gemini ♊',
    date: 'May 2026',
    impactLevel: 'High Opportunity',
    impactColor: 'text-emerald-400 bg-emerald-500/10 border-white/[0.08]',
    description: 'Jupiter enters Gemini, expanding intellectual breakthroughs, technological innovations, and global commercial trade.',
    prescribedRemedy: 'Chant Vishnu Sahasranama & donate yellow grains on Thursdays.'
  },
  {
    planet: 'Rahu & Ketu Axis',
    symbol: '☊ / ☋',
    fromSign: 'Pisces / Virgo',
    toSign: 'Aquarius / Leo',
    date: 'November 2026',
    impactLevel: 'Caution Needed',
    impactColor: 'text-cyan-400 bg-cyan-500/10 border-white/[0.08]',
    description: 'Karmic nodes shift into Aquarius/Leo axis, amplifying AI technological evolution and personal identity transformation.',
    prescribedRemedy: 'Recite Durga Saptashati & feed stray dogs on Saturdays.'
  }
];

export default function PlanetaryTransitRadar() {
  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-cyan-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" /> Planetary Transit Ingress Radar & Alert Engine
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            2026/2027 Planetary Ingress Telemetry & Astronomical Shift Countermeasures
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-white/[0.08] font-bold">
          Live Radar Sweep
        </span>
      </div>

      {/* RADAR SWEEP ANIMATION CONTAINER */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-[#0B1220] border border-white/10">
        {/* RADAR CIRCLE */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
          <div className="absolute inset-4 rounded-full border border-white/[0.08]" />
          <div className="absolute inset-8 rounded-full border border-cyan-500/40" />
          
          {/* ROTATING RADAR SWEEP LINE */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full origin-center flex items-center justify-center"
          >
            <div className="w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent ml-auto" />
          </motion.div>

          <Compass className="w-8 h-8 text-cyan-400" />
        </div>

        <div className="space-y-1 text-xs font-mono">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            2026 / 2027 REAL-TIME ASTRONOMICAL INGRESS RADAR
          </span>
          <h4 className="text-sm font-bold text-white">Upcoming Major Planetary Ingresses Detected</h4>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            The radar monitors major planetary sign ingresses (Saturn, Jupiter, Rahu/Ketu) and projects personalized remedy protocols prior to peak energetic impact.
          </p>
        </div>
      </div>

      {/* TRANSIT CARDS LIST */}
      <div className="space-y-4">
        {TRANSIT_ALERTS.map((tr, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3 hover:border-cyan-500/40 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400 font-bold">{tr.symbol}</span> {tr.planet} Ingress
                </h4>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  {tr.fromSign} ➔ {tr.toSign} ({tr.date})
                </span>
              </div>

              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border shrink-0 ${tr.impactColor}`}>
                {tr.impactLevel}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{tr.description}</p>

            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-white/[0.08] text-[11px] text-cyan-200 font-mono">
              <strong className="text-cyan-400">Prescribed Countermeasure & Remedy:</strong> {tr.prescribedRemedy}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
