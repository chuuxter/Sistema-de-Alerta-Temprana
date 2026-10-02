import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import preguntas from '../Componentes/Preguntas.js';

// Sin barra al final
const API_URL = 'http://127.0.0.1:8000';

const ESTILOS = {
  riesgo: {
    titulo: 'Posible riesgo académico',
    texto:
      'Según tus respuestas, podrías tener dificultades en este curso. Esto es una estimación, no un resultado definitivo. Con apoyo y buenos hábitos de estudio puede mejorar.',
    color: '#b45309',
    fondo: '#fffbeb',
  },
  aprueba: {
    titulo: 'Probable aprobación',
    texto:
      'Según tus respuestas, es probable que apruebes este curso. Mantener tus hábitos de estudio te ayudará a seguir así.',
    color: '#15803d',
    fondo: '#f0fdf4',
  },
};

function CuestionarioBase({ nombreCurso }) {
  const navigate = useNavigate();

  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  const totalPreguntas = preguntas.length;
  const respondidas = Object.keys(respuestas).length;
  const progreso = Math.round((respondidas / totalPreguntas) * 100);

  const handleSeleccion = (pregunta, opcion) => {
    setRespuestas((prev) => ({
      ...prev,
      [pregunta.variable]: opcion,
    }));
    setResultado(null); // si cambia una respuesta, se descarta la predicción anterior
  };

  const handleEnviar = async () => {
    if (respondidas < totalPreguntas) {
      alert('Por favor responde todas las preguntas antes de continuar.');
      return;
    }

    setCargando(true);
    try {
      const res = await fetch(
        `${API_URL}/predecir/${encodeURIComponent(nombreCurso)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(respuestas),
        }
      );

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const data = await res.json();
      console.log('Respuesta API:', data);
      setResultado(data);
    } catch (error) {
      console.error(error);
      alert('No se pudo obtener la predicción. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const info = resultado
    ? ESTILOS[resultado.en_riesgo ? 'riesgo' : 'aprueba']
    : null;
  const probRiesgo = resultado?.prob_riesgo ?? 0;
  const probAprueba = resultado?.prob_aprueba ?? 0;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* TÍTULO */}
        <h1 style={styles.title}>Preguntas</h1>

        <h2 style={styles.curso}>
          Cuestionario para predecir el rendimiento académico en {nombreCurso}
        </h2>

        {/* PROGRESO */}
        <div style={styles.progressBarBg}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${progreso}%`,
            }}
          />
        </div>

        <p style={styles.progressText}>
          {respondidas} / {totalPreguntas} preguntas respondidas
        </p>

        {/* INSTRUCCIONES */}
        <p style={styles.instrucciones}>
          Selecciona la respuesta que mejor represente tu situación. Tus
          respuestas serán utilizadas de forma anónima para realizar la
          predicción del rendimiento académico.
        </p>

        {/* PREGUNTAS */}
        {preguntas.map((pregunta, index) => (
          <div key={pregunta.id} style={styles.preguntaBox}>
            <p style={styles.preguntaTexto}>
              <span style={styles.preguntaNumero}>{index + 1}.</span>{' '}
              {pregunta.texto}
            </p>

            <div style={styles.opcionesList}>
              {Object.entries(pregunta.opciones).map(([letra, texto]) => {
                const seleccionada = respuestas[pregunta.variable] === letra;

                return (
                  <label
                    key={letra}
                    style={{
                      ...styles.opcionLabel,
                      ...(seleccionada ? styles.opcionLabelActiva : {}),
                    }}
                  >
                    <input
                      type="radio"
                      name={pregunta.variable}
                      value={letra}
                      checked={seleccionada}
                      onChange={() => handleSeleccion(pregunta, letra)}
                      style={styles.radio}
                    />
                    <span>{texto}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {/* BOTÓN ENVIAR */}
        <button
          style={{
            ...styles.button,
            ...(cargando ? styles.buttonDisabled : {}),
          }}
          onClick={handleEnviar}
          disabled={cargando}
        >
          {cargando ? 'Calculando...' : 'Enviar respuestas'}
        </button>

        {/* RESULTADO */}
        {resultado && (
          <div
            style={{
              ...styles.resultadoBox,
              backgroundColor: info.fondo,
              borderColor: info.color,
            }}
          >
            <strong style={{ color: info.color, fontSize: '18px' }}>
              {info.titulo}
            </strong>

            <p style={styles.resultadoTexto}>{info.texto}</p>

            <p style={styles.resultadoProbs}>
              Riesgo: {(probRiesgo * 100).toFixed(0)}%
              {' · '}
              Aprobación: {(probAprueba * 100).toFixed(0)}%
            </p>

            <button
              style={styles.button}
              onClick={() =>
                navigate('/clasificacion-logica', {
                  state: { curso: nombreCurso, resultado },
                })
              }
            >
              Continuar al test VARK
            </button>
          </div>
        )}

        {/* VOLVER */}
        <button
          style={styles.backButton}
          onClick={() => navigate('/escogerCurso')}
        >
          Volver a escoger curso
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f4f6f8',
    padding: '32px 16px',
    minHeight: '100vh',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '680px',
    width: '100%',
  },

  title: {
    fontSize: '28px',
    marginBottom: '12px',
    color: '#1a1a1a',
    textAlign: 'center',
  },

  curso: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#2563eb',
    textAlign: 'center',
    lineHeight: '1.4',
  },

  progressBarBg: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    transition: 'width 0.3s ease',
  },

  progressText: {
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: '6px',
  },

  instrucciones: {
    fontSize: '14px',
    color: '#555',
    backgroundColor: '#eff6ff',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '24px',
    lineHeight: '1.5',
  },

  preguntaBox: {
    marginBottom: '24px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e7eb',
  },

  preguntaTexto: {
    fontSize: '15px',
    color: '#1a1a1a',
    marginBottom: '12px',
    lineHeight: '1.5',
  },

  preguntaNumero: {
    fontWeight: 'bold',
    color: '#2563eb',
  },

  opcionesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  opcionLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '14px',
    color: '#374151',
    backgroundColor: '#f9fafb',
    padding: '10px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '1px solid transparent',
  },

  opcionLabelActiva: {
    backgroundColor: '#eff6ff',
    border: '1px solid #2563eb',
    color: '#1e3a8a',
  },

  radio: {
    marginTop: '2px',
    cursor: 'pointer',
  },

  button: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '12px',
  },

  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  backButton: {
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  },

  resultadoBox: {
    marginTop: '20px',
    padding: '16px 20px',
    borderRadius: '8px',
    border: '1px solid',
    lineHeight: '1.5',
  },

  resultadoTexto: {
    fontSize: '14px',
    color: '#374151',
    margin: '8px 0',
  },

  resultadoProbs: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '4px 0 8px',
  },
};

export default CuestionarioBase;