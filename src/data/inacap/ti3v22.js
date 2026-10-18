const courseData = {
    courseCode: "TI3V22",
    courseTitle: "Bases de Datos Estructuradas",
    courseDescription: "Asignatura enfocada en habilidades prácticas más que en teoría pura, lo cual es crucial para aplicaciones reales en tecnologías de información y ciberseguridad.",
    professorData: {
        name: "Eugenio Alberto Bravo García",
        email: "eugenio.bravo02@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Gestión de objetos de esquema'
        },
        { 
            unit: '2',
            description: 'Consultas avanzadas sobre una o más tablas'
        },
        { 
            unit: '3',
            description: 'Seguridad y programación con PL/SQL'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1,
            date: 'Lun 26, Ago 2024',
            weighting: '20%',
            description: [
                {
                    text: 'Evaluación 01-A',
                    href: 'eval01a'    
                },
                {
                    text: 'Evaluación 01-B',
                    href: 'eval01b'    
                },
            ],
            quickGuide: [
                {
                    text: 'Guía 01',
                    href: 'guia11'
                }
            ]
        },
        { 
            evaluationNumber: 2, 
            date: 'Lun 23, Sep 2024', 
            weighting: '30%', 
            description: [
                {
                    text: 'Evaluación 02-A',
                    href: 'eval02a'    
                },
                {
                    text: 'Evaluación 02-B',
                    href: 'eval02b'    
                },
            ],
        },
        { 
            evaluationNumber: 3, 
            date: 'Mar 08, Oct 2024', 
            weighting: '40%',
            description: [
                {
                    text: 'Evaluación 03-A',
                    href: 'eval03a'    
                },
                {
                    text: 'Evaluación 03-B',
                    href: 'eval03b'    
                },
            ],
            quickGuide: [
                {
                    text: 'Guía 01',
                    href: 'guia21'
                },
                {
                    text: 'Guía 02',
                    href: 'guia22'
                }
            ]
        },
        { 
            evaluationNumber: 4, 
            date: 'Mar 14, Oct 2024', 
            weighting: '10%', 
            description: {
                text: 'Promedio Evaluaciones'
            }
        }
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Lun 12, Ago 2024', 
            description: [
                {
                    text: 'Índices y Vistas',
                    href: 'clase01'
                }
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Mar 13, Ago 2024', 
            description: [
                {
                    text: 'Funciones y Procedimientos',
                    href: 'clase02'
                }
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Lun 19, Ago 2024', 
            description: [
                {
                    text: 'Ejercicios (1)'
                }
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Mar 20, Ago 2024', 
            description: [
                {
                    text: 'Ejercicios (2)'
                }
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Lun 26, Ago 2024', 
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
            week: '03', 
            class: '06', 
            date: 'Mar 27, Ago 2024', 
            description: [
                {
                    text: 'Revisión Evaluaciones'
                }
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Lun 02, Sep 2024', 
            description: [
                {
                    text: 'Introducción a Oracle Database',
                    href: 'clase07'
                }
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Mar 03, Sep 2024', 
            description: [
                {
                    text: 'Puntaje Adicional',
                    href: 'clase08'
                }
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Lun 09, Sep 2024', 
            description: [
                {
                    text: 'Consultas Complejas',
                    href: 'clase09'
                }
            ]
        },
        { 
            week: '05', 
            class: '10', 
            date: 'Mar 10, Sep 2024', 
            description: [
                {
                    text: 'Triggers, Tipos de Funciones',
                    href: 'clase10'
                }
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Lun 16, Sep 2024', 
            description: [
                {
                    text: 'Ejercicios',
                    href: 'clase11'
                }
            ]
        },
        { 
            week: '07', 
            class: '12', 
            date: 'Lun 23, Sep 2024', 
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
            week: '07', 
            class: '13', 
            date: 'Mar 24, Sep 2024', 
            description: [
                {
                    text: 'Revisión Evaluación 02'
                }
            ]
        },
        { 
            week: '08', 
            class: '14', 
            date: 'Lun 30, Sep 2024', 
            description: [
                {
                    text: 'Ejercicios PL/SQL (1)',
                    href: 'clase14'
                }
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Mar 01, Oct 2024', 
            description: [
                {
                    text: 'Ejercicios PL/SQL (2)'
                }
            ]
        },
        { 
            week: '09', 
            class: '16', 
            date: 'Lun 07, Oct 2024', 
            description: [
                {
                    text: 'Ejercicios PL/SQL (3)'
                }
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Mar 08, Oct 2024', 
            description: [
                {
                    text: 'Eval03-A',
                    href: 'eval03a'
                },
                {
                    text: 'Eval03-B',
                    href: 'eval03b'
                }
            ]
        }
    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Sáb 17, Ago 2024', 
            description: [
                {
                    text: 'Introducción a Oracle Database'
                }
            ]
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Sáb 17, Ago 2024', 
            description: [
                {
                    text: 'Consultas al diccionario de datos'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Sáb 24, Ago 2024', 
            description: [
                {
                    text: 'Creación y utilización de vistas simples y complejas'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '04', 
            date: 'Sáb 24, Ago 2024', 
            description: [
                {
                    text: 'Creación y utilización de secuencias'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '05', 
            date: 'Sáb 24, Ago 2024', 
            description: [
                {
                    text: 'Creación y utilización de índices no únicos y sinónimos'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '06', 
            date: 'Sáb 24, Ago 2024', 
            description: [
                {
                    text: 'Creación de objetos de esquema'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '07', 
            date: 'Sáb 31, Ago 2024', 
            description: [
                {
                    text: 'Funciones de una sola fila'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '08', 
            date: 'Sáb 31, Ago 2024', 
            description: [
                {
                    text: 'Funciones de conversión y expresiones condicionales'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '09', 
            date: 'Sáb 09, Sep 2024', 
            description: [
                {
                    text: 'Funciones de grupo y agrupamiento de filas'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '10', 
            date: 'Sáb 09, Sep 2024', 
            description: [
                {
                    text: 'Consulta sobre múltiples tablas usando uniones y autouniones'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '11', 
            date: 'Sáb 14, Sep 2024', 
            description: [
                {
                    text: 'Subconsultas de una sola fila y de varias filas'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '12', 
            date: 'Sáb 14, Sep 2024', 
            description: [
                {
                    text: 'Generación de consultas sobre tablas'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '13', 
            date: 'Sáb 21, Sep 2024', 
            description: [
                {
                    text: 'Conceptos de seguridad aplicable a las bases de datos'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '14', 
            date: 'Sáb 21, Sep 2024', 
            description: [
                {
                    text: 'Creación de usuarios y roles'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '15', 
            date: 'Sáb 28, Sep 2024', 
            description: [
                {
                    text: 'Privilegios de sistema y de objeto'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '16', 
            date: 'Sáb 28, Sep 2024', 
            description: [
                {
                    text: 'Creación de procedimientos PL/SQL'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '17', 
            date: 'Sáb 05, Oct 2024', 
            description: [
                {
                    text: 'Creación de triggers'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '18', 
            date: 'Sáb 05, Oct 2024', 
            description: [
                {
                    text: 'Auditoría en la base de datos utilizando triggers'
                }
            ]
        }
    ]
};

export default courseData;