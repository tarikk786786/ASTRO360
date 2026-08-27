import { NakshatraEngine } from '../../src/lib/vedic/nakshatraEngine';
import { calculateAshtaKootaScore } from '../../src/lib/astroCalculations';

console.log('🧪 Running AstroCore Ashta Koota 36-Guna Compatibility Suite...\n');
let passed = 0, total = 0;
function assert(c: boolean, name: string, detail?: string) {
  total++;
  if (c) { console.log('✅ Passed [' + name + ']' + (detail ? ' ➔ ' + detail : '')); passed++; }
  else { console.error('❌ FAILED [' + name + ']' + (detail ? ' ➔ ' + detail : '')); process.exit(1); }
}

console.log('--- 1. 36-GUNA SCALE INTEGRITY ---');
const gunas = NakshatraEngine.calculateAshtakootaGunas(45.0, 120.0);
assert(gunas.totalGunas >= 0 && gunas.totalGunas <= 36, 'Compatibility score within [0, 36] maximum points', gunas.totalGunas + '/36');
assert(gunas.maxGunas === 36, 'Max Gunas constant is 36');

console.log('\n--- 2. ALL 8 KOOTA DIMENSIONS BREAKDOWN ---');
const scoreObj = calculateAshtaKootaScore('Seeker', '1995-05-15', 'Partner', '1996-08-20');
assert(scoreObj.kootas.length === 8, 'Returns all 8 classical Koota components');
assert(scoreObj.totalScore >= 0 && scoreObj.totalScore <= 36, 'Total score is valid');
assert(typeof scoreObj.recommendation === 'string' && scoreObj.recommendation.length > 0, 'Provides constructive relationship recommendation');

console.log('\n🎉 All ' + passed + '/' + total + ' Ashta Koota Assertions Passed Cleanly!\n');