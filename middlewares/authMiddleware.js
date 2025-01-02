import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import Shelter from "../models/shelterModel.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
export const authShelterMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.shelter = await Shelter.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const authShelter = (req, res, next) => {
  if (req.shelter && req.shelter.isShelter) {
    return next(); // Allow Shelter user to continue
  } else {
    return res.status(403).json({ message: "Not authorized as Shelter" });
  }
};
