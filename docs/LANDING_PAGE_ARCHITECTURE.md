# ASTRO360 — Landing Page Architecture

## 1. Executive Information Architecture (16-Stage Journey)
The ASTRO360 landing page is structured around a progressive psychological funnel moving the visitor from curious to empowered researcher:

1. **HEADER**: Sticky, lightweight navigation with brand logo, product pillars, language selector, and 'Create Free Chart' CTA.
2. **HERO SECTION**:
   - Eyebrow: `ASTROLOGY, REIMAGINED`
   - Primary Headline: `BE YOUR OWN ASTROLOGER.`
   - Subheadline: `Explore your chart, ask questions, compare astrology systems, and understand the reasoning behind every result.`
   - Primary CTA: `CREATE YOUR FREE CHART` → 1-tap onboarding.
   - Secondary CTA: `ASK ASTRO360` → Interactive inquiry engine.
   - Visual: Interactive 3D Celestial Observatory consuming live ASTROCORE coordinates.
3. **TRUST / METHODOLOGY STRIP**: 4 Pillar Guarantee: Deterministic Calculations • Multi-System Analysis • Transparent Reasoning • Reproducible Results.
4. **THE PROBLEM**: `ASTROLOGY IS EVERYWHERE. UNDERSTANDING IT ISN'T.` Editorial storytelling confronting opaque single-astrologer readings.
5. **THE SOLUTION**: `ONE PLACE TO EXPLORE YOUR ASTROLOGY.` Ecosystem connecting Charts → Forecast → Ask → Compare → Evidence → Research.
6. **INTERACTIVE ASK DEMO**: Live question simulation (`When is my peak career period?`) demonstrating intent routing, engine concordance (82%), and [Why?] evidence breakdown.
7. **HOW ASTRO360 THINKS**: Transparent 10-step pipeline from question intent to classical scripture grounding.
8. **MULTI-ENGINE PERSPECTIVES**: Side-by-side cards for Vedic, Western, KP, Jaimini, Tajika, BaZi, and Islamic frameworks.
9. **ENGINE AGREEMENT VISUAL**: Explains concordance ratio vs. probability: `Agreement != Accuracy`.
10. **CHART VIEWER SHOWCASE**: Interactive North Indian Diamond, South Indian Box, and Western Circular Wheel preview.
11. **FORECAST & TIMELINES**: Horizontal temporal timeline with intensity markers and window intersections.
12. **ASTROCARTOGRAPHY / MAP**: Interactive vector world map displaying planetary relocation power lines.
13. **RESEARCH LAB SUITE**: Backtesting, classical scripture rule verification, and cryptographic reproducibility manifests.
14. **EDITORIAL BRAND STORY**: `BE YOUR OWN ASTROLOGER.`
15. **FAQ ACCORDION**: Accessible semantic HTML answering methodology, data privacy, and multi-tradition inquiries.
16. **FINAL CTA & FOOTER**: `YOU'VE ASKED THE QUESTION. NOW EXPLORE THE CHART.`

---

## 2. Technical Stack & Modularity
- **UI Framework**: React 19 + TypeScript + Vite
- **Motion**: `motion/react` declarative springs and gestures
- **3D Graphics**: Three.js + React Three Fiber + Drei (tiered with SVG fallback)
- **Data Visuals**: Custom vector SVG dials & Recharts analytics
- **Zero-PII Privacy**: 100% in-browser Web Worker computation
