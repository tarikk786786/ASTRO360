// src/lib/vedic/kundliMatchingEngine.ts
/**
 * ASTRO360 Vedic Kundli Matching & Ashta Koota Compatibility Engine
 * Calculates deterministic 36-Guna matching according to classical Parashari
 * and Muhurta Chintamani scripture standards.
 */

import { NakshatraEngine } from '../astroCalculations';

export interface AshtaKootaResult {
  varna: number;       // Max: 1
  vashya: number;      // Max: 2
  tara: number;        // Max: 3
  yoni: number;        // Max: 4
  grahaMaitri: number; // Max: 5
  gana: number;        // Max: 6
  bhakoot: number;     // Max: 7
  nadi: number;        // Max: 8
  total: number;       // Max: 36
  recommendation: string;
  isNadiDoshaPresent: boolean;
  isBhakootDoshaPresent: boolean;
}

export function calculateAshtaKoota(
  boyMoonLongitudeOrNakshatra: number,
  boyMoonSignOrNakshatraIndex: number,
  girlMoonLongitudeOrNakshatra?: number,
  girlMoonSignOrNakshatraIndex?: number
): AshtaKootaResult {
  // Support both (boyMoonDeg, girlMoonDeg) and 4-argument signatures
  let boyDeg = boyMoonLongitudeOrNakshatra;
  let girlDeg = boyMoonSignOrNakshatraIndex;

  if (girlMoonLongitudeOrNakshatra !== undefined) {
    // If nakshatra index (0-26) was passed, convert to center longitude
    boyDeg = (boyMoonLongitudeOrNakshatra * (360 / 27)) + (360 / 54);
    girlDeg = (girlMoonLongitudeOrNakshatra * (360 / 27)) + (360 / 54);
  }

  const gunasResult = NakshatraEngine.calculateAshtakootaGunas(boyDeg, girlDeg);
  const b = gunasResult.breakdown;
  const total = gunasResult.totalGunas;

  const isNadiDoshaPresent = (b.nadi || 0) === 0;
  const isBhakootDoshaPresent = (b.bhakoot || 0) === 0;

  let recommendation = 'Fair Compatibility — Requires conscious communication and mutual respect.';
  if (total >= 28) {
    recommendation = 'Excellent Compatibility — Highly auspicious alignment for long-term marriage and mutual prosperity.';
  } else if (total >= 20) {
    recommendation = 'Good Compatibility — Strong spiritual and psychological bond with minor adjustments.';
  } else if (total < 18) {
    recommendation = 'Requires Remedial Harmony — Perform classical Vedic Nadi and Bhakoot pacification mantras for optimal balance.';
  }

  return {
    varna: b.varna || 0,
    vashya: b.vashya || 0,
    tara: b.tara || 0,
    yoni: b.yoni || 0,
    grahaMaitri: b.maitri || 0,
    gana: b.gana || 0,
    bhakoot: b.bhakoot || 0,
    nadi: b.nadi || 0,
    total,
    recommendation,
    isNadiDoshaPresent,
    isBhakootDoshaPresent
  };
}
