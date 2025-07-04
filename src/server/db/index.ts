import { drizzle } from "drizzle-orm/singlestore";
import { createPool, type Pool } from "mysql2";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined
};

const conn = 
  globalForDb.conn ??
  createPool({
    host: env.SINGLESTORE_HOST as string,
    port: parseInt(env.SINGLESTORE_PORT as string),
    user: env.SINGLESTORE_USER as string,
    password: env.SINGLESTORE_PASS as string,
    database: env.SINGLESTORE_DB_NAME as string,
    ssl: {},
    maxIdle: 0
})


if (env.NODE_ENV !== "production") globalForDb.conn = conn;

conn.addListener("error", (err) => {
  console.error("MySQL error: ", err);
})

export const db = drizzle(conn, { schema });
