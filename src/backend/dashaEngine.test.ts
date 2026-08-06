import { calculateVimshottariDasha } from './dashaEngine';

// Pure unit test suite for Vimshottari Dasha Engine
function runDashaEngineTests() {
  console.log('🧪 Running Vimshottari Dasha Engine Unit Verification...');

  // Test 1: Moon at 42.1° (Rohini Nakshatra, Moon Lord)
  const result = calculateVimshottariDasha(42.1, new Date('1995-05-15'));
  
  if (!result.timeline || result.timeline.length !== 9) {
    throw new Error(`Test 1 Failed: Expected 9 Mahadashas in 120-year timeline, got ${result.timeline?.length}`);
  }

  const totalYears = result.timeline.reduce((acc, curr) => acc + curr.durationYears, 0);
  if (totalYears < 100 || totalYears > 125) {
    throw new Error(`Test 1 Failed: Expected total dasha cycle ~120 years, got ${totalYears}`);
  }

  console.log(`✅ Test 1 Passed: 9 Mahadashas generated, Current Mahadasha = ${result.currentMahadasha}, Total Years = ${totalYears}`);

  // Test 2: Moon at 0° (Krittika / Ashwini, Ketu Lord)
  const resultKetu = calculateVimshottariDasha(0.0, new Date('2000-01-01'));
  if (resultKetu.timeline[0].lord !== 'Ketu') {
    throw new Error(`Test 2 Failed: Expected first lord Ketu for 0° longitude, got ${resultKetu.timeline[0].lord}`);
  }

  console.log(`✅ Test 2 Passed: 0° Moon correct initial Ketu lord assignment.`);
  console.log('🎉 All Dasha Engine Unit Tests Passed Cleanly!');
}

runDashaEngineTests();
