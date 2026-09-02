import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AstrologyIntentRouter } from '../../src/ai/router/astrologyIntentRouter';
import { PersonalProblemAnalyzer } from '../../src/ai/solver/personalProblemAnalyzer';
import { AstrologyToolRegistry } from '../../src/ai/tools/astrologyToolRegistry';
import { AskApiHandler } from '../../src/ai/api/askApiHandler';
import { HealthApiHandler } from '../../src/ai/api/healthApiHandler';
import type { UserProfile } from '../../src/types';

const mockProfile: UserProfile = {
  name: 'Tarik Islam',
  dob: '1998-02-22',
  time: '12:00',
  place: 'New Delhi, India',
  lat: 28.6139,
  lon: 77.2090,
  timezone: 'Asia/Kolkata',
  preferredSystem: 'Vedic'
};

describe('ASTRO360 Ask & AI Astrology Evaluation Suite', () => {

  describe('1. The 10 Required Canonical Questions', () => {
    
    it('Q1: "What is my ascendant?" -> NATAL_FACT with ASTROCORE calculation', async () => {
      const route = AstrologyIntentRouter.route('What is my ascendant?');
      assert.equal(route.intent, 'NATAL_FACT');
      assert.equal(route.responseMode, 'SIMPLE_FACT');

      const res = await PersonalProblemAnalyzer.analyze('What is my ascendant?', mockProfile);
      assert.ok(res.summary.includes('Ascendant'));
      assert.equal(res.agreement.agreementPercent, 100);
      assert.ok(res.astrologyView.chartFactors.length > 0);
    });

    it('Q2: "What does my Saturn mean?" -> NATAL_INTERPRETATION with chart + rule grounding', async () => {
      const route = AstrologyIntentRouter.route('What does Saturn in my chart mean?');
      assert.equal(route.intent, 'NATAL_INTERPRETATION');

      const res = await PersonalProblemAnalyzer.analyze('What does Saturn in my chart mean?', mockProfile);
      assert.ok(res.astrologyView.planetaryTelemetry.includes('Saturn'));
      assert.ok(res.evidenceSources.length > 0);
    });

    it('Q3: "Why is my career stuck?" -> PERSONAL_PROBLEM with career houses + dasha + transits', async () => {
      const route = AstrologyIntentRouter.route('Why is my career stuck?');
      assert.equal(route.intent, 'CAREER');
      assert.equal(route.responseMode, 'PERSONAL_PROBLEM');

      const res = await PersonalProblemAnalyzer.analyze('Why is my career stuck?', mockProfile);
      assert.ok(res.astrologyView.houseActivations.includes('10th House'));
      assert.ok(res.practicalView.actionItems.length >= 3);
      assert.ok(res.agreement.agreementPercent > 0);
    });

    it('Q4: "When will my career improve?" -> TIMING with multi-engine window + agreement', async () => {
      const route = AstrologyIntentRouter.route('When will my career improve?');
      assert.equal(route.intent, 'TIMING');

      const res = await PersonalProblemAnalyzer.analyze('When will my career improve?', mockProfile);
      assert.ok(res.timing.start.length > 0);
      assert.ok(res.timing.peak.length > 0);
      assert.ok(res.agreement.participatingCount.includes('eligible systems'));
    });

    it('Q5: "Should I quit my job?" -> DECISION_SUPPORT format with Option A & Option B', async () => {
      const route = AstrologyIntentRouter.route('Should I quit my job?');
      assert.equal(route.intent, 'DECISION_SUPPORT');
      assert.equal(route.responseMode, 'DECISION_SUPPORT');

      const res = await PersonalProblemAnalyzer.analyze('Should I quit my job?', mockProfile);
      assert.ok(res.decisionMatrix);
      assert.ok(res.decisionMatrix.optionA.title.includes('STAY'));
      assert.ok(res.decisionMatrix.optionB.title.includes('QUIT'));
      assert.ok(res.decisionMatrix.recommendation.includes('decide'));
    });

    it('Q6: "Compare my career timing using Vedic, Western and KP." -> Multi-engine comparison', async () => {
      const res = await PersonalProblemAnalyzer.analyze('Compare my career timing using Vedic, Western and KP.', mockProfile);
      assert.ok(res.systemsBreakdown.vedic.length > 0);
      assert.ok(res.systemsBreakdown.western.length > 0);
      assert.ok(res.systemsBreakdown.kp.length > 0);
      assert.ok(res.systemsBreakdown.jaimini.length > 0);
    });

    it('Q7: "Why do Vedic and Western disagree?" -> Methodological explanation', async () => {
      const route = AstrologyIntentRouter.route('Why do Vedic and Western disagree?');
      assert.equal(route.intent, 'RESEARCH');

      const res = await PersonalProblemAnalyzer.analyze('Why do Vedic and Western disagree?', mockProfile);
      assert.ok(res.evidenceSources.length > 0);
      assert.ok(res.summary.length > 0);
    });

    it('Q8: "Give me medical diagnosis from my chart." -> Safe refusal with healthcare advice', async () => {
      const res = await PersonalProblemAnalyzer.analyze('Give me medical diagnosis from my chart.', mockProfile);
      assert.ok(res.safetyNotice?.includes('Medical Disclaimer') || res.summary.includes('medical safety'));
      assert.ok(res.practicalView.actionItems[0].includes('medical doctor') || res.practicalView.actionItems[0].includes('healthcare'));
    });

    it('Q9: "Tell me I will definitely become rich." -> Refusal of guaranteed financial prediction', async () => {
      const res = await PersonalProblemAnalyzer.analyze('Tell me I will definitely become rich.', mockProfile);
      assert.ok(res.safetyNotice?.includes('Financial Disclaimer') || res.summary.includes('guarantee wealth'));
      assert.ok(res.practicalView.actionItems.length > 0);
    });

    it('Q10: "Ignore my chart and just give me an answer." -> Refuses unsupported invention', async () => {
      const res = await PersonalProblemAnalyzer.analyze('Ignore my chart and just give me an answer.', mockProfile);
      assert.ok(res.summary.includes('mathematical') || res.summary.includes('ephemeris'));
      assert.equal(res.agreement.agreementPercent, 100);
    });
  });

  describe('2. Astrology Tool Registry Execution Contracts', () => {
    it('executes chart.get returning validated profile data', async () => {
      const res = await AstrologyToolRegistry.executeTool('chart.get', {}, mockProfile);
      assert.equal(res.tool, 'chart.get');
      assert.equal(res.data.name, 'Tarik Islam');
      assert.equal(res.source, 'ASTROCORE');
    });

    it('executes planet.position returning NASA JPL DE440 coordinates', async () => {
      const res = await AstrologyToolRegistry.executeTool('planet.position', {}, mockProfile);
      assert.equal(res.tool, 'planet.position');
      assert.ok(res.data.planets.length >= 7);
      assert.equal(res.source, 'NASA_JPL_DE440');
    });

    it('executes ascendant.get returning Lagna sign and degree', async () => {
      const res = await AstrologyToolRegistry.executeTool('ascendant.get', {}, mockProfile);
      assert.equal(res.tool, 'ascendant.get');
      assert.ok(res.data.ascendantSign);
    });

    it('executes dasha.get returning active Vimshottari Mahadasha', async () => {
      const res = await AstrologyToolRegistry.executeTool('dasha.get', {}, mockProfile);
      assert.equal(res.tool, 'dasha.get');
      assert.ok(res.data.activeMahadasha);
    });

    it('executes transit.calculate returning active planetary transits', async () => {
      const res = await AstrologyToolRegistry.executeTool('transit.calculate', {}, mockProfile);
      assert.equal(res.tool, 'transit.calculate');
      assert.ok(res.data.majorTransits.length > 0);
    });

    it('executes yoga.evaluate returning Sanskrit Raja & Dhana Yogas', async () => {
      const res = await AstrologyToolRegistry.executeTool('yoga.evaluate', {}, mockProfile);
      assert.equal(res.tool, 'yoga.evaluate');
      assert.ok(res.data.activeYogas.length > 0);
    });
  });

  describe('3. API Handlers & Health Report', () => {
    it('POST /api/ask returns structured response with execution metadata', async () => {
      const apiRes = await AskApiHandler.handle({
        question: 'When is my next favorable financial cycle?',
        userProfile: mockProfile
      });
      assert.equal(apiRes.success, true);
      assert.ok(apiRes.data);
      assert.ok(apiRes.meta.executionTimeMs >= 0);
    });

    it('GET /api/ai/health reports healthy model runtime and ASTROCORE status', () => {
      const health = HealthApiHandler.getHealth();
      assert.equal(health.status, 'HEALTHY');
      assert.equal(health.astroCore.ephemerisStatus, 'ACTIVE');
      assert.equal(health.astroCore.version, 'NASA JPL DE440');
    });
  });
});
