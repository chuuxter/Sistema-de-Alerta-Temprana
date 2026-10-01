import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Sistema de Alerta Temprana</h1>
        <p style={styles.subtitle}>
          Predicción de rendimiento académico y recomendación de estrategias
          de enseñanza personalizadas según el estilo de aprendizaje del
          alumno.
        </p>
        <button style={styles.button} onClick={() => navigate('/escogerCurso')}>
          Iniciar
        </button>

        {/* Botón temporal para pruebas */}
        <button
          style={styles.buttonTemp}
          onClick={() => navigate('/clasificacion-logica')}
        >
          [TEMPORAL] Ir a Clasificación Lógica
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '420px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '16px',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '15px',
    color: '#555',
    marginBottom: '28px',
    lineHeight: '1.5',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  buttonTemp: {
    display: 'block',
    marginTop: '16px',
    backgroundColor: '#f59e0b',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer',
  },
};

export default Home;