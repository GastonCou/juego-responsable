import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import useWindowSize from '../hooks/useWindowSize';
import FooterConsejos from '../components/FooterConsejos';

export default function PantallaRetiroSabio() {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();
  const nivel = location.state?.nivel || 1;

  const mensaje =
    nivel === 1
      ? 'ASEGURASTE PREMIO DE NIVEL 1'
      : `ASEGURASTE PREMIOS ACUMULADOS HASTA EL NIVEL ${nivel}`;

  const consejos = [
    ['🎭', 'JUGÁ POR DIVERSIÓN', 'Disfrutá sin esperar ganar dinero'],
    ['👥', 'JUGÁ ACOMPAÑADO', 'Con amigos, es más fácil controlar el gasto y el tiempo'],
    ['⏸️', 'JUGÁ CON PAUSAS', 'Desconectá para no perder el control'],
    ['💰', 'JUGÁ CON TU DINERO', 'Jugá sólo con dinero para entretenimiento.'],
  ];

  useEffect(() => {
    const audio = new Audio('/sonidos/Musica-Retirarse-Ganador.mp3');
    audio.volume = 0.4;
    audio.loop = true;
    audio.play().catch((err) => console.error('Error al reproducir el audio:', err));

    // ✅ Registrar nivel alcanzado
    if (nivel >= 1 && nivel <= 5) {
      const niveles = JSON.parse(localStorage.getItem('nivelesAlcanzados') || '[]');
      niveles.push(nivel);
      localStorage.setItem('nivelesAlcanzados', JSON.stringify(niveles));
    }

    // ✅ Registrar tipo de finalización
    const finales = JSON.parse(localStorage.getItem('formasDeFinalizar') || '[]');
    finales.push('retiro');
    localStorage.setItem('formasDeFinalizar', JSON.stringify(finales));

    // ✅ Registrar tiempo total jugado
    const inicio = localStorage.getItem('estad_inicio_tiempo');
    if (inicio) {
      const tiempoSegundos = Math.floor((Date.now() - parseInt(inicio)) / 1000);
      const tiempos = JSON.parse(localStorage.getItem('tiemposDeJuego') || '[]');
      tiempos.push(tiempoSegundos);
      localStorage.setItem('tiemposDeJuego', JSON.stringify(tiempos));
      localStorage.removeItem('estad_inicio_tiempo');
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [nivel]);

  const handleVolver = () => {
    const sonido = new Audio('/sonidos/Musica-Siguiente.mp3');
    sonido.play().catch(err => console.error('Error al reproducir sonido:', err));
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(/fondo-horizontal.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute top-0 left-0 w-screen h-screen z-10 pointer-events-none">
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={true}
          gravity={0.15}
          opacity={0.8}
        />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-white text-center px-4 z-20 mt-[100px] mb-[160px]">
        <p className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-green-400 mb-6 animate-bounce">
          🎯 TE HAS RETIRADO A TIEMPO
        </p>
        <p className="text-[clamp(1.3rem,3.5vw,2rem)] font-medium max-w-3xl mb-12">
          {mensaje}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {consejos.map(([emoji, titulo, texto], i) => (
            <div
              key={i}
              className="bg-white/90 text-black p-6 rounded-2xl shadow-xl w-[clamp(240px,28vw,290px)]"
            >
              <p className="text-4xl mb-2">{emoji}</p>
              <p className="font-bold text-lg mb-1">{titulo}</p>
              <p className="text-sm text-gray-700">{texto}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleVolver}
          className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-2xl text-[clamp(1rem,2.5vw,1.5rem)] font-bold shadow-xl uppercase"
        >
          VOLVER AL INICIO
        </button>
      </div>

      <FooterConsejos />
    </div>
  );
}