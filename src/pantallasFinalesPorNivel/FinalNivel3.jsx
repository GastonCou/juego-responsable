import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterConsejos from '../components/FooterConsejos';

export default function FinalNivel3({ onAvanzar }) {
  const navigate = useNavigate();

  useEffect(() => {
    const sonidoCorrecta = new Audio('/sonidos/Musica-Correcta.mp3');
    sonidoCorrecta.volume = 1.0;
    sonidoCorrecta.play().catch((e) => {
      console.warn('No se pudo reproducir el sonido:', e);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 gap-14 max-w-2xl mt-[140px] mb-[200px]">
        <p className="text-yellow-400 text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-center">
          🏆 FELICITACIONES
        </p>
        <p className="text-white text-[clamp(1.5rem,4vw,2.5rem)] font-semibold text-center">
          COMPLETASTE EL NIVEL 3
        </p>
        <p className="text-white text-[clamp(1.1rem,3vw,1.8rem)] font-medium text-center">
          Estás entre los mejores. ¿Te animás a seguir?
        </p>

        <div className="flex flex-col gap-6 w-full">
          <button
            onClick={() => navigate('/retiro', { state: { nivel: 3 } })}
            className="bg-green-500 hover:bg-green-400 text-white p-6 rounded-2xl shadow-2xl w-full"
          >
            <div className="text-4xl mb-1">🎉</div>
            <div className="text-2xl font-bold">RETIRARSE</div>
            <div className="text-base mt-1 text-white/90">Gran premio SEGURO</div>
          </button>

          <button
            onClick={onAvanzar}
            className="bg-red-600 hover:bg-red-500 text-white p-6 rounded-2xl shadow-2xl w-full"
          >
            <div className="text-3xl mb-1">🚨</div>
            <div className="text-xl font-bold">ALERTA CRÍTICA</div>
            <div className="text-base mt-1 text-white/90">
              Continuar al Nivel 4 · Riesgo alto de perder todo
            </div>
          </button>
        </div>
      </div>

      <FooterConsejos />
    </>
  );
}