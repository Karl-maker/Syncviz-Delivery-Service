const express = require("express");
const router = express.Router();
const TOP_ROUTE = "/driver";
const { driver } = require("../../../service");
const passport = require("passport");
const { protect } = require("../../../auth/protect");

function driverController(io) {
  router.get(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    getCurrentDriver
  );

  router.post(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    createDriver
  );
  router.delete(
    `${TOP_ROUTE}/:email`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    deleteDriver
  );
  router.get(
    `${TOP_ROUTE}s`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    getAllDriversByDeliveryCenter
  );
  router.get(`${TOP_ROUTE}/:email`, getOneDriverByEmail);
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

  function createDriver(req, res, next) {
    driver
      .create(req.body)
      .then((driver) => {
        res.status(200).json({ driver });
      })
      .catch((err) => next(err));
  }

  function getCurrentDriver(req, res, next) {
    res.status(200).json({ driver: req.user });
  }

  function deleteDriver(req, res, next) {
    driver
      .delete(req.params.email)
      .then(() => {
        res.status(200).json({ message: "Deleted Successfully" });
      })
      .catch((err) => next(err));
  }

  function getAllDriversByDeliveryCenter(req, res, next) {
    driver
      .getManyByDeliveryCenter(
        req.query.delivery_center_id,
        req.query.page_size,
        req.query.page_number
      )
      .then((drivers) => {
        res.status(200).json({ drivers });
      })
      .catch((err) => next(err));
  }

  function getOneDriverByEmail(req, res, next) {
    driver
      .getOneByEmail(req.params.email)
      .then((driver) => {
        res.status(200).json({ driver });
      })
      .catch((err) => next(err));
  }
}

module.exports = { driverController };
