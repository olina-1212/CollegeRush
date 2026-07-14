import express from "express";
import * as chatController from "../controllers/chatController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/start", authMiddleware, chatController.startConversation);

router.get("/", authMiddleware, chatController.getMyConversations);

router.get("/:id", authMiddleware, chatController.getConversation);

router.post("/:id/message", authMiddleware, chatController.sendMessage);

export default router;