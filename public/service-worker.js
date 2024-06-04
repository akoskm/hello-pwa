const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
    })()
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        // If the request is in the cache, return it
        return cachedResponse;
      }
      try {
        // If the request is not in the cache, fetch it from the network
        const networkResponse = await fetch(event.request);
        // Then put the network response into the cache for next time
        await cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        // If the request is not in the cache and the network is unavailable,
        // return the offline page
        console.log('Fetch failed; returning offline page instead.', error);
        const cachedOfflineResponse = await cache.match(OFFLINE_URL);
        return cachedOfflineResponse;
      }
    })()
  );
});