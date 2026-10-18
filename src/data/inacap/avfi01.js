const courseData = {
    courseCode: "AVFI01",
    courseTitle: "Finanzas",
    courseDescription: "Finanzas es una asignatura lectiva, perteneciente a la línea de administración del área de formación para la empleabilidad, dictada en modalidad semipresencial. Al finalizar la asignatura, el estudiante será capaz de aplicar técnicas básicas de costeo, presupuestos e indicadores de rentabilidad de proyectos de inversión, como apoyo a la gestión profesional, considerando las tendencias y dinámicas impulsadas por la inteligencia artificial (IA). Además, reconocerá los usos de tecnologías de IA para optimizar procesos financieros y tomar decisiones informadas, considerando la ética y ciudadanía, el trabajo colaborativo y la comunicación.",
    professorData: {
        name: "Patricia Mónica Cañas Lemesch",
        email: "patricia.canas@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Contabilidad básica y fundamentos de costeo'
        },
        { 
            unit: '2',
            description: 'Formulación y control presupuestario'
        },
        { 
            unit: '3',
            description: 'Indicadores de rentabilidad y análisis de proyectos'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1,
            date: 'Jue 27, Ago 2026',
            weighting: '15%', 
            description: {
                text: 'Balance General',
                href: 'eval01'
            },
            quickGuide: [
                {
                    text: 'Quiz: Técnicas de Contabilidad',
                    href: 'quiz-tecnicas-contabilidad'
                }
            ]
        },
        { 
            evaluationNumber: 2,
            date: 'Jue 10, Sep 2026',
            weighting: '15%', 
            description: {
                text: 'Estado Resultado / Pto Equilibrio',
                href: 'eval02'
            },
            quickGuide: [
                {
                    text: 'Quiz: Técnicas de Costos',
                    href: 'quiz-tecnicas-costos'
                }
            ]
        },
        { 
            evaluationNumber: 3,
            date: 'Mar 29, Sep 2026',
            weighting: '30%', 
            description: {
                text: 'Presupuesto de Caja',
                href: ''
            },
        },
        { 
            evaluationNumber: 4,
            date: 'Mar 13, Oct 2026',
            weighting: '40%', 
            description: {
                text: 'Indicadores de Rentabilidad',
                href: ''
            },
            quickGuide: [
                {
                    text: 'Quiz: Evaluación Financiera',
                    href: 'quiz-evaluacion-financiera'
                },
                {
                    text: 'Quiz: Indicadores de Rentabilidad',
                    href: 'quiz-indicadores-rentabilidad'
                },
            ]
        },
        { 
            evaluationNumber: 5,
            date: 'Jue 15, Oct 2026',
            weighting: '25%', 
            description: {
                text: 'Examen',
                href: ''
            },
            quickGuide: [
                {
                    text: 'Quiz: Técnicas de Contabilidad',
                    href: 'quiz-tecnicas-contabilidad'
                },
                {
                    text: 'Quiz: Técnicas de Costos',
                    href: 'quiz-tecnicas-costos'
                },
                {
                    text: 'Quiz: Evaluación Financiera',
                    href: 'quiz-evaluacion-financiera'
                },
                {
                    text: 'Quiz: Indicadores de Rentabilidad',
                    href: 'quiz-indicadores-rentabilidad'
                },
            ]
        },
        
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Mar 11, Ago 2026', 
            description: [
                {
                    text: 'Conceptos de finanzas',
                    href:'clase01a'
                },
                {
                    text: 'Interés Nominal e Interés Real',
                    href:'clase01b'
                },
                {
                    text: 'Interés de Captación e Interés de Colocación',
                    href:'clase01c'
                },
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Jue 13, Ago 2026', 
            description: [
                {
                    text: 'Balance General',
                    href:'clase02a'
                },
                {
                    text: 'Estado de Resultado',
                    href:'clase02b'
                },
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Mar 18, Ago 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                },
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Jue 20, Ago 2026', 
            description: [
                {
                    text: 'Costo variable o costo de venta',
                    href:'clase04a'
                },
                {
                    text: 'Precio unitario y Costo de Venta unitario',
                    href:'clase04b'
                },
                {
                    text: 'Punto de Equilibrio',
                    href:'clase04c'
                },
                {
                    text: 'Técnicas de Contabilidad',
                    href:'docs/tecnicas-contabilidad.pdf'
                },
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Mar 25, Ago 2026', 
            description: [
                {
                    text: 'Ejercicio (Balance General)',
                    href:''
                },
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Jue 27, Ago 2026', 
            description: [
                {
                    text: 'Evaluación 01',
                    href:'eval01'
                },
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Mar 01, Sep 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                },
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Jue 03, Sep 2026', 
            description: [
                {
                    text: 'Ejercicio 03 (Estado Resultado / Pto Equilibrio)',
                    href:'clase08a'
                },
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Mar 08, Sep 2026', 
            description: [
                {
                    text: 'Técnicas de Costos',
                    href:'docs/tecnicas-costos.pdf'
                },
                {
                    text: 'Ejercicio 04 (Estado Resultado / Pto Equilibrio)',
                    href:''
                },
            ]
        },
        { 
            week: '05', 
            class: '10', 
            date: 'Jue 10, Sep 2026', 
            description: [
                {
                    text: 'Evaluación 02',
                    href:'eval02'
                },
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Mar 15, Sep 2026', 
            description: [
                {
                    text: 'Entrega Notas Evaluación 02',
                    href:''
                },
            ]
        },
        { 
            week: '06', 
            class: '12', 
            date: 'Jue 17, Sep 2026', 
            description: [
                {
                    text: 'Suspensión clases: Vísperas 18 Sep',
                    strikethrough: true
                },
            ]
        },
        { 
            week: '07', 
            class: '13', 
            date: 'Lun 21, Sep 2026', 
            description: [
                {
                    text: 'Ejercicio 01 (Presupuesto de Caja)',
                    href: 'clase13'
                },
            ]
        },
        { 
            week: '07', 
            class: '14', 
            date: 'Jue 24, Sep 2026', 
            description: [
                {
                    text: 'Ejercicio 02 (Presupuesto de Caja)',
                    href: 'clase14'
                },
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Mar 29, Sep 2026', 
            description: [
                {
                    text: 'Evaluación 03',
                    href: ''
                },
            ]
        },
        { 
            week: '08', 
            class: '16', 
            date: 'Jue 01, Oct 2026', 
            description: [
                {
                    text: 'Ejercicio 01: Valor Actual Neto (VAN)',
                    href: 'clase16'
                },
                {
                    text: 'Ejercicio 01 (VAN) - VideoClase',
                    href: 'https://youtu.be/GSJqJSH9-TM'
                },
                {
                    text: 'Evaluación Financiera',
                    href: 'docs/evaluacion-financiera.pdf'
                },
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Mar 06, Oct 2026', 
            description: [
                {
                    text: 'Ejercicio 02: Indicadores de Rentabilidad',
                    href: 'clase17'
                },
                {
                    text: 'Ejercicio 02: Indicadores de Rentabilidad - VideoClase',
                    href: 'https://youtu.be/f15-3pnuYoM'
                },
                {
                    text: 'Indicadores Rentabilidad',
                    href: 'docs/indicadores-rentabilidad.pdf'
                },
            ]
        },
        { 
            week: '09', 
            class: '18', 
            date: 'Jue 08, Oct 2026', 
            description: [
                {
                    text: 'Ejercicio 03: Indicadores de Rentabilidad',
                    href: 'clase18'
                },
                {
                    text: 'Ejercicio 03: Indicadores de Rentabilidad - VideoClase',
                    href: 'https://youtu.be/hpOpwQxPyiA'
                },
            ]
        },
        { 
            week: '10', 
            class: '19', 
            date: 'Mar 13, Oct 2026', 
            description: [
                {
                    text: 'Evaluación 04',
                    href: ''
                },
            ]
        },
        { 
            week: '10', 
            class: '20', 
            date: 'Jue 15, Oct 2026', 
            description: [
                {
                    text: 'Examen',
                    href: ''
                },
            ]
        },

    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Dom 16, Ago 2026', 
            description: {
                text: 'Contabilidad básica y fundamentos de costeo',
                href: 'docs/lectura01.pdf'
            }
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Dom 16, Ago 2026', 
            description: {
                text: 'Descubre el lenguaje de las empresas',
                href: 'lectura02'
            }
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Dom 23, Ago 2026', 
            description: {
                text: 'La contabilidad y la importancia de la información financiera',
                href: 'lectura03'
            }
        },
        { 
            week: '02', 
            lecture: '04', 
            date: 'Dom 23, Ago 2026', 
            description: {
                text: 'Interpretando estados financieros',
                href: 'lectura04'
            }
        },
        { 
            week: '03', 
            lecture: '05', 
            date: 'Dom 30, Ago 2026', 
            description: {
                text: 'Fundamentos de los costos: elementos, clasificación y diferencias con gasto y pérdidas',
                href: ''
            }
        },
        { 
            week: '03', 
            lecture: '06', 
            date: 'Dom 30, Ago 2026', 
            description: {
                text: 'Método de costeo y el uso de IA para simular escenarios de costo',
                href: ''
            }
        },
        { 
            week: '04', 
            lecture: '07', 
            date: 'Dom 06, Sep 2026', 
            description: {
                text: 'Punto de equilibrio',
                href: ''
            }
        },
        { 
            week: '04', 
            lecture: '08', 
            date: 'Dom 06, Sep 2026', 
            description: {
                text: 'La contabilidad y la importancia de la información financiera',
                href: ''
            }
        },
        { 
            week: '05', 
            lecture: '09', 
            date: 'Dom 13, Sep 2026', 
            description: {
                text: 'El presupuesto como brújula financiera',
                href: ''
            }
        },
        { 
            week: '05', 
            lecture: '10', 
            date: 'Dom 13, Sep 2026', 
            description: {
                text: 'Estructura del presupuesto y herramientas digitales',
                href: ''
            }
        },
        { 
            week: '06', 
            lecture: '10', 
            date: 'Dom 20, Sep 2026', 
            description: {
                text: 'Cómo construir tu presupuesto operativo',
                href: ''
            }
        },
        { 
            week: '06', 
            lecture: '10', 
            date: 'Dom 20, Sep 2026', 
            description: {
                text: 'Análisis de variaciones y control presupuestario',
                href: ''
            }
        },
    ]
};

export default courseData;