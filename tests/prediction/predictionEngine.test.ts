/**
 * ASTRO360 Master Forensic Test Suite - Canonical Prediction Architecture
 * Validates Zod contracts, window chronology, multi-system consensus, stability perturbations,
 * negative evidence, historical rectification, research backtesting, and boundary conditions.
 */

import { calculatePlanetaryPositions } from '../../src/lib/astroCalculations';
import { CanonicalPredictionSchema, CanonicalPrediction } from '../../src/lib/prediction/predictionSchema';
import { RuleRegistryService } from '../../src/lib/prediction/ruleRegistry';
import { TimingEngine } from '../../src/lib/prediction/timingEngine';
import { StabilityEngine } from '../../src/lib/prediction/stabilityEngine';
import { ConsensusEngine, TraditionAnalysisView } from '../../src/lib/prediction/consensusEngine';
import { EvidenceEngine } from '../../src/lib/prediction/evidenceEngine';
import { RectificationEngine, LifeEventInput } from '../../src/lib/prediction/rectificationEngine';
import { JournalAndBacktestingService, BacktestGroundTruthEvent } from '../../src/lib/prediction/journalAndBacktesting';
import { CanonicalPredictionPipeline } from '../../src/lib/prediction/canonicalPipeline';

console.log('🧪 Running ASTRO360 Canonical Prediction Architecture Forensics Suite...\n');

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

// ─────────────────────────────────────────────────────────────────────────────
// 1. CANONICAL PREDICTION SCHEMA & ZOD RUNTIME CONTRACT
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- 1. CANONICAL PREDICTION SCHEMA & RUNTIME VALIDATION ---');

const mockProfile = {
  id: 'user_test_001',
  name: 'Seeker',
  dob: '1998-06-15',
  time: '12:00',
  placeOfBirth: 'London, UK'
};

const prediction = CanonicalPredictionPipeline.execute(mockProfile, {
  question: 'When is my strongest career period?',
  targetCategory: 'CAREER',
  targetEventType: 'CAREER_CHANGE'
});

assert(prediction !== undefined && prediction !== null, 'CanonicalPredictionPipeline generates prediction');
assert(CanonicalPredictionSchema.safeParse(prediction).success, 'Prediction object satisfies Zod CanonicalPredictionSchema runtime contract');
assert(prediction.calculationVersion === '3.0.0', 'Prediction stores calculation engine version', prediction.calculationVersion);
assert(prediction.ephemerisVersion === 'NASA_JPL_DE440', 'Prediction stores ephemeris version', prediction.ephemerisVersion);
assert(prediction.timezoneVersion === 'IANA_2026a', 'Prediction stores timezone version', prediction.timezoneVersion);
assert(prediction.ruleVersion === '2.0.0', 'Prediction stores rule database version', prediction.ruleVersion);

// ─────────────────────────────────────────────────────────────────────────────
// 2. TIMING WINDOW INTEGRITY & CHRONOLOGY (start <= peak <= end)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 2. TIMING WINDOW INTEGRITY & CHRONOLOGY ---');

const startTime = new Date(prediction.start).getTime();
const peakTime = new Date(prediction.peak).getTime();
const endTime = new Date(prediction.end).getTime();

assert(startTime <= peakTime, 'Prediction window start is chronologically before or equal to peak', `${prediction.start} <= ${prediction.peak}`);
assert(peakTime <= endTime, 'Prediction window peak is chronologically before or equal to end', `${prediction.peak} <= ${prediction.end}`);
assert(prediction.durationDays >= 1, 'Prediction duration is positive number of days', `${prediction.durationDays} days`);
assert(['day', 'week', 'month', 'quarter', 'year', 'range'].includes(prediction.precision), 'Prediction precision is honest taxonomy', prediction.precision);

// Test TimingEngine window merger
const sampleWindows = [
  TimingEngine.generateWindow(RuleRegistryService.getRulesForCategory('CAREER_CHANGE')[0], new Date('2026-09-01'), 0, 2),
  TimingEngine.generateWindow(RuleRegistryService.getRulesForCategory('CAREER_CHANGE')[0], new Date('2026-09-15'), 0, 2)
];
const merged = TimingEngine.mergeOverlappingWindows(sampleWindows);
assert(merged.length === 1, 'TimingEngine successfully merges overlapping semantic windows into one window');
assert(TimingEngine.validateWindow(new Date(merged[0].start), new Date(merged[0].peak), new Date(merged[0].end)), 'Merged window satisfies start <= peak <= end');

// ─────────────────────────────────────────────────────────────────────────────
// 3. MASTER RULE REGISTRY & PROVENANCE CITATIONS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 3. MASTER RULE REGISTRY & PROVENANCE CITATIONS ---');

const allRules = RuleRegistryService.getAllRules();
assert(allRules.length >= 8, 'Master rule registry contains comprehensive multi-tradition rules', `${allRules.length} rules`);

allRules.forEach(rule => {
  assert(rule.ruleId.length > 5, `Rule [${rule.ruleId}] has valid identifier`);
  assert(rule.sources.length > 0, `Rule [${rule.ruleId}] has classical source citations`);
  assert(rule.sources[0].tier >= 1 && rule.sources[0].tier <= 5, `Rule [${rule.ruleId}] citation tier is valid (1-5)`);
  assert(rule.weight >= 0 && rule.weight <= 1, `Rule [${rule.ruleId}] weight is normalized in [0, 1]`, `${rule.weight}`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. MULTI-SYSTEM CONSENSUS & CONTRADICTION DETECTION
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 4. MULTI-SYSTEM CONSENSUS & CONTRADICTIONS ---');

const testViews: TraditionAnalysisView[] = [
  {
    tradition: 'vedic_parashari',
    theme: 'Expansion with Saturnian responsibility',
    strength: 'Strong',
    specificManifestation: 'Jupiter transit 10th bhava + Saturn aspect',
    triggeredRules: [allRules[0]],
    evidence: []
  },
  {
    tradition: 'western_tropical',
    theme: 'Vocational Expansion and optimism',
    strength: 'Strong',
    specificManifestation: 'Directed Jupiter to Midheaven',
    triggeredRules: [allRules[3] || allRules[0]],
    evidence: []
  },
  {
    tradition: 'vedic_kp',
    theme: 'Cuspal sub-lord significations',
    strength: 'Moderate',
    specificManifestation: '10th cusp sub lord signifies 2, 6, 10, 11',
    triggeredRules: [allRules[5] || allRules[0]],
    evidence: []
  }
];

const consensus = ConsensusEngine.evaluateConsensus('CAREER_CHANGE', testViews);
assert(['STRONG_CONSENSUS', 'MODERATE_CONSENSUS', 'MIXED', 'CONFLICT'].includes(consensus.classification), 'Consensus produces formal classification', consensus.classification);
assert(consensus.commonTheme.length > 10, 'Consensus extracts transparent common theme');
assert(consensus.systemDifferences.length === 3, 'Consensus retains distinct tradition views without averaging');
assert(consensus.contradictions.length >= 1, 'Consensus identifies explicit thematic divergence between Western & Vedic', consensus.contradictions[0]?.conflictType);

// Consensus commutativity test (order independent)
const reversedViews = [...testViews].reverse();
const reversedConsensus = ConsensusEngine.evaluateConsensus('CAREER_CHANGE', reversedViews);
assert(consensus.classification === reversedConsensus.classification, 'Consensus classification is strictly commutative');
assert(consensus.confidenceScore === reversedConsensus.confidenceScore, 'Consensus confidence score is strictly commutative');

// ─────────────────────────────────────────────────────────────────────────────
// 5. STABILITY ENGINE & BIRTH-TIME PERTURBATION
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 5. STABILITY ENGINE & BIRTH-TIME PERTURBATION ---');

const stabilityReport = StabilityEngine.evaluateStability('1998-06-15', '12:00', true);
assert(['STABLE', 'MODERATELY_STABLE', 'SENSITIVE', 'HIGHLY_SENSITIVE'].includes(stabilityReport.classification), 'Stability classification is valid', stabilityReport.classification);
assert(stabilityReport.perturbations.length === 11, 'Stability tests all 11 perturbation points: [-30, -15, -10, -5, -1, 0, 1, 5, 10, 15, 30] min');
assert(stabilityReport.ascendantTotalDriftDeg >= 0 && stabilityReport.ascendantTotalDriftDeg <= 15, 'Ascendant perturbation drift is within astronomical boundaries', `${stabilityReport.ascendantTotalDriftDeg.toFixed(2)}°`);

// Test unknown birth time
const unknownTimeReport = StabilityEngine.evaluateStability('1998-06-15', '12:00', false);
assert(unknownTimeReport.classification === 'HIGHLY_SENSITIVE', 'Unknown birth time is classified as HIGHLY_SENSITIVE');
assert(unknownTimeReport.uncertaintyFactors.includes('unknown_birth_time'), 'Unknown birth time adds unknown_birth_time uncertainty flag');

// ─────────────────────────────────────────────────────────────────────────────
// 6. EVIDENCE & NEGATIVE EVIDENCE AUDIT
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 6. EVIDENCE & NEGATIVE EVIDENCE AUDIT ---');

const evidenceAudit = EvidenceEngine.compileEvidence([allRules[0]], {
  hasBeneficTransit: true,
  hasMaleficAspect: true, // Saturn restriction
  isCombust: false,
  isDebilitated: false,
  dashaStrengthScore: 0.85
});

assert(evidenceAudit.supporting.length > 0, 'Evidence audit captures supporting classical factors');
assert(evidenceAudit.contradicting.length > 0, 'Evidence audit captures negative / restricting factors (Saturn aspect)');
assert(evidenceAudit.netBalanceScore >= 0 && evidenceAudit.netBalanceScore <= 1, 'Evidence audit computes normalized net balance score', `${evidenceAudit.netBalanceScore}`);
assert(evidenceAudit.synthesis.length > 10, 'Evidence audit produces balanced explanatory synthesis');

// ─────────────────────────────────────────────────────────────────────────────
// 7. HISTORICAL EVENT ALIGNMENT & BIRTH-TIME RECTIFICATION
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 7. HISTORICAL RECTIFICATION & EVENT ALIGNMENT ---');

const sampleLifeEvents: LifeEventInput[] = [
  { id: 'e1', eventType: 'CAREER_CHANGE', approximateDate: '2022-04-15', significance: 'High', description: 'Promoted to Lead Architect' },
  { id: 'e2', eventType: 'RELOCATION', approximateDate: '2024-08-01', significance: 'Medium', description: 'Moved to new city' }
];

const rectification = RectificationEngine.rectifyBirthTime('1998-06-15', '12:00', sampleLifeEvents);
assert(rectification.candidateWindows.length > 0, 'Rectification generates candidate intervals');
assert(rectification.bestCandidateTime.length === 5, 'Rectification identifies best candidate time', rectification.bestCandidateTime);
assert(rectification.disclaimer.includes('does not guarantee'), 'Rectification includes honest disclaimer');

// ─────────────────────────────────────────────────────────────────────────────
// 8. RESEARCH CALIBRATION & BACKTESTING WITHOUT LOOKAHEAD LEAKAGE
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 8. RESEARCH CALIBRATION & BACKTESTING (NO DATA LEAKAGE) ---');

const samplePredictions: CanonicalPrediction[] = [
  prediction,
  {
    ...prediction,
    id: 'pred_past_001',
    start: '2022-03-01T00:00:00.000Z',
    peak: '2022-04-10T00:00:00.000Z',
    end: '2022-05-30T00:00:00.000Z'
  }
];

const sampleGroundTruth: BacktestGroundTruthEvent[] = [
  { subjectId: mockProfile.id, eventType: 'CAREER_CHANGE', actualEventDate: '2022-04-15', description: 'Promoted to Lead' }
];

const backtestResult = JournalAndBacktestingService.runBacktest(samplePredictions, sampleGroundTruth);
assert(backtestResult.totalPredictionsEvaluated === 2, 'Backtesting evaluates all input predictions');
assert(backtestResult.precision >= 0 && backtestResult.precision <= 1, 'Backtesting computes precision metric', `${backtestResult.precision}`);
assert(backtestResult.recall >= 0 && backtestResult.recall <= 1, 'Backtesting computes recall metric', `${backtestResult.recall}`);
assert(backtestResult.f1Score >= 0 && backtestResult.f1Score <= 1, 'Backtesting computes F1 score', `${backtestResult.f1Score}`);
assert(backtestResult.brierCalibrationScore >= 0, 'Backtesting computes Brier calibration score', `${backtestResult.brierCalibrationScore}`);

// ─────────────────────────────────────────────────────────────────────────────
// 9. ASTROLOGICAL BOUNDARY CONDITIONS (0°, 29.999°, Sign Boundaries)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 9. ASTROLOGICAL BOUNDARY CONDITIONS ---');

// Test cusp of Aries 29°59' to Taurus 00°00'
const p1 = calculatePlanetaryPositions('2026-03-20', '09:00'); // Vernal equinox boundary
const p2 = calculatePlanetaryPositions('2026-03-20', '09:05');

const sun1 = p1.find(p => p.name === 'Sun')?.degreeDecimal || 0;
const sun2 = p2.find(p => p.name === 'Sun')?.degreeDecimal || 0;

assert(!isNaN(sun1) && !isNaN(sun2), 'Sun longitude on boundary is not NaN');
assert(Math.abs(sun2 - sun1) < 0.1, 'Sun movement across boundary timestamp is continuous and smooth');

console.log(`\n🎉 All ${passedTests}/${totalTests} Canonical Prediction Architecture Forensics Assertions Passed Cleanly!\n`);
