import prisma from "../config/prisma.js";

export const getProfile = async (userId) => {
  return await prisma.user.findUnique({
  where: {
    id: userId,
  },

  include: {

    listings: {
      include: {
        images: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    },

    workPosts: {
      orderBy: {
        createdAt: "desc",
      },
    },

  },
});
};

export const updateProfile = async (userId, data) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.name,
      collegeName: data.collegeName,
      bio: data.bio,
      phone: data.phone,
      avatarUrl: data.avatarUrl,
    },
  });
};