import { createClient } from '@insforge/sdk';

/**
 * InsForge client.
 *
 * The anon key is a public-by-design identifier (same model as a Supabase anon
 * key) — security comes from row-level access policies on the backend, not from
 * hiding this value. It is therefore fine for it to reach the browser.
 *
 * What was NOT fine: hardcoding it as a literal fallback in tracked source. That
 * made the project impossible to point at a staging backend, and impossible to
 * rotate without a code change. So it now comes from configuration only.
 *
 * ⚠️ DEPLOY REQUIREMENT: set VITE_INSFORGE_URL and VITE_INSFORGE_ANON_KEY in your
 * Vercel project settings (and in .env.local for local dev) before deploying. If
 * they are absent the app will fail fast here with a clear message, rather than
 * silently falling back to a baked-in project.
 *
 * ⚠️ SEPARATE OPEN QUESTION: no row-level security policies, schema or migrations
 * are committed to this repo. Since this key is public, ALL protection for user
 * data depends on policies configured in the InsForge dashboard. That needs to be
 * verified independently — see docs/hardening/ROTATION.md.
 */

const baseUrl = import.meta.env.VITE_INSFORGE_URL;
const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY;

if (!baseUrl || !anonKey) {
  throw new Error(
    'InsForge is not configured. Set VITE_INSFORGE_URL and VITE_INSFORGE_ANON_KEY ' +
      'in your environment (Vercel project settings for deployments, .env.local for ' +
      'local development). See docs/hardening/ROTATION.md.'
  );
}

export const insforge = createClient({
  baseUrl,
  anonKey,
});
