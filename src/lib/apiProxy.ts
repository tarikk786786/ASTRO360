/**
 * Client-side access to external APIs, via the server proxy.
 *
 * Every third-party API that needs a credential is reached through `/api/proxy`,
 * which holds the keys server-side. Nothing in this file — and nothing that calls
 * it — should ever contain an API key.
 *
 * If you are adding a new external API: add a case to `api/proxy.ts`, read the key
 * from a NON-`VITE_` env name there, then add a wrapper here. Do not call the third
 * party from the browser directly, and do not add a `VITE_`-prefixed key, because
 * Vite inlines those into the bundle that ships to every visitor.
 */

export class ProxyError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly service: string
  ) {
    super(message);
    this.name = 'ProxyError';
  }
}

async function callProxy<T>(service: string, params: Record<string, string | number> = {}): Promise<T> {
  const search = new URLSearchParams({ service });
  for (const [k, v] of Object.entries(params)) search.set(k, String(v));

  const res = await fetch(`/api/proxy?${search.toString()}`, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      if (body?.error) detail = body.error;
    } catch {
      /* non-JSON error body; keep statusText */
    }
    throw new ProxyError(detail, res.status, service);
  }

  return (await res.json()) as T;
}

/* ------------------------------------------------------------------ *
 * NASA
 * ------------------------------------------------------------------ */

export interface ApodItem {
  title?: string;
  explanation?: string;
  url?: string;
  hdurl?: string;
  media_type?: string;
  date?: string;
}

/** Astronomy Picture of the Day. `count` returns a random selection. */
export async function fetchApod(count = 1): Promise<ApodItem[]> {
  const data = await callProxy<ApodItem | ApodItem[]>('nasa', { count });
  return Array.isArray(data) ? data : [data];
}

/* ------------------------------------------------------------------ *
 * Prayer times
 * ------------------------------------------------------------------ */

export interface PrayerTimings {
  [prayer: string]: string;
}

/**
 * Prayer timings for a coordinate.
 *
 * The proxy tries keyless Aladhan first and only falls back to keyed providers if
 * they are configured, so this works on a deployment with no credentials at all.
 * Returns the raw provider payload; callers already handle the shape differences.
 */
export function fetchPrayerTimes(lat: number, lng: number, method = 4): Promise<any> {
  return callProxy<any>('prayer_times', { lat, lng, method });
}

/* ------------------------------------------------------------------ *
 * Quran / Arabic
 * ------------------------------------------------------------------ */

export function fetchQuranVerse(surah: number, ayah: number): Promise<any> {
  return callProxy<any>('quran_verse', { surah, ayah });
}

export function fetchAsmaAlHusna(): Promise<any> {
  return callProxy<any>('asma_al_husna');
}

export function searchKalimat(query: string): Promise<any> {
  return callProxy<any>('kalimat_search', { q: query });
}

export function analyzeKalimatMorphology(text: string): Promise<any> {
  return callProxy<any>('kalimat_analyze', { text });
}
