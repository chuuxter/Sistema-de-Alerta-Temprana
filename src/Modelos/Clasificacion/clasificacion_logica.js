// src/components/clasificacion_logica.js
import { useNavigate } from 'react-router-dom';

function ClasificacionLogica() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.badge}>Test de Estilo de Aprendizaje</span>

        <h1 style={styles.title}>Conoce tu Estilo de Aprendizaje</h1>

        <p style={styles.description}>
          Para brindarte recomendaciones de enseñanza personalizadas, es
          importante conocer cómo aprendes mejor. A continuación, realizarás
          el <strong>Test VARK</strong>, un cuestionario de opción múltiple
          que identifica tu estilo dominante de aprendizaje entre cuatro
          categorías:
        </p>

        <div style={styles.stylesGrid}>
          <div style={styles.styleItem}>
            <span style={styles.styleIcon}>👁️</span>
            <span style={styles.styleLabel}>Visual</span>
          </div>
          <div style={styles.styleItem}>
            <span style={styles.styleIcon}>👂</span>
            <span style={styles.styleLabel}>Auditivo</span>
          </div>
          <div style={styles.styleItem}>
            <span style={styles.styleIcon}>📖</span>
            <span style={styles.styleLabel}>Lectura/Escritura</span>
          </div>
          <div style={styles.styleItem}>
            <span style={styles.styleIcon}>✋</span>
            <span style={styles.styleLabel}>Kinestésico</span>
          </div>
        </div>

        <div style={styles.instructionsBox}>
          <h3 style={styles.instructionsTitle}>Instrucciones</h3>
          <ul style={styles.instructionsList}>
            <li>El test consta de preguntas de opción múltiple.</li>
            <li>Elige la opción que mejor describa tu forma de aprender.</li>
            <li>No hay respuestas correctas ni incorrectas, responde con sinceridad.</li>
            <li>Al finalizar, el sistema identificará tu estilo dominante.</li>
          </ul>
        </div>

        <button
          style={styles.button}
          onClick={() => navigate('/vark-test')}
        >
          Comenzar Test
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
    padding: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '560px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '16px',
    color: '#1a1a1a',
  },
  description: {
    fontSize: '15px',
    color: '#555',
    marginBottom: '24px',
    lineHeight: '1.6',
    textAlign: 'left',
  },
  stylesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  styleItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#f9fafb',
    padding: '12px 8px',
    borderRadius: '10px',
  },
  styleIcon: {
    fontSize: '24px',
  },
  styleLabel: {
    fontSize: '12px',
    color: '#374151',
    fontWeight: '500',
  },
  instructionsBox: {
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '10px',
    padding: '16px 20px',
    marginBottom: '28px',
    textAlign: 'left',
  },
  instructionsTitle: {
    fontSize: '14px',
    color: '#92400e',
    marginBottom: '8px',
  },
  instructionsList: {
    fontSize: '13px',
    color: '#78350f',
    margin: 0,
    paddingLeft: '18px',
    lineHeight: '1.6',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default ClasificacionLogica;