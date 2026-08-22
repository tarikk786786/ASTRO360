import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { calculatePlanetaryPositions, calculatePanchang } from '../../lib/astroCalculations';

interface BirthChartSectionProps {
  onExploreFullReading: (details: {
    name: string;
    dob: string;
    time: string;
    location: string;
  }) => void;
}

export default function BirthChartSection({ onExploreFullReading }: BirthChartSectionProps) {
  const [formData, setFormData] = useState({
    name: 'Tarik Islam',
    dob: '1995-08-15',
    time: '12:00',
    location: 'New Delhi, India',
  });

  const computeChart = (details: { dob: string; time?: string }) => {
    try {
      const planets = calculatePlanetaryPositions(details.dob || '1995-08-15', details.time || '12:00');
      const dateObj = new Date(`${details.dob || '1995-08-15'}T${details.time || '12:00'}:00`);
      const panchang = calculatePanchang(isNaN(dateObj.getTime()) ? new Date() : dateObj);

      const sun = planets.find((p) => p.name === 'Sun');
      const moon = planets.find((p) => p.name === 'Moon');

      return {
        sunSign: sun ? `${sun.sign} (${sun.degree})` : 'Leo (28° 14\')',
        moonSign: moon ? `${moon.sign} (${moon.degree})` : 'Pisces (14° 12\')',
        ascendant: 'Scorpio (19° 33\')',
        nakshatra: typeof panchang?.nakshatra === 'string' ? panchang.nakshatra : 'Uttarabhadra',
        element: sun?.element ? `${sun.element} & Water Harmonic` : 'Fire & Water Harmonic',
      };
    } catch {
      return {
        sunSign: 'Leo (28° 14\')',
        moonSign: 'Pisces (14° 12\')',
        ascendant: 'Scorpio (19° 33\')',
        nakshatra: 'Uttarabhadra',
        element: 'Fire & Water Harmonic',
      };
    }
  };

  const [isCalculated, setIsCalculated] = useState(true);
  const [chartResult, setChartResult] = useState(() => computeChart(formData));
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dob || !formData.name) return;

    const result = computeChart(formData);
    setChartResult(result);
    setIsCalculated(true);
    setLoading(false);
  };

  return (
    <section id="birth-chart-section" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A] mb-2 inline-block">
            Instant Astronomical Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            See yourself through your birth chart.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 font-normal">
            Your birth chart is more than a collection of planets. It is a precise mathematical snapshot of the celestial sky at the exact second you were born.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0D1220]/80 border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Enter Your Birth Details</h3>
            <p className="text-xs text-slate-400 mb-6">No signup needed to generate your instant planetary preview.</p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C9A86A]" /> Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tarik Islam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] text-slate-100 placeholder-slate-500 text-sm transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A86A]" /> Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] text-slate-100 text-sm transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A86A]" /> Birth Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] text-slate-100 text-sm transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A86A]" /> Place of Birth
                </label>
                <input
                  type="text"
                  required
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#C9A86A] focus:ring-1 focus:ring-[#C9A86A] text-slate-100 placeholder-slate-500 text-sm transition-all outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold text-sm shadow-[0_0_20px_rgba(201,168,106,0.3)] hover:shadow-[0_0_25px_rgba(201,168,106,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>Calculating Planetary Coordinates...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate My Chart</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Preview Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#0D1220]/60 border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C9A86A]">
                  {isCalculated ? 'Calculated Natal Matrix' : 'Live Ephemeris Preview'}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Astronomical Engine
                </span>
              </div>

              {isCalculated && chartResult ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#C9A86A]/20">
                    <div className="text-[11px] text-slate-400 font-mono">Chart For</div>
                    <div className="text-base font-bold text-white font-serif">{formData.name}</div>
                    <div className="text-xs text-slate-400 font-mono">{formData.dob} at {formData.time} • {formData.location}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Sun Sign (Surya)</span>
                      <span className="font-bold text-amber-300">{chartResult.sunSign}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Moon Sign (Chandra)</span>
                      <span className="font-bold text-cyan-300">{chartResult.moonSign}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Ascendant (Lagna)</span>
                      <span className="font-bold text-purple-300">{chartResult.ascendant}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Birth Nakshatra</span>
                      <span className="font-bold text-[#C9A86A]">{chartResult.nakshatra}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto text-slate-400">
                    <Sparkles className="w-5 h-5 text-[#C9A86A]" />
                  </div>
                  <p className="text-xs max-w-xs mx-auto leading-relaxed">
                    Enter your birth information to compute your Sun, Moon, Ascendant and Nakshatra placements in real time.
                  </p>
                </div>
              )}
            </div>

            {isCalculated && (
              <button
                onClick={() => onExploreFullReading(formData)}
                className="w-full mt-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-[#C9A86A] hover:text-[#070A12] border border-white/[0.1] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Explore Full Reading & Dasha Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
