import asyncHandler from "../middlewares/asyncHandler.js";
import Pet from "../models/petModel.js";
import Review from "../models/reviewModel.js";

export const getReview = asyncHandler(async (req, res) => {
  try {
    const { petId } = req.params;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }

    const reviews = await Review.find({ pet: petId }).populate(
      "user",
      "username email"
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export const postReview = asyncHandler(async (req, res) => {
  try {
    const { petId } = req.params;
    const { rating, comment } = req.body;

    const userId = req.user._id;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const existingReview = await Review.findOne({ pet: petId, user: userId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this pet" });
    }

    const newReview = new Review({
      user: userId,
      pet: petId,
      rating,
      comment,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this review" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
