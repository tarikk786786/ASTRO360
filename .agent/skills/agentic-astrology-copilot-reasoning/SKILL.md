---
name: agentic-astrology-copilot-reasoning
description: Zero-hallucination deterministic LLM prompt orchestration, schema-grounded intent routing, classical Sanskrit shloka grounding, and plain-English synthesis standards for ASTRO360.
---

# Agentic Astrology Copilot Reasoning Skill

This skill defines the deterministic prompt orchestration, zero-hallucination verification, and multi-layered explainability architecture for ASTRO360 AI Astrologer Copilots.

## Core Rules & Architecture

1. **Deterministic Calculation Grounding**:
   - The LLM must NEVER calculate degrees, signs, dasha dates, or aspect angles from its internal parametric weights.
   - All astrological coordinates MUST be pre-computed by the client-side AstroCore ephemeris engine and injected into the prompt context as structured JSON telemetry.

2. **3-Tier Evidence Layering**:
   - **Tier 1 (Plain English Summary)**: A direct 2-3 sentence answer addressing the user's explicit question with timing window and recommended action.
   - **Tier 2 (Planetary Driver & Timing Trigger)**: The exact transit, dasha lord, and house configuration activating this milestone.
   - **Tier 3 (Classical Verse Citation)**: Authoritative scripture reference (e.g., *Brihat Parashara Hora Shastra Ch. 45 Sloka 12* or *Phaladeepika Ch. 19*).

3. **Zero-PII Privacy & Safety Guarantee**:
   - Never output fatalistic or catastrophic predictions regarding physical mortality or medical emergencies.
   - Always provide constructive, empowering remedial guidance (Mantras, Gemstones, Dhyana, Charity) alongside challenging astrological transits.
