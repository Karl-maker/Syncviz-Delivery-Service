const { Delivery_Center } = require("../../model");
const mongoose = require("mongoose");
const config = require("../../config");
const PROVIDER = config.nodeGeocoder.PROVIDER;
const nodeGeocoder = require("node-geocoder");

module.exports = { create, delete: _delete, getAllByCountry };

async function getAllByCountry(country) {
  const delivery_centers = await Delivery_Center.find({
    address: { country: country },
  });
  return delivery_centers;
}

async function create({ name, description, address }) {
  var geoCoder = nodeGeocoder(options);

  var location = await geoCoder
    .geocode(
      `${address.street_number} ${address.street_name}, ${address.city}, ${address.country}`
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      logger.error({ name: "Couldn't Resolve Location", message: err.message });
    });

  address.location = {
    type: "Point",
    coordinates: [location[0].longitude, location[0].latitude],
  };

  var delivery_center = await new Delivery_Center({
    address,
    email,
    more_info,
  });
  await delivery_center.save();
}

async function _delete(_id) {
  await Delivery_Center.findOneAndRemove({ _id });
  return;
}
