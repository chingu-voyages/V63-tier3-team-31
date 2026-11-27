import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";

/**
 * A fresh in-memory Postgres with the real migrations applied.
 * Each call returns an isolated database.
 */
export async function createTestDb() {
  const client = new PGlite();
  const db = drizzle(client);
  await migrate(db, {
    migrationsFolder: path.resolve(process.cwd(), "drizzle"),
  });
  return {
    db,
    close: async () => {
      if (!client.closed) await client.close();
    },
  };
}
