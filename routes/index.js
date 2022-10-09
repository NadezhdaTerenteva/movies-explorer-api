const express = require('express');
const router = require('express').Router();

const userRouter = require('./users'); // импортируем роутер
const movieRouter = require('./movies');

const NotFoundError = require('../errors/not-found-error');

const { createUser, login, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);
router.post('/signout', logout);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.all('*', express.json(), (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = router;
