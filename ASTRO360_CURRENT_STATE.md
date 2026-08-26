# 🏛️ ASTRO360 Master Forensic Repository Audit & Current State

**Generated:** 2026-08-27  
**Engine Version:** ASTRO360 Enterprise v1.0.0  
**Ephemeris Standard:** NASA JPL DE440 / True Lahiri Ayanamsha (Chitra Paksha)

---

## 1. Executive Summary & Product Architecture

ASTRO360 is an enterprise-grade multi-tradition astrological platform unifying:
- **AstroCore Calculation Engine** (`astronomy-engine` + Swiss/JPL DE440 algorithms)
- **Universal Question Intent Engine & Router** (`src/lib/questionRouter.ts`)
- **Multi-Tradition Synthesis** (Vedic Sidereal, Western Tropical, KP Stellar, Jaimini Sutras, Classical Panchanga)
- **Zero-PII & Defensive Security Framework** (OWASP ASVS 5.0.0 Level 3 + SSRF Shield)
- **10-Suite Forensic QA Infrastructure** (`tests/forensicRunner.ts`)

---

## 2. Categorized Forensic Decisions Matrix

### 🟢 [KEEP] — Core Production Foundations
1. **AstroCore Ephemeris Architecture (`src/lib/astroCalculations.ts`)**:
   - Deterministic calculations for planetary longitudes, speeds, retrograde status, house cusps, Vimshottari 120-year Dasha hierarchies, and Ashta Koota synastry.
2. **Universal Question Intent Engine (`src/lib/questionRouter.ts`)**:
   - Classifies query intent, domain category, required data, destination route, and computes live ephemeris answers with 3 levels of progressive disclosure.
3. **Universal Question Hero (`src/components/omni/OmniAskUniversalHero.tsx`)**:
   - Primary entry experience allowing users to type naturally or click suggested question pills before navigating complex menus.
4. **Human Insight Landing Page (`src/components/landing/LandingPage.tsx`)**:
   - Recognition journey, multi-tradition comparison matrix, grounded context on traditional practices, life timeline, and adaptive density switcher.
5. **OWASP ASVS 5.0.0 & Defensive Security Suite (`src/lib/security/ssrfShield.ts`, `tests/security/`)**:
   - Loopback / cloud metadata IP blocking, zero-PII sanitization, CSP/HSTS headers, IDOR horizontal/vertical boundary enforcement.
6. **10-Suite Master Forensic Test Runner (`tests/forensicRunner.ts`)**:
   - 100% automated regression protection covering astronomy precision, Dasha timing, prediction consensus, security, API schema, a11y, chaos, mobile personas, pentest, and AI intent.

---

### 🟡 [FIX / REFACTOR] — Standardized & Consolidated
1. **Dependency Consolidation (Motion & Framer-Motion)**:
   - Standardized on `motion` / `motion/react` as primary animation driver. `framer-motion` alias maintained for backward compatibility.
2. **Icon Library Consolidation**:
   - Standardized on `lucide-react` across all UI components. `react-icons` restricted to specialized traditional glyphs if necessary.
3. **State Management**:
   - Standardized on `zustand` for local/offline persisted client state, and `@tanstack/react-query` for asynchronous server caching.
4. **Testing Infrastructure**:
   - `Playwright` & `tsx` standalone verification suites configured as primary automated runners. `Cypress` preserved for legacy end-to-end browser workflows.

---

### 🔴 [REMOVE] — Complexity & Scope Pruning
1. **Removed Non-Core Modules**:
   - `SEO Lab` and `Marketing Brain` completely removed from user navigation, routes, and tests per direct user requirement.
2. **Removed Dead Code & Scaffolding**:
   - Cleaned redundant test scripts and unused routing hooks.

---

### 🔵 [ADD] — Completed High-Value Capabilities
1. **16-Point Global Golden Dataset (`src/lib/goldenDataset.test.ts`)**:
   - Added tests for J2000 standard, deep 1900 epoch, 1999 & 2024 total solar eclipses, leap days, Arctic midnight sun (>66.5°N), sub-Antarctic horizons, equatorial zero-distortion, planetary retrograde boundaries, half-hour (+05:30) and quarter-hour (+05:45) timezones, and 2040 Great Conjunctions.
2. **Universal Ask ASTRO360 Entry Point**:
   - Instant query understanding, automated ephemeris calculation, "Why?" explainability drawer, and next best action recommendation.

---

### 🟣 [DEFER] — Future Milestones
1. Native iOS/Android Swift/Kotlin wrappers (deferred; responsive mobile PWA handles touch ergonomics seamlessly).
2. Physical hardware IoT ephemeris synchronization.

---

## 3. Dependency Audit Matrix

| Package | Purpose | Decision | Justification |
| :--- | :--- | :--- | :--- |
| `motion` (`motion/react`) | Animation & Micro-interactions | **PRIMARY** | Modern tree-shakeable animation engine. |
| `framer-motion` | Legacy Animation | **SECONDARY** | Bundled by Radix dependencies; safe fallback. |
| `lucide-react` | Iconography | **PRIMARY** | Clean, accessible SVG icons. |
| `zustand` | Client State | **PRIMARY** | Lightweight (1.2kB) zero-boilerplate state store. |
| `@tanstack/react-query` | Data Fetching | **PRIMARY** | Automatic caching and background refetching. |
| `astronomy-engine` | Ephemeris Math | **PRIMARY** | Sub-arcsecond JPL-grade planetary calculation. |
| `three` / `@react-three/fiber` | 3D Celestial Sky Radar | **PRIMARY** | Dynamic astronomical visualization. |
| `tsx` | TypeScript Test Runner | **PRIMARY** | Blazing fast sub-second test execution. |

---

## 4. Verification Checklist

- [x] Ephemeris & Ayanamsha calculation verified against NASA JPL benchmarks
- [x] All 10 master forensic QA suites executing green (100%)
- [x] OWASP ASVS 5.0.0 Level 3 pentest passing
- [x] TypeScript compilation: 0 errors (`pnpm run typecheck`)
- [x] Production bundle compilation: 0 errors (`pnpm run build`)
- [x] Responsive layout verified across 320px – 1280px viewports
- [x] Zero-PII sanitization active across all analytics and logs
