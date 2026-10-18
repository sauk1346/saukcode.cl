# Temario Java — Ejercicios Diarios

Método de trabajo (igual que las flashcards de CSS, ver
`src/data/flashcards/css/TEMARIO.md`): ~2 ejercicios por sesión/día. Se
elige UN tópico del lenguaje y se cubre a cabalidad (con los ejercicios que
haga falta) antes de pasar al siguiente. No hay conteo fijo de ejercicios
por tópico — depende de qué tan bien quede entendido el tema.

Cuando el usuario pida "continúa con 2 más" (u otro número), revisar este
archivo para saber en qué tópico vamos y qué subtemas faltan, sin necesidad
de repetir la conversación de alineación.

## Estado global

```yaml
dia_actual: 1        # sesión/día del plan, se incrementa cada vez que se agrega una tanda
topico_actual: 1      # índice del tópico en curso en la lista de Progreso
```

## Progreso

1. [ ] **Fundamentos** — EN CURSO
       ```yaml
       archivo: src/data/ejercicios/java/problems.js
       categoria: fundamentos
       dia_inicio: 1
       dia_ultima_tanda: 1
       ejercicios_creados: 2
       ejercicios_ids: [JV0001, JV0002]
       ```
       Subtemas cubiertos: tipos de datos primitivos (`double`), casting,
       operadores aritméticos (JV0001 - Calculadora de IMC); `String`,
       `char`, recorrido con `toCharArray()`, condicionales (JV0002 -
       Detector de Vocales).
       Subtemas pendientes en este tópico: operadores lógicos y de
       comparación, `switch`, bucles `for`/`while`/`do-while`, arrays
       unidimensionales básicos, `Scanner` para entrada de datos.
2. [ ] **Arrays y Strings** — PENDIENTE
       Subtemas a cubrir: arreglos multidimensionales, recorrido y
       manipulación de arrays, `StringBuilder`, métodos comunes de `String`
       (`split`, `substring`, `replace`, `trim`).
3. [ ] **POO I: Clases y Objetos** — pendiente
       Clases, objetos, constructores, encapsulamiento, `this`, getters/setters.
4. [ ] **POO II: Herencia y Polimorfismo** — pendiente
       `extends`, `super`, sobreescritura de métodos, interfaces, clases
       abstractas, polimorfismo.
5. [ ] **Colecciones** — pendiente
       `ArrayList`, `HashMap`, `HashSet`, interfaces `List`/`Set`/`Map`,
       iteración con `for-each` e `Iterator`.
6. [ ] **Manejo de Excepciones** — pendiente
       `try`/`catch`/`finally`, excepciones personalizadas (`extends
       Exception`), `throws`, checked vs unchecked.
7. [ ] **Streams y Lambdas** — pendiente
       Expresiones lambda, Stream API (`map`, `filter`, `reduce`,
       `collect`), referencias a métodos.
8. [ ] **Genéricos** — pendiente
       Clases y métodos genéricos, bounded types (`<T extends Number>`).
9. [ ] **Concurrencia Básica** — pendiente
       `Thread`, `Runnable`, `synchronized`, condiciones de carrera básicas.
10. [ ] **Manejo de Archivos e I/O** — pendiente
       `File`, `BufferedReader`/`BufferedWriter`, try-with-resources.

## Notas del tópico en curso (Fundamentos)

Ya cubiertos con ejercicios: tipos `double`, casting implícito en
operaciones aritméticas, `String`/`char`, `toCharArray()`,
`String.indexOf()`.

Siguiente tanda sugerida (2 ejercicios): uno sobre operadores de
comparación/lógicos + `switch` (ej. clasificador de notas), y otro sobre
bucles + arrays unidimensionales (ej. suma/promedio de un arreglo con
`for`).
