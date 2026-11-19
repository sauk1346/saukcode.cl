// Contenido del laboratorio «Excel para Estadística» (CVET01): resumen de las
// siete actividades tecnológicas (AT). Cada lámina es una lista de bloques;
// los dibuja render.js. Ver README.md.

/* ---------- Constructores de bloques ---------- */
function P(h) { return { k: 'p', h: h }; }
function H(h) { return { k: 'h', h: h }; }
function S(h, img, cap, grow) { return { k: 's', h: h, img: img, cap: cap, grow: grow }; }
function F(f, r, where) { return { k: 'f', f: f, r: r, w: where }; }
function I(img, cap, grow) { return { k: 'i', img: img, cap: cap, grow: grow }; }
function T(h) { return { k: 't', h: h }; }
function R(h) { return { k: 'r', h: h }; }
function TB(head, rows) { return { k: 'tb', head: head, rows: rows }; }
const CSE = T('<b>Si la fórmula condicional da un error o un valor extraño</b>, confírmala con <b>Ctrl + Mayús + Enter</b> en lugar de Enter. Las versiones de Excel anteriores a Microsoft 365 lo necesitan para las fórmulas matriciales (las que operan sobre un rango completo dentro de <code>SI</code>). Esta nota no viene en la guía.');
const COND = P('La hoja «Condicional» tiene el grupo (Tipo de material, A o B) en <code>A2:A16</code> y el valor (Peso) en <code>B2:B16</code>. Al envolver el rango en <code>SI(A2:A16="A";B2:B16)</code>, la función recibe solo los pesos de las filas cuyo material es A.');

/* ---------- Contenido ---------- */
export const MODS = [
{ id: 'm1', files: ['datos-estudiantes(AT1).xlsx', 'pesos-envases-yogurt(AT1).xlsx'], u: 1, at: 'AT1', name: 'Tablas de frecuencia', desc: 'Frecuencia absoluta, porcentual y acumulada con tablas dinámicas; intervalos para variables continuas.', pages: [
  { t: 'Frecuencia absoluta con tabla dinámica',
    when: 'Como primer paso para resumir cualquier variable: cuenta cuántas veces aparece cada categoría o valor. Sirve igual para variables cualitativas (Comuna de residencia) y cuantitativas discretas (Número de hermanos).',
    b: [
      S('Haz clic en una celda de los datos y ve a <span class="ui">Insertar → Tabla dinámica</span>.'),
      S('Revisa que <span class="ui">Tabla o rango</span> incluya todas las columnas (<code>A1:D21</code>), elige <span class="ui">Hoja de cálculo nueva</span> y pulsa <span class="ui">Aceptar</span>.', 'm1-dialogo', 'Ventana «Crear tabla dinámica» con el rango completo de los datos de estudiantes.'),
      S('En el panel de campos, arrastra <span class="ui">Comuna de residencia</span> al área de <span class="ui">Filas</span> y otra vez al área de <span class="ui">Valores</span>.', 'm1-absoluta', 'La columna «Cuenta de Comuna de residencia» es la frecuencia absoluta. Abajo a la derecha se ve el campo en Filas y en Valores.'),
      R('<b>Cómo leerlo</b>7 de los 20 estudiantes viven en Santiago; es la comuna más frecuente.'),
      T('<b>Reutiliza la tabla.</b> Para otra variable no hace falta crear una tabla dinámica nueva: quita el campo actual y arrastra el nuevo a Filas y Valores.')
    ] },
  { t: 'Frecuencia porcentual',
    when: 'Cuando quieres comparar el peso de cada categoría sobre el total y no solo su cantidad.',
    b: [
      S('Arrastra el mismo campo una tercera vez al área de <span class="ui">Valores</span>. Aparece un segundo recuento.'),
      S('Haz clic en la flecha de ese segundo recuento y elige <span class="ui">Configuración del campo</span>.', 'm1-config', 'Menú del segundo recuento en el área de Valores.'),
      S('Abre la pestaña <span class="ui">Mostrar datos como</span>, elige <span class="ui">% del total general</span> y pulsa <span class="ui">Aceptar</span>.', 'm1-mostrar', 'Lista de opciones de «Mostrar datos como».'),
      S('Haz doble clic en los títulos de las columnas para renombrarlos como «Frecuencia absoluta» y «Frecuencia porcentual».', 'm1-porcentual', 'Tabla de frecuencia de una variable cualitativa nominal.', 1),
      R('<b>Cómo leerlo</b>Santiago concentra el 35% de los estudiantes (7 de 20); San Miguel, el 10%.')
    ] },
  { t: 'Ordenar las categorías de una variable ordinal',
    when: 'Antes de calcular acumuladas en una variable cualitativa ordinal (Nivel de satisfacción con la carrera). Excel ordena las categorías alfabéticamente y ese orden no sirve.',
    b: [
      S('Haz clic derecho sobre la etiqueta «Muy baja», elige <span class="ui">Mover</span> y luego <span class="ui">Mover «Muy baja» al principio</span>.', 'm1-mover', 'Menú contextual con las opciones de Mover.'),
      S('Repite con las demás: <span class="ui">Mover «Baja» hacia arriba</span> y <span class="ui">Mover «Alta» hacia abajo</span>, hasta que queden de menor a mayor.', 'm1-ordenada', 'Categorías ordenadas desde «Muy baja» hasta «Muy alta».', 1)
    ] },
  { t: 'Frecuencias acumuladas',
    when: 'En variables con orden (ordinales y cuantitativas), para responder preguntas del tipo «¿cuántos tienen a lo más…?».',
    b: [
      S('Agrega dos columnas a la derecha de la tabla dinámica: «Frecuencia absoluta acumulada» y «Frecuencia porcentual acumulada».'),
      S('En la primera fila, copia la frecuencia tal cual.'),
      F('=B4', 'D4', 'celda'), F('=C4', 'E4', 'celda'),
      S('En la fila siguiente, suma la acumulada anterior con la frecuencia de esa fila. Luego copia ambas fórmulas hacia abajo.'),
      F('=D4+B5', 'D5', 'celda'), F('=E4+C5', 'E5', 'celda'),
      I('m1-acumuladas', 'Tabla de frecuencia completa para el nivel de satisfacción.', 1),
      R('<b>Cómo leerlo</b>14 estudiantes (70%) tienen a lo más un nivel medio de satisfacción. La última acumulada siempre debe dar el total (20) y 100%.')
    ] },
  { t: 'Intervalos con una columna auxiliar (SI)',
    when: 'En una variable cuantitativa continua (Edad) con pocos intervalos, o cuando quieres escribir tú las etiquetas de cada intervalo.',
    b: [
      S('Inserta una columna a la derecha de «Edad» y llámala «Intervalo de edad».'),
      S('En <code>E2</code> escribe la fórmula y cópiala hacia abajo. Cada <code>SI</code> pregunta por el límite superior de un intervalo; si no se cumple, pasa al siguiente.'),
      F('=SI(D2<=20;"19–20";SI(D2<=22;"21–22";SI(D2<=24;"23–24";"25–26")))', '21–22', 'E2'),
      I('m1-si', 'La edad de la fila 2 es 21, por eso la fórmula devuelve «21–22».'),
      S('Crea la tabla dinámica con el rango <code>A1:E21</code> usando «Intervalo de edad» y agrega las columnas porcentual y acumuladas.', 'm1-si-tabla', 'Tabla de frecuencia con intervalos de clase.', 1),
      R('<b>Cómo leerlo</b>9 estudiantes (45%) tienen 22 años o menos.')
    ] },
  { t: 'Intervalos con Agrupar',
    when: 'En una variable continua con muchos intervalos de igual amplitud. Es más rápido que escribir un SI anidado.',
    b: [
      S('Arrastra <span class="ui">Edad</span> a <span class="ui">Filas</span> y a <span class="ui">Valores</span>, y asegúrate de que en Valores esté configurada como <span class="ui">Recuento</span>.'),
      S('Haz clic derecho sobre una de las edades de la tabla y elige <span class="ui">Agrupar</span>.'),
      S('Completa <span class="ui">Comenzar en</span> (19), <span class="ui">Terminar en</span> (26) y <span class="ui">Por</span> (2, la amplitud). Pulsa <span class="ui">Aceptar</span>.', 'm1-agrupar', 'Ventana «Agrupación».'),
      I('m1-agrupada', 'Las edades quedan agrupadas en cuatro intervalos de amplitud 2.', 1),
      T('<b>Ejercicio tipo (desafío de la guía).</b> Con los pesos de 200 envases de yogurt, construye la tabla completa (absoluta, porcentual y acumuladas) con intervalos de amplitud fija, por ejemplo 0.5 g o 0.7 g desde 198.5 g. Los intervalos deben cubrir todos los datos y no superponerse.')
    ] }
] },
{ id: 'm2', files: ['graficos-en-excel(AT2).xlsx'], u: 1, at: 'AT2', name: 'Gráficos', desc: 'Circular, columnas, líneas e histograma: cuál elegir según el tipo de variable y cómo construirlo.', pages: [
  { t: '¿Qué gráfico usar?',
    when: 'Antes de insertar un gráfico: el tipo de variable decide cuál corresponde.',
    b: [
      TB(['Gráfico', 'Úsalo cuando…', 'Qué seleccionar'], [
        ['<a href="#m2-2"><b>Circular</b></a>', 'Variable cualitativa con pocas categorías; quieres ver la proporción de cada una sobre el total.', 'La tabla completa: categorías y frecuencias, con encabezados.'],
        ['<a href="#m2-3"><b>Columnas</b></a>', 'Variable cuantitativa discreta (o cualitativa); quieres comparar frecuencias.', 'Solo los valores de la columna Frecuencia.'],
        ['<a href="#m2-4"><b>Líneas</b></a>', 'Variable medida a lo largo del tiempo; quieres ver su evolución.', 'Ambas columnas con encabezados: fecha y variable.'],
        ['<a href="#m2-5"><b>Histograma</b></a>', 'Variable cuantitativa continua; quieres ver la forma de su distribución.', 'Solo la columna de datos, sin encabezado.']
      ]),
      P('En todos los casos, termina con un título representativo y los ejes rotulados con el nombre de la variable y su unidad.')
    ] },
  { t: 'Gráfico circular',
    when: 'Variable cualitativa nominal con pocas categorías (Comuna de residencia), para mostrar qué parte del total representa cada una.',
    b: [
      S('En la hoja «Circular», selecciona la tabla completa con sus encabezados. Ve a <span class="ui">Insertar → Gráfico circular</span> y elige el diseño simple.', 'm2-circ-menu', 'Menú de gráficos circulares.'),
      S('Mueve el gráfico a una hoja nueva (clic derecho → <span class="ui">Mover gráfico</span> → <span class="ui">Hoja nueva</span>), agrega un título y ajusta los colores si lo necesitas.'),
      S('Agrega las etiquetas de datos y, en su formato, marca <span class="ui">Porcentaje</span>.', 'm2-circ-etiquetas', 'Panel «Formato de etiquetas de datos» con la opción Porcentaje.'),
      I('m2-circ-final', 'Resultado final.'),
      R('<b>Cómo leerlo</b>La Florida es la comuna con más estudiantes (26%); Santiago, la que tiene menos (14%).')
    ] },
  { t: 'Gráfico de columnas',
    when: 'Variable cuantitativa discreta (Número de hermanos), para comparar la frecuencia de cada valor.',
    b: [
      S('En la hoja «Columnas», selecciona solo los valores de la columna Frecuencia. Ve a <span class="ui">Insertar → Gráfico de columnas → Columnas agrupadas</span>.', 'm2-col-menu', 'Menú de gráficos de columnas.'),
      S('El gráfico aparece con 1, 2, 3… en el eje horizontal, que no son los valores de la variable.', 'm2-col-inicial', 'Gráfico recién insertado: el eje aún no muestra el número de hermanos.'),
      S('Haz clic derecho sobre el gráfico → <span class="ui">Seleccionar datos</span>. En <span class="ui">Etiquetas del eje horizontal (categorías)</span> selecciona los valores de «Número de hermanos».', 'm2-col-eje', 'Ventana «Seleccionar el origen de datos».'),
      S('Agrega el título y rotula los ejes: «Número de hermanos» y «Frecuencia».', 'm2-col-final', 'Resultado final.'),
      R('<b>Cómo leerlo</b>Lo más frecuente es tener 3 hermanos (14 estudiantes); lo menos frecuente, 2 hermanos (6).')
    ] },
  { t: 'Gráfico de líneas',
    when: 'Variable medida en el tiempo (Temperatura diaria), para ver cómo evoluciona.',
    b: [
      S('En la hoja «Líneas», selecciona ambas columnas con sus encabezados (Fecha y Temperatura). Ve a <span class="ui">Insertar → Gráfico de líneas → Línea con marcadores</span>.', 'm2-lin-menu', 'Menú de gráficos de líneas.'),
      I('m2-lin-inicial', 'Gráfico recién insertado junto a los datos.'),
      S('Agrega un título, comprueba que el eje horizontal muestre bien las fechas y rotula el eje vertical con «Temperatura (°C)».', 'm2-lin-final', 'Resultado final.'),
      R('<b>Cómo leerlo</b>La temperatura osciló entre 17.6 °C y 23.1 °C en el período, sin una tendencia sostenida hasta el alza de los últimos días.')
    ] },
  { t: 'Histograma',
    when: 'Variable cuantitativa continua (Peso del producto), para ver la forma de la distribución. No necesitas construir antes la tabla de frecuencia.',
    b: [
      S('En la hoja «Histograma», selecciona solo la columna de pesos, sin el encabezado. Ve a <span class="ui">Insertar → Insertar gráfico estadístico → Histograma</span>.', 'm2-hist-menu', 'Menú de gráficos estadísticos.'),
      I('m2-hist-inicial', 'Excel elige los intervalos automáticamente.'),
      S('Para cambiar la amplitud, haz clic derecho sobre el eje horizontal → <span class="ui">Dar formato al eje</span> y modifica <span class="ui">Ancho del intervalo</span> (cuántos gramos incluye cada barra).', 'm2-hist-eje', 'Panel «Formato de eje» con las opciones de rangos.'),
      S('Agrega el título y rotula ambos ejes.', 'm2-hist-final', 'Resultado final.'),
      R('<b>Cómo leerlo</b>El intervalo con más productos es el de 472.7 g a 494.7 g; hacia los pesos más altos la frecuencia baja.')
    ] }
] },
{ id: 'm3', files: ['medidas(AT3-AT4-AT5).xlsx'], u: 1, at: 'AT3', name: 'Medidas de tendencia central', desc: 'Media, mediana y moda con PROMEDIO, MEDIANA, MODA.UNO y MODA.VARIOS, y su versión por grupo.', pages: [
  { t: 'Media', when: 'Para resumir los datos en su promedio aritmético. Es la medida habitual cuando no hay valores extremos que la distorsionen.',
    b: [ F('=PROMEDIO(A2:A16)', '16.9333'), I('m3-media', 'Hoja «Una muestra»: los 15 datos están en A2:A16.'),
         R('<b>Cómo leerlo</b>En promedio, los datos de la muestra valen 16.93.'),
         P('La función es la misma si los datos son una muestra o toda la población.') ] },
  { t: 'Mediana', when: 'Para conocer el valor central: la mitad de los datos queda por debajo y la otra mitad por encima. Prefiérela a la media cuando hay valores extremos o la distribución es asimétrica.',
    b: [ F('=MEDIANA(A2:A16)', '16'), I('m3-mediana', 'No hace falta ordenar los datos: Excel lo hace internamente.'),
         R('<b>Cómo leerlo</b>La mitad de los datos es menor o igual a 16 y la otra mitad es mayor o igual a 16.') ] },
  { t: 'Moda', when: 'Para saber qué valor se repite más. Es la única medida de tendencia central que también sirve para variables cualitativas.',
    b: [ H('Una sola moda'), F('=MODA.UNO(A2:A16)', '12'), I('m3-moda-uno', 'Con varias modas, MODA.UNO muestra solo una: la que aparece primero en el rango. Aquí es 12, que además es la menor.'),
         H('Todas las modas'), F('=MODA.VARIOS(A2:A16)', '12 · 14 · 15 · 16'), I('m3-moda-varios', 'Los resultados se despliegan en celdas consecutivas hacia abajo desde donde escribes la fórmula.'),
         R('<b>Cómo leerlo</b>La muestra es multimodal: 12, 14, 15 y 16 se repiten dos veces cada uno.'),
         T('<b>Error #N/D.</b> Si ningún dato se repite, no existe moda y ambas funciones devuelven <code>#N/D</code> (en algunas versiones, <code>MODA.VARIOS</code> deja la celda vacía). Es un resultado esperable.') ] },
  { t: 'Media, mediana y moda de un solo grupo', when: 'Cuando los datos traen una columna que identifica el grupo y necesitas la medida de un grupo específico.',
    b: [ COND,
         F('=PROMEDIO(SI(A2:A16="A";B2:B16))', '18.2857'), I('m3-c-media', 'Media del peso del material A.'),
         F('=MEDIANA(SI(A2:A16="A";B2:B16))', '19'), I('m3-c-mediana', 'Mediana del peso del material A.'),
         F('=MODA.VARIOS(SI(A2:A16="A";B2:B16))', '15'), I('m3-c-moda', 'Moda del peso del material A.'),
         P('Para el otro grupo, cambia <code>"A"</code> por <code>"B"</code>.'), CSE ] }
] },
{ id: 'm4', files: ['medidas(AT3-AT4-AT5).xlsx'], u: 1, at: 'AT4', name: 'Medidas de dispersión', desc: 'Rango, varianza, desviación estándar, coeficiente de variación y rango intercuartílico.', pages: [
  { t: 'Rango', when: 'Para una primera idea rápida de la dispersión: la distancia entre el dato mayor y el menor. Depende solo de los dos valores extremos.',
    b: [ F('=MAX(A2:A16)-MIN(A2:A16)', '11'), I('m4-rango', 'Excel no tiene una función «rango»: se resta el mínimo al máximo.'),
         R('<b>Cómo leerlo</b>Entre el dato más bajo (12) y el más alto (23) hay 11 unidades.') ] },
  { t: 'Varianza', when: 'Para medir cuánto se alejan los datos de la media. Queda en unidades al cuadrado, por eso suele usarse como paso previo a la desviación estándar.',
    b: [ H('Datos de una muestra'), F('=VAR.S(A2:A16)', '12.0667'), I('m4-var', 'Varianza muestral.'),
         H('Datos de toda la población'), F('=VAR.P(A2:A16)'),
         T('<b>Muestra o población.</b> Aquí sí cambia la función: <code>VAR.S</code> divide por n − 1 y <code>VAR.P</code> divide por n. Si el enunciado no dice que los datos son toda la población, usa la versión muestral.') ] },
  { t: 'Desviación estándar', when: 'Es la medida de dispersión más usada: indica cuánto se alejan los datos de la media, en las mismas unidades que los datos.',
    b: [ H('Datos de una muestra'), F('=DESVEST.M(A2:A16)', '3.47371'), I('m4-desv', 'Desviación estándar muestral.'),
         H('Datos de toda la población'), F('=DESVEST.P(A2:A16)'),
         R('<b>Cómo leerlo</b>Los datos se alejan de la media (16.93) en unas 3.47 unidades, en promedio.') ] },
  { t: 'Coeficiente de variación', when: 'Para comparar la dispersión de conjuntos con medias o unidades distintas. Expresa la desviación estándar como porcentaje de la media.',
    b: [ F('=DESVEST.M(A2:A16)/PROMEDIO(A2:A16)', '20.51%'),
         P('Si ya calculaste la desviación estándar en una celda, puedes dividir esa celda por la media. En la guía la desviación está en <code>D4</code>:'),
         F('=D4/PROMEDIO(A2:A16)', '20.51%'), I('m4-cv', 'Aplica formato de porcentaje a la celda del resultado.'),
         R('<b>Cómo leerlo</b>La desviación estándar equivale al 20.51% de la media. Entre dos conjuntos, el de menor coeficiente es el más homogéneo.'),
         P('Para la versión poblacional, usa <code>DESVEST.P</code> en el numerador.') ] },
  { t: 'Rango intercuartílico', when: 'Para medir la dispersión del 50% central de los datos. No lo afectan los valores extremos.',
    b: [ F('=CUARTIL.INC(A2:A16;3)-CUARTIL.INC(A2:A16;1)', '5'), I('m4-ric', 'Se resta el primer cuartil al tercero.'),
         R('<b>Cómo leerlo</b>La mitad central de los datos se reparte en un tramo de 5 unidades.') ] },
  { t: 'Dispersión de un solo grupo', when: 'Cuando necesitas la dispersión de un grupo específico dentro de la columna de datos.',
    b: [ COND,
         F('=MAX(SI(A2:A16="A";B2:B16))-MIN(SI(A2:A16="A";B2:B16))', '10'), I('m4-c-rango', 'Rango del peso del material A.'),
         F('=VAR.S(SI(A2:A16="A";B2:B16))', '13.9048'), I('m4-c-var', 'Varianza muestral del material A.'),
         F('=DESVEST.M(SI(A2:A16="A";B2:B16))', '3.72891'), I('m4-c-desv', 'Desviación estándar muestral del material A.'),
         F('=CUARTIL.INC(SI(A2:A16="A";B2:B16);3)-CUARTIL.INC(SI(A2:A16="A";B2:B16);1)', '5.5'), I('m4-c-ric', 'Rango intercuartílico del material A.'),
         P('Del mismo modo se obtienen las versiones poblacionales (<code>VAR.P</code>, <code>DESVEST.P</code>) y el coeficiente de variación por grupo.'), CSE ] }
] },
{ id: 'm5', files: ['medidas(AT3-AT4-AT5).xlsx'], u: 1, at: 'AT5', name: 'Medidas de posición', desc: 'Percentiles, deciles, cuartiles, valor según su posición y boxplot.', pages: [
  { t: 'Percentil', when: 'Para saber bajo qué valor queda un cierto porcentaje de los datos. Los percentiles dividen los datos ordenados en 100 partes.',
    b: [ F('=PERCENTIL.INC(A2:A16;0.27)', '14.78'), I('m5-percentil', 'El segundo argumento es el percentil escrito como decimal: el percentil 27 es 0.27.'),
         R('<b>Cómo leerlo</b>El 27% de los datos es menor o igual a 14.78.') ] },
  { t: 'Decil', when: 'Igual que el percentil, pero dividiendo los datos en 10 partes. Excel no tiene una función propia para deciles.',
    b: [ P('El decil k equivale al percentil k × 10, así que el decil 4 es el percentil 40.'),
         F('=PERCENTIL.INC(A2:A16;0.4)', '15.6'), I('m5-decil', 'Decil 4 de la muestra.'),
         R('<b>Cómo leerlo</b>El 40% de los datos es menor o igual a 15.6.'),
         TB(['Decil', 'Percentil', 'Segundo argumento'], [['D1','P10','<code>0.1</code>'],['D2','P20','<code>0.2</code>'],['D3','P30','<code>0.3</code>'],['D4','P40','<code>0.4</code>'],['D5','P50','<code>0.5</code>'],['D6','P60','<code>0.6</code>'],['D7','P70','<code>0.7</code>'],['D8','P80','<code>0.8</code>'],['D9','P90','<code>0.9</code>']]) ] },
  { t: 'Cuartil', when: 'Para dividir los datos en cuatro partes iguales. Son la base del rango intercuartílico y del boxplot.',
    b: [ F('=CUARTIL.INC(A2:A16;2)', '16'), I('m5-cuartil', 'El segundo argumento es el número de cuartil: 1, 2 o 3.'),
         R('<b>Cómo leerlo</b>El segundo cuartil es la mediana: la mitad de los datos es menor o igual a 16.'),
         TB(['Cuartil', 'Percentil', 'Con PERCENTIL.INC'], [['Q1','P25','<code>=PERCENTIL.INC(rango;0.25)</code>'],['Q2 (mediana)','P50','<code>=PERCENTIL.INC(rango;0.50)</code>'],['Q3','P75','<code>=PERCENTIL.INC(rango;0.75)</code>']]) ] },
  { t: 'Valor según su posición', when: 'Para encontrar el k-ésimo dato más alto o más bajo sin tener que ordenar la columna.',
    b: [ H('El tercer valor más alto'), F('=K.ESIMO.MAYOR(A2:A16;3)', '21'), I('m5-kmayor', 'Los tres valores más altos son 23, 22 y 21.'),
         H('El cuarto valor más bajo'), F('=K.ESIMO.MENOR(A2:A16;4)', '14'), I('m5-kmenor', 'Los cuatro valores más bajos son 12, 12, 14 y 14: los repetidos cuentan por separado.') ] },
  { t: 'Boxplot (cajas y bigotes)', when: 'Para ver en un solo gráfico el mínimo, los tres cuartiles y el máximo, y detectar asimetría o valores atípicos.',
    b: [ S('Selecciona solo los números (<code>A2:A16</code>), sin el encabezado.'),
         S('Ve a <span class="ui">Insertar</span>, abre el ícono de gráficos estadísticos y elige <span class="ui">Cajas y bigotes</span>.', 'm5-box-menu', 'Menú de gráficos estadísticos.'),
         I('m5-box', 'Boxplot recién insertado.'),
         S('Agrega un título y, con clic derecho sobre el gráfico → <span class="ui">Agregar etiquetas de datos</span>, los valores exactos.', 'm5-box-etiquetas', 'Boxplot con etiquetas.'),
         R('<b>Cómo leerlo</b>De abajo hacia arriba: mínimo (12), Q1 (14), mediana (16), Q3 (20) y máximo (23). El valor junto a la «×» es la media (16.93).'),
         T('<b>Los cuartiles del gráfico pueden diferir de <code>CUARTIL.INC</code>.</b> Con esta muestra, la función entrega Q1 = 14.5 y Q3 = 19.5, mientras que el gráfico muestra 14 y 20, porque calcula los cuartiles con el método exclusivo: son los valores que entrega <code>CUARTIL.EXC</code>. Esta nota no viene en la guía.') ] },
  { t: 'Boxplot múltiple', when: 'Para comparar la distribución de dos o más conjuntos de datos en la misma escala.',
    b: [ S('En la hoja «Dos muestras», selecciona las columnas de ambos conjuntos (<code>A2:A16</code> y <code>B2:B16</code>) y repite los pasos: <span class="ui">Insertar → gráficos estadísticos → Cajas y bigotes</span>.', 'm5-box2-menu', 'Selección de las dos muestras.'),
         I('m5-box2', 'Una caja por muestra.'),
         R('<b>Cómo leerlo</b>La muestra 2 se ubica más arriba (media 18.33 frente a 16.93) y alcanza un máximo mayor (25 frente a 23).') ] },
  { t: 'Posición dentro de un solo grupo', when: 'Cuando necesitas el percentil, decil, cuartil o k-ésimo valor de un grupo específico.',
    b: [ COND,
         F('=PERCENTIL.INC(SI(A2:A16="A";B2:B16);0.27)', '15'), I('m5-c-percentil', 'Percentil 27 del material A.'),
         F('=PERCENTIL.INC(SI(A2:A16="A";B2:B16);0.4)', '16.6'), I('m5-c-decil', 'Decil 4 del material A.'),
         F('=CUARTIL.INC(SI(A2:A16="A";B2:B16);2)', '19'), I('m5-c-cuartil', 'Cuartil 2 del material A.'),
         F('=K.ESIMO.MAYOR(SI(A2:A16="A";B2:B16);3)', '20'), I('m5-c-kmayor', 'Tercer valor más alto del material A.'),
         F('=K.ESIMO.MENOR(SI(A2:A16="A";B2:B16);4)', '19'), I('m5-c-kmenor', 'Cuarto valor más bajo del material A.'),
         CSE ] }
] },
{ id: 'm6', files: ['datos-estudiantes(AT1).xlsx'], u: 2, at: 'AT1', name: 'Tablas y gráficos bivariados', desc: 'Tabla de doble entrada con tabla dinámica y su gráfico de columnas agrupadas.', pages: [
  { t: 'Tabla de doble entrada', when: 'Para explorar la relación entre dos variables: cuenta cuántos casos hay en cada combinación de categorías (Comuna de residencia y Nivel de satisfacción).',
    b: [ S('Crea la tabla dinámica: <span class="ui">Insertar → Tabla dinámica</span>, con el rango completo (<code>A1:D21</code>), en <span class="ui">Hoja de cálculo nueva</span>.'),
         S('Arrastra <span class="ui">Comuna de residencia</span> a <span class="ui">Filas</span> y <span class="ui">Nivel de satisfacción con la carrera</span> a <span class="ui">Columnas</span>.'),
         S('Arrastra cualquier campo (por ejemplo, Edad) a <span class="ui">Valores</span> y configúralo como <span class="ui">Recuento</span>. Solo se usa para contar filas, por eso da igual cuál elijas.', 'm6-tabla', 'Tabla de doble entrada. A la derecha se ve un campo en Filas, otro en Columnas y el recuento en Valores.') ] },
  { t: 'Ordenar las columnas', when: 'Cuando la variable de las columnas es ordinal y Excel la dejó en orden alfabético.',
    b: [ S('Haz clic derecho sobre la etiqueta de columna «Muy baja» → <span class="ui">Mover</span> → <span class="ui">Mover «Muy baja» al principio</span>. Repite con «Baja» y «Alta» hasta dejarlas de menor a mayor.', 'm6-mover', 'Menú Mover sobre una etiqueta de columna.'),
         I('m6-ordenada', 'Tabla de doble entrada con los niveles ordenados.', 1),
         R('<b>Cómo leerlo</b>De los 7 estudiantes de Santiago, 4 declaran satisfacción muy baja. Los totales de fila y de columna son las frecuencias de cada variable por separado: 6 estudiantes en total declaran satisfacción muy baja.') ] },
  { t: 'Gráfico de columnas agrupadas', when: 'Para mostrar visualmente el cruce de las dos variables y comparar una entre las categorías de la otra.',
    b: [ S('Haz clic en cualquier celda de la tabla dinámica.'),
         S('Ve a <span class="ui">Insertar</span> y elige <span class="ui">columnas agrupadas</span> para comparar la satisfacción entre comunas, o <span class="ui">barras</span> si prefieres la lectura horizontal.'),
         S('Comprueba que el eje horizontal muestre las comunas, el vertical la cantidad de estudiantes y que cada serie (color) sea un nivel de satisfacción. Ajusta título, colores y etiquetas.', 'm6-grafico', 'Gráfico construido desde la tabla dinámica.'),
         R('<b>Cómo leerlo</b>En Santiago predomina la satisfacción muy baja (4 estudiantes); en Maipú, la baja (2).') ] }
] },
{ id: 'm7', files: ['unit02-estadisticas-de-la-seccion(AT2).xlsx'], u: 2, at: 'AT2', name: 'Medidas en datos bivariados', desc: 'Promedio, desviación estándar y coeficiente de variación de una variable según los grupos de otra.', pages: [
  { t: 'Cruce de dos variables cuantitativas', when: 'Para cruzar una variable discreta (Cantidad de pruebas) con una continua (Nota de aprobación), agrupando la continua en tramos.',
    b: [ S('Crea la tabla dinámica con el rango completo (<code>A1:C31</code>). Arrastra <span class="ui">Nota de aprobación</span> a <span class="ui">Filas</span>, <span class="ui">Cantidad de pruebas</span> a <span class="ui">Columnas</span> y cualquier campo (Género) a <span class="ui">Valores</span> como <span class="ui">Recuento</span>.', 'm7-cruce', 'Sin agrupar, cada nota distinta ocupa una fila.'),
         S('Haz clic derecho sobre una de las notas → <span class="ui">Agrupar</span>. Escribe 7.0 en <span class="ui">Terminar en</span> y 1.0 en <span class="ui">Por</span>.', 'm7-agrupar', 'Ventana «Agrupación».'),
         I('m7-tramos', 'Notas agrupadas en los tramos 4–5, 5–6 y 6–7.', 1),
         R('<b>Cómo leerlo</b>14 de los 30 estudiantes aprobaron con nota entre 5 y 6; de ellos, 6 rindieron 6 pruebas.') ] },
  { t: 'Promedio y desviación estándar por grupo', when: 'Para comparar una variable numérica (Nota de aprobación) entre los grupos de una variable categórica (Género), todos a la vez.',
    b: [ S('En una tabla dinámica nueva, arrastra <span class="ui">Género</span> a <span class="ui">Filas</span> y <span class="ui">Nota de aprobación</span> dos veces a <span class="ui">Valores</span>.'),
         S('En el primer campo de Valores abre <span class="ui">Configuración del campo → Resumir por</span> y elige <span class="ui">Promedio</span>.', 'm7-promedio', 'Opciones de «Resumir por».'),
         S('En el segundo, haz lo mismo y elige <span class="ui">Desvest</span> (desviación estándar muestral).', 'm7-desvest', 'Segunda columna resumida con Desvest.'),
         I('m7-resultado', 'Promedio y desviación estándar de la nota según género.', 1),
         R('<b>Cómo leerlo</b>El promedio de aprobación es parecido en ambos grupos (5.35 y 5.41), pero las notas del grupo masculino están más dispersas (0.73 frente a 0.58).'),
         T('<b>Dos caminos para lo mismo.</b> La tabla dinámica entrega la medida de todos los grupos a la vez. Las fórmulas con <code>SI</code> de la Unidad 1 entregan la de un solo grupo, pero permiten medidas que la tabla dinámica no ofrece, como mediana, moda o cuartiles.') ] },
  { t: 'Coeficiente de variación por grupo', when: 'Para decidir qué grupo es más homogéneo cuando sus promedios son distintos.',
    b: [ S('Agrega una columna a la derecha de la tabla dinámica con el encabezado «Coeficiente de variación (%)».'),
         S('Divide la desviación estándar por el promedio y copia la fórmula hacia abajo.'),
         F('=C4/B4', 'D4', 'celda'),
         S('Da formato de porcentaje a la columna D y deja todos los valores con dos decimales.', 'm7-cv', 'Tabla final con el coeficiente de variación.', 1),
         R('<b>Cómo leerlo</b>Las notas del grupo femenino son más homogéneas: su coeficiente de variación (10.90%) es menor que el del masculino.') ] }
] }
];

export const GUIA = [
  ['Contar cuántas veces aparece cada categoría o valor (frecuencia absoluta)', 'Tabla dinámica: campo en Filas y en Valores', 'm1-1'],
  ['Porcentaje de cada categoría (frecuencia porcentual)', 'Mostrar datos como → % del total general', 'm1-2'],
  ['Ordenar categorías ordinales', 'Clic derecho → Mover', 'm1-3'],
  ['Frecuencias acumuladas', '=D4+B5 copiada hacia abajo', 'm1-4'],
  ['Agrupar una variable continua en intervalos de clase', 'SI anidado', 'm1-5'],
  ['Agrupar una variable continua en intervalos de clase', 'Agrupar (tabla dinámica)', 'm1-6'],
  ['Elegir el gráfico adecuado', 'Según el tipo de variable', 'm2-1'],
  ['Mostrar las partes de un total (variable cualitativa)', 'Gráfico circular', 'm2-2'],
  ['Comparar frecuencias de una variable discreta', 'Gráfico de columnas agrupadas', 'm2-3'],
  ['Ver la evolución de una variable en el tiempo', 'Gráfico de líneas con marcadores', 'm2-4'],
  ['Ver la distribución de una variable continua', 'Histograma', 'm2-5'],
  ['Media, promedio', 'PROMEDIO', 'm3-1'],
  ['Mediana, valor central', 'MEDIANA', 'm3-2'],
  ['Moda, valor más frecuente', 'MODA.UNO / MODA.VARIOS', 'm3-3'],
  ['Media, mediana o moda de un solo grupo (condicional)', 'FUNCIÓN(SI(condición;rango))', 'm3-4'],
  ['Rango (máximo menos mínimo)', 'MAX − MIN', 'm4-1'],
  ['Varianza', 'VAR.S (muestra) / VAR.P (población)', 'm4-2'],
  ['Desviación estándar', 'DESVEST.M (muestra) / DESVEST.P (población)', 'm4-3'],
  ['Coeficiente de variación, comparar dispersión', 'DESVEST.M / PROMEDIO', 'm4-4'],
  ['Rango intercuartílico', 'CUARTIL.INC(…;3) − CUARTIL.INC(…;1)', 'm4-5'],
  ['Dispersión de un solo grupo (condicional)', 'FUNCIÓN(SI(condición;rango))', 'm4-6'],
  ['Percentil', 'PERCENTIL.INC', 'm5-1'],
  ['Decil', 'PERCENTIL.INC con 0.1, 0.2…', 'm5-2'],
  ['Cuartil', 'CUARTIL.INC', 'm5-3'],
  ['El k-ésimo valor más alto o más bajo', 'K.ESIMO.MAYOR / K.ESIMO.MENOR', 'm5-4'],
  ['Boxplot, diagrama de cajas', 'Gráfico estadístico → Cajas y bigotes', 'm5-5'],
  ['Comparar dos muestras con boxplot', 'Cajas y bigotes con varias columnas', 'm5-6'],
  ['Percentil, cuartil o posición de un solo grupo (condicional)', 'FUNCIÓN(SI(condición;rango);k)', 'm5-7'],
  ['Cruzar dos variables (tabla de doble entrada, de contingencia)', 'Tabla dinámica: Filas + Columnas + Valores', 'm6-1'],
  ['Graficar el cruce de dos variables', 'Columnas agrupadas desde la tabla dinámica', 'm6-3'],
  ['Cruzar dos variables cuantitativas por tramos', 'Tabla dinámica + Agrupar', 'm7-1'],
  ['Promedio y desviación estándar por grupo', 'Tabla dinámica → Resumir por', 'm7-2'],
  ['Coeficiente de variación por grupo', '=C4/B4 junto a la tabla dinámica', 'm7-3']
];

/* ---------- Conceptos (teoría) ----------
   Redactados para este resumen; no vienen de las guías. Los ejemplos usan los
   mismos datos que las guías (archivos .xlsx) y enlazan a la lámina de Excel. */
function M(tex) { return { k: 'm', tex: tex }; }
function X(h) { return { k: 'x', h: h }; } // HTML tal cual (esquemas SVG)

const MUESTRA = P('Los ejemplos usan la muestra de la hoja «Una muestra», ordenada de menor a mayor (n = 15): <code>12 12 14 14 15 15 16 16 17 18 19 20 21 22 23</code>');
const EXCEL = (h) => P('<b>En Excel:</b> ' + h);

export const TEORIA = [
{ id: 't1', u: 0, at: 'T1', files: [], name: 'Datos y variables', desc: 'Población, muestra y variable; los cuatro tipos de variable y qué permite cada uno.', pages: [
  { t: 'Población, muestra y variable', lbl: 'La idea',
    when: 'La estadística descriptiva ordena y resume los datos que tienes. Antes de calcular nada conviene saber de quiénes son esos datos y qué miden.',
    b: [
      TB(['Concepto', 'Qué es', 'En las guías'], [
        ['<b>Población</b>', 'Todos los elementos que interesa estudiar.', 'Por ejemplo, todos los estudiantes de una carrera.'],
        ['<b>Muestra</b>', 'La parte de la población que efectivamente se observa.', 'Los 20 estudiantes del archivo «Datos de estudiantes».'],
        ['<b>Variable</b>', 'La característica que se registra de cada elemento.', 'Comuna de residencia, Edad, Número de hermanos.'],
        ['<b>Dato</b>', 'El valor que toma la variable en un elemento.', 'La edad del primer estudiante: 21 años.'],
        ['<b>n</b>', 'El tamaño de la muestra: cuántos datos hay.', 'n = 20 estudiantes; n = 15 en la hoja «Una muestra».']
      ]),
      P('<b>Por qué importa distinguir muestra de población.</b> La media, la mediana y la moda se calculan igual en ambos casos. La varianza y la desviación estándar no: tienen una fórmula para la muestra y otra para la población.'),
      EXCEL('<a href="#m4-2">VAR.S y VAR.P</a>, <a href="#m4-3">DESVEST.M y DESVEST.P</a>.')
    ] },
  { t: 'Tipos de variable', lbl: 'La idea',
    when: 'El tipo de variable decide qué tabla, qué gráfico y qué medidas tienen sentido. Es lo primero que hay que identificar.',
    b: [
      TB(['Tipo', 'Qué registra', 'Ejemplo de las guías', 'Gráfico habitual', 'Medidas que admite'], [
        ['<b>Cualitativa nominal</b>', 'Categorías sin orden.', 'Comuna de residencia', 'Circular, columnas', 'Moda'],
        ['<b>Cualitativa ordinal</b>', 'Categorías con un orden natural.', 'Nivel de satisfacción (de «Muy baja» a «Muy alta»)', 'Columnas', 'Moda; frecuencias acumuladas'],
        ['<b>Cuantitativa discreta</b>', 'Números que se cuentan: valores aislados.', 'Número de hermanos, Cantidad de pruebas', 'Columnas', 'Todas'],
        ['<b>Cuantitativa continua</b>', 'Números que se miden: cualquier valor dentro de un intervalo.', 'Edad, Peso, Nota de aprobación', 'Histograma, boxplot', 'Todas']
      ]),
      T('<b>Un número no siempre es una cantidad.</b> Si las categorías se codifican con números (1 = Masculino, 2 = Femenino), la variable sigue siendo cualitativa: promediar esos códigos no tiene sentido.'),
      EXCEL('<a href="#m2-1">¿Qué gráfico usar?</a>')
    ] }
] },
{ id: 't2', u: 0, at: 'T2', files: [], name: 'Frecuencias', desc: 'Frecuencia absoluta, porcentual y acumulada; intervalos de clase.', pages: [
  { t: 'Frecuencia absoluta, porcentual y acumulada', lbl: 'La idea',
    when: 'Una tabla de frecuencia cuenta cuántas veces aparece cada valor y qué parte del total representa.',
    b: [
      TB(['Frecuencia', 'Qué indica', 'Ejemplo (20 estudiantes)'], [
        ['<b>Absoluta</b>', 'Cuántas veces aparece la categoría o el valor.', '7 estudiantes viven en Santiago.'],
        ['<b>Porcentual</b>', 'Qué parte del total representa.', '7 de 20 = 35%.'],
        ['<b>Absoluta acumulada</b>', 'Cuántos datos hay hasta esa categoría, incluyéndola.', '6 + 4 + 4 = 14 estudiantes tienen a lo más satisfacción media.'],
        ['<b>Porcentual acumulada</b>', 'Qué porcentaje hay hasta esa categoría, incluyéndola.', '14 de 20 = 70%.']
      ]),
      M('\\text{frecuencia porcentual}=\\frac{\\text{frecuencia absoluta}}{n}\\times 100'),
      T('<b>Dos comprobaciones.</b> Las frecuencias absolutas suman n y las porcentuales suman 100%. La última acumulada siempre es n (o 100%).'),
      P('Las acumuladas solo tienen sentido cuando las categorías tienen orden: variables ordinales y cuantitativas. Responden preguntas del tipo «¿cuántos tienen a lo más…?».'),
      EXCEL('<a href="#m1-1">frecuencia absoluta</a>, <a href="#m1-2">porcentual</a> y <a href="#m1-4">acumuladas</a>.')
    ] },
  { t: 'Intervalos de clase', lbl: 'La idea',
    when: 'Cuando una variable continua toma muchos valores distintos, una fila por valor no resume nada. Se agrupan los datos en tramos.',
    b: [
      P('Cada tramo es un <b>intervalo de clase</b> y su <b>amplitud</b> es la distancia entre su límite inferior y su límite superior. Tres reglas:'),
      TB(['Regla', 'Por qué'], [
        ['Los intervalos cubren todos los datos.', 'Ningún dato queda fuera de la tabla.'],
        ['No se superponen.', 'Cada dato cae en un solo intervalo.'],
        ['Tienen la misma amplitud.', 'Las frecuencias de los tramos se pueden comparar entre sí.']
      ]),
      R('<b>Ejemplo</b>Las edades de los 20 estudiantes van de 19 a 26 años. Con amplitud 2 quedan cuatro intervalos: 19–20, 21–22, 23–24 y 25–26.'),
      P('El <b>histograma</b> es el gráfico de esta tabla: una barra por intervalo, con altura igual a su frecuencia.'),
      EXCEL('intervalos con <a href="#m1-5">SI</a> o con <a href="#m1-6">Agrupar</a>; <a href="#m2-5">histograma</a>.')
    ] }
] },
{ id: 't3', u: 0, at: 'T3', files: [], name: 'Tendencia central', desc: 'Media, mediana y moda: qué mide cada una y cuál representa mejor a los datos.', pages: [
  { t: 'Media, mediana y moda', lbl: 'La idea',
    when: 'Son tres formas de responder la misma pregunta: ¿cuál es el valor típico de estos datos?',
    b: [
      MUESTRA,
      H('Media'),
      P('La suma de todos los datos dividida por la cantidad de datos.'),
      M('\\bar{x}=\\frac{x_1+x_2+\\dots+x_n}{n}=\\frac{254}{15}=16.93'),
      H('Mediana'),
      P('El valor que queda al centro de los datos ordenados. Con n impar es el dato de la posición (n + 1) / 2; con n par, el promedio de los dos datos centrales.'),
      R('<b>Ejemplo</b>Con n = 15 la mediana es el dato de la posición 8: vale 16. Hay siete datos antes y siete después.'),
      H('Moda'),
      P('El valor que más se repite. Puede haber una, varias o ninguna.'),
      R('<b>Ejemplo</b>12, 14, 15 y 16 aparecen dos veces cada uno y ningún valor aparece más: la muestra tiene cuatro modas.'),
      EXCEL('<a href="#m3-1">PROMEDIO</a>, <a href="#m3-2">MEDIANA</a>, <a href="#m3-3">MODA.UNO y MODA.VARIOS</a>.')
    ] },
  { t: '¿Cuál representa mejor a los datos?', lbl: 'La idea',
    when: 'La media usa todos los datos, por eso un valor extremo la arrastra. La mediana y la moda no se mueven.',
    b: [
      TB(['Medida', 'A favor', 'Cuidado', 'Sirve para variables'], [
        ['<b>Media</b>', 'Usa todos los datos.', 'Sensible a valores extremos.', 'Cuantitativas'],
        ['<b>Mediana</b>', 'No la afectan los valores extremos.', 'Solo mira el orden, no la magnitud de los datos.', 'Cuantitativas'],
        ['<b>Moda</b>', 'Es la única que sirve con categorías.', 'Puede no existir o no ser única.', 'Todas']
      ]),
      H('Comparar la media con la mediana'),
      TB(['Si…', 'La distribución es…'], [
        ['media ≈ mediana', 'Aproximadamente simétrica.'],
        ['media &gt; mediana', 'Asimétrica hacia la derecha: hay valores altos que tiran de la media.'],
        ['media &lt; mediana', 'Asimétrica hacia la izquierda: hay valores bajos que tiran de la media.']
      ]),
      R('<b>Ejemplo</b>En la muestra, la media (16.93) queda algo por encima de la mediana (16): los valores altos están un poco más alejados del centro que los bajos.')
    ] }
] },
{ id: 't4', u: 0, at: 'T4', files: [], name: 'Dispersión', desc: 'Rango, rango intercuartílico, varianza, desviación estándar y coeficiente de variación.', pages: [
  { t: 'Rango y rango intercuartílico', lbl: 'La idea',
    when: 'Dos conjuntos pueden tener la misma media y ser muy distintos. La dispersión mide cuánto se separan los datos entre sí.',
    b: [
      MUESTRA,
      H('Rango'),
      M('\\text{rango}=\\text{máximo}-\\text{mínimo}=23-12=11'),
      P('Es rápido, pero depende solo de los dos datos extremos.'),
      H('Rango intercuartílico'),
      M('\\text{RIC}=Q_3-Q_1=19.5-14.5=5'),
      P('Mide el tramo que ocupa el 50% central de los datos. Como deja fuera el 25% más bajo y el 25% más alto, los valores extremos no lo afectan.'),
      EXCEL('<a href="#m4-1">rango</a>, <a href="#m4-5">rango intercuartílico</a>; los cuartiles están en <a href="#t5-1">Percentiles, deciles y cuartiles</a>.')
    ] },
  { t: 'Varianza y desviación estándar', lbl: 'La idea',
    when: 'Miden qué tan lejos de la media están los datos, usando todos los datos y no solo los extremos.',
    b: [
      H('Varianza'),
      P('El promedio de las distancias al cuadrado entre cada dato y la media. En una muestra se divide por n − 1; en una población, por n.'),
      M('s^2=\\frac{\\sum (x_i-\\bar{x})^2}{n-1}=\\frac{168.93}{14}=12.07 \\qquad \\sigma^2=\\frac{\\sum (x_i-\\mu)^2}{n}=\\frac{168.93}{15}=11.26'),
      P('Queda en unidades al cuadrado (años², gramos²), por eso cuesta interpretarla directamente.'),
      H('Desviación estándar'),
      P('La raíz cuadrada de la varianza. Vuelve a las unidades de los datos.'),
      M('s=\\sqrt{s^2}=\\sqrt{12.07}=3.47 \\qquad \\sigma=\\sqrt{11.26}=3.36'),
      R('<b>Cómo leerlo</b>Los datos se alejan de la media (16.93) en unas 3.47 unidades, en promedio.'),
      T('<b>Muestra o población.</b> Si el enunciado no dice que los datos son toda la población, se usa la versión muestral (s², s).'),
      EXCEL('<a href="#m4-2">VAR.S y VAR.P</a>, <a href="#m4-3">DESVEST.M y DESVEST.P</a>.')
    ] },
  { t: 'Coeficiente de variación', lbl: 'La idea',
    when: 'Es la desviación estándar expresada como porcentaje de la media. Permite comparar la dispersión de conjuntos con medias o unidades distintas.',
    b: [
      M('CV=\\frac{s}{\\bar{x}}\\times 100=\\frac{3.47}{16.93}\\times 100=20.51\\%'),
      P('Una desviación de 3 unidades es mucho si la media es 10 y poco si la media es 1000. El coeficiente de variación corrige eso.'),
      R('<b>Cómo leerlo</b>Entre dos conjuntos, el de menor coeficiente de variación es el más homogéneo: sus datos se parecen más entre sí.'),
      EXCEL('<a href="#m4-4">coeficiente de variación</a>; por grupo, en <a href="#m7-3">la tabla dinámica</a>.')
    ] }
] },
{ id: 't5', u: 0, at: 'T5', files: [], name: 'Posición', desc: 'Percentiles, deciles y cuartiles; cómo leer un boxplot.', pages: [
  { t: 'Percentiles, deciles y cuartiles', lbl: 'La idea',
    when: 'Indican bajo qué valor queda un cierto porcentaje de los datos ordenados.',
    b: [
      TB(['Medida', 'Divide los datos en', 'Se lee', 'Equivalencia'], [
        ['<b>Percentil</b> P<sub>k</sub>', '100 partes', 'El k% de los datos es menor o igual a P<sub>k</sub>.', '—'],
        ['<b>Decil</b> D<sub>k</sub>', '10 partes', 'El (10 × k)% de los datos es menor o igual a D<sub>k</sub>.', 'D<sub>4</sub> = P<sub>40</sub>'],
        ['<b>Cuartil</b> Q<sub>k</sub>', '4 partes', 'El (25 × k)% de los datos es menor o igual a Q<sub>k</sub>.', 'Q<sub>1</sub> = P<sub>25</sub>, Q<sub>2</sub> = P<sub>50</sub>, Q<sub>3</sub> = P<sub>75</sub>']
      ]),
      P('El segundo cuartil, el quinto decil y el percentil 50 son el mismo valor: la mediana.'),
      H('Cómo lo calcula PERCENTIL.INC'),
      MUESTRA,
      P('Excel ubica la posición del percentil entre los datos ordenados y, si cae entre dos datos, toma un valor intermedio en esa misma proporción. Para el percentil 27 (p = 0.27):'),
      M('\\text{posición}=1+(n-1)\\cdot p=1+14\\cdot 0.27=4.78'),
      M('P_{27}=14+0.78\\cdot(15-14)=14.78'),
      P('La posición 4.78 queda entre el cuarto dato (14) y el quinto (15), a un 78% del camino.'),
      T('<b>Hay más de un método.</b> Los libros y los programas no calculan los percentiles exactamente igual, por eso el boxplot de Excel muestra cuartiles algo distintos a los de <code>CUARTIL.INC</code>.'),
      EXCEL('<a href="#m5-1">percentil</a>, <a href="#m5-2">decil</a>, <a href="#m5-3">cuartil</a>.')
    ] },
  { t: 'Cómo leer un boxplot', lbl: 'La idea',
    when: 'El diagrama de cajas y bigotes resume una distribución en cinco números: mínimo, Q1, mediana, Q3 y máximo.',
    b: [
      X('<figure class="xl-fig"><div class="xl-diagram"><svg viewBox="0 36 470 228" role="img" aria-label="Esquema de un boxplot vertical: de abajo hacia arriba, mínimo 12, Q1 14, mediana 16, Q3 20 y máximo 23; la media, 16.93, se marca con una equis"><path class="ln" d="M210 62V110M210 206V238M188 62H232M188 238H232"/><rect class="box" x="160" y="110" width="100" height="96"/><path class="ln" d="M160 174H260"/><path class="ln" d="M204 153l12 12M216 153l-12 12"/><path class="gd" d="M124 62H182"/><text x="118" y="66" text-anchor="end">Máximo · 23</text><path class="gd" d="M124 110H154"/><text x="118" y="114" text-anchor="end">Q3 · 20</text><path class="gd" d="M124 174H154"/><text x="118" y="178" text-anchor="end">Mediana · 16</text><path class="gd" d="M124 206H154"/><text x="118" y="210" text-anchor="end">Q1 · 14</text><path class="gd" d="M124 238H182"/><text x="118" y="242" text-anchor="end">Mínimo · 12</text><path class="gd" d="M222 159H292"/><text x="298" y="163" class="acc">× Media · 16.93</text><path class="gd" d="M216 86H292"/><text x="298" y="90" class="mut">Bigote superior</text><path class="gd" d="M216 222H292"/><text x="298" y="226" class="mut">Bigote inferior</text><path class="ln" d="M272 110h8V206h-8"/><text x="298" y="136" class="mut">Caja: 50% central</text></svg></div><figcaption>Excel dibuja el boxplot en vertical: los valores se leen de abajo hacia arriba.</figcaption></figure>'),
      I('m5-box-etiquetas', 'El mismo boxplot en Excel, con etiquetas de datos. La caja se ve ancha porque el gráfico tiene una sola muestra.'),
      TB(['Parte', 'Qué muestra'], [
        ['<b>Caja</b>', 'Va de Q<sub>1</sub> (borde inferior) a Q<sub>3</sub> (borde superior): contiene el 50% central de los datos. Su altura es el rango intercuartílico; el ancho no significa nada.'],
        ['<b>Línea dentro de la caja</b>', 'La mediana.'],
        ['<b>×</b>', 'La media.'],
        ['<b>Bigotes</b>', 'Las líneas verticales que salen de la caja: llegan hasta el dato más bajo y el más alto que no son atípicos.'],
        ['<b>Puntos sueltos</b>', 'Valores atípicos: datos que quedan a más de 1.5 veces el rango intercuartílico de la caja.']
      ]),
      H('Qué mirar'),
      TB(['Observación', 'Qué indica'], [
        ['Caja alta o bigotes largos', 'Mucha dispersión.'],
        ['Mediana lejos del centro de la caja, o un bigote mucho más largo que el otro', 'Distribución asimétrica.'],
        ['Una caja completa más arriba que otra', 'Ese conjunto tiene valores mayores en general.']
      ]),
      EXCEL('<a href="#m5-5">boxplot</a> y <a href="#m5-6">boxplot múltiple</a>.')
    ] }
] },
{ id: 't6', u: 0, at: 'T6', files: [], name: 'Dos variables', desc: 'Qué cambia en la Unidad 2: tabla de doble entrada, sus porcentajes y medidas por grupo.', pages: [
  { t: '¿Qué cambia con dos variables?', lbl: 'La idea',
    when: 'Los conceptos de la Unidad 1 son los mismos. Cambia la pregunta: ya no es «¿cómo es esta variable?», sino «¿cómo se comporta una variable según la otra?».',
    b: [
      TB(['En la Unidad 1', 'En la Unidad 2', 'Qué hay de nuevo'], [
        ['Tabla de frecuencia', '<a href="#t6-2">Tabla de doble entrada</a>', 'Cada celda cuenta los casos que cumplen dos condiciones a la vez.'],
        ['Frecuencia porcentual', 'Porcentaje respecto del total, de la fila o de la columna', 'Hay que decidir respecto de qué grupo se calcula.'],
        ['Gráfico de columnas', 'Columnas agrupadas', 'Una serie (color) por cada categoría de la segunda variable.'],
        ['Intervalos de clase', 'Cruce por tramos', 'Nada: se agrupa igual, dentro de la tabla de doble entrada.'],
        ['Media, desviación estándar, coeficiente de variación', '<a href="#t6-3">Las mismas, por grupo</a>', 'Nada: se calculan dentro de cada grupo y se comparan.']
      ]),
      P('Lo único realmente nuevo es la tabla de doble entrada y la lectura de sus porcentajes. Todo lo demás es aplicar lo que ya sabes a cada grupo por separado.'),
      T('<b>Alcance.</b> Las actividades de la Unidad 2 no usan medidas de relación entre dos variables numéricas, como la covarianza o la correlación. La Unidad 3 es Regresión lineal simple.')
    ] },
  { t: 'Tabla de doble entrada', lbl: 'La idea',
    when: 'Cruza dos variables: una en las filas y otra en las columnas. Los totales de los bordes son la tabla de frecuencia de cada variable por separado.',
    b: [
      I('m6-ordenada', 'Comuna de residencia (filas) y Nivel de satisfacción con la carrera (columnas) de los 20 estudiantes.', 1),
      TB(['Parte de la tabla', 'Qué cuenta', 'Ejemplo'], [
        ['<b>Celda</b> (frecuencia conjunta)', 'Los casos que cumplen ambas condiciones.', '4 estudiantes viven en Santiago y declaran satisfacción muy baja.'],
        ['<b>Total de fila</b>', 'Los casos de esa categoría de la primera variable.', '7 estudiantes viven en Santiago.'],
        ['<b>Total de columna</b>', 'Los casos de esa categoría de la segunda variable.', '6 estudiantes declaran satisfacción muy baja.'],
        ['<b>Total general</b>', 'Todos los casos.', '20 estudiantes.']
      ]),
      H('Tres porcentajes para la misma celda'),
      TB(['Respecto de…', 'Cálculo', 'Se lee'], [
        ['<b>El total general</b>', '4 / 20 = 20%', 'El 20% de los estudiantes vive en Santiago y declara satisfacción muy baja.'],
        ['<b>La fila</b>', '4 / 7 = 57.1%', 'De los estudiantes que viven en Santiago, el 57.1% declara satisfacción muy baja.'],
        ['<b>La columna</b>', '4 / 6 = 66.7%', 'De los estudiantes que declaran satisfacción muy baja, el 66.7% vive en Santiago.']
      ]),
      T('<b>Busca el «de los…».</b> El grupo que viene después de «de los» o «de las» es el denominador. «¿Qué porcentaje de las mujeres terminó la enseñanza media?» se calcula sobre el total de mujeres, no sobre el total de encuestados.'),
      EXCEL('<a href="#m6-1">tabla de doble entrada</a> y <a href="#m6-3">gráfico de columnas agrupadas</a>. Los tres porcentajes están en <span class="ui">Mostrar datos como</span>: % del total general, % del total de filas y % del total de columnas.')
    ] },
  { t: 'Medidas por grupo', lbl: 'La idea',
    when: 'Una variable categórica separa los datos en grupos. La medida se calcula dentro de cada grupo, con la misma fórmula de siempre, para compararlos.',
    b: [
      P('Nota de aprobación (variable numérica) según Género (variable categórica), con los 30 estudiantes de «Estadísticas de la sección»:'),
      TB(['Género', 'n', 'Promedio', 'Desviación estándar', 'Coeficiente de variación'], [
        ['Femenino', '13', '5.35', '0.58', '10.90%'],
        ['Masculino', '17', '5.41', '0.73', '13.40%']
      ]),
      R('<b>Cómo leerlo</b>Ambos grupos aprueban con un promedio parecido, pero las notas del grupo femenino son más homogéneas: su coeficiente de variación es menor.'),
      TB(['Para comparar…', 'Usa…'], [
        ['El nivel de cada grupo', 'El promedio (o la mediana, si hay valores extremos).'],
        ['La dispersión, con promedios parecidos y la misma unidad', 'La desviación estándar.'],
        ['La dispersión, con promedios distintos', 'El coeficiente de variación.']
      ]),
      EXCEL('<a href="#m7-2">promedio y desviación estándar por grupo</a>, <a href="#m7-3">coeficiente de variación por grupo</a>. Para mediana, moda o cuartiles de un grupo, las <a href="#m3-4">fórmulas con SI</a>.')
    ] }
] }
];

/* ---------- Resumen de comandos ----------
   Las dos primeras láminas reúnen las tablas «Resumen de funciones» del final
   de las guías AT3, AT4 y AT5. La tercera no viene en las guías (AT1, AT2 y las
   de la Unidad 2 no traen resumen): junta las rutas de menú de sus pasos. */
const fx = (f) => '<code>' + f + '</code>';
const ver = (id) => '<a class="xl-nowrap" href="#' + id + '">Ver →</a>';
const SI_ = 'SI(valor_lógico;rango)';
const SI_EJ = 'SI(A2:A16="A";B2:B16)';

export const RESUMEN = [
{ id: 'r1', u: 3, at: 'R1', files: [], name: 'Resumen de comandos', desc: 'Todas las funciones y rutas de menú de las guías, en tablas para tener a mano.', pages: [
  { t: 'Funciones estadísticas', lbl: 'Para qué sirve',
    when: 'Todas las funciones de las guías de la Unidad 1 en una sola hoja. «rango» son las celdas con los datos, por ejemplo A2:A16.',
    b: [
      H('Tendencia central'),
      TB(['Medida', 'Función en Excel', 'Ejemplo de uso', ''], [
        ['Media', fx('=PROMEDIO(rango)'), fx('=PROMEDIO(A1:A15)'), ver('m3-1')],
        ['Mediana', fx('=MEDIANA(rango)'), fx('=MEDIANA(A1:A15)'), ver('m3-2')],
        ['Moda (una)', fx('=MODA.UNO(rango)'), fx('=MODA.UNO(A1:A15)'), ver('m3-3')],
        ['Moda (todas)', fx('=MODA.VARIOS(rango)'), fx('=MODA.VARIOS(A1:A15)'), ver('m3-3')]
      ]),
      H('Dispersión'),
      TB(['Medida', 'Función en Excel', 'Ejemplo de uso', ''], [
        ['Rango', fx('=MAX(rango)-MIN(rango)'), fx('=MAX(A1:A15)-MIN(A1:A15)'), ver('m4-1')],
        ['Varianza muestral', fx('=VAR.S(rango)'), fx('=VAR.S(A1:A15)'), ver('m4-2')],
        ['Varianza poblacional', fx('=VAR.P(rango)'), fx('=VAR.P(A1:A15)'), ver('m4-2')],
        ['Desviación estándar muestral', fx('=DESVEST.M(rango)'), fx('=DESVEST.M(A1:A15)'), ver('m4-3')],
        ['Desviación estándar poblacional', fx('=DESVEST.P(rango)'), fx('=DESVEST.P(A1:A15)'), ver('m4-3')],
        ['Coeficiente de variación muestral', fx('=DESVEST.M(rango)/PROMEDIO(rango)'), fx('=DESVEST.M(A1:A15)/PROMEDIO(A1:A15)'), ver('m4-4')],
        ['Coeficiente de variación poblacional', fx('=DESVEST.P(rango)/PROMEDIO(rango)'), fx('=DESVEST.P(A1:A15)/PROMEDIO(A1:A15)'), ver('m4-4')],
        ['Rango intercuartílico', fx('=CUARTIL.INC(rango;3)-CUARTIL.INC(rango;1)'), fx('=CUARTIL.INC(A1:A15;3)-CUARTIL.INC(A1:A15;1)'), ver('m4-5')]
      ]),
      H('Posición'),
      TB(['Medida', 'Función en Excel', 'Ejemplo de uso', ''], [
        ['Percentil', fx('=PERCENTIL.INC(rango;k)'), fx('=PERCENTIL.INC(A1:A15;0.27)'), ver('m5-1')],
        ['Decil', fx('=PERCENTIL.INC(rango;k)'), fx('=PERCENTIL.INC(A1:A15;0.4)'), ver('m5-2')],
        ['Cuartil', fx('=CUARTIL.INC(rango;k)'), fx('=CUARTIL.INC(A1:A15;2)'), ver('m5-3')],
        ['k-ésimo valor más alto', fx('=K.ESIMO.MAYOR(rango;k)'), fx('=K.ESIMO.MAYOR(A1:A15;3)'), ver('m5-4')],
        ['k-ésimo valor más bajo', fx('=K.ESIMO.MENOR(rango;k)'), fx('=K.ESIMO.MENOR(A1:A15;4)'), ver('m5-4')]
      ]),
      T('<b>El argumento k cambia según la función.</b> En <code>PERCENTIL.INC</code> es un decimal entre 0 y 1 (percentil 27 → <code>0.27</code>; decil 4 → <code>0.4</code>). En <code>CUARTIL.INC</code> es el número de cuartil: 1, 2 o 3. En <code>K.ESIMO.MAYOR</code> y <code>K.ESIMO.MENOR</code> es la posición: 1 para el primero, 2 para el segundo…'),
      P('La media, la mediana, la moda y las medidas de posición usan la misma función para una muestra y para una población. Solo cambian la varianza y la desviación estándar (y, con ella, el coeficiente de variación).')
    ] },
  { t: 'Funciones por grupo (con SI)', lbl: 'Para qué sirve',
    when: 'Las mismas funciones, calculadas solo con las filas de un grupo. El rango se reemplaza por SI(valor_lógico;rango).',
    b: [
      P('<code>valor_lógico</code> es la condición que elige el grupo (<code>A2:A16="A"</code>) y <code>rango</code> son los valores (<code>B2:B16</code>).'),
      H('Tendencia central'),
      TB(['Medida', 'Función en Excel', 'Ejemplo de uso', ''], [
        ['Media', fx('=PROMEDIO(' + SI_ + ')'), fx('=PROMEDIO(' + SI_EJ + ')'), ver('m3-4')],
        ['Mediana', fx('=MEDIANA(' + SI_ + ')'), fx('=MEDIANA(' + SI_EJ + ')'), ver('m3-4')],
        ['Moda (una)', fx('=MODA.UNO(' + SI_ + ')'), fx('=MODA.UNO(' + SI_EJ + ')'), ver('m3-4')],
        ['Moda (todas)', fx('=MODA.VARIOS(' + SI_ + ')'), fx('=MODA.VARIOS(' + SI_EJ + ')'), ver('m3-4')]
      ]),
      H('Dispersión'),
      TB(['Medida', 'Función en Excel', 'Ejemplo de uso', ''], [
        ['Rango', fx('=MAX(' + SI_ + ')-MIN(' + SI_ + ')'), fx('=MAX(' + SI_EJ + ')-MIN(' + SI_EJ + ')'), ver('m4-6')],
        ['Varianza muestral', fx('=VAR.S(' + SI_ + ')'), fx('=VAR.S(' + SI_EJ + ')'), ver('m4-6')],
        ['Desviación estándar muestral', fx('=DESVEST.M(' + SI_ + ')'), fx('=DESVEST.M(' + SI_EJ + ')'), ver('m4-6')],
        ['Rango intercuartílico', fx('=CUARTIL.INC(' + SI_ + ';3)-CUARTIL.INC(' + SI_ + ';1)'), fx('=CUARTIL.INC(' + SI_EJ + ';3)-CUARTIL.INC(' + SI_EJ + ';1)'), ver('m4-6')]
      ]),
      P('Para la población, <code>VAR.S</code> y <code>DESVEST.M</code> se reemplazan por <code>VAR.P</code> y <code>DESVEST.P</code>.'),
      H('Posición'),
      TB(['Medida', 'Función en Excel', 'Ejemplo de uso', ''], [
        ['Percentil', fx('=PERCENTIL.INC(' + SI_ + ';k)'), fx('=PERCENTIL.INC(' + SI_EJ + ';0.27)'), ver('m5-7')],
        ['Decil', fx('=PERCENTIL.INC(' + SI_ + ';k)'), fx('=PERCENTIL.INC(' + SI_EJ + ';0.4)'), ver('m5-7')],
        ['Cuartil', fx('=CUARTIL.INC(' + SI_ + ';k)'), fx('=CUARTIL.INC(' + SI_EJ + ';2)'), ver('m5-7')],
        ['k-ésimo valor más alto', fx('=K.ESIMO.MAYOR(' + SI_ + ';k)'), fx('=K.ESIMO.MAYOR(' + SI_EJ + ';3)'), ver('m5-7')],
        ['k-ésimo valor más bajo', fx('=K.ESIMO.MENOR(' + SI_ + ';k)'), fx('=K.ESIMO.MENOR(' + SI_EJ + ';4)'), ver('m5-7')]
      ]),
      CSE
    ] },
  { t: 'Tablas dinámicas y gráficos', lbl: 'Para qué sirve',
    when: 'Las rutas de menú de las guías de tablas y gráficos (Unidad 1 AT1 y AT2, Unidad 2 AT1 y AT2). Estas guías no traen un resumen propio: la tabla reúne sus pasos.',
    b: [
      H('Tablas dinámicas'),
      TB(['Para…', 'Ruta en Excel', ''], [
        ['Crear la tabla dinámica', '<span class="ui">Insertar → Tabla dinámica → Hoja de cálculo nueva</span>', ver('m1-1')],
        ['Frecuencia absoluta', 'El campo en <span class="ui">Filas</span> y en <span class="ui">Valores</span> (Recuento)', ver('m1-1')],
        ['Frecuencia porcentual', 'El campo otra vez en <span class="ui">Valores</span> → <span class="ui">Configuración del campo → Mostrar datos como → % del total general</span>', ver('m1-2')],
        ['Ordenar categorías', 'Clic derecho en la etiqueta → <span class="ui">Mover</span>', ver('m1-3')],
        ['Frecuencias acumuladas', 'Columnas a la derecha de la tabla: ' + fx('=D4+B5') + ' copiada hacia abajo', ver('m1-4')],
        ['Intervalos de clase', 'Clic derecho en un valor → <span class="ui">Agrupar</span> (Comenzar en, Terminar en, Por)', ver('m1-6')],
        ['Tabla de doble entrada', 'Una variable en <span class="ui">Filas</span>, otra en <span class="ui">Columnas</span> y cualquier campo en <span class="ui">Valores</span> como Recuento', ver('m6-1')],
        ['Promedio o desviación estándar por grupo', 'Grupo en <span class="ui">Filas</span>, variable en <span class="ui">Valores</span> → <span class="ui">Configuración del campo → Resumir por → Promedio</span> o <span class="ui">Desvest</span>', ver('m7-2')],
        ['Coeficiente de variación por grupo', 'Columna a la derecha de la tabla: ' + fx('=C4/B4') + ' con formato de porcentaje', ver('m7-3')]
      ]),
      H('Gráficos'),
      TB(['Gráfico', 'Qué seleccionar', 'Ruta en Excel', ''], [
        ['Circular', 'La tabla completa, con encabezados', '<span class="ui">Insertar → Gráfico circular</span>', ver('m2-2')],
        ['Columnas', 'Solo los valores de la frecuencia', '<span class="ui">Insertar → Gráfico de columnas → Columnas agrupadas</span>; luego <span class="ui">Seleccionar datos</span> para las etiquetas del eje', ver('m2-3')],
        ['Líneas', 'Ambas columnas, con encabezados', '<span class="ui">Insertar → Gráfico de líneas → Línea con marcadores</span>', ver('m2-4')],
        ['Histograma', 'Solo la columna de datos, sin encabezado', '<span class="ui">Insertar → Insertar gráfico estadístico → Histograma</span>', ver('m2-5')],
        ['Boxplot', 'Solo los números, sin encabezado (una o varias columnas)', '<span class="ui">Insertar → gráficos estadísticos → Cajas y bigotes</span>', ver('m5-5')],
        ['Columnas agrupadas de dos variables', 'Una celda de la tabla de doble entrada', '<span class="ui">Insertar → columnas agrupadas</span>', ver('m6-3')]
      ])
    ] }
] }
];
