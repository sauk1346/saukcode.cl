const courseData = {
    courseCode: "CVCD01",
    courseTitle: "Cálculo Diferencial",
    courseDescription: "Cálculo Diferencial es una asignatura de carácter lectiva, dictada en modalidad presencial con componente online, del área de formación de Ciencias Básicas. El propósito de esta asignatura es contribuir al desarrollo de la competencia matemática integrando las habilidades fundamentales matemáticas, las habilidades del Siglo XXI y el uso de herramientas tecnológicas, en contexto personal, ocupacional, social, científico, todo esto desde una mirada colaborativa.",
    professorData: {
        name: "Carolina Valeria Gómez Bravo",
        email: "carolina.gomez27@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Límites y Continuidad'
        },
        { 
            unit: '2',
            description: 'Derivadas'
        },
        { 
            unit: '3',
            description: 'Aplicaciones de las derivadas'
        },
    ],
    evaluationsData: [
        {
            evaluationNumber: 1,
            date: 'Mié 10, Jun 2026',
            weighting: '20%',
            description: {
                text: 'Límites y Continuidad',
                href: 'eval01',
            }
        },
        {
            evaluationNumber: 2,
            date: 'Jue 02, Jul 2026',
            weighting: '25%',
            description: {
                text: 'Derivadas',
                href: 'eval02',
            }
        },
        {
            evaluationNumber: 3,
            date: 'Mar 14, Jul 2026',
            weighting: '40%',
            description:[ 
                {
                    text: 'Presentación Proyecto',
                    href: 'docs/presentacion.pdf',
                },
                {
                    text: 'Código base',
                    href: 'https://github.com/sauk1346/simulador-inversion',
                },
            ]
        },
        {
            evaluationNumber: 4,
            date: 'Mié 12, Jul 2026',
            weighting: '15%',
            description: [
                {
                    text: 'Controles',
                    href: 'controles',
                },
            ]
                
        },
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Mié 20, May 2026', 
            description: [
                {
                    text: 'Suspensión clases: Vísperas feriado',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Jue 21, May 2026', 
            description: [
                {
                    text: 'Feriado: Glorias Navales',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Mié 27, May 2026', 
            description: [
                {
                    text: 'Taller Repaso Funciones',
                    href: 'clase03a'
                }
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Jue 28, May 2026', 
            description: [
                {
                    text: 'AT01: Primeros Cálculos de Límites',
                    href: 'docs/at01.pdf'
                },
                {
                    text: 'SM01: Costos de Producción',
                    href: 'unit01-sm01'
                },
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Mié 03, Jun 2026', 
            description: [
                {
                    text: 'AT02: Otros cálculos de límites y asíntotas',
                    href: 'docs/at02.pdf'
                },
                {
                    text: 'ARPA 1: Ahorro para el departamento',
                    href: 'unit01-arpa01'
                },
                {
                    text: 'SM02: Ley de enfriamiento y asíntotas',
                    href: 'unit01-sm02'
                },
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Jue 04, Jun 2026', 
            description: [
                {
                    text: 'AT03: Continuidad',
                    href: 'docs/at03.pdf'
                },
                {
                    text: 'ARPA 2: Ferrocarriles del Estado',
                    href: 'unit01-arpa02'
                },
                {
                    text: 'SM03: Manteniendo la continuidad en la producción',
                    href: 'unit01-sm03'
                },  
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Mié 10, Jun 2026', 
            description: [
                {
                    text: 'Evaluación 01',
                    href: 'eval01'
                }, 
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Jue 11, Jun 2026', 
            description: [
                {
                    text: 'AT01: Noción de derivada',
                    href: 'docs/unit02-at01.pdf'
                },
                {
                    text: 'ARPA 1: De rectas secantes a recta tangente',
                    href: 'unit02-arpa01'
                },
                {
                    text: 'SM01: Velocidad instantánea',
                    href: 'unit02-sm01'
                }, 
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Mié 17, Jun 2026', 
            description: [
                {
                    text: 'Suspensión clases: Comunicado profesora',
                    strikethrough: true
                }, 
            ]
        },
        { 
            week: '05', 
            class: '10', 
            date: 'Jue 18, Jun 2026', 
            description: [
                {
                    text: 'AT02: Conociendo a la función',
                    href: 'docs/unit02-at02.pdf'
                },
                {
                    text: 'ARPA 2: Función desconocida',
                    href: 'unit02-arpa02'
                },
                {
                    text: 'SM02: El surfista',
                    href: 'unit02-sm02'
                }, 
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Mié 24, Jun 2026', 
            description: [
                {
                    text: 'no asistí',
                    strikethrough: true
                }, 
            ]
        },
        { 
            week: '06', 
            class: '12', 
            date: 'Jue 25, Jun 2026', 
            description: [
                {
                    text: 'Instrucciones proyecto',
                    href: 'clase12'
                }, 
            ]
        },
        { 
            week: '07', 
            class: '13', 
            date: 'Mié 01, Jul 2026', 
            description: [
                {
                    text: 'Suspensión clases: Evacuación sede (fuga de gas)',
                    strikethrough: true
                }, 
            ]
        },
        { 
            week: '07', 
            class: '14', 
            date: 'Jue 02, Jul 2026', 
            description: [
                {
                    text: 'Evaluación 02',
                    href: 'eval02'
                }, 
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Mié 08, Jul 2026', 
            description: [
                {
                    text: 'Consultas Proyecto',
                    href: ''
                }, 
            ]
        },
        { 
            week: '08', 
            class: '16', 
            date: 'Jue 09, Jul 2026', 
            description: [
                {
                    text: 'ARPA 1: Sitio de área máxima',
                    href: 'unit03-arpa01'
                },
                {
                    text: 'SM01: Recipiente de costo mínimo',
                    href: 'unit03-sm01'
                }, 
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Mié 15, Jul 2026', 
            description: [
                {
                    text: 'Suspensión clases: vísperas feriado',
                    strikethrough: true
                }, 
            ]
        },
        { 
            week: '09', 
            class: '18', 
            date: 'Jue 16, Jul 2026', 
            description: [
                {
                    text: 'Feriado: Día de la Virgen del Carmen',
                    strikethrough: true
                }, 
            ]
        },
        { 
            week: '10', 
            class: '19', 
            date: 'Mié 22, Jul 2026', 
            description: [
                {
                    text: 'Horario Consultas',
                    href: ''
                }, 
            ]
        },
        { 
            week: '10', 
            class: '20', 
            date: 'Jue 23, Jul 2026', 
            description: [
                {
                    text: 'Examen (si nota < 5.0)',
                    href: ''
                }, 
            ]
        },
    ],
};

export default courseData;