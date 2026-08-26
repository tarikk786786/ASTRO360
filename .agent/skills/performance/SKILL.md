---
name: performance
description: Web performance, bundle optimization, code splitting, and Core Web Vitals optimization standards for ASTRO360.
---

# Web Performance & Bundle Optimization Standards

## Optimization Rules
1. **Dynamic Code-Splitting**:
   - Split heavy studio catalogs, 3D canvases (`UniverseCanvas`), and mapping libraries (`CosmicLeafletMap`) into dynamic `React.lazy()` chunks.
   - Keep initial bundle size compact (< 2MB uncompressed, < 550KB gzip).
2. **Runtime Memory & Rendering Efficiency**:
   - Memoize expensive ephemeris loops and chart aspect calculations (`useMemo`, `useCallback`).
   - Use passive listeners `{ passive: true }` for scroll and resize handlers.
   - Debounce heavy search queries and responsive canvas resizes.
3. **Asset & Font Delivery**:
   - Preconnect to Google Fonts and static asset CDNs.
   - Use vector SVGs for crisp, lightweight astrological symbols and charts.
