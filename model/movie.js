const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
      rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
      }
    },
  ],
  releaseYear: {
    type: Number,
    required: true,
  },
  genre: [{
    type: String,
    enum: ['Action', 'Drama', 'Comedy', 'Romance', 'Thriller'],
  }],
  director: {
    type: String,
    required: true,
  },
  actors: [{
    type: String,
  }],
  language: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: 'India',
  },
  plot: {
    type: String,
  },
  awards: [{
    type: String,
  }],
  posterUrl: {
    type: String,
  },
  trailerUrl: {
    type: String,
  },
  timeDuration: {
    type: Number,
  },
});

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie