import prisma from "../config/prisma.js";

export const createListing = async (data) => {
  return await prisma.listing.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      type: data.type,
      category: data.category,
      condition: data.condition,
      location: data.location,
      sellerId: data.sellerId, // Temporary. Later this will come from JWT.
    },
    include: {
      seller: true,
      images: true,
    },
  });
};

export const getAllListings = async (filters) => {
  const {
    search,
    category,
    type,
    condition,
    minPrice,
    maxPrice,
  } = filters;

  return await prisma.listing.findMany({
    where: {
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(category && { category }),

      ...(type && { type }),

      ...(condition && { condition }),

      ...((minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: Number(minPrice) }),
          ...(maxPrice && { lte: Number(maxPrice) }),
        },
      }),
    },

    include: {
      seller: true,
      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getListingById = async (id) => {
  return await prisma.listing.findUnique({
    where: {
      id,
    },
    include: {
      seller: true,
      images: true,
    },
  });
};

export const updateListing = async (id, data) => {
  return await prisma.listing.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
    include: {
      seller: true,
      images: true,
    },
  });
};

export const deleteListing = async (id) => {
  return await prisma.listing.delete({
    where: {
      id,
    },
  });
};