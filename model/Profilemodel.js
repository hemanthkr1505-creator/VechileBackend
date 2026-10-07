
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER ID
    // ==========================================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "register",
      required: true,
      unique: true,
    },

    // ==========================================
    // USER NAME
    // ==========================================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // USER EMAIL
    // ==========================================
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // ==========================================
    // PROFILE IMAGE
    // ==========================================
    Image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "profile",
  ProfileSchema
);

