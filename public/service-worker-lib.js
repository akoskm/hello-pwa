const CACHE_NAME = "offline";

export function handleInstall(event) {
  console.log("Service worker installed");
}

export function handleFetch(isDevelopment) {
  return function (event) {
    event.respondWith(
      (async () => {
        if (isDevelopment) {
          return await fetch(event.request);
        }

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          // If the request is in the cache, return it
          return cachedResponse;
        }
        // If the request is not in the cache, fetch it from the network
        const networkResponse = await fetch(event.request);
        // Then put the network response into the cache for next time
        await cache.put(event.request, networkResponse.clone());
        return networkResponse;
      })(),
    );
  };
}
