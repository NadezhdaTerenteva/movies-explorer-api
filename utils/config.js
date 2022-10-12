const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // за 10 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const mongoDBUrl = 'mongodb://localhost:27017/moviesdb';

const JWT_SECRET = 'secret';

module.exports = {
  limiter,
  mongoDBUrl,
  JWT_SECRET,
};
