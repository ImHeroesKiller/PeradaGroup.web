const CACHE_NAME = 'perada-group-v7';

const PRECACHE_URLS = [
    '/offline.html',
    '/manifest.json',
    '/data/hero-content.json',
    '/data/about-content.json',
    '/data/services-content.json',
    '/data/faq.json',
    '/css/style.css',
    '/js/main.js',
    '/js/pwa.js',
    '/assets/logo-perada-new.png',
    '/assets/icon-perada-new-192.png',
    '/assets/icon-perada-new-512.png',
    '/assets/icon-perada-new-maskable-512.png',
    '/assets/logo-perkasa-new.png',
    '/assets/logo-perdana-new.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

function isNavigationRequest(request) {
    return request.mode === 'navigate' ||
        (request.headers.get('accept') || '').includes('text/html');
}

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    if (isNavigationRequest(event.request)) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response && response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return response;
                })
                .catch(async () => {
                    const cachedPage = await caches.match(event.request);
                    if (cachedPage) return cachedPage;

                    const offlinePage = await caches.match('/offline.html');
                    if (offlinePage) return offlinePage;

                    return new Response('Anda sedang offline.', {
                        status: 503,
                        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
                    });
                })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;

            return fetch(event.request)
                .then((response) => {
                    if (response && response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return response;
                })
                .catch(() => caches.match('/offline.html'));
        })
    );
});