/* Service Worker para GitHub Pages
   Estrategias:
   - Imágenes: cache-first con expiración aproximada de 1 año
   - CSS/JS: stale-while-revalidate con expiración aproximada de 6 meses
   - Limpieza de caches antiguos por versión
*/

const SW_VERSION = 'v1.0.0';
const PRECACHE = `precache-${SW_VERSION}`;
const RUNTIME_ASSETS = `runtime-assets-${SW_VERSION}`; // CSS/JS
const RUNTIME_IMAGES = `runtime-images-${SW_VERSION}`; // Imágenes

// 1 año y 6 meses en milisegundos
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const SIX_MONTHS_MS = 182 * 24 * 60 * 60 * 1000; // aprox 6 meses

// Archivos críticos a precachear (usa las URLs versionadas del HTML)
const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css?v=1.0.0',
  './script.js?v=1.0.0'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => ![PRECACHE, RUNTIME_ASSETS, RUNTIME_IMAGES].includes(key))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

// Utilidad: envolver una Response con header de timestamp para poder expirar manualmente
async function responseWithTimestamp(response) {
  const cloned = response.clone();
  const body = await cloned.blob();
  const headers = new Headers(cloned.headers);
  headers.set('x-sw-fetched-at', Date.now().toString());
  return new Response(body, {
    status: cloned.status,
    statusText: cloned.statusText,
    headers
  });
}

async function isFresh(response, maxAgeMs) {
  if (!response) return false;
  const fetchedAt = response.headers.get('x-sw-fetched-at');
  if (!fetchedAt) return false;
  const age = Date.now() - Number(fetchedAt);
  return age >= 0 && age <= maxAgeMs;
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Solo manejar peticiones del mismo origen
  if (url.origin !== self.location.origin) {
    return;
  }

  const destination = request.destination;

  // Imágenes: cache-first con expiración de 1 año
  if (destination === 'image') {
    event.respondWith(cacheFirstImages(request));
    return;
  }

  // CSS/JS: stale-while-revalidate con expiración de 6 meses
  if (destination === 'style' || destination === 'script') {
    event.respondWith(staleWhileRevalidateAssets(request));
    return;
  }

  // Para el resto, intenta network-first con fallback a cache
  event.respondWith(networkFirstFallback(request));
});

async function cacheFirstImages(request) {
  const cache = await caches.open(RUNTIME_IMAGES);
  const cached = await cache.match(request);
  if (cached && (await isFresh(cached, ONE_YEAR_MS))) {
    return cached;
  }
  try {
    const networkResponse = await fetch(request, { cache: 'no-store' });
    if (networkResponse && networkResponse.ok) {
      const stamped = await responseWithTimestamp(networkResponse);
      cache.put(request, stamped.clone());
      return stamped;
    }
  } catch (e) {
    // ignorar
  }
  // Fallback a lo que exista en cache aunque esté viejo
  if (cached) return cached;
  return caches.match('./images/MariachiCiudadBlanca.webp');
}

async function staleWhileRevalidateAssets(request) {
  const cache = await caches.open(RUNTIME_ASSETS);
  const cached = await cache.match(request);
  const useCached = cached && (await isFresh(cached, SIX_MONTHS_MS));

  const fetchPromise = (async () => {
    try {
      const networkResponse = await fetch(request, { cache: 'no-store' });
      if (networkResponse && networkResponse.ok) {
        const stamped = await responseWithTimestamp(networkResponse);
        cache.put(request, stamped.clone());
      }
    } catch (e) {
      // silencioso
    }
  })();

  if (useCached) {
    eventWaitUntil(fetchPromise);
    return cached;
  }

  try {
    const networkResponse = await fetch(request, { cache: 'no-store' });
    if (networkResponse && networkResponse.ok) {
      const stamped = await responseWithTimestamp(networkResponse);
      cache.put(request, stamped.clone());
      return stamped;
    }
  } catch (e) {
    // ignorar
  }
  if (cached) return cached; // servir cache aunque esté viejo si no hay red
  return new Response('', { status: 504, statusText: 'Gateway Timeout' });
}

async function networkFirstFallback(request) {
  const cache = await caches.open(PRECACHE);
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (e) {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Helper para poder usar waitUntil fuera de eventos directos
function eventWaitUntil(promise) {
  // Intenta anexar a cualquier evento activo (no estándar). Si no, no hace nada.
  if (self && self.registration && self.registration.active) {
    // noop: algunos navegadores no exponen un evento aquí
  }
}


