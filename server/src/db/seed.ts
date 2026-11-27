import "dotenv/config";
import { db, pool } from "./index.js";
import { users } from "./schema/users.js";
import { events } from "./schema/events.js";
import { attendees } from "./schema/attendees.js";
import { activityLogs } from "./schema/activityLogs.js";
import { sessions } from "./schema/sessions.js";
import { createHash } from "node:crypto";

import { inArray } from "drizzle-orm";

const ids = {
    user: "10000000-0000-4000-8000-000000000001",
    guest: "10000000-0000-4000-8000-000000000002",

    upcomingEvent: "20000000-0000-4000-8000-000000000001",
    ongoingEvent: "20000000-0000-4000-8000-000000000002",
    completedEvent: "20000000-0000-4000-8000-000000000003",

    attendee1: "30000000-0000-4000-8000-000000000001",
    attendee2: "30000000-0000-4000-8000-000000000002",
    attendee3: "30000000-0000-4000-8000-000000000003",

    activity1: "40000000-0000-4000-8000-000000000001",
    activity2: "40000000-0000-4000-8000-000000000002",
    activity3: "40000000-0000-4000-8000-000000000003",

    session: "50000000-0000-4000-8000-000000000001",
};

const daysFromNow = (days: number) =>
    new Date(Date.now() + days * 24 * 60 * 60 * 1000);

async function seed() {
    console.log("Seeding database...");

    await db.transaction(async (tx) => {
        // 1. USERS
        await tx.insert(users).values([
            {
                id: ids.user,
                name: "Anna Smith",
                email: "anna@example.com",
                accountType: "registered",
            },
            {
                id: ids.guest,
                name: null,
                email: null,
                accountType: "guest",
            },
        ]).onConflictDoNothing();

        // 2. EVENTS
        await tx.insert(events).values([
            {
                id: ids.upcomingEvent,
                userId: ids.user,
                name: "Tech Conference 2027",
                description: "A conference about web development.",
                venue: "Convention Center",
                eventType: "physical",
                startAt: daysFromNow(7),
                endAt: daysFromNow(7.25),
                expectedAttendance: 150,
                ticketPrice: "25.00",
                currency: "EUR",
                status: "upcoming",
            },
            {
                id: ids.ongoingEvent,
                userId: ids.user,
                name: "Web Development Workshop",
                description: "An interactive programming workshop.",
                venue: "Tech Hub",
                eventType: "physical",
                startAt: daysFromNow(-0.05),
                endAt: daysFromNow(0.1),
                expectedAttendance: 30,
                ticketPrice: "0.00",
                currency: "EUR",
                status: "ongoing",
            },
            {
                id: ids.completedEvent,
                userId: ids.guest,
                name: "Online Design Webinar",
                description: "An introduction to UI and UX principles.",
                venue: null,
                eventType: "virtual",
                startAt: daysFromNow(-7),
                endAt: daysFromNow(-6.9),
                expectedAttendance: 50,
                ticketPrice: "10.00",
                currency: "EUR",
                status: "completed",
            },
        ]).onConflictDoNothing();

        // 3. ATTENDEES
        await tx.insert(attendees).values([
            {
                id: ids.attendee1,
                eventId: ids.ongoingEvent,
                name: "John Brown",
                email: "john@example.com",
                registrationId: "REG001",
                checkedIn: true,
                checkedInAt: new Date(),
            },
            {
                id: ids.attendee2,
                eventId: ids.ongoingEvent,
                name: "Sarah Miller",
                email: "sarah@example.com",
                registrationId: "REG002",
                checkedIn: false,
                checkedInAt: null,
            },
            {
                id: ids.attendee3,
                eventId: ids.upcomingEvent,
                name: "Emma Wilson",
                email: "emma@example.com",
                registrationId: "REG003",
                checkedIn: false,
                checkedInAt: null,
            },
        ]).onConflictDoNothing();

        // 4. RECENT ACTIVITIES
        await tx.insert(activityLogs).values([
            {
                id: ids.activity1,
                userId: ids.user,
                eventId: ids.upcomingEvent,
                actionType: "event_created",
                message: "Tech Conference 2027 was created.",
            },
            {
                id: ids.activity2,
                userId: ids.user,
                eventId: ids.ongoingEvent,
                attendeeId: ids.attendee2,
                actionType: "attendee_added",
                message: "Sarah Miller was added to Web Development Workshop.",
            },
            {
                id: ids.activity3,
                userId: ids.user,
                eventId: ids.ongoingEvent,
                attendeeId: ids.attendee1,
                actionType: "attendee_checked_in",
                message: "John Brown checked in to Web Development Workshop.",
            },
        ]).onConflictDoNothing();

        // 5. GUEST SESSION
        const mockSessionToken = "eventflow-development-guest-session";

        const tokenHash = createHash("sha256")
            .update(mockSessionToken)
            .digest("hex");

        await tx.insert(sessions)
            .values({
                id: ids.session,
                userId: ids.guest,
                tokenHash,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            })
            .onConflictDoNothing();
    });

    console.log("Database seeded successfully!");
}

async function clearSeedData() {
    await db.transaction(async (tx) => {
        await tx.delete(activityLogs).where(
            inArray(activityLogs.id, [
                ids.activity1,
                ids.activity2,
                ids.activity3,
            ]),
        );

        await tx.delete(attendees).where(
            inArray(attendees.id, [
                ids.attendee1,
                ids.attendee2,
                ids.attendee3,
            ]),
        );

        await tx.delete(sessions).where(
            inArray(sessions.id, [ids.session]),
        );

        await tx.delete(events).where(
            inArray(events.id, [
                ids.upcomingEvent,
                ids.ongoingEvent,
                ids.completedEvent,
            ]),
        );

        await tx.delete(users).where(
            inArray(users.id, [ids.user, ids.guest]),
        );
    });

    console.log("Seed data deleted successfully!");
}

async function main() {
    try {
        const command = process.argv[2];

        if (command === "clear") {
            await clearSeedData();
        } else if (command === "seed") {
            await seed();
        } else {
            throw new Error("Expected 'seed' or 'clear' argument");
        }
    } catch (error) {
        console.error("Database operation failed:", error);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

void main();