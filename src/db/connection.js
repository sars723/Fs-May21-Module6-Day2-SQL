import pg from "pg";

const { Pool } = pg;

console.log();

const onHeroku = process.env.NODE_ENV === "production";
const sslConfig = onHeroku
  ? {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {};
const db = new Pool({
  ...sslConfig,
  connectionString:process.env.DATABASE_URL,
});

export default db;
