import { describe, it } from 'node:test';
import assert from 'node:assert';
import { AstroCalculationContext } from '../../src/lib/prediction/astroCalculationContext';
import { MainScreenProblemSolver } from '../../src/lib/prediction/mainScreenProblemSolver';
import { ConvergenceEngine, SystemFindingInput } from '../../src/lib/prediction/convergenceEngine';
import { calculatePlanetaryPositions } from '../../src/lib/astroCalculations';
import { UserProfile } from '../../src/types';

describe('ASTRO360 Property-Based, Chaos Resilience & Race-Condition Test Suite', () => {

  it('Property Test: Normalized planetary degrees across 200 years (1850–2050) are valid and non-NaN', () => {
    const testYears = [1850, 1900, 1947, 1970, 1998, 2000, 2024, 2026, 2050];
    
    testYears.forEach(year => {
      const dob = `${year}-06-15`;
      const positions = calculatePlanetaryPositions(dob, '12:00', undefined, 28.6139, 77.2090);
      
      assert.ok(positions.length >= 7, `Year ${year} should return all primary planets`);
      positions.forEach(p => {
        assert.ok(!isNaN(p.degreeDecimal), `Planet ${p.name} degreeDecimal should not be NaN for year ${year}`);
        assert.ok(p.degreeDecimal >= 0 && p.degreeDecimal < 360, `Planet ${p.name} degree should be in [0, 360), got ${p.degreeDecimal}`);
        assert.ok(p.sign && p.sign.length > 0, `Planet ${p.name} should have a valid zodiac sign`);
      });
    });
  });

  it('Resilience Test: Missing birth time gracefully defaults without crashing', async () => {
    const noTimeProfile: UserProfile = {
      name: 'Seeker Without Time',
      dob: '1995-10-10',
      time: '', // Missing time
      place: 'London, UK',
      lat: 51.5074,
      lon: -0.1278
    };

    const solved = await MainScreenProblemSolver.solve('When is my next relationship window?', noTimeProfile);
    assert.strictEqual(solved.chartContext.hasBirthTime, false);
    assert.ok(solved.summary.length > 0);
    assert.ok(solved.timing.window.length > 0);
    assert.strictEqual(solved.agreement.agreementPercent, 82);
  });

  it('Chaos Test: Partial engine failure excludes failed engine from agreement denominator', () => {
    const mixedFindings: SystemFindingInput[] = [
      { system: 'vedic', supportsDirection: true, eventIdentified: 'Growth', startDate: '2026-09-12', endDate: '2026-10-28', strength: 'High', weight: 1.0 },
      { system: 'western', supportsDirection: true, eventIdentified: 'Growth', startDate: '2026-09-18', endDate: '2026-10-25', strength: 'High', weight: 1.0 },
      { system: 'kp', supportsDirection: true, eventIdentified: 'Growth', startDate: '2026-09-15', endDate: '2026-10-20', strength: 'High', weight: 1.0 },
      { system: 'jaimini', supportsDirection: true, eventIdentified: 'Growth', startDate: '2026-09-20', endDate: '2026-11-10', strength: 'Moderate', weight: 1.0 },
      { system: 'tajika', supportsDirection: false, eventIdentified: '', startDate: '', endDate: '', strength: 'Low', weight: 0.0 }, // FAILED / Weight 0
    ];

    const result = ConvergenceEngine.evaluate(mixedFindings);
    // 4 supportive out of 4 eligible (excluding weight 0) -> 100% agreement
    assert.strictEqual(result.eligibleCount, 4);
    assert.strictEqual(result.supportiveCount, 4);
    assert.strictEqual(result.directionAgreementPercent, 100);
  });

  it('Concurrency Race Test: Rapid query typing handles multiple requests safely', async () => {
    const profile: UserProfile = {
      name: 'Tarik',
      dob: '1998-02-22',
      time: '10:30',
      place: 'New Delhi',
      lat: 28.6139,
      lon: 77.2090
    };

    const queries = [
      'My career feels stuck.',
      'When is my next relationship window?',
      'Should I move abroad?',
      'When is an auspicious business launch date?'
    ];

    // Fire all concurrently
    const results = await Promise.all(
      queries.map(q => MainScreenProblemSolver.solve(q, profile))
    );

    assert.strictEqual(results.length, 4);
    assert.strictEqual(results[0].executionPlan.domain, 'CAREER');
    assert.strictEqual(results[1].executionPlan.domain, 'LOVE');
    assert.strictEqual(results[2].executionPlan.domain, 'RELOCATION');
    assert.strictEqual(results[3].executionPlan.domain, 'BUSINESS');
  });

});
