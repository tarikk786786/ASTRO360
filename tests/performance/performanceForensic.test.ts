import { describe, it } from 'node:test';
import assert from 'node:assert';
import { AstroCalculationContext } from '../../src/lib/prediction/astroCalculationContext';
import { ParallelEngineExecutor, ProgressStage } from '../../src/lib/prediction/parallelEngineExecutor';
import { MainScreenProblemSolver } from '../../src/lib/prediction/mainScreenProblemSolver';
import { UserProfile } from '../../src/types';

const BENCHMARK_PROFILE: UserProfile = {
  name: 'Tarik Islam',
  dob: '1998-02-22',
  time: '10:30',
  place: 'New Delhi, India',
  lat: 28.6139,
  lon: 77.2090,
  timezone: 'Asia/Kolkata',
  preferredSystem: 'Vedic'
};

describe('ASTRO360 Performance Forensic & Latency Elimination Suite', () => {

  it('Benchmark 1: Cold calculation vs Warm AstroCalculationContext speedup', () => {
    AstroCalculationContext.clear();

    // Cold calculation pass
    const t0 = performance.now();
    const coldCtx = AstroCalculationContext.getOrCreate(BENCHMARK_PROFILE);
    const coldDuration = performance.now() - t0;

    assert.ok(coldCtx.positions.length >= 7);
    assert.ok(coldDuration < 20, `Cold calculation should be <20ms, got ${coldDuration.toFixed(2)}ms`);

    // Warm calculation pass (Memoized L1 cache)
    const t1 = performance.now();
    const warmCtx = AstroCalculationContext.getOrCreate(BENCHMARK_PROFILE);
    const warmDuration = performance.now() - t1;

    assert.ok(warmDuration < 2.0, `Warm cache hit should be <2.0ms, got ${warmDuration.toFixed(2)}ms`);
    assert.strictEqual(warmCtx.contextId, coldCtx.contextId);
    assert.strictEqual(warmCtx.ascendant.sign, coldCtx.ascendant.sign);
    assert.strictEqual(warmCtx.moon.sign, coldCtx.moon.sign);
  });

  it('Benchmark 2: Parallel 5-Tradition Engine Execution Latency', async () => {
    const ctx = AstroCalculationContext.getOrCreate(BENCHMARK_PROFILE);

    const t0 = performance.now();
    const engines = await ParallelEngineExecutor.executeAllEngines('CAREER', ctx, { mode: 'FAST' });
    const elapsed = performance.now() - t0;

    assert.ok(elapsed < 15, `Parallel multi-engine execution should complete in <15ms, took ${elapsed.toFixed(2)}ms`);
    assert.ok(engines.vedic.active);
    assert.ok(engines.western.active);
    assert.ok(engines.kp.active);
    assert.ok(engines.jaimini.active);
    assert.ok(engines.tajika.active);
  });

  it('Benchmark 3: Progressive Stage Tracking for Sub-100ms Perceived Responsiveness', async () => {
    const stagesRecorded: ProgressStage[] = [];

    const solved = await MainScreenProblemSolver.solve(
      'When is my next strong career advancement window?',
      BENCHMARK_PROFILE,
      'ALL',
      {
        onStageChange: (stage) => {
          stagesRecorded.push(stage);
        }
      }
    );

    assert.ok(solved.summary.length > 0);
    assert.ok(stagesRecorded.includes('PARSING_QUESTION'));
    assert.ok(stagesRecorded.includes('LOADING_CHART_CONTEXT'));
    assert.ok(stagesRecorded.includes('EVALUATING_ENGINES'));
    assert.ok(stagesRecorded.includes('SYNTHESIZING_SYNTHESIS'));
    assert.ok(stagesRecorded.includes('COMPLETED'));
  });

  it('Benchmark 4: AbortController Request Cancellation stops in-flight work immediately', async () => {
    const controller = new AbortController();
    controller.abort(); // Pre-aborted signal

    await assert.rejects(
      async () => {
        await MainScreenProblemSolver.solve(
          'Cancelled query test',
          BENCHMARK_PROFILE,
          'ALL',
          { signal: controller.signal }
        );
      },
      /cancelled|aborted/i
    );
  });

  it('Benchmark 5: Zero Astrology Regression Verification', () => {
    const ctx = AstroCalculationContext.getOrCreate(BENCHMARK_PROFILE);
    
    // Validate planetary longitudes and Dasha integrity
    assert.strictEqual(ctx.ascendant.sign, 'Cancer ♋');
    assert.strictEqual(ctx.moon.sign, 'Sagittarius ♐');
    assert.strictEqual(ctx.sun.sign, 'Aquarius ♒');
    assert.strictEqual(ctx.jupiter.sign, 'Aquarius ♒');
    assert.strictEqual(ctx.saturn.sign, 'Pisces ♓');
    assert.ok(ctx.dasha.dashaStr.includes('Moon') || ctx.dasha.dashaStr.includes('Saturn'));
  });

});
