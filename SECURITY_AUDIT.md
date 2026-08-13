# ASTRO360 OMNI — Security Audit & Hardening Guidelines

## 1. Security Architecture
ASTRO360 adheres to strict client-side data protection and zero-trust API communications.

---

## 2. Security Vectors & Controls

- **Authentication & Authorization**: Supabase Auth or encrypted LocalStorage session tokens with explicit input validation via Zod schemas.
- **Client Secrets Protection**: No private third-party API keys or database service role keys are bundled into front-end assets. Environment variables are scoped to `VITE_` prefixes only for public endpoints.
- **XSS & Injection Protection**: User inputs for birth names, notes, and custom locations are sanitized prior to DOM rendering.
- **CORS & Headers**: Strict CORS origin headers enforced on serverless endpoints. Content-Security-Policy (CSP) headers prevent unauthorized script injections.
- **Payment Gateway Security**: OwnPay transaction verification uses server-side HMAC signatures to validate payment hash receipts before unlocking consultation sessions.
