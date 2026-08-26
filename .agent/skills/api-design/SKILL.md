---
name: api-design
description: REST API, FastAPI backend architecture, MCP tool endpoints, and request validation standards for ASTRO360.
---

# API Design & MCP Integration Standards

## Core REST Endpoints (/v1/)
- `POST /v1/chart/natal`: Computes complete planetary longitudes, house cusps, and nakshatras for birth inputs.
- `POST /v1/chart/transits`: Calculates real-time planetary transits and natal aspect overlays.
- `POST /v1/chart/synastry`: Evaluates relationship compatibility across 36-point Guna Milan and Western synastry.
- `GET /v1/vedic/panchanga`: Generates daily Tithi, Nakshatra, Yoga, Karana, and Rahu Kalam timings.
- `GET /v1/vedic/dasha`: Computes Vimshottari Mahadasha, Antardasha, and Pratyantardasha timelines.

## Model Context Protocol (MCP) Tools
Expose identical backend calculation capabilities to AI agents via MCP tools:
- `calculate_natal_chart`, `calculate_transit`, `calculate_dasha`, `calculate_panchanga`, `calculate_synastry`, `explain_prediction`.

## Validation & Contracts
- Enforce strict Zod schemas on the frontend and Pydantic models on the backend.
- Deterministic requests must leverage cache-control headers and Redis keying based on birth timestamp and geographic precision.
