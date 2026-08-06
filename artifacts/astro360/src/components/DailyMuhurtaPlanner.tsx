import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Clock, Sun, Moon, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface TimeSlot {
  time: string;
  hour: number;
  periodName: string;
  quality: 'Auspicious' | 'Neutral' | 'Friction';
  horaPlanet: string;
  horaSymbol: string;
  recommendation: string;
  badgeColor: string;
}

export default function DailyMuhurtaPlanner() {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const currentHour = new Date().getHours();

  // Generate 16 Hourly Slots (06:00 AM to 10:00 PM)
  const timeSlots: TimeSlot[] = useMemo(() => {
    const horaPlanets = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'];
    const horaSymbols: Record<string, string> = {
      Sun: '☉', Venus: '♀', Mercury: '☿', Moon: '☽', Saturn: '♄', Jupiter: '♃', Mars: '♂'
    };

    const slots: TimeSlot[] = [];

    for (let h = 6; h <= 21; h++) {
      const isAM = h < 12;
      const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const timeStr = `${displayHour.toString().padStart(2, '0')}:00 ${isAM ? 'AM' : 'PM'}`;
      
      const planet = horaPlanets[h % 7];
      const symbol = horaSymbols[planet] || '☉';

      let quality: TimeSlot['quality'] = 'Neutral';
      let periodName = `${planet} Hora`;
      let recommendation = 'Execute standard daily tasks, communications, and routine operations.';
      let badgeColor = 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30';

      if (h === 6) {
        quality = 'Auspicious';
        periodName = 'Brahma Muhurta / Morning Adhkar';
        recommendation = 'Ideal for morning prayer, meditation, mantra recitation, and setting daily intentions.';
        badgeColor = 'text-amber-300 bg-amber-500/10 border-amber-500/30';
      } else if (h === 12) {
        quality = 'Auspicious';
        periodName = 'Abhijit Muhurta (Golden Window)';
        recommendation = 'Peak auspicious window for major launches, contracts, business deals, and financial investments.';
        badgeColor = 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
      } else if (h === 16 || h === 17) {
        quality = 'Friction';
        periodName = 'Rahu Kalam (Friction Period)';
        recommendation = 'Avoid starting new speculative gambles or sign high-risk legal agreements. Focus on review.';
        badgeColor = 'text-rose-300 bg-rose-500/10 border-rose-500/30';
      } else if (['Sun', 'Jupiter', 'Venus'].includes(planet)) {
        quality = 'Auspicious';
        recommendation = `Favorable for ${planet === 'Sun' ? 'leadership & strategy' : planet === 'Jupiter' ? 'finance & wisdom' : 'creative arts & diplomacy'}.`;
        badgeColor = 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30';
      }

      slots.push({
        time: timeStr,
        hour: h,
        periodName,
        quality,
        horaPlanet: planet,
        horaSymbol: symbol,
        recommendation,
        badgeColor
      });
    }

    return slots;
  }, []);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-4 text-left relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#06B6D4]" /> Daily Muhurta & Hourly Hora Schedule
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Auspicious Windows (Abhijit, Brahma Muhurta) vs Friction Periods (Rahu Kalam)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Hora Sync
          </span>
        </div>
      </div>

      {/* Hourly Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {timeSlots.map((slot) => {
          const isCurrent = slot.hour === currentHour;

          return (
            <motion.button
              key={slot.hour}
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => setSelectedSlot(slot)}
              className={`p-3 rounded-2xl border text-left space-y-1 transition-all cursor-pointer relative overflow-hidden ${
                isCurrent
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                  : 'bg-[#0B1220] border-white/10 hover:border-white/20'
              }`}
            >
              {isCurrent && (
                <span className="absolute top-1 right-1 text-[8px] font-mono font-bold text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-500/40">
                  NOW
                </span>
              )}

              <span className="text-[10px] font-mono font-bold text-slate-400 block">{slot.time}</span>
              
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-cyan-400">{slot.horaSymbol}</span>
                <span className="text-xs font-bold text-white truncate">{slot.horaPlanet}</span>
              </div>

              <span className={`text-[9px] font-mono font-bold block truncate ${slot.badgeColor.split(' ')[0]}`}>
                {slot.quality}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Slot Detailed Panel */}
      {selectedSlot && (
        <div className="p-4 rounded-2xl bg-[#0B1220] border border-cyan-500/40 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-cyan-400">{selectedSlot.horaSymbol}</span>
              <div>
                <h4 className="font-bold text-white font-mono">{selectedSlot.time} — {selectedSlot.periodName}</h4>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${selectedSlot.badgeColor}`}>
                  {selectedSlot.quality} Window
                </span>
              </div>
            </div>
            <button onClick={() => setSelectedSlot(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <p className="text-slate-300 leading-relaxed text-[11px]">
            <strong className="text-cyan-300">Recommended Focus:</strong> {selectedSlot.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}
