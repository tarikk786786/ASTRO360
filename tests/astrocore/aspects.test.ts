import { AstroCoreOrchestrator } from '../../src/lib/astroCoreOrchestrator';

console.log('🧪 Running AstroCore Aspect Engine Validation Suite...\n');
let passed = 0, total = 0;
function assert(c: boolean, name: string, detail?: string) {
  total++;
  if (c) { console.log('✅ Passed [' + name + ']' + (detail ? ' ➔ ' + detail : '')); passed++; }
  else { console.error('❌ FAILED [' + name + ']' + (detail ? ' ➔ ' + detail : '')); process.exit(1); }
}

console.log('--- 1. DYNAMIC ASPECT DETECTION ---');
const chart = AstroCoreOrchestrator.executePipeline({
  name: 'Test Chart',
  dob: '2026-08-27',
  time: '12:00',
  location: 'London, UK',
  latitude: 51.5074,
  longitude: -0.1278
});

assert(Array.isArray(chart.aspects), 'Chart produces aspects array');
assert(chart.aspects.length > 0, 'Detects planetary aspects dynamically', chart.aspects.length + ' aspects found');
for (const asp of chart.aspects) {
  assert(['conjunction', 'opposition', 'trine', 'square', 'sextile'].includes(asp.aspectType), 'Aspect type [' + asp.aspectType + '] is canonical');
  assert(asp.orbDeg >= 0 && asp.orbDeg <= 8.0, 'Aspect orb [' + asp.orbDeg + '°] is within tolerance threshold');
}

console.log('\n🎉 All ' + passed + '/' + total + ' Aspect Engine Assertions Passed Cleanly!\n');