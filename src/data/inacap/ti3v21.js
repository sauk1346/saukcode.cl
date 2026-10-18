const courseData = {
    courseCode: "TI3V21",
    courseTitle: "Programación Orientada a Objeto Seguro",
    courseDescription: "Asignatura Práctica, dictada en modalidad presencial con componentes online. Al finalizar, el estudiante será capaz de crear una solución de software con estándares de seguridad que responda a los paradigmas de programación orientada a objetos y conectarse a una Base de datos, considerando el aprendizaje continuo.",
    professorData: {
        name: "Pedro Ernesto Ulloa Morales",
        email: "pedro.ulloa04@inacapmail.cl"
    },
    unitsData: [
        { 
            unit: '1',
            description: 'Programación Orientada a Objeto'
        },
        { 
            unit: '2',
            description: 'Herencia, Encapsulamiento, Polimorfismom y Métodos en Python'
        },
        { 
            unit: '3',
            description: 'Librerías de Seguridad y Consumo de Servicios Externos'
        },
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1, 
            date: 'Mar 05, Nov 2024', 
            weighting: '20%', 
            description: {
                text: 'Evaluación 01',
                href: 'eval01'
            }, 
            quickGuide: [
                {
                    text: 'Guía 01',
                    href: 'guia01'
                }
            ]
        },
        { 
            evaluationNumber: 2, 
            date: 'Mié 27, Nov 2024', 
            weighting: '35%', 
            description: {
                text: 'Evaluación 02',
                href: 'eval02'
            }
        },
        { 
            evaluationNumber: 3, 
            date: 'Mar 17, Dic 2024', 
            weighting: '35%', 
            description: {
                text: 'Proyecto',
                href: 'eval03'
            }
        },
        { 
            evaluationNumber: 4, 
            date: 'Mar 17, Dic 2024', 
            weighting: '10%', 
            description: {
                text: 'Promedio Evaluaciones'
            }
        }
    ],
    classData: [
        { 
            week: '01',
            class: '01',
            date: 'Mar 22, Oct 2024',
            description: [
                {
                    text: 'Ejercicios Python (1)',
                    href: 'clase01'
                }
            ]
        },
        { 
            week: '01',
            class: '02',
            date: 'Mié 23, Oct 2024',
            description: [
                {
                    text: 'Ejercicios Python (2)',
                    href: 'clase02'
                }
            ]
        },
        { 
            week: '02',
            class: '03',
            date: 'Mar 29, Oct 2024',
            description: [
                {
                    text: 'Ejercicios Python (3)',
                    href: 'clase03'
                }
            ]
        },
        { 
            week: '02',
            class: '04',
            date: 'Mié 30, Oct 2024',
            description: [
                {
                    text: 'Ejercicios Python (4)',
                    href: 'clase04'
                }
            ]
        },
        { 
            week: '03',
            class: '05',
            date: 'Mar 05, Nov 2024',
            description: [
                {
                    text: 'Evaluación 01',
                    href: 'eval01'
                }
            ]
        },
        { 
            week: '03',
            class: '06',
            date: 'Mié 06, Nov 2024',
            description: [
                {
                    text: 'Listas',
                    href: 'clase06'
                }
            ]
        },
        { 
            week: '04',
            class: '07',
            date: 'Mar 12, Nov 2024',
            description: [
                {
                    text: 'Ejercicios Listas',
                    href: 'clase07'
                }
            ]
        },
        { 
            week: '04',
            class: '08',
            date: 'Mié 13, Nov 2024',
            description: [
                {
                    text: 'Paradigma POO',
                    href: 'clase08'
                }
            ]
        },
        { 
            week: '05',
            class: '09',
            date: 'Mar 19, Nov 2024',
            description: [
                {
                    text: 'Ejercicios POO (1)',
                    href: 'clase09'
                }
            ]
        },
        { 
            week: '05',
            class: '10',
            date: 'Mié 20, Nov 2024',
            description: [
                {
                    text: 'Ejercicios POO (2)'
                }
            ]
        },
        { 
            week: '06',
            class: '11',
            date: 'Mar 26, Nov 2024',
            description: [
                {
                    text: 'Avance Evaluación 02'
                }
            ]
        },
        { 
            week: '06',
            class: '12',
            date: 'Mié 27, Nov 2024',
            description: [
                {
                    text: 'Entrega Evaluación 02',
                    href: 'eval02'
                }
            ]
        },
        { 
            week: '07',
            class: '13',
            date: 'Mar 03, Dic 2024',
            description: [
                {
                    text: 'Ejercicio para Evaluación 03',
                    href: 'clase13'
                }
            ]
        },
        { 
            week: '07',
            class: '14',
            date: 'Mié 04, Dic 2024',
            description: [
                {
                    text: 'Bases de datos con Python',
                    href: 'clase14'
                }
            ]
        },
        { 
            week: '08',
            class: '15',
            date: 'Mar 10, Dic 2024',
            description: [
                {
                    text: 'Repaso BD con Python'
                }
            ]
        },
        { 
            week: '08',
            class: '16',
            date: 'Mié 11, Dic 2024',
            description: [
                {
                    text: 'Instrucciones Proyecto',
                    href: 'clase16'
                }
            ]
        },
        { 
            week: '09',
            class: '17',
            date: 'Mar 17, Dic 2024',
            description: [
                {
                    text: 'Presentación Proyecto',
                    href: 'eval03'
                }
            ]
        }
    ],
    lectureData: [
        { 
            week: '01',
            lecture: '01',
            date: 'Sáb 26, Oct 2024',
            description: [
                {
                    text: 'Conceptos básicos de POO',
                    href: 'lectura01'
                }
            ]
        },
        { 
            week: '01',
            lecture: '02',
            date: 'Sab 26, Oct 2024',
            description: [
                {
                    text: 'Símbolos diagramas de Clase',
                    href: 'lectura02'
                }
            ]
        },
        { 
            week: '02',
            lecture: '03',
            date: 'Sáb 02, Nov 2024',
            description: [
                {
                    text: 'Las relaciones entre Clases',
                    href: 'lectura03'
                }
            ]
        },
        { 
            week: '02',
            lecture: '04',
            date: 'Sáb 02, Nov 2024',
            description: [
                {
                    text: 'Solucionando un problema con Diagramas de clases en UML',
                    href: 'lectura04'
                }
            ]
        },
        { 
            week: '03',
            lecture: '05',
            date: 'Sáb 09, Nov 2024',
            description: [
                {
                    text: 'Diagrama de Clases una propuesta de solución',
                    href: 'lectura05'
                }
            ]
        },
        { 
            week: '03',
            lecture: '06',
            date: 'Sáb 09, Nov 2024',
            description: [
                {
                    text: 'Códigos con herencia, encapsulamiento y polimorfismo',
                    href: 'lectura06'
                }
            ]
        },
        { 
            week: '04',
            lecture: '07',
            date: 'Sáb 16, Nov 2024',
            description: [
                {
                    text: 'Librerías Python con conexión a base de datos',
                    href: 'lectura07'
                }
            ]
        },
        { 
            week: '04',
            lecture: '08',
            date: 'Sáb 16, Nov 2024',
            description: [
                {
                    text: 'Manipulación de registros',
                    href: 'lectura08'
                }
            ]
        },
        { 
            week: '04',
            lecture: '09',
            date: 'Sáb 16, Nov 2024',
            description: [
                {
                    text: 'Manejo de excepciones y jerarquías',
                    href: 'lectura09'
                }
            ]
        },
        { 
            week: '05',
            lecture: null,
            date: 'Sáb 23, Nov 2024',
            description: [
                {
                    text: 'Repaso contenidos de la unidad'
                }
            ]
        },
        { 
            week: '06',
            lecture: '10',
            date: 'Sáb 30, Nov 2024',
            description: [
                {
                    text: 'Scripts seguros de Python',
                    href: 'lectura10'
                }
            ]
        },
        { 
            week: '06',
            lecture: '11',
            date: 'Sáb 30, Nov 2024',
            description: [
                {
                    text: 'Librerías para consumo de datos externos',
                    href: 'lectura11'
                }
            ]
        },
        { 
            week: '07',
            lecture: '12',
            date: 'Sáb 07, Dic 2024',
            description: [
                {
                    text: 'Clase de Python con deserialización de información',
                    href: 'lectura12'
                }
            ]
        },
        { 
            week: '07',
            lecture: '13',
            date: 'Sáb 07, Dic 2024',
            description: [
                {
                    text: 'Registra data obtenida en base de datos',
                    href: 'lectura13'
                }
            ]
        },
        { 
            week: '08',
            lecture: '14',
            date: 'Sáb 14, Dic 2024',
            description: [
                {
                    text: 'Requerimientos de la solución',
                    href: 'lectura14'
                }
            ]
        },
        { 
            week: '08',
            lecture: '15',
            date: 'Sáb 14, Dic 2024',
            description: [
                {
                    text: 'Diseño de diagrama de clases y casos de uso para la solución',
                    href: 'lectura15'
                }
            ]
        },
        { 
            week: '09',
            lecture: '16',
            date: 'Sáb 21, Dic 2024',
            description: [
                {
                    text: 'Aplicando metodologías ágiles de desarrollo',
                    href: 'lectura16'
                }
            ]
        },
        { 
            week: '09',
            lecture: '17',
            date: 'Sáb 21, Dic 2024',
            description: [
                {
                    text: 'Solución con hash y conectada a base de datos',
                    href: 'lectura17'
                }
            ]
        }
    ]
};

export default courseData;