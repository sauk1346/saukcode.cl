import { getDb } from './db/index.js';

export function getSections() {
  const db = getDb();
  const rows = db.$client.prepare(
    'SELECT DISTINCT section FROM topics WHERE section IS NOT NULL ORDER BY section'
  ).all();
  return rows.map(r => r.section);
}

export function getTopicsBySection(section) {
  const db = getDb();
  const topicRows = db.$client.prepare(
    'SELECT * FROM topics WHERE section = ? ORDER BY name'
  ).all(section);

  return topicRows.map(topic => ({
    ...topic,
    decks: db.$client.prepare(
      'SELECT id, number, (SELECT COUNT(*) FROM cards WHERE deck_id = decks.id) as cardCount FROM decks WHERE topic_id = ? ORDER BY number'
    ).all(topic.id),
  }));
}

export function getTopicsByCourseId(courseId) {
  const db = getDb();
  const topicRows = db.$client.prepare(
    'SELECT * FROM topics WHERE course_id = ? ORDER BY name'
  ).all(courseId);

  return topicRows.map(topic => ({
    ...topic,
    decks: db.$client.prepare(
      'SELECT id, number, (SELECT COUNT(*) FROM cards WHERE deck_id = decks.id) as cardCount FROM decks WHERE topic_id = ? ORDER BY number'
    ).all(topic.id),
  }));
}

export function getDeckByTopicAndNumber(topicSlug, deckNumber) {
  const db = getDb();
  const topic = db.$client.prepare(
    'SELECT * FROM topics WHERE slug = ?'
  ).get(topicSlug);
  if (!topic) return null;

  const deck = db.$client.prepare(
    'SELECT * FROM decks WHERE topic_id = ? AND number = ?'
  ).get(topic.id, deckNumber);
  if (!deck) return null;

  return { topic, deck };
}

export function getCardsByDeckId(deckId) {
  const db = getDb();
  return db.$client.prepare(
    'SELECT * FROM cards WHERE deck_id = ? ORDER BY position'
  ).all(deckId);
}

export function getAllTopicSlugs() {
  const db = getDb();
  return db.$client.prepare('SELECT slug FROM topics').all().map(r => r.slug);
}
