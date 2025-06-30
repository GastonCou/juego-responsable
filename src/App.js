import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import JuegoResponsable from './pages/JuegoResponsable';
import PantallaRetiroSabio from './screens/PantallaRetiroSabio';
import Estadisticas from './pages/Estadisticas'; // ✅ Nuevo import

function App() {
  return (
    <Router>
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