# 🔌 ASTRO360 OMNI — API & INTEGRATION SPECIFICATIONS

---

## 1. Engine Calculation APIs (Internal Engine Services)

### A. Astronomical Ephemeris Service
- **Function**: `calculatePlanetPositions(date: Date, latitude: number, longitude: number, ayanamsha: string)`
- **Returns**: `Array<{ name: string, longitude: number, sign: string, house: number, isRetrograde: boolean }>`
- **Accuracy**: Lahiri Ayanamsha (`24.2132°`), 9 Graha sidereal coordinates.

### B. Vimshottari Dasha Service
- **Function**: `calculateVimshottariDasha(moonLongitude: number, birthDate: Date)`
- **Returns**: `{ currentMahadasha: string, currentAntardasha: string, mahadashas: Array<{ lord: string, startDate: Date, endDate: Date }> }`

### C. Biorhythm Energy Service
- **Function**: `calculateBiorhythms(birthDate: Date, targetDate: Date)`
- **Formula**: `Physical = sin(2πt / 23)`, `Emotional = sin(2πt / 28)`, `Intellectual = sin(2πt / 33)`, `Intuitive = sin(2πt / 38)`

---

## 2. Multi-Agent AI Telemetry Integration APIs

- **Langfuse AI Token Tracing**: `GET /api/observability/langfuse` — Returns live AI token usage metrics (1.24M Tokens tracked across 16 Agents).
- **Mem0 & Qdrant Sync**: `GET /api/observability/qdrant` — Returns vector database health (2ms response time).
