/**
 * ASTRO360 OMNI: Ultra-Fast Multi-Level Calculation & Performance Cache
 * Follows Ultra-Fast Performance PRD (L1 Memory -> L2 Persistent Storage -> AstroCore)
 */

export const ENGINE_VERSION = '3.6.0-omni';
export const EPHEMERIS_VERSION = 'JPL-DE440-2026';

// In-Memory L1 Cache
const l1MemoryCache = new Map<string, { data: any; expiry: number }>();

// In-Flight Request Deduplication Map
const inFlightPromises = new Map<string, Promise<any>>();

/**
 * Fast deterministic string hashing (FNV-1a 32-bit algorithm)
 */
export function computeDeterministicHash(input: Record<string, any>): string {
  const normalizedStr = JSON.stringify(input, Object.keys(input).sort());
  let hash = 0x811c9dc5;
  for (let i = 0; i < normalizedStr.length; i++) {
    hash ^= normalizedStr.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16) + `_v${ENGINE_VERSION}`;
}

/**
 * Retrieves deterministic result from L1 (Memory) or L2 (Storage)
 */
export function getCachedCalculation<T>(category: string, calculationHash: string): T | null {
  const cacheKey = `astro_cache_${category}_${calculationHash}`;
  const now = Date.now();

  // 1. Check L1 Memory Cache (<1ms)
  const l1Entry = l1MemoryCache.get(cacheKey);
  if (l1Entry) {
    if (l1Entry.expiry > now) {
      return l1Entry.data as T;
    } else {
      l1MemoryCache.delete(cacheKey);
    }
  }

  // 2. Check L2 Web Storage Cache (<5ms)
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(cacheKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.expiry > now) {
          // Promote back to L1 Memory
          l1MemoryCache.set(cacheKey, parsed);
          return parsed.data as T;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
    }
  } catch (e) {
    console.warn('L2 cache read failed', e);
  }

  return null;
}

/**
 * Saves deterministic calculation result into both L1 and L2 caches
 */
export function setCachedCalculation<T>(
  category: string,
  calculationHash: string,
  data: T,
  ttlMs: number = 30 * 60 * 1000 // Default 30 mins
): void {
  const cacheKey = `astro_cache_${category}_${calculationHash}`;
  const expiry = Date.now() + ttlMs;
  const payload = { data, expiry, savedAt: Date.now() };

  // Write to L1 Memory
  l1MemoryCache.set(cacheKey, payload);

  // Write to L2 Persistent Storage
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(cacheKey, JSON.stringify(payload));
    }
  } catch (e) {
    console.warn('L2 cache write failed (quota exceeded or disabled)', e);
  }
}

/**
 * Deduplicates in-flight calculation requests so concurrent calls share one promise
 */
export async function deduplicateCalculation<T>(
  key: string,
  calculationFn: () => Promise<T> | T
): Promise<T> {
  if (inFlightPromises.has(key)) {
    return inFlightPromises.get(key) as Promise<T>;
  }

  const promise = Promise.resolve().then(calculationFn).finally(() => {
    inFlightPromises.delete(key);
  });

  inFlightPromises.set(key, promise);
  return promise;
}

/**
 * Clears all stale or specific calculation caches
 */
export function clearExpiredCaches(): void {
  const now = Date.now();
  for (const [k, v] of l1MemoryCache.entries()) {
    if (v.expiry <= now) l1MemoryCache.delete(k);
  }
}
