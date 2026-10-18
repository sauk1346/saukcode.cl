# saukcode.cl

Plataforma personal de apuntes académicos y ejercicios de programación, publicada en [saukcode.cl](https://saukcode.cl). Reúne los apuntes de mis ramos de Informática en INACAP (lecciones en MDX con fórmulas, tablas, quizzes y flashcards) y ejercicios resueltos de LeetCode y Java.

Es la migración a **Astro** del sitio original hecho en Next.js: todo el contenido se genera como HTML estático en el build, sin servidor de aplicación.

## Stack

- [Astro 7](https://astro.build) con salida estática; islas de **React** solo donde hay interactividad (quizzes, filtros, flashcards)
- **MDX** para las lecciones, con KaTeX (fórmulas), rehype-prism-plus (código resaltado en build) y un plugin remark propio que autonumera tablas/figuras
- **Tailwind 4** para los estilos
- **Pagefind** como buscador (índice generado en postbuild, atajo `Ctrl+K`)
- **SQLite** (better-sqlite3 + Drizzle) para compilar los mazos de flashcards desde YAML durante el build

## Estructura

```text
src/
├── content/inacap/   # lecciones MDX por ramo (avfi01, tilv21, …)
├── data/             # registro de ramos, ejercicios y flashcards (YAML)
├── components/       # componentes Astro y React (mdx/, features/, layout/)
├── layouts/          # BaseLayout, LessonLayout
├── pages/            # rutas: /inacap, /ejercicios, flashcards
└── plugins/          # remark-auto-number
public/inacap/        # imágenes y PDFs de los ramos (NO versionados, ~634MB)
```

Las imágenes de `public/inacap/` no están en el repo por tamaño: tras clonar, hay que copiarlas desde una copia existente (`rsync -az public/inacap <destino>/public/`).

## Comandos

| Comando           | Acción                                                        |
| :---------------- | :------------------------------------------------------------ |
| `npm install`     | Instala dependencias                                           |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321` (sin buscador)      |
| `npm run build`   | Build completo: flashcards.db → 650+ páginas → índice Pagefind |
| `npm run preview` | Sirve el build localmente                                      |

## Despliegue

Cada push a `master` dispara un workflow de GitHub Actions que entra al VPS por SSH (clave restringida a un único comando) y ejecuta `git pull`, `npm ci`, `npm run build` y la publicación del resultado en el directorio que sirve Nginx. No hay proceso Node en producción: Nginx sirve los archivos estáticos directamente.
