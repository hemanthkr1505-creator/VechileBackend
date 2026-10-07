



import express from "express";

import {
  createPayment,
  getUserPayments,
  getAllPayments,
  updatePaymentStatus,
} from "../controller/PaymentController.js";

 import { authuser } from "../controller/middleware/userAuth.js";

export const router = express.Router();

console.log("=================================");
console.log("PAYMENT ROUTER LOADED");
console.log("=================================");

// ==========================================
// TEST PAYMENT ROUTER
// ==========================================
router.get("/test", (req, res) => {
  console.log("PAYMENT TEST ROUTE HIT");

  res.status(200).json({
    success: true,
    message: "Payment router is working",
  });
});

// ==========================================
// CREATE PAYMENT
// POST /api/payment
// ==========================================
router.post("/", authuser, createPayment);

// ==========================================
// GET CURRENT USER PAYMENTS
// GET /api/payment/my
// ==========================================
router.get("/my", authuser, getUserPayments);

// ADMIN - GET ALL PAYMENTS
router.get("/payment/all",  getAllPayments);



router.put("/:id/status", updatePaymentStatus);

export default router;

