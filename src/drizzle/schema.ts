import { timestamp } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable, integer } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: integer("id").primaryKey(),
  name: text("text").notNull(),
  email: text("email").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
