const CACHE = 'matrix-hns-v2';
const ASSETS = ['.', './index.html', './manifest.webmanifest'];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  if (ASSETS.includes(url.pathname) || url.pathname.endsWith('/')) {
    e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
  }
});
