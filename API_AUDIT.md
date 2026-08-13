# ASTRO360 OMNI — API Quality & Endpoint Audit

## 1. API Architecture
ASTRO360 utilizes client-side high-speed deterministic calculation modules backed by Node.js serverless API routes (`api/astrology.ts`) for complex server-side calculations and third-party API integrations (AlAzan prayer times, geocoding, OwnPay checkout).

---

## 2. API Endpoints Catalog

| Endpoint | Method | Input Parameters | Responsibilities | Auth & Security |
|:---|:---|:---|:---|:---|
| `/api/astrology` | `GET` / `POST` | `dob`, `time`, `lat`, `lon`, `ayanamsha` | Returns 9 planet positions, ascendant, nakshatra, and Vimshottari dasha JSON telemetry | CORS protected, input sanitization |
| `AlAzan CDN` | `GET` | `latitude`, `longitude`, `method` | Fetches live prayer times and moon illumination telemetry | HTTPS, fallback to internal engine |
| `OwnPay API` | `POST` | `amount`, `currency`, `merchantId`, `serviceId` | Generates crypto (USDT/BTC/ETH/SOL) or card payment intent & verifies transaction hash | SSL/TLS, Signature verification |

---

## 3. Rate Limiting & Resilience
- Client-side memoization (`useMemo`, LocalStorage) caches ephemeris outputs for repeat birth profile queries.
- Fallback mock data / offline calculation engines engage automatically if network calls experience a timeout or connection failure.
