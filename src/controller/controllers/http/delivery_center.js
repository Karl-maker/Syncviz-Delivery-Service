const express = require("express");
const router = express.Router();
const TOP_ROUTE = "/delivery_center";
const passport = require("passport");
const { protect } = require("../../../auth/protect");
const { delivery_center } = require("../../../service");

function deliveryCenterController(io) {
  router.post(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    createDeliveryCenter
  );
  router.delete(
    `${TOP_ROUTE}/:delivery_center_id`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    deleteDeliveryCenter
  );
  router.get(
    `${TOP_ROUTE}s`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    getAllDeliveryCentersByCountry
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

  function getAllDeliveryCentersByCountry(req, res, next) {
    delivery_center
      .getAllByCountry(req.body.country)
      .then((delivery_centers) => {
        res.status(200).json({ delivery_centers });
      })
      .catch((err) => next(err));
  }

  function deleteDeliveryCenter(req, res, next) {
    delivery_center
      .delete(req.params.delivery_center_id)
      .then((delivery_centers) => {
        res.status(200).json({ delivery_centers });
      })
      .catch((err) => next(err));
  }

  function createDeliveryCenter(req, res, next) {
    delivery_center
      .create({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
      })
      .then((delivery_center) => {
        res.status(200).json({ delivery_center });
      })
      .catch((err) => next(err));
  }
}

module.exports = { deliveryCenterController };
