---
name: astrocore-calculation
description: High-precision astronomical and multi-tradition ephemeris calculation standards for ASTRO360.
---

# AstroCore Calculation Standard

## Overview
AstroCore is the foundational mathematical and astronomical calculation engine for ASTRO360. It enforces rigorous, reproducible, and transparent astronomical computation standards across all supported astrological traditions.

## Core Astronomical Pipeline
1. **Time Normalization**:
   - Convert all local birth dates, times, and daylight saving flags to strict UTC ISO-8601 timestamps.
   - Calculate Universal Time (UT1) and Terrestrial Time (TT) incorporating Delta-T ($\Delta T$) corrections.
2. **Ephemeris Computation**:
   - Compute geocentric ecliptic longitudes, latitudes, distances, and daily speeds using NASA JPL DE440 polynomial models and high-precision trigonometric series.
   - Planets tracked: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Rahu (True/Mean North Node), Ketu (South Node), Ascendant (Lagna), and Midheaven (MC).
3. **Sidereal & Tropical Coordinate Mapping**:
   - **Western Astrology**: Direct Tropical Geocentric Ecliptic coordinates.
   - **Vedic Astrology (Jyotish)**: True Lahiri Chitra-Paksha Sidereal Ayanamsha ($24^\circ 11' 14''$ baseline at J2000 with precise precession rate of $\sim 50.29''/\text{year}$).
   - **KP System**: Krishnamurti Ayanamsha with exact sub-lord division ($249$ / $2193$ subdivisions).
4. **House Cusps & Coordinate Systems**:
   - Support Placidus, Whole Sign, Equal House, Koch, and Porphyry systems with numerical convergence at high latitudes ($>60^\circ \text{N/S}$).

## Quality & Reproducibility Rules
- **No Client Hallucination**: Planetary positions must never be simulated, estimated, or fabricated by an LLM.
- **Precision Tolerance**: Ephemeris coordinates must match astronomical reference standards within $\pm 0.0001^\circ$ ($\pm 0.36$ arcseconds).
- **Golden Dataset**: Every modification must pass the 6 historical Golden Benchmark test suites.
