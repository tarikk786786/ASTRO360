import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Sun, Moon, Sparkles, Activity, ShieldCheck, Compass, CheckCircle2, AlertTriangle, Zap, HelpCircle } from 'lucide-react';
import type { UserProfile } from '../types';

interface TimeHorizonForecastSuiteProps {
  userProfile?: UserProfile;
}

type HorizonType = 'Today' | 'Week' | 'Month' | 'Year';

interface HorizonDetail {
  title: string;
  subtitle: string;
  conclusion: string;
  howAndWhy: string;
  solution: string;
  highlights: string[];
  remedies: {
    islamic: string;
    vedic: string;
    western: string;
    cbt: string;
  };
  keyDates: string[];
  badgeColor: string;
}

const HORIZON_DATA: Record<HorizonType, HorizonDetail> = {
  Today: {
    title: "Today's Daily Cosmic Forecast",
    subtitle: "Real-Time 24-Hour Transits & Solar Horas",
    conclusion: "Peak alignment for executive leadership, financial negotiations, and strategic decision-making. Morning hours offer maximum mental clarity.",
    howAndWhy: "Sun transit in Leo forms a favorable 5th/9th trine aspect with Jupiter in Gemini. Moon transiting through Shatabhisha Nakshatra (100 Healing Stars) enhances intuitive problem-solving.",
    solution: "Schedule critical business calls and investments between 11:48 AM - 12:36 PM (Golden Abhijit Muhurta). Avoid major contracts during 1:30 PM - 3:00 PM Rahu Kalam.",
    highlights: [
      "Abhijit Muhurta Peak: 11:48 AM - 12:36 PM",
      "Rahu Kalam Avoidance: 01:30 PM - 03:00 PM",
      "Exalted Mercury Speed: +0.98°/day",
      "Dominant Element: Earth & Solar Fire"
    ],
    remedies: {
      islamic: "Recite Ayatul Kursi after morning prayers & give morning water charity (Sadaqah).",
      vedic: "Offer morning water (Arghya) to Sun in copper vessel & chant Aditya Hrudayam.",
      western: "Focus creative energy on high-impact projects during solar peak hours.",
      cbt: "Practice 4-7-8 rhythmic breathing before key client presentations."
    },
    keyDates: ["08:00 AM Solar Hora", "11:48 AM Abhijit Window", "01:30 PM Rahu Kalam"],
    badgeColor: "text-amber-400 bg-amber-500/10 border-white/[0.08]"
  },

  Week: {
    title: "This Week's 7-Day Transit Forecast",
    subtitle: "Weekly Planetary Ingresses & Nakshatra Shifts",
    conclusion: "Accelerated momentum in financial trade, software engineering, and contract negotiations as Mercury turns direct in exalted Virgo.",
    howAndWhy: "Mercury ends retrograde motion on Aug 23 in its exaltation sign of Virgo (23°43'). This eliminates past communication delays and unlocks stalled financial projects.",
    solution: "Finalize pending contracts, execute software releases, and initiate high-value business deals mid-week. Re-evaluate joint assets before Friday.",
    highlights: [
      "Mercury Direct Shift in Virgo (Aug 23)",
      "Full Moon Supermoon Peak (Aug 28)",
      "Optimal Trade Window: Tuesday & Thursday",
      "Relationship Alignment: High Synergy"
    ],
    remedies: {
      islamic: "Recite Surah Al-Waqi'ah on Thursday evening for sustained financial barakah.",
      vedic: "Donate green mung beans on Wednesday morning & chant Vishnu Sahasranama.",
      western: "Consolidate business assets & audit contract fine print.",
      cbt: "Set 3 high-priority weekly goals and perform Friday progress audit."
    },
    keyDates: ["Aug 23: Mercury Direct", "Aug 26: Venus Aspect", "Aug 28: Supermoon"],
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-white/[0.08]"
  },

  Month: {
    title: "This Month's 30-Day Astrological Panorama",
    subtitle: "Monthly Solar Ingress & Planetary Dignities",
    conclusion: "Major career expansion and public recognition following Sun's ingress into Leo (Simha Sankranti) combined with Jupiter's 9th house aspect.",
    howAndWhy: "Sun enters its own sign of Leo (1st/10th Lord) creating Malavya & Raj Yoga dynamics. Transiting Rahu in Cancer encourages international expansion.",
    solution: "Launch marketing campaigns, seek corporate promotions, and invest in personal skill development. Maintain disciplined health routines.",
    highlights: [
      "Sun Ingress into Leo (Simha Sankranti)",
      "Jupiter 9th House Aspect on Career",
      "Saturn Retrograde Audit in Pisces",
      "Asset Growth Potential: High"
    ],
    remedies: {
      islamic: "Observe voluntary Sunnah fasting on 13th, 14th, 15th lunar days (Ayyam al-Beed).",
      vedic: "Wear Ruby or Red Coral in copper ring after morning consecration.",
      western: "Build strategic partnerships and expand international network.",
      cbt: "Conduct monthly financial & emotional resilience check-ins."
    },
    keyDates: ["Aug 17: Simha Sankranti", "Aug 28: Full Moon", "Sep 05: Jupiter Shift"],
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-white/[0.08]"
  },

  Year: {
    title: "This Year's 2026/2027 Annual Master Roadmap",
    subtitle: "12-Month Macro Transit Axis & Eclipse Windows",
    conclusion: "Transformative 18-month karmic shift as Rahu enters Cancer & Ketu enters Capricorn. Unlocks major global tech, real estate, and spiritual awakening.",
    howAndWhy: "Nodal shift on Nov 03, 2026 alters the global karmic axis. Combined with Annular Solar Eclipse (Sep 21, 2026) and Total Lunar Eclipse (Mar 03, 2027).",
    solution: "Align long-term 5-year investments with real estate & digital infrastructure. Engage in annual spiritual retreats & ancestral charity.",
    highlights: [
      "Rahu in Cancer / Ketu in Capricorn (Nov 03)",
      "Annular Solar Eclipse (Sep 21, 2026)",
      "Total Lunar Eclipse (Mar 03, 2027)",
      "Vimshottari Dasha Major Phase"
    ],
    remedies: {
      islamic: "Perform annual Zakat & sponsor water wells in needy communities.",
      vedic: "Perform Mahamrityunjaya Homa & feed stray animals on Saturdays.",
      western: "Diversify investment portfolio and structure long-term legacy assets.",
      cbt: "Draft annual vision blueprint with quarterly milestones."
    },
    keyDates: ["Sep 21, 2026: Solar Eclipse", "Nov 03, 2026: Nodal Shift", "Mar 03, 2027: Lunar Eclipse"],
    badgeColor: "text-purple-400 bg-purple-500/10 border-white/[0.08]"
  }
};

export default function TimeHorizonForecastSuite({ userProfile }: TimeHorizonForecastSuiteProps) {
  const [selectedHorizon, setSelectedHorizon] = useState<HorizonType>('Today');

  const current = HORIZON_DATA[selectedHorizon];

  return (
    <div className="p-6 rounded-3xl bg-[#111827] border border-white/[0.08] shadow-2xl space-y-6 text-left relative overflow-hidden">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" /> Time Horizon Deep Diagnostics Suite
          </h3>
          <p className="text-xs text-slate-400 font-mono pt-0.5">
            Forecast, Root Cause Analysis (How & Why) and Prescribed Remedies across Horizons
          </p>
        </div>

        {/* TIME HORIZON TOGGLE TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {(['Today', 'Week', 'Month', 'Year'] as HorizonType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedHorizon(tab)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedHorizon === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-white/[0.08] shadow-lg scale-105'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              {tab === 'Today' && '📅 Today'}
              {tab === 'Week' && '🗓️ This Week'}
              {tab === 'Month' && '🌙 This Month'}
              {tab === 'Year' && '☀️ This Year (2026/27)'}
            </button>
          ))}
        </div>
      </div>

      {/* HORIZON SUMMARY HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-[#111315]/80 border border-white/[0.08]">
        <div>
          <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${current.badgeColor}`}>
            {selectedHorizon.toUpperCase()} HORIZON FORECAST
          </span>
          <h4 className="text-base font-bold text-white mt-1.5">{current.title}</h4>
          <p className="text-xs font-mono text-cyan-400">{current.subtitle}</p>
        </div>

        {/* Key Dates Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {current.keyDates.map((kd, idx) => (
            <span key={idx} className="text-[10px] font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded-xl border border-white/[0.08]">
              ⏱️ {kd}
            </span>
          ))}
        </div>
      </div>

      {/* 4 HIGHLIGHTED TELEMETRY PANELS (CONCLUSION, HOW/WHY, SOLUTION, REMEDIES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PANEL 1: EXECUTIVE CONCLUSION (CYAN HIGHLIGHT) */}
        <div className="p-5 rounded-2xl bg-[#111315]/80 border border-white/[0.08] space-y-2 relative overflow-hidden shadow-lg group hover:border-cyan-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> 1. Executive Forecast & Conclusion
            </span>
            <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Primary Effect</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium bg-cyan-950/20 p-3 rounded-xl border border-white/[0.08]">
            {current.conclusion}
          </p>

          <div className="pt-2 border-t border-white/10 space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 block">Key Indicators:</span>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
              {current.highlights.map((h, i) => (
                <span key={i} className="text-slate-300 bg-white/5 p-1.5 rounded-lg border border-white/5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" /> {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 2: HOW & WHY (AMBER HIGHLIGHT) */}
        <div className="p-5 rounded-2xl bg-[#111315]/80 border border-white/[0.08] space-y-2 relative overflow-hidden shadow-lg group hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" /> 2. Astronomical How & Why (Root Cause)
            </span>
            <span className="text-[9px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Ephemeris Reason</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium bg-amber-950/20 p-3 rounded-xl border border-white/[0.08]">
            {current.howAndWhy}
          </p>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-white/[0.08] text-[10px] font-mono text-amber-300 space-y-1">
            <span className="font-bold block flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-amber-400" /> Karmic Mechanics:
            </span>
            <p className="text-slate-300 text-[10px]">
              Transits trigger latent natal house cusps, translating planetary longitudes into real-world event synchronization.
            </p>
          </div>
        </div>

        {/* PANEL 3: PRESCRIBED SOLUTION (EMERALD HIGHLIGHT) */}
        <div className="p-5 rounded-2xl bg-[#111315]/80 border border-white/[0.08] space-y-2 relative overflow-hidden shadow-lg group hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 3. Recommended Practical Solution
            </span>
            <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Action Step</span>
          </div>
          <p className="text-xs text-emerald-300 leading-relaxed font-semibold bg-emerald-950/30 p-3 rounded-xl border border-white/[0.08]">
            {current.solution}
          </p>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-white/[0.08] text-[10px] font-mono text-emerald-300 space-y-1">
            <span className="font-bold block flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" /> Optimal Execution Window:
            </span>
            <p className="text-slate-300 text-[10px]">
              Execute key deliverables during morning Abhijit hours & avoid lunar friction windows.
            </p>
          </div>
        </div>

        {/* PANEL 4: SACRED REMEDIES ACROSS TRADITIONS (PURPLE HIGHLIGHT) */}
        <div className="p-5 rounded-2xl bg-[#111315]/80 border border-white/[0.08] space-y-2.5 relative overflow-hidden shadow-lg group hover:border-purple-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" /> 4. Sacred Remedies Across Traditions
            </span>
            <span className="text-[9px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-white/[0.08]">Multi-Faith</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[10px]">
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-white/[0.08] text-emerald-300 space-y-0.5">
              <span className="font-bold block text-emerald-400">🕌 Islamic Tradition:</span>
              <p className="text-slate-300 text-[10px] leading-snug">{current.remedies.islamic}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-white/[0.08] text-amber-300 space-y-0.5">
              <span className="font-bold block text-amber-400">🕉️ Vedic Jyotish:</span>
              <p className="text-slate-300 text-[10px] leading-snug">{current.remedies.vedic}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-white/[0.08] text-cyan-300 space-y-0.5">
              <span className="font-bold block text-cyan-400">⭐ Western / Modern:</span>
              <p className="text-slate-300 text-[10px] leading-snug">{current.remedies.western}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-white/[0.08] text-purple-300 space-y-0.5">
              <span className="font-bold block text-purple-400">🧠 CBT & Mindfulness:</span>
              <p className="text-slate-300 text-[10px] leading-snug">{current.remedies.cbt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
