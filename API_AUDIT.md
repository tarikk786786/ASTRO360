# ASTRO360 OMNI — Master API Architecture & Public APIs Integration Audit

**Version**: 4.0.0  
**Updated**: 2026-10-24  
**Auditor**: ASTRO360 Principal Platform & API Architecture Team  
**Standard**: Zero Client Key Leaks • Rate-Limited Proxy • Open-Source Directory Synchronization  

---

## 1. Executive Summary & Source Directory Alignment

ASTRO360’s API architecture integrates deterministic client-side calculation engines (VSOP87/ELP2000-82B) with curated, high-reliability external REST and GraphQL services. External endpoints are cross-checked, verified, and synchronized across **7 authoritative community-standard open-source API catalogs**:

| # | Community Catalog | GitHub Repository | Coverage & Focus | ASTRO360 Integration Status |
|:---|:---|:---|:---|:---|
| 1 | **public-apis** | [`public-apis/public-apis`](https://github.com/public-apis/public-apis) | 1,400+ public APIs covering science, weather, geocoding, AI, and developer tools | Verified & Cataloged in `src/lib/publicApisRegistry.ts` |
| 2 | **public-api-lists** | [`public-api-lists/public-api-lists`](https://github.com/public-api-lists/public-api-lists) | 730+ free public APIs across 48 categories in machine-readable JSON schema | Verified & Cataloged (Keyless Focus) |
| 3 | **apis-collection** | [`tools-collection/apis-collection`](https://github.com/tools-collection/apis-collection) | Broad developer collection for AI/ML, analytics, science, and barcodes | Referenced for AI and Geocoding APIs |
| 4 | **API-mega-list** | [`cporter202/API-mega-list`](https://github.com/cporter202/API-mega-list) | Wide-ranging resource list for automation, AI, and environmental telemetry | Referenced for Space Weather and USGS feeds |
| 5 | **APIs.guru OpenAPI Directory** | [`APIs-guru/openapi-directory`](https://github.com/APIs-guru/openapi-directory) | 2,500+ machine-readable OpenAPI/Swagger specs with programmatic access at [`api.apis.guru/v2/list.json`](https://api.apis.guru/v2/list.json) | Programmatic Discovery & Contract Validation |
| 6 | **Public-APIs (n0shake)** | [`n0shake/Public-APIs`](https://github.com/n0shake/Public-APIs) | Supplementary curated directory for side projects and apps | Cross-referenced for active uptime & CORS status |
| 7 | **public-apis (marcelscruz)** | [`marcelscruz/public-apis`](https://github.com/marcelscruz/public-apis) | Collaborative API directory for cross-verifying endpoints | Cross-referenced for HTTPS and auth tiers |

---

## 2. Integrated Public APIs Matrix

ASTRO360 leverages the following verified public APIs across 8 functional domain categories:

### A. Astronomy & Space Telemetry
* **NASA APOD (Astronomy Picture of the Day)**: Daily high-resolution cosmic imagery and astrophysics explanations (`https://api.nasa.gov/planetary/apod`). Proxied server-side via `/api/proxy?service=nasa`.
* **NASA NeoWs (Near Earth Object Web Service)**: Asteroid close-approach and orbital telemetry for celestial transit research.
* **Sunrise-Sunset.org**: Keyless astronomical sunrise, sunset, solar noon, and twilight calculation (`https://api.sunrise-sunset.org/json`) for calibrating Vedic Dinamana and Muhurta timings.
* **Open-Meteo Solar**: Solar irradiance and solar elevation angles used for planetary hora daylight partitions and Surya Arghya remedial timing.
* **NASA JPL Horizons**: Scientific solar system body vectors for benchmarking ASTRO360 astronomical calculations against JPL DE440 standards.

### B. Geocoding & Geographic Coordinates
* **OpenStreetMap Nominatim**: Keyless forward and reverse geocoding for birthplace location-to-coordinate conversion (`https://nominatim.openstreetmap.org`).
* **BigDataCloud Client Reverse Geocode**: Zero-auth client-side reverse geocoding for instant device locality detection.
* **Open-Elevation API**: Global elevation and altitude data used for topocentric parallax corrections in Moon and Ascendant degree calculations.
* **GeoJS**: Keyless IP geolocation for zero-friction timezone and city defaults for first-time visitors.

### C. Space Weather & Geomagnetic Phenomena
* **NOAA SWPC Planetary K-Index**: Real-time 15-minute geomagnetic storm monitoring (`https://services.swpc.noaa.gov/json/planetary_k_index_1m.json`) for correlating space weather disturbances with planetary transits.
* **NASA DONKI**: Database of Notifications, Knowledge, Information for solar flares and coronal mass ejections (CMEs).
* **USGS Earthquake API**: Real-time seismic feed (`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson`) for mundane astrology and planetary aspect research.

### D. Sacred Traditions, Culture & Language
* **Aladhan Islamic Timings API**: Comprehensive Islamic prayer times and Hijri lunar calendar calculations with 15+ juristic calculation methods (`https://api.aladhan.com/v1/timings`).
* **Al-Quran Cloud REST API**: Authentic Quranic text in Uthmani script with translations and certified audio recitations by classical Qaris (`https://api.alquran.cloud/v1`).
* **Wikipedia REST API**: Structured entity summaries for Vedic Nakshatra deities, Graha mythology, and Sanskrit etymology (`https://en.wikipedia.org/api/rest_v1/page/summary`).

### E. Calendar, Timezones & Ephemeris Time
* **WorldTimeAPI**: Accurate IANA timezone timestamps, Daylight Saving Time (DST) status, and UTC offsets (`https://worldtimeapi.org/api/timezone`).
* **REST Countries API**: Country codes, primary languages, currencies, and capital coordinates for internationalization and locale defaults (`https://restcountries.com/v3.1`).

### F. Developer & OpenAPI Discovery
* **APIs.guru OpenAPI Master Catalog**: Programmatic access to over 2,500+ OpenAPI specifications via `https://api.apis.guru/v2/list.json`. Integrated into ASTRO360’s Developer Hub for interactive schema inspection.

---

## 3. Serverless API Proxy Architecture & Security

To prevent client credential leaks and bypass browser CORS limitations, all third-party services that require authorization or caching are routed through ASTRO360’s serverless proxy (`api/proxy.ts`):

```
┌─────────────────────────┐
│     Client Browser      │
│  (ASTRO360 Frontend)    │
└────────────┬────────────┘
             │  GET /api/proxy?service=...
             ▼
┌─────────────────────────┐
│   Node.js API Proxy     │ ◄─── Rate Limiter (60 req/min per IP)
│    (api/proxy.ts)       │ ◄─── CORS Whitelist & Header Sanitization
└────────────┬────────────┘ ◄─── Server-Side Secrets (.env)
             │
             ├──► NASA APOD / NeoWs (api.nasa.gov)
             ├──► Aladhan Timings & Asma Al-Husna (api.aladhan.com)
             ├──► Al-Quran Cloud (api.alquran.cloud)
             ├──► NOAA Space Weather K-Index (services.swpc.noaa.gov)
             └──► Sunrise-Sunset (api.sunrise-sunset.org)
```

### Security Directives Enforced:
1. **Zero Client-Side Credentials**: No API keys are prefixed with `VITE_`. All tokens (`NASA_API_KEY`, `KALIMAT_API_KEY`, `UMMAH_API_KEY`) reside strictly in serverless runtime environments.
2. **Keyless-First Fallback**: Free and keyless public providers (e.g., Aladhan, Sunrise-Sunset, Open-Meteo, OpenStreetMap) are attempted first before falling back to keyed services.
3. **HTTP Cache Headers**: Proxy responses include `Cache-Control: public, max-age=60, s-maxage=3600, stale-while-revalidate=86400` to minimize upstream quota consumption.
4. **Rate Limiting**: In-memory token bucket limits requests to 60 per minute per client IP.

---

## 4. Public APIs Hub (`/public-apis`) User Experience

ASTRO360 exposes an interactive **Public APIs & Ephemeris Directory** at `/public-apis`:
* **Search & Multi-Filter**: Filter by functional category, source repository, or authentication type (Keyless vs Free Key).
* **Live API Tester & Console**: Directly execute sample queries in real-time, inspect response latency (ms), HTTP status codes, and formatted JSON telemetry.
* **Code Snippet Generator**: 1-click copy for `cURL`, JavaScript `fetch()`, and Python `requests`.
* **APIs.guru OpenAPI Explorer**: Direct search and inspection of machine-readable specifications from `https://api.apis.guru/v2/list.json`.
