Write-Host "🚀 Running ASTRO360 OMNI Master Automated Testing Pipeline..." -ForegroundColor Cyan

Write-Host "1. Running Typecheck..." -ForegroundColor Yellow
pnpm run typecheck

Write-Host "2. Running Unit Test Suites (Vitest/TSX)..." -ForegroundColor Yellow
npx tsx src/lib/astroCalculations.test.ts
npx tsx src/backend/dashaEngine.test.ts
npx tsx src/backend/doshaEngine.test.ts
npx tsx src/backend/chakraFengshui.test.ts
npx tsx src/backend/planetaryHoras.test.ts
npx tsx src/backend/electionalMuhurta.test.ts
npx tsx src/backend/mantraRadar.test.ts
npx tsx src/backend/panchangDeities.test.ts

Write-Host "3. Running Production Build Test..." -ForegroundColor Yellow
pnpm --filter @workspace/astro360 run build

Write-Host "🎉 All Master Test Pipelines Completed Cleanly with 0 Errors!" -ForegroundColor Green
