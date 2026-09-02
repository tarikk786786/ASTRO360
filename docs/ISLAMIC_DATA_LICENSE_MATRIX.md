# ASTRO360 Islamic Data & Source License Matrix

This document outlines the source authority tiers, dataset provenance, and licensing frameworks governing all Islamic knowledge, prayer times, astronomical mathematics, and reference data in ASTRO360.

---

## 1. Source Authority Hierarchy

| Tier | Category | Sources Included | Evidentiary Weight | Verification Standard |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | **Qur'an Divine Text** | King Fahd Complex Uthmani Script, Tanzil project verified text | Absolute (Qat'i al-Thubut) | Exact chapter (Surah), verse (Ayah), and Arabic Uthmani text. |
| **Tier 2** | **Authenticated Hadith** | Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami` al-Tirmidhi, Sunan al-Nasa'i, Sunan Ibn Majah, Muwatta Malik | Primary Sunnah | Must retain explicit chain/collection metadata and authentic grading (Sahih / Hasan / Da'if). Never invent grading. |
| **Tier 3** | **Classical Tafsir** | Tafsir Ibn Kathir, Tafsir al-Tabari, Tafsir al-Qurtubi, Tafsir al-Sa'di | Recognized Exegesis | Attributed directly to historical scholar. Conflicting exegeses displayed comparatively without artificial consensus. |
| **Tier 4** | **Juristic Fiqh References** | Hanafi, Maliki, Shafi'i, Hanbali, Ja'fari comparative legal texts | Juristic Derivation | Must explicitly identify the school (Madhhab), primary reasoning, and recognized differences. |
| **Tier 5** | **Astronomy & Educational** | NASA JPL DE440, IAU 2006 Precession, Great-Circle Spherical Trigonometry, Local Astronomical Sighting Parameters | Mathematical Celestial Observation | Explicitly separated from religious doctrine or astrological interpretation. |

---

## 2. Dataset Licensing & Redistribution Matrix

| Component | Source / Project | Stated License | Usage in ASTRO360 | Boundary Safeguard |
| :--- | :--- | :--- | :--- | :--- |
| **Quran Arabic Text** | Tanzil Project / King Fahd Glorious Quran Printing Complex | Public Domain / CC-BY-NC (Uthmani) | Embedded local static dataset for offline zero-latency retrieval | Cryptographic checksums verify textual integrity. |
| **Quran Translations** | Sahih International, Pickthall, Yusuf Ali, Arberry | Public Domain / Open Educational | Multi-translation lookup with clear attribution | Translations are clearly labeled as human interpretations. |
| **Hadith Datasets** | Fawaz Ahmed Hadith Repository, Sunnah.com Open API | Public Domain / Unlicense / CC-BY-SA | Local verified collection indexing Sahih Sittah | Authenticity grading and Hadith numbering preserved. |
| **Tafsir Exegesis** | Quran-Tafseer / Open Tafseer API | MIT License (code) / Public Domain historical texts | Comparative multi-Tafsir viewer | Differing interpretations shown side-by-side. |
| **Prayer Astronomy** | Pure Native TypeScript Spherical Trigonometry (IAU standards) | Proprietary / MIT Compatible | 100% Client-Side Private Computation | Multi-method calculation (MWL, ISNA, Egypt, Umm al-Qura, Karachi, Tehran, Jafari). |
| **Qibla Direction** | WGS84 Ellipsoid & Spherical Great-Circle Bearing | Public Mathematical Formula | Client-side math relative to Kaaba (21.4225° N, 39.8262° E) | Coordinates source explicitly cited with distance and cardinal. |
| **Hijri Calendar** | Tabular Islamic, Umm al-Qura Algorithm, Astronomical Sighting | Open Standard | Multi-mode calendar engine | Explicitly separates calculated astronomical conjunction from community moonsighting announcements. |

---

## 3. Theological Integrity Invariants

1. **No "Islamic Astrology" Predictions**:
   - ASTRO360 never fabricates "Islamic zodiac horoscopes", "Quranic future prophecy from planets", or "Hadith star predictions".
   - The Islamic domain strictly provides Qur'an, Hadith, Tafsir, Fiqh, Duas, Azkar, and astronomical calculations.
2. **Deterministic Source Validation**:
   - If an Islamic source, Hadith grading, or Qur'anic citation is unavailable, the AI explicitly states: *"I could not verify that citation in the connected authentic sources"* rather than hallucinating text.
3. **Madhhab Transparency**:
   - Juristic questions (*Fiqh*) present recognized rulings across Hanafi, Maliki, Shafi'i, Hanbali, and Ja'fari traditions without claiming universal consensus where scholars historically differed.
