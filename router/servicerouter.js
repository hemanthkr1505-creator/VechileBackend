import express from "express";
import {upload} from "../controller/middleware/upload.js"
import {
  createService,
  getServices,
  getServiceById,
   deleteService,
} from "../controller/Servicecontroller.js";
import { authuser } from "../controller/middleware/userAuth.js";


const router = express.Router();

router.post(
  "/create",
  authuser,
  upload.single("VehicleImage"),
  createService
);

// Get all services
router.get("/server", getServices);


router.delete(
  "/:id",
  deleteService
);
// Get service by ID
router.get("/:id", getServiceById);

export default router;
