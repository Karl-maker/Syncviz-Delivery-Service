const mongoose = require("mongoose");

const Delivery_CenterSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    address: {
      street_number: {},
      street_name: {},
      city: {},
      state: {},
      country: {},
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Delivery_Center = mongoose.model(
  "Delivery_Centers",
  Delivery_CenterSchema
);

module.exports = Delivery_Center;
