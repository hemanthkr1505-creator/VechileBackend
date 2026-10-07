
import Profilemodel from "../model/Profilemodel.js";
import Register from "../model/Register.js";

// ==========================================
// GET LOGGED-IN USER PROFILE
// ==========================================
export const getProfile = async (req, res) => {
  try {
    console.log("=================================");
    console.log("GET PROFILE");
    console.log("JWT USER ID:", req.user);
    console.log("JWT EMAIL:", req.email);
    console.log("=================================");

    // ID comes directly from JWT
    const userId = req.user.id;
console.log(userId)
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // Find profile using JWT user ID
    const profile = await Register.findOne({
      userId: userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile found successfully",
      data: {
        userId: Register.userId,
        name: Register.name,
        email: Register.email,
        Image: Register.Image || "",
      },
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get profile",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE PROFILE IMAGE
// ==========================================
export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user;
    const { Image } = req.body;

    console.log("=================================");
    console.log("UPDATE PROFILE IMAGE");
    console.log("JWT USER ID:", userId);
    console.log("IMAGE:", Image);
    console.log("=================================");

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    if (!Image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const profile = await Profilemodel.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        Image: Image,
      },
      {
        new: true,
      }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: profile,
    });
  } catch (error) {
    console.error("UPDATE PROFILE IMAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile image",
      error: error.message,
    });
  }
};

