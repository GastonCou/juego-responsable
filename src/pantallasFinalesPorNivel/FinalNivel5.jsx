import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import useWindowSize from '../hooks/useWindowSize';
import FooterConsejos from '../components/FooterConsejos';

export default function FinalNivel5() {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio('/sonidos/Musica-Retirarse-Ganador.mp3');
    audio.volume = 0.4;
    audio.play().catch((e) => {
      console.warn('No se pudo reproducir la música de victoria:', e);
    });

    // Guardar nivel alcanzado si es mayor al anterior registrado
    const niveles = JSON.parse(localStorage.getItem('nivelesAlcanzados') || '[]');
    niveles.push(5);
    localStorage.setItem('nivelesAlcanzados', JSON.stringify(niveles));

    // Guardar tipo de finalización
    const finales = JSON.parse(localStorage.getItem('formasDeFinalizar') || '[]');
    finales.push('victoria');
    localStorage.setItem('formasDeFinalizar', JSON.stringify(finales));

    // Guardar tiempo de juego
    const inicio = localStorage.getItem('estad_inicio_tiempo');
    if (inicio) {
      const tiempoSegundos = Math.floor((Date.now() - parseInt(inicio)) / 1000);
      const tiempos = JSON.parse(localStorage.getItem('tiemposDeJuego') || '[]');
      tiempos.push(tiempoSegundos);
      localStorage.setItem('tiemposDeJuego', JSON.stringify(tiempos));
      localStorage.removeItem('estad_inicio_tiempo');
    }
  }, []);

  return (
    <div
      className="h-screen flex flex-col relative text-white"
      style={{
        backgroundImage: `url(/fondo-horizontal.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="fixed top-0 left-0 w-screen h-screen z-10 pointer-events-none">
        <Confetti
          width={width}
          height={height}
          numberOfPieces={400}
          gravity={0.2}
          recycle={true}
          opacity={0.8}
        />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center px-6 z-20 gap-14 mt-[100px] mb-[160px]">
        <p className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-yellow-400 animate-bounce">
          🏆 ¡GANASTE EL JUEGO! 🏆
        </p>

        <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold">
          FELICITACIONES<br />GANASTE TODOS LOS PREMIOS ACUMULADOS
        </p>

        <p className="text-[clamp(1.5rem,4vw,2.8rem)] font-medium text-white">
          JUGÁ SIEMPRE CON RESPONSABILIDAD
        </p>

        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-2xl text-[clamp(1.3rem,3vw,2rem)] font-bold shadow-xl uppercase mt-4"
        >
          VOLVER AL INICIO
        </button>
      </div>

      <div className="z-20">
        <FooterConsejos />
      </div>
    </div>
  );
}
