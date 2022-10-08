const express = require('express');

const router = express.Router(); // создали роутер

const {
  getUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', userValidator, updateUser);


module.exports = router; // экспортировали роутер