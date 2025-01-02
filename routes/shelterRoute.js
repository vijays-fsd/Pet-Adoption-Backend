import express from "express";
import {
  createUser,
  logoutUser,
  loginUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "../controllers/shelterController.js";
import { authShelterMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(createUser);
router.route("/auth").post(loginUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile")
  .get(authShelterMiddleware, getCurrentUserProfile)
  .put(authShelterMiddleware, updateCurrentUserProfile);

export default router;
