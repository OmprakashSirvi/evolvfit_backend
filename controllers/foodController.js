const Food = require("../models/foodModel");

const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");

exports.getAllFood = CatchAsync(async (req, res, next) => {
  const data = await Food.find();

  if (!data) return next(new AppError("No documents found", 404));

  res.status(200).json({
    status: "success",
    message: "got your foods ",
    data: { data },
  });
});

exports.createFood = CatchAsync(async (req, res, next) => {
  const body = req.body;

  if (Object.keys(body).length === 0)
    return next(new AppError("No data Available", 400));

  const data = await Food.create(body);

  res.status(200).json({
    status: "success",
    message: "Your food is created",
    data,
  });
});
