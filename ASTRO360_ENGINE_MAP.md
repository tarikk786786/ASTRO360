# ASTRO360 — Canonical Engine Architecture Map

**Version**: 3.1.0  
**Updated**: 2026-08-27

---

## Master Calculation Pipeline

```
USER INPUT
  ↓
┌─────────────────────────────────────────┐
│ 1. BIRTH DATA NORMALIZATION             │
│    Name, DOB, Time, Location            │
│    → Latitude/Longitude resolution      │
│    → IANA Timezone lookup               │
│    → UTC conversion                     │
│    → Julian Day calculation             │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 2. ASTRONOMICAL STATE                   │
│    astronomy-engine (MIT, VSOP87)       │
│    → Sun, Moon, Mars, Mercury, Jupiter, │
│      Venus, Saturn ecliptic longitudes  │
│    → Rahu/Ketu (Mean Node formula)      │
│    → Planetary speeds & retrograde      │
│    → Local Sidereal Time                │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 3. AYANAMSHA & ZODIAC FRAME            │
│    calculateAyanamsha()                 │
│    → Lahiri (23.856° @ J2000.0)         │
│    → Raman, KP, Fagan-Bradley, etc.    │
│    → Tropical: offset = 0              │
│    → Sidereal: lon = tropical - ayan   │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 4. NATAL CHART STATE                    │
│    AstronomyEngine.calculateAscendant() │
│    → Proper spherical trigonometry      │
│    → atan2(cos RAMC, -sin RAMC cos ε   │
│      - tan φ sin ε)                     │
│    → House cusps (WS/Equal/Placidus/   │
│      Koch/Porphyry/Regiomontanus/etc.) │
│    → Planetary house assignments       │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 5. ASTROLOGY SYSTEM LAYER              │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌────────┐  │
│  │  VEDIC   │ │ WESTERN  │ │   KP   │  │
│  │ Parashari│ │ Tropical │ │Krishnam│  │
│  │ Jaimini  │ │ Hellenis │ │ urti   │  │
│  │ Tajika   │ │          │ │        │  │
│  └──────────┘ └──────────┘ └────────┘  │
│  ┌──────────┐ ┌──────────┐             │
│  │ CHINESE  │ │ ISLAMIC  │             │
│  │  BaZi    │ │  Falak   │             │
│  │ Zi Wei   │ │  Prayer  │             │
│  └──────────┘ └──────────┘             │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 6. TECHNIQUE & RULE EVALUATION          │
│    ruleRegistry.ts (13 classical rules) │
│    → Vedic transits, yogas, dashas     │
│    → Western progressions, aspects     │
│    → KP cuspal sub-lords               │
│    → BaZi luck pillars                  │
│    → Each rule has: citation, tier,     │
│      tradition, weight                  │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 7. TIMING ENGINE                        │
│    timingEngine.ts                      │
│    → Window: start ≤ peak ≤ end        │
│    → Precision tier (day/week/month/    │
│      quarter/year)                      │
│    → Semantic window merging (15-day    │
│      overlap threshold)                 │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 8. PREDICTION OBJECT                    │
│    predictionSchema.ts (Zod validated)  │
│    → id, question, category, eventType │
│    → start, peak, end, precision       │
│    → intensity, support, conflict      │
│    → systems, techniques, rules        │
│    → evidence, stability, uncertainty  │
│    → engineVersion, ephemerisVersion   │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 9. CONSENSUS & EVIDENCE                 │
│    consensusEngine.ts                   │
│    evidenceEngine.ts                    │
│    → STRONG / MODERATE / MIXED /       │
│      CONFLICT / INSUFFICIENT_DATA      │
│    → Supporting + Contradicting +      │
│      Neutral + Missing factors          │
│    → Deterministic & commutative       │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 10. STABILITY & UNCERTAINTY             │
│     stabilityEngine.ts                  │
│     → 11-point perturbation sweep      │
│     → STABLE / MODERATELY_STABLE /     │
│       SENSITIVE / HIGHLY_SENSITIVE      │
│     → Sources: unknown birth time,     │
│       approximate location, historical │
│       timezone, system disagreement    │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 11. AI PRESENTATION (Last Layer Only)   │
│     questionRouter.ts                   │
│     agentOrchestrator.ts                │
│     → AI explains the Prediction       │
│     → AI CANNOT change: degrees,       │
│       houses, dates, confidence,        │
│       stability, rules, sources         │
│     → If AI conflicts: Prediction wins │
└─────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────┐
│ 12. CONSUMER SURFACES                   │
│     All use the same Prediction object  │
│                                         │
│     Ask → Dashboard → Forecast →       │
│     Charts → Calendar → Reports →      │
│     Studio → API → MCP → Research      │
└─────────────────────────────────────────┘
```

## Source Files

### Core Ephemeris
| File | Purpose |
| :--- | :--- |
| `src/lib/astroCalculations.ts` | Primary planetary position calculator, Panchanga, Dasha, Ashta Koota |
| `src/lib/astronomyEngine.ts` | Proper Ascendant (spherical trig), House Cusps, Longitude formatting |
| `src/lib/astroCoreOrchestrator.ts` | Master pipeline producing CanonicalAstroSchema |
| `src/lib/globalConfig.ts` | Centralized configuration (zodiac, ayanamsha, houses, language) |

### Vedic Suite (`src/lib/vedic/`)
| File | Purpose |
| :--- | :--- |
| `divisionalChartsEngine.ts` | D1–D60 Varga division calculations |
| `dashaEngine.ts` | Multi-level Vimshottari Dasha timeline |
| `doshaEngine.ts` | Manglik, Kaal Sarp evaluation |
| `nakshatraEngine.ts` | 27 Nakshatras, 108 Padas, Gana/Yoni/Nadi attributes |
| `yogaEngine.ts` | Classical Yoga detection (Raja, Dhana, Pancha Mahapurusha) |
| `ashtakavargaEngine.ts` | BAV/SAV 337-point grid |
| `jaiminiEngine.ts` | Chara Karakas, Jaimini techniques |

### Western Suite (`src/lib/western/`)
| File | Purpose |
| :--- | :--- |
| `westernEngine.ts` | Tropical angles, essential dignities |
| `aspectEngine.ts` | Major/minor aspects with orbs |
| `transitEngine.ts` | Transit ingresses and orb tracking |
| `synastryEngine.ts` | Composite midpoints, cross-aspects |

### Chinese Suite (`src/lib/horoscope/`)
| File | Purpose |
| :--- | :--- |
| `chineseAstrologyEngine.ts` | BaZi Four Pillars, 10 Gods, Da Yun, Zi Wei Dou Shu |

### Islamic Suite (`src/lib/islamic/`)
| File | Purpose |
| :--- | :--- |
| `hijriEngine.ts` | Kuwaiti Tabular CE↔AH conversion |
| `prayerTimeEngine.ts` | Astronomical prayer times (5 methods) |
| `qiblaEngine.ts` | Great Circle Qibla bearing |

### Prediction Pipeline (`src/lib/prediction/`)
| File | Purpose |
| :--- | :--- |
| `canonicalPipeline.ts` | 12-step master orchestrator |
| `predictionSchema.ts` | Zod runtime contracts |
| `ruleRegistry.ts` | 13 classical rules with citations |
| `timingEngine.ts` | Window validation & merging |
| `consensusEngine.ts` | Multi-tradition consensus |
| `evidenceEngine.ts` | Supporting/contradicting factors |
| `stabilityEngine.ts` | Birth-time perturbation sweep |
| `rectificationEngine.ts` | Historical milestone alignment |
| `journalAndBacktesting.ts` | Precision, Recall, F1, Brier |

### Schema Layer (`src/lib/schema/`)
| File | Purpose |
| :--- | :--- |
| `canonicalAstroSchema.ts` | Master TypeScript types for all engines |

### Normalized Schemas (`src/lib/astrocore/schemas/`)
| File | Purpose |
| :--- | :--- |
| `CelestialPosition.ts` | Per-body position for cross-engine comparison |
| `ChartState.ts` | Complete chart snapshot with versioning |
| `DefinitionMatrix.ts` | Ensures compatible comparison definitions |

### Validation (`validation/`)
| File | Purpose |
| :--- | :--- |
| `adapters/astronomyEngineAdapter.ts` | Direct astronomy-engine reference positions |
| `differential/differentialEngine.ts` | Comparison engine with PASS/FAIL/EXPECTED_DIFFERENCE |

## Duplicate Calculation Paths (Consolidated)

| Calculation | Before (Duplicated) | After (Canonical) |
| :--- | :--- | :--- |
| Ayanamsha | 3 separate functions with different base values | Single `calculateAyanamsha()` with 23.856° Lahiri base |
| Ascendant | Sunrise approximation + proper spherical trig | `AstronomyEngine.calculateAscendant()` everywhere |
| House Cusps | Naive sign-based + proper quadrant systems | `AstronomyEngine.calculateHouseCusps()` everywhere |
| Dasha | Hardcoded dates + proper timeline calculator | `dashaEngine.ts` with Antardasha/Pratyantar |
| Ashta Koota | Hash-based + proper Nakshatra-based | Moon Nakshatra-based from `nakshatraEngine.ts` |
