const express = require("express");
const router = express.Router();
const TOP_ROUTE = "/location";
const { location } = require("../../../service");
const passport = require("passport");
const { protect } = require("../../../auth/protect");

function locationController(io) {
  router.post(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    createLocation
  );
  router.delete(
    `${TOP_ROUTE}/:location_id`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    deleteLocation
  );
  router.get(`${TOP_ROUTE}s`, getAllLocations);
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

  function createLocation(req, res, next) {
    location
      .create({
        address: req.body.address,
        email: req.user.email,
        more_info: req.body.more_info,
      })
      .then((location) => {
        res.status(200).json({ location });
      })
      .catch((err) => next(err));
  }

  function deleteLocation(req, res, next) {
    location
      .delete({ _id: req.params.location_id, email: req.user.email })
      .then(() => {
        res.status(200).json({ message: "Deleted Successfully" });
      })
      .catch((err) => next(err));
  }

  function getAllLocations(req, res, next) {
    location
      .getAll(req.user.email)
      .then((locations) => {
        res.status(200).json({ locations });
      })
      .catch((err) => next(err));
  }
}

module.exports = { locationController };
