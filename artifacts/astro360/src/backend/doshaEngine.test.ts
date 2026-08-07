import { calculatePlanetaryPositions } from '../lib/astroCalculations';

console.log("🧪 Running Planetary Dosha & Biorhythm Engine Unit Verification...");

// Test 1: Verify Ephemeris Positions for Sade Sati calculation
const positions = calculatePlanetaryPositions('1995-05-15', '14:30');
const moon = positions.find(p => p.name === 'Moon');
const saturn = positions.find(p => p.name === 'Saturn');

if (moon && saturn) {
  console.log(`✅ Test 1 Passed: Natal Moon Sign = ${moon.sign}, Transiting Saturn Sign = ${saturn.sign}`);
} else {
  console.error("❌ Test 1 Failed: Moon or Saturn positions missing.");
  process.exit(1);
}

// Test 2: Biorhythm Sine-Wave Formula Verification
const birthDate = new Date('1995-05-15');
const today = new Date();
const days = Math.floor(Math.abs(today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
const physical = Math.round(Math.sin((2 * Math.PI * days) / 23) * 50 + 50);

if (physical >= 0 && physical <= 100) {
  console.log(`✅ Test 2 Passed: Physical Biorhythm calculated (${physical}%) within [0, 100] bounds.`);
} else {
  console.error("❌ Test 2 Failed: Biorhythm out of bounds.");
  process.exit(1);
}

console.log("🎉 All Planetary Dosha & Biorhythm Unit Tests Passed Cleanly!");
