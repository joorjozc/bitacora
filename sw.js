/* ============================================================
   Service worker — hace que la app funcione sin conexión.
   Sube el número de VERSION cada vez que cambies cualquier
   fichero, o los móviles que ya la tengan instalada seguirán
   viendo la versión cacheada.
   ============================================================ */

const VERSION = 'bitacora-v2';

const ARCHIVOS = [
  './',
  './index.html',
  './crear.html',
  './viaje.html',
  './css/app.css',
  './css/paletas.css',
  './css/marca.css',
  './js/paises.js',
  './js/idiomas.js',
  './js/motor.js',
  './js/importar.js',
  './js/almacen.js',
  './js/app.js',
  './js/crear.js',
  './js/inicio.js',
  './js/packs/catalogo.js',
  './js/packs/venecia.js',
  './js/packs/roma.js',
  './js/packs/paris.js',
  './js/packs/lisboa.js',
  './js/packs/generico.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

/* Al instalar: guardamos todo en la caché */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
  );
});

/* Al activar: borramos las cachés de versiones antiguas */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(
        claves.filter((k) => k !== VERSION).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* Al pedir algo:
   - primero la red, para que se vea siempre lo último si hay cobertura
   - si falla (modo avión, metro, montaña), tiramos de caché */
self.addEventListener('fetch', (e) => {
  const req = e.request;

  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;   // Maps y demás, a la red

  e.respondWith(
    fetch(req)
      .then((res) => {
        const copia = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copia));
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
  );
});
