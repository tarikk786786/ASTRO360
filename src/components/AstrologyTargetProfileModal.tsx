import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Users, Heart, Baby, Building2, Compass, Calendar, Clock, MapPin, Sparkles, Check, X, Sliders, Globe } from 'lucide-react';
import { type UserProfile } from '../types';

export type AstrologyTargetType = 'self' | 'partner' | 'child' | 'business' | 'client';

export interface AstrologyTargetProfile {
  targetType: AstrologyTargetType;
  name: string;
  gender: 'male' | 'female' | 'universal';
  dob: string;
  time: string;
  location: string;
  preferredSystem: 'vedic' | 'western' | 'chinese' | 'islamic' | 'mayan' | 'scientific';
  predictionFocus: 'wealth' | 'love' | 'career' | 'health' | 'spiritual' | 'general';
}

interface AstrologyTargetProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: AstrologyTargetProfile) => void;
  currentProfile: UserProfile;
}

export default function AstrologyTargetProfileModal({
  isOpen,
  onClose,
  onSaveProfile,
  currentProfile
}: AstrologyTargetProfileModalProps) {

  const [targetType, setTargetType] = useState<AstrologyTargetType>('self');
  const [name, setName] = useState<string>(currentProfile.name || 'Tarik Islam');
  const [gender, setGender] = useState<'male' | 'female' | 'universal'>('universal');
  const [dob, setDob] = useState<string>(currentProfile.dob || '1998-06-15');
  const [time, setTime] = useState<string>(currentProfile.time || '12:00');
  const [location, setLocation] = useState<string>(currentProfile.location || 'Mecca, Saudi Arabia');
  const [preferredSystem, setPreferredSystem] = useState<'vedic' | 'western' | 'chinese' | 'islamic' | 'mayan' | 'scientific'>('vedic');
  const [predictionFocus, setPredictionFocus] = useState<'wealth' | 'love' | 'career' | 'health' | 'spiritual' | 'general'>('wealth');

  useEffect(() => {
    if (isOpen && currentProfile) {
      setName(currentProfile.name || 'Tarik Islam');
      setDob(currentProfile.dob || '1998-06-15');
      setTime(currentProfile.time || '12:00');
      setLocation(currentProfile.location || 'Mecca, Saudi Arabia');
    }
  }, [isOpen, currentProfile]);

  const handleSelectTargetType = (type: AstrologyTargetType) => {
    setTargetType(type);
    if (type === 'self') {
      setName(currentProfile.name || 'Tarik Islam');
    } else if (type === 'partner') {
      setName('Partner / Spouse');
    } else if (type === 'child') {
      setName('Child Chart');
    } else if (type === 'business') {
      setName('Business Enterprise');
    } else if (type === 'client') {
      setName('Client Reading');
    }
  };

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveProfile({
      targetType,
      name: name || 'Subject',
      gender,
      dob,
      time,
      location: location || 'Global',
      preferredSystem,
      predictionFocus
    });
    onClose();
  };

  const TARGET_OPTIONS: { type: AstrologyTargetType; title: string; desc: string; icon: React.ReactNode }[] = [
    { type: 'self', title: 'Myself (Personal Chart)', desc: 'Self birth chart, transits & life guidance', icon: <User className="w-5 h-5 text-[#2563EB]" /> },
    { type: 'partner', title: 'Partner / Spouse', desc: 'Love compatibility, marriage & synastry', icon: <Heart className="w-5 h-5 text-[#EC4899]" /> },
    { type: 'child', title: 'Child / Newborn', desc: 'Naming, education & health chart', icon: <Baby className="w-5 h-5 text-[#22C55E]" /> },
    { type: 'business', title: 'Business / Enterprise', desc: 'Commercial launch muhurta & prosperity', icon: <Building2 className="w-5 h-5 text-[#F59E0B]" /> },
    { type: 'client', title: 'Friend / Client', desc: 'Consultation & third-party horoscope', icon: <Users className="w-5 h-5 text-[#06B6D4]" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="max-w-2xl w-full rounded-3xl bg-[#111827] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl relative text-left my-8"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL HEADER */}
        <div className="space-y-1 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-[#06B6D4] text-xs font-mono font-semibold">
            <Sliders className="w-4 h-4 text-[#06B6D4]" />
            <span>Target Subject & Precision Calculation Controls</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">For Whom is this Astrology Reading?</h2>
          <p className="text-xs text-[#94A3B8]">
            Select target subject, birth details, calculation system, and prediction focus for 100% custom accuracy.
          </p>
        </div>

        {/* STEP 1: FOR WHOM SELECTOR */}
        <div className="space-y-3">
          <label className="text-xs font-mono font-semibold text-[#D4AF37] uppercase tracking-wider block">
            1. Select Target Subject ("For Whom")
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TARGET_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                onClick={() => handleSelectTargetType(opt.type)}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  targetType === opt.type
                    ? 'bg-[#1E293B] border-[#2563EB] ring-1 ring-[#2563EB]'
                    : 'bg-[#0B1220] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="p-2 rounded-xl bg-[#111827] border border-white/10 shrink-0">
                  {opt.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{opt.title}</h4>
                  <p className="text-[10px] text-[#94A3B8] line-clamp-1">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2: REQUIRED BIRTH DETAILS */}
        <div className="space-y-3">
          <label className="text-xs font-mono font-semibold text-[#2563EB] uppercase tracking-wider block">
            2. Required Birth & Time Details
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[11px] text-[#CBD5E1] block mb-1 font-medium">Subject Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tarik Islam"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#CBD5E1] block mb-1 font-medium">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#2563EB]"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="universal">Universal / Non-Binary</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-[#CBD5E1] block mb-1 font-medium">Date of Birth (YYYY-MM-DD)</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#CBD5E1] block mb-1 font-medium">Time of Birth (HH:MM)</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] text-[#CBD5E1] block mb-1 font-medium">Birth City & Country (GPS Coordinates)</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mecca, Saudi Arabia or London, UK"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: PREFERRED SYSTEM & PREDICTION FOCUS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono font-semibold text-[#06B6D4] uppercase tracking-wider block mb-2">
              Astrology System
            </label>
            <select
              value={preferredSystem}
              onChange={(e) => setPreferredSystem(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#2563EB] text-xs font-mono"
            >
              <option value="vedic">Vedic (Jyotish Sidereal)</option>
              <option value="western">Western (Tropical Placidus)</option>
              <option value="islamic">Islamic (28 Lunar Mansions)</option>
              <option value="chinese">Chinese (Zi Wei Dou Shu & BaZi)</option>
              <option value="mayan">Mesoamerican (Mayan Tzolkin)</option>
              <option value="scientific">Scientific Astronomy (NASA / JPL)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono font-semibold text-[#22C55E] uppercase tracking-wider block mb-2">
              Prediction Focus Area
            </label>
            <select
              value={predictionFocus}
              onChange={(e) => setPredictionFocus(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#2563EB] text-xs font-mono"
            >
              <option value="wealth">Wealth, Career & Business Growth</option>
              <option value="love">Love, Marriage & Relationship Harmony</option>
              <option value="health">Health, Energy & Vitality</option>
              <option value="spiritual">Spiritual Growth & Purpose (Moksha)</option>
              <option value="general">Comprehensive 2026 Overall Forecast</option>
            </select>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0B1220] hover:bg-[#1E293B] border border-white/10 text-[#94A3B8] hover:text-white font-mono text-xs cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Apply Reading Configuration</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
