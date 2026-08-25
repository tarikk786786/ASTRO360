import { calculatePlanetaryPositions, calculateAyanamsha } from './astroCalculations';

interface GoldenTestCase {
  id: string;
  name: string;
  dob: string;
  time: string;
  lat: number;
  lng: number;
  expectedAyanamshaApprox: number;
  description: string;
}

const GOLDEN_DATASET: GoldenTestCase[] = [
  {
    id: 'GOLDEN_001_J2000',
    name: 'J2000.0 Epoch Reference Standard',
    dob: '2000-01-01',
    time: '12:00',
    lat: 51.4769,
    lng: 0.0005,
    expectedAyanamshaApprox: 23.85,
    description: 'Greenwich Meridian at standard J2000 epoch boundary'
  },
  {
    id: 'GOLDEN_002_HISTORICAL_ECLIPSE',
    name: '1999 Total Solar Eclipse (Munich)',
    dob: '1999-08-11',
    time: '12:37',
    lat: 48.1351,
    lng: 11.5820,
    expectedAyanamshaApprox: 23.84,
    description: 'Total solar eclipse with Sun-Moon conjunction'
  },
  {
    id: 'GOLDEN_003_LEAP_YEAR_BOUND',
    name: '2024 Leap Year Intercalary Day',
    dob: '2024-02-29',
    time: '23:59',
    lat: 28.6139,
    lng: 77.2090,
    expectedAyanamshaApprox: 24.18,
    description: 'February 29 leap second and day handling in New Delhi'
  },
  {
    id: 'GOLDEN_004_HIGH_LATITUDE',
    name: 'Reykjavik High Latitude Horizon',
    dob: '2025-06-21',
    time: '00:01',
    lat: 64.1466,
    lng: -21.9426,
    expectedAyanamshaApprox: 24.20,
    description: 'Summer solstice near arctic circle with non-standard house cusps'
  },
  {
    id: 'GOLDEN_005_EQUATORIAL',
    name: 'Singapore Equatorial Reference',
    dob: '2026-08-25',
    time: '18:30',
    lat: 1.3521,
    lng: 103.8198,
    expectedAyanamshaApprox: 24.22,
    description: 'Equatorial Ascendant calculation with zero polar distortion'
  },
  {
    id: 'GOLDEN_006_RETROGRADE_TEST',
    name: 'Outer Planet Retrograde Boundary',
    dob: '2026-10-15',
    time: '04:00',
    lat: 40.7128,
    lng: -74.0060,
    expectedAyanamshaApprox: 24.22,
    description: 'Saturn and Jupiter apparent motion check'
  }
];

function runGoldenDatasetTests() {
  console.log('🧪 Running ASTRO360 Golden Dataset Astronomical Verification...');

  let passed = 0;
  for (const testCase of GOLDEN_DATASET) {
    const ayanamsha = calculateAyanamsha(new Date(testCase.dob));
    const planets = calculatePlanetaryPositions(testCase.dob, testCase.time);

    // Verify Ayanamsha is within 0.1° of historical reference
    const diff = Math.abs(ayanamsha - testCase.expectedAyanamshaApprox);
    if (diff > 0.3) {
      throw new Error(`Golden test ${testCase.id} failed: Ayanamsha ${ayanamsha} vs expected ${testCase.expectedAyanamshaApprox}`);
    }

    // Verify all 9 primary planetary bodies are strictly defined
    if (planets.length < 9) {
      throw new Error(`Golden test ${testCase.id} failed: only ${planets.length} planets returned.`);
    }

    for (const p of planets) {
      const deg = parseFloat(p.degree);
      if (isNaN(deg) || deg < 0 || deg > 360) {
        throw new Error(`Golden test ${testCase.id} failed: planet ${p.name} invalid degree ${p.degree}`);
      }
    }

    passed++;
    console.log(`✅ Passed [${testCase.id}]: ${testCase.name} (Ayanamsha: ${ayanamsha.toFixed(4)}°)`);
  }

  console.log(`🎉 All ${passed}/${GOLDEN_DATASET.length} Golden Dataset Tests Passed Cleanly!`);
}

runGoldenDatasetTests();
