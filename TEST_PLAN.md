# ASTRO360 OMNI — Quality Assurance & Testing Strategy

## 1. Test Suite Coverage
ASTRO360 maintains comprehensive unit, integration, and astronomical regression test suites using standard test runners and custom assertion helpers.

- **Unit Tests**: Test calculation helpers ([`astroCalculations.test.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/lib/astroCalculations.test.ts), [`dashaEngine.test.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/backend/dashaEngine.test.ts), [`audioResonator.test.ts`](file:///c:/Users/tarik/Downloads/Documents/ASTRO/src/backend/audioResonator.test.ts)).
- **Integration Tests**: Verify multi-component data flow between `BirthChartGenerator.tsx`, `ExecutiveReportGenerator.tsx`, and `CommunityConsultationHub.tsx`.
- **Astronomical Golden Dataset Regression**: Validates planet degree calculations against reference astronomical tables (`tests/astrology_golden_dataset.json`).
- **Load & Performance Testing**: k6 load test script (`tests/k6-loadtest.js`) and Locust file (`tests/locustfile.py`).

---

## 2. Automated Commands
```bash
# Typecheck workspace
pnpm -r run typecheck

# Production build verification
pnpm run build
```
