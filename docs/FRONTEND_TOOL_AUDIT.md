# ASTRO360 — Frontend Tool & Dependency Audit

## Executive Summary
This audit evaluates all existing and candidate frontend tools, libraries, and dependencies for ASTRO360. Decisions prioritize zero-overhead, sub-50ms rendering, mobile-first touch ergonomics, 100% client-side precision, and free/open-source integrity.

---

## 1. Tool Classifications & Canonical Decisions

| Category | Candidate / Package | Version | License | Bundle Impact | React 19 / TS | Decision | Rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Animation (UI)** | `motion` (`motion/react`) | 12.43.0 | MIT | ~28 KB gzipped | 100% Compatible | **KEEP / CANONICAL** | Primary React 19 declarative animation engine. Modernized syntax replacing legacy `framer-motion`. |
| **Animation (Legacy)** | `framer-motion` | 11.x | MIT | ~32 KB gzipped | Legacy wrapper | **REPLACE / CONSOLIDATE** | Deprecate in favor of direct `motion/react` imports to eliminate duplicate runtime bundles. |
| **Icons (Primary)** | `lucide-react` | 0.475.0 | ISC | Tree-shaken (~1.2 KB / icon) | 100% Compatible | **KEEP / CANONICAL** | High-precision vector geometry, consistent 24px stroke grid, optimal for astro dials and navigation. |
| **Icons (Secondary)** | `react-icons` | 5.4.0 | MIT | Large monolithic index | Redundant | **REPLACE** | Consolidate onto `lucide-react` to prevent duplicate icon sets. |
| **3D Core** | `three` | 0.185.1 | MIT | Tree-shaken | Compatible | **KEEP** | Core WebGL celestial orbital mechanics and solar lighting. |
| **3D React Fiber** | `@react-three/fiber` | 9.7.0 | MIT | ~18 KB gzipped | 100% Compatible | **KEEP** | Declarative Three.js scene graph management. |
| **3D Helpers** | `@react-three/drei` | 10.7.8 | MIT | Tree-shaken | 100% Compatible | **KEEP** | Particle clouds, starfield billboards, orbit controls. |
| **Astronomical Math** | `astronomy-engine` | 2.1.19 | MIT | ~35 KB | 100% Compatible | **KEEP** | Sub-arcsecond NASA JPL DE440 ephemeris, topocentric parallax, nutation. |
| **State Management** | `zustand` | 5.0.15 | MIT | < 2 KB gzipped | 100% Compatible | **KEEP** | Micro-store for client settings, wallet balance, active tradition, and audio state. |
| **Server/Cache State** | `@tanstack/react-query` | 5.x | MIT | ~12 KB gzipped | 100% Compatible | **KEEP** | Async background caching for space weather, seismic feeds, and news. |
| **UI Primitives** | `@radix-ui/react-*` | 1.x / 2.x | MIT | Tree-shaken | 100% Compatible | **KEEP / USE** | Accessible, unstyled primitives for dialogs, popovers, tooltips, and tabs. |
| **Forms & Validation** | `react-hook-form` + `zod` | 7.x / 3.x | MIT | ~14 KB total | 100% Compatible | **KEEP** | Type-safe birth data inputs, rectification questionnaires, and validation. |
| **Charts (Analytics)** | `recharts` | 2.15.2 | MIT | Code-split | 100% Compatible | **KEEP** | Used for historical backtesting, search console metrics, and keyword volume trends. |
| **Astrology Visuals** | Custom SVG / Canvas | N/A | Custom / In-house | 0 KB (Native) | Native TS/React | **CANONICAL** | North/South Indian Kundli, Western Wheel, SAV Bindu matrix rendered via native crisp SVG. |
| **Geographic Maps** | SVG Map / Leaflet Fallback | Lightweight | BSD-2-Clause / In-house | < 20 KB | 100% Compatible | **USE / CANONICAL** | Lightweight interactive Astrocartography projection with line inspector. Zero API keys. |
| **PWA & Offline** | Workbox / SW Caching | Standard | MIT | Minimal | Universal | **KEEP / CANONICAL** | Stale-while-revalidate service worker caching for 100% offline ephemeris calculation. |
| **Calendar Exporter** | Custom RFC 5545 Engine | N/A | In-house | < 2 KB | Universal | **KEEP / CANONICAL** | Native `.ics` generator and Google Calendar URL builder. |
| **Virtualization** | `@tanstack/react-virtual` | 3.x | MIT | ~4 KB | 100% Compatible | **OPTIONAL** | Use only for large keyword lists (>500 items) or research backtests. |
| **E2E & Visual QA** | `playwright` | Latest | Apache-2.0 | Dev-only | Node / Browser | **USE** | Cross-browser automated screenshot and visual regression testing. |

---

## 2. Consolidation Actions
1. **Motion Engine**: Enforce `motion/react` as the single animation import across all components.
2. **Icon Engine**: Use `lucide-react` exclusively for celestial dials, status pills, and navigation.
3. **Chart Engine**: Keep `recharts` for tabular metrics; use custom vector SVGs for all Kundli, Vargas, and Synastry dual-wheels.
4. **Zero-PII Privacy**: All geographical coordinates and planetary calculations execute 100% in-browser via Web Workers.
