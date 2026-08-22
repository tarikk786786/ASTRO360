# ASTRO360 — Production Hardening Audit (Phase 0)

**Date:** 2026-08-22
**Commit audited:** `78f55e7` on `main` ("feat(landing): make landing page 100% free early access…")
**Scope:** read-only. No code was changed in this phase.

> **Working-tree note:** before any of this work began, `git status` already showed 302 modified
> files under `.agents/` totalling 38,955 insertions and 38,955 deletions — an exact 1:1 count,
> i.e. a whole-file line-ending flip (CRLF↔LF), not content changes. This is pre-existing and
> unrelated to the audit. It must be dealt with separately (see HYG-02) because it will swamp
> the diff of any commit made from this tree.

---

## 1. Current architecture

ASTRO360 is a single-page React application. There is no application server of its own; three
Vercel serverless functions in `api/` provide the only server-side surface.

**Stack.** Vite 7.3.6 + React + TypeScript, Tailwind v4 via `@tailwindcss/vite`, Radix/shadcn
primitives in `src/components/ui/`, `zustand` for state, `motion/react` for animation,
`recharts` for charts. Package manager is pnpm with a workspace catalog
(`pnpm-workspace.yaml`). Deploy target is Vercel (`vercel.json`, `outputDirectory: dist/public`);
Replit scaffolding (`.replit`, `@replit/*` Vite plugins) is still present from the project's origin.

**Size.** 263 TypeScript/TSX files in `src/`, 51,828 lines. 90 top-level components in
`src/components/`. Eight files exceed 1,000 lines, the largest being
`CustomRemedialMediumEngine.tsx` (1,686) and `CosmicIntelligenceCenter.tsx` (1,621).

**Navigation.** There is no router. `wouter` is a declared dependency but appears nowhere in
`src/`. `src/App.tsx` (863 lines) selects the active feature through 133 `activeTab === '...'`
conditional branches. Consequences: no URL per feature, no deep links, no browser back/forward,
no shareable links, and nothing for a crawler to index.

**Client/server boundary.** `api/proxy.ts` fronts NASA, prayer-time and Kalimat APIs and does
correctly hold those keys server-side. `api/payment.ts` fronts Cashfree order creation.
`api/astrology.ts` is the third function. Everything else — including all astrology
computation, the wallet, and all entitlement logic — runs in the browser.

**State.** `zustand` stores in `src/stores/` (including `walletStore.ts`, `navigationStore.ts`,
`userStore.ts`), three of which use `persist`, plus 25 direct `localStorage` call sites.

**Computation.** The live astrology path is `src/lib/astroCalculations.ts` (335 lines), reached
from `BirthChartGenerator.tsx` and `UnifiedChartEngine.tsx`. A second, larger engine tree
exists under `src/lib/ephemeris/`, `src/lib/vedic/`, `src/lib/western/` and `src/lib/islamic/`
(~2,059 lines) plus `src/lib/astronomyEngine.ts` and `src/backend/astronomicalCalculationEngine.ts`.
Only `src/lib/astrologyEngines.ts` imports any of it, and only `BirthChartGenerator.tsx`
imports that — for one function. The rest is unreachable.

**Quality gates.** No ESLint config and no `lint` script. No test runner in the dependency tree.
13 `*.test.ts` files exist containing 3 `it()`/`test()` cases in total. One CI workflow exists.

---

## 2. Findings

Severity: **Critical** = exploitable or actively wrong in production ·
**High** = wrong results or material risk · **Medium** = fragile / won't scale ·
**Low** = hygiene. Effort: S < ~1h · M ~½ day · L multi-day.

### Critical

| ID | Area | Sev | Eff | Location | Finding | Why it matters |
|----|------|-----|-----|----------|---------|----------------|
| SEC-01 | Secrets | Critical | S+ | git history; `.env.local` at HEAD | **Confirmed by variable name (values never reproduced here).** (a) `.env` appears in historical commits carrying `NASA_API_KEY`, `MUSLIM_API_KEY`, `UMMAH_API_KEY`, `KALIMAT_API_KEY` and their `VITE_` copies. (b) `.env.local` was **still tracked at HEAD** holding `VERCEL_OIDC_TOKEN`, `AI_GATEWAY_API_KEY`, `NEXT_PUBLIC_INSFORGE_ANON_KEY`, `NEXT_PUBLIC_INSFORGE_URL`, `NASA_API_KEY`, `VITE_NASA_API_KEY`. (c) Three keys are written in **plaintext inside commit messages**: Kalimat (`27f914c`), UmmahAPI (`c0dc566`), MuslimSalat (`536df2b`). | Purging files does not remove commit messages — (c) survives any history rewrite and is the reason those three keys cannot be saved. Listing a file in `.gitignore` does not untrack it, which is why (b) persisted. **Correction to an earlier draft of this audit: `CASHFREE_SECRET_KEY` was *not* found in git history or in tracked source.** `api/payment.ts:26-28` reads it from env with an empty-string fallback and hardcodes nothing. The payment secret appears not to be leaked — rotate it anyway as cheap insurance, but the urgent set is the four third-party keys plus the Vercel token. |
| SEC-02 | Payments | Critical | M | `api/payment.ts` (`verify_utr` / `verify_payment` branch, and the `GET ?order_id=` fallback) | Both verification paths return `{ success: true, status: 'PAID' }` **unconditionally**, without contacting Cashfree. The GET path returns `order_status: 'PAID', order_amount: 299` for any `order_id`, under the comment "Auto verify if verified locally". | Anyone can POST `{action:'verify_payment'}` and be marked paid. This is stubbed payment success standing in for a real flow — revenue loss and a misrepresentation to customers. |
| SEC-03 | Payments | Critical | M | `src/lib/ownpayEngine.ts:146-151` | `verifyOwnPayTransaction()` always returns `verified: true` and **fabricates** a 64-hex transaction hash with `Math.random()`. | Presents an invented blockchain txHash as proof of settlement. No chain lookup occurs. |
| SEC-04 | Secrets | Critical | S | `VITE_KALIMAT_API_KEY`, `VITE_MUSLIM_API_KEY`, `VITE_UMMAH_API_KEY`, `VITE_NASA_API_KEY`, `VITE_INSFORGE_ANON_KEY` | Vite inlines every `VITE_`-prefixed var into the client bundle at build time. Four are paid/rate-limited third-party keys. This also defeats the stated purpose of `api/proxy.ts`, which exists to keep exactly these keys server-side. | Anyone can read them from the shipped JS and spend your quota. |
| SEC-08 | Secrets | Critical | S | `AlAzanPrayerSuite.tsx:42-43`, `NasaLiveTelemetry.tsx:20`, `NasaNewsAstrologySuite.tsx:31`, `islamicKnowledgeEngine.ts:42-43`, `kalimatEngine.ts:31`, `insforge.ts:4` | **Worse than SEC-04.** Five live API keys are hardcoded as literal `\|\| 'actual-key-here'` fallbacks in tracked source: MuslimSalat, UmmahAPI (`umh_0b8d…`), NASA (`5ZJ6IE…`), Kalimat (`6c2fd1…`), InsForge anon (`anon_60e0…`). All six files are tracked at HEAD. | Setting the env vars correctly does **not** help — the literals ship in the bundle unconditionally, and they are readable right now in the public GitHub source. These keys are burned. Purging git history will not help either, because they are in the current working source. |
| BUG-01 | Runtime | Critical | S | `src/App.tsx:384-404, 596, 624` | 16 identifiers are rendered but never imported: `Hash`, `Eye`, `Calendar`, `AlertTriangle`, `Sunrise`, `Sun`, `Music`, `Radar`, `MapPin`, `Network`, `BarChart2`, `BookOpen`, `FileText`, `Shield`, plus components `SpiritualTraditionsSuite` and `DailyHoroscopeTransitEngine`. Verified absent from every import statement in the file. | `<Hash/>` sits in the sidebar nav, so rendering it throws `ReferenceError: Hash is not defined`. esbuild does not catch undefined identifiers, so the build passes and it fails in the browser. Consistent with the most recent commit being a React-crash fix. |
| SEC-09 | Auth | Critical | L | `src/lib/supabase.ts:3-24`, `src/components/AuthScreen.tsx:30,50,65-73` | **Authentication is a mock that accepts anything.** `src/lib/supabase.ts` exports `createMockSupabase()` as `supabase`. Its `signInWithPassword` **ignores the password entirely** and returns `{ user: {...}, error: null }` with the hardcoded name `'Tarik Islam'`; `signUp` likewise always succeeds. `from(table).select()` always returns `[]`; `insert`/`update` echo their argument and **persist nothing**. `AuthScreen` (live — rendered at `App.tsx:680`) calls these, and its `catch` block at `:65-73` calls `onAuthSuccess()` anyway as an "offline / demo mode" fallback, so failure is also success. | Anyone signs in as anyone with any password, or no password. Nothing a user saves is ever stored — profiles, saved charts, chat history and dream logs all vanish on reload, while the UI says "Profile synchronized" and "Telemetry loaded". This also answers a question left open in §3: there is **no persistence layer in use at all**. `src/lib/insforge.ts` is the only real backend client and it has **zero importers**. |

### High

| ID | Area | Sev | Eff | Location | Finding | Why it matters |
|----|------|-----|-----|----------|---------|----------------|
| SEC-05 | Payments | High | M | `api/payment.ts` | No webhook signature verification anywhere. `notify_url` points at `/api/payment?action=webhook`, but no `action === 'webhook'` branch exists — such a POST falls through to the **order-creation** branch. | Cashfree callbacks are unauthenticated and mishandled; forged callbacks are indistinguishable from real ones. |
| SEC-06 | API | High | S | `api/payment.ts:13-14`, `api/proxy.ts:9-10` | `Access-Control-Allow-Origin: '*'` combined with `Allow-Credentials: 'true'` on both functions. No rate limiting on either. | Any origin can drive your payment and proxy endpoints; the proxy is an open relay for your paid API quota. |
| SEC-07 | Auth | High | L | codebase-wide | No `isAuthenticated` / `isPremium` / `hasAccess` / entitlement check exists anywhere. Wallet balance lives in a client `zustand` + `localStorage` store (`src/stores/walletStore.ts`). | Nothing is actually gated, and the balance is editable from devtools. With SEC-02, monetization is decorative. |
| DOM-01 | Astronomy | High | M | `src/lib/astroCalculations.ts:134,136` | Mercury is `sunL + sin(d*0.04°)*15`; Venus is `sunL + cos(d*0.03°)*22`. These are arbitrary wobbles: the implied periods are ~24.6 and ~32.9 years against true synodic periods of 116 and 584 days, and the amplitudes (15°, 22°) do not match true maximum elongations (~28°, ~47°). | Mercury and Venus positions are invented. Any reading involving them is meaningless. |
| DOM-02 | Astronomy | High | M | `src/lib/astroCalculations.ts:153` | `ascendantLong = (sunL + hour * 15) % 360`. The real ascendant requires local sidereal time, observer **latitude**, and obliquity. Latitude is never used. | Line 162 derives every house placement from this, so all 12 house assignments are wrong for every chart — and identical for Oslo and Nairobi. |
| DOM-03 | Astronomy | High | M | `src/lib/astroCalculations.ts:116` | `new Date(\`${date}T${time}:00\`)` has no timezone designator, so it parses in the **viewer's** local zone, and is then read back with `getUTC*`. No timezone or geocoding library is in the dependency tree. | The same birth data yields different charts on different machines. Silently invalidates every result. |
| DOM-04 | Astronomy | High | M | `src/lib/astroCalculations.ts:282-320` | `calculateAshtaKootaScore()` derives all 8 koota scores from `simpleHash(name + dob)` of both partners. Ashta Koota is a defined procedure over both Moon nakshatras. | Changing the spelling of a name changes the compatibility score. Presented to users as a Vedic /36 match with a recommendation. |
| DOM-05 | Astronomy | High | S | `src/lib/astroCalculations.ts:241-277` | `calculateVimshottariDasha()` forces `moonNakshatraIndex = 3` whenever a date string is passed (`:246-247`), and returns **hardcoded** `startDate: '2023-04-12'` / `endDate: '2039-04-12'` regardless of input (`:272-273`). `progressPercent` is clamped to 15–90 (`:264`) so it always looks mid-period. | The dasha timeline is fixed output. Notably the `DASHA_LORDS` table at `:84-94` **is correct** (proper Vimshottari order, sums to 120 years) — the table is right and simply unused. |
| DOM-12 | Architecture | High | S | `src/backend/dashaEngine.ts` (88 lines) | **A correct Vimshottari implementation already exists in this repo and nothing imports it.** `calculateVimshottariDasha(moonLongitude, birthDate)` derives the nakshatra from the real moon longitude (`floor(long / 13.3333) % 27`), maps it to the lord via `% 9`, prorates the first mahadasha by the fraction of the nakshatra already elapsed, and walks the remaining eight in correct order. I ran it: moon 42.1° (Rohini) on 1995-05-15 yields 9 mahadashas totalling 118.4 years with a partial first period — the expected shape. Zero importers; the UI calls the fabricated version in `astroCalculations.ts` (DOM-05) instead. | Cheapest high-value fix in the whole audit: wire the existing correct engine into the UI rather than writing a new one. Two defects to fix first — `currentAntardasha: 'Mercury'` is hardcoded behind the comment `// Calculated sub-period` (a placeholder dressed as real; antardashas are not implemented at all), and the docstring's lord order disagrees with the correct `DASHA_LORDS` array below it. Feeds WS-5. |
| DOM-06 | Astronomy | High | S | `src/lib/astroCalculations.ts:145,149,150` and `:142-150` | Retrograde is hardcoded: Mercury `retro: true` always; Venus/Mars/Jupiter/Saturn `false` always. Daily speeds are constant display strings (`'+0.98°/d'`). | Mercury is retrograde ~18% of the time, Saturn ~36%. Retrograde status drives interpretation, and it is fabricated. (Rahu/Ketu always-retrograde is correct.) |
| QA-01 | Tooling | High | S | `tsconfig.json` | `"files": []` with only project `references`, and no `include` in any root tsconfig. So `pnpm typecheck` (`tsc -p tsconfig.json --noEmit`) compiles **zero files in `src/`** — it passes instantly and checks nothing. | The green typecheck in CI is meaningless. It is why BUG-01 shipped. Real error count in `src/` is currently unmeasured. |
| QA-02 | CI | High | S | `.github/workflows/ci-testing-pipeline.yml` | The pipeline largely does not test. The accessibility job runs `node -e "console.log('✅ WCAG 2.1 AA … Verified Cleanly!')"`. The security job runs `git status` then echoes `"✅ Zero secrets tracked in version control repository!"` — which is **false** (SEC-01). The Playwright job installs browsers and uploads a report but never runs `playwright test`; neither `playwright` nor `vitest` is a dependency, despite a job titled "Vitest/TSX". Build steps use `pnpm --filter @workspace/astro360`, but `package.json` declares `"name": "astro360"`, so the filter matches nothing. | Manufactures false confidence: the three jobs above cannot fail, so their green tells you nothing. **Correction to an earlier draft of this audit, which claimed "every job reports green while verifying nothing" — that is not established.** I have no network access and cannot read this repo's Actions run history, and two steps look capable of genuine failure: the unmatched `--filter` either no-ops or errors depending on pnpm version, and `src/lib/astroCalculations.test.ts` imported a non-existent export (QA-04), which throws at import. The pipeline may well have been *red*, or partly skipped, rather than falsely green. Either way it was not verifying the app. |
| QA-04 | Tests | High | M | `src/backend/*.test.ts` (9 of 12 files) | **Nine of the twelve test files import no application code at all.** Each declares a local literal and then asserts a fact about that literal, so it passes unconditionally. Verbatim from `astroCartography.test.ts`: `const dubaiLine = "Jupiter (Wealth & Career)"; if (dubaiLine.includes("Jupiter")) { console.log("✅ Test 1 Passed: Dubai Jupiter Midheaven relocation line verified.") }`. `chakraFengshui.test.ts` asserts a locally-computed Kua number is between 1 and 9 — arithmetically always true. `planetaryHoras.test.ts` builds a 24-element array with `Array.from({length:24})` and asserts its length is 24. Five of these nine were wired into CI. Separately, `src/lib/astroCalculations.test.ts` imported `calculateLahiriAyanamsha`, which does not exist (the real export is `calculateAyanamsha`), so it threw at import rather than running. | These suites would keep passing if the features they name were deleted outright. Three of the nine (`chakraFengshui`, `mantraRadar`, `tarikIslamPassport`) name features that have **no implementation module anywhere in `src/`** — the literals in the test file are the only place the described behaviour exists. Genuine executing coverage is 3 files, not 12. |

### Medium

| ID | Area | Sev | Eff | Location | Finding | Why it matters |
|----|------|-----|-----|----------|---------|----------------|
| DOM-07 | Astronomy | Medium | M | `src/lib/astroCalculations.ts:131-138` | Sun, Moon, Mars, Jupiter, Saturn and Rahu use genuine **mean** longitudes with correct J2000 epochs and mean motions, but no equation of centre. Resulting error: ~±2° Sun, ~±6.3° Moon, ~±10.7° Mars. | A nakshatra is 13°20′, so a 6.3° Moon error frequently lands the Moon in the wrong nakshatra — the anchor for dasha and matching. The method is sound but under-implemented. |
| DOM-08 | Astronomy | Medium | M | `src/lib/ephemeris/*` | `planetaryPositions.ts:10-37` — `calculateKeplerianElements`, `calculateVSOP87`, `getTrueNode`, `getMeanNode` all return zeroes. `houseCalculation.ts:9-15` ignores both its `system` and `mcDeg` arguments and always returns equal houses, so 'placidus'/'koch'/'regiomontanus' are labels over identical output. `eclipseEngine.ts:9-19` emits a `solar_partial` every 180 days at phase 0.5. `fixedStars.ts:9-23` returns precession-only longitude, latitude 0, magnitude 1 for any star name. | Currently harmless because nothing imports these — but they read as a working ephemeris and invite reuse. `aspectCalculation.ts` is the exception and is **correct** (sound orbs; correct Vedic drishti for Jupiter 5/7/9, Mars 4/7/8, Saturn 3/7/10). |
| DOM-09 | Astronomy | Medium | S | `src/lib/astroCalculations.ts:228-230` | `karana: 'Bava Karana'`, `abhijitMuhurta: '11:48 AM - 12:36 PM'`, `rahuKalam: '04:30 PM - 06:00 PM'` are constants. Rahu Kalam depends on weekday plus local sunrise/sunset. | Static strings presented as daily panchang. The surrounding tithi/yoga/illumination **methods are correct** (12° per tithi; `(1-cos)*50`). |
| DOM-10 | Astronomy | Medium | S | `src/components/BirthChartGenerator.tsx:26` | `estimatedOffset` is the fixed string `'+4 Minutes Shift Suggested (Confidence 94%)'`. | A fabricated 94% confidence figure in the Birth Time Rectification tab. |
| ARCH-01 | Routing | Medium | L | `src/App.tsx` | 133 `activeTab === ` branches instead of routes; `wouter` installed but unused. | No deep links, no back button, no shareable URLs, nothing indexable. Blocks SEO and sharing — both growth-critical for this product. |
| PERF-01 | Bundle | Medium | M | codebase-wide | Zero `React.lazy`, zero dynamic `import()`. All ~60 feature modules, `recharts`, and the animation stack load eagerly in one chunk across 51.8k lines. | Large single bundle; slow first paint, worst on the mid-range Android likely to dominate this audience. Bundle size **not measured** — see §3. |
| ARCH-02 | Deps | Medium | S | `package.json` | Unused: `@tanstack/react-query` (0 files), `zod` (0 files), `wouter` (0), `nodemailer` (0). Duplicated: both `framer-motion` (2 files) and `motion/react` (106). `react-hook-form` used in 1 file. | `zod` unused means there is **no runtime validation** on any API boundary or form. Dead weight and a misleading dependency list. |
| ARCH-03 | Dead code | Medium | M | `src/components/`, `src/lib/` | 13 of 90 top-level components are never imported, including `Dashboard`, `Universe3DCanvas` (740 lines), `AstroRemedialGemstoneEngine` (794), `IslamicGuidanceEngine`. Plus the ~2,059-line unreachable engine tree (DOM-08). | Roughly 3–4k lines of orphaned code, and two competing astrology implementations where the better-structured one is the dead one. |
| QA-03 | Tests | Medium | L | `src/**/*.test.ts`, `e2e/`, `cypress/` | No test runner installed (no vitest/jest). 13 test files hold 3 `it()`/`test()` cases total. `playwright.config.ts`, `cypress.config.ts` and `backstop.json` exist with no corresponding dependency or script. | Effectively zero automated coverage, including on the payment path. |
| A11Y-01 | Accessibility | Medium | M | `src/` | 32 `aria-*` attributes across 263 files; one `prefers-reduced-motion` reference against heavy `motion/react` use in 106 files. `docs/AccessibilityReport.md` and the CI job both assert WCAG 2.1 AA. | The AA claim is unsupported. Reduced-motion is essentially unhandled on an animation-dense UI. |
| BUG-02 | Naming | Low | S | `src/lib/astroCalculations.ts:157,180` | A local `degreeDecimal` (0–30, within-sign) is computed at `:157` and used to build the `degree` display string, while the returned field `degreeDecimal` is assigned `p.long` (0–360). **Correction to an earlier draft of this audit, which rated this Medium and called it a bug: it is not one.** I checked all 12 consumers. Every one requires the 0–360 reading — chart-wheel placement (`(p.degreeDecimal - 90) * Math.PI / 180` in `BirthChartGenerator.tsx:452`, `SynastryOverlayChart.tsx:89`, `HeroSection.tsx:233`), aspect separation (`Math.abs(p1.degreeDecimal - p2.degreeDecimal)` in `PlanetaryAspectGraph.tsx:34`), and nakshatra division (`CosmicIntelligenceCenter.tsx:466`). "Fixing" the field to within-sign degrees would silently break all of them. `calculatePanchang` at `:204` is therefore correct by design, not by accident. | The only real defect is that the name says "degree" while the value is a longitude, next to a sibling field `degree` holding the within-sign value. A naming trap, not a wrong number. Rename to `longitude` and add `degreeInSign` if the pair is ever tidied; do not change the numeric semantics. A regression test now pins the `degree` ↔ `degreeDecimal % 30` invariant. |
| BUG-03 | Types | Medium | S | `src/App.tsx:441,632` | `Property 'icon' does not exist on type 'CategoryInfo'`; props object not assignable to `TraditionViewProps`. | Real type errors, invisible because of QA-01. |

### Low

| ID | Area | Sev | Eff | Location | Finding |
|----|------|-----|-----|----------|---------|
| CFG-01 | Config | Low | S | `package.json` | `react`, `react-dom` and the entire `@radix-ui/*` set are in `devDependencies`. Works under Vercel's default install, but breaks any `--production` install and misrepresents the runtime surface. |
| CFG-02 | Config | Low | S | `tsconfig.base.json` | `strict` is not enabled. `strictNullChecks`/`noImplicitAny` are on, but `strictFunctionTypes: false`, `noImplicitOverride: false`, `noUnusedLocals: false`, and `noUncheckedIndexedAccess` is absent — notable given the heavy array indexing in the engines. |
| HYG-01 | Hygiene | Low | S | repo root | `artifacts/` (83 files) and `.vercel/` (2) are tracked. ~9 root markdown audits plus 21 in `docs/` — many contradicted above. `edit.py`, `edit2.py`, `tsconfig.tsbuildinfo` sit in the root. |
| HYG-02 | Hygiene | Low | S | `.agents/**` (302 files) | The working tree carries a 38,955-line CRLF↔LF flip with no content change. No `.gitattributes` exists to pin line endings. | Swamps every diff and will make real changes unreviewable. Fix with a `.gitattributes` (`* text=auto eol=lf`) plus a one-off renormalise commit, kept separate from functional commits. |
| DOM-11 | Astronomy | Low | S | `src/lib/astroCalculations.ts:101` | `fracYear = year + month/12 + day/365.25` double-counts the month term. Sub-degree impact on ayanamsha only. |
| CFG-03 | Config | Low | S | `src/components/BirthChartGenerator.tsx:26-33` vs `astroCalculations.ts:99-109` | Two independent ayanamsha sources: a correct date-dependent `calculateAyanamsha()` (Lahiri 23.85° at J2000, 0.01397°/yr — both accurate) and a hardcoded table in the component (`lahiri: 24.178`) which is what actually gets used. |

### What is genuinely solid

Worth stating, because it is real and should be preserved: the `DASHA_LORDS` Vimshottari table
(`astroCalculations.ts:84-94`) is correct and complete. `calculateAyanamsha()` uses accurate
Lahiri constants — **verified by execution**, not just by reading: it returns `24.2216°` for
2026-08-06, which matches the true Lahiri ayanamsha for that date to within about a
thousandth of a degree. Nakshatra and pada boundary math (`:164-166`) is correct. Tithi, yoga
and moon-illumination formulae in `calculatePanchang()` are the right methods. The Julian Day
routine (`:123-126`) is the standard Fliegel–Van Flandern algorithm, correctly implemented
including the noon epoch offset. `ephemeris/aspectCalculation.ts` is correct throughout,
including Vedic special aspects. `src/backend/dashaEngine.ts` is a correct, working Vimshottari
timeline calculator that merely needs wiring up (DOM-12) — also verified by execution.
`api/proxy.ts` has the right *shape* for protecting
credentials. `pnpm-workspace.yaml` sets `minimumReleaseAge: 1440` — genuinely good
supply-chain hygiene that most projects lack. The shadcn/Radix layer in `src/components/ui/`
is a solid, accessible foundation. The domain knowledge encoded in `src/data/` is real
reference data, not fabricated results.

The pattern across this codebase is not incompetence — it is a correct outer shell with the
load-bearing centre left unimplemented, then documented as finished.

---

## 3. Could not determine

- **Bundle size and build success.** `vite build` could not run: `node_modules` was installed
  on Windows and pnpm's symlinks do not resolve from the Linux sandbox (`Cannot find package
  'esbuild'`). PERF-01 is therefore reasoned from source, **not measured**. Needs `pnpm build`
  on your machine.
- **Real type-error count in `src/`.** Forcing `tsc` over `src/` produced 14,866 errors, but
  ~14,000 are `TS7026`/`TS2307`/`TS2875` cascading from the same unresolvable `node_modules`.
  Only the module-independent errors (BUG-01, BUG-03) are confirmed. The true count is unknown
  until QA-01 is fixed and `tsc` runs locally.
- **Whether the deployed site currently crashes.** BUG-01 is confirmed in source; I could not
  load `astro.tarikislam.in` (no network egress) to see whether that code path renders in prod.
- **Whether the leaked credentials are still live.** I did not test them — deliberately. Assume
  compromised.
- **`npm audit` / CVE status.** Requires registry access.
- **Runtime behaviour generally.** No dev server, so loading states, error states, empty states,
  responsive behaviour and keyboard navigation were assessed from source only.
- **InsForge and `api/astrology.ts` backends.** Whether the InsForge project still exists, what
  its schema and row-level security look like, and what `api/astrology.ts` talks to, cannot be
  established from the repo. No schema, migrations or RLS policies are committed — so the data
  layer, including auth storage, is entirely unaudited.
- **Whether `dist/public` matches `vercel.json`.** Unverified without a build.

---

## 4. Recommended order

Reasoning rather than prescription — confirm or reorder before Phase 2 begins.

1. **WS-1 · Credential rotation and secret purge (SEC-01, SEC-04).** First because it is the
   only finding where delay increases damage, and rotation is manual work only you can do.
2. **WS-2 · Stop the crash and make the compiler work (BUG-01, QA-01, BUG-03, QA-02).** Small,
   self-contained, and it turns the type checker into a real net so later phases are safe.
3. **WS-3 · Make payments honest (SEC-02, SEC-03, SEC-05, SEC-06, SEC-07).** Real
   server-side verification, webhook signatures, server-held entitlements.
4. **WS-4 · Real astronomy (DOM-01/02/03/06/07).** Meeus algorithms in plain TypeScript —
   no new dependencies, so it works despite the sandbox's blocked network.
5. **WS-5 · Honest domain output (DOM-04/05/09/10).** Real Ashta Koota and dasha; delete
   fabricated confidence figures.
6. **WS-6 · Routing and code splitting (ARCH-01, PERF-01).** Unlocks sharing and SEO.
7. **WS-7 · Dead code, deps, docs, accessibility (ARCH-02/03, A11Y-01, HYG-01, QA-03).**

One caveat on sequencing: WS-4 and WS-5 change what every reading in the app says. If real
users are relying on current output, that transition needs thinking about — it is a product
decision, not just a code one.
