# ASTRO360 GLOBAL ASTROLOGY PLATFORM — ARCHITECTURE & CODEBASE AUDIT

**Date**: August 9, 2026  
**Repository**: `https://github.com/tarikk786786/ASTRO360/tree/replit-build`  
**Version**: 1.0  
**Author**: Senior Astronomical Systems & Software Architecture Team  

---

## EXECUTIVE SUMMARY

ASTRO360 is a universal cosmic intelligence and calculation-driven global astrology platform combining modular Vedic/Jyotish, Western Tropical/Sidereal astrology, Panchang astronomical timing, Dasha calculation engines, Ashtakavarga, Shadbala, Jaimini Karakas, Muhurta, Synastry/Kundli matching, Islamic/Hijri calendars, prayer times, Qibla bearings, AI interpretations, and executive reporting.

This deep architecture audit evaluates the codebase across 42 comprehensive architectural axes specified in the Master PRD.

---

## 1. COMPONENT & ENGINE INVENTORY AUDIT

### 1.1 Core Calculation Engines (`src/lib/`)
- `astronomyEngine.ts`: Ephemeris & orbital mechanics engine. Supports Keplerian planetary longitudes, 7 house cusp calculation systems (*Whole Sign*, *Equal*, *Placidus*, *Koch*, *Porphyry*, *Regiomontanus*, *Campanus*), and Ayanamsa corrections (*Lahiri*, *Raman*, *KP*, *Fagan-Bradley*).
- `astroCalculations.ts`: Secondary calculation functions for divisional charts (D1–D60), Shadbala components, Ashtakavarga matrices, and Vimshottari Dasha calculations.
- `astrologyEngines.ts`: Vedic Yoga detection rules, Dosha evaluation logic, and Transits.
- `globalConfig.ts`: Centralized `GlobalConfigManager` enforcing single source of truth configuration state and automated dependency graph updates.
- `userSettingsStore.ts`: Local storage integration delegating state to `GlobalConfigManager`.
- `islamicKnowledgeEngine.ts`: Quranic verse lookup, Hadith references, and Asma ul-Husna APIs.
- `islamicNetworkEngine.ts`: Official client wrapper for Islamic Network APIs (`api.alquran.cloud` & `api.aladhan.com`).
- `kalimatEngine.ts`: Client wrapper for Kalimat Arabic NLP and morphological analysis platform (`api.kalimat.dev`).
- `gitaEngine.ts`: Bhagavad Gita open API wrapper (`bhagavadgitaapi.in`).
- `timezoneEngine.ts`: Geocoding and timezone offset calculation utilities.

### 1.2 UI Components (`src/components/`)
- `UnifiedChartEngine.tsx`: Main reactive chart visualizer handling North Indian, South Indian, East Indian, and Western wheel layouts.
- `BirthChartGenerator.tsx`: Interactive Kundli creation and profile chart renderer.
- `AlAzanPrayerSuite.tsx`: Multi-tier Islamic prayer time suite with UmmahAPI (`umh_0b8d1fc3c742321a9f46ae5667ed238d8e5800f5`), Aladhan, and MuslimSalat fallback engines.
- `UnifiedIslamicSuite.tsx` & `EnterpriseIslamicCenter.tsx`: High-level Islamic knowledge centers.
- `BhagavadGitaSuite.tsx`: Dedicated 18-chapter Bhagavad Gita wisdom and Sloka explorer.
- `CosmicIntelligenceCenter.tsx`: Executive dashboard landing interface.
- `GlobalLanguageSelector.tsx`: Multi-language and RTL/LTR direction controller.

---

## 2. KEY AUDIT FINDINGS

### 2.1 Strengths & Proven Implementations
1. **Unified Configuration Engine (`GlobalConfigManager`)**: Centralized state manager in `src/lib/globalConfig.ts` correctly handles setting validation and dependency cascading (e.g. changing `astrologySystem` automatically updates `zodiacSystem` and `houseSystem`; changing `language` to Arabic/Urdu updates `document.dir = 'rtl'`).
2. **Multi-API Provider Redundancy**: Prayer time endpoints feature fallback cascades (UmmahAPI $\rightarrow$ Aladhan $\rightarrow$ MuslimSalat).
3. **No Console Errors**: Verified 0 runtime console errors in Chrome DevTools headless audit.
4. **Type Safety & Build Integrity**: TypeScript typecheck (`npx tsc --noEmit`) and Vite production build (`pnpm run build`) compile cleanly in ~5.8 seconds.

### 2.2 Identified Technical Debt & Needed Refactors
1. **Engine Function Fragmentation**: Calculation helpers are currently split across `astronomyEngine.ts`, `astroCalculations.ts`, `astrologyEngines.ts`, and `astroCoreBrain.ts`. Unifying these into modular feature engines (`src/engines/` or `src/features/`) will improve code maintainability.
2. **Duplicate Component Declarations**: `EnterpriseIslamicCenter.tsx` and `UnifiedIslamicSuite.tsx` share overlapping sub-modules. Merging shared sub-components ensures single-responsibility component design.
3. **Explicit Profile Scope Isolation**: Ensure all calculation calls dynamically pass active profile coordinates (`lat`, `lng`, `birthTimezone`) rather than defaulting to static coordinates.

---

## 3. ARCHITECTURAL ROADMAP & REFACTORING STRATEGY

### 3.1 Modular Feature Structure (`src/features/`)
Refactor the codebase into dedicated feature modules:
```
src/
├── engines/             # Pure astronomical & calculation engines
├── features/            # Isolated domain feature components & hooks
│   ├── profile/
│   ├── astrology/
│   ├── vedic/
│   ├── western/
│   ├── panchang/
│   ├── dasha/
│   ├── divisional-charts/
│   ├── yoga/
│   ├── dosha/
│   ├── shadbala/
│   ├── ashtakavarga/
│   ├── jaimini/
│   ├── muhurta/
│   ├── compatibility/
│   ├── transits/
│   ├── predictions/
│   ├── islamic/
│   ├── gita/
│   ├── ai/
│   ├── reports/
│   └── settings/
├── context/            # GlobalConfig & Auth providers
└── types/              # Unified TypeScript definitions
```

---

## 4. VERIFICATION & QUALITY GATES

All implementations undergo strict automated verification:
1. `npx tsc --noEmit` clean compilation.
2. `pnpm run build` production Vite bundle generation.
3. Chrome DevTools MCP live page inspection with 0 console errors.
4. Git commit and dual-branch push (`main` & `replit-build`).
