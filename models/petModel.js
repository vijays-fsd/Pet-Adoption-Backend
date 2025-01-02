import mongoose from "mongoose";

const petSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: ["small", "medium", "large","Small", "Medium", "Large"],
      required: true,
    },
    color: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female","male", "female"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: String,
    },
    description: {
      type: String,
    },
    photos: [
      {
        type: String,
        required: true,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    adoptionStatus: {
      type: String,
      default: "Available",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Shelter",
      required: true,
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
