const CACHE_NAME = 'juego-responsable-v1';

const urlsToCache = [
  '/', // raíz
  '/index.html',
  '/manifest.json',
  '/expirado.html',
  '/instalado.html',
  '/icon-192.png',
  '/icon-512.png',
  '/fondo-horizontal.png',
  '/fondo-vertical.png',
  '/Caratula-fondo-horizontal.png',
  '/Sonidos/Musica-Correcta.mp3',
  '/Sonidos/Musica-Fondo.mp3',
  '/Sonidos/Musica-Incorrecta.mp3',
  '/Sonidos/Musica-MensajeResponsable.mp3',
  '/Sonidos/Musica-Retirarse-Ganador.mp3',
  '/Sonidos/Musica-Siguiente.mp3',
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