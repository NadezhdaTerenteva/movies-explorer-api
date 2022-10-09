require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const { errors } = require('celebrate');
const { requestLogger } = require('./middlewares/request.log');
const { errorLogger } = require('./middlewares/error.log');

const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});
const corsOptions = {
  origin: [
    'http://localhost:3000',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов, до роутов
app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок, до обработчиков ошибок

// app.use(errors()); // обработчик ошибок celebrate

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
