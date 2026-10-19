// Sincronización de fechas de evaluaciones con calendar25.js (fuente de
// verdad). Cada evaluación busca su evento "[CODE] Evaluación NN" (o el
// calendarRef explícito, p. ej. 'Examen'); si existe, la fecha del
// calendario manda y el día abreviado se calcula solo. Las evaluaciones
// sin evento (promedio de controles) conservan su fecha manual. Toda
// divergencia manual↔calendario se avisa en el build.
import calendar25 from '../data/inacap/calendar25.js';

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function formatear(fechaIso) {
  const [y, m, d] = fechaIso.split('-').map(Number);
  const f = new Date(y, m - 1, d);
  return `${DIAS[f.getDay()]} ${String(d).padStart(2, '0')}, ${MESES[m - 1]} ${y}`;
}

export function resolveEvalDates(courseCode, evaluationsData = []) {
  const code = courseCode.toUpperCase();
  return evaluationsData.map((ev) => {
    const ref =
      ev.calendarRef ??
      (typeof ev.description?.text === 'string' && /^Examen/.test(ev.description.text)
        ? 'Examen'
        : `Evaluación ${String(ev.evaluationNumber).padStart(2, '0')}`);
    const evento = calendar25.find((e) => e.titulo === `[${code}] ${ref}`);
    if (!evento) return ev; // sin evento: la fecha manual queda (promedio de controles)
    const date = formatear(evento.fecha);
    if (ev.date && ev.date !== date) {
      console.warn(
        `⚠ [${code}] Evaluación ${ev.evaluationNumber}: fecha manual "${ev.date}" ≠ calendario "${date}" — manda el calendario`
      );
    }
    return { ...ev, date };
  });
}
