import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const database_url = process.env.DATABASE_URL;

if (!database_url) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export default defineConfig({
  schema: "./src/db/schema/*.ts",
  out: "./drizzle",
  verbose: true,
  dialect: "postgresql",
  dbCredentials: {
    url: database_url,
  }
}); 