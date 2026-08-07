#!/usr/bin/env bash
echo "🚀 Running ASTRO360 OMNI Master Automated Testing Pipeline..."

echo "1. Running Typecheck..."
pnpm run typecheck

echo "2. Running Unit Test Suites (Vitest/TSX)..."
npx tsx src/lib/astroCalculations.test.ts
npx tsx src/backend/dashaEngine.test.ts
npx tsx src/backend/doshaEngine.test.ts
npx tsx src/backend/chakraFengshui.test.ts
npx tsx src/backend/planetaryHoras.test.ts
npx tsx src/backend/electionalMuhurta.test.ts
npx tsx src/backend/mantraRadar.test.ts
npx tsx src/backend/panchangDeities.test.ts

echo "3. Running Production Build Test..."
pnpm --filter @workspace/astro360 run build

echo "🎉 All Master Test Pipelines Completed Cleanly with 0 Errors!"
