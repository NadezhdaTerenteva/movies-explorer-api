const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/forbidden-error');

const {
  BAD_REQUEST_MOVIE_MSG,
  NOT_FOUND_MOVIE_MSG,
  FORBIDDEN_ERROR_MSG,
} = require('../utils/constants');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
    owner: req.user._id,
  }) // создадим документ на основе пришедших данных
    // вернём записанные в базу данные
    .then((movie) => res.send({ data: movie }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MOVIE_MSG));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then(async (movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MOVIE_MSG);
      }

      if (String(movie.owner) !== String(req.user._id)) {
        throw new ForbiddenError(FORBIDDEN_ERROR_MSG);
      }
      await movie.remove();
      res.send({ message: 'Фильм удален' });
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovieById,
};
