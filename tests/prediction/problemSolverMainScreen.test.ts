import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ProblemIntentRouter } from '../../src/lib/prediction/problemIntentRouter';
import { MainScreenProblemSolver } from '../../src/lib/prediction/mainScreenProblemSolver';
import { NextActionEngine } from '../../src/lib/prediction/nextActionEngine';
import { UserProfile } from '../../src/types';

const MOCK_USER_PROFILE: UserProfile = {
  name: 'Tarik Islam',
  dob: '1998-02-22',
  time: '10:30',
  place: 'New Delhi, India',
  lat: 28.6139,
  lon: 77.2090,
  timezone: 'Asia/Kolkata',
  preferredSystem: 'Vedic'
};

describe('ASTRO360 Problem → Analysis → Engines → Why → Solution Test Suite', () => {

  it('Golden Case 1: Routes "My career feels stuck. When will it improve?" to CAREER stagnation and executes multi-engine analysis', async () => {
    const query = 'My career feels stuck. When will it improve?';
    const plan = ProblemIntentRouter.route(query);

    assert.strictEqual(plan.domain, 'CAREER');
    assert.strictEqual(plan.problem, 'stagnation');
    assert.strictEqual(plan.requiresChart, true);
    assert.ok(plan.relevantHouses.includes(10));
    assert.ok(plan.applicableEngines.length >= 5);

    const solved = await MainScreenProblemSolver.solve(query, MOCK_USER_PROFILE);
    assert.strictEqual(solved.executionPlan.domain, 'CAREER');
    assert.ok(solved.summary.includes('career'));
    assert.strictEqual(solved.agreement.supportiveCount, 4);
    assert.strictEqual(solved.agreement.eligibleCount, 5);
    assert.strictEqual(solved.agreement.agreementPercent, 82);
    assert.strictEqual(solved.stability.level, 'HIGH');
    assert.ok(solved.timing.window.length > 0);
    assert.ok(solved.timing.commonWindow.length > 0);
    assert.ok(solved.whyBreakdown.whatWasCalculated.length >= 3);
    assert.ok(solved.nextSteps.practicalPlaybook.length >= 3);
    assert.ok(solved.canonicalEvent.id.startsWith('pred-problem-'));
  });

  it('Golden Case 2: Routes "When is my next strong relationship period?" to LOVE timing', async () => {
    const query = 'When is my next strong relationship period?';
    const plan = ProblemIntentRouter.route(query);

    assert.strictEqual(plan.domain, 'LOVE');
    assert.ok(plan.relevantHouses.includes(7));
    assert.ok(plan.relevantPlanets.includes('Venus'));

    const solved = await MainScreenProblemSolver.solve(query, MOCK_USER_PROFILE);
    assert.strictEqual(solved.executionPlan.domain, 'LOVE');
    assert.ok(solved.engineViews.vedic.active);
    assert.ok(solved.engineViews.western.active);
    assert.ok(solved.engineViews.kp.active);
    assert.ok(solved.canonicalEvent.title.includes('LOVE'));
  });

  it('Golden Case 3: Routes "Should I move abroad?" to RELOCATION viability', async () => {
    const query = 'Should I move abroad?';
    const plan = ProblemIntentRouter.route(query);

    assert.strictEqual(plan.domain, 'RELOCATION');
    assert.strictEqual(plan.problem, 'relocation_viability');
    assert.ok(plan.relevantHouses.includes(12));
    assert.ok(plan.relevantPlanets.includes('Rahu'));

    const solved = await MainScreenProblemSolver.solve(query, MOCK_USER_PROFILE);
    assert.strictEqual(solved.executionPlan.domain, 'RELOCATION');
    assert.ok(solved.practicalView.actionItems.length >= 2);
  });

  it('NextActionEngine separates astrology timing actions from practical human agency', () => {
    const bundle = NextActionEngine.generateBundle('CAREER', 'Career stagnation', 'Sep 12 – Oct 28, 2026');
    
    assert.ok(bundle.astrologyActions.length >= 2);
    assert.ok(bundle.practicalPlaybook.length >= 3);
    assert.ok(bundle.researchActions.length >= 1);
    assert.ok(bundle.recommendedFollowUps.length >= 2);

    // Practical playbook must not promise astrology caused the action
    const allPracticalText = bundle.practicalPlaybook.join(' ');
    assert.ok(!allPracticalText.includes('guarantee success'));
    assert.ok(allPracticalText.includes('Audit') || allPracticalText.includes('portfolio') || allPracticalText.includes('networking'));
  });

  it('Validates 5-Tradition Engine Views structure and contributions', async () => {
    const solved = await MainScreenProblemSolver.solve('When are my strongest financial timing cycles?', MOCK_USER_PROFILE);
    
    const engines = solved.engineViews;
    assert.strictEqual(engines.vedic.statusIcon, '✓');
    assert.strictEqual(engines.western.statusIcon, '✓');
    assert.strictEqual(engines.kp.statusIcon, '✓');
    assert.strictEqual(engines.jaimini.statusIcon, '✓');
    assert.strictEqual(engines.tajika.statusIcon, '~'); // Mixed
    
    assert.ok(engines.vedic.techniques.includes('Vimshottari Dasha'));
    assert.ok(engines.western.techniques.includes('Secondary Progressions'));
    assert.ok(engines.kp.techniques.includes('Placidus House Cusps'));
  });

});
