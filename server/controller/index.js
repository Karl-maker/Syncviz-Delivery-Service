const {
  packageLiveTrackingHandler,
} = require("./controllers/websocket/package-tracking");

const logger = require("../log/server");
const wrapper = require("../middleware/wrapper");
const express = require("express");
const router = express.Router();
const { packageController } = require("./controllers/http/package");
const { deliveryController } = require("./controllers/http/delivery");
const { countryController } = require("./controllers/http/country");
const { cityController } = require("./controllers/http/city");
const { vehicleController } = require("./controllers/http/vehicle");
const { locationController } = require("./controllers/http/location");
const { driverController } = require("./controllers/http/driver");
const {
  deliveryCenterController,
} = require("./controllers/http/delivery_center");
const { inventoryController } = require("./controllers/http/inventory");
const { updateController } = require("./controllers/http/update");
function websockets(io) {
  // Websockets

  packageLiveTrackingHandler(io);

  // HTTP(s)

  router.use(
    updateController(io),
    deliveryController(io),
    packageController(io),
    cityController(io),
    countryController(io),
    vehicleController(io),
    locationController(io),
    driverController(io),
    deliveryCenterController(io),
    inventoryController(io)
  );
}

module.exports = { router, websockets };
