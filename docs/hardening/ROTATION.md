# Credential rotation — action required by Tarik

**Created:** 2026-08-22 · **Status:** ⬜ not started

I cannot do any of this for you. Rotation needs logins to each provider's dashboard,
and this sandbox has no network access. Everything below is a manual step.

Values are never reproduced in this file. Each credential is named only.

---

## Why rotation is unavoidable

Three separate exposure routes, and each one alone is enough to require new keys:

1. **Hardcoded in tracked source.** Five keys sat in `src/` as literal `|| 'the-key'`
   fallbacks. Anyone who has ever viewed the GitHub repo, or the deployed JS bundle,
   could read them. I have removed the literals, but that does not un-publish them.
2. **`.env.local` was tracked in git.** Listing a file in `.gitignore` does nothing if
   the file was already added. I have now untracked it (`git rm --cached .env.local`)
   and your local copy is untouched.
3. **Three keys are in plaintext commit messages.** This is the one that cannot be
   cleaned. `git filter-repo` rewrites file contents, not commit messages, and even
   rewriting those does not recall clones or GitHub's cached views.

---

## Step 1 — Rotate these now

Work top to bottom. Each row: revoke the old credential, generate a new one, then set
it in **Vercel → Project → Settings → Environment Variables** and in your local
`.env.local`.

| # | Credential | Exposure route | Where to rotate | New env var name |
|---|-----------|----------------|-----------------|------------------|
| 1 | `VERCEL_OIDC_TOKEN` | tracked `.env.local` | Vercel → Account Settings → Tokens. These are normally short-lived, so it has probably expired already — revoke anyway. | *(not needed in env; Vercel injects it)* |
| 2 | `AI_GATEWAY_API_KEY` | tracked `.env.local` | Vercel AI Gateway dashboard | `AI_GATEWAY_API_KEY` |
| 3 | `KALIMAT_API_KEY` | **commit message `27f914c`** + hardcoded in `kalimatEngine.ts` | kalimat.dev dashboard | `KALIMAT_API_KEY` |
| 4 | `UMMAH_API_KEY` | **commit message `c0dc566`** + hardcoded in 2 files | ummahapi.com dashboard | `UMMAH_API_KEY` |
| 5 | `MUSLIM_API_KEY` | **commit message `536df2b`** + hardcoded in 2 files | muslimsalat.com dashboard | `MUSLIM_API_KEY` |
| 6 | `NASA_API_KEY` | tracked `.env.local` + hardcoded in 2 files | api.nasa.gov — request a new key | `NASA_API_KEY` |

**Drop every `VITE_` copy.** `VITE_NASA_API_KEY`, `VITE_UMMAH_API_KEY`,
`VITE_MUSLIM_API_KEY` and `VITE_KALIMAT_API_KEY` should be **deleted** from Vercel, not
re-set. Nothing reads them any more, and re-adding one would republish the key. The
only `VITE_` variables that should exist are the two InsForge ones.

### Not on the list, and why

`CASHFREE_SECRET_KEY` — I searched tracked source and git history and **did not find
it**. `api/payment.ts:26-28` reads it from `process.env` with an empty-string fallback
and hardcodes nothing. So your payment secret appears **not** to have leaked. Rotating
it is still cheap insurance and I'd do it, but it is not the emergency the six above are.

`VITE_INSFORGE_ANON_KEY` — an anon key is public by design, like a Supabase anon key:
it names the project, it does not authorise anything by itself. Rotation is optional.
**But see Step 4** — it being public is only safe if backend policies exist, and I
could not verify that they do.

---

## Step 2 — Check for abuse before you assume no harm

Rotating stops future misuse; it tells you nothing about past misuse. For each of NASA,
UmmahAPI, MuslimSalat and Kalimat, open the usage dashboard and look for request volume
you did not cause. Unexplained spend on a leaked key is the signal that someone found it.

---

## Step 3 — Set required variables before your next deploy

Two changes in this pass will fail loudly rather than silently, which is deliberate.
Set these in Vercel **before** redeploying:

- `VITE_INSFORGE_URL` and `VITE_INSFORGE_ANON_KEY` — `src/lib/insforge.ts` now throws a
  clear configuration error instead of falling back to a baked-in project. *(Currently
  low risk: that module has no importers, so nothing imports the throw. It will matter
  the moment you wire InsForge up.)*
- `CASHFREE_WEBHOOK_SECRET` — required by the webhook handler added in WS-3. Without it,
  incoming webhooks are rejected rather than trusted.
- `ALLOWED_ORIGINS` — optional. Defaults to `https://astro.tarikislam.in` plus
  localhost. Set it if you use additional custom domains.

See `.env.example` for the full annotated list.

---

## Step 4 — The question that worries me more than the keys

`src/lib/supabase.ts` exports a **mock**. Its `signInWithPassword` ignores the password
and returns success for any input; `from().insert()` returns your data back and stores
nothing. `AuthScreen` uses it, and its `catch` block calls `onAuthSuccess()` even when
auth throws.

So right now: **anyone can sign in as anyone, and no user data is saved anywhere.**
That is finding SEC-09 in `AUDIT.md`. It is not a rotation task, but it makes the
InsForge anon key question moot — there is no backend in use to protect yet. When you
do wire one up, row-level policies have to exist before that key can be considered
safely public. No schema, migrations or policies are committed to this repo, so I have
no way to check them from here.

---

## Step 5 — Optional: purge the files from git history

Only worth doing if the repo is or will be public. It does **not** help keys 3, 4 and 5,
which are in commit messages.

This rewrites every commit SHA. Coordinate it — anyone else with a clone must re-clone.
Back up first.

```bash
# From a fresh clone, with the repo backed up:
pip install git-filter-repo
git filter-repo --invert-paths --path .env --path .env.local
git push --force --all
git push --force --tags
```

Then, in GitHub: **Settings → Secret scanning** on, and delete any forks you control.
Consider whether the three commit messages justify a fresh repository — that is the
only way to remove them.

---

## Checklist

- [ ] 1. Revoke `VERCEL_OIDC_TOKEN`
- [ ] 2. Rotate `AI_GATEWAY_API_KEY`
- [ ] 3. Rotate `KALIMAT_API_KEY`
- [ ] 4. Rotate `UMMAH_API_KEY`
- [ ] 5. Rotate `MUSLIM_API_KEY`
- [ ] 6. Rotate `NASA_API_KEY`
- [ ] 7. Delete all four `VITE_*` key copies from Vercel
- [ ] 8. Review usage dashboards for unexplained activity
- [ ] 9. Set `CASHFREE_WEBHOOK_SECRET` and the InsForge vars in Vercel
- [ ] 10. Commit the untracking of `.env.local` (already staged)
- [ ] 11. Decide on history purge / fresh repo
- [ ] 12. Rotate `CASHFREE_SECRET_KEY` as precaution (not known to be leaked)
