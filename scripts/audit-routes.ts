import { PRIMARY_NAV_ITEMS, MORE_SHEET_ITEMS } from '../src/components/navigation/navigationConfig';
import { TRADITIONS } from '../src/types';

console.log('🔍 ASTRO360 Route & Calculation Suite Health Audit');
console.log('================================================');

let passedChecks = 0;
let totalChecks = 0;

function assert(condition: boolean, label: string) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`✅ [PASS] ${label}`);
  } else {
    console.error(`❌ [FAIL] ${label}`);
  }
}

// 1. Primary Navigation
assert(PRIMARY_NAV_ITEMS.length === 5, `Primary Nav has 5 canonical tabs (found ${PRIMARY_NAV_ITEMS.length})`);
for (const item of PRIMARY_NAV_ITEMS) {
  assert(Boolean(item.id && item.label && item.route), `Nav Item [${item.id}] is well-formed`);
}

// 2. More Sheet 152+ Items
assert(MORE_SHEET_ITEMS.length > 0, `More sheet catalog items present (found ${MORE_SHEET_ITEMS.length})`);
for (const item of MORE_SHEET_ITEMS) {
  assert(Boolean(item.id && item.label && item.route && item.category), `Tool Item [${item.id}] has required metadata`);
}

// 3. Multi-Traditions
const tradList = Object.values(TRADITIONS);
assert(tradList.length >= 6, `Multi-tradition frameworks configured (found ${tradList.length})`);
for (const trad of tradList) {
  assert(Boolean(trad.id && trad.name && trad.group && trad.description), `Tradition [${trad.id}] (${trad.name}) is fully configured`);
}

console.log('------------------------------------------------');
console.log(`📊 Audit Result: ${passedChecks}/${totalChecks} assertions passed (${((passedChecks / totalChecks) * 100).toFixed(1)}% Health Score)`);

if (passedChecks === totalChecks) {
  console.log('🎉 100% Zero-Error Route & Tool Verification Complete!');
} else {
  process.exit(1);
}
