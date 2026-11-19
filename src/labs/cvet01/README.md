# Laboratorio «Excel para Estadística» (CVET01)

Resumen de estudio de las siete actividades tecnológicas (AT) de Excel del
ramo: Unidad 1, datos univariados (AT1 a AT5) y Unidad 2, datos bivariados
(AT1 y AT2). Se publica en `/inacap/cvet01/laboratorio`.

| Archivo | Qué es |
| --- | --- |
| `contenido.js` | `TEORIA` (conceptos), `RESUMEN` (comandos), `MODS` (módulos de Excel y sus láminas) y `GUIA` (buscador «necesito… → función») |
| `render.js` | Convierte los bloques de una lámina en HTML |
| `imagenes.json` | Ancho y alto de cada captura (evita saltos al cargar) |
| `src/pages/inacap/cvet01/laboratorio.astro` | Página, estilos y navegación |
| `public/labs/cvet01/img/` | Capturas de Excel (`.webp`) |

A diferencia del laboratorio de TI3V61 (un HTML del profesor con una piel
encima), esta página es nativa: usa `BaseLayout` y los tokens de
`global.css`, y todas las láminas se escriben en el HTML al compilar para que
el buscador del sitio las indexe. El script de la página solo muestra la
lámina que pide el hash (`#m3-2` = módulo 3, tema 2; `#guia`; `#inicio`).

## Bloques de una lámina

Cada lámina tiene `t` (título), `when` («Cuándo usarlo») y `b`, una lista de
bloques: `P` párrafo, `H` subtítulo, `S` paso numerado (con captura
opcional), `F` fórmula con resultado y botón Copiar, `I` captura, `T` nota,
`R` «Cómo leerlo», `TB` tabla, `M` fórmula.

## Conceptos (teoría)

`TEORIA` tiene la misma forma que `MODS` (ids `t1` a `t6`, `u: 0`). Sus
láminas llevan `lbl: 'La idea'` en vez de «Cuándo usarlo» y usan el bloque
`M` para fórmulas (KaTeX, dibujadas al compilar). El texto no viene de las
guías: está redactado para este resumen. Los ejemplos usan los datos de las
guías y cada lámina enlaza a su lámina de Excel.

## Resumen de comandos

`RESUMEN` (id `r1`, `u: 3`) reúne las tablas «Resumen de funciones» del final
de las guías AT3, AT4 y AT5. Su tercera lámina (tablas dinámicas y gráficos)
no viene en las guías: AT1, AT2 y las de la Unidad 2 no traen resumen.

## Fuentes

- Guías «CBET01 P2025 U# AT# ….pdf» de la asignatura. Las capturas son las de
  los PDF (`pdfimages -png`); el gráfico de U2·AT1 es vectorial y se obtuvo
  con `pdftoppm`.
- Los resultados junto a cada fórmula son los de las guías, comprobados con
  los libros de Excel (`public/inacap/cvet01/docs/*.xlsx`, enlazados como
  «Datos» en cada lámina).

No viene en las guías: los textos «Cuándo usarlo» y «Cómo leerlo», la nota
sobre Ctrl + Mayús + Enter y la nota sobre los cuartiles del boxplot
(`CUARTIL.EXC`). Además se corrigieron dos puntos de las guías: `MODA.UNO`
devuelve la primera moda del rango (no la de menor valor) y en U2·AT2 el
campo va dos veces a Valores (no a Columnas).

Para agregar una captura: copiarla a `public/labs/cvet01/img/` y añadir su
tamaño a `imagenes.json`.
