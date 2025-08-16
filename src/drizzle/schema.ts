import { pgTable, timestamp, text, serial } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const Feedback = pgTable("feedbacks", {
  email: text("email").primaryKey(),
  content: text("content").notNull(),
  createAt: timestamp("created_at").notNull().defaultNow(),
});
