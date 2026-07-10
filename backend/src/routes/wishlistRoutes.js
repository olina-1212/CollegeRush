import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/", addToWishlist);
router.get("/:userId", getWishlist);
router.delete("/:userId/:listingId", removeFromWishlist);

export default router;