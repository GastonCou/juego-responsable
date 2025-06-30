import React from 'react';
import { reproducirSonido } from '../utils/sonidos';

export default function PreguntaActual({ pregunta, onResponder }) {
  if (!pregunta) return null;

  function manejarClick(op) {
    reproducirSonido('Musica-Siguiente.mp3');
    onResponder(op);
  }

  return (
    <div className="flex flex-col flex-grow items-center justify-center px-4 text-center gap-12">
      <p
        className="text-white font-bold leading-snug text-center"
        style={{
          fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
          whiteSpace: 'pre-line',
          maxWidth: '90vw',
        }}
      >
        {pregunta.texto}
      </p>

      <div className="flex flex-col gap-6 w-full" style={{ maxWidth: '600px' }}>
        {pregunta.opciones.map((op) => (
          <button
            key={op}
            onClick={() => manejarClick(op)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-5 rounded font-bold shadow-xl w-full"
            style={{ fontSize: 'clamp(1rem, 4vw, 2rem)' }}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}