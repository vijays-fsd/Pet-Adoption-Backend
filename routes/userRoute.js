import express from "express";
import {
  createUser,
  logoutUser,
  loginUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
router.route("/auth").post(loginUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile")
  .get(authMiddleware, getCurrentUserProfile)
  .put(authMiddleware, updateCurrentUserProfile);

export default router;
