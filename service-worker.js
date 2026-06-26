/* MAX.CORE Service Worker v1.0 */
const CACHE_NAME = 'maxcore-v1.0';
const ARQUIVOS = [
    './','./index.html','./bio-bridge.js','./manifest.json',
    './icon-192.png','./icon-512.png','./apple-touch-icon.png','./icon.svg'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS)));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((nomes) =>
            Promise.all(nomes.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    const ehCodigo = url.endsWith('.html') || url.endsWith('.js') || url.endsWith('/');
    if (ehCodigo) {
        event.respondWith(
            fetch(event.request).then((resp) => {
                const copia = resp.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
                return resp;
            }).catch(() => caches.match(event.request))
        );
    } else {
        event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
    }
});
