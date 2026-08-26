# ASTRO360 8-Step Engineering Workflow

Every substantial feature, bug fix, or architecture enhancement follows this disciplined lifecycle:

```text
1. UNDERSTAND ➔ Review user requirements, domain constraints, and existing capabilities.
2. INSPECT    ➔ Examine relevant files, types, and dependencies without premature edits.
3. PLAN       ➔ Define architecture, data contracts, and verification criteria.
4. IMPLEMENT  ➔ Write modular, type-safe, human-crafted code adhering to design standards.
5. TEST       ➔ Execute unit, dasha, dosha, and golden dataset test suites (pnpm test).
6. VERIFY     ➔ Build the full production client (pnpm run build) to confirm zero compilation/chunking errors.
7. REVIEW     ➔ Audit accessibility, mobile responsiveness, security, and performance.
8. DOCUMENT   ➔ Record changes in git commit history and engineering documentation.
```
