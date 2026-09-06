import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { UserProfile } from '../../types';
import OmniLandingNavbar from './OmniLandingNavbar';
import LandingFooter from './LandingFooter';
import AnimatedStarfield from './AnimatedStarfield';

interface LandingPageProps {
  onStartOnboarding: (presetData?: Partial<UserProfile>) => void;
  onNavigateToTab: (tabId: string) => void;
  userProfile?: UserProfile;
}

const FEATURED = [
  {
    title: 'Birth chart',
    note: 'Your sky at the moment you arrived — mapped with care.',
    tab: 'birth-chart',
  },
  {
    title: 'Free tools',
    note: 'Nakshatra, rising sign, panchang — open what you need.',
    tab: 'free-tools',
  },
  {
    title: 'Compatibility',
    note: 'Two charts, one honest conversation.',
    tab: 'compatibility',
  },
  {
    title: 'Life periods',
    note: 'When themes deepen, shift, and ask something of you.',
    tab: 'dasha',
  },
] as const;

const MOMENTS = [
  {
    title: 'Ask plainly',
    body: 'Bring a real question. The answer comes from your chart — not a script.',
  },
  {
    title: 'See the why',
    body: 'Results show their sources: dasha, transit, house — so you can follow along.',
  },
  {
    title: 'Keep it yours',
    body: 'Birth details stay on your device. Nothing is sold or shared.',
  },
] as const;

export default function LandingPage({
  onStartOnboarding,
  onNavigateToTab,
}: LandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0b0d12] text-[#f4efe6] selection:bg-[#c9a227]/30">
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 70% 8%, rgba(201,162,39,0.16), transparent 55%), radial-gradient(ellipse 55% 45% at 12% 78%, rgba(90,120,160,0.14), transparent 50%), linear-gradient(165deg, #0b0d12 0%, #12151e 48%, #0e1016 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <AnimatedStarfield />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <OmniLandingNavbar
          onStartOnboarding={onStartOnboarding}
          onNavigateToTab={onNavigateToTab}
        />

        {/* Hero — one composition, brand-first */}
        <section className="relative flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-center lg:pb-24 lg:pt-28">
          <div className="mx-auto w-full max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.32em] text-[#c9a227]"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              ASTRO360
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[11ch] text-[clamp(3.25rem,11vw,6.75rem)] font-normal leading-[0.92] tracking-[-0.03em] text-[#f7f2e8]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Look up.
              <br />
              Come home.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-[#b8b0a4] sm:text-lg"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Clear charts, honest timing, and human guidance — so the sky feels
              like a companion, not a puzzle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                onClick={() => onStartOnboarding()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8d5a3] px-8 py-3.5 text-sm font-semibold text-[#1a150c] transition hover:bg-[#f0e2b8] active:scale-[0.98]"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Begin with your chart
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab('free-tools')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-[#e8e2d6] backdrop-blur-sm transition hover:border-white/25 hover:bg-white/[0.06]"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Browse free tools
              </button>
            </motion.div>
          </div>
        </section>

        {/* Quiet note */}
        <section className="border-t border-white/[0.06] bg-[#0e1016]/80 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="text-[11px] uppercase tracking-[0.22em] text-[#c9a227]/80"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              A note for today
            </p>
            <p
              className="mt-4 text-[clamp(1.35rem,3.2vw,1.9rem)] leading-snug text-[#f0ebe3]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Slow down before you commit. The Moon favors listening first —
              then a clear, kind reply.
            </p>
          </div>
        </section>

        {/* Tools as conversation — not cards */}
        <section className="border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2
              className="max-w-lg text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08] text-[#f4efe6]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tools that feel like conversation
            </h2>
            <p
              className="mt-4 max-w-md text-base leading-relaxed text-[#9a9288]"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Start where you are. No jargon wall — just the next useful step.
            </p>

            <ul className="mt-12 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {FEATURED.map((item) => (
                <li key={item.tab}>
                  <button
                    type="button"
                    onClick={() => onNavigateToTab(item.tab)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left transition hover:bg-white/[0.015] sm:items-center"
                  >
                    <span className="min-w-0">
                      <span
                        className="block text-xl text-[#f4efe6] transition group-hover:text-[#e8d5a3] sm:text-2xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {item.title}
                      </span>
                      <span
                        className="mt-1 block text-sm leading-relaxed text-[#8a847a]"
                        style={{ fontFamily: 'var(--font-ui)' }}
                      >
                        {item.note}
                      </span>
                    </span>
                    <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-[#5a564e] transition group-hover:translate-x-1 group-hover:text-[#c9a227] sm:mt-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Three quiet truths */}
        <section className="border-t border-white/[0.06] bg-[#0e1016]/80 px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <h2
              className="max-w-md text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08] text-[#f4efe6]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Made for people, not for spectacle
            </h2>
            <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-10">
              {MOMENTS.map((m) => (
                <div key={m.title}>
                  <h3
                    className="text-lg text-[#e8d5a3]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-[#8a847a]"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="relative overflow-hidden border-t border-white/[0.06] px-5 py-24 sm:px-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(201,162,39,0.18), transparent 60%)',
            }}
          />
          <div className="relative mx-auto max-w-xl text-center">
            <h2
              className="text-[clamp(2rem,5vw,3.1rem)] leading-[1.05] text-[#f4efe6]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Your sky is waiting
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-base text-[#9a9288]"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              A few quiet minutes with your birth details is enough to begin.
            </p>
            <button
              type="button"
              onClick={() => onStartOnboarding()}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#e8d5a3] px-8 py-3.5 text-sm font-semibold text-[#1a150c] transition hover:bg-[#f0e2b8]"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Open ASTRO360
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <LandingFooter onNavigateTab={onNavigateToTab} />
      </div>
    </div>
  );
}
