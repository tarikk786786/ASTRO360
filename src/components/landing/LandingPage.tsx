import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Compass, 
  Calendar, Layers, Bot, Heart, Briefcase, DollarSign, Globe, 
  MapPin, Clock, Award, HelpCircle, BookOpen, Code2, Server, Cpu,
  ChevronRight, Terminal, User
} from 'lucide-react';
import { UserProfile } from '../../types';
import OmniLandingNavbar from './OmniLandingNavbar';
import OmniProductPreview from './OmniProductPreview';
import OmniWhyShowcase from './OmniWhyShowcase';
import OmniFAQSection from './OmniFAQSection';

interface LandingPageProps {
  onStartOnboarding: (presetData?: Partial<UserProfile>) => void;
  onNavigateToTab: (tabId: string) => void;
  userProfile?: UserProfile;
}

export default function LandingPage({
  onStartOnboarding,
  onNavigateToTab,
  userProfile,
}: LandingPageProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCreateChart = () => {
    onStartOnboarding({
      name: userProfile?.name || '',
      dob: userProfile?.dob || '1998-06-15',
      time: userProfile?.time || '12:00',
      location: userProfile?.location || 'London, UK'
    });
  };

  return (
    <div className="relative min-h-screen bg-[#070A12] text-slate-100 font-sans selection:bg-amber-400/30 selection:text-white">
      
      {/* 1. Announcement Bar & Sticky Header */}
      <OmniLandingNavbar
        onCreateChart={handleCreateChart}
        onExploreHowItWorks={() => scrollToSection('methodology-section')}
        onNavigateSection={scrollToSection}
        onOpenDashboard={() => onNavigateToTab('home')}
      />

      {/* 2. Hero Section (PRD Section 4 & 6) */}
      <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold tracking-wider uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              GLOBAL ASTROLOGY INTELLIGENCE
            </motion.div>

            {/* Headline (Enterprise PRD Section 7) */}
            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]"
            >
              A deeper way to understand <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                your astrology. Across traditions.
              </span>
            </motion.h1>

            {/* Supporting Copy (Enterprise PRD Section 7) */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Explore your chart, cycles, relationships, and important periods through multiple astrological traditions—brought together in one modern experience.
            </motion.p>

            {/* CTAs (Free Attraction PRD Section 2) */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1"
            >
              <button
                onClick={handleCreateChart}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-amber-400/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Create My Free Chart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigateToTab('free-tools')}
                className="px-6 py-3.5 rounded-2xl bg-[#0F172A] hover:bg-[#131F37] text-slate-300 hover:text-white border border-white/10 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Explore Free Tools</span>
              </button>
            </motion.div>

            {/* Micro-Trust Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-400 font-mono pt-1"
            >
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free to explore</span>
              <span>•</span>
              <span>No credit card required</span>
              <span>•</span>
              <span>Deterministic calculations</span>
            </motion.div>
          </div>

          {/* Right Column: Realistic ASTRO360 Product Preview (PRD Section 4) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="p-5 sm:p-7 rounded-3xl bg-[#0B1220] border border-white/15 shadow-2xl text-left space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  ASTRO360 TODAY
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Live Synthesis
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400">Today's strongest theme</span>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Personal Growth
                </h3>
                <p className="text-xs text-slate-300 leading-snug">Mental drive and strategic clarity are elevated today.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs font-mono pt-1">
                <div className="p-3 rounded-2xl bg-white/5 border border-pink-500/25 space-y-0.5">
                  <div className="text-pink-400 font-bold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> Love
                  </div>
                  <span className="text-white font-bold text-xs">Strong</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-cyan-500/25 space-y-0.5">
                  <div className="text-cyan-400 font-bold flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> Career
                  </div>
                  <span className="text-white font-bold text-xs">Elevated</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-emerald-500/25 space-y-0.5">
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> Money
                  </div>
                  <span className="text-white font-bold text-xs">Balanced</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-purple-500/25 space-y-0.5">
                  <div className="text-purple-400 font-bold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Travel
                  </div>
                  <span className="text-white font-bold text-xs">Active</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#080E1A] border border-amber-500/30 space-y-1 text-xs font-mono">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold text-white">Next: 💼 Career</span>
                  <span className="text-amber-400">Sep 12 – Oct 28</span>
                </div>
                <p className="text-[11px] text-slate-400">3 systems support this window.</p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2.5 Start Free — See the Difference (Free PRD Section 12 & 44) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-left space-y-8 border-y border-white/5 bg-[#050811]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Free Attraction Layer
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Start free. See the difference.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl">
              No subscription needed to discover your birth chart, lunar Nakshatra, daily Panchanga, and compatibility.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('free-tools')}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto shrink-0"
          >
            <span>Explore All Free Tools</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* 6 Free Tools Quick Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { title: "Free Birth Chart", desc: "Sun, Moon, Ascendant & Placements", tab: "free-tools" },
            { title: "Free Daily Insight", desc: "Today's strongest themes & focus", tab: "forecast" },
            { title: "Free 7-Day Forecast", desc: "Upcoming key timing windows", tab: "forecast" },
            { title: "Free Panchanga", desc: "Tithi, Nakshatra & Rahu Kalam", tab: "free-tools" },
            { title: "Free Nakshatra", desc: "Birth star & Pada calculator", tab: "free-tools" },
            { title: "Free Compatibility", desc: "Instant elemental harmony score", tab: "free-tools" },
          ].map((tool, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateToTab(tool.tab)}
              className="p-4 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer space-y-1.5 group shadow-sm"
            >
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">100% Free</span>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">{tool.title}</h3>
              <p className="text-[11px] text-slate-400 leading-tight">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Product Preview Section (4 Interactive Tabs) */}
      <OmniProductPreview onExplore={handleCreateChart} />

      {/* 4. Signature Brand Block (PRD Section 48 & 49) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center space-y-6">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculated first. Explained second.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            ASTRO360 separates astronomical computation from interpretive reasoning.
          </p>
        </div>

        {/* 4-Stage Horizontal Pipeline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left font-mono text-xs pt-2">
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
            <span className="text-amber-400 font-bold">01. Calculation</span>
            <p className="text-[11px] text-slate-400">JPL Ephemeris coordinates & house boundaries</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
            <span className="text-cyan-400 font-bold">02. Systems</span>
            <p className="text-[11px] text-slate-400">Vedic, Western, KP, and BaZi engines</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
            <span className="text-indigo-400 font-bold">03. Timing</span>
            <p className="text-[11px] text-slate-400">Dashas, planetary horas, and transits</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
            <span className="text-emerald-400 font-bold">04. Synthesis</span>
            <p className="text-[11px] text-slate-400">Explainable, human-readable intelligence</p>
          </div>
        </div>

        {/* 3 Foundation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-2">
          <div className="p-5 rounded-3xl bg-[#0B1220] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Astronomical Foundation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Planetary coordinates, timing, and house boundaries are computed through deterministic algorithms grounded in JPL DE440 ephemeris data.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0B1220] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Tradition-Aware</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vedic, Western, KP, Jaimini, Tajika, and Chinese systems remain distinct rather than being silently mixed into generic horoscopes.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0B1220] border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Explainable AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI translates and explains the calculated astronomical results and classical rules. It never invents fake planetary positions.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Multi-System Comparison Feature */}
      <section id="systems-section" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            CROSS-TRADITION CONSENSUS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            One question. Multiple traditions.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            ASTRO360 lets you compare what different traditions emphasize—and where they disagree.
          </p>
        </div>

        <div className="p-5 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/15 shadow-2xl space-y-6">
          {/* Mobile Stacked Cards (PRD Section 45) */}
          <div className="grid grid-cols-2 gap-2.5 sm:hidden font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Vedic (Jyotish)</span>
              <div className="font-bold text-emerald-400">Strong (88%)</div>
              <p className="text-[10px] text-slate-400">10th House Kendra</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Western Tropical</span>
              <div className="font-bold text-emerald-400">Strong (84%)</div>
              <p className="text-[10px] text-slate-400">Sun trine Midheaven</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-cyan-500/30 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">KP Astrology</span>
              <div className="font-bold text-cyan-400">Moderate (72%)</div>
              <p className="text-[10px] text-slate-400">10th Sub-Lord</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Chinese BaZi</span>
              <div className="font-bold text-emerald-400">Strong (85%)</div>
              <p className="text-[10px] text-slate-400">Yang Stem Support</p>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="py-2.5 px-3">Life Theme</th>
                  <th className="py-2.5 px-3">Vedic (Jyotish)</th>
                  <th className="py-2.5 px-3">Western Tropical</th>
                  <th className="py-2.5 px-3">KP Astrology</th>
                  <th className="py-2.5 px-3">Chinese BaZi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-bold text-white">💼 Career & Authority</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (88%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (84%)</td>
                  <td className="py-3 px-3 text-cyan-400 font-bold">Moderate (72%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (85%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">❤️ Love & Partnership</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (82%)</td>
                  <td className="py-3 px-3 text-cyan-400 font-bold">Moderate (68%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (80%)</td>
                  <td className="py-3 px-3 text-cyan-400 font-bold">Moderate (70%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">✨ Personal Evolution</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (90%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (89%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (86%)</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">Strong (92%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
              <span className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> What Traditions Agree On:
              </span>
              <p className="text-slate-300">
                Career drive, public leadership, and personal vitality are currently elevated across all calculation models.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-amber-500/30 space-y-1">
              <span className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Nuances & Variation:
              </span>
              <p className="text-slate-300">
                Vedic focuses on long-term karmic duty and disciplined structure, whereas Western emphasizes creative opportunity and autonomous expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "Why This Prediction?" Deep Dive */}
      <OmniWhyShowcase onExploreMethodology={() => scrollToSection('methodology-section')} />

      {/* 6.5 Interactive Birth Chart Showcase (PRD Section 6 & 7) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            START WITH YOUR CHART
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Your birth chart is the foundation for everything.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Every planetary position, house cusp, and aspect connects to explainable life themes. Tap a placement to inspect.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] border border-white/15 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Placements Selector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-mono font-bold text-white uppercase">Natal Chart Key Placements</span>
                <span className="text-xs font-mono text-emerald-400">JPL DE440</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="p-3 rounded-2xl bg-white/5 border border-amber-400/40 space-y-0.5">
                  <span className="text-[10px] text-amber-400 uppercase font-bold">Sun</span>
                  <div className="font-black text-white">Leo ♌</div>
                  <span className="text-[10px] text-slate-400">22°14'</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-cyan-400/40 space-y-0.5">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold">Moon</span>
                  <div className="font-black text-white">Taurus ♉</div>
                  <span className="text-[10px] text-slate-400">14°08'</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-indigo-400/40 space-y-0.5">
                  <span className="text-[10px] text-indigo-400 uppercase font-bold">Ascendant</span>
                  <div className="font-black text-white">Sagittarius ♐</div>
                  <span className="text-[10px] text-slate-400">08°45'</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>Selected Planet: <strong className="text-amber-400">♃ Jupiter (Guru)</strong></span>
                <span className="text-emerald-400 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded">Active Focus</span>
              </div>
            </div>

            {/* Right: Jupiter Tap Inspector (PRD Section 7) */}
            <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#0F172A] border border-amber-500/40 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-xs">
                    ♃
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Jupiter in Cancer ♋</h4>
                    <span className="text-[10px] font-mono text-slate-400">18°24' • 10th House (Midheaven)</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  Exalted Placement
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-white">Traditional Theme: </strong>
                Growth • Mentorship • Philosophical Wisdom • Executive Expansion. Positioned in the 10th Kendra house, it signals natural authority, ethical governance, and public recognition during major Jupiter-ruled Dasha and transit cycles.
              </p>

              <div className="flex items-center justify-between pt-1 font-mono text-xs">
                <button
                  onClick={() => onNavigateToTab('ask')}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask ASTRO360 about Jupiter</span>
                </button>
                <button
                  onClick={handleCreateChart}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore My Chart →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.6 Birth-Time Intelligence & Rectification (PRD Section 13) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            UNCERTAINTY TOLERANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What happens when your birth time is uncertain?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            ASTRO360 measures how sensitive every prediction is to time window drift so you never rely on fragile calculations.
          </p>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-[#0B1220] border border-white/15 shadow-xl space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">Test Window: 10:45 AM</span>
              <div className="text-emerald-400 font-bold">Stable (96%)</div>
              <span className="text-[10px] text-slate-400">Planetary Signs Solid</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">Test Window: 10:50 AM</span>
              <div className="text-emerald-400 font-bold">Stable (94%)</div>
              <span className="text-[10px] text-slate-400">Dasha Periods Intact</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-amber-500/30 space-y-1">
              <span className="text-slate-400 text-[10px]">Test Window: 10:55 AM</span>
              <div className="text-amber-400 font-bold">Moderate (78%)</div>
              <span className="text-[10px] text-slate-400">Sub-Lord Boundary Shifts</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-rose-500/30 space-y-1">
              <span className="text-slate-400 text-[10px]">Test Window: 11:00 AM</span>
              <div className="text-rose-400 font-bold">Sensitive (62%)</div>
              <span className="text-[10px] text-slate-400">Ascendant Cusp Transition</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
            <span>Deterministic sensitivity analysis tests ±15 minute drift across D1–D60 charts.</span>
            <button
              onClick={handleCreateChart}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer shrink-0"
            >
              Explore Birth-Time Rectification (BTR) →
            </button>
          </div>
        </div>
      </section>

      {/* 6.7 Life Timeline & Prediction Journal (PRD Section 14 & 15) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            PERSONAL RESEARCH JOURNAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            See your astrology alongside your real life.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Track what was forecasted against what actually happened. Turn astrology into your personal empirical record.
          </p>
        </div>

        <div className="p-6 sm:p-7 rounded-3xl bg-[#0B1220] border border-white/15 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">2019 • Education</span>
              <div className="font-bold text-white">Jupiter Dasha</div>
              <span className="text-[10px] text-emerald-400">✓ Strong Match</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">2021 • Career</span>
              <div className="font-bold text-white">Sun / Mars Kendra</div>
              <span className="text-[10px] text-emerald-400">✓ Strong Match</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">2023 • Relocation</span>
              <div className="font-bold text-white">4th House Transit</div>
              <span className="text-[10px] text-cyan-400">✓ Partial Match</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/10 space-y-1">
              <span className="text-slate-400 text-[10px]">2025 • Partnership</span>
              <div className="font-bold text-white">7th House Venus</div>
              <span className="text-[10px] text-emerald-400">✓ Strong Match</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0F172A] border border-amber-500/40 space-y-1">
              <span className="text-amber-400 text-[10px] font-bold">2027 • Forecast</span>
              <div className="font-bold text-white">Major Pivot</div>
              <span className="text-[10px] text-amber-400">Upcoming Cycle</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6.8 Accuracy & Validation: "Built to be Checked" (PRD Section 16) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center space-y-6">
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            EMPIRICAL RIGOR
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Built to be checked.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            We don't make claims like "99.9% accurate." We build verifiable systems you can inspect and reproduce.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-left font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Deterministic</span>
            <span className="text-[11px] text-slate-400">100% reproducible ephemeris math</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Multi-System</span>
            <span className="text-[11px] text-slate-400">Cross-verified against classical rules</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Versioned</span>
            <span className="text-[11px] text-slate-400">Timestamped calculation models</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Rule Provenance</span>
            <span className="text-[11px] text-slate-400">Cited classical scripture sources</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/30 space-y-1">
            <span className="text-emerald-400 font-bold block">✓ Open Schema</span>
            <span className="text-[11px] text-slate-400">Exportable Astro Schema JSON</span>
          </div>
        </div>
      </section>

      {/* 7. "What Can ASTRO360 Explore?" 8-Card Clean Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-left space-y-6">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What Can ASTRO360 Explore?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Focused, purposeful modules designed for real life areas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            { icon: Heart, title: "Love & Relationships", desc: "Synastry aspect overlays, Ashta Koota gunas & communication rhythm.", color: "text-pink-400" },
            { icon: Briefcase, title: "Career & Business", desc: "10th house activations, leadership timing & enterprise milestone windows.", color: "text-cyan-400" },
            { icon: Sparkles, title: "Personal Growth", desc: "Soul purpose, psychological archetypes & spiritual evolution milestones.", color: "text-amber-400" },
            { icon: DollarSign, title: "Financial Themes", desc: "Asset stability, investment cycles & resource consolidation timing.", color: "text-emerald-400" },
            { icon: Calendar, title: "Timing & Cycles", desc: "Vimshottari Dashas, transits, planetary horas & timing horizons.", color: "text-indigo-400" },
            { icon: MapPin, title: "Relocation & Power Lines", desc: "Astrocartography geographical line projections for global harmony.", color: "text-teal-400" },
            { icon: Clock, title: "Muhurta & Electional", desc: "Auspicious timing windows for launches, signings & ceremonies.", color: "text-purple-400" },
            { icon: Compass, title: "Birth Charts & Placements", desc: "High-precision D1–D60 vargas, tropical wheels & planetary degrees.", color: "text-rose-400" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                onClick={handleCreateChart}
                className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 hover:border-white/25 transition-all cursor-pointer space-y-2 group shadow-md"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Professional vs Everyone Capabilities */}
      <section id="professional-section" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            DUAL-AUDIENCE ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Built for serious astrology work.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            A simpler interface for everyone. A deeper workspace for professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For Everyone */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-amber-400 font-bold">FOR EVERYDAY SEEKERS</span>
              <h3 className="text-lg font-bold text-white">Effortless Personal Guidance</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>One-tap today's reading & key daily themes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Multi-month timeline without astrology jargon</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Natural-language AI assistant with "Why?" explanations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Beautiful, readable executive summary reports</span>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0B1220] border border-indigo-500/30 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-indigo-400 font-bold">FOR PROFESSIONAL ASTROLOGERS</span>
              <h3 className="text-lg font-bold text-white">Full Research & Precision Suite</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Exact ±0.0001° coordinates & 11 house systems</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Classical Tier 1/2 rule provenance (BPHS, Tetrabiblos)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Canonical Astro Schema JSON export & Developer MCP</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Birth Time Rectification (BTR) & D1–D60 vargas</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9. Methodology Section */}
      <section id="methodology-section" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-left space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            TRANSPARENT METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Transparent by design.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            AI explains the result. It doesn't make up the chart.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 space-y-2">
            <span className="text-2xl font-black text-amber-400 font-mono">01</span>
            <h3 className="text-sm font-bold text-white">Birth Data Normalization</h3>
            <p className="text-xs text-slate-400">
              Birth date, time, and coordinates are normalized into UTC, Julian Day, Delta T, and Local Sidereal Time.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 space-y-2">
            <span className="text-2xl font-black text-cyan-400 font-mono">02</span>
            <h3 className="text-sm font-bold text-white">Astronomical Calculation</h3>
            <p className="text-xs text-slate-400">
              Deterministic ephemeris computes true celestial longitudes, declinations, speeds, and house boundaries.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 space-y-2">
            <span className="text-2xl font-black text-indigo-400 font-mono">03</span>
            <h3 className="text-sm font-bold text-white">Tradition-Specific Rules</h3>
            <p className="text-xs text-slate-400">
              Vedic, Western, KP, and BaZi engines apply verified classical rules with cited evidence sources.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-[#0F172A] border border-white/10 space-y-2">
            <span className="text-2xl font-black text-emerald-400 font-mono">04</span>
            <h3 className="text-sm font-bold text-white">Explainable Synthesis</h3>
            <p className="text-xs text-slate-400">
              Cross-system consensus and calibrated confidence synthesize a clear, human-readable interpretation.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Security & Privacy (PRD Section 11 & 25) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-left">
        <div className="p-7 sm:p-8 rounded-3xl bg-[#0F172A] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Your personal data should remain yours.</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Birth information is used solely to calculate planetary coordinates and timing cycles. We do not sell user charts, train public AI models on your private data, or share personal profiles with third parties.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs text-slate-400">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-bold text-white block pb-0.5">Encrypted Local Cache</span>
              <span>Secure browser storage for instant return visits</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-bold text-white block pb-0.5">No Public URLs</span>
              <span>Birth coordinates never exposed in query params</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-bold text-white block pb-0.5">1-Tap Account Wipe</span>
              <span>Full control to purge profile and history at any time</span>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <OmniFAQSection />

      {/* 12. Final High-Impact CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#080E1A] border border-white/15 shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Start with your chart.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              Explore your astrology across traditions—with clear explanations and transparent calculations.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCreateChart}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-amber-400/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Create My Free Chart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToTab('free-tools')}
              className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Free Tools</span>
            </button>
          </div>
        </div>
      </section>

      {/* 13. Comprehensive Footer with Ethical Disclaimer */}
      <footer className="border-t border-white/10 bg-[#050810] py-12 text-left text-xs font-mono text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="font-bold text-white block">Product</span>
              <button onClick={() => scrollToSection('hero')} className="block hover:text-white cursor-pointer">Home</button>
              <button onClick={() => onNavigateToTab('forecast')} className="block hover:text-white cursor-pointer">Forecast</button>
              <button onClick={() => onNavigateToTab('charts')} className="block hover:text-white cursor-pointer">Birth Charts</button>
              <button onClick={() => onNavigateToTab('ask')} className="block hover:text-white cursor-pointer">Ask AI</button>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white block">Traditions</span>
              <button onClick={() => onNavigateToTab('divisional-charts')} className="block hover:text-white cursor-pointer">Vedic Jyotish</button>
              <button onClick={() => onNavigateToTab('charts')} className="block hover:text-white cursor-pointer">Western Tropical</button>
              <button onClick={() => onNavigateToTab('spiritual-traditions')} className="block hover:text-white cursor-pointer">Chinese BaZi</button>
              <button onClick={() => onNavigateToTab('islamic-astrology')} className="block hover:text-white cursor-pointer">Islamic Ilm al-Falak</button>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white block">Professional & Research</span>
              <button onClick={() => onNavigateToTab('omni-research')} className="block hover:text-white cursor-pointer">OMNI Research Core</button>
              <button onClick={() => onNavigateToTab('report-generator')} className="block hover:text-white cursor-pointer">PDF Dossier Generator</button>
              <button onClick={() => onNavigateToTab('btr-suite')} className="block hover:text-white cursor-pointer">Birth Time Rectification</button>
              <button onClick={() => onNavigateToTab('admin-dashboard')} className="block hover:text-white cursor-pointer">Admin Analytics</button>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white block">Governance</span>
              <button onClick={() => scrollToSection('faq-section')} className="block hover:text-white cursor-pointer">FAQ</button>
              <button onClick={() => scrollToSection('methodology-section')} className="block hover:text-white cursor-pointer">Methodology</button>
              <span className="block text-slate-500">Open-Source Engine</span>
              <span className="block text-slate-500">© 2026 ASTRO360</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-slate-400 leading-relaxed">
            <strong>Ethical & Scientific Disclaimer:</strong> ASTRO360 provides astronomical and astrological information for educational, personal reflection, and research purposes. Astrological interpretations are symbolic and are not deterministic predictions or substitutes for licensed professional medical, legal, or financial counsel.
          </div>
        </div>
      </footer>
    </div>
  );
}
