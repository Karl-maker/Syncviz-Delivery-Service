const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: { type: String },
});

const Country = mongoose.model("Countries", CountrySchema);

module.exports = Country;
