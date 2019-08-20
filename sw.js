const cacheName = 'v1_smart_shoplist_cache',
      urlsToCache = [
        './',
        './img/head-icons/favicon.png',
        './img/head-icons/favicon-16x16.png',
        './img/head-icons/favicon-32x32.png',
        './img/head-icons/apple-icon-57x57.png',
        './img/head-icons/apple-icon-60x60.png',
        './img/head-icons/apple-icon-72x72.png',
        './img/head-icons/apple-icon-76x76.png',
        './img/head-icons/favicon-96x96.png',
        './img/head-icons/apple-icon-114x114.png',
        './img/head-icons/apple-icon-120x120.png',
        './img/head-icons/apple-icon-144x144.png',
        './img/head-icons/apple-icon-152x152.png',
        './img/head-icons/apple-icon-180x180.png',
        './img/head-icons/android-icon-192x192.png',
        './manifest.json',
        './css/styles.min.css',
        './js/app.min.js',
        './js/scripts.min.js',
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
  e.waitUntil(
    caches.open( cacheName )
      .then(cache => {
        return cache.addAll( urlsToCache )
          .then(() => {
            self.skipWaiting();
          })
      })
      .catch(err => console.log('Falló registro del cache', err))
  );
});

self.addEventListener('activate', e => {
  const cacheWhiteList = [cacheName];

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        cacheNames.map(cacheName => {
          if( cacheWhiteList.indexOf(cacheName) === -1 ) return caches.delete(cacheName)
        })
      })
      .then(() => {
        self.clients.claim()
      })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match( e.request )
      .then(res => {
        if( res ) return res;
        return fetch( e.request );
      })
  );
});