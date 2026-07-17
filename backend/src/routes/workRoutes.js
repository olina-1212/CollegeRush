import express from "express";

import {
  createWorkPost,
  getWorkPosts,
  getWorkPost,
  updateWorkPost,
  deleteWorkPost,
} from "../controllers/workController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getWorkPosts);
router.get("/:id", getWorkPost);

router.post("/", authMiddleware, createWorkPost);

router.put("/:id", authMiddleware, updateWorkPost);

router.delete("/:id", authMiddleware, deleteWorkPost);

export default router;