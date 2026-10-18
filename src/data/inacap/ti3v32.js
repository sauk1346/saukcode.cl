const courseData = {
    courseCode: "TI3V32",
    courseTitle: "Bases de Datos No Estructuradas",
    courseDescription: "Bases de Datos no Estructuradas es una asignatura práctica, del área formativa de Tecnologías de Información y Ciberseguridad, dictada en modalidad presencial con componente online. Al finalizar, el estudiante será capaz de gestionar, manipular y consultar una base de datos no estructurada (NoSQL), considerando la Ética y Ciudadanía. Esta es una asignatura evaluativa, por lo que contempla una unidad final que tiene el objetivo de realizar una evaluación intermedia del Perfil de Egreso.",
    professorData: {
        name: "Eugenio Alberto Bravo García",
        email: "eugenio.bravo02@inacapmail.cl"
    },
    unitsData: [
        {
            unit: "1",
            description: "Introducción a las bases de datos no estructuradas"
        },
        {
            unit: "2",
            description: "Operaciones esenciales con MongoDB"
        },
        {
            unit: "3",
            description: "Búsqueda avanzada con MongoDB"
        },
        {
            unit: "4", 
            description: "Unidad integradora para evaluar la competencia"
        }
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1, 
            date: "Mié 26, Mar 2025", 
            weighting: "20%", 
            description: [
                {
                    text: "Evaluación 01-A",
                    href: "eval01a"    
                },
                {
                    text: "Evaluación 01-B",
                    href: "eval01b"    
                },
            ],
            quickGuide: [
                {
                    text: "Guía 01",
                    href: "guia11"
                }
            ]
        },
        { 
            evaluationNumber: 2, 
            date: "Mié 23, Abr 2025", 
            weighting: "40%",
            description: [
                {
                    text: "Evaluación 02-A",
                    href: "eval02a"    
                },
                {
                    text: "Evaluación 02-B",
                    href: "eval02b"    
                },
            ],
            quickGuide: [
                {
                    text: "Operators",
                    href: "guia2a"
                },
                {
                    text: "Regex",
                    href: "guia2b"
                },
                {
                    text: "Guía 01",
                    href: "guia21"
                },
                {
                    text: "Guía 02",
                    href: "guia22"
                },
                {
                    text: "Guía 03",
                    href: "guia23"
                },
                {
                    text: "Guía 04",
                    href: "guia24"
                },
                {
                    text: "Guía 05",
                    href: "guia25"
                },
                {
                    text: "Guía 06",
                    href: "guia26"
                },
                {
                    text: "Guía 07",
                    href: "guia27"
                },
                {
                    text: "Guía 08",
                    href: "guia28"
                },
                {
                    text: "Guía 09",
                    href: "guia29"
                }
            ]
        },
        {
            evaluationNumber: 3,
            date: "Mar 06, May 2025",
            weighting: "30%",
            description: [
                {
                    text: "Evaluación 03-C",
                    href: "eval03c"    
                },
                {
                    text: "Evaluación 03-D",
                    href: "eval03d"    
                },
            ],
        },
        {
            evaluationNumber: 4,
            date: "Mié 07, May 2025",
            weighting: "10%",
            description: {
                text: "Promedio Evaluaciones"
            }
        }
    ],
      
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Lun 10, Mar 2025', 
            description: [
                {
                    text: 'Introducción BD NoSQL',
                    href: 'clase01'
                }
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Mar 11, Mar 2025', 
            description: [
                {
                    text: 'Suspensión Clases',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '01', 
            class: '03', 
            date: 'Mié 12, Mar 2025', 
            description: [
                {
                    text: 'Ejercicios CRUD (1)'
                }
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Lun 17, Mar 2025', 
            description: [
                {
                    text: 'Ejercicios CRUD (2)',
                    href: 'clase04'
                }
            ]
        },
        { 
            week: '02', 
            class: '05', 
            date: 'Mar 18, Mar 2025', 
            description: [
                {
                    text: 'Ejercicios CRUD (3)'
                }
            ]
        },
        { 
            week: '02', 
            class: '06', 
            date: 'Mié 19, Mar 2025', 
            description: [
                {
                    text: 'Ejercicios CRUD (4)'
                }
            ]
        },
        { 
            week: '03', 
            class: '07', 
            date: 'Lun 24, Mar 2025', 
            description: [
                {
                    text: 'MongoDB Shell',
                    href: 'clase07'
                }
            ]
        },
        { 
            week: '03', 
            class: '08', 
            date: 'Mar 25, Mar 2025', 
            description: [
                {
                    text: 'Ejercicio con puntaje',
                    href: 'clase08'
                }
            ]
        },
        { 
            week: '03', 
            class: '09', 
            date: 'Mié 26, Mar 2025', 
            description: [
                {
                    text: 'Eval01-A',
                    href: 'eval01a'
                },
                {
                    text: 'Eval01-B',
                    href: 'eval01b'
                }
            ]
        },
        { 
            week: '04', 
            class: '10', 
            date: 'Lun 31, Mar 2025', 
            description: [
                {
                    text: 'Ejercicios MongoSh 01',
                    href: 'clase10'
                }
            ]
        },
        { 
            week: '04', 
            class: '11', 
            date: 'Mar 01, Abr 2025', 
            description: [
                {
                    text: 'Guía 01',
                    href: 'guia21'
                }
            ]
        },
        { 
            week: '04', 
            class: '12', 
            date: 'Mié 02, Abr 2025', 
            description: [
                {
                    text: 'Guía 02',
                    href: 'guia22'
                }
            ]
        },
        { 
            week: '05', 
            class: '13', 
            date: 'Lun 07, Abr 2025', 
            description: [
                {
                    text: 'Guía 03',
                    href: 'guia23'
                }
            ]
        },
        { 
            week: '05', 
            class: '14', 
            date: 'Mar 08, Abr 2025', 
            description: [
                {
                    text: 'Visita a Data Center Didáctico'
                }
            ]
        },
        { 
            week: '05', 
            class: '15', 
            date: 'Mié 09, Abr 2025', 
            description: [
                {
                    text: 'Guía 04',
                    href: 'guia24'
                }
            ]
        },
        { 
            week: '06', 
            class: '16', 
            date: 'Lun 14, Abr 2025', 
            description: [
                {
                    text: 'Guía 05',
                    href: 'guia25'
                }
            ]
        },
        { 
            week: '06', 
            class: '17', 
            date: 'Mar 15, Abr 2025', 
            description: [
                {
                    text: 'Guía 06',
                    href: 'guia26'
                }
            ]
        },
        { 
            week: '06', 
            class: '18', 
            date: 'Mié 16, Abr 2025', 
            description: [
                {
                    text: 'Guía 07',
                    href: 'guia27'
                }
            ]
        },
        { 
            week: '07', 
            class: '19', 
            date: 'Lun 21, Abr 2025', 
            description: [
                {
                    text: 'Guía 08',
                    href: 'guia28'
                }
            ]
        },
        { 
            week: '07', 
            class: '20', 
            date: 'Mar 22, Abr 2025', 
            description: [
                {
                    text: 'Guía 09',
                    href: 'guia29'
                }
            ]
        },
        { 
            week: '07', 
            class: '21', 
            date: 'Mié 23, Abr 2025', 
            description: [
                {
                    text: 'Eval02-A',
                    href: 'eval02a'
                },
                {
                    text: 'Eval02-B',
                    href: 'eval02b'
                }
            ]
        },
        { 
            week: '08', 
            class: '22', 
            date: 'Lun 28, Abr 2025', 
            description: [
                {
                    text: 'Python, MongoDB y APIs',
                    href: 'clase22'
                }
            ]
        },
        { 
            week: '08', 
            class: '23', 
            date: 'Mar 29, Abr 2025', 
            description: [
                {
                    text: 'Guía 10',
                    href: 'guia31'
                }
            ]
        },
        { 
            week: '08', 
            class: '24', 
            date: 'Mié 30, Abr 2025', 
            description: [
                {
                    text: 'Suspensión Clases',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '09', 
            class: '25', 
            date: 'Lun 05, May 2025', 
            description: [
                {
                    text: 'Guía 11',
                    href: 'guia32'
                }
            ]
        },
        { 
            week: '09', 
            class: '26', 
            date: 'Mar 06, May 2025', 
            description: [
                {
                    text: 'Eval03-C',
                    href: 'eval03c'
                },
                {
                    text: 'Eval03-D',
                    href: 'eval03d'
                }
            ]
        },
        { 
            week: '09', 
            class: '27', 
            date: 'Mié 07, May 2025', 
            description: [
                {
                    text: 'Consultas y Cierre de Notas'
                }
            ]
        }
    ],

    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Sáb 15, Mar 2025', 
            description: [
                {
                    text: 'Introducción a las bases de datos no estructuradas',
                    href: 'docs/lectura01.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Sáb 15, Mar 2025', 
            description: [
                {
                    text: 'Bases de datos no estructuradas: características y tipos',
                    href: 'lectura02'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Sáb 22, Mar 2025', 
            description: [
                {
                    text: 'Elementos de las bases de datos no estructuradas documentales y características de Mongo DB',
                    href: 'lectura03'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '04', 
            date: 'Sáb 29, Mar 2025', 
            description: [
                {
                    text: 'Operdores esenciales con MongoDB',
                    href: 'docs/lectura04.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '03', 
            lecture: '05', 
            date: 'Sáb 29, Mar 2025', 
            description: [
                {
                    text: 'Etapas del proceso de instalación de MongoDB y principales comandos de gestión',
                    href: 'lectura05'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '06', 
            date: 'Sáb 05, Abr 2025', 
            description: [
                {
                    text: 'Operaciones CRUD en documentos y subdocumentos',
                    href: 'lectura06'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '07', 
            date: 'Sáb 12, Abr 2025', 
            description: [
                {
                    text: 'Búsqueda avanzada con MongoDB',
                    href: 'docs/lectura07.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '05', 
            lecture: '08', 
            date: 'Sáb 12, Abr 2025', 
            description: [
                {
                    text: 'Selección de filtros y condiciones según requerimientos de búsqueda',
                    href: 'lectura08'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '09', 
            date: 'Sáb 19, Abr 2025', 
            description: [
                {
                    text: 'Busqueda avanzada usando expresiones regulares',
                    href: 'lectura09'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '10', 
            date: 'Sáb 26, Abr 2025', 
            description: [
                {
                    text: 'Comandos de búsqueda en subdocumentos con iteración y asociaciones lógicas',
                    href: 'lectura10'
                }
            ]
        }
    ]
};

export default courseData;