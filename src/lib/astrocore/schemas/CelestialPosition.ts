/**
 * ASTRO360 — Normalized Celestial Position Schema
 * Precision astronomical position for any celestial body at a specific instant.
 * Used as the canonical format for all cross-engine comparison and validation.
 */

export interface CelestialPosition {
  body: string;              // 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu'
  timestamp: string;         // ISO-8601 UTC
  longitude: number;         // Ecliptic longitude 0-360° (tropical or sidereal depending on frame)
  latitude: number;          // Ecliptic latitude in degrees
  distance: number;          // Distance in AU (Moon in AU = ~0.00257)
  speed: number;             // Degrees per day
  retrograde: boolean;       // true if speed < 0
  frame: 'tropical' | 'sidereal'; // Coordinate frame
  zodiacSign: string;        // 'Aries' | 'Taurus' | ... | 'Pisces'
  degreeInSign: number;      // 0-30°
  nakshatra?: string;        // Vedic Nakshatra name (only for sidereal frame)
  pada?: number;             // 1-4 (only for sidereal frame)
  ephemeris: string;         // 'astronomy-engine' | 'skyfield-de440' | 'kerykeion-swisseph'
  engine: string;            // 'ASTRO360' | 'skyfield' | 'kerykeion'
  engineVersion: string;     // e.g. '3.0.0' or '1.5.4'
}

export interface CelestialSnapshot {
  timestamp: string;
  positions: CelestialPosition[];
  ayanamshaOffset?: number;  // Only populated for sidereal frame
  ayanamshaMode?: string;    // 'lahiri' | 'raman' | etc.
  calculatedAt: string;
}
