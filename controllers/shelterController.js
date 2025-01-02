import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import shelterToken from "../utils/shelterToken.js";
import Shelter from "../models/shelterModel.js";

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill the input field");
  }
  const existUser = await Shelter.findOne({ email });
  if (existUser) {
    res.status(400).send("user Already exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const newUser = new Shelter({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    shelterToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isShelter: newUser.isShelter,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please fill the input field");
  }
  const existingUser = await Shelter.findOne({ email });
  if (existingUser) {
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (validPassword) {
      shelterToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isShelter: existingUser.isShelter,
      });
    }

    return;
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expries: new Date(0),
  });
  res.status(200).json({
    message: "Logged out successfully",
  });
});

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await Shelter.findById(req.shelter._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await Shelter.findById(req.shelter._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isShelter: updatedUser.isShelter,
    });
  } else {
    res.status(404);
    throw new Error("Shelter not found");
  }
});
