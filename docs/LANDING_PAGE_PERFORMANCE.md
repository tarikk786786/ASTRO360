# ASTRO360 — Landing Page Performance & Optimization

## 1. Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: < 1.8s (Above-the-fold HTML/CSS loads instantly before 3D canvas).
- **Interaction to Next Paint (INP)**: < 50ms (Zero blocking computation on main thread).
- **Cumulative Layout Shift (CLS)**: < 0.02 (Strict aspect-ratio containers on all charts and canvases).

## 2. Dynamic Code Splitting Strategy
- `Three.js` and `@react-three/fiber` lazy-loaded with 2D fallback.
- `ResearchLabSuite`, `AstroMap`, and `AstroChartViewer` code-split into standalone production chunks.
