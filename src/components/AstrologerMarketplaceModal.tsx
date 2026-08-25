import React, { useState } from 'react';
import { 
  X, Star, ShieldCheck, Phone, Video, MessageSquare, Clock, 
  Sparkles, CheckCircle2, Globe2, Award, Calendar, ChevronRight, 
  Zap, Lock, HelpCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VERIFIED_ASTROLOGERS, AstrologerProfile, calculateConsultationPayout } from '../lib/monetizationEngine';
import { UserProfile } from '../types';

interface AstrologerMarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
  onSelectAstrologerForBooking: (astrologer: AstrologerProfile, durationMinutes: number, priceInr: number) => void;
}

export default function AstrologerMarketplaceModal({
  isOpen,
  onClose,
  userProfile,
  onSelectAstrologerForBooking,
}: AstrologerMarketplaceModalProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedAstrologer, setSelectedAstrologer] = useState<AstrologerProfile>(VERIFIED_ASTROLOGERS[0]);
  const [selectedDuration, setSelectedDuration] = useState<15 | 30 | 60>(15);
  const [consultationType, setConsultationType] = useState<'video' | 'audio' | 'chat'>('video');

  if (!isOpen) return null;

  const specialties = ['all', 'Vedic Astrology', 'KP System', 'Nadi Astrology', 'Tarot Reading', 'Marriage Compatibility'];

  const filteredAstrologers = VERIFIED_ASTROLOGERS.filter((astro) => {
    if (selectedSpecialty === 'all') return true;
    return astro.specialization.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
  });

  const currentPrice = selectedDuration === 15 
    ? selectedAstrologer.price15Min 
    : selectedDuration === 30 
    ? selectedAstrologer.price30Min 
    : selectedAstrologer.price60Min;

  const payout = calculateConsultationPayout(currentPrice);

  const handleProceedToBooking = () => {
    onSelectAstrologerForBooking(selectedAstrologer, selectedDuration, currentPrice);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-5xl rounded-3xl bg-[#0D1220] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-4 text-slate-100"
      >
        {/* Header Ribbon */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-950/30 via-[#C9A86A]/20 to-[#0D1220] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A86A]/20 border border-[#C9A86A]/40 flex items-center justify-center text-[#C9A86A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-white flex items-center gap-2">
                ASTRO360 <span className="text-[#C9A86A] text-xs uppercase font-mono tracking-wider font-normal">Verified Astrologer Marketplace</span>
              </h2>
              <p className="text-xs text-slate-300">
                1-on-1 Private Consultations with Top Vedic Scholars & KP Masters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Specialty Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSpecialty === spec
                    ? 'bg-[#C9A86A] text-[#070A12] shadow-md'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 border border-white/[0.06]'
                }`}
              >
                {spec === 'all' ? '🌟 All Scholars' : spec}
              </button>
            ))}
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Astrologer Cards List */}
            <div className="lg:col-span-7 space-y-3 max-h-[480px] overflow-y-auto custom-scrollbar pr-1">
              {filteredAstrologers.map((astro) => {
                const isSelected = selectedAstrologer.id === astro.id;
                return (
                  <div
                    key={astro.id}
                    onClick={() => setSelectedAstrologer(astro)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${
                      isSelected
                        ? 'bg-[#070A12] border-[#C9A86A] ring-1 ring-[#C9A86A]/50 shadow-[0_0_20px_rgba(201,168,106,0.15)]'
                        : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative shrink-0">
                        <img
                          src={astro.photoUrl}
                          alt={astro.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-white/[0.1]"
                        />
                        {astro.isOnline && (
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0D1220]" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white font-serif">{astro.name}</h4>
                          {astro.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#C9A86A]">{astro.title}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" /> {astro.rating} ({astro.reviewCount})
                          </span>
                          <span>•</span>
                          <span>{astro.experienceYears} Yrs Exp</span>
                          <span>•</span>
                          <span className="text-slate-300">{astro.languages.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06] flex sm:flex-col justify-between items-center sm:items-end">
                      <span className="text-xs text-slate-400">From</span>
                      <div className="text-base font-bold font-serif text-[#C9A86A]">${astro.price15Min}</div>
                      <span className="text-[9px] font-mono text-emerald-400 font-semibold">15 Min Session</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Selected Astrologer Detail & Booking Terminal */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#070A12] border border-white/[0.08] space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src={selectedAstrologer.photoUrl}
                  alt={selectedAstrologer.name}
                  className="w-12 h-12 rounded-xl object-cover border border-white/[0.1]"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">{selectedAstrologer.name}</h4>
                  <p className="text-[11px] text-[#C9A86A]">{selectedAstrologer.title}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                "{selectedAstrologer.bio}"
              </p>

              {/* Consultation Type Selector */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  1. Choose Mode
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'video' as const, name: 'Video Call', icon: Video },
                    { id: 'audio' as const, name: 'Audio Call', icon: Phone },
                    { id: 'chat' as const, name: 'Live Chat', icon: MessageSquare },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setConsultationType(m.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        consultationType === m.id
                          ? 'bg-[#C9A86A] text-[#070A12] border-[#C9A86A]'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      <m.icon className="w-4 h-4" />
                      <span>{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selector */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  2. Choose Duration
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { min: 15 as const, price: selectedAstrologer.price15Min },
                    { min: 30 as const, price: selectedAstrologer.price30Min },
                    { min: 60 as const, price: selectedAstrologer.price60Min },
                  ].map((d) => (
                    <button
                      key={d.min}
                      onClick={() => setSelectedDuration(d.min)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedDuration === d.min
                          ? 'bg-white/[0.06] border-[#C9A86A] ring-1 ring-[#C9A86A]/50'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold text-white block">{d.min} Mins</span>
                      <span className="text-xs font-serif text-[#C9A86A] font-bold">${d.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown Summary */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Consultation Fee:</span>
                  <span className="text-white font-bold">${currentPrice}.00 USD</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[10px]">
                  <span>Astrologer Share (75%):</span>
                  <span>${payout.astrologerEarnings}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[10px]">
                  <span>Platform Secure Host (25%):</span>
                  <span>${payout.platformFee}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleProceedToBooking}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A86A] to-[#DFBF7A] text-[#070A12] font-bold text-xs shadow-[0_0_20px_rgba(201,168,106,0.35)] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Book Now for ${currentPrice} USD</span>
              </button>

              <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Privacy Guaranteed • Encrypted Session</span>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
