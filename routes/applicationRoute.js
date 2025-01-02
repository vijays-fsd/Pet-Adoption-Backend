import express from "express";
import { sendContactMessage } from "../controllers/applicationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, sendContactMessage);

export default router;
