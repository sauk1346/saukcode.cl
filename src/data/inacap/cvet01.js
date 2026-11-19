const courseData = {
  courseCode: "CVET01",
  courseTitle: "Estadística",
  courseDescription: "Estadística es una asignatura de carácter lectiva del área de formación de Ciencias Básicas, dictada de forma semipresencial. Al finalizar, el estudiante será capaz de integrar el análisis de datos univariado, bivariado, la regresión lineal simple, las habilidades del siglo XXI y el uso de herramientas tecnológicas, en contexto personal, ocupacional, social y científico, considerando el Trabajo Colaborativo; Competencias Habilitantes; Resolución de Problemas, Innovación y Emprendimiento.",
  professorData: {
    name: "Carolina Valeria Gómez Bravo",
    email: "carolina.gomez27@inacapmail.cl"
  },
  unitsData: [
    { 
      unit: '1',
      description: 'Análisis descriptivo de datos univariados'
    },
    { 
      unit: '2',
      description: 'Análisis descriptivo de datos bivariados'
    },
    { 
      unit: '3',
      description: 'Regresión lineal simple'
    },
  ],
  evaluationsData: [
    {
      evaluationNumber: 1,
      date: 'Jue 05, Nov 2026',
      weighting: '20%',
      description: {
        text: '',
        href: '',
      }
    },
    {
      evaluationNumber: 2,
      date: 'Jue 19, Nov 2026',
      weighting: '30%',
      description: {
        text: '',
        href: '',
      }
    },
    {
      evaluationNumber: 3,
      date: 'Jue 10, Dic 2026',
      weighting: '40%',
      description:[ 
        {
          text: '',
          href: '',
        },
      ]
    },
    {
      evaluationNumber: 4,
      date: 'Mar 15, Dic 2026',
      weighting: '10%',
      description: [
        {
          text: '',
          href: '',
        },
      ]
        
    },
  ],
  // Pestaña «Laboratorio»: material de repaso que condensa el ramo
  labData: [
    {
      title: 'Excel para Estadística',
      href: 'laboratorio',
      meta: 'Unidades 1 y 2',
      description: 'Las siete actividades tecnológicas en láminas: los conceptos, los pasos en Excel con sus capturas y un resumen de comandos.',
    },
  ],
  classData: [
    { 
      week: '01', 
      class: '01', 
      date: 'Mar 20, Oct 2026', 
      description: [
        {
          text: 'Suspensión Clases: Comunicado Sede',
          strikethrough: true
        }
      ]
    },
    { 
      week: '01', 
      class: '02', 
      date: 'Jue 22, Oct 2026', 
      description: [
        {
          text: 'AT01: Tablas de frecuencia en Excel',
          href: 'docs/unit01-at01.pdf'
        },
        {
          text: 'AT02: Gráficos en Excel',
          href: 'at12'
        },
        {
          text: 'ARPA01: Selección de Personal',
          href: 'arpa11'
        },
      ]
    },
    { 
      week: '02', 
      class: '03', 
      date: 'Mar 27, Oct 2026', 
      description: [
        {
          text: 'AT03: Medidas de tendencia central en Excel',
          href: 'at13'
        },
        {
          text: 'SM01: Radiografía de la matrícula en la educación superior chilena',
          href: 'sm11'
        },
                
      ]
    },
    { 
      week: '02', 
      class: '04', 
      date: 'Jue 29, Oct 2026', 
      description: [
        
        {
          text: 'AT04: Medidas de dispersión en Excel',
          href: 'at14'
        },
        {
          text: 'SM02: ¿Dónde abrir la nueva sucursal?',
          href: 'sm12'
        },
      ]
    },
    { 
      week: '03', 
      class: '05', 
      date: 'Mar 03, Nov 2026', 
      description: [
        {
          text: 'AT05: Medidas de posición en Excel',
          href: 'at15'
        },
        {
          text: 'SM03: ¿Dónde se espera menos para ser atendido?',
          href: 'sm13'
        },
      ]
    },
    { 
      week: '03', 
      class: '06', 
      date: 'Jue 05, Nov 2026', 
      description: [
        {
          text: 'Evaluación 01',
          href: ''
        }
      ]
    },
    { 
      week: '04', 
      class: '07', 
      date: 'Mar 10, Nov 2026', 
      description: [
        {
          text: 'AT01: Tablas y gráficos bivariados en Excel',
          href: 'at21'
        },
        {
          text: 'ARPA01: Encuesta regional de escolaridad',
          href: 'arpa21'
        },
        {
          text: 'SM01: Explorando la oferta académica 2025',
          href: 'sm21'
        },
      ]
    },
    { 
      week: '04', 
      class: '08', 
      date: 'Jue 12, Nov 2026', 
      description: [
        {
          text: 'AT02: Medidas en datos bivariados en Excel',
          href: 'docs/unit02-at02.pdf'
        },
        {
          text: 'SM02: ¿Cómo se reparte y se comporta el mercado?',
          href: 'sm22'
        },
      ]
    },
    { 
      week: '05', 
      class: '09', 
      date: 'Mar 17, Nov 2026', 
      description: [
        {
          text: '',
          href: ''
        },
        {
          text: '',
          href: ''
        },
      ]
    },
    { 
      week: '05', 
      class: '10', 
      date: 'Jue 19, Nov 2026', 
      description: [
        {
          text: 'Evaluación 02',
          href: ''
        },
      ]
    },
    { 
      week: '06', 
      class: '11', 
      date: 'Mar 24, Nov 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '06', 
      class: '12', 
      date: 'Jue 26, Nov 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '07', 
      class: '13', 
      date: 'Mar 01, Dic 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '07', 
      class: '14', 
      date: 'Jue 03, Dic 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '08', 
      class: '15', 
      date: 'Mar 08, Dic 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '08', 
      class: '16', 
      date: 'Jue 10, Dic 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '09', 
      class: '17', 
      date: 'Mar 15, Dic 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '09', 
      class: '18', 
      date: 'Jue 17, Dic 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
  ],
};

export default courseData;