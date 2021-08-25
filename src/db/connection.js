import pg from "pg";

const { Pool } = pg;

console.log();

const onHeroku = process.env.NODE_ENV === "production";
/* const sslConfig = onHeroku
  ? {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {};
const db = new Pool({
  ...sslConfig,
  connectionString:process.env.DATABASE_URL,
}); */
const db = new Pool({
	ssl: {
		rejectUnauthorized: false,
	},
	connectionString:
		process.env.NODE_ENV !== "development"
			? process.env.DATABASE_URL
			: process.env.DATABASE_URL_DEV,
});
export default db;
