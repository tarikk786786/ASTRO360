import { AstronomyEngine } from '../../src/lib/astronomyEngine';

console.log('🧪 Running AstroCore House System Validation Suite...\n');
let passed = 0, total = 0;
function assert(c: boolean, name: string, detail?: string) {
  total++;
  if (c) { console.log('✅ Passed [' + name + ']' + (detail ? ' ➔ ' + detail : '')); passed++; }
  else { console.error('❌ FAILED [' + name + ']' + (detail ? ' ➔ ' + detail : '')); process.exit(1); }
}

console.log('--- 1. WHOLE SIGN HOUSE SYSTEM ---');
const wsCusps = AstronomyEngine.calculateHouseCusps(45.5, 'wholesign');
assert(wsCusps.length === 12, 'Calculates exactly 12 house cusps in Whole Sign system');
assert(wsCusps[0].longitude === 30, 'House 1 in Whole Sign aligns to 0° Taurus (30° Ecliptic)');
assert(wsCusps[1].longitude === 60, 'House 2 in Whole Sign aligns to 0° Gemini (60° Ecliptic)');
assert(wsCusps[9].longitude === 300, 'House 10 in Whole Sign aligns to 0° Aquarius (300° Ecliptic)');

console.log('\n--- 2. EQUAL HOUSE SYSTEM ---');
const eqCusps = AstronomyEngine.calculateHouseCusps(45.5, 'equal');
assert(eqCusps.length === 12, 'Calculates exactly 12 house cusps in Equal house system');
assert(Math.abs(eqCusps[0].longitude - 45.5) < 0.001, 'House 1 in Equal house system starts at exact Ascendant degree');
assert(Math.abs(eqCusps[1].longitude - 75.5) < 0.001, 'House 2 is exactly +30° from House 1');
assert(Math.abs(eqCusps[6].longitude - 225.5) < 0.001, 'House 7 (Descendant) is exactly +180° opposite House 1');

console.log('\n--- 3. PLACIDUS QUADRANT SYSTEM ---');
const placCusps = AstronomyEngine.calculateHouseCusps(120.0, 'placidus');
assert(placCusps.length === 12, 'Calculates 12 cusps in Placidus semi-arc division');
assert(placCusps.every(c => c.longitude >= 0 && c.longitude < 360), 'All 12 Placidus cusps normalize into [0, 360) range');

console.log('\n--- 4. PORPHYRY QUADRANT TRISECTION ---');
const porphCusps = AstronomyEngine.calculateHouseCusps(200.0, 'porphyry');
assert(porphCusps.length === 12, 'Calculates 12 cusps in Porphyry trisection');

console.log('\n🎉 All ' + passed + '/' + total + ' House System Assertions Passed Cleanly!\n');