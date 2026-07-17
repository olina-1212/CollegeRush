import prisma from "../config/prisma.js";

export const startConversation = async (
 buyerId,
 sellerId,
 listingId = null,
 workPostId = null
) => {

let conversation = await prisma.conversation.findFirst({
where:{
  buyerId,
  sellerId,
  OR:[
    {
      listingId,
      workPostId:null
    },
    {
      workPostId,
      listingId:null
    }
  ]
},
});
  if (conversation) {
    return conversation;
  }

 conversation = await prisma.conversation.create({
  data:{
    buyerId,
    sellerId,
    listingId,
    workPostId,
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

  workPost: true,

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

  listing:{
    include:{
      images:true,
    },
  },

  workPost:true,

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