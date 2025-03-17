import { db } from "../database.js"; // Correct relative path

export const getThreads = (req, res) => { //To get all the threads from the database
  try {
    const rows = db
      .prepare(
        `
        SELECT 
          id, title, content, username, likes,
          created_at,
          updated_at,
          (SELECT COUNT(*) FROM comments WHERE thread_id = threads.id) as comment_count
        FROM threads 
        ORDER BY created_at DESC` //Sorting the threads according from the newest to the oldest
      )                           
      .all();

    if (rows.length === 0) {       // If no threads registered it will return to an empty array.
      return res.json([]);
    }

    res.json(rows);                //If there is an error this will message will appear.
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

export const getThread = (req, res) => {    // To get the threads by ID na pinasa sa request (req.params)
  const { id } = req.params;
  try {
    const thread = db
      .prepare(
        `
        SELECT 
          id, title, content, username, likes,
          created_at,
          updated_at,
          (SELECT COUNT(*) FROM comments WHERE thread_id = threads.id) as comment_count
        FROM threads 
        WHERE id = ?`
      )
      .get(id);

    if (!thread) {                 //If the thread is not found using the id
      return res.status(404).json({
        error: "Thread not found",
        message: "The requested thread does not exist",
      });
    }

    res.json(thread);               //If there is an error this will message will appear.
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

export const createThread = (req, res) => {                 //To create a new thread
  const { title, content, username } = req.body;            

  if (!title || !content || !username) {               //If the user didnot enter the required fields like title, content and username
    return res.status(400).json({                        
      error: "Missing required fields",
      message: "Title, content, and username are required.",
    });
  }

  try {                                                                           // I don't know this part
    const stmt = db.prepare(                                                      // Ini-insert ang bagong thread at ibinabalik ang ID nito kasama ang title, content, at username.
      "INSERT INTO threads (title, content, username) VALUES (?, ?, ?)"     
    );
    const result = stmt.run(title, content, username);
    res
      .status(201)
      .json({ id: result.lastInsertRowid, title, content, username });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

export const updateThread = (req, res) => {           //if the user is not entering title OR content then it will return an error
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: "Missing required fields",
      message: "Title and content are required.",
    });
  }

  try {                                               //updating the thread to database and return with new data or updated data.
    const thread = db.prepare("SELECT * FROM threads WHERE id = ?").get(id);
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    // Update the thread
    db.prepare(
      `
      UPDATE threads 
      SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `
    ).run(title, content, id);

    // Fetch and return the updated thread
    const updatedThread = db
      .prepare(
        `
      SELECT id, title, content, username, likes, created_at, updated_at,
      (SELECT COUNT(*) FROM comments WHERE thread_id = threads.id) as comment_count
      FROM threads WHERE id = ?
    `
      )
      .get(id);

    res.json(updatedThread);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

export const deleteThread = (req, res) => {
  const { id } = req.params;

  try {
    // First check if thread exists
    const thread = db.prepare("SELECT id FROM threads WHERE id = ?").get(id);
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    // Delete comments first
    db.prepare("DELETE FROM comments WHERE thread_id = ?").run(id);

    // Then delete the thread
    const stmt = db.prepare("DELETE FROM threads WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json({
      message: "Thread deleted successfully",
      id: parseInt(id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

export const likeThread = (req, res) => {                            //I don't know this part
  const { id } = req.params; 

  try {
    const stmt = db.prepare(
      "UPDATE threads SET likes = likes + 1 WHERE id = ? RETURNING likes"
    );
    const result = stmt.get(id);
    res.json({ likes: result.likes });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};
