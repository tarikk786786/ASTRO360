# ASTRO360 — NEEDED VS NOT NEEDED (ARCHITECTURAL DISCIPLINE & ANTI-BLOAT LEDGER)
================================================================================
Generated: 2026-09-03
Status: Living Master Standard

This ledger documents intentional architectural exclusions, data minimization boundaries, and computation gates to keep ASTRO360 fast, private, clear, and unbloated.

---

## 1. Architectural Exclusions Matrix

| Domain | NEEDED (Required) | OPTIONAL (Deferred / Progressive) | NOT NEEDED (Prohibited) | WHY (Rationale) | Performance Impact | User Impact |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Ephemeris & AstroCore** | NASA JPL DE440 sub-arcsecond ephemeris, Chitrapaksha Lahiri ($24^\circ 18' 12"$) True Ayanamsha | Topocentric parallax correction, nutation in longitude | Custom unverified planetary formulas, manual degree tweaking | Sub-arcsecond precision guarantees non-drifting Nakshatra padas and dasha cusps. | Fast 0.2ms binary table lookup | Absolute calculation reproducibility |
| **AI Model Stack** | 1 Small Fast Model (intent routing & summarization) + 1 Deep Reasoning Model | Local WebLLM WebGPU execution when device supported | Running 5-6 parallel LLM APIs simultaneously | LLM should only reason over structured calculation JSON. More models create latency and cost with zero accuracy gain. | Cuts AI latency from >2.5s down to <300ms | Immediate answer feedback |
| **Knowledge Retrieval (RAG)** | Classical Adhyaya/Shloka chunked text (*BPHS*, *Phaladeepika*, *Saravali*, *Tetrabiblos*) | Modern verified commentaries (B.V. Raman, Marc Edmund Jones) | Full-text dumps of unverified modern astrology blogs | Large RAG context windows poison LLM reasoning with conflicting modern hearsay. | Zero-token deterministic path for calculation facts | Zero-hallucination scripture citations |
| **Vector Database** | Existing Postgres / `pgvector` with hybrid BM25 sparse keyword matching | In-memory semantic search indexes | Standalone external vector DBs (e.g. Qdrant, Milvus, Pinecone) | Postgres `pgvector` handles current canonical scripture corpus with zero external network overhead. | Eliminates cross-service network hop (<5ms) | Simple, self-contained architecture |
| **Data Intake & Minimization** | Date, Time, Location (for natal); Current Coordinates (for Prashna / Prayer / Qibla) | Gender, exact birth minute confirmation | Full name, phone number, physical address, financial records | Strict data minimization protects privacy and speeds up onboarding. | Zero PII serialization overhead | Maximum user trust |
| **Frontend Graphics & 3D** | Purposeful 2D SVG charts (North, South, Western circular), timeline graphs | Lazy-loaded 3D Celestial Spheres (WebGL) only when explicitly opened | Constant background particle storms, autoplaying unpaused 3D canvases | 3D must explain space, not decorate everything. Unpaused 3D drains mobile batteries and throttles CPU. | Drops main-thread rendering load by 85% | Calm, battery-efficient, accessible UI |
| **Divisional Charts (Vargas)** | D1 (Rashi), D9 (Navamsha), D10 (Dashamsha for career queries) | D7 (Saptamsha), D12 (Dwadamsha), D60 (Shashtiamsha) on demand | Computing all 16 Vargas (Shodashvarga) for simple questions | Simple question ("What is my Moon sign?") does not need 16 divisional charts. | Saves 80ms CPU time per request | Clear, noise-free response |
| **Agreement Scoring** | 4-Dimensional Consensus (Direction, Event, Timing, Strength Agreement) | Bayesian historical calibration | Synthetic single "Probability %" or "Accuracy %" metric | Engine agreement is not probability. Claiming 80% agreement means 80% probability is intellectual dishonesty. | Deterministic Math (<0.1ms) | Honest uncertainty communication |

---

## 2. The 3-Layer User Experience Standard

```
┌────────────────────────────────────────────────────────┐
│ 1. SIMPLE VIEW (Normal User)                          │
│    • What is happening?                                │
│    • When is the timing window?                        │
│    • Why does this matter?                             │
│    • What practical actions can I take?                │
├────────────────────────────────────────────────────────┤
│ 2. BALANCED VIEW (Engaged User)                       │
│    • Tradition Agreement Breakdown (Vedic, Western, KP)│
│    • Stability & Sensitivity Rating                    │
│    • Prediction Specificity & Uncertainty Gaps         │
├────────────────────────────────────────────────────────┤
│ 3. RESEARCH VIEW (Advanced User)                      │
│    • Exact Ephemeris Coordinates & Speeds              │
│    • Applicable Sanskrit Shlokas & Chapter Citations   │
│    • Astrological House & Dasha Mathematical Logic     │
└────────────────────────────────────────────────────────┘
```

---

## 3. The Prediction Specificity Rule

$$\\text{Evidence Strength} + \\text{Timing Precision} + \\text{Multi-Engine Consensus} + \\text{Data Completeness} \\implies \\text{Allowed Specificity}$$

- **Weak Evidence**: Broad life theme only (e.g. *"Career-related energy is shifting"*).
- **Moderate Evidence**: Life theme + Approximate calendar quarter (e.g. *"Increased vocational responsibility between Q3 and Q4"*).
- **Strong Multi-System Consensus**: Specific event class + Defined timing window (e.g. *"Favorable leadership transition between Sep 12 – Oct 28"*).
- **Forbidden**: Absolute fatalistic guarantees (e.g. *"You will definitely be promoted on October 14"*).

---

## 4. Intentional Non-Decisions Record

1. **Why not add a standalone Vector DB?**
   - *Decision*: `pgvector` inside Postgres already provides sub-5ms hybrid retrieval. Adding Qdrant or Pinecone introduces external network latency, recurring cloud costs, and operational fragility.
2. **Why not run 5 parallel LLM inferences?**
   - *Decision*: ASTROCORE deterministic calculations do not require LLMs. A 2-tier routing hierarchy (Small Fast Model $\\to$ Deep Reasoning Copilot) delivers superior answers in <300ms.
3. **Why not render 3D on the landing page background?**
   - *Decision*: 3D backgrounds cause severe CPU/GPU battery drain on mobile and degrade Core Web Vitals (LCP, INP). 3D is strictly reserved for dedicated spatial/orbital learning views with `IntersectionObserver` pause lifecycle.
