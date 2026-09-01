---
name: zero-error-resilience
description: Production-grade fault-tolerance, dynamic chunk loading recovery with exponential backoff, isolated React ErrorBoundary containment, and zero-downtime resilience standards for ASTRO360.
---

# Zero-Error Resilience Standards

## 1. Dynamic Chunk Loading Recovery
1. **Automated Chunk Retry**: Never use unadorned `React.lazy()` for code-split components. Always use `lazyWithRetry()` with 2-tier exponential backoff ($800\text{ms} \to 1600\text{ms}$).
2. **Deployment Invalidation Recovery**: When a new production build invalidates previous chunk hashes, detect `ChunkLoadError` and perform a controlled single-reload from the current version.
3. **Fallback Suspense Guards**: Every code-split view must render a `CosmicCelestialLoader` fallback with accessible status indicators.

## 2. Component Error Isolation
1. **Granular Error Boundaries**: Wrap individual heavy calculation panels (Charts, Dasha, 3D Canvas, Solfeggio Synth) in dedicated `ErrorBoundary` instances so one rendering anomaly never crashes the whole page.
2. **Deterministic Fallbacks**: Provide a "Reset View Telemetry" button that clears invalid local tab states and restores a clean astrological state without forcing data loss.

## 3. Data Integrity & Boundary Assertions
1. **Zero NaN Propagation**: Every numerical calculation (degrees, Julian day, latitude/longitude, Ayanamsha offset) must be validated with `Number.isFinite()` and sanitized before rendering.
2. **Safe Default Fallbacks**: If user birth time is missing or approximate, smoothly default to 12:00 Local Solar Noon and attach an `unknown_birth_time` uncertainty flag.
