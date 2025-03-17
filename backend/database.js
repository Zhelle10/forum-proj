
import Database from "better-sqlite3";
export const db = new Database("../forum.db");

console.log('Database initialized successfully');
