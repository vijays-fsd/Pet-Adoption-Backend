import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    pet: {
      type: mongoose.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
