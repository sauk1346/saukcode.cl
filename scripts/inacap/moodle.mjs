// Navegación del Ambiente de Aprendizaje (Moodle, aai.inacap.cl), compartida por los extractores.
export const MOODLE = 'https://aai.inacap.cl';
// SSO del portal hacia Moodle (enlace "Ambiente de Aprendizaje" de la sección Académico)
const MOODLE_SSO =
  'https://intranet.inacap.cl/tportalvp/procesar_link.php?url=https://aai.inacap.cl/auth/saml2/login.php?wants=' +
  encodeURIComponent(`${MOODLE}/`) +
  '&idp=415c7f00f2f6c4ce2de2f0dab622eab0&passive=off';

// Moodle agrega el tipo del recurso como texto oculto ("Archivo", "URL"…) al final del nombre
const TIPOS = {
  modtype_resource: 'archivo',
  modtype_url: 'url',
  modtype_folder: 'carpeta',
  modtype_page: 'pagina',
  modtype_quiz: 'cuestionario',
  modtype_assign: 'tarea',
  modtype_forum: 'foro',
  modtype_label: 'etiqueta',
};

export async function entrarMoodle(page) {
  await page.goto(MOODLE_SSO, { waitUntil: 'networkidle' });
  if (!page.url().startsWith(MOODLE)) throw new Error(`El SSO a Moodle terminó en ${page.url()}`);
}

/** Cursos del bloque "Mis cursos" del área personal: el código va en la línea "2026/P AVFI01/V-IEI-…"
 *  (my/courses.php muestra la categoría en vez de esa línea). */
export async function listarCursos(page) {
  await page.goto(`${MOODLE}/my/`, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-region="course-content"]', { timeout: 20_000 });
  return page.$$eval('[data-region="course-content"]', (cards) =>
    cards.map((card) => {
      const link = card.querySelector('a[href*="/course/view.php"]');
      const texto = card.innerText;
      return {
        id: Number(new URL(link.href).searchParams.get('id')),
        nombre: texto.split('\n')[0].trim(),
        codigo: texto.match(/\d{4}\/\w+ ([A-Z0-9]{6})\//)?.[1] ?? null,
        url: link.href,
      };
    }),
  );
}

/** Secciones del curso (presentación, unidades) con sus recursos. */
export async function leerCurso(page, curso) {
  await page.goto(curso.url, { waitUntil: 'networkidle' });
  const secciones = await page.$$eval(
    'li.section.course-section',
    (els, TIPOS) =>
      els.map((s) => ({
        nombre: s.querySelector('.sectionname, h3')?.innerText.trim() ?? '',
        recursos: [...s.querySelectorAll('li.activity')]
          .map((m) => {
            const clase = [...m.classList].find((c) => c.startsWith('modtype_'));
            const nombre = m.querySelector('.instancename, .activityname');
            if (!nombre) return null; // etiquetas (texto suelto) sin nombre
            const limpio = nombre.cloneNode(true);
            limpio.querySelectorAll('.accesshide').forEach((e) => e.remove());
            return {
              tipo: TIPOS[clase] ?? clase?.replace('modtype_', ''),
              nombre: limpio.innerText.trim().replace(/\s+/g, ' '),
              url: m.querySelector('a[href*="/mod/"]')?.href ?? null,
            };
          })
          .filter(Boolean),
      })),
    TIPOS,
  );
  return { ...curso, secciones: secciones.filter((s) => s.nombre || s.recursos.length) };
}
