# 🏛️ ASTRO360 System Architecture & Ephemeris Pipeline

## 1. Architectural Philosophy: "Calculated First. Explained Second."

ASTRO360 operates under a strict four-layer pipeline to ensure zero hallucinations and absolute mathematical reproducibility. Frontend UI components and AI reasoning models never independently calculate astronomical physics; they consume structured, immutable outputs from **AstroCore**.

```
[ Tier 1: AstroCore Mathematical Engine ]
   NASA JPL DE440 Ephemeris • Sub-Arcsecond Celestial Coordinates • True Lahiri Ayanamsha
                                  │
                                  ▼
[ Tier 2: Multi-Tradition Astrological Calculators ]
   Vedic (Jyotish) • Western Tropical • KP Stellar • Jaimini Sutras • Panchanga
                                  │
                                  ▼
[ Tier 3: Universal Question Intent Engine & Synthesis ]
   Deterministic Semantic Classification • 3-Level Progressive Disclosure • Explainability
                                  │
                                  ▼
[ Tier 4: Zero-PII Client Experience & Workspaces ]
   Ask-First Entry • Mobile-First Responsive UI • Astro Studio • High-Res PDF Dossiers
```

---

## 2. AstroCore Ephemeris Standards

- **Ephemeris Base**: Swiss Ephemeris & NASA JPL DE440 planetary theory (`astronomy-engine`).
- **Ayanamsha Calculation**: True Lahiri (Chitra Paksha) calibrated against standard J2000.0 epoch ($23.85^\circ$ at 2000-01-01, precessing at $50.29''$ / year).
- **House Systems**:
  - Vedic: Whole Sign (*Rashi as Bhava*) & Sripati (*Porphyry cuspal division*).
  - Western: Placidus, Equal House, Koch, Regiomontanus.
  - KP: Placidus cuspal division mapped to 249 sub-lord divisions.
- **Divisional Vargas**: D1 (Rashi), D2 (Hora), D3 (Drekkana), D4 (Chaturthamsha), D7 (Saptamsha), D9 (Navamsha), D10 (Dashamsha), D12 (Dwadashamsha), D16 (Shodashamsha), D20 (Vimshamsha), D24 (Chaturvimshamsha), D27 (Saptavimshamsha), D30 (Trimshamsha), D60 (Shashtiamsha).

---

## 3. Universal Question Intent Engine & Router (`src/lib/questionRouter.ts`)

The Ask-First entry experience (`OmniAskUniversalHero.tsx`) evaluates natural language queries:
1. **Semantic Classification**: Identifies Category (`CAREER`, `RELATIONSHIP`, `FINANCE`, `TIMING`, `VEDIC`, `COMPATIBILITY`, `DOSHA_REMEDY`) and Intent (`TIMING`, `CALCULATION`, `EXPLORATION`, `COMPARISON`, `REMEDY`).
2. **Deterministic Routing**: Routes to destination tab without forcing manual catalog browsing.
3. **Progressive Disclosure**:
   - **Level 1**: Concise plain-language summary.
   - **Level 2**: "Why this answer?" evidence tree with multi-system consensus.
   - **Level 3**: Technical planetary longitudes, active houses, Dasha period, and BPHS / Tetrabiblos citations.
4. **Next Best Action**: Contextual 1-click progression to full charts or forecast timelines.

---

## 4. Security & Privacy by Design

- **OWASP ASVS 5.0.0 Level 3 Compliance**: Verified in `tests/security/owaspAsvsSecurityAudit.test.ts`.
- **SSRF Shield (`src/lib/security/ssrfShield.ts`)**: Prevents server-side request forgery by blocking loopback (`127.0.0.1`), private RFC1918 subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), integer-encoded IPs, and cloud metadata endpoints (`169.254.169.254`, `metadata.google.internal`).
- **Zero-PII Telemetry**: Seeker birth dates, coordinates, and private notes are strictly redacted from client telemetry and external logs.
- **Strict Headers**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, Content Security Policy (`CSP`).

---

## 5. Verification & Master Forensic Testing

The platform maintains a 10-suite master forensic QA runner (`tests/forensicRunner.ts`):
1. Astronomy & AstroCore Forensics (`ephemerisPrecision.test.ts`)
2. Classical Astrology, Dasha & Panchanga (`dashaAndPanchang.test.ts`)
3. Prediction Engine & Stability Perturbations (`predictionEngine.test.ts`)
4. Security, SSRF & Zero-PII (`securityAndSsrf.test.ts`)
5. API Schema & Request Contracts (`apiAndMswMatrix.test.ts`)
6. Accessibility (a11y) & WCAG AAA (`accessibilityAudit.test.ts`)
7. Chaos & Fault Tolerance (`chaosAndRecovery.test.ts`)
8. Real-User Simulation & Mobile Personas (`realUserSimulation.test.ts`)
9. OWASP ASVS 5.0.0 & WSTG Pentest (`owaspAsvsSecurityAudit.test.ts`)
10. AI Question Intent Engine & Universal Router (`questionIntentEngine.test.ts`)
