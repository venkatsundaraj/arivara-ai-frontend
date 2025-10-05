import {
  pgTableCreator,
  serial,
  text,
  timestamp,
  pgTable,
  boolean,
  integer,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";

export const createTableForTasks = pgTableCreator((name) => `arivara_${name}`);

export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
});

export type TaskSchema = typeof tasks.$inferSelect;
