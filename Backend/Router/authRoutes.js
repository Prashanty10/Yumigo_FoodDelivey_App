import express from "express";
import {
  handleLogin,
  handleRegister,
  updateProfile,
  changePassword,
} from "../Controller/authController.js";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/register", handleRegister);

router.put("/update/:id", updateProfile);
router.put("/changepassword/:id", changePassword);

export default router;
