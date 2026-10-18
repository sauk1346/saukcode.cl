const courseData = {
    courseCode: "TI3V11",
    courseTitle: "Introducción a la Programación Segura",
    courseDescription: "Asignatura de tipo práctico. Al finalizar, el estudiante conocerá: Fundamentos de Python, Estructuras de Control y Decisión, Manejo de almacenamiento de datos y uso de librerías asociadas a seguridad informática.",
    professorData: {
        name: "Luis Alejandro Yañez Carreño",
        email: "luyanez.profesor@gmail.com"
    },    
    unitsData: [
        { 
            unit: '1',
            description: 'Problemas y Representación de Soluciones'
        },
        { 
            unit: '2',
            description: 'Estructuras de Decisión. Bucles y funciones de lenguaje Python'
        },
        { 
            unit: '3',
            description: 'Colecciones y librerías en Python'
        },
        { 
            unit: '4',
            description: 'Metodologías de Desarrollo Seguro, considerando SAMM y SDL'
        }
    ],
    evaluationsData: [
        { 
            evaluationNumber: 1,
            date: 'Jue 06, Jun 2024', 
            weighting: '20%', 
            description: {
                text: 'Evaluación 01',
                href: 'eval01'
            }
        },
        { 
            evaluationNumber: 2, 
            date: 'Mié 10, Jul 2024', 
            weighting: '35%', 
            description: {
                text: 'Evaluación 02',
                href: 'eval02'
            },
            quickGuide: [
                {
                    text: 'guía 01',
                    href: 'guia21'
                },
                {
                    text: 'guía 02',
                    href: 'guia22'
                }
            ]
        },
        { 
            evaluationNumber: 3, 
            date: 'Mar 23, Jul 2024', 
            weighting: '35%', 
            description: {
                text: 'Informe SAMM y SDL',
                href: 'docs/eval03_sol.pdf',
                external: true
            }
        },
        { 
            evaluationNumber: 4, 
            date: 'Jue 25, Jul 2024', 
            weighting: '10%', 
            description: {
                text: 'Controles',
                href: 'controles'
            }
        }
    ],
    classData: [
        { 
            week: '01', 
            class: '01', 
            date: 'Mié 22, May 2024', 
            description: [
                {
                    text: 'Pseudocódigo, Diagrama de Flujo',
                    href: 'clase01'
                }
            ]
        },
        { 
            week: '01', 
            class: '02', 
            date: 'Jue 23, May 2024', 
            description: [
                {
                    text: 'Variables, Condiciones, Bucles',
                    href: 'clase02'
                }
            ]
        },
        { 
            week: '02', 
            class: '03', 
            date: 'Mar 28, May 2024', 
            description: [
                {
                    text: 'Condicionales y Lógica Booleana',
                    href: 'clase03'
                }
            ]
        },
        { 
            week: '02', 
            class: '04', 
            date: 'Mié 29, May 2024', 
            description: [
                {
                    text: 'Introducción a PSeInt',
                    href: 'clase04'
                }
            ]
        },
        { 
            week: '02', 
            class: '05', 
            date: 'Jue 30, May 2024', 
            description: [
                {
                    text: 'Ejercicios con Bucles (1)',
                    href: 'clase05'
                }
            ]
        },
        { 
            week: '03', 
            class: '06', 
            date: 'Mar 04, Jun 2024', 
            description: [
                {
                    text: 'Ejercicios con Bucles (2)',
                    href: 'clase06'
                }
            ]
        },
        { 
            week: '03', 
            class: '07', 
            date: 'Mié 05, Jun 2024', 
            description: [
                {
                    text: 'Ejercicios con Bucles (3)',
                    href: 'clase07'
                }
            ]
        },
        { 
            week: '03', 
            class: '08', 
            date: 'Jue 06, Jun 2024', 
            description: [
                {
                    text: 'Evaluación 01',
                    href: 'eval01'
                }
            ]
        },
        { 
            week: '04', 
            class: '09', 
            date: 'Mar 11, Jun 2024', 
            description: [
                {
                    text: 'Introducción a Python',
                    href: 'clase09'
                }
            ]
        },
        { 
            week: '04', 
            class: '10', 
            date: 'Mié 12, Jun 2024', 
            description: [
                {
                    text: 'Intrucciones if(), while()',
                    href: 'clase10'
                }
            ]
        },
        { 
            week: '04', 
            class: '11', 
            date: 'Jue 13, Jun 2024', 
            description: [
                {
                    text: 'Suspensión clases: lluvia',
                    strikethrough: true
                }
            ]
        },
        { 
            week: '05', 
            class: '12', 
            date: 'Mar 18, Jun 2024', 
            description: [
                {
                    text: 'Instrucción for(), Ejercicios, Tarea',
                    href: 'clase12'
                }
            ]
        },
        { 
            week: '06', 
            class: '13', 
            date: 'Mar 25, Jun 2024', 
            description: [
                {
                    text: 'Revisión Tarea, Listas, Ejercicios',
                    href: 'clase13'
                }
            ]
        },
        { 
            week: '06', 
            class: '14', 
            date: 'Mié 26, Jun 2024', 
            description: [
                {
                    text: 'Ejercicios',
                    href: 'clase14'
                }
            ]
        },
        { 
            week: '06', 
            class: '15', 
            date: 'Jue 27, Jun 2024', 
            description: [
                {
                    text: 'Tuplas, Ejercicios',
                    href: 'clase15'
                }
            ]
        },
        { 
            week: '07', 
            class: '16', 
            date: 'Mar 02, Jul 2024', 
            description: [
                {
                    text: 'Diccionarios, Ejercicios',
                    href: 'clase16'
                }
            ]
        },
        { 
            week: '07', 
            class: '17', 
            date: 'Mié 03, Jul 2024', 
            description: [
                {
                    text: 'Ejercicio Estudiantes',
                    href: 'clase17'
                }
            ]
        },
        { 
            week: '07', 
            class: '18', 
            date: 'Jue 04, Jul 2024', 
            description: [
                {
                    text: 'Funciones',
                    href: 'clase18'
                }
            ]
        },
        { 
            week: '08', 
            class: '19', 
            date: 'Mar 09, Jul 2024', 
            description: [
                {
                    text: 'Ejercicios con funciones',
                    href: 'clase19'
                }
            ]
        },
        { 
            week: '08', 
            class: '20', 
            date: 'Mié 10, Jul 2024', 
            description: [
                {
                    text: 'Evaluación 02: Primera parte',
                    href: 'eval02'
                }
            ]
        },
        { 
            week: '08', 
            class: '21', 
            date: 'Jue 11, Jul 2024', 
            description: [
                {
                    text: 'Evaluación 02: Segunda parte',
                    href: 'eval02'
                }
            ]
        },
        { 
            week: '08', 
            class: '22', 
            date: 'Vie 12, Jul 2024', 
            description: [
                {
                    text: 'Clase Recuperativa',
                    href: 'clase22'
                }
            ]
        },
        { 
            week: '09', 
            class: '23', 
            date: 'Mié 17, Jul 2024', 
            description: [
                {
                    text: 'Desarrollo Seguro',
                    href: 'clase23'
                }
            ]
        },
        { 
            week: '09', 
            class: '24', 
            date: 'Jue 18, Jul 2024', 
            description: [
                {
                    text: 'Encriptación',
                    href: 'clase24'
                }
            ]
        },
        { 
            week: '10', 
            class: '25', 
            date: 'Mar 23, Jul 2024', 
            description: [
                {
                    text: 'Informe SAMM y SDL',
                    href: 'docs/eval03_sol.pdf',
                    external: true
                }
            ]
        }
    ],
    lectureData: [
        { 
            week: '01', 
            lecture: '01', 
            date: 'Sáb 25, May 2024', 
            description: [
                {
                    text: 'El alcance de una problemática',
                    href: 'lectura01'
                }
            ]
        },
        { 
            week: '01', 
            lecture: '02', 
            date: 'Sáb 25, May 2024', 
            description: [
                {
                    text: 'Métodos para la resolución de problemas',
                    href: 'lectura02'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '03', 
            date: 'Sáb 01, Jun 2024', 
            description: [
                {
                    text: 'Diagrama de flujo de datos',
                    href: 'lectura03'
                }
            ]
        },
        { 
            week: '02', 
            lecture: '04', 
            date: 'Sáb 01, Jun 2024', 
            description: [
                {
                    text: 'Validación de la solución',
                    href: 'lectura04'
                }
            ]
        },
        { 
            week: '03', 
            lecture: '05', 
            date: 'Sáb 08, Jun 2024', 
            description: [
                {
                    text: 'Python: Estructura de desición y bucles',
                    href: 'lectura05'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '06', 
            date: 'Sáb 15, Jun 2024', 
            description: [
                {
                    text: 'Python: Tipos de datos y variables',
                    href: 'lectura06'
                }
            ]
        },
        { 
            week: '04', 
            lecture: '07', 
            date: 'Sáb 15, Jun 2024', 
            description: [
                {
                    text: 'Python: Sentencias básicas en la resolución de problemas',
                    href: 'lectura07'
                }
            ]
        },
        { 
            week: '05', 
            lecture: '08', 
            date: 'Sáb 22, Jun 2024', 
            description: [
                {
                    text: 'La lógica en la Programación Python',
                    href: 'lectura08'
                }
            ]
        },
        { 
            week: '06', 
            lecture: '09', 
            date: 'Sáb 29, Jun 2024', 
            description: [
                {
                    text: 'Listas, tuplas y diccionarios seguros',
                    href: 'lectura09'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '10', 
            date: 'Sáb 06, Jul 2024', 
            description: [
                {
                    text: 'Procedimientos para la manipulación de datos',
                    href: 'lectura10'
                }
            ]
        },
        { 
            week: '07', 
            lecture: '11', 
            date: 'Sáb 06, Jul 2024', 
            description: [
                {
                    text: 'Mitigación del riesgo y las vulnerabilidades',
                    href: 'lectura11'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '12', 
            date: 'Sáb 13, Jul 2024', 
            description: [
                {
                    text: 'Librerías externas y seguras',
                    href: 'lectura12'
                }
            ]
        },
        { 
            week: '08', 
            lecture: '13', 
            date: 'Sáb 13, Jul 2024', 
            description: [
                {
                    text: 'Script con jerarquía de excepciones',
                    href: 'lectura13'
                }
            ]
        }
    ]
};

export default courseData;