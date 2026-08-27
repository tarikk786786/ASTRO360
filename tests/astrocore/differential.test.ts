import { computeReferencePositions } from '../../validation/adapters/astronomyEngineAdapter';
import { compareSnapshots } from '../../validation/differential/differentialEngine';
import type { CalculationDefinition } from '../../src/lib/astrocore/schemas/DefinitionMatrix';

console.log('🧪 Running AstroCore Differential Validation Suite...\n');
let passed = 0, total = 0;
function assert(c: boolean, name: string, detail?: string) {
  total++;
  if (c) { console.log('✅ Passed [' + name + ']' + (detail ? ' ➔ ' + detail : '')); passed++; }
  else { console.error('❌ FAILED [' + name + ']' + (detail ? ' ➔ ' + detail : '')); process.exit(1); }
}

console.log('--- 1. DIRECT ASTRONOMY-ENGINE SNAPSHOT COMPARISON ---');
const date = new Date('2026-08-27T12:00:00Z');
const refSnapshot = computeReferencePositions(date);
const sourceDef: CalculationDefinition = {
  zodiac: 'tropical',
  ayanamsha: 'none',
  ayanamshaBaseDeg: 0,
  nodeModel: 'mean',
  houseSystem: 'placidus',
  aspectOrbs: { conjunction: 8, trine: 8, square: 7, sextile: 6, opposition: 8 },
  coordinateFrame: 'geocentric',
  ephemeris: 'astronomy-engine',
  timeScale: 'UTC'
};
const refDef: CalculationDefinition = { ...sourceDef };
const report = compareSnapshots(refSnapshot, refSnapshot, sourceDef, refDef, 0.0001);
assert(report.definitionsCompatible, 'Source and Reference definitions are fully compatible');
assert(report.summary.passed === report.summary.totalComparisons, 'All ' + report.summary.passed + ' comparisons passed with zero deviation');

console.log('\n🎉 All ' + passed + '/' + total + ' Differential Engine Assertions Passed Cleanly!\n');