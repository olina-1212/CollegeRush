import * as wishlistService from "../services/wishlistService.js";

export const addToWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.addToWishlist(req.body);

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.params.userId);

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    await wishlistService.removeFromWishlist(
      req.params.userId,
      req.params.listingId
    );

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};