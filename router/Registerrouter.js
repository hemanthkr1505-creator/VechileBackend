import express from "express"
import { getUserByID, userLogin, userRegister, getCurrentUser } from "../controller/RegisterController.js";
import { validateRegister } from "../controller/middleware/Validater.js";
import { rateLimitation } from "../controller/middleware/Ratelimit.js";
 import { authuser } from "../controller/middleware/userAuth.js";

const router = express.Router()
router.post("/register", validateRegister, userRegister)
// router.post("/login-user",rateLimitation, userLogin)
router.post(
  "/login",
  rateLimitation,
  userLogin
);
router.get("/get-userinformation/:id",getUserByID)
///////
router.get("/profile", authuser, getCurrentUser);

export default router;


