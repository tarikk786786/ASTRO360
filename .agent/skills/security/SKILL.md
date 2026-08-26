---
name: security
description: Data privacy, secret management, client-side encryption, and API security standards for ASTRO360.
---

# Security & Data Privacy Standards

## Privacy-by-Design Principles
1. **Zero Secret Leakage**:
   - Never expose third-party API keys, AI provider tokens, or database credentials in client bundles or public repositories.
   - All server environment variables stored strictly in `.env.local` / Vercel protected secrets.
2. **Birth Profile Data Protection**:
   - User birth records (name, date, time, coordinates) are stored encrypted client-side in `localStorage` or secured via authenticated tokens.
   - 1-click **"Reset All Stored Data"** feature purges all cached birth records instantly.
3. **Input Sanitization & Abuse Prevention**:
   - Sanitize all query strings, birth search inputs, and AI chat prompts to prevent XSS and SQL injection.
   - Rate-limit public API endpoints to prevent computational denial-of-service on ephemeris calculation workers.
