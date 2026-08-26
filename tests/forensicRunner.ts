/**
 * ASTRO360 Master Forensic QA Runner
 * Executes all specialized forensic test suites across Astronomy, Astrology, Prediction, Security, API, Accessibility, and Chaos.
 */

import { execSync } from 'child_process';

console.log('============================================================');
console.log('🏛️  ASTRO360 MASTER FORENSIC QA & RELIABILITY RUNNER');
console.log('============================================================\n');

const suites = [
  { name: '1. Astronomy & AstroCore Forensics', path: 'tests/astronomy/ephemerisPrecision.test.ts' },
  { name: '2. Classical Astrology, Dasha & Panchanga', path: 'tests/astrology/dashaAndPanchang.test.ts' },
  { name: '3. Prediction Engine, Consensus & Stability', path: 'tests/prediction/predictionEngine.test.ts' },
  { name: '4. Security, SSRF & Zero-PII Forensics', path: 'tests/security/securityAndSsrf.test.ts' },
  { name: '5. API & Request Schema Matrix', path: 'tests/api/apiAndMswMatrix.test.ts' },
  { name: '6. Accessibility (a11y) & WCAG Compliance', path: 'tests/accessibility/accessibilityAudit.test.ts' },
  { name: '7. Chaos & Fault Tolerance', path: 'tests/chaos/chaosAndRecovery.test.ts' },
  { name: '8. Real-User Simulation & Mobile Personas', path: 'tests/realUserSimulation.test.ts' },
  { name: '9. OWASP ASVS 5.0.0 & WSTG Security Pentest', path: 'tests/security/owaspAsvsSecurityAudit.test.ts' }
];

let totalPassedSuites = 0;

suites.forEach((suite, index) => {
  console.log(`\n▶ Running Suite [${index + 1}/${suites.length}]: ${suite.name}...`);
  try {
    const output = execSync(`npx tsx ${suite.path}`, { encoding: 'utf8' });
    console.log(output);
    totalPassedSuites++;
  } catch (error: any) {
    console.error(`❌ Suite Failed: ${suite.name}`);
    console.error(error.stdout || error.message);
    process.exit(1);
  }
});

console.log('\n============================================================');
console.log(`🏆 ALL ${totalPassedSuites}/${suites.length} MASTER FORENSIC QA SUITES PASSED CLEANLY!`);
console.log('============================================================\n');
