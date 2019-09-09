const cacheName = 'v1_smart_shoplist_cache',
      urlsToCache = [
        './',
        './img/head-icons/favicon.png',
        './img/head-icons/favicon-16x16.png',
        './img/head-icons/favicon-32x32.png',
        './img/head-icons/favicon-512x512.png',
        './img/head-icons/apple-icon-57x57.png',
        './img/head-icons/apple-icon-60x60.png',
        './img/head-icons/apple-icon-72x72.png',
        './img/head-icons/apple-icon-76x76.png',
        './img/head-icons/apple-icon-512x512.png',
        './img/head-icons/favicon-96x96.png',
        './img/head-icons/apple-icon-114x114.png',
        './img/head-icons/apple-icon-120x120.png',
        './img/head-icons/apple-icon-144x144.png',
        './img/head-icons/apple-icon-152x152.png',
        './img/head-icons/apple-icon-180x180.png',
        './img/head-icons/android-icon-192x192.png',
        './img/head-icons/android-icon-512x512.png',
        './manifest.json',
        './css/styles.min.css',
        './js/app.min.js',
        './js/scripts.min.js',
        './sw.min.js',
        './icons/cart.svg',
        './icons/check.svg',
        './icons/clean.svg',
        './icons/edit.svg',
        './icons/email.svg',
        './icons/info.svg',
        './icons/instagram.svg',
        './icons/linkedin.svg',
        './icons/remove.svg',
        './img/smart-shoplist-imagotipo.svg'
      ];

self.addEventListener('install', e => {
  console.log('Service Worker installed');
  
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: caching files');
        return cache.addAll( urlsToCache )
      })
      .then(() => self.skipWaiting())
      .catch(err => console.log('Falló registro del cache', err))
  );
});

self.addEventListener('activate', e => {
  console.log('Service Worker activated');
  //Remove unwanted caches
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        cacheNames.map(cache => {
          if( cache !== cacheName ) {
            console.log('Service Worker: clearing old cache');
            return caches.delete(cache);
          }
        })
      })
  );
});

self.addEventListener('fetch', e => {
  console.log('Service Worker: fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});