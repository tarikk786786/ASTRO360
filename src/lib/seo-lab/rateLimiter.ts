/**
 * ASTRO360 Rate Limiter & Cache Engine
 * Provides concurrency pooling, exponential backoff, and 24-hour persistent cache.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class MemoryAndLocalCache {
  private memoryCache = new Map<string, CacheEntry<any>>();
  private readonly defaultTtlMs = 24 * 60 * 60 * 1000; // 24 hours
  private readonly prefix = 'astro_seolab_cache_';

  public get<T>(key: string): T | null {
    // 1. Check memory cache
    const mem = this.memoryCache.get(key);
    const now = Date.now();
    if (mem && mem.expiresAt > now) {
      return mem.data as T;
    }

    // 2. Check localStorage if in browser
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = localStorage.getItem(this.prefix + key);
        if (raw) {
          const parsed: CacheEntry<T> = JSON.parse(raw);
          if (parsed && parsed.expiresAt > now) {
            this.memoryCache.set(key, parsed);
            return parsed.data;
          } else {
            localStorage.removeItem(this.prefix + key);
          }
        }
      } catch {
        // Ignore storage errors
      }
    }
    return null;
  }

  public set<T>(key: string, data: T, ttlMs?: number): void {
    const expiresAt = Date.now() + (ttlMs || this.defaultTtlMs);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt
    };
    this.memoryCache.set(key, entry);

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(this.prefix + key, JSON.stringify(entry));
      } catch {
        // Ignore storage quota errors
      }
    }
  }

  public clear(): void {
    this.memoryCache.clear();
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const keys = Object.keys(localStorage).filter(k => k.startsWith(this.prefix));
        for (const k of keys) {
          localStorage.removeItem(k);
        }
      } catch {}
    }
  }
}

export const seoLabCache = new MemoryAndLocalCache();

/**
 * Concurrency-limited request queue with token-bucket delay and exponential backoff
 */
export class RateLimitedQueue {
  private queue: Array<() => Promise<any>> = [];
  private activeCount = 0;
  private maxConcurrency: number;
  private minIntervalMs: number;
  private lastRequestTime = 0;

  constructor(maxConcurrency = 3, minIntervalMs = 250) {
    this.maxConcurrency = maxConcurrency;
    this.minIntervalMs = minIntervalMs;
  }

  public async schedule<T>(task: () => Promise<T>, retries = 2): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const executeTask = async () => {
        this.activeCount++;
        const now = Date.now();
        const delayNeeded = Math.max(0, this.lastRequestTime + this.minIntervalMs - now);
        if (delayNeeded > 0) {
          await new Promise(r => setTimeout(r, delayNeeded));
        }
        this.lastRequestTime = Date.now();

        let attempt = 0;
        let lastError: any = null;

        while (attempt <= retries) {
          try {
            const result = await task();
            this.activeCount--;
            this.processNext();
            resolve(result);
            return;
          } catch (err: any) {
            lastError = err;
            attempt++;
            if (attempt <= retries) {
              const backoff = Math.pow(2, attempt) * 300 + Math.random() * 100;
              await new Promise(r => setTimeout(r, backoff));
            }
          }
        }

        this.activeCount--;
        this.processNext();
        reject(lastError);
      };

      if (this.activeCount < this.maxConcurrency) {
        executeTask();
      } else {
        this.queue.push(executeTask);
      }
    });
  }

  private processNext() {
    if (this.queue.length > 0 && this.activeCount < this.maxConcurrency) {
      const next = this.queue.shift();
      if (next) next();
    }
  }
}

export const globalSeoRateLimiter = new RateLimitedQueue(3, 200);
