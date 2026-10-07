const CACHE='cid-asset-labeler-v30';
const ASSETS=['./','./index.html','./manifest.webmanifest','./cid-logo-transparent.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===location.origin){const copy=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,copy));}return r}).catch(()=>caches.match('./index.html'))))});
