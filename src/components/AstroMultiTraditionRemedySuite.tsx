import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Compass, ShieldCheck, Sun, Moon, Sparkles, Check, ChevronRight, BookOpen, Activity, Globe, Heart } from 'lucide-react';
import { MULTI_TRADITION_REMEDIES, type AstrologyTraditionType, type PlanetaryRemedyItem } from '../lib/remedyEngine';
import type { UserProfile } from '../types';

export default function AstroMultiTraditionRemedySuite({ userProfile }: { userProfile?: UserProfile }) {
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState<number>(0);
  
  const resolveInitialTradition = (): AstrologyTraditionType => {
    const sys = (userProfile?.preferredSystem || 'vedic').toLowerCase();
    if (sys.includes('islamic')) return 'islamic';
    if (sys.includes('chinese') || sys.includes('bazi')) return 'chinese';
    if (sys.includes('western') || sys.includes('hellenistic')) return 'western';
    if (sys.includes('mayan')) return 'mayan';
    return 'vedic';
  };

  const [activeTradition, setActiveTradition] = useState<AstrologyTraditionType>(resolveInitialTradition);

  useEffect(() => {
    setActiveTradition(resolveInitialTradition());
  }, [userProfile?.preferredSystem]);

  const currentRemedyItem: PlanetaryRemedyItem = MULTI_TRADITION_REMEDIES[selectedPlanetIndex] || MULTI_TRADITION_REMEDIES[0];

  const TRADITION_TABS: { id: AstrologyTraditionType; label: string; icon: string }[] = [
    { id: 'vedic', label: 'Vedic (Jyotish)', icon: '🕉️' },
    { id: 'western', label: 'Western (Hellenistic)', icon: '🔮' },
    { id: 'islamic', label: 'Islamic (Quranic & Nujum)', icon: '🌙' },
    { id: 'chinese', label: 'East Asian (Feng Shui & BaZi)', icon: '☯️' },
    { id: 'mayan', label: 'Mayan (Galactic Tzolkin)', icon: '🏛️' },
    { id: 'scientific', label: 'Scientific Astronomy', icon: '🔬' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/10 shadow-2xl space-y-6 text-left">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-mono font-semibold mb-1">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Exact Planetary Root-Cause & Remedy Engine</span>
          </div>
          <h2 className="text-xl font-bold text-[#F8FAFC]">Multi-Tradition Astrological Remedies</h2>
        </div>
        <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full border border-[#22C55E]/20">
          100% Verified Prescriptions
        </span>
      </div>

      {/* PLANET SELECTOR BAR */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {MULTI_TRADITION_REMEDIES.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPlanetIndex(idx)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              selectedPlanetIndex === idx
                ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-lg'
                : 'bg-[#0B1220] border-white/10 text-[#94A3B8] hover:text-white'
            }`}
          >
            <span>{p.symbol}</span>
            <span>{p.planet}</span>
          </button>
        ))}
      </div>

      {/* DIAGNOSTIC ROOT-CAUSE CARD */}
      <div className="p-5 rounded-2xl bg-[#0B1220] border border-[#2563EB]/30 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-[#06B6D4] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#06B6D4]" /> Root-Cause Analysis
          </span>
          <span className="text-xs font-bold text-white font-mono">{currentRemedyItem.planet}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-[#111827] border border-white/10 space-y-1">
            <span className="text-[10px] text-[#EF4444] font-mono font-semibold block">Identified Life Problem / Symptom:</span>
            <p className="text-[#CBD5E1] font-medium">{currentRemedyItem.problem}</p>
          </div>

          <div className="p-3 rounded-xl bg-[#111827] border border-white/10 space-y-1">
            <span className="text-[10px] text-[#F59E0B] font-mono font-semibold block">Astronomical Root Cause:</span>
            <p className="text-[#CBD5E1] font-medium">{currentRemedyItem.rootCause}</p>
          </div>
        </div>
      </div>

      {/* TRADITION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar border-b border-white/10 pb-3">
        {TRADITION_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTradition(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTradition === tab.id
                ? 'bg-[#1E293B] border border-[#2563EB] text-[#2563EB] shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ACTIVE TRADITION SPECIFIC REMEDY PRESCRIPTION */}
      <div className="p-5 rounded-2xl bg-[#0B1220] border border-white/10 space-y-4">
        
        {/* VEDIC REMEDIES */}
        {activeTradition === 'vedic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#F59E0B]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#F59E0B] block">💎 Prescribed Gemstone (Ratna):</span>
              <p className="text-white font-semibold">{currentRemedyItem.vedicRemedies.gemstone}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#7C3AED]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#7C3AED] block">🕉️ Sacred Mantra Recitation:</span>
              <p className="text-white font-semibold">{currentRemedyItem.vedicRemedies.mantra}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#06B6D4]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#06B6D4] block">🔯 Geometric Yantra Setup:</span>
              <p className="text-white font-semibold">{currentRemedyItem.vedicRemedies.yantra}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#22C55E]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#22C55E] block">🤲 Charitable Donation (Dana):</span>
              <p className="text-white font-semibold">{currentRemedyItem.vedicRemedies.charity}</p>
            </div>
          </div>
        )}

        {/* WESTERN REMEDIES */}
        {activeTradition === 'western' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#EC4899]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#EC4899] block">🔮 Crystal Alignment:</span>
              <p className="text-white font-semibold">{currentRemedyItem.westernRemedies.crystal}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#06B6D4]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#06B6D4] block">🌿 Herbal & Essential Oil:</span>
              <p className="text-white font-semibold">{currentRemedyItem.westernRemedies.herbalEssence}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#2563EB]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#2563EB] block">📜 Planetary Talisman Ritual:</span>
              <p className="text-white font-semibold">{currentRemedyItem.westernRemedies.talismanRitual}</p>
            </div>
          </div>
        )}

        {/* ISLAMIC REMEDIES */}
        {activeTradition === 'islamic' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#22C55E]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#22C55E] block">📖 Holy Qur'an Ayah Recitation:</span>
              <p className="text-white font-semibold">{currentRemedyItem.islamicRemedies.quranicAyah}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#D4AF37]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] block">✨ Asma ul-Husna Dhikr:</span>
              <p className="text-white font-semibold">{currentRemedyItem.islamicRemedies.asmaUlHusna}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#06B6D4]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#06B6D4] block">🤲 Prescribed Sadaqah Action:</span>
              <p className="text-white font-semibold">{currentRemedyItem.islamicRemedies.sadaqahAction}</p>
            </div>
          </div>
        )}

        {/* CHINESE BAZI REMEDIES */}
        {activeTradition === 'chinese' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#EF4444]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#EF4444] block">☯️ 5-Element Adjustment:</span>
              <p className="text-white font-semibold">{currentRemedyItem.chineseRemedies.fiveElement}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#F59E0B]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#F59E0B] block">🏡 Feng Shui Placement:</span>
              <p className="text-white font-semibold">{currentRemedyItem.chineseRemedies.fengShuiPlacement}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#7C3AED]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#7C3AED] block">🎨 Color Harmony:</span>
              <p className="text-white font-semibold">{currentRemedyItem.chineseRemedies.colorHarmony}</p>
            </div>
          </div>
        )}

        {/* MAYAN REMEDIES */}
        {activeTradition === 'mayan' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#EC4899]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#EC4899] block">🏛️ Galactic Tone Alignment:</span>
              <p className="text-white font-semibold">{currentRemedyItem.mayanRemedies.galacticTone}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#22C55E]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#22C55E] block">🦅 Spirit Animal Totem:</span>
              <p className="text-white font-semibold">{currentRemedyItem.mayanRemedies.spiritAnimal}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#D4AF37]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] block">🌿 Sacred Earth Offering:</span>
              <p className="text-white font-semibold">{currentRemedyItem.mayanRemedies.earthOffering}</p>
            </div>
          </div>
        )}

        {/* SCIENTIFIC REMEDIES */}
        {activeTradition === 'scientific' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#06B6D4]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#06B6D4] block">🔬 Circadian Light Exposure Window:</span>
              <p className="text-white font-semibold">{currentRemedyItem.scientificRemedies.circadianWindow}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#2563EB]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#2563EB] block">🛰️ Space Weather Mitigation:</span>
              <p className="text-white font-semibold">{currentRemedyItem.scientificRemedies.spaceWeatherMitigation}</p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
