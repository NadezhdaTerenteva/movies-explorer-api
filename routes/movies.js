const express = require('express');

const movieRouter = express.Router(); // создали роутер

const {
  createMovie,
  getMovies,
  deleteMovieById,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);

movieRouter.post('/', createMovie);

movieRouter.delete('/_id', deleteMovieById);


module.exports = movieRouter; // экспортировали роутер