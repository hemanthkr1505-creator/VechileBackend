import express from "express";

import {
  AdminLogin,
  AdminRegister,
} from "../controller/Admincontroller.js";

const router = express.Router();

// Admin Register
router.post("/AdminRegister", AdminRegister);

// Admin Login
router.post("/Adminlogin", AdminLogin);

export default router;