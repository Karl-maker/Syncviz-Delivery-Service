const { Vehicle } = require("../../model");
const mongoose = require("mongoose");

module.exports = {
  create,
  delete: _delete,
  getOneByLicense,
  getManyByDeliveryCenter,
};

async function create(details) {
  let {
    license,
    brand,
    model,
    year,
    space,
    weight,
    colour,
    milage,
    current_range,
    based_at,
  } = details;
  based_at = mongoose.Types.ObjectId(based_at);

  let vehicle = await new Vehicle({
    license,
    brand,
    model,
    year,
    space,
    weight,
    colour,
    milage,
    current_range,
    based_at,
  });
  await vehicle.save();

  return vehicle;
}

async function _delete(_id) {
  await Vehicle.deleteOne({ _id: _id });

  return;
}

async function getOneByLicense(license) {
  let vehicle = await Vehicle.findOne({ license: license });

  return vehicle;
}

async function getManyByDeliveryCenter(
  delivery_center_id,
  page_size,
  page_number
) {
  page_size = parseInt(page_size, 10);
  const page = Math.max(0, page_number);
  const order = "asc";

  let vehicles = await Vehicle.find({ based_at: delivery_center_id })
    .limit(page_size)
    .skip(page_size * page)
    .sort(order); // get all

  return vehicles;
}
