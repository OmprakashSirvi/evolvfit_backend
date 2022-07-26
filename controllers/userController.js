/** @format */

const User = require("../models/userModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const Food = require("../models/foodModel");
const APIFeatures = require("../utils/ApiFeatures");
const { findByIdAndUpdate } = require("../models/userModel");

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

exports.getAllUser = CatchAsync(async (req, res, next) => {
  const data = await User.find();

  if (!data) return next(new AppError("No users found", 404));

  res.status(200).json({
    status: "Sucess",
    message: "Got your users",
    data,
  });
});

exports.createUser = CatchAsync(async (req, res, next) => {
  const body = req.body;
  if (!body) return next(new AppError("No body provided", 400));

  const user = await User.create(body);

  res.status(200).json({
    status: "success",
    message: "Your new user is created",
    data: { user },
  });
});

exports.updateMealPlan = CatchAsync(async (req, res, next) => {
  const body = req.body;
  if (!body) return next(new AppError("No body provided", 400));

  let oldData = await User.findById(req.params.id);
  if (!oldData) return next(new AppError("Id is invalid", 401));

  let mealPlan = [...oldData.mealPlan];
  mealPlan.push(body);

  oldData.mealPlan = mealPlan;

  const data = await User.findByIdAndUpdate(req.params.id, oldData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Your document is updated",
    data,
  });
});

exports.calculateCalorie = CatchAsync(async (req, res, next) => {});

const filterFoods = async (calorie) => {
  return await Food.aggregate([
    {
      $addFields: {
        totalCalorie: {
          $add: [
            "$calorie",
            {
              $multiply: ["$protein", 4],
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

const calculateTotalCalorie = (data) => {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    sum += data[i].totalCalorie;
  }

  return sum;
};

const isFoodInList = (obj, list, callback) => {
  list.map((ele) => {
    // console.log(obj.name == ele.name);
    if (obj.name == ele.name) callback(true);
  });
  callback(false);
};

exports.getMealPlan = CatchAsync(async (req, res, next) => {
  let calorie = req.body.calorie * 1;
  let retData = [];

  let data = await filterFoods(calorie);
  retData.push(data[0]);

  isFoodInList(data[0], retData, (result) => console.log(result));

  res.status(200).json({
    status: "success",
    message: "Got your required meals",
    data: { retData },
  });
});
