
  /*import { db } from "../database.js";

// Function to reset the database (useful for development)
export const resetDatabase = () => {
  db.exec(`
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS threads;
    
    CREATE TABLE threads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      username TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      thread_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      username TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (thread_id) REFERENCES threads (id) ON DELETE CASCADE
    );

    CREATE TRIGGER IF NOT EXISTS update_thread_timestamp 
    AFTER UPDATE ON threads
    BEGIN
      UPDATE threads SET updated_at = CURRENT_TIMESTAMP
      WHERE id = NEW.id;
    END;
  `);
  
  console.log('Database reset completed');
};

// Add some test data if needed
export const addTestData = () => {
  const insertThread = db.prepare(
    'INSERT INTO threads (title, content, username) VALUES (?, ?, ?)'
  );

  insertThread.run(
    'Welcome to the Forum',
    'This is our first thread!',
    'admin'
  );

  console.log('Test data added');
};

// Uncomment to run:
// resetDatabase();
// addTestData(); */

