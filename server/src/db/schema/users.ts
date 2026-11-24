import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const accountTypeEnum = pgEnum("account_type", [
  "guest",
  "registered",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 100 }),

  email: varchar("email", { length: 255 }).unique(),

  accountType: accountTypeEnum("account_type")
    .notNull()
    .default("guest"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});