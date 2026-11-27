import { Router, type Response } from "express";
import type { Db } from "../db/types.js";
import { users } from "../db/schema/users.js";
import { createSession, SESSION_TTL_MS, validateSession } from "./session.js";

export interface AuthOptions {
  /** Production: `__Host-` cookie name and `Secure` flag. */
  secureCookies: boolean;
}

type UserRow = typeof users.$inferSelect;

function toUserResponse(user: UserRow) {
  return {
    id: user.id,
    accountType: user.accountType,
    name: user.name,
    email: user.email,
  };
}

export function createAuthRouter(db: Db, options: AuthOptions) {
  const router = Router();
  const cookieName = options.secureCookies ? "__Host-session" : "session";

  function setSessionCookie(res: Response, token: string) {
    res.cookie(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: options.secureCookies,
      path: "/",
      maxAge: SESSION_TTL_MS,
    });
  }

  router.post("/guest-login", async (req, res) => {
    try {
      const existingToken: unknown = req.cookies?.[cookieName];
      if (typeof existingToken === "string") {
        const session = await validateSession(db, existingToken);
        if (session) {
          if (session.renewed) setSessionCookie(res, existingToken);
          res.status(200).json({ user: toUserResponse(session.user) });
          return;
        }
      }

      const { guest, token } = await db.transaction(async (tx) => {
        const [guest] = await tx.insert(users).values({ accountType: "guest" }).returning();
        const { token } = await createSession(tx, guest.id);
        return { guest, token };
      });

      setSessionCookie(res, token);
      res.status(201).json({ user: toUserResponse(guest) });
    } catch (error) {
      console.error("guest-login failed", error);
      res.status(500).json({ error: "Could not start guest session" });
    }
  });

  return router;
}
