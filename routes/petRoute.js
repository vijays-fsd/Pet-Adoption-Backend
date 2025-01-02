import express from "express";
import {
  addPet,
  getPets,
  getPetById,
  deletePet,
} from "../controllers/petController.js";
import {
  authShelterMiddleware,
  authShelter,
} from "../middlewares/authMiddleware.js";

const router = express.Router();


router.route("/").get(getPets);
router.route("/:id").get(getPetById);
router.route("/:id").delete(authShelterMiddleware, authShelter, deletePet);
router.route("/addpet").post(authShelterMiddleware, authShelter, addPet);

export default router;
