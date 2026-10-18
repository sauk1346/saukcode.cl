const courseData = {
    courseCode: "TI3V23",
    courseTitle: "Metodología de Desarrollo Ágil",
    courseDescription: "Asignatura lectiva, dictada en modalidad semipresencial. Al finalizar, el estudiante será capaz de implementar metodologías ágiles en proyectos de gran escala a través del uso de framework SCRUM, considerando el Trabajo Colaborativo y Comunicación.",
    professorData: {
        name: "José Luis Alberto Ramírez Ruiz",
        email: "jose.ramirez26@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Fundamentos de Metodologías Ágiles'
        },
        { 
            unit: '2',
            description: 'Metodología Ágil SCRUM'
        },
        { 
            unit: '3',
            description: 'Desarrollo de Proyectos de TI aplicando SCRUM'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1, 
            date: 'Lun 04, Nov 2024', 
            weighting: '20% * 75%', 
            description: {
                text: 'Evaluación 01'
            }
        },
        { 
            evaluationNumber: 2, 
            date: 'Vie 29, Nov 2024', 
            weighting: '35% * 75%', 
            description: {
                text: 'Informe 01',
                href: 'docs/informe01.pdf',
                external: true
            }
        },
        { 
            evaluationNumber: 3, 
            date: 'Lun 09, Dic 2024', 
            weighting: '35% * 75%', 
            description: {
                text: 'Evaluación 03'
            }
        },
        { 
            evaluationNumber: 4, 
            date: 'Lun 16, Dic 2024', 
            weighting: '10% * 75%', 
            description: {
                text: 'Promedio Evaluaciones'
            }
        },
        { 
            evaluationNumber: 5, 
            date: 'Lun 16, Dic 2024', 
            weighting: '25%', 
            description: {
                text: 'Examen (obligatorio)'
            }
        }
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Lun 21, Oct 2024', 
            description: [
                {
                    text: 'Introducción al Desarrollo Ágil',
                    href: 'clase01'
                }
            ]
        },
        { 
            week: '02', 
            class: '02', 
            date: 'Lun 28, Oct 2024', 
            description: [
                {
                    text: 'Pilares y Principios del Desarrollo Ágil',
                    href: 'clase02'
                }
            ]
        },
        { 
            week: '03', 
            class: '03', 
            date: 'Lun 04, Nov 2024', 
            description: [
                {
                    text: 'Roles en Metodología SCRUM',
                    href: 'clase03'
                },
                {
                    text: 'Evaluación 01'
                }
            ]
        },
        { 
            week: '04', 
            class: '04', 
            date: 'Lun 11, Nov 2024', 
            description: [
                {
                    text: 'Historias de Usuario',
                    href: 'clase04'
                }
            ]
        },
        { 
            week: '05', 
            class: '05', 
            date: 'Lun 18, Nov 2024', 
            description: [
                {
                    text: 'Proyecto Etapa 1',
                    href: 'clase05'
                }
            ]
        },
        { 
            week: '06', 
            class: '06', 
            date: 'Lun 25, Nov 2024', 
            description: [
                {
                    text: 'Tablero Kanban',
                    href: 'clase06'
                }
            ]
        },
        { 
            week: '07', 
            class: '07', 
            date: 'Lun 02, Dic 2024', 
            description: [
                {
                    text: 'Historias Perfectas',
                    href: 'clase07'
                }
            ]
        },
        { 
            week: '08', 
            class: '08', 
            date: 'Lun 09, Dic 2024', 
            description: [
                {
                    text: 'Evaluación 03'
                }
            ]
        },
        { 
            week: '09', 
            class: '09', 
            date: 'Lun 16, Dic 2024', 
            description: [
                {
                    text: 'Examen'
                }
            ]
        }
    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Sáb 26, Oct 2024', 
            description: [
                {
                    text: 'Características de las Metodologías Ágiles',
                    href: 'lectura01'
                }
            ]
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Sáb 26, Oct 2024', 
            description: [
                {
                    text: 'Aplicaciones de las Metologías Ágiles',
                    href: 'lectura02'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Sáb 02, Nov 2024', 
            description: [
                {
                    text: 'Selección Metodologías Ágiles',
                    href: 'lectura03'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '04', 
            date: 'Sáb 02, Nov 2024', 
            description: [
                {
                    text: 'Optimización de recursos',
                    href: 'lectura04'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '05', 
            date: 'Sáb 09, Nov 2024', 
            description: [
                {
                    text: 'Levantamiento de requerimientos',
                    href: 'lectura05'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '06', 
            date: 'Sáb 09, Nov 2024', 
            description: [
                {
                    text: 'Roles y funciones en SCRUM',
                    href: 'lectura06'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '07', 
            date: 'Sáb 16, Nov 2024', 
            description: [
                {
                    text: 'Planificación de sprint en SCRUM',
                    href: 'lectura07'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '08', 
            date: 'Sáb 16, Nov 2024', 
            description: [
                {
                    text: 'Metología Kanban',
                    href: 'lectura08'
                }
            ]
        },
        { 
            week: '05', 
            lecture: null, 
            date: 'Sáb 23, Nov 2024', 
            description: [
                {
                    text: 'Repaso de los contenidos de la Unidad'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '09', 
            date: 'Sáb 30, Nov 2024', 
            description: [
                {
                    text: 'Definición de entregables iniciales',
                    href: 'lectura09'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '10', 
            date: 'Sáb 30, Nov 2024', 
            description: [
                {
                    text: 'Reuniones de trabajo',
                    href: 'lectura10'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '11', 
            date: 'Sáb 07, Dic 2024', 
            description: [
                {
                    text: 'Diagrama de Casos de Uso',
                    href: 'lectura11'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '12', 
            date: 'Sáb 14, Dic 2024', 
            description: [
                {
                    text: 'Mockups',
                    href: 'lectura12'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '13', 
            date: 'Sáb 14, Dic 2024', 
            description: [
                {
                    text: 'Etapa de Cierre',
                    href: 'lectura13'
                }
            ]
        }
    ]
};

export default courseData;