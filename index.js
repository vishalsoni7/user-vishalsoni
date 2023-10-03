const express = require('express');
const app = express();

const initializeDatabase = require('./db')

const userRoute = require('./routes/user.router')
const movieRoute = require('./routes/movie.router')

const { getMovieReviewsWithUserDetails } = require('./service/movie.service')

initializeDatabase()

app.use(express.json())

getMovieReviewsWithUserDetails('650d6a81aa8a77a72b8d8ac6')

app.get('/', (req, res) => {
  res.send('Welcome to the Users realm.')
});

app.use('/', userRoute)

app.use('/movie', movieRoute)

app.listen(3000, () => {
  console.log('server started');
});

