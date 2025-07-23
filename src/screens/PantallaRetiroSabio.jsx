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
    const audio = new Audio(`${process.env.PUBLIC_URL}/Sonidos/Musica-Retirarse-Ganador.mp3`);
    audio.volume = 0.4;
    audio.loop = true;
    audio.play().catch((err) => console.error('Error al reproducir el audio:', err));

    if (nivel >= 1 && nivel <= 5) {
      const niveles = JSON.parse(localStorage.getItem('nivelesAlcanzados') || '[]');
      niveles.push(nivel);
      localStorage.setItem('nivelesAlcanzados', JSON.stringify(niveles));
    }

    const finales = JSON.parse(localStorage.getItem('formasDeFinalizar') || '[]');
    finales.push('retiro');
    localStorage.setItem('formasDeFinalizar', JSON.stringify(finales));

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
    const sonido = new Audio(`${process.env.PUBLIC_URL}/Sonidos/Musica-Siguiente.mp3`);
    sonido.play().catch(err => console.error('Error al reproducir sonido:', err));
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center text-white text-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/fondo-horizontal.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={true}
          gravity={0.15}
          opacity={0.8}
        />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-5xl relative z-20 gap-10">
        <p className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-green-400 animate-bounce">
          🎯 TE HAS RETIRADO A TIEMPO
        </p>
        <p className="text-[clamp(1.3rem,3.5vw,2rem)] font-medium max-w-3xl mb-6">
          {mensaje}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full justify-center items-center">
          {consejos.map(([emoji, titulo, texto], i) => (
            <div
              key={i}
              className="bg-white/90 text-black p-6 rounded-2xl shadow-xl w-[clamp(220px,25vw,280px)] mx-auto"
            >
              <p className="text-4xl mb-2">{emoji}</p>
              <p className="font-bold text-lg">{titulo}</p>
              <p className="text-sm text-gray-700">{texto}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleVolver}
          className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl text-[clamp(1.1rem,2.5vw,1.6rem)] font-bold shadow-xl uppercase mt-6"
        >
          VOLVER AL INICIO
        </button>
      </div>

      <FooterConsejos />
    </div>
  );
}