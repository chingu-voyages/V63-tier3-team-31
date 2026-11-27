import { jest } from "@jest/globals";
import request from "supertest";
import { eq } from "drizzle-orm";
import { sessions } from "../db/schema/sessions.js";
import { users } from "../db/schema/users.js";
import { createSession } from "./session.js";
import { createApp } from "../app.js";
import { createTestDb } from "../test/createTestDb.js";

type TestDb = Awaited<ReturnType<typeof createTestDb>>;

let testDb: TestDb;

beforeEach(async () => {
  testDb = await createTestDb();
});

afterEach(async () => {
  await testDb.close();
});

function sessionCookie(res: request.Response, name = "session"): string | undefined {
  const cookies = ([] as string[]).concat(res.headers["set-cookie"] ?? []);
  return cookies.find((c) => c.startsWith(`${name}=`));
}

/** "session=abc; Path=/; HttpOnly" → "session=abc" */
function cookiePair(setCookie: string | undefined): string {
  return setCookie!.split(";")[0];
}

async function countRows() {
  return {
    users: (await testDb.db.select().from(users)).length,
    sessions: (await testDb.db.select().from(sessions)).length,
  };
}

describe("POST /api/auth/guest-login", () => {
  it("starts a new Guest when the browser has no session", async () => {
    const app = createApp(testDb.db);

    const res = await request(app).post("/api/auth/guest-login");

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      user: {
        id: expect.any(String),
        accountType: "guest",
        name: null,
        email: null,
      },
    });

    const cookie = sessionCookie(res);
    expect(cookie).toBeDefined();
    expect(cookie).toMatch(/HttpOnly/i);
    expect(cookie).toMatch(/SameSite=Lax/i);
    expect(cookie).toMatch(/Path=\//);
    expect(cookie).toMatch(/Max-Age=604800/);

    const [stored] = await testDb.db.select().from(sessions);
    expect(stored.userId).toBe(res.body.user.id);
  });

  it("resumes the same Guest when the browser already has a valid session", async () => {
    const browser = request.agent(createApp(testDb.db));

    const first = await browser.post("/api/auth/guest-login");
    const before = await countRows();
    const second = await browser.post("/api/auth/guest-login");

    expect(second.status).toBe(200);
    expect(second.body.user.id).toBe(first.body.user.id);
    expect(second.body.user.accountType).toBe("guest");
    expect(await countRows()).toEqual(before);
  });

  it.each([
    ["has expired", { expiresAt: new Date(Date.now() - 1000) }],
    ["was revoked", { revokedAt: new Date() }],
  ])("starts a new Guest when the browser's session %s", async (_label, change) => {
    const browser = request.agent(createApp(testDb.db));
    const first = await browser.post("/api/auth/guest-login");
    await testDb.db.update(sessions).set(change).where(eq(sessions.userId, first.body.user.id));

    const second = await browser.post("/api/auth/guest-login");

    expect(second.status).toBe(201);
    expect(second.body.user.id).not.toBe(first.body.user.id);
    expect(sessionCookie(second)).toBeDefined();
  });

  it("resumes a Registered Host without downgrading them to a Guest", async () => {
    const [host] = await testDb.db
      .insert(users)
      .values({ accountType: "registered", name: "Anna Smith", email: "anna@example.com" })
      .returning();
    const { token } = await createSession(testDb.db, host.id);

    const res = await request(createApp(testDb.db))
      .post("/api/auth/guest-login")
      .set("Cookie", `session=${token}`);

    expect(res.status).toBe(200);
    expect(res.body.user).toEqual({
      id: host.id,
      accountType: "registered",
      name: "Anna Smith",
      email: "anna@example.com",
    });
  });

  it("never stores the raw session token", async () => {
    const res = await request(createApp(testDb.db)).post("/api/auth/guest-login");
    const token = cookiePair(sessionCookie(res)).slice("session=".length);

    const stored = await testDb.db.select().from(sessions);

    expect(stored).toHaveLength(1);
    expect(JSON.stringify(stored)).not.toContain(token);
  });

  describe("7 days of inactivity", () => {
    const DAY = 24 * 60 * 60 * 1000;
    const start = new Date("2026-11-01T09:00:00Z").getTime();

    beforeEach(() => {
      // Fake only the clock; PGlite still needs real timers.
      jest.useFakeTimers({
        now: start,
        doNotFake: [
          "hrtime", "nextTick", "performance", "queueMicrotask",
          "requestAnimationFrame", "cancelAnimationFrame",
          "requestIdleCallback", "cancelIdleCallback",
          "setImmediate", "clearImmediate",
          "setInterval", "clearInterval", "setTimeout", "clearTimeout",
        ],
      });
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("keeps an active Guest signed in beyond 7 days", async () => {
      const browser = request.agent(createApp(testDb.db));
      const first = await browser.post("/api/auth/guest-login");

      jest.setSystemTime(start + 5 * DAY);
      const midway = await browser.post("/api/auth/guest-login");
      expect(sessionCookie(midway)).toMatch(/Max-Age=604800/);

      jest.setSystemTime(start + 11 * DAY);
      const later = await browser.post("/api/auth/guest-login");

      expect(later.status).toBe(200);
      expect(later.body.user.id).toBe(first.body.user.id);
    });

    it("ends the Session of a Guest inactive for more than 7 days", async () => {
      const browser = request.agent(createApp(testDb.db));
      const first = await browser.post("/api/auth/guest-login");

      jest.setSystemTime(start + 7 * DAY + 1000);
      const later = await browser
        .post("/api/auth/guest-login")
        .set("Cookie", cookiePair(sessionCookie(first)));

      expect(later.status).toBe(201);
      expect(later.body.user.id).not.toBe(first.body.user.id);
    });

    it("does not refresh a Session that was used within the last day", async () => {
      const browser = request.agent(createApp(testDb.db));
      await browser.post("/api/auth/guest-login");

      jest.setSystemTime(start + 12 * 60 * 60 * 1000);
      const resumed = await browser.post("/api/auth/guest-login");

      expect(resumed.status).toBe(200);
      expect(sessionCookie(resumed)).toBeUndefined();
    });
  });

  it("uses a __Host- prefixed, Secure cookie in production, and resumes from it", async () => {
    const app = createApp(testDb.db, { secureCookies: true });

    const res = await request(app).post("/api/auth/guest-login");
    const cookie = sessionCookie(res, "__Host-session");

    expect(cookie).toBeDefined();
    expect(cookie).toMatch(/; Secure/i);
    expect(cookie).not.toMatch(/Domain=/i);

    // supertest speaks plain HTTP, so send the Secure cookie by hand.
    const resumed = await request(app).post("/api/auth/guest-login").set("Cookie", cookiePair(cookie));
    expect(resumed.status).toBe(200);
    expect(resumed.body.user.id).toBe(res.body.user.id);
  });

  it("reports a JSON error when the Guest cannot be created", async () => {
    const app = createApp(testDb.db);
    await testDb.close(); // database unavailable

    const res = await request(app).post("/api/auth/guest-login");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Could not start guest session" });
    expect(sessionCookie(res)).toBeUndefined();
  });

  it("starts a new Guest when the session cookie is garbage", async () => {
    const res = await request(createApp(testDb.db))
      .post("/api/auth/guest-login")
      .set("Cookie", "session=not-a-real-token");

    expect(res.status).toBe(201);
    expect(res.body.user.accountType).toBe("guest");
  });
});
