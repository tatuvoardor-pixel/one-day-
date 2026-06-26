/* MAX.CORE Service Worker v1.1 */
const CACHE_NAME = 'maxcore-v1.1';
const ARQUIVOS = ['./','./index.html','./bio-bridge.js'];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS)));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((nomes) =>
            Promise.all(nomes.map((n) => caches.delete(n)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).then((resp) => {
            const copia = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
            return resp;
        }).catch(() => caches.match(event.request))
    );
});
