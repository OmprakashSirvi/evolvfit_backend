/** @format */

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
   .route('/')
   .get(userController.getAllUser)
   .post(userController.createUser);

router.route('/:id').post(userController.updateMealPlan);

router.post('/getMealPlan', userController.createMealPlan);

module.exports = router;
