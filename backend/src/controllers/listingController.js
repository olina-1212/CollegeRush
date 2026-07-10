import * as listingService from "../services/listingService.js";
import { listingSchema } from "../validations/listingValidation.js";

export const createListing = async (req, res) => {
  try {
    const validatedData = listingSchema.parse(req.body);

    const listing = await listingService.createListing(validatedData);

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing,
    });
  } catch (error) {
    res.status(400).json({
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
    const validatedData = listingSchema.partial().parse(req.body);

    const listing = await listingService.updateListing(
      req.params.id,
      validatedData
    );

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: listing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    await listingService.deleteListing(req.params.id);

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};