const STATUS_NOT_FOUND = 404;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const STATUS_CONFLICT = 409;
const STATUS_SERVER_ERROR = 500;

const CONFLICT_USER_MSG = 'Пользователь с таким email уже существует';
const BAD_REQUEST_USER_MSG = 'Некорректные данные пользователя';
const BAD_REQUEST_MOVIE_MSG = 'Некорректные данные при создании фильма';
const UNAUTHORIZED_ERROR_MSG = 'Неправильные почта или пароль';
const NOT_FOUND_USER_MSG = 'Такого пользователя не существует';
const NOT_FOUND_MOVIE_MSG = 'Не найден фильм по переданному id';
const FORBIDDEN_ERROR_MSG = 'Невозможно удалить фильм другого пользователя';

module.exports = {
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_CONFLICT,
  STATUS_SERVER_ERROR,
  CONFLICT_USER_MSG,
  BAD_REQUEST_USER_MSG,
  BAD_REQUEST_MOVIE_MSG,
  UNAUTHORIZED_ERROR_MSG,
  NOT_FOUND_USER_MSG,
  NOT_FOUND_MOVIE_MSG,
  FORBIDDEN_ERROR_MSG,
};
