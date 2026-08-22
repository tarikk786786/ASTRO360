# Hardening changes — what was altered, and how far each claim was verified

Companion to `AUDIT.md` (findings) and `ROTATION.md` (credentials you must rotate yourself).

Two labels are used throughout, and the difference matters:

- **Verified by execution** — I ran it and read the output.
- **Believed correct by reading** — I traced the code but could not run it.

`node_modules` in this repo was installed on Windows; pnpm's symlinks do not resolve from the
Linux sandbox I work in. Every package probe fails with an OS-level `Input/output error`,
including `typescript`, `react`, `vite` and `@types/*`. So **`tsc`, `vite build` and `tsx` could
not be run against the repo's own dependencies.** Where I needed to execute TypeScript I copied
the relevant files to a scratch directory and ran them under Node 22's native type stripping
(`node --experimental-strip-types`), which needs no dependencies. That is noted where used.

---

## WS-1 · Secret containment

Full detail in `ROTATION.md`. Summary of code changes:

| Change | Files | Verification |
|---|---|---|
| Removed five hardcoded API key literals | `AlAzanPrayerSuite.tsx`, `NasaLiveTelemetry.tsx`, `NasaNewsAstrologySuite.tsx`, `kalimatEngine.ts`, `islamicKnowledgeEngine.ts` | **Verified by execution** — five independent greps confirm no key literal remains in `src/` or `api/` |
| Added a server-side proxy so keys never reach the browser | `api/proxy.ts` (rewritten), `api/_shared.ts` (new), `src/lib/apiProxy.ts` (new) | Believed correct by reading — cannot deploy or call it from here |
| Origin allowlist + preflight handling, replacing `Access-Control-Allow-Origin: '*'` alongside `Allow-Credentials: 'true'` | `api/_shared.ts` | Believed correct by reading |
| `insforge.ts` now throws a clear configuration error instead of falling back to a baked-in project | `src/lib/insforge.ts` | Believed correct by reading. Safe to make strict: the module has zero importers |
| Documented the `VITE_` inlining rule at both places a reader will look | `.env.example`, `src/vite-env.d.ts` | n/a — documentation |

Two keys in `islamicKnowledgeEngine.ts` were declared but never read by any method; they were
deleted rather than proxied, with a comment recording that.

---

## WS-2 · Stop the crash, make the checks real

### 1. The runtime crash (BUG-01)

`src/App.tsx` rendered 22 lucide icons in the sidebar; 16 were never imported. Undefined
identifiers in JSX are not a build error for esbuild, so the bundle compiled while the nav threw
`ReferenceError` on mount.

Added to the import: `AlertTriangle, BarChart2, BookOpen, Calendar, Clock, Eye, FileText, Hash,
Map, MapPin, Music, Network, Radar, Shield, Sun, Sunrise`.

**Verified by execution** — the missing set was derived programmatically (`comm -23` over
identifiers used in JSX versus identifiers imported), not by eye. My first hand-built list was
wrong in both directions: it missed `Clock` and `Map`, and wrongly included `Icon`, `Partial` and
`Record` (`Icon` is a local rebinding from `.map(({ icon: Icon }) => …)`). A re-run confirms zero
undefined JSX identifiers remain.

Two components were rendered but never imported. Rather than import a guess, I matched by props:
`SpiritualTraditionsSuite` → `SpiritualTraditionsModule`, and `DailyHoroscopeTransitEngine` →
`PremiumHoroscopeEngine` (already imported, never rendered, and its props match the call site
exactly — `DailyHoroscopeCard` was the wrong target, as it takes `sunSign`/`moonSign` rather than
`userProfile`).

### 2. The typecheck that checked nothing (QA-01)

The root `tsconfig.json` is solution-style: `"files": []` plus project references, no `include`.
`tsc -p tsconfig.json --noEmit` therefore compiled **zero** files under `src/` and passed
instantly. That is why 16 undefined identifiers shipped.

Added `tsconfig.app.json` covering `src/**` and `api/**`, and wired it into the `typecheck`
script. Strictness deliberately left at the base level — enabling `strict`,
`noUncheckedIndexedAccess` and `strictFunctionTypes` at the same moment as enabling checking at
all would bury the real errors under thousands of new ones. Tighten once it reports clean.

**Verified by execution, before the sandbox mount degraded:** `tsc --listFilesOnly` selected
**0** app files under the root config and **263** under the new one. The structural fix is
confirmed. The resulting error count is **not** verified — see the caveat at the top.

### 3. Type errors in App.tsx (BUG-03)

`CategoryInfo` had no `icon` field, but the sidebar rendered `{tradition.icon}`; no entry in
`TRADITIONS` sets one, so the span was always empty. Separately `GROUP_ICONS` was imported and
never referenced, so the group glyphs it exists to supply appeared nowhere in the UI.

Fixed by adding `icon?: string` — optional, because that reflects reality — making the sidebar
span conditional so no dead 10px gap remains, and rendering `GROUP_ICONS[group]` on the group
header where it belongs.

The audit's second BUG-03 claim (props not assignable to `TraditionViewProps`) **does not
reproduce**; it is corrected in `AUDIT.md` rather than quietly dropped.

### 4. CI that could not fail (QA-02)

`.github/workflows/ci-testing-pipeline.yml` rewritten. Removed three jobs that asserted nothing:

- The accessibility job's only command was
  `node -e "console.log('✅ WCAG 2.1 AA Accessibility & Color Contrast Verified Cleanly!')"`.
  It printed a pass claim; axe-core and Pa11y are not installed. Accessibility is now openly
  **unverified** rather than falsely green.
- The Playwright job installed browsers, built, and uploaded `playwright-report/`, but never ran
  `playwright test`. No spec files exist and `playwright` is not a dependency, so the artifact was
  always empty.
- The secret job ran `git status` then unconditionally echoed
  `"✅ Zero secrets tracked in version control repository!"`. `git status` cannot fail, so the
  claim was never tested — and it was false.

Both deleted jobs are worth rebuilding properly; doing so needs new devDependencies plus a
lockfile update, which is why they are not stubbed back in. A job that cannot fail is worse than
no job, because it reports safety you do not have.

Fixed in the surviving jobs: `pnpm --filter @workspace/astro360 run build` → `pnpm run build`
(no package is named `@workspace/astro360`; `package.json` says `astro360`, and this is not a
workspace, so the filter matched nothing); `--no-frozen-lockfile` → `--frozen-lockfile`; Node 20
→ 22 (Node 20 is end-of-life and Vite 7 wants `^20.19 || >=22.12`); added pnpm dependency
caching and a bundle-size report.

Four real secret assertions replace the echo. **All four verified by execution against this
repo**, and — more importantly — verified to *fail* when a leak is reintroduced:

| Assertion | Passes on current repo | Catches a real leak |
|---|---|---|
| No `.env` file tracked (templates excluded) | ✅ | ✅ would have caught the committed `.env.local` |
| No hardcoded credential literal in `src/`/`api/` | ✅ | ✅ tested against a reintroduced `umh_…` key |
| No server secret carries a `VITE_` prefix | ✅ | ✅ tested against `VITE_CASHFREE_SECRET_KEY` |
| No credential in a *new* commit message | ✅ | ✅ |

Two false positives surfaced during that testing and were fixed rather than shipped: the first
pattern flagged `.env.example`, which is meant to be tracked, and `PAYOUT_STORAGE_KEY =
'astro360_ownpay_merchant_settings'`, a browser localStorage key name and not a credential. The
latter now lives in `.github/secret-scan-allowlist.txt` as a reviewed exception, so it does not
block while anything new still fails.

A tighter version of the credential pattern was also **rejected after testing**: it caught
`UMMAH_API_KEY = 'umh_…'` but missed
`const NASA_API_KEY = process.env.NASA_API_KEY || 'AbC…'`, which is the exact form five of the
leaked keys took. The looser pattern now in place catches both, at a measured cost of one false
positive on this repo.

The commit-message check scans only the incoming commit range, not `--all`. Three keys reached
the public repo through commit messages (`27f914c`, `c0dc566`, `536df2b`), and commit messages
cannot be scrubbed from published history — rotation is the remedy. Scanning `--all` would fail
forever on values that rotation has already made dead, and a check that can never pass gets
disabled, which is how the fake jobs above came to be tolerated.

### 5. A test suite that tested nothing (QA-04 — new finding)

Nine of the twelve `*.test.ts` files import no application code whatsoever. Each declares a local
literal and then asserts a fact about that literal. Verbatim from `astroCartography.test.ts`:

```ts
const dubaiLine = "Jupiter (Wealth & Career)";
if (dubaiLine.includes("Jupiter")) {
  console.log("✅ Test 1 Passed: Dubai Jupiter Midheaven relocation line verified.");
}
```

`planetaryHoras.test.ts` builds a 24-element array with `Array.from({ length: 24 })` and asserts
its length is 24. `chakraFengshui.test.ts` computes a Kua number locally and asserts it lies
between 1 and 9 — arithmetically always true. These would all keep passing if the features they
name were deleted. Three of them (`chakraFengshui`, `mantraRadar`, `tarikIslamPassport`) name
features with **no implementation module anywhere in `src/`**.

Five were wired into CI. They are now excluded from it, and each file carries a header stating
plainly that it asserts nothing, why it cannot yet be made real, and the two routes to fixing it.
**The files were not deleted** — that is your call, not mine, and the header preserves the intent.

`src/lib/astroCalculations.test.ts` imported `calculateLahiriAyanamsha`, which does not exist;
the real export is `calculateAyanamsha`. Node throws at import on that, so this suite could never
have run green. Fixed.

Its one loose assertion was also tightened. `if (p.degreeDecimal < 0 || p.degreeDecimal >= 360)`
lets `NaN` through, because every comparison against `NaN` is false. Rewritten as
`if (!(p.degreeDecimal >= 0 && p.degreeDecimal < 360))`, and a real invariant added: the
human-readable `degree` string must agree with `degreeDecimal % 30`.

CI now runs the three suites that genuinely execute application code, via `pnpm exec` rather than
`npx` — `npx` will silently fetch a missing package from the network, so `npx tsx` can appear to
work even when `tsx` is not installed. A `pnpm test` script was added so these run locally too.

**Verified by execution** (Node 22 native type stripping, scratch copies):

```
dashaEngine.test.ts      ✅ 9 Mahadashas, current = Rahu, total = 118.4 years   exit 0
astroCalculations.test.ts ✅ Lahiri Ayanamsha = 24.2216°                        exit 0
doshaEngine.test.ts      ✅ Natal Moon = Scorpio, Saturn = Aquarius             exit 0
```

That ayanamsha figure is worth noting as a genuine positive: 24.2216° for 2026-08-06 matches the
true Lahiri value to about a thousandth of a degree. `calculateAyanamsha` is real, working
astronomy.

---

## Corrections I made to my own earlier findings

Recorded because an audit that quietly edits itself is not worth trusting.

1. **SEC-01 overstated.** I claimed `CASHFREE_SECRET_KEY` was leaked in git history. Not
   reproducible — `api/payment.ts` reads it from `process.env` with an empty-string fallback and
   hardcodes nothing. Rotating it is cheap insurance, not an emergency.
2. **BUG-02 was not a bug.** I rated it Medium, calling the `degreeDecimal` field wrong. I then
   checked all 12 consumers: every one requires the 0–360 longitude — chart-wheel placement,
   aspect separation, nakshatra division. "Fixing" it would have broken all of them. Downgraded
   to Low, reframed as a naming trap, and a regression test now pins the invariant. Had I
   "fixed" this without checking consumers, I would have broken the birth chart.
3. **QA-02's "every job reports green" was unsupported.** I cannot read this repo's Actions
   history. Two steps look capable of real failure, so the pipeline may have been red or partly
   skipped rather than falsely green. Either way it was not testing the app.
4. **BUG-03's second half does not reproduce.** See above.
5. **The audit cited the wrong commit** (`82065f6` rather than `78f55e7`). Corrected.

---

## Still outstanding for you personally

1. **Rotate six credentials** — `ROTATION.md`. Nothing else in this work substitutes for it.
2. **Run `pnpm install && pnpm typecheck` locally.** This is the first time it will check
   anything. Expect real errors.
3. **SEC-09 — authentication is a mock that accepts any password.** `src/lib/supabase.ts` exports
   a fake client whose `signInWithPassword` ignores the password entirely, and `AuthScreen`'s
   `catch` block calls `onAuthSuccess()` even when auth throws. Anyone can sign in as anyone, and
   no user data is persisted anywhere. Scheduled for WS-3.
4. **Line-ending churn (HYG-02).** 302 files under `.agents/` show as modified from a pre-existing
   CRLF↔LF flip, unrelated to this work. Add `.gitattributes` with `* text=auto eol=lf` and
   renormalise in a separate commit, so it does not drown real diffs.
