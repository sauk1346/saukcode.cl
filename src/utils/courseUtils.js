import { extractSlugsFromCourseData } from './contentUtils';

// Descubrimiento automático de cursos (puerto del courseUtils del sitio Next):
// un archivo de src/data/inacap cuenta como curso si su default export tiene courseCode.
const modules = import.meta.glob('../data/inacap/*.js', { eager: true });

const courseDataMap = {};
for (const [path, mod] of Object.entries(modules)) {
  if (mod.default?.courseCode) {
    const id = path.split('/').pop().replace(/\.js$/, '').toLowerCase();
    courseDataMap[id] = mod.default;
  }
}

export function getCourseData(courseId) {
  return courseDataMap[courseId.toLowerCase()];
}

export function getAllCourseIds() {
  return Object.keys(courseDataMap);
}

/**
 * Pares courseId/slug replicando el ruteo de Next: solo los slugs
 * registrados en la data del curso (los MDX huérfanos no se publican).
 */
export function getAllInacapLessonPaths() {
  const allParams = [];
  for (const [courseId, courseData] of Object.entries(courseDataMap)) {
    const slugs = extractSlugsFromCourseData(courseData);
    slugs.forEach((slug) => {
      allParams.push({ courseId, slug });
    });
  }
  return allParams;
}
