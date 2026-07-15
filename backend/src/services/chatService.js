import prisma from "../config/prisma.js";

export const startConversation = async (
  buyerId,
  sellerId,
  listingId
) => {

  let conversation = await prisma.conversation.findUnique({
    where: {
      buyerId_sellerId_listingId: {
        buyerId,
        sellerId,
        listingId,
      },
    },
  });

  if (conversation) {
    return conversation;
  }

  conversation = await prisma.conversation.create({
    data: {
      buyerId,
      sellerId,
      listingId,
    },
  });

  return conversation;
};

export const getConversation = async (conversationId) => {

  return prisma.conversation.findUnique({

    where: {
      id: conversationId,
    },

    include: {

      listing: true,

      buyer: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },

      seller: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },

      messages: {
        orderBy: {
          createdAt: "asc",
        },

        include: {
          sender: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });
};

export const getMyConversations = async (userId) => {

  return prisma.conversation.findMany({

    where: {
      OR: [
        {
          buyerId: userId,
        },
        {
          sellerId: userId,
        },
      ],
    },

    include: {

      listing: {
        include: {
          images: true,
        },
      },

      buyer: true,

      seller: true,

      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },

    orderBy: {
      updatedAt: "desc",
    },
  });

};

export const sendMessage = async (
  conversationId,
  senderId,
  text
) => {

  const message = await prisma.message.create({

    data: {
  conversationId,
  senderId,
  content: text,
},

  });

  await prisma.conversation.update({

    where: {
      id: conversationId,
    },

    data: {
      updatedAt: new Date(),
    },

  });

  return message;
};