// Offline support for the web app. The app shell is stored on install; every
// other file (region data, meshes, scans) is stored the first time it is used,
// or all at once from "Download all regions for offline use" in the guide.
// Files are served from the store and refreshed in the background, so an
// update shows on the next visit.

const CACHE = "hn-anatomy";
const SHELL = [
  "./", "index.html", "styles.css", "manifest.webmanifest",
  "vendor/three.min.js", "js/catalog.js", "js/figures.js", "js/viewer.js", "js/photo.js", "js/scans.js", "js/sections.js", "js/app.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin || url.pathname.endsWith("/precache.json")) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const key = req.mode === "navigate" ? "index.html" : req;
      const cached = await cache.match(key, { ignoreSearch: true });
      const fresh = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(key, res.clone());
          return res;
        })
        .catch(() => cached);
      if (cached) {
        event.waitUntil(fresh);
        return cached;
      }
      return fresh.then((res) => res || Response.error());
    })
  );
});
