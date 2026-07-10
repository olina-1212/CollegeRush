import express from "express";
import {
  createListing,
  getAllListings,
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

// Get All Listings
router.get("/", getAllListings);

// Get Single Listing
router.get("/:id", getListingById);

// Update Listing
router.put("/:id",authMiddleware, updateListing);

// Delete Listing
router.delete("/:id", authMiddleware, deleteListing);

export default router;