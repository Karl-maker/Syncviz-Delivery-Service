const express = require("express");
const router = express.Router();
const TOP_ROUTE = "/vehicle";
const { vehicle } = require("../../../service");
const passport = require("passport");
const { protect } = require("../../../auth/protect");

function vehicleController(io) {
  router.post(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    createVehicle
  );
  router.delete(
    `${TOP_ROUTE}/:vehicle_id`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    deleteVehicle
  );
  router.get(
    `${TOP_ROUTE}s`,
    passport.authenticate("jwt", { session: false }),
    driversOnly,
    getAllVehiclesByDeliveryCenter
  );
  router.get(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    driversOnly,
    getOneVehicleByLicense
  );
  return router;

  // Controllers
  async function adminOnly(req, res, next) {
    const user = req.user;
    if (await protect(user.email, "Admin", { permission_level: 4 })) {
      next();
    } else {
      next(new Error({ name: "Forbidden", message: "No Access" }));
    }
  }

  async function driversOnly(req, res, next) {
    const user = req.user;
    if (await protect(user.email, "Driver", { permission_level: 4 })) {
      next();
    } else {
      next(new Error({ name: "Forbidden", message: "No Access" }));
    }
  }

  function createVehicle(req, res, next) {
    vehicle
      .create(req.body)
      .then((vehicle) => {
        res.status(200).json({ vehicle });
      })
      .catch((err) => next(err));
  }

  function deleteVehicle(req, res, next) {
    vehicle
      .delete(req.params.vehicle_id)
      .then(() => {
        res.status(200).json({ message: "Deleted Successfully" });
      })
      .catch((err) => next(err));
  }

  function getAllVehiclesByDeliveryCenter(req, res, next) {
    vehicle
      .getManyByDeliveryCenter(
        req.query.delivery_center_id,
        req.query.page_size,
        req.query.page_number
      )
      .then((vehicles) => {
        res.status(200).json({ vehicles });
      })
      .catch((err) => next(err));
  }

  function getOneVehicleByLicense(req, res, next) {
    vehicle
      .getOneByLicense(req.query.license)
      .then((vehicle) => {
        res.status(200).json({ vehicle });
      })
      .catch((err) => next(err));
  }
}

module.exports = { vehicleController };
