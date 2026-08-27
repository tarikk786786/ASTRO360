# ASTRO360 — Third-Party License Audit

**Generated**: 2026-08-27  
**Auditor**: ASTRO360 Engineering  
**Policy**: No RED-licensed code in production. YELLOW code used for offline validation only.

---

## License Classification

| Status | Meaning |
| :--- | :--- |
| 🟢 GREEN | Permissive license (MIT, BSD, Apache 2.0). Safe for all use. |
| 🟡 YELLOW | Copyleft (AGPL, GPL). Validation/reference only. No production import. |
| 🔴 RED | Incompatible or unknown license. Do not use. |

---

## Production Dependencies

| Project | URL | Version | License | Status | Usage | Attribution |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| astronomy-engine | https://github.com/cosinekitty/astronomy | 2.1.19 | MIT | 🟢 GREEN | Direct dependency — core ephemeris engine for all planetary longitude calculations (VSOP87, ELP2000-82B) | Don Cross |
| React | https://github.com/facebook/react | 19.x | MIT | 🟢 GREEN | UI framework | Meta Platforms |
| Vite | https://github.com/vitejs/vite | 7.x | MIT | 🟢 GREEN | Build tooling | Evan You / Vite team |
| Tailwind CSS | https://github.com/tailwindlabs/tailwindcss | 4.x | MIT | 🟢 GREEN | CSS utility framework | Tailwind Labs |
| Zustand | https://github.com/pmndrs/zustand | 5.x | MIT | 🟢 GREEN | State management | Poimandres |
| Three.js / R3F | https://github.com/mrdoob/three.js | 0.185.x | MIT | 🟢 GREEN | 3D visualization | Three.js contributors |
| Recharts | https://github.com/recharts/recharts | 2.x | MIT | 🟢 GREEN | Charts | Recharts team |
| Motion | https://github.com/motiondivision/motion | 12.x | MIT | 🟢 GREEN | Animation | Matt Perry |
| Lucide React | https://github.com/lucide-icons/lucide | latest | ISC | 🟢 GREEN | Icons | Lucide community |
| Zod | https://github.com/colinhacks/zod | 3.x | MIT | 🟢 GREEN | Runtime schema validation | Colin McDonnell |

---

## Validation-Only References (NOT in production bundle)

| Project | URL | Version/Commit | License | Status | Usage | Risk |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Skyfield | https://github.com/skyfielders/python-skyfield | 1.49+ | MIT | 🟢 GREEN | Offline golden dataset generator. Python subprocess for sub-milliarcsecond JPL DE440 validation. | None — runs in CI only |
| Almamesh | https://github.com/hseshadr/almamesh | main | MIT | 🟢 GREEN | Algorithm reference for D1-D60 Varga division, Ashtakavarga, Shadbala formulas. Cleanroom TS reimplementation. | None |
| Kerykeion | https://github.com/g-battaglia/kerykeion | 4.x | AGPL-3.0 | 🟡 YELLOW | Western chart validation oracle ONLY. Runs as isolated Python subprocess. **Zero code imported into ASTRO360.** | AGPL copyleft prevents bundling. Strictly subprocess-isolated. |
| PyJHora | https://github.com/naturalstupid/PyJHora | main | AGPL-3.0 | 🟡 YELLOW | Vedic Dasha/Varga/Yoga validation oracle ONLY. Runs as isolated Python subprocess. **Zero code imported.** | AGPL copyleft. Strictly validation. |
| SolarSage | https://github.com/shaobaobaoer/solarsage | main | MIT (wrapper) / AGPL (Swiss Eph backend) | 🟡 YELLOW | MCP tool schema reference only. No code imported. | Swiss Eph dependency carries AGPL risk. Reference only. |

---

## What Is Reused vs Referenced vs Independently Implemented

| Source | Reused (Code in Bundle) | Referenced (Algorithm Study) | Independently Implemented |
| :--- | :--- | :--- | :--- |
| astronomy-engine | ✅ npm dependency — `Ecliptic()`, `GeoVector()`, `Body.*` | — | — |
| Skyfield | ❌ Not in bundle | ✅ JPL DE440 precision reference | Ayanamsha, Ascendant, Houses in TypeScript |
| Almamesh | ❌ Not in bundle | ✅ D1-D60, Ashtakavarga, Shadbala algorithms | All Vedic engines cleanroom TypeScript |
| Kerykeion | ❌ Not in bundle | ✅ Western chart structure, aspect orbs | All Western engines cleanroom TypeScript |
| PyJHora | ❌ Not in bundle | ✅ Classical Yoga rules, Dasha formulas | All Vedic rules cleanroom TypeScript |
| SolarSage | ❌ Not in bundle | ✅ MCP tool naming/schema patterns | MCP layer uses ASTRO360 native engine |

---

## Risk Summary

> [!IMPORTANT]
> **No AGPL or GPL code exists in ASTRO360's production bundle.** All copyleft-licensed projects (Kerykeion, PyJHora) are used exclusively as offline validation oracles running in separate Python processes. The ASTRO360 TypeScript codebase is independently implemented using the MIT-licensed `astronomy-engine` package as its sole astronomical computation dependency.

> [!NOTE]
> Swiss Ephemeris (used by Kerykeion, PyJHora, and SolarSage internally) is dual-licensed (AGPL-3.0 / commercial). ASTRO360 does NOT use Swiss Ephemeris in any form. All ephemeris calculations use `astronomy-engine` (VSOP87/ELP2000-82B, MIT licensed).
