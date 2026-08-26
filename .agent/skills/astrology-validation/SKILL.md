---
name: astrology-validation
description: Golden dataset testing, sub-arcsecond verification, and regression prevention standards for ASTRO360.
---

# Astrology Validation & Testing Standards

## Overview
ASTRO360 enforces rigorous automated testing against verified astronomical and historical reference data to ensure mathematical perfection and eliminate regressions.

## Golden Benchmark Test Suite
Every build and change must validate against the 6 Golden Datasets (`src/lib/goldenDataset.test.ts`):
1. **GOLDEN_001_J2000**: J2000.0 Epoch Reference Standard (2000-01-01 12:00:00 UTC, Greenwich). Verifies baseline Lahiri Ayanamsha ($23.8500^\circ$).
2. **GOLDEN_002_HISTORICAL_ECLIPSE**: 1999 Total Solar Eclipse in Munich, Germany (1999-08-11 10:30:00 UTC). Verifies Sun-Moon sub-arcminute longitudinal alignment.
3. **GOLDEN_003_LEAP_YEAR_BOUND**: 2024 Leap Year Intercalary Day (2024-02-29 23:59:59 UTC, New Delhi). Verifies Julian day calendar handling across leap boundaries.
4. **GOLDEN_004_HIGH_LATITUDE**: Reykjavik High Latitude Horizon ($64.1466^\circ\text{ N}$). Verifies house cusp numerical convergence without singularity errors.
5. **GOLDEN_005_EQUATORIAL**: Singapore Equatorial Reference ($1.3521^\circ\text{ N}$). Verifies equatorial Ascendant and Midheaven calculations.
6. **GOLDEN_006_RETROGRADE_TEST**: Outer Planet Retrograde Boundary (2023-09-04 12:00:00 UTC, Jupiter retrograde). Verifies planetary speed sign and direction changes.

## Verification Command
```bash
pnpm test
```
All unit tests, Dasha engines, Dosha engines, and Golden dataset benchmarks must pass with 0 failures before any code commit.
