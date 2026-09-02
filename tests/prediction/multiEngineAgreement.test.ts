import { AgreementEngine, EngineFinding } from '../../src/lib/prediction/agreementEngine';
import { EngineApplicabilityMatrix } from '../../src/lib/prediction/engineRegistry';
import { ResearchEngine } from '../../src/lib/prediction/researchEngine';

console.log('🧪 Running ASTRO360 Multi-Engine Agreement & Consensus Suite...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ Passed [${testName}] ${detail ? `➔ ${detail}` : ''}`);
    passedTests++;
  } else {
    console.error(`❌ FAILED [${testName}] ${detail ? `➔ ${detail}` : ''}`);
    process.exit(1);
  }
}

const baseFinding = (engineId: string, direction: any): EngineFinding => ({
  engineId,
  category: 'CAREER',
  eventType: 'PROMOTION_THEME',
  direction,
  strength: 0.9,
  start: '2026-09-01',
  peak: '2026-09-20',
  end: '2026-10-15',
  precision: 'DAY',
  factors: ['Test factor'],
  rules: ['Rule citation'],
  evidence: ['Test evidence'],
  contradictions: [],
  confidence: 0.9,
  stability: 'HIGH',
  assumptions: [],
  version: '1.0.0'
});

// 1. 100% Agreement
console.log('--- 1. 100% AGREEMENT TEST ---');
const findings100: EngineFinding[] = [
  baseFinding('vedic_parashari', 'SUPPORTIVE'),
  baseFinding('western_tropical', 'SUPPORTIVE'),
  baseFinding('kp_stellar', 'SUPPORTIVE'),
  baseFinding('jaimini_sutras', 'SUPPORTIVE')
];
const eligible100 = ['vedic_parashari', 'western_tropical', 'kp_stellar', 'jaimini_sutras'];
const res100 = AgreementEngine.calculateAgreement(findings100, eligible100);
assert(res100.agreementPercent === 100, '4/4 engines agree yields 100% agreement', `${res100.agreementPercent}%`);
assert(res100.agreementLevel === 'Very High Agreement', 'Agreement level is Very High Agreement');
assert(res100.supportingEngines.length === 4, 'All 4 engines classified as supporting');
assert(res100.conflictingEngines.length === 0, 'Zero conflicting engines');

// 2. 75% Agreement
console.log('\n--- 2. 75% AGREEMENT TEST ---');
const findings75: EngineFinding[] = [
  baseFinding('vedic_parashari', 'SUPPORTIVE'),
  baseFinding('western_tropical', 'SUPPORTIVE'),
  baseFinding('kp_stellar', 'SUPPORTIVE'),
  baseFinding('jaimini_sutras', 'CHALLENGING')
];
const res75 = AgreementEngine.calculateAgreement(findings75, eligible100);
assert(res75.agreementPercent === 75, '3/4 engines agree yields 75% agreement', `${res75.agreementPercent}%`);
assert(res75.agreementLevel === 'High Agreement', 'Agreement level is High Agreement');
assert(res75.supportingEngines.length === 3, '3 supporting engines');
assert(res75.conflictingEngines.length === 1 && res75.conflictingEngines[0] === 'jaimini_sutras', 'Jaimini classified as conflicting');

// 3. Minimum Engine Rule
console.log('\n--- 3. MINIMUM ENGINE RULE ---');
const findings1: EngineFinding[] = [
  baseFinding('vedic_parashari', 'SUPPORTIVE')
];
const res1 = AgreementEngine.calculateAgreement(findings1, ['vedic_parashari']);
assert(res1.agreementPercent === null, 'Single engine returns null agreement percent');
assert(res1.agreementLevel === 'Single-System Result', 'Single engine returns Single-System Result');

// 4. Order Invariance
console.log('\n--- 4. ORDER INVARIANCE TEST ---');
const findingsRev = [...findings75].reverse();
const resRev = AgreementEngine.calculateAgreement(findingsRev, eligible100);
assert(res75.agreementPercent === resRev.agreementPercent, 'Reversing findings does not alter agreement percent');
assert(res75.agreementLevel === resRev.agreementLevel, 'Reversing findings does not alter agreement level');

// 5. NOT_APPLICABLE Invariance
console.log('\n--- 5. NOT_APPLICABLE INVARIANCE TEST ---');
const findingsWithNA = [
  baseFinding('vedic_parashari', 'SUPPORTIVE'),
  baseFinding('western_tropical', 'SUPPORTIVE'),
  baseFinding('panchanga_muhurta', 'NEUTRAL')
];
const resNA = AgreementEngine.calculateAgreement(findingsWithNA, ['vedic_parashari', 'western_tropical']);
assert(resNA.agreementPercent === 100, 'Non-applicable engine does not decrease agreement percentage', `${resNA.agreementPercent}%`);
assert(resNA.participatingEngines === 2, 'Only 2 eligible engines participate');

// 6. Applicability Matrix
console.log('\n--- 6. APPLICABILITY MATRIX TEST ---');
assert(EngineApplicabilityMatrix.isApplicable('vedic_parashari', 'CAREER') === true, 'Vedic is applicable to CAREER');
assert(EngineApplicabilityMatrix.isApplicable('vedic_parashari', 'NAKSHATRA') === true, 'Vedic is applicable to NAKSHATRA');
assert(EngineApplicabilityMatrix.isApplicable('western_tropical', 'NAKSHATRA') === false, 'Western is not applicable to NAKSHATRA');

// 7. Research Engine Master Synthesis
console.log('\n--- 7. RESEARCH ENGINE SYNTHESIS ---');
const master = ResearchEngine.generateMasterPrediction('When is my peak career timing?', 'CAREER', findings100);
assert(master.agreement.agreementPercent === 100, 'Master prediction contains agreement result');
assert(master.reproducibility.ephemerisVersion === 'NASA_JPL_DE440_IAU_2006', 'Stores ephemeris version');
assert(master.evidenceFactors.length > 0, 'Extracts evidence factors');

console.log(`\n============================================================`);
console.log(`🏆 ALL ${passedTests}/${totalTests} MULTI-ENGINE PREDICTION TESTS PASSED!`);
console.log(`============================================================\n`);
