/**
 * AstroQualityController — Intelligent Hardware & Power Tier Adapter
 * Dynamically classifies devices into ULTRA | HIGH | MEDIUM | LOW | STATIC
 */

export type QualityTier = 'ULTRA' | 'HIGH' | 'MEDIUM' | 'LOW' | 'STATIC';

export interface QualityConfig {
  tier: QualityTier;
  starCount: number;
  enablePostprocessing: boolean;
  enableParallax: boolean;
  dpr: [number, number];
  frameloop: 'always' | 'demand';
  enableOrbits: boolean;
  enableZodiacGlow: boolean;
}

export function detectQualityTier(): QualityConfig {
  if (typeof window === 'undefined') {
    return {
      tier: 'STATIC',
      starCount: 0,
      enablePostprocessing: false,
      enableParallax: false,
      dpr: [1, 1],
      frameloop: 'demand',
      enableOrbits: false,
      enableZodiacGlow: false,
    };
  }

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return {
      tier: 'STATIC',
      starCount: 300,
      enablePostprocessing: false,
      enableParallax: false,
      dpr: [1, 1],
      frameloop: 'demand',
      enableOrbits: false,
      enableZodiacGlow: false,
    };
  }

  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;

  // Mobile Device (<768px)
  if (isMobile) {
    return {
      tier: 'LOW',
      starCount: 650,
      enablePostprocessing: false,
      enableParallax: false,
      dpr: [1, 1.25],
      frameloop: 'always',
      enableOrbits: true,
      enableZodiacGlow: false,
    };
  }

  // Tablet Device (768px - 1024px)
  if (isTablet) {
    return {
      tier: 'MEDIUM',
      starCount: 1200,
      enablePostprocessing: false,
      enableParallax: true,
      dpr: [1, 1.5],
      frameloop: 'always',
      enableOrbits: true,
      enableZodiacGlow: true,
    };
  }

  // High-End vs Standard Desktop
  if (hardwareConcurrency >= 8 && width >= 1440) {
    return {
      tier: 'ULTRA',
      starCount: 2600,
      enablePostprocessing: true,
      enableParallax: true,
      dpr: [1, 2],
      frameloop: 'always',
      enableOrbits: true,
      enableZodiacGlow: true,
    };
  }

  return {
    tier: 'HIGH',
    starCount: 1800,
    enablePostprocessing: false,
    enableParallax: true,
    dpr: [1, 1.5],
    frameloop: 'always',
    enableOrbits: true,
    enableZodiacGlow: true,
  };
}
