const vehicle = require("./services/vehicle");
const package = require("./services/package");
const delivery = require("./services/delivery");
const location = require("./services/locations");
const driver = require("./services/drivers");
const delivery_center = require("./services/delivery_center");
const country = require("./services/country");
const city = require("./services/city");
const inventory = require("./services/inventory");
const update = require("./services/update");
const auth = require("./services/auth");
const user = require("./services/user");

module.exports = {
  vehicle,
  package,
  delivery,
  location,
  driver,
  delivery_center,
  country,
  city,
  inventory,
  update,
  auth,
  user,
};
