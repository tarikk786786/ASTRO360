import { NakshatraEngine } from '../../src/lib/vedic/nakshatraEngine';

console.log('🧪 Running AstroCore 27 Nakshatra & Pada Validation Suite...\n');
let passed = 0, total = 0;
function assert(c: boolean, name: string, detail?: string) {
  total++;
  if (c) { console.log('✅ Passed [' + name + ']' + (detail ? ' ➔ ' + detail : '')); passed++; }
  else { console.error('❌ FAILED [' + name + ']' + (detail ? ' ➔ ' + detail : '')); process.exit(1); }
}

console.log('--- 1. FIRST & LAST NAKSHATRA BOUNDARIES ---');
const ashwini = NakshatraEngine.calculateNakshatra(0.0);
assert(ashwini.name === 'Ashwini', '0° Sidereal maps to Ashwini');
assert(ashwini.pada === 1, '0° Sidereal maps to Pada 1');
assert(ashwini.ruler === 'Ketu', 'Ashwini ruler is Ketu');
assert(ashwini.gana === 'Deva', 'Ashwini Gana is Deva');
assert(ashwini.nadi === 'Adi', 'Ashwini Nadi is Adi');

const revati = NakshatraEngine.calculateNakshatra(359.9);
assert(revati.name === 'Revati', '359.9° Sidereal maps to Revati');
assert(revati.pada === 4, '359.9° Sidereal maps to Pada 4');
assert(revati.ruler === 'Mercury', 'Revati ruler is Mercury');

console.log('\n--- 2. PADA (3°20\') DIVISION INTEGRITY ---');
const rohini1 = NakshatraEngine.calculateNakshatra(40.0 + 1.0);
assert(rohini1.name === 'Rohini' && rohini1.pada === 1, '41° maps to Rohini Pada 1');
const rohini4 = NakshatraEngine.calculateNakshatra(40.0 + 11.0);
assert(rohini4.name === 'Rohini' && rohini4.pada === 4, '51° maps to Rohini Pada 4');

console.log('\n--- 3. ALL 27 NAKSHATRAS CONTINUITY CHECK ---');
const span = 13.333333333333334;
let allContiguous = true;
for (let i = 0; i < 27; i++) {
  const nak = NakshatraEngine.calculateNakshatra(i * span + 0.1);
  if (nak.index !== i) { allContiguous = false; break; }
}
assert(allContiguous, 'All 27 Nakshatras form seamless contiguous 360° zodiac sequence');

console.log('\n🎉 All ' + passed + '/' + total + ' Nakshatra Validation Assertions Passed Cleanly!\n');