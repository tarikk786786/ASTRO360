/**
 * ASTRO360 — Deterministic Audio Caching System
 * Prevents unnecessary re-synthesis of identical astrological narrations
 * and stores cache metadata with fast retrieval.
 */

export interface CachedAudioEntry {
  cacheKey: string;
  textHash: string;
  language: string;
  voice: string;
  tone: string;
  speed: number;
  engine: string;
  engineVersion: string;
  durationSeconds: number;
  blobUri?: string;
  createdAt: number;
}

const MEMORY_CACHE = new Map<string, CachedAudioEntry>();
const CACHE_VERSION = '1.0.0';

/**
 * Fast deterministic string hashing function (FNV-1a 32-bit).
 */
export function computeTextHash(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Builds the canonical deterministic audio cache key.
 */
export function buildAudioCacheKey(params: {
  text: string;
  language: string;
  voice: string;
  tone: string;
  speed: number;
  engine?: string;
}): string {
  const hash = computeTextHash(params.text.trim());
  const engine = params.engine || 'WebSpeech';
  return `${hash}:${params.language}:${params.voice}:${params.tone}:${params.speed.toFixed(2)}:${engine}:${CACHE_VERSION}`;
}

export const AudioCache = {
  get(key: string): CachedAudioEntry | undefined {
    return MEMORY_CACHE.get(key);
  },

  set(entry: CachedAudioEntry): void {
    MEMORY_CACHE.set(entry.cacheKey, entry);
    // Limit memory cache to recent 100 entries
    if (MEMORY_CACHE.size > 100) {
      const oldestKey = MEMORY_CACHE.keys().next().value;
      if (oldestKey) MEMORY_CACHE.delete(oldestKey);
    }
  },

  has(key: string): boolean {
    return MEMORY_CACHE.has(key);
  },

  clear(): void {
    MEMORY_CACHE.clear();
  },

  size(): number {
    return MEMORY_CACHE.size;
  }
};
