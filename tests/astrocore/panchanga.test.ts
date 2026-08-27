import { calculatePanchang } from '../../src/lib/astroCalculations';

console.log('🧪 Running AstroCore Panchanga Validation Suite...\n');
let passed = 0, total = 0;
function assert(c: boolean, name: string, detail?: string) {
  total++;
  if (c) { console.log('✅ Passed [' + name + ']' + (detail ? ' ➔ ' + detail : '')); passed++; }
  else { console.error('❌ FAILED [' + name + ']' + (detail ? ' ➔ ' + detail : '')); process.exit(1); }
}

console.log('--- 1. COMPLETE 5-LIMB PANCHANGA DATA ---');
const panchang = calculatePanchang(new Date('2026-08-27T12:00:00Z'));
assert(panchang.tithi.length > 0, 'Computes active Tithi name', panchang.tithi);
assert(panchang.nakshatra.length > 0, 'Computes active Nakshatra', panchang.nakshatra);
assert(panchang.yoga.length > 0, 'Computes active Yoga', panchang.yoga);
assert(panchang.karana.length > 0, 'Computes active Karana', panchang.karana);
assert(panchang.rahuKalam.length > 0, 'Computes weekday Rahu Kalam timing', panchang.rahuKalam);

console.log('\n--- 2. TITHI & MOON ILLUMINATION CORRELATION ---');
assert(panchang.moonIllumination >= 0 && panchang.moonIllumination <= 100, 'Moon illumination is in [0, 100]%', panchang.moonIllumination + '%');
assert(panchang.tithiIndex >= 0 && panchang.tithiIndex < 30, 'Tithi index is within 30 tithis of lunar synodic month');

console.log('\n🎉 All ' + passed + '/' + total + ' Panchanga Assertions Passed Cleanly!\n');