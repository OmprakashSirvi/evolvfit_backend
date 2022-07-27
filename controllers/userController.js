/** @format */

const User = require('../models/userModel');
const CatchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const Food = require('../models/foodModel');
const APIFeatures = require('../utils/ApiFeatures');
const { findByIdAndUpdate } = require('../models/userModel');

// function between(min, max) {
//    return Math.floor(Math.random() * (max - min) + min);
// }

/**
 * get all users
 */
exports.getAllUser = CatchAsync(async (req, res, next) => {
   const data = await User.find();

   if (!data) return next(new AppError('No users found', 404));

   res.status(200).json({
      status: 'Sucess',
      message: 'Got your users',
      data,
   });
});

/**
 * create a user
 */
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

/**
 * update meal plan for the user
 */
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

// exports.calculateCalorie = CatchAsync(async (req, res, next) => {});

/**
 * Aggregation query to give some stats about a food item
 * @param {} calorie
 * @returns return aggregated data
 */
const filterFoods = async (calorie) => {
   return await Food.aggregate([
      {
         $addFields: {
            totalCalorie: {
               $add: [
                  '$calorie',
                  {
                     $multiply: ['$protein', 4],
                  },
               ],
            },
         },
      },
      {
         $match: {
            totalCalorie: {
               $lt: calorie,
            },
         },
      },
      {
         $sort: {
            totalCalorie: -1,
         },
      },
   ]);
};

/**
 *
 * @param {*} data
 * @returns total calorie of the given data(list of objects, in this case food items)
 */
const calculateTotalCalorie = (data) => {
   let sum = 0;

   for (let i = 0; i < data.length; i++) {
      sum += data[i].totalCalorie;
   }

   return sum;
};

/**
 * create meal plans
 */
exports.getMealPlan = CatchAsync(async (req, res, next) => {
   let calorie = req.body.calorie * 1;
   let retData = [];

   while (calorie > 100) {
      let data = await filterFoods(calorie);

      retData.push(data[0]);
      calorie -= calculateTotalCalorie(retData);
   }

   res.status(200).json({
      status: 'success',
      message: 'Got your required meals',
      data: { retData },
   });
});
