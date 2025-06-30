import React, { useEffect, useState, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const COLORS = ['#00C49F', '#FF8042', '#0088FE'];

export default function Estadisticas() {
  const [jugadores, setJugadores] = useState(0);
  const [tiemposPromedio, setTiemposPromedio] = useState('');
  const [nivelesData, setNivelesData] = useState([]);
  const [finalizacionesData, setFinalizacionesData] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jugadores = parseInt(localStorage.getItem('estad_jugadores') || '0');
    const tiempos = JSON.parse(localStorage.getItem('tiemposDeJuego') || '[]');
    const niveles = JSON.parse(localStorage.getItem('nivelesAlcanzados') || '[]');
    const finales = JSON.parse(localStorage.getItem('formasDeFinalizar') || '[]');

    setJugadores(jugadores);

    if (tiempos.length > 0) {
      const promedio = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;
      const totalSegundos = Math.ceil(promedio);

      if (totalSegundos < 60) {
        setTiemposPromedio(`${totalSegundos} segundos`);
      } else {
        const minutos = Math.floor(totalSegundos / 60);
        const segundosRestantes = totalSegundos % 60;

        let segundosFinal = 0;
        if (segundosRestantes > 0 && segundosRestantes <= 30) {
          segundosFinal = 30;
        } else if (segundosRestantes > 30) {
          setTiemposPromedio(`${minutos + 1} min 0 seg`);
          return;
        }

        setTiemposPromedio(`${minutos} min ${segundosFinal} seg`);
      }
    }

    // ✅ Obtener el nivel máximo alcanzado por cada jugador
    const nivelesPorJugador = [];
    for (let i = 0; i < niveles.length; i += jugadores > 0 ? Math.floor(niveles.length / jugadores) : 1) {
      nivelesPorJugador.push(niveles[i]);
    }

    // ✅ Contar cuántos jugadores alcanzaron cada nivel como su máximo
    const conteoPorNivel = [1, 2, 3, 4, 5].map(n => ({
      name: `Nivel ${n}`,
      value: nivelesPorJugador.filter(maxNivel => maxNivel === n).length,
    }));

    setNivelesData(conteoPorNivel);

    const retiro = finales.filter(f => f === 'retiro').length;
    const derrota = finales.filter(f => f === 'derrota').length;
    const victoria = finales.filter(f => f === 'victoria').length;
    setFinalizacionesData([
      { name: 'Retiro', value: retiro },
      { name: 'Derrota', value: derrota },
      { name: 'Ganador', value: victoria },
    ]);
  }, []);

  const manejarDescarga = () => {
    html2canvas(containerRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('EstadisticasJuegoResponsable.pdf');
    });
  };

  const manejarReset = () => {
    localStorage.removeItem('estad_jugadores');
    localStorage.removeItem('estad_inicio_tiempo');
    localStorage.removeItem('tiemposDeJuego');
    localStorage.removeItem('nivelesAlcanzados');
    localStorage.removeItem('formasDeFinalizar');
    localStorage.removeItem('jugador_contado');
    window.location.reload();
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-100 px-4 py-6 flex flex-col items-center gap-10 sm:gap-12"
    >
      <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-center text-blue-900">
        📊 Estadísticas de Juego Responsable
      </h1>

      <div className="text-blue-800 px-4 py-6 rounded-xl shadow-lg w-full max-w-3xl text-center bg-white">
        <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-semibold">
          👥 Cantidad de jugadores: {jugadores}
        </p>
        <p className="text-[clamp(1rem,2.5vw,1.5rem)] font-semibold mt-2">
          ⏱️ Tiempo promedio por jugador: {tiemposPromedio}
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-[clamp(1.2rem,2vw,2rem)] font-bold mb-4 text-blue-800">
          📈 Niveles alcanzados
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={nivelesData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-[clamp(1.2rem,2vw,2rem)] font-bold mb-4 text-blue-800">
          🥧 Tipos de finalización
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={finalizacionesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {finalizacionesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-4 mt-8 justify-center w-full max-w-4xl">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3 rounded-xl shadow w-full sm:w-auto text-[clamp(1rem,2vw,1.25rem)]"
        >
          Volver al inicio
        </button>
        <button
          onClick={manejarDescarga}
          className="bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-3 rounded-xl shadow w-full sm:w-auto text-[clamp(1rem,2vw,1.25rem)]"
        >
          Descargar en PDF
        </button>
        <button
          onClick={manejarReset}
          className="bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-3 rounded-xl shadow w-full sm:w-auto text-[clamp(1rem,2vw,1.25rem)]"
        >
          Reiniciar estadísticas
        </button>
      </div>
    </div>
  );
}