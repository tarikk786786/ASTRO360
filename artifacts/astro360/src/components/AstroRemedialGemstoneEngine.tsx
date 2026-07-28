import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, Shield, Sparkles, Heart, Zap, RefreshCw, CheckCircle, Scale, AlertTriangle 
} from 'lucide-react';
import type { UserProfile } from '../types';

interface AstroRemedialGemstoneEngineProps {
  userProfile: UserProfile;
}

interface GemstoneRemedy {
  id: string;
  name: string;
  sanskritName: string;
  rulingPlanet: string;
  idealFinger: string;
  metal: string;
  auspiciousDay: string;
  mantra: string;
  primaryBenefit: string;
  compatibilityScore: number;
  colorGradient: string;
}

export default function AstroRemedialGemstoneEngine({ userProfile }: AstroRemedialGemstoneEngineProps) {
  const [activeTab, setActiveTab] = useState<'gemstones' | 'yantras' | 'mantras'>('gemstones');

  const dobDate = userProfile?.dob ? new Date(userProfile.dob) : new Date(1998, 5, 15);
  const day = dobDate.getDate() || 15;
  const month = dobDate.getMonth() + 1 || 6;

  // Compute primary gemstone recommendations based on user DOB / Zodiac
  const gemstones: GemstoneRemedy[] = [
    {
      id: 'blue-sapphire',
      name: 'Blue Sapphire (Neelam)',
      sanskritName: 'Shani Ratna',
      rulingPlanet: 'Saturn (Shani)',
      idealFinger: 'Middle finger of dominant hand',
      metal: 'Silver or Panchdhatu',
      auspiciousDay: 'Saturday morning during Hora of Saturn',
      mantra: 'Om Sham Shanaishcharaya Namah (108 times)',
      primaryBenefit: 'Stabilizes career friction, enhances deep focus, and mitigates Saturn transit delays.',
      compatibilityScore: 94,
      colorGradient: 'from-blue-600 via-indigo-700 to-slate-900',
    },
    {
      id: 'yellow-sapphire',
      name: 'Yellow Sapphire (Pukhraj)',
      sanskritName: 'Guru Ratna',
      rulingPlanet: 'Jupiter (Guru)',
      idealFinger: 'Index finger of dominant hand',
      metal: 'Yellow Gold or Brass',
      auspiciousDay: 'Thursday morning during Shukla Paksha',
      mantra: 'Om Gram Greem Groom Sah Gurave Namah',
      primaryBenefit: 'Expands spiritual wisdom, attracts wealth, and safeguards higher education & luck.',
      compatibilityScore: 96,
      colorGradient: 'from-amber-400 via-yellow-600 to-amber-900',
    },
    {
      id: 'emerald',
      name: 'Emerald (Panna)',
      sanskritName: 'Budha Ratna',
      rulingPlanet: 'Mercury (Budh)',
      idealFinger: 'Little finger of dominant hand',
      metal: 'Gold or Silver',
      auspiciousDay: 'Wednesday morning',
      mantra: 'Om Bram Breem Broom Sah Budhaya Namah',
      primaryBenefit: 'Amplifies analytical intellect, verbal eloquence, and business negotiation skills.',
      compatibilityScore: 91,
      colorGradient: 'from-emerald-500 via-teal-700 to-slate-900',
    },
  ];

  const yantras = [
    {
      name: 'Sri Yantra',
      purpose: 'Sacred geometric matrix for abundance, spiritual harmony, and cosmic alignment.',
      element: 'Gold-plated Copper',
      direction: 'East or North-East altar',
    },
    {
      name: 'Mahamrityunjaya Yantra',
      purpose: 'Shields against vitality drops, negative influences, and psychological stress.',
      element: 'Pure Silver Plate',
      direction: 'North orientation',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Shield className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-widest uppercase">Astrological Remedial Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">
            Astro Remedial & <span className="gradient-text">Gemstone Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Personalized planetary gemstones, sacred geometric Yantras, and Vedic Mantra remedies tailored to {userProfile?.name || 'Seeker'}'s natal birth positions.
          </p>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'gemstones', label: 'Planetary Gemstones (Ratna)' },
          { id: 'yantras', label: 'Sacred Yantras' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'glass-card text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gemstones View */}
      {activeTab === 'gemstones' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gemstones.map((gem) => (
            <div 
              key={gem.id}
              className="glass-card rounded-3xl p-6 border border-slate-800 space-y-5 flex flex-col justify-between hover:border-amber-500/30 transition-all"
            >
              <div className="space-y-4">
                <div className={`h-24 w-full rounded-2xl bg-gradient-to-br ${gem.colorGradient} flex items-center justify-center p-4 border border-white/10 shadow-inner`}>
                  <Sparkles className="w-8 h-8 text-white/80 animate-pulse" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">{gem.sanskritName}</span>
                  <h3 className="text-xl font-display font-bold text-slate-100">{gem.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Ruling: {gem.rulingPlanet}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                  <p><span className="font-semibold text-slate-400">Finger:</span> {gem.idealFinger}</p>
                  <p><span className="font-semibold text-slate-400">Metal:</span> {gem.metal}</p>
                  <p><span className="font-semibold text-slate-400">Activation Day:</span> {gem.auspiciousDay}</p>
                  <p className="p-2.5 rounded-xl bg-slate-900/90 font-mono text-[11px] text-amber-300 border border-slate-800">
                    {gem.mantra}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {gem.primaryBenefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Yantras View */}
      {activeTab === 'yantras' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {yantras.map((yantra, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-xl font-display font-bold text-amber-300">{yantra.name}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{yantra.purpose}</p>
              <div className="text-xs text-slate-400 space-y-1 font-mono pt-2 border-t border-slate-800">
                <p>Material: {yantra.element}</p>
                <p>Placement: {yantra.direction}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
