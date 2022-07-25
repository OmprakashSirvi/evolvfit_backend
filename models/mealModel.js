/** @format */

const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
   category: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Evening Snack', 'Dinner'],
      default: 'Lunch',
   },
   name: {
      type: String,
      required: [true, 'Meal must have a name'],
   },
   foodItems: [
      {
         type: mongoose.Schema.ObjectId,
         ref: 'Food',
      },
   ],
});

// mealSchema.pre("save", async function (next) {
//   const foodPromises = thisfoodItems.map(async (id) => await Food.findById(id));
//   this.foodItems = Promise.all(foodPromises);
//   next();
// });

module.exports = mongoose.model('Meal', mealSchema);
