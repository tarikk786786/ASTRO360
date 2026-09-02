# ASTRO360 — Frontend License Audit

## Executive Summary
This document records all external open-source repositories and packages used in the ASTRO360 frontend codebase, verifying commercial-use compatibility, permissive licensing, and copyright attribution.

---

## 1. License Registry

| Repository / Package | Version | License | Purpose in ASTRO360 | Code / Assets Reused | Commercial Use | Decision |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **react / react-dom** | 19.x | MIT | Core UI Framework | Runtime | Permitted | **APPROVED** |
| **motion** | 12.43.0 | MIT | UI & Spring Animation | Motion components | Permitted | **APPROVED** |
| **astronomy-engine** | 2.1.19 | MIT | High-Precision Ephemeris Calculations | Vector mechanics | Permitted | **APPROVED** |
| **three / @react-three/fiber** | 0.185.1 / 9.7.0 | MIT | 3D WebGL Solar System & Atmosphere | 3D Canvas shaders | Permitted | **APPROVED** |
| **@react-three/drei** | 10.7.8 | MIT | 3D Helpers & Orbit Camera | Billboards & Stars | Permitted | **APPROVED** |
| **lucide-react** | 0.475.0 | ISC | System Vector Icons | SVG Icon glyphs | Permitted | **APPROVED** |
| **@radix-ui/react-*** | 1.x / 2.x | MIT | Accessible UI Primitives | Modals, Sheets, Dialogs | Permitted | **APPROVED** |
| **zustand** | 5.0.15 | MIT | Global State Management | Lightweight store | Permitted | **APPROVED** |
| **@tanstack/react-query** | 5.x | MIT | Async Data Caching | Data fetching | Permitted | **APPROVED** |
| **recharts** | 2.15.2 | MIT | Analytical Charts & Metrics | Bar / Line charts | Permitted | **APPROVED** |
| **sonner** | 2.0.7 | MIT | Toast Notification System | Notification toasts | Permitted | **APPROVED** |
| **clsx / tailwind-merge** | Latest | MIT | Dynamic Class Construction | Utility classes | Permitted | **APPROVED** |
| **zod** | 3.x | MIT | Schema Validation | Data contracts | Permitted | **APPROVED** |

---

## 2. Compliance & Attribution Statement
All third-party libraries utilized in ASTRO360 carry permissive open-source licenses (MIT, ISC, BSD-2-Clause, Apache-2.0). ASTRO360 complies with all attribution requirements. Zero copyleft (GPL/AGPL) code is linked into the frontend distribution.
