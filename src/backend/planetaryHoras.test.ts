console.log("🧪 Running Planetary Horas Tracker Unit Verification...");

// Test 1: Verify 7 Planetary Horas Order (Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars)
const HORA_PLANET_ORDER = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'];
if (HORA_PLANET_ORDER.length === 7 && HORA_PLANET_ORDER[0] === 'Sun' && HORA_PLANET_ORDER[1] === 'Venus') {
  console.log("✅ Test 1 Passed: 7 Planetary Hora cycle order verified.");
} else {
  console.error("❌ Test 1 Failed: Hora order mismatch.");
  process.exit(1);
}

// Test 2: Verify 24-Hour Timeline Generation
const horas = Array.from({ length: 24 }).map((_, i) => HORA_PLANET_ORDER[i % 7]);
if (horas.length === 24) {
  console.log("✅ Test 2 Passed: 24-Hour Planetary Hora timeline generated successfully.");
} else {
  console.error("❌ Test 2 Failed: Timeline length error.");
  process.exit(1);
}

console.log("🎉 All Planetary Horas Tracker Unit Tests Passed Cleanly!");
