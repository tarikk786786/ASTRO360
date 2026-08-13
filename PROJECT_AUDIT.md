# ASTRO360 OMNI — Complete Technical & Platform Audit

## 1. Architecture Overview
ASTRO360 is a multi-tradition, real-time astronomical and astrological platform built on Vite + React 19 + TypeScript, Tailwind CSS, Radix UI primitives, Motion (Framer Motion), Recharts, and Web Audio API synthesizers.

- **Frontend Stack**: React 19, TypeScript ~5.9.3, Vite 7.3.6, Tailwind CSS with `@tailwindcss/vite`, Radix UI, Framer Motion (`motion/react`), Lucide React icons, Recharts.
- **Backend / API Stack**: Serverless Vercel / Node.js API endpoint ([`api/astrology.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/api/astrology.ts)) and in-browser deterministic astronomical calculation engines ([`src/lib/astroCalculations.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/lib/astroCalculations.ts), [`src/lib/astronomyEngine.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/lib/astronomyEngine.ts), [`src/backend/dashaEngine.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/backend/dashaEngine.ts)).
- **Database & Auth**: Supabase integration client ([`src/lib/supabase.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/lib/supabase.ts)), LocalStorage fallback store, custom AuthScreen modal ([`AuthScreen.tsx`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/components/AuthScreen.tsx)).
- **Astrology Engine Architecture**: Deterministic astronomical ephemeris calculations (Lahiri Sidereal Ayanamsha 24.2216°), Vimshottari Mahadasha timeline calculation, Panchang Tithi/Nakshatra/Yoga/Karna/Abhijit Muhurta, Ashta Koota 36-Guna matching, D1-D60 Divisional charts.
- **AI Layer**: Client-side RAG Knowledge Base ([`src/backend/ragKnowledgeBase.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/backend/ragKnowledgeBase.ts)) and multi-agent synthesis orchestrator ([`src/backend/agentOrchestrator.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/backend/agentOrchestrator.ts)).
- **Audio & Acoustic Layer**: Web Audio API Solfeggio oscillators (174Hz–963Hz), real MP3 audio stream engine (Quran.com Alafasy CDN, Wikimedia audio), Tibetan singing bowl chimes.
- **Payment Protocol**: OwnPay gateway integration ([`src/lib/ownpayEngine.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/lib/ownpayEngine.ts), [`src/components/OwnPayPaymentModal.tsx`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/components/OwnPayPaymentModal.tsx)).

---

## 2. Issues & Audit Matrix (P0 - P3)

### Priority P0 — Critical / High Impact
1. **Lack of Golden Test Dataset for Ephemeris Regression**: Ephemeris and planet degree outputs lack a versioned golden reference dataset file (`tests/astrology_golden_dataset.json`) to prevent unintended calculation drifts across releases.
2. **Timezone & Daylight Savings Geolocation Resolution Edge Cases**: Historical UTC offset lookups rely on browser native `Intl` or static defaults. High-latitude or historical timezone transitions (e.g., pre-1970 birth dates) require explicit fallback handling.
3. **Responsive Chart Touch Handling on Low-Resolution Screens (320px–375px)**: SVG zodiac wheels and complex divisional chart grids can cause horizontal scrollbar shifts on ultra-compact mobile screens without touch-pan containers.

### Priority P1 — Important
1. **Light Mode Styling Refinement**: While dark mode is high-contrast, light mode needs dedicated CSS variable token audits across modal dialogs and chart tooltips to ensure WCAG AAA contrast compliance.
2. **Offline & Intermittent Network Fallback State**: When external APIs (e.g. AlAzan or open geocoding) fail or run offline, error banners must gracefully switch to deterministic offline mathematical approximations without interrupting user flow.
3. **Structured Golden AI Interpretation Prompts**: AI interpretive text generator needs explicit scientific disclaimers and structured output schema checks (Summary, Strengths, Challenges, Career, Relationships, Finance, Wellbeing, Limitations).

### Priority P2 — Improvements
1. **Interactive Birth Chart Hover & "Explain This" Inspector**: Enhance birth chart wheel interactivity with click-to-inspect modals for every planet, house, and aspect.
2. **Beginner vs Expert Toggle Mode**: Provide an application-wide mode toggle that simplifies technical terms (e.g. "D9 Navamsha" → "Soul & Relationship Chart", "Vimshottari Dasha" → "Life Phase Timeline").
3. **Unified Global Search Index**: Expand the command palette search index to cover all 150+ tools, remedies, reports, and traditional knowledge suites.

### Priority P3 — Polish
1. **Animation Performance on Low-End Mobile Devices**: Add `will-change: transform` and reduced-motion `@media (prefers-reduced-motion: reduce)` rules for high-density particle backgrounds.
2. **Print CSS Styling for Dossier Reports**: Refine `@media print` rules in `ExecutiveReportGenerator.tsx` to ensure multi-page dossiers print cleanly to PDF without trailing empty header elements.

---

## 3. Tech Stack & Environment Dependencies
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`: Optional Supabase cloud persistence.
- `OWNPAY_MERCHANT_KEY`: Crypto/Card payment intent signer.
- `VITE_ALAZAN_API_URL`: AlAzan prayer & astronomical endpoint fallback.
