import { ComponentType, lazy, LazyExoticComponent } from 'react';

/**
 * Resilient dynamic module importer with exponential backoff and deployment stale-chunk recovery.
 * Prevents "Loading chunk failed" / "Failed to fetch dynamically imported module" errors.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T } | any>,
  retriesLeft = 3,
  intervalMs = 600
): LazyExoticComponent<T> {
  return lazy(async () => {
    let attempts = 0;
    let delay = intervalMs;

    while (attempts <= retriesLeft) {
      try {
        const module = await componentImport();
        if (module && typeof module === 'object' && 'default' in module) {
          return module;
        }
        return { default: module };
      } catch (error) {
        attempts++;
        if (attempts <= retriesLeft) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 1.5;
        } else {
          // Check if it was a chunk loading error from a new deployment
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
      }
    }
    throw new Error('Component failed to load after retries');
  });
}

export default lazyWithRetry;
