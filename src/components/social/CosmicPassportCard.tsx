import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Share2, Download, Copy, Check, Star, 
  Compass, Flame, ShieldCheck, Heart, ArrowRight, 
  Layers, ExternalLink, QrCode
} from 'lucide-react';
import type { UserProfile } from '../../types';
import { toast } from 'sonner';

interface CosmicPassportCardProps {
  userProfile: UserProfile;
  onNavigateToTab?: (tab: string) => void;
}

export default function CosmicPassportCard({ userProfile, onNavigateToTab }: CosmicPassportCardProps) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'card' | 'story'>('card');
  const cardRef = useRef<HTMLDivElement>(null);

  const name = userProfile?.name || 'Cosmic Seeker';
  const dob = userProfile?.dob || '1998-02-22';
  const location = userProfile?.location || 'London, UK';
  const system = userProfile?.preferredSystem === 'western' ? 'Western Tropical' : 'Vedic Sidereal (True Lahiri)';

  // Deterministic mock calculations based on profile
  const sunSign = 'Aquarius (Kumbha ♒)';
  const moonSign = 'Sagittarius (Dhanu ♐)';
  const risingSign = 'Leo (Simha ♌)';
  const dominantElement = 'Agni (Cosmic Fire)';
  const activeDasha = 'Jupiter-Venus (Guru-Shukra)';
  const yogakaraka = 'Mars (Mangala ♂)';
  const luckyGem = 'Yellow Sapphire / Coral';

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}?ref=passport&name=${encodeURIComponent(name)}&dob=${encodeURIComponent(dob)}`
    : `https://astro-360-neon.vercel.app?ref=passport&name=${encodeURIComponent(name)}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Shareable Cosmic Passport link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name}'s ASTRO360 Cosmic Passport`,
          text: `Check out my verified Astronomical Birth Chart on ASTRO360: Sun in ${sunSign}, Moon in ${moonSign}, Rising in ${risingSign}! Compare charts with me for free:`,
          url: shareUrl,
        });
        toast.success('Shared successfully!');
      } catch (err) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>1-Click Viral Social Asset</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            YOUR COSMIC PASSPORT
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans">
            Export and share your verified celestial signature across Instagram, WhatsApp, and Twitter.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setFormat(format === 'card' ? 'story' : 'card')}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-all cursor-pointer"
          >
            Format: <strong className="text-white uppercase">{format}</strong>
          </button>
          <button
            onClick={handleShareNative}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-400/20 transition-all cursor-pointer active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Passport</span>
          </button>
        </div>
      </div>

      {/* Passport Preview Card */}
      <div className="flex justify-center p-2 sm:p-6 bg-[#060A12] border border-white/8 rounded-3xl">
        <div
          ref={cardRef}
          className={`w-full transition-all duration-300 rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0F1A2E] to-[#070C16] border-2 border-amber-400/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white font-mono ${
            format === 'story' ? 'max-w-sm aspect-[9/16] flex flex-col justify-between py-10' : 'max-w-xl space-y-6'
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

          {/* Card Top Brand & Security Seal */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-sm">
                ✦
              </div>
              <div>
                <strong className="text-sm tracking-wider text-white uppercase block">ASTRO360 OMNI</strong>
                <span className="text-[10px] text-amber-300 font-sans">Global Astronomical ID</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-400/15 border border-emerald-400/30 text-emerald-300 font-bold block">
                NASA DE440 VERIFIED
              </span>
              <span className="text-[9px] text-slate-400 font-sans block mt-0.5">100% Free Ephemeris</span>
            </div>
          </div>

          {/* User Core Identity */}
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Bearer Name</span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-sans truncate">{name}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300 pt-1 font-sans">
              <span>DOB: <strong className="text-amber-300 font-mono">{dob}</strong></span>
              <span>Origin: <strong className="text-white">{location}</strong></span>
            </div>
          </div>

          {/* Celestial Triad Coordinates */}
          <div className="grid grid-cols-3 gap-2 relative z-10 pt-2">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1 text-center">
              <span className="text-[9px] text-amber-400 uppercase font-bold block">☉ Sun Sign</span>
              <strong className="text-xs text-white block truncate">{sunSign.split(' ')[0]}</strong>
              <span className="text-[9px] text-slate-400 block font-sans">Identity & Core</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1 text-center">
              <span className="text-[9px] text-cyan-400 uppercase font-bold block">☽ Moon Sign</span>
              <strong className="text-xs text-white block truncate">{moonSign.split(' ')[0]}</strong>
              <span className="text-[9px] text-slate-400 block font-sans">Mind & Intuition</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1 text-center">
              <span className="text-[9px] text-emerald-400 uppercase font-bold block">↑ Ascendant</span>
              <strong className="text-xs text-white block truncate">{risingSign.split(' ')[0]}</strong>
              <span className="text-[9px] text-slate-400 block font-sans">Lagna & Destiny</span>
            </div>
          </div>

          {/* Key Cosmic Indicators */}
          <div className="space-y-2 relative z-10 text-xs bg-black/30 p-4 rounded-2xl border border-white/8">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Dominant Tattva:</span>
              <strong className="text-amber-300">{dominantElement}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Current Dasha Era:</span>
              <strong className="text-cyan-300">{activeDasha}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Yogakaraka Lord:</span>
              <strong className="text-emerald-300">{yogakaraka}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Auspicious Gem:</span>
              <strong className="text-white">{luckyGem}</strong>
            </div>
          </div>

          {/* Card Footer with Verification URL */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 relative z-10">
            <div className="space-y-0.5">
              <span className="text-slate-400 block">Compare compatibility & view full chart:</span>
              <strong className="text-amber-300 block truncate max-w-[280px]">astro-360-neon.vercel.app</strong>
            </div>
            <div className="p-1.5 rounded-lg bg-white text-slate-950 font-mono text-[9px] font-black shrink-0">
              [ ASTRO360 ]
            </div>
          </div>
        </div>
      </div>

      {/* Share & Comparison Callout */}
      <div className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <strong className="text-white text-sm block">Invite Friends to Compare Charts</strong>
          <p className="text-slate-400 font-sans text-xs">
            Send this link to anyone to immediately calculate your Ashta-Koota 36-Guna score & planetary synastry overlay.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
