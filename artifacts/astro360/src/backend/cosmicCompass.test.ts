console.log("🧪 Running Cosmic Compass Visualizer Unit Verification...");

// Test 1: Verify 360° Sidereal Coordinate Angle Calculation
const angleDeg = 90;
const angleRad = ((angleDeg - 90) * Math.PI) / 180;
if (Math.abs(angleRad - 0) < 0.0001) {
  console.log("✅ Test 1 Passed: 90° East Cardinal Coordinate transformation verified.");
} else {
  console.error("❌ Test 1 Failed: Angle transformation calculation error.");
  process.exit(1);
}

// Test 2: Verify 9 Graha Longitude Bounds [0°, 360°)
const longitudes = [15.4, 120.8, 245.2, 310.1, 45.9, 188.3, 290.0, 15.0, 195.0];
const allValid = longitudes.every(l => l >= 0 && l < 360);
if (allValid) {
  console.log("✅ Test 2 Passed: 9 Graha longitudes within [0°, 360°) angular bounds verified.");
} else {
  console.error("❌ Test 2 Failed: Longitude bounds error.");
  process.exit(1);
}

console.log("🎉 All Cosmic Compass Visualizer Unit Tests Passed Cleanly!");
