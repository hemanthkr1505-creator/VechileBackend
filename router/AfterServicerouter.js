import express from "express"
import { AfterService } from "../controller/AfterServiceController.js";
// import { AfterService } from "../controller/AfterService.js"

 export const router = express.Router()
router.post("/AfterService", AfterService)
export default router;


