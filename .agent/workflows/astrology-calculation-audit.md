# ASTRO360 Astronomical & Ephemeris Calculation Audit Workflow

## Objective
Verify that all planetary positions, house cusps, ayanamsha calculations, and dasha timelines maintain mathematical rigor and sub-arcsecond accuracy.

## Audit Steps
1. **Epoch Validation**: Run `pnpm test` to verify J2000 epoch reference standard against NASA JPL DE440 values.
2. **Eclipse Conjunction Test**: Verify longitudinal precision during the 1999 Munich Total Solar Eclipse benchmark.
3. **Calendar Boundary Test**: Verify leap year handling (e.g. 2024-02-29 23:59:59 UTC).
4. **Extreme Latitude Test**: Verify house cusp numerical convergence in high-latitude regions ($>64^\circ\text{ N}$).
5. **Retrograde Station Test**: Verify directional velocity inflection points for outer planets.
