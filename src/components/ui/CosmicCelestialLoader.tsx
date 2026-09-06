import React from 'react';
import { motion } from 'motion/react';

interface CosmicCelestialLoaderProps {
  message?: string;
  subMessage?: string;
  isFullScreen?: boolean;
}

/**
 * Calm warm observatory loader — replaces the old neon “intelligence sync” splash.
 */
export default function CosmicCelestialLoader({
  message = 'Opening the sky',
  subMessage = 'A quiet moment while we prepare your chart tools',
  isFullScreen = false,
}: CosmicCelestialLoaderProps) {
  const content = (
    <div
      className="flex flex-col items-center justify-center px-6 text-center select-none"
      style={{ fontFamily: 'var(--font-ui)' }}
    >
      <div className="relative mb-10 flex h-20 w-20 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-[#c9a227]/25"
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-[#e8d5a3]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <div className="h-3 w-3 rounded-full bg-[#e8d5a3] shadow-[0_0_24px_rgba(232,213,163,0.55)]" />
      </div>

      <p
        className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#c9a227]/90"
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        ASTRO360
      </p>
      <h3
        className="mt-4 text-[clamp(1.5rem,4vw,2rem)] font-normal leading-tight text-[#f5f0e6]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {message}
      </h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#8a847a]">{subMessage}</p>

      <div className="mt-8 h-[2px] w-28 overflow-hidden rounded-full bg-white/[0.08]">
        <motion.div
          className="h-full rounded-full bg-[#c9a227]"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '40%' }}
        />
      </div>
    </div>
  );

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0d12]">
        {content}
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-[#0b0d12]">
      {content}
    </div>
  );
}
