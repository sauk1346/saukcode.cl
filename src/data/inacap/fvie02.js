const courseData = {
    courseCode: "FVIE02",
    courseTitle: "Innovación y Emprendimiento II",
    courseDescription: "Innovación y emprendimiento II es una asignatura de práctica del Área de Formación para la Empleabilidad, dictada en modalidad presencial. Al finalizar, los estudiantes serán capaces de aplicar el ciclo de innovación, trabajando en equipos interdisciplinarios, para el desarrollo de un producto mínimo viable y sostenible que responda a las necesidades reales de usuarios/clientes y a las oportunidades del entorno a partir de encargos de baja complejidad. Esta asignatura aborda con mayor énfasis tres de las cinco fases del Ciclo de Innovación del Modelo de I+E de INACAP, Diagnóstico, Selección de oportunidades y Generación de ideas.",
    professorData: {
        name: "Patricio Enrique Giacaman Argel",
        email: "patricio.giacaman@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Detección de oportunidades e ideación de propuestas'
        },
        { 
            unit: '2',
            description: 'Prototipo y testeo'
        },
        { 
            unit: '3',
            description: 'Difusión de la innovación'
        },
    ],
    evaluationsData: [
        {
            evaluationNumber: 1,
            date: 'Dom 14, Jun 2026',
            weighting: '20%',
            description: {
                text: 'Informe 01',
                href: 'docs/informe01.pdf',
            }
        },
        {
            evaluationNumber: 2,
            date: 'Dom 05, Jul 2026',
            weighting: '30%',
            description: {
                text: 'Informe 02',
                href: 'docs/informe02.pdf',
            }
        },
        {
            evaluationNumber: 3,
            date: 'Jue 23, Jul 2026',
            weighting: '30%',
            description: {
                text: 'Informe 03',
                href: 'docs/informe03.pdf',
            }
        },
        {
            evaluationNumber: 4,
            date: 'Jue 23, Jul 2026',
            weighting: '20%',
            description: {
                text: 'Promedio informes',
                href: '',
            }
        },
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Lun 18, May 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Mié 20, May 2026', 
            description: [
                {
                    text: 'Toolkit Unidad 01',
                    href: 'docs/Toolkit-U1.pdf'
                }
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Lun 25, May 2026', 
            description: [
                {
                    text: 'Idea de la Solución',
                    href: 'clase03'
                }
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Mié 27, May 2026', 
            description: [
                {
                    text: 'Preguntas Exploratorias',
                    href: 'clase04'
                },
                {
                    text: 'Avance01.pdf',
                    href: 'docs/avance01.pdf'
                },
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Lun 01, Jun 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Mié 03, Jun 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Lun 08, Jun 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Mié 10, Jun 2026', 
            description: [
                {
                    text: 'Observación no participante',
                    href: 'lectura04'
                }
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Lun 15, Jun 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '05', 
            class: '10', 
            date: 'Mié 17, Jun 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Lun 22, Jun 2026', 
            description: [
                {
                    text: 'Avance Informe 02 (1)',
                    href: ''
                }
            ]
        },
        { 
            week: '06', 
            class: '12', 
            date: 'Mié 24, Jun 2026', 
            description: [
                {
                    text: 'Avance Informe 02 (2)',
                    href: ''
                }
            ]
        },
        { 
            week: '07', 
            class: '13', 
            date: 'Lun 29, Jun 2026', 
            description: [
                {
                    text: 'Feriado: Día San Pedro y San Pablo',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '07', 
            class: '14', 
            date: 'Mié 01, Jul 2026', 
            description: [
                {
                    text: 'Suspensión clases: Evacuación sede (fuga de gas)',
                    strikethrough: true
                }
            ]
        },
        {
            week: '08', 
            class: '15', 
            date: 'Lun 06, Jul 2026', 
            description: [
                {
                    text: 'Generación de metáforas',
                    href: 'lectura11'
                },
                {
                    text: 'Propuesta de valor',
                    href: 'lectura17'
                },
            ]
        },
        { 
            week: '08', 
            class: '16', 
            date: 'Mié 08, Jul 2026', 
            description: [
                {
                    text: 'Prototipo',
                    href: 'lectura14'
                }
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Lun 13, Jul 2026', 
            description: [
                {
                    text: 'Consultas Informe 03 (1)',
                    href: ''
                }
            ]
        },
        { 
            week: '09', 
            class: '18', 
            date: 'Mié 15, Jul 2026', 
            description: [
                {
                    text: 'Consultas Informe 03 (2)',
                    href: ''
                }
            ]
        },
        { 
            week: '10', 
            class: '19', 
            date: 'Lun 20, Jul 2026', 
            description: [
                {
                    text: 'Consultas Informe 03 (3)',
                    href: ''
                }
            ]
        },
        { 
            week: '10', 
            class: '20', 
            date: 'Mié 22, Jul 2026', 
            description: [
                {
                    text: 'Cierre de notas',
                    href: ''
                }
            ]
        },
        
    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Vie 22, May 2026', 
            description: {
                text: 'Toolkit Unidad 1',
                href: 'docs/Toolkit-U1.pdf',
            }
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Vie 22, May 2026', 
            description: [
                {
                    text: 'Entrevista a Usuarios',
                    href: 'lectura02',
                }
            ]
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Vie 29, May 2026', 
            description: [
                {
                    text: 'Elaboración de Cuestionarios',
                    href: 'lectura03',
                }
            ]
        },
        { 
            week: '02', 
            lecture: '04', 
            date: 'Vie 29, May 2026', 
            description: [
                {
                    text: 'Entrevista a Expertos',
                    href: 'lectura04',
                }
            ]
        },
        { 
            week: '03', 
            lecture: '05', 
            date: 'Vie 05, Jun 2026', 
            description: [
                {
                    text: 'Observación no participante',
                    href: 'lectura05',
                }
            ]
        },
        { 
            week: '03', 
            lecture: '06', 
            date: 'Vie 05, Jun 2026', 
            description: [
                {
                    text: 'Estudio Comparativo de Referentes',
                    href: 'lectura06',
                }
            ]
        },
        { 
            week: '04', 
            lecture: '07', 
            date: 'Vie 12, Jun 2026', 
            description: [
                {
                    text: 'Procesamiento de hallazgos',
                    href: 'lectura07',
                }
            ]
        },
        { 
            week: '04', 
            lecture: '08', 
            date: 'Vie 12, Jun 2026', 
            description: [
                {
                    text: 'Redefinición del desafío',
                    href: 'lectura08',
                }
            ]
        },
        { 
            week: '05', 
            lecture: '09', 
            date: 'Vie 19, Jun 2026', 
            description: [
                {
                    text: 'Estudio Comparativo de Antecedentes',
                    href: 'lectura09',
                }
            ]
        },
        { 
            week: '05', 
            lecture: '10', 
            date: 'Vie 19, Jun 2026', 
            description: [
                {
                    text: 'Formulario de Requerimientos',
                    href: 'lectura10',
                }
            ]
        },
        { 
            week: '06', 
            lecture: '11', 
            date: 'Vie 26, Jun 2026', 
            description: [
                {
                    text: 'Generación Metáforas',
                    href: 'lectura11',
                }
            ]
        },
        { 
            week: '06', 
            lecture: '12', 
            date: 'Vie 26, Jun 2026', 
            description: [
                {
                    text: 'Brainstorming',
                    href: 'lectura12',
                }
            ]
        },
        { 
            week: '07', 
            lecture: '13', 
            date: 'Vie 03, Jul 2026', 
            description: [
                {
                    text: 'Toolkit Unidad 2',
                    href: 'docs/Toolkit-U2.pdf',
                }
            ]
        },
        { 
            week: '07', 
            lecture: '14', 
            date: 'Vie 03, Jul 2026', 
            description: [
                {
                    text: 'Prototipo',
                    href: 'lectura14',
                }
            ]
        },
        { 
            week: '07', 
            lecture: '15', 
            date: 'Vie 03, Jul 2026', 
            description: [
                {
                    text: 'Iteración',
                    href: 'lectura15',
                }
            ]
        },
        { 
            week: '08', 
            lecture: '16', 
            date: 'Vie 10, Jul 2026', 
            description: [
                {
                    text: 'Toolkit Unidad 3',
                    href: 'docs/Toolkit-U3.pdf',
                }
            ]
        },
        { 
            week: '08', 
            lecture: '17', 
            date: 'Vie 10, Jul 2026', 
            description: [
                {
                    text: 'Propuesta de valor',
                    href: 'lectura17',
                }
            ]
        },
        { 
            week: '09', 
            lecture: '18', 
            date: 'Vie 17, Jul 2026', 
            description: [
                {
                    text: 'Pitch',
                    href: 'lectura18',
                }
            ]
        },
        
    ]
};

export default courseData;