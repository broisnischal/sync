import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./packages/db/drizzle",
  schema: "./packages/db/src/schema/*.schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
  casing: "snake_case",
  introspect: {
    casing: "camel",
  },
  migrations: {
    schema: "public",
    table: "__drizzle_migrations",
    prefix: "unix",
  },
  entities: {
    roles: true,
  },
});
