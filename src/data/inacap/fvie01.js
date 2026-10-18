const courseData = {
    courseCode: "FVIE01",
    courseTitle: "Innovación y Emprendimiento I",
    courseDescription: "Innovación y emprendimiento I es una asignatura de carácter práctico del Área de Formación para la Empleabilidad, dictada en modalidad presencial. Al finalizar, los estudiantes podrán aplicar el ciclo de innovación para el desarrollo de una solución que responda a las oportunidades del entorno y a las necesidades reales de usuarios/clientes, identificando la propuesta de valor y los pasos para proyectar y concretar dicha idea en una empresa.",
    professorData: {
        name: "Rafael Ernesto Contreras Valdebenito",
        email: "rafael.contreras02@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Dirección de Oportunidades e Ideación de Propuestas'
        },
        { 
            unit: '2',
            description: 'Modelo de Negocio y Experimentación'
        },
        { 
            unit: '3',
            description: 'Difusión y Formalización'
        },
    ],
    evaluationsData: [
        {
            evaluationNumber: 1,
            date: 'Jue 10, Jul 2025',
            weighting: '30%',
            description: {
                text: 'Informe 01',
                href: 'docs/informe01.pdf',
                external: true
            }
        },
        {
            evaluationNumber: 2,
            date: 'Lun 21, Jul 2025',
            weighting: '35%',
            description: {
                text: 'Informe 02',
                href: 'docs/informe02.pdf',
                external: true
            }
        },
        {
            evaluationNumber: 3,
            date: 'Jue 24, Jul 2025',
            weighting: '35%',
            description: {
                text: 'Presentación Proyecto',
                href: 'docs/presentacion.pdf',
                external: true
            }
        }
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Jue 22, May 2025', 
            description: [
                {
                    text: 'Introducción a I+E',
                    href: 'clase01'
                }
            ]
        },
        { 
            week: '02', 
            class: '02', 
            date: 'Mar 27, May 2025', 
            description: [
                {
                    text: 'Tema de Proyecto',
                    href: 'clase02'
                }
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Jue 29, May 2025', 
            description: [
                {
                    text: 'Objetivos General y Específicos',
                    href: 'clase03'
                }
            ]
        },
        { 
            week: '03', 
            class: '04', 
            date: 'Mar 03, Jun 2025', 
            description: [
                {
                    text: 'Planificación y Pauta (1)',
                    href: 'clase04'
                }
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Jue 05, Jun 2025', 
            description: [
                {
                    text: 'Planificación y Pauta (2)'
                }
            ]
        },
        { 
            week: '04', 
            class: '06', 
            date: 'Mar 10, Jun 2025', 
            description: [
                {
                    text: 'Observación no Participante'
                }
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Jue 12, Jun 2025', 
            description: [
                {
                    text: 'No asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '05', 
            class: '08', 
            date: 'Mar 17, Jun 2025', 
            description: [
                {
                    text: 'Feedback Cuestionario'
                }
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Jue 19, Jun 2025', 
            description: [
                {
                    text: 'No asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '06', 
            class: '10', 
            date: 'Mar 24, Jun 2025', 
            description: [
                {
                    text: 'Matriz de Vaciado',
                    href: 'clase10'
                }
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Jue 26, Jun 2025', 
            description: [
                {
                    text: 'Matriz de Antecedentes (1)'
                }
            ]
        },
        { 
            week: '07', 
            class: '12', 
            date: 'Mar 01, Jul 2025', 
            description: [
                {
                    text: 'Matriz de Antecedentes (2)'
                }
            ]
        },
        { 
            week: '07', 
            class: '13', 
            date: 'Jue 03, Jul 2025', 
            description: [
                {
                    text: 'No asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '08', 
            class: '14', 
            date: 'Mar 08, Jul 2025', 
            description: [
                {
                    text: 'Consultas Informe 01'
                }
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Jue 10, Jul 2025', 
            description: [
                {
                    text: 'Consultas Informe 01'
                }
            ]
        },
        { 
            week: '09', 
            class: '16', 
            date: 'Mar 15, Jul 2025', 
            description: [
                {
                    text: 'Suspensión Clases: pre-feriado',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Jue 17, Jul 2025', 
            description: [
                {
                    text: 'Consultas Informe 02'
                }
            ]
        }
    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Sáb 24, May 2025', 
            description: [
                {
                    text: 'Manual Estudiante Unidad 01',
                    href: 'docs/manual01.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Sáb 24, May 2025', 
            description: [
                {
                    text: 'Entrevista a usuario',
                    href: 'lectura02'
                }
            ]
        },
        { 
            week: '01', 
            lecture: '03', 
            date: 'Sáb 24, May 2025', 
            description: [
                {
                    text: 'Elaboración de cuestionarios',
                    href: 'lectura03'
                }
            ]
        },
        { 
            week: '01', 
            lecture: '04', 
            date: 'Sáb 24, May 2025', 
            description: [
                {
                    text: 'Observación no participante',
                    href: 'lectura04'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '05', 
            date: 'Sáb 31, May 2025', 
            description: [
                {
                    text: 'Procesamiento de Hallazgos',
                    href: 'lectura05'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '06', 
            date: 'Sáb 31, May 2025', 
            description: [
                {
                    text: 'Redefinición del desafío',
                    href: 'lectura06'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '07', 
            date: 'Sáb 07, Jun 2025', 
            description: [
                {
                    text: 'Estudio Comparativo Antecedentes',
                    href: 'lectura07'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '08', 
            date: 'Sáb 07, Jun 2025', 
            description: [
                {
                    text: 'Formulario Requerimientos',
                    href: 'lectura08'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '09', 
            date: 'Sáb 07, Jun 2025', 
            description: [
                {
                    text: 'Brainstorming',
                    href: 'lectura09'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '10', 
            date: 'Sáb 21, Jun 2025', 
            description: [
                {
                    text: 'Manual Estudiante Unidad 02',
                    href: 'docs/manual02.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '05', 
            lecture: '11', 
            date: 'Sáb 21, Jun 2025', 
            description: [
                {
                    text: 'Modelo de negocio Business Canvas Model',
                    href: 'lectura11'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '12', 
            date: 'Sáb 21, Jun 2025', 
            description: [
                {
                    text: 'Métodos de experimentación cliente/usuario',
                    href: 'lectura12'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '13', 
            date: 'Sáb 28, Jun 2025', 
            description: [
                {
                    text: 'Desarrollo de la experimentación y ajuste del modelo de negocio',
                    href: 'lectura13'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '14', 
            date: 'Sáb 12, Jul 2025', 
            description: [
                {
                    text: 'Manual Estudiante Unidad 03',
                    href: 'docs/manual03.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '08', 
            lecture: '15', 
            date: 'Sáb 12, Jul 2025', 
            description: [
                {
                    text: 'Fase de Propuesta de Valor INACAP',
                    href: 'lectura15'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '16', 
            date: 'Sáb 12, Jul 2025', 
            description: [
                {
                    text: 'Crear una Empresa en Chile',
                    href: 'lectura16'
                }
            ]
        },
        { 
            week: '09', 
            lecture: '17', 
            date: 'Sáb 19, Jul 2025', 
            description: [
                {
                    text: 'Pitch de Negocio',
                    href: 'lectura17'
                }
            ]
        }
    ]
};

export default courseData;