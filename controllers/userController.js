/** @format */

const User = require('../models/userModel');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const Food = require('../models/foodModel');
const APIFeatures = require('../utils/ApiFeatures');
const { findByIdAndUpdate } = require('../models/userModel');

exports.getAllUser = CatchAsync(async (req, res, next) => {
   const data = await User.find();

   if (!data) return next(new AppError('No users found', 404));

   res.status(200).json({
      status: 'Sucess',
      message: 'Got your users',
      data,
   });
});

exports.createUser = CatchAsync(async (req, res, next) => {
   const body = req.body;
   if (!body) return next(new AppError('No body provided', 400));

   const user = await User.create(body);

   res.status(200).json({
      status: 'success',
      message: 'Your new user is created',
      data: { user },
   });
});

exports.updateMealPlan = CatchAsync(async (req, res, next) => {
   const body = req.body;
   if (!body) return next(new AppError('No body provided', 400));

   let oldData = await User.findById(req.params.id);
   if (!oldData) return next(new AppError('Id is invalid', 401));

   let mealPlan = [...oldData.mealPlan];
   mealPlan.push(body);

   oldData.mealPlan = mealPlan;

   const data = await User.findByIdAndUpdate(req.params.id, oldData, {
      new: true,
      runValidators: true,
   });

   res.status(200).json({
      status: 'success',
      message: 'Your document is updated',
      data,
   });
});

exports.calculateCalorie = CatchAsync(async (req, res, next) => {});

exports.createMealPlan = CatchAsync(async (req, res, next) => {
   const calorie = req.body.calorie * 1;
   //    const data = await Food.aggregate([{ $sort: { calorie: 1 } }]);
   //    const features = new APIFeatures(Food.find())
   const data = await Food.find();

   if (!data) return next(new AppError('Something went wrong!!', 405));

   res.status(200).json({
      status: 'success',
      message: 'Got your required meals',
      data,
   });
});
