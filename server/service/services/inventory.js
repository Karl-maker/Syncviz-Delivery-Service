const { Inventory } = require("../../model");

module.exports = { create, delete: _delete, getManyByDeliveryCenter };

async function create(delivery_center, package) {
  const inventory = await Inventory.create({
    package,
    delivery_center,
  });

  return inventory;
}

async function _delete(package) {
  await Inventory.findOneAndRemove({
    package,
  });

  return;
}

async function getManyByDeliveryCenter(
  delivery_center,
  page_size,
  page_number
) {
  page_size = parseInt(page_size, 10);
  const page = Math.max(0, page_number);
  const order = "asc";
  const packages = await Inventory.find({ delivery_center_id })
    .limit(page_size)
    .skip(page_size * page)
    .sort(order); // get all

  return packages;
}
