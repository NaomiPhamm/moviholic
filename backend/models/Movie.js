const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    releaseYear: {
      type: Number,
      required: true
    },
    director: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    posterUrl: {
      type: String,
      default: ""
    },
    averageRating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Movie", movieSchema);