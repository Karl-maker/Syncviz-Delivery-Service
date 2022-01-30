const express = require("express");
const router = express.Router();
const TOP_ROUTE = "/city";
const { city } = require("../../../service");
const passport = require("passport");
const { protect } = require("../../../auth/protect");

function cityController(io) {
  router.post(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    createCity
  );
  router.delete(
    `${TOP_ROUTE}/:city_id`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    deleteCity
  );
  router.get(`/cities`, getAllCitiesByCountry);
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

  function createCity(req, res, next) {
    city
      .create(req.body)
      .then((city) => {
        res.status(200).json({ city });
      })
      .catch((err) => next(err));
  }

  function deleteCity(req, res, next) {
    city
      .delete(req.params.city_id, req.body.country)
      .then(() => {
        res.status(200).json({ message: "Deleted Successfully" });
      })
      .catch((err) => next(err));
  }

  function getAllCitiesByCountry(req, res, next) {
    city
      .getAll(req.body.country)
      .then((cities) => {
        res.status(200).json({ cities });
      })
      .catch((err) => next(err));
  }
}

module.exports = { cityController };
