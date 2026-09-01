// ASTRO360 PWA & Push Notification Service Worker (Network-First Strategy)
const CACHE_NAME = 'astro360-pwa-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// PUSH EVENT: Receive push notification payload and display with safe astrology metadata
self.addEventListener('push', (event) => {
  let payload = {
    title: 'ASTRO360 Astrology Alert',
    body: 'An important astrological window is approaching in your forecast.',
    url: '/forecast',
    tag: 'astro-alert',
  };

  if (event.data) {
    try {
      const data = event.data.json();
      payload = { ...payload, ...data };
    } catch {
      payload.body = event.data.text() || payload.body;
    }
  }

  const options = {
    body: payload.body,
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: payload.tag || 'astro-alert',
    data: {
      url: payload.url || '/forecast',
      eventId: payload.eventId,
    },
    requireInteraction: payload.severity === 'HIGH_IMPORTANCE',
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// NOTIFICATION CLICK: Deep link directly to relevant forecast/chart context
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus existing open tab if available
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Otherwise open new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// NOTIFICATION CLOSE: Handle dismissal telemetry
self.addEventListener('notificationclose', (event) => {
  // Silent dismissal
});

// FETCH HANDLER: Stale-While-Revalidate for assets & Network-First for navigation documents
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Exclude non-http(s) and external APIs if needed
  if (!url.protocol.startsWith('http')) return;

  // Network-First for HTML navigation and documents
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((res) => res || caches.match('/index.html')))
    );
    return;
  }

  // Stale-While-Revalidate for Static Assets (JS, CSS, Images, Fonts)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
