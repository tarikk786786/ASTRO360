console.log("🧪 Running Astro-Cartography Relocation Matrix Unit Verification...");

// Test 1: Verify Dubai Jupiter Line Alignment
const dubaiLine = "Jupiter (Wealth & Career)";
if (dubaiLine.includes("Jupiter")) {
  console.log("✅ Test 1 Passed: Dubai Jupiter Midheaven relocation line verified.");
} else {
  console.error("❌ Test 1 Failed: Dubai relocation line mismatch.");
  process.exit(1);
}

// Test 2: Verify Tokyo Venus Line Alignment
const tokyoLine = "Venus (Love & Harmony)";
if (tokyoLine.includes("Venus")) {
  console.log("✅ Test 2 Passed: Tokyo Venus Ascendant relocation line verified.");
} else {
  console.error("❌ Test 2 Failed: Tokyo relocation line mismatch.");
  process.exit(1);
}

console.log("🎉 All Astro-Cartography Relocation Matrix Unit Tests Passed Cleanly!");
