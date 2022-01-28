const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    address: {
      street_number: {},
      street_name: {},
      city: {},
      state: {},
      country: {},
    },
    location: {},
    email: {
      type: String,
    },
    more_info: [{ title: { type: String }, details: { type: String } }],
  },
  {
    timestamps: true,
  }
);

LocationSchema.index({ location: "2dsphere" });
const Location = mongoose.model("Locations", LocationSchema);

module.exports = Location;
