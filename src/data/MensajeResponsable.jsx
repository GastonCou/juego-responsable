import React, { useEffect } from 'react';
import { reproducirSonido } from '../utils/sonidos';

const mensajes = {
  1: {
    tipo: 'texto',
    titulo: '💡 JUGÁ CON RESPONSABILIDAD',
    contenido: 'Recordá que los juegos de azar son solo para mayores de 18 años',
  },
  2: {
    tipo: 'texto',
    titulo: '💡 MENSAJE RESPONSABLE',
    contenido:
      'No arriesgues más de lo que tu economía permite.\nEl juego debe ser un entretenimiento, no un riesgo financiero',
  },
  3: {
    tipo: 'bloque',
    titulo: '💡 SEÑALES DE ALERTA',
    items: [
      ['😠', 'Cambios de ánimo', 'Reacciones desproporcionadas al jugar'],
      ['🌙', 'Insomnio', 'Te cuesta dormir por pensar en el juego'],
      ['💸', 'Endeudarse', 'Jugás dinero que no podés perder'],
      ['🙈', 'Aislamiento social', 'Te alejás de amigos o familia'],
      ['😡', 'Irritabilidad al perder', 'Perder te pone de mal humor'],
    ],
  },
  4: {
    tipo: 'texto',
    titulo: '💡 REFLEXIONÁ ANTES DE JUGAR',
    contenido:
      '¿Sabías que 8 de cada 10 jóvenes juegan compulsivamente?\nTomá pausas, reflexioná y pedí ayuda si lo necesitás',
  },
  5: {
    tipo: 'texto',
    titulo: '💡 ÚLTIMO CONSEJO',
    contenido:
      'Jugá por diversión, NO por necesidad.\nLa mejor apuesta es la que podés dejar cuando quieras',
  },
};

export default function MensajeResponsable({ nivel, onContinuar }) {
  const mensaje = mensajes[nivel];

  useEffect(() => {
    reproducirSonido('Musica-MensajeResponsable.mp3', 0.8);
  }, []);

  if (!mensaje) return null;

  return (
    <div className="flex justify-center items-center px-4 pt-12 pb-40 w-full h-full">
      <div className="flex flex-col items-center text-center gap-12 w-full max-w-6xl">
        <h1 className="text-yellow-400 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mt-4">
          {mensaje.titulo}
        </h1>

        {mensaje.tipo === 'texto' ? (
          <p className="text-[clamp(1.2rem,3vw,2rem)] text-white font-medium whitespace-pre-line leading-relaxed max-w-4xl">
            {mensaje.contenido}
          </p>
        ) : (
          <div className="text-white font-medium w-full flex flex-col items-center gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {mensaje.items.map(([emoji, titulo, descripcion], index) => (
                <div
                  key={index}
                  className="bg-white text-black px-6 py-4 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-sm"
                >
                  <span className="text-4xl mb-2">{emoji}</span>
                  <p className="font-bold text-lg">{titulo}</p>
                  <p className="text-sm text-center text-gray-700">{descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            reproducirSonido('Musica-Siguiente.mp3');
            onContinuar();
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-bold shadow-xl uppercase"
        >
          SEGUIR
        </button>
      </div>
    </div>
  );
}