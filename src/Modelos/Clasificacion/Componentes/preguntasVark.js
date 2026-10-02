// src/components/VarkTest.js
import { useState } from 'react';

const preguntas = [
  {
    id: 1,
    texto: 'Cuando necesito encontrar el camino a una tienda que me recomendaron, yo:',
    opciones: {
      V: 'Uso un mapa.',
      A: 'Le pido a mi amigo que me dé las indicaciones.',
      R: 'Escribo el nombre de la calle que debo recordar.',
      K: 'Busco dónde está la tienda en relación con algún lugar que conozco.',
    },
  },
  {
    id: 2,
    texto:
      'Cuando una página web tiene un vídeo que muestra cómo hacer un gráfico o una tabla especial (con una persona hablando, listas, palabras y diagramas), yo aprendo más:',
    opciones: {
      V: 'Viendo los diagramas.',
      A: 'Escuchando.',
      R: 'Leyendo las palabras.',
      K: 'Viendo las acciones.',
    },
  },
  {
    id: 3,
    texto: 'Cuando quiero saber más sobre una excursión, yo:',
    opciones: {
      V: 'Uso un mapa para ver dónde están los lugares.',
      A: 'Hablo con la persona que planificó la excursión o con otras personas que van a hacerla.',
      R: 'Leo el itinerario de la excursión.',
      K: 'Miro los detalles sobre los aspectos más destacados y las actividades de la excursión.',
    },
  },
  {
    id: 4,
    texto: 'Cuando elijo una carrera o un área de estudio, lo más importante para mí es:',
    opciones: {
      V: 'Trabajar con diseños, mapas o gráficos.',
      A: 'Comunicarme con otros a través del diálogo.',
      R: 'Utilizar bien las palabras en las comunicaciones escritas.',
      K: 'Aplicar mis conocimientos en situaciones reales.',
    },
  },
  {
    id: 5,
    texto: 'Cuando aprendo, yo prefiero:',
    opciones: {
      V: 'Ver patrones en las cosas.',
      A: 'Hablar de las cosas.',
      R: 'Leer libros, artículos y folletos.',
      K: 'Usar ejemplos y aplicaciones.',
    },
  },
  {
    id: 6,
    texto: 'Cuando quiero ahorrar dinero y decidir entre opciones, yo:',
    opciones: {
      V: 'Utilizo gráficos que muestran diferentes opciones en distintos periodos de tiempo.',
      A: 'Hablo con un experto sobre las opciones.',
      R: 'Leo un folleto que describe las opciones en detalle.',
      K: 'Considero ejemplos de cada opción usando mi información financiera.',
    },
  },
  {
    id: 7,
    texto: 'Cuando aprendo un nuevo juego de mesa o de cartas, yo:',
    opciones: {
      V: 'Uso diagramas que explican fases, movimientos y estrategias.',
      A: 'Escucho a alguien que lo explique y hago preguntas.',
      R: 'Leo las instrucciones.',
      K: 'Observo a otros jugar antes de unirme.',
    },
  },
  {
    id: 8,
    texto: 'Si tengo un problema en el corazón, prefiero que el médico:',
    opciones: {
      V: 'Me muestre un diagrama de lo que está mal.',
      A: 'Me describa lo que está mal.',
      R: 'Me dé algo escrito para explicar lo que está mal.',
      K: 'Use un modelo de plástico para mostrarme lo que está mal.',
    },
  },
  {
    id: 9,
    texto: 'Cuando aprendo a usar algo nuevo en la computadora, yo:',
    opciones: {
      V: 'Sigo los diagramas de un libro.',
      A: 'Hablo con personas que conocen el programa.',
      R: 'Leo las instrucciones escritas que vienen con el programa.',
      K: 'Empiezo a utilizarlo y aprendo por ensayo y error.',
    },
  },
  {
    id: 10,
    texto: 'Cuando aprendo en Internet, prefiero:',
    opciones: {
      V: 'Un diseño y características visuales interesantes.',
      A: 'Canales de audio con podcasts o entrevistas.',
      R: 'Descripciones, listas y explicaciones escritas.',
      K: 'Vídeos que muestran cómo hacer o fabricar algo.',
    },
  },
  {
    id: 11,
    texto: 'Cuando quiero aprender sobre un nuevo proyecto, yo prefiero pedir:',
    opciones: {
      V: 'Diagramas que muestren etapas, beneficios y costes.',
      A: 'Una oportunidad para hablar sobre el proyecto.',
      R: 'Un informe escrito con las características principales.',
      K: 'Ejemplos donde el proyecto ya se haya utilizado con éxito.',
    },
  },
  {
    id: 12,
    texto: 'Cuando aprendo a tomar mejores fotos, yo:',
    opciones: {
      V: 'Uso diagramas que muestran la cámara y lo que hace cada parte.',
      A: 'Hago preguntas y hablo sobre la cámara y sus características.',
      R: 'Uso instrucciones escritas sobre qué hacer.',
      K: 'Uso ejemplos de fotos buenas y malas para ver cómo mejorarlas.',
    },
  },
  {
    id: 13,
    texto: 'Cuando un presentador o profesor me enseña, yo prefiero que utilice:',
    opciones: {
      V: 'Diagramas, cuadros, mapas o gráficos.',
      A: 'Preguntas y respuestas, charlas o discusiones en grupo.',
      R: 'Folletos, libros o lecturas.',
      K: 'Demostraciones, modelos o sesiones prácticas.',
    },
  },
  {
    id: 14,
    texto: 'Cuando termino una competencia o una prueba, me gusta recibir retroalimentación:',
    opciones: {
      V: 'Con gráficos que muestren lo que alcancé.',
      A: 'De alguien que lo hable conmigo.',
      R: 'Con una descripción escrita de mis resultados.',
      K: 'Con ejemplos de lo que hice.',
    },
  },
  {
    id: 15,
    texto: 'Cuando quiero informarme sobre una casa o apartamento antes de visitarlo, yo prefiero:',
    opciones: {
      V: 'Ver un plano con las habitaciones y un mapa de la zona.',
      A: 'Tener una conversación con el propietario.',
      R: 'Leer una descripción impresa de las habitaciones y características.',
      K: 'Ver un vídeo de la propiedad.',
    },
  },
  {
    id: 16,
    texto: 'Cuando tengo que montar una mesa de madera que viene por partes, aprendo mejor con:',
    opciones: {
      V: 'Diagramas que muestren cada etapa del montaje.',
      A: 'Consejos de alguien que ya lo hizo antes.',
      R: 'Instrucciones escritas que vienen con las piezas.',
      K: 'Un vídeo de una persona armando una mesa similar.',
    },
  },
];

function VarkTest({
  onFinish,
  titulo = 'Test VARK',
  textoBoton = 'Enviar respuestas',
  enviando = false,
}) {
  const [respuestas, setRespuestas] = useState({});

  const totalPreguntas = preguntas.length;
  const respondidas = Object.values(respuestas).filter((a) => a.length > 0).length;
  const progreso = Math.round((respondidas / totalPreguntas) * 100);

  const handleSeleccion = (idPregunta, letra) => {
    setRespuestas((prev) => {
      const actuales = prev[idPregunta] || [];
      const yaSeleccionada = actuales.includes(letra);
      const nuevas = yaSeleccionada
        ? actuales.filter((l) => l !== letra)
        : [...actuales, letra];
      return { ...prev, [idPregunta]: nuevas };
    });
  };

  const handleEnviar = () => {
    if (respondidas < totalPreguntas) {
      alert('Por favor responde todas las preguntas antes de continuar.');
      return;
    }
    if (onFinish) onFinish(respuestas);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>{titulo}</h1>
          <div style={styles.progressBarBg}>
            <div
              style={{ ...styles.progressBarFill, width: `${progreso}%` }}
            />
          </div>
          <p style={styles.progressText}>
            {respondidas} / {totalPreguntas} preguntas respondidas
          </p>
        </div>

        <p style={styles.instrucciones}>
          Escoja la respuesta que mejor explique su preferencia. Si una sola
          respuesta no refleja completamente su opinión, puede marcar más de
          una.
        </p>

        {preguntas.map((p, index) => (
          <div key={p.id} style={styles.preguntaBox}>
            <p style={styles.preguntaTexto}>
              <span style={styles.preguntaNumero}>{index + 1}.</span>{' '}
              {p.texto}
            </p>
            <div style={styles.opcionesList}>
              {Object.entries(p.opciones).map(([letra, texto]) => {
                const seleccionada = (respuestas[p.id] || []).includes(letra);
                return (
                  <label
                    key={letra}
                    style={{
                      ...styles.opcionLabel,
                      ...(seleccionada ? styles.opcionLabelActiva : {}),
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={seleccionada}
                      onChange={() => handleSeleccion(p.id, letra)}
                      style={styles.checkbox}
                    />
                    {texto}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <button
          style={{ ...styles.button, ...(enviando ? styles.buttonDisabled : {}) }}
          onClick={handleEnviar}
          disabled={enviando}
        >
          {enviando ? 'Enviando...' : textoBoton}
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
    padding: '0 32px 32px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '680px',
    width: '100%',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: '#ffffff',
    padding: '20px 0 12px',
    marginBottom: '20px',
    borderBottom: '1px solid #e5e7eb',
  },
  title: {
    fontSize: '26px',
    margin: '0 0 12px',
    color: '#1a1a1a',
    textAlign: 'center',
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
    margin: '6px 0 0',
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
  checkbox: {
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
};

export default VarkTest;