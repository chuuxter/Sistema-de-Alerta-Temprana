const preguntas = [
  {
    id: 1,
    variable: 'genero',
    texto: 'Género:',
    opciones: {
      a: 'Hombre',
      b: 'Mujer',
    },
  },

  {
    id: 2,
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
    id: 3,
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
    id: 4,
    variable: 'estudia_fuera_horario',
    texto: '¿Sueles estudiar tus cursos fuera del horario escolar?',
    opciones: {
      a: 'Sí',
      b: 'No',
    },
  },

  {
    id: 5,
    variable: 'entorno_estudio',
    texto: '¿Cuentas con un entorno adecuado para tu estudio?',
    opciones: {
      a: 'Sí',
      b: 'No',
    },
  },

  {
    id: 6,
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
    id: 7,
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
    id: 8,
    variable: 'acceso_internet',
    texto:
      '¿Tienes acceso a internet en casa para realizar tareas y estudiar?',
    opciones: {
      a: 'Sí, tengo internet estable todo el tiempo',
      b: 'Sí, pero a veces se corta o es lento',
      c: 'Solo a veces (internet limitado)',
      d: 'No tengo acceso a internet en casa',
    },
  },

  {
    id: 9,
    variable: 'trabajo_fuera_horario',
    texto: '¿Trabajas fuera del horario escolar?',
    opciones: {
      a: 'No trabajo',
      b: 'Trabajo ocasionalmente (fines de semana o vacaciones)',
      c: 'Trabajo algunas horas entre semana',
      d: 'Trabajo todos los días después del colegio',
    },
  },

  {
    id: 10,
    variable: 'responsabilidades_domesticas',
    texto:
      '¿Tienes responsabilidades domésticas que interfieren con tu tiempo de estudio?',
    opciones: {
      a: 'No tengo responsabilidades domésticas significativas',
      b: 'Ayudo en casa pero no interfiere con mis estudios',
      c: 'Tengo bastantes responsabilidades que a veces interfieren',
      d: 'Tengo muchas responsabilidades que frecuentemente interfieren con mis estudios',
    },
  },
];

export default preguntas;