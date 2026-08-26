import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, User, Calendar, Clock, MapPin, 
  ArrowRight, ShieldCheck, CheckCircle2, Compass, Layers
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniOnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
  initialPreset?: Partial<UserProfile>;
}

export default function OmniOnboardingWizard({ onComplete, initialPreset }: OmniOnboardingWizardProps) {
  const [name, setName] = useState(initialPreset?.name || '');
  const [dob, setDob] = useState(initialPreset?.dob || '1998-06-15');
  const [time, setTime] = useState(initialPreset?.time || '12:00');
  const [unknownTime, setUnknownTime] = useState(false);
  const [location, setLocation] = useState(initialPreset?.location || 'London, UK');
  const [preferredSystem, setPreferredSystem] = useState<'vedic' | 'western' | 'chinese'>('vedic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalProfile: UserProfile = {
      name: name.trim() || 'Seeker',
      dob: dob || '1998-06-15',
      time: unknownTime ? '12:00' : (time || '12:00'),
      location: location || 'London, UK',
      gender: 'universal',
      preferredSystem,
      careerGoal: 'Personal Growth & Mastery',
      relationshipStatus: 'Seeking Harmony',
      primaryLifeFocus: 'Cosmic Intelligence'
    };

    setTimeout(() => {
      onComplete(finalProfile);
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 text-left">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#070B14] border-2 border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white relative overflow-hidden"
      >
        {/* Subtle glow background */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="space-y-2 border-b border-white/10 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>One-Time Setup • 100% Free Forever</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Enter Details to Unlock Studio & Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Enter your birth details once to calculate your high-precision astronomical chart, timing dasha, and multi-tradition workspace. You will never be asked again.
          </p>
        </div>

        {/* 1-Step Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-bold block flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Name or Moniker</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alexander Sterling"
              className="w-full bg-[#060A12] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-sans"
            />
          </div>

          {/* Date & Time */}
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
                className="w-full bg-[#060A12] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
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
                  {unknownTime ? '✓ Unknown (12:00)' : 'Time Unknown?'}
                </button>
              </div>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={unknownTime}
                className={`w-full bg-[#060A12] border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-amber-400 ${unknownTime ? 'opacity-40 cursor-not-allowed' : ''}`}
              />
            </div>
          </div>

          {/* Place of Birth */}
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
              className="w-full bg-[#060A12] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-sans"
            />
          </div>

          {/* Primary Tradition Preference */}
          <div className="space-y-1.5 pt-1">
            <label className="text-slate-300 font-bold block flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary Astrology Tradition</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'vedic', label: 'Vedic Sidereal', desc: 'Lahiri DE440' },
                { id: 'western', label: 'Western Tropical', desc: 'Placidus Wheels' },
                { id: 'chinese', label: 'Chinese BaZi', desc: '4 Pillars & Qi' },
              ].map((sys) => (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => setPreferredSystem(sys.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    preferredSystem === sys.id
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-md'
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
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black text-sm font-mono flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                  <span>Calculating Ephemeris & Unlocking Studio...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>Unlock Studio & Enter ASTRO360 (100% Free)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Trust Footer */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Client-Encrypted & 100% Private
            </span>
            <span>Saved permanently to your browser</span>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
