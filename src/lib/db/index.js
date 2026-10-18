import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';

let db;

export function getDb() {
  if (!db) {
    const sqlite = new Database('./flashcards.db');
    sqlite.pragma('journal_mode = WAL');
    sqlite.pragma('foreign_keys = ON');
    db = drizzle(sqlite, { schema });
  }
  return db;
}
