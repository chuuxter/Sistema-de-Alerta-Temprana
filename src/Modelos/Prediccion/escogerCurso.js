import { useNavigate } from 'react-router-dom';

function EscogerCurso() {
  const navigate = useNavigate();

  const cursos = [
    {
      nombre: 'Razonamiento Matemático',
      ruta: 'rm',
    },
    {
      nombre: 'Aritmética',
      ruta: 'aritmetica',
    },
    {
      nombre: 'Álgebra',
      ruta: 'algebra',
    },
    {
      nombre: 'Geometría',
      ruta: 'geometria',
    },
    {
      nombre: 'Biología',
      ruta: 'biologia',
    },
    {
      nombre: 'Física',
      ruta: 'fisica',
    },
    {
      nombre: 'Química',
      ruta: 'quimica',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>Escoge tu curso</h1>

        <p style={styles.subtitle}>
          Selecciona el curso en el que deseas realizar
          la predicción del rendimiento académico.
        </p>

        <div style={styles.cursosContainer}> 
            {cursos.map((curso) => ( 
            <button 
            key={curso.ruta} 
            style={styles.button} 
             onClick={() => {
                alert(`Escogiste ${curso.nombre}`);
                navigate(`/cuestionario/${curso.ruta}`);
            }}
    > 
            {curso.nombre} 
            </button> 
            ))} 
        </div>

        <button
          style={styles.backButton}
          onClick={() => navigate('/')}
        >
          Volver
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
    width: '420px',
    maxWidth: '90%',
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

  cursosContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  button: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    width: '100%',
  },

  backButton: {
    marginTop: '20px',
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
};

export default EscogerCurso;