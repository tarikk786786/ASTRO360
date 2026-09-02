import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Flame, Droplet, Wind, Sun, Gem, Copy, Check, 
  Volume2, ShieldCheck, Clock, Zap, Star, Moon, Globe
} from 'lucide-react';
import type { UserProfile } from '../../types';

interface OmniDailyVibeScoreProps {
  userProfile: UserProfile;
}

export default function OmniDailyVibeScore({ userProfile }: OmniDailyVibeScoreProps) {
  const [copiedMantra, setCopiedMantra] = useState(false);

  const seekerName = userProfile.name || 'Seeker';
  const currentTradition = (userProfile.preferredSystem || 'vedic').toLowerCase();

  const vibeData = useMemo(() => {
    if (currentTradition.includes('islamic')) {
      return {
        badge: 'Ilm al-Falak Timing',
        auraScore: '95% (Khayr al-Waqt)',
        colorName: 'Emerald Green',
        colorHex: '#10B981',
        colorDesc: 'Symbol of Barakah & Jannah',
        numbers: ['7', '19', '786'],
        numDesc: 'Sacred numerology resonance',
        hourName: 'Sa\'at al-Mushtari (Jupiter)',
        hourTime: '14:15 – 15:30',
        hourDesc: 'Expansion & Barakah window',
        stoneName: 'Aqiq (Carnelian)',
        stoneDesc: 'Prophetic Sunnah gemstone',
        mantraLabel: 'Daily Sacred Dhikr & Affirmation',
        mantra: 'Hasbunallahu wa Ni\'mal Wakeel — Allah alone is sufficient for us, and He is the best disposer of affairs.',
        copyBtnText: 'Copy Dhikr'
      };
    } else if (currentTradition.includes('chinese') || currentTradition.includes('bazi')) {
      return {
        badge: 'BaZi Qi Flow',
        auraScore: '93% (Sheng Qi Peak)',
        colorName: 'Vermilion & Gold',
        colorHex: '#EF4444',
        colorDesc: 'Fire & Earth generative harmony',
        numbers: ['6', '8', '9'],
        numDesc: 'Prosperity & enduring wealth',
        hourName: 'Chen Dragon Period',
        hourTime: '07:00 – 09:00',
        hourDesc: 'Supreme entrepreneurial energy',
        stoneName: 'Imperial Green Jade',
        stoneDesc: 'Nourishes Wood element & virtue',
        mantraLabel: 'Daily Heavenly Tao Affirmation',
        mantra: 'In harmony with Heaven and Earth, all Five Elements circulate smoothly toward prosperity and peace.',
        copyBtnText: 'Copy Affirmation'
      };
    } else if (currentTradition.includes('western') || currentTradition.includes('hellenistic')) {
      return {
        badge: 'Tropical Harmonics',
        auraScore: '91% (Sun-Jupiter Trine)',
        colorName: 'Sapphire Blue',
        colorHex: '#3B82F6',
        colorDesc: 'Solar-Jupiterian clarity',
        numbers: ['3', '9', '21'],
        numDesc: 'Trine & Decan aspect harmony',
        hourName: 'Solar Hour of Apollo',
        hourTime: '11:30 – 12:45',
        hourDesc: 'Executive leadership focus',
        stoneName: 'Lapis Lazuli',
        stoneDesc: 'Enhances third-eye intuition',
        mantraLabel: 'Hermetic Daily Principle',
        mantra: 'As above, so below; as within, so without. I align with the cosmic celestial order with unwavering purpose.',
        copyBtnText: 'Copy Affirmation'
      };
    } else if (currentTradition.includes('kp')) {
      return {
        badge: 'KP Stellar Index',
        auraScore: '94% (Sub-Lord Concordance)',
        colorName: 'Golden Topaz',
        colorHex: '#F59E0B',
        colorDesc: 'Signifies 1-9-11 houses',
        numbers: ['1', '5', '9'],
        numDesc: 'Dharmasthana cusps',
        hourName: 'Pushya Star Transit',
        hourTime: '13:00 – 14:15',
        hourDesc: 'Sub-Lord fruition window',
        stoneName: 'Yellow Sapphire',
        stoneDesc: 'Guru planetary significator',
        mantraLabel: 'KP Stellar Decisive Affirmation',
        mantra: 'Ruling planets align with precision today to remove hurdles and grant effortless completion to all noble endeavors.',
        copyBtnText: 'Copy Principle'
      };
    } else if (currentTradition.includes('jaimini')) {
      return {
        badge: 'Jaimini Sutras',
        auraScore: '95% (Atmakaraka Grace)',
        colorName: 'Deep Saffron',
        colorHex: '#F97316',
        colorDesc: 'Illuminates Karakamsha',
        numbers: ['4', '8', '12'],
        numDesc: 'Moksha & Dharma triad',
        hourName: 'Chara Dasha Zenith',
        hourTime: '10:00 – 11:30',
        hourDesc: 'Amatyakaraka prestige window',
        stoneName: 'Natural Pearl & Ruby',
        stoneDesc: 'Surya-Chandra balance',
        mantraLabel: 'Atma Shanti Sutra',
        mantra: 'Atma Shanti: May the divine light of the inner Atmakaraka dissolve all illusion and reveal pristine soul purpose.',
        copyBtnText: 'Copy Sutra'
      };
    } else {
      // Vedic Parashari
      return {
        badge: 'Shubha Graha Vibe',
        auraScore: '92/100 (Peak Vibe)',
        colorName: 'Imperial Gold',
        colorHex: '#D4AF37',
        colorDesc: 'Attracts solar clarity',
        numbers: ['3', '7', '12'],
        numDesc: 'Jupiter resonant harmonic',
        hourName: 'Abhijit & Guru Hora',
        hourTime: '14:20 – 15:35',
        hourDesc: 'Auspicious success window',
        stoneName: 'Yellow Sapphire (Pukhraj)',
        stoneDesc: 'Strengthens Guru blessing',
        mantraLabel: 'Daily Astrological Vedic Mantra',
        mantra: 'Om Som Somaya Namaha — May lunar clarity and harmonious vitality illuminate all decisions today.',
        copyBtnText: 'Copy Mantra'
      };
    }
  }, [currentTradition]);

  const handleCopyMantra = () => {
    navigator.clipboard.writeText(vibeData.mantra);
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-[#111315] border border-white/[0.08] p-5 sm:p-6 shadow-2xl space-y-5 text-left font-sans relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3.5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-white/[0.12] flex items-center justify-center text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              Daily Cosmic Alignment & Lucky Metrics
            </h3>
            <p className="text-xs text-slate-400 font-mono">Personalized for {seekerName} • {vibeData.badge}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-xl border border-emerald-500/20 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Aura Score: {vibeData.auraScore}</span>
        </div>
      </div>

      {/* 4 Lucky Attributes Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        {/* Lucky Color */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Auspicious Color</span>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: vibeData.colorHex, boxShadow: `0 0 8px ${vibeData.colorHex}` }} 
            />
            <span className="text-xs font-bold text-white font-mono truncate">{vibeData.colorName}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block truncate">{vibeData.colorDesc}</span>
        </div>

        {/* Lucky Numbers */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Lucky Numbers</span>
          <div className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1.5">
            {vibeData.numbers.map((num, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-black/40 border border-white/10">{num}</span>
            ))}
          </div>
          <span className="text-[10px] text-slate-400 font-mono block truncate">{vibeData.numDesc}</span>
        </div>

        {/* Auspicious Hora */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Golden Window</span>
          <div className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{vibeData.hourTime}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block truncate">{vibeData.hourName}</span>
        </div>

        {/* Sacred Gemstone */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Harmonic Stone</span>
          <div className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1">
            <Gem className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{vibeData.stoneName}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono block truncate">{vibeData.stoneDesc}</span>
        </div>
      </div>

      {/* Daily Affirmation / Mantra Strip */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400" /> {vibeData.mantraLabel}
          </span>
          <p className="text-xs text-slate-200 font-sans italic">
            "{vibeData.mantra}"
          </p>
        </div>

        <button
          onClick={handleCopyMantra}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer transition-colors"
        >
          {copiedMantra ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
          <span>{copiedMantra ? 'Copied!' : vibeData.copyBtnText}</span>
        </button>
      </div>
    </div>
  );
}
