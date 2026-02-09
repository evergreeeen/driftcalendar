import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'calendar.db');

const globalForDb = globalThis as unknown as { _db: Database.Database };

function getDb(): Database.Database {
  if (!globalForDb._db) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT NOT NULL,
        description TEXT,
        location    TEXT,
        start_date  TEXT NOT NULL,
        end_date    TEXT NOT NULL,
        url         TEXT,
        created_at  TEXT DEFAULT (datetime('now')),
        updated_at  TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS submissions (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        title           TEXT NOT NULL,
        description     TEXT,
        location        TEXT,
        start_date      TEXT NOT NULL,
        end_date        TEXT NOT NULL,
        url             TEXT,
        submitter_name  TEXT NOT NULL,
        submitter_email TEXT NOT NULL,
        status          TEXT DEFAULT 'pending',
        created_at      TEXT DEFAULT (datetime('now'))
      );
    `);

    globalForDb._db = db;
  }
  return globalForDb._db;
}

export default getDb;
