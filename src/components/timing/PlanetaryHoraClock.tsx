import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Sun, 
  Moon, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Calendar, 
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HoraInfo {
  index: number;
  hourNumber: number;
  planet: string;
  symbol: string;
  isDay: boolean;
  timeRange: string;
  color: string;
  suitableFor: string[];
  avoidFor: string[];
}

const CHALDEAN_ORDER = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon'];

const DAY_RULERS: Record<number, string> = {
  0: 'Sun',      // Sunday
  1: 'Moon',     // Monday
  2: 'Mars',     // Tuesday
  3: 'Mercury',  // Wednesday
  4: 'Jupiter',  // Thursday
  5: 'Venus',    // Friday
  6: 'Saturn',   // Saturday
};

const PLANET_ATTRIBUTES: Record<string, { symbol: string; color: string; suitable: string[]; avoid: string[] }> = {
  Sun: {
    symbol: '☉',
    color: '#F59E0B',
    suitable: ['Executive leadership & public decisions', 'Interacting with authorities / government', 'Starting medical treatments', 'Solar meditation & vitality rituals'],
    avoid: ['Submissive requests', 'Signing legal settlements against your interests', 'Starting minor low-value chores']
  },
  Venus: {
    symbol: '♀',
    color: '#EC4899',
    suitable: ['Romantic proposals & heartfelt conversations', 'Artistic design, fashion & styling', 'Jewelry, gemstone & luxury purchases', 'Social networking & celebrations'],
    avoid: ['Heated debates', 'Starting physical combat or litigation', 'Disciplining subordinates harshly']
  },
  Mercury: {
    symbol: '☿',
    color: '#10B981',
    suitable: ['Signing contracts & business agreements', 'Accounting, bookkeeping & coding', 'Publishing articles & marketing campaigns', 'Short commercial travels & negotiations'],
    avoid: ['Pure emotional confrontation', 'Purchasing immovable real estate', 'Spiritual detachment vows']
  },
  Moon: {
    symbol: '☽',
    color: '#06B6D4',
    suitable: ['Family meetings & domestic purchases', 'Culinary arts, hospitality & food ventures', 'Water therapies & emotional healing', 'Nurturing relationships'],
    avoid: ['Aggressive confrontations', 'Financial risk-taking', 'Starting surgery or high-risk physical feats']
  },
  Saturn: {
    symbol: '♄',
    color: '#64748B',
    suitable: ['Structural engineering & long-term plans', 'Real estate acquisition & land surveys', 'Deep spiritual austerity & meditation', 'Dealing with elderly advisors'],
    avoid: ['Quick speculative investments', 'Celebrations, parties & weddings', 'Taking swift emotional leaps']
  },
  Jupiter: {
    symbol: '♃',
    color: '#8B5CF6',
    suitable: ['Wealth management & investment planning', 'Higher education, exams & academic enrollments', 'Spiritual initiations & temple visits', 'Charity, wisdom sharing & counsel'],
    avoid: ['Narrow-minded arguments', 'Fraudulent schemes', 'Gambling or petty conflicts']
  },
  Mars: {
    symbol: '♂',
    color: '#EF4444',
    suitable: ['Intense workouts & athletic competition', 'Mechanical repairs, engineering & construction', 'Overcoming competitive adversaries', 'Decisive tactical executions'],
    avoid: ['Peace summits & marriage proposals', 'Delicate diplomatic negotiations', 'Starting peaceful relaxation retreats']
  }
};

export default function PlanetaryHoraClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const dayOfWeek = now.getDay();
  const dayRuler = DAY_RULERS[dayOfWeek] || 'Sun';

  // Calculate 24 Horas for today
  const horasList: HoraInfo[] = useMemo(() => {
    const firstPlanetIndex = CHALDEAN_ORDER.indexOf(dayRuler);
    const list: HoraInfo[] = [];

    // Approximate sunrise at 6:00 AM, sunset at 6:00 PM for standard 12-hour division
    for (let i = 0; i < 24; i++) {
      const planetIndex = (firstPlanetIndex + i) % 7;
      const planetName = CHALDEAN_ORDER[planetIndex];
      const attr = PLANET_ATTRIBUTES[planetName];
      const isDay = i < 12;

      const startHour = (6 + i) % 24;
      const endHour = (7 + i) % 24;
      const formatH = (h: number) => `${h < 10 ? '0' : ''}${h}:00`;

      list.push({
        index: i,
        hourNumber: i + 1,
        planet: planetName,
        symbol: attr.symbol,
        isDay,
        timeRange: `${formatH(startHour)} - ${formatH(endHour)}`,
        color: attr.color,
        suitableFor: attr.suitable,
        avoidFor: attr.avoid
      });
    }
    return list;
  }, [dayRuler]);

  // Determine current active hora
  const currentHour = now.getHours();
  // Hora index relative to 6:00 AM sunrise
  const currentHoraIndex = (currentHour - 6 + 24) % 24;
  const activeHora = horasList[currentHoraIndex] || horasList[0];

  // Minutes and seconds until next hora
  const minsToNext = 59 - now.getMinutes();
  const secsToNext = 59 - now.getSeconds();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border border-amber-500/30 relative overflow-hidden">
        
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>24-Hour Planetary Hora Precision Clock</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Planetary Horas & Auspicious Timing Oracle
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            The ancient Chaldean hourly planetary order governs specific vibrations throughout the 24-hour solar cycle. 
            Align your meetings, investments, creative work, and fitness with the ruling planetary governor.
          </p>
        </div>
      </div>

      {/* Active Hora Dial Card */}
      <div className="p-6 rounded-3xl bg-[#0B1220] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Active Hora Showcase */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#070D18] border border-white/5 text-center space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Current Planetary Governor</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
              ACTIVE NOW
            </span>
          </div>

          <div 
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl font-bold shadow-2xl transition-transform transform hover:scale-105"
            style={{ backgroundColor: `${activeHora.color}20`, color: activeHora.color, borderColor: `${activeHora.color}50`, borderWidth: '2px' }}
          >
            {activeHora.symbol}
          </div>

          <div>
            <h3 className="text-3xl font-black text-white">
              {activeHora.planet} <span className="text-sm font-normal text-slate-400 font-mono">Hora</span>
            </h3>
            <p className="text-xs font-mono text-cyan-400 mt-1">
              Time Span: {activeHora.timeRange}
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 w-full flex items-center justify-between text-xs font-mono text-slate-400 px-2">
            <span>Next Hora in:</span>
            <span className="text-amber-400 font-bold tabular-nums">
              {minsToNext}m {secsToNext < 10 ? '0' : ''}{secsToNext}s
            </span>
          </div>
        </div>

        {/* Suitable vs Avoid Activities */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-[#090E17] border border-white/10 space-y-2">
            <h4 className="text-xs font-bold font-mono uppercase text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Highly Auspicious For Right Now
            </h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {activeHora.suitableFor.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-[#090E17] border border-white/10 space-y-2">
            <h4 className="text-xs font-bold font-mono uppercase text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Activities to Postpone / Avoid
            </h4>
            <ul className="space-y-1 text-xs text-slate-300">
              {activeHora.avoidFor.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 24-Hour Interactive Timeline Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" /> Full 24-Hour Planetary Hora Timeline ({dayRuler} Day)
          </h3>
          <span className="text-xs font-mono text-slate-500">Chaldean Sequence</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {horasList.map((hora) => {
            const isCurrent = hora.index === activeHora.index;

            return (
              <motion.div
                key={hora.index}
                whileHover={{ scale: 1.02 }}
                className={`p-3.5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between space-y-2 ${
                  isCurrent
                    ? 'bg-[#0F1D33] border-amber-400 shadow-xl shadow-amber-500/20 ring-1 ring-amber-400'
                    : 'bg-[#090E17] hover:bg-[#0E1726] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span 
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: `${hora.color}20`, color: hora.color }}
                  >
                    {hora.symbol}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {hora.isDay ? '☀️ Day' : '🌙 Night'}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-white flex items-center justify-between">
                    <span>{hora.planet}</span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </h5>
                  <span className="text-[10px] font-mono text-slate-400 block">
                    {hora.timeRange}
                  </span>
                </div>

                <div className="pt-1.5 border-t border-white/5 text-[10px] text-slate-400 line-clamp-1">
                  {hora.suitableFor[0]}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
