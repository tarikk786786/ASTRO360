/**
 * ASTRO360 — Astronomy Engine Direct Validation Adapter
 * Independent validation path using the astronomy-engine npm package.
 * Computes tropical ecliptic longitudes for comparison against ASTRO360's sidereal pipeline.
 * 
 * LICENSE: MIT (astronomy-engine) — GREEN for production use.
 */

import { Body, GeoVector, Ecliptic } from 'astronomy-engine';
import type { CelestialPosition, CelestialSnapshot } from '../../src/lib/astrocore/schemas/CelestialPosition';

const BODIES: Array<{ name: string; body: typeof Body[keyof typeof Body] }> = [
  { name: 'Sun', body: Body.Sun },
  { name: 'Moon', body: Body.Moon },
  { name: 'Mars', body: Body.Mars },
  { name: 'Mercury', body: Body.Mercury },
  { name: 'Jupiter', body: Body.Jupiter },
  { name: 'Venus', body: Body.Venus },
  { name: 'Saturn', body: Body.Saturn },
];

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

/**
 * Compute tropical ecliptic longitudes using astronomy-engine directly.
 * Returns a CelestialSnapshot in the tropical frame for cross-validation.
 */
export function computeReferencePositions(date: Date): CelestialSnapshot {
  const positions: CelestialPosition[] = [];

  for (const { name, body } of BODIES) {
    const vec = GeoVector(body, date, true);
    const ecl = Ecliptic(vec);
    
    // Compute speed by sampling ±0.5 day
    const dtMs = 0.5 * 86400000;
    const vecBefore = GeoVector(body, new Date(date.getTime() - dtMs), true);
    const vecAfter = GeoVector(body, new Date(date.getTime() + dtMs), true);
    const eclBefore = Ecliptic(vecBefore);
    const eclAfter = Ecliptic(vecAfter);
    let speed = eclAfter.elon - eclBefore.elon;
    // Handle 360/0 wrap
    if (speed > 180) speed -= 360;
    if (speed < -180) speed += 360;

    const signIndex = Math.floor(ecl.elon / 30);
    const degInSign = ecl.elon % 30;

    positions.push({
      body: name,
      timestamp: date.toISOString(),
      longitude: ecl.elon,
      latitude: ecl.elat,
      distance: vec.length,
      speed,
      retrograde: speed < 0,
      frame: 'tropical',
      zodiacSign: ZODIAC_SIGNS[signIndex],
      degreeInSign: degInSign,
      ephemeris: 'astronomy-engine',
      engine: 'astronomy-engine',
      engineVersion: '2.1.19'
    });
  }

  return {
    timestamp: date.toISOString(),
    positions,
    calculatedAt: new Date().toISOString()
  };
}
