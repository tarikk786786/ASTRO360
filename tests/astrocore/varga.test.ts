import { AstroCoreOrchestrator } from '../../src/lib/astroCoreOrchestrator';

console.log('🧪 Running AstroCore Divisional Charts (Vargas) Suite...\n');
let passed = 0, total = 0;
function assert(c: boolean, name: string, detail?: string) {
  total++;
  if (c) { console.log('✅ Passed [' + name + ']' + (detail ? ' ➔ ' + detail : '')); passed++; }
  else { console.error('❌ FAILED [' + name + ']' + (detail ? ' ➔ ' + detail : '')); process.exit(1); }
}

console.log('--- 1. D1, D9, D10 VARGA COMPUTATION ---');
const chart = AstroCoreOrchestrator.executePipeline({
  name: 'Varga Test',
  dob: '1998-06-15',
  time: '12:00',
  location: 'Mecca',
  latitude: 21.4225,
  longitude: 39.8262
});

const vargas = chart.traditions?.vedic?.vargas;
assert(vargas !== undefined, 'Vedic vargas object exists');
assert(vargas?.D1 !== undefined, 'D1 Rasi chart calculated');
assert(vargas?.D9 !== undefined, 'D9 Navamsha chart calculated');
assert(vargas?.D10 !== undefined, 'D10 Dashamsha chart calculated');
assert(typeof vargas!.D1.Sun === 'number' && vargas!.D1.Sun >= 1 && vargas!.D1.Sun <= 12, 'Sun D1 house is in [1, 12]');
assert(typeof vargas!.D9.Sun === 'number' && vargas!.D9.Sun >= 1 && vargas!.D9.Sun <= 12, 'Sun D9 house is in [1, 12]');

console.log('\n🎉 All ' + passed + '/' + total + ' Divisional Chart Assertions Passed Cleanly!\n');