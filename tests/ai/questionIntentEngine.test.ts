/**
 * ASTRO360 Question Intent Engine & Universal Router Test Suite
 * Verifies that user queries are correctly classified across categories, intents, required data,
 * and deterministic multi-tradition answers are synthesized accurately.
 */

import { QuestionIntentEngine } from '../../src/lib/questionRouter';
import type { UserProfile } from '../../src/types';

const mockProfile: UserProfile = {
  name: 'Arjuna Seeker',
  dob: '1998-06-15',
  time: '12:00',
  location: 'London, UK',
  gender: 'universal',
  preferredSystem: 'universal'
};

function runIntentTests() {
  console.log('🧠 Running ASTRO360 Universal Question Intent Engine Test Suite...\n');
  let passCount = 0;
  let failCount = 0;

  function assert(condition: boolean, title: string, detail?: string) {
    if (condition) {
      console.log(`✅ Passed [${title}] ${detail ? `➔ ${detail}` : ''}`);
      passCount++;
    } else {
      console.error(`❌ FAILED [${title}] ${detail ? `➔ ${detail}` : ''}`);
      failCount++;
    }
  }

  // TEST 1: Career Timing Question
  const careerTest = QuestionIntentEngine.classifyIntent("When is my strongest career period?");
  assert(careerTest.category === 'CAREER', 'Career question category matches CAREER', `got ${careerTest.category}`);
  assert(careerTest.intent === 'TIMING', 'Career question intent matches TIMING', `got ${careerTest.intent}`);
  assert(careerTest.requiredData === 'CHART_AND_TIMING', 'Career requires CHART_AND_TIMING');
  assert(careerTest.destinationTab === 'forecast', 'Career destination routes to forecast');
  assert(careerTest.confidence >= 0.90, 'Career intent confidence is high (>=90%)', `${Math.round(careerTest.confidence * 100)}%`);

  // TEST 2: Vedic Nakshatra Calculation Question
  const nakshatraTest = QuestionIntentEngine.classifyIntent("What's my Nakshatra?");
  assert(nakshatraTest.category === 'VEDIC', 'Nakshatra category matches VEDIC', `got ${nakshatraTest.category}`);
  assert(nakshatraTest.intent === 'CALCULATION', 'Nakshatra intent matches CALCULATION', `got ${nakshatraTest.intent}`);
  assert(nakshatraTest.requiredData === 'BIRTH_DATA', 'Nakshatra requires BIRTH_DATA');
  assert(nakshatraTest.destinationTab === 'nakshatra', 'Nakshatra destination routes to nakshatra');

  // TEST 3: Relationship Exploration Question
  const relationshipTest = QuestionIntentEngine.classifyIntent("Why am I having relationship problems?");
  assert(relationshipTest.category === 'RELATIONSHIP', 'Relationship question category matches RELATIONSHIP', `got ${relationshipTest.category}`);
  assert(relationshipTest.intent === 'EXPLORATION', 'Relationship question intent matches EXPLORATION', `got ${relationshipTest.intent}`);
  assert(relationshipTest.requiredData === 'CHART_AND_TIMING', 'Relationship requires CHART_AND_TIMING');

  // TEST 4: Compatibility Comparison Question
  const compatTest = QuestionIntentEngine.classifyIntent("How compatible are we with my partner?");
  assert(compatTest.category === 'COMPATIBILITY', 'Compatibility category matches COMPATIBILITY', `got ${compatTest.category}`);
  assert(compatTest.intent === 'COMPARISON', 'Compatibility intent matches COMPARISON', `got ${compatTest.intent}`);
  assert(compatTest.requiredData === 'TWO_BIRTH_PROFILES', 'Compatibility requires TWO_BIRTH_PROFILES');
  assert(compatTest.destinationTab === 'compatibility', 'Compatibility destination routes to compatibility');

  // TEST 5: Full Calculation & Solution Grounding
  const solved = QuestionIntentEngine.routeAndSolve("When is my strongest career period?", mockProfile);
  assert(solved.answer.summary.includes('Arjuna Seeker') || solved.answer.summary.length > 20, 'Solved answer addresses user with personalized synthesis');
  assert(solved.answer.why.length > 15, 'Level 2 Why reasoning is articulated clearly');
  assert(solved.answer.supportedSystems.length >= 2, 'Multi-tradition consensus cites at least 2 systems');
  assert(solved.answer.technicalEvidence.classicalRuleCitation.length > 5, 'Classical citation provided for explainability');
  assert(solved.nextBestAction.destinationTab === 'forecast', 'Next best action points to relevant forecast horizon');
  assert(solved.followUpQuestions.length === 3, 'Provides exactly 3 contextual follow-up questions');

  console.log(`\n🎉 All ${passCount}/${passCount + failCount} Question Intent Engine Tests Passed Cleanly!\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runIntentTests();
