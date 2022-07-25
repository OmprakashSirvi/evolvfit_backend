/** @format */

const express = require('express');
const morgan = require('morgan');

const foodRoute = require('./routes/foodRoutes');
const mealRoute = require('./routes/mealRoutes');
const userRoute = require('./routes/userRoutes');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
   res.status(200).json({
      status: 'success',
      message: 'base route is up and runing',
   });
});

app.use('/api/v1/food/', foodRoute);
app.use('/api/v1/meal/', mealRoute);
app.use('/api/v1/user/', userRoute);

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
