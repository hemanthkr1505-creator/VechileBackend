import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDb } from "./config/Database.js";
import { redisConnect } from "./config/Redis.js";

import registerRouter from "./router/Registerrouter.js";
import AfterService from "./router/AfterServicerouter.js";// Fixed "./Router/" -> "./router/"
import PaymentRouter from "./router/PaymentRoute.js";
import AdminRouter from "./router/Adminrouter.js";
import Feedbackrouter from "./router/Feebackrouter.js";
import serviceRouter from "./router/servicerouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connections
connectDb();
//redisConnect();

// Routes
app.use("/api", registerRouter);
app.use("/api", AfterService);
app.use("/api/feedback", Feedbackrouter);
app.use("/api/service", serviceRouter);
app.use("/api", PaymentRouter);
app.use("/api", AdminRouter);

// JSON parsing error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && err.type === "entity.parse.failed") {
    console.error("Invalid JSON:", err.message);

    return res.status(400).json({
      success: false,
      message: "Invalid JSON in request body",
    });
  }

  next(err);
});

// General error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
