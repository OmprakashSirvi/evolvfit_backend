const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Food item must have a name"],
  },
  calorie: {
    type: Number,
    required: [true, "Provide calorie for this food"],
  },
  protein: {
    type: Number,
  },
  carb: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  acceptedUnits: {
    type: String,
    enum: ["ml", "litre", "kg", "g", "item"],
    default: "g",
  },
});

module.exports = mongoose.model("Food", foodSchema);
