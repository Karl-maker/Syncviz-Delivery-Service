const { Location } = require("../../model");
const mongoose = require("mongoose");
const config = require("../../config");
const PROVIDER = config.nodeGeocoder.PROVIDER;
const nodeGeocoder = require("node-geocoder");
const logger = require("../../log/server");
let options = {
  provider: PROVIDER,
};

module.exports = { create, delete: _delete, getAll };

async function create({ address, email, more_info }) {
  let geoCoder = nodeGeocoder(options);

  try {
    let location = await geoCoder.geocode(
      `${address.street}, ${address.city}, ${address.country}`
    );

    location = {
      type: "Point",
      coordinates: [location[0].latitude, location[0].longitude],
    };
  } catch (err) {
    logger.error({ name: "Couldn't Resolve Location", message: err.message });
  }

  const location = await new Location({ address, email, more_info });
  await location.save();

  return location;
}

async function _delete({ _id, email }) {
  await Location.findOneAndRemove({ _id, email: email });
  return;
}

async function getAll(email) {
  const locations = await Location.find({ email: email });
  return locations;
}
