import { calculateVimshottariDasha } from '../../src/backend/dashaEngine';

console.log('🧪 Running AstroCore Vimshottari Dasha Validation Suite...\n');
let passed = 0, total = 0;
function assert(c: boolean, name: string, detail?: string) {
  total++;
  if (c) { console.log('✅ Passed [' + name + ']' + (detail ? ' ➔ ' + detail : '')); passed++; }
  else { console.error('❌ FAILED [' + name + ']' + (detail ? ' ➔ ' + detail : '')); process.exit(1); }
}

console.log('--- 1. MAHADASHA CYCLE GENERATION ---');
const birthDate = new Date('1998-06-15T12:00:00Z');
const dasha = calculateVimshottariDasha(42.1, birthDate);
assert(dasha.timeline.length === 9, 'Generates full 9-Mahadasha 120-year cycle');
assert(dasha.timeline[0].lord === 'Moon', 'Starting Mahadasha lord is Moon for Rohini nakshatra');

console.log('\n--- 2. DYNAMIC ANTARDASHA SUB-PERIOD RESOLUTION ---');
assert(typeof dasha.currentAntardasha === 'string' && dasha.currentAntardasha.length > 0, 'Current Antardasha resolved to valid lord', dasha.currentAntardasha);

console.log('\n--- 3. CHRONOLOGICAL CONTINUITY (INVARIANT: NO GAPS / NO OVERLAPS) ---');
let noGaps = true;
for (let i = 0; i < dasha.timeline.length - 1; i++) {
  const currentEnd = dasha.timeline[i].endDate;
  const nextStart = dasha.timeline[i + 1].startDate;
  if (currentEnd !== nextStart) { noGaps = false; break; }
}
assert(noGaps, 'All Mahadasha transitions are strictly continuous with zero gaps or overlaps');

const currentPeriods = dasha.timeline.filter(p => p.isCurrent);
assert(currentPeriods.length <= 1, 'Exactly zero or one period is active at any given moment in time');

console.log('\n🎉 All ' + passed + '/' + total + ' Vimshottari Dasha Assertions Passed Cleanly!\n');