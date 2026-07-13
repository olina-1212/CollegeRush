import * as userService from "../services/userService.js";

export const getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {

    const updatedUser = await userService.updateProfile(
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};