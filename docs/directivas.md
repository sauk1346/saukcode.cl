# Guía de sintaxis del contenido

Referencia para escribir lecciones (`src/content/**/*.mdx`) y flashcards (`src/data/flashcards/**/*.yaml`).

El contenido es Markdown (GFM) con tres extensiones:

- **Directivas** (`:nombre`, `::nombre`, `:::nombre`): se transforman a HTML estático en el build, sin JavaScript en el navegador. Las procesa `src/plugins/remark-components.mjs` y sus estilos están en `src/styles/components.css`.
- **Bloques de código especiales** (```` ```output ````, ```` ```terminal ````): los procesa el mismo plugin.
- **Componentes React** (`<SmartFigure>`, `<Quiz>`…): son los que necesitan estado en el navegador o props complejas. Se describen al final.

Si una directiva tiene un error (nombre, tipo o color desconocido, id repetido, referencia sin destino), el build no falla. Muestra un aviso `[remark-components] archivo:línea: …` en la consola y usa un valor por defecto. Conviene revisar esos avisos después de escribir.

---

## Reglas generales

### Las tres formas de una directiva

| Forma | Sintaxis | Uso |
| --- | --- | --- |
| En línea | `:nombre[contenido]{atributos}` | Dentro de un párrafo: `:reveal`, `:red`, `:tableref` |
| De hoja | `::nombre[contenido]{atributos}` | Una línea propia (no se usa por ahora) |
| Contenedor | `:::nombre[etiqueta]{atributos}` … `:::` | Bloques con Markdown dentro: `callout`, `solution`, `box`, `table`… |

### Atributos

```md
:::callout{type="warning" title="Ojo"}
:::table{#ventas caption="Ventas del año"}
```

- `#ventas` es una forma corta de `id="ventas"`.
- Los valores van entre comillas dobles. Si el valor contiene comillas dobles, usa comillas simples: `caption='El "mejor" caso'`.

### Etiqueta `[...]` de los contenedores

En `callout`, `solution` y `box`, el texto entre corchetes después del nombre es el título, y admite Markdown (negrita, código, fórmulas):

```md
:::callout[La derivada de $x^2$]{type="tip"}
Es $2x$.
:::
```

### Anidar contenedores

**El contenedor exterior lleva más dos puntos que los que contiene.** Si un `:::solution` contiene un `:::table`, el `solution` se escribe con cuatro:

```md
::::solution
:::table{#t1 caption="Resultado"}
| a | b |
| --- | --- |
| 1 | 2 |
:::
::::
```

Con tres niveles, el exterior lleva cinco (`:::::`), y así sucesivamente. Si los dos puntos no alcanzan, el primer `:::` cierra el contenedor equivocado y el resto del bloque queda fuera.

### Texto que parece directiva

`texto:palabra` (como `Nota:importante`) también tiene forma de directiva. Si el nombre no existe, el plugin lo devuelve como texto y avisa en la consola. Para no recibir el aviso, escapa los dos puntos: `Nota\:importante`.

---

## Callout

Recuadro destacado con ícono y título.

```md
:::callout{type="warning"}
No ejecutes esto en producción.
:::

:::callout[Conclusión]{type="tip"}
El método B es más eficiente.
:::
```

| Atributo | Valores | Por defecto |
| --- | --- | --- |
| `type` | `info`, `tip`, `warning`, `danger`, `note` | `info` |
| `title` | Texto plano (alternativa a la etiqueta `[...]`) | Según el tipo: Información, Consejo, Advertencia, Peligro, Nota |

---

## Solution

Bloque desplegable (un `<details>` nativo) para respuestas y soluciones. Empieza cerrado.

```md
:::solution
La respuesta es 42.
:::

:::solution[Python]{icon="Python"}
```python
print("hola")
```
:::

:::solution[Pista]{variant="hint" open}
Revisa el caso base.
:::
```

| Atributo | Valores | Por defecto |
| --- | --- | --- |
| `variant` | `default`, `hint`, `warning`, `info` (cambia el color) | `default` |
| `icon` | `Python`, `JavaScript`, `Java`, `C`, `C++`, `SQL`, `MongoDB` (muestra el logo del lenguaje en vez de la ampolleta) | Ampolleta |
| `title` | Texto plano (alternativa a la etiqueta) | «Solución» |
| `open` | Sin valor: empieza abierto | Cerrado |

La animación de despliegue usa CSS donde el navegador la soporta, y en Firefox y Safari usa un script de `LessonLayout.astro`.

---

## Box

Recuadro neutro, con título opcional.

```md
:::box[Datos del problema]
- Capital: \$1.000.000
- Tasa: 5%
:::

:::box
Sin título.
:::
```

| Atributo | Valores |
| --- | --- |
| `title` | Texto plano (alternativa a la etiqueta) |

---

## Columns

Dos columnas lado a lado desde 768px de ancho; en pantallas más angostas se apilan. Con más de dos `col`, el resto pasa a la fila siguiente. `columns` contiene otros contenedores, así que se escribe con cuatro dos puntos:

```md
::::columns
:::col
**Entrada:**
```output
[1, 2, 3]
```
:::
:::col
**Salida:**
```output
6
```
:::
::::
```

Ni `columns` ni `col` tienen atributos.

---

## Reveal

Respuesta oculta dentro del texto: se muestra un marcador y, al hacer clic, la respuesta. Sirve para ejercicios de completar.

```md
She :reveal[was cooking] **(cook)** dinner.
El resultado es :reveal[$x = 4$]{placeholder="?"}.
```

| Atributo | Valores | Por defecto |
| --- | --- | --- |
| `placeholder` | Texto del marcador | `···` |

El clic lo maneja un script de `LessonLayout.astro`, sin React.

---

## Colores de texto

Anotaciones en color dentro del texto, de una tabla o de cualquier otro lugar:

```md
El :red[50%] se paga al contado y el :green[resto] a 30 días.
```

Colores: `red`, `blue`, `green`, `gray`, `yellow`.

---

## Salidas de terminal

La salida de un programa o una sesión de consola se escribe como bloque de código con el lenguaje `output` o `terminal`. **No es un bloque de código**: no se resalta y no lleva botón «Copiar».

````md
```output
Hola mundo
```

```terminal
Router# show ip route
# esta línea se ve atenuada, como comentario
C    192.168.1.0/24 is directly connected
```
````

| Lenguaje | Aspecto |
| --- | --- |
| `output` | Texto monoespaciado, sin fondo |
| `terminal` | Pantalla CRT: fondo oscuro y texto verde |

- Las líneas que empiezan con `#` se muestran atenuadas.
- **Título y numeración**: van después del lenguaje.

  ````md
  ```terminal caption="Configuración de Router0"
  ...
  ```

  ```terminal id="salida-ospf" caption="OSPF en R1"
  ...
  ```
  ````

  - Solo `caption`: lleva un título.
  - Con `id`: se numera como «Salida N: título», en orden de aparición en la página.

---

## Tablas

### Tabla simple

Una tabla Markdown normal ya tiene el estilo del sitio (zebra, hover, ancho automático):

```md
| Comando | Descripción |
| --- | --- |
| `ls` | Lista archivos |
| `cd` | Cambia de directorio |
```

La alineación por columna de GFM funciona (`:---`, `:---:`, `---:`). Si todas las celdas del encabezado están vacías, la tabla se muestra sin encabezado.

### Tabla con título, numeración o anchos: `:::table`

```md
:::table{#tablaVentas caption="Ventas del primer trimestre" layout="mixed" widths="200px,auto,120px"}
| Concepto | Detalle | Monto |
| --- | --- | --- |
| Ventas | Contado | \$5.000 |
:::
```

| Atributo | Valores | Efecto |
| --- | --- | --- |
| `#id` | Único en la página | Numera la tabla («Tabla N: …») y permite referenciarla |
| `caption` | Texto plano | Título sobre la tabla |
| `layout` | `auto`, `fixed`, `mixed` | `auto` (por defecto): cada columna se ajusta a su contenido. `fixed`: todas las columnas iguales. `mixed`: anchos fijos según `widths` |
| `widths` | Lista separada por comas (`200px,30%,auto`) | Solo con `layout="mixed"` |

`:::table` debe contener **exactamente una** tabla y nada más.

### Referencias a tablas

```md
Como muestra la :tableref{#tablaVentas}, las ventas subieron.
```

Se convierte en un enlace «Tabla N» hacia la tabla, y funciona aunque la referencia aparezca antes que la tabla. Si el id no existe, se muestra `[Tabla ?]` en rojo y aparece un aviso en el build.

### Dentro de las celdas

```md
| Ítem | Enero | Febrero |
| --- | --- | --- |
| :section[Ingresos] |
| Ventas | \$100 | \$200 |
| :highlight **Total** | **\$100** | **\$200** |
| :highlight{color="green"} Meta | \$90 | \$150 |
| Tareas | :li[Planificar] :li[Ejecutar] :li[Controlar] |
| Audio | [Escuchar](/inacap/fves02/audio/a01.mp3) |
```

| Sintaxis | Dónde | Efecto |
| --- | --- | --- |
| `:section[Texto]` | Única celda de la fila (las demás se omiten) | Fila separadora de grupo a todo el ancho |
| `:highlight` | Al inicio de la primera celda | Destaca la fila (amarillo) |
| `:highlight{color="…"}` | Ídem | Destaca la fila con `red`, `blue`, `green`, `gray` o `yellow` |
| `:li[…] :li[…]` | Celda formada solo por `:li` | Lista con viñetas |
| `[texto](archivo.mp3)` | Cualquier celda | Reproductor de audio (`.mp3`, `.wav`, `.ogg`, `.m4a`) |

Negrita, cursiva, código, fórmulas `$…$`, enlaces y colores (`:red[…]`) se escriben como en el resto del texto.

### Caracteres especiales en tablas

| Quieres mostrar | Escribe | Por qué |
| --- | --- | --- |
| `\|` | `\|` | El `\|` sin escapar separa columnas, también dentro de código y fórmulas |
| `$` | `\$` | `$…$` es una fórmula |
| `*`, `_` | `\*`, `\_` | Son negrita o cursiva |
| `{`, `}`, `<` | `\{`, `\}`, `\<` | MDX los interpreta como expresiones o JSX |
| `[`, `]` | `\[`, `\]` | Enlaces y directivas |

**Limitación**: no se puede mostrar un `\|` literal dentro de un código en una tabla, porque GFM consume la barra invertida.

---

## Componentes React

Estos se mantienen como componentes porque tienen estado en el navegador o props estructuradas. Se usan con sintaxis JSX y **no** llevan `import`: el mapeo está en las páginas de lección (`src/pages/inacap/[courseId]/[slug].astro` y `src/pages/ejercicios/[subseccion]/[slug].astro`).

### SmartFigure

Imagen con título, numeración y ampliación opcional.

```mdx
<SmartFigure
  id="piramide-maslow"
  src="/inacap/avan01/images/fig01.png"
  alt="Pirámide de Maslow"
  caption="Pirámide de Maslow"
  size="medium"
  lightbox
/>
```

| Prop | Valores | Por defecto |
| --- | --- | --- |
| `src`, `alt` | Ruta de la imagen y texto alternativo | — |
| `caption` | Título | — |
| `id` | Numera la figura («Figura N») | — |
| `size` | `small`, `medium`, `large`, `auto` | `auto` |
| `lightbox` | Al hacer clic, la imagen se amplía en un modal (ventana superpuesta) | `false` |
| `center` | Centra la figura | `true` |
| `autoNumber={false}` | No numera aunque tenga `id` | — |
| `width`, `height`, `className` | Dimensiones y clase extra | — |

La numeración la hace `src/plugins/remark-auto-number.mjs` en el build. Una imagen Markdown simple (`![alt](src)`) también se muestra como figura (`ImgFigure.astro`).

### Quiz

Preguntas de alternativas con corrección inmediata y vidas.

```mdx
<Quiz questions={[
  {
    question: "¿Qué es la sostenibilidad?",
    options: ["Opción A", "Opción B", "Opción C"],
    correctIndex: 0
  },
]} />
```

Cada pregunta acepta además `questionItems` (lista bajo el enunciado) y `questionSuffix` (texto después de la lista).

### GridQuiz

Clasificar elementos en columnas.

```mdx
<GridQuiz
  title="Clasifica los costos"
  columns={["Por producto", "Por comportamiento", "Por función"]}
  rows={[
    { label: "Materia Prima", correct: 0 },
    { label: "Costo Fijo", correct: 1 },
  ]}
/>
```

### AudioPlayer

Reproductor de audio a tamaño completo (fuera de las tablas).

```mdx
<AudioPlayer src="/inacap/fves02/audio/audio-exercise01.mp3" caption="A Day at School" />
```

### Tabs / Tab

Pestañas. Se usan sobre todo para agrupar otros MDX importados:

```mdx
import Control01 from './control01.mdx';
import Control02 from './control02.mdx';

<Tabs>
  <Tab label="Control 01">
    <Control01 components={props.components} />
  </Tab>
  <Tab label="Control 02">
    <Control02 components={props.components} />
  </Tab>
</Tabs>
```

Es necesario pasar `components={props.components}`: así el MDX importado recibe el mismo mapeo de componentes que la página.

---

## Flashcards

El frente y el reverso de cada carta (`front` / `back` en el YAML) son MDX y se compilan en el build (`src/lib/renderMdxCards.jsx`) con la misma sintaxis que las lecciones:

- Markdown, GFM y fórmulas.
- Todas las directivas de esta guía: `callout`, `solution`, `box`, `columns`, `table`, colores, salidas de terminal, `:tableref`.
- `:reveal`: se alterna en la misma cara, sin voltear la carta.
- `<SmartFigure>`.

`Quiz`, `GridQuiz`, `Tabs` y `AudioPlayer` **no** funcionan en las cartas.

Las cartas tienen un alto fijo: si el contenido es más largo, la cara tiene barra de desplazamiento (scroll).
