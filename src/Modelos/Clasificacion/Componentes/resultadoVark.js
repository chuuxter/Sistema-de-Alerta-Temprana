import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ESTILOS = {
  V: {
    nombre: 'Visual',
    descripcion: 'Aprendes mejor cuando ves la información en forma de imágenes, diagramas y gráficos.',
    metodologias: [
      'Mapas conceptuales y mapas mentales',
      'Diagramas, esquemas y gráficos',
      'Videos y presentaciones con imágenes',
      'Uso de colores para organizar apuntes',
    ],
  },
  A: {
    nombre: 'Auditivo',
    descripcion: 'Aprendes mejor cuando escuchas y conversas sobre los temas.',
    metodologias: [
      'Discusiones y debates en grupo',
      'Explicar los temas en voz alta',
      'Podcasts y audios explicativos',
      'Grupos de estudio con preguntas y respuestas',
    ],
  },
  R: {
    nombre: 'Lectura/Escritura',
    descripcion: 'Aprendes mejor cuando lees y escribes la información.',
    metodologias: [
      'Resúmenes y notas escritas',
      'Lectura de textos y guías',
      'Listas y glosarios de términos',
      'Reescribir los apuntes con tus propias palabras',
    ],
  },
  K: {
    nombre: 'Kinestésico',
    descripcion: 'Aprendes mejor haciendo: con práctica, ejemplos y experiencias reales.',
    metodologias: [
      'Resolver ejercicios y problemas prácticos',
      'Experimentos y demostraciones',
      'Aprendizaje basado en proyectos',
      'Ejemplos de la vida real y casos concretos',
    ],
  },
};

function PantallaResultado() {
  const navigate = useNavigate();
  const { state } = useLocation(); // { curso, resultado, vark }

  useEffect(() => {
    if (!state || !state.vark) navigate('/escogerCurso');
  }, [state, navigate]);

  if (!state || !state.vark) return null;

  const { curso, resultado, vark } = state;
  const info = ESTILOS[vark.estilo];
  const probs = Object.entries(vark.probabilidades).sort((a, b) => b[1] - a[1]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Tu resultado</h1>
        {curso && <p style={styles.curso}>Curso: {curso}</p>}

        {resultado && (
          <p style={styles.riesgo}>
            Predicción de rendimiento:{' '}
            <strong>{resultado.en_riesgo ? 'posible riesgo académico' : 'probable aprobación'}</strong>
          </p>
        )}

        <div style={styles.estiloBox}>
          <strong style={styles.estiloTitulo}>
            Estilo de aprendizaje: {info ? info.nombre : vark.estilo}
          </strong>
          {info && <p style={styles.texto}>{info.descripcion}</p>}

          <p style={styles.subtitulo}>Metodologías recomendadas</p>
          <ul style={styles.lista}>
            {info &&
              info.metodologias.map((m) => (
                <li key={m}>{m}</li>
              ))}
          </ul>
        </div>

        <p style={styles.subtitulo}>Probabilidad por estilo</p>
        {probs.map(([letra, p]) => (
          <div key={letra} style={styles.probFila}>
            <span style={styles.probNombre}>{ESTILOS[letra] ? ESTILOS[letra].nombre : letra}</span>
            <div style={styles.barraBg}>
              <div style={{ ...styles.barraFill, width: `${(p * 100).toFixed(0)}%` }} />
            </div>
            <span style={styles.probValor}>{(p * 100).toFixed(0)}%</span>
          </div>
        ))}

        <p style={styles.nota}>
          Este resultado es una estimación y no un diagnóstico definitivo.
        </p>

        <button style={styles.button} onClick={() => navigate('/escogerCurso')}>
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
    alignSelf: 'flex-start',
  },
  title: { fontSize: '28px', marginBottom: '8px', color: '#1a1a1a', textAlign: 'center' },
  curso: { fontSize: '16px', color: '#2563eb', textAlign: 'center', margin: '0 0 8px' },
  riesgo: { fontSize: '14px', color: '#374151', textAlign: 'center', margin: '0 0 20px' },
  estiloBox: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #15803d',
    borderRadius: '8px',
    padding: '16px 20px',
    marginBottom: '24px',
    lineHeight: '1.5',
  },
  estiloTitulo: { color: '#15803d', fontSize: '18px' },
  texto: { fontSize: '14px', color: '#374151', margin: '8px 0' },
  subtitulo: { fontSize: '14px', fontWeight: 'bold', color: '#1a1a1a', margin: '12px 0 6px' },
  lista: { fontSize: '14px', color: '#374151', margin: 0, paddingLeft: '20px', lineHeight: '1.7' },
  probFila: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' },
  probNombre: { width: '120px', fontSize: '13px', color: '#374151' },
  barraBg: { flex: 1, height: '8px', backgroundColor: '#e5e7eb', borderRadius: '8px', overflow: 'hidden' },
  barraFill: { height: '100%', backgroundColor: '#2563eb' },
  probValor: { width: '40px', fontSize: '13px', color: '#6b7280', textAlign: 'right' },
  nota: { fontSize: '12px', color: '#6b7280', margin: '16px 0' },
  button: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default PantallaResultado;