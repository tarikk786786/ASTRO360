import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, User, Calendar, Clock, MapPin, 
  ArrowRight, ShieldCheck, CheckCircle2, Compass, Layers,
  Briefcase, Heart, DollarSign, TrendingUp, Sun, Moon, X
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniOnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
  initialPreset?: Partial<UserProfile>;
  onClose?: () => void;
}

export default function OmniOnboardingWizard({ onComplete, initialPreset, onClose }: OmniOnboardingWizardProps) {
  const [name, setName] = useState(initialPreset?.name || '');
  const [dob, setDob] = useState(initialPreset?.dob || '1998-06-15');
  const [time, setTime] = useState(initialPreset?.time || '12:00');
  const [unknownTime, setUnknownTime] = useState(false);
  const [location, setLocation] = useState(initialPreset?.location || 'London, UK');
  const [primaryFocus, setPrimaryFocus] = useState<'career' | 'love' | 'money' | 'timing' | 'growth'>('career');
  const [preferredSystem, setPreferredSystem] = useState<'vedic' | 'western' | 'chinese' | 'universal'>('vedic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const popularCities = [
    'London, UK',
    'New York, USA',
    'Mumbai, India',
    'Toronto, Canada',
    'Sydney, Australia',
    'Tokyo, Japan'
  ];

  const focusOptions = [
    { id: 'career', label: 'Career & Purpose', icon: Briefcase, color: 'text-amber-400' },
    { id: 'love', label: 'Love & Relationship', icon: Heart, color: 'text-rose-400' },
    { id: 'money', label: 'Financial Timing', icon: DollarSign, color: 'text-emerald-400' },
    { id: 'timing', label: 'Transits & Timing', icon: Clock, color: 'text-cyan-400' },
    { id: 'growth', label: 'Inner Purpose & Growth', icon: TrendingUp, color: 'text-indigo-400' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalProfile: UserProfile = {
      name: name.trim() || 'Seeker',
      dob: dob || '1998-06-15',
      time: unknownTime ? '12:00' : (time || '12:00'),
      location: location || 'London, UK',
      gender: 'universal',
      preferredSystem: preferredSystem as any,
      careerGoal: primaryFocus === 'career' ? 'Leadership & Elevation' : 'Balanced Purpose',
      relationshipStatus: primaryFocus === 'love' ? 'Harmonious Partnership' : 'Reflective',
      primaryLifeFocus: primaryFocus.toUpperCase(),
    };

    try {
      onComplete(finalProfile);
    } catch (err) {
      console.error("Error completing onboarding profile:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl overflow-y-auto flex items-center justify-center p-4 sm:p-6 text-left">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#111315]/95 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-9 shadow-2xl shadow-black/90 space-y-6 text-white relative overflow-hidden my-auto"
      >
        {/* Close Button if onClose is provided */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="space-y-2 border-b border-white/[0.08] pb-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-white/[0.08] text-amber-300 text-[11px] font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Visitor Customization • 100% Free Forever</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Personalize Your ASTRO360 Experience
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Enter your details once to calculate your high-precision astronomical chart, timing dasha, and personalized intelligence dashboard.
          </p>
        </div>

        {/* 1-Step Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs relative z-10">
          
          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>How should we address you? (Name or Moniker)</span>
              </span>
              <span className="text-[10px] text-slate-500">Required</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alexander Sterling or Seeker"
              required
              className="w-full bg-[#060A12] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 font-sans shadow-inner"
            />
          </div>

          {/* 2. Date & Time of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Date of Birth</span>
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full bg-[#060A12] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 shadow-inner"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-bold block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Time of Birth</span>
                </label>
                <button
                  type="button"
                  onClick={() => setUnknownTime(!unknownTime)}
                  className="text-[10px] text-amber-400 hover:text-amber-300 cursor-pointer underline underline-offset-2"
                >
                  {unknownTime ? '✓ Set to Solar Noon (12:00)' : 'Exact Time Unknown?'}
                </button>
              </div>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={unknownTime}
                className={`w-full bg-[#060A12] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 shadow-inner ${unknownTime ? 'opacity-40 cursor-not-allowed' : ''}`}
              />
            </div>
          </div>

          {/* 3. Place of Birth with City Presets */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold block flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Place of Birth (City & Country)</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. London, United Kingdom or Mumbai, India"
              required
              className="w-full bg-[#060A12] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 font-sans shadow-inner"
            />
            {/* Quick city presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 self-center mr-1">Quick select:</span>
              {popularCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setLocation(city)}
                  className={`text-[10px] px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                    location === city
                      ? 'bg-amber-400/20 border-white/[0.12] text-amber-300 font-bold'
                      : 'bg-[#060A12] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Primary Life Focus Customization */}
          <div className="space-y-1.5 pt-1">
            <label className="text-slate-300 font-bold block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>What are you most curious to explore right now?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {focusOptions.map((f) => {
                const Icon = f.icon;
                const isSelected = primaryFocus === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setPrimaryFocus(f.id as any)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer min-h-[42px] ${
                      isSelected
                        ? 'bg-white text-black font-semibold shadow-sm border-amber-400 font-bold shadow-md'
                        : 'bg-[#060A12] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : f.color}`} />
                    <span className="text-[11px] leading-tight">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Primary Tradition Preference */}
          <div className="space-y-1.5 pt-1">
            <label className="text-slate-300 font-bold block flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary Astrology Tradition</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'vedic', label: 'Vedic Sidereal', desc: 'True Lahiri DE440' },
                { id: 'western', label: 'Western Tropical', desc: 'Placidus Wheels' },
                { id: 'universal', label: 'Universal Consensus', desc: 'Multi-System Synthesis' },
              ].map((sys) => (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => setPreferredSystem(sys.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer min-h-[44px] ${
                    preferredSystem === sys.id
                      ? 'bg-white text-black font-semibold shadow-sm border-amber-400 font-black shadow-md'
                      : 'bg-[#060A12] text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                  }`}
                >
                  <p className="text-xs font-bold leading-tight">{sys.label}</p>
                  <p className={`text-[9px] pt-0.5 ${preferredSystem === sys.id ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>{sys.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black text-sm font-mono flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50 min-h-[48px]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                  <span>Calculating Ephemeris & Customizing Experience...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>Save Profile & Enter ASTRO360 (100% Free)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Trust Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 pt-2 border-t border-white/10 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Client-Encrypted & Zero-PII Protected
            </span>
            <span>Saved locally to your browser</span>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
