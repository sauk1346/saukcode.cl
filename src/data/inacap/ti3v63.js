const courseData = {
    courseCode: "TI3V63",
    courseTitle: "Gestión de Servicios y Gobernabilidad TI",
    courseDescription: "Gestión de servicios y Gobernabilidad TI es una asignatura lectiva, del área formativa de Tecnologías de Información y Ciberseguridad, dictada en modalidad presencial. Al finalizar, el estudiante será capaz de gestionar los servicios de TI a través de su ciclo de vida a fin de mantener el control de los riesgos y asegurar la inversión en TI que genere valor para el negocio, considerando el Aprendizaje Continuo o Permanente.",
    professorData: {
        name: "Rafael Aderito Romero Sanabria",
        email: "rafael.romero03@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Estableciendo un Gobierno TI'
        },
        { 
            unit: '2',
            description: 'Gestión de los Servicios TI'
        },
        { 
            unit: '3',
            description: 'Implantación de Gobierno TI'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1,
            date: 'Jue 10, Sep 2026',
            weighting: '15%', 
            description: {
                text: 'Informe 01',
                href: 'docs/informe01.pdf'
            }
        },
        { 
            evaluationNumber: 2,
            date: 'Jue 24, Sep 2026',
            weighting: '35%', 
            description: {
                text: 'Informe 02',
                href: 'docs/informe02.pdf'
            }
        },
        { 
            evaluationNumber: 3,
            date: 'Jue 08, Oct 2026',
            weighting: '35%', 
            description: {
                text: 'Informe 03',
                href: ''
            }
        },
        { 
            evaluationNumber: 4,
            date: 'Vie 09, Oct 2026',
            weighting: '15%', 
            description: [
                {
                    text: 'Diagnóstico',
                    href: 'diagnostico'
                },
                {
                    text: 'Controles',
                    href: 'controles'
                },
            ]
        },
        
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Lun 10, Ago 2026', 
            description: [
                {
                    text: 'Introducción Asignatura',
                    href:'docs/clase01.pdf'
                },
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Jue 13, Ago 2026', 
            description: [
                {
                    text: 'Gobierno de TI',
                    href:'docs/clase02.pdf'
                },
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Lun 17, Ago 2026', 
            description: [
                {
                    text: 'COBIT y Estándares TI',
                    href:'docs/clase03.pdf'
                },
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Jue 20, Ago 2026', 
            description: [
                {
                    text: 'Gestión de Servicios y Gobernabilidad',
                    href:'docs/clase04.pdf'
                },
            ]
        },
        { 
            week: '03', 
            class: '05', 
            date: 'Lun 24, Ago 2026', 
            description: [
                {
                    text: 'Fases del Ciclo de Vida ITIL',
                    href:'docs/clase05.pdf'
                },
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Jue 27, Ago 2026', 
            description: [
                {
                    text: 'Incidentes y Problemas TI',
                    href:'docs/clase06.pdf'
                },
            ]
        },
        { 
            week: '04', 
            class: '07', 
            date: 'Lun 31, Ago 2026', 
            description: [
                {
                    text: 'Incidentes y Problemas TI',
                    href:'docs/clase06.pdf'
                },
            ]
        },
        { 
            week: '04', 
            class: '08', 
            date: 'Jue 03, Sep 2026', 
            description: [
                {
                    text: 'Instrucciones Informe 01',
                    href:'docs/instrucciones-informe01.pdf'
                },
            ]
        },
        { 
            week: '05', 
            class: '09', 
            date: 'Lun 07, Sep 2026', 
            description: [
                {
                    text: 'Horario Consultas: Informe 01',
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
                    text: 'Instrucciones Informe 02',
                    href:'docs/instrucciones-informe02.pdf'
                },
            ]
        },
        { 
            week: '06', 
            class: '11', 
            date: 'Lun 14, Sep 2026', 
            description: [
                {
                    text: 'Transición del Servicio',
                    href:'docs/clase11.pdf'
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
                    text: 'Integración de Procesos en el Ciclo de Vida',
                    href: 'docs/clase13.pdf'
                },
            ]
        },
        { 
            week: '07', 
            class: '14', 
            date: 'Jue 24, Sep 2026', 
            description: [
                {
                    text: 'Operación del Servicio',
                    href: 'docs/clase14.pdf'
                },
            ]
        },
        { 
            week: '08', 
            class: '15', 
            date: 'Lun 28, Sep 2026', 
            description: [
                {
                    text: 'Servicios TI bajo Control',
                    href: 'docs/clase15.pdf'
                },
            ]
        },
        { 
            week: '08', 
            class: '16', 
            date: 'Jue 01, Oct 2026', 
            description: [
                {
                    text: 'Roadmap TI',
                    href: ''
                },
            ]
        },
        { 
            week: '09', 
            class: '17', 
            date: 'Lun 05, Oct 2026', 
            description: [
                {
                    text: 'Mejora Continua del Servicio',
                    href: ''
                },
            ]
        },
        { 
            week: '09', 
            class: '18', 
            date: 'Jue 08, Oct 2026', 
            description: [
                {
                    text: 'Horario Consultas: Informe 03',
                    href: ''
                },
            ]
        },

    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Sáb 15, Ago 2026', 
            description: {
                text: 'Gobierno TI: decisiones estratégicas para organizaciones digitales',
                href: ''
            }
        },
        { 
            week: '02', 
            lecture: '02', 
            date: 'Sáb 22, Ago 2026', 
            description: {
                text: 'COBIT y estándares TI: control, estrategia y mejora organizacional',
                href: ''
            }
        },
        { 
            week: '03', 
            lecture: '03', 
            date: 'Sáb 29, Ago 2026', 
            description: {
                text: 'ITIL y el ciclo de vida que transforma los servicios TI',
                href: ''
            }
        },
        { 
            week: '04', 
            lecture: '04', 
            date: 'Sáb 05, Sep 2026', 
            description: {
                text: 'Incidentes y problemas TI: respuestas clave para servicios de calidad',
                href: ''
            }
        },
        { 
            week: '05', 
            lecture: '05', 
            date: 'Sáb 12, Sep 2026', 
            description: {
                text: 'Servicios TI bajo control: evaluación, análisis y mejora continua',
                href: ''
            }
        },
        { 
            week: '06', 
            lecture: '06', 
            date: 'Sáb 19, Sep 2026', 
            description: {
                text: 'Roadmap TI: planificación y merjora para servicios de calidad',
                href: ''
            }
        },
        
    ]
};

export default courseData;