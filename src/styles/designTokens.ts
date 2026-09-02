/**
 * ASTRO360 Design System Tokens
 * 
 * Strict Principle:
 * - Luxury Matte Canvas (#090A0C)
 * - Deep Charcoal Surface (#111315)
 * - Elevated Surface (#181A1D)
 * - Fine 1px Borders (border-white/[0.08])
 * - High-Contrast Pure White Highlights
 * - Calibrated Astrological Accents (Amber, Emerald, Cyan, Gold, Purple)
 */

export const designTokens = {
  colors: {
    background: '#090A0C',
    surface: '#111315',
    surfaceElevated: '#181A1D',
    surfaceSubtle: 'rgba(255, 255, 255, 0.03)',
    text: '#FFFFFF',
    textMuted: '#94A3B8',
    textSubtle: '#64748B',
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(255, 255, 255, 0.18)',
    accent: '#F59E0B', // Sacred Solar Amber
    success: '#10B981', // Mercury Emerald
    warning: '#F59E0B', // Jupiter Topaz
    attention: '#38BDF8', // Celestial Sky Blue
    error: '#F43F5E', // Mars Crimson
  },
  typography: {
    display: 'font-sans text-3xl sm:text-4xl md:text-5xl font-black tracking-tight',
    heading: 'font-sans text-xl sm:text-2xl font-bold tracking-tight',
    subheading: 'font-sans text-base sm:text-lg font-semibold',
    body: 'font-sans text-sm text-slate-300 leading-relaxed',
    label: 'font-mono text-xs uppercase tracking-wider font-bold',
    caption: 'font-mono text-[11px] text-slate-400',
    technical: 'font-mono text-xs font-medium',
    numeric: 'font-mono tracking-tight font-bold',
  },
  spacing: {
    4: '1rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    24: '6rem',
    32: '8rem',
    48: '12rem',
    64: '16rem',
    96: '24rem',
    128: '32rem',
  },
  radii: {
    small: '0.5rem', // 8px
    medium: '0.75rem', // 12px
    large: '1.25rem', // 20px
    pill: '9999px',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.4)',
    medium: '0 8px 24px rgba(0, 0, 0, 0.6)',
    large: '0 16px 48px rgba(0, 0, 0, 0.8)',
  },
  motion: {
    micro: { duration: 0.15, ease: 'easeOut' },
    standard: { duration: 0.25, ease: 'easeOut' },
    emphasis: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }
} as const;

export default designTokens;
