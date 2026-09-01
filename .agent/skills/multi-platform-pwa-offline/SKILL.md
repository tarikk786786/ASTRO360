---
name: multi-platform-pwa-offline
description: Progressive Web App architecture, service worker asset caching, Stale-While-Revalidate strategies, zero-latency offline computations, and local-first encryption standards for ASTRO360.
---

# Multi-Platform PWA Offline Standards

## 1. Service Worker Caching Architecture
1. **Core Assets Caching**: Cache all static JavaScript bundles, CSS stylesheets, web fonts, and icon vectors under a versioned cache key.
2. **Stale-While-Revalidate**: Serve cached calculations instantly ($0\text{ms}$) while updating the cache in the background.
3. **Airplane Mode Readiness**: Ensure all 152 calculation engines, chart renderers, and panchang calculators function 100% without an active internet connection.

## 2. Local-First Client Security
1. **WebCrypto AES-GCM**: Optional client-side encryption of user birth charts and sensitive personal records.
2. **Zero Cloud PII Sync**: User astrology telemetry stays stored strictly within browser `localStorage` / `IndexedDB`.
