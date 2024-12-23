const cacheName = "time-management-pwa";
const filesToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/stopwatch.png",
  "/stopwatch.png",
  "/src/main.jsx",
  "/src/App.jsx",
  "/src/components/Header.jsx",
  "/src/components/TaskForm.jsx",
  "/src/components/Timer.jsx",
  "/src/components/TaskList.jsx",
    "/src/hooks/useLocalStorage.js",
  "/src/index.css"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
    );
    self.skipWaiting(); // Immediately activate new service worker
  });
  

self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Return cached response if available
        }
  
        // If the request is an API call, attempt to fetch from network
        return fetch(event.request).then((networkResponse) => {
          // Cache the API response for future offline use
          if (event.request.url.includes('/api/')) {
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      })
    );
  });
  

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [cacheName];
  
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (!cacheWhitelist.includes(cache)) {
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });
  