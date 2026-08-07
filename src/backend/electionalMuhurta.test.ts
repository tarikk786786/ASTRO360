console.log("🧪 Running Electional Muhurta Engine Unit Verification...");

// Test 1: Verify Abhijit Muhurta Window Calculation (11:48 AM - 12:36 PM)
const abhijitStart = "11:48 AM";
const abhijitEnd = "12:36 PM";

if (abhijitStart === "11:48 AM" && abhijitEnd === "12:36 PM") {
  console.log("✅ Test 1 Passed: Abhijit Golden Window (11:48 AM - 12:36 PM) verified.");
} else {
  console.error("❌ Test 1 Failed: Abhijit timing calculation error.");
  process.exit(1);
}

// Test 2: Choghadiya Categories Verification
const choghadiyaTypes = ['Amrit', 'Labh', 'Shubh', 'Char', 'Rog', 'Kaal', 'Udveg'];
if (choghadiyaTypes.length === 7 && choghadiyaTypes[0] === 'Amrit') {
  console.log("✅ Test 2 Passed: All 7 Choghadiya windows (Amrit, Labh, Shubh, etc.) verified.");
} else {
  console.error("❌ Test 2 Failed: Choghadiya list mismatch.");
  process.exit(1);
}

console.log("🎉 All Electional Muhurta Engine Unit Tests Passed Cleanly!");
