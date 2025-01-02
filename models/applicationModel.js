import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    appointment: {
      type: Date, 
      required: true,  
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
