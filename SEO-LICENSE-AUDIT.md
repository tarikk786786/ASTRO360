# ASTRO360 SEO Keyword Research Lab — Open-Source License & Architecture Audit

**Author**: Principal SEO Engineer & Keyword Research Architect, ASTRO360  
**Date**: August 2026  
**Status**: APPROVED & INTEGRATED  

---

## 1. Executive Summary & Free-First Principle

ASTRO360 requires a **Free-First, Real-Data, Zero-Fake-Metrics Keyword Research Lab** tailored for astrology, spiritual sciences, and technical SEO growth. Enterprise SEO tools often invent opaque "SEO difficulty" or simulated search volume algorithms. ASTRO360 rejects fake precision and grounds keyword intelligence in:
1. **Real Autocomplete & Suggestion Graphs** (Google Autocomplete a-z, modifiers, prepositions, questions)
2. **Deterministic Relative Search Signals** (Google Trends 0–100 index, rising/stable/declining)
3. **First-Party High-Confidence Performance** (Google Search Console queries, impressions, CTR, position)
4. **Deep Domain Taxonomy & Cluster Mapping** (16 classical astrology pillars, D1–D60, Nakshatra, Dasha, Kundli, Transit)
5. **Actionable Keyword-to-URL Mapping & Content Briefs** (Connecting keywords directly to ASTRO360 Free Tools, Learn Hubs, and Astro Studio)

---

## 2. Comprehensive Open-Source Repository Audit

Below is the rigorous evaluation of the six candidate open-source repositories audited for ASTRO360:

| # | Repository | License | Maintenance | Dependencies | API Required? | Commercial Restrictions | Key Architectural Lesson / Adopted Feature |
|---|---|---|---|---|---|---|---|
| 1 | `nitishkgupta/seotoolsuite` | MIT | Active | Next.js, React, Tailwind, DataForSEO SDK, Upstash Redis | Optional (DataForSEO for paid metrics) | None (MIT) | Free client-side Google autocomplete scraper, clean UI clustering, secure browser-local API key storage for optional DataForSEO integration. |
| 2 | `HamzaCutuna/seo-keyword-scraper` | MIT | Active | Python 3.11+, Requests, Rich | No (Free Google Suggest endpoint) | None (MIT) | High-efficiency alphabetical a–z query expansion (`seed + [a-z]`), question and preposition generators, regex filtering, and rate-limited exponential backoff. |
| 3 | `Leonewu/indie-keyword-finder` | Apache 2.0 | Active | Node.js, Manifest V3, `@huggingface/transformers` (ONNX WebAssembly) | No (Direct Google Trends explore / widget endpoints) | None (Apache 2.0 attribution preserved) | Deterministic Google Trends multi-term relative signal math (5 terms max, baseline vs recent delta calculation, 0–100 normalization), on-device semantic similarity relevance filtering. |
| 4 | `pangolinfoapi/google-trends-tracker` | MIT | Active | Python 3.10+, Zero External Deps (Stdlib) | Optional (Pangolinfo MCP token for proxy) | None (MIT) | Directional trend momentum flags (`RISING`, `STABLE`, `DECLINING`), 14-day/30-day sparkline representation, trend delta threshold triggers for automated monitoring. |
| 5 | `chukhraiartur/seo-keyword-research-tool` | MIT | Moderate | Python 3, `google-search-results` (SerpApi), Requests | Yes (SerpApi Key required for SERP scraping) | None (MIT), but SerpApi carries per-query usage limits | Clean recursive People Also Ask (PAA) parser schema and related search extraction. Explicitly categorized as `REQUIRES API` to maintain transparency. |
| 6 | `nightwatch-seo/awesome-seo-tools` | CC0 1.0 / MIT | Active Community Curated | Markdown / Links | No | Public Domain / CC0 | Comprehensive taxonomy of 400+ SEO tools, GEO/AEO optimization criteria, structured data guidelines, and free-first categorization standards. |

---

## 3. Architectural Synthesis in ASTRO360

Rather than blindly pasting third-party packages, ASTRO360 incorporates the best proven patterns into a native TypeScript / React / Node architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   ASTRO360 FREE-FIRST KEYWORD LAB                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼──────────────────────────────┐
    ▼                               ▼                              ▼
┌───────────────────────┐ ┌───────────────────┐ ┌────────────────────────┐
│  FREE PUBLIC SOURCES  │ │  FIRST-PARTY GSC  │ │  OPTIONAL PROVIDERS    │
│  - Google Suggest     │ │  - Direct CSV/JSON│ │  - DataForSEO (opt)    │
│    (a-z, questions,   │ │    import         │ │  - SerpApi (opt)       │
│     prepositions)     │ │  - Query, Impr,   │ │  - Pangolinfo (opt)    │
│  - Google Trends      │ │    Clicks, CTR    │ │  (Marked: REQUIRES     │
│    (0-100 relative)   │ │  - Striking Dist. │ │   API KEY)             │
│  - ASTRO360 Taxonomy  │ │    opportunities  │ │                        │
└───────────┬───────────┘ └─────────┬─────────┘ └───────────┬────────────┘
            │                       │                       │
            └───────────────────────┼───────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      CORE KEYWORD PROCESSING PIPELINE                  │
│                                                                        │
│ 1. Keyword Normalization (Unicode, punctuation, case, plural stemming) │
│ 2. Intent Classifier (Informational, Tool, Commercial, Question, etc.) │
│ 3. Astrology Taxonomy Cluster (16 Classical Traditions & Vedic Pillars)│
│ 4. Long-Tail & Question Engine (Definitional, How-to, Predictive)      │
│ 5. Keyword-to-URL Mapping (Tool match, Cannibalization check, New URL) │
│ 6. Transparent Opportunity Priority Scoring (0-100, no fake traffic)   │
│ 7. Competitor Gap Matrix (BUILD, UPDATE, MERGE, IGNORE actions)        │
│ 8. Evidence-Grounded Content Brief & FAQ Schema Generator              │
│ 9. Trend Watchlist & Alert Monitoring                                  │
│ 10. Multi-Format Exporter (CSV, JSON, Markdown)                       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Rate Limiting, Privacy & Security Standards

1. **Client-Side Privacy**:
   - Optional API credentials (DataForSEO, SerpApi) are stored securely in browser `localStorage` and NEVER sent to third-party tracking servers.
2. **Public Endpoint Respect**:
   - Google Autocomplete and Trends queries utilize concurrency pooling (maximum 3 concurrent requests), token-bucket rate limiting (minimum 250ms spacing), and exponential backoff retry logic.
3. **Compound Key Caching**:
   - Cache keys encompass `[seed_keyword]:[country]:[language]:[engine]:[timerange]`. Cached queries expire after 24 hours to eliminate redundant network traffic.
4. **No Fake Metrics Policy**:
   - If search volume, CPC, or ranking difficulty is not provided by an active authenticated API, ASTRO360 strictly displays `DIRECTIONAL SIGNAL ONLY` or `NOT AVAILABLE`.

---

All open-source contributions are used in full compliance with their respective MIT, Apache 2.0, and CC0 licenses. ASTRO360 retains independent copyright for all native TypeScript astrology calculation engines and domain-specific SEO clustering algorithms.

---

## 6. ASTRO360 Backlink Opportunity Lab — Open-Source Repository Audit

**Author**: Principal SEO Engineer, Growth Engineer & Digital PR Specialist, ASTRO360  
**Date**: August 2026  
**Status**: APPROVED & INTEGRATED  

### Core Philosophy
ASTRO360 strictly forbids all manipulative, automated spam schemes:
- **NO** mass backlink spam, comment spam, forum profile spam, or fake user accounts
- **NO** link farms, PBNs, hidden iframe schemes, or deceptive redirects
- **NO** automated bulk directory submissions or fake GitHub link farms
- **YES** to ethical, editorial, high-relevance backlink prospecting, unlinked brand mention recovery, research data citations, digital PR story angles, transparent embeddable widgets with visible attribution, and automated lost-link verification.

### Repository Evaluation Matrix

| # | Repository | License | Version / Commit | Files Reused / Concepts Referenced | Commercial Compatibility | Attribution & Terms |
|---|---|---|---|---|---|---|
| 1 | `every-app/open-seo` | MIT | `main` | Backlink workflow architecture, multi-domain opportunity organization, MCP tool integrations, transparent score criteria. | Full (MIT) | Standard MIT attribution maintained. |
| 2 | `IamRamgarhia/All-In-One-Free-SEO-Tool` | MIT | `main` | Backlink analysis pipeline, prospecting classification models, outreach status CRM states, client-side report generator. | Full (MIT) | Verified MIT license on GitHub repository. |
| 3 | `apify/link-prospecting-tool` | Apache 2.0 | `main` | Search-based prospect discovery queries (`intitle:resources`, `inurl:links`, `roundup`, `podcast interview`), unlinked brand mention patterns, competitor gap modeling. | Full (Apache 2.0) | Zero reliance on hosted scraper actors. Custom native safe crawler with SSRF protections used instead. |
| 4 | `morpheusadam/BacklinkVoid` | MIT | `main` | Toxic and spam signal analysis (link farm heuristics, adult/gambling contextual flags, scraped content detection, unnatural sitewide anchor distributions, review vs disavow criteria). | Full (MIT) | Standard MIT attribution maintained. |
| 5 | `screpylabs/awesome-seo-tools` | MIT / CC0 | `main` | Comprehensive catalog of reputable developer and software directories, digital PR media lists, anchor-text natural ratio thresholds. | Full (MIT/CC0) | Public catalog guidelines followed. |

### Security & Anti-Abuse Crawler Safeguards
1. **SSRF Protection**: Any automated URL checker strictly blocks `127.0.0.1`, `localhost`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254` (cloud metadata endpoints), and internal LAN hosts.
2. **Strict Timeouts & Concurrency**: Network probes time out at 5000ms and operate at max 2 concurrent requests with 500ms spacing to prevent publisher abuse.
3. **Data Privacy**: Private contacts, CRM notes, and outreach drafts are stored strictly in client-side encrypted storage and never leaked publicly.
4. **Data Honesty**: Zero simulated DA/DR or fabricated backlink quantities. In the absence of an authenticated third-party provider, metrics are labeled `DIRECTIONAL SIGNAL ONLY` or `NOT AVAILABLE`.

