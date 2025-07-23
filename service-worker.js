const CACHE_NAME = 'v1-juego-responsable';
const BASE = '/juego-responsable';

const urlsToCache = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  `${BASE}/expirado.html`,
  `${BASE}/instalado.html`,
  `${BASE}/icon-192.png`,
  `${BASE}/icon-512.png`,
  `${BASE}/fondo-horizontal.png`,
  `${BASE}/fondo-vertical.png`,
  `${BASE}/Caratula-fondo-horizontal.png`,
  `${BASE}/Sonidos/Musica-Correcta.mp3`,
  `${BASE}/Sonidos/Musica-Fondo.mp3`,
  `${BASE}/Sonidos/Musica-Incorrecta.mp3`,
  `${BASE}/Sonidos/Musica-MensajeResponsable.mp3`,
  `${BASE}/Sonidos/Musica-Retirarse-Ganador.mp3`,
  `${BASE}/Sonidos/Musica-Siguiente.mp3`,
  // 🔁 Agregá acá cualquier otro archivo de /public que uses
];

// Cacheo inicial
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Instalando y cacheando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación y limpieza de cachés viejos
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch → responder con caché si no hay conexión
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});