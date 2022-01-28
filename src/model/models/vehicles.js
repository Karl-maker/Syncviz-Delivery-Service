const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    license: { type: String },
    brand: { type: String },
    model: { type: String },
    year: { type: Number },
    space: {
      maximum: { type: Number },
      unit: { type: String, default: "Cubic Feet" },
    },
    weight: {
      maximum: { type: Number },
      unit: { type: String, default: "Pounds" },
    },
    colour: { type: String },
    milage: {
      amount: { type: Number },
      unit: { type: String, default: "kilometers" },
    },
    current_range: {
      amount: { type: Number },
      unit: { type: String, default: "kilometers" },
    },
    based_at: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicles", VehicleSchema);

module.exports = Vehicle;
