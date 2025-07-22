import "dotenv/config";
// import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/_.schema.js";

export type DB = typeof db;
export * as schema from "./schema/_.schema.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({
  client: pool,
  schema,
});
