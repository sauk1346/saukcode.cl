// Prepara para publicar las páginas independientes del ramo (laboratorio y
// banco de preguntas): apunta sus recursos a public/labs/ti3v61/ y marca el
// contenido para el buscador. No cambia el contenido.
const ASSETS = '/labs/ti3v61/';

export function renderLab(source) {
  return source
    // imágenes: en atributos del HTML y en las cadenas que arma su JavaScript
    .replaceAll('"img/', `"${ASSETS}img/`)
    .replaceAll("'img/", `'${ASSETS}img/`)
    .replace('src="saukcode.js"', `src="${ASSETS}saukcode.js"`)
    .replace('href="saukcode.css"', `href="${ASSETS}saukcode.css"`)
    .replace(/<main\b/, '<main data-pagefind-body');
}
