import prisma from "../config/prisma.js";

export const addToWishlist = async (data) => {
  return await prisma.wishlistItem.create({
    data: {
      userId: data.userId,
      listingId: data.listingId,
    },
    include: {
      listing: {
        include: {
          images: true,
          seller: true,
        },
      },
    },
  });
};

export const getWishlist = async (userId) => {
  return await prisma.wishlistItem.findMany({
    where: {
      userId,
    },
    include: {
      listing: {
        include: {
          images: true,
          seller: true,
        },
      },
    },
  });
};

export const removeFromWishlist = async (userId, listingId) => {
  return await prisma.wishlistItem.delete({
    where: {
      userId_listingId: {
        userId,
        listingId,
      },
    },
  });
};