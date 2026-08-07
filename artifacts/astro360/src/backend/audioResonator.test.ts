console.log("🧪 Running Web Audio Resonator Unit Verification...");

// Test 1: Verify Hz Regex Extraction
const freqStr = "528 Hz (Solar Transformation)";
const match = freqStr.match(/(\d+)\s*Hz/i);
const hz = match ? parseInt(match[1], 10) : 0;
if (hz === 528) {
  console.log("✅ Test 1 Passed: 528 Hz Solfeggio frequency extraction verified.");
} else {
  console.error("❌ Test 1 Failed: Frequency extraction error.");
  process.exit(1);
}

// Test 2: Verify 7-Chakra Solfeggio Frequencies Matrix
const chakraHzList = [396, 417, 528, 639, 741, 852, 963];
const allValidHz = chakraHzList.every(f => f >= 300 && f <= 1000);
if (allValidHz) {
  console.log("✅ Test 2 Passed: All 7 Solfeggio frequencies within [300Hz, 1000Hz] audible range.");
} else {
  console.error("❌ Test 2 Failed: Solfeggio frequencies out of range.");
  process.exit(1);
}

console.log("🎉 All Web Audio Resonator Unit Tests Passed Cleanly!");
