---
name: 3d-webgl-astronomy-rendering
description: High-fidelity Three.js, React Three Fiber (R3F), Drei, shader materials, orbital mechanics, planetary ring casting, and cinematic solar lighting standards for ASTRO360.
---

# 3D WebGL Astronomy Rendering Skill

This skill defines the technical standards, shader mathematics, and performance benchmarks for 3D astronomical and astrological visualizations in ASTRO360.

## Core Visual & Architectural Principles

1. **True Photorealism & Space Lighting**:
   - Sunlight must originate from the Sun coordinates as a strong `pointLight` ($I \ge 4.5$) with realistic radial attenuation.
   - Every planet mesh must feature day/night terminator shading where the sunlit hemisphere exhibits specular roughness reflections and the deep space side falls into natural dark shadow.
   - Ambient light should remain subtle ($I \le 0.4$) to preserve high-contrast cosmic depth.

2. **Procedural High-Resolution Textures**:
   - Celestial surfaces must be generated via dynamic HTML5 Canvas textures ($1024 \times 512$ minimum) with atmospheric turbulence, storm bands (Jupiter's Great Red Spot), continental terrain (Earth Blue Marble), and polar ice caps (Mars).
   - Textures must use `RepeatWrapping` on $S$-axis and `ClampToEdgeWrapping` on $T$-axis with bilinear filtering.

3. **Collision-Free Dynamic UI Badges**:
   - `Html` components from `@react-three/drei` must be positioned at $Y = \text{radius} + 0.65$ to prevent planet mesh clipping.
   - Employ **Selective Smart Expansion**: Unselected planets display compact circular glyph pins (`[ ♃ ]`, `[ ♄ ]`); only active or hovered planets expand into full pill badges (`[ ♃ Jupiter (Pis 2° 33') ]`).

4. **Performance & Memory Lifecycle**:
   - Canvas context must use `powerPreference: "high-performance"`, `antialias: true`, and `alpha: true`.
   - Textures and geometries must be properly memoized using `useMemo` to prevent GPU memory leaks and garbage collection stutters.
   - Maintain a steady 60 FPS on both mobile GPUs (WebGL 2.0) and high-refresh desktop monitors.
