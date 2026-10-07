import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "register",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    utrNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    paymentDate: {
      type: String,
      required: true,
    },

    paymentTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model("Payment", PaymentSchema);

export default PaymentModel;