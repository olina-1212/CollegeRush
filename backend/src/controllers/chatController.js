import * as chatService from "../services/chatService.js";
import prisma from "../config/prisma.js";
import { getIO } from "../socket/socketManager.js";

// -------------------------------------
// START CONVERSATION
// -------------------------------------

export const startConversation = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const { listingId, workPostId } = req.body;


let sellerId;


// CASE 1: LISTING CHAT

if(listingId){

const listing = await prisma.listing.findUnique({
 where:{
   id:listingId
 }
});


if(!listing){
 return res.status(404).json({
  success:false,
  message:"Listing not found"
 });
}


sellerId = listing.sellerId;

}



// CASE 2: WORK CHAT

if(workPostId){

const workPost = await prisma.workPost.findUnique({

where:{
 id:workPostId
}

});


if(!workPost){

return res.status(404).json({

success:false,
message:"Work post not found"

});

}


sellerId = workPost.sellerId;


}

    if (sellerId === buyerId){
      return res.status(400).json({
        success: false,
        message: "You can't chat with yourself.",
      });
    }

    const conversation =
await chatService.startConversation(
 buyerId,
 sellerId,
 listingId,
 workPostId
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

// -------------------------------------
// GET SINGLE CONVERSATION
// -------------------------------------

export const getConversation = async (req, res) => {
  try {
    const conversation = await chatService.getConversation(req.params.id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Authorization
    if (
      conversation.buyerId !== req.user.id &&
      conversation.sellerId !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

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

// -------------------------------------
// GET ALL MY CONVERSATIONS
// -------------------------------------

export const getMyConversations = async (req, res) => {
  try {
    const conversations = await chatService.getMyConversations(req.user.id);

    return res.status(200).json({
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

// -------------------------------------
// SEND MESSAGE
// -------------------------------------

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const conversation = await chatService.getConversation(req.params.id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Authorization
    if (
      conversation.buyerId !== req.user.id &&
      conversation.sellerId !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const message = await chatService.sendMessage(
      req.params.id,
      req.user.id,
      text.trim()
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