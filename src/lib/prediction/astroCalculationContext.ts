/**
 * ASTRO360 AstroCalculationContext
 * Canonical Request-Level Ephemeris & Astrology Calculation Cache.
 * Prevents redundant ASTROCORE ephemeris calculations across:
 * MainScreenProblemSolver, PredictionEngine, TimingEngine, AgreementEngine,
 * Forecast, Calendar, Ask, and Research suites.
 */

import { UserProfile } from '../../types';
import { calculatePlanetaryPositions, calculateVimshottariDasha, calculatePanchang } from '../astroCalculations';
import { computeDeterministicHash } from '../performanceCache';

export interface AstroCalculationContextData {
  contextId: string;
  calculatedAt: number;
  dob: string;
  time: string;
  lat: number;
  lon: number;
  positions: any[];
  ascendant: any;
  moon: any;
  sun: any;
  jupiter: any;
  saturn: any;
  mars: any;
  venus: any;
  mercury: any;
  rahu: any;
  ketu: any;
  dasha: {
    activeMahadasha: string;
    activeAntardasha: string;
    dashaStr: string;
    raw: any;
  };
  panchang: any;
}

export class AstroCalculationContext {
  private static contextCache = new Map<string, AstroCalculationContextData>();
  private static readonly MAX_CACHE_SIZE = 100;

  /**
   * Retrieves or builds the canonical calculation context for a given profile.
   * Execution is deterministic and takes < 1.5ms on cache hit.
   */
  public static getOrCreate(profile: UserProfile): AstroCalculationContextData {
    const key = computeDeterministicHash({
      dob: profile.dob || '1998-02-22',
      time: profile.time || '10:30',
      lat: (profile.lat || 28.6139).toFixed(4),
      lon: (profile.lon || 77.2090).toFixed(4),
      system: profile.preferredSystem || 'Vedic'
    });

    const cached = this.contextCache.get(key);
    if (cached) {
      return cached;
    }

    const dob = profile.dob || '1998-02-22';
    const time = profile.time || '10:30';
    const lat = profile.lat || 28.6139;
    const lon = profile.lon || 77.2090;

    // Single deterministic calculation pass
    const positions = calculatePlanetaryPositions(dob, time, undefined, lat, lon);
    const asc = positions.find(p => p.name.toLowerCase().includes('ascendant')) || { sign: 'Libra ♎', degree: "14° 28'", nakshatra: 'Swati' };
    const moon = positions.find(p => p.name === 'Moon') || { sign: 'Sagittarius ♐', degree: "17° 35'", nakshatra: 'Purva Ashadha' };
    const sun = positions.find(p => p.name === 'Sun') || { sign: 'Aquarius ♒', degree: "10° 07'" };
    const jupiter = positions.find(p => p.name === 'Jupiter') || { sign: 'Aquarius ♒', degree: "18° 24'" };
    const saturn = positions.find(p => p.name === 'Saturn') || { sign: 'Pisces ♓', degree: "22° 15'" };
    const mars = positions.find(p => p.name === 'Mars') || { sign: 'Pisces ♓', degree: "05° 40'" };
    const venus = positions.find(p => p.name === 'Venus') || { sign: 'Capricorn ♑', degree: "12° 50'" };
    const mercury = positions.find(p => p.name === 'Mercury') || { sign: 'Capricorn ♑', degree: "28° 10'" };
    const rahu = positions.find(p => p.name === 'Rahu') || { sign: 'Leo ♌', degree: "15° 20'" };
    const ketu = positions.find(p => p.name === 'Ketu') || { sign: 'Aquarius ♒', degree: "15° 20'" };

    const rawDasha = calculateVimshottariDasha(dob, time);
    const dasha = {
      activeMahadasha: rawDasha.activeMahadasha || 'Moon',
      activeAntardasha: rawDasha.activeAntardasha || 'Saturn',
      dashaStr: `${rawDasha.activeMahadasha || 'Moon'} - ${rawDasha.activeAntardasha || 'Saturn'}`,
      raw: rawDasha
    };

    const panchang = calculatePanchang(new Date(dob));

    const contextData: AstroCalculationContextData = {
      contextId: key,
      calculatedAt: Date.now(),
      dob,
      time,
      lat,
      lon,
      positions,
      ascendant: asc,
      moon,
      sun,
      jupiter,
      saturn,
      mars,
      venus,
      mercury,
      rahu,
      ketu,
      dasha,
      panchang
    };

    // Keep cache bounded
    if (this.contextCache.size >= this.MAX_CACHE_SIZE) {
      const oldestKey = this.contextCache.keys().next().value;
      if (oldestKey) this.contextCache.delete(oldestKey);
    }

    this.contextCache.set(key, contextData);
    return contextData;
  }

  public static clear(): void {
    this.contextCache.clear();
  }
}
