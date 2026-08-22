/**
 * Shared helpers for ASTRO360 serverless functions.
 *
 * Vercel does not expose files prefixed with `_` as routes, so this is a plain
 * helper module, not an endpoint.
 *
 * Everything here exists to enforce three rules that were previously violated:
 *   1. Never reflect an arbitrary Origin while also allowing credentials.
 *   2. Never interpolate caller-controlled input into an upstream URL unencoded.
 *   3. Never let an unauthenticated caller burn a paid API quota without limit.
 */

/** Origins permitted to call these functions with credentials. */
const DEFAULT_ALLOWED_ORIGINS = [
  'https://astro.tarikislam.in',
  'http://localhost:5173',
  'http://localhost:3000',
];

function allowedOrigins(env: Record<string, string | undefined>): string[] {
  const fromEnv = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const list = fromEnv.length > 0 ? fromEnv : DEFAULT_ALLOWED_ORIGINS;
  // Vercel preview deployments get a generated URL; allow the current one.
  if (env.VERCEL_URL) list.push(`https://${env.VERCEL_URL}`);
  return list;
}

export function env(): Record<string, string | undefined> {
  return ((globalThis as any).process?.env || {}) as Record<string, string | undefined>;
}

/**
 * Applies CORS headers for a single explicitly allowed origin.
 *
 * `Access-Control-Allow-Origin: *` together with `Allow-Credentials: true` is
 * rejected by browsers anyway, and reflecting an arbitrary origin would let any
 * site drive these endpoints. So we echo the origin only when it is on the list,
 * and send `Vary: Origin` so caches do not serve one origin's response to another.
 */
export function applyCors(req: any, res: any): { ok: boolean } {
  const origin = req.headers?.origin as string | undefined;
  const list = allowedOrigins(env());

  res.setHeader('Vary', 'Origin');

  if (!origin) {
    // Same-origin browser requests and server-to-server calls send no Origin.
    // Nothing to grant, nothing to leak.
    return { ok: true };
  }

  if (list.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Max-Age', '86400');
    return { ok: true };
  }

  return { ok: false };
}

/** Handles the preflight and the disallowed-origin case. Returns true if the caller should stop. */
export function handlePreflight(req: any, res: any): boolean {
  const cors = applyCors(req, res);
  if (!cors.ok) {
    res.status(403).json({ error: 'Origin not allowed' });
    return true;
  }
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

/* ------------------------------------------------------------------ *
 * Rate limiting
 * ------------------------------------------------------------------ */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function clientIp(req: any): string {
  const fwd = (req.headers?.['x-forwarded-for'] as string | undefined) || '';
  return fwd.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

/**
 * Fixed-window limiter held in module scope.
 *
 * HONEST LIMITATION: serverless instances are per-region and recycled, so this
 * is per-instance, not global. It raises the cost of casual abuse and protects
 * against a single hot client, but it is NOT a real distributed rate limit. For
 * that you need shared state (Upstash Redis / Vercel KV). Documented rather than
 * pretended away.
 */
export function rateLimit(
  req: any,
  res: any,
  opts: { limit: number; windowMs: number; key?: string }
): boolean {
  const id = `${opts.key || 'default'}:${clientIp(req)}`;
  const now = Date.now();
  const existing = buckets.get(id);

  if (!existing || now > existing.resetAt) {
    buckets.set(id, { count: 1, resetAt: now + opts.windowMs });
  } else {
    existing.count += 1;
    if (existing.count > opts.limit) {
      const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
      res.setHeader('Retry-After', String(retryAfter));
      res.status(429).json({ error: 'Rate limit exceeded', retryAfterSeconds: retryAfter });
      return true;
    }
  }

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
  }
  return false;
}

/* ------------------------------------------------------------------ *
 * Input validation
 * ------------------------------------------------------------------ */

/** Parses a bounded number, returning null when the input is not usable. */
export function num(value: unknown, min: number, max: number): number | null {
  if (Array.isArray(value)) value = value[0];
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return n;
}

/** Parses a bounded integer. */
export function int(value: unknown, min: number, max: number): number | null {
  const n = num(value, min, max);
  return n === null ? null : Math.trunc(n);
}

/** Coerces a query value to a length-capped string. */
export function str(value: unknown, maxLen: number): string | null {
  if (Array.isArray(value)) value = value[0];
  if (typeof value !== 'string') return null;
  const s = value.trim();
  if (!s || s.length > maxLen) return null;
  return s;
}

/** Upstream fetch with a hard timeout, so a hanging third party cannot hang us. */
export async function fetchWithTimeout(url: string, init: any = {}, ms = 8000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
