const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Enter Driver's Email"],
      unique: true,
    },
    first_name: { type: String },
    last_name: { type: String },
    license_id: {
      type: String,
    },
    mobile_number: {
      type: String,
    },
    display_image: {
      type: String,
    },
    address: {
      street_number: {},
      street_name: {},
      city: {},
      state: {},
      country: {},
    },
    works_at: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model("Drivers", DriverSchema);

module.exports = Driver;
