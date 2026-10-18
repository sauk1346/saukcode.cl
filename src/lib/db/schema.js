import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const topics = sqliteTable('topics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  section: text('section'),
  courseId: text('course_id'),
  layout: text('layout').notNull().default('default'),
});

export const decks = sqliteTable('decks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  topicId: integer('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
  number: integer('number').notNull(),
});

export const cards = sqliteTable('cards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  deckId: integer('deck_id').notNull().references(() => decks.id, { onDelete: 'cascade' }),
  front: text('front').notNull(),
  back: text('back').notNull(),
  position: integer('position').notNull(),
});
