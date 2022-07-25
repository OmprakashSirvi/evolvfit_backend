const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Gimme a name of the user"],
  },
  calorieRequirement: {
    type: Number,
    required: [true, "Provide calorie requirement for the user"],
  },
  mealPlan: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Meal",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
