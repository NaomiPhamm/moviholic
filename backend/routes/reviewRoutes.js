const express = require("express");
const {
  createReview,
  getReviews,
  getReviewsByMovie,
  getMyReviews,
  getReviewById,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createReview);

router.get("/", getReviews);

router.get("/my", protect, getMyReviews);  

router.get("/movie/:movieId", getReviewsByMovie);
router.get("/:id", protect, getReviewById);

router.put("/:id", protect, updateReview);

router.delete("/:id", protect, deleteReview);

module.exports = router;