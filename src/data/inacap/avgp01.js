const courseData = {
    courseCode: "AVGP01",
    courseTitle: "Gestión de Personas",
    courseDescription: "Gestión de Personas es una asignatura lectiva, presencial, de la línea de administración del área Formación para la Empleabilidad. Al finalizar la asignatura el estudiante será capaz de aplicar los lineamientos sobre la dirección estratégica de personas, modelos de gestión estratégica del desempeño y aspectos relevantes de la legislación laboral en Chile, para su implementación en el área de gestión de personas, considerando el trabajo colaborativo y la comunicación y las competencias digitales.",
    professorData: {
        name: "Rodrigo Ignacio Terzán Gómez",
        email: "rodrigo.terzan@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Gestión estratégica y modelo por competencia'
        },
        { 
            unit: '2',
            description: 'Gestión del desempeño por competencia'
        },
        { 
            unit: '3',
            description: 'Relaciones laborales y legislación chilena'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1,
            date: 'Dom 29, Mar 2026',
            weighting: '20%', 
            description: {
                text: 'Informe: Caso Nestlé Chile',
                href: 'docs/informe01.pdf'
            }
        },
        { 
            evaluationNumber: 2,
            date: 'Lun 20, Abr 2026',
            weighting: '40%', 
            description: {
                text: 'Presentación: Caso FinaChile',
                href: 'docs/Presentacion-Eval02.pdf'
            }
        },
        { 
            evaluationNumber: 3,
            date: 'Lun 04, May 2026',
            weighting: '30%', 
            description: {
                text: 'Prueba Escrita',
                href: ''
            }
        },
        { 
            evaluationNumber: 4,
            date: 'Jue 07, May 2026',
            weighting: '10%', 
            description: [
                {
                    text: 'Controles',
                    href: 'controles'
                },
                {
                    text: 'Actividad 05: Retención de talento con IA',
                    href: 'docs/Actividad05.pdf'
                },
                {
                    text: 'Actividad 07: Caso - AgroTech Chile SA',
                    href: 'docs/Actividad07.pdf'
                },
                {
                    text: 'Actividad 10: Caso - Logisur SA',
                    href: 'docs/Actividad10.pdf'
                },
                {
                    text: 'Actividad 13: Caso - Mieles del Sur',
                    href: 'docs/Actividad13.pdf'
                },
            ]
             
        }
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Lun 09, Mar 2026', 
            description: [
                {
                    text: 'Unidad 1: Principios de la Gestión Estratégica de Personas',
                    href: 'docs/Introduccion01.pdf'
                }
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Jue 12, Mar 2026', 
            description: [
                {
                    text: 'Caso: TransAlim Ltda',
                    href: 'docs/Caso-TransAlimLtda.pdf'
                },
                {
                    text: 'Resolución Preguntas',
                    href: 'clase02'
                }

            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Lun 16, Mar 2026', 
            description: [
                {
                    text: 'Caso: Nestlé Chile',
                    href: 'docs/Caso-NestléChile.pdf'
                },
                {
                    text: 'Resolución Preguntas',
                    href: 'clase03'
                }
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Jue 19, Mar 2026', 
            description: [
                {
                    text: 'plan-estrategico-RRHH.pdf',
                    href: 'docs/plan-estrategico-RRHH.pdf'
                }
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Lun 23, Mar 2026', 
            description: [
                {
                    text: 'Instrucciones Actividad 05',
                    href: 'docs/Instrucciones-Actividad05.pdf'
                    
                }
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Jue 26, Mar 2026', 
            description: [
                {
                    text: 'Consultas Actividades Aula Virtual',
                }
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Lun 30, Mar 2026', 
            description: [
                {
                    text: 'Unidad 2: Principios de la Gestión de Desempeño',
                    href: 'docs/Introduccion02.pdf'
                },
                {
                    text: 'Instrucciones Actividad 07',
                    href: 'docs/Instrucciones-Actividad07.pdf'
                }
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Jue 02, Abr 2026', 
            description: [
                {
                    text: 'Suspensión clases: Semana Santa',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Lun 06, Abr 2026', 
            description: [
                {
                    text: 'Caso: Servilog SA',
                    href: 'docs/Caso-ServilogSA.pdf'
                }
            ]
        },
        { 
            week: '05', 
            class: '10', 
            date: 'Jue 09, Abr 2026', 
            description: [
                {
                    text: 'Instrucciones Actividad 10',
                    href: 'docs/Instrucciones-Actividad10.pdf'
                },
                {
                    text: 'Datos-Caso-Logisur.xlsx',
                    href: 'docs/Datos-Caso-Logisur.xlsx'
                },
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Lun 13, Abr 2026', 
            description: [
                {
                    text: 'Instrucciones Evaluación 02',
                    href: 'docs/Instrucciones-Eval02.pdf'
                },
                {
                    text: 'Rúbrica Evaluación 02',
                    href: 'docs/Rubrica-Eval02.pdf'
                },
                {
                    text: 'Caso: FinaChile SA',
                    href: 'docs/Caso-FinaChileSA.pdf'
                },
            ]
        },
        { 
            week: '06', 
            class: '12', 
            date: 'Jue 16, Abr 2026', 
            description: [
                {
                    text: 'Instrucciones Actividad 13',
                    href: 'docs/Instrucciones-Actividad13.pdf'
                }
            ]
        },
        { 
            week: '07', 
            class: '13', 
            date: 'Lun 20, Abr 2026', 
            description: [
                {
                    text: 'Evaluación 02: Disertación (1)',
                    
                }
            ]
        },
        { 
            week: '07', 
            class: '14', 
            date: 'Jue 23, Abr 2026', 
            description: [
                {
                    text: 'Evaluación 02: Disertación (2)',
                    href: 'docs/Presentacion-Eval02.pdf'
                    
                }
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Lun 27, Abr 2026', 
            description: [
                {
                    text: 'Unidad 3: Relaciones laborales y legislación chilena',
                    href: 'docs/lectura12.pdf'
                    
                },
                {
                    text: 'Guía de estudio Unidad 3',
                    href: 'docs/guia-modulo03.pdf'
                    
                }
            ]
        },
        { 
            week: '08', 
            class: '16', 
            date: 'Jue 30, Abr 2026', 
            description: [
                {
                    text: 'Suspensión clases: vísperas feriado',
                    strikethrough: true
                    
                }
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Lun 04, May 2026', 
            description: [
                {
                    text: 'Evaluación 03',
                    href: ''
                    
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
            date: 'Lun 11, May 2026', 
            description: [
                {
                    text: 'Material para Examen',
                    href: 'docs/Materia-Examen.pdf'
                    
                },
                {
                    text: 'Cuestionario para Examen',
                    href: 'docs/Cuestionario-Examen.pdf'
                    
                },
            ]
        },
        { 
            week: '10', 
            class: '20', 
            date: 'Jue 14, May 2026', 
            description: [
                {
                    text: 'Examen (si nota < 5.0)',
                    href: ''
                    
                }
            ]
        },


    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Sáb 14, Mar 2026', 
            description: [
                {
                    text: 'Fundamentos de la gestión del talento en las organizaciones',
                    href: 'lectura01'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '02', 
            date: 'Sáb 21, Mar 2026', 
            description: [
                {
                    text: 'Elementos clave en la definición de roles y la cultura organizacional',
                    href: 'lectura02'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '03', 
            date: 'Sáb 28, Mar 2026', 
            description: [
                {
                    text: 'Tendencias actuales en Gestión de personas',
                    href: 'lectura03'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '04', 
            date: 'Sáb 28, Mar 2026', 
            description: [
                {
                    text: 'Gestión estratégica y modelo por competencia',
                    href: 'docs/lectura04.pdf'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '05', 
            date: 'Sáb 28, Mar 2026', 
            description: [
                {
                    text: 'Síntesis de la Unidad 01',
                    href: 'docs/sintesis-unidad01.pdf'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '06', 
            date: 'Sáb 04, Abr 2026', 
            description: [
                {
                    text: 'Gestión del desempeño por competencia',
                    href: 'docs/lectura06.pdf'
                },
            ]
        },
        { 
            week: '04', 
            lecture: '07', 
            date: 'Sáb 04, Abr 2026', 
            description: [
                {
                    text: 'Gestión del desempeño, estrategia y contribución a la mejora continua',
                    href: 'lectura07'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '08', 
            date: 'Sáb 11, Abr 2026', 
            description: [
                {
                    text: 'Evaluación del desempeño por competencias, impacto en el desarrollo de los empleados',
                    href: 'lectura08'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '09', 
            date: 'Sáb 18, Abr 2026', 
            description: [
                {
                    text: 'Desarrollo profesional y gestión por competencias',
                    href: 'lectura09'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '10', 
            date: 'Sáb 25, Abr 2026', 
            description: [
                {
                    text: 'Tendencias actuales en la gestión del desempeño, evaluaciones continuas, feedback 360°',
                    href: 'lectura10'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '11', 
            date: 'Sáb 25, Abr 2026', 
            description: [
                {
                    text: 'Síntesis de la Unidad 02',
                    href: 'docs/lectura11.pdf'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '12', 
            date: 'Sáb 02, May 2026', 
            description: [
                {
                    text: 'Relaciones labores y legislación chilena',
                    href: 'docs/lectura12.pdf'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '13', 
            date: 'Sáb 02, May 2026', 
            description: [
                {
                    text: 'Mercado laboral chileno',
                    href: 'lectura13'
                }
            ]
        },
        { 
            week: '09', 
            lecture: '14', 
            date: 'Sáb 09, May 2026', 
            description: [
                {
                    text: 'Leyes de  Seguridad Social en Chile: ISAPRE, APF, y Seguro de Cesantía',
                    href: 'lectura14'
                }
            ]
        },
        { 
            week: '09', 
            lecture: '15', 
            date: 'Sáb 09, May 2026', 
            description: [
                {
                    text: 'Síntesis de la Unidad 03',
                    href: 'docs/lectura15.pdf'
                }
            ]
        },
    ]
};

export default courseData;