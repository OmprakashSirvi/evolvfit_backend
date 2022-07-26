/** @format */

const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router.post("/getMealPlan", userController.getMealPlan);

router.route("/:id").post(userController.updateMealPlan);

module.exports = router;
