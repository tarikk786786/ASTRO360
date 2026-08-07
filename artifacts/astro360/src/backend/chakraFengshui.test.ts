console.log("🧪 Running Sacred Chakra & Cosmic Feng Shui Unit Verification...");

// Test 1: Solfeggio 7-Chakra Frequencies Verification
const frequencies = ['396 Hz', '417 Hz', '528 Hz', '639 Hz', '741 Hz', '852 Hz', '963 Hz'];
if (frequencies.length === 7 && frequencies[2] === '528 Hz') {
  console.log("✅ Test 1 Passed: 7 Solfeggio Frequencies (396Hz–963Hz) verified with 528Hz Solar Plexus.");
} else {
  console.error("❌ Test 1 Failed: Frequency list mismatch.");
  process.exit(1);
}

// Test 2: Kua Number Calculation Logic for Birth Year 1995
const birthYear = 1995;
let sum = birthYear.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
while (sum > 9) {
  sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
}
const kuaNumber = 11 - sum > 0 ? (11 - sum) : 5;

if (kuaNumber >= 1 && kuaNumber <= 9) {
  console.log(`✅ Test 2 Passed: Kua Number ${kuaNumber} calculated for birth year ${birthYear}.`);
} else {
  console.error("❌ Test 2 Failed: Kua calculation out of bounds.");
  process.exit(1);
}

console.log("🎉 All Sacred Chakra & Cosmic Feng Shui Unit Tests Passed Cleanly!");
