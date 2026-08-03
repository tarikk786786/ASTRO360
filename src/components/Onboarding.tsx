import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Calendar, Clock, MapPin, Globe2, Mail, Phone, Target, Heart, Compass } from 'lucide-react';
import type { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

function getZodiacSign(month: number, day: number): { sign: string; emoji: string } {
  if ((month===3&&day>=21)||(month===4&&day<=19)) return{sign:'Aries',emoji:'♈'};
  if ((month===4&&day>=20)||(month===5&&day<=20)) return{sign:'Taurus',emoji:'♉'};
  if ((month===5&&day>=21)||(month===6&&day<=20)) return{sign:'Gemini',emoji:'♊'};
  if ((month===6&&day>=21)||(month===7&&day<=22)) return{sign:'Cancer',emoji:'♋'};
  if ((month===7&&day>=23)||(month===8&&day<=22)) return{sign:'Leo',emoji:'♌'};
  if ((month===8&&day>=23)||(month===9&&day<=22)) return{sign:'Virgo',emoji:'♍'};
  if ((month===9&&day>=23)||(month===10&&day<=22)) return{sign:'Libra',emoji:'♎'};
  if ((month===10&&day>=23)||(month===11&&day<=21)) return{sign:'Scorpio',emoji:'♏'};
  if ((month===11&&day>=22)||(month===12&&day<=21)) return{sign:'Sagittarius',emoji:'♐'};
  if ((month===12&&day>=22)||(month===1&&day<=19)) return{sign:'Capricorn',emoji:'♑'};
  if ((month===1&&day>=20)||(month===2&&day<=18)) return{sign:'Aquarius',emoji:'♒'};
  return{sign:'Pisces',emoji:'♓'};
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    gender: 'universal',
    dob: '1998-06-15',
    time: '12:00',
    location: 'Global',
    preferredSystem: 'western',
    careerGoal: 'Business Growth & Prosperity',
    relationshipStatus: 'Seeking Harmony',
    primaryLifeFocus: 'Wealth, Purpose & Protection',
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(profile);
  };

  const handleInput = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  let zodiacInfo = null;
  if (profile.dob) {
    const parts = profile.dob.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      if (!isNaN(month) && !isNaN(day) && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        zodiacInfo = getZodiacSign(month, day);
      }
    } else {
      const date = new Date(profile.dob);
      if (!isNaN(date.getTime())) {
        zodiacInfo = getZodiacSign(date.getUTCMonth() + 1, date.getUTCDate());
      }
    }
  }

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-950 overflow-hidden text-white font-sans selection:bg-indigo-500/30 starfield py-10 px-4">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-xl">
        <motion.div className="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl glow-indigo border border-white/10" layout>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Complete Seeker Registration & Analysis Setup
            </div>
            <h2 className="text-3xl font-display font-bold gradient-text">AstroVerse Login</h2>
            <p className="text-sm text-slate-400 mt-1">Provide your complete profile to unlock exact calculations, remedies, and custom email warning alerts.</p>
          </div>

          {/* Progress Indicators */}
          <div className="mb-8 flex justify-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-500 ${
                  s === step ? 'w-10 bg-gradient-to-r from-amber-500 to-indigo-500' : 'w-3 bg-white/20'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: PERSONAL & CONTACT DATA */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="border-b border-white/10 pb-2 mb-4">
                  <h3 className="text-lg font-semibold text-amber-300 flex items-center gap-2">
                    👤 1. Identity & Alert Contact
                  </h3>
                  <p className="text-xs text-slate-400">Used to personalize readings and deliver warning alerts directly.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-slate-500 transition-all text-sm"
                    placeholder="e.g. Tarik Islam"
                    value={profile.name}
                    onChange={(e) => handleInput('name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    <Mail className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Alert Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-slate-500 transition-all text-sm"
                    placeholder="e.g. princetarikislam@gmail.com"
                    value={profile.email}
                    onChange={(e) => handleInput('email', e.target.value)}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">🚨 Emergency cosmic warning & remedy alerts will be sent here.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      <Phone className="w-3.5 h-3.5 mr-1.5 text-indigo-400" /> Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm"
                      placeholder="+91 9876543210"
                      value={profile.phone}
                      onChange={(e) => handleInput('phone', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      Gender Identity *
                    </label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm appearance-none"
                      value={profile.gender}
                      onChange={(e) => handleInput('gender', e.target.value)}
                    >
                      <option value="male" className="bg-slate-900">Male</option>
                      <option value="female" className="bg-slate-900">Female</option>
                      <option value="universal" className="bg-slate-900">Universal / Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: BIRTH DATA & ASTRONOMICAL PRECISION */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="border-b border-white/10 pb-2 mb-4">
                  <h3 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
                    🌌 2. Birth Chart & Astronomical Parameters
                  </h3>
                  <p className="text-xs text-slate-400">Generates exact D1-D60 charts, Lagna, and planetary degrees.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                      value={profile.dob}
                      onChange={(e) => handleInput('dob', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Time of Birth *
                    </label>
                    <input
                      type="time"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-sm"
                      value={profile.time}
                      onChange={(e) => handleInput('time', e.target.value)}
                    />
                  </div>
                </div>

                {zodiacInfo && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3.5 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[10px] text-indigo-300 uppercase tracking-wider">Calculated Sun Sign</p>
                      <p className="font-display text-lg font-bold text-white">{zodiacInfo.sign}</p>
                    </div>
                    <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                      {zodiacInfo.emoji}
                    </span>
                  </motion.div>
                )}

                <div>
                  <label className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> Place of Birth (City, Country) *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm"
                    placeholder="e.g. Mumbai, India / London, UK"
                    value={profile.location}
                    onChange={(e) => handleInput('location', e.target.value)}
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Calculates exact latitude, longitude, and timezone offset.</p>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BUSINESS, LIFE FOCUS & WISDOM SYSTEM */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="border-b border-white/10 pb-2 mb-4">
                  <h3 className="text-lg font-semibold text-emerald-300 flex items-center gap-2">
                    💼 3. Business Goals & Life Intentions
                  </h3>
                  <p className="text-xs text-slate-400">Customizes solution remedies and daily power hour focus areas.</p>
                </div>

                <div>
                  <label className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    <Target className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Primary Life & Business Goal
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white text-sm appearance-none"
                    value={profile.careerGoal}
                    onChange={(e) => handleInput('careerGoal', e.target.value)}
                  >
                    <option value="Business Growth & Prosperity" className="bg-slate-900">💼 Business Growth, Profits & Wealth</option>
                    <option value="Career Advancement & Promotion" className="bg-slate-900">📈 Career Advancement & Leadership</option>
                    <option value="Financial Stability & Debt Relief" className="bg-slate-900">💰 Financial Stability & Protection</option>
                    <option value="Spiritual Wisdom & Inner Peace" className="bg-slate-900">📿 Spiritual Wisdom & Protection</option>
                    <option value="Health & Energy Recovery" className="bg-slate-900">🌿 Health, Vitality & Recovery</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    <Heart className="w-3.5 h-3.5 mr-1.5 text-pink-400" /> Relationship & Family Intent
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white text-sm appearance-none"
                    value={profile.relationshipStatus}
                    onChange={(e) => handleInput('relationshipStatus', e.target.value)}
                  >
                    <option value="Seeking Harmony & Peace" className="bg-slate-900">❤️ Family Harmony & Peace</option>
                    <option value="Attracting True Partner" className="bg-slate-900">✨ Attracting Compatible Life Partner</option>
                    <option value="Strengthening Bond" className="bg-slate-900">💍 Marriage & Relationship Strength</option>
                    <option value="Focusing On Self Development" className="bg-slate-900">🌟 Self Development & Freedom</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    <Globe2 className="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> Preferred Wisdom System
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white text-sm appearance-none"
                    value={profile.preferredSystem}
                    onChange={(e) => handleInput('preferredSystem', e.target.value)}
                  >
                    <option value="western" className="bg-slate-900">Western (Tropical & Aspect Math)</option>
                    <option value="vedic" className="bg-slate-900">Vedic Jyotish (Parashari & Divisional)</option>
                    <option value="islamic" className="bg-slate-900">Islamic Astronomy (Ilm al-Nujum & Duas)</option>
                    <option value="chinese" className="bg-slate-900">Chinese Four Pillars (BaZi & Feng Shui)</option>
                    <option value="mayan" className="bg-slate-900">Mayan Dreamspell (Kin & Solar Seal)</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-3 rounded-xl font-medium text-xs text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                Back
              </button>
            )}

            <button
              type="button"
              onClick={nextStep}
              disabled={
                (step === 1 && (!profile.name?.trim() || !profile.email?.trim() || !profile.gender)) ||
                (step === 2 && (!profile.dob || !profile.time || !profile.location?.trim())) ||
                (step === 3 && (!profile.careerGoal || !profile.relationshipStatus || !profile.preferredSystem))
              }
              className={`flex-1 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center transition-all ${
                step === 3 
                  ? 'bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 hover:shadow-lg hover:shadow-amber-500/25 text-white' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-indigo-600 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg`}
            >
              {step === 3 ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Save Profile & Launch Master Engines
                </>
              ) : (
                <>
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default Onboarding;
