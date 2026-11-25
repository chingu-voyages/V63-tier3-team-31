import {
    pgTable,
    pgEnum,
    uuid,
    timestamp,
    index,
    text,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";
import { events } from "./events.js";
import { attendees } from "./attendees.js";

export const activityTypeEnum = pgEnum("activity_type", [
    "event_created",
    "event_status_changed",
    "attendee_added",
    "attendee_checked_in",
    "check_in_reversed",
]);

export const activityLogs = pgTable(
    "activity_logs",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        eventId: uuid("event_id")
            .references(() => events.id, { onDelete: "set null" }),

        attendeeId: uuid("attendee_id")
            .references(() => attendees.id, { onDelete: "set null" }),

        actionType: activityTypeEnum("action_type").notNull(),

        createdAt: timestamp("created_at", { withTimezone: true })
            .notNull()
            .defaultNow(),

        message: text("message").notNull(),
    },
    (table) => [
        index("activity_logs_user_created_idx").on(
            table.userId,
            table.createdAt,
        ),
    ],
);