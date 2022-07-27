/** @format */

const Food = require('../models/foodModel');

const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync');
const APIFeatures = require('../utils/ApiFeatures');

/**
 * get all foods form database
 */
exports.getAllFood = CatchAsync(async (req, res, next) => {
   const features = new APIFeatures(Food.find(), req.query).filter().sort();

   const data = await features.query;

   if (!data) return next(new AppError('No documents found', 404));

   res.status(200).json({
      status: 'success',
      message: 'got your foods ',
      data: { data },
   });
});

/**
 * create new food item
 */
exports.createFood = CatchAsync(async (req, res, next) => {
   const body = req.body;

   if (Object.keys(body).length === 0)
      return next(new AppError('No data Available', 400));

   const data = await Food.create(body);

   res.status(200).json({
      status: 'success',
      message: 'Your food is created',
      data,
   });
});
