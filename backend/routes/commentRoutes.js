import { Router } from "express";
import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";

const router = Router();

router.get("/by-threadId/:id", getComments);      //  postman GET http://localhost:5000/comments/by-threadId/6, then the comment_id number
router.post("", createComment); // Create a new comment
router.delete("/:id", deleteComment); // Delete a comment by ID
router.put("/:id", updateComment); // Update a comment by ID

export default router;
