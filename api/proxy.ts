/**
 * Secure serverless proxy for external APIs (NASA, UmmahAPI, MuslimSalat, Kalimat, Quran).
 *
 * Purpose: keep third-party credentials server-side. `.env.example` already stated the
 * rule — "Server-side API keys (Never expose to client with VITE_ prefix)" — but the
 * client was calling these APIs directly with keys hardcoded in the bundle. This module
 * is the single place those keys are read, and they are read from server-only names.
 *
 * Deliberately NOT read here: any `VITE_*` variable. Vite inlines `VITE_`-prefixed vars
 * into the browser bundle, so accepting them as a fallback would re-create the leak this
 * file exists to close.
 */

import { env, handlePreflight, rateLimit, num, int, str, fetchWithTimeout } from './_shared';

/** Services the proxy is willing to reach. Anything else is refused — this is not an open relay. */
const SERVICES = [
  'nasa',
  'prayer_times',
  'kalimat_search',
  'kalimat_analyze',
  'quran_verse',
  'asma_al_husna',
] as const;

type Service = (typeof SERVICES)[number];

export default async function handler(req: any, res: any) {
  if (handlePreflight(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Third-party quotas are finite and mostly paid. Cap per-IP usage.
  if (rateLimit(req, res, { limit: 60, windowMs: 60_000, key: 'proxy' })) return;

  const q = req.query || {};
  const service = str(q.service, 40) as Service | null;

  if (!service || !SERVICES.includes(service)) {
    return res.status(400).json({
      error: 'Unknown service requested',
      allowed: SERVICES,
    });
  }

  const e = env();

  try {
    switch (service) {
      case 'nasa': {
        // DEMO_KEY is a real NASA-provided fallback (severely rate limited) and is
        // safe to ship, unlike a personal key.
        const apiKey = e.NASA_API_KEY || 'DEMO_KEY';
        const count = int(q.count, 1, 10) ?? 1;
        const url =
          `https://api.nasa.gov/planetary/apod` +
          `?api_key=${encodeURIComponent(apiKey)}` +
          `&count=${count}`;
        return await forward(url, res, 900);
      }

      case 'prayer_times': {
        const lat = num(q.lat, -90, 90);
        const lng = num(q.lng, -180, 180);
        const method = int(q.method, 0, 23) ?? 4;

        if (lat === null || lng === null) {
          return res.status(400).json({ error: 'lat and lng are required and must be valid coordinates' });
        }

        // Aladhan is free, keyless and well maintained — the default path, so the
        // app works with no credentials configured at all.
        const aladhan =
          `https://api.aladhan.com/v1/timings` +
          `?latitude=${lat}&longitude=${lng}&method=${method}`;

        const primary = await fetchWithTimeout(aladhan);
        if (primary.ok) return await relay(primary, res, 3600);

        // Fall back to a keyed provider only if one is actually configured.
        if (e.UMMAH_API_KEY) {
          const ummah =
            `https://ummahapi.com/api/prayer-times` +
            `?lat=${lat}&lng=${lng}&key=${encodeURIComponent(e.UMMAH_API_KEY)}`;
          const alt = await fetchWithTimeout(ummah);
          if (alt.ok) return await relay(alt, res, 3600);
        }
        if (e.MUSLIM_API_KEY) {
          const muslim =
            `https://muslimsalat.com/${lat},${lng}/daily.json` +
            `?key=${encodeURIComponent(e.MUSLIM_API_KEY)}`;
          const alt = await fetchWithTimeout(muslim);
          if (alt.ok) return await relay(alt, res, 3600);
        }

        return res.status(502).json({ error: 'All prayer-time providers failed' });
      }

      case 'kalimat_search': {
        if (!e.KALIMAT_API_KEY) {
          return res.status(503).json({ error: 'Kalimat search is not configured on this deployment' });
        }
        const query = str(q.q, 200);
        if (!query) return res.status(400).json({ error: 'q is required (1-200 chars)' });

        const url = `https://api.kalimat.dev/search?q=${encodeURIComponent(query)}`;
        return await forward(url, res, 86400, { 'x-api-key': e.KALIMAT_API_KEY });
      }

      case 'kalimat_analyze': {
        if (!e.KALIMAT_API_KEY) {
          return res.status(503).json({ error: 'Kalimat analysis is not configured on this deployment' });
        }
        const text = str(q.text, 500);
        if (!text) return res.status(400).json({ error: 'text is required (1-500 chars)' });

        const url = `https://api.kalimat.dev/analyze?text=${encodeURIComponent(text)}`;
        return await forward(url, res, 86400, { 'x-api-key': e.KALIMAT_API_KEY });
      }

      case 'quran_verse': {
        // Keyless public APIs, proxied for consistent caching and CORS.
        const surah = int(q.surah, 1, 114);
        const ayah = int(q.ayah, 1, 286);
        if (surah === null || ayah === null) {
          return res.status(400).json({ error: 'surah (1-114) and ayah (1-286) are required' });
        }
        const url =
          `https://api.quran.com/api/v4/verses/by_key/${surah}:${ayah}` +
          `?fields=text_uthmani&translations=131`;
        const primary = await fetchWithTimeout(url);
        if (primary.ok) return await relay(primary, res, 604800);

        const fallback = await fetchWithTimeout(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}`);
        if (fallback.ok) return await relay(fallback, res, 604800);

        return res.status(502).json({ error: 'Quran providers unavailable' });
      }

      case 'asma_al_husna': {
        return await forward('https://api.aladhan.com/v1/asmaAlHusna', res, 604800);
      }
    }
  } catch (error: any) {
    const message = error?.name === 'AbortError' ? 'Upstream request timed out' : 'Proxy execution failure';
    // Never echo error?.message: upstream errors can contain the request URL, and
    // the request URL contains the API key.
    console.error(`[proxy:${service}]`, error?.message);
    return res.status(502).json({ error: message });
  }
}

/** Fetches an upstream URL and relays its JSON. The URL (which holds the key) never reaches the client. */
async function forward(url: string, res: any, cacheSeconds: number, headers: Record<string, string> = {}) {
  const upstream = await fetchWithTimeout(url, {
    headers: { Accept: 'application/json', ...headers },
  });
  return relay(upstream, res, cacheSeconds);
}

async function relay(upstream: Response, res: any, cacheSeconds: number) {
  const text = await upstream.text();
  if (upstream.ok && cacheSeconds > 0) {
    res.setHeader('Cache-Control', `public, max-age=60, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`);
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    return res.status(upstream.status).json(JSON.parse(text));
  } catch {
    return res.status(502).json({ error: 'Upstream returned a non-JSON response' });
  }
}
