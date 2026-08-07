# 🛡️ ASTRO360 OMNI — SECURITY & SAST ARCHITECTURE

---

## 1. Defensive Security Controls

- **Secret Safety (Gitleaks/Trivy Guidelines)**: `.env`, `.env.local`, and `.vercel` untracked and excluded from git commits.
- **Type Safety & Strict Validation**: TypeScript strict mode enabled across all frontend and backend modules.
- **Content-Security-Policy (CSP)**: Strict headers enforcing HTTPS and trusted script execution.
- **Input Sanitization**: User inputs sanitized prior to state mutations to prevent XSS.
