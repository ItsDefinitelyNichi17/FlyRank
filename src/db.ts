import Database from "better-sqlite3";

//this run where your path on the terminal currently
const db: Database.Database = new Database('task.db');

if (!db) throw new Error("Internal Error from better-sqlite3 Database instance");

export default db;
