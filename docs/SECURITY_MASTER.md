# ASTRO360 OMNI — MASTER SECURITY & PRIVACY AUDIT

### 1. Threat Modeling & Attack Surface Review
- **Anti-Prompt Injection**: AI prompts use structured schemas (Zod). Retrieved RAG content is treated as untrusted text and cannot override system prompts.
- **Data Protection & PII**: Birth dates, times, and geographic coordinates are processed client-side or partitioned with strict Row Level Security. No personal data is written to analytics logs.
- **Tool Authority**: AI tools are strictly read-only (`chart.get`, `ephemeris.get`, `rules.get`). AI cannot modify birth records, alter engine weights, or change user permissions.
- **XSS & CSRF**: All user inputs are sanitized; React DOM escaping and strict CSP headers prevent code injection.
- **Local-First & Offline**: ASTROCORE calculations execute locally without sending personal charts to third-party endpoints.