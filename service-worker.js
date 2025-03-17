const CACHE_NAME = 'apple-of-fortune-cache-v2';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './apple-of-fortune-icon-192.png',
  './apple-of-fortune-icon-512.png',
  './1xbet.png',
  './paripesa.png',
  './888starz.png',
  './melbet.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Fichiers mis en cache : ', FILES_TO_CACHE);
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Cache supprimé :', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
