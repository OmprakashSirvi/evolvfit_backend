const express = require("express");
const mealController = require("../controllers/mealController");

const router = express.Router();

router
  .route("/")
  .get(mealController.getAllMeals)
  .post(mealController.createMeal);

module.exports = router;
