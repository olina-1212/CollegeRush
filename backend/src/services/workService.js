import prisma from "../config/prisma.js";

export const createWork = async (data, sellerId) => {
  return await prisma.workPost.create({
    data: {
      ...data,
      sellerId,
      deadline: data.deadline ? new Date(data.deadline) : null,
    },

    include: {
      seller: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          collegeName: true,
        },
      },
    },
  });
};

export const getAllWorks = async () => {
  return await prisma.workPost.findMany({
    include: {
      seller: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          collegeName: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getWorkById = async (id) => {
  return await prisma.workPost.findUnique({
    where: { id },

    include: {
      seller: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          collegeName: true,
        },
      },
    },
  });
};

export const updateWork = async (id, sellerId, data) => {
  const work = await prisma.workPost.findUnique({
    where: { id },
  });

  if (!work) {
    throw new Error("Work not found");
  }

  if (work.sellerId !== sellerId) {
    throw new Error("Unauthorized");
  }

  return await prisma.workPost.update({
    where: { id },

    data: {
      ...data,
      deadline: data.deadline ? new Date(data.deadline) : null,
    },

    include: {
      seller: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          collegeName: true,
        },
      },
    },
  });
};

export const deleteWork = async (id, sellerId) => {
  const work = await prisma.workPost.findUnique({
    where: { id },
  });

  if (!work) {
    throw new Error("Work not found");
  }

  if (work.sellerId !== sellerId) {
    throw new Error("Unauthorized");
  }

  return await prisma.workPost.delete({
    where: { id },
  });
};