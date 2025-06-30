import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterConsejos from '../components/FooterConsejos';

export default function DerrotaNivel1() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio('/sonidos/Musica-Incorrecta.mp3');
    audio.volume = 1;
    audio.play();

    // ⏱ Guardar tiempo jugado
    const inicio = localStorage.getItem('estad_inicio_tiempo');
    if (inicio) {
      const tiempoTotal = Math.floor((Date.now() - parseInt(inicio)) / 1000);
      const tiempos = JSON.parse(localStorage.getItem('tiemposDeJuego') || '[]');
      tiempos.push(tiempoTotal);
      localStorage.setItem('tiemposDeJuego', JSON.stringify(tiempos));
      localStorage.removeItem('estad_inicio_tiempo');
    }

    // ✅ Guardar SOLO el nivel más alto de esta partida
    const niveles = JSON.parse(localStorage.getItem('nivelesAlcanzados') || '[]');
    niveles.push(1); // Perdió en el nivel 1
    localStorage.setItem('nivelesAlcanzados', JSON.stringify(niveles));

    // 🟠 Registrar forma de finalización
    const finales = JSON.parse(localStorage.getItem('formasDeFinalizar') || '[]');
    finales.push('derrota');
    localStorage.setItem('formasDeFinalizar', JSON.stringify(finales));
  }, []);

  const manejarVolver = () => {
    const clickSound = new Audio('/sonidos/Musica-Siguiente.mp3');
    clickSound.volume = 1;
    clickSound.play();
    setTimeout(() => navigate('/'), 200);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between text-white text-center px-4 py-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <p className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-red-500 animate-bounce">
          ❌ RESPUESTA INCORRECTA
        </p>
        <p className="text-[clamp(1.5rem,4vw,3rem)] font-semibold text-white">
          ⛔ FIN DEL JUEGO
        </p>
        <button
          onClick={manejarVolver}
          className="bg-white text-blue-900 px-10 py-6 rounded-2xl text-[clamp(1.5rem,3vw,2rem)] font-bold shadow-xl mt-4"
        >
          VOLVER AL INICIO
        </button>
      </div>
      <FooterConsejos />
    </div>
  );
}