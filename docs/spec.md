# Especificación de saukcode.cl

Este documento describe cómo está formado el proyecto y por qué. Es la referencia para entender una parte antes de modificarla, y el registro de las decisiones de diseño.

- La sintaxis del contenido está en [`directivas.md`](directivas.md).
- La instalación y los comandos están en el [`README`](../README.md).

**Mantenimiento**: cuando un cambio altera la arquitectura, el modelo de datos o una convención, se actualiza la sección correspondiente y se agrega una entrada al [registro de decisiones](#9-registro-de-decisiones).

---

## 1. Propósito y alcance

saukcode.cl es un sitio personal y estático de apuntes académicos y ejercicios de programación:

- **INACAP**: la malla de la carrera de Informática, la ficha de cada ramo (clases, lecturas y evaluaciones) y las lecciones en MDX con fórmulas, tablas, código, quizzes y flashcards.
- **Ejercicios**: problemas resueltos de LeetCode y Java, con filtros y paginación.

**Requisitos que guían el diseño:**

1. **Todo es estático**: no hay servidor de aplicación. Nginx sirve archivos HTML.
2. **Poco JavaScript en el navegador**: React solo donde hay estado (quizzes, filtros, flashcards, pestañas de la ficha del ramo).
3. **Escribir contenido es rápido**: un apunte es Markdown con pocas extensiones, y agregar una clase es agregar una entrada de datos.
4. **El contenido no se pierde**: el sitio viene de una migración desde Next.js, y la regla fue no perder páginas ni cambiar cómo se ven sin decidirlo.

Fuera de alcance: cuentas de usuario, comentarios y progreso guardado en servidor. Lo único que se guarda está en `localStorage`: el tema y la última lección vista.

---

## 2. Stack

| Capa | Tecnología | Rol |
| --- | --- | --- |
| Framework | Astro 7, salida estática | Ruteo, build y layouts `.astro` |
| Markdown | `@astrojs/mdx` + Sätteri (`@astrojs/markdown-satteri`) | Compila las lecciones `.mdx` |
| Plugins remark | `remark-auto-number`, `remark-math`, `remark-directive`, `remark-components` | Numeración, fórmulas y directivas |
| Plugins rehype | `rehype-katex`, `rehype-prism-plus` | Fórmulas y resaltado de código en el build |
| Interactividad | React 19 como islas (`client:load` / `client:idle`) | Quizzes, malla, ficha del ramo, flashcards, TOC |
| Estilos | Tailwind 4 + CSS Modules + CSS global | Ver §7 |
| Búsqueda | Pagefind (índice en `postbuild`) | Buscador `Ctrl+K`, sin servidor |
| Flashcards | YAML → SQLite (better-sqlite3 + Drizzle) | Base intermedia del build; no existe en producción |
| Despliegue | GitHub Actions → SSH → VPS con Nginx | Ver §8 |

---

## 3. Estructura del repositorio

```text
astro.config.mjs          configuración: integraciones, plugins Markdown, alias, redirecciones
deploy.sh                 sincroniza imágenes al VPS y hace push (dispara el deploy)
scripts/                  guardias del build (mazos de flashcards sin enlazar)
docs/                     esta especificación y la guía de sintaxis
public/                   archivos estáticos; public/inacap/ e idiomas/ NO se versionan (~634 MB)
src/
├── content.config.ts     colecciones inacap y ejercicios (schema laxo: los MDX no tienen frontmatter)
├── content/
│   ├── inacap/<ramo>/    lecciones MDX por ramo (avfi01, ti3v52, …)
│   └── ejercicios/       leetcode/ y java/
├── data/
│   ├── inacap/
│   │   ├── inacapData.js malla: ramos, semestres, categorías y estados
│   │   ├── calendar26.js calendario de evaluaciones (fuente de verdad de las fechas)
│   │   └── <ramo>.js     ficha del ramo: profesor, unidades, evaluaciones, clases y lecturas
│   ├── ejercicios/       problems.js y categories.js por subsección, y subsections.js
│   ├── flashcards/       mazos en YAML
│   └── homeData.js       datos de la portada
├── pages/                rutas (ver §4)
├── layouts/              BaseLayout (cáscara) y LessonLayout (lección + TOC + scripts)
├── components/
│   ├── layout/           Navbar, Breadcrumb, Footer, SearchModal (.astro, sin JS de framework)
│   ├── mdx/              componentes del contenido: mapeo MDX, islas y sus wrappers .astro
│   ├── features/         inacap/, leetcode/, flashcards/: las apps React de cada sección
│   ├── common/           TOC y tablas con filtros y paginación
│   └── ui/               SmartLink, Card, íconos pixel, efectos
├── plugins/              remark-components y remark-auto-number
├── lib/                  base de flashcards y compilación MDX de las cartas
├── utils/                descubrimiento de ramos y slugs, fechas, enlaces
├── hooks/                useFilters, usePagination, useTableSort
├── shims/                next/link y next/image (para componentes portados de Next)
├── shared/               CSS Modules compartidos heredados de Next
└── styles/               global.css (tokens), components.css (directivas), code-theme.css
```

---

## 4. Rutas

| Ruta | Archivo | Origen de los datos |
| --- | --- | --- |
| `/` | `pages/index.astro` | Malla y lecciones publicadas (contadas en el build) |
| `/inacap` | `pages/inacap/index.astro` → `InacapApp` | `inacapData.js`, `calendar26.js` |
| `/inacap/<ramo>` | `pages/inacap/[courseId]/index.astro` → `CourseDetails` | `data/inacap/<ramo>.js` |
| `/inacap/ti3v12` | `pages/inacap/ti3v12.astro` | Página propia, con otro formato |
| `/inacap/<ramo>/<slug>` | `pages/inacap/[courseId]/[slug].astro` | `content/inacap/<ramo>/<slug>.mdx` |
| `/inacap/<ramo>/flashcards/<tema>/<n>` | `…/flashcards/[topicSlug]/[deckNumber].astro` | `flashcards.db` |
| `/ejercicios` | `pages/ejercicios/index.astro` | `data/ejercicios/*` |
| `/ejercicios/<subsección>/<slug>` | `pages/ejercicios/[subseccion]/[slug].astro` | `content/ejercicios/…` |
| `/portfolio` | `pages/portfolio.astro` | En construcción |

El build genera unas 690 páginas.

### Regla de publicación de lecciones

**Una lección se publica solo si su slug aparece en los datos del ramo** (`utils/contentUtils.js → extractSlugsFromCourseData`). Los `href` se buscan en:

- `classData[].description[]`
- `evaluationsData[].description`
- `quickGuide[]`
- `lectureData`

Por eso:

- Un `.mdx` sin entrada en los datos no se publica (MDX huérfano).
- Una entrada sin `.mdx` se omite en silencio. Pasa, por ejemplo, con un `href` a un PDF de `public/`.
- Publicar una clase nueva es: escribir el `.mdx` y agregar su `href` a `data/inacap/<ramo>.js`.

Esto replica el ruteo del sitio Next. El costo es que un error de tipeo en el `href` deja la lección sin publicar y sin aviso.

Las redirecciones de `astro.config.mjs` cubren URLs que en Next daban 404: el índice de flashcards de un ramo y `/ejercicios/<subsección>`.

---

## 5. Modelo de datos

### 5.1 Malla (`data/inacap/inacapData.js`)

- `subjects[]`: un ramo por elemento, con `{ code, name, semester, year, category, status, href? }`.
  - `status` puede ser `completed`, `current` o `pending`.
  - `href` existe solo si el ramo tiene ficha en el sitio.
- `semesters[]`: `{ number, year, status }`. La pestaña abierta por defecto en `/inacap` es el semestre `current`.
- `categories` y `statusConfig`: nombre e ícono de cada área y estado.
  - La categoría define el color del ramo mediante el token `--cat-<categoría>`.

### 5.2 Ficha del ramo (`data/inacap/<ramo>.js`)

- Un archivo cuenta como ramo si su export por defecto tiene `courseCode`. Se descubre solo, con `import.meta.glob` en `utils/courseUtils.js`, y el id es el nombre del archivo.
- Campos:
  - `courseCode`, `courseTitle`, `courseDescription`, `professorData`.
  - `unitsData[]`.
  - `evaluationsData[]`: `{ evaluationNumber, date, weighting, description: { text, href }, quickGuide[], calendarRef? }`.
  - `classData[]`: `{ week, class, date, description: [{ text, href?, strikethrough? }] }`.
  - `lectureData[]`: la misma forma, en la pestaña Lecturas.
- Formas de `href`:
  - Un slug (`'clase01a'`): una lección MDX.
  - Una ruta (`'docs/x.pdf'`): un recurso en `public/inacap/<ramo>/`.
  - `'flashcards/<tema>/<n>'`: un mazo.
- **Fechas de evaluaciones**: `calendar26.js` es la fuente de verdad.
  - `utils/evalDates.js` busca, para cada evaluación, el evento `[CODE] Evaluación NN` (o `calendarRef`, o `Examen`) y reemplaza la fecha manual.
  - Si las dos fechas difieren, el build avisa.
- **Semana en curso**: la ficha la calcula en el navegador, a partir de las fechas en español (`'Mar 11, Ago 2026'`).

### 5.3 Ejercicios (`data/ejercicios/`)

- `problems.js` es un objeto `{ "LC0001": { title, topics[], difficulty, categories[] } }` por subsección.
- `subsections.js` tiene el nombre y el logo de cada subsección.
- Agregar una subsección es registrarla ahí y en `utils/ejerciciosUtils.js`.

### 5.4 Flashcards

```text
data/flashcards/**/*.yaml ─(db:setup + db:seed)→ flashcards.db ─(build)→ páginas estáticas
```

- Formato YAML: `{ topic, slug, courseId, section?, layout?, cards: [{ front, back }] }`.
  - `front` y `back` son MDX.
- `lib/db/seed.js` divide cada tema en mazos de 25 cartas (`DECK_LIMIT`).
  - Esquema: `topics` → `decks` → `cards`.
- `lib/renderMdxCards.jsx` compila cada carta a HTML en el build, porque las props de una isla deben ser JSON.
  - Luego `FlashcardStudy` las inyecta.
  - Las cartas usan los mismos plugins remark que las lecciones (directivas incluidas). `FlashcardStudy` alterna `:reveal` en la misma cara, y un clic en un enlace, botón o `summary` no voltea la carta.
- **Los mazos no tienen índice propio**: se enlazan desde los datos del ramo.
  - `scripts/check-flashcard-links.mjs` avisa en el build cuando un mazo no tiene enlace.
- `flashcards.db` es un archivo derivado: no se versiona y se regenera en cada build.

---

## 6. Pipeline del contenido

### 6.1 De MDX a HTML

```text
.mdx
 │  remark-auto-number   numera <SmartFigure id> y resuelve <FigureRef>
 │  remark-math          $…$ y $$…$$
 │  remark-directive     :x / ::x / :::x → nodos de directiva
 │  remark-components    directivas y ```output/```terminal → HTML (data.hName)
 ▼
hast
 │  rehype-katex         fórmulas → HTML de KaTeX
 │  rehype-prism-plus    resaltado de código (mismas clases que el Prism de Next)
 ▼
MDX → componentes       mapeo de etiquetas (h1, p, ul, pre, a, …) a componentes React
 ▼
HTML estático + islas
```

- MDX hereda los plugins de `markdown` en `astro.config.mjs`.
- El resaltado se hace en el build (`syntaxHighlight: false` desactiva Shiki).

### 6.2 Tres tipos de componentes de contenido

| Tipo | Cuándo usarlo | Dónde vive | JS en el navegador |
| --- | --- | --- | --- |
| **Directiva** (`:::callout`) | Presentación sin estado | `plugins/remark-components.mjs` + `styles/components.css` | No (salvo los scripts mínimos de `LessonLayout`) |
| **Etiqueta mapeada** (`p`, `pre`, `a`…) | Cambiar cómo se ve un elemento Markdown | `components/mdx/components.js` | No (React solo en el servidor) |
| **Isla React** (`<Quiz>`) | Estado o props estructuradas | `components/mdx/*Island.astro` → `*.jsx` | Sí |

**Regla para componentes nuevos**: si no necesita estado, va como directiva. La razón está en la decisión [D3](#d3--componentes-estáticos-como-directivas-y-no-como-react).

- Los wrappers `.astro` de las islas se importan en el frontmatter de la página de lección. Si se importan desde un `.js`, pierden la metadata del renderer de Astro.
- Las directivas emiten HTML con clases propias (`.callout`, `.solution`, `.smart-table`…).
  - Las etiquetas generadas que coinciden con el mapeo (`p`, `ul`, `li`, `a`, `pre`, `code`) pasan igualmente por el componente React mapeado.
  - Bajo Sätteri, ese componente **no recibe `className`**, pero sí recibe el resto de las props.
  - Por eso las salidas de terminal se emiten como `<samp>` y no como `<pre>`: un `<pre>` se convertiría en `PreBlock`, con botón de copiar.

### 6.3 Comportamiento en el navegador sin React (`LessonLayout.astro`)

Son scripts con delegación de eventos que funcionan para cualquier cantidad de elementos:

- `:reveal`: mostrar u ocultar la respuesta.
- `:::solution`: animación de despliegue donde CSS no la soporta (sin `interpolate-size`, es decir, Firefox y Safari).
- Botón «Copiar» de los bloques de código.
- Barra de progreso de lectura, «1UP» al terminar y registro de la última lección vista (para «Continuar» en la portada).

### 6.4 Numeración y referencias

Todo se resuelve en el build, sin estado en el navegador. Cada contador recorre una página en orden de documento:

| Elemento | Se numera si | Etiqueta | Referencia |
| --- | --- | --- | --- |
| `<SmartFigure>` | Tiene `id` y no tiene `autoNumber={false}` | Figura N | `<FigureRef id>` |
| `:::table` | Tiene `#id` | Tabla N | `:tableref{#id}` |
| ```` ```output/terminal ```` | Tiene `id="…"` | Salida N | — |

### 6.5 Errores de contenido

`remark-components` **no hace fallar el build**. Avisa en la consola (`[remark-components] archivo:línea: …`) y usa un valor por defecto en estos casos:

- Directiva desconocida.
- Tipo, variante, ícono, color o layout inválido.
- Id de tabla repetido.
- `:tableref` sin destino.

Es una decisión deliberada: un error de tipeo en un apunte no debe bloquear la publicación del resto.

---

## 7. Diseño visual y estilos

- **Estética**: pixel / arcade, inspirada en NES y CRT.
  - Tipografías: Silkscreen para títulos pixel, Departure Mono y JetBrains Mono para código, y Atkinson Hyperlegible para el texto.
  - Efectos: monedas y confeti pixel en los quizzes, «1UP», reloj global de parpadeo (`html[data-blink]`, apagado con `prefers-reduced-motion`).
- **Tokens** en `styles/global.css`:
  - Colores (`--primary`, `--secondary`, `--background`…).
  - Colores por área (`--cat-programming`, `--cat-database`…).
  - Espaciado y tipografías, con variante oscura.
- **Modo oscuro**: la clase `dark` (para Tailwind) y la clase `dark-mode-override` (para los CSS Modules portados) en `<html>`.
  - Se aplican antes del primer pintado con un script inline en `BaseLayout`, para que la página no parpadee al cargar.
  - La preferencia se guarda en `localStorage.theme`.
- **Tres capas de CSS**, de la más reciente a la heredada:
  1. Tailwind 4 en layouts y componentes `.astro`.
  2. `styles/components.css`: el HTML generado por las directivas, con clases globales simples.
  3. CSS Modules (`*.module.css`): componentes React portados de Next.

  Lo nuevo va en Tailwind (para páginas) o en `components.css` (para el contenido).

---

## 8. Build y despliegue

```text
npm run build
 ├─ prebuild    db:setup → db:seed (YAML → flashcards.db) → check-flashcard-links
 ├─ astro build ~690 páginas en dist/
 └─ postbuild   pagefind --site dist (índice de búsqueda)
```

- **Servidor de desarrollo**: `astro dev --background` (`astro dev stop|status|logs`). Detalles:
  - El buscador no funciona en desarrollo, porque el índice solo existe después del build.
  - **Los plugins remark no se recargan solos**: después de editar `src/plugins/`, hay que reiniciar el servidor.
- **Despliegue**:
  1. `./deploy.sh` exige un árbol limpio, sincroniza `public/inacap` al VPS con rsync y hace `git push`. Si no hay commits nuevos, lanza el workflow a mano.
  2. `.github/workflows/deploy.yml`, en cada push a `master`, entra por SSH. La clave está restringida a un solo comando y la huella del servidor está fijada.
  3. En el VPS: `git pull`, `npm ci`, `npm run build` y publicación de `dist/` en el directorio que sirve Nginx.
- **Archivos no versionados**: `public/inacap/` y `public/idiomas/` (imágenes, PDFs y audio). Viven en la máquina local y en el VPS. Al clonar el repositorio hay que copiarlos aparte.

---

## 9. Registro de decisiones

Cada entrada registra el contexto, la decisión y sus consecuencias. Las más nuevas van al final.

### D1 — Migrar de Next.js a Astro con salida estática

*2026-10-17 · commits «fase 1/2/3 de migración»*

- **Contexto**: el sitio en Next.js renderizaba con React apuntes que son casi todos estáticos. Eso cargaba JavaScript innecesario y exigía un proceso Node en el servidor.
- **Decisión**: Astro con salida estática y React solo como islas.
  - Se conservaron los componentes de Next mediante shims (`next/link`, `next/image`) y el alias `@/`.
  - Se replicó el ruteo de Next (publicación por slugs registrados, ver §4).
- **Consecuencias**:
  - En producción solo hay Nginx.
  - Quedan restos de Next: CSS Modules, `'use client'` y los shims, que se pueden limpiar de a poco.

### D2 — Flashcards compiladas a SQLite en el build

- **Contexto**: los mazos se escriben en YAML, pero las páginas necesitan consultas (por ramo, por tema, mazos de 25 cartas).
- **Decisión**: un paso `prebuild` carga el YAML en `flashcards.db` (better-sqlite3 + Drizzle). Las páginas consultan esa base en el build, y las cartas se compilan a HTML.
- **Consecuencias**:
  - La base es un archivo derivado que no se versiona.
  - Un mazo sin enlace en los datos del ramo queda inalcanzable, y para eso existe la guardia `check-flashcard-links`.

### D3 — Componentes estáticos como directivas y no como React

*2026-10-25 · 99ce00a, 8873995, 4e089c9, f17984b, 664266c*

- **Contexto**:
  - Los componentes de presentación (Callout, Solution, Box, MultiColumn, Reveal, TerminalOutput, SmartTable) eran React.
  - Cada uso exigía JSX con props en JavaScript, en especial las tablas, como arreglos dentro de `rows={[…]}`.
  - Sätteri no pasa `className` a los componentes mapeados, lo que causaba errores. Por ejemplo, las tablas Markdown escritas a mano se veían vacías.
  - El proyecto `../sauk-notes` ya usaba directivas `::` con buenos resultados.
- **Decisión**: un camino híbrido.
  - Lo que no tiene estado pasa a directivas de `remark-directive`, transformadas a HTML en el plugin `remark-components` mediante `data.hName`, sin pasar por React.
  - Lo que tiene estado o props estructuradas sigue en React: SmartFigure, Quiz, GridQuiz, AudioPlayer y Tabs.
  - Se mantiene `.mdx`, sin migrar a `.md`, porque los componentes React y los `import` siguen siendo necesarios.
- **Alternativas descartadas**:
  - Mapear las directivas a componentes React (`callout` → `<Callout>`). Era un paso intermedio sin beneficio y seguía expuesto al problema de props de Sätteri.
  - Resolver las referencias cruzadas con estado global (zustand). La numeración se conoce completa en el build, así que el estado en el navegador sobra.
- **Consecuencias**:
  - El contenido es más legible: una tabla es una tabla Markdown.
  - Hay menos JavaScript en el navegador, y la numeración se resuelve en el build.
  - Los errores de contenido se avisan en el build, en vez de fallar en el navegador.
  - Los estilos de las directivas viven en un solo archivo (`components.css`).
  - Cada directiva nueva requiere tocar el plugin y reiniciar el servidor de desarrollo.
  - La verificación de cada migración se hizo comparando el HTML y capturas de pantalla contra el build anterior.

### D4 — Las tablas por defecto usan `layout: auto`

*2026-10-25 · 664266c*

- **Contexto**: `SmartTable` usaba `fixed` por defecto, pero el 77% de las tablas ya pedía `auto`.
- **Decisión**: el valor por defecto es `auto`, y las tablas que usaban `fixed` lo declaran de forma explícita.
- **Consecuencias**: la migración conservó el aspecto de cada tabla, y la mayoría queda sin atributos.

---

## 10. Limitaciones conocidas y deuda técnica

- **Schema laxo**: las colecciones aceptan cualquier frontmatter, porque los MDX heredados no lo tienen, y los títulos de las lecciones salen del slug.
- **Publicación por slug sin aviso**: un `href` mal escrito o un MDX huérfano no se detecta en el build. Sería útil una guardia como la de las flashcards.
- **`\|` dentro de código en una tabla GFM**: no se puede mostrar literalmente.
- **Restos de Next**: CSS Modules, `'use client'`, shims de `next/link` y `next/image`, y `public/bootcamp`, `codevault` y `elearning`, que el sitio actual no usa.
- **Archivos multimedia fuera del repositorio**: si se pierden la copia local y la del VPS, no hay respaldo en git.
