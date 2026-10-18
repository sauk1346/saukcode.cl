const courseData = {
    courseCode: "TI3V52",
    courseTitle: "Redes de Datos",
    courseDescription: "Redes de datos es una asignatura práctica, del área formativa de especialidad de Tecnologías de Información, dictada en modalidad presencial. Al finalizar, el estudiante será capaz de aplicar configuraciones en distintos dispositivos de redes, basado en los estándares de redes de datos, considerando la Resolución de Problemas, Innovación y Emprendimiento.",
    professorData: {
        name: "Jaime Alejandro Cuevas Monsalves",
        email: "jaime.cuevas@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Conceptos básicos de modelo OSI, TCP/IP y dispositivos de redes'
        },
        { 
            unit: '2',
            description: 'Direccionamiento IPV4 e IPV6 con VLSM'
        },
        { 
            unit: '3',
            description: 'Configuraciones avanzadas de enrutamiento'
        },
    ],
    evaluationsData: [
        {
            evaluationNumber: 1,
            date: 'Jue 04, Jun 2026',
            weighting: '15%',
            description: {
                text: 'Red LAN y configuraciones básicas',
                href: 'eval01',
            }
        },
        {
            evaluationNumber: 2,
            date: 'Jue 25, Jun 2026',
            weighting: '35%',
            description: {
                text: 'VLSM',
                href: 'eval02',
            }
        },
        {
            evaluationNumber: 3,
            date: 'Lun 20, Jul 2026',
            weighting: '35%',
            description: {
                text: 'Enrutamiento',
                href: 'eval03',
            }
        },
        {
            evaluationNumber: 4,
            date: 'Jue 23, Jul 2026',
            weighting: '25%',
            description: [
                {
                    text: 'Evaluación diagnóstica',
                    href: 'diagnostica',
                },
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
            date: 'Lun 18, May 2026', 
            description: [
                {
                    text: 'Descripción Asignatura',
                    href: 'docs/clase01.pdf'
                },
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
            date: 'Lun 25, May 2026', 
            description: [
                {
                    text: 'Modelo OSI y Modelo TCP/IP',
                    href: 'docs/osi-tcp-ip.pdf'
                },
                {
                    text: 'Red LAN y configuraciones básicas - Ejercicio 02',
                    href: 'unit01-ej02'
                },

            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Jue 28, May 2026', 
            description: [
                {
                    text: 'Comandos IOS para Configuración de Redes',
                    href: 'docs/comandos-ios.pdf'
                },
                {
                    text: 'Red LAN y configuraciones básicas - Ejercicio 03',
                    href: 'unit01-ej03'
                },
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Lun 01, Jun 2026', 
            description: [
                {
                    text: 'TCP/IP - Ejercicio 04',
                    href: 'unit01-ej04'
                }
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Jue 04, Jun 2026', 
            description: [
                {
                    text: 'Evaluación 01',
                    href: 'eval01'
                }
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Lun 08, Jun 2026', 
            description: [
                {
                    text: 'Direccionamiento IP',
                    href: 'docs/direccionamiento-IP.pdf'
                },
                {
                    text: 'Guía 01: Direcciones IPv4',
                    href: 'unit02-guia01'
                }
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Jue 11, Jun 2026', 
            description: [
                {
                    text: 'Ejercicio 01 de VLSM',
                    href: 'unit02-ej01'
                }
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Lun 15, Jun 2026', 
            description: [
                {
                    text: 'Ejercicio 02 de VLSM',
                    href: 'unit02-ej02'
                }
            ]
        },
        { 
            week: '05', 
            class: '10', 
            date: 'Jue 18, Jun 2026', 
            description: [
                {
                    text: 'Ejercicio 03 de VLSM',
                    href: 'unit02-ej03'
                },
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Lun 22, Jun 2026', 
            description: [
                {
                    text: 'Ejercicio 04 de VLSM',
                    href: 'docs/unit02-ej04.pdf'
                },
            ]
        },
        { 
            week: '06', 
            class: '12', 
            date: 'Jue 25, Jun 2026', 
            description: [
                {
                    text: 'Evaluación 02',
                    href: 'eval02'
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
            date: 'Jue 02, Jul 2026', 
            description: [
                {
                    text: 'Fundamentos de Enrutamiento',
                    href: ''
                }
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Lun 06, Jul 2026', 
            description: [
                {
                    text: 'Ejercicio 01: Configuración OSFP',
                    href: 'unit03-ej01'
                },
                {
                    text:'Ejercicio 02: Determinar DR y BDR',
                    href:'unit03-ej02'
                }
            ]
        },
        { 
            week: '08', 
            class: '16', 
            date: 'Jue 09, Jul 2026', 
            description: [
                {
                    text: 'Ejercicio 03: Modificar tiempos de hello y dead',
                    href: ''
                },
                {
                    text: 'Ejercicio 04: OSPFv2',
                    href: 'unit03-ej04'
                },
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Lun 13, Jul 2026', 
            description: [
                {
                    text: 'Ejercicio 05: OSPFv3',
                    href: ''
                }
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
                }
            ]
        },
        { 
            week: '10', 
            class: '19', 
            date: 'Lun 20, Jul 2026', 
            description: [
                {
                    text: 'Evaluación 03',
                    href: 'eval03'
                }
            ]
        },
        { 
            week: '10', 
            class: '20', 
            date: 'Jue 23, Jul 2026', 
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
            date: 'Sáb 23, May 2026', 
            description: {
                text: 'Lectura dirigida: Estándares IEEE 802.3 y IEEE 802.11',
                href: 'docs/lectura01.pdf',
            }
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Sáb 23, May 2026', 
            description: {
                text: 'Estándares IEEE 802.3 y IEEE 802.11',
                href: 'lectura02',
            }
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Sáb 30, May 2026', 
            description: {
                text: 'Comandos Básicos y Seguridad en Routers y Switches Cisco',
                href: 'lectura03',
            }
        },
        { 
            week: '03', 
            lecture: '04', 
            date: 'Sáb 06, Jun 2026', 
            description: {
                text: 'Fundamentos y protocolos IP',
                href: 'docs/lectura04.pdf',
            }
        },
        { 
            week: '04', 
            lecture: '05', 
            date: 'Sáb 13, Jun 2026', 
            description: {
                text: 'Clases, tipos y taller VLSM',
                href: 'lectura05',
            }
            
        },
        { 
            week: '05', 
            lecture: '06', 
            date: 'Sáb 20, Jun 2026', 
            description: {
                text: 'Aplicación, configuración y factibilidad',
                href: 'docs/lectura06.pdf',
            }
        },
        { 
            week: '06', 
            lecture: '07', 
            date: 'Sáb 27, Jun 2026', 
            description: {
                text: 'Configuración y verificación de enrutamiento estático redes de datos',
                href: 'lectura07',
            }
        },
        { 
            week: '07', 
            lecture: '08', 
            date: 'Sáb 04, Jul 2026', 
            description: {
                text: 'Enrutamiento dinámico con OSPFv2',
                href: 'lectura08',
            }
        },
        { 
            week: '08', 
            lecture: '09', 
            date: 'Sáb 11, Jul 2026', 
            description: {
                text: 'Enrutamiento dinámico con OSPFv3',
                href: 'lectura09',
            }
        },
        { 
            week: '09', 
            lecture: '10', 
            date: 'Sáb 18, Jul 2026', 
            description: {
                text: 'Integración y resolución de problemas de enrutamiento IPv4 e IPv6',
                href: 'lectura10',
            }
        },
    ]
};

export default courseData;