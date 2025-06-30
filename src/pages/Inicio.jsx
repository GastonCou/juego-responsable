import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const [esVertical, setEsVertical] = useState(window.innerHeight > window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const manejarResize = () => setEsVertical(window.innerHeight > window.innerWidth);
    window.addEventListener('resize', manejarResize);
    return () => window.removeEventListener('resize', manejarResize);
  }, []);

  const fondo = esVertical ? '/Caratula-fondo-vertical.png' : '/Caratula-fondo-horizontal.png';

  const manejarComenzar = () => {
    // ✅ Registrar nuevo jugador
    const jugadoresPrevios = parseInt(localStorage.getItem('estad_jugadores')) || 0;
    localStorage.setItem('estad_jugadores', jugadoresPrevios + 1);

    // ✅ Iniciar nueva sesión de tiempo
    localStorage.setItem('estad_inicio_tiempo', Date.now());

    // ✅ Resetear niveles alcanzados para esta sesión (clave para estadísticas correctas)
    localStorage.setItem('sesion_nivel_maximo', '0');

    navigate('/juego');
  };

  const manejarEstadisticas = () => {
    navigate('/estadisticas');
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center text-center px-4 relative"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <button
        onClick={manejarComenzar}
        className="bg-blue-600 hover:bg-blue-500 transition-all duration-200 ease-in-out text-white text-[clamp(1.5rem,3vw,2.5rem)] font-bold px-10 py-6 rounded-2xl shadow-xl uppercase w-full max-w-xs sm:max-w-md"
      >
        COMENZAR
      </button>

      {/* Área secreta para ver estadísticas */}
      <div
        onDoubleClick={manejarEstadisticas}
        className="absolute bottom-2 right-2 w-8 h-8 z-50"
        style={{ opacity: 0 }}
        title="Área secreta"
      ></div>
    </div>
  );
}