const { Driver } = require("../../model");
const mongoose = require("mongoose");

module.exports = {
  create,
  delete: _delete,
  getManyByDeliveryCenter,
  getOneByEmail,
};

async function getManyByDeliveryCenter(
  delivery_center_id,
  page_size,
  page_number
) {
  page_size = parseInt(page_size, 10);
  const page = Math.max(0, page_number);
  const order = "asc";
  const drivers = await Driver.find({ works_at: delivery_center_id })
    .limit(page_size)
    .skip(page_size * page)
    .sort(order); // get all

  return drivers;
}

async function getOneByEmail(email) {
  const driver = await Driver.findOne({ email: email });

  return driver;
}

async function create(details) {
  let {
    email,
    first_name,
    last_name,
    license_id,
    mobile_number,
    address,
    works_at,
  } = details;
  let driver = await new Driver({
    email,
    license_id,
    mobile_number,
    address,
    works_at,
    first_name,
    last_name,
  });
  await driver.save();

  try {
    await sendEmail(
      email,
      "Delivery Service",
      {
        first_name: first_name,
        last_name: last_name,
      },
      "driverCreated"
    );
  } catch (err) {
    //Email didn't work
  }

  return driver;
}

async function _delete(email) {
  await Driver.findOneAndRemove({ email: email });
  return;
}
