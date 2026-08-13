# ASTRO360 OMNI — Master Implementation Plan

## 1. Objectives & Overview
Transform ASTRO360 into a world-class, production-grade global astrology platform featuring clean multi-tradition planetary calculation engines, printable executive dossier reports, high-speed audio soundboards, responsive mobile touch targets, and OwnPay consultation checkouts.

---

## 2. Phase Breakdown

### Phase 1: Repository Audit & Core Technical Foundation
- Complete deep codebase audit and document architecture, dependencies, state management, and issue priorities (P0–P3).
- **Status**: Completed (`PROJECT_AUDIT.md`, `DESIGN_SYSTEM.md`, `ASTROLOGY_ENGINE.md`, `API_AUDIT.md`, `SECURITY_AUDIT.md`, `TEST_PLAN.md`).

### Phase 2: Golden Dataset Verification & Astronomical Engine Precision
- Create versioned reference dataset (`tests/astrology_golden_dataset.json`).
- Verify Lahiri Sidereal Ayanamsha (`24.2216°`) calculations for all 9 Grahas and Ascendant.

### Phase 3: Dashboard Redesign & "Today's Cosmic Why & Solution" Card
- Add high-visibility diagnostic card on the main dashboard (`CosmicIntelligenceCenter.tsx`).
- Provide instant root-cause analysis and prescribed multi-tradition remedies (Mantra, Solfeggio 528 Hz, Gemstones, Abhijit Muhurta).

### Phase 4: Executive PDF & Dossier Report Generator
- Implement printable, multi-section dossier report preview (`ExecutiveReportGenerator.tsx`).
- Enable native `@media print` PDF exports for Birth, Career, Marriage, Wealth, and 12-Month Annual Forecasts.

### Phase 5: OwnPay Consultation Integration & Top Bar Navigation Fixes
- Connect `CommunityConsultationHub.tsx` booking flow directly to `OwnPayPaymentModal.tsx` checkout drawer.
- Fix top header bar consultation, customization, and profile triggers in `App.tsx`.

### Phase 6: Mobile-First UX & Accessibility Audit
- Enforce 44px minimum touch targets, touch scroll containers for low-res screens (320px–375px), and WCAG focus states.

### Phase 7: Automated Testing & Production Deployment
- Execute `pnpm run build` and `pnpm -r run typecheck`.
- Push verified commits to GitHub `replit-build` and `main` branches.
