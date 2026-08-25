import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ShieldCheck, Flame, Moon, Compass, Sparkles, CheckCircle2, Info, ChevronRight, HelpCircle } from 'lucide-react';
import { calculatePlanetaryPositions, type PlanetPosition } from '../lib/astroCalculations';
import type { UserProfile } from '../types';

interface DoshaRemedyEngineProps {
  planetPositions?: PlanetPosition[];
  userProfile?: UserProfile;
}

export default function DoshaRemedyEngine({ planetPositions = [], userProfile }: DoshaRemedyEngineProps) {
  const [activeTab, setActiveTab] = useState<'sadesati' | 'kalsarp' | 'manglik'>('sadesati');

  const activePositions = useMemo(() => {
    if (planetPositions && planetPositions.length > 0) return planetPositions;
    return calculatePlanetaryPositions(
      userProfile?.dob || '1998-06-15',
      userProfile?.time || '12:00'
    );
  }, [planetPositions, userProfile]);

  // Sade Sati Calculation (Saturn in Pisces, Natal Moon sign)
  const sadeSatiData = useMemo(() => {
    const moonPlanet = activePositions.find(p => p.name === 'Moon');
    const moonSign = moonPlanet?.sign || 'Taurus';
    
    // Saturn currently in Pisces (330°)
    // Sade Sati affects Aquarius (Rising), Pisces (Peak), Aries (Setting)
    let isSadeSati = false;
    let phase = 'No Active Sade Sati';
    let impact = 'Low';
    let desc = 'Saturn is transiting outside your natal Moon 12th, 1st, and 2nd houses. High stability and smooth progress.';

    if (['Aquarius', 'Pisces', 'Aries'].includes(moonSign)) {
      isSadeSati = true;
      if (moonSign === 'Aquarius') {
        phase = 'Phase 1: Rising Sade Sati (12th House Transit)';
        impact = 'Moderate Friction';
        desc = 'Financial auditing, foreign opportunities, and mental restructuring. Time to eliminate wasteful expenditures.';
      } else if (moonSign === 'Pisces') {
        phase = 'Phase 2: Peak Sade Sati (1st House Janma Transit)';
        impact = 'High Transformation';
        desc = 'Deep personal re-invention, duty fulfillment, and endurance testing. Hard work yields long-term legacy rewards.';
      } else if (moonSign === 'Aries') {
        phase = 'Phase 3: Setting Sade Sati (2nd House Transit)';
        impact = 'Stabilizing Growth';
        desc = 'Re-establishing family resources, wealth accumulation, and consolidating new life foundations.';
      }
    }

    return { moonSign, isSadeSati, phase, impact, desc };
  }, [activePositions]);

  // Kalsarp Yoga Detection
  const kalsarpData = useMemo(() => {
    // Check if Rahu and Ketu hem all other planets
    const rahu = activePositions.find(p => p.name === 'Rahu');
    const ketu = activePositions.find(p => p.name === 'Ketu');

    let isKalsarp = false;
    let yogaName = 'No Kalsarp Yoga Detected';
    let remedy = 'All 7 Grahas are freely distributed across houses, creating natural Raj Yogas and balanced cosmic flow.';

    if (rahu && ketu) {
      const rDeg = rahu.degreeDecimal;
      const kDeg = ketu.degreeDecimal;

      // Count planets between Rahu and Ketu
      const otherPlanets = planetPositions.filter(p => p.name !== 'Rahu' && p.name !== 'Ketu');
      let countOne = 0;

      otherPlanets.forEach(p => {
        const deg = p.degreeDecimal;
        if (rDeg < kDeg) {
          if (deg >= rDeg && deg <= kDeg) countOne++;
        } else {
          if (deg >= rDeg || deg <= kDeg) countOne++;
        }
      });

      if (countOne === 0 || countOne === 7) {
        isKalsarp = true;
        yogaName = 'Anant Kalsarp Yoga (1st - 7th House Axis)';
        remedy = 'Perform Rahu-Ketu Shanti Puja, chant Mahamrityunjaya Mantra (108x daily), and donate black sesame seeds on Saturdays.';
      }
    }

    return { isKalsarp, yogaName, remedy };
  }, [planetPositions]);

  // Manglik Dosha (Kuja Dosha) Detection
  const manglikData = useMemo(() => {
    const mars = planetPositions.find(p => p.name === 'Mars');
    const marsHouse = mars?.houseNumber || 1;

    // Manglik houses: 1, 4, 7, 8, 12
    const isManglik = [1, 4, 7, 8, 12].includes(marsHouse);
    let intensity = 'Nil';
    let cancelReason = 'Mars placed in non-Kuja house.';

    if (isManglik) {
      intensity = marsHouse === 7 || marsHouse === 8 ? 'High (Purna Manglik)' : 'Moderate (Anshik Manglik)';
      cancelReason = `Mars in ${mars?.house || '1st House'}. High drive, passion, and executive leadership. Cancelled if partner has matching Mars placement.`;
    }

    return { isManglik, intensity, house: mars?.house || '1st House', cancelReason };
  }, [planetPositions]);

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-amber-500/40 shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" /> Kalsarp, Sade Sati & Manglik Dosha Remedy Engine
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Automated Planetary Dosha Diagnosis, Cancellation Rules & Multi-Religious Remedies
          </p>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('sadesati')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'sadesati' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            🪐 Sade Sati
          </button>
          <button
            onClick={() => setActiveTab('kalsarp')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'kalsarp' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            🐍 Kalsarp Yoga
          </button>
          <button
            onClick={() => setActiveTab('manglik')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'manglik' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔥 Kuja / Manglik
          </button>
        </div>
      </div>

      {/* SADE SATI TAB */}
      {activeTab === 'sadesati' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0B1220] border border-amber-500/30">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">Natal Moon Sign</span>
              <span className="text-base font-bold text-amber-300 font-mono">{sadeSatiData.moonSign} ☽</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">Sade Sati Diagnosis</span>
              <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full border ${
                sadeSatiData.isSadeSati ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {sadeSatiData.phase}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" /> Shani Transit Impact & Guidance:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{sadeSatiData.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[10px] font-mono">
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300">
                <span className="font-bold block">🕉️ Vedic Remedy:</span>
                <span>Chant Shanti Stotram on Saturdays & light mustard oil lamp at sunset.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                <span className="font-bold block">🕌 Islamic Remedy:</span>
                <span>Give Saturday Sadaqah & recite Surah Yaseen after Fajr prayers.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KALSARP TAB */}
      {activeTab === 'kalsarp' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#0B1220] border border-purple-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">Kalsarp Yoga Status</span>
              <span className="text-base font-bold text-purple-300 font-mono">{kalsarpData.yogaName}</span>
            </div>
            <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full border ${
              kalsarpData.isKalsarp ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}>
              {kalsarpData.isKalsarp ? 'Active Axis' : 'Clear / Unhemmed'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 text-xs text-slate-300">
            <span className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" /> Prescribed Neutralization Remedy:
            </span>
            <p className="leading-relaxed">{kalsarpData.remedy}</p>
          </div>
        </div>
      )}

      {/* MANGLIK TAB */}
      {activeTab === 'manglik' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#0B1220] border border-rose-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">Kuja / Manglik Status</span>
              <span className="text-base font-bold text-rose-300 font-mono">Mars in {manglikData.house}</span>
            </div>
            <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full border ${
              manglikData.isManglik ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}>
              {manglikData.intensity}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2 text-xs text-slate-300">
            <span className="font-mono font-bold text-rose-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-400" /> Cancellation & Executive Drive:
            </span>
            <p className="leading-relaxed">{manglikData.cancelReason}</p>
          </div>
        </div>
      )}
    </div>
  );
}
