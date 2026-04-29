const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} = require("../controllers/movieController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.put("/:id", protect, updateMovie);
router.delete("/:id", protect, deleteMovie);

module.exports = router;