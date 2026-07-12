import * as listingService from "../services/listingService.js";
import { listingSchema } from "../validations/listingValidation.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


export const createListing = async (req, res) => {
  try {
    const validatedData = listingSchema.parse(req.body);
console.log("FILES:", req.files);
    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "college-rush/listings",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });

        uploadedImages.push({
          
          url: result.secure_url,
          publicId: result.public_id,

        });
        console.log("Uploaded:", result.secure_url);
      }
    }

    const listing = await listingService.createListing({
      ...validatedData,
      sellerId: req.user.id,
      images: uploadedImages,
    });
console.log(uploadedImages);
    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing,
    });

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await listingService.getAllListings(req.query);

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyListings = async (req, res) => {
  try {
    const listings = await listingService.getMyListings(req.user.id);

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await listingService.getListingById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    const listing = await listingService.getListingById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.sellerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this listing",
      });
    }

    const validatedData = listingSchema.partial().parse(req.body);

    // 👇 SEND THE VALIDATED DATA TO THE SERVICE
    const updatedListing = await listingService.updateListing(
    req.params.id,
    req.user.id,
    validatedData
);

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: updatedListing,
    });

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await listingService.getListingById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.sellerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this listing",
      });
    }

    await listingService.deleteListing(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};