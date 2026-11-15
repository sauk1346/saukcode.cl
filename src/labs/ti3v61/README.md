# Páginas independientes de Minería de Datos (TI3V61)

Material interactivo del profesor, cada uno un solo archivo HTML con su CSS y
su JavaScript:

| Archivo | Página | Qué es |
| --- | --- | --- |
| `laboratorio.html` | `/inacap/ti3v61/laboratorio` | Laboratorio interactivo (19 módulos, 85 laboratorios) |
| `banco.html` | `/inacap/ti3v61/banco-preguntas` | Banco de preguntas (182 preguntas en 15 temas) |

Se publican con `src/pages/inacap/ti3v61/*.astro`, que pasan el HTML por
`render.js` (solo reapunta recursos a `public/labs/ti3v61/` y marca el
contenido para el buscador).

## Cambios hechos sobre los archivos originales

En ambos:

- Se quitaron las tipografías de Google Fonts y se enlazó la piel
  (`saukcode.css` y `saukcode.js`, en `public/labs/ti3v61/`).

Solo en `laboratorio.html`:

- Se quitaron el interruptor «Modo clase» y el botón «Concepto al azar», con
  su código, y la frase del módulo 15 que mencionaba el modo clase.

Todo lo demás vive en la piel y no toca el contenido: colores, tipografías,
marcos pixel, cabecera del sitio, un módulo por página en el laboratorio y un
tema por página en el banco. Las imágenes de ambos son las mismas y están en
`public/labs/ti3v61/img/`.

Para actualizar a una versión nueva: reemplazar el HTML, repetir los cambios
de arriba y copiar las imágenes nuevas.
