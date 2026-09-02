# ASTRO360 License Ledger & Provenance Register

This document records the licensing terms, redistribution rights, commercial viability, and boundary standards for all third-party repositories, ephemeris data, models, datasets, and calculation libraries evaluated or integrated into ASTRO360.

---

## 1. Core Astronomy & Ephemeris

| Repository / Asset | Provenance / Author | Stated License | Commercial Use | Redistribution Terms | Usage in ASTRO360 | Review Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **NASA JPL DE440** | NASA / Jet Propulsion Laboratory | Public Domain / US Govt Work | Yes | Unlimited Public Distribution | Primary planetary ephemeris tables (coefficients) | Approved |
| **IAU SOFA** | International Astronomical Union | SOFA Software License (Open / Academic) | Yes | Attribution required | Precession, nutation, and sidereal time formulas | Approved |
| **Astronomy Engine** | Cosine Kitty (Don Cross) | MIT License | Yes | Full MIT inclusion with copyright notice | Topocentric coordinates, rise/set, eclipse geometry | Approved |
| **Swiss Ephemeris** | Astrodienst AG | Dual (AGPL-3.0 / Commercial) | Yes (when licensed or isolated) | Requires license isolation or AGPL compliance | Differential reference testing only (isolated benchmark scripts) | Approved (Isolated) |

---

## 2. Astrology References & Algorithms

| Repository | Author | Stated License | Commercial Use | Usage in ASTRO360 | Review Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PyJHora / PyHora** | Open Source Vedic Community | MIT / GPL Compatible | Yes (as algorithmic reference) | Algorithm reference for divisional charts (D1-D60) and Shadbala | Approved (Reference) |
| **astro-skill** | Aditya Arya | MIT License | Yes | Tool contract and intent taxonomy reference | Approved |
| **astrology-engine** | hrabanazviking | MIT License | Yes | Western Tropical aspect orb and return timing reference | Approved |

---

## 3. Islamic Knowledge & Astronomy

| Repository | Author | Stated License | Commercial Use | Usage in ASTRO360 | Review Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tanzil Quran Project** | Tanzil.net / King Fahd Complex | Creative Commons BY-NC / Open Data | Yes (Educational non-commercial text) | Offline static Arabic Uthmani text verification | Approved |
| **Quran API** | Fawaz Ahmed | Public Domain / Unlicense | Yes | English translations and Hadith numbering verification | Approved |
| **Falah** | Abdessamad Bettal | MIT License | Yes | Architectural pattern reference for offline Islamic tools | Approved |
| **Bonyan-API** | BonyanOSS | MIT License | Yes | TypeScript fallback and caching structure reference | Approved |
| **prayer-times** | Amine Troudi | LGPL-3.0 | Yes (when isolated) | Differential verification of solar prayer angle math | Approved (Isolated) |

---

## 4. AI Inference, Embeddings & Vectors

| Repository / Model | Provider / Author | Stated License | Commercial Use | Usage in ASTRO360 | Review Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **llama.cpp** | Georgi Gerganov & ggml team | MIT License | Yes | Local CPU/GPU GGUF model execution runtime | Approved |
| **BGE-M3** | BAAI (Beijing Academy of AI) | MIT License | Yes | Multilingual local embeddings for RAG retrieval | Approved |
| **BGE-reranker-v2-m3** | BAAI | MIT License | Yes | Cross-encoder reranker for classical scripture citations | Approved |
| **pgvector** | Andrew Kane | PostgreSQL License (MIT-style) | Yes | Primary local/server vector search engine | Approved |
| **Qdrant** | Qdrant Team | Apache 2.0 | Yes | Optional high-scale vector engine | Approved |

---

## 5. Theological & Architectural Safeguards

1. **Zero Hallucination of Coordinates**: Planetary longitudes, houses, Dashas, and prayer angles are computed strictly by deterministic TypeScript mathematical algorithms.
2. **License Isolation**: Any GPL/AGPL dependency is strictly quarantined to offline benchmark and research scripts; the production web client bundle contains only MIT/BSD/Apache-2.0 and native first-party code.
3. **No Mixed Religious Divination**: Islamic knowledge sources and astrology engines are preserved as distinct, unmixed disciplines.
