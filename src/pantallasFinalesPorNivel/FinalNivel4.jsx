import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterConsejos from '../components/FooterConsejos';

export default function FinalNivel4({ onAvanzar }) {
  const navigate = useNavigate();

  useEffect(() => {
    const sonidoCorrecta = new Audio(`${process.env.PUBLIC_URL}/Sonidos/Musica-Correcta.mp3`);
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
          backgroundImage: `url(${process.env.PUBLIC_URL}/fondo-horizontal.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex flex-col items-center justify-center gap-10 max-w-xl w-full">
          <p className="text-yellow-400 text-[clamp(2rem,5vw,3.5rem)] font-extrabold">
            🏆 FELICITACIONES
          </p>
          <p className="text-white text-[clamp(1.5rem,4vw,2.5rem)] font-semibold">
            COMPLETASTE EL NIVEL 4
          </p>
          <p className="text-white text-[clamp(1.1rem,3vw,1.8rem)] font-medium">
            ¡Estás a un paso del premio total!
          </p>

          <div className="flex flex-col gap-6 w-full max-w-sm">
            <button
              onClick={() => navigate('/retiro', { state: { nivel: 4 } })}
              className="bg-green-500 hover:bg-green-400 text-white p-6 rounded-2xl shadow-2xl w-full"
            >
              <div className="text-4xl mb-1">🎉</div>
              <div className="text-2xl font-bold">RETIRARSE</div>
              <div className="text-base mt-1 text-white/90">Premio EXCELENTE</div>
            </button>

            <button
              onClick={onAvanzar}
              className="bg-red-700 hover:bg-red-600 text-white p-6 rounded-2xl shadow-2xl w-full"
            >
              <div className="text-4xl mb-1">🔥</div>
              <div className="text-xl font-bold">ÚLTIMO NIVEL</div>
              <div className="text-base mt-1 text-white/90">
                Esta es tu última oportunidad para retirarte.<br />Si fallás, perdés TODO.
              </div>
            </button>
          </div>
        </div>
      </div>

      <FooterConsejos />
    </>
  );
}