import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterConsejos from '../components/FooterConsejos';

export default function FinalNivel2({ onAvanzar }) {
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
          COMPLETASTE EL NIVEL 2
        </p>
        <p className="text-white text-[clamp(1.1rem,3vw,1.8rem)] font-medium text-center">
          Tu premio acumulado va creciendo...
        </p>

        <div className="flex flex-col gap-6 w-full">
          <button
            onClick={() => navigate('/retiro', { state: { nivel: 2 } })}
            className="bg-green-500 hover:bg-green-400 text-white p-6 rounded-2xl shadow-2xl w-full"
          >
            <div className="text-4xl mb-1">🎉</div>
            <div className="text-2xl font-bold">RETIRARSE</div>
            <div className="text-base mt-1 text-white/90">Premio Acumulado SEGURO</div>
          </button>

          <button
            onClick={onAvanzar}
            className="bg-yellow-400 hover:bg-yellow-300 text-black p-6 rounded-2xl shadow-2xl w-full"
          >
            <div className="text-3xl mb-1">🚨</div>
            <div className="text-xl font-bold">ADVERTENCIA</div>
            <div className="text-base mt-1 text-black/80">
              Continuar al Nivel 3 · Podés perder todo
            </div>
          </button>
        </div>
      </div>

      <FooterConsejos />
    </>
  );
}