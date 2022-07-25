const express = require("express");
const foodController = require("../controllers/foodController");

const router = express.Router();

router
  .route("/")
  .get(foodController.getAllFood)
  .post(foodController.createFood);

module.exports = router;
