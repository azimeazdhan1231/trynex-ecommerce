
// Service Worker for TryneX
const CACHE_NAME = 'trynex-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/products.html',
    '/track-order.html',
    '/styles.css',
    '/script.js',
    '/products.js',
    '/track-order.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
