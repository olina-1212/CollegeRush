import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
export const createListing = async (data) => {
  const listing = await prisma.listing.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      type: data.type,
      category: data.category,
      condition: data.condition,
      location: data.location,
      sellerId: data.sellerId,
    },
  });

  if (data.images && data.images.length > 0) {
    await prisma.listingImage.createMany({
      data: data.images.map((image) => ({
        url: image.url,
        publicId: image.publicId,
        listingId: listing.id,
      })),
    });
  }

  return await prisma.listing.findUnique({
    where: {
      id: listing.id,
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
    page = 1,
    limit = 12,
  } = filters;

  const skip = (Number(page) - 1) * Number(limit);

 return await prisma.listing.findMany({
  skip,
  take: Number(limit),
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

export const getMyListings = async (sellerId) => {
  return await prisma.listing.findMany({
    where: {
      sellerId,
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
export const updateListing = async (id, data, uploadedImages) => {
  if (uploadedImages.length > 0) {
    const oldImages = await prisma.listingImage.findMany({
      where: {
        listingId: id,
      },
    });

    for (const image of oldImages) {
      if (image.publicId) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (err) {
          console.error(
            `Failed to delete ${image.publicId}`,
            err
          );
        }
      }
    }
  }

  return await prisma.$transaction(async (tx) => {
    if (uploadedImages.length > 0) {
      await tx.listingImage.deleteMany({
        where: {
          listingId: id,
        },
      });
    }

    return tx.listing.update({
      where: {
        id,
      },
      data: {
        ...data,

        ...(uploadedImages.length > 0 && {
          images: {
            create: uploadedImages,
          },
        }),
      },

      include: {
        seller: true,
        images: true,
      },
    });
  });
};

export const deleteListing = async (id) => {
  return await prisma.listing.delete({
    where: {
      id,
    },
  });
};