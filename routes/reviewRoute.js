import express from "express";
import {
  getReview,
  postReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { authMiddleware, authShelter } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:petId").get(getReview);

router.route("/:petId").post(authMiddleware, postReview);

router.route("/:reviewId").delete(authMiddleware, deleteReview);

export default router;
