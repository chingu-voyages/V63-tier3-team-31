import { createHash, randomBytes } from "node:crypto";
import type { Db } from "../db/types.js";
import { and, eq, gt, isNull } from "drizzle-orm";
import { sessions } from "../db/schema/sessions.js";
import { users } from "../db/schema/users.js";

const DAY_MS = 24 * 60 * 60 * 1000;
export const SESSION_TTL_MS = 7 * DAY_MS;
/** Renew at most about once a day: only when less than this much time is left. */
const RENEW_WHEN_REMAINING_BELOW_MS = SESSION_TTL_MS - DAY_MS;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Starts a Session for a Host. Returns the raw token — only its hash is stored. */
export async function createSession(db: Db, userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.insert(sessions).values({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
  });

  return { token, expiresAt };
}

/**
 * Finds the Host behind a token, if its Session is still valid (unexpired, not revoked).
 * Using a Session slides its expiry to 7 days from now, so it only ends after 7 days of
 * inactivity. `renewed: true` tells the caller to re-send the cookie with a fresh Max-Age.
 */
export async function validateSession(db: Db, token: string) {
  const now = Date.now();

  const [row] = await db
    .select({ sessionId: sessions.id, expiresAt: sessions.expiresAt, user: users })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(
      and(
        eq(sessions.tokenHash, hashToken(token)),
        gt(sessions.expiresAt, new Date(now)),
        isNull(sessions.revokedAt),
      ),
    )
    .limit(1);

  if (!row) return null;

  if (row.expiresAt.getTime() - now >= RENEW_WHEN_REMAINING_BELOW_MS) {
    return { user: row.user, renewed: false };
  }

  await db
    .update(sessions)
    .set({ expiresAt: new Date(now + SESSION_TTL_MS) })
    .where(eq(sessions.id, row.sessionId));

  return { user: row.user, renewed: true };
}
