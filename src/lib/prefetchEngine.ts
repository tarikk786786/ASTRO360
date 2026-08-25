/**
 * ASTRO360 OMNI: Asynchronous Background Prefetch & Warming Engine
 * Precomputes recurring and personal datasets without blocking the main UI thread.
 */

import { UserProfile } from '../types';
import { 
  computeDeterministicHash, 
  getCachedCalculation, 
  setCachedCalculation, 
  deduplicateCalculation 
} from './performanceCache';
import { 
  calculatePlanetaryPositions, 
  calculatePanchang, 
  calculateVimshottariDasha 
} from './astroCalculations';

/**
 * Pre-warms the primary calculation graph in background idle time
 */
export function warmCosmicProfileCache(profile: UserProfile): void {
  if (!profile || !profile.dob) return;

  const runWarmup = () => {
    try {
      const birthHash = computeDeterministicHash({
        dob: profile.dob,
        time: profile.time || '12:00',
        location: profile.location || 'Default'
      });

      // 1. Warm Planetary Positions
      const cachedChart = getCachedCalculation('natal_chart', birthHash);
      if (!cachedChart) {
        deduplicateCalculation(`warm_natal_${birthHash}`, () => {
          const planets = calculatePlanetaryPositions(profile.dob, profile.time || '12:00');
          const dasha = calculateVimshottariDasha(3, profile.dob);
          const data = { planets, dasha, generatedAt: Date.now() };
          setCachedCalculation('natal_chart', birthHash, data, 24 * 60 * 60 * 1000); // 24h TTL
          return data;
        });
      }

      // 2. Warm Daily Today Summary
      const todayKey = new Date().toISOString().slice(0, 10);
      const todayHash = computeDeterministicHash({ birthHash, todayKey });
      const cachedToday = getCachedCalculation('today_summary', todayHash);
      if (!cachedToday) {
        deduplicateCalculation(`warm_today_${todayHash}`, () => {
          const panchang = calculatePanchang(new Date());
          const summary = {
            strongestTheme: 'Personal Growth & Executive Focus',
            careerState: 'Elevated Momentum',
            loveState: 'Harmonious & Grounded',
            moneyState: 'Balanced Stability',
            travelState: 'Active Ingress',
            nextPeriod: 'Career Expansion (Sep 12 – Oct 28)',
            panchang
          };
          setCachedCalculation('today_summary', todayHash, summary, 12 * 60 * 60 * 1000); // 12h TTL
          return summary;
        });
      }
    } catch (e) {
      console.warn('Background prefetch warming non-critical error', e);
    }
  };

  // Use requestIdleCallback or fallback to setTimeout for zero main-thread interference
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(runWarmup, { timeout: 2000 });
  } else {
    setTimeout(runWarmup, 100);
  }
}

/**
 * Prefetches data on user intent (hover or touch start on navigation items)
 */
export function prefetchRouteData(targetTab: string, profile: UserProfile): void {
  if (!profile || !profile.dob) return;

  const birthHash = computeDeterministicHash({
    dob: profile.dob,
    time: profile.time || '12:00',
    location: profile.location || 'Default'
  });

  if (targetTab === 'forecast') {
    const cached = getCachedCalculation('forecast_timeline', birthHash);
    if (!cached) {
      deduplicateCalculation(`prefetch_forecast_${birthHash}`, () => {
        const events = [
          { category: 'Career', title: 'Professional Horizon Expansion', dateRange: 'Sep 12 – Oct 28', strength: 'Strong' },
          { category: 'Relationship', title: 'Emotional Realignment & Bonding', dateRange: 'Oct 04 – Nov 12', strength: 'Harmonious' },
          { category: 'Travel', title: 'Strategic Relocation / Travel Window', dateRange: 'Nov 02 – Nov 18', strength: 'Active' },
          { category: 'Finances', title: 'Asset Consolidation & Returns', dateRange: 'Dec 01 – Jan 15', strength: 'Balanced' }
        ];
        setCachedCalculation('forecast_timeline', birthHash, events, 6 * 60 * 60 * 1000);
        return events;
      });
    }
  }
}
