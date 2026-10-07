// // // // import express from "express";

// // // // import {
// // // //   createFeedback,
// // // //   getUserFeedback,
// // // // } from "../controller/Feedbackcontroller.js";

// // // // // import { authMiddleware } from "../middleware/authMiddleware.js";
// // // // import { authuser } from "../controller/middleware/userAuth.js";

// // // // export const router = express.Router();

// // // // router.post("/", authuser, createFeedback);

// // // // router.get("/", authuser, getUserFeedback);

// // // // export default router;
// // // //////////////////////////////
// // // import express from "express";

// // // import {
// // //   createFeedback,
// // //   getUserFeedback
 
// // // } from "../controller/Feedbackcontroller.js";
// // // //  import { authuser } from "../controller/middleware/userAuth.js";

// // // const router = express.Router();

// // // router.post("/",  createFeedback);
// // //  router.get("/",  getUserFeedback);

// // // export default router;
// // import express from "express";
// // import { createFeedback, getUserFeedback } from "../controller/Feedbackcontroller.js";
// // import { authuser } from "../controller/middleware/userAuth.js";

// // const router = express.Router();

// // router.post("/", authuser, createFeedback);
// // router.get("/", authuser, getUserFeedback);

// // export default router;import express from "express";
// import express from "express";
// import { createFeedback, getUserFeedback } from "../controller/Feedbackcontroller.js";

// // Change this line to match your actual controller folder path
// // import { authuser } from "../controller/middleware/userAuth.js"; 

// const router = express.Router();

// router.post("/", createFeedback);
// // router.get("/", authuser, getUserFeedback);
// router.get("/",  getUserFeedback);

// export default router;
import express from "express";

import {
  createFeedback,
  getUserFeedback,
} from "../controller/Feedbackcontroller.js";
import { authuser } from "../controller/middleware/userAuth.js";

const router = express.Router();

// POST - Create feedback
router.post("/", authuser, createFeedback);

// GET - Get all feedback
router.get("/", authuser, getUserFeedback);

export default router;