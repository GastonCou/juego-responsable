// Registro básico del Service Worker para PWA
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  /^127(?:\.(?:25[0-5]|2[0-4]\d|1?\d\d?)){3}$/.test(window.location.hostname)
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener('load', () => {
      const swUrl = `/service-worker.js`;

      if (isLocalhost) {
        // Modo desarrollo local: validar service worker existente
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'App is being served cache-first by a service worker (localhost).'
          );
        });
      } else {
        // Producción: registrar directamente
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('Nuevo contenido disponible. Se usará al cerrar todas las pestañas.');
              if (config?.onUpdate) config.onUpdate(registration);
            } else {
              console.log('Contenido cacheado para uso offline.');
              if (config?.onSuccess) config.onSuccess(registration);

              // 👇 Mostrar mensaje de éxito SOLO en primera instalación
              if (window.matchMedia('(display-mode: standalone)').matches) {
                // Solo redirigir si se abrió desde la app instalada
                window.location.href = "/instalado.html";
              }
            }
          }
        };
      };
    })
    .catch((error) =>
      console.error('Error al registrar el Service Worker:', error)
    );
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType && !contentType.includes('javascript'))
      ) {
        // El archivo no existe o no es JS => desregistrar
        navigator.serviceWorker.ready
          .then((registration) => registration.unregister())
          .then(() => window.location.reload());
      } else {
        // OK: volver a registrar
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('Sin conexión. La app se ejecuta en modo offline.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((error) => console.error('Error al desregistrar SW:', error));
  }
}