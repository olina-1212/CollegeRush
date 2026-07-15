import * as chatService from "../services/chatService.js";
import prisma from "../config/prisma.js";
import { getIO } from "../socket/socketManager.js";

export const startConversation = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const { listingId } = req.body;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.sellerId === buyerId) {
      return res.status(400).json({
        success: false,
        message: "You can't chat with yourself.",
      });
    }

    const conversation = await chatService.startConversation(
      buyerId,
      listing.sellerId,
      listingId
    );

    return res.status(200).json({
      success: true,
      data: conversation,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getConversation = async (req, res) => {
  try {

    const conversation =
      await chatService.getConversation(req.params.id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    return res.json({
      success: true,
      data: conversation,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getMyConversations = async (req, res) => {
  try {

    const conversations =
      await chatService.getMyConversations(req.user.id);

    return res.json({
      success: true,
      data: conversations,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {

    const { text } = req.body;

    const message = await chatService.sendMessage(
  req.params.id,
  req.user.id,
  text
);

const io = getIO();

io.to(req.params.id).emit("newMessage", message);

    return res.status(201).json({
      success: true,
      data: message,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};