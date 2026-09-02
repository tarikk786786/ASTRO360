# ASTRO360 — Landing Page Dependency & Framework Audit

## 1. Consolidated Libraries
- **Animation**: `motion/react` exclusively (no dual `framer-motion` imports).
- **Icons**: `lucide-react` exclusively (no monolithic `react-icons`).
- **Charts**: Custom vector SVGs for Kundli/wheels; `recharts` for tabular metrics.
- **3D**: `three` + `@react-three/fiber` + `@react-three/drei` with `AstroWebGLFallback`.
