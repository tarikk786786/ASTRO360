# 🔬 ASTRO360 — SCIENTIFIC ASTRONOMY ENGINE & DEEP SYSTEM AUDIT

**Version**: 2.0.0  
**Date**: August 2026  
**Repository**: [https://github.com/tarikk786786/ASTRO360](https://github.com/tarikk786786/ASTRO360)  

---

## Executive Summary & Core Mandate

ASTRO360 is being upgraded from a multi-tradition cosmic intelligence application to a **scientifically rigorous, auditable astronomical calculation platform** with clearly demarcated traditional astrological interpretation layers.

### 🛡️ Mandatory Scientific Rule
> **Astrology itself is NOT scientifically proven.**  
> The application strictly separates **ASTRONOMICAL CALCULATION** (reproducible mathematical models of planetary bodies, Keplerian orbital mechanics, coordinate transformations, and solar/lunar angles) from **ASTROLOGICAL INTERPRETATION** (traditional, cultural, and symbolic frameworks such as Vedic Jyotish, Western Tropical, and Chinese BaZi).

---

## 1. Comprehensive System Audit & Inventory

### 1.1 Architecture & Single Source of Truth
- **Current State**: Centralized `GlobalConfigManager` (`src/lib/globalConfig.ts`) handles configuration state with automated dependency resolution (e.g. `astrologySystem` $\rightarrow$ `zodiacSystem` + `houseSystem`).
- **Required Upgrade**: Enforce explicit provenance tracking on every calculation result object returned by calculation engines.

### 1.2 Astronomical Engine Stack Evaluation
We evaluated potential astronomical calculation libraries:
1. **`swisseph` (Alois Treindl / Astrodienst Swiss Ephemeris)**: The golden standard for astronomical precision ($< 0.0001''$).
2. **`astronomy-engine` (Don Cross)**: Pure JS/TS astronomical calculation engine with zero native binary C++ compilation dependencies. Highly reliable for web browsers and Vite bundlers.
3. **`VedAstro`**: Useful for Vedic interpretation rulesets.
4. **Selected Stack**:
   - **Primary Astronomical Ephemeris Engine**: Pure TypeScript high-precision ephemeris algorithms (`src/engines/astronomy/`) powered by Keplerian orbits, VSOP87 series approximations, and Swiss Ephemeris mathematical formulas.
   - **Zero-binary breakdown**: Runs smoothly in all web browsers, Replit, and Node.js without native C-binding crashes.

### 1.3 Audit Matrix Across 31 System Axes

| Axis | Pre-Audit Finding | Planned Resolution & Refinement |
| :--- | :--- | :--- |
| **1. Scientific Boundary** | Calculations mixed with interpretative strings in single returns. | Decouple pure astronomical calculations into `src/engines/astronomy/` with explicit disclaimer fields. |
| **2. Ephemeris Engine** | Planetary algorithms spread across `astroCalculations.ts` and `astronomyEngine.ts`. | Consolidate into `src/engines/astronomy/` with submodules: `ephemeris`, `planets`, `moon`, `sun`, `nodes`, `houses`, `coordinates`, `time`, `timezone`, `ayanamsa`, `aspects`. |
| **3. Calculation Transparency** | Users could not inspect exact formulas or coordinate values. | Build `<CalculationTransparencyPanel />` component into all chart, panchang, and prediction views. |
| **4. Vedic Engine** | Sidereal calculations active, but needed explicit Ayanamsa provenance. | Add exact Ayanamsa offset ($24.18^\circ$ for Lahiri, $23.45^\circ$ for Raman, $24.08^\circ$ for KP) to output provenance. |
| **5. Western Engine** | Tropical wheel & aspect orbs required dedicated calculation module. | Standardize `src/lib/western/westernEngine.ts` with Placidus, Koch, and aspect orb rules. |
| **6. Panchang Engine** | Panchang calculated, but location & Tithi end-times needed exact solar angles. | Enhance `src/lib/vedic/panchangEngine.ts` with exact solar-lunar elongation angle formulas ($12^\circ$ per Tithi). |
| **7. Hindu Calendar** | Amanta & Purnimanta rules implied in UI. | Add explicit regional calendar toggle & Paksha/Masa indicators. |
| **8. Islamic Section** | Prayer times and Qibla functional with UmmahAPI fallback. | Ensure Islamic section remains 100% separate from astrological predictions, focusing strictly on Hijri dates, Prayer angles, and Qibla. |
| **9. Visualizations** | Responsive SVG charts available. | Add interactive tooltips, planet labels, degree toggles, and calculation inspection modals. |
| **10. UI/UX Aesthetics** | Dark cosmic theme established. | Enforce `DATA > CALCULATION > INTERPRETATION > DECORATION` visual hierarchy. |
| **11. Motion & Animation** | Motion library configured. | Add `prefers-reduced-motion` compliance & motion density toggle. |
| **12. Global Search** | Command palette (`Ctrl+K`) active. | Expand command index to search all 42 control center modules & 150+ tools. |
| **13. Dashboard** | Responsive widget grid. | Add layout presets (Vedic, Western, Panchang, Islamic, Research). |
| **14. Testing Suite** | Minimal unit tests in `astroCalculations.test.ts`. | Build comprehensive Vitest/Node test runner in `tests/astronomyEngine.test.ts` verifying planetary positions, house cusps, and prayer times. |

---

## 2. Standardized Calculation Provenance Contract

Every astronomical calculation object returned by ASTRO360 MUST implement the following interface:

```typescript
export interface AstronomicalCalculationResult<T> {
  value: T;
  source: string; // e.g. "Keplerian Solar System Ephemeris v2.0"
  engine: "ASTRO360-AstronomyEngine";
  engineVersion: "2.0.0";
  ephemerisVersion: "SwissEph-2.10-Compliant";
  timestamp: string; // ISO 8601 UTC
  location: {
    latitude: number;
    longitude: number;
    altitudeMeters?: number;
  };
  timezone: string; // e.g. "Asia/Kolkata"
  configuration: {
    astrologySystem: string;
    zodiacSystem: string;
    ayanamsa: string;
    houseSystem: string;
  };
  isAstronomicalCalculation: true;
  interpretationDisclaimer: "Astronomical positions are calculated using validated orbital mechanics. Astrological interpretations are traditional symbolic frameworks.";
}
```

---

## 3. Test & Verification Plan

1. **Unit Test Suite**:
   - `tests/astronomy.test.ts`: Verify planetary longitudes against NASA JPL Horizons / Swiss Ephemeris reference data within $0.01^\circ$.
   - `tests/panchang.test.ts`: Verify Tithi elongation angles ($12^\circ$ increments).
   - `tests/prayerTimes.test.ts`: Verify Fajr, Dhuhr, Asr, Maghrib, and Isha solar depression angles.
2. **Automated Build & Typecheck**:
   - `npx tsc --noEmit`
   - `pnpm run build`
3. **Runtime & Console QA**:
   - Chrome DevTools MCP inspection verifying zero console errors at `http://localhost:5173/`.
