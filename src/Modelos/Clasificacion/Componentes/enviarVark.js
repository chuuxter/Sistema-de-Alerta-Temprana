import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VarkTest from './preguntasVark.js';

const API_URL = 'http://127.0.0.1:8000';

function ResultadoVark() {
  const navigate = useNavigate();
  const { state } = useLocation();   // { curso, resultado } de la predicción
  const [enviando, setEnviando] = useState(false);

  // Si alguien entra directo a la URL sin pasar por el cuestionario
  useEffect(() => {
    if (!state) navigate('/escogerCurso');
  }, [state, navigate]);

  const clasificar = async (respuestas) => {
    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/clasificar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuestas }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const vark = await res.json();   // { estilo, probabilidades }
      console.log('Estilo VARK:', vark);
      navigate('/resultado-clasificacion', { state: { ...state, vark } });
    } catch (e) {
      console.error(e);
      alert('No se pudo clasificar. Intenta de nuevo.');
      setEnviando(false);
    }
  };

  return <VarkTest onFinish={clasificar} enviando={enviando} />;
}

export default ResultadoVark;