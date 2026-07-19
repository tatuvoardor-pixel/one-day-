/* MAX.CORE Service Worker v3.3 */
const CACHE_NAME='maxcore-v3.3';
const ARQUIVOS=['./','./index.html','./bio-bridge.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ARQUIVOS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(n=>Promise.all(n.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'){return;}e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE_NAME).then(cache=>cache.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));});
