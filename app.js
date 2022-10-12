require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter, mongoDBUrl } = require('./utils/config');
const generalErrorHandler = require('./middlewares/generalErrorHandler');
const { requestLogger } = require('./middlewares/request.log');
const { errorLogger } = require('./middlewares/error.log');

const routes = require('./routes/index');

const { PORT = 3000, NODE_ENV, DB_URL } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DB_URL : mongoDBUrl, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://movie-explorer.nomoredomains.icu',
    'http://back.movie-explorer.nomoredomains.icu',
    'https://movie-explorer.nomoredomains.icu',
    'https://back.movie-explorer.nomoredomains.icu',
    'http://localhost:8080',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов, до роутов
app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок, до обработчиков ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(generalErrorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
