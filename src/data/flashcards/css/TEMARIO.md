# Temario CSS — Flashcards Diarias

Método de trabajo: ~10 cartas por sesión/día. Se elige UN tópico y se cubre
a cabalidad (todas sus cartas, usando los mazos de 25 que hagan falta) antes
de pasar al siguiente. No hay conteo fijo de cartas por tópico.

Cuando el usuario pida "continúa con 10 más" (u otro número), revisar este
archivo para saber en qué tópico vamos y qué subtemas faltan, sin necesidad
de repetir la conversación de alineación.

## Estado global

```yaml
dia_actual: 1        # sesión/día del plan, se incrementa cada vez que se agrega una tanda
topico_actual: 1      # índice del tópico en curso en la lista de Progreso
```

## Progreso

1. [ ] **Selectores y Especificidad** — EN CURSO
       ```yaml
       archivo: src/data/flashcards/css/selectores-especificidad.yaml
       dia_inicio: 1
       dia_ultima_tanda: 1
       cartas_sembradas: 10
       cartas_totales_estimadas: 25
       ```
       Quedan 15 cartas pendientes (ver "Cola pendiente" abajo) — repartir en
       ~2 sesiones más (10 + 5) antes de dar el tópico por completo.
2. [ ] **Box Model** — PENDIENTE
       ```yaml
       archivo: src/data/flashcards/css/box-model.yaml
       dia_inicio: null
       dia_ultima_tanda: null
       cartas_sembradas: 0
       cartas_totales_estimadas: null
       ```
       Subtemas a cubrir: content/padding/border/margin, box-sizing
       (content-box vs border-box), display (block/inline/inline-block/none),
       overflow (visible/hidden/scroll/auto), width/height vs min/max.
3. [ ] Unidades y valores — pendiente
4. [ ] Colores y fondos — pendiente
5. [ ] Tipografía — pendiente
6. [ ] Posicionamiento — pendiente
7. [ ] Flexbox — pendiente
8. [ ] Grid — pendiente
9. [ ] Responsive design — pendiente
10. [ ] Transiciones y animaciones — pendiente
11. [ ] Pseudo-clases avanzadas — pendiente

## Notas del tópico en curso (Selectores y Especificidad)

Sembradas (1-10): selector universal, tipo/elemento, clase, id, `[attr]`,
`[attr="valor"]`, `[attr^=]`, `[attr$=]`, `[attr*=]`, agrupación con coma.

Siguiente tanda (11-20, combinadores y pseudo-clases básicas): combinador
descendiente, `>` hijo directo, `+` hermano adyacente, `~` hermano general,
`:hover`, `:focus`, `:first-child` vs `:first-of-type`, `:nth-child(n)`,
`:not()`, `:checked`.

Tanda final (21-25, pseudo-elementos y especificidad): pseudo-clase vs
pseudo-elemento, `::before`/`::after`, `::first-line`/`::first-letter`,
cálculo de especificidad + orden de cascada, `!important`.

### Cola pendiente (contenido ya redactado, listo para pegar de vuelta en el .yaml cuando toque)

Convención (definida 2026-07-07): todo el código, incluso menciones cortas de
selectores/pseudo-clases, va dentro de bloques ```css (se resaltan con
Prism). Nada de código suelto en comillas simples dentro del texto — las
anotaciones van como comentarios `/* ... */` dentro del bloque.

```yaml
  - front: |
      ¿Qué hace el combinador descendiente (espacio en blanco)?
    back: |
      Selecciona elementos que están **anidados en cualquier nivel** dentro de otro (no solo hijos directos).

      ```css
      article p {
        line-height: 1.6;
      }
      /* aplica a todo <p> dentro de <article>, sin importar el nivel de anidamiento */
      ```

  - front: |
      ¿Qué hace este combinador?

      ```css
      ul > li
      ```
    back: |
      Selecciona solo los **hijos directos** (un nivel), no descendientes más profundos.

      ```css
      ul > li {
        list-style: square;
      }
      ```

  - front: |
      ¿Qué hace este combinador?

      ```css
      h2 + p
      ```
    back: |
      Selecciona el elemento que está **inmediatamente después** de otro, al mismo nivel.

      ```css
      h2 + p {
        margin-top: 0;
      }
      /* aplica solo al primer <p> que sigue directamente a un <h2> */
      ```

  - front: |
      ¿Qué hace este combinador?

      ```css
      h2 ~ p
      ```
    back: |
      Selecciona **todos los hermanos posteriores** a un elemento (no solo el inmediato), al mismo nivel.

      ```css
      h2 ~ p {
        color: gray;
      }
      ```

  - front: |
      ¿Qué hace esta pseudo-clase?

      ```css
      :hover
      ```
    back: |
      Aplica estilos mientras el puntero del mouse está **sobre** el elemento.

      ```css
      button:hover {
        background: darkblue;
      }
      ```

  - front: |
      ¿Qué hace esta pseudo-clase?

      ```css
      :focus
      ```
    back: |
      Aplica estilos cuando el elemento tiene el **foco del teclado/click** (ej. un input seleccionado).

      ```css
      input:focus {
        outline: 2px solid blue;
      }
      ```

  - front: |
      ¿Qué diferencia hay entre estas dos pseudo-clases?

      ```css
      :first-child
      :first-of-type
      ```
    back: |
      La primera selecciona el elemento si es el **primer hijo** de su padre, sin importar su tipo. La segunda selecciona el primer elemento de **ese tipo específico**, aunque no sea el primer hijo.

      ```css
      p:first-of-type {
        font-weight: bold;
      }
      ```

  - front: |
      ¿Cómo funciona esta pseudo-clase?

      ```css
      :nth-child(n)
      ```
    back: |
      Selecciona hijos según una fórmula an + b, donde n empieza en 0, 1, 2...

      ```css
      li:nth-child(2n) {
        background: #f0f0f0;
      }
      /* 2n selecciona los hijos pares (2, 4, 6...); 2n+1 seleccionaría los impares */
      ```

  - front: |
      ¿Qué hace esta pseudo-clase?

      ```css
      :not()
      ```
    back: |
      Selecciona elementos que **no coinciden** con el selector dado dentro del paréntesis.

      ```css
      li:not(.active) {
        opacity: 0.6;
      }
      ```

  - front: |
      ¿Qué hace esta pseudo-clase?

      ```css
      :checked
      ```
    back: |
      Aplica estilos a elementos de formulario (checkbox, radio) que están **marcados/seleccionados**.

      ```css
      input:checked + label {
        color: green;
      }
      ```

  - front: |
      ¿Qué diferencia hay entre una pseudo-clase y un pseudo-elemento?
    back: |
      ```css
      /* pseudo-clase (:) → selecciona un elemento en un estado particular */
      a:hover {
        color: red;
      }

      /* pseudo-elemento (::) → selecciona una parte del elemento que no existe como nodo real en el DOM */
      p::first-line {
        font-weight: bold;
      }
      ```

  - front: |
      ¿Para qué se usan estos pseudo-elementos?

      ```css
      ::before
      ::after
      ```
    back: |
      Insertan contenido generado **antes** o **después** del contenido real del elemento.

      ```css
      .required::after {
        content: " *";
        color: red;
      }
      /* requieren la propiedad content */
      ```

  - front: |
      ¿Qué seleccionan estos pseudo-elementos?

      ```css
      ::first-line
      ::first-letter
      ```
    back: |
      La primera selecciona la **primera línea** renderizada de un bloque de texto. La segunda selecciona solo la **primera letra**.

      ```css
      p::first-letter {
        font-size: 2em;
        font-weight: bold;
      }
      ```

  - front: |
      ¿Cómo se calcula la especificidad de un selector CSS?
    back: |
      Se cuenta en 4 categorías, de mayor a menor peso: estilos inline, IDs, clases/atributos/pseudo-clases, y elementos/pseudo-elementos.

      ```css
      /* 1. estilos inline (style="...") → mayor peso */

      /* 2. IDs */
      #nav { }

      /* 3. clases, atributos y pseudo-clases */
      .item:hover { }
      [type="text"] { }

      /* 4. elementos y pseudo-elementos → menor peso */
      div { }
      ::before { }

      /* ejemplo comparativo */
      #nav .item:hover { } /* 1 id + 1 clase + 1 pseudo-clase → más específico */
      nav .item { }        /* menos específico */

      /* si dos reglas tienen la misma especificidad, gana la declarada después */
      ```

  - front: |
      ¿Qué hace esta declaración y por qué se recomienda evitarla?

      ```css
      !important
      ```
    back: |
      Fuerza a que una declaración gane sobre cualquier otra, sin importar su especificidad (excepto otra declaración important más específica o posterior).

      ```css
      p {
        color: red !important;
      }
      /* rompe la cascada natural; dificulta el mantenimiento y debugging de estilos */
      ```
```
