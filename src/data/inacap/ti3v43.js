const courseData = {
    courseCode: "TI3V43",
    courseTitle: "Ingeniería de Software",
    courseDescription: "Ingeniería de software es una asignatura lectiva, del área formativa de especialidad de Tecnologías de Información y Ciberseguridad, dictada en modalidad semipresencial. Al finalizar, el estudiante será capaz de analizar procesos clave del desarrollo software, contemplando la planificación de proyectos, evaluando sistemas de software y proponiendo medidas de mitigación de riesgo, considerando el Trabajo Colaborativo y la Comunicación.",
    professorData: {
        name: "Eugenio Alberto Bravo García",
        email: "eugenio.bravo02@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Introducción a la ingeniería de software'
        },
        { 
            unit: '2',
            description: 'Co-creación, patrones y requerimientos del software'
        },
        { 
            unit: '3',
            description: 'Implementación, pruebas y calidad de software'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1,
            date: 'Lun 01, Sep 2025',
            weighting: '20%',
            description: {
                text: 'Prueba escrita',
                href: 'eval01'
            },
            quickGuide: [
                {
                    text: 'Evaluación Diagnóstica',
                    href: 'diagnostica'
                },
                {
                    text: 'Guía 00: Resumen',
                    href: 'guia00'
                },
                {
                    text: 'Guía 01',
                    href: 'guia01'
                },
                {
                    text: 'Guía 02',
                    href: 'guia02'
                },
                {
                    text: 'Guía 03',
                    href: 'guia03'
                },
            ]  
        },
        { 
            evaluationNumber: 2,
            date: 'Jue 02, Oct 2025',
            weighting: '65%',
            description: {
                text: 'Proyecto grupal',
                href: 'eval02'
            },
        },
        { 
            evaluationNumber: 3,
            date: 'Lun 06, Oct 2025',
            weighting: '15%',
            description: {
                text: 'Promedio evaluaciones',
                href: ''
            },
        },
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Lun 11, Ago 2025', 
            description: [
                {
                    text: 'Introducción asignatura',
                    href: 'docs/clase01.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Jue 14, Ago 2025', 
            description: [
                {
                    text: 'Modelos de Ciclos de Vida',
                    href: 'docs/clase02.pdf'
                },
                {
                    text: 'Apuntes',
                    href: 'clase02'
                },

            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Lun 18, Ago 2025', 
            description: [
                {
                    text: 'Suspensión clases',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Jue 21, Ago 2025', 
            description: [
                {
                    text: 'Estándares de calidad',
                    href: 'docs/clase04.pdf'
                },
                {
                    text: 'Apuntes',
                    href: 'clase04'
                },
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Lun 25, Ago 2025', 
            description: [
                {
                    text: 'Requerimientos del Software',
                    href: 'docs/clase05.pdf'
                },
                {
                    text: 'Apuntes',
                    href: 'clase05'
                },
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Jue 28, Ago 2025', 
            description: [
                {
                    text: 'Modelado UML',
                    href: 'docs/clase06.pdf'
                }
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Lun 01, Sep 2025', 
            description: [
                {
                    text: 'Evaluación 01',
                    href: 'eval01'
                }
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Jue 04, Sep 2025', 
            description: [
                {
                    text: 'No asistí',
                    strikethrough: true 
                }
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Lun 08, Sep 2025', 
            description: [
                {
                    text: 'No asistí',
                    strikethrough: true 
                }
            ]
        },
        { 
            week: '05', 
            class: '10', 
            date: 'Jue 11, Sep 2025', 
            description: [
                {
                    text: 'Suspensión clases: 11 sept',
                    strikethrough: true 
                }
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Lun 15, Sep 2025', 
            description: [
                {
                    text: 'No asistí',
                    strikethrough: true 
                }
            ]
        },
        { 
            week: '06', 
            class: '12', 
            date: 'Jue 18, Sep 2025', 
            description: [
                {
                    text: 'Suspensión clases: Fiesta patrias',
                    strikethrough: true 
                }
            ]
        },
        { 
            week: '07', 
            class: '13', 
            date: 'Lun 22, Sep 2025', 
            description: [
                {
                    text: 'Suspensión clases: Comunicado',
                    strikethrough: true 
                }
            ]
        },
        { 
            week: '07', 
            class: '14', 
            date: 'Jue 25, Sep 2025', 
            description: [
                {
                    text: 'Avance Informe',
                     
                }
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Lun 29, Sep 2025', 
            description: [
                {
                    text: 'Evaluación 02: Disertación (1)',
                     
                }
            ]
        },
        { 
            week: '08', 
            class: '16', 
            date: 'Jue 02, Oct 2025', 
            description: [
                {
                    text: 'Evaluación 02: Disertación (2)',
                    href: 'eval02' 
                }
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Lun 06, Oct 2025', 
            description: [
                {
                    text: 'Cierre de Notas',
                    href: '' 
                }
            ]
        },
    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Sáb 16, Ago 2025', 
            description: {
                text: 'Introducción a la Ingeniería de software',
                href: 'docs/lectura01.pdf',
            }
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Sáb 16, Ago 2025', 
            description: {
                text: 'Fundamentos de la Ingeniería de software',
                href: 'lectura02'
            }
        },
        { 
            week: '01', 
            lecture: '03', 
            date: 'Sáb 16, Ago 2025', 
            description: {
                text: 'Teoría general de sistemas en la ingeniería de software',
                href: 'lectura03',   
            }
        },
        { 
            week: '02', 
            lecture: '04', 
            date: 'Sáb 23, Ago 2025', 
            description: {
                text: 'Modelos y metodologías de desarrollo de software',
                href: 'lectura04',
            }
        },
        { 
            week: '02', 
            lecture: '05', 
            date: 'Sáb 23, Ago 2025', 
            description: {
                text: 'Estándares de calidad en la ingeniería de software',
                href: 'lectura05',
            }
        },
        { 
            week: '03', 
            lecture: '06', 
            date: 'Sáb 30, Ago 2025', 
            description: {
                text: 'Co-creación, patrones y requerimientos del software',
                href: 'docs/lectura06.pdf',
            }
        },
        { 
            week: '03', 
            lecture: '07', 
            date: 'Sáb 30, Ago 2025', 
            description: {
                text: 'Introducción a los ciclos de vida y metodologías de desarrollo de software',
                href: 'lectura07',
            }
        },
        { 
            week: '03', 
            lecture: '08', 
            date: 'Sáb 30, Ago 2025', 
            description: {
                text: 'Técnicas de levantamiento de requerimientos y co-creación',
                href: 'lectura08',
            }
        },
        { 
            week: '04', 
            lecture: '09', 
            date: 'Sáb 06, Sep 2025', 
            description: {
                text: 'Patrones de diseño de software',
                href: 'lectura09',
            }
        },
        { 
            week: '04', 
            lecture: '10', 
            date: 'Sáb 06, Sep 2025', 
            description: {
                text: 'Diagramas UML para modelado de sistemas',
                href: 'lectura10',
            }
        },
        { 
            week: '05', 
            lecture: '11', 
            date: 'Sáb 13, Sep 2025', 
            description: {
                text: 'Estándares de calidad en software',
                href: 'lectura11',
            }
        },
        { 
            week: '05', 
            lecture: '12', 
            date: 'Sáb 13, Sep 2025', 
            description: {
                text: 'Integración y revisión de proyecto',
                href: 'lectura12',
            }
        },
        { 
            week: '06', 
            lecture: '13', 
            date: 'Sáb 20, Sep 2025', 
            description: {
                text: 'Implementación, Pruebas y Calidad de Software',
                href: 'docs/lectura13.pdf',
            }
        },
        { 
            week: '06', 
            lecture: '14', 
            date: 'Sáb 20, Sep 2025', 
            description: {
                text: 'Introducción a SaaS, IaaS, y Cloud Computing',
                href: 'lectura14',
            }
        },
        { 
            week: '06', 
            lecture: '15', 
            date: 'Sáb 20, Sep 2025', 
            description: {
                text: 'Sistemas distribuidos y mensajería P2P',
                href: 'lectura15',
            }
        },
        { 
            week: '07', 
            lecture: '16', 
            date: 'Sáb 27, Sep 2025', 
            description: {
                text: 'Normativa y ética en la confiabilidad de software',
                href: 'lectura16',
            }
        },
        { 
            week: '07', 
            lecture: '17', 
            date: 'Sáb 27, Sep 2025', 
            description: {
                text: 'Desarrollo de prototipos según requisitos de proyecto',
                href: 'lectura17',
            }
        },
        { 
            week: '08', 
            lecture: '18', 
            date: 'Sáb 04, Oct 2025', 
            description: {
                text: 'Modelado de sistemas mediante diagramas UML',
                href: 'lectura18',
            }
        },
        { 
            week: '08', 
            lecture: '19', 
            date: 'Sáb 04, Oct 2025', 
            description: {
                text: 'Pruebas de testing y estándares de calidad',
                href: 'lectura19',
            }
        },
        { 
            week: '09', 
            lecture: '20', 
            date: 'Sáb 11, Oct 2025', 
            description: {
                text: 'Síntesis teórica con ideas fuerza de la unidad',
                href: '',
            }
        },
        
    ]
};

export default courseData;