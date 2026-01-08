import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const attendees = sqliteTable('attendees', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  source: text('source').notNull().default('wedding_hero'),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  createdAt: text('created_at').notNull(),
});