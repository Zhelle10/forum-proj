import { Router } from "express";
import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";

const router = Router();

router.get("/by-threadId/:id", getComments); //threads_id
router.post("", createComment); // Create a new comment
router.delete("/:id", deleteComment); // Delete a comment by ID
router.put("/:id", updateComment); // Update a comment by ID

export default router;
