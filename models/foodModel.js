/** @format */

const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

foodSchema.virtual("protein_ratio").get(function () {
  return (
    Math.round(
      ((this.protein * 4 * 100) / (this.calorie + this.protein * 4)) * 100
    ) / 100
  );
});

// foodSchema.virtual("total_calorie").get(function () {
//   if (!this.protein) return this.calorie;
//   return this.protein * 4 + this.calorie;
// });

module.exports = mongoose.model("Food", foodSchema);
