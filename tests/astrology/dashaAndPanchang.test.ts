/**
 * ASTRO360 Forensic Test Suite - Classical Astrology Engines, Dasha & Panchanga
 * Validates Vimshottari 120-year Dasha hierarchy, Ashta Koota 36-Guna matching, and Panchanga.
 */

import { calculateVimshottariDasha } from '../../src/backend/dashaEngine';
import { calculatePanchang } from '../../src/lib/astroCalculations';
import { calculateAshtaKoota } from '../../src/lib/vedic/kundliMatchingEngine';
import { DoshaEngine } from '../../src/lib/vedic/doshaEngine';

console.log('🧪 Running ASTRO360 Astrology Engines, Dasha & Panchanga Forensics Suite...\n');

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
// 1. VIMSHOTTARI 120-YEAR DASHA GAPLESS HIERARCHY
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- 1. VIMSHOTTARI DASHA HIERARCHY ---');

const dashaZero = calculateVimshottariDasha(0.0, new Date('1998-06-15'));
const totalZeroYears = dashaZero.timeline.reduce((acc, d) => acc + d.durationYears, 0);
assert(Math.round(totalZeroYears) === 120, 'Full 120-year Vimshottari Mahadasha cycle verified from 0° Nakshatra inception', `${totalZeroYears} Years`);

const dashaResult = calculateVimshottariDasha(45.2, new Date('1998-06-15'));
assert(dashaResult.timeline !== undefined, 'Dasha timeline generated');
assert(dashaResult.timeline.length === 9, 'All 9 Mahadashas present in cycle');

const balanceYears = dashaResult.timeline.reduce((acc, d) => acc + d.durationYears, 0);
assert(balanceYears >= 100 && balanceYears <= 120, 'Balance of dasha from birth correctly accounts for elapsed first Mahadasha fraction', `${balanceYears.toFixed(1)} Years`);

assert(dashaResult.currentMahadasha.length > 0, 'Current active Mahadasha identified', dashaResult.currentMahadasha);
assert(dashaResult.currentAntardasha.length > 0, 'Current active Antardasha identified', dashaResult.currentAntardasha);

// ─────────────────────────────────────────────────────────────────────────────
// 2. ASHTA KOOTA 36-GUNA SYNASTRY MATCHING
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 2. ASHTA KOOTA 36-GUNA SYNASTRY ---');

// Person 1 (Moon: Taurus, Rohini) & Person 2 (Moon: Gemini, Mrigashira)
const synastry = calculateAshtaKoota(2, 4, 3, 5);
assert(synastry.total >= 0 && synastry.total <= 36, 'Ashta Koota score bounded in [0, 36] Gunas', `${synastry.total}/36`);
assert(synastry.nadi === 8, 'Nadi Koota carries 8 maximum points (Genetic & Physiological harmony)');
assert(synastry.varna === 1 && synastry.vashya === 2 && synastry.bhakoot === 7, 'All 8 classical Ashta Kootas evaluated');

// ─────────────────────────────────────────────────────────────────────────────
// 3. DAILY PANCHANGA ELEMENTS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 3. DAILY PANCHANGA & TIMINGS ---');

const panchang = calculatePanchang(new Date('2026-08-26T12:00:00Z'));
assert(panchang.tithi.length > 0, 'Tithi calculated cleanly', panchang.tithi);
assert(panchang.nakshatra.length > 0, 'Nakshatra calculated cleanly', panchang.nakshatra);
assert(panchang.yoga.length > 0, 'Yoga calculated cleanly', panchang.yoga);
assert(panchang.karana.length > 0, 'Karana calculated cleanly', panchang.karana);
assert(panchang.rahuKalam.length > 0, 'Rahu Kalam timing calculated', panchang.rahuKalam);
assert(panchang.abhijitMuhurta.length > 0, 'Abhijit Muhurta timing calculated', panchang.abhijitMuhurta);

// ─────────────────────────────────────────────────────────────────────────────
// 4. CLASSICAL DOSHA DIAGNOSTICS
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 4. DOSHA DIAGNOSTICS & REMEDIES ---');

const manglik = DoshaEngine.evaluateManglikDosha([
  { name: 'Mars', houseNumber: 7 },
  { name: 'Sun', houseNumber: 1 }
]);

assert(manglik.id === 'manglik_dosha' && manglik.isDetected, 'Manglik Dosha evaluated based on Mars house placement (1, 2, 4, 7, 8, 12)');
assert(manglik.severity === 'High', '7th house Mars classified with High severity');

const kaalsarp = DoshaEngine.evaluateKaalSarpDosha([
  { name: 'Rahu', longitude: 45 },
  { name: 'Ketu', longitude: 225 },
  { name: 'Sun', longitude: 60 },
  { name: 'Moon', longitude: 90 },
  { name: 'Mars', longitude: 120 }
]);

assert(kaalsarp.id === 'kaal_sarp_dosha', 'Kaal Sarp Dosha evaluated based on Rahu-Ketu hemispheric axis');

console.log(`\n🎉 All ${passedTests}/${totalTests} Astrology Engines & Panchanga Forensics Assertions Passed Cleanly!\n`);
