const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');

const {
  CONFLICT_USER_MSG,
  BAD_REQUEST_USER_MSG,
  UNAUTHORIZED_ERROR_MSG,
  NOT_FOUND_USER_MSG,
} = require('../utils/constants');

const mongoUpdateParams = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
};

const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body; // получим из объекта запроса имя,

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(200).send({ data: user });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(CONFLICT_USER_MSG));
      return;
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_USER_MSG));
    } else {
      next(err);
    }
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  // const errorMsg = 'Неправильные почта или пароль';
  User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError(UNAUTHORIZED_ERROR_MSG))
    .then((user) => bcrypt.compare(password, user.password)
      .then((isUserValid) => {
        if (isUserValid) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret');

          res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: true,
            // secure: true
            maxAge: 3600000 * 24 * 7,
          });
          res.send({ data: user.toJSON() });
        } else {
          throw new UnauthorizedError(UNAUTHORIZED_ERROR_MSG);
        }
      }))
    .catch(next);
};

const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    sameSite: true,
    // secure: true'
    secure: true,
    maxAge: 0,
  });

  res.send();
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER_MSG);
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  // обновим имя найденного по _id пользователя
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    // Передадим объект опций:
    mongoUpdateParams,
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER_MSG);
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_USER_MSG));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_USER_MSG));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  logout,
  getUser,
  updateUser,
};
