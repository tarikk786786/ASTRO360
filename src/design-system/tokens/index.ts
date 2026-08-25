/**
 * ASTRO360 Design Tokens
 * Standardized design tokens for global typography, colors, elevations, motion, and spacing.
 */

export const colors = {
  bg: {
    base: '#060A12',
    surface: '#0B1220',
    elevated: '#0F172A',
    overlay: 'rgba(6, 10, 18, 0.85)',
    card: '#0D1527',
  },
  accent: {
    gold: '#FBBF24',
    goldHover: '#F59E0B',
    goldMuted: 'rgba(251, 191, 36, 0.15)',
    cyan: '#38BDF8',
    cyanMuted: 'rgba(56, 189, 248, 0.15)',
    emerald: '#34D399',
    emeraldMuted: 'rgba(52, 211, 153, 0.15)',
    purple: '#A78BFA',
    purpleMuted: 'rgba(167, 139, 250, 0.15)',
    rose: '#FB7185',
    roseMuted: 'rgba(251, 113, 133, 0.15)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#CBD5E1',
    muted: '#94A3B8',
    faint: '#64748B',
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',
    default: 'rgba(255, 255, 255, 0.12)',
    focus: '#FBBF24',
    goldGlow: 'rgba(251, 191, 36, 0.35)',
  }
} as const;

export const typography = {
  fontSans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontDisplay: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
} as const;

export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '0.75rem',  // 12px
  base: '1rem',   // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
} as const;

export const radius = {
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  card: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
  goldGlow: '0 0 25px -5px rgba(251, 191, 36, 0.25)',
  cyanGlow: '0 0 25px -5px rgba(56, 189, 248, 0.25)',
} as const;

export const motionTokens = {
  duration: {
    fast: 0.15,
    normal: 0.25,
    smooth: 0.4,
    cinematic: 0.8,
  },
  ease: {
    outExpo: [0.16, 1, 0.3, 1],
    inOutQuad: [0.45, 0, 0.55, 1],
  }
} as const;

export const breakpoints = {
  mobileMin: 320,
  mobileStandard: 390,
  mobileLarge: 430,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultrawide: 1440,
} as const;
