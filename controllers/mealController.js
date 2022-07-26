/** @format */

const Meal = require('../models/mealModel');
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');

/**
 * get all meal items form database
 */
exports.getAllMeals = CatchAsync(async (req, res, next) => {
   const data = await Meal.find();

   if (!data) return next(new AppError('No documents found!!', 404));

   res.status(200).json({
      status: 'success',
      message: 'Route is up and running',
      data: { data },
   });
});

/**
 * create meal item form database
 */
exports.createMeal = CatchAsync(async (req, res, next) => {
   const body = req.body;
   if (Object.keys(body).length === 0)
      return next(new AppError('No data given', 400));

   const data = await Meal.create(body);

   res.status(200).json({
      status: 'success',
      message: 'Post is running',
      data,
   });
});

/**
 * update meal
 */
exports.updateMeal = CatchAsync(async (req, res, next) => {
   const body = req.body;
   const data = await Meal.findByIdAndUpdate(req.params.id, body);

   if (!data) return next(new AppError('Id is invalid', 401));

   res.status(200).json({
      status: 'success',
      message: 'Your document is updated',
      data,
   });
});
