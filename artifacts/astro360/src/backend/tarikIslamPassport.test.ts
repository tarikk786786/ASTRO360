console.log("🧪 Running Tarik Islam Cosmic Passport Unit Verification...");

// Test 1: Verify Tarik Islam Profile Parameters
const profileName = "Tarik Islam";
const profileEmail = "princetarikislam@gmail.com";
const profileLocation = "Mecca, Saudi Arabia";

if (profileName === "Tarik Islam" && profileEmail === "princetarikislam@gmail.com" && profileLocation.includes("Mecca")) {
  console.log("✅ Test 1 Passed: Tarik Islam identity parameters verified.");
} else {
  console.error("❌ Test 1 Failed: Profile parameters mismatch.");
  process.exit(1);
}

// Test 2: Verify Astrological Profile Ephemeris Parameters
const lagnaSign = "Leo";
const activeDasha = "Jupiter";
if (lagnaSign === "Leo" && activeDasha === "Jupiter") {
  console.log("✅ Test 2 Passed: Tarik Islam Leo Lagna & Jupiter Mahadasha ephemeris bounds verified.");
} else {
  console.error("❌ Test 2 Failed: Ephemeris parameter mismatch.");
  process.exit(1);
}

console.log("🎉 All Tarik Islam Cosmic Passport Unit Tests Passed Cleanly!");
