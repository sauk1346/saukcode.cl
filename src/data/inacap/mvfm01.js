const courseData = {
    courseCode: "MVFM01",
    courseTitle: "Funciones y Matrices",
    courseDescription: "Asignatura lectiva. Al finalizar, el estudiantes será capaz de: Integrar habilidades fundamentales de mateméticas, Utilizar herramientas tecnológicas en contexto personal, ocupacional, social, científico.",
    professorData: {
        name: "Franciso Javier Gonzáles Villarroel",
        email: "francisco.gonzales143@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Funciones Polinómicas, Exponencial y Logarítmica'
        },
        { 
            unit: '2',
            description: 'Trigonometría'
        },
        { 
            unit: '3',
            description: 'Sucesiones, Sumatorias, Vectores y Matrices'
        },
    ],   
    evaluationsData: [
        { 
            evaluationNumber: 1, 
            date: 'Lun 30, Sep 2024', 
            weighting: '25%', 
            description: {
                text: 'Evaluación 01',
                href: 'docs/eval01.pdf',
                external: true
            }
        },
        { 
            evaluationNumber: 2, 
            date: 'Mié 13, Nov 2024', 
            weighting: '25%', 
            description: {
                text: 'Evaluación 02'
            }
        },
        { 
            evaluationNumber: 3, 
            date: 'Lun 09, Dic 2024', 
            weighting: '40%', 
            description: {
                text: 'Proyecto: Trigonautas',
                href: 'proyecto'
            }
        },
        { 
            evaluationNumber: 4, 
            date: 'Mié 11, Dic 2024', 
            weighting: '10%', 
            description: {
                text: 'Controles',
                href: 'docs/controles.pdf',
                external: true
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
                    text: 'ARPA 1: Consumo de energía',
                    href: 'arpa11'
                },
                {
                    text: 'SM 1: Servicio Eléctrico',
                    href: 'sm11'
                }
            ]
        },
        { 
            week: '02', 
            class: '02', 
            date: 'Lun 19, Ago 2024', 
            description: [
                {
                    text: 'ARPA 2: Lanzamiento de una piedra',
                    href: 'arpa12'
                }
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Mié 21, Ago 2024', 
            description: [
                {
                    text: 'SM 2: Sueño dorado',
                    href: 'sm12'
                }
            ]
        },
        { 
            week: '03', 
            class: '04', 
            date: 'Lun 26, Ago 2024', 
            description: [
                {
                    text: 'ARPA 3: Eliminación de fármacos',
                    href: 'arpa13'
                },
                {
                    text: 'SM 3: Desabastecimiento',
                    href: 'sm13'
                }
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Mié 28, Ago 2024', 
            description: [
                {
                    text: 'SM 4: Crecimiento de Bacterias',
                    href: 'sm14'
                }
            ]
        },
        { 
            week: '04', 
            class: '06', 
            date: 'Lun 02, Sep 2024', 
            description: [
                {
                    text: 'ARPA 4: La escala Ritcher',
                    href: 'arpa14'
                }
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Mié 04, Sep 2024', 
            description: [
                {
                    text: 'AFO 09',
                    href: 'afo1-09'
                },
                {
                    text: 'AFO 10',
                    href: 'afo1-10'
                }
            ]
        },
        { 
            week: '05', 
            class: '08', 
            date: 'Lun 09, Sep 2024', 
            description: [
                {
                    text: 'SM 5: Seguidores en Instagram',
                    href: 'sm15'
                }
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Mié 11, Sep 2024', 
            description: [
                {
                    text: 'Suspensión Clases',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '06', 
            class: '10', 
            date: 'Lun 16, Sep 2024', 
            description: [
                {
                    text: 'Revisión Control 1 y 2'
                },
                {
                    text: 'AFO 05',
                    href: 'afo1-05'
                },
                {
                    text: 'AFO 10',
                    href: 'afo1-10'
                }
            ]
        },
        { 
            week: '07', 
            class: '11', 
            date: 'Lun 23, Sep 2024', 
            description: [
                {
                    text: 'Repaso (sin logaritmo)',
                    href: 'repaso01'
                }
            ]
        },
        { 
            week: '07', 
            class: '12', 
            date: 'Mié 25, Sep 2024', 
            description: [
                {
                    text: 'Guía Resumen Unidad 1',
                    href: 'guia01'
                }
            ]
        },
        { 
            week: '08', 
            class: '13', 
            date: 'Lun 30, Sep 2024', 
            description: [
                {
                    text: 'Evaluación 01',
                    href: 'docs/eval01.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '08', 
            class: '14', 
            date: 'Mié 02, Oct 2024', 
            description: [
                {
                    text: 'Introducción a Trigonometría',
                    href: 'intro-trig'
                },
                {
                    text: 'ARPA 1: La plaza de skate',
                    href: 'arpa21'
                }
            ]
        },
        { 
            week: '09', 
            class: '15', 
            date: 'Lun 07, Oct 2024', 
            description: [
                {
                    text: 'SM 1: La Rampa',
                    href: 'sm21'
                }
            ]
        },
        { 
            week: '09', 
            class: '16', 
            date: 'Mié 09, Oct 2024', 
            description: [
                {
                    text: 'AFO 01',
                    href: 'afo2-01'
                },
                {
                    text: 'AFO 02',
                    href: 'afo2-02'
                },
                {
                    text: 'AFO 03',
                    href: 'afo2-03'
                }
            ]
        },
        { 
            week: '10', 
            class: '17', 
            date: 'Lun 14, Oct 2024', 
            description: [
                {
                    text: 'ARPA 2: Un terreno peligroso',
                    href: 'arpa22'
                },
                {
                    text: 'AFO 04',
                    href: 'afo2-04'
                },
                {
                    text: 'AFO 05',
                    href: 'afo2-05'
                },
                {
                    text: 'AFO 06',
                    href: 'afo2-06'
                },
                {
                    text: 'AFO 07',
                    href: 'afo2-07'
                }
            ]
        },
        { 
            week: '10', 
            class: '18', 
            date: 'Mié 16, Oct 2024', 
            description: [
                {
                    text: 'Ley de los Cosenos'
                }
            ]
        },
        { 
            week: '11', 
            class: '19', 
            date: 'Lun 21, Oct 2024', 
            description: [
                {
                    text: 'SM 2: Viaje en globo aerostático',
                    href: 'sm22'
                }
            ]
        },
        { 
            week: '11', 
            class: '20', 
            date: 'Mié 23, Oct 2024', 
            description: [
                {
                    text: 'SM 3: Análisis de ondas sonoras',
                    href: 'sm23'
                }
            ]
        },
        { 
            week: '12', 
            class: '21', 
            date: 'Lun 28, Oct 2024', 
            description: [
                {
                    text: 'Temperatura de una tubería',
                    href: 'trig01'
                },
                {
                    text: 'Ejercicios Trigonometría',
                    href: 'trig02'
                }
            ]
        },
        { 
            week: '12', 
            class: '22', 
            date: 'Mié 30, Oct 2024', 
            description: [
                {
                    text: 'Suspensión Clases',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '13', 
            class: '23', 
            date: 'Lun 04, Nov 2024', 
            description: [
                {
                    text: 'Suspensión Clases',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '13', 
            class: '24', 
            date: 'Mié 06, Nov 2024', 
            description: [
                {
                    text: 'Suspensión Clases',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '14', 
            class: '25', 
            date: 'Lun 11, Nov 2024', 
            description: [
                {
                    text: 'Suspensión Clases',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '14', 
            class: '26', 
            date: 'Mié 13, Nov 2024', 
            description: [
                {
                    text: 'Evaluación 02'
                }
            ]
        },
        { 
            week: '15', 
            class: '27', 
            date: 'Lun 18, Nov 2024', 
            description: [
                {
                    text: 'Revisión Evaluación 02'
                },
                {
                    text: 'Instrucciones Proyecto Etapa 02'
                }
            ]
        },
        { 
            week: '15', 
            class: '28', 
            date: 'Mié 20, Nov 2024', 
            description: [
                {
                    text: 'Feedback Proyecto Etapa 01'
                },
                {
                    text: 'Avance Proyecto Etapa 02'
                }
            ]
        },
        { 
            week: '16', 
            class: '29', 
            date: 'Lun 25, Nov 2024', 
            description: [
                {
                    text: 'Avance Proyecto Etapa 02'
                }
            ]
        },
        { 
            week: '16', 
            class: '30', 
            date: 'Mié 27, Nov 2024', 
            description: [
                {
                    text: 'Entrega Proyecto Etapa 01'
                }
            ]
        },
        { 
            week: '17', 
            class: '31', 
            date: 'Lun 02, Dic 2024', 
            description: [
                {
                    text: 'Feedback Proyecto Etapa 02'
                }
            ]
        },
        { 
            week: '17', 
            class: '32', 
            date: 'Mié 04, Dic 2024', 
            description: [
                {
                    text: 'Feedback Informe'
                }
            ]
        },
        { 
            week: '18', 
            class: '33', 
            date: 'Lun 09, Dic 2024', 
            description: [
                {
                    text: 'Entrega Proyecto: Trigonautas',
                    href: 'proyecto'
                }
            ]
        },
        { 
            week: '18', 
            class: '34', 
            date: 'Mié 11, Dic 2024', 
            description: [
                {
                    text: 'Cierre de Notas'
                }
            ]
        }
    ]
};

export default courseData;