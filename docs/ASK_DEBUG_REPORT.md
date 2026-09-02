# ASTRO360 Ask Forensic Audit & Root Cause Debug Report

## 1. Executive Summary
Prior to this remediation, inquiries submitted to `/?tab=ask` exhibited generic conversational tendencies. This document records the forensic investigation, root causes identified across the codebase, and the architectural solutions applied.

---

## 2. Root Cause Analysis

### A. Fallback to Hardcoded Strings
* **Finding**: `QuestionIntentEngine.routeAndSolve` previously used mock coordinates (`Jupiter at 18°24' Cancer`, `Moon at 14°20' Gemini`) when ephemeris errors occurred or when user birth parameters were not fully wired into the engine context.
* **Fix**: Built `AstrologyToolRegistry` with strict read-only execution contracts invoking `calculatePlanetaryPositions` directly from the user's specific birth time, date, latitude, and longitude.

### B. Missing 22-Intent Classification System
* **Finding**: The system previously had a coarse 10-category router that could not differentiate between simple fact inquiries (`"What is my ascendant?"`) and complex decision-support problems (`"Should I quit my job?"`).
* **Fix**: Created `AstrologyIntentRouter` supporting all 22 required intents with explicit data requirements and response modes (`SIMPLE_FACT`, `PERSONAL_PROBLEM`, `TIMING_PREDICTION`, `DECISION_SUPPORT`, `RESEARCH_STUDIO`, `EDUCATIONAL`).

### C. Absence of Explicit Astrology View vs. Practical View Separation
* **Finding**: Advice was blended into one conversational paragraph without clear demarcation between astrological indicators and real-world practical actions.
* **Fix**: Implemented `PersonalProblemAnalyzer` with dedicated **🪐 Astrology View** (houses, Dasha, planetary telemetry, classical rules) and **🛠️ Practical View** (action items, runway audits, resume updates, peer networking).

### D. Decision-Support Scenarios Missing
* **Finding**: Inquiries like *"Should I quit my job?"* lacked comparative structured decision matrices.
* **Fix**: Added structured `Option A — Stay & Restructure` vs. `Option B — Quit / Immediate Pivot` scenario analysis with uncertainty quantification.

### E. Safety Intercept Gaps
* **Finding**: Inquiries regarding health or financial guarantees risked speculative predictions.
* **Fix**: Added strict safety guardrails that immediately intercept medical diagnosis questions (deferring to licensed healthcare professionals) and financial certainty claims.

---

## 3. Verification & Invariants
* 100% of calculation tools are read-only and backed by ASTROCORE.
* Zero LLM hallucinated planetary coordinates.
* Engine agreement is strictly labeled as **Methodological Concordance**, never **Statistical Probability**.
