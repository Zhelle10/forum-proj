import { db } from "../database.js";

export function getComments(req, res) {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid thread ID",
      message: "Thread ID must be a number.",
    });
  }

  try {
    const rows = db
      .prepare("SELECT * FROM comments WHERE thread_id = ?")
      .all(id);
    res.json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
}

export function createComment(req, res) {
  const { thread_id, content, username } = req.body;

  if (!thread_id || !content || !username) {
    return res.status(400).json({
      error: "Missing required fields",
      message: "Thread ID, content, and username are required.",
    });
  }

  if (isNaN(thread_id)) {
    return res.status(400).json({
      error: "Invalid thread ID",
      message: "Thread ID must be a number.",
    });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO comments (thread_id, content, username) VALUES (?, ?, ?)"
    );
    const result = stmt.run(thread_id, content, username);
    res
      .status(201)
      .json({ id: result.lastInsertRowid, thread_id, content, username });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
}

export const updateComment = (req, res) => {
  const { id } = req.params;

  console.log("BODY:", req.body);
  const { content } = req.body; // New comment text 

  try {
    // Check if the comment exists
    const comment = db.prepare("SELECT id FROM comments WHERE id = ?").get(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Update the comment
    const stmt = db.prepare("UPDATE comments SET content = ? WHERE id = ?");
    const result = stmt.run(content, id);

    if (result.changes === 0) {
      return res.status(400).json({ error: "Comment update failed" });
    }

    res.json({
      message: "Comment updated successfully",
      id: parseInt(id),
      content,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};

export const deleteComment = (req, res) => {
  const { id } = req.params;

  try {
    // Check if the comment exists
    const comment = db.prepare("SELECT id FROM comments WHERE id = ?").get(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Delete the comment
    const stmt = db.prepare("DELETE FROM comments WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({
      message: "Comment deleted successfully",
      id: parseInt(id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
};
