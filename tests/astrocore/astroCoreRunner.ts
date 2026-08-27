/**
 * ASTRO360 AstroCore Regression Master Runner
 * Executes all 9 independent AstroCore calculation test suites.
 */

import { execSync } from 'child_process';

console.log('============================================================');
console.log('🌌 ASTRO360 ASTROCORE ENGINE REGRESSION SUITE (9 SUITES)');
console.log('============================================================\n');

const astrocoreSuites = [
  'tests/astrocore/ascendant.test.ts',
  'tests/astrocore/houses.test.ts',
  'tests/astrocore/nakshatra.test.ts',
  'tests/astrocore/dasha.test.ts',
  'tests/astrocore/panchanga.test.ts',
  'tests/astrocore/aspects.test.ts',
  'tests/astrocore/ashtakoota.test.ts',
  'tests/astrocore/varga.test.ts',
  'tests/astrocore/differential.test.ts',
];

let passed = 0;
for (const suite of astrocoreSuites) {
  try {
    const out = execSync('npx tsx ' + suite, { encoding: 'utf8' });
    console.log(out);
    passed++;
  } catch (err: any) {
    console.error('❌ Failed: ' + suite);
    console.error(err.stdout || err.message);
    process.exit(1);
  }
}

console.log('============================================================');
console.log('🏆 ALL ' + passed + '/' + astrocoreSuites.length + ' ASTROCORE REGRESSION SUITES PASSED!');
console.log('============================================================\n');