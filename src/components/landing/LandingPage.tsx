import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { UserProfile } from '../../types';
import OmniLandingNavbar from './OmniLandingNavbar';
import LandingFooter from './LandingFooter';
import AnimatedStarfield from './AnimatedStarfield';

interface LandingPageProps {
  onStartOnboarding: (presetData?: Partial<UserProfile>) => void;
  onNavigateToTab: (tabId: string) => void;
  userProfile?: UserProfile;
}

const FEATURED_TOOLS = [
  { label: 'Birth chart', tab: 'birth-chart', note: 'Your sky at the moment you arrived' },
  { label: 'Free calculators', tab: 'free-tools', note: 'Nakshatra, rising sign, panchang' },
  { label: 'Compatibility', tab: 'compatibility', note: 'Two charts, one honest read' },
  { label: 'Life periods', tab: 'dasha', note: 'When themes shift and deepen' },
  { label: "Today's panchang", tab: 'panchanga', note: 'Tithi, nakshatra, quiet timing' },
];

const QUIET_MOMENTS = [
  {
    title: 'Ask without performance',
    body: 'Type a real question. The answer comes from your chart, not a script.',
  },
  {
    title: 'See the math',
    body: 'Every result shows its sources — dasha, transit, house — so you can follow along.',
  },
  {
    title: 'Stay on your device',
    body: 'Birth details stay in your browser. Nothing is sold or shared.',
  },
];

export default function LandingPage({
  onStartOnboarding,
  onNavigateToTab,
  userProfile,
}: LandingPageProps) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#0b0d12] text-[#e8e4dc] selection:bg-[#c9a227]/20 selection:text-[#e8d5a3] font-[family-name:var(--font-ui)] relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <AnimatedStarfield />
      </div>

      <div className="relative z-10 flex flex-col">
        <OmniLandingNavbar
          onStartOnboarding={onStartOnboarding}
          onNavigateToTab={onNavigateToTab}
          userProfile={userProfile}
        />

        {/* Brand-first full-bleed hero */}
        <section className="min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <p className="font-[family-name:var(--font-display)] text-[#c9a227] text-sm tracking-[0.2em] uppercase">
              ASTRO360
            </p>

            <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,12vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-[#f5f0e6]">
              ASTRO360
            </h1>

            <p className="text-lg sm:text-xl text-[#a8a29e] font-light leading-relaxed max-w-md mx-auto">
              A calm place to read your chart, ask honest questions, and understand the sky.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onStartOnboarding()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c9a227] hover:bg-[#d4b03a] text-[#0b0d12] font-medium text-[15px] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                Begin with your birth details
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigateToTab('free-tools')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#c9a227]/30 hover:border-[#c9a227]/50 text-[#e8d5a3] font-medium text-[15px] transition-colors cursor-pointer"
              >
                Browse free tools
              </button>
            </div>
          </motion.div>
        </section>

        {/* Today note */}
        <section className="px-6 sm:px-8 py-16 border-t border-white/[0.06]">
          <div className="max-w-xl mx-auto text-center space-y-3">
            <p className="text-xs tracking-[0.15em] uppercase text-[#c9a227]/80">
              {today}
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-[#f5f0e6] font-light italic">
              The sky is always moving. Your chart stays with you.
            </p>
            <p className="text-sm text-[#78716c] leading-relaxed">
              Set your birth time once. Return whenever you need clarity — on timing, relationships, or simply what today holds.
            </p>
          </div>
        </section>

        {/* Featured tools — list, not cards */}
        <section className="px-6 sm:px-8 py-16 border-t border-white/[0.06]">
          <div className="max-w-lg mx-auto">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[#e8d5a3] mb-8 text-center">
              Where people begin
            </h2>
            <ul className="divide-y divide-white/[0.06]">
              {FEATURED_TOOLS.map((tool) => (
                <li key={tool.tab}>
                  <button
                    onClick={() => onNavigateToTab(tool.tab)}
                    className="w-full py-5 flex items-baseline justify-between gap-4 text-left group cursor-pointer transition-colors"
                  >
                    <span className="font-[family-name:var(--font-display)] text-lg text-[#f5f0e6] group-hover:text-[#e8d5a3] transition-colors">
                      {tool.label}
                    </span>
                    <span className="text-xs text-[#78716c] hidden sm:inline shrink-0">
                      {tool.note}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#c9a227]/40 group-hover:text-[#c9a227] shrink-0 sm:hidden transition-colors" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Three quiet moments */}
        <section className="px-6 sm:px-8 py-20 border-t border-white/[0.06]">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
            {QUIET_MOMENTS.map((moment) => (
              <div key={moment.title} className="space-y-3 text-center sm:text-left">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[#e8d5a3]">
                  {moment.title}
                </h3>
                <p className="text-sm text-[#78716c] leading-relaxed">
                  {moment.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-6 sm:px-8 py-24 border-t border-white/[0.06] text-center">
          <div className="max-w-md mx-auto space-y-6">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[#f5f0e6] font-light">
              Ready when you are.
            </h2>
            <p className="text-sm text-[#78716c]">
              No account required. Your first chart takes about a minute.
            </p>
            <button
              onClick={() => onStartOnboarding()}
              className="px-8 py-3.5 rounded-full bg-[#c9a227] hover:bg-[#d4b03a] text-[#0b0d12] font-medium text-[15px] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              Begin
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        <LandingFooter onNavigateTab={onNavigateToTab} />
      </div>
    </div>
  );
}
