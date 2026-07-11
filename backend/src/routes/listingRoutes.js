import express from "express";
import {
  createListing,
  getAllListings,
  getMyListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Create Listing
router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  createListing
);

// Get All Listings (Marketplace)
router.get("/", getAllListings);

// Get Logged-in User's Listings
// IMPORTANT: This must come BEFORE "/:id"
router.get("/my", authMiddleware, getMyListings);

// Get Single Listing
router.get("/:id", getListingById);

// Update Listing
router.put("/:id", authMiddleware, updateListing);

// Delete Listing
router.delete("/:id", authMiddleware, deleteListing);

export default router;