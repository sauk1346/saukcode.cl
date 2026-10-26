const courseData = {
  courseCode: "TI3V61",
  courseTitle: "Minería de Datos",
  courseDescription: "Minería de datos es una asignatura práctica del área formativa de especialidad de Tecnologías de Información y Ciberseguridad, dictada en modalidad semipresencial. Al finalizar, el estudiante será capaz de aplicar herramientas y técnicas para generar conocimiento, a través de un proceso de descubrimiento y extracción de información, considerando la Ética y la Ciudadanía.",
  professorData: {
    name: "Alejandro Hernán Cuevas Rivero",
    email: "alejandro.cuevas04@inacapmail.cl"
  },
  unitsData: [
    { 
      unit: '1',
      description: 'Fundamentos de la minería de datos'
    },
    { 
      unit: '2',
      description: 'Análisis estadístico y descriptivo de los datos'
    },
    { 
      unit: '3',
      description: 'Procesamiento y análisis de datos'
    },
  ],
  evaluationsData: [
    {
      evaluationNumber: 1,
      date: 'Jue 05, Nov 2026',
      weighting: '15%',
      description: {
        text: '',
        href: '',
      }
    },
    {
      evaluationNumber: 2,
      date: 'Jue 03, Dic 2026',
      weighting: '35%',
      description: {
        text: '',
        href: '',
      }
    },
    {
      evaluationNumber: 3,
      date: 'Jue 17, Dic 2026',
      weighting: '35%',
      description:[ 
        {
          text: '',
          href: '',
        },
      ]
    },
    {
      evaluationNumber: 4,
      date: 'Sáb 19, Dic 2026',
      weighting: '15%',
      description: [
        {
          text: 'Evaluación Diagnóstica',
          href: 'diagnostica',
        },
        {
          text: 'Controles',
          href: '',
        },
      ]
        
    },
  ],
  classData: [
    { 
      week: '01', 
      class: '01', 
      date: 'Lun 19, Oct 2026', 
      description: [
        {
          text: 'Introducción a Minería de Datos',
          href: 'clase01'
        }
      ]
    },
    { 
      week: '01', 
      class: '02', 
      date: 'Jue 22, Oct 2026', 
      description: [
        {
          text: 'no asistí',
          strikethrough: true
        }
      ]
    },
    { 
      week: '02', 
      class: '03', 
      date: 'Lun 26, Oct 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '02', 
      class: '04', 
      date: 'Jue 29, Oct 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '03', 
      class: '05', 
      date: 'Lun 02, Nov 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '03', 
      class: '06', 
      date: 'Jue 05, Nov 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '04', 
      class: '07', 
      date: 'Lun 09, Nov 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '04', 
      class: '08', 
      date: 'Jue 12, Nov 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '05', 
      class: '09', 
      date: 'Lun 16, Nov 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '05', 
      class: '10', 
      date: 'Jue 19, Nov 2026', 
      description: [
        {
          text: '',
          href: ''
        }
      ]
    },
    { 
      week: '06', 
      class: '11', 
      date: 'Lun 23, Nov 2026', 
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
      date: 'Lun 30, Nov 2026', 
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
      date: 'Lun 07, Dic 2026', 
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
      date: 'Lun 14, Dic 2026', 
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
  lectureData: [
    { 
      week: '01', 
      lecture: '01', 
      date: 'Dom 25, Oct 2026', 
      description: {
          text: 'Fundamentos de la minería de datos',
          href: 'docs/lectura01.pdf'
      }
    },
    { 
      week: '01', 
      lecture: '02', 
      date: 'Dom 25, Oct 2026', 
      description: {
          text: 'Datos en todas partes: el origen de la minería de datos',
          href: 'lectura02'
      }
    },
    { 
      week: '02', 
      lecture: '03', 
      date: 'Dom 01, Nov 2026', 
      description: {
          text: 'Precedir o describir: dos miradas para entender los datos y datos limpios, decisiones certeras',
          href: ''
      }
    },
    { 
      week: '03', 
      lecture: '04', 
      date: 'Dom 08, Nov 2026', 
      description: {
          text: 'R como aliado: tus primeros pasos en estadística',
          href: ''
      }
    },
    { 
      week: '04', 
      lecture: '05', 
      date: 'Dom 15, Nov 2026', 
      description: {
          text: 'El origen de la minería de datos - De lo crudo a lo útil',
          href: ''
      }
    },
    { 
      week: '05', 
      lecture: '06', 
      date: 'Dom 22, Nov 2026', 
      description: {
          text: 'Describir para comprender: Análisis descriptivo en R',
          href: ''
      }
    },
    { 
      week: '06', 
      lecture: '07', 
      date: 'Dom 29, Nov 2026', 
      description: {
          text: 'Anticipar el futuro: regresión y predicción en R',
          href: ''
      }
    },
    { 
      week: '07', 
      lecture: '08', 
      date: 'Dom 06, Dic 2026', 
      description: {
          text: 'El arsenal analítico: técnicas que transforman datos, normas ISO y marcos de referencia',
          href: ''
      }
    },
    { 
      week: '08', 
      lecture: '09', 
      date: 'Dom 13, Dic 2026', 
      description: {
          text: 'Normas en acción: analítica con estándares e inferencia estadística en R',
          href: ''
      }
    },
    { 
      week: '09', 
      lecture: '10', 
      date: 'Dom 20, Dic 2026', 
      description: {
          text: 'Datos que hablan: interpretar resultados con criterio',
          href: ''
      }
    },
  ]
};

export default courseData;