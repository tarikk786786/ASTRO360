# ASTRO360 Open-Source License & Computational Reference Audit

This document maintains the **License Firewall** for ASTRO360 in accordance with **PRD Section 7**. Every computational engine, reference implementation, and third-party library is audited, categorized by license tier, and checked for production redistribution safety.

---

## 1. License Classification Standard

- **GREEN (Permissive / Production Safe)**: MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC. Free commercial use, modification, and redistribution with standard copyright attribution.
- **YELLOW (Weak Copyleft / Isolated Service Required)**: LGPL-2.1, LGPL-3.0, MPL-2.0. Permitted in production only via dynamic linking or isolated microservices; no proprietary code contamination.
- **RED (Strong Copyleft / Commercial License Required)**: AGPL-3.0, GPL-2.0, GPL-3.0. Forbidden from direct bundling in proprietary frontend/backend client builds unless a commercial multi-license is procured or wrapped behind an independent RPC boundary.

---

## 2. Core Dependency & Computational Audit Table

| Package / Module | Version | License | Tier | Classification & Usage Notes |
| :--- | :--- | :--- | :--- | :--- |
| **React** | 19.x | MIT | **GREEN** | Core frontend declarative UI library |
| **TypeScript** | 5.x | Apache-2.0 | **GREEN** | Type system and static analysis engine |
| **Tailwind CSS** | 4.x | MIT | **GREEN** | Atomic utility-first styling engine |
| **motion (Framer Motion)** | 12.x | MIT | **GREEN** | Hardware-accelerated UI transitions |
| **Lucide React** | 1.x | ISC | **GREEN** | Minimal geometric SVG icon system |
| **Zod** | 3.x | MIT | **GREEN** | Runtime Astro Schema validation & input parsing |
| **TanStack Query** | 5.x | MIT | **GREEN** | Async state management and request deduplication |
| **Sonner** | 2.x | MIT | **GREEN** | Accessible toast notification system |
| **Canvas Confetti** | 1.9.x | MIT | **GREEN** | Visual celebrations for chart generation |
| **JPL DE440 Ephemeris** | Public Domain / NASA | Public Domain | **GREEN** | Deterministic astronomical planetary coordinate baseline |
| **OpenStreetMap / Nominatim** | ODbL | **GREEN** | Free geocoding with standard attribution requirements |
| **Astronomy Engine (Cosmology)** | MIT | **GREEN** | Deterministic celestial coordinate transformation reference |
| **Swiss Ephemeris (Sweph)** | AGPL-3.0 / Commercial | **YELLOW / RED** | Isolated behind standalone optional backend RPC adapter; core platform ships with standalone native JPL-based algorithms |

---

## 3. Swiss Ephemeris AGPL Isolation Architecture

To ensure strict intellectual property and license compliance:
1. **Core Platform Independence**: ASTRO360 core calculation engines (`src/lib/astroCalculations.ts`, `src/backend/dashaEngine.ts`, `src/backend/doshaEngine.ts`) use native, deterministic, non-GPL astronomical trigonometry and JPL algorithms.
2. **Optional External Adapters**: Any Swiss Ephemeris bridge runs strictly as an out-of-process standalone microservice with an explicit commercial license flag.

---

## 4. Verification & Continuous Compliance
- Automated CI build and linting checks enforce non-contamination.
- All transitive npm packages checked via `pnpm audit` and dependency graph validation.
