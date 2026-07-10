import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";

const router = express.Router();

// Create Listing
router.post("/", createListing);

// Get All Listings
router.get("/", getAllListings);

// Get Single Listing
router.get("/:id", getListingById);

// Update Listing
router.put("/:id", updateListing);

// Delete Listing
router.delete("/:id", deleteListing);

export default router;