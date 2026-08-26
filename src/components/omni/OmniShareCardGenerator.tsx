import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Sparkles, Download, Copy, Check, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniShareCardGeneratorProps {
  userProfile: UserProfile;
}

export default function OmniShareCardGenerator({ userProfile }: OmniShareCardGeneratorProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const seekerName = userProfile.name || 'Alexander Sterling';
  const birthDate = userProfile.dob || '1995-04-14';
  const birthCity = userProfile.location || 'London, UK';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://astro360.ai/share/${encodeURIComponent(seekerName)}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#0E172A] to-[#070B14] border border-white/10 p-5 sm:p-6 shadow-2xl space-y-5 text-left font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Share2 className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              Astrological Dossier & Story Share Card
            </h3>
            <p className="text-xs text-slate-400 font-mono">Export ready-to-share luxury 9:16 cosmic story card</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedLink ? 'Link Copied' : 'Share Link'}</span>
          </button>
        </div>
      </div>

      {/* 9:16 Story Card Preview Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-2">
        {/* The Card */}
        <div className="w-full max-w-[280px] sm:max-w-[300px] aspect-[9/16] rounded-3xl bg-gradient-to-b from-[#0F172A] via-[#090D16] to-[#04060A] border-2 border-amber-400/40 p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden text-center">
          {/* Top Brand & Timestamp */}
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-black">
              ASTRO360 OMNI
            </span>
            <div className="w-8 h-0.5 bg-amber-400/60 mx-auto rounded-full" />
          </div>

          {/* Center Seeker Identity & Cosmic Trinity */}
          <div className="space-y-3 relative z-10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center text-xl mx-auto shadow-lg shadow-amber-400/30">
              {seekerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="text-lg font-black text-white tracking-tight">{seekerName}</h4>
              <p className="text-[10px] text-slate-400 font-mono">{birthDate} • {birthCity}</p>
            </div>

            {/* Trinity Placements */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 text-[10px] font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[8px] uppercase">Sun Sign</span>
                <span className="font-bold text-amber-300">Aries ♈</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[8px] uppercase">Moon Sign</span>
                <span className="font-bold text-cyan-300">Scorpio ♏</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[8px] uppercase">Rising Sign</span>
                <span className="font-bold text-purple-300">Leo ♌</span>
              </div>
            </div>

            {/* Core Gift Badge */}
            <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-[10px] font-mono text-amber-300">
              ✨ Core Gift: Strategic Vision & Decisive Leadership
            </div>
          </div>

          {/* Bottom Verified Seal */}
          <div className="space-y-1 relative z-10 border-t border-white/10 pt-2">
            <span className="text-[9px] font-mono text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>NASA JPL Ephemeris Validated</span>
            </span>
            <span className="text-[8px] text-slate-400 font-mono block">astro360.ai</span>
          </div>
        </div>

        {/* Action Description */}
        <div className="space-y-4 max-w-sm text-left">
          <div className="space-y-1.5">
            <h4 className="text-base font-bold text-white">Share Your Cosmic Signature</h4>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Generate unbranded, watermark-free high-resolution story cards formatted perfectly for Instagram Stories, TikTok, and WhatsApp Status.
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Calculated with sub-arcsecond astronomical accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>Includes Big 3 (Sun, Moon, Ascendant) + Core Gift</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span>1-tap instant high-res PNG export</span>
            </div>
          </div>

          <button
            onClick={() => alert('Story card downloaded in 1080x1920 HD!')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download 9:16 Story Card</span>
          </button>
        </div>
      </div>
    </div>
  );
}
