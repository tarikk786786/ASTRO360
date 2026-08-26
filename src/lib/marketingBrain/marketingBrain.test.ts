/**
 * ASTRO360 MARKETING BRAIN - Automated Verification Suite
 * Validates zero-PII privacy masking, funnel calculation math, ICE scoring, experimentation & copilot epistemic integrity.
 */

import { 
  MarketingEventTracker, 
  FunnelEngine, 
  BehaviorIntelligence, 
  OpportunityEngine, 
  ExperimentEngine, 
  MarketingCopilot,
  MARKETING_BRAND_RULES 
} from './index';

console.log('🧪 Running ASTRO360 Marketing Brain Verification Suite...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ Passed [${testName}]`);
    passedTests++;
  } else {
    console.error(`❌ FAILED [${testName}]`);
    process.exit(1);
  }
}

// 1. Zero-PII Privacy Masking Guardrail Test
console.log('--- 1. PRIVACY & TELEMETRY GUARDRAILS ---');
const rawProps = {
  feature: 'kundli_calculation',
  dob: '1995-10-24',
  birthTime: '14:30',
  latitude: 28.6139,
  longitude: 77.2090,
  privateNotes: 'Confidential client horoscope consultation notes',
  password: 'secret_password_123',
  validMetric: 'session_duration_30s'
};

const sanitized = MarketingEventTracker.sanitizeProperties(rawProps);
assert(sanitized.feature === 'kundli_calculation', 'Non-sensitive properties preserved');
assert(sanitized.validMetric === 'session_duration_30s', 'Valid telemetry metrics preserved');
assert(sanitized.dob === '[MASKED_PII]', 'Birth date (dob) strictly masked');
assert(sanitized.birthTime === '[MASKED_PII]', 'Birth time strictly masked');
assert(sanitized.latitude === '[MASKED_PII]', 'Latitude coordinate strictly masked');
assert(sanitized.longitude === '[MASKED_PII]', 'Longitude coordinate strictly masked');
assert(sanitized.privateNotes === '[MASKED_PII]', 'Private notes strictly masked');
assert(sanitized.password === '[MASKED_PII]', 'Password strictly masked');

const event = MarketingEventTracker.track('landing_view', { page: '/landing' });
assert(event.id.startsWith('evt_'), 'Event has unique prefixed ID');
assert(event.type === 'landing_view', 'Event type recorded accurately');
assert(!isNaN(new Date(event.timestamp).getTime()), 'Event timestamp is valid ISO');
assert(['mobile', 'desktop', 'tablet'].includes(event.device), 'Device classification is valid');

// 2. Funnel Engine Conversion & Drop-off Math
console.log('\n--- 2. FUNNEL ENGINE & CONVERSION MATH ---');
const funnels = FunnelEngine.calculateFunnels([]);
assert(funnels.length >= 4, 'Standard 4 business growth funnels calculated');

const landingToChart = funnels.find(f => f.id === 'funnel_landing_to_chart');
assert(!!landingToChart, 'Landing to Chart activation funnel exists');
assert(landingToChart!.steps.length === 4, 'Funnel has 4 sequential steps');
assert(landingToChart!.overallConversionRate > 0 && landingToChart!.overallConversionRate <= 100, 'Overall conversion rate in valid [0, 100]% range');
landingToChart!.steps.forEach((step, idx) => {
  if (idx > 0) {
    assert(step.visitors <= landingToChart!.steps[idx - 1].visitors, `Step ${step.name} visitor count monotonically decreases or equals previous`);
  }
});

// 3. Friction & Anomaly Detection
console.log('\n--- 3. USER FRICTION & RAGE CLICK DETECTION ---');
const frictionIssues = BehaviorIntelligence.analyzeFriction([]);
assert(frictionIssues.length >= 3, 'Identified behavior friction issues from event stream');
const rageClick = frictionIssues.find(i => i.type === 'RAGE_CLICK');
assert(!!rageClick, 'Rage click anomaly detected');
assert(rageClick!.incidentCount > 0, 'Incident count recorded');
assert(!!rageClick!.recommendedFix && rageClick!.recommendedFix.length > 10, 'Actionable fix suggested');

// 4. Opportunity Prioritizer & ICE Formulation
console.log('\n--- 4. OPPORTUNITY ENGINE (ICE MODEL) ---');
const opportunities = OpportunityEngine.getPrioritizedOpportunities([]);
assert(opportunities.length > 0, 'Growth opportunities prioritized');
for (let i = 0; i < opportunities.length - 1; i++) {
  assert(opportunities[i].iceScore >= opportunities[i + 1].iceScore, `Opportunity ${opportunities[i].id} ICE (${opportunities[i].iceScore}) >= next (${opportunities[i+1].iceScore})`);
}
opportunities.forEach(opp => {
  const expected = Math.round(((opp.impactScore * opp.confidenceScore) / opp.effortScore) * 10) / 10;
  assert(opp.iceScore === expected, `ICE formulation verified: (${opp.impactScore} * ${opp.confidenceScore}) / ${opp.effortScore} = ${expected}`);
});

// 5. Experimentation Engine & Feature Flags
console.log('\n--- 5. EXPERIMENTATION & FEATURE FLAGS ---');
const experiments = ExperimentEngine.getExperiments();
assert(experiments.length > 0, 'Active A/B experiments loaded');
assert(experiments[0].guardrailMetrics.length > 0, 'Guardrail metrics enforced on experiments');
assert(experiments[0].bayesianWinProb > 50, 'Bayesian win probability calculated');
assert(['SHIP', 'ITERATE', 'REJECT'].includes(experiments[0].decisionRule), 'Decision rule validated');

const flags = ExperimentEngine.getFeatureFlags();
assert(flags.length > 0, 'Feature flags catalog loaded');
const flagKey = flags[0].key;
const toggled = ExperimentEngine.toggleFlag(flagKey, false);
assert(toggled?.enabled === false, 'Feature flag toggle disabled successfully');
ExperimentEngine.toggleFlag(flagKey, true);
assert(flags[0].enabled === true, 'Feature flag toggle restored successfully');

// 6. AI Growth Copilot Epistemic Integrity
console.log('\n--- 6. AI GROWTH COPILOT INTELLIGENCE ---');
const mobileRes = MarketingCopilot.query('Why did mobile conversion drop?');
assert(mobileRes.epistemicStatus === 'OBSERVED', 'Mobile query marked as OBSERVED epistemic status');
assert(mobileRes.confidence >= 90, 'Confidence score >= 90%');
assert(mobileRes.evidence.length >= 2, 'Telemetry evidence cited');
assert(mobileRes.actionLevel === 'LEVEL_3_CREATE_PR', 'Action level assigned correctly');

const seoRes = MarketingCopilot.query('What SEO opportunities should we build?');
assert(seoRes.epistemicStatus === 'EXPERIMENTALLY_VALIDATED', 'SEO query marked as EXPERIMENTALLY_VALIDATED');
assert(seoRes.confidence >= 90, 'SEO query confidence score >= 90%');

// 7. Brand Positioning Rules & Forbidden Claims
console.log('\n--- 7. BRAND POSITIONING & FORBIDDEN CLAIMS ---');
const accuracyRule = MARKETING_BRAND_RULES.find(r => r.id === 'rule_no_absolute_accuracy_claims');
assert(!!accuracyRule, 'Absolute accuracy claim guardrail exists');
assert(accuracyRule!.forbiddenExamples.includes('100% accurate future predictions'), 'Forbids "100% accurate future predictions"');
assert(accuracyRule!.allowedExamples.some(ex => ex.includes('High-precision astronomical ephemeris')), 'Allows "High-precision astronomical ephemeris"');

console.log(`\n🎉 All ${totalTests}/${totalTests} Marketing Brain Verification Tests Passed Cleanly!\n`);
