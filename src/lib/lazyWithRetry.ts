import { ComponentType, lazy } from 'react';

/**
 * Resilient dynamic module importer with exponential backoff and deployment stale-chunk recovery.
 * Prevents "Loading chunk failed" / "Failed to fetch dynamically imported module" errors.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T } | any>,
  retriesLeft = 2,
  intervalMs = 800
): T {
  return lazy(async () => {
    try {
      const module = await componentImport();
      if (module && typeof module === 'object' && 'default' in module) {
        return module;
      }
      return { default: module };
    } catch (error) {
      if (retriesLeft > 0) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
        return (lazyWithRetry(componentImport, retriesLeft - 1, intervalMs * 2) as any);
      }
      
      const storageKey = 'astro_chunk_reload_attempt';
      const lastAttempt = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(storageKey) : null;
      const now = Date.now();
      
      if (!lastAttempt || now - parseInt(lastAttempt, 10) > 30000) {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(storageKey, now.toString());
        }
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      }

      throw error;
    }
  }) as unknown as T;
}

export default lazyWithRetry;
