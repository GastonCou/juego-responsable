import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterConsejos from '../components/FooterConsejos';

export default function DerrotaNivel2() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/Sonidos/Musica-Incorrecta.mp3`);
    audio.volume = 1;
    audio.play();

    // ⏱ Tiempo jugado
    const inicio = localStorage.getItem('estad_inicio_tiempo');
    if (inicio) {
      const tiempoTotal = Math.floor((Date.now() - parseInt(inicio)) / 1000);
      const tiempos = JSON.parse(localStorage.getItem('tiemposDeJuego') || '[]');
      tiempos.push(tiempoTotal);
      localStorage.setItem('tiemposDeJuego', JSON.stringify(tiempos));
      localStorage.removeItem('estad_inicio_tiempo');
    }

    // ✅ Nivel alcanzado (único por jugador)
    const niveles = JSON.parse(localStorage.getItem('nivelesAlcanzados') || '[]');
    niveles.push(2); // Perdió en nivel 2, es su nivel máximo
    localStorage.setItem('nivelesAlcanzados', JSON.stringify(niveles));

    // 🟠 Tipo de finalización
    const finales = JSON.parse(localStorage.getItem('formasDeFinalizar') || '[]');
    finales.push('derrota');
    localStorage.setItem('formasDeFinalizar', JSON.stringify(finales));
  }, []);

  const manejarVolver = () => {
    const clickSound = new Audio(`${process.env.PUBLIC_URL}/Sonidos/Musica-Siguiente.mp3`);
    clickSound.volume = 1;
    clickSound.play();
    setTimeout(() => navigate('/'), 200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between text-white text-center px-4 py-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-10 max-w-6xl w-full">
        <p className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-red-500 animate-bounce">
          ❌ RESPUESTA INCORRECTA
        </p>
        <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-white">
          💔 Perdiste lo acumulado hasta ahora
        </p>
        <p className="text-[clamp(1.2rem,3vw,2rem)] font-medium text-white max-w-4xl">
          A veces uno cree que puede ganar siempre, pero perder es parte del juego.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 mt-2">
          {[
            ['🧠', 'Jugá con cabeza', 'Tomá decisiones con lógica, no con impulso'],
            ['🚫', 'Poné tus límites', 'Fijá un monto y un tiempo para jugar'],
            ['📉', 'No busques recuperar', 'Aceptá la pérdida sin perseguir revancha'],
          ].map(([emoji, titulo, texto], i) => (
            <div
              key={i}
              className="bg-white/80 text-black rounded-2xl p-6 shadow-xl flex flex-col items-center text-center"
            >
              <p className="text-4xl mb-2">{emoji}</p>
              <p className="font-bold text-lg mb-1">{titulo}</p>
              <p className="text-sm text-gray-700">{texto}</p>
            </div>
          ))}
        </div>

        <button
          onClick={manejarVolver}
          className="bg-white text-blue-900 px-10 py-6 rounded-2xl text-[clamp(1.5rem,3vw,2rem)] font-bold shadow-xl mt-6"
        >
          VOLVER AL INICIO
        </button>
      </div>

      <FooterConsejos />
    </div>
  );
}