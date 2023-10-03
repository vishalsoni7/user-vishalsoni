const express = require('express');
const movieRoute = express.Router();

const Movie = require('../model/movie')

const { addMovieReview, getTopFiveReviews, getBottomRatingsAndReviews, getMovieReviewsWithUserDetails } = require('../service/movie.service');

movieRoute.use(express.json())

//add review API
movieRoute.post('/:movieId/rating', async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const { userId, text, rating } = req.body;

    if (movieId) {
      const findMovie = await Movie.findById(movieId)

      if (findMovie && userId && review) {
        const movie = await addMovieReview(movieId, userId, text, rating)
        res.status(200).json({ 'review added': movie })
      } else {
        res.status(401).json({ error: 'user details missing!' })
      }
    } else {
      res.status(401).json({ error: 'movie not found!' })
    }
  } catch (error) {
    console.log('unable to add review', error)
  }
})

// get first three reviews API
movieRoute.get('/:movieId/reviews', async (req, res) => {
  try {
    const id = req.params.movieId;
    const movie = await getMovieReviewsWithUserDetails(id);

    if (movie) {
      res.status(200).json({ 'movie reviews': movie })
    } else {
      res.status(401).json({ error: 'movie not found!' })
    }
  } catch (error) {
    console.error('unable to get reviews', error)
  }
})

module.exports = movieRoute