---
name: fullstack-engineering-mastery
description: Production-grade fullstack architecture standards, Zero-PII client encryption, WebAssembly acceleration, Service Worker offline PWA caching, and Sub-50ms performance engineering.
---

# Fullstack Engineering Mastery Standards

## 1. Zero-PII & Client-Side Privacy Architecture

1. **Local-First Storage**: User birth details (name, DOB, time, location, coordinates) must be stored in `localStorage` or `IndexedDB` with optional client-side AES-GCM encryption.
2. **Zero Server Transmission**: Core astrological ephemeris calculations must execute **100% inside the client browser** via JavaScript/WebAssembly.
3. **Zero Telemetry Leaks**: Never send user names, dates of birth, or birth coordinates to third-party analytics (Google Analytics, Mixpanel) in plain text.

---

## 2. Sub-50ms Performance Engineering & Web Vitals

1. **Core Web Vitals Thresholds**:
   - **LCP (Largest Contentful Paint)**: $< 1.2\text{s}$
   - **INP (Interaction to Next Paint)**: $< 50\text{ms}$
   - **CLS (Cumulative Layout Shift)**: $< 0.02$
2. **Chunk Splitting & Dynamic Imports**:
   - All heavy suites (`UniverseCanvas`, `LiveCosmicDiagnostics`, `ExecutiveCosmicDossierSuite`, `BirthChartGenerator`) must be loaded via `React.lazy()` with Suspense fallbacks.
   - Bundle size for initial landing viewport must remain $< 150\text{kB}$ gzipped.
3. **Rendering Optimization**:
   - Complex SVG planetary wheels and 3D Starfields must be wrapped in `React.memo()` with stable prop references to avoid unnecessary re-renders.

---

## 3. Offline Progressive Web App (PWA) Standards

1. **Service Worker Caching**:
   - Cache static assets (`.js`, `.css`, fonts, astronomical tables) via Stale-While-Revalidate.
2. **Deterministic Offline Fallbacks**:
   - The user must be able to calculate natal charts, Vimshottari Dashas, and Ashtakavarga matrices even while completely offline in airplane mode.
3. **Web Push Notification Engine**:
   - Daily morning notifications scheduled via Service Worker for **Abhijit Muhurta** and **Rahu Kaal** timing windows.
