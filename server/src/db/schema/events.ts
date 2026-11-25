import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  text,
  integer,
  numeric,
  timestamp,
  index,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { users } from "./users.js";

export const eventTypeEnum = pgEnum("event_type", [
  "physical",
  "virtual",
]);

export const eventStatusEnum = pgEnum("event_status", [
  "upcoming",
  "ongoing",
  "completed",
  "cancelled",
]);

export const events = pgTable(
  "events",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 255 }).notNull(),

    description: text("description").notNull(),

    venue: varchar("venue", { length: 255 }),

    eventType: eventTypeEnum("event_type").notNull(),

    startAt: timestamp("start_at", { withTimezone: true }).notNull(),

    endAt: timestamp("end_at", { withTimezone: true }).notNull(),

    expectedAttendance: integer("expected_attendance").notNull(),

    ticketPrice: numeric("ticket_price", {
      precision: 10,
      scale: 2,
    }).notNull(),

    currency: varchar("currency", { length: 3 }).notNull(),

    status: eventStatusEnum("status")
      .notNull()
      .default("upcoming"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("events_user_id_idx").on(table.userId),

    check("events_valid_dates", sql`${table.endAt} > ${table.startAt}`),

    check(
      "events_expected_attendance_nonnegative",
      sql`${table.expectedAttendance} >= 0`,
    ),

    check("events_ticket_price_nonnegative", sql`${table.ticketPrice} >= 0`),
  ],
);