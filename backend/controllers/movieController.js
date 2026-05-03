const Movie = require("../models/Movie");

const createMovie = async (req, res) => {
  try {
    const movie = new Movie({
      title: req.body.title,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      director: req.body.director,
      description: req.body.description,
      posterUrl: req.body.posterUrl,
      createdBy: req.user._id
    });

    await movie.save();

    res.status(201).json({
      message: "Movie created successfully",
      movie: movie
    });
  } catch (err) {
    res.status(500).json({ message: "Create movie error", error: err.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Get movies error", error: err.message });
  }
};

const getMyMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Get my movies error", error: err.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Get movie error", error: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (movie.createdBy && movie.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own movie" });
    }

    movie.title = req.body.title || movie.title;
    movie.genre = req.body.genre || movie.genre;
    movie.releaseYear = req.body.releaseYear || movie.releaseYear;
    movie.director = req.body.director || movie.director;
    movie.description = req.body.description || movie.description;
    movie.posterUrl = req.body.posterUrl || movie.posterUrl;

    await movie.save();

    res.json({
      message: "Movie updated successfully",
      movie: movie
    });
  } catch (err) {
    res.status(500).json({ message: "Update movie error", error: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (movie.createdBy && movie.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own movie" });
    }

    await movie.deleteOne();

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete movie error", error: err.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMyMovies,
  getMovieById,
  updateMovie,
  deleteMovie
};