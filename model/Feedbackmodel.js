
// // import mongoose from "mongoose";

// // const feedbackSchema = new mongoose.Schema(
// //   {
// //   //   userId: {
// //   //     type: mongoose.Schema.Types.ObjectId,
// //   //     ref: "register",
// //   //     required: true,
// //   //   },

// //     username: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     vehicleName: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     vehicleNumber: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //       uppercase: true,
// //     },

// //     payment: {
// //       type: Number,
// //       required: true,
// //       min: 0,
// //     },

// //     date: {
// //       type: Date,
// //       required: true,
// //     },

// //     message: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // export default mongoose.model("Feedback", feedbackSchema);

// import mongoose from "mongoose";

// const feedbackSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "register",
//       required: true,
//     },
//     username: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     vehicleName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     vehicleNumber: {
//       type: String,
//       required: true,
//       trim: true,
//       uppercase: true,
//     },
//     payment: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     message: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Feedback", feedbackSchema);
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
 {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "register",
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    vehicleName: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    payment: {
      type: Number,
      required: true,
    
    },
    date: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    // adminReply: {
    //   type: String,
    //   default: "",
    //   trim: true,
    // },
    // status: {
    //   type: String,
    //   enum: ["Pending", "Replied"],
    //   default: "Pending",
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Feedback", feedbackSchema);