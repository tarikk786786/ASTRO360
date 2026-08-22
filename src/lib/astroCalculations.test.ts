// FIXED: this file imported `calculateLahiriAyanamsha`, which does not exist.
// The real export is `calculateAyanamsha(date, mode)`. Node would have thrown
// "does not provide an export named 'calculateLahiriAyanamsha'" at import time,
// so this suite could never have run green in CI. See QA-04 in docs/hardening/AUDIT.md.
import { calculatePlanetaryPositions, calculateAyanamsha } from './astroCalculations';

function runAstroCalculationsTests() {
  console.log('🧪 Running Astronomical Engine Unit Verification...');

  // Test 1: Lahiri Ayanamsha Calculation (Expected ~24.21° for year 2026)
  const ayanamsha = calculateAyanamsha(new Date('2026-08-06'), 'lahiri');
  if (ayanamsha < 23.5 || ayanamsha > 25.0) {
    throw new Error(`Test 1 Failed: Expected Lahiri Ayanamsha ~24.21°, got ${ayanamsha}`);
  }
  console.log(`✅ Test 1 Passed: Lahiri Ayanamsha = ${ayanamsha.toFixed(4)}°`);

  // Test 2: Planet Longitudes & Signs output
  const positions = calculatePlanetaryPositions('1995-05-15', '14:30');
  if (!positions || positions.length !== 9) {
    throw new Error(`Test 2 Failed: Expected 9 planetary positions, got ${positions?.length}`);
  }

  positions.forEach(p => {
    // `!(x >= 0 && x < 360)` rather than `x < 0 || x >= 360`: every comparison
    // against NaN is false, so the original form let NaN through as a pass.
    if (!(p.degreeDecimal >= 0 && p.degreeDecimal < 360)) {
      throw new Error(`Test 2 Failed: Invalid planet degree ${p.degreeDecimal} for ${p.name}`);
    }
    if (!Number.isFinite(p.long)) {
      throw new Error(`Test 2 Failed: non-finite longitude ${p.long} for ${p.name}`);
    }
  });

  console.log(`✅ Test 2 Passed: 9 Planets correctly positioned within [0°, 360°) bounds.`);
  console.log('🎉 All Astronomical Engine Unit Tests Passed Cleanly!');
}

runAstroCalculationsTests();
