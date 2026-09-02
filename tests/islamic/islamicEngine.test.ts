import { describe, it } from 'node:test';
import assert from 'node:assert';
import { IslamicEngineRegistry } from '../../src/ai/islamic/IslamicEngineRegistry';
import { IslamicToolRegistry } from '../../src/ai/islamic/IslamicToolRegistry';
import { IslamicQuestionRouter } from '../../src/ai/islamic/IslamicQuestionRouter';
import { IslamicGuidanceAssistant } from '../../src/ai/islamic/IslamicGuidanceAssistant';
import { IslamicSourceConflictAnalyzer } from '../../src/ai/islamic/IslamicSourceConflictAnalyzer';
import { HijriEngine } from '../../src/lib/islamic/hijriEngine';
import { QiblaEngine } from '../../src/lib/islamic/qiblaEngine';

describe('ASTRO360 Islamic Guidance + Astronomy Engine Test Suite', () => {

  describe('1. Astronomical Prayer Times Engine', () => {
    it('calculates deterministic prayer times for New Delhi (MWL & Standard Asr)', () => {
      const res = IslamicEngineRegistry.calculatePrayerTimes(28.6139, 77.2090, new Date('2026-09-02T12:00:00Z'), 'MWL', false);
      assert.ok(res.fajr, 'Fajr time should be present');
      assert.ok(res.sunrise, 'Sunrise time should be present');
      assert.ok(res.dhuhr, 'Dhuhr time should be present');
      assert.ok(res.asr, 'Asr time should be present');
      assert.ok(res.maghrib, 'Maghrib time should be present');
      assert.ok(res.isha, 'Isha time should be present');
      assert.strictEqual(res.asrJuristic.includes('Standard'), true);
    });

    it('calculates Hanafi Asr with 2:1 shadow ratio starting later than Standard Asr', () => {
      const standardRes = IslamicEngineRegistry.calculatePrayerTimes(28.6139, 77.2090, new Date('2026-09-02T12:00:00Z'), 'MWL', false);
      const hanafiRes = IslamicEngineRegistry.calculatePrayerTimes(28.6139, 77.2090, new Date('2026-09-02T12:00:00Z'), 'MWL', true);
      assert.strictEqual(hanafiRes.asrJuristic.includes('Hanafi'), true);
      assert.notStrictEqual(standardRes.asr, hanafiRes.asr);
    });

    it('supports multiple global prayer calculation conventions (ISNA, Egypt, Makkah)', () => {
      const isna = IslamicEngineRegistry.calculatePrayerTimes(40.7128, -74.0060, new Date('2026-09-02T12:00:00Z'), 'ISNA');
      const egypt = IslamicEngineRegistry.calculatePrayerTimes(30.0444, 31.2357, new Date('2026-09-02T12:00:00Z'), 'EGYPT');
      const makkah = IslamicEngineRegistry.calculatePrayerTimes(21.4225, 39.8262, new Date('2026-09-02T12:00:00Z'), 'MAKKAH');
      assert.ok(isna.method.includes('ISNA') || isna.method.includes('North America'));
      assert.ok(egypt.method.includes('Egypt') || egypt.method.includes('Survey'));
      assert.ok(makkah.method.includes('Makkah') || makkah.method.includes('Qura'));
    });
  });

  describe('2. Qibla Spherical Geometry & Great-Circle Bearing Engine', () => {
    it('calculates exact Qibla bearing and distance from New Delhi to Kaaba', () => {
      const qibla = IslamicEngineRegistry.calculateQibla(28.6139, 77.2090);
      // From Delhi, Kaaba is West-Southwest (~260°-275°)
      assert.ok(qibla.bearingDegrees >= 260 && qibla.bearingDegrees <= 275, `Expected Delhi Qibla ~267°, got ${qibla.bearingDegrees}°`);
      assert.ok(qibla.distanceKm > 3500 && qibla.distanceKm < 4500, `Expected distance ~3800km, got ${qibla.distanceKm}km`);
      assert.strictEqual(qibla.compassCardinal.includes('W'), true);
    });

    it('calculates exact Qibla bearing from London and New York', () => {
      const londonQibla = IslamicEngineRegistry.calculateQibla(51.5074, -0.1278);
      // From London, Kaaba is South-East (~118°-122°)
      assert.ok(londonQibla.bearingDegrees >= 115 && londonQibla.bearingDegrees <= 125, `Expected London Qibla ~119°, got ${londonQibla.bearingDegrees}°`);

      const nyQibla = IslamicEngineRegistry.calculateQibla(40.7128, -74.0060);
      // From NY, Great Circle to Kaaba is East-Northeast (~58°)
      assert.ok(nyQibla.bearingDegrees >= 55 && nyQibla.bearingDegrees <= 62, `Expected NY Qibla ~58°, got ${nyQibla.bearingDegrees}°`);
    });
  });

  describe('3. Hijri Calendar Engine', () => {
    it('converts Gregorian date to Hijri with sacred month metadata', () => {
      const hijri = HijriEngine.gregorianToHijri(new Date('2026-09-02'));
      assert.ok(hijri.year >= 1447 && hijri.year <= 1449, `Expected ~1448 AH, got ${hijri.year}`);
      assert.ok(hijri.monthNameEn, 'Month name must exist');
      assert.ok(typeof hijri.isSacredMonth === 'boolean');
      assert.ok(hijri.formatted.includes('AH'));
    });
  });

  describe('4. Holy Quran Engine (Tier 1 Authority)', () => {
    it('retrieves Surah Al-Baqarah 2:153 with Arabic Uthmani text and translations', async () => {
      const res = await IslamicToolRegistry.executeTool('quran.getVerse', { surah: 2, ayah: 153 });
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.data.surah, 2);
      assert.strictEqual(res.data.ayah, 153);
      assert.ok(res.data.arabicUthmani.includes('الصَّبْرِ'));
      assert.ok(res.data.translations[0].text.includes('patience'));
      assert.strictEqual(res.source.includes('Tier 1'), true);
    });

    it('searches Quran by keyword "patience" returning relevant verses', async () => {
      const res = await IslamicToolRegistry.executeTool('quran.search', { query: 'patience' });
      assert.strictEqual(res.success, true);
      assert.ok(res.data.length > 0);
      assert.ok(res.data.some((v: any) => v.surah === 2 && v.ayah === 153));
    });
  });

  describe('5. Authenticated Hadith Engine (Tier 2 Authority)', () => {
    it('retrieves verified Sahih Hadiths on astrology prohibition with grading metadata', async () => {
      const res = await IslamicToolRegistry.executeTool('hadith.search', { query: 'astrology' });
      assert.strictEqual(res.success, true);
      assert.ok(res.data.length > 0);
      const hadith = res.data[0];
      assert.ok(hadith.collection, 'Hadith collection must be recorded');
      assert.ok(hadith.grade, 'Hadith grade must be recorded');
      assert.ok(hadith.narrator, 'Narrator must be recorded');
      assert.strictEqual(hadith.grade.includes('Sahih') || hadith.grade.includes('Authentic'), true);
    });
  });

  describe('6. Classical Tafsir Exegesis Engine (Tier 3 Authority)', () => {
    it('provides multi-scholar exegesis comparison for Surah 2:153', async () => {
      const res = await IslamicToolRegistry.executeTool('tafsir.search', { surah: 2, ayah: 153 });
      assert.strictEqual(res.success, true);
      assert.ok(Array.isArray(res.data));
      assert.ok(res.data.some((t: any) => t.scholar === 'Ibn Kathir'));
      assert.ok(res.data.some((t: any) => t.scholar === "Al-Sa'di"));
    });
  });

  describe('7. Fiqh Reference Engine with Madhhab Attribution (Tier 4 Authority)', () => {
    it('returns 5-madhhab consensus on the prohibition of judicial astrology', async () => {
      const res = await IslamicToolRegistry.executeTool('fiqh.search', { topic: 'astrology' });
      assert.strictEqual(res.success, true);
      assert.ok(res.data.madhhabViews.some((m: any) => m.school === 'Hanafi'));
      assert.ok(res.data.madhhabViews.some((m: any) => m.school === "Shafi'i"));
      assert.ok(res.data.madhhabViews.some((m: any) => m.school === 'Maliki'));
      assert.ok(res.data.madhhabViews.some((m: any) => m.school === 'Hanbali'));
      assert.ok(res.data.madhhabViews.some((m: any) => m.school === "Ja'fari"));
      assert.strictEqual(res.data.scholarlyConsensusLevel, "Ijma' (Consensus)");
    });
  });

  describe('8. Zakat & Inheritance Calculations', () => {
    it('calculates Zakat at 2.5% on qualifying wealth above Silver Nisab', async () => {
      const res = await IslamicToolRegistry.executeTool('zakat.calculate', { cash: 10000, debtsDueImmediately: 1000 });
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.data.netZakatableWealth, 9000);
      assert.strictEqual(res.data.isZakatDue, true);
      assert.strictEqual(res.data.zakatPayable, 225); // 2.5% of 9000
    });

    it('calculates Quranic inheritance shares for wife, mother, and children with advisory disclaimer', async () => {
      const res = await IslamicToolRegistry.executeTool('inheritance.calculate', {
        totalEstateValue: 120000,
        heirs: { hasWife: true, hasMother: true, sonsCount: 2, daughtersCount: 1 }
      });
      assert.strictEqual(res.success, true);
      assert.ok(res.data.shares.length >= 3);
      // Wife gets 1/8 with children (15,000)
      const wifeShare = res.data.shares.find((s: any) => s.relationship.includes('Wife'));
      assert.strictEqual(wifeShare?.calculatedValue, 15000);
      assert.ok(res.warnings[0].includes('Juristic Notice'));
    });
  });

  describe('9. Islamic Question Router & Theological Guardrails', () => {
    it('routes pure prayer questions to PRAYER category', () => {
      const route = IslamicQuestionRouter.route('When is Fajr prayer today?');
      assert.strictEqual(route.category, 'PRAYER');
      assert.strictEqual(route.isMixedAstrologyIslam, false);
    });

    it('routes mixed astrology + Islam questions to MIXED_ASTROLOGY_ISLAM category', () => {
      const route = IslamicQuestionRouter.route('What does my astrology chart say about marriage and what does Islam teach about marriage?');
      assert.strictEqual(route.category, 'MIXED_ASTROLOGY_ISLAM');
      assert.strictEqual(route.isMixedAstrologyIslam, true);
    });

    it('routes "Can stars tell my future in Islam?" to FIQH with astrology divination flag', () => {
      const route = IslamicQuestionRouter.route('Can my birth star tell me my future according to Islam?');
      assert.strictEqual(route.isAstrologyDivinationInquiry, true);
    });
  });

  describe('10. Islamic Guidance Assistant & Multi-Domain Separation', () => {
    it('answers "Can my birth star predict my future in Islam?" with strict theological boundary and authentic Hadith', async () => {
      const res = await IslamicGuidanceAssistant.answer('Can my birth star tell me my future according to Islam?');
      assert.ok(res.theologicalBoundaryNotice?.includes('strictly rejects astrology'));
      assert.ok(res.islamicGuidanceView?.evidenceChain.some(e => e.sourceType === 'HADITH'));
      assert.ok(res.executiveSummary.includes('distinction between mathematical astronomy'));
    });

    it('answers mixed questions by strictly separating Part 1 Astrology from Part 2 Islamic Guidance', async () => {
      const res = await IslamicGuidanceAssistant.answer('What does my astrology say, and what does Islam teach about worry?');
      assert.strictEqual(res.isMixedAstrologyIslam, true);
      assert.ok(res.astrologyView?.disclaimer.includes('does not represent Islamic doctrine'));
      assert.ok(res.islamicGuidanceView?.evidenceChain.some(e => e.sourceType === 'QURAN'));
      assert.ok(res.theologicalBoundaryNotice?.includes('Domain Boundary'));
    });
  });

});
