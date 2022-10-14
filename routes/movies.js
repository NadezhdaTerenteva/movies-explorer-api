const express = require('express');
const { movieValidator, movieIdValidator } = require('../middlewares/validation');

const movieRouter = express.Router(); // создали роутер

const {
  createMovie,
  getMovies,
  deleteMovieById,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);

movieRouter.post('/', movieValidator, createMovie);

movieRouter.delete('/:id', movieIdValidator, deleteMovieById);

module.exports = movieRouter; // экспортировали роутер
