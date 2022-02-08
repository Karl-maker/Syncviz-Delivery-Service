const { Country } = require("../../model");
const mongoose = require("mongoose");

module.exports = { create, delete: _delete, getAll };

async function create({ name, description }) {
  let country = await new Country({
    name,
    description,
  });
  await country.save();
}

async function _delete(name) {
  await Country.findOneAndRemove({ name });
  return;
}

async function getAll() {
  const country = await Country.find();
  return country;
}
