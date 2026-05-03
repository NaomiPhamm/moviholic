const Review = require("../models/Review");
const Movie = require("../models/Movie");
const updateMovieAverageRating = async (movieId) => {
  const reviews = await Review.find({ movie: movieId });

  let averageRating = 0;

  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    averageRating = totalRating / reviews.length;
  }

  await Movie.findByIdAndUpdate(movieId, {
    averageRating: averageRating
  });
};

const createReview = async (req, res) => {
  try {
    const review = new Review({
      movie: req.body.movie,
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment
    });

    await review.save();

    await updateMovieAverageRating(req.body.movie);
    const io = req.app.get("io");

    io.emit("review:created", {
      message: "New review created",
      review: review
    });

    res.status(201).json({
      message: "Review created successfully",
      review: review
    });
  } catch (err) {
    res.status(500).json({ message: "Create review error", error: err.message });
  }
};
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("movie")
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Get reviews error", error: err.message });
  }
};

const getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Get movie reviews error", error: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own review" });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await review.save();

    await updateMovieAverageRating(review.movie);
    const io = req.app.get("io");

    io.emit("review:updated", {
    message: "Review updated",
    review: review
});

    res.json({
      message: "Review updated successfully",
      review: review
    });
  } catch (err) {
    res.status(500).json({ message: "Update review error", error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own review" });
    }

    const movieId = review.movie;

    await review.deleteOne();

    await updateMovieAverageRating(movieId);

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete review error", error: err.message });
  }
};
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate("movie")
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Get my reviews error", error: err.message });
  }
};
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("movie")
      .populate("user", "username email");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Get review error", error: err.message });
  }
};
module.exports = {
  createReview,
  getReviews,
  getReviewsByMovie,
  getMyReviews,
  updateReview,
  deleteReview,
  getReviewById
};