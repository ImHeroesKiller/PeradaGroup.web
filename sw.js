const CACHE_NAME = 'perada-group-v19';

const PRECACHE_URLS = [
    '/offline.html',
    '/manifest.json',
    '/data/id/hero-content.json',
    '/data/en/hero-content.json',
    '/data/zh/hero-content.json',
    '/data/id/about-content.json',
    '/data/en/about-content.json',
    '/data/zh/about-content.json',
    '/data/id/services-content.json',
    '/data/en/services-content.json',
    '/data/zh/services-content.json',
    '/data/id/contact-content.json',
    '/data/en/contact-content.json',
    '/data/zh/contact-content.json',
    '/data/id/careers-content.json',
    '/data/en/careers-content.json',
    '/data/zh/careers-content.json',
    '/data/id/homepage-content.json',
    '/data/en/homepage-content.json',
    '/data/zh/homepage-content.json',
    '/data/id/faq-content.json',
    '/data/en/faq-content.json',
    '/data/zh/faq-content.json',
    '/data/id/privacy-content.json',
    '/data/en/privacy-content.json',
    '/data/zh/privacy-content.json',
    '/data/id/terms-content.json',
    '/data/en/terms-content.json',
    '/data/zh/terms-content.json',
    '/data/id/ui.json',
    '/data/en/ui.json',
    '/data/zh/ui.json',
    '/js/content-loader.js',
    '/js/i18n.js',
    '/js/hero-content.js',
    '/js/services-content.js',
    '/js/contact-content.js',
    '/js/careers-content.js',
    '/js/homepage-content.js',
    '/js/faq-content.js',
    '/js/legal-content.js',
    '/js/privacy-content.js',
    '/js/terms-content.js',
    '/js/ui-content.js',
    '/faq.html',
    '/privacy.html',
    '/terms.html',
    '/css/style.css',
    '/js/main.js',
    '/js/pwa.js',
    '/assets/logo-perada-new.png',
    '/assets/icon-perada-new-192.png',
    '/assets/icon-perada-new-512.png',
    '/assets/icon-perada-new-maskable-512.png',
    '/assets/logo-perkasa-new.png',
    '/assets/logo-perdana-new.png',
    '/assets/hero/about-hero.webp',
    '/assets/hero/about-hero.jpg',
    '/assets/hero/services-hero.webp',
    '/assets/hero/services-hero.jpg',
    '/assets/hero/contact-hero.webp',
    '/assets/hero/contact-hero.jpg',
    '/assets/hero/careers-hero.webp',
    '/assets/hero/careers-hero.jpg',
];

const STATIC_PATH_PREFIXES = ['/assets/', '/css/', '/js/', '/data/'];

function isNavigationRequest(request) {
    return request.mode === 'navigate' ||
        (request.headers.get('accept') || '').includes('text/html');
}

function isSameOrigin(url) {
    return url.origin === self.location.origin;
}

function isStaticAsset(pathname) {
    return STATIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isCacheableResponse(response) {
    return response && response.status === 200 && response.type === 'basic';
}

function putInCache(request, response) {
    caches.open(CACHE_NAME).then((cache) => cache.put(request, response));
}

function staleWhileRevalidate(request) {
    return caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);

        const networkFetch = fetch(request)
            .then((response) => {
                if (isCacheableResponse(response)) {
                    putInCache(request, response.clone());
                }
                return response;
            })
            .catch(() => null);

        if (cached) {
            networkFetch.catch(() => {});
            return cached;
        }

        const networkResponse = await networkFetch;
        if (networkResponse) return networkResponse;

        return caches.match('/offline.html');
    });
}

function networkFirstNavigation(request) {
    return fetch(request)
        .then((response) => {
            if (isCacheableResponse(response)) {
                putInCache(request, response.clone());
            }
            return response;
        })
        .catch(async () => {
            const cachedPage = await caches.match(request);
            if (cachedPage) return cachedPage;

            const offlinePage = await caches.match('/offline.html');
            if (offlinePage) return offlinePage;

            return new Response('Anda sedang offline.', {
                status: 503,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            });
        });
}

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

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    if (!isSameOrigin(url)) return;

    if (isNavigationRequest(event.request)) {
        event.respondWith(networkFirstNavigation(event.request));
        return;
    }

    if (isStaticAsset(url.pathname)) {
        event.respondWith(staleWhileRevalidate(event.request));
    }
});