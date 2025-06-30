import React from 'react';

export default function HeaderNivel({ nivel, dificultad }) {
  return (
    <div className="absolute top-[clamp(1rem,4vh,5rem)] w-full flex justify-center z-20 px-2">
      <div className="bg-yellow-500 text-black font-bold text-[clamp(1rem,3vw,2rem)] px-[clamp(1rem,4vw,2rem)] py-[clamp(0.5rem,2vh,1.2rem)] rounded-2xl text-center shadow-lg">
        Nivel {nivel} - Dificultad {dificultad}
      </div>
    </div>
  );
}