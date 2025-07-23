import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import JuegoResponsable from './pages/JuegoResponsable';
import PantallaRetiroSabio from './screens/PantallaRetiroSabio';
import Estadisticas from './pages/Estadisticas'; // ✅ Nuevo import

function App() {
  useEffect(() => {
    const hoy = new Date();
    const fechaFin = new Date('2025-08-01T00:00:00');
    if (hoy > fechaFin) {
      window.location.href = "/juego-responsable/expirado.html"; // 👈 importante para que funcione bien en GitHub Pages
    }
  }, []);

  return (
    <Router basename="/juego-responsable"> {/* 👈 agregado el basename */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/juego" element={<JuegoResponsable />} />
        <Route path="/retiro" element={<PantallaRetiroSabio />} />
        <Route path="/estadisticas" element={<Estadisticas />} /> {/* ✅ Nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;