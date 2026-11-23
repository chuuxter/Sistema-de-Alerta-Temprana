const preguntas = [
  {
    id: 1,
    variable: 'genero',
    texto: '¿Cuál es tu género?',
    opciones: {
      a: 'Hombre',
      b: 'Mujer',
    },
  },

  {
    id: 2,
    variable: 'con_quien_vive',
    texto: '¿Con quién vives actualmente?',
    opciones: {
      a: 'Con mi papá y mi mamá',
      b: 'Solo con mi mamá',
      c: 'Solo con mi papá',
      d: 'Otros (abuelos, tíos, tutor, etc.)',
    },
  },

  {
    id: 3,
    variable: 'nivel_academico_papa',
    texto: '¿Cuál es el nivel académico de tu papá?',
    opciones: {
      a: 'Primaria',
      b: 'Secundaria',
      c: 'Superior técnico',
      d: 'Superior universitario',
      e: 'Estudios de posgrado',
      f: 'No tengo papá',
    },
  },

  {
    id: 4,
    variable: 'nivel_academico_mama',
    texto: '¿Cuál es el nivel académico de tu mamá?',
    opciones: {
      a: 'Primaria',
      b: 'Secundaria',
      c: 'Superior técnico',
      d: 'Superior universitario',
      e: 'Estudios de posgrado',
      f: 'No tengo mamá',
    },
  },

  {
    id: 5,
    variable: 'estudia_fuera_horario',
    texto: '¿Sueles estudiar tus cursos fuera del horario escolar?',
    opciones: {
      a: 'Sí',
      b: 'No',
    },
  },

  {
    id: 6,
    variable: 'entorno_estudio',
    texto: '¿Cuentas con un entorno adecuado para tu estudio?',
    opciones: {
      a: 'Sí',
      b: 'No',
    },
  },

  {
    id: 7,
    variable: 'horas_estudio',
    texto: '¿Cuántas horas al día dedicas al estudio fuera del colegio?',
    opciones: {
      a: 'Menos de 1 hora',
      b: 'Entre 1 y 2 horas',
      c: 'Entre 2 y 3 horas',
      d: 'Más de 3 horas',
    },
  },

  {
    id: 8,
    variable: 'comidas_dia',
    texto: '¿Cuántas comidas al día sueles consumir regularmente?',
    opciones: {
      a: 'Una comida al día',
      b: 'Dos comidas al día',
      c: 'Tres comidas al día',
      d: 'Cuatro o más comidas al día',
    },
  },

  {
    id: 9,
    variable: 'acceso_internet',
    texto:
      '¿Tienes acceso a internet en casa para realizar tareas y estudiar?',
    opciones: {
      a: 'Sí, con internet estable',
      b: 'Sí, pero a veces se corta o es lento',
      c: 'Solo tengo acceso limitado (datos móviles o recargas)',
      d: 'No tengo acceso a internet en casa',
    },
  },

  {
    id: 10,
    variable: 'trabajo_fuera_horario',
    texto: '¿Trabajas fuera del horario escolar?',
    opciones: {
      a: 'No trabajo',
      b: 'Trabajo solo fines de semana o vacaciones',
      c: 'Trabajo algunas horas entre semana',
      d: 'Trabajo todos los días después del colegio',
    },
  },

  {
    id: 11,
    variable: 'responsabilidades_domesticas',
    texto:
      '¿Tienes responsabilidades domésticas que interfieren con tu tiempo de estudio?',
    opciones: {
      a: 'No tengo responsabilidades importantes en casa',
      b: 'Ayudo en casa, pero no interfiere con mis estudios',
      c: 'Tengo bastantes y a veces interfieren con mis estudios',
      d: 'Tengo muchas y casi siempre interfieren con mis estudios',
    },
  },
];

export default preguntas;