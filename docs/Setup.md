# 🛠️ ASTRO360 OMNI — LOCAL SETUP & QUICKSTART GUIDE

---

## 1. Prerequisites

- **Node.js**: `v20.0.0` or higher.
- **Package Manager**: `pnpm v9.0.0` or higher.

---

## 2. Quickstart Installation

```bash
# Clone the repository
git clone https://github.com/tarikk786786/ASTRO360.git
cd ASTRO

# Install dependencies using pnpm
pnpm install

# Start local development server
pnpm --filter @workspace/astro360 run dev
```

---

## 3. Running Automated Tests

```bash
# Run all 8 engine unit test suites
npx tsx src/lib/astroCalculations.test.ts
npx tsx src/backend/dashaEngine.test.ts
npx tsx src/backend/doshaEngine.test.ts
npx tsx src/backend/chakraFengshui.test.ts
npx tsx src/backend/planetaryHoras.test.ts
npx tsx src/backend/electionalMuhurta.test.ts
npx tsx src/backend/mantraRadar.test.ts
npx tsx src/backend/panchangDeities.test.ts

# Or run unified local test script
bash scripts/run-all-tests.sh
# Windows PowerShell: .\scripts\run-all-tests.ps1
```

---

## 4. Production Build

```bash
pnpm --filter @workspace/astro360 run build
```
