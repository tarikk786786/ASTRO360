# ASTRO360 OMNI — Astrology Calculation Engine Architecture

## 1. Mathematical Architecture & Separation of Concerns
ASTRO360 enforces a strict architectural boundary between deterministic astronomical calculations and interpretive text/AI synthesis.

```
Birth Data Input (Date, Time, Lat, Lon)
   │
   ▼
Validation & Timezone Engine (UTC / Julian Date conversion)
   │
   ▼
Deterministic Ephemeris Calculation Engine (Lahiri Sidereal Ayanamsha 24.2216°)
   │
   ├── Ephemeris Positions (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu)
   ├── Ascendant & 12 House Cusp Coordinates
   ├── 27 Nakshatras & Pada Calculation
   ├── Vimshottari Mahadasha & Antardasha Timeline
   ├── Ashta Koota 36-Guna Synastry Matching
   └── D1–D60 Divisional Charts
   │
   ▼
Structured JSON Celestial Telemetry
   │
   ▼
AI & RAG Interpretation Layer / Presentation Components
```

---

## 2. Ephemeris & Ayanamsha Verification
- **Ayanamsha**: Sidereal Lahiri Ayanamsha (`24.2216°` baseline).
- **Planet Calculations**: High-precision trigonometric position resolution for 9 Grahas.
- **Divisional Charts**:
  - D1: Rashi (Natal Chart)
  - D9: Navamsha (Spiritual & Spouse Alignment)
  - D10: Dashamsha (Career & Executive Influence)
  - D60: Shashtiamsha (Karmic Blueprint)

---

## 3. Golden Test Dataset (`tests/astrology_golden_dataset.json`)
The calculation engine is verified against standard astronomical reference points:
- **Reference Date**: `1998-06-15 12:00:00 UTC`
- **Location**: `21.4225° N, 39.8262° E` (Mecca)
- **Expected Metrics**:
  - Ascendant: Virgo / Leo boundary
  - Sun: Gemini (~0° Sidereal)
  - Vimshottari Dasha: Rahu / Jupiter phase calculation
