import { Router } from "express";
import { 
  getThreads, 
  getThread,
  createThread, 
  updateThread, 
  deleteThread, 
  likeThread ,
} from "../controllers/threadController.js";

const router = Router();

router.get("", getThreads);
router.get("/:id", getThread);
router.post("", createThread);
router.post("/new", createThread); // New alternative route for creating a thread
router.put("/:id", updateThread);
router.delete("/:id", deleteThread);
router.post("/:id/like", likeThread);

export default router;
