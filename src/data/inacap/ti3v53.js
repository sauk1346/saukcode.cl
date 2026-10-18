const courseData = {
    courseCode: "TI3V53",
    courseTitle: "Arquitectura Multi Cloud",
    courseDescription: "Arquitectura Multicloud es una asignatura práctica, del área formativa de Tecnologías de la Información y Ciberseguridad, dictada en modalidad presencial. Al finalizar, el estudiante será capaz de tomar decisiones de implementación de sistemas basados en diferentes nubes, diseño de soluciones con alta disponibilidad y redundancia, considerando la Resolución de Problemas, Innovación y Emprendimiento.",
    professorData: {
        name: "Alejandro Hernán Cuevas Rivero",
        email: "alejandro.cuevas04@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Fundamentos de Cloud Computing'
        },
        { 
            unit: '2',
            description: 'Arquitectura Cloud Computing'
        },
        { 
            unit: '3',
            description: 'Aplicaciones de Cloud Computing y Ciberseguridad'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1,
            date: 'Jue 02, Abr 2026',
            weighting: '20%', 
            description: [
                {
                    text: 'Evaluación 01',
                    href: 'eval01'
                },
                {
                    text: 'Tarea Kudafit (opcional)',
                    href: 'docs/Informe-Kudafit.pdf'
                },
            ]                
        },
        { 
            evaluationNumber: 2,
            date: 'Mar 14, Abr 2026',
            weighting: '30%', 
            description: [
                {
                    text: 'Actividad 01',
                    href: 'docs/Actividad01.pdf'
                },
                {
                    text: 'Actividad 02',
                    href: 'docs/Actividad02.pdf'
                },
            ]
        },
        { 
            evaluationNumber: 3,
            date: 'Jue 23, Abr 2026',
            weighting: '35%', 
            description: [
                {
                    text: 'Actividad 03',
                    href: 'docs/Actividad03.pdf'
                },
                {
                    text: 'Actividad 04',
                    href: 'docs/Actividad04.pdf'
                },
            ]
        },
        { 
            evaluationNumber: 4,
            date: '',
            weighting: '15%', 
            description: [
                {
                    text: 'Evaluación Diagnóstica',
                    href: 'diagnostica'
                },
                {
                    text: 'Controles',
                    href: 'controles'
                },
                
            ]
            
        }
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Mié 11, Mar 2026', 
            description: [
                {
                    text: 'AWS: Conceptos de la nube',
                    href: 'docs/modulo01.pdf'
                },
                {
                    text: 'AWS: Economía y facturación de la nube',
                    href: 'docs/modulo02.pdf'
                }
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Jue 12, Mar 2026', 
            description: [
                {
                    text: 'AWS: Infraestructura global de AWS',
                    href: 'docs/modulo03.pdf'
                },
                {
                    text: 'AWS: Seguridad en la nube de AWS',
                    href: 'docs/modulo04.pdf'
                },
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Mié 18, Mar 2026', 
            description: [
                {
                    text: 'AWS: Redes y entrega de contenido',
                    href: 'docs/modulo05.pdf'
                },
                {
                    text: 'AWS: Cómputo',
                    href: 'docs/modulo06.pdf'
                },
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Jue 19, Mar 2026', 
            description: [
                {
                    text: 'AWS: Almacenamiento',
                    href: 'docs/modulo07.pdf'
                },
                {
                    text: 'AWS: Bases de datos',
                    href: 'docs/modulo08.pdf'
                },
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Mié 25, Mar 2026', 
            description: [
                {
                    text: 'AWS: Arquitectura en la nube',
                    href: 'docs/modulo09.pdf'
                },
                {
                    text: 'AWS: Monitoreo y escalado automático',
                    href: 'docs/modulo10.pdf'
                },
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Jue 26, Mar 2026', 
            description: [
                {
                    text: 'Cuestionario de práctica (1)',
                    href: ''
                }
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Mié 01, Abr 2026', 
            description: [
                {
                    text: 'Cuestionario de práctica (2)',
                    href: ''
                }
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Jue 02, Abr 2026', 
            description: [
                {
                    text: 'Evaluación 01',
                    href: 'eval01'
                },
                {
                    text: 'Instrucciones Tarea Investigación (opcional)',
                    href: 'docs/TareaKudafit.pdf'
                },

            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Mié 08, Abr 2026', 
            description: [
                {
                    text: 'Instrucciones Evaluación 02 (Actividad 01)',
                    href: 'docs/Instrucciones-Actividad01.pdf'
                }
            ]
        },
        { 
            week: '05', 
            class: '10', 
            date: 'Jue 09, Abr 2026', 
            description: [
                {
                    text: 'Instrucciones Evaluación 02 (Actividad 02)',
                    href: 'docs/Instrucciones-Actividad02.pdf'
                }
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Mié 15, Abr 2026', 
            description: [
                {
                    text: 'Instrucciones Evaluación 03 (Actividad 03)',
                    href: 'docs/Instrucciones-Actividad03.pdf'
                }
            ]
        },
        { 
            week: '06', 
            class: '12', 
            date: 'Jue 16, Abr 2026', 
            description: [
                {
                    text: 'Suspensión Clases: Comunicado profesor',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '07', 
            class: '13', 
            date: 'Mié 22, Abr 2026', 
            description: [
                {
                    text: 'Instrucciones Evaluación 03 (Actividad 04)',
                    href: 'docs/Instrucciones-Actividad04.pdf'
                }
            ]
        },
        { 
            week: '07', 
            class: '14', 
            date: 'Jue 23, Abr 2026', 
            description: [
                {
                    text: 'No asistí',
                    strikethrough: true,
                }
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Mié 29, Abr 2026', 
            description: [
                {
                    text: 'Revisión Evaluación 02 (1)',
                    href: '',
                }
            ]
        },
        { 
            week: '08', 
            class: '16', 
            date: 'Jue 30, Abr 2026', 
            description: [
                {
                    text: 'Revisión Evaluación 02 (2)',
                    href: '',
                }
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Mié 06, May 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '09', 
            class: '18', 
            date: 'Jue 07, May 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '10', 
            class: '19', 
            date: 'Mar 12, May 2026', 
            description: [
                {
                    text: 'Clase Recuperativa',
                    href: '',
                }
            ]
        },
        { 
            week: '10', 
            class: '20', 
            date: 'Mié 13, May 2026', 
            description: [
                {
                    text: 'Cierre de Notas',
                    href: '',
                }
            ]
        },
    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Dom 15, Mar 2026', 
            description: [
                {
                    text: 'Resumen Unidad 1',
                    href: 'docs/lectura01.pdf'
                }
            ]
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Dom 15, Mar 2026', 
            description: [
                {
                    text: 'Fundamentos de Cloud Computing: La Nube actual',
                    href: 'lectura02'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Dom 22, Mar 2026', 
            description: [
                {
                    text: 'Aprovisionamiento seguro en la nube: estrategias y normativas',
                    href: 'lectura03'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '04', 
            date: 'Dom 29, Mar 2026', 
            description: [
                {
                    text: 'Resumen Unidad 2',
                    href: 'docs/lectura04.pdf'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '05', 
            date: 'Dom 29, Mar 2026', 
            description: [
                {
                    text: 'Fundamentos de la Arquitectura en Cloud Computing',
                    href: 'lectura05'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '06', 
            date: 'Dom 05, Abr 2026', 
            description: [
                {
                    text: 'Fiabilidad en entornos Cloud: Diseño para la Alta Disponibilidad',
                    href: 'lectura06'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '07', 
            date: 'Dom 12, Abr 2026', 
            description: [
                {
                    text: 'Diseño Estratégico de Pruebas en Cloud Computing',
                    href: 'lectura07'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '08', 
            date: 'Dom 19, Abr 2026', 
            description: [
                {
                    text: 'Resumen Unidad 3',
                    href: 'docs/lectura08.pdf'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '09', 
            date: 'Dom 19, Abr 2026', 
            description: [
                {
                    text: 'Protegiendo nuestros datos: protocolos esenciales en la nube',
                    href: 'lectura09'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '10', 
            date: 'Dom 26, Abr 2026', 
            description: [
                {
                    text: 'Asegurando el acceso: protocolos de protección de cuentas',
                    href: 'lectura10'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '11', 
            date: 'Dom 03, May 2026', 
            description: [
                {
                    text: 'Servicios de seguridad cloud: aplicación y análisis estratégico',
                    href: 'lectura11'
                }
            ]
        },
        { 
            week: '09', 
            lecture: '12', 
            date: 'Dom 10, May 2026', 
            description: [
                {
                    text: 'Procedimientos de auditoría en arquitecturas cloud',
                    href: 'lectura12'
                }
            ]
        },

    ]
};

export default courseData;