/** @format */

const mongoose = require('mongoose');
const { populate } = require('./foodModel');

const mealPlan = mongoose.Schema({
   date: { type: Date, unique: true },
   meals: [{ type: mongoose.Schema.ObjectId, ref: 'Meal' }],
});

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Gimme a name of the user'],
   },
   calorieRequirement: {
      type: Number,
      required: [true, 'Provide calorie requirement for the user'],
   },
   mealPlan: [mealPlan],
});

userSchema.pre(/^find/, function (next) {
   this.populate({
      path: 'mealPlan',
      model: 'mealPlan',
      populate: { path: 'meals' },
   });
   next();
});

module.exports = mongoose.model('User', userSchema);
