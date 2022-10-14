const express = require('express');
const router = require('express').Router();

const userRouter = require('./users'); // импортируем роутер
const movieRouter = require('./movies');

const { authorizationValidator, registrationValidator } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-error');

const { createUser, login, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', registrationValidator, createUser);
router.post('/signin', authorizationValidator, login);
router.post('/signout', logout);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.all('*', express.json(), (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = router;
