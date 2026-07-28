import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Calendar, Clock, MapPin, Globe2 } from 'lucide-react';
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
    gender: '',
    dob: '',
    time: '',
    location: '',
    preferredSystem: 'western',
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
    const date = new Date(profile.dob);
    if (!isNaN(date.getTime())) {
      zodiacInfo = getZodiacSign(date.getMonth() + 1, date.getDate());
    }
  }

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-950 overflow-hidden text-white font-sans selection:bg-indigo-500/30 starfield">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-lg p-6">
        <motion.div className="glass-card rounded-3xl p-8 sm:p-10 shadow-2xl glow-indigo border border-white/10" layout>
          <div className="mb-8 flex justify-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-500 ${
                  s === step ? 'w-8 bg-indigo-500' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-display font-semibold gradient-text">Welcome to AstroVerse</h2>
                  <p className="text-gray-400">Tell us how the stars should address you.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 transition-all"
                      placeholder="e.g. Luna"
                      value={profile.name}
                      onChange={(e) => handleInput('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Gender Identity</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white appearance-none"
                      value={profile.gender}
                      onChange={(e) => handleInput('gender', e.target.value)}
                    >
                      <option value="" disabled className="bg-gray-900">Select...</option>
                      <option value="female" className="bg-gray-900">Female</option>
                      <option value="male" className="bg-gray-900">Male</option>
                      <option value="nonbinary" className="bg-gray-900">Non-binary</option>
                      <option value="other" className="bg-gray-900">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-display font-semibold gradient-text">Cosmic Origin</h2>
                  <p className="text-gray-400">When did you arrive on Earth?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                      <Calendar className="w-4 h-4 mr-2" /> Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                      value={profile.dob}
                      onChange={(e) => handleInput('dob', e.target.value)}
                    />
                  </div>
                  
                  {zodiacInfo && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs text-indigo-300 uppercase tracking-wider">Your Sun Sign</p>
                        <p className="font-display text-xl font-medium">{zodiacInfo.sign}</p>
                      </div>
                      <span className="text-4xl filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                        {zodiacInfo.emoji}
                      </span>
                    </motion.div>
                  )}

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                      <Clock className="w-4 h-4 mr-2" /> Time of Birth
                    </label>
                    <input
                      type="time"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                      value={profile.time}
                      onChange={(e) => handleInput('time', e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-2">Required for accurate rising sign and houses.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-display font-semibold gradient-text">Grounding Point</h2>
                  <p className="text-gray-400">Where did your journey begin?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                      <MapPin className="w-4 h-4 mr-2" /> Place of Birth
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                      placeholder="City, Country"
                      value={profile.location}
                      onChange={(e) => handleInput('location', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
                      <Globe2 className="w-4 h-4 mr-2" /> Preferred System
                    </label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white appearance-none"
                      value={profile.preferredSystem}
                      onChange={(e) => handleInput('preferredSystem', e.target.value)}
                    >
                      <option value="western" className="bg-gray-900">Western (Tropical)</option>
                      <option value="vedic" className="bg-gray-900">Vedic (Jyotish)</option>
                      <option value="chinese" className="bg-gray-900">Chinese Astrology</option>
                      <option value="mayan" className="bg-gray-900">Mayan Dreamspell</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10">
            <button
              onClick={nextStep}
              disabled={step === 1 && !profile.name}
              className={`w-full py-4 rounded-xl font-medium flex items-center justify-center transition-all ${
                step === 3 
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:shadow-lg hover:shadow-indigo-500/25 text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed group`}
            >
              {step === 3 ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Begin Your Journey
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
