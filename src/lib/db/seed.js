import Database from 'better-sqlite3';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import yaml from 'js-yaml';

const DECK_LIMIT = 25;
const DATA_DIR = './src/data/flashcards';

const sqlite = new Database('./flashcards.db');
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

function getAllYamlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...getAllYamlFiles(fullPath));
    } else if (extname(entry) === '.yaml' || extname(entry) === '.yml') {
      files.push(fullPath);
    }
  }
  return files;
}

function seedFile(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const data = yaml.load(raw);

  const { topic, slug, courseId, layout = 'default', cards } = data;

  // Los mazos solo se publican dentro de un ramo (/inacap/<ramo>/flashcards/…): sin courseId no tendrían página
  if (!topic || !slug || !courseId || !cards?.length) {
    console.warn(`Skipping ${filePath}: missing topic, slug, courseId, or cards`);
    return;
  }

  // Upsert topic
  sqlite.prepare(`
    INSERT INTO topics (slug, name, course_id, layout)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      name = excluded.name,
      course_id = excluded.course_id,
      layout = excluded.layout
  `).run(slug, topic, courseId, layout);

  const topicRow = sqlite.prepare('SELECT id FROM topics WHERE slug = ?').get(slug);

  // Delete existing decks/cards for this topic (re-seed limpio)
  sqlite.prepare('DELETE FROM decks WHERE topic_id = ?').run(topicRow.id);

  // Distribuir cartas en mazos de DECK_LIMIT
  for (let i = 0; i < cards.length; i += DECK_LIMIT) {
    const chunk = cards.slice(i, i + DECK_LIMIT);
    const deckNumber = Math.floor(i / DECK_LIMIT) + 1;

    const deckResult = sqlite.prepare(
      'INSERT INTO decks (topic_id, number) VALUES (?, ?)'
    ).run(topicRow.id, deckNumber);

    for (let j = 0; j < chunk.length; j++) {
      const card = chunk[j];
      sqlite.prepare(
        'INSERT INTO cards (deck_id, front, back, position) VALUES (?, ?, ?, ?)'
      ).run(deckResult.lastInsertRowid, card.front.trim(), card.back.trim(), j + 1);
    }
  }

  const totalDecks = Math.ceil(cards.length / DECK_LIMIT);
  console.log(`✓ ${topic} (${cards.length} cartas → ${totalDecks} mazos)`);
}

const files = getAllYamlFiles(DATA_DIR);
// La base se reconstruye desde los YAML: un mazo borrado o renombrado no debe sobrevivir en flashcards.db
sqlite.prepare('DELETE FROM topics').run();
if (files.length === 0) {
  console.log('No YAML files found in', DATA_DIR);
} else {
  for (const file of files) {
    seedFile(file);
  }
  console.log(`\nSeed completado: ${files.length} archivo(s) procesado(s).`);
}

sqlite.close();
