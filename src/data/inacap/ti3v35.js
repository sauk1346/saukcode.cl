const courseData = {
    courseCode: "TI3V35",
    courseTitle: "Sistemas Operativos",
    courseDescription: "Sistemas operativos es una asignatura práctica, del área formativa de Tecnologías de Información y Ciberseguridad, dictada en modalidad presencial con componente online. Al finalizar, el estudiante será capaz de gestionar y administrar distintos sistemas operativos con el objetivo de configurar servicios de infraestructura, considerando el aprendizaje continuo y la resolución de problemas.",
    professorData: {
        name: "Cesar Salinas Zepeda",
        email: "cesar.salinas04@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Direccionamiento de redes basada en protocolos TCP/IP'
        },
        { 
            unit: '2',
            description: 'Sistema operativo Windows Server'
        },
        { 
            unit: '3',
            description: 'Sistema operativo Linux Server'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1,
            date: 'Lun 02, Jun 2025',
            weighting: '15%',
            description: [
                {
                    text: '1ra parte (FLSM)',
                    href: 'eval01-1'
                },
                {
                    text: '2da parte (VLSM)',
                    href: 'eval01-2'
                }
            ],
            quickGuide: [
                {
                    text: 'Guía 00: Conceptos',
                    href: 'guia00'
                },
                {
                    text: 'Guía 01: Ejercicio Base (FLSM)',
                    href: 'guia01'
                },
                {
                    text: 'Guía 02: PPT (FLSM)',
                    href: 'guia02'
                },
                                {
                    text: 'Guía 03: VLSM',
                    href: 'guia03'
                }
            ]
        },
        { 
            evaluationNumber: 2,
            date: 'Lun 30, Jun 2025',
            weighting: '30%',
            description: {
                text: 'Windows Server',
                href: 'eval02'
            }
        },
        { 
            evaluationNumber: 3,
            date: 'Vie 18, Jul 2025',
            weighting: '30%',
            description: {
                text: 'Linux Server',
                href: 'eval03'
            }
        },
        { 
            evaluationNumber: 4,
            date: 'Mié 23, Jul 2025',
            weighting: '25%',
            description: {
                text: 'Informe: Comandos Linux',
                href: 'docs/informe01.pdf',
                external: true
            }
        }
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Lun 19, May 2025', 
            description: [
                {
                    text: 'Introducción TCP/IP',
                    href: 'clase01'
                }
            ]
        },
        { 
            week: '02', 
            class: '02', 
            date: 'Lun 26, May 2025', 
            description: [
                {
                    text: 'FLSM (1)'
                }
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Mié 28, May 2025', 
            description: [
                {
                    text: 'FLSM (2)',
                    href: 'docs/subnetting.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '03', 
            class: '04', 
            date: 'Lun 02, Jun 2025', 
            description: [
                {
                    text: 'Evaluación 01 parte 1: FLSM',
                    href: 'eval01-1'
                },
                {
                    text: 'VLSM (1)',
                    href: 'clase04'
                }
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Mié 04, Jun 2025', 
            description: [
                {
                    text: 'Guía 03: VLSM',
                    href: 'guia03'
                }
            ]
        },
        { 
            week: '04', 
            class: '06', 
            date: 'Lun 09, Jun 2025', 
            description: [
                {
                    text: 'Evaluación 01 parte 2: VLSM',
                    href: 'eval01-2'
                }
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Mié 11, Jun 2025', 
            description: [
                {
                    text: 'Windows Server (1)',
                    href: 'docs/clase07.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '05', 
            class: '08', 
            date: 'Lun 16, Jun 2025', 
            description: [
                {
                    text: 'Windows Server (2)'
                }
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Mié 18, Jun 2025', 
            description: [
                {
                    text: 'Windows Server (3)'
                }
            ]
        },
        { 
            week: '06', 
            class: '10', 
            date: 'Lun 23, Jun 2025', 
            description: [
                {
                    text: 'Windows Server (4)'
                }
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Mié 25, Jun 2025', 
            description: [
                {
                    text: 'Windows Server (5)'
                }
            ]
        },
        { 
            week: '07', 
            class: '12', 
            date: 'Lun 30, Jun 2025', 
            description: [
                {
                    text: 'Evaluación 02: Windows Server',
                    href: 'eval02'
                }
            ]
        },
        { 
            week: '07', 
            class: '13', 
            date: 'Mié 02, Jul 2025', 
            description: [
                {
                    text: 'Introducción Linux'
                }
            ]
        },
        { 
            week: '08', 
            class: '14', 
            date: 'Lun 07, Jul 2025', 
            description: [
                {
                    text: 'Linux Server: Configuración Repositorios',
                    href: 'docs/clase14.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Mié 09, Jul 2025', 
            description: [
                {
                    text: 'Linux Server: Herramientas Principales (1)',
                    href: 'docs/clase15.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '09', 
            class: '16', 
            date: 'Lun 14, Jul 2025', 
            description: [
                {
                    text: 'Linux Server: Herramientas Principales (2)',
                    href: 'docs/clase15.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Mié 16, Jul 2025', 
            description: [
                {
                    text: 'Suspensión Clases: Feriado',
                    strikethrough: true
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
                    text: 'Unidad 1: Direccionamiento de redes basada en protocolos TCP/IP',
                    href: 'docs/lectura01.pdf',
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
                    text: 'Interconexión de dispositivos y redes',
                    href: 'lectura02'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Sáb 31, May 2025', 
            description: [
                {
                    text: 'Cálculo de clases de dirección',
                    href: 'lectura03'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '04', 
            date: 'Sáb 07, Jun 2025', 
            description: [
                {
                    text: 'Técnicas de cálculo VLSM',
                    href: 'lectura04'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '05', 
            date: 'Sáb 14, Jun 2025', 
            description: [
                {
                    text: 'Unidad 2: Sistema operativo Windows Server',
                    href: 'docs/lectura05.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '04', 
            lecture: '06', 
            date: 'Sáb 14, Jun 2025', 
            description: [
                {
                    text: 'Configuración básica en la instalación de un sistema operativo Windows Server',
                    href: 'lectura06'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '07', 
            date: 'Sáb 21, Jun 2025', 
            description: [
                {
                    text: 'Incorporación de la estación de trabajo en el dominio',
                    href: 'lectura07'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '08', 
            date: 'Sáb 28, Jun 2025', 
            description: [
                {
                    text: 'Políticas GPO en los objetos de dominio',
                    href: 'lectura08'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '09', 
            date: 'Sáb 05, Jul 2025', 
            description: [
                {
                    text: 'Unidad 3: Sistema operativo Linux Server',
                    href: 'docs/lectura09.pdf',
                    external: true
                }
            ]
        },
        { 
            week: '07', 
            lecture: '10', 
            date: 'Sáb 05, Jul 2025', 
            description: [
                {
                    text: 'Licenciamiento de software',
                    href: 'lectura10'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '11', 
            date: 'Sáb 12, Jul 2025', 
            description: [
                {
                    text: 'Gestión de archivos y directorios en Linux',
                    href: 'lectura11'
                }
            ]
        },
        { 
            week: '09', 
            lecture: '12', 
            date: 'Sáb 19, Jul 2025', 
            description: [
                {
                    text: 'Recurso Integrativo de la Unidad',
                    href: 'lectura12'
                }
            ]
        }
    ]
};

export default courseData;