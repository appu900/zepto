import { Pool } from "pg";
import { DB_URL } from "./src/config/index";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function runMigration() {
  try {
    console.log("migrating stared");
    const pool = new Pool({
      connectionString: DB_URL,
    });
    const db = drizzle(pool);
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("migration completed");
  } catch (error) {
    console.log("Migration Error", error);
  }
}

runMigration();
