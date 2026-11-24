import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  index,
  uniqueIndex,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { events } from "./events.js";

export const attendees = pgTable(
  "attendees",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 100 }).notNull(),

    email: varchar("email", { length: 255 }),

    registrationId: varchar("registration_id", { length: 100 })
      .notNull(),

    registeredAt: timestamp("registered_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    checkedIn: boolean("checked_in")
      .notNull()
      .default(false),

    checkedInAt: timestamp("checked_in_at", { withTimezone: true }),
  },
  (table) => [
    index("attendees_event_id_idx").on(table.eventId),

    uniqueIndex("attendees_event_registration_id_idx").on(
      table.eventId,
      table.registrationId,
    ),

    check(
      "attendees_check_in_consistency",
      sql`${table.checkedIn} = (${table.checkedInAt} IS NOT NULL)`,
    ),
  ],
);