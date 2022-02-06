const { Delivery_Center } = require("../../model");
const mongoose = require("mongoose");
const config = require("../../config");
const PROVIDER = config.nodeGeocoder.PROVIDER;
const nodeGeocoder = require("node-geocoder");
const logger = require("../../log/server");

module.exports = { create, delete: _delete, getAllByCountry };

async function getAllByCountry(country) {
  const delivery_centers = await Delivery_Center.find({
    address: { country: country },
  });
  return delivery_centers;
}

async function create({ name, description, address }) {
  var geoCoder = nodeGeocoder(options);

  try {
    var location = await geoCoder.geocode(
      `${address.street_number} ${address.street_name}, ${address.city}, ${address.country}`
    );

    address.location = {
      type: "Point",
      coordinates: [location[0].longitude, location[0].latitude],
    };
  } catch (err) {
    // Won't mind if location cannot be resolved
    logger.error(err);
  }

  try {
    var delivery_center = await new Delivery_Center({
      address,
      email,
      more_info,
    });
    await delivery_center.save();
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

async function _delete(_id) {
  await Delivery_Center.findOneAndRemove({ _id });
  return;
}
