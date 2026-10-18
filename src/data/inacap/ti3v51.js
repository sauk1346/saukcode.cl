const courseData = {
    courseCode: "TI3V51",
    courseTitle: "Arquitectura y Almacenamiento de Datos",
    courseDescription: "Arquitectura y almacenamiento de datos es una asignatura práctica, del área formativa de especialidad de Tecnologías de Información y Ciberseguridad, dictada en modalidad semipresencial. Al finalizar, el estudiante será capaz de analizar y proponer soluciones para el almacenamiento de información a través de arquitecturas conocidas, considerando la Ética y Ciudadanía.",
    professorData: {
        name: "Sebastián Alejandro Pizarro Álvarez",
        email: "sebastian.pizarro02@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Fundamentos de almacenamiento'
        },
        { 
            unit: '2',
            description: 'Herramientas de implementación'
        },
        { 
            unit: '3',
            description: 'Implementación de soluciones'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1,
            date: 'Mié 01, Abr 2026',
            weighting: '15%', 
            description: {
                text: 'Informe 01',
                href: 'docs/informe01.pdf'
            }
        },
        { 
            evaluationNumber: 2,
            date: 'Mié 22, Abr',
            weighting: '35%', 
            description: [
                {
                    text: 'Informe 02',
                    href: 'docs/informe02.pdf'
                },
                {
                    text: 'script-segmentado.rar',
                    href: 'data/script-segmentado.rar'
                },
            ]
        },
        { 
            evaluationNumber: 3,
            date: 'Lun 11, May 2026',
            weighting: '35%', 
            description: [
                {
                    text: 'Informe 03',
                    href: 'docs/Informe03.pdf'
                },
                {
                    text: 'Informe Técnico',
                    href: 'docs/Informe-Tecnico.pdf'
                },
                {
                    text: 'dashboards.pbit',
                    href: 'data/dashboards.pbit'
                },
                {
                    text: 'script.sql',
                    href: 'data/dashboards.sql'
                },
            ]
        },
        { 
            evaluationNumber: 4,
            date: '',
            weighting: '15%', 
            description: [
                {
                    text: 'Evaluación diagnóstica',
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
            date: 'Lun 09, Mar 2026', 
            description: [
                {
                    text: 'Introducción al DataWarehouse',
                    href:'clase01'
                },
                {
                    text: 'Datawarehouse.pdf',
                    href: 'docs/Datawarehouse.pdf',
                }
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Mié 11, Mar 2026', 
            description: [
                {
                    text: 'Integridad de Bases de Datos',
                    href:'clase02'
                    
                },
                {
                    text: 'Integridad.pdf',
                    href: 'docs/Integridad.pdf'
                }
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Lun 16, Mar 2026', 
            description: [
                {
                    text: 'Restricciones de Integridad en SQL',
                    href: 'clase03'
                }
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Mié 18, Mar 2026', 
            description: [
                {
                    text: 'Arquitectura de DW: Kimball, Inmon y ETL',
                    href: 'clase04'
                }
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Lun 23, Mar 2026', 
            description: [
                {
                    text: 'OLAP: Cubos de Datos, Tipos y Diseño',
                    href: 'clase05'
                },
                {
                    text: 'PPTARQ.pdf',
                    href: 'docs/PPTARQ.pdf'
                }
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Mié 25, Mar 2026', 
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
            date: 'Lun 30, Mar 2026', 
            description: [
                {
                    text: 'Instrucciones Informe 01',
                    href: 'docs/Instrucciones-Informe01.pdf'
                }
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Mié 01, Abr 2026', 
            description: [
                {
                    text: 'Avance Informe 01: Modelo de negocio (1)',
                    href: ''
                }
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Lun 06, Abr 2026', 
            description: [
                {
                    text: 'Avance Informe 01: Modelo de negocio (2)',
                    href: ''
                }
            ]
        },
        { 
            week: '05', 
            class: '10', 
            date: 'Mié 08, Abr 2026', 
            description: [
                {
                    text: 'Instrucciones Informe 02',
                    href: 'docs/Instrucciones-Informe02.pdf'
                }
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Lun 13, Abr 2026', 
            description: [
                {
                    text: 'Avance Informe 02: script BD (1)',
                    href: ''
                }
            ]
        },
        { 
            week: '06', 
            class: '12', 
            date: 'Mié 15, Abr 2026', 
            description: [
                {
                    text: 'Avance Informe 02: script BD (2)',
                    href: ''
                }
            ]
        },
        { 
            week: '07', 
            class: '13', 
            date: 'Lun 20, Abr 2026', 
            description: [
                {
                    text: 'Avance Informe 02: script BD (3)',
                    href: ''
                },
                {
                    text: 'Introducción Power BI',
                    href: ''
                },
            ]
        },
        { 
            week: '07', 
            class: '14', 
            date: 'Mié 22, Abr 2026', 
            description: [
                {
                    text: 'No asistí',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Lun 27, Abr 2026', 
            description: [
                {
                    text: 'Revisión Informe 02 y script BD (1)',
                    href: ''
                }
            ]
        },
        { 
            week: '08', 
            class: '16', 
            date: 'Mié 29, Abr 2026', 
            description: [
                {
                    text: 'Revisión Informe 02 y script BD (2)',
                    href: ''
                }
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Lun 04, May 2026', 
            description: [
                {
                    text: 'Instrucciones Informe 03',
                    href: 'docs/Instrucciones-Informe03.pdf'
                }
            ]
        },
        { 
            week: '09', 
            class: '18', 
            date: 'Mié 06, May 2026', 
            description: [
                {
                    text: 'Avance Informe 03: Dashboards Power BI (1)',
                    href: ''
                }
            ]
        },
        { 
            week: '10', 
            class: '19', 
            date: 'Lun 11, May 2026', 
            description: [
                {
                    text: 'Avance Informe 03: Dashboards Power BI (2)',
                    href: ''
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
                    href: ''
                }
            ]
        },
    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Vie 13, Mar 2026', 
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
            date: 'Vie 13, Mar 2026', 
            description: [
                {
                    text: 'Arquitecturas que transforman datos en valor',
                    href: 'lectura02'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Vie 20, Mar 2026', 
            description: [
                {
                    text: 'Arquitecturas en acción: integración, nube y automatización',
                    href: 'lectura03'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '04', 
            date: 'Vie 27, Mar 2026', 
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
            date: 'Vie 27, Mar 2026', 
            description: [
                {
                    text: 'Del dato crudo a la información útil: procesos ETL en acción',
                    href: 'lectura05'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '06', 
            date: 'Vie 03, Abr 2026', 
            description: [
                {
                    text: 'Automatizando la integración de datos con Pentaho',
                    href: 'lectura06'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '07', 
            date: 'Vie 10, Abr 2026', 
            description: [
                {
                    text: 'De la arquitectura a la acción: integración y despliegue final del almacén de dato',
                    href: 'lectura07'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '08', 
            date: 'Vie 17, Abr 2026', 
            description: [
                {
                    text: 'Resumen Unidad 3',
                    href: 'docs/lectura08.pdf'
                },
            ]
        },
        { 
            week: '06', 
            lecture: '09', 
            date: 'Vie 17, Abr 2026', 
            description: [
                {
                    text: 'TOGAF: marco estratégico para el desarrollo de planes de implementación de datos',
                    href: 'lectura09'
                },
            ]
        },
        { 
            week: '07', 
            lecture: '10', 
            date: 'Vie 24, Abr 2026', 
            description: [
                {
                    text: 'DMBOK y TOGAF: estándares para la gestión y arquitectura de datos',
                    href: 'lectura10'
                },
            ]
        },
        { 
            week: '08', 
            lecture: '11', 
            date: 'Vie 01, May 2026', 
            description: [
                {
                    text: 'Estrategias de datos en AWS: optimización y evaluación del rendimiento',
                    href: 'lectura11'
                },
            ]
        },
        { 
            week: '09', 
            lecture: '12', 
            date: 'Vie 08, May 2026', 
            description: [
                {
                    text: 'Optimizando el futuro: eficiencia y mejora continua en la arquitectura de datos',
                    href: 'lectura12'
                },
            ]
        },
        
    ]
};

export default courseData;