import mongoose from "mongoose";

const shelterSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isShelter: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Shelter = mongoose.model("Shelter", shelterSchema);

export default Shelter;
