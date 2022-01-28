const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  name: { type: String },
  country: { type: String },
  info: { type: String },
});

const City = mongoose.model("Cities", CitySchema);

module.exports = City;
