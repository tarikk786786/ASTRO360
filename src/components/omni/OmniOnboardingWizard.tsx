import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, User, Calendar, Clock, MapPin, Heart, Briefcase, 
  DollarSign, Compass, ArrowRight, CheckCircle2, ShieldCheck, 
  ChevronRight, RefreshCw, Layers
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniOnboardingWizardProps {
  onComplete: (profile: UserProfile) => void;
  initialPreset?: Partial<UserProfile>;
}

export default function OmniOnboardingWizard({ onComplete, initialPreset }: OmniOnboardingWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState(initialPreset?.name || '');
  const [dob, setDob] = useState(initialPreset?.dob || '1998-06-15');
  const [time, setTime] = useState(initialPreset?.time || '12:00');
  const [unknownTime, setUnknownTime] = useState(false);
  const [location, setLocation] = useState(initialPreset?.location || 'London, United Kingdom');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Career', 'Love', 'Growth']);
  const [astrologyStyle, setAstrologyStyle] = useState<'compare' | 'vedic' | 'western' | 'chinese'>('compare');

  // Loading animation state after step 5
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcProgress, setCalcProgress] = useState(1);

  const toggleInterest = (interest: string) => {
    if (interest === 'Everything') {
      setSelectedInterests(['Career', 'Love', 'Money', 'Family', 'Growth']);
      return;
    }
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    setIsCalculating(true);
    let p = 1;
    const interval = setInterval(() => {
      p += 1;
      setCalcProgress(p);
      if (p >= 5) {
        clearInterval(interval);
        setTimeout(() => {
          setIsCalculating(false);
          const finalProfile: UserProfile = {
            name: name.trim() || 'Seeker',
            dob: dob || '1998-06-15',
            time: unknownTime ? '12:00' : (time || '12:00'),
            location: location || 'London, UK',
            gender: 'universal',
            preferredSystem: astrologyStyle === 'compare' ? 'vedic' : astrologyStyle,
            careerGoal: selectedInterests.join(', '),
            relationshipStatus: 'Seeking Alignment',
            primaryLifeFocus: 'Cosmic Intelligence'
          };
          onComplete(finalProfile);
        }, 600);
      }
    }, 450);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 text-left">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#0F172A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white relative overflow-hidden"
      >
        {/* Step Indicator */}
        {!isCalculating && (
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400">Step {step} of 5</span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s <= step ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Calculating Loading Transition */}
        {isCalculating ? (
          <div className="py-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Calculating Your Sky...</h3>
              <p className="text-xs text-slate-400 font-mono">Synthesizing High-Precision Ephemeris & Multi-Tradition Matrix</p>
            </div>

            <div className="space-y-2 text-xs font-mono text-left max-w-xs mx-auto pt-2">
              <div className={`flex items-center gap-2 ${calcProgress >= 1 ? 'text-emerald-400' : 'text-slate-600'}`}>
                <span>{calcProgress >= 1 ? '✓' : '○'}</span> Birth time & coordinates normalized
              </div>
              <div className={`flex items-center gap-2 ${calcProgress >= 2 ? 'text-emerald-400' : 'text-slate-600'}`}>
                <span>{calcProgress >= 2 ? '✓' : '○'}</span> DE440 Planetary positions calculated
              </div>
              <div className={`flex items-center gap-2 ${calcProgress >= 3 ? 'text-emerald-400' : 'text-slate-600'}`}>
                <span>{calcProgress >= 3 ? '✓' : '○'}</span> 12 Houses & Cusps determined
              </div>
              <div className={`flex items-center gap-2 ${calcProgress >= 4 ? 'text-emerald-400' : 'text-slate-600'}`}>
                <span>{calcProgress >= 4 ? '✓' : '●'}</span> Astrology systems synthesized
              </div>
              <div className={`flex items-center gap-2 ${calcProgress >= 5 ? 'text-emerald-400' : 'text-slate-600'}`}>
                <span>{calcProgress >= 5 ? '✓' : '○'}</span> Personal forecast ready
              </div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Step 1: Name */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">What should we call you?</h2>
                  <p className="text-xs text-slate-400">Enter your name or preferred moniker for personalized guidance.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400">Your Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tarik Islam"
                    className="w-full p-3.5 rounded-2xl bg-[#0B1220] border border-white/15 text-white font-medium focus:border-amber-400 focus:outline-none text-sm"
                    autoFocus
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!name.trim()}
                  className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">When were you born?</h2>
                  <p className="text-xs text-slate-400">Your birth date and time fix the exact celestial geometry.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full p-3 rounded-2xl bg-[#0B1220] border border-white/15 text-white text-xs font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400">Time of Birth</label>
                    <input
                      type="time"
                      disabled={unknownTime}
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-3 rounded-2xl bg-[#0B1220] border border-white/15 text-white text-xs font-mono focus:border-amber-400 focus:outline-none disabled:opacity-40"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={unknownTime}
                    onChange={(e) => setUnknownTime(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-400 bg-slate-900 border-white/20"
                  />
                  <span>I don't know my exact birth time (Approximate 12:00 Solar Noon)</span>
                </label>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-mono cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!dob}
                    className="flex-1 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Where were you born?</h2>
                  <p className="text-xs text-slate-400">Location determines your Ascendant and exact local sidereal time.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400">Birthplace City & Country</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. New York, USA or London, UK or Tokyo, Japan"
                    className="w-full p-3.5 rounded-2xl bg-[#0B1220] border border-white/15 text-white font-medium focus:border-amber-400 focus:outline-none text-sm"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-mono cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!location.trim()}
                    className="flex-1 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Interests */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">What are you most interested in?</h2>
                  <p className="text-xs text-slate-400">Select key life areas to prioritize your dashboard readings.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {['Love', 'Career', 'Money', 'Family', 'Growth', 'Everything'].map((item) => {
                    const isSelected = selectedInterests.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleInterest(item)}
                        className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/60 shadow-md'
                            : 'bg-white/5 text-slate-400 hover:text-white border-white/5'
                        }`}
                      >
                        {item === 'Love' && '❤️ '}
                        {item === 'Career' && '💼 '}
                        {item === 'Money' && '💰 '}
                        {item === 'Family' && '🏡 '}
                        {item === 'Growth' && '✨ '}
                        {item === 'Everything' && '🌟 '}
                        {item}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-mono cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="flex-1 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Astrology Style */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Choose your astrology style</h2>
                  <p className="text-xs text-slate-400">You can always adjust this in your settings later.</p>
                </div>

                <div className="space-y-2.5">
                  <label 
                    onClick={() => setAstrologyStyle('compare')}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      astrologyStyle === 'compare'
                        ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">Compare all systems</span>
                        <span className="text-[10px] font-mono bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">Synthesize Vedic, Western, KP & Chinese BaZi consensus</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      astrologyStyle === 'compare' ? 'border-amber-400 bg-amber-400' : 'border-slate-500'
                    }`}>
                      {astrologyStyle === 'compare' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                  </label>

                  <label 
                    onClick={() => setAstrologyStyle('vedic')}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      astrologyStyle === 'vedic'
                        ? 'bg-indigo-500/15 border-indigo-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-xs">Vedic (Jyotish)</span>
                      <p className="text-[11px] text-slate-400">Sidereal zodiac, Nakshatras & Vimshottari Dashas</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      astrologyStyle === 'vedic' ? 'border-indigo-400 bg-indigo-400' : 'border-slate-500'
                    }`}>
                      {astrologyStyle === 'vedic' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>

                  <label 
                    onClick={() => setAstrologyStyle('western')}
                    className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      astrologyStyle === 'western'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-xs">Western (Tropical)</span>
                      <p className="text-[11px] text-slate-400">Psychological archetypes, aspects & progressions</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      astrologyStyle === 'western' ? 'border-cyan-400 bg-cyan-400' : 'border-slate-500'
                    }`}>
                      {astrologyStyle === 'western' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setStep(4)}
                    className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-mono cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/25"
                  >
                    <Sparkles className="w-4 h-4" /> Generate My Astrology
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}
