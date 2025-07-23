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
      <div
        className="min-h-screen text-white flex flex-col items-center justify-center text-center px-4 relative"
        style={{
          backgroundImage: 'url(/fondo-horizontal.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl w-full">

          <p className="text-yellow-400 text-[clamp(2rem,5vw,3.5rem)] font-extrabold">
            🏆 FELICITACIONES
          </p>
          <p className="text-white text-[clamp(1.5rem,4vw,2.5rem)] font-semibold">
            COMPLETASTE EL NIVEL 2
          </p>
          <p className="text-white text-[clamp(1.1rem,3vw,1.8rem)] font-medium max-w-lg">
            Tu premio acumulado va creciendo...
          </p>

          <div className="flex flex-col gap-6 w-full max-w-md">
            <button
              onClick={() => navigate('/retiro', { state: { nivel: 2 } })}
              className="bg-green-500 hover:bg-green-400 text-white px-8 py-6 rounded-2xl shadow-2xl font-bold text-[clamp(1rem,3vw,1.5rem)]"
            >
              🎉 RETIRARSE
              <div className="text-sm mt-1 text-white/90 font-normal">
                Premio Acumulado SEGURO
              </div>
            </button>

            <button
              onClick={onAvanzar}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-6 rounded-2xl shadow-2xl font-bold text-[clamp(1rem,3vw,1.5rem)]"
            >
              🚨 ADVERTENCIA
              <div className="text-sm mt-1 text-black/80 font-normal">
                Continuar al Nivel 3 · Podés perder todo
              </div>
            </button>
          </div>
        </div>
      </div>

      <FooterConsejos />
    </>
  );
}