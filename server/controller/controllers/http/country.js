const express = require("express");
const router = express.Router();
const TOP_ROUTE = "/country";
const { country } = require("../../../service");
const passport = require("passport");
const { protect } = require("../../../auth/protect");

function countryController(io) {
  router.post(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    createCountry
  );
  router.delete(
    `${TOP_ROUTE}/:country`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    deleteCountry
  );
  router.get(`/countries`, getAllCountries);
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

  function createCountry(req, res, next) {
    country
      .create(req.body)
      .then((country) => {
        res.status(200).json({ country });
      })
      .catch((err) => next(err));
  }

  function deleteCountry(req, res, next) {
    country
      .delete(req.params.country)
      .then(() => {
        res.status(200).json({ message: "Deleted Successfully" });
      })
      .catch((err) => next(err));
  }

  function getAllCountries(req, res, next) {
    country
      .getAll()
      .then((countries) => {
        res.status(200).json({ countries });
      })
      .catch((err) => next(err));
  }
}

module.exports = { countryController };
