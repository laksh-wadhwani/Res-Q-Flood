import express from "express"
import { Login, Signup, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", Signup)
router.put("/verify-otp/:email", verifyOtp)
router.post("/login", Login)

export default router