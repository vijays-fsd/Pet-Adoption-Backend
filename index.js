// Package import

import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors"

// Utils

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import petRoutes from "./routes/petRoute.js";
import reviewRoutes from "./routes/reviewRoute.js";
import applicationRoutes from "./routes/applicationRoute.js";
import shelterUserRoutes from "./routes/shelterRoute.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI);

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE", 
  credentials: true, 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes

app.get("/", (req, res) => {
  res.send("Welcome Page of Pet Adoption Page");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/shelteruser", shelterUserRoutes);
app.use("/api/v1/pet", petRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/email", applicationRoutes)

app.listen(port, () => {
  console.log(`This server running on ${port} port`);
});
