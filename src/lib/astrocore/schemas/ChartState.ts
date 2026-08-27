/**
 * ASTRO360 — Normalized Chart State Schema
 * Complete snapshot of an astrological chart at a specific instant.
 * Captures all configuration needed for reproducibility.
 */

import type { CelestialPosition } from './CelestialPosition';

export interface ChartSubject {
  name?: string;
  birthDate: string;        // YYYY-MM-DD
  birthTime: string;        // HH:mm
  location: string;         // City, Country
  latitude: number;
  longitude: number;
}

export interface ChartAngle {
  name: string;              // 'Ascendant' | 'Midheaven' | 'Descendant' | 'IC'
  longitude: number;
  sign: string;
  degreeInSign: number;
}

export interface ChartHouse {
  number: number;            // 1-12
  cuspLongitude: number;
  sign: string;
  signLord: string;
  occupants: string[];
}

export interface ChartAspect {
  planetA: string;
  planetB: string;
  aspectType: string;       // 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile'
  angleDeg: number;         // Exact aspect angle (0, 60, 90, 120, 180)
  actualAngle: number;      // Measured angle between planets
  orbDeg: number;
  isApplying: boolean;
  isHarmonic: boolean;
}

export interface ChartConfiguration {
  zodiac: 'tropical' | 'sidereal';
  ayanamsha: string;
  ayanamshaOffsetDeg: number;
  houseSystem: string;
  nodeModel: 'mean' | 'true';
  coordinateFrame: 'geocentric' | 'topocentric';
  ephemeris: string;
  timeScale: 'UTC' | 'TT' | 'TDB';
}

export interface ChartVersioning {
  engineVersion: string;
  ephemerisVersion: string;
  timezoneVersion: string;
  ruleVersion?: string;
  inputHash?: string;
  configurationHash?: string;
}

export interface ChartState {
  subject: ChartSubject;
  timestamp: string;         // UTC ISO-8601
  timezone: string;          // IANA timezone ID
  julianDay: number;
  localSiderealTime: number; // In decimal hours
  planets: CelestialPosition[];
  angles: ChartAngle[];
  houses: ChartHouse[];
  aspects: ChartAspect[];
  configuration: ChartConfiguration;
  versioning: ChartVersioning;
  calculatedAt: string;
}
