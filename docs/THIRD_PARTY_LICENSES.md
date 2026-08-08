# THIRD-PARTY LICENSES & API TERMS OF SERVICE AUDIT

## 1. Astronomical Calculation Engine
- **Engine**: Swiss Ephemeris / Sidereal Planetary Algorithms (`src/lib/astroCalculations.ts`)
- **License**: Open-Source Mathematical Ephemeris Algorithms / AGPL-compatible
- **Commercial Usage**: Free for open-source & standard web distribution; dual-licensing available if distributed as closed-source binary.
- **API Cost**: $0.00 (100% Deterministic Local Math)

## 2. Location & Geocoding Service
- **Service**: OpenStreetMap + Nominatim API (`https://nominatim.openstreetmap.org/search`)
- **Data License**: Open Database License (ODbL) 1.0
- **Usage Policy**: Max 1 request per second; requires descriptive `User-Agent` header (`ASTRO360-Free-Astrology-App/1.0`).
- **Fallback**: Local 17-city geocoding database (`POPULAR_CITIES` in `geocoding.ts`).

## 3. Timezone & Historical UTC Offsets
- **Engine**: IANA Time Zone Database / Open-Meteo Timezone
- **License**: Public Domain
- **Usage Policy**: Free, unlimited queries.

## 4. Google OAuth 2.0 & Gmail API
- **Service**: Google Cloud Console Gmail API (`https://gmail.googleapis.com/gmail/v1/users/me/messages/send`)
- **Scope**: `https://www.googleapis.com/auth/gmail.send` (Minimum required sending permission)
- **Quota**: 1,000,000 quota units / day (approx. 100,000 emails/day free).
- **Fallback**: `MockEmailProvider` in `emailProvider.ts` for local development.

## 5. Google Gemini AI Interpretation Engine
- **Service**: Google Generative AI (Google AI Studio)
- **License**: Google API Terms of Service
- **Free Tier Limit**: 15 Requests Per Minute (RPM), 1,500 Requests Per Day (RPD).
- **Fallback**: Built-in ASTRO360 Core Brain Rules Engine (`astroCoreBrain.ts`).

## 6. Database & Authentication
- **Service**: Supabase PostgreSQL & Auth (`src/lib/supabase.ts`)
- **License**: Open-Source (Apache 2.0 / PostgreSQL License)
- **Free Tier Limit**: 500 MB database, 50,000 Monthly Active Users (MAU).
- **Fallback**: LocalStorage session persistence layer.

## 7. Interactive Map UI
- **Library**: Leaflet + OpenStreetMap Tile Server (`https://tile.openstreetmap.org`)
- **License**: BSD 2-Clause / ODbL
- **API Cost**: $0.00 (No Mapbox or Google Maps key required).

## 8. NASA Open APIs
- **Service**: NASA Solar Telemetry & Celestial Data (`https://api.nasa.gov`)
- **License**: Public Domain (US Government Work)
- **Free Tier Limit**: 1,000 requests per hour with `DEMO_KEY`.
