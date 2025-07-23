import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

import HeaderNivel from '../components/HeaderNivel';
import FooterConsejos from '../components/FooterConsejos';
import PreguntaActual from '../components/PreguntaActual';
import MensajeResponsable from '../data/MensajeResponsable';

import preguntasPorNivel from '../data/preguntasPorNivel';
import dificultadPorNivel from '../data/dificultadPorNivel';

import PantallaRetiroSabio from '../screens/PantallaRetiroSabio';

import FinalNivel1 from '../pantallasFinalesPorNivel/FinalNivel1';
import FinalNivel2 from '../pantallasFinalesPorNivel/FinalNivel2';
import FinalNivel3 from '../pantallasFinalesPorNivel/FinalNivel3';
import FinalNivel4 from '../pantallasFinalesPorNivel/FinalNivel4';
import FinalNivel5 from '../pantallasFinalesPorNivel/FinalNivel5';

import DerrotaNivel1 from '../pantallasDerrotaPorNivel/DerrotaNivel1';
import DerrotaNivel2 from '../pantallasDerrotaPorNivel/DerrotaNivel2';
import DerrotaNivel3 from '../pantallasDerrotaPorNivel/DerrotaNivel3';
import DerrotaNivel4 from '../pantallasDerrotaPorNivel/DerrotaNivel4';
import DerrotaNivel5 from '../pantallasDerrotaPorNivel/DerrotaNivel5';

import { reproducirSonido } from '../utils/sonidos';

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

export default function JuegoResponsable() {
  const [nivel, setNivel] = useState(1);
  const [paso, setPaso] = useState(0);
  const [mensaje, setMensaje] = useState(null);
  const [mostrarPantallaRetiroSabio, setMostrarPantallaRetiroSabio] = useState(false);
  const [mostrarMensajeResponsable, setMostrarMensajeResponsable] = useState(true);
  const [width, height] = useWindowSize();
  const navigate = useNavigate();

  const fondoAudioRef = useRef(null);

  useEffect(() => {
    if (!fondoAudioRef.current) {
      const audio = new Audio(`${process.env.PUBLIC_URL}/Sonidos/Musica-Fondo.mp3`);
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch((e) => {
        console.log('Autoplay bloqueado:', e);
      });
      fondoAudioRef.current = audio;
    }

    return () => {
      fondoAudioRef.current?.pause();
      fondoAudioRef.current = null;
    };
  }, []);

  const preguntas = preguntasPorNivel[nivel] || [];
  const pregunta = preguntas[paso];
  const dificultad = dificultadPorNivel[nivel] || '';
  const fondo =
  window.innerHeight > window.innerWidth
    ? `${process.env.PUBLIC_URL}/fondo-vertical.png`
    : `${process.env.PUBLIC_URL}/fondo-horizontal.png`;

  function guardarNivelMaximoAlcanzado(nivelAlcanzado) {
    const maxPrevio = parseInt(localStorage.getItem('sesion_nivel_maximo')) || 0;
    if (nivelAlcanzado > maxPrevio) {
      localStorage.setItem('sesion_nivel_maximo', nivelAlcanzado.toString());
    }
  }

  function reiniciarJuego() {
    const tiempoInicio = parseInt(localStorage.getItem('estad_inicio_tiempo'));
    const tiempoFin = Date.now();
    const duracion = Math.floor((tiempoFin - tiempoInicio) / 1000);

    const nivelAlcanzado = parseInt(localStorage.getItem('sesion_nivel_maximo')) || nivel;
    const niveles = JSON.parse(localStorage.getItem('estad_niveles')) || {};
    niveles[nivelAlcanzado] = (niveles[nivelAlcanzado] || 0) + 1;
    localStorage.setItem('estad_niveles', JSON.stringify(niveles));

    const finales = JSON.parse(localStorage.getItem('estad_finales')) || {};
    const tipoFinal = mostrarPantallaRetiroSabio ? 'retiro' : 'derrota';
    finales[tipoFinal] = (finales[tipoFinal] || 0) + 1;
    localStorage.setItem('estad_finales', JSON.stringify(finales));

    localStorage.setItem('estad_tiempo_total', duracion.toString());

    setNivel(1);
    setPaso(0);
    setMensaje(null);
    setMostrarPantallaRetiroSabio(false);
    setMostrarMensajeResponsable(true);
    navigate('/');
  }

  function manejarRespuesta(opcionSeleccionada) {
    if (!pregunta) return;

    const esCorrecta = opcionSeleccionada === pregunta.correcta;
    const esUltimaPregunta = paso === preguntas.length - 1;

    if (esCorrecta) {
      reproducirSonido('Musica-Correcta.mp3');
      if (esUltimaPregunta) {
        guardarNivelMaximoAlcanzado(nivel);
        setMensaje('ganaste');
      } else {
        setPaso(paso + 1);
      }
    } else {
      reproducirSonido('Musica-Incorrecta.mp3');
      guardarNivelMaximoAlcanzado(nivel);
      setMensaje('incorrecta');
    }
  }

  function avanzarNivel() {
    guardarNivelMaximoAlcanzado(nivel);
    setNivel(nivel + 1);
    setPaso(0);
    setMensaje(null);
    setMostrarMensajeResponsable(true);
  }

  function retirarse() {
    guardarNivelMaximoAlcanzado(nivel);
    setMostrarPantallaRetiroSabio(true);
  }

  const mostrarPantallaFinal = mensaje === 'ganaste';
  const mostrarPantallaDerrota = mensaje === 'incorrecta';

  const PantallaFinal = {
    1: FinalNivel1,
    2: FinalNivel2,
    3: FinalNivel3,
    4: FinalNivel4,
    5: FinalNivel5,
  }[nivel];

  const PantallaDerrota = {
    1: DerrotaNivel1,
    2: DerrotaNivel2,
    3: DerrotaNivel3,
    4: DerrotaNivel4,
    5: DerrotaNivel5,
  }[nivel];

  return (
    <div
      className="min-h-screen w-full text-white flex flex-col items-center justify-center text-center"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {(mostrarPantallaFinal && nivel === 5) || mostrarPantallaRetiroSabio ? (
        <div className="absolute top-0 left-0 w-screen h-screen z-10 pointer-events-none">
          <Confetti width={width} height={height} numberOfPieces={500} recycle={true} gravity={0.15} opacity={0.8} />
        </div>
      ) : null}

      {mostrarPantallaRetiroSabio ? (
        <PantallaRetiroSabio onVolver={reiniciarJuego} />
      ) : mostrarPantallaFinal ? (
        <PantallaFinal onVolver={reiniciarJuego} onAvanzar={avanzarNivel} />
      ) : mostrarPantallaDerrota ? (
        <PantallaDerrota onVolver={reiniciarJuego} />
      ) : mostrarMensajeResponsable ? (
        <>
          <div className="flex-1 flex flex-col justify-center items-center w-full">
            <MensajeResponsable nivel={nivel} onContinuar={() => setMostrarMensajeResponsable(false)} />
          </div>
          <FooterConsejos onRetirarse={retirarse} />
        </>
      ) : (
        <>
          <HeaderNivel nivel={nivel} dificultad={dificultad} />
          <div className="flex-1 flex flex-col justify-center items-center w-full">
            <PreguntaActual pregunta={pregunta} onResponder={manejarRespuesta} />
          </div>
          <FooterConsejos onRetirarse={retirarse} />
        </>
      )}
    </div>
  );
}