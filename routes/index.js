const express = require('express');
const router = require('express').Router();

const userRouter = require('./users'); // импортируем роутер
const movieRouter = require('./movies');

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