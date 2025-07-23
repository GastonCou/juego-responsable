const sonidosActivos = [];

export function reproducirSonido(nombreArchivo, volumen = 1.0) {
  const sonido = new Audio(`${process.env.PUBLIC_URL}/Sonidos/${nombreArchivo}`);
  sonido.volume = volumen;

  // Retener temporalmente en memoria
  sonidosActivos.push(sonido);

  sonido.play().catch((e) => {
    console.warn('No se pudo reproducir el sonido:', e);
  });

  // Limpiar cuando termina
  sonido.addEventListener('ended', () => {
    const index = sonidosActivos.indexOf(sonido);
    if (index !== -1) sonidosActivos.splice(index, 1);
  });
}