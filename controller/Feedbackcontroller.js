// // // // import { response } from "express";
// // // // import Feedbackmodel from "../model/Feedbackmodel.js";

// // // // export const createFeedback = async (req, res) => {
// // // //   try {
// // // //     console.log("POST BODY:", req.body);

// // // //     const {
// // // //       username,
// // // //       vehicleName,
// // // //       vehicleNumber,
// // // //       payment,
// // // //       date,
// // // //       message,
// // // //     } = req.body;

   
// // // // // console.log(req.user, "id")

// // // //     const feedback = await Feedbackmodel.create({
// // // //       userId: req.user,
// // // //       username: username.trim(),
// // // //       vehicleName: vehicleName.trim(),
// // // //       vehicleNumber: vehicleNumber.trim().toUpperCase(),
// // // //       payment: Number(payment),
// // // //       date: new Date(date),
// // // //       message: message.trim(),
// // // //     });

// // // //     return res.status(201).json({
// // // //       success: true,
// // // //       message: "Feedback sent successfully",
// // // //       feedback,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Create feedback error:", error);

// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to create feedback",
// // // //       error: error.message,
// // // //     });
// // // //   }
// // // // };

// // // // export const getUserFeedback = async (req, res) => {
// // // //   try {
// // // //     const page = Math.max(Number(req.query.page) || 1, 1);
// // // //     const limit = Math.max(Number(req.query.limit) || 10, 1);

// // // //     const skip = (page - 1) * limit;

// // // //     const [feedback, total] = await Promise.all([
// // // //       Feedbackmodel
// // // //         .find()
// // // //         .sort({ createdAt: -1 })
// // // //         .skip(skip)
// // // //         .limit(limit),

// // // //       Feedbackmodel.countDocuments(),
// // // //     ]);

// // // //     return res.status(200).json({
// // // //       success: true,
// // // //       message: "Feedback details found",
// // // //       data: feedback,
// // // //       pagination: {
// // // //         page,
// // // //         limit,
// // // //         total,
// // // //         totalPages: Math.ceil(total / limit),
// // // //       },
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Get feedback error:", error);

// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       message: "Failed to get feedback",
// // // //       error: error.message,
// // // //     });
// // // //   }
// // // // };
// // // // 
// // ///6666/////
// // import Feedbackmodel from "../model/Feedbackmodel.js";

// // export const createFeedback = async (req, res) => {
// //   try {
// //     const { username, vehicleName, vehicleNumber, payment, date, message } = req.body;

// //     console.log(req.user, "id")

// //     // Check user ID from authentication middleware
// //     if (!req.user) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "User ID is required to create feedback",
// //       });
// //     }

    

// //     const feedback = await Feedbackmodel.create({
// //       userId: req.user,
// //       username: username ? username.trim() : "User",
// //       vehicleName: vehicleName.trim(),
// //       vehicleNumber: vehicleNumber.trim().toUpperCase(),
// //       payment: Number(payment),
// //       date: new Date(date),
// //       message: message.trim(),
// //     });

// //     return res.status(201).json({
// //       success: true,
// //       message: "Feedback sent successfully",
// //       feedback,
// //     });
// //   } catch (error) {
// //     console.error("Create feedback error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to create feedback",
// //       error: error.message,
// //     });
// //   }
// // };



// // export const getUserFeedback = async (req, res) => {
// //   try {
// //     const page = Math.max(Number(req.query.page) || 1, 1);
// //     const limit = Math.max(Number(req.query.limit) || 10, 1);
// //     const skip = (page - 1) * limit;

// //     // Remove query filter to get ALL data from MongoDB
// //     const [feedback, total] = await Promise.all([
// //       Feedbackmodel.find()
// //         .sort({ createdAt: -1 })
// //         .skip(skip)
// //         .limit(limit),
// //       Feedbackmodel.countDocuments(),
// //     ]);

// //     return res.status(200).json({
// //       success: true,
// //       message: "All feedback details retrieved",
// //       data: feedback,
// //       pagination: {
// //         page,
// //         limit,
// //         total,
// //         totalPages: Math.ceil(total / limit) || 1,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get feedback error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to get feedback",
// //       error: error.message,
// //     });
// //   }
// // };
// // // ///////666////
// import Feedbackmodel from "../model/Feedbackmodel.js";

// // ==========================================
// // CREATE FEEDBACK - POST
// // ==========================================
// export const createFeedback = async (req, res) => {
//   try {
//     const {
//       username,
//       vehicleName,
//       vehicleNumber,
//       payment,
//       date,
//       message,
//     } = req.body;

//     // Validation
//     if (
//       !username ||
//       !vehicleName ||
//       !vehicleNumber ||
//       payment === undefined ||
//       payment === null ||
//       !date ||
//       !message
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Create feedback
//     const feedback = await Feedbackmodel.create({
//       username: username.trim(),
//       vehicleName: vehicleName.trim(),
//       vehicleNumber: vehicleNumber.trim().toUpperCase(),
//       payment: Number(payment),
//       date: new Date(date),
//       message: message.trim(),
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Feedback created successfully",
//       data: feedback,
//     });
//   } catch (error) {
//     console.error("CREATE FEEDBACK ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to create feedback",
//       error: error.message,
//     });
//   }
// };

// // ==========================================
// // GET ALL FEEDBACK - GET
// // ==========================================
// export const getUserFeedback = async (req, res) => {
//   try {
//     const feedback = await Feedbackmodel.find()
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "Feedback details found",
//       data: feedback,
//     });
//   } catch (error) {
//     console.error("GET FEEDBACK ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to get feedback",
//       error: error.message,
//     });
//   }
// };
import Feedbackmodel from "../model/Feedbackmodel.js";

// ==========================================
// CREATE FEEDBACK - POST
// ==========================================
export const createFeedback = async (req, res) => {
  try {
    const {
      username,
      vehicleName,
      vehicleNumber,
      payment,
      date,
      message,
    } = req.body;

    // Validation
    if (
      !username ||
      !vehicleName ||
      !vehicleNumber ||
      payment === undefined ||
      payment === null ||
      !date ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const feedback = await Feedbackmodel.create({
      username: username.trim(),
      vehicleName: vehicleName.trim(),
      vehicleNumber: vehicleNumber
        .trim()
        .toUpperCase(),
      payment: Number(payment),
      date: new Date(date),
      message: message.trim(),
      userId: req.user,
    });

    return res.status(201).json({
      success: true,
      message: "Feedback created successfully",
      data: feedback,
    });
  } catch (error) {
    console.error(
      "CREATE FEEDBACK ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create feedback",
      error: error.message,
    });
  }
};

// ==========================================
// GET FEEDBACK WITH PAGINATION - GET
// // ==========================================
// export const getUserFeedback = async (req, res) => {
//   try {
//     // Get logged-in user's ID
//     const userId = req.user?.id || req.user?._id;

//     console.log("Logged-in User ID:", userId);

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "User ID not found. Please login again.",
//       });
//     }

//     let page = parseInt(req.query.page) || 1;
//     let limit = parseInt(req.query.limit) || 10;

//     if (page < 1) {
//       page = 1;
//     }

//     if (limit < 1) {
//       limit = 10;
//     }

//     if (limit > 10) {
//       limit = 10;
//     }

//     const skip = (page - 1) * limit;

//     // IMPORTANT:
//     // Count only this user's feedback
//     const total = await Feedbackmodel.countDocuments({
//       userId: userId,
//     });

//     // IMPORTANT:
//     // Get only this user's feedback
//     const feedback = await Feedbackmodel.find({
//       userId: userId,
//     })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const totalPages = Math.ceil(total / limit);

//     return res.status(200).json({
//       success: true,
//       message: "Feedback details found",
//       data: feedback,
//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages,
//       },
//     });

//   } catch (error) {
//     console.error("GET FEEDBACK ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to get feedback",
//       error: error.message,
//     });
//   }
// };

// ==========================================
// GET LOGGED-IN USER FEEDBACK
// ==========================================
// ==========================================
export const getUserFeedback = async (req, res) => {
  try {
    console.log("=================================");
    console.log("GET USER FEEDBACK");
    console.log("REQ.USER:", req.user);

    // req.user already contains the user ID
    const userId = req.user;

    console.log("JWT USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found. Please login again.",
      });
    }

    // Get ONLY this user's feedback
    const feedback = await Feedbackmodel
      .find({ userId: userId })
      .sort({ createdAt: -1 });

    console.log("FEEDBACK FOUND:", feedback.length);

    return res.status(200).json({
      success: true,
      message: "User feedback found",
      data: feedback,
    });

  } catch (error) {
    console.error("GET USER FEEDBACK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user feedback",
      error: error.message,
    });
  }
};