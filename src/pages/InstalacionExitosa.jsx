import React from 'react';

export default function InstalacionExitosa() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center text-white p-8"
      style={{
        backgroundColor: '#061731',
      }}
    >
      <h1 className="text-3xl font-bold mb-6">✅ Juego listo para usarse sin conexión</h1>
      <p className="text-lg max-w-md">
        Ya podés cerrar esta ventana. A partir de ahora, el juego funcionará aunque no tengas conexión a internet.
      </p>
      <p className="text-sm mt-8 opacity-70">© 2025 Jugar Responsablemente</p>
    </div>
  );
}