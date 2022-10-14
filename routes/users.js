const express = require('express');
const { updateUserValidator } = require('../middlewares/validation');

const router = express.Router(); // создали роутер

const {
  getUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', updateUserValidator, updateUser);

module.exports = router; // экспортировали роутер
