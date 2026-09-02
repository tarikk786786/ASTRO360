import { describe, it } from 'node:test';
import assert from 'node:assert';
import { CurrentThemeEngine } from '../../src/lib/prediction/currentThemeEngine';
import { ConvergenceEngine, SystemFindingInput } from '../../src/lib/prediction/convergenceEngine';
import { ConflictEngine } from '../../src/lib/prediction/conflictEngine';
import { WhyEngine } from '../../src/lib/prediction/whyEngine';
import { PredictionDiffEngine } from '../../src/lib/prediction/predictionDiffEngine';
import { AstrologyJournalEngine } from '../../src/lib/prediction/astrologyJournalEngine';
import { UserProfile } from '../../src/types';

const MOCK_PROFILE: UserProfile = {
  name: 'Tarik Islam',
  dob: '1998-02-22',
  time: '10:30',
  place: 'New Delhi, India',
  lat: 28.6139,
  lon: 77.2090,
  timezone: 'Asia/Kolkata',
  preferredSystem: 'Vedic'
};

describe('ASTRO360 Personal Daily Astrology Intelligence Test Suite', () => {

  it('CurrentThemeEngine generates dynamically ranked daily themes with astronomical why reasons', () => {
    const briefing = CurrentThemeEngine.evaluateToday(MOCK_PROFILE);

    assert.ok(briefing.dateStr.length > 0);
    assert.ok(briefing.rankedThemes.length >= 5);
    assert.strictEqual(briefing.mainTheme.activityLevel, 'Elevated');
    assert.ok(briefing.mainTheme.whyReason.includes('Midheaven') || briefing.mainTheme.whyReason.includes('Dasha'));
    assert.ok(briefing.mainTheme.auspiciousHours.length > 0);

    // Verify themes are sorted in descending order of activityScore
    for (let i = 0; i < briefing.rankedThemes.length - 1; i++) {
      assert.ok(briefing.rankedThemes[i].activityScore >= briefing.rankedThemes[i + 1].activityScore);
    }
  });

  it('ConvergenceEngine computes separate Direction, Event, Timing, and Strength Agreement metrics', () => {
    const mockFindings: SystemFindingInput[] = [
      { system: 'vedic', supportsDirection: true, eventIdentified: 'Career Activation', startDate: '2026-09-12', endDate: '2026-10-28', strength: 'High', weight: 1.0 },
      { system: 'western', supportsDirection: true, eventIdentified: 'Career Activation', startDate: '2026-09-18', endDate: '2026-10-25', strength: 'High', weight: 1.0 },
      { system: 'kp', supportsDirection: true, eventIdentified: 'Career Activation', startDate: '2026-09-15', endDate: '2026-10-20', strength: 'High', weight: 1.0 },
      { system: 'jaimini', supportsDirection: true, eventIdentified: 'Career Activation', startDate: '2026-09-20', endDate: '2026-11-10', strength: 'Moderate', weight: 1.0 },
      { system: 'tajika', supportsDirection: false, eventIdentified: 'Career Delay', startDate: '2026-10-01', endDate: '2026-11-15', strength: 'Moderate', weight: 0.8 },
    ];

    const result = ConvergenceEngine.evaluate(mockFindings);

    assert.strictEqual(result.directionAgreementPercent, 80);
    assert.strictEqual(result.supportiveCount, 4);
    assert.strictEqual(result.eligibleCount, 5);
    assert.strictEqual(result.commonTimingWindow.hasCommonWindow, true);
    assert.ok(result.commonTimingWindow.label.includes('Sep 20'));
    assert.ok(result.nonProbabilityNotice.includes('NOT event probability'));
  });

  it('ConflictEngine detects and explains discrepancies between traditions', () => {
    const conflicts = ConflictEngine.analyzeConflicts('CAREER');
    
    assert.ok(conflicts.length >= 2);
    const timingConflict = conflicts.find(c => c.dimension === 'TIMING_ONSET');
    assert.ok(timingConflict);
    assert.strictEqual(timingConflict?.systemA, 'Vedic Parashari');
    assert.strictEqual(timingConflict?.systemB, 'Tajika Varshaphala');
    assert.ok(timingConflict?.explanation.length > 0);
    assert.ok(timingConflict?.reconciliation.length > 0);
  });

  it('WhyEngine creates comprehensive explainable provenance without hidden AI hallucinations', () => {
    const whyCard = WhyEngine.generateWhy('CAREER', 'Tarik Islam', 'Libra ♎');

    assert.ok(whyCard.whatWasCalculated.length >= 4);
    assert.ok(whyCard.whichTechniques.length >= 4);
    assert.ok(whyCard.whichRules.length >= 2);
    assert.ok(whyCard.whichEnginesAgreed.length >= 4);
    assert.ok(whyCard.whichEnginesDisagreed.length >= 1);
    assert.ok(whyCard.whatMakesThisLessCertain.length >= 2);
    assert.ok(whyCard.whatYouCanControl.length >= 2);
  });

  it('PredictionDiffEngine returns calculated ephemeris differences since last visit', () => {
    const diffs = PredictionDiffEngine.computeDiffs();

    assert.ok(diffs.length >= 3);
    const careerDiff = diffs.find(d => d.domain === 'Career');
    assert.ok(careerDiff);
    assert.strictEqual(careerDiff?.changeType, 'AGREEMENT_INCREASED');
    assert.strictEqual(careerDiff?.currentValue, '82% Direction Agreement');
  });

  it('AstrologyJournalEngine logs predictions, outcome feedback and historical cycle similarities', () => {
    const newEntry = AstrologyJournalEngine.addEntry(
      'Should I launch my venture in October?',
      'BUSINESS',
      'Oct 15 – Dec 10, 2026',
      80,
      'High'
    );

    assert.ok(newEntry.id.startsWith('j-'));
    assert.strictEqual(newEntry.domain, 'BUSINESS');

    // Record outcome
    AstrologyJournalEngine.recordOutcome(newEntry.id, 'YES', 'Successfully incorporated and signed first client.');
    const entries = AstrologyJournalEngine.getEntries();
    const updated = entries.find(e => e.id === newEntry.id);
    assert.strictEqual(updated?.outcome, 'YES');
    assert.strictEqual(updated?.userNotes, 'Successfully incorporated and signed first client.');
  });

});
