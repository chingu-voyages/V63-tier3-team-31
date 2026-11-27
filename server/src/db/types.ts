import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";

/** Any Drizzle Postgres database — node-postgres in production, PGlite in tests. */
export type Db = PgDatabase<PgQueryResultHKT>;
