const { City } = require("../../model");
const mongoose = require("mongoose");

module.exports = { create, delete: _delete, getAll };

async function create({ name, description, info }) {
  var city = await new City({
    name,
    country,
    info,
  });
  await country.save();
}

async function _delete(name, country) {
  await City.findOneAndRemove({ name, country });
  return;
}

async function getAll(country) {
  const cities = await City.find({ country: country });
  return cities;
}
