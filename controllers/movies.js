const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/forbidden-error');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  }) // создадим документ на основе пришедших данных
    // вернём записанные в базу данные
    .then((movie) => res.send({ data: movie }))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании фильма'));
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
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then(async (movie) => {
      if (!movie) {
        throw new NotFoundError('Не найден фильм по переданному id');
      }

      if (String(movie.owner) !== String(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить фильм другого пользователя');
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
