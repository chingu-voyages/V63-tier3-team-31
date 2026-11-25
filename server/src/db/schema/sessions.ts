import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  tokenHash: varchar("token_hash", { length: 255 })
    .notNull()
    .unique(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  expiresAt: timestamp("expires_at", { withTimezone: true })
    .notNull(),

  revokedAt: timestamp("revoked_at", { withTimezone: true }),
});