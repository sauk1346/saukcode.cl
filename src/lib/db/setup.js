import Database from 'better-sqlite3';

const sqlite = new Database('./flashcards.db');
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    section TEXT,
    course_id TEXT,
    layout TEXT NOT NULL DEFAULT 'default'
  );

  CREATE TABLE IF NOT EXISTS decks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    number INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deck_id INTEGER NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    position INTEGER NOT NULL
  );
`);

console.log('DB tables created.');
sqlite.close();
