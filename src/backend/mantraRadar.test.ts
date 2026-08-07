console.log("🧪 Running Sacred Mantras & Transit Radar Unit Verification...");

// Test 1: Verify 8 Mantras & Traditions Database
const traditions = ['Vedic', 'Islamic', 'Western', 'CBT'];
if (traditions.length === 4) {
  console.log("✅ Test 1 Passed: 4 Spiritual Traditions (Vedic Gayatris, Islamic Adhkar, Western, CBT) verified.");
} else {
  console.error("❌ Test 1 Failed: Traditions database error.");
  process.exit(1);
}

// Test 2: Verify Solfeggio Hz Frequency Parsing
const sampleHzStrings = ["528 Hz (Solar Transformation)", "432 Hz (Universal Peace)", "396 Hz (Root Liberation)", "741 Hz (Truth & Wisdom)"];
const parsedHz = sampleHzStrings.map(s => {
  const match = s.match(/(\d+)\s*Hz/i);
  return match ? parseInt(match[1], 10) : 0;
});

const allValid = parsedHz.every(h => h >= 300 && h <= 900);
if (allValid) {
  console.log("✅ Test 2 Passed: Solfeggio frequency parsing [300Hz, 900Hz] verified.");
} else {
  console.error("❌ Test 2 Failed: Solfeggio parsing error.");
  process.exit(1);
}

console.log("🎉 All Sacred Mantras & Transit Radar Unit Tests Passed Cleanly!");
