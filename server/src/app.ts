import express from "express";
import cookieParser from "cookie-parser";
import type { Db } from "./db/types.js";
import { createAuthRouter, type AuthOptions } from "./auth/routes.js";

export function createApp(db: Db, options: AuthOptions = { secureCookies: false }) {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.get("/api/hello", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", createAuthRouter(db, options));

  return app;
}
