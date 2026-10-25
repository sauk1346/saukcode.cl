// Guardia de mazos huérfanos: los mazos viven como enlaces curados en
// src/data/inacap/*.js (no hay pestaña que los liste). Si un mazo de la
// base no está enlazado desde ningún dato, esta guardia lo avisa en el
// build para que no quede inalcanzable.
import { readFileSync, readdirSync } from 'node:fs';
import { getTopicsByCourseId } from '../src/lib/flashcards.js';
import { getDb } from '../src/lib/db/index.js';

const dataDir = 'src/data/inacap';
const dataBlob = readdirSync(dataDir)
  .filter((f) => f.endsWith('.js'))
  .map((f) => readFileSync(`${dataDir}/${f}`, 'utf8'))
  .join('\n');

const courseIds = readdirSync(dataDir)
  .filter((f) => f.endsWith('.js'))
  .map((f) => f.replace('.js', ''));

const orphans = [];
for (const courseId of courseIds) {
  let topics = [];
  try {
    topics = getTopicsByCourseId(courseId);
  } catch {
    continue;
  }
  for (const topic of topics) {
    for (const deck of topic.decks) {
      const ref = `flashcards/${topic.slug}/${deck.number}`;
      if (!dataBlob.includes(ref)) {
        orphans.push(`${courseId} → ${topic.name} (mazo ${deck.number}): falta enlazar "${ref}"`);
      }
    }
  }
}

// Mazos cuyo courseId no es un ramo: no se genera su página
const known = new Set(courseIds);
for (const { name, course_id } of getDb().$client.prepare('SELECT name, course_id FROM topics').all()) {
  if (!known.has(course_id)) orphans.push(`${name}: courseId "${course_id}" no corresponde a ningún ramo de src/data/inacap`);
}

if (orphans.length) {
  console.warn('\n⚠ MAZOS HUÉRFANOS (sin enlace en los datos del ramo):');
  for (const o of orphans) console.warn('  - ' + o);
  console.warn('  Agrega el enlace en la clase o guía de evaluación correspondiente.\n');
} else {
  console.log('✓ Mazos de flashcards: todos enlazados desde los datos.');
}
