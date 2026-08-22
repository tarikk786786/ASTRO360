/// <reference types="vite/client" />

/**
 * Client-visible environment variables.
 *
 * ⚠️ Anything declared here is inlined by Vite into the JavaScript bundle served to
 * every visitor. Treat this list as PUBLIC. Never add an API key, secret, token or
 * signing key to it.
 *
 * Server-only credentials (NASA_API_KEY, UMMAH_API_KEY, MUSLIM_API_KEY,
 * KALIMAT_API_KEY, CASHFREE_APP_ID, CASHFREE_SECRET_KEY, GEMINI_API_KEY, …) must be
 * read only inside `api/` functions via `process.env`, and must NOT carry a `VITE_`
 * prefix. See `api/proxy.ts`.
 */
interface ImportMetaEnv {
  /** InsForge project URL. Public by design. */
  readonly VITE_INSFORGE_URL?: string;
  /**
   * InsForge anonymous key. Public by design — it identifies the project, it does not
   * authorise anything on its own. All protection depends on row-level policies
   * configured on the backend.
   */
  readonly VITE_INSFORGE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
