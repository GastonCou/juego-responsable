import React from 'react';

export default function FooterConsejos() {
  return (
    <div className="absolute bottom-[clamp(1rem,4vh,5rem)] w-full text-center z-10 px-4">
      <p className="text-gray-300 font-semibold tracking-wide text-[clamp(0.9rem,2vw,1.4rem)] leading-snug">
        CONSEJOS PARA JUGAR RESPONSABLEMENTE
      </p>
      <img
        src="/logo-caja.png"
        alt="Logo Caja de Crédito y Prestaciones"
        className="mx-auto mt-3 w-[clamp(140px,40vw,320px)] opacity-90"
      />
    </div>
  );
}