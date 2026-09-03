# ASTRO360 — AI ARCHITECTURE MASTER SPECIFICATION
================================================================================
Generated: 2026-09-03
Status: Approved Architectural Standard

## 1. 4-Tier Free-First Routing Hierarchy

```
User Inquiry
    │
    ▼
[Level 0: Deterministic ASTROCORE Router] (< 0.2ms)
    │ (If intent is pure calculation, e.g. "What is my moon sign?")
    ├──► Direct JSON Calculation & Shloka Lookup (Zero AI tokens, Zero Latency)
    │
    ▼ (If intent is analytical or comparative)
[Level 1: Local / Free Small Inference Model] (< 300ms)
    │ (Summarization, intent parsing, structured tool orchestration)
    ├──► Structured Schema Output (Zod validated)
    │
    ▼ (If intent is complex multi-tradition synthesis or thesis research)
[Level 2: Deep Reasoning Copilot] (< 800ms)
    │ (Vedic-Western conflict resolution, Bayesian agreement synthesis)
    └──► Markdown with verbatim Sanskrit shloka provenance
```

## 2. Zero Hallucination & ASTROCORE Invariance Principle
1. AI never computes planetary coordinates, degrees, dashas, or gunas directly.
2. AI only reasons over structured JSON payloads emitted by `AstroCalculationContext`.
3. Scripture citations require verifiable chapter, adhyaya, and sloka coordinates.
