import PaymentModel from "../model/PaymentModel.js";

// ==========================================
// CREATE PAYMENT - USER
// ==========================================
export const createPayment = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      amount,
      utrNumber,
      paymentDate,
      paymentTime,
    } = req.body;

    // Validate fields
    if (
      !name ||
      !phoneNumber ||
      amount === undefined ||
      amount === null ||
      !utrNumber ||
      !paymentDate ||
      !paymentTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All payment fields are required",
      });
    }

    // Check duplicate UTR
    const existingPayment = await PaymentModel.findOne({
      utrNumber: utrNumber.trim(),
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "This UTR number already exists",
      });
    }

    // req.user comes from authuser middleware
    const payment = await PaymentModel.create({
      userId: req.user,
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      amount: Number(amount),
      utrNumber: utrNumber.trim(),
      paymentDate,
      paymentTime,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Payment submitted successfully",
      data: payment,
    });
  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error);

    // Duplicate UTR protection
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This UTR number already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Payment creation failed",
    });
  }
};


// ==========================================
// GET USER PAYMENTS - USER
// ==========================================
// export const getUserPayments = async (req, res) => {

  

export const getUserPayments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User ID not found",
      });
    }

    const payments = await PaymentModel.find({
      userId: req.user,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "User payments fetched successfully",
      data: payments,
    });
  } catch (error) {
    console.error("GET USER PAYMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL PAYMENTS
// ==========================================

export const getAllPayments = async (req, res) => {
  try {
    console.log("=================================");
    console.log("GET ALL PAYMENTS");
    console.log("=================================");

    const payments = await PaymentModel.find({})
      .sort({ createdAt: -1 })
      .lean();

    console.log("TOTAL PAYMENTS:", payments.length);

    return res.status(200).json({
      success: true,
      message: "All payments fetched successfully",
      data: payments,
    });
  } catch (error) {
    console.error("GET ALL PAYMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE PAYMENT STATUS
// ==========================================

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("UPDATE PAYMENT");
    console.log("ID:", id);
    console.log("STATUS:", status);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Payment ID is required",
      });
    }

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const payment = await PaymentModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Payment ${status} successfully`,
      data: payment,
    });
  } catch (error) {
    console.error("UPDATE PAYMENT STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

